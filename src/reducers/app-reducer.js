import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: true,
			};

		case ACTION_TYPE.LOGIN:
			return {
				...state,
				wasLogout: false,
			};
		default:
			return state;
	}
};
