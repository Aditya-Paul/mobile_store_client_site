import React from 'react';
import Banner from '../../Component/Banner/Banner';
import Brands from '../../Component/Brands/Brands';
import Store from '../Store/Store';

const Home = () => {
    return (
        <div className='pt-24'>
            {/* Banner Part */}
            <Banner />

            {/* Brand Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        Brands Collection
                    </span>
                </h1>
                <p className="text-gray-600 font-medium">Discover our amazing brands</p>
            </div>

            {/* Display Brands */}
            <div className='pl-0 md:pl-0 '>
                <Brands></Brands>
            </div>
            
        </div>
    );
};

export default Home;