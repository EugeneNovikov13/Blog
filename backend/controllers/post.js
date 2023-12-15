const Post = require('../models/Post');

// add

async function addPost(post) {
	const newPost = await Post.create(post);

	//по-моему в этом нет смысла, так как при создании статьи массив комментариев всегда пуст
	// await newPost.populate({
	// 	path: 'comments',
	// 	populate: 'author',
	// });

	return newPost;
}

//edit

async function editPost(id, post) {
	//параметр returnDocument: 'after' добавляется для возвращения новых данных, а не тех что были до обновления
	const newPost = await Post.findByIdAndUpdate(id, post, { returnDocument: 'after' });

	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});

	return newPost;
}

//delete

function deletePost(id) {
	return Post.deleteOne({ _id: id });
}

// get list  with search and pagination

async function getPosts(search = '', limit = 9, page = 1) {
	const [posts, count] = await Promise.all([
		//поиск по названиям статей осуществляется по регулярному выражению с регистронезависимой опцией
		Post.find({ title: { $regex: search, $options: 'i' } })
			//устанавливается ограничение на количество возвращаемых статей
			.limit(limit)
			//устанавливается пропуск установленного количества статей в начале результата поиска
			.skip((page - 1) * limit)
			//сортировка статей по параметру createdAt в порядке убывания (сначала новые)
			.sort({ createdAt: -1 }),
		//поиск количества подходящих статей по критериям поиска (для нахождения общего числа страниц)
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
	]);

	return {
		posts,
		lastPage: Math.ceil(count / limit),
	};
}

// get item

function getPost(id) {
	//при получении одной статьи получаем развёрнутые комментарии, а не только их id (популейтим их)
	//populate('comments') работает только на один уровень в глубину (разворачивает комментарии, но не разворачивает их авторов)
	return Post.findById(id).populate({
		//передаём путь, который нужно запопулейтить
		path: 'comments',
		//передаются дополнительные команды (фильтрация, сортировка) или ВЛОЖЕННЫЙ populate, чтобы развернуть поле по id
		populate: 'author',
	});
}

module.exports = {
	addPost,
	editPost,
	deletePost,
	getPosts,
	getPost,
};
