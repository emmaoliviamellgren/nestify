import {
    Accessibility,
    House,
    Building,
    PawPrint,
    Trees,
    Waves,
} from 'lucide-react';

const iconMappingToNode: { [key: string]: React.ReactNode } = {
    Accessible: <Accessibility />,
    Spacious: <House />,
    Apartment: <Building />,
    'Pet friendly': <PawPrint />,
    'Close to nature': <Trees />,
    'Near water': <Waves />,
};

export { iconMappingToNode };
