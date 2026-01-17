import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Loading from "../../Loading/Loading";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userProfile } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { isLoading,data: count } = useQuery({
    queryKey: ["countWinning", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/user/stats?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(count);
  const pieData = [
    { name: "Participated", value: count?.totalParticipated || 0 },
    { name: "Won", value: count?.totalWon || 0 },
  ];

  const COLORS = ["#3b82f6", "#10b981"];
  
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage your account information and view your contest statistics
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Profile Card */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              {/* Profile Image */}
              <div className="flex justify-center -mt-16 mb-6">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                    referrerPolicy="no-referrer"
                    src={userProfile?.photoURL}
                    alt="Profile"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userProfile?.displayName}
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  {userProfile?.Bio ||
                    `Hi, I'm ${userProfile?.displayName}. I'm here as ${userProfile?.role}`}
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{userProfile?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">{userProfile?.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Profile Button */}
                <div className="pt-6">
                  <Link to="/dashboard/updateProfile">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                      <span className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Update Profile</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* Statistics Section */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Contest Statistics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your participation and winning overview
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {count?.totalParticipated || 0}
                      </p>
                      <p className="text-blue-700 dark:text-blue-300 font-medium">Contests Participated</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {count?.totalWon || 0}
                      </p>
                      <p className="text-green-700 dark:text-green-300 font-medium">Contests Won</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="flex justify-center">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Performance Overview
                  </h3>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </div>
  );
};

export default Profile;
