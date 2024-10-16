import { ChangeEvent, useState } from 'react';
import { SearchBarPrimary, SearchBarSecondary } from './ui/inputs';
import { CircleUserRound } from 'lucide-react';
import PillButtons from './ui/pillButtons';

const Navigation = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <main>
            <span className='md:hidden'>
                <SearchBarPrimary
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder='Search...'
                />
            </span>
            {/* Desktop size */}
            <span className='hidden md:flex justify-evenly items-center'>
                <div className='flex gap-2 items-center'>
                    <h2>Nestify</h2>
                    <PillButtons
                        label='Log in'
                        icon={<CircleUserRound />}
                    />
                </div>
                <SearchBarSecondary
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder='Search...'
                />
            </span>
        </main>
    );
};

export default Navigation;
