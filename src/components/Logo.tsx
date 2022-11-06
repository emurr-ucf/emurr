import { useState } from "react";
import { urlLocalPath } from "../lib/urlPath";

export const Logo = () => {
  const [logo, setLogo] = useState(true);

  const clicked = () => {
    setLogo(!logo);
  };

  function setImagePrefix() {
    if (logo) return `${urlLocalPath}/images/EMURRCircuit.svg`;
    else return `${urlLocalPath}/images/EMURRPie.svg`;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center relative">
          <img
            className="z-40 w-28 h-28 self-center cursor-pointer"
            src={setImagePrefix()}
            alt=""
            onClick={clicked}
          />
          <div className="bg-green-700 rounded-full h-36 absolute w-36 animate-ping"></div>
        </div>
      </div>
    </>
  );
};
