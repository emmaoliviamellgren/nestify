export type Accommodation = {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
    properties?: React.ReactNode[];
};
