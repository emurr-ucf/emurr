import { useState } from "react"

export const Logo = () => {
  const [ logo, setLogo ] = useState( true );

  const clicked = () => {
    setLogo( !logo );
  }

  function setImagePrefix () {
    const isProduction = process.env.NODE_ENV === 'production';

    if ( logo ) {
      if ( isProduction ) {
        return "/emurr/images/EMURRCircuit.svg"
      }
      else {
        return "/images/EMURRCircuit.svg";
      }
    }
    else {
      if ( isProduction ) {
        return "/emurr/images/EMURRPie.svg";
      }
      else {
        return "/images/EMURRPie.svg";
      }
    }

  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          {/* <img className="z-40 w-28 h-28 self-center cursor-pointer" src={ `${ logo ? "/images/EMURRCircuit.svg" : "/images/EMURRPie.svg" }` } onClick={ clicked } /> */ }
          <img className="z-40 w-28 h-28 self-center cursor-pointer" src={ setImagePrefix() } alt="" onClick={ clicked } />
          <div className="bg-green-700 rounded-full h-36 absolute w-36 animate-ping"></div>
        </div>
      </div>
    </>
  )
}