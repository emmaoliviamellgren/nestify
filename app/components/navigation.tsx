import { ChangeEvent, useState } from 'react';
import { SearchBarPrimary, SearchBarSecondary } from './ui/inputs';
import { CircleUserRound } from 'lucide-react';
import { PillButton } from './ui/pillButtons';
import { useRouter } from 'next/navigation';

const Navigation = () => {

    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <span className='py-6 justify-center flex gap-6 items-center md:hidden'>
                <SearchBarPrimary
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder='Search...'
                />
                <button className='bg-[--primary] hover:bg-[--primary-hover] p-2 rounded-full'>
                    <CircleUserRound className='size-7 text-[--text-secondary]' />
                </button>
            </span>
            {/* Desktop size */}
            <span className='py-4 hidden md:flex justify-between items-center px-8 border-b'>
                <h2>Nestify</h2>
                <div className='flex gap-4 items-center'>
                    <PillButton
                        label='Log in'
                        icon={<CircleUserRound />}
                        onClick={() => router.push('/log-in')}
                    />
                    <SearchBarSecondary
                        value={searchValue}
                        onChange={handleSearch}
                        placeholder='Search...'
                    />
                </div>
            </span>
        </>
    );
};

export default Navigation;
