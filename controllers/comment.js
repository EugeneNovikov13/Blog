const Comment = require('../models/Comment');
const Post = require('../models/Post');

// add

async function addComment(postId, comment) {
	const newComment = await Comment.create(comment);

	//находим статью в БД по id и добавляем в массив значения поля comments новый коммент с помощью команды $push
	//в comments можно поместить, как полноценный документ (модель), так и идентификатор
	await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

	//просим mongoose превратить поле author с указанием только id автора в полноценный объект со всей нужной инфой об авторе
	//это делается с помощью метода populate
	await newComment.populate('author');

	return newComment;
}

// delete

async function deleteComment(postId, commentId) {
	await Comment.deleteOne({_id: commentId});

	//находим статью в БД по id и удаляем из массива comments коммент по его id с помощью команды $pull
	//в comments можно поместить, как полноценный документ (модель), так и идентификатор
	await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}})
}

// get list for post
//данная операция не имеет смысла, так как при запросе статей, комментарии приходят вместе с ними

module.exports = {
	addComment,
	deleteComment,
};
