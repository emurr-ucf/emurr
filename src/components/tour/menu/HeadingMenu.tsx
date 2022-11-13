import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";
import { urlLocalPath } from "../../../lib/urlPath";

interface HeadingMenuProps {
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  editor: Editor | null;
}

export const HeadingMenu = ({
  heading,
  setHeading,
  editor,
}: HeadingMenuProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left my-2">
        <div>
          <Menu.Button className="inline-flex w-32 justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            <div className="font-bold w-full flex justify-between">
              <div>{heading}</div>
              <ChevronDownIcon
                className="h-5 w-5 text-gray-700 hover:bg-gray-50"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>
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
                  setHeading("Heading 1");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-1.svg`}
                        alt="h-1"
                        className="w-4 h-4"
                      />
                      <div>Heading 1</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 2 });
                  editor?.commands.focus();
                  setHeading("Heading 2");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-2.svg`}
                        alt="h-2"
                        className="w-4 h-4"
                      />
                      <div>Heading 2</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 3 });
                  editor?.commands.focus();
                  setHeading("Heading 3");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-3.svg`}
                        alt="h-3"
                        className="w-4 h-4"
                      />
                      <div>Heading 3</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 4 });
                  editor?.commands.focus();
                  setHeading("Heading 4");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-4.svg`}
                        alt="h-4"
                        className="w-4 h-4"
                      />
                      <div>Heading 4</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 5 });
                  editor?.commands.focus();
                  setHeading("Heading 5");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-5.svg`}
                        alt="h-5"
                        className="w-4 h-4"
                      />
                      <div>Heading 5</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.toggleHeading({ level: 6 });
                  editor?.commands.focus();
                  setHeading("Heading 6");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/h-6.svg`}
                        alt="h-6"
                        className="w-4 h-4"
                      />
                      <div>Heading 6</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.setParagraph();
                  editor?.commands.focus();
                  setHeading("Paragraph");
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <img
                        src={`${urlLocalPath}/images/paragraph.svg`}
                        alt="paragraph"
                        className="w-4 h-4"
                      />
                      <div>Paragraph</div>
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
