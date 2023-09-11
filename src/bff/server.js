import { authorize, fetchRoles, fetchUsers, logout, register, removeUser, updateUserRole } from './operations';

export const server = {
	authorize,
	logout,
	register,
	fetchUsers,
	fetchRoles,
	updateUserRole,
	removeUser,
};
