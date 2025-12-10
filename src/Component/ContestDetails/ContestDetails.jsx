import React from "react";
import { FaUser, FaTrophy, FaCalendarAlt } from "react-icons/fa";

const ContestPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl max-w-3xl w-full p-6 space-y-6 border border-white/20">
        {/* Banner */}
        <div className="w-full h-40 rounded-lg overflow-hidden">
          <img
            src="/path-to-your-banner.png" // replace with your image path
            alt="Future Tech Challenge"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contest Info */}
        <div className="space-y-2">
          <p className="text-sm text-white/70">Contest Name:</p>
          <h1 className="text-2xl font-bold text-white">
            AI Algorithm Desitim Design Sprint
          </h1>
          <div className="flex items-center gap-4 text-white/80 mt-2">
            <div className="flex items-center gap-1">
              <FaUser /> 452 Participants
            </div>
            <div className="flex items-center gap-1">
              <FaTrophy /> Prize Money: $10,000 USD
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt /> Deadline: 02:15:37
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/10 p-4 rounded-lg text-white/80">
          <h2 className="font-semibold mb-2">Full Contest Description & Task Details</h2>
          <p className="text-sm">
            Design and implement a machine learning algorithm to optimize energy grid efficiency. 
            Submissions must contain reference code and demo with clear documentation. Creativity, 
            efficiency, and scalability are key metrics.
          </p>
        </div>

        {/* Submission Box */}
        <div className="bg-white/10 p-4 rounded-lg text-white/80 relative">
          <h2 className="font-semibold mb-2">Submit Your Task</h2>
          <input
            type="text"
            placeholder="Submission Links (GitHub, Demo, Paper)"
            className="w-full p-2 rounded-md text-black"
          />
          <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>

        {/* Winner Circle */}
        <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-white/70 text-center">
          Winner will be announced here after the deadline!
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="btn btn-primary text-black w-1/2">Register / Pay</button>
          <button className="btn btn-disabled text-black w-1/2">Submit Task (Disabled)</button>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
