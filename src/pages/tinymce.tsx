import type { NextPage } from 'next'
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import Navbar from '../components/Navbar';

const TinyMCE: NextPage = () => {
  const editorRef = useRef(null);
  const [site, setSite] = useState("<h1>Everything is Tiny</h1>");
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }

    setSite(editorRef.current.getContent());
  };

  return (
    <div className="bg-white dark:bg-slate-800 w-screen h-screen">
      <Navbar />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center">
          <div className='w-1/2'>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          </div>
          <div className='prose lg:prose-xl prose-zinc h-full w-1/2 ml-5'>
            <div dangerouslySetInnerHTML={{ __html: site }} />
          </div>

        </div>
        <div className="w-full mt-5 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={log}>Convert HTML</button>
        </div>
      </div>
    </div>
  )
}

export default TinyMCE