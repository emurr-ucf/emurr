import { useState } from "react"

export const Logo = () => {
    const [logo, setLogo] = useState(true);

    const clicked = () => {
        setLogo(!logo);
    }

    return (
        <>
            <div>
                <div className="flex items-center justify-center relative">
                    <div className="p-1 z-50">
                        <img className="w-24" src={`${logo ? "/images/EMURRPie.svg" : "/images/EMURRCircuit.svg"}`} onClick={clicked} />
                    </div>
                    <div className="bg-pink-300 rounded-full h-36 absolute w-36 animate-ping"></div>
                </div>
            </div>
        </>
    )
}