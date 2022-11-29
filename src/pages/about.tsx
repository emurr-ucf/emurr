import type { NextPage } from "next";
import { Navbar } from "../components/navigation/Navbar";
import { urlLocalPath } from "../lib/urlPath";

const AboutPage: NextPage = () => {
  return (
    <>
      <div>
        <Navbar page="about" />
        <div className="my-5 px-20 text-justify">
          <h1>User Manual</h1>
          <h2 id="table-of-contents">Table of Contents</h2>
          <ul className="list-inside max-w-sm">
            <li>
              <a href="#1-emurr-unit" className="text-xl">
                <div className="hover:bg-background-600">1. EMURR Unit</div>
              </a>
              <ul className="list-inside">
                <li className="hover:bg-background-600">
                  <a href="#11-itemized-list" className="pl-5 text-md ">
                    1.1. Itemized List
                  </a>
                </li>
                <li>
                  <a href="#12-setup">
                    <div className="pl-5 text-md hover:bg-background-600">1.2. Setup</div>
                  </a>
                  <ul className="list-inside">
                    <li className="hover:bg-background-600">
                      <a href="#121-battery-power" className="pl-10 text-sm">
                        1.2.1. Battery Power
                      </a>
                    </li>
                    <li className="hover:bg-background-600">
                      <a href="#122-connecting-ethernet-power-supply" className="text-sm pl-10">
                        1.2.2. Connecting Ethernet &amp; Power Supply
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#2-tour-site-builder" className="text-xl">
                <div className="hover:bg-background-600">2. Tour Site Builder</div>
              </a>
              <ul className="list-inside pl-5">
                <li className="hover:bg-background-600">
                  <a href="#21-making-a-site">2.1. Making a Site</a>
                </li>
                <li className="hover:bg-background-600">
                  <a href="#22-editor-features-list">2.2. Editor Features List</a>
                </li>
                <li className="hover:bg-background-600">
                  <a href="#23-transferring-sites-to-the-pi">2.3. Transferring Sites to the Pi</a>
                </li>
              </ul>
            </li>
          </ul>
          <br />
          <h1 id="1-emurr-unit">1. EMURR Unit</h1>
          <h2 id="11-itemized-list">1.1. Itemized List</h2>
          <div className="grid grid-cols-2">
            <div>
              <p>What is in an EMURR Unit?</p>
              <ul className="list-disc list-inside">
                <li>
                  Raspberry Pi
                  <ul className="list-disc list-inside indent-6">
                    <li>Power Cable</li>
                    <li>MicroSD Card for Operating System</li>
                  </ul>
                </li>
                <li>Battery</li>
                <li>
                  TP Link Router
                  <ul className="list-disc list-inside indent-6">
                    <li>Power Cable</li>
                    <li>Backpack Mount</li>
                    <li>Battery &amp; Rasbperry Pi Mount</li>
                  </ul>
                </li>
                <li>Ethernet Cable</li>
              </ul>
            </div>
            <img className="max-w-xs max-h-30 m-2" src={`${urlLocalPath}/images/userman/unit.jpg`} alt="top down image of EMURR unit" />
          </div>
          {/* <!-- TODO: CHDR contact --> */}
          <p>If any parts are missing, damaged, or malfunctioning please contact CHDR labs.</p>
          <h2 id="12-setup">1.2. Setup</h2>
          {/* <!-- TODO: Images at each step --> */}
          <h3 id="121-battery-power">1.2.1. Battery Power</h3>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>Turn on battery</li>
            <li>
              Ensure battery shows four solid green lights. This indicates a full charge.
              <ol className="list-decimal list-inside">
                <img className="m-5" src={`${urlLocalPath}/images/userman/charge.jpg`} alt="top down image of EMURR unit" width="200" height="200" />
              </ol>
            </li>
          </ol>
          <br />
          <h3 id="122-connecting-ethernet-power-supply">1.2.2. Connecting Ethernet &amp; Power Supply</h3>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              Ethernet cable from Pi to the router. Ensure that the ethernet cable from the Pi goes to one of the orange ethernet ports and <strong>Not</strong> the blue internet port.
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <img className="m-5" src={`${urlLocalPath}/images/userman/ethernet.jpg`} alt="top down image of EMURR unit" width="200" height="200" />
              </ol>
            </li>
            <li>
              Power from battery to router
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Connect power supply from battery to router</li>
                <li>
                  Turn on router by pressing the power button on the back side.
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                    <img className="m-5" src={`${urlLocalPath}/images/userman/router-back-power.jpg`} alt="back of the router when powered" width="200" height="200" />
                  </ol>
                </li>
                <li>Verify the router is powered by all lights turning on followed by a blinking green power light.</li>
                <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <img className="m-5" src={`${urlLocalPath}/images/userman/router-front-power.jpg`} alt="front of the router when powered" width="200" height="200" />
                </ol>
                <li>
                  Wait ~15 seconds for the two wi-fi lights. This indicates wi-fi is being provided at <code>TP-Link_EMURR</code> or <code>TP-Link_EMURR_5G</code>.
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                    <img className="m-5" src={`${urlLocalPath}/images/userman/wifi-screenshot.png`} alt="screenshot of wifi name" width="200" height="300" />
                  </ol>
                </li>
              </ol>
              <blockquote>
                <p>
                  Note: You can also use <code>TP-Link_EMURR</code> but we have seen less issues when using the 5G counterpart.
                </p>
              </blockquote>
            </li>
            <li>
              Power from battery to Pi
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Connect the Pi to the battery using a USB to micro-USB cable</li>
                <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <img className="m-5" src={`${urlLocalPath}/images/userman/pi-back-power.jpg`} alt="raspberry pi cables when powered" width="200" height="200" />
                </ol>
                <li>
                  Ensure the Pi is powered on by seeing a solid red LED light in the front
                  <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                    <img className="m-5" src={`${urlLocalPath}/images/userman/pi-front-power.jpg`} alt="raspberry pi LEDS when powered" width="200" height="200" />
                  </ol>
                </li>
              </ol>
              <blockquote>
                <p>Note: if the red (right, closest to micro USB port) LED is blinking this implies a low voltage.</p>
              </blockquote>
            </li>
          </ol>
          <br />
          <h1 id="2-tour-site-builder">2. Tour Site Builder</h1>
          <h2 id="21-making-a-site">2.1. Making a Site</h2>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              Navigate to the EMURR website <a href="https://chdr.cs.ucf.edu/emurr">chdr.cs.ucf.edu/emurr</a>
            </li>
            <li>
              Click <code>Login</code> at the top right if not already logged in
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>If this is your first time, either register on the left hand side or authenticate on the right</li>
                <li>Otherwise you can login on the left or also authenticate on the right</li>
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
                  If not, click <code>Edit</code> on the new tour&apos;s card
                </li>
              </ol>
            </li>
            <li>Change the tour name as desired and add a brief tour description at the top left</li>
            <li>
              Add new pages on the sidebar by clicking the <code>plus-add</code> icon
            </li>
            <li>
              Edit pages by selecting the page and click on the <code>edit</code> icon. A modal pop ups on the screen to:
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Edit page name. </li>
                <li>
                  Edit the URL that the page will be displayed at. Note this is only the end of the URL. If there is no custom URL one will be assigned based on the page&apos;s hidden ID. See{" "}
                  <a href="#transferring-sites-to-the-pi">Transferring Sites to the Pi</a> for more details
                </li>
                <li>
                  When done click <code>Save</code>.{" "}
                </li>
              </ol>
            </li>
            <li>
              Edit page names as desired by hovering the page and clicking <code>Edit</code>. When done click <code>Save</code>
            </li>
            <li>Create your pages as desired in the editor</li>
            <li>
              Ensure to save pages at the top <code>Save</code> button regularly to not lose changes
            </li>
          </ol>
          <br />
          <h2 id="22-editor-features-list">2.2. Editor Features List</h2>
          <p>
            <strong>From Left to Right</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>Heading</li>
            <li>Font</li>
            <li>
              Common Text Edits
              <ul className="list-disc list-inside indent-6">
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
              <ul className="list-disc list-inside indent-6">
                <li>Left</li>
                <li>Center</li>
                <li>Right</li>
                <li>Inline</li>
              </ul>
            </li>
            <li>Code Block</li>
            <li>BulletList</li>
            <li>Ordered List</li>
            <li>Block Quote</li>
            <li>Horizontal Rule</li>
            <li>Table Actions</li>
            <li>Custom URL</li>
            <li>Insert Image or Video</li>
            <li>Clear Format</li>
            <li>Undo</li>
            <li>Redo</li>
          </ul>
          <br />
          <h2 id="23-transferring-sites-to-the-pi">2.3. Transferring Sites to the Pi</h2>
          <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
            <li>
              To perform transfer, click profile picture at the top right and select <code>Download</code> in the drop down
            </li>
            <li>Move the downloaded folder to a USB stick</li>
            <li>Ensure the folder downloaded is named &quot;toursite&quot;</li>
            <li>Plug the USB into the Rasbperry Pi</li>
            <li>Wait until the green LED stops flashing</li>
            <li>
              When the LED stays lit the tours are transferred. Unplug the USB.
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>If the LED does not stop blinking or does not stay lit there has been an error. Try Again.</li>
              </ol>
            </li>
            <li>
              Tours are now accessible on the <code>TP-LINK_EMURR_5G</code> wi-fi. Connect to it to test.
            </li>
            <li>
              To find the directory of all pages go to the URL <code>emurr.local/toursite</code>
            </li>
            <li>
              Pages will be accessible at the URL <code>emurr.local/toursite/&lt;custom-url&gt;</code> without <code>&lt;</code> and <code>&gt;</code>.
            </li>
            <li>
              If using NFC tags ensure they point to the correct URL formatted in the previous step
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Visiting institutions should set their NFC tags before arrival. Request their EMURR NFC Tag URLs to ensure you have the correct URLs for your tour.</li>
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
