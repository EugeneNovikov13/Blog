const { verify } = require('../helpers/token');
const User = require('../models/User');

//после выполнения данной функции в объекте запроса всегда присутствует пользователь, осуществивший запрос
module.exports = async function(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
		next();
		return;
	}

	//функция расшифровывает и возвращает токен из куки в запросе
	const tokenData = verify(req.cookies.token);

	//ищет пользователя в БД по id, получаемого из токена
	const user = await User.findOne({ _id: tokenData.id });

	if (!user) {
		res.send({ error: 'Authenticated user not found' });

		return;
	}

	//помещает пользователя в объект запроса
	req.user = user;

	//отправляет на следующий шаг
	next();
};
