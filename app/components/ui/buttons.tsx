type ButtonProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    customWidth?: boolean;
};

// Primary Button with icon
export const PrimaryButtonWithIcon = ({
    label,
    icon,
    onClick,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='text-[--text-secondary] bg-[--primary] w-fit px-5 py-1.5 rounded-lg hover:bg-[--primary-hover] flex items-center gap-1'>
            <span className='icon'>{icon}</span>
            {label}
        </button>
    );
};

// Primary Button
export const PrimaryButton = ({ label, onClick, type, customWidth }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`text-[--text-secondary] bg-[--primary] px-5 py-1.5 rounded-lg hover:bg-[--primary-hover] ${customWidth ? '' : 'min-w-96'}`}>
            {label}
        </button>
    );
};

// Secondary Button
export const SecondaryButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='text-[--text-secondary] bg-[--secondary] w-fit min-w-96 px-5 py-1.5 rounded-lg hover:bg-[--secondary-hover]'>
            {label}
        </button>
    );
};

// Disabled Button
export const DisabledButton = ({ label }: ButtonProps) => {
    return (
        <button
            disabled
            className='text-[--text-secondary] bg-[--disabled] w-fit min-w-96 px-5 py-1.5 rounded-lg'>
            {label}
        </button>
    );
};

// Warning Button
export const WarningButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='text-[--text-secondary] bg-[--warning] w-fit min-w-96 px-5 py-1.5 rounded-lg hover:bg-[--warning-hover]'>
            {label}
        </button>
    );
};

// Outlined Button
export const OutlinedButton = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='text-[--secondary] outline outline-[--secondary] hover:opacity-70 w-fit min-w-96 px-5 py-1.5 rounded-lg'>
            {label}
        </button>
    );
};