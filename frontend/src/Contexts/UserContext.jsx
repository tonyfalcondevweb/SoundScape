import React, { createContext, useContext, useState } from 'react';
import { verifyToken, logoutUser } from '../Api/Api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setIsLoading(false);
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const response = await verifyToken();
            if (response.data.account) {
                login(response.data.account);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de l'authentification:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            isAuthenticated, 
            isLoading, 
            login, 
            logout,
            checkAuth 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
    }
    return context;
};
