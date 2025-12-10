import { useEffect, useState } from "react";

const Countdown = ({ deadline, className }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const end = new Date(deadline).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ finished: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (timeLeft.finished) {
    return (
      <p className={`font-bold ${className}`}>
        Contest Ended
      </p>
    );
  }

  return (
    <p className={`text-lg font-bold ${className}`}>
      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
    </p>
  );
};

export default Countdown;
