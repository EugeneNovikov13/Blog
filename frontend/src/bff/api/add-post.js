import { generateDate } from '../utils';

export const addPost = ({ imageUrl, title, content }) => {
	const postData = {
		image_url: imageUrl,
		published_at: generateDate(),
		title,
		content,
	};

	return fetch('http://localhost:3004/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify(postData),
	}).then((createdPost) => createdPost.json());
};
