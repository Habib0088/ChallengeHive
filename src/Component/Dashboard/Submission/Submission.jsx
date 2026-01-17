import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Countdown from "../../Countdown/Countdown";
import Loading from "../../Loading/Loading";

const Submission = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  
  const handleWinner = (participant) => {
    axiosSecure
      .patch(`/declareWinner/${id}?email=${participant?.participantEmail}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast("Winner has been declared");
          refetch();
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  
  const { isLoading, refetch, data: submissions = [] } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const isDeadlineActive = new Date(submissions.deadline) > new Date();
  const hasWinner = submissions?.winner;
  const totalParticipants = submissions?.participants?.length || 0;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Contest Submissions
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {submissions.name || 'Contest'} - Manage participant submissions
              </p>
            </div>
          </div>
          
          {/* Contest Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalParticipants}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {submissions?.participants?.filter(p => p.taskInfo?.length > 0).length || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {isDeadlineActive ? 'Active' : 'Ended'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {hasWinner ? '1' : '0'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Winner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contest Deadline Info */}
          {isDeadlineActive && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange-800 dark:text-orange-200 font-medium">Contest is still active</p>
                  <div className="text-orange-700 dark:text-orange-300">
                    <Countdown
                      deadline={submissions?.deadline}
                      className="font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submissions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          {totalParticipants === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                No submissions yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Participants haven't submitted their work yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">#</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Participant</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Submission</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Status/Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {submissions?.participants?.map((participant, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <th className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{i + 1}</th>
                      
                      {/* Participant Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              {participant?.participantName?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {participant?.participantName}
                          </span>
                        </div>
                      </td>
                      
                      {/* Email */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {participant?.participantEmail}
                        </span>
                      </td>
                      
                      {/* Task Submission */}
                      <td className="px-6 py-4">
                        {participant?.taskInfo?.[0]?.info ? (
                          <div className="max-w-xs">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-left">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                {participant?.taskInfo?.[0]?.info}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mt-2">
                              Submitted
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                            No submission
                          </span>
                        )}
                      </td>
                      
                      {/* Status/Action */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {isDeadlineActive ? (
                            <div className="text-center">
                              <div className="text-orange-600 dark:text-orange-400 font-medium text-sm mb-1">
                                Contest Active
                              </div>
                              <Countdown
                                deadline={submissions?.deadline}
                                className="text-red-500 dark:text-red-400 font-bold text-xs"
                              />
                            </div>
                          ) : !hasWinner ? (
                            <button
                              onClick={() => handleWinner(participant)}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm"
                            >
                              <svg className="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              Declare Winner
                            </button>
                          ) : submissions?.winner === participant?.participantEmail ? (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <span className="font-bold text-sm">🏆 WINNER</span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                              Participant
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Winner Announcement */}
        {hasWinner && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  🎉 Winner Declared!
                </h3>
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  The contest has ended and a winner has been selected. Congratulations to the winner!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Submission Management Guide
              </h3>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                <li>• Review all participant submissions before declaring a winner</li>
                <li>• Winners can only be declared after the contest deadline has passed</li>
                <li>• Once a winner is declared, the decision cannot be undone</li>
                <li>• Ensure fair evaluation of all submissions before making a decision</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
