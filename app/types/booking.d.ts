import { Accommodation } from './accommodation';

export type PastBooking = {
    chosenAccommodation: Accommodation;
    guests: number;
    fromDate: Date;
    toDate: Date;
};

export type Booking = {
    chosenAccommodation: Accommodation;
    guests: number;
    fromDate: Date;
    toDate: Date;
};
