import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('userName');

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};
