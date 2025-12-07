import React, { use } from 'react';
import { Query, useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import axios from 'axios';


const ApproveCreators = () => {
    const axiosSecure=useAxiosSecure()
    // এটা Database থেকে Data এনেছে Admin দারা approve বা reject করার জন্য
    const {data:creators=[]}=useQuery({
        queryKey:['approveCreators'],
        queryFn:async()=>{
            const res=await axiosSecure.get('http://localhost:3000/creators')
            return res.data
        }
    })
    console.log(creators);
    
    return (
        <div>
            <h1 className='te-xl font-bold'> Total Creators : {creators.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {creators.map((creator,i)=><tr>
        <th>{i+1}</th>
        <td>{creator.name}</td>
        <td>{creator.email}</td>
        <td>{creator.status}</td>
        <td>
            <button className="btn  bg-primary text-black">Approve</button>
            <button className="btn bg-primary text-black ms-2">Reject</button>
        </td>
      </tr>)}
      
    
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ApproveCreators;