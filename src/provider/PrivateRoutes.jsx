import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';

const PrivateRoutes = ({ children }) => {
    // const location = useLocation();
    const { user, loading, userStatus, roleLoading } = useContext(AuthContext);

    if (loading || roleLoading) {
        return <Loading />;
    }
    
    if(!user) {
        return <Navigate to={"/login"} ></Navigate>
    }
    if(userStatus == "blocked") {
        return <Navigate to={"/"} ></Navigate>
    }

    return children;
    
    // if (user?.email) {
    //     return children;
    // }
    // return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoutes;