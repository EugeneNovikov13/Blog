//функция возвращает на клиент только необходимые поля из БД
const mongoose = require('mongoose');
const mapComment = require('./mapComment')

module.exports = function (post) {
	return {
		id: post.id,
		title: post.title,
		imageUrl: post.image,
		content: post.content,
		//проверяем, является ли comment идентификатором комментария или полноценным развёрнутым комментарием в виде объекта
		//для этого используется встроенная функция mongoose isObjectIdOrHexString
		comments: post.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)),
		publishedAt: post.createdAt,
	}
}
