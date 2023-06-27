import { NOTIFY } from '../actions/types';

export interface NotifyState {
    open: boolean;
    severity: string;
    message: string;
}

const INITIAL_STATE: NotifyState = {
    open: false,
    severity: 'info',
    message: '',
};

const notifyReducer = (state: NotifyState = INITIAL_STATE, action: any): NotifyState => {
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
