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
              EMURR? I do not even know her! Ok, ok. I will put some lorem ipsum
              here or whatever. Cupcake ipsum dolor sit amet muffin donut bonbon
              cake. Cheesecake tiramisu dragée cotton candy wafer icing
              gingerbread. Jujubes jelly I love ice cream I love croissant
              pudding. Dragée I love jelly beans I love macaroon marzipan candy
              dragée.
            </div>
            <div className="flex justify-center w-2/5 items-center">
              <Logo />
            </div>
          </div>
          <div className="text-5xl mt-40 font-light">Meet the team</div>
          <div className="flex flex-col justify-between mt-5">
            <div className="text-2xl text-center font-light">
              Royal Court of House CHDR
            </div>
            <div className="flex justify-center my-10 gap-2 w-full">
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/amy.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Dr. Amy Giroux</div>
                <div className="text-center font-light text-gray-800">
                  Lead Sponsor. UCF CHDR Associate Director.
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/evan.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Evan Wallace</div>
                <div className="text-center font-light text-gray-800">
                  Ph.D student under Dr. Giroux of house CHDR. 3D Printing & CAD
                  Wizard.
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/connie.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Connie Harper</div>
                <div className="text-center font-light text-gray-800">
                  Software developing extraordinaire. Defender of the UCF CHDR
                  Server.
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/brook.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Brook Miller</div>
                <div className="text-center font-light text-gray-800">
                  Applications Programmer. Sponsor Inception.
                </div>
              </div>
            </div>
            <div className="text-2xl text-center font-light">
              Knights of House CHDR
            </div>
            <div className="flex justify-center my-10 gap-10">
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/braedon.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Braedon Watkins</div>
                <div className="text-center font-light text-gray-800">
                  Project Manager
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/edelis.jpg`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black object-cover"
                />
                <div className="text-center font-semibold">
                  Edelis Molina Rios
                </div>
                <div className="text-center font-light text-gray-800">
                  Database | Server Admin
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/logo_vert_5.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">Omar Mosa</div>
                <div className="text-center font-light text-gray-800">
                  Frontend Developer
                </div>
              </div>
            </div>
            <div className="flex justify-center my-10 gap-10">
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/team/tye.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">
                  Robert “Tye” Riley
                </div>
                <div className="text-center font-light text-gray-800">
                  Full Stack Developer
                </div>
              </div>
              <div className="flex flex-col items-center w-52">
                <img
                  src={`${urlLocalPath}/images/logo_vert_5.png`}
                  alt="EMURR-Logo"
                  className="max-w-40 max-h-40 rounded-full shadow-md shadow-black"
                />
                <div className="text-center font-semibold">
                  Gian Alvarez Rujel
                </div>
                <div className="text-center font-light text-gray-800">
                  Backend Developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomePage.displayName = "Home";

export default HomePage;
