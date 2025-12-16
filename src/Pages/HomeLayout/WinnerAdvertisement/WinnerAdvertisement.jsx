import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: winner } = useQuery({
    queryKey: ["winnerAdvertisement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winnerAdvertisement");
      return res.data;
    },
  });
  console.log(winner);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gray-300 md:py-18">
      <h1 className="text-6xl font-bold text-center">Last Winner</h1>
      <div className="hero  ">
        <div className="hero-content flex-col lg:flex-row-reverse text-center">
          <div className="text-start">
            <img
              src={winner?.[0]?.participants?.[0]?.participantPhoto}
              className="max-w-sm rounded-lg shadow-2xl flex-1"
            />
            <h1 className="font-bold text-2xl">Name : {winner?.[0]?.participants?.[0]?.participantName}</h1>
            <h1 className="font-bold text-2xl">Email : {winner?.[0]?.participants?.[0]?.participantEmail}</h1>
            <h2 className="font-bold ">Won : {winner?.[0]?.price} $</h2>
          </div>

          <div>
            <h1 className="text-5xl font-bold flex-1 capitalize">{winner?.[0]?.name}-{winner?.[0]?.contestType}</h1>
            <p className="py-6 font-bold">{winner?.[0]?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
