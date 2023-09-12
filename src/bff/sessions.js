import { addSession, deleteSession, getSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);

		//возвращает уникальный хэш сессии в виде строки
		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) return;

		await deleteSession(session.id);
	},
	async access(hash, accessRoles) {
		const dbSession = await getSession(hash);

		return !!dbSession.user && accessRoles.includes(dbSession.user.roleId);
	},
};
