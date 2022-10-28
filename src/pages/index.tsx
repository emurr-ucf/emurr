import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";
import { urlLocalPath } from "../lib/urlPath";

const HomePage: NextPage = () => {
  return (
    <>
      <div className="h-full">
        <Navbar page="home" />
        <div className="flex flex-col px-28 mt-10">
          <div className="text-5xl font-light">Welcome to EMURR</div>
          <div className="flex justify-between mt-5">
            <div className="w-3/5 text-xl font-light text-justify">
              EMURR? I do not even know her! Ok, ok. I will put some lorem ipsum here or whatever. Cupcake ipsum dolor sit amet muffin donut bonbon cake. Cheesecake tiramisu dragée cotton candy wafer icing gingerbread. Jujubes jelly I love ice cream
              I love croissant pudding. Dragée I love jelly beans I love macaroon marzipan candy dragée.
            </div>
            <div className="flex justify-center w-2/5 items-center">
              <Logo />
            </div>
          </div>
          <div className="text-5xl mt-40 font-light">Meet the team</div>
          <div className="flex flex-col justify-between mt-5">
            <div className="text-2xl text-center font-light">Royal Court of House CHDR</div>
            <div className="flex justify-center my-10 gap-10">
              <div className="gap-10">
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
            </div>
            <div className="text-2xl text-center font-light">Knights of House CHDR</div>
            <div className="flex justify-center my-10 gap-10">
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
            </div>
            <div className="flex justify-center my-10 gap-10">
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
              <div>
                <img src={`${urlLocalPath}/images/logo_vert_5.png`} alt="EMURR-Logo" className="w-40 h-40" />
                <div className="text-center font-semibold">EMURR EMURR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
