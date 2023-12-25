import React from 'react';
import UseCarts from '../../Hook/UseCarts';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)
const Carts = () => {
    const [carts] = UseCarts()
    const total = carts.reduce((price, item) => price + item.price, 0)
    console.log(total)
    return (
        <div>
            <div>
                <div className='pt-16'>
                    <div className='text-center text-2xl font-bold'>My cart</div>
                    <div className="overflow-x-auto ">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    carts?.map((item, index) => {
                                        return <tr>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask  w-12 h-12">
                                                            <img src={item.imageURL} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.mobileName}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='bg-yellow-200 flex items-center justify-between'>

                        {
                            total < 1
                                ?

                                ""
                                :
                                <div className='flex items-center justify-end gap-20'>
                                    <h1>Total Amount: {total}</h1>
                                    <Link to={`/checkout/${total}`}>
                                        <button className="btn btn-sm btn-success">Payment</button>
                                    </Link>

                                </div>
                        }
                    </div>


                </div>


            </div>

        </div>

    );
};

export default Carts;