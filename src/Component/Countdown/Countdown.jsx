import React, { useEffect, useState } from "react";

const Countdown = ({ deadline, className }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!deadline) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return <span className={className}>{timeLeft}</span>;
};

export default Countdown;
