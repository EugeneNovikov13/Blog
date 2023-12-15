//функция возвращает на клиент только необходимые поля из БД
module.exports = function (comment) {
	return {
		id: comment._id,
		content: comment.content,
		//достаём только логин из вложенного объекта author
		author: comment.author.login,
		publishedAt: comment.createdAt,
	}
}
