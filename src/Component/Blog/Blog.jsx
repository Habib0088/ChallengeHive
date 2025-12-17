import React from "react";
import Roadmap from "../Roadmap/Roadmap";
import Tips from "../../Component/Tips/Tips"
const Blog = () => {
  return (
    <div className="">
      <div className="h-[90vh] bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('https://t3.ftcdn.net/jpg/03/43/43/72/360_F_343437244_HrxIVZWbfh29tgxuRlxbPXEpHMSmfkAn.jpg')] bg-cover bg-center">
        <h1 className="text-white text-6xl text-center pt-40 font-bold">
          Welcome to ChallengeHive
        </h1>
        <p className="text-2xl md:w-9/12 mx-auto text-center text-white font-semibold md:pt-3">
          A contest is a structured competition where individuals or teams
          participate to showcase their skills, creativity, and problem-solving
          abilities within a defined set of rules and time limits. 
        </p>
      </div>
      <div className="">
        
        {/* <Roadmap></Roadmap> */}
        <Tips></Tips>

      </div>
    </div>
  );
};

export default Blog;
