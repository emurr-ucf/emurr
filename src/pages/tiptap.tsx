import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'

const Tiptap: NextPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      }
    },
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-amber-50">
        <Navbar />
        <div className="flex items-center w-full h-20 pl-20 gap-5 border-b border-gray-200">
          <input 
            type="text"
            placeholder="Untitled"
            className="w-60 h-10 bg-transparent border-b-2 border-stone-200 focus:border-stone-700 transition ease-in-out focus:outline-none overflow-y-auto"
          />
          <button className="py-1 px-10 bg-green-700">
            Publish
          </button>
        </div>
        <div className="flex w-full h-full overflow-y-auto">
          <div className="flex flex-col pl-3 w-3/12 overflow-y-scroll">
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
          <div className="flex flex-col w-full h-full px-5 pt-5">
            <div className="flex w-full h-auto border-x border-t border-black to bg-slate-200">
              <button className="w-10 h-10 font-bold hover:bg-slate-300 transition ease-in-out">
                B
              </button>
              <div className="border-x border-black" />
              <button className="w-10 h-10 italic hover:bg-slate-300 transition ease-in-out">
                I
              </button>
              <div className="border-x border-black" />
              <button className="w-10 h-10 hover:bg-slate-300 transition ease-in-out">
                <s>S</s>
              </button>
              <div className="border-x border-black" />
            </div>
            <div className="h-full bg-slate-50 border-t border-x border-black overflow-y-auto">
              <EditorContent editor={editor}/>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default Tiptap;