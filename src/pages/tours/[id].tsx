import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";

import { NextPage } from "next";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";


const Tiptap: NextPage = () => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount, Highlight.configure({ multicolor: true })],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      },
    },
    autofocus: "start",
    onUpdate: () => {
      setCharCount(editor?.storage.characterCount.characters());
      setWordCount(editor?.storage.characterCount.words());
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex justify-between items-center py-2 px-20 border-b border-brown">
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Untitled"
              className="w-60 h-10 bg-transparent border-b-2 placeholder-green-900 text-green-900 hover:border-brown focus:border-brown focus:outline-none transition ease-in-out"
            />
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">Save</button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Download
            </button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Publish
            </button>
          </div>
          <div className="flex flex-col justify-right text-sm">
            <div>Character Count: {charCount}</div>
            <div>Word Count: {wordCount}</div>
          </div>
        </div>
        <div className="flex pt-10 pr-10 pl-4 overflow-hidden">
          <div className="flex-1 pb-4 overflow-hidden hover:overflow-scroll">
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
          </div>
          <div className="flex flex-[4_1_0] flex-col overflow-auto">
            <div className="flex border-x border-t border-green-800 bg-background-400">
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
                <svg className="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z" />
                </svg>
              </button>
              <div className="border-x border-green-900" />
              <button
                onClick={() => {
                  editor?.commands.toggleBlockquote();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                &ldquo;
              </button>
              <div className="border-x border-green-900" />
              <button
                onClick={() => {
                  editor?.commands.toggleBulletList();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                •
              </button>
              <div className="border-x border-green-900" />
              <button
                onClick={() => {
                  editor?.commands.setBlockquote();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                &ldquo;
              </button>
              <div className="border-x border-green-900" />
            </div>
            <div className="h-screen bg-background-200 border-x border-t border-green-900 overflow-y-auto">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tiptap;
