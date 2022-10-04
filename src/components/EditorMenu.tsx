import { Editor } from "@tiptap/react";

interface TourSiteCardProps {
  editor: Editor | null;
}

export const EditorMenu = ({ editor }: TourSiteCardProps) => {
  return (
    <>
      <div className="flex border-x border-t rounded-tr-md border-green-800 bg-background-400">
        <button
          onClick={() => {
            editor?.commands.toggleBold();
            editor?.commands.focus();
          }}
          title="Bold"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/bold.svg" alt="bold" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleItalic();
            editor?.commands.focus();
          }}
          title="Italic"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/italic.svg" alt="italic" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleUnderline();
            editor?.commands.focus();
          }}
          title="Underline"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/underline.svg" alt="underline" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleStrike();
            editor?.commands.focus();
          }}
          title="Strike"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/strikethrough.svg" alt="strikethrough" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleCode();
            editor?.commands.focus();
          }}
          title="Code"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/code-box-line.svg" alt="code block" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHighlight();
            editor?.commands.focus();
          }}
          title="Highlight"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/mark-pen-line.svg" alt="mark-pen-line" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.setTextAlign("left");
            editor?.commands.focus();
          }}
          title="Left align"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/align-left.svg" alt="align left" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.setTextAlign("center");
            editor?.commands.focus();
          }}
          title="Center align"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/align-center.svg" alt="align center" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.setTextAlign("right");
            editor?.commands.focus();
          }}
          title="Right align"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/align-right.svg" alt="align right" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.setTextAlign("justify");
            editor?.commands.focus();
          }}
          title="Justify"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/align-justify.svg" alt="align justify" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 1 });
            editor?.commands.focus();
          }}
          title="Heading 1"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/h-1.svg" alt="h-1" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 2 });
            editor?.commands.focus();
          }}
          title="Heading 2"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/h-2.svg" alt="h-2" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleBulletList();
            editor?.commands.focus();
          }}
          title="Bullet List"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/list-unordered.svg" alt="list-unordered" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleOrderedList();
            editor?.commands.focus();
          }}
          title="Ordered List"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/list-ordered.svg" alt="list-ordered" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleBlockquote();
            editor?.commands.focus();
          }}
          title="Blockquote"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/double-quotes-l.svg" alt="double-quotes" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleBlockquote();
            editor?.commands.focus();
          }}
          title="Undo"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/arrow-go-back-line.svg" alt="arrow-go-backwards" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 2 });
            editor?.commands.focus();
          }}
          title="Redo"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/arrow-go-forward-line.svg" alt="arrow-go-forward" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button title="Insert image" className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out">
          <img src="/images/image-line.svg" alt="image" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
      </div>
    </>
  );
};
