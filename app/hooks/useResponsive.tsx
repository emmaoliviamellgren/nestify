import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
    {/* ------ laptop and bigger size ------ */}
    const bigScreen = useMediaQuery({ query: '(min-width: 768px)' });

    {/* ------ mobile size ------ */}
    const smallScreen = useMediaQuery({ query: '(max-width: 767px)' });

    return { bigScreen, smallScreen };
};

export default useResponsive;
