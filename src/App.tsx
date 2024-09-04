import React, { useState, useEffect } from "react";
import "./components/Button/Button";
import "./App.css";
import Button from "./components/Button/Button";

const App = () => {
  const [millieSeconds, setmillieSeconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        setmillieSeconds((prevmillieSeconds) => (prevmillieSeconds + 1) % 100);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (millieSeconds === 99 && isActive) {
      setSeconds((prevSeconds) => (prevSeconds + 1) % 60);
    }
  }, [millieSeconds, isActive]);

  useEffect(() => {
    if (seconds === 59 && millieSeconds === 99 && isActive) {
      setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
    }
  }, [seconds, millieSeconds, isActive]);

  useEffect(() => {
    if (minutes === 59 && seconds === 59 && millieSeconds === 99 && isActive) {
      setHours((prevHours) => prevHours + 1);
    }
  }, [minutes, seconds, millieSeconds, isActive]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);

  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setmillieSeconds(0);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="stopwatch__container">
          <div className="timer">
            <h1 className="times">
              {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:
              {formatTime(millieSeconds)}
            </h1>
          </div>
          <div className="actions">
            <div>
              {!isActive && (
                <Button text="Start" color="green" handleChange={startTimer} />
              )}
              <Button text="Reset" color="white" handleChange={resetTimer} />
              <Button text="Stop" color="red" handleChange={stopTimer} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
