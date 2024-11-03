import { Booking, PastBooking } from './booking';

export type User = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    activeBookings?: Booking[];
    pastBookings?: PastBooking[];
};
