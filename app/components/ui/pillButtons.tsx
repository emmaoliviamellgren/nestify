type PillButtonProps = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
};

export const PillButton = ({ label, icon, onClick }: PillButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='min-w-fit w-fit text-sm text-[--text-secondary] bg-[--primary] hover:bg-[--primary-hover]  h-[33px] pl-3.5 pr-4 rounded-full flex items-center gap-1'>
            {icon}
            {label}
        </button>
    );
};

export const FilterPillButton = ({ label, icon, onClick }: PillButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='text-sm text-[--text-primary] outline outline-1 outline-[--primary] transition hover:translate-y-0.5 w-fit aspect-square md:aspect-auto md:h-[33px] md:pl-3.5 md:pr-4 p-2 rounded-full flex items-center gap-1 last:bg-[--primary] last:text-[--text-secondary] last:outline-[--background]'>
            {icon}
            <span className='caption hidden md:block'>{label}</span>
        </button>
    );
};
