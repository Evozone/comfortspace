import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import notifyReducer from './notifyReducer';

import { combineReducers, Reducer } from 'redux';
import { AuthState } from './authReducer';
import { LoadingState } from './loadingReducer';
import { NotifyState } from './notifyReducer';

interface RootState {
    auth: AuthState;
    loading: LoadingState;
    notify: NotifyState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    auth: authReducer,
    loading: loadingReducer,
    notify: notifyReducer,
});

export default rootReducer;
