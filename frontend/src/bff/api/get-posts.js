import { transformPost } from '../transformers';

export const getPosts = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3004/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then(loadedPosts =>
			//получаем Links из headers для получения номера последней страницы
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}));
