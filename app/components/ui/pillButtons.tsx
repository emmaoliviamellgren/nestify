type PillButtonProps = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
};

const PillButtons = ({ label, icon, onClick }: PillButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='pill-shadow text-sm text-[--text-secondary] bg-[--primary] w-fit h-[33px] pl-3.5 pr-4 rounded-full hover:bg-[--primary-hover] transition-colors duration-75 flex items-center gap-1'>
            <span className='icon'>{icon}</span>
            {label}
        </button>
    );
};

export default PillButtons;
