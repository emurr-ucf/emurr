import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";

interface FontFamilyProps {
  editor: Editor | null;
}

export const FontFamilyMenu = ({ editor }: FontFamilyProps) => {
  const fontFamilies = new Map<string, string>([
    ["ui-serif, Georgia, Cambria, Times New Roman, Times, serif", "Times"],
    ["Arial", "Arial"],
    ["Courier New", "Courier New"],
  ]);

  const selection = () => {
    if (!editor?.isActive("textStyle")) return "Times";
    else if (
      editor?.isActive("textStyle", {
        fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      })
    )
      return "Times";
    else if (editor?.isActive("textStyle", { fontFamily: "Arial" }))
      return "Arial";
    else if (editor?.isActive("textStyle", { fontFamily: "Courier New" }))
      return "Courier New";
    else return "";
  };

  return (
    <>
      <Menu as="div" className="relative w- inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-32 justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            <div className="font-bold w-full flex justify-between">
              <div>{selection()}</div>
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
                  editor?.commands.setFontFamily(
                    "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
                  );
                  editor?.commands.focus();
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <div className="font-serif">Times</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.setFontFamily("Arial");
                  editor?.commands.focus();
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <div className="font-sans">Arial</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.setFontFamily("Courier New");
                  editor?.commands.focus();
                }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`flex items-center justify-start px-4 py-2 text-sm hover:bg-grey ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <div className="font-mono">Courier New</div>
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
