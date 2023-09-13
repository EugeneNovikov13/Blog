import { addComment, getComments, getPost, getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addPostComment = async (userSessionHash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addComment(userId, postId, content);

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
