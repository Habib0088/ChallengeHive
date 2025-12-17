import React from "react";

const AboutUs = () => {
  return (
    // 0040DE
    <div className="bg-[#3A67C7] text-white">
      <div className="w-11/12 mx-auto">
        <div className="md:py-11">
          <h1 className="text-center text-4xl font-bold "> Introduction</h1>
          <p className="font-semibold text-center md:w-9/12 mx-auto  md:py-5">
            We are an online contest management platform designed to connect
            participants with exciting contests and real rewards. Our goal is to
            make competitions fair, transparent, and accessible to everyone.
          </p>
        </div>
        <div>
          <h1 className="text-center text-4xl font-bold "> Why We built this platform</h1>
          <p className="font-semibold md:w-9/12 mx-auto text-center md:py-5">
            Our mission is to provide a secure and engaging platform where users can showcase their skills, participate confidently, and win genuine prizes.
          </p>
        </div>
        <div>
          <h1 className="text-center text-4xl font-bold "> What Makes You Different</h1>
          <p className="font-semibold text-center md:w-9/12 mx-auto md:py-5">
            <ul className="list-disc list-inside font-semibold text-center md:py-5">
                <li>Fair & transparent winner selection</li>
                <li>Easy contest participation</li>
                <li>Secure payments</li>
                <li>Real winners, real rewards</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
