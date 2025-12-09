import React from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const MyContestPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: contests = [] } = useQuery({
    queryKey: ["myContest"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myContest?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>My Contest : {contests.length}</h1>
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead className="">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={contest.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    
                   <div>
                      <div className="font-bold">{contest?.contestType}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {contest.name}
                
                </td>
                <td>{contest.status}</td>
                <th>
                  <button className="btn btn-primary text-black">Edit</button>
                  <button className="btn btn-primary text-black ml-2">Delete</button>
                  <button className="btn btn-primary text-black ml-2">Submission</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContestPage;
