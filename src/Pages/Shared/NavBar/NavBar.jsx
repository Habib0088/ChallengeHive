import React from "react";
import { Link, NavLink } from "react-router";
import logo from '../../../assets/ChallengeHive.png'
import AuthProvider from "../../../Component/Context/AuthProvider/AuthProvider";
import useAuth from "../../../hook/useAuth";
import './nav.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const NavBar = () => {
  const axiosSecure=useAxiosSecure()

 
  // const {user}=AuthProvider()
  const{user,logOut}=useAuth()
       const {data:userProfile}=useQuery({
        queryKey:['users',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/profile?email=${user.email}`)
            return res.data
        }
    })
  const handleLogout = () => {
  logOut()
    .then(() => console.log("Logged out"))
    .catch(err => console.log(err));
};

  return (
    <nav className="w-full bg-blue-200 shadow px-6 py-3 flex items-center justify-between">
      {/* Left*/}
     <Link to='/'> 
      <div className="flex items-center space-x-2">
        <img
         src={logo}
          alt="Logo"
          className="h-20 w-20 rounded-md"
        />
       
      </div>
     
     </Link>

      {/* Middle:- Menu */}
      <ul className="hidden md:flex space-x-3 text-gray-700 font-medium">
        <li>
          <NavLink to='/'  className="hover:text-blue-600">
            Home
          </NavLink>
        
        </li>
        <li>
         
        </li>
       
         <li>
          <NavLink to='/allContests'  className="hover:text-blue-600">
            All Contests
          </NavLink>
          
        
        </li>
        
     
      </ul>

      {/* Right: Dropdown */}
      
      {
        user?
         <div className="relative group z-50">
       <img src={userProfile?.photoURL} className="h-15 w-15 rounded-full" referrerPolicy="no-referrer" alt="" />

        <div className="absolute right-0  w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            {userProfile?.displayName}
          </a>
          <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-100">
            Dashboard
          </Link>
          <a onClick={handleLogout} href="#" className="block px-4 py-2 hover:bg-gray-100">
            Logout
            
          </a>
        </div>
      </div> 
        :
          <Link to={'/login'}><div>LogIn</div></Link>
      }
     
    </nav>
  );
};

export default NavBar;
