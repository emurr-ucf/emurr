import { useState } from "react"

export const Logo = () => {
  const [logo, setLogo] = useState(true);

  const clicked = () => {
    setLogo(!logo);
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <img className="z-40 w-28 h-28 self-center cursor-pointer" src={`${logo ? "/images/EMURRPie.svg" : "/images/EMURRCircuit.svg"}`} onClick={clicked} />
          <div className="bg-pink-300 rounded-full h-36 absolute w-36 animate-ping"></div>
        </div>
      </div>
    </>
  )
}