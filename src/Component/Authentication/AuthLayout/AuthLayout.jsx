import React from "react";
import { Link, Outlet } from "react-router";
import announcement from '../../../assets/contest announcement.jpg'


const AuthLayout = () => {
  return (
    <div>
      <div>
     
      </div >
      {/* container */}
      <div className="mt-7 flex w-11/12 mx-auto justify-center items-center">
        <div className="flex-1 text-center mx-auto">
          <Outlet></Outlet>
        </div >
        {/* Non changale part */}
        <div className="flex-1">
          <img src={announcement} alt="Challenge Hive" className="rounded-md" />
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
