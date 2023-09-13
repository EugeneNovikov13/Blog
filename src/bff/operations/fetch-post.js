import { getComments, getPost, getUsers } from '../api';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	//не делать так в реальном проекте!!!
	const commentsWithAuthor = comments.map((comment) => (
		{
			...comment,
			author: users.find(user => user.id === comment.authorId).login,
		}
	));

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
