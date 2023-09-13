import { deleteComment, getComments, getPost, getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePostComment = async (userSessionHash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

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
