import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeUser = async (userSessionHash, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
