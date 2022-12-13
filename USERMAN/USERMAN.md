# 1. [Table of Contents](#1-table-of-contents)

- [1. Table of Contents](#1-table-of-contents)
- [2. EMURR Unit](#2-emurr-unit)
  - [2.1. Itemized List](#21-itemized-list)
  - [2.2. Setup](#22-setup)
    - [2.2.1. Battery Power](#221-battery-power)
    - [2.2.2. Connecting Ethernet \& Power Supply](#222-connecting-ethernet--power-supply)
- [3. Tour Site Builder](#3-tour-site-builder)
  - [3.1. Making a Site](#31-making-a-site)
  - [3.2. Editor Features List](#32-editor-features-list)
  - [3.3. Transferring Sites to the Pi](#33-transferring-sites-to-the-pi)
- [4. NFC Tags](#4-nfc-tags)
  - [4.1. General NFC Knowledge](#41-general-nfc-knowledge)
    - [4.1.1. Recommended NFC Application](#411-recommended-nfc-application)
    - [4.1.2. How to Set an NFC Tag](#412-how-to-set-an-nfc-tag)
      - [4.1.2.1. Prep](#4121-prep)
      - [4.1.2.2. Setting](#4122-setting)
    - [4.1.3. How to Read an NFC Tag](#413-how-to-read-an-nfc-tag)
      - [4.1.3.1. Prep](#4131-prep)
      - [4.1.3.2. Reading](#4132-reading)
  - [4.2. Visting Institution Tags](#42-visting-institution-tags)
  - [4.3. User Setup Tags](#43-user-setup-tags)
  - [4.4. Notes: NFC Alternatives](#44-notes-nfc-alternatives)
    - [4.4.1. Exposed Filesystem](#441-exposed-filesystem)
    - [4.4.2. QR Codes](#442-qr-codes)

<br>

# 2. EMURR Unit

## 2.1. Itemized List

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

If any parts are missing, damaged, or malfunctioning please contact CHDR labs `chdr@ucf.edu`

## 2.2. Setup

### 2.2.1. Battery Power

1. Turn on battery
2. Ensure battery shows four solid green lights. This indicates a full charge. <br> <img src="./images/charge.jpg" alt="top down image of EMURR unit" width="200" height="200"/> <br>

### 2.2.2. Connecting Ethernet & Power Supply

1. Ethernet cable from Pi to the router. Ensure that the ethernet cable from the Pi goes to one of the orange ethernet ports and **Not** the blue internet port. <br> <img src="./images/ethernet.jpg" alt="top down image of EMURR unit" width="200" height="200"/> <br>
2. Power from battery to router
   1. Connect power supply from battery to router
   2. Turn on router by pressing the power button on the back side. <br> <img src="./images/router-back-power.jpg" alt="back of the router when powered" width="200" height="200"/> <br>
   3. Verify the router is powered by all lights turning on followed by a blinking green power light. <br> <img src="./images/router-front-power.jpg" alt="front of the router when powered" width="200" height="200"/> <br>
   4. Wait ~15 seconds for the two wi-fi lights. This indicates wi-fi is being provided at `TP-Link_EMURR` or `TP-Link_EMURR_5G`. <br> <img src="./images/wifi-screenshot.png" alt="screenshot of wifi name" width="200" height="300"/> <br>
      > Note: You can also use `TP-Link_EMURR` but we have seen less issues when using the 5G counterpart.
3. Power from battery to Pi

   1. Connect the Pi to the battery using a USB to micro-USB cable <br><img src="./images/pi-back-power.jpg" alt="raspberry pi cables when powered" width="200" height="200"/><br>
   2. Ensure the Pi is powered on by seeing a solid red LED light in the front <br><img src="./images/pi-front-power.jpg" alt="raspberry pi LEDS when powered" width="200" height="200"/><br>
      > Note: if the red (right, closest to micro-USB port) LED is blinking this implies a low voltage.

<br>

# 3. Tour Site Builder

## 3.1. Making a Site

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

## 3.2. Editor Features List

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

## 3.3. Transferring Sites to the Pi

1. To perform a transfer, click profile picture at the top right and select `Download` in the drop down
<!-- TODO: explain why toursite -->
2. Move the downloaded folder to a USB stick
3. Ensure the folder downloaded is named "toursite"
4. Plug the USB into the Raspberry Pi
5. Wait until the green LED stops flashing
6. When the LED stays lit the tours are transferred. Unplug the USB.
   1. If the LED does not stop blinking or does not stay lit there has been an error. Try Again.
7. Tours are now accessible on the `TP-LINK_EMURR_5G` wi-fi. Connect to it to test.
8. To find the directory of all pages go to the URL `emurr.local/toursite`
9. Pages will be accessible at the URL `emurr.local/toursite/<custom-url>` without `<` and `>`.
10. If using NFC tags, ensure they point to the correct URL formatted in the previous step
    1. Visiting institutions should set their NFC tags before arrival. Request their EMURR NFC Tag URLs to ensure you have the correct URLs for your tour.

# 4. NFC Tags

Near Field Communication (NFC) tags are compatible with EMURR and are meant to act as a convenience to students and other end users to access EMURR URLs more readily.
Depending on the scenario either the instituion visted or the user with the EMURR unit will have NFC tags.
We will discuss instantiation of NFCs for both scenarios but first we will discuss general use NFC of tags.
Finally, we will touch on NFC alternatives as some owners of an EMURR unit may find they have preference to them instead.

## 4.1. General NFC Knowledge

In order to both set and read an NFC tag you will need an NFC enabled device. If you are unsure if your device is NFC enabled check [this](https://en.wikipedia.org/wiki/List_of_NFC-enabled_mobile_devices) wiki article listing NFC enabled devices. If you are still unsure manually test with an NFC tag.

### 4.1.1. Recommended NFC Application

Depending on your use case you may or may not need an NFC application.

The NFC application recommended by EMURR is NFC Tools on the [Google Play Store](https://play.google.com/store/apps/dev?id=6943435756825055171&hl=en_US&gl=US) or [App Store](https://apps.apple.com/us/app/nfc-tools/id1252962749) by wakdev. It assist with interacting with NFC tags for students and tour guides.

### 4.1.2. How to Set an NFC Tag

**Note:** You will only need to do this if you are visiting an institution that will not set tags for you. If you are visiting such an institution skip this section.

#### 4.1.2.1. Prep

In order to set an NFC tag you will need:

1. NFC enabled device
2. [NFC Application](#411-recommended-nfc-application)

#### 4.1.2.2. Setting

Now that we have everything we need let's get started setting the tag:

1. Open NFC Tools and navigate to where it says `Write`
2. Select `Add a Record`
3. Select `URL/URI`
4. Select `Edit` and choose an `http://` prefix
5. Format the remaining URL in the form of `emurr/toursite/[pagename].html` without brackets
   1. **NOTE:** Be _very_ careful that the URL of this is set properly
   2. If formatted correctly the resulting url will be `http://emurr/toursite/[pagename].html` without brackets
6. Once done formatting your URL select `Write` to begin writing to the tag
7. Hold your NFC enabled device close to the tag (less than 4cm away).
   1. If it is not recognizing the tag, ensure the tag is not resting on a metallic surface as this may interfere with the signal
   2. If you still have issues pull the device away and approach it again
   3. If you still have issues try a different tag, as the current one may be malfunctioning
   4. If you still have issues please check that your device is NFC enabled and capable of writing to tags
8. Your tag should now be written. You can check by reading the tag to ensure this is the case.

### 4.1.3. How to Read an NFC Tag

#### 4.1.3.1. Prep

In order to read an NFC tag you will need:

1. An NFC Enabled Device
   1. If the device is _not_ an iPhone 8 or higher you will most likely need an [NFC Application](#411-recommended-nfc-application)

#### 4.1.3.2. Reading

In order to read an NFC tag this process will depend on the device

**DISCLAIMER:** We reference devices as "newer" or "older" but we do not have an exhaustive list of which devices are which. We include specific names where we can.

**For Newer iPhones & Androids:**

<!-- TODO: Update with known versions -->

1. Simply tap your phone to the NFC tag. Your phone will have a built in scanner passively listening for NFC technology, typically towards the top and back of the phone.

<br>

**For Most iPhones:**

- At least as old as iPhone 8

1. Go to Settings
2. Scroll down and select Control Center
3. Add `NFC Tag Reader` to Included Controls
4. Confirm by swiping from the bottom of the screen and selecting the NFC symbol
5. Simply tap your phone against the NFC tag

<br>

**For Most Androids:**

1. You will need to read your tags through an [NFC Application](#411-recommended-nfc-application)
2. Once you enter the app you can select `Read`
3. Simply tap your phone against the NFC tag

## 4.2. Visting Institution Tags

We anticipate this to be the primary method of interacting with NFC tags. In this scenario the owner of the EMURR unit does not own nor sets the NFC tags.

What is required of the owner of the EMURR unit is:

1. Confirm with the institution you are visiting that they have NFC tags set up
2. Ensure they are of the format `http://emurr/toursite/[pagename].html` without brackets
3. In the toursite editor web app navigate to the left hand side
4. Rename the pages and note the custom URL
5. Ensure that the `[pagename]` in your custom URL and the NFC tag are the same
6. Download your pages as needed!

## 4.3. User Setup Tags

If you are setting up your own tags simply ensure that you [set](#412-how-to-set-an-nfc-tag) your tags. Once finished ensure that they match with the page's custom URL:

1. Ensure the NFC tags are of the format `http://emurr/toursite/[pagename].html` without brackets
2. In the toursite editor web app navigate to the left hand side
3. Rename the pages and note the custom URL
4. Ensure that the `[pagename]` in your custom URL and the NFC tag are the same
5. Download your pages as needed!

## 4.4. Notes: NFC Alternatives

We understand NFC tags are not a catch-all solution. They are sometimes inconsistent and require a bit of setup for users. So we wanted to make sure we talked about alternatives that we provide for users.

### 4.4.1. Exposed Filesystem

First we expose the filesystem. This is not only a failsafe for malfunctioning NFC tags but also a reliable option for those that do not like NFC tags. Here's how users can connect:

1. Have the user connect to the EMURR wi-fi
2. Once connected navigate to `http://emurr/toursite/`
3. From here the user should see all of the pages hosted, no NFC necessary

### 4.4.2. QR Codes

A fun alternative to NFC tags are QR codes. Most people have gotten accustomed to QR code menus and the like, so why not EMURR?

Simply generate a QR code with a URL of the format `http://emurr/toursite/[pagename].html` without the brackets,like NFC tags. This will serve the same purpose as an NFC tag. User interaction with QR codes will vary by device but most smartphones have a built-in way of detecting them.

