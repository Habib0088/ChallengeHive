import React from "react";


const Restriction = () => {
  return (
    <div className="flex justify-center items-center min-h-screen relative">

      {/* <DotLottieReact src={animation} loop autoplay /> */}

      <h1 className="text-5xl font-bold text-red-600 absolute">
        You are not Admin
      </h1>
    </div>
  );
};

export default Restriction;
