import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import { ToastContainer } from 'react-toastify';
import Loading from "../../Loading/Loading";
import { toast } from "../Registration/Toast/toast";
import { useTheme } from "../../../contexts/ThemeContext";
import ScrollAnimateWrapper from "../../ScrollAnimateWrapper/ScrollAnimateWrapper";
const LogIn = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigator = useNavigate();

  const { loginUeser, loginWithGoogle, loading } = useContext(AuthContext);

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await loginWithGoogle();
      toast("Successfully logged in with Google!", "success");

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
      toast("Failed to login with Google. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const result = await loginUeser(data.email, data.password);
      toast("Successfully logged in!", "success");
      
      const loggedUser = result.user;
      console.log(loggedUser);
      navigator(location.state || "/");
    } catch (error) {
      console.log(error.message);
      toast("Invalid email or password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const testCredentials = [
    {
      role: "Admin",
      email: "admin@gmail.com",
      password: "admin@gmail.com",
      description: "Full access to all admin features",
      color: "from-red-500 to-pink-600"
    },
    {
      role: "Creator",
      email: "creator@gmial.com",
      password: "creator@gmial.com",
      description: "Can create and manage contests",
      color: "from-green-500 to-emerald-600"
    },
    {
      role: "User",
      email: "user6@gmail.com",
      password: "user6@gmail.com",
      description: "Can participate in contests",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const fillCredentials = (email, password) => {
    // Using setValue from react-hook-form to properly update form state
    setValue('email', email);
    setValue('password', password);
    setShowCredentialsModal(false);
    toast("Credentials filled! You can now login.", "info");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      <ToastContainer />
      
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <ScrollAnimateWrapper animation="fade-in-down" delay={0}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-blue-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Welcome Back
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Sign in to your ChallengeHive account
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimateWrapper>

        {/* Login Form */}
        <ScrollAnimateWrapper animation="fade-in-up" delay={200}>
          <div className={`backdrop-blur-sm rounded-2xl p-8 shadow-2xl border transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                    placeholder="Enter your password"
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
              </div>



              {/* Login Button */}
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
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
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogle}
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

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p style={{ color: 'var(--text-secondary)' }}>
                Don't have an account?{' '}
                <Link 
                  to="/registration" 
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Create one now
                </Link>
              </p>
            </div>

            {/* Test Credentials Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowCredentialsModal(true)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/30' 
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>Test Credentials</span>
              </button>
            </div>
          </div>
        </ScrollAnimateWrapper>

        {/* Test Credentials Modal */}
        {showCredentialsModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-2xl p-6 shadow-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Test Credentials
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Click on any credential to auto-fill the login form
                  </p>
                </div>
                <button
                  onClick={() => setShowCredentialsModal(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Credentials List */}
              <div className="space-y-3">
                {testCredentials.map((credential, index) => (
                  <button
                    key={index}
                    onClick={() => fillCredentials(credential.email, credential.password)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left ${
                      isDark 
                        ? 'border-gray-600 bg-slate-700/50 hover:border-blue-500' 
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${credential.color} flex items-center justify-center shadow-md`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {credential.role}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${credential.color} text-white`}>
                            Test Account
                          </span>
                        </div>
                        <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                          {credential.email}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {credential.description}
                        </p>
                      </div>
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      For Testing Only
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      These credentials are for demonstration purposes. In production, use your own secure credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
              By signing in, you agree to our{' '}
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

export default LogIn;
