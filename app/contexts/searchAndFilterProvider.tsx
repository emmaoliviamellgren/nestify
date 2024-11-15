'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { iconMappingToNode } from '@/components/ui/propertiesIcons';
import { Accommodation } from '@/types/accommodation';
import { useAccommodation } from './accommodationProvider';

type SearchAndFilterContextType = {
    filteredAccommodations: Accommodation[];
    filterLabels: string[];
    filters: string[];
    search: string;
    handleSetFilter: (filter: string) => void;
    handleSearch: (search: string) => void;
};

export const SearchAndFilterContext = createContext<
    SearchAndFilterContextType | undefined
>(undefined);

const SearchAndFilterContextProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { accommodations } = useAccommodation();
    const [filteredAccommodations, setFilteredAccommodations] =
        useState<Accommodation[]>(accommodations);

    const [filters, setFilters] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        applyFilters();
    }, [filters]);

    useEffect(() => {
        applySearch();
    }, [search]);

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const applySearch = () => {
        if (!search) {
            setFilteredAccommodations(accommodations);
            return;
        }

        const searched = accommodations.filter(
            (accommodation) =>
                accommodation.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                accommodation.location
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );

        setFilteredAccommodations(searched);
    };
    const handleSetFilter = (filter: string) => {
        setFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter((f) => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    const applyFilters = () => {
        if (filters.length === 0) {
            setFilteredAccommodations(accommodations);
            return;
        }

        const filtered = accommodations.filter((accommodation) => {
            return filters.every((filter) =>
                accommodation.properties?.includes(filter)
            );
        });

        setFilteredAccommodations(filtered);
    };

    const filterLabels = Object.keys(iconMappingToNode);

    const value = {
        filteredAccommodations,
        filterLabels,
        filters,
        search,
        handleSetFilter,
        handleSearch,
    };

    return (
        <SearchAndFilterContext.Provider value={value}>
            {children}
        </SearchAndFilterContext.Provider>
    );
};

export default SearchAndFilterContextProvider;

export const useSearchAndFilter = () => {
    const context = useContext(SearchAndFilterContext);
    if (!context) {
        throw new Error(
            'useSearchAndFilter must be used within a SearchAndFilterContextProvider'
        );
    }
    return context;
};
