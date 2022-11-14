import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";
import { urlLocalPath } from "../../lib/urlPath";
import { Id } from "react-toastify";
import { HeadingMenu } from "./menu/HeadingMenu";
import { FontFamilyMenu } from "./menu/FontFamilyMenu";
import { TableMenu } from "./menu/TableMenu";
import { ImagePopover } from "./menu/ImagePopover";
import { ColorMenu } from "./menu/ColorMenu";

export interface TourSiteImageType {
  name: string;
  bloburl: string;
}

interface EditorMenuProps {
  tourId: string;
  setTour: Dispatch<SetStateAction<any>>;
  mediaSize: number;
  editor: Editor | null;
  images: TourSiteImageType[];
  getImages: (alert?: Id) => {};
}

export const EditorMenu = ({
  tourId,
  setTour,
  mediaSize,
  editor,
  images,
  getImages,
}: EditorMenuProps) => {
  return (
    <>
      <div className="flex justify-left 2xl:justify-between z-10 px-2 border shadow-md shadow-slate-400 rounded-tr-md border-green-800 bg-background-200 overflow-x-auto">
        <div className="flex shrink-0 items-center">
          <HeadingMenu editor={editor} />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <FontFamilyMenu editor={editor} />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <img
            src={`${urlLocalPath}/images/bold.svg`}
            alt="bold"
            title="Bold"
            onClick={() => {
              editor?.commands.toggleBold();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("bold") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/italic.svg`}
            alt="italic"
            title="Italic"
            onClick={() => {
              editor?.commands.toggleItalic();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("italic") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/underline.svg`}
            alt="underline"
            title="Underline"
            onClick={() => {
              editor?.commands.toggleUnderline();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("underline") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/strikethrough.svg`}
            alt="strikethrough"
            title="Strike"
            onClick={() => {
              editor?.commands.toggleStrike();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("strike") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/subscript.svg`}
            alt="subscript"
            title="Subscript"
            onClick={() => {
              editor?.commands.toggleSubscript();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("subscript") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/superscript.svg`}
            alt="superscript"
            title="Superscript"
            onClick={() => {
              editor?.commands.toggleSuperscript();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("superscript") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <ColorMenu editor={editor} />
          <img
            src={`${urlLocalPath}/images/mark-pen-line.svg`}
            alt="mark-pen-line"
            title="Highlight"
            onClick={() => {
              editor?.commands.toggleHighlight({ color: "#f1e740" });
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("highlight") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
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
            className={`${
              editor?.isActive({ textAlign: "left" }) ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-center.svg`}
            alt="align center"
            title="Center align"
            onClick={() => {
              editor?.commands.setTextAlign("center");
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive({ textAlign: "center" })
                ? "bg-background-500"
                : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-right.svg`}
            alt="align right"
            title="Right align"
            onClick={() => {
              editor?.commands.setTextAlign("right");
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive({ textAlign: "right" })
                ? "bg-background-500"
                : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/align-justify.svg`}
            alt="align justify"
            title="Justify"
            onClick={() => {
              editor?.commands.setTextAlign("justify");
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive({ textAlign: "justify" })
                ? "bg-background-500"
                : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/code-box-line.svg`}
            alt="code block"
            title="Code"
            onClick={() => {
              editor?.commands.toggleCode();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("code") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
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
            className={`${
              editor?.isActive("bulletList") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/list-ordered.svg`}
            alt="list-ordered"
            title="Ordered List"
            onClick={() => {
              editor?.commands.toggleOrderedList();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("orderedList") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/double-quotes-l.svg`}
            alt="double-quotes"
            title="Blockquote"
            onClick={() => {
              editor?.commands.toggleBlockquote();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("blockquote") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <img
            src={`${urlLocalPath}/images/separator.svg`}
            alt="Horizontal Ruler"
            title="Horizontal Ruler"
            onClick={() => {
              editor?.commands.setHorizontalRule();
              editor?.commands.focus();
            }}
            className={`${
              editor?.isActive("horizontalRule") ? "bg-background-500" : ""
            } w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
          />
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <TableMenu editor={editor} />
        </div>

        <div className="flex shrink-0 items-center">
          <div className="border-x h-3/5 border-green-200 mx-2" />
          <ImagePopover
            tourId={tourId}
            setTour={setTour}
            mediaSize={mediaSize}
            editor={editor}
            images={images}
            getImages={getImages}
          />
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
