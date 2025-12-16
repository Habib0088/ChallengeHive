import React from "react";
import { motion } from "framer-motion";
import "./bannerStyle.css";

const Banner = () => {
  return (
    <div className="banner flex flex-col items-center justify-center h-screen text-center gap-4 ">
      
      <motion.h1
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold text-white"
      >
        Challenge Hive
      </motion.h1>

      <motion.p
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-2xl font-bold text-white"
      >
        Let you create, manage, and join contests easily—everything in one smart platform.
      </motion.p>

    </div>
  );
};

export default Banner;
