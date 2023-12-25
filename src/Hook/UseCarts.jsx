import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Authprovider';

const UseCarts = () => {
    const {user} = useContext(AuthContext)
    //console.log(user)
    const {data:carts=[],ispending,refetch} = useQuery({
        queryKey:[user],
        queryFn: async()=>{
            const res = await axios.get(`https://mobile-store-server-site.vercel.app/carts?user=${user.email}`)
         console.log(res)
            return res.data
        }
    })
    return [carts,ispending,refetch]
};

export default UseCarts;