import React from "react";
import { motion } from "framer-motion";

const Tips = [
  { id: 1, text: "Understand the Rules Clearly" },
  { id: 2, text: "Manage Your Time Wisely" },
  { id: 3, text: "Practice Before Participating" },
  { id: 4, text: "Focus on Quality Over Quantity" },
];

const Roadmap = () => {
  return (
   <div className="bg-blue-300">
     <div className="md:py-11 w-11/12 mx-auto overflow-hidden ">
      <h1 className="text-6xl font-bold text-center pb-10">Be The Champion</h1>
      <p className="text-2xl font-bold my-3">Follow the steps</p>

      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {Tips.concat(Tips).map((card, index) => (
          <div
            key={index}
            className="card text-center mx-auto bg-[#22B0C7] text-white shadow-2xl min-w-[250px]"
          >
            <div className="card-body flex flex-col items-center justify-center">
              <h2 className="card-title border-2 rounded-full p-3 font-bold text-2xl">
                {card.id}
              </h2>
              <p className="text-xl">{card.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
   </div>
  );
};

export default Roadmap;
