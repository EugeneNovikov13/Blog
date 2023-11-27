import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateUserRole = async (userSessionHash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await setUserRole(userId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
