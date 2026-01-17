import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaUser, FaTrophy } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import Countdown from "../Countdown/Countdown";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
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
  
  const { data: winner } = useQuery({
    queryKey: ['winner', contest?.winner],
    enabled: !!contest?.winner,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winnerForDetails?email=${contest.winner}`);
      return res.data;
    }
  });
  console.log(winner);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const isContestEnded = new Date(contest?.deadline) < new Date();
  const isPaid = participantInfo?.paymentStatus === "paid";
  const hasSubmitted = participantInfo?.taskInfo;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Contest Details
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about this contest
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Contest Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Contest Banner */}
          <div className="relative h-64 md:h-80">
            <img
              src={contest?.photoURL}
              alt={contest?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Contest Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                isContestEnded 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {isContestEnded ? 'Contest Ended' : 'Active Contest'}
              </span>
            </div>

            {/* Contest Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {contest?.name}
              </h2>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {contest?.contestType}
                </span>
              </div>
            </div>
          </div>

          {/* Contest Info */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaUser className="text-blue-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {contest?.participants?.length || 0}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaTrophy className="text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${contest?.prizeMoney}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prize Money</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${contest?.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entry Fee</p>
              </div>
            </div>

            {/* Countdown */}
            {!isContestEnded && (
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    Time Remaining
                  </h3>
                  <Countdown
                    deadline={contest?.deadline}
                    className="text-2xl font-bold text-orange-600 dark:text-orange-400"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contest Description
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {contest?.description}
                </p>
              </div>
            </div>

            {/* Task Instructions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contest Instructions
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  {contest?.taskInstruction}
                </p>
              </div>
            </div>

            {/* Submission Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Submit Your Work
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                {isPaid && hasSubmitted ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                      Submission Complete!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      You have already submitted your work for this contest.
                    </p>
                  </div>
                ) : isPaid ? (
                  <form onSubmit={handleSubmit(handleSendTaskInfo)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Submission Links (GitHub, Demo, Paper, etc.)
                      </label>
                      <input
                        {...register("info", { required: "Submission link is required" })}
                        type="text"
                        placeholder="Enter your submission URL or details"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                    >
                      Submit Your Work
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                      Payment Required
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      You need to pay the entry fee before you can submit your work.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Winner Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contest Winner
              </h3>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-dashed border-yellow-300 dark:border-yellow-700">
                {winner ? (
                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative">
                      <img 
                        className="w-16 h-16 rounded-full border-4 border-yellow-400 shadow-lg" 
                        src={winner?.photoURL} 
                        alt={winner?.displayName}
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                        🏆 {winner?.displayName}
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                        Contest Winner
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                      Winner Announcement Pending
                    </h4>
                    <p className="text-yellow-600 dark:text-yellow-400">
                      The winner will be announced after the contest ends.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!contest?.winner && (
              <div className="pt-6">
                {!isPaid ? (
                  <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                  >
                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Pay Entry Fee - ${contest?.price}
                  </button>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 dark:text-green-300 font-semibold">
                        Payment Completed - You're registered!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Contest Guidelines
              </h3>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                <li>• Pay the entry fee to participate in the contest</li>
                <li>• Submit your work before the deadline</li>
                <li>• Follow all contest rules and instructions</li>
                <li>• Winner will be announced after the contest ends</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
