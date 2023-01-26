import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { signInAction } from '../actions/actions';

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const auth = window.localStorage.getItem('healthApp');
    if (auth) {
        const { dnd } = JSON.parse(auth);
        const {
            sub: uid,
            email,
            name,
            picture: photoURL,
            iat: signInTime,
        } = jwtDecode(dnd);
        dispatch(signInAction(uid, email, name, photoURL, dnd, signInTime));
        return children;
    }
    return <Navigate to='/' />;
}
