import { db } from '../../firebase.config';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';
import { User } from '@/types/user';

export const addNewUser = async (user: User): Promise<void> => {
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password || '', salt);

        await setDoc(doc(db, 'Users', user.id), {
            ...user,
            password: hashedPassword,
        });
        toast.success('User added successfully!');
    } catch (error) {
        toast.error('Failed to add user: ' + (error as Error).message);
    }
};

export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() } as User;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch user:', (error as Error).message);
        return null;
    }
};
