import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";
import { urlLocalPath } from "../../../lib/urlPath";

interface TableMenuProps {
  editor: Editor | null;
}

export const TableMenu = ({ editor }: TableMenuProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center">
          <img
            src={`${urlLocalPath}/images/table-line.svg`}
            alt="table"
            title="Insert Table"
            className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
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
          <Menu.Items className="fixed z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none select-none">
            <div className="py-1">
              <form
                onClick={(event) => {
                  editor?.commands.insertTable({
                    rows: 3,
                    cols: 3,
                    withHeaderRow: true,
                  });
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
                        src={`${urlLocalPath}/images/table-line.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Insert table</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.chain().focus().addColumnBefore().run();
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
                        src={`${urlLocalPath}/images/insert-column-left.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Insert column left</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.chain().focus().addColumnAfter().run();
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
                        src={`${urlLocalPath}/images/insert-column-right.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Insert column right</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.deleteColumn();
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
                        src={`${urlLocalPath}/images/delete-column.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Delete column</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.addRowBefore();
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
                        src={`${urlLocalPath}/images/insert-row-top.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Insert row above</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.addRowAfter();
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
                        src={`${urlLocalPath}/images/insert-row-bottom.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Insert row below</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.deleteRow();
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
                        src={`${urlLocalPath}/images/delete-row.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Delete row</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.deleteTable();
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
                        src={`${urlLocalPath}/images/delete-bin-6-line.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Delete table</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.mergeCells();
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
                        src={`${urlLocalPath}/images/merge-cells-horizontal.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Merge cells</div>
                    </div>
                  )}
                </Menu.Item>
              </form>
              <form
                onClick={(event) => {
                  editor?.commands.splitCell();
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
                        src={`${urlLocalPath}/images/split-cells-horizontal.svg`}
                        alt=""
                        className="w-4 h-4"
                      />
                      <div className="ml-2">Split cells</div>
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
