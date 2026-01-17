import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import { toast } from "./Toast/toast";
import { useTheme } from "../../../contexts/ThemeContext";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";

const Registration = () => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const { createUser, loginWithGoogle, updateUserProfile, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigator = useNavigate();
  // console.log(location.state);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleloginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await loginWithGoogle();
      toast("Successfully registered with Google!", "success");

      const user = result.user;
      console.log(user);

      const userProfileCreate = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      
      await axiosSecure.post("/users", userProfileCreate);
      navigator(location.state || "/");
    } catch (error) {
      console.log(error.message);
      toast("Failed to register with Google. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      
      let photoURL = "https://ui-avatars.com/api/?name=" + encodeURIComponent(data.name) + "&size=200&background=3b82f6&color=ffffff&bold=true";
      
      // Upload image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        
        const imageUrlKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`;
        const imageResponse = await axios.post(imageUrlKey, formData);
        photoURL = imageResponse.data.data.url;
      }

      const userProfileCreate = {
        displayName: data.name,
        photoURL: photoURL,
        email: data.email,
      };

      // Create user in database
      await axiosSecure.post("https://challengehive-smoky.vercel.app/users", userProfileCreate);

      // Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateUserProfile(userProfile);

      toast("Account created successfully!", "success");
      navigator(location.state || "/");
    } catch (error) {
      console.log(error.message);
      toast("Failed to create account. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Join ChallengeHive
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Create your account and start participating in contests
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Registration Form */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
          <div className={`backdrop-blur-sm rounded-2xl p-8 shadow-2xl border transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Profile Photo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      {...register("photo")}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:from-blue-600 hover:file:to-purple-700 file:transition-all file:duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    {...register("name", { 
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : isDark 
                          ? 'border-gray-600 bg-slate-700/50 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white focus:border-blue-500'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
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

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : isDark 
                          ? 'border-gray-600 bg-slate-700/50 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white focus:border-blue-500'
                    }`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Password must contain uppercase, lowercase, and number"
                      }
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : isDark 
                          ? 'border-gray-600 bg-slate-700/50 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white focus:border-blue-500'
                    }`}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.password.message}</span>
                  </p>
                )}
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Password strength:</div>
                    <div className="flex space-x-1">
                      <div className={`h-1 flex-1 rounded ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`h-1 flex-1 rounded ${/\d/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:border-red-500' 
                        : isDark 
                          ? 'border-gray-600 bg-slate-700/50 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white focus:border-blue-500'
                    }`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.confirmPassword.message}</span>
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Create Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'var(--border-primary)' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-500" style={{ background: 'var(--bg-primary)' }}>
                    Or register with
                  </span>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                type="button"
                onClick={handleloginWithGoogle}
                disabled={isLoading}
                className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark 
                    ? 'border-gray-600 bg-slate-700/50 text-white hover:border-blue-500 hover:bg-slate-600/50' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* Footer */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={400}>
          <div className="text-center space-y-4">
            {/* Go to Home Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigator('/')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg ${
                  isDark 
                    ? 'bg-slate-700/80 text-gray-300 hover:bg-slate-600/80 border border-gray-600 hover:border-blue-500' 
                    : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200 hover:border-blue-300'
                }`}
                title="Go to Home"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>

            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              By creating an account, you agree to our{' '}
              <button 
                className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
                onClick={() => toast("Terms of Service coming soon!", "info")}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button 
                className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
                onClick={() => toast("Privacy Policy coming soon!", "info")}
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </ScrollAnimateWrapper>
      </div>
    </div>
  );
};

export default Registration;
