import { useEffect } from 'react';
import { useUser } from '../Contexts/UserContext';
import Loading from './Commons/Loading';

const AuthWrapper = ({ children }) => {
    const { checkAuth, isLoading } = useUser();

    useEffect(() => {
        checkAuth();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return children;
};

export default AuthWrapper; 