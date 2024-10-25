import { Search } from 'lucide-react';

// Define the type for the input props
type InputProps = {
    value?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

// Regular Input
export const Input = ({ value, type, placeholder }: InputProps) => {
    return (
        <input
            type={type || 'text'}
            value={value}
            placeholder={placeholder || 'Enter text'}
            className='input w-fit min-w-96 h-[35px] md:h-[40px] rounded-lg outline outline-offset-2 outline-1 outline-[--primary] py-1.5 px-3 placeholder-opacity-30 text-opacity-30'
        />
    );
};

// Search Bar Input
export const SearchBarPrimary = ({
    value,
    onChange,
    placeholder,
}: InputProps) => {
    return (
        <div className='relative flex items-center'>
            <span className='absolute left-2 bg-[--primary] rounded-full'><Search className='size-4 text-[--text-secondary] m-[0.4rem] md:m-2'/></span>
            <input
                type='search'
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Search...'}
                className='input w-[250px] md:w-[350px] h-[45px] md:h-[50px] outline outline-offset-2 outline-1 outline-[--primary] rounded-lg py-1.5 pl-[3rem] pr-3 placeholder-opacity-30 text-opacity-30'
            />
        </div>
    );
};

export const SearchBarSecondary = ({
    value,
    onChange,
    placeholder,
}: InputProps) => {
    return (
        <div className='relative flex items-center'>
            <span className='absolute left-2'><Search className='size-5'/></span>
            <input
                type='search'
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Search...'}
                className='input w-[250px] md:w-[350px] h-[35px] md:h-[40px] outline outline-offset-2 outline-1 outline-[--primary] rounded-lg py-1.5 pl-10 pr-3 placeholder-opacity-30 text-opacity-30'
            />
        </div>
    );
};
