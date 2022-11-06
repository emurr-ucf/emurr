import { EditorContent, getAttributes, useEditor } from "@tiptap/react";
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
import Video from "../../lib/extensions/video";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
// End of Additional Extensions
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { prisma } from "../../lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Page } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { EditorMenu, TourSiteImageType } from "../../components/EditorMenu";
import React, { useCallback, useRef } from "react";
import { unzip } from "unzipit";
import { urlPath } from "../../lib/urlPath";
import download from "downloadjs";
import { Loading } from "../../components/Loading";

class ContentManager {
  static currentPageId: string;
  static unsavedPages: any = {};
  static editedContent: any = {};
  static savedContent: any = {};

  static write = (id: string, content: string) => {
    this.editedContent[id] = content;
    this.unsavedPages[id] = !this.isSaved(id);
  }

  static read = (id: string) => {
    return this.editedContent[id];
  }

  static save = (id: string, content: string) => {
    this.savedContent[id] = this.editedContent[id] = content;
    this.unsavedPages[id] = false;
  }

  static isSaved = (id: string) => {
    return this.savedContent[id] === this.editedContent[id];
  }
}

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const [ currentPageId, setCurrentPageId ] = useState("");

  const [ unsavedPages, setUnsavedPages ] = useState<any>({});
  const [ unsavedChanges, setUnsavedChanges ] = useState( false );
  const [tour, setTour] = useState(propTour);
  const [updatedTourTitle, setUpdatedTourTitle] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  //! This will change
  const isSavingTour = useRef(false);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true);
  const tourImages = useRef<TourSiteImageType[]>([]);
  const [tourTitle, setTourTitle] = useState(propTour.tourTitle);
  const [pageRename, setPageRename] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [page, setPage] = useState("");

  // Selection
  const [heading, setHeading] = useState("Heading 1");
  const [fontFamily, setFontFamily] = useState("Arial");

  const anyUnsavedPages = () => {
    return Object.values(ContentManager.unsavedPages).includes(true);
  }

  const editor = useEditor({
    extensions: [
      Blockquote.configure({
        HTMLAttributes: {
          style: "background: #F6F2EE; border-left: 0.25rem solid #ccc; padding: 0 0.5rem;",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          style: "list-style: disc; margin-left: 1rem;",
        },
      }), // tag: ul
      CodeBlock,
      Document,
      HardBreak,
      Heading.configure({
        HTMLAttributes: {
          style: "font-weight: bolder;",
        },
      }),
      HorizontalRule,
      ListItem,
      OrderedList.configure({
        HTMLAttributes: {
          style: "list-style: decimal; margin-left: 1rem;",
        },
      }), // tag: ol
      Paragraph,
      Text,
      Bold,
      Code.configure({
        HTMLAttributes: {
          style: "color: inherit",
        },
      }),
      Italic,
      Strike,
      CharacterCount,
      Underline,
      TextStyle,
      FontFamily,
      Subscript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      History,
      // tag: table
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          style: "border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed; width: 100%;",
        },
      }),
      // tag: tr
      TableRow,
      // tag: th
      TableHeader.configure({
        HTMLAttributes: {
          style: "background-color: #f1f3f5; font-weight: bold; text-align: left; border: 1px solid; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
        },
      }),
      // tag: td
      TableCell.configure({
        HTMLAttributes: {
          style: "border: 1px solid; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
        },
      }),
      Image.extend({
        renderHTML({ HTMLAttributes }) {
          if (isSavingTour.current) {
            HTMLAttributes.src = HTMLAttributes.alt;
            return ["img", HTMLAttributes];
          } else {
            tourImages.current.forEach((image) => {
              if (image.name === HTMLAttributes.name) {
                HTMLAttributes.src = image.bloburl;
              }
            });
            return ["img", HTMLAttributes];
          }

        },
        addAttributes() {
          return {
            ...this.parent?.(),
            name: {
              renderHTML: attributes => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(attributes.alt);
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    }
                  }
                }
              },
            }
          }
        }
      }),
      Video.extend({
        renderHTML({ HTMLAttributes }) {
          if (isSavingTour.current) {
            HTMLAttributes.src = HTMLAttributes.alt;
            return ["video", HTMLAttributes];
          } else {
            tourImages.current.forEach((image) => {
              if (image.name === HTMLAttributes.name) {
                HTMLAttributes.src = image.bloburl;
              }
            });
            return ["video", HTMLAttributes];
          }

        },
        addAttributes() {
          return {
            ...this.parent?.(),
            name: {
              renderHTML: attributes => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(attributes.alt);
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    }
                  }
                }
              },
            }
          }
        }
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-base sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      },
    },
    autofocus: "start",
    onUpdate: () => {
      // mark page as unsaved
      const pageId = ContentManager.currentPageId;
      ContentManager.unsavedPages[pageId] = true;
      setUnsavedPages(ContentManager.unsavedPages);

      // update global unsaved flag
      setUnsavedChanges(true);
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("paragraph"))
        setHeading("Paragraph");
      else if (editor.isActive("heading", { level: 1 }))
        setHeading("Heading 1");
      else if (editor.isActive("heading", { level: 2 }))
        setHeading("Heading 2");
      else if (editor.isActive("heading", { level: 3 }))
        setHeading("Heading 3");
      else if (editor.isActive("heading", { level: 4 }))
        setHeading("Heading 4");
      else if (editor.isActive("heading", { level: 5 }))
        setHeading("Heading 5");
      else if (editor.isActive("heading", { level: 6 }))
        setHeading("Heading 6");
      else
        setHeading("");

      if (editor.isActive("textStyle", { fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif" }))
        setFontFamily("Times");
      else if (editor.isActive("textStyle", { fontFamily: "Arial" }))
        setFontFamily("Arial");
      else if (editor.isActive("textStyle", { fontFamily: "Courier New" }))
        setFontFamily("Courier New");
      else
        setFontFamily("");
    }
  });


  const getImages = useCallback(async () => {
    const tours = await fetch(`${urlPath}/api/tour/tourImage?tourId=${tour.id}`, {
      method: "GET",
    });

    const res = await tours.blob();
    const { entries } = await unzip(res);

    const images: TourSiteImageType[] = [];
    const objs = Object.entries(entries);

    for (const [name, entry] of objs) {
      const blob = await entry.blob();
      const bloburl = URL.createObjectURL(blob);
      images.push({ name, bloburl });
    }

    tourImages.current = images;
    setIsUploadingFile(false);
    setIsLoadingStartup(false);
  }, [tour.id]);

  useEffect(() => {
    const warningText = "You have unsaved changes.\nAre you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!unsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!unsavedChanges) return;
      if (window.confirm(warningText)) return;
      Router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener('beforeunload', handleWindowClose);
    Router.events.on('routeChangeStart', handleBrowseAway);
    
    if (tour)
      getImages();

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      Router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [unsavedChanges, getImages, tour]);


  if (status === "loading" || isLoadingStartup) {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Tour Assets.</div>
          <div>Please Wait...</div>
        </div>
      </Loading>
    );
  }
  if (status === "unauthenticated") {
    Router.push("/");
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
  }
  
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
                  const body = { tourId: tour.id, tourTitle: tourTitle };

                  await fetch(`${urlPath}/api/tour/tour`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });

                  setUpdatedTourTitle(false);
                }

                editor?.setEditable(false);
                isSavingTour.current = true;
                const data = editor?.getHTML();

                if ( data && currentPageId ) {
                  const file = new File( [ data ], "blank.html" );

                  const formData = new FormData();

                  formData.append("file", file);

                  const res = await fetch(`${urlPath}/api/tour/page?tourId=${tour.id}&pageId=${currentPageId}`, {
                    method: "PUT",
                    body: formData,
                  });

                  if (res.status === 200) {
                    // mark current page as saved
                    ContentManager.save(currentPageId, data);
                    setUnsavedPages(ContentManager.unsavedPages);
                    setUnsavedChanges(false);
                  }
                }

                isSavingTour.current = false;
                editor?.commands.setContent(data ? data : "");
                editor?.setEditable(true);

              }}
              className={`py-1 w-24 ${unsavedChanges ? "bg-red-700" : "bg-green-700"} text-background-200 rounded-sm`}
            >
              Save
            </button>

            {/* Download button */}
            <button
              onClick={async () => {
                const res = await fetch(`${ urlPath }/api/tour/download`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ tourId: tour.id }),
                });

                const blob = await res.blob();
                download(blob, "toursite.zip", "file/zip");
              }}
              className="py-1 w-24 text-background-200 bg-green-700 rounded-sm"
            >
              Download
            </button>

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

                const res = await fetch(`${urlPath}/api/tour/page?tourId=${tour.id}`, {
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
            {tour.tourPages.map( ( page: Page ) => {
              return (
                <div key={page.id} className="group flex rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300">
                  {/* Load tour page into editor */}
                  <button
                    onClick={async () => {
                      setPage(page.id);
                      // stash changes with content manager
                      // Update "unsaved" state for old page
                      if (editor && currentPageId)
                        ContentManager.write(currentPageId, editor.getHTML());
                      setUnsavedPages(ContentManager.unsavedPages);
                      setUnsavedChanges(anyUnsavedPages());

                      // if we're renaming this page, don't switch to it
                      if (pageRename === page.id) return;

                      // restore stashed changes from ContentManager, if possible
                      if (ContentManager.read(page.id)) {
                        editor?.commands.setContent(ContentManager.read(page.id));
                      }
                      // otherwise, fetch content from api
                      else {
                        const res = await fetch( `${urlPath}/api/tour/page?tourId=${ tour.id }&pageId=${ page.id }`, {
                          method: "GET",
                        } );
  
                        const resHTML = await res.text();
  
                        if ( res.status === 200 ) {
                          ContentManager.save( page.id, resHTML );
                          editor?.commands.setContent( resHTML == "" ? "" : resHTML );
                        }
                        else {
                          alert("Failed to load content");
                          return;
                        }
                      }

                      // update current page id
                      setCurrentPageId(page.id);
                      ContentManager.currentPageId = page.id;
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
                    onClick={ () => {
                      setPageRename( page.id );
                    } }
                    className={ `${ pageRename === page.id || pageRename != "" ? "hidden" : "" } invisible2 group-hover:visible` }
                  >
                    Edit
                  </button>

                  {/* Save title button */}
                  <button
                    onClick={ async () => {
                      const body = { pageId: page.id, tourId: tour.id, title: pageTitle };

                      const res = await fetch(`${urlPath}/api/tour/pagedb`, {
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
          <div className="relative flex flex-[4_1_0] flex-col overflow-auto">
            {currentPageId === "" ? (
              <div className="flex justify-center p-20 h-screen">Please select or create a page to load editor.</div>
            ) : (
              <>
                <div className="absolute z-10 flex flex-col justify-end items-end w-full h-full py-6 px-12 text-sm text-gray-400 select-none pointer-events-none">
                  <div>{editor?.storage.characterCount.characters()} characters</div>
                  <div>{editor?.storage.characterCount.words()} words</div>
                </div>
                <EditorMenu
                  tourId={tour.id}
                  pageId={page}
                  editor={editor}
                  images={tourImages.current}
                  getImages={getImages}
                  isUploadingFile={isUploadingFile}
                  setIsUploadingFile={setIsUploadingFile}
                  heading={heading}
                  setHeading={setHeading}
                  fontFamily={fontFamily}
                  setFontFamily={setFontFamily}
                />
                <div className="h-screen bg-background-200 border-x border-green-900 overflow-y-auto">
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
