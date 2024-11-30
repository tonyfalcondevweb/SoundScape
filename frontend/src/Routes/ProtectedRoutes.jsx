import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import { useSpotifyAuth } from '../Contexts/SpotifyContext';
import Loading from '../Components/Commons/Loading';

const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading } = useUser();
    const { isAuthenticated: isSpotifyAuthenticated, loading: isSpotifyLoading } = useSpotifyAuth();
    
    if (isLoading || isSpotifyLoading) {
        return <Loading />;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return !isSpotifyAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default ProtectedRoutes
