import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../bff';
import { selectUserSession } from '../selectors';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	//Ссылка на колл-бек не изменится, пока не измениться session, т.е. пользователь
	return useCallback((operation, ...params) => {
		const request = ['register', 'authorize'].includes(operation)
			? params
			: [session, ...params];

		return server[operation](...request);
	}, [session]);
};
