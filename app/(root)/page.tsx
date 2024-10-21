'use client';

import { useState } from 'react';
import Filters from '../components/filters';
import { SearchBarPrimary } from '../components/ui/inputs';
import AccommodationGrid from '../components/accommodationGrid';
import { Accommodation } from '../types/accommodation';

const accommodations: Accommodation[] = [
    {
        id: '1',
        title: 'Cozy Cabin',
        description: 'A beautiful cabin in the woods.',
        price: 120,
        location: 'Lake Tahoe, CA',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '2',
        title: 'Modern Apartment',
        description: 'An apartment with a city view.',
        price: 200,
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '3',
        title: 'Beach House',
        description: 'A beach house with a beautiful ocean view.',
        price: 150,
        location: 'Miami, FL',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '4',
        title: 'Mountain Lodge',
        description: 'A cozy lodge in the mountains.',
        price: 180,
        location: 'Aspen, CO',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: '5',
        title: 'Luxury Villa',
        description: 'A luxurious villa with a private pool.',
        price: 300,
        location: 'Los Angeles, CA',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const LandingPage = () => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div className='hidden md:block md:py-6 md:px-16'>
                <div className='py-9'>
                    <h1>Rent your dream home</h1>
                    <h2>Where do you want to go?</h2>
                </div>
                <SearchBarPrimary
                    onChange={handleChange}
                    value={value}
                />
            </div>
            <Filters />
            <div className='px-4 md:px-12 mx-auto'>
                <p className='title py-6'>Featured</p>
                <p className='hidden md:block'>
                    Take a look at our most popular accommodations!
                </p>
                <AccommodationGrid accommodations={accommodations} />
            </div>
        </>
    );
};

export default LandingPage;
