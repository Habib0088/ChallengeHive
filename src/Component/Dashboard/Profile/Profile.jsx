import React from 'react';
import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import { Link } from 'react-router';

const Profile = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:userProfile}=useQuery({
        queryKey:['users',user.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/profile?email=${user.email}`)
            return res.data
        }
    })

    const {data:count}=useQuery({
        queryKey:['countWinning',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure(`/user/stats?email=${user?.email}`)
            return res.data
        }
    })
    console.log(count);
    
    return (
        <div className='p-4'>
            <div className='max-w-8/12 mx-auto space-y-3 text-center rounded-md p-4 shadow-2xl bg-gray-200'>
            <img  className='w-[150px] h-[150px] rounded-full mx-auto' referrerPolicy='no-referrer' src={userProfile?.photoURL} alt="Profile Pic" />
                <h1 className='font-bold text-3xl'>{userProfile?.displayName}</h1>
                <h1 className='font-bold text-xl'>{userProfile?.Bio || `Hi,I'm ${userProfile?.displayName}.I'm here as  ${userProfile?.role}`} </h1>
                <div className='flex justify-around items-center '>
                    <h2 className='font-bold text-xl'>{userProfile?.email}</h2>
                    <h2 className='font-bold text-xl'>Role : {userProfile?.role}</h2>
                </div>
               <Link to='/dashboard/updateProfile'> <button className='btn bg-blue-600 text-white font-bold'>Update Profile</button></Link>
            </div>
        </div>
    );
};

export default Profile;