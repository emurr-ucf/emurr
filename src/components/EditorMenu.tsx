import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import { unzip } from "unzipit";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { urlLocalPath } from "../lib/urlPath";
import { CustomUrlModal } from "./CustomUrlModal";

export interface TourSiteImageType {
  name: string;
  bloburl: string;
}

interface EditorMenuProps {
  tourId: string;
  pageId: string;
  editor: Editor | null;
  images: TourSiteImageType[];
  getImages: () => {};
  isUploadingFile: boolean;
  setIsUploadingFile: Dispatch<SetStateAction<boolean>>;
  heading: string;
  setHeading: Dispatch<SetStateAction<string>>;
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
}

export const EditorMenu = ({
  tourId,
  pageId,
  editor,
  images,
  getImages,
  isUploadingFile,
  setIsUploadingFile,
  heading,
  setHeading,
  fontFamily,
  setFontFamily,
}: EditorMenuProps) => {

  const imageLoad = () => {
    if (isUploadingFile) {
      return <div>Uploading File...</div>
    } else if (images.length > 0)
      return images.map((image: TourSiteImageType) => (
        <div key={image.name}>
          <button
            onClick={() => {
              const arr = image.name.match(/\.[0-9a-z]+$/i);
              if (arr) {
                if (arr[0] === ".mp4") {
                  editor?.chain().focus().setVideo({ src: image.bloburl, alt: "./images/" + image.name }).run();
                } else {
                  editor?.chain().focus().setImage({ src: image.bloburl, alt: "./images/" + image.name }).run();
                }
              }
            }}
            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-background-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
          >
            <div className="text-sm font-medium text-gray-900">
              {image.name}
            </div>
          </button>
        </div>
      ))
    else
      return <div>You have no images on this tour.</div>
  }

  return (
    <>
      <div className="flex justify-between 2xl:justify-left z-10 px-2 border-x border-y shadow-md shadow-slate-400 rounded-tr-md border-green-800 bg-background-200">
        <div className="flex items-center overflow-x-auto">
          <Menu as="div" className="relative w- inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-36 justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <div className="font-bold w-full flex justify-between">
                  <div>{heading}</div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 hover:bg-gray-50" aria-hidden="true" />
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
              <Menu.Items className="fixed z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 1</div>
                          <img src={`${urlLocalPath}/images/h-1.svg`} alt="h-1" className="w-4 h-4" />
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 2</div>
                          <img src={`${urlLocalPath}/images/h-2.svg`} alt="h-2" className="w-4 h-4" />
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 3</div>
                          <img src={`${urlLocalPath}/images/h-3.svg`} alt="h-3" className="w-4 h-4" />
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 4</div>
                          <img src={`${urlLocalPath}/images/h-4.svg`} alt="h-4" className="w-4 h-4" />
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 5</div>
                          <img src={`${urlLocalPath}/images/h-5.svg`} alt="h-5" className="w-4 h-4" />
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
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div>Heading 6</div>
                          <img src={`${urlLocalPath}/images/h-6.svg`} alt="h-6" className="w-4 h-4" />
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                  <form onClick={(event) => {
                    editor?.commands.setParagraph();
                    editor?.commands.focus();
                    setHeading('Paragraph');
                  }}>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`flex items-center justify-between px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          <div>Paragraph</div>
                          <img src="/images/paragraph.svg" alt="h-6" className="w-4 h-4" />
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <Menu as="div" className="relative w- inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-40 justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <div className="font-bold w-full flex justify-between">
                  <div>{fontFamily}</div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 hover:bg-gray-50" aria-hidden="true" />
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
              <Menu.Items className="fixed z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <form
                    onClick={(event) => {
                      editor?.commands.setFontFamily('ui-serif, Georgia, Cambria, "Times New Roman", Times, serif');
                      editor?.commands.focus();
                      setFontFamily("Times");
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div className="font-serif">Times</div>
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.setFontFamily("Arial");
                      editor?.commands.focus();
                      setFontFamily("Arial");
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div className="font-sans">Arial</div>
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.setFontFamily("Courier New");
                      editor?.commands.focus();
                      setFontFamily("Courier New");
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>
                          <div className="font-mono">Courier New</div>
                        </div>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <Menu as="div" className="relative w- inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <div className="font-bold inline-flex items-center">
                  Table
                  <img className="w-7 h-7 p-1" src={`${urlLocalPath}/images/table-line.svg`} alt="table" title="Insert Table" />
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 hover:bg-gray-50" aria-hidden="true" />
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
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <form
                    onClick={(event) => {
                      editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Insert Table</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.chain().focus().addColumnBefore().run();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Add Column Before</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.chain().focus().addColumnAfter().run();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Add Column After</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.deleteColumn();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Delete Column</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.addRowBefore();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Add Row Before</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.addRowAfter();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Add Row After</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.deleteRow();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Delete Row</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.deleteTable();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Delete Table</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.mergeCells();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Merge Cells</div>}</Menu.Item>
                  </form>
                  <form
                    onClick={(event) => {
                      editor?.commands.splitCell();
                    }}
                  >
                    <Menu.Item>{({ active }) => <div className={`flex items-center justify-between px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}>Split Cell</div>}</Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/bold.svg`}
            alt="bold"
            title="Bold"
            onClick={() => {
              editor?.commands.toggleBold();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("bold") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/italic.svg`}
            alt="italic"
            title="Italic"
            onClick={() => {
              editor?.commands.toggleItalic();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("italic") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/underline.svg`}
            alt="underline"
            title="Underline"
            onClick={() => {
              editor?.commands.toggleUnderline();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("underline") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/strikethrough.svg`}
            alt="strikethrough"
            title="Strike"
            onClick={() => {
              editor?.commands.toggleStrike();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("strike") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/subscript.svg`}
            alt="subscript"
            title="Subscript"
            onClick={() => {
              editor?.commands.toggleSubscript();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("subscript") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/superscript.svg`}
            alt="superscript"
            title="Superscript"
            onClick={() => {
              editor?.commands.toggleSuperscript();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("superscript") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/mark-pen-line.svg`}
            alt="mark-pen-line"
            title="Highlight"
            onClick={() => {
              editor?.commands.toggleHighlight({ color: "#f1e740" });
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("highlight") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/align-left.svg`}
            alt="align left"
            title="Left align"
            onClick={() => {
              editor?.commands.setTextAlign("left");
              editor?.commands.focus();
            }}
            className={`${editor?.isActive({ textAlign: "left" }) ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-center.svg`}
            alt="align center"
            title="Center align"
            onClick={() => {
              editor?.commands.setTextAlign("center");
              editor?.commands.focus();
            }}
            className={`${editor?.isActive({ textAlign: "center" }) ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-right.svg`}
            alt="align right"
            title="Right align"
            onClick={() => {
              editor?.commands.setTextAlign("right");
              editor?.commands.focus();
            }}
            className={`${editor?.isActive({ textAlign: "right" }) ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-justify.svg`}
            alt="align justify"
            title="Justify"
            onClick={() => {
              editor?.commands.setTextAlign("justify");
              editor?.commands.focus();
            }}
            className={`${editor?.isActive({ textAlign: "justify" }) ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/code-box-line.svg`}
            alt="code block"
            title="Code"
            onClick={() => {
              editor?.commands.toggleCode();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("code") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/list-unordered.svg`}
            alt="list-unordered"
            title="Bullet List"
            onClick={() => {
              editor?.commands.toggleBulletList();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("bulletList") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/list-ordered.svg`}
            alt="list-ordered"
            title="Ordered List"
            onClick={() => {
              editor?.commands.toggleOrderedList();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("orderedList") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/double-quotes-l.svg`}
            alt="double-quotes"
            title="Blockquote"
            onClick={() => {
              editor?.commands.toggleBlockquote();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("blockquote") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/separator.svg`}
            alt="Horizontal Ruler"
            title="Horizontal Ruler"
            onClick={() => {
              editor?.commands.setHorizontalRule();
              editor?.commands.focus();
            }}
            className={`${editor?.isActive("horizontalRule") ? "bg-background-500" : ""} w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
        </div>

        <div className="flex items-center overflow-y-hidden overflow-x-auto">
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <CustomUrlModal 
            pageId={pageId}
            tourId={tourId}
          />
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="flex justify-center items-center w-7 h-7">
                  <img src={`${urlLocalPath}/images/image-line.svg`} alt="image" title="Insert image" className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="fixed z-20 mt-3 max-w-md px-4 right-0">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="flex-col gap-8 bg-white px-7 py-2 h-40 overflow-y-auto">
                        {imageLoad()}
                      </div>
                      <div className="bg-gray-50 p-4">
                        <label
                          className="rounded-md px-2 py-2 transition duration-150 ease-in-out hover:cursor-pointer hover:bg-background-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <input
                            type="file"
                            onChange={async (event) => {
                              setIsUploadingFile(true);
                              if (!event.target.files) return;

                              const formData = new FormData();
                              formData.append("file", event.target.files[0]);

                              const tours = await fetch(`${urlLocalPath}/api/tourImage?tourId=${tourId}`, {
                                method: "POST",
                                body: formData,
                              });

                              getImages();
                            }}
                            className="hidden"
                          />
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">Upload</div>
                          </div>
                          <div className="block text-sm text-gray-500">Upload an image or video.</div>
                        </label>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/format-clear.svg`}
            alt="format-clear"
            title="Clear Format"
            onClick={() => {
              editor?.commands.clearNodes();
              editor?.commands.unsetAllMarks();
              editor?.commands.focus();
            }}
            className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out"
          />
          <img
            src={`${urlLocalPath}/images/arrow-go-back-line.svg`}
            alt="arrow-go-backwards"
            title="Undo"
            onClick={() => {
              editor?.commands.undo();
              editor?.commands.focus();
            }}
            className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out"
          />
          <img
            src={`${urlLocalPath}/images/arrow-go-forward-line.svg`}
            alt="arrow-go-forward"
            title="Redo"
            onClick={() => {
              editor?.commands.redo();
              editor?.commands.focus();
            }}
            className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out"
          />
        </div>
      </div>
    </>
  );
};
