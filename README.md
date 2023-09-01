# Blog

Проект "Авторский блог"

Области хранения данных:

1. База данных на JSON-Server
2. BFF
3. Redux Store

Сущности приложения:

1. Пользователь: БД (список пользователей), BFF (сессия текущего), Store (отображение в браузере)
2. Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Store (использование на клиенте)
3. Статья: БД (список статей), Store (отображение в браузере)
4. Комментарий: БД (список комментариев), Store (отображение в браузере)

Таблицы БД:

1. Пользователи - users: id / login / password / registered_at / role_id
2. Роли - roles: id / name
3. Статьи - posts: id / title / image_url / content / published_at
4. Комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

1. Сессия текущего пользователя: login / password / role

Схема для Redux Store (на клиенте):

1. user: id / login / roleId
2. posts: массив post: id / title / imageUrl / publishedAt / commentsCount
3. post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
4. users: массив user: id / login / registeredAt / roleId
