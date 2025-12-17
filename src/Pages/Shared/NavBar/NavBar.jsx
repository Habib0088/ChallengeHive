
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/ChallengeHive.png";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import "./nav.css";
import Loading from "../../../Component/Loading/Loading";

const NavBar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isLoading,data: userProfile } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.log(err));
  };
if(isLoading){
  return <Loading></Loading>
}
  return (
    <nav className="w-full bg-blue-200 shadow px-6 py-3 flex items-center justify-between relative">
      {/* Left */}
      <Link to="/">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-20 w-20 rounded-md" />
        </div>
      </Link>

      {/* Middle: Menu */}
      <ul className="hidden md:flex space-x-3 text-gray-700 font-medium">
        <li>
          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/allContests" className="hover:text-blue-600">
            All Contests
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className="hover:text-blue-600">
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutUs" className="hover:text-blue-600">
            About Us
          </NavLink>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Right: Dropdown for Auth */}
      {user ? (
        <div className="hidden md:block relative group z-50">
          <img
            src={userProfile?.photoURL}
            className="h-15 w-15 rounded-full"
            referrerPolicy="no-referrer"
            alt=""
          />

          <div className="absolute right-0 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
            <Link to="/dashboard/profile">
              <li className="block px-4 py-2 hover:bg-gray-100">
                {userProfile?.displayName}
              </li>
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <a
              onClick={handleLogout}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <Link to={"/login"} className="hidden md:block">
          <div className="bg-blue-500 text-white btn">LogIn</div>
        </Link>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-200 flex flex-col space-y-2 p-4 md:hidden z-40">
          <li>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/"
              className="hover:text-blue-600 block"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/allContests"
              className="hover:text-blue-600 block"
            >
              All Contests
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/blog"
              className="hover:text-blue-600 block"
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/aboutUs"
              className="hover:text-blue-600 block"
            >
              About Us
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  to="/dashboard/profile"
                  className="hover:text-blue-600 block"
                >
                  {userProfile?.displayName}
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  to="/dashboard"
                  className="hover:text-blue-600 block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  href="#"
                  className="hover:text-blue-600 block"
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/login"
                className="bg-blue-500 text-white btn block text-center"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
