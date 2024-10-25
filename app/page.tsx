import PublicLayout from './(root)/layout';
import LandingPage from './(root)/page';
import AuthContextProvider from './hooks/useAuth';

const RootPage = () => {
    return (
        <PublicLayout>
            <AuthContextProvider>
                <LandingPage />
            </AuthContextProvider>
        </PublicLayout>
    );
};

export default RootPage;
