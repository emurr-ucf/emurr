import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { PropsWithChildren, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { prisma } from '../../lib/prisma'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { Page, Tour } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { data: session, status} = useSession();

  const [tour, setTour] = useState(propTour);

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

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") Router.push("/");
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex justify-between items-center py-2 px-20 border-b border-brown">
          <div className="flex items-center gap-5">
            <input 
              type="text"
              defaultValue={tour.tourTitle}
              className="w-60 h-10 bg-inherit border-b-2 p-1 text-green-900 border-brown focus:outline-brown transition ease-in-out"
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
                const file = new File([], "blank.html");

                const formData = new FormData();

                formData.append("file", file);

                const res = await fetch(`/api/page?tourId=${tour.id}`, {
                  method: "POST",
                  body: formData,
                })

                const resJSON = await res.json();

                if (resJSON.tour)
                  setTour(resJSON.tour);
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
        <div className="flex pt-10 px-4 overflow-hidden">
          <div className="flex-1 bg-background-200 p-4 rounded-tl-md overflow-scroll">

            {tour.tourPages.map((page: Page) => {
              return <input
                  key={page.id}
                  defaultValue={page.title === "" ? "Untitled" : page.title}
                  className="w-full rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300"
                />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken(context);
  const { id } = context.query;

  if (token && (typeof id === "string")) {
    const propTour = await prisma.tour.findFirst({
      where: {
        id,
        tourAuthorId: token.id,
      },
      select: {
        id: true,
        tourTitle: true,
        tourDescription: true,
        tourPages: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
      }
    });
  
    return {
      props: { propTour },
    }
  }

  return {
    props: {  }
  }
}

export default TiptapPage;