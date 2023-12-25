import React, { useEffect, useState } from 'react';
import UseMobiles from '../../Hook/UseMobiles';
import axios from 'axios';

const Store = ({ brandName }) => {
    const [mobiles, setmobiles] = useState([])

    useEffect(() => {
        axios.get(`https://mobile-store-server-site.vercel.app/mobiles`)
            .then(res => {
                console.log(res)
                setmobiles(res.data)
            })

    }, [])

    //const category = mobile?.filter(item => item.brandName == brandName)
    //     setMobile(category)
    return (
        <div>
            {/* Brand Heading */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        {
                            brandName ?
                                `${brandName} Collection`
                                :
                                ""
                        }
                    </span>
                </h1>
            </div>
            {/* Display Mobiles */}
            <div className=' lg:flex lg:items-center lg:justify-center pt-20'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-3 '>
                    {mobiles?.filter(item => item.brandName == brandName)?.map(item =>
                        <div key={item._id} className="card w-96 lg:w-80 bg-base-100 shadow-xl mb-4">
                            <div className="card-body">
                                <h2 className="card-title">{item.mobileName}</h2>
                            </div>
                            <figure><img src={item.imageURL} alt={item.mobileName} /></figure>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Store;