import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    if (isSignedIn) {
        return children;
    }
    return <Navigate to='/' />;
}
