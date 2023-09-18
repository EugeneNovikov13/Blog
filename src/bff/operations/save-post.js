import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { addPost, updatePost } from '../api';

export const savePost = async (userSessionHash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const savedPost = newPostData.id === '' ? await addPost(newPostData) : await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
