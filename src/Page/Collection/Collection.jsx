import React, { useContext, useEffect, useState } from 'react';
import UseMobiles from '../../Hook/UseMobiles';
import { FaCamera, FaMemory } from "react-icons/fa";
import { GiProcessor, GiWaterRecycling } from "react-icons/gi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
const Collection = () => {
    const { user } = useContext(AuthContext)
    //const [value, setvalue] = useState("2000")
    const [asending, setasending] = useState(true)
    const [searchvalue, setSearchvalue] = useState('')
    const [mobiles,isLoading] = UseMobiles(asending,searchvalue)
    //const [mobile,setmobile] = useState(mobiles)

    // useEffect(()=>{
    //     console.log(searchvalue)
    //     axios.get(`https://mobile-store-server-site.vercel.app/mobiles?brandName=${searchvalue}`)
    //     .then(res=>{
    //         console.log(res)
    //         setmobile(res.data)
    //     })
    // },[searchvalue])

    const handleAddCart = async (id) => {
        const res = await axios.get(`https://mobile-store-server-site.vercel.app/mobiles/${id}`)
        const mobileinfo = {
            mobileName: res.data.mobileName,
            brandName: res.data.brandName,
            price: res.data.price,
            camera: res.data.camera,
            type: res.data.type,
            processor: res.data.processor,
            ram: res.data.ram,
            rom: res.data.rom,
            os: res.data.os,
            imageURL: res.data.imageURL,
            user: user.email,
        }
        console.log(res)
        if (res) {
            const mobileName = res.data.mobileName
            axios.post(`https://mobile-store-server-site.vercel.app/carts`, mobileinfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire("Good job!", `${mobileName} is add to your cart, Welcome`, "success");
                    }
                })
        }
    }

    const handlesearch = (e) => {
        e.preventDefault();
        const name = e.target.value.value
        console.log(name)
        setSearchvalue(name)
    }
    // if(isLoading) "loading"
    
    return (
        <div className='flex flex-col items-center justify-center pt-20'>
            <div className='flex flex-row items-center gap-4'>
                {/* <div>
                    <button className='btn' onClick={()=>setvalue("500")}>500</button>
                    <button className='btn' onClick={()=>setvalue("800")}>800</button>
                </div> */}
                <div>
                    <form onSubmit={handlesearch} action="">
                        <input name='value' className=' border-2' type="text" />
                        <button className='btn'>Search</button>
                    </form>
                </div>
                <div>

                    {/* <button onClick={() => setasending(!asending)} className='btn '>
                        {
                            asending ? 
                             "High to low"
                             :
                             "Low to High"
                        }
                    </button> */}
                    <button className='btn btn-primary' onClick={()=>setasending(!asending)}>
                        {
                            asending ? 
                            "High to Low"
                            :
                            "Low to High"
                        }
                    </button>

                </div>
            </div>
            {/* Display Mobiles */}
            <div className=' lg:flex lg:items-center lg:justify-center '>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-3 '>
                    {Array.isArray(mobiles) && mobiles?.map(item =>
                        <Link to>
                            <div key={item._id} className="card w-96 lg:w-80 bg-base-100 shadow-xl mb-4">
                                <div className="card-body flex flex-row justify-between">
                                    <h2 className="card-title">{item.mobileName}</h2>
                                    <h2 className="card-title text-purple-500">${item.price}</h2>

                                </div>
                                <figure><img src={item.imageURL} alt={item.mobileName} /></figure>
                                <div className="card-body flex justify-start">
                                    <h2 className="card-title"><FaCamera />{item.camera}</h2>
                                    <h2 className="flex flex-row gap-2 items-center text-center text-purple-500"><GiProcessor />{item.processor}</h2>
                                    <h2 className="card-title"><FaMemory />{item.ram}</h2>
                                    <h2 className="card-title text-purple-500"><GiProcessor />{item.rom}</h2>
                                    <h2 className=" flex flex-row gap-2 items-center text-center"><GiWaterRecycling />{item.os}</h2>

                                </div>
                                <button onClick={() => handleAddCart(item._id)} className='btn btn-primary'>Add Cart</button>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Collection;