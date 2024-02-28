import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Timer() {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setSeconds(60);
    setIsRunning(true);
  };

  return (
    <div className="w-[380px] h-[42px] flex items-center justify-center mt-[22px]">
      <div className={`${seconds === 0 && "hidden"}`}>
        <h2 className={`${seconds != 60 && "hidden"} text-black font-medium `}>
          01:00
        </h2>
        <h2 className={`${seconds == 60 && "hidden"} text-black font-medium  `}>
          00:{seconds < 10 ? "0" : ""}
          {seconds}
        </h2>
      </div>
      {seconds === 0 && (
        <button
          className="text-[#FF9910] text-[16px] font-medium  "
          onClick={handleReset}
        >
          Отправить ещё раз
        </button>
      )}
    </div>
  );
}

export default Timer;
