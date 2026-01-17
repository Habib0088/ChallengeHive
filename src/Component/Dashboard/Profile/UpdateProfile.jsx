import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../../Authentication/Registration/Toast/toast";
import Loading from "../../Loading/Loading";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";
import { Link } from "react-router";
import { useState } from "react";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const { refetch, data: userProfile, isLoading } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleFormData = async (userFormData) => {
    console.log(userFormData);
    setIsSubmitting(true);
    
  try {
    // default old photo
    let photoURL = userProfile?.photoURL || "";

    // check if user uploaded a new file
    if (userFormData.photo && userFormData.photo.length > 0) {
      const formData = new FormData();
      formData.append("image", userFormData.photo[0]);
      const imageUrlKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`;

      const res = await axios.post(imageUrlKey, formData);
      if(res?.data?.data?.url){
        photoURL = res.data.data.url;
      }
    }

    const userInfo = {
      displayName: userFormData.name || userProfile?.displayName,
      Bio:userFormData.bio,
       
      photoURL,
    };

    const res = await axiosSecure.patch(`/updateProfile?email=${user?.email}`, userInfo);

    if (res.data.modifiedCount) {
      toast("Profile updated successfully");
      refetch();
      setPreviewImage(null);
    }
  } catch (err) {
    console.log("Update failed:", err);
    toast("Update failed. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Update Your Profile
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Keep your profile information up to date
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Breadcrumb */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={100}>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/dashboard/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Profile
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Update Profile</span>
          </div>
        </ScrollAnimateWrapper>

        {/* Update Form */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Form Header */}
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Profile Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Update your personal details and profile picture
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit(handleFormData)} className="space-y-8">
                  {/* Current Profile Preview */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <img
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                        referrerPolicy="no-referrer"
                        src={previewImage || userProfile?.photoURL}
                        alt="Current Profile"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Current Profile Picture</p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                          Full Name
                        </span>
                      </label>
                      <input
                        {...register("name", { 
                          required: "Name is required",
                          minLength: { value: 2, message: "Name must be at least 2 characters" }
                        })}
                        defaultValue={userProfile?.displayName}
                        type="text"
                        className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <label className="label">
                          <span className="label-text-alt text-red-500">{errors.name.message}</span>
                        </label>
                      )}
                    </div>

                    {/* Email Field (Read Only) */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        value={userProfile?.email}
                        className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                        placeholder="Email address"
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-gray-500 dark:text-gray-400">Email cannot be changed</span>
                      </label>
                    </div>
                  </div>

                  {/* Bio Field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                        Bio
                      </span>
                    </label>
                    <textarea
                      {...register("bio", {
                        maxLength: { value: 500, message: "Bio must be less than 500 characters" }
                      })}
                      defaultValue={userProfile?.Bio}
                      className="textarea textarea-bordered h-24 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    {errors.bio && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">{errors.bio.message}</span>
                      </label>
                    )}
                  </div>

                  {/* Role Field (Read Only) */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                        Account Role
                      </span>
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                        {userProfile?.role || 'User'}
                      </span>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                        Profile Picture
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("photo")}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImagePreview(e);
                          register("photo").onChange(e);
                        }}
                        className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 file:bg-blue-500 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-600 transition-all duration-300"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-gray-500 dark:text-gray-400">
                        Supported formats: JPG, PNG, GIF (Max 5MB)
                      </span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm mr-2"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Update Profile
                        </>
                      )}
                    </button>

                    <Link to="/dashboard/profile">
                      <button 
                        type="button"
                        className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Profile
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* Help Section */}
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
                  Profile Update Tips
                </h3>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                  <li>• Use a clear, professional profile picture for better recognition</li>
                  <li>• Keep your bio concise and informative (max 500 characters)</li>
                  <li>• Your email address cannot be changed for security reasons</li>
                  <li>• Changes will be reflected across the platform immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </div>
  );
};

export default UpdateProfile;
