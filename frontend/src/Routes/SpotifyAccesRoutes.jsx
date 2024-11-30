import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../Components/Commons/Loading';
import { useSpotifyAuth } from '../Contexts/SpotifyContext';

const SpotifyAccessRoutes = () => {
    const { isAuthenticated, loading } = useSpotifyAuth();
    
    if (loading) return <Loading /> ;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default SpotifyAccessRoutes;
