import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRef, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { prisma } from '../../lib/prisma'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { Page } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

interface PageType {
  page: Page;
  content: string;
}

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { data: session, status} = useSession();
  const [page, setPage] = useState("");

  const [tour, setTour] = useState(propTour);
  const [updatedTourTitle, setUpdatedTourTitle] = useState(false);
  const [tourTitle, setTourTitle] = useState(tour.tourTitle);
  const [pageRename, setPageRename] = useState("");
  const [pageTitle, setPageTitle] = useState("");

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
  })

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") Router.push("/");
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar>
          <>
            <input 
              type="text"
              defaultValue={tour.tourTitle}
              onChange={(event) => {
                setTourTitle(event.target.value);
                setUpdatedTourTitle(true);
              }}
              className="w-60 h-10 bg-inherit border-b-2 p-1 text-green-900 border-brown focus:outline-brown transition ease-in-out"
            />
            <button
              onClick={async () => {
                if (updatedTourTitle) {
                  const body = { tourId: tour.id, name: tourTitle };

                  await fetch("/api/tour", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });

                  setUpdatedTourTitle(false);
                }

                const data = editor?.getHTML();

                if (data && page) {
                  const file = new File([data], "blank.html");

                  const formData = new FormData();

                  formData.append("file", file);
  
                  const res = await fetch(`/api/page?tourId=${tour.id}&pageId=${page}`, {
                    method: "PUT",
                    body: formData,
                  });
                }
              }}
              className="py-1 w-24 text-background-200 bg-green-700 rounded-sm"
            >
              Save
            </button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Download
            </button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">
              Publish
            </button>
          </>
        </Navbar>
        <div className="flex pt-4 px-4 overflow-hidden">
          <div className="flex-1 bg-background-200 p-4 rounded-tl-md overflow-scroll">
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
              className="w-full py-1 px-4 mb-2 text-background-200 bg-green-700 rounded-sm"
            >
              Create New Page
            </button>
            
            {tour.tourPages.map((page: Page) => {
              return (
                <div 
                  key={page.id}
                  className="group flex rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300"
                >
                  <button
                    onClick={async () => {
                      if (pageRename === page.id) return;

                      const res = await fetch(`/api/page?tourId=${tour.id}&pageId=${page.id}`, {
                        method: "GET",
                      });

                      const resHTML = await res.text();

                      if (res.status === 200) {
                        setPage(page.id);
                        editor?.commands.setContent(resHTML == "" ? "" : resHTML);
                      }
                    }}
                    className="w-full"
                  >
                    <input
                      defaultValue={page.title === "" ? "Untitled" : page.title}
                      disabled={pageRename != page.id}
                      autoFocus={true}
                      onChange={(event) => setPageTitle(event.target.value)}
                      className="w-full"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setPageRename(page.id);
                    }}
                    className={`${(pageRename === page.id || pageRename != "") ? "hidden" : ""} invisible group-hover:visible`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      const body = { pageId: page.id, name: pageTitle };

                      const res = await fetch("/api/pagedb", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                      });

                      const resJSON = await res.json();

                      if (resJSON.tour)
                        setTour(resJSON.tour);
    
                      setPageRename("");
                    }}
                    className={`${pageRename != page.id ? "hidden" : ""}`}
                  >
                    Save
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-[4_1_0] flex-col overflow-auto">
            {page === "" ? 
              <div className="flex justify-center p-20 h-screen">
                Please select or create a page to load editor.
              </div>
              : 
              <>
                <div className="flex border-x border-t rounded-tr-md border-green-800 bg-background-400">
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
              </>
            }
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