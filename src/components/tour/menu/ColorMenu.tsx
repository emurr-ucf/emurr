import { Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";
import { urlLocalPath } from "../../../lib/urlPath";

interface ColorMenuProps {
  editor: Editor | null;
}

export const ColorMenu = ({ editor }: ColorMenuProps) => {
  return (
    <>
      <Menu
        as="div"
        className="relative inline-block w-7 h-7 hover:bg-background-400 rounded transition ease-in-out"
      >
        <Menu.Button className="flex-col items-center w-7 h-5 cursor-default">
          <div className="font-bold text-md">A</div>
          <div
            // Inline style has to be here to reflect anti-tailwind color classes.
            // https://v2.tailwindcss.com/docs/just-in-time-mode
            style={{
              backgroundColor: editor?.getAttributes("textStyle").color
                ? editor?.getAttributes("textStyle").color
                : "#000000",
            }}
            className={`rounded w-5 h-1`}
          ></div>
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
          <Menu.Items className="fixed z-50 mt-8 w-30 select-none rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex items-center py-1">
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#C00000")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#C00000] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#FF0000")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#FF0000] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#FFC000")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#FFC000] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#FFFF00")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#FFFF00] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#92D050")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#92D050] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#00B050")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#00B050] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#94FADB")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#94FADB] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#00B0F0")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#00B0F0] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#0070C0")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#0070C0] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#002060")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#002060] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#7030A0")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#7030A0] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                    <td>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`flex items-center justify-start px-0.5 py-0.5 text-sm hover:bg-grey ${
                              active ? "bg-gray-600" : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={(event) => {
                                editor
                                  ?.chain()
                                  .focus()
                                  .setColor("#000000")
                                  .run();
                                editor?.commands.focus();
                              }}
                              className="bg-[#000000] rounded w-5 h-3 hover:shadow-sm"
                            ></button>
                          </div>
                        )}
                      </Menu.Item>
                    </td>
                  </tr>
                </tbody>
              </table>

              <label className="m-4">
                <img
                  src={`${urlLocalPath}/images/eyedropper.svg`}
                  alt="eyedropper"
                  title="Color picker"
                  className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
                />
                <input
                  type="color"
                  onInput={(event) =>
                    editor
                      ?.chain()
                      .focus()
                      .setColor((event.target as HTMLInputElement).value)
                      .run()
                  }
                  value={editor?.getAttributes("textStyle").color}
                  className="w-0 h-0"
                />
              </label>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
