import { NOTIFY } from '../actions/types';

const INITIAL_STATE = {
    open: false,
    severity: 'info',
    message: '',
};

const notifyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIFY:
            return {
                ...state,
                open: action.payload.open,
                severity: action.payload.severity,
                message: action.payload.message,
            };

        default:
            return state;
    }
};

export default notifyReducer;
