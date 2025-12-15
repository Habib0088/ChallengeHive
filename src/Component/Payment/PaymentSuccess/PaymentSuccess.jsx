import React, { useEffect } from 'react';
import {  useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure=useAxiosSecure()
    const[searchParams]=useSearchParams()
    const sessionId=searchParams.get('session_id')
    // console.log(sessionId);
    useEffect(()=>{
        axiosSecure.post('/paymentSuccess',{sessionId}).then(res=>console.log(res.data)
        )
    },[sessionId])
    
    return (
        <div className='flex h-[70vh] items-center bg-blue-300 justify-center'>
           <div>
             <h1 className='font-bold text-3xl text-center '>🤩🤩Congratulations,Your payment has been Successfull🤩🤩</h1>
           </div>
        </div>

     
    );
};

export default PaymentSuccess;