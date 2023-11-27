import { getComments, getUsers } from '../api';

export const getPostCommentsWithAuthor = async (postId) => {
	const comments = await getComments(postId);
	const users = await getUsers();

	return comments.map((comment) => (
		{
			...comment,
			author: users.find(user => user.id === comment.authorId).login,
		}
	));
};
