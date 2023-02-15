import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: false,
    uid: null,
    email: null,
    name: null,
    photoURL: null,
    username: null,
    socialLinks: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            window.localStorage.setItem(
                'healthApp',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            return {
                ...state,
                isSignedIn: true,
                uid: action.payload.uid,
                email: action.payload.email,
                name: action.payload.name,
                photoURL: action.payload.photoURL,
                username: action.payload.username,
                socialLinks: action.payload.socialLinks,
            };

        case SIGN_OUT:
            window.localStorage.removeItem('healthApp');
            return {
                ...state,
                isSignedIn: false,
                uid: null,
                email: null,
                name: null,
                photoURL: null,
                username: null,
                socialLinks: null,
            };

        default:
            return state;
    }
};

export default authReducer;
