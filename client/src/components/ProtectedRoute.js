import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    if (!isSignedIn) {
        return <Navigate to='/' />;
    }
    return children;
}
