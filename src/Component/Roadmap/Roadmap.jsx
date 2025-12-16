import React from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, text: "Register for a contest" },
  { id: 2, text: "Participate & solve challenges" },
  { id: 3, text: "Submit your solution" },
  { id: 4, text: "Winners announced" },
];

const Roadmap = () => {
  return (
   <div className="bg-blue-300">
     <div className="md:py-11 w-11/12 mx-auto overflow-hidden ">
      <h1 className="text-6xl font-bold text-center mb-10">How We Works</h1>

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
        {cards.concat(cards).map((card, index) => (
          <div
            key={index}
            className="card text-center mx-auto bg-gray-400 text-white shadow-2xl min-w-[250px]"
          >
            <div className="card-body flex flex-col items-center justify-center">
              <h2 className="card-title border-2 rounded-full p-3 font-bold text-2xl">
                {card.id}
              </h2>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
   </div>
  );
};

export default Roadmap;
