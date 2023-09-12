import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchUsers = async (userSessionHash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSessionHash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
