import { useEffect } from 'react';

export const useResetForm = (reset, wasLogout) => {
	useEffect(() => {
		if (wasLogout) {
			reset();
		}
	}, [reset, wasLogout]);
};
