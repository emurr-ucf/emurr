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
        class: "w-full min-h-screen bg-slate-300",
      }
    },
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <div className="w-full min-h-screen">
        <Navbar />
        <div>

        </div>
        <EditorContent editor={editor} />
      </div>  
    </>
  )
}

export default Tiptap;