import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import Loading from '../Components/Commons/Loading';

const PublicRoutes = () => {
    const { isAuthenticated, isLoading } = useUser();
    
    if (isLoading) {
        return <Loading />;
    }
    
    return isAuthenticated ? <Navigate to="/Authspotify" /> : <Outlet />;
}

export default PublicRoutes
