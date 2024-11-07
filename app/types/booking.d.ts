import { Accommodation } from './accommodation';

export type Booking = {
    id: string;
    chosenAccommodation: Accommodation;
    guests: number;
    fromDate: string;
    toDate: string;
};
