// Define the type for button props
type ButtonProps = {
    label: string;
    onClick?: () => void;
};

// Primary Button
export const PrimaryButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='button text-[--text-secondary] bg-[--primary] w-fit px-5 py-1.5 rounded-lg hover:bg-[--primary-hover] transition-colors duration-75'>
            {label}
        </button>
    );
};

// Secondary Button
export const SecondaryButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='button text-[--text-secondary] bg-[--secondary] w-fit px-5 py-1.5 rounded-lg hover:bg-[--secondary-hover] transition-colors duration-75'>
            {label}
        </button>
    );
};

// Disabled Button
export const DisabledButton = ({ label }: ButtonProps) => {
    return (
        <button
            disabled
            className='button text-[--text-secondary] bg-[--disabled]  w-fit px-5 py-1.5 rounded-lg'>
            {label}
        </button>
    );
};

// Warning Button
export const WarningButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='button text-[--text-secondary] bg-[--warning] w-fit px-5 py-1.5 rounded-lg hover:bg-[--warning-hover] transition-colors duration-75'>
            {label}
        </button>
    );
};
