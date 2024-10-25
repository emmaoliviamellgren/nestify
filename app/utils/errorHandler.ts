import { toast } from 'react-hot-toast';

interface CustomError extends Error {
    code?: string;
}

export const handleError = (error: unknown, toastId: string) => {
    if (error instanceof Error) {
        const customError = error as CustomError;
        console.log(customError.message);
        const message = customError.code?.split('/')[1].replace(/-/g, ' ') || customError.message;
        toast.error(message, { id: toastId });
    } else {
        console.log('An unknown error occurred');
        toast.error('An unknown error occurred', { id: toastId });
    }
};