import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LabelButton = () => {

    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
            className='cursor-pointer absolute left-6 top-8 z-10 p-3 bg-[--secondary] w-fit rounded-full transition-all hover:bg-[--secondary-hover] hover:scale-110'>
            <X className='size-5 text-[--text-secondary]' />
        </div>
    );
};

export default LabelButton;
