import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { NextPage } from 'next'
import { useState } from 'react'
import { Navbar } from '../components/Navbar'

const Tiptap: NextPage = () => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      }
    },
    autofocus: "start",
    onUpdate: () => {
      setCharCount(editor?.storage.characterCount.characters());
      setWordCount(editor?.storage.characterCount.words());
    },
    content: '<p>Hello World! 🌎️</p>',
  })

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
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Save
            </button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Download
            </button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Publish
            </button>
          </div>
          <div className="flex flex-col justify-right text-sm">
            <div>
              Character Count: {charCount}
            </div>
            <div>
              Word Count: {wordCount}
            </div>
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
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                B
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.toggleItalic();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                I
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.toggleStrike();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                <s>S</s>
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.toggleBlockquote();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                "
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.toggleCodeBlock();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                &lt;
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.toggleBulletList();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                •
              </button>
              <div className="border-x border-black" />
              <button
                onClick={() => {
                  editor?.commands.setBlockquote();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                "
              </button>
              <div className="border-x border-black" />
            </div>
            <div className="h-screen bg-slate-50 border-x border-t border-black overflow-y-auto">
              <EditorContent editor={editor}/>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default Tiptap;
