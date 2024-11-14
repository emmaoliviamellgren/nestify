import { useState } from 'react';
import { SearchBarSecondary } from './ui/inputs';
import { CircleUserRound } from 'lucide-react';
import { PillButton } from './ui/pillButtons';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/authProvider';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import Loading from '@/components/loading';
import useResponsive from '@/hooks/useResponsive';
import { useSearchAndFilter } from 'contexts/searchAndFilterProvider';

const Navigation = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { smallScreen, bigScreen } = useResponsive();
    const { search, handleSearch } = useSearchAndFilter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Could not log out', error);
        } finally {
            setLoading(false);
            router.push('/');
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            {smallScreen && (
                <span className='py-6 justify-center flex flex-wrap gap-2 items-center'>
                    <SearchBarSecondary
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder='Search...'
                        className={`${user ? ' !w-[170px]' : 'w-full'}`}
                    />
                    {!user ? (
                        <button
                            className='bg-[--primary] hover:bg-[--primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5'
                            onClick={() => router.push('/log-in')}>
                            <CircleUserRound className='size-6 text-[--text-secondary]' />
                            <p className='text-[--text-secondary]'>Log in</p>
                        </button>
                    ) : (
                        <>
                            <button
                                className='bg-[--primary] hover:bg-[--primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5'
                                onClick={() => router.push('/user')}>
                                <CircleUserRound className='size-6 text-[--text-secondary]' />
                                <p className='text-[--text-secondary]'>
                                    My account
                                </p>
                            </button>
                            <button
                                className='bg-[--primary] hover:bg-[--primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5'
                                onClick={handleLogout}>
                                <LogOut className='size-6 text-[--text-secondary]' />
                                <p className='text-[--text-secondary]'>
                                    Log out
                                </p>
                            </button>
                        </>
                    )}
                </span>
            )}

            {bigScreen && (
                <span className='py-4 hidden md:flex justify-between items-center px-8 border-b'>
                    <h2
                        className='cursor-pointer transition-all hover:translate-y-0.5'
                        onClick={() => router.push('/')}>
                        Nestify
                    </h2>
                    <div className='flex gap-4 items-center'>
                        {!user ? (
                            <PillButton
                                label='Log in'
                                icon={<CircleUserRound />}
                                onClick={() => router.push('/log-in')}
                            />
                        ) : (
                            <>
                                <PillButton
                                    label='My account'
                                    icon={<CircleUserRound />}
                                    onClick={() => router.push('/user')}
                                />
                                <PillButton
                                    label='Log out'
                                    icon={<LogOut />}
                                    onClick={handleLogout}
                                />
                            </>
                        )}

                        <SearchBarSecondary
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder='Search...'
                        />
                    </div>
                </span>
            )}
        </>
    );
};

export default Navigation;
