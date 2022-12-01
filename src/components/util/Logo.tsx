import { useState } from "react";
import { urlLocalPath } from "../../lib/urlPath";

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
        <div className="rounded-full flex items-center justify-center relative border-2 border-red-300">
          <div className="border-2 border-sky-500 rounded-full h-36 absolute w-36 animate-ping hover:bg-green-500 hover:z-0" />
          <img
            className="border-2 border-emerald-300 rounded-full w-28 h-28 self-center cursor-pointer m-0 z-50"
            src={setImagePrefix()}
            alt="outline of an NFC tag. when clicked becomes a pie."
            onClick={clicked}
          />
        </div>
      </div>
    </>
  );
};

