import { DisplayState } from "../helper/types";
import { formatTime } from "../helper/help";
import { FaPause, FaPlay, FaUndo } from "react-icons/fa";

interface DisplayProps {
  displayState: DisplayState;
  reset: () => void;
  startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
  displayState,
  reset,
  startStop,
}) => {
  let red = "text-red-600";
  let white = "text-white";
  let col = displayState.time < 60 ? red: white;
  return (
    <div className="text-center">
      <div className="border-4  rounded-full border-purple-950 px-20 py-6 ">
        <h4 id="timer-label" className="text-3xl">{displayState.timeType}</h4>
        <h4 id="time-left" className={'text-7xl mt-3 '+col}>{formatTime(displayState.time)}</h4>
      </div>
      <div className="flex justify-center gap-x-10 mt-4 ">
        <button id="start_stop"className="flex" onClick={() => startStop(displayState)}>  <FaPlay/> <FaPause/> </button>
        <button id="reset" onClick={reset}><FaUndo/></button>
      </div>
    </div>
  );
}

export default Display;