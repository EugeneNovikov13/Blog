const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { login, register, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
const { addPost, editPost, deletePost, getPosts, getPost } = require('./controllers/post');
const { addComment, deleteComment } = require('./controllers/comment');
const mapUser = require('./helpers/mapUser');
const mapPost = require('./helpers/mapPost');
const mapComment = require('./helpers/mapComment');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const ROLES = require('./constants/roles');
const { join } = require('path');

const port = 3001;
const app = express();

//"учим" бекэнд раздавать статические файлы из сборки фронт-энда - ВАРИАНТ ДЛЯ ПРОДАКШЭНА
//чтобы сборка появилась нужно не забыть запустить во фронт-энде npm run build
app.use(express.static('frontend/build'));

//подключаем взаимодействие с куки
app.use(cookieParser());
//подключаем взаимодействие с форматом json
app.use(express.json());

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }) //выполняется только после http-запроса
			.send({ error: null, user: mapUser(user) });
	} catch (e){
		res.send({error: e.message || "Unknown message"})
	}
})

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown message' });
	}
});

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true })
		.send({});
});

app.get('/posts', async (req, res) => {
	const { posts, lastPage } = await getPosts(
		//параметры запросы из адресной строки (http://localhost:3001/posts?search=<>&limit=<>&page=<>)
		req.query.search,
		req.query.limit,
		req.query.page,
	);

	res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

app.get('/posts/:id', async (req, res) => {
	const post = await getPost(req.params.id);

	res.send({ data: mapPost(post) });
});

//до этой строчки подключаем всё, что доступно любому пользователю вне зависимости от прав доступа
app.use(authenticated);

app.post('/posts/:id/comments', async (req, res) => {
	console.log(req.user);

	const newComment = await addComment(req.params.id, {
		content: req.body.content,
		//пользователя берём из req.user - результата действия функции authenticated, чтобы нельзя было представится другим пользователем
		author: req.user.id,
	});

	res.send({ data: mapComment(newComment) });
});

app.delete('/posts/:postId/comments/:commentId', hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
	await deleteComment(req.params.postId, req.params.commentId);

	res.send({ error: null });
});

app.post('/posts', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newPost = await addPost({
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	});

	res.send({ data: mapPost(newPost) });
});

app.patch('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedPost = await editPost(
		req.params.id, {
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		});

	res.send({ data: mapPost(updatedPost) });
});

app.delete('/posts/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deletePost(req.params.id);

	res.send({ error: null });
});

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers();

	res.send({ data: users.map(mapUser) });
});

app.get('/users/roles', hasRole([ROLES.ADMIN]), (req, res) => {
	const roles = getRoles();

	res.send({ data: roles });
});

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	});

	res.send({ data: mapUser(newUser) });
});

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null });
});

app.get('/*', (req, res) => {
	res.sendFile(join(__dirname, '../frontend/build/index.html'));
});

mongoose.connect(
	"mongodb+srv://NovikovEugene:gfhjkm13@educationdb.nioilpj.mongodb.net/blog?retryWrites=true&w=majority"
).then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
});
