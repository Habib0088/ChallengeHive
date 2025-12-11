import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUser, FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import Countdown from "../Countdown/Countdown";
import useAuth from "../../hook/useAuth";

const ContestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();

  const { data: contest } = useQuery({
    queryKey: ["contestDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contestDetails/${id}`);
      console.log(res.data);

      return res.data;
    },
  });
  // console.log(contest);

  // Payment
  const handlePayment = async () => {
    const paymentInfo = {
      contestId: contest._id,
      contestName: contest.name,
      contestType: contest.contestType,
      contestPhoto: contest.photoURL,
      price: contest.price,
      prizeMoney: contest.prizeMoney,
      creatorEmail: contest.email,
      creatorName: contest.contestCreator,
      quantity: 1,
      participant: {
        participantEmail: user.email,
        participantName: user.displayName,
        participatePhoto: user.photoURL,
      },
    };
    // console.log(paymentInfo);
    
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <div className="min-h-screen flex items-center justify-center  bg-purple-700  text-black p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl max-w-3xl w-full p-2 md:p-6 space-y-6 border border-white/20">
        {/* Banner */}
        <div className="w-full h-[300px] rounded-lg overflow-hidden">
          <img
            src={contest?.photoURL}
            alt="Future Tech Challenge"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contest Info */}
        <div className="md:space-y-2">
          <div className="flex flex-col justify-between">
            <p className=" text-white md:text-2xl font-bold">
              Contest Name:- {contest?.name}
            </p>
            <h1 className="md:text-2xl font-bold text-white">
              Contest-Type:- {contest?.contestType}
            </h1>
          </div>
          <div className="flex justify-between items-center gap-4 text-white mt-2">
            <div className="flex items-center gap-1 text-sm">
              <FaUser /> 452 Participants
            </div>
            <div className="  items-center gap-1">
              <div className="flex items-center justify-between">
                <FaTrophy className="md:mr-1" /> Prize Money:{" "}
                {contest?.prizeMoney} $
              </div>
              <p className="">Contest Price: {contest?.price} $</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-white font-bold text-xl">Time Left - </h1>
            {/* <FaCalendarAlt /> {new Date(contest?.deadline).toLocaleString()} */}
            <Countdown
              deadline={contest?.deadline}
              className="text-yellow-400 font-bold"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/10 p-4 rounded-lg text-white/80 text-center">
          <h2 className="font-semibold mb-2 text-center text-2xl">
            Full Contest Description & Task Details
          </h2>
          <p className="text-sm">{contest?.description}</p>
        </div>

        {/* Submission Box */}
        <div className="bg-white/10 p-4 rounded-lg text-white/80 relative">
          <h2 className="font-semibold mb-2">Submit Your Task</h2>
          <input
            type="text"
            placeholder="Submission Links (GitHub, Demo, Paper)"
            className="w-full p-2 rounded-md text-black"
          />
          <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>

        {/* Winner Circle */}
        {/* <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-white/70 text-center">
          Winner will be announced here after the deadline!
        </div> */}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePayment}
            className="btn btn-primary text-black w-1/2 font-bold"
          >
            {" "}
            Pay {contest?.price} $
          </button>
          <button className="btn btn-disabled text-black w-1/2">
            Submit Task (Disabled)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
