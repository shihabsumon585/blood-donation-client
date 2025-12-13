import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading.jsx';

const PrivateRoutes = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Loading></Loading>
    }
    if (user?.email) {
        return children;
    }

    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoutes;