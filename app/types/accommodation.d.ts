export type Accommodation = {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    properties?: React.ReactNode[];
};
