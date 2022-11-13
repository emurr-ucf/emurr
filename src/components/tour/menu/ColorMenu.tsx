import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";
import { urlLocalPath } from "../../../lib/urlPath";

interface ColorMenuProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  editor: Editor | null;
}

export const ColorMenu = ({ color, setColor, editor }: ColorMenuProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left my-2">
        <Menu.Button className="grind grid-rows-2 w-7 h-7 p-1">
          <img src={`${urlLocalPath}/images/font-color.svg`} alt="font-color" title="Text Color" className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`} />
          <input type="color" className="h-3" value="#e66465" />
          {color}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed z-10 mt-2 w-32 select-none origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 1 });
                  editor?.commands.focus();
                  // setColor("Heading 1");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                      <img src={`${urlLocalPath}/images/h-1.svg`} alt="h-1" className="w-4 h-4" />
                      <div>Heading 1</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 2 });
                  editor?.commands.focus();
                  // setColor("Heading 2");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                      <img src={`${urlLocalPath}/images/h-2.svg`} alt="h-2" className="w-4 h-4" />
                      <div>Heading 2</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
