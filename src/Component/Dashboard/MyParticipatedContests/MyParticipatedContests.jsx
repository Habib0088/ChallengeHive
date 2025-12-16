import React from 'react';
import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import Countdown from '../../Countdown/Countdown';
import Loading from '../../Loading/Loading';

const MyParticipatedContests = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const{isLoading,data:myContests=[]}=useQuery({
        queryKey:['myParticipatedContests',user.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/myParticipatedContests?email=${user.email}`)
            return res.data
        }
        
        
    })
    console.log(myContests);
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>My contests{myContests.length}</h1>
            {

            }
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Payment Status</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {myContests.map((contest,i)=> <tr>
        <th>{i+1}</th>
        <td>{contest?.name}</td>
        <td>{contest?.participants[0]?.paymentStatus}</td>
        <td><Countdown
              deadline={contest?.deadline}
              className="text-red-400 font-bold"
            /></td>
      </tr>)}
     

    </tbody>
  </table>
</div>

        </div>
    );
};

export default MyParticipatedContests;