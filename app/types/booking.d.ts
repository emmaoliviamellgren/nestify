import { Accommodation } from './accommodation';

export type Booking = {
    id: string;
    chosenAccommodation: Accommodation;
    guests: string;
    fromDate: string;
    toDate: string;
};
