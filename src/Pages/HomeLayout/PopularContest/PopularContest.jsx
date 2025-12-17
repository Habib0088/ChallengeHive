import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";

const PopularContest = () => {
    const axiosSecure=useAxiosSecure()
    const {data:contests=[]}=useQuery({
        queryKey:['popularContests'],
        queryFn:async()=>{
            const res=await axiosSecure('/contestsPopular')
            return res.data
        }
    })
    console.log(contests);
    
  return (
    <div className="md:py-16  mx-auto bg-blue-300 ">
        <h1 className="text-center font-bold text-6xl pb-4">Popular Contests</h1>
       <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
         {
            contests.map(contest=> <div className="card bg-sky-100 shadow-sm hover:scale-[1.02] transition duration-500">
        <figure className="px-5 pt-5">
          <img
            src={contest?.photoURL}
            alt="Contest"
            className="rounded-xl h-[200px] w-full"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title font-bold">{contest?.name}</h2>
          <h2>Participated: {contest?.participants.length}</h2>
          <p>
           {contest?.description.slice(0,100)}{contest?.description.length>100?'...' :'' }
          </p>
          <div className="">
           <Link to={`/contestDetails/${contest._id}`}> <button className="btn btn-primary text-black w-full">Details</button></Link>
          </div>
        </div>
      </div>)
        }
       </div>
       <div className="flex justify-center pt-7">
        <Link to='/allContests'><button  className="btn text-md">Show All</button></Link>
       </div>
       
     
    </div>
  );
};

export default PopularContest;
