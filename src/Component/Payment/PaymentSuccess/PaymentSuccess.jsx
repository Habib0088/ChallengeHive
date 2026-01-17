import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import ScrollAnimateWrapper from '../../ScrollAnimateWrapper/ScrollAnimateWrapper';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    
    useEffect(() => {
        if (sessionId) {
            axiosSecure.post('/paymentSuccess', { sessionId }).then(res => console.log(res.data));
        }
    }, [sessionId, axiosSecure]);
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8 px-4 transition-colors duration-300">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Success Animation */}
                <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
                    <div className="relative">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl animate-pulse">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        {/* Celebration particles */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                            <div className="flex space-x-1">
                                <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
                                <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>🎊</span>
                                <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>✨</span>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Success Message */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Payment Successful!
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Congratulations! Your payment has been processed successfully. You're now registered for the contest.
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Success Details Card */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mx-auto max-w-md">
                        <div className="space-y-6">
                            {/* Transaction Info */}
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Transaction Status</p>
                                    <p className="font-semibold text-green-600 dark:text-green-400">Completed</p>
                                </div>
                            </div>

                            {sessionId && (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Session ID</p>
                                    <p className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                                        {sessionId}
                                    </p>
                                </div>
                            )}

                            {/* Success Features */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Contest registration confirmed</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Email confirmation sent</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Ready to participate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Action Buttons */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={600}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/allContests">
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                                </svg>
                                View All Contests
                            </button>
                        </Link>

                        <Link to="/dashboard">
                            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                                </svg>
                                Go to Dashboard
                            </button>
                        </Link>

                        <Link to="/">
                            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </ScrollAnimateWrapper>

                {/* Additional Info */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={800}>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    What's Next?
                                </h3>
                                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                                    <li>• Check your email for contest details and instructions</li>
                                    <li>• Visit your dashboard to track your contest participation</li>
                                    <li>• Prepare for the contest according to the guidelines</li>
                                    <li>• Contact support if you have any questions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>
            </div>
        </div>
    );
};

export default PaymentSuccess;