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
        <div>
            <span className='py-6 justify-center flex gap-6 items-center md:hidden'>
                <SearchBarPrimary
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder='Search...'
                />
                <button className='bg-[--primary] hover:bg-[--primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5'>
                    <CircleUserRound className='size-6 text-[--text-secondary]' />
                    <p className='text-[--text-secondary]'>My account</p>
                </button>
            </span>
            {/* Desktop size */}
            <span className='py-4 hidden md:flex justify-between items-center px-8 border-b'>
                <h2 className='cursor-pointer transition-all hover:translate-y-0.5' onClick={() => router.push('/')}>Nestify</h2>
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
        </div>
    );
};

export default Navigation;
