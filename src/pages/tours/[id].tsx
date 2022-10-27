import { EditorContent, useEditor } from "@tiptap/react";
// The below extensions are included on StarterKit
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
// End of StarterKit extensions
// Additional Extensions
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import Image from "@tiptap/extension-image";
// End of Additional Extensions
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { prisma } from "../../lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Page } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { EditorMenu } from "../../components/EditorMenu";
import React from "react";

class ContentManager {
  static editedContent: any = {};
  static savedContent: any = {};

  static write = (id: string, content: string) => {
    this.editedContent[id] = content;
  }

  static read = (id: string) => {
    return this.editedContent[id];
  }

  static save = (id: string, content: string) => {
    this.savedContent[id] = this.editedContent[id] = content;
  }

  static isSaved = (id: string) => {
    return this.savedContent[id] === this.editedContent[id];
  }
}

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { data: session, status } = useSession();
  const [currentPageId, setCurrentPageId] = useState("");

  const [tour, setTour] = useState(propTour);
  const [updatedTourTitle, setUpdatedTourTitle] = useState(false);
  const [tourTitle, setTourTitle] = useState(tour.tourTitle);
  const [pageRename, setPageRename] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [unsavedPages, setUnsavedPages] = useState<any>({});

  const editor = useEditor({
    extensions: [
      Blockquote,
      BulletList,
      CodeBlock,
      Document,
      HardBreak,
      Heading,
      HorizontalRule,
      ListItem,
      OrderedList,
      Paragraph,
      Text,
      Bold,
      Code,
      Italic,
      Strike,
      CharacterCount,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // History,
      Image,
    ],
    editorProps: {
      attributes: {
        class: "prose prose-base sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      },
    },
    autofocus: "start",
    onUpdate: () => {
      setCharCount(editor?.storage.characterCount.characters());
      setWordCount(editor?.storage.characterCount.words());
    },
  });

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") Router.push("/");
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar>
          <>
            {/* Tour title */}
            <input
              type="text"
              defaultValue={tour.tourTitle}
              onChange={(event) => {
                setTourTitle(event.target.value);
                setUpdatedTourTitle(true);
              }}
              className="w-60 h-10 bg-inherit border-b-2 p-1 text-green-900 border-brown focus:outline-brown transition ease-in-out"
            />

            {/* Save button */}
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

                if (data && currentPageId) {
                  const file = new File([data], "blank.html");

                  const formData = new FormData();

                  formData.append("file", file);

                  const res = await fetch(`/api/page?tourId=${tour.id}&pageId=${currentPageId}`, {
                    method: "PUT",
                    body: formData,
                  });

                  // mark current page as saved
                  if (res.status === 200) {
                    const newUnsavedPages = Object.assign({}, unsavedPages);
                    newUnsavedPages[currentPageId] = false;
                    setUnsavedPages(newUnsavedPages);
                    ContentManager.save(currentPageId, data);
                  }
                }
              }}
              className="py-1 w-24 text-background-200 bg-green-700 rounded-sm"
            >
              Save
            </button>

            {/* Download button */}
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">Download</button>

            {/* Publish button */}
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">Publish</button>
          </>
        </Navbar>
        <div className="flex pt-4 px-4 overflow-hidden">
          <div className="flex-1 bg-background-200 p-4 rounded-tl-md overflow-scroll">

            {/* Create new page button */}
            <button
              onClick={async () => {
                const file = new File([], "blank.html");

                const formData = new FormData();

                formData.append("file", file);

                const res = await fetch(`/api/page?tourId=${tour.id}`, {
                  method: "POST",
                  body: formData,
                });

                const resJSON = await res.json();

                if (resJSON.tour) setTour(resJSON.tour);
              }}
              className="w-full py-1 px-4 mb-2 text-background-200 bg-green-700 rounded-sm"
            >
              Create New Page
            </button>

            {/* Page titles on sidebar */}
            {tour.tourPages.map((page: Page) => {
              return (
                <div key={page.id} className="group flex rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300">
                  {/* Load tour page into editor */}
                  <button
                    onClick={async () => {
                      // stash changes with content manager
                      if (editor)
                        ContentManager.write(currentPageId, editor.getHTML());
                      
                      // Update "unsaved" state for old page
                      const newUnsavedPages = Object.assign({}, unsavedPages);
                      newUnsavedPages[currentPageId] = !ContentManager.isSaved(currentPageId);
                      setUnsavedPages(newUnsavedPages);

                      // if we're renaming this page, don't switch to it
                      if (pageRename === page.id) return;

                      // restore stashed changes from ContentManager, if possible
                      if (ContentManager.read(page.id)) {
                        editor?.commands.setContent(ContentManager.read(page.id));
                        setCurrentPageId(page.id);
                        return;
                      }

                      // otherwise, fetch content from api
                      const res = await fetch(`/api/page?tourId=${tour.id}&pageId=${page.id}`, {
                        method: "GET",
                      });

                      const resHTML = await res.text();

                      if (res.status === 200) {
                        setCurrentPageId(page.id);
                        ContentManager.save(page.id, resHTML);
                        editor?.commands.setContent(resHTML == "" ? "" : resHTML);
                      }

                    }}
                    className="w-full text-left"
                  >
                    {/* Rename page title */}
                    {
                      pageRename === page.id ? (
                        <input 
                          defaultValue={page.title === "" ? "Untitled" : page.title}
                          autoFocus={true}
                          onChange={(event) => {
                            setPageTitle(event.target.value);
                          }}
                          className={"w-full" + (currentPageId === page.id ? " font-bold" : "") + (unsavedPages[page.id] ? " text-red-800" : "") }
                        />
                      ) : 
                        <span className={"w-full" + (currentPageId === page.id ? " font-bold" : "") + (unsavedPages[page.id] ? " text-red-800" : "") }>
                          {page.title === "" ? "Untitled" : page.title}
                        </span>
                    }
                  </button>
                  
                  {/* Edit title button */}
                  <button
                    onClick={() => {
                      setPageRename(page.id);
                    }}
                    className={`${(pageRename === page.id || pageRename != "") ? "hidden" : ""} invisible2 group-hover:visible`}
                  >
                    Edit
                  </button>

                  {/* Save title button */}
                  <button
                    onClick={async () => {
                      const body = { pageId: page.id, name: pageTitle };

                      const res = await fetch("/api/pagedb", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                      });

                      const resJSON = await res.json();

                      if (resJSON.tour) setTour(resJSON.tour);

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

          {/* Editor */}
          <div className="flex flex-[4_1_0] flex-col overflow-auto">
            {currentPageId === "" ? (
              <div className="flex justify-center p-20 h-screen">Please select or create a page to load editor.</div>
            ) : (
              <>
                <EditorMenu editor={editor} />
                <div className="h-screen bg-background-200 border-x border-t border-green-900 overflow-y-auto">
                  <EditorContent editor={editor} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken(context);
  const { id } = context.query;

  if (token && typeof id === "string") {
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
      },
    });

    return {
      props: { propTour },
    };
  }

  return {
    props: {},
  };
};

export default TiptapPage;
