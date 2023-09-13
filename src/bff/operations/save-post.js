import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { updatePost } from '../api';

export const savePost = async (userSessionHash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const updatedPost = await updatePost(newPostData);

	return {
		error: null,
		res: updatedPost,
	};
};
