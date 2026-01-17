import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import Countdown from '../../Countdown/Countdown';
import Loading from '../../Loading/Loading';

const MyParticipatedContests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { isLoading, data: myContests = [] } = useQuery({
        queryKey: ['myParticipatedContests', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myParticipatedContests?email=${user.email}`);
            return res.data;
        }
    });
    
    console.log(myContests);
    
    if (isLoading) {
        return <Loading></Loading>;
    }
    
    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                My Participated Contests
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Total Participated: {myContests.length}
                            </p>
                        </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{myContests.length}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Contests</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {myContests.filter(c => c.participants?.[0]?.paymentStatus === 'paid').length}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        {myContests.filter(c => new Date(c.deadline) > new Date()).length}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contests Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                    {myContests.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                No participated contests found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                You haven't participated in any contests yet.
                            </p>
                            <a href="/allContests" className="inline-block">
                                <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    Browse Contests
                                </button>
                            </a>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-center">
                                {/* Table Header */}
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">#</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Contest Image</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Contest Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Payment Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Time Remaining</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Contest Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {myContests.map((contest, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <th className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{i + 1}</th>
                                            
                                            {/* Contest Image */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md ring-2 ring-green-500/20">
                                                        <img
                                                            src={contest.photoURL || '/placeholder-contest.jpg'}
                                                            alt="Contest"
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Contest Name */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                                                    {contest?.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Prize: ${contest?.prize || 'N/A'}
                                                </div>
                                            </td>
                                            
                                            {/* Payment Status */}
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    contest?.participants?.[0]?.paymentStatus === 'paid' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : contest?.participants?.[0]?.paymentStatus === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                    {contest?.participants?.[0]?.paymentStatus || 'Unknown'}
                                                </span>
                                            </td>
                                            
                                            {/* Time Remaining */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <Countdown
                                                        deadline={contest?.deadline}
                                                        className="text-red-500 dark:text-red-400 font-bold"
                                                    />
                                                </div>
                                            </td>
                                            
                                            {/* Contest Type */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {contest?.contestType || 'General'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Additional Info Section */}
                {myContests.length > 0 && (
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    Contest Participation Tips
                                </h3>
                                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                                    <li>• Keep track of contest deadlines and prepare your submissions early</li>
                                    <li>• Ensure your payment status is confirmed before the contest starts</li>
                                    <li>• Check contest rules and guidelines for better performance</li>
                                    <li>• Contact support if you face any issues with your participation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyParticipatedContests;