import type { NextPage } from "next";
import { Navbar } from "../components/navigation/Navbar";
import { urlLocalPath } from "../lib/urlPath";

const AboutPage: NextPage = () => {
  return (
    <>
      <div>
        <Navbar page="about" />
        <div className="my-5 px-20 text-justify">
          <h1 id="1-table-of-contents">1. Table of Contents</h1>
          <ul className="list-inside max-w-sm">
            <li>
              <a href="#1-table-of-contents" className="text-xl">
                <div className="hover:bg-background-600">
                  1. Table of Contents
                </div>
              </a>
            </li>
            <li>
              <a href="#2-emurr-unit" className="text-xl">
                <div className="hover:bg-background-600">2. EMURR Unit</div>
              </a>
              <ul className="list-inside">
                <li className="hover:bg-background-600">
                  <a href="#21-itemized-list" className="pl-5 text-md ">
                    2.1. Itemized List
                  </a>
                </li>
                <li>
                  <a href="#22-setup">
                    <div className="pl-5 text-md hover:bg-background-600">
                      2.2. Setup
                    </div>
                  </a>
                  <ul className="list-inside">
                    <li className="hover:bg-background-600">
                      <a href="#221-battery-power" className="pl-10 text-sm">
                        2.2.1. Battery Power
                      </a>
                    </li>
                    <li className="hover:bg-background-600">
                      <a
                        href="#222-connecting-ethernet--power-supply"
                        className="text-sm pl-10"
                      >
                        2.2.2. Connecting Ethernet &amp; Power Supply
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#3-tour-site-builder" className="text-xl">
                <div className="hover:bg-background-600">
                  3. Tour Site Builder
                </div>
              </a>
              <ul className="list-inside pl-5">
                <li className="hover:bg-background-600">
                  <a href="#31-making-a-site">3.1. Making a Site</a>
                </li>
                <li className="hover:bg-background-600">
                  <a href="#32-transferring-sites-to-the-pi">
                    3.2. Transferring Sites to the Pi
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <br />
          <h1 id="2-emurr-unit">2. EMURR Unit</h1>
          <h2 id="21-itemized-list">2.1. Itemized List</h2>
          <div className="grid grid-cols-2">
            <div>
              <p>What is in an EMURR Unit?</p>
              <ul className="list-disc list-inside">
                <li>
                  Raspberry Pi
                  <ul className="list-disc list-inside">
                    <li>Power Cable</li>
                    <li>Micro SD Card Operating System</li>
                  </ul>
                </li>
                <li>Battery</li>
                <li>
                  TP Link Router
                  <ul className="list-disc list-inside">
                    <li>Power Cable</li>
                    <li>Backpack Mount</li>
                    <li>Battery &amp; Rasbperry Pi Mount</li>
                  </ul>
                </li>
                <li>Ethernet Cable</li>
              </ul>
            </div>
            <img
              className="max-w-xs max-h-30 m-2"
              src={`${urlLocalPath}/images/userman/unit.jpg`}
              alt="top down image of EMURR unit"
            />
          </div>
          {/* <!-- TODO: CHDR contact --> */}
          <p>
            If any parts are missing, damaged, or malfunctioning please contact
            CHDR labs.
          </p>
          <h2 id="22-setup">2.2. Setup</h2>
          {/* <!-- TODO: Images at each step --> */}
          <h3 id="221-battery-power">2.2.1. Battery Power</h3>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>Turn on battery</li>
            <li>
              Ensure battery shows four solid green lights. This indicates a
              full charge.
              <ol className="list-decimal list-inside">
              <img
                    className="m-5"
                    src={`${urlLocalPath}/images/userman/charge.jpg`}
                    alt="top down image of EMURR unit"
                    width="200"
                    height="200"
                  />
              </ol>
            </li>
          </ol>
          <br />
          <h3 id="222-connecting-ethernet--power-supply">
            2.2.2. Connecting Ethernet &amp; Power Supply
          </h3>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              Ethernet from Pi to router. Ensure that the ethernet from the Pi
              goes to one of the orange ethernet ports. <strong>Not</strong> the
              blue internet port.
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
              <img
                    className="m-5"
                    src={`${urlLocalPath}/images/userman/ethernet.jpg`}
                    alt="top down image of EMURR unit"
                    width="200"
                    height="200"
                  />
              </ol>
            </li>
            <li>
              Power from battery to router
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Connect power supply from battery to router</li>
                <li>
                  Turn on router by pressing the power button on the back side.
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <img
                        className="m-5"
                        src={`${urlLocalPath}/images/userman/router-back-power.jpg`}
                        alt="back of the router when powered"
                        width="200"
                        height="200"
                      />
                  </ol>
                </li>
                <li>
                  Verify the router is powered by all lights turning on followed
                  by a blinking green power light.
                </li>
                <li>
                  Wait ~15 seconds for the two wi-fi lights. This indicates
                  wi-fi is being provided at <code>TP-Link_EMURR_5G</code>.
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <img
                        className="m-5"
                        src={`${urlLocalPath}/images/userman/router-front-power.jpg`}
                        alt="front of the router when powered"
                        width="200"
                        height="200"
                      />
                    <img
                        className="m-5"
                        src={`${urlLocalPath}/images/userman/wifi-screenshot.png`}
                        alt="screenshot of wifi name"
                        width="200"
                        height="300"
                      />
                  </ol>
                </li>
              </ol>
              <blockquote>
                <p>
                  Note: You can also use <code>TP-Link_EMURR</code> but we have
                  seen less issues when using the 5G counterpart.
                </p>
              </blockquote>
            </li>
            <li>
              Power from battery to Pi
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Connect battery USB to Pi micro USB</li>
                <li>
                  Ensure the Pi is powered on by seeing a solid red LED light in
                  the front
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <img
                        className="m-5"
                        src={`${urlLocalPath}/images/userman/pi-back-power.jpg`}
                        alt="raspberry pi cables when powered"
                        width="200"
                        height="200"
                      />
                   <img
                        className="m-5"
                        src={`${urlLocalPath}/images/userman/pi-front-power.jpg`}
                        alt="raspberry pi LEDS when powered"
                        width="200"
                        height="200"
                      />
                  </ol>
                </li>
              </ol>
              <blockquote>
                <p>
                  Note: if the red (right, closest to micro USB port) LED is
                  blinking this implies a low voltage.
                </p>
              </blockquote>
            </li>
          </ol>
          <br />
          <h1 id="3-tour-site-builder">3. Tour Site Builder</h1>
          <h2 id="31-making-a-site">3.1. Making a Site</h2>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              Navigate to the EMURR website{" "}
              <a href="https://chdr.cs.ucf.edu/emurr">chdr.cs.ucf.edu/emurr</a>
            </li>
            <li>
              Click <code>Login</code> at the top right if not already logged in
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  If this is your first time, either register on the left hand
                  side or authenticate on the right
                </li>
                <li>
                  Otherwise you can login on the left or also authenticate on
                  the right
                </li>
              </ol>
            </li>
            <li>
              Click profile picture at the top right
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  Select <code>dashboard</code> in the drop down
                </li>
              </ol>
            </li>
            <li>
              Click <code>Create a New Tour</code>
            </li>
            <li>
              You should be brought to the tour editor
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  If not, click <code>Edit</code> on the new tour's card
                </li>
              </ol>
            </li>
            <li>Change the tour name as desired at the top left</li>
            <li>
              Add new pages on the sidebar by clicking{" "}
              <code>Create New Page</code>
            </li>
            <li>
              Edit pages by clicking on the name <code>Untitled</code>
            </li>
            <li>
              Edit page names as desired by hovering the page and clicking{" "}
              <code>Edit</code>. When done click <code>Save</code>
            </li>
            <li>
              To change the URL that pages will be displayed at select the{" "}
              <code>link icon</code> on the page
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  Note: This is only the end of the url. See{" "}
                  <a href="#transferring-sites-to-the-pi">
                    Transferring Sites to the Pi
                  </a>{" "}
                  for more detail
                </li>
                <li>
                  If there is no custsom URL one will be assigned based on the
                  page's hidden ID. See{" "}
                  <a href="#transferring-sites-to-the-pi">
                    Transferring Sites to the Pi
                  </a>{" "}
                  for more detail
                </li>
              </ol>
            </li>
            <li>Create your pages as desired in the editor</li>
            <li>
              Ensure to save pages at the top <code>Save</code> button regularly
              to not lose changes
            </li>
          </ol>
          <br />
          <p>Editor Features List</p>
          <p>
            <strong>From Left to Right</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>Heading</li>
            <li>Font</li>
            <li>Table</li>
            <li>
              Common Text Edits
              <ul className="list-disc list-inside">
                <li>Bold</li>
                <li>Italic</li>
                <li>Underline</li>
                <li>Strikethrough</li>
                <li>Subscript</li>
                <li>Superscript</li>
                <li>Highlight</li>
              </ul>
            </li>
            <li>
              Text Placement
              <ul className="list-disc list-inside">
                <li>Left</li>
                <li>Center</li>
                <li>Right</li>
                <li>Inline</li>
              </ul>
            </li>
            <li>Code Block</li>
            <li>Unordered List</li>
            <li>Ordered List</li>
            <li>Block Quote</li>
            <li>Horizontal Rule</li>
            <li>Custom URL</li>
            <li>Insert Image</li>
            <li>Remove Styling</li>
            <li>Undo</li>
            <li>Redo</li>
          </ul>
          <br />
          <h2 id="32-transferring-sites-to-the-pi">
            3.2. Transferring Sites to the Pi
          </h2>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              To perform transfer move the downloaded folder to a USB stick
            </li>
          </ol>
          {/* <!-- TODO: explain why toursite --> */}
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside"> start="2">
            <li>Ensure the folder downloaded is named &quot;toursite&quot;</li>
            <li>Plug the USB into the Rasbperry Pi</li>
            <li>Wait until the green LED stops flashing</li>
            <li>
              When the LED stays lit the tours are transferred. Unplug the USB.
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  If the LED does not stop blinking or does not stay lit there
                  has been an error. Try Again.
                </li>
              </ol>
            </li>
            <li>
              Tours are now accessible on the <code>TP-LINK_EMURR_5G</code>{" "}
              wi-fi. Connect to it to test.
            </li>
            <li>
              To find the directory of all pages go to the URL{" "}
              <code>emurr.local/toursite</code>
            </li>
            <li>
              Pages will be accessible at the URL{" "}
              <code>emurr.local/toursite/&lt;custom-url&gt;</code> without{" "}
              <code>&lt;</code> and <code>&gt;</code>.
            </li>
            <li>
              If using NFC tags ensure they point to the correct URL formatted
              in the previous step
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  Visiting institutions should set their NFC tags before
                  arrival. Request their EMURR NFC Tag URLs to ensure you have
                  the correct URLs for your tour.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

AboutPage.displayName = "About";

export default AboutPage;
