import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import notifyReducer from './notifyReducer';

export default combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    notify: notifyReducer,
});
