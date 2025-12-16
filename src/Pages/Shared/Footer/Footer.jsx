import React from "react";
import logo from "../../../assets/ChallengeHive.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="w-11/12 mx-auto pt-2 text-center md:text-start">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-3 justify-center items-center">
        <div>
          <img src={logo} alt="Logo" className="h-20 w-20 rounded-full border-2 " />
          <h1 className="font-bold">ChallengeHive</h1>
        </div>
        <div>
          <h1>Copyright © 2025 ChallengeHive </h1>
        </div>
        <div  className="text-center mx-auto">
          <ul>
            <li className="text-2xl flex gap-2 font-bold items-center"> 
              <FaFacebook /> FaceBook
            </li>
            <li className="text-2xl flex gap-2 font-bold items-center">
              <FaLinkedin /> Linkedin
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
