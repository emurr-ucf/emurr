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
import Video from "../../lib/extensions/video";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/navigation/Navbar";
import { prisma } from "../../lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { EditorMenu, TourSiteImageType } from "../../components/tour/EditorMenu";
import React, { useCallback, useRef } from "react";
import { unzip } from "unzipit";
import { urlPath } from "../../lib/urlPath";
import { Loading } from "../../components/util/Loading";
import { Id, toast } from "react-toastify";
import { formatCreatedAt, formatUpdatedAt } from "../../lib/formatDate";
import { TourDescriptionModal } from "../../components/tour/TourDescriptionModal";
import { TourExtend } from "../../lib/types/tour-extend";
import { TourUserMenuChildren } from "../../components/tour/TourUserMenuChildren";
import { PageSidebar } from "../../components/tour/PageSidebar";

export enum STATUS {
  DONE = 0,
  SAVING = 1,
  SETTING = 2,
}

const TiptapPage: NextPage = ({ propTour }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const pageId = useRef("");
  const unsavedPages = useRef<Map<string, string>>(new Map<string, string>());
  const [tour, setTour] = useState<TourExtend>(propTour);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const savingTour = useRef<number>(STATUS.DONE);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true);
  const tourImages = useRef<TourSiteImageType[]>([]);

  // Selection
  const [heading, setHeading] = useState("Heading 1");
  const [fontFamily, setFontFamily] = useState("Arial");

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
      Color,
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
          if (savingTour.current === STATUS.SAVING) {
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
              renderHTML: (attributes) => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(attributes.alt);
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    };
                  }
                }
              },
            },
          };
        },
      }),
      Video.extend({
        renderHTML({ HTMLAttributes }) {
          if (savingTour.current === STATUS.SAVING) {
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
              renderHTML: (attributes) => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(attributes.alt);
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    };
                  }
                }
              },
            },
          };
        },
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
      if (!unsavedPages.current.has(pageId.current) && pageId.current !== "" && savingTour.current === STATUS.DONE) unsavedPages.current.set(pageId.current, "");
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("paragraph")) setHeading("Paragraph");
      else if (editor.isActive("heading", { level: 1 })) setHeading("Heading 1");
      else if (editor.isActive("heading", { level: 2 })) setHeading("Heading 2");
      else if (editor.isActive("heading", { level: 3 })) setHeading("Heading 3");
      else if (editor.isActive("heading", { level: 4 })) setHeading("Heading 4");
      else if (editor.isActive("heading", { level: 5 })) setHeading("Heading 5");
      else if (editor.isActive("heading", { level: 6 })) setHeading("Heading 6");
      else setHeading("");

      if (
        editor.isActive("textStyle", {
          fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
        })
      )
        setFontFamily("Times");
      else if (editor.isActive("textStyle", { fontFamily: "Arial" })) setFontFamily("Arial");
      else if (editor.isActive("textStyle", { fontFamily: "Courier New" })) setFontFamily("Courier New");
      else setFontFamily("");
    },
  });

  const getImages = useCallback(
    async (alert?: Id) => {
      try {
        const tours = await fetch(`${urlPath}/api/tour/image?tourId=${tour.id}`, {
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

        if (alert) {
          toast.update(alert, {
            render: "Media loaded successfully.",
            type: "success",
            isLoading: false,
            closeOnClick: true,
            closeButton: true,
            autoClose: 2000,
          });
        }

        tourImages.current = images;
        setIsUploadingFile(false);
        setIsLoadingStartup(false);
      } catch (err) {
        if (!alert) return toast.error("Failed to download tour media from server. Please try again.");

        toast.update(alert, {
          render: "Failed to load media.",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
          autoClose: 2000,
        });
      }
    },
    [tour.id]
  );

  useEffect(() => {
    const warningText = "You have unsaved changes.\nAre you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (unsavedPages.current.size === 0) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (unsavedPages.current.size === 0) return;
      if (window.confirm(warningText)) return;
      Router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    Router.events.on("routeChangeStart", handleBrowseAway);

    if (tour) getImages();

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      Router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [unsavedPages, getImages, tour]);

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
        <Navbar userMenuChildren={<TourUserMenuChildren tour={tour} />}>
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Tour title */}
                <div className="relative flex items-center justify-end">
                  <div className="flex items-center w-60 h-10 outline-none bg-inherit border-b-2 p-1 text-green-900 border-brown">{tour.tourTitle}</div>
                  <div className="fixed z-20">
                    <TourDescriptionModal tour={tour} setTour={setTour} />
                  </div>
                </div>
                {/* Save button */}
                <button
                  onClick={async () => {
                    const lastSave = editor?.getHTML();

                    if (editor && unsavedPages.current.has(pageId.current) && pageId.current && pageId.current !== "") unsavedPages.current.set(pageId.current, lastSave ? lastSave : "");
                    const errors = [];
                    const alert = toast.loading("Saving...");

                    editor?.setEditable(false);
                    savingTour.current = STATUS.SAVING;
                    for await (const [pageId, page] of unsavedPages.current) {
                      editor?.commands.setContent(page);
                      const data = editor?.getHTML();

                      if (!data) {
                        errors.push(`Page id:${pageId} could not be saved.`);
                        continue;
                      }

                      const file = new File([data], "blank.html");
                      const formData = new FormData();
                      formData.append("file", file);

                      const res = await fetch(`${urlPath}/api/tour/page?tourId=${tour.id}&pageId=${pageId}`, {
                        method: "PUT",
                        body: formData,
                      });

                      const json = await res.json();

                      if (res.status === 200) unsavedPages.current.delete(pageId);
                      else errors.push(json.error);
                    }

                    savingTour.current = STATUS.SETTING;
                    editor?.commands.setContent("");
                    editor?.commands.setContent(lastSave ? lastSave : "");
                    editor?.setEditable(true);

                    if (errors.length === 0)
                      toast.update(alert, {
                        render: "Tour successfully saved.",
                        type: "success",
                        isLoading: false,
                        closeOnClick: true,
                        closeButton: true,
                        autoClose: 2000,
                      });
                    else toast.dismiss(alert);
                    for (const error in errors) toast.error(error);
                    savingTour.current = STATUS.DONE;
                  }}
                  className={`py-1 w-24 ${unsavedPages.current.size !== 0 ? "bg-red-700" : "bg-green-700"} text-background-200 rounded-sm`}
                >
                  Save
                </button>
              </div>
              <div className="text-sm text-gray-500">{`Last Saved: ${tour.tourUpdatedAt}`}</div>
            </div>
          </>
        </Navbar>
        <div className="flex pt-4 px-4 overflow-hidden">
          {/* Page list */}
          <PageSidebar tour={tour} editor={editor} unsavedPages={unsavedPages} pageId={pageId} setTour={setTour} />
          <div className="relative flex flex-[4_1_0] flex-col overflow-auto">
            {pageId.current === "" ? (
              <div className="flex justify-center p-20 h-screen">Please select or create a page to load editor.</div>
            ) : savingTour.current === STATUS.SAVING ? (
              <>
                <div className="h-screen">
                  <Loading>Saving tour...</Loading>
                </div>
              </>
            ) : (
              <>
                <div className="absolute z-10 flex flex-col justify-end items-end w-full h-full py-6 px-12 text-sm text-gray-400 select-none pointer-events-none">
                  <div>{editor?.storage.characterCount.characters()} characters</div>
                  <div>{editor?.storage.characterCount.words()} words</div>
                </div>
                <EditorMenu
                  tourId={tour.id}
                  pageId={pageId.current}
                  setTour={setTour}
                  mediaSize={tour.mediaSize}
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
    await prisma.tour.updateMany({
      where: {
        id,
        tourAuthorId: token.id,
      },
      data: {
        tourUpdatedAt: new Date(),
      },
    });

    const propTour: any = await prisma.tour.findFirst({
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
        mediaSize: true,
        tourUpdatedAt: true,
        tourCreatedAt: true,
      },
    });

    propTour.tourUpdatedAt = formatUpdatedAt(propTour.tourUpdatedAt);
    propTour.tourCreatedAt = formatCreatedAt(propTour.tourCreatedAt);

    return {
      props: { propTour },
    };
  }

  return {
    props: {},
  };
};

TiptapPage.displayName = "Edit Tour";

export default TiptapPage;
