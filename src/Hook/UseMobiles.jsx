import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const UseMobiles = (asending,searchvalue) => {
    //console.log(asending)
    const { data: mobiles = [], ispending, refetch } = useQuery({
        queryKey: [asending,searchvalue],
        queryFn: async () => {
            const res = await axios.get(`https://mobile-store-server-site.vercel.app/mobiles?sort=${asending? 'asc' : 'dec'}&search=${searchvalue}`)
            console.log(res)
            return res.data
        }
    })
    return [mobiles, ispending, refetch]
};

export default UseMobiles;