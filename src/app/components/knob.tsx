import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface TimeSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  interval: number;
  type: string;
}


interface KnobInterface {
  name:string,
  idName: string,
  idDec:string,
  idInc: string,
  idSpan:string,
  setter: TimeSetterProps
  
}

export default function Knob({name, idName, idDec, idInc, idSpan, setter}:KnobInterface) {

  return (
    <div>
      <h4 id={idName} className="text-3xl"> {name}</h4>
      <div className="text-center flex justify-around my-3">
        <button id={idDec} className="text-3xl" onClick={() => (setter.time > setter.min ? setter.setTime(setter.time-setter.interval) : null)}><FaArrowDown/></button>
        <span id={idSpan} className="text-3xl">{setter.time/setter.interval}</span>
        <button id={idInc} className="text-3xl" onClick={() => (setter.time < setter.max ? setter.setTime(setter.time+setter.interval) : null)}><FaArrowUp/></button>
      </div>

    </div>
  );
}
