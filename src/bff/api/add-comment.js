import { generateDate } from '../utils';

export const addComment = (userId, postId, content) => {
	const commentData = {
		author_id: userId,
		post_id: postId,
		published_at: generateDate(),
		content,
	};

	fetch('http://localhost:3004/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},

		body: JSON.stringify(commentData),
	});
};
