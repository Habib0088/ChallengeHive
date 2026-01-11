import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import Loading from "../../../Component/Loading/Loading";
import ScrollAnimateWrapper from "../../../Component/ScrollAnimateWrapper/ScrollAnimateWrapper";
import "./PopularContest.css";

const PopularContest = () => {
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: contests = [] } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosSecure('/contestsPopular')
            return res.data
        }
    })
    
    // Function to check if contest is active or finished
    const getContestStatus = (deadline) => {
        const now = new Date();
        const contestDeadline = new Date(deadline);
        return contestDeadline > now;
    }
    
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
    }
    
    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <div className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Popular Contests
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Join thousands of developers in exciting coding challenges and showcase your skills
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Contest Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-16 stagger-children">
                    {contests.map((contest, index) => {
                        const isActive = getContestStatus(contest?.deadline);
                        const timeRemaining = getTimeRemaining(contest?.deadline);
                        
                        return (
                            <ScrollAnimateWrapper 
                                key={contest._id}
                                animation="scale-in" 
                                delay={index * 100}
                            >
                                <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 overflow-hidden flex flex-col h-full">
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
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span className="text-sm font-semibold text-gray-700">{contest?.participants.length}</span>
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
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {contest?.name}
                                    </h2>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 overflow-hidden flex-grow" style={{ 
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {contest?.description.slice(0, 120)}{contest?.description.length > 120 ? '...' : ''}
                                    </p>

                                    {/* Contest Info */}
                                    <div className="space-y-3 mb-6">
                                        {/* Status and Time */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                {isActive ? (
                                                    <>
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                        <span className="text-sm text-green-600 font-medium">Active Contest</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <span className="text-sm text-red-600 font-medium">Contest Finished</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="text-sm font-semibold text-blue-600">
                                                {contest?.participants.length} Participants
                                            </div>
                                        </div>

                                        {/* Time Remaining or Deadline Info */}
                                        <div className="min-h-[2.5rem] flex items-center">
                                            {isActive && timeRemaining && (
                                                <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2 w-full">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-blue-700">{timeRemaining}</span>
                                                </div>
                                            )}

                                            {!isActive && (
                                                <div className="flex items-center space-x-2 bg-red-50 rounded-lg px-3 py-2 w-full">
                                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-red-700">Deadline passed</span>
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

                {/* Show All Button */}
                <ScrollAnimateWrapper animation="bounce-in-up" delay={600}>
                    <div className="text-center">
                        <Link to='/allContests'>
                            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-500 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <span className="flex items-center space-x-3">
                                    <span className="text-lg">Show All Contests</span>
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </span>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </Link>
                    </div>
                </ScrollAnimateWrapper>
            </div>
        </div>
    );
};


export default PopularContest;
