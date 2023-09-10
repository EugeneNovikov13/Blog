import { authorize, fetchRoles, fetchUsers, logout, register } from './operations';

export const server = {
	authorize,
	logout,
	register,
	fetchUsers,
	fetchRoles,
};
