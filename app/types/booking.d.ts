import { Accommodation } from './accommodation';

export type PastBooking = {
    id: string;
    chosenAccommodation: Accommodation;
    guests: number;
    fromDate: Date;
    toDate: Date;
};

export type Booking = {
    id: string;
    chosenAccommodation: Accommodation;
    guests: number;
    fromDate: Date;
    toDate: Date;
};
