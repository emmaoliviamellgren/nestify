type ButtonProps = {
    label: string;
    className?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    customWidth?: boolean;
    id?: string;
};

// Primary Button with icon
export const PrimaryButtonWithIcon = ({
    label,
    icon,
    children,
    onClick,
    id,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            id={id}
            onClick={onClick}
            className={` ${className} text-[--text-secondary] bg-[--primary] hover:bg-[--primary-hover] px-5 py-1.5 rounded-lg flex items-center gap-1 ${
                !customWidth && 'min-w-96'
            }`}>
            <span className='icon'>{icon}</span>

            {children || label}
        </button>
    );
};

// Primary Button
export const PrimaryButton = ({
    label,
    onClick,
    type,
    customWidth,
    className,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} text-[--text-secondary] bg-[--primary] px-5 py-1.5 rounded-lg hover:bg-[--primary-hover] ${
                !customWidth && 'min-w-96'
            }`}>
            {label}
        </button>
    );
};

// Secondary Button
export const SecondaryButton = ({
    label,
    onClick,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${className} text-[--text-secondary] bg-[--secondary] px-5 py-1.5 rounded-lg hover:bg-[--secondary-hover] ${
                !customWidth && 'min-w-96'
            }`}>
            {label}
        </button>
    );
};

// Disabled Button
export const DisabledButton = ({
    label,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            disabled
            className={`${className} text-[--text-secondary] bg-[--disabled] px-5 py-1.5 rounded-lg ${
                !customWidth && 'min-w-96'
            }`}>
            {label}
        </button>
    );
};

// Disabled Button
export const LoadingButton = ({
    label,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            className={`${className} text-[--text-secondary] bg-[--disabled] px-5 py-1.5 rounded-lg ${
                !customWidth && 'min-w-96'
            }`}
            disabled>
            <svg
                className='animate-spin size-4 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            {label}
        </button>
    );
};

// Warning Button
export const WarningButton = ({
    label,
    onClick,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${className} text-[--text-secondary] bg-[--warning] px-5 py-1.5 rounded-lg hover:bg-[--warning-hover] ${
                !customWidth && 'min-w-96'
            }`}>
            {label}
        </button>
    );
};

// Outlined Button
export const OutlinedButtonWithIcon = ({
    label,
    icon,
    onClick,
    className,
    customWidth,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={` ${className} text-[--secondary] outline outline-[--secondary] hover:outline-[--text-secondary] hover:text-[--text-secondary] hover:shadow-lg hover:bg-[--secondary] transition-all px-5 py-1.5 rounded-lg ${
                !customWidth && 'min-w-96'
            }`}>
            <span className='icon'>{icon}</span>
            {label}
        </button>
    );
};
