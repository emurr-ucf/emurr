import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { prisma } from '../../lib/prisma'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Page } from '@prisma/client'
import Highlight from '@tiptap/extension-highlight'

const Tiptap: NextPage = () => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [pages, setPages] = useState([]);
  const { data: session, status} = useSession();
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    const load = () => {
      fetch(`/api/tour?tourId=${id}`, {
        method: "GET",
      }).then(res => 
        res.json().then(body => 
          setPages(body)
      ));
    }
  }, [id]);

  if (status === "unauthenticated") return Router.push("/");

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex justify-between items-center py-2 px-20 border-b border-brown">
          <div className="flex items-center gap-5">
            <input 
              type="text"
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
            <button
              onClick={async () => {
                console.log(id);

                const file = new File([], "blank.html");

                const formData = new FormData();

                formData.append("file", file);

                await fetch(`/api/page?tourId=${id}`, {
                  method: "POST",
                  body: formData,
                })
              }}
              className="py-1 px-4 text-background-200 bg-green-700 rounded-sm"
            >
              Create New Page +
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
            {pages.map((page: Page) => {
              return <div key={page.id}>Test</div>;
            })}
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
              <div className="border-x border-green-900" />
              <button
                onClick={() => {
                  editor?.commands.toggleItalic();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                I
              </button>
              <div className="border-x border-green-900" />
              <button
                onClick={() => {
                  editor?.commands.toggleStrike();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                <s>S</s>
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
                  editor?.commands.toggleCodeBlock();
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                &lt;
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
              <button
                onClick={() => {
                  editor?.commands.toggleHighlight();
                  editor?.commands.toggleHighlight({ color: '#ffcc00' });
                  editor?.commands.focus();
                }}
                className="w-10 h-10 font-bold text-green-900 hover:bg-background-600 transition ease-in-out"
              >
                N
              </button>
              <div className="border-x border-green-900" />
            </div>
            <div className="h-screen bg-background-200 border-x border-t border-green-900 overflow-y-auto">
              <EditorContent editor={editor}/>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

export default Tiptap;