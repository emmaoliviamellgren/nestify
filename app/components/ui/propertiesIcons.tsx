import { Accessibility, House, Building, PawPrint, Trees, Waves } from 'lucide-react'

const iconMappingToNode: { [key: string]: React.ReactNode } = {
    accessible: <Accessibility />,
    spacious: <House />,
    apartment: <Building />,
    petFriendly: <PawPrint />,
    closeToNature: <Trees />,
    nearWater: <Waves />,
};

export default iconMappingToNode;