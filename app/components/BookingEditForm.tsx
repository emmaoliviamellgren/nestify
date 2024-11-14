'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react';
import { OutlinedButtonWithIcon } from './ui/buttons';
import { MdEdit } from 'react-icons/md';
import BookingForm from './BookingForm';
import { useBooking } from 'contexts/bookingProvider';

const BookingEditForm = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setIsEditingBooking } = useBooking();

    const handleOpen = () => {
        setIsEditingBooking(true);
        onOpen();
    };

    const handleClose = () => {
        setIsEditingBooking(false);
        onOpenChange();
    };

    return (
        <>
            <OutlinedButtonWithIcon
                icon={<MdEdit />}
                onClick={handleOpen}
                label='Edit'
                className='mx-auto md:mx-0 h-9 flex justify-center items-center gap-2'
            />
            <Modal
                isOpen={isOpen}
                onOpenChange={handleClose}>
                <ModalContent>
                    {(onClose) => (
                        <div className='py-4'>
                            <ModalHeader className='flex flex-col gap-1'>
                                Edit trip details
                            </ModalHeader>
                            <ModalBody>
                                <BookingForm onClose={onClose}/>
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default BookingEditForm;
