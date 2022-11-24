# [Table of Contents](#1-table-of-contents)

- [1. EMURR Unit](#2-emurr-unit)
  - [1.1. Itemized List](#11-itemized-list)
  - [1.2. Setup](#12-setup)
    - [1.2.1. Battery Power](#121-battery-power)
    - [1.2.2. Connecting Ethernet \& Power Supply](#122-connecting-ethernet--power-supply)
- [2. Tour Site Builder](#2-tour-site-builder)
  - [2.1. Making a Site](#21-making-a-site)
  - [2.2. Editor Features List](#22-editor-features-list)
  - [2.3. Transferring Sites to the Pi](#23-transferring-sites-to-the-pi)

<br>

# 1. EMURR Unit

## 1.1. Itemized List

What is in an EMURR Unit?

- Raspberry Pi
  - Power Cable
  - MicroSD Card for Operating System
- Battery
- TP Link Router
  - Power Cable
  - Backpack Mount
  - Battery & Raspberry Pi Mount
- Ethernet Cable

<img src="./images/unit.jpg" alt="top down image of EMURR unit" width="400" height="400"/>

<!-- TODO: CHDR contact -->

If any parts are missing, damaged, or malfunctioning please contact CHDR labs.

## 1.2. Setup

### 1.2.1. Battery Power

1. Turn on battery
2. Ensure battery shows four solid green lights. This indicates a full charge. <br> <img src="./images/charge.jpg" alt="top down image of EMURR unit" width="200" height="200"/> <br>

### 1.2.2. Connecting Ethernet & Power Supply

1. Ethernet cable from Pi to the router. Ensure that the ethernet cable from the Pi goes to one of the orange ethernet ports and **Not** the blue internet port. <br> <img src="./images/ethernet.jpg" alt="top down image of EMURR unit" width="200" height="200"/> <br>
2. Power from battery to router
   1. Connect power supply from battery to router
   2. Turn on router by pressing the power button on the back side. <br> <img src="./images/router-back-power.jpg" alt="back of the router when powered" width="200" height="200"/> <br>
   3. Verify the router is powered by all lights turning on followed by a blinking green power light. <br> <img src="./images/router-front-power.jpg" alt="front of the router when powered" width="200" height="200"/> <br>
   4. Wait ~15 seconds for the two wi-fi lights. This indicates wi-fi is being provided at `TP-Link_EMURR` or `TP-Link_EMURR_5G`. <br> <img src="./images/wifi-screenshot.png" alt="screenshot of wifi name" width="200" height="300"/> <br>
      > Note: You can also use `TP-Link_EMURR` but we have seen less issues when using the 5G counterpart.
3. Power from battery to Pi

   1. Connect the Pi to the battery using a USB to micro-USB cable <br><img src="./images/pi-back-power.jpg" alt="raspberry pi cables when powered" width="200" height="200"/><br>
   2. Ensure the Pi is powered on by seeing a solid red LED light in the front <br><img src="./images/pi-front-power.jpg" alt="raspberry pi LEDS when powered" width="200" height="200"/><br> > Note: if the red (right, closest to micro-USB port) LED is blinking this implies a low voltage.

<br>

# 2. Tour Site Builder

## 2.1. Making a Site

1. Navigate to the EMURR website [chdr.cs.ucf.edu/emurr](https://chdr.cs.ucf.edu/emurr)
2. Click `Login` at the top right if not already logged in
   1. If this is your first time, either register on the left-hand side or authenticate on the right
   2. Otherwise, you can login on the left or also authenticate on the right
3. Click profile picture at the top right
   1. Select `dashboard` in the drop down
4. Click `Create a New Tour`
5. You should be brought to the tour editor
   1. If not, click `Edit` on the new tour's card
6. Change the tour name as desired and add a brief tour description at the top left
7. Add new pages on the sidebar by clicking the plus-add icon
8. Edit pages by selecting the page and click on the `edit` icon. A modal pop ups on the screen to:
   1. Edit page name.
   2. Edit the URL that the page will be displayed at. Note this is only the end of the URL. If there is no custom URL one will be assigned based on the page's hidden ID. See [Transferring Sites to the Pi](#23-transferring-sites-to-the-pi) for more details
   3. When done click `Save`
9. Create your pages as desired in the editor
10. Ensure to save pages at the top `Save` button regularly to not lose changes

<br>

## 2.2. Editor Features List

**From Left to Right**

- Heading
- Font
- Common Text Edits
  - Bold
  - Italic
  - Underline
  - Strikethrough
  - Subscript
  - Superscript
  - Font
  - Highlight
- Text Placement
  - Left
  - Center
  - Right
  - Inline
- Code Block
- Bullet List
- Ordered List
- Block Quote
- Horizontal Rule
- Table Actions
- Insert Image or Video
- Clear Format
- Undo
- Redo

<br>

## 2.3. Transferring Sites to the Pi

1.  To perform a transfer, move the downloaded folder to a USB stick
<!-- TODO: explain why toursite -->
2.  Ensure the folder downloaded is named "toursite"
3.  Plug the USB into the Raspberry Pi
4.  Wait until the green LED stops flashing
5.  When the LED stays lit the tours are transferred. Unplug the USB.
    1.  If the LED does not stop blinking or does not stay lit there has been an error. Try Again.
6.  Tours are now accessible on the `TP-LINK_EMURR_5G` wi-fi. Connect to it to test.
7.  To find the directory of all pages go to the URL `emurr.local`
8.  Pages will be accessible at the URL `emurr.local/<custom-url>` without `<` and `>`.
9.  If using NFC tags, ensure they point to the correct URL formatted in the previous step
    1.  Visiting institutions should set their NFC tags before arrival. Request their EMURR NFC Tag URLs to ensure you have the correct URLs for your tour.
