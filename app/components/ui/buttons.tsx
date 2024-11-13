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
            className={` ${className} text-[--text-secondary] bg-[--primary] w-fit px-5 py-1.5 rounded-lg flex items-center gap-1 ${
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
export const OutlinedButton = ({
    label,
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
            {label}
        </button>
    );
};
