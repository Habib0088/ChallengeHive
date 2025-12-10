import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [] } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allContests");
      return res.data;
    },
  });
  return (
   <div className="bg-blue-100 md:py-6">
     <div className="w-11/12 mx-auto ">
      <h1 className="text-2xl font-bold mb-3"> Contest Available {contests.length}</h1>
     <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
         {contests.map((contest) => (
        <div className="card card-side bg-base-100 shadow-sm h-full rounded-md p-2">
          <figure  className="w-[250px]">
            <img className="object-fill"
              src={contest?.photoURL}
              alt="Contest"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Name: {contest?.name}</h2>
            <p className="font-bold">Contest Type : {contest?.contestType}</p>
            <p className="font-bold">Contest-Price  : {contest?.price} $</p>
            <p className="font-bold">Prize-Money  : {contest?.prizeMoney} $</p>
            
            <div className="card-actions justify-end ">
              <button className="btn btn-primary text-black">Details</button>
            </div>
          </div>
        </div>
      ))}
     </div>
    </div>
   </div>
  );
};

export default AllContests;
