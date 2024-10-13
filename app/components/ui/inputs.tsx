// Define the type for the input props
type InputProps = {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

// Regular Input
export const RegularInput = ({ value, onChange, placeholder }: InputProps) => {
    return (
        <input
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder || 'Enter text'}
            className='w-[300px] border border-[--primary] rounded-lg outline-none py-1.5 px-3 placeholder-opacity-30 text-opacity-30'
        />
    );
};

// Search Bar Input
export const SearchBar = ({ value, onChange, placeholder }: InputProps) => {
    return (
        <input
            type='search'
            value={value}
            onChange={onChange}
            placeholder={placeholder || 'Search...'}
            style={{
                padding: '10px',
                border: '2px solid #0070f3',
                borderRadius: '5px',
                width: '100%',
            }}
        />
    );
};
