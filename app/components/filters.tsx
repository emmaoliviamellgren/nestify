import { FilterPillButton } from './ui/pillButtons';
import { iconMappingToNode } from './ui/propertiesIcons';
import { useSearchAndFilter } from 'contexts/searchAndFilterProvider';

const Filters = () => {
    const { filterLabels, filters, handleSetFilter } =
        useSearchAndFilter();

    return (
            <div className='flex gap-3 items-center justify-center flex-wrap max-w-screen py-2 md:py-6'>
                {filterLabels.map((label) => (
                    <FilterPillButton
                        key={label}
                        icon={iconMappingToNode[label]}
                        label={label}
                        onClick={() => handleSetFilter(label)}
                        className={
                            filters.includes(label)
                                ? 'bg-[--warning] text-[--text-secondary] outline outline-white'
                                : ''
                        }
                    />
                ))}
            </div>
    );
};

export default Filters;
