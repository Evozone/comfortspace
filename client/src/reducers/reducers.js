import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    auth: authReducer,
    loading: loadingReducer,
});
