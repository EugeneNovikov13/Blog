import { sessions } from '../sessions';

export const logout = async (session) => {
	await sessions.remove(session);
};
