import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

// Defina a interface para as props do ProtectedRoute
interface ProtectedRouteProps<T = {}> {
    component: React.FC<T>;
    render?: (props: T) => JSX.Element;
}

const ProtectedRoute = <T extends {}>({
    component: Component,
    render,
}: ProtectedRouteProps<T>) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/projeto/" />;
    }

    return render ? render({} as T) : <Component {...({} as T)} />;
};

export default ProtectedRoute;