import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authProvider';
import { useEffect, ComponentType } from 'react';
import Loading from '@/components/loading';

const authChecking = <P extends object>(WrappedComponent: ComponentType<P>) => {

    const AuthComponent = (props: P) => {
        const { user, authLoaded } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (authLoaded && !user) {
                router.push('/log-in');
            }
        }, [authLoaded, user, router]);

        if (!authLoaded) {
            return <Loading />;
        }

        return user ? <WrappedComponent {...props} /> : null;
    };

    return AuthComponent;
};

export default authChecking;