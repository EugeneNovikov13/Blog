import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: true,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {
		},
		onCancel: () => {
		},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: true,
			};

		case ACTION_TYPE.SET_USER:
			return {
				...state,
				wasLogout: false,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;

		default:
			return state;
	}
};
