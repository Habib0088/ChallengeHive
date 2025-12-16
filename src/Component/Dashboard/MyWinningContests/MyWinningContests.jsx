import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const MyWinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading,data: myWinningContests = [] } = useQuery({
    queryKey: ["myWinningContests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myWinningContests?email=${user.email}`
      );
      return res.data;
    },
  });
if(isLoading){
    return <Loading></Loading>
}
  return (
    <div className="bg-blue-400 md:py-7">
      {/* Total {myWinningContests.length} */}
      <div className="flex flex-col gap-4">
        {myWinningContests.map((contest) => (
          <div className="hero bg-red-500 text-white rounded-md min-h-[300px] max-w-11/12 shadow-2xl mx-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src={contest?.photoURL}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-bold">{contest.name}</h1>
                <h3 className="font-bold">Type: {contest?.contestType}</h3>
                <p className="py-6">
                  {contest?.description}
                </p>
                <button className="btn btn-primary text-black">You Have Got : {contest.prizeMoney} $</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContests;
