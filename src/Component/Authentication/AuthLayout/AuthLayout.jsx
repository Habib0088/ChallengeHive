import React from "react";
import { Link, Outlet } from "react-router";



const AuthLayout = () => {
  return (
    <div>
      <div>
     
      </div >
      {/* container */}
      <div className="mt-7 flex w-11/12 mx-auto">
        <div className="flex-1 text-center">
          <Outlet></Outlet>
        </div >
        {/* Non changale part */}
        <div className="flex-1">
          {/* <img src={} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
