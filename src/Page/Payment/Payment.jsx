import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    const{total} = useParams()
    console.log(total)
    return (
        <div>
            <div >
                    <Elements stripe={stripePromise} >
                        <Checkoutform price={total}></Checkoutform>
                    </Elements>
                </div>
        </div>
    );
};

export default Payment;