import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../Authentication/Registration/Toast/toast";
import { useState } from "react";
import { Link } from "react-router";
import ScrollAnimateWrapper from "../ScrollAnimateWrapper/ScrollAnimateWrapper";

const BeContestCreator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const dataOfForm = async (data) => {
        setIsSubmitting(true);
        try {
            data.photoURL = user.photoURL;
            console.log(data);
            const res = await axiosSecure.post('/creators', data);
            console.log(res.data);
            toast("Application submitted successfully! We'll review it soon.");
        } catch (error) {
            console.error("Application failed:", error);
            toast("Application failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
 
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Become Contest Creator
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Join our platform as a contest creator and start organizing amazing competitions
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Breadcrumb */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={100}>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">Become Creator</span>
                    </div>
                </ScrollAnimateWrapper>

                {/* Application Form */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Form Header */}
                        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Creator Application
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Fill out the form below to apply as a contest creator
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit(dataOfForm)} className="space-y-6">
                                {/* Personal Information Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                        Personal Information
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Full Name *
                                            </label>
                                            <input 
                                                {...register('name', { required: true })} 
                                                defaultValue={user?.displayName} 
                                                type="text" 
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                                                placeholder="Enter your full name" 
                                            />
                                            {errors.name?.type === "required" && (
                                                <p className="text-red-500 text-sm">Name is required</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Email Address *
                                            </label>
                                            <input 
                                                {...register('email', { required: true })} 
                                                defaultValue={user?.email} 
                                                type="email" 
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed" 
                                                placeholder="Email address" 
                                                disabled
                                            />
                                            {errors.email?.type === "required" && (
                                                <p className="text-red-500 text-sm">Email is required</p>
                                            )}
                                        </div>

                                        {/* Age */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Age *
                                            </label>
                                            <input 
                                                {...register('age', { 
                                                    required: true,
                                                    min: { value: 18, message: "Must be at least 18 years old" },
                                                    max: { value: 100, message: "Age must be realistic" }
                                                })} 
                                                type="number" 
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                                                placeholder="Enter your age" 
                                            />
                                            {errors.age?.type === "required" && (
                                                <p className="text-red-500 text-sm">Age is required</p>
                                            )}
                                            {errors.age?.message && (
                                                <p className="text-red-500 text-sm">{errors.age.message}</p>
                                            )}
                                        </div>

                                        {/* NID */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                National ID Number *
                                            </label>
                                            <input 
                                                {...register('nid', { 
                                                    required: true,
                                                    minLength: { value: 10, message: "NID must be at least 10 digits" }
                                                })} 
                                                type="number" 
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                                                placeholder="Enter your NID number" 
                                            />
                                            {errors.nid?.type === "required" && (
                                                <p className="text-red-500 text-sm">NID is required</p>
                                            )}
                                            {errors.nid?.message && (
                                                <p className="text-red-500 text-sm">{errors.nid.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address *
                                        </label>
                                        <textarea 
                                            {...register('Address', { required: true })} 
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none h-24" 
                                            placeholder="Enter your complete address"
                                        />
                                        {errors.Address?.type === "required" && (
                                            <p className="text-red-500 text-sm">Address is required</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Submit Application
                                            </>
                                        )}
                                    </button>

                                    <Link to="/">
                                        <button 
                                            type="button"
                                            className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Home
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </ScrollAnimateWrapper>

                {/* Information Section */}
                <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    Application Process
                                </h3>
                                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                                    <li>• Your application will be reviewed by our admin team</li>
                                    <li>• You must be at least 18 years old to become a creator</li>
                                    <li>• All information provided must be accurate and verifiable</li>
                                    <li>• You'll receive an email notification about your application status</li>
                                    <li>• Once approved, you can start creating contests immediately</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollAnimateWrapper>
            </div>
        </div>
    );
};

export default BeContestCreator;
