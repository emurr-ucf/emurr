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
          B
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
          <em>I</em>
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
          <s>S</s>
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
          &lt; &gt;
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
          <img src="/images/mark-pen-line.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/h-1.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/h-2.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/list-unordered.svg" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 2 });
            editor?.commands.focus();
          }}
          title="Ordered List"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/list-ordered.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/double-quotes-l.svg" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
        <button
          onClick={() => {
            editor?.commands.toggleHeading({ level: 2 });
            editor?.commands.focus();
          }}
          title="Clear Format"
          className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
        >
          <img src="/images/format-clear.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/arrow-go-back-line.svg" className="w-5 h-5 m-2" />
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
          <img src="/images/arrow-go-forward-line.svg" className="w-5 h-5 m-2" />
        </button>
        <div className="border-x border-green-900" />
      </div>
    </>
  )
}