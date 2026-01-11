
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/ChallengeHive.png";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import ThemeToggle from "../../../Component/ThemeToggle/ThemeToggle";
import { useTheme } from "../../../contexts/ThemeContext";
import "./nav.css";

const NavBar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: userProfile } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run query if user is logged in
  });

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? isDark 
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl border-b border-gray-700/20' 
            : 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/20'
          : isDark
            ? 'bg-gradient-to-r from-slate-900/90 to-blue-900/90 backdrop-blur-sm'
            : 'bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm'
      }`} style={{ 
        background: isScrolled 
          ? 'var(--card-bg)' 
          : 'var(--bg-accent)',
        borderColor: 'var(--border-primary)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="ChallengeHive Logo" 
                  className="h-12 w-12 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                ChallengeHive
              </span>
            </Link>

            {/* Desktop Main Navigation Menu */}
            <ul className="hidden md:flex space-x-1">
              {[
                { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { to: "/allContests", label: "All Contests", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                { to: "/blog", label: "Blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
                { to: "/aboutUs", label: "About Us", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group overflow-hidden ${
                        isActive
                          ? 'text-white bg-gradient-primary shadow-lg'
                          : `navbar-link ${isDark ? 'navbar-link-dark' : 'navbar-link-light'}`
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'white' : 'var(--text-primary)'
                    })}
                  >
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth Section & Dropdown Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <ThemeToggle />
              
              {user ? (
                <div className="relative group">
                  <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-xl transition-all duration-300" style={{
                    ':hover': {
                      background: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                    }
                  }} onMouseEnter={(e) => {
                    e.target.style.background = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)';
                  }} onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}>
                    <div className="w-10 h-10 rounded-full ring-2 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all duration-300 overflow-hidden">
                      {userProfile?.photoURL ? (
                        <img
                          src={userProfile.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {userProfile?.displayName || user?.displayName || 'User'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Welcome back!</p>
                    </div>
                    <svg className="w-4 h-4 transition-all duration-300 group-hover:rotate-180" style={{ color: 'var(--text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Enhanced Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-72 backdrop-blur-lg rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50" style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-primary)'
                  }}>
                    <div className="p-4">
                      {/* User Info Header */}
                      <div className="flex items-center space-x-3 pb-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {userProfile?.displayName || user?.displayName || 'User'}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
                        </div>
                      </div>

                      {/* Dropdown Menu Items */}
                      <div className="py-3 space-y-1">
                        <Link 
                          to="/dashboard/profile" 
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/item ${
                            isDark 
                              ? 'hover:bg-slate-700/50 hover:text-blue-400' 
                              : 'hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isDark 
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-purple-500/20' 
                              : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-purple-500/20'
                          }`}>
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/item ${
                            isDark 
                              ? 'hover:bg-slate-700/50 hover:text-blue-400' 
                              : 'hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isDark 
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-purple-500/20' 
                              : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover/item:from-blue-500/20 group-hover/item:to-purple-500/20'
                          }`}>
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Dashboard</span>
                        </Link>

                        <div className="border-t my-2" style={{ borderColor: 'var(--border-primary)' }}></div>

                        <button
                          onClick={handleLogout}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left group/item ${
                            isDark 
                              ? 'hover:bg-red-900/30 hover:text-red-400' 
                              : 'hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isDark 
                              ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 group-hover/item:from-red-500/20 group-hover/item:to-pink-500/20' 
                              : 'bg-gradient-to-r from-red-500/10 to-pink-500/10 group-hover/item:from-red-500/20 group-hover/item:to-pink-500/20'
                          }`}>
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Theme Toggle for Mobile */}
              <ThemeToggle />
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="backdrop-blur-lg border-t shadow-2xl" style={{ 
            background: 'var(--card-bg)', 
            borderColor: 'var(--border-primary)' 
          }}>
            <div className="px-4 py-6 space-y-2">
              {/* Mobile Main Navigation */}
              {[
                { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { to: "/allContests", label: "All Contests", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                { to: "/blog", label: "Blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
                { to: "/aboutUs", label: "About Us", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : `navbar-link ${isDark ? 'navbar-link-dark' : 'navbar-link-light'}`
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'white' : 'var(--text-primary)'
                  })}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              
              {/* Mobile User Section */}
              {user ? (
                <>
                  <div className="border-t my-4" style={{ borderColor: 'var(--border-primary)' }}></div>
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-slate-800/50 to-blue-900/50' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50'
                  }`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {userProfile?.displayName || user?.displayName || 'User'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Welcome back!</p>
                    </div>
                  </div>
                  
                  {/* Mobile Dropdown Items */}
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDark 
                        ? 'hover:bg-slate-700/50 text-gray-200 hover:text-blue-400' 
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDark 
                        ? 'hover:bg-slate-700/50 text-gray-200 hover:text-blue-400' 
                        : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left ${
                      isDark 
                        ? 'hover:bg-red-900/30 hover:text-red-400 text-gray-200' 
                        : 'hover:bg-red-50 hover:text-red-600 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200/30 my-4"></div>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <button className="w-full btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer div to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default NavBar;
