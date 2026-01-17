import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const MyWinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: myWinningContests = [] } = useQuery({
    queryKey: ["myWinningContests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myWinningContests?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Calculate total prize money
  const totalPrizeMoney = myWinningContests.reduce((total, contest) => total + (contest.prizeMoney || 0), 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Winning Contests
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Congratulations on your victories! 🎉
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{myWinningContests.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contests Won</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalPrizeMoney}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${myWinningContests.length > 0 ? Math.round(totalPrizeMoney / myWinningContests.length) : 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Prize</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winning Contests */}
        {myWinningContests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                No winning contests yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Keep participating in contests to win amazing prizes!
              </p>
              <a href="/allContests" className="inline-block">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Participate in Contests
                </button>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {myWinningContests.map((contest, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  {/* Winner Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-bold text-sm">WINNER</span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row">
                    {/* Contest Image */}
                    <div className="lg:w-1/3 relative">
                      <img
                        src={contest?.photoURL}
                        alt={contest.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Contest Details */}
                    <div className="lg:w-2/3 p-8">
                      <div className="space-y-4">
                        {/* Contest Name */}
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {contest.name}
                        </h2>

                        {/* Contest Type */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {contest?.contestType}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {contest?.description}
                        </p>

                        {/* Prize Section */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-green-700 dark:text-green-300 font-medium">Prize Won</p>
                                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                                  ${contest.prizeMoney}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                                🎉 Congratulations!
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="flex flex-wrap gap-4 pt-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V8a1 1 0 00-1-1" />
                            </svg>
                            <span>Contest ID: {contest._id?.slice(-8) || 'N/A'}</span>
                          </div>
                          {contest.deadline && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V8a1 1 0 00-1-1" />
                              </svg>
                              <span>Completed: {new Date(contest.deadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievement Section */}
        {myWinningContests.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  Achievement Unlocked! 🏆
                </h3>
                <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 text-sm">
                  <li>• You've won {myWinningContests.length} contest{myWinningContests.length > 1 ? 's' : ''}!</li>
                  <li>• Total earnings: ${totalPrizeMoney}</li>
                  <li>• Keep participating to win more amazing prizes</li>
                  <li>• Share your success story with the community</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWinningContests;
