import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaUser, FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { Form, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import Countdown from "../Countdown/Countdown";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
// import { toast } from "../../Authentication/Registration/Toast/toast";
import { toast } from "../Authentication/Registration/Toast/toast";
const ContestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [participantInfo, setParticipantInfo] = useState(null);

  const {
    refetch,
    isLoading,
    data: contest,
  } = useQuery({
    queryKey: ["contestDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contestDetails/${id}`);
      // console.log(res.data);

      return res.data;
    },
  });
  console.log(contest);

  useEffect(() => {
    if (!contest?._id || !user?.email) return;
    axiosSecure
      .get(
        `/contest/participant?contestId=${contest?._id}&email=${user?.email}`
      )
      .then(
        (res) => setParticipantInfo(res.data)

        // console.log(res.data)
      );
  }, [contest?._id, contest?.email]);
  console.log(participantInfo);

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
  const { register, handleSubmit } = useForm();

  const handleSendTaskInfo = (taskData) => {
    console.log(taskData);
    taskData.email = user?.email;
    axiosSecure.patch(`/taskInfo/${contest._id}`, taskData).then((res) => {
      if (res.data.modifiedCount) {
        toast("Task Info has been Added");
        refetch();
      }
      console.log(res.data);
    });
  };
  const {data:winner}=useQuery({
    queryKey:['winner', contest?.winner],
    enabled: !!contest?.winner,
    
    queryFn:async()=>{
      const res= await axiosSecure.get(`/winnerForDetails?email=${contest.winner}`)
      return res.data
    }
  })
  console.log(winner);
  
  // console.log(contest?.participants?.paymentStatus);
  if (isLoading) {
    return <Loading></Loading>;
  }
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
            <div className="flex items-center gap-1 text-sm justify-center">
              <FaUser /> {contest?.participants?.length || 0}
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
            {...register("info")}
            type="text"
            placeholder="Submission Links (GitHub, Demo, Paper)"
            className="w-full p-2 rounded-md text-black"
          />
          {/* {
            contest?.participants?.paymentStatus==='paid'&&
            <>
           
            </>
          } */}
          {/* ++++=========================================== */}

          {/* ++++=========================================== */}
          {participantInfo?.paymentStatus === "paid" &&
          participantInfo?.taskInfo ? (
            <button className="btn"> Already Submitted</button>
          ) : (
            <>
              <button
                onClick={handleSubmit(handleSendTaskInfo)}
                className="mt-2 block bg-primary text-black w-[400px] mx-auto text-center  hover:bg-purple-700  font-bold px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </>
          )}
         
        </div>

        {/* Winner Circle */}
        <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-white/70 text-center flex items-center justify-around">
        {
          winner
          ?
          <>
           <h1 className="text-2xl font-bold text-white"> Winner : {winner?.displayName}</h1>
         <img className="w-10 h-10 rounded-full" src={winner?.photoURL} alt="" /></> 
          
          :
          <p className="text-2xl font-bold">Winner Info Will show Here </p>
        }
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
       {
        contest?.winner ||
        <>
           {participantInfo?.paymentStatus !== "paid" ? (
            <>
              <button
                onClick={handlePayment}
                className="btn btn-primary w-full text-black w-1/2 font-bold"
              >
                {" "}
                Pay {contest?.price} $
              </button>
            </>
          ) : (
            <button disabled className="btn bg-black-500 text red">
              Paid
            </button>
          )}
        </>
       }
         
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
