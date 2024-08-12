'use client'
import { useEffect, useState } from 'react';

import Display from "./components/display";
import Knob from "./components/knob";
import { DisplayState } from "./helper/types";


export default function Home() {

  const min = 60;
  const max = 60 * 60;
  const interval = 60;


  const [breakTime, setBreakTime] = useState(5 * 60); //convert 5 minutes to 300 seconds 
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 2;
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setDisplayState({
      time: 25 * 60,
      timeType: "Session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };


  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning
    }));
  };


  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time,
      timeType: "Session",
      timerRunning: false,
    });
  };



  return (
    <main className="container mx-auto border flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl my-10">25 + 5 Clock</h1>
      <div className="flex gap-x-56">
        <Knob name='Break Length' idName="break-label" idDec='break-decrement' idInc='break-increment' idSpan={'break-length'} setter={{ time: breakTime, interval, setTime: changeBreakTime, min: min, max: max, type: 'Break Time' }} />
        <Knob name='Session Length' idName="session-label" idDec='session-decrement' idInc='session-increment' idSpan='session-length' setter={{ time: sessionTime, interval, setTime: changeSessionTime, min: min, max: max, type: 'Session Time' }} />

      </div>
      <Display displayState={displayState} reset={reset} startStop={startStop} />
      {/* <audio id="beep" src="/AlarmSound" /> */}
      <audio
        id="beep"
        src="/AlarmSound.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio>

      
    </main>
  );
}
