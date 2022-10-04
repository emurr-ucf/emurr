import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import History from "@tiptap/extension-history";
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

interface PageType {
  page: Page;
  content: string;
}

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { data: session, status } = useSession();
  const [page, setPage] = useState("");

  const [tour, setTour] = useState(propTour);
  const [updatedTourTitle, setUpdatedTourTitle] = useState(false);
  const [tourTitle, setTourTitle] = useState(tour.tourTitle);
  const [pageRename, setPageRename] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      CharacterCount,
      Underline,
      Highlight.configure({ multicolor: true }),
      Heading.configure({
        levels: [1, 2],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      // History,
    ],
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
  });

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
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">Download</button>
            <button className="py-1 w-24 text-background-200 bg-green-700 rounded-sm">Publish</button>
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
                });

                const resJSON = await res.json();

                if (resJSON.tour) setTour(resJSON.tour);
              }}
              className="w-full py-1 px-4 mb-2 text-background-200 bg-green-700 rounded-sm"
            >
              Create New Page
            </button>

            {tour.tourPages.map((page: Page) => {
              return (
                <div key={page.id} className="group flex rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300">
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
                    <input defaultValue={page.title === "" ? "Untitled" : page.title} disabled={pageRename != page.id} autoFocus={true} onChange={(event) => setPageTitle(event.target.value)} className="w-full" />
                  </button>
                  <button
                    onClick={() => {
                      setPageRename(page.id);
                    }}
                    className={`${pageRename === page.id || pageRename != "" ? "hidden" : ""} invisible group-hover:visible`}
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
          <div className="flex flex-[4_1_0] flex-col overflow-auto">
            {page === "" ? (
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
