import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";
import { useTheme } from "../../../contexts/ThemeContext";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  
  const { isLoading, data: contests = [] } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allContests");
      return res.data;
    },
  });

  // Function to check if contest is active or finished
  const getContestStatus = (deadline) => {
    const now = new Date();
    const contestDeadline = new Date(deadline);
    return contestDeadline > now;
  };
  
  // Function to format time remaining
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const contestDeadline = new Date(deadline);
    const timeDiff = contestDeadline - now;
    
    if (timeDiff <= 0) return null;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Ending soon';
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div 
      className="relative py-20 overflow-hidden transition-colors duration-300"
      style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 30%, #f3e8ff 100%)'
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-blue-400/10 to-purple-400/10' 
            : 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-purple-400/10 to-blue-400/10' 
            : 'bg-gradient-to-br from-purple-400/20 to-blue-400/20'
        }`}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${
              isDark 
                ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              All Contests
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover {contests.length} amazing contests waiting for your participation
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Contest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {contests.map((contest, index) => {
            const isActive = getContestStatus(contest?.deadline);
            const timeRemaining = getTimeRemaining(contest?.deadline);
            
            return (
              <ScrollAnimateWrapper 
                key={contest._id}
                animation="scale-in" 
                delay={index * 100}
              >
                <div className={`group relative backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border overflow-hidden flex flex-col h-full ${
                  isDark 
                    ? 'bg-slate-800/80 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-300/50'
                }`}>
                  {/* Card Image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={contest?.photoURL}
                      alt={contest?.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Contest Status Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                      isActive 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-red-500/90 text-white'
                    }`}>
                      <div className="flex items-center space-x-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-white animate-pulse' : 'bg-white'
                        }`}></div>
                        <span>{isActive ? 'ACTIVE' : 'FINISHED'}</span>
                      </div>
                    </div>
                    
                    {/* Participants Badge */}
                    <div className={`absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg ${
                      isDark ? 'bg-slate-700/90' : 'bg-white/90'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className={`text-sm font-semibold ${
                          isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {contest?.participants?.length || 0}
                        </span>
                      </div>
                    </div>

                    {/* Finished Overlay */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                          <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-800">Contest Ended</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {contest?.name}
                    </h2>
                    
                    <p className={`text-sm leading-relaxed mb-4 overflow-hidden flex-grow ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`} style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {contest?.description?.slice(0, 120)}{contest?.description?.length > 120 ? '...' : ''}
                    </p>

                    {/* Contest Info */}
                    <div className="space-y-3 mb-6">
                      {/* Contest Type & Price */}
                      <div className="flex items-center justify-between">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          isDark 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {contest?.contestType}
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-sm font-semibold text-green-500">${contest?.price}</span>
                        </div>
                      </div>

                      {/* Prize Money */}
                      <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                        isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                      }`}>
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className={`text-sm font-medium ${
                          isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Prize: <span className="font-bold text-yellow-600">${contest?.prizeMoney}</span>
                        </span>
                      </div>

                      {/* Time Remaining or Deadline Info */}
                      <div className="min-h-[2.5rem] flex items-center">
                        {isActive && timeRemaining && (
                          <div className={`flex items-center space-x-2 rounded-lg px-3 py-2 w-full ${
                            isDark ? 'bg-blue-500/20' : 'bg-blue-50'
                          }`}>
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={`text-sm font-medium ${
                              isDark ? 'text-blue-300' : 'text-blue-700'
                            }`}>
                              {timeRemaining}
                            </span>
                          </div>
                        )}

                        {!isActive && (
                          <div className={`flex items-center space-x-2 rounded-lg px-3 py-2 w-full ${
                            isDark ? 'bg-red-500/20' : 'bg-red-50'
                          }`}>
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className={`text-sm font-medium ${
                              isDark ? 'text-red-300' : 'text-red-700'
                            }`}>
                              Deadline passed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button - Always at bottom */}
                    <div className="mt-auto">
                      <Link to={`/contestDetails/${contest._id}`}>
                        <button className={`w-full font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group-hover:shadow-blue-500/25' 
                            : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white group-hover:shadow-gray-500/25'
                        }`}>
                          <span className="flex items-center justify-center space-x-2">
                            <span>{isActive ? 'Join Contest' : 'View Results'}</span>
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5' 
                      : 'bg-gradient-to-r from-gray-500/5 to-gray-600/5'
                  }`}></div>
                </div>
              </ScrollAnimateWrapper>
            );
          })}
        </div>

        {/* Empty State */}
        {contests.length === 0 && (
          <ScrollAnimateWrapper animation="fade-in-up" delay={300}>
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0a7.962 7.962 0 105.824 8.518M9.306 6a7.962 7.962 0 015.824-8.518" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                No Contests Available
              </h3>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Check back later for exciting new contests!
              </p>
            </div>
          </ScrollAnimateWrapper>
        )}
      </div>
    </div>
  );
};

export default AllContests;
