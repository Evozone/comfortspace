import { SIGN_IN, SIGN_OUT } from '../actions/types';

export interface AuthState {
    isSignedIn: boolean;
    uid: string | null;
    email: string | null;
    name: string | null;
    photoURL: string | null;
    username: string | null;
    socialLinks: { twitter: string; instagram: string } | null;
    token: string | null;
}

const INITIAL_STATE: AuthState = {
    isSignedIn: false,
    uid: null,
    email: null,
    name: null,
    photoURL: null,
    username: null,
    socialLinks: null,
    token: null,
};

const authReducer = (state: AuthState = INITIAL_STATE, action: any): AuthState => {
    switch (action.type) {
        case SIGN_IN:
            window.localStorage.setItem(
                'healthApp',
                JSON.stringify({ dnd: action.payload.token, isSignedIn: true })
            );
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
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
                token: null,
            };

        default:
            return state;
    }
};

export default authReducer;
