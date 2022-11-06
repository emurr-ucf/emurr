# 1. Table of Contents
- [1. Table of Contents](#1-table-of-contents)
- [2. EMURR Unit](#2-emurr-unit)
  - [2.1. Itemized List](#21-itemized-list)
  - [2.2. Setup](#22-setup)
    - [2.2.1. Battery Power](#221-battery-power)
    - [2.2.2. Connected Devices](#222-connected-devices)
- [3. Tour Site Builder](#3-tour-site-builder)
  - [3.1. Making a Site](#31-making-a-site)
  - [3.2. Transferring Sites to the Pi](#32-transferring-sites-to-the-pi)

# 2. EMURR Unit

## 2.1. Itemized List

What is in an EMURR Unit?
- Raspberry Pi
  - Power Cable
  - Micro SD Card Operating System
- Battery
- TP Link Router
  - Power Cable
  - Backpack Mount
  - Battery & Rasbperry Pi Mount
- Ethernet Cable


<!-- TODO: image of emurr unit -->
[EMURR Unit]()

<!-- TODO: CHDR contact -->
If any parts are missing, damaged, or malfunctioning please contact CHDR labs. 


## 2.2. Setup

<!-- TODO: Images at each step -->
### 2.2.1. Battery Power

1. Turn on battery
2. Ensure battery shows five green lights. This indicates a full charge.

<br>

### 2.2.2. Connected Devices
1. Ethernet from Pi to Router
   1. **ENSURE IN CORRECT PORT**
2. Power from battery to Router
   1.  Turn on Router by pressing the power button on the back side.
3. Power from battery to Pi
   1. Ensure the Pi is on if a red LED light turns on

# 3. Tour Site Builder

## 3.1. Making a Site
1. Navigate to the EMURR website [chdr.cs.ucf.edu/emurr](https://chdr.cs.ucf.edu/emurr)
2. Click `Login` at the top right 
3. Either register on the left hand side or authenticate on the right
<!-- switch order -->
4. Click `dashboard` in the drop down after clicking the profile picture at the top right
5. Click `Create a New Tour`
6. Click `Edit` on the Tour Card
7. Change the Tour Name as desired at the top left
8. Add new pages on the sidebar by clicking `Create New Page`
9.  Edit pages by clicking on the name `Untitled`
10. Edit page names as desired by hovering the page and clicking `Edit`. When done click `Save`
<!-- TODO: include LINK icon -->
1.  To change the URL that pages will be displayed at select the `link icon` on the page   
    1.  Note: This is only the end of the url. See [Transferring Sites to the Pi](#transferring-sites-to-the-pi) for more detail
    2.  If there is no custsom URL one will be assigned based on the page's hidden ID. See [Transferring Sites to the Pi](#transferring-sites-to-the-pi) for more detail
2.  Create your pages as desired in the editor
3.  Ensure to save pages at the top `Save` button regularly to not lose changes

<br>
<details>
<summary>Editor Features List</summary>

**From Left to Right**
- Heading
- Font
- Table
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
- Unordered List
- Ordered List
- Block Quote
- Horizontal Rule
- Custom URL
- Insert Image
- Remove Styling
- Undo
- Redo
</details>
<br>

## 3.2. Transferring Sites to the Pi 
1.  To perform transfer move the downloaded folder to a USB stick

<!-- TODO: explain why toursite -->
2.  Ensure the folder downloaded is named "toursite"
3.  Plug the USB into the Rasbperry Pi
4.  Wait until the green LED stops flashing
5.  When the LED stays lit the tours are transferred. Unplug the USB. 
    1.  If the LED does not stop blinking or does not stay lit there has been an error. Try Again.
6.  Tours are now accessible on the `TP_LINK_EMURR` wi-fi. Connect to it to test.
7.  To find the directory of all pages go to the URL `emurr.local/toursite`
8.  Pages will be accessible at the URL `emurr.local/toursite/<custom-url>` without `<` and `>`. 
9.  If using NFC tags ensure they point to the correct URL formatted in the previous step
    1.  Visiting institutions should set their NFC tags before visiting. Request their EMURR NFC Tag URLs to ensure you have the correct URLs for your tour. 