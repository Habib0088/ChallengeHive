import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { toast } from "../../Authentication/Registration/Toast/toast";
import useAuth from "../../../hook/useAuth";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";

const AddContest = () => {
  const [deadline, setDeadline] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const contestData = async (data) => {
    setIsSubmitting(true);
    try {
      // Photo related functionality
      const imageUrl = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageUrl);
      // send the photo to store and get the url
      const imageUrlKey = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_host
      }`;

      const imageResponse = await axios.post(imageUrlKey, formData);
      
      data.photoURL = imageResponse.data.data.url;
      data.status = "pending";
      data.deadline = deadline;
      data.contestCreator = user.displayName;
      data.email = user.email;
      data.creatorPhoto = user.photoURL;

      const response = await axiosSecure.post('/contest', data);
      
      if (response.data.insertedId) {
        toast("Your Contest Request is ready for Admin Approval", "success");
        reset();
        setDeadline(null);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      toast("Failed to submit contest. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Create New Contest
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Fill in the details to submit your contest for approval
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Form */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <form onSubmit={handleSubmit(contestData)} className="p-8 space-y-6">
              {/* Contest Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contest Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input
                    {...register("name", { required: "Contest name is required" })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter contest name"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contest Image
                </label>
                <div className="relative">
                  <input
                    {...register("photo", { required: "Contest image is required" })}
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:from-blue-600 hover:file:to-purple-700 file:transition-all file:duration-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.photo.message}</span>
                  </p>
                )}
              </div>

              {/* Price and Prize Money Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entry Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Entry Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <input
                      {...register("price", { 
                        required: "Entry price is required", 
                        valueAsNumber: true,
                        min: { value: 0, message: "Price must be positive" }
                      })}
                      type="number"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="0.00"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.price.message}</span>
                    </p>
                  )}
                </div>

                {/* Prize Money */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Prize Money ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <input
                      {...register("prizeMoney", {
                        required: "Prize money is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Prize money must be positive" }
                      })}
                      type="number"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="0.00"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.prizeMoney && (
                    <p className="text-red-500 text-sm flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.prizeMoney.message}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Contest Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contest Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <select
                    {...register("contestType", { required: "Contest type is required" })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <option value="">Select contest type</option>
                    <option value="programmingContest">Programming Contest</option>
                    <option value="UI-UXContest">UI-UX Contest</option>
                    <option value="Photo_graphy_Contest">Photography Contest</option>
                    <option value="Drawing_Contest">Drawing Contest</option>
                    <option value="Essay_Contest">Essay Contest</option>
                  </select>
                </div>
                {errors.contestType && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.contestType.message}</span>
                  </p>
                )}
              </div>

              {/* Task Instruction */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Task Instructions
                </label>
                <textarea
                  {...register("taskInstruction", { required: "Task instructions are required" })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Provide detailed task instructions for participants..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.taskInstruction && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.taskInstruction.message}</span>
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contest Description
                </label>
                <textarea
                  {...register("description", { required: "Contest description is required" })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Provide a detailed description of your contest..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.description.message}</span>
                  </p>
                )}
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Contest Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholderText="Select deadline date and time"
                    minDate={new Date()}
                    disabled={isSubmitting}
                  />
                </div>
                {!deadline && (
                  <p className="text-gray-500 text-sm">Please select a deadline for your contest</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !deadline}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting Contest...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Submit Contest for Approval</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </div>
  );
};

export default AddContest;
