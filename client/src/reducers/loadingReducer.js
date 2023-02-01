import { START_LOADING, STOP_LOADING } from '../actions/types';

const INITIAL_STATE = {
    isVisible: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_LOADING:
            return { isVisible: true };

        case STOP_LOADING:
            return { isVisible: false };

        default:
            return state;
    }
};

export default modalReducer;
