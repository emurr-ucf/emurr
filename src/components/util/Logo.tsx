import { useState } from "react";
import { urlLocalPath } from "../../lib/urlPath";

export const Logo = () => {
  const [logo, setLogo] = useState(true);
  const [anim, setAnim] = useState(true);

  const logoClicked = () => {
    setLogo(!logo);
  };

  const animClicked = () => {
    setAnim(!anim);
  };

  function setImagePrefix() {
    if (logo) return `${urlLocalPath}/images/EMURRCircuit.svg`;
    else return `${urlLocalPath}/images/EMURRPie.svg`;
  }

  return (
    <>
      <div>
        <div className="rounded-full flex items-center justify-center relative">
          <img
            className="rounded-full w-28 h-28 self-center cursor-pointer m-0 z-50"
            src={setImagePrefix()}
            alt="outline of an NFC tag. when clicked becomes a pie."
            onClick={logoClicked}
          />
          <div
            className={
              "cursor-pointer rounded-full h-36 absolute w-36" +
              (anim ? " bg-green-500 animate-ping" : " bg-transparent")
            }
            onClick={animClicked}
          />
        </div>
      </div>
    </>
  );
};

