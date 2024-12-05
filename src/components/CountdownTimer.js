import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(239); // 3 minutes and 59 seconds

  useEffect(() => {
    // If seconds reach 0, clear the interval
    if (seconds === 0) return;

    // Set up the interval
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <div>
      <p>Resend OTP in {formatTime(seconds)} sec</p>
      {seconds === 0 && <button onClick={() => console.log('Resend OTP')}>Resend OTP</button>}
    </div>
  );
};

export default CountdownTimer;