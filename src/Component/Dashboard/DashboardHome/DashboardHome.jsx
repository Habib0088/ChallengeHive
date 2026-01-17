import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";
import Loading from "../../Loading/Loading";

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user profile data
    const { data: userProfile } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/profile?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Fetch user statistics
    const { data: userStats, isLoading: statsLoading } = useQuery({
        queryKey: ["userStats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/stats?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Fetch admin statistics (if user is admin)
    const { data: adminStats } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        },
        enabled: userProfile?.role === 'admin'
    });

    if (statsLoading) {
        return <Loading />;
    }

    const isAdmin = userProfile?.role === 'admin';
    const isCreator = userProfile?.role === 'creator';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Header */}
                <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Welcome back, {userProfile?.displayName || user?.displayName}! 👋
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {isAdmin ? "Manage your platform and oversee all activities" : 
                             isCreator ? "Create amazing contests and engage with participants" : 
                             "Participate in exciting contests and track your progress"}
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
                    </div>
                </ScrollAnimateWrapper>

                {/* User Statistics Cards */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Participated Contests */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {userStats?.totalParticipated || 0}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Participated</p>
                                </div>
                            </div>
                        </div>

                        {/* Won Contests */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {userStats?.totalWon || 0}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Won</p>
                                </div>
                            </div>
                        </div>

                        {/* Win Rate */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {userStats?.totalParticipated > 0 
                                            ? Math.round((userStats?.totalWon / userStats?.totalParticipated) * 100) 
                                            : 0}%
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Win Rate</p>
                                </div>
                            </div>
                        </div>

                        {/* Role Badge */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                        {userProfile?.role || 'User'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Role</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Admin Statistics (Only for Admin) */}
                {isAdmin && adminStats && (
                    <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
                            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Platform Overview
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            System-wide statistics and metrics
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                    {adminStats.totalUsers || 0}
                                                </p>
                                                <p className="text-blue-700 dark:text-blue-300 font-medium">Total Users</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                                    {adminStats.totalContests || 0}
                                                </p>
                                                <p className="text-green-700 dark:text-green-300 font-medium">Total Contests</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                                    ${adminStats.totalRevenue || 0}
                                                </p>
                                                <p className="text-purple-700 dark:text-purple-300 font-medium">Total Revenue</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimateWrapper>
                )}

                {/* Quick Actions */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={600}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Quick Actions
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Common tasks and shortcuts
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Profile Action */}
                                <Link to="/dashboard/profile">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">View Profile</h3>
                                                <p className="text-blue-600 dark:text-blue-400 text-sm">Check your profile details</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Contest Actions */}
                                {isCreator && (
                                    <Link to="/dashboard/addContest">
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Add Contest</h3>
                                                    <p className="text-green-600 dark:text-green-400 text-sm">Create a new contest</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {isCreator && (
                                    <Link to="/dashboard/myContestPage">
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">My Contests</h3>
                                                    <p className="text-purple-600 dark:text-purple-400 text-sm">Manage your contests</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* Admin Actions */}
                                {isAdmin && (
                                    <>
                                        <Link to="/dashboard/manageUsers">
                                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Manage Users</h3>
                                                        <p className="text-orange-600 dark:text-orange-400 text-sm">User administration</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <Link to="/dashboard/manageContest">
                                            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Manage Contests</h3>
                                                        <p className="text-red-600 dark:text-red-400 text-sm">Contest administration</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <Link to="/dashboard/approveCreators">
                                            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Approve Creators</h3>
                                                        <p className="text-indigo-600 dark:text-indigo-400 text-sm">Creator approvals</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}

                                {/* General Actions */}
                                <Link to="/allContests">
                                    <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">Browse Contests</h3>
                                                <p className="text-teal-600 dark:text-teal-400 text-sm">Explore all contests</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>
            </div>
        </div>
    );
};

export default DashboardHome;