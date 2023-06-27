import { START_LOADING, STOP_LOADING } from '../actions/types';

export interface LoadingState {
    isVisible: boolean;
}

const INITIAL_STATE: LoadingState = {
    isVisible: false,
};

const loadingReducer = (
    state: LoadingState = INITIAL_STATE,
    action: any
): LoadingState => {
    switch (action.type) {
        case START_LOADING:
            return { isVisible: true };

        case STOP_LOADING:
            return { isVisible: false };

        default:
            return state;
    }
};

export default loadingReducer;
