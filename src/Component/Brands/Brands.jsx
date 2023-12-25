import React, { useEffect, useState } from 'react';
import UseMobiles from '../../Hook/UseMobiles';
import { Link } from 'react-router-dom';
import Store from '../../Page/Store/Store';
import axios from 'axios';

const Brands = () => {
    // const [mobiles] = UseMobiles()
    const [name,setName] = useState("")
    const [mobiles, setmobiles] = useState([])

    useEffect(() => {
        axios.get(`https://mobile-store-server-site.vercel.app/mobiles`)
        .then(res=>{
            console.log(res)
            setmobiles(res.data)
        })
     
    }, [])
    // const uniqueBrands = [...new Set(mobiles.map((mobile) => mobile.brandName))];
    // console.log("unique",uniqueBrands)

    const uniqueBrandsWithImages = mobiles.reduce((result, mobile) => {
        const { brandName, imageURL } = mobile;

        //console.log(mobile)
        if (!result[brandName]) {
            result[brandName] = imageURL;
        }
        console.log(result)
        return result;
    }, {});

    // Convert the object to an array
    const uniqueBrandArray = Object.entries(uniqueBrandsWithImages);
    console.log(uniqueBrandArray)
    return (

        <div className=' lg:flex lg:flex-col lg:items-center lg:justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-3 '>
                {uniqueBrandArray?.map(item =>
                        <div onClick={()=>setName(item[0])} key={item[0]} className="card w-96 lg:w-80 bg-base-100 shadow-xl mb-4">
                            <div className="card-body">
                                <h2 className="card-title">{item[0]}</h2>
                            </div>
                            <figure><img src={item[1]} alt={item[0]} /></figure>
                        </div>
                )}
            </div>
            <Store brandName={name}></Store>
        </div>

    );
};

export default Brands;