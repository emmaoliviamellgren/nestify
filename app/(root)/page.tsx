'use client';

import { RegularInput } from '../components/ui/inputs';

const LandingPage = () => {
    return (
        <div className='flex gap-2 flex-col'>
            <RegularInput
                placeholder='Enter text'
                onChange={(e) => console.log(e.target.value)}
            />
        </div>
    );
};

export default LandingPage;
