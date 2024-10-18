import { Accommodation } from "./accommodation";
import { User } from "./user";

export type Booking = {
    chosenAccommodation: Accommodation[];
    dates: string;
    guests: number;
    bookingByUser: User[];
};