import { EditorContent } from "@tiptap/react";
import { useEditorHook, STATUS } from "../../lib/useEditor";

import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/navigation/Navbar";
import { prisma } from "../../lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import {
  EditorMenu,
  TourSiteImageType,
} from "../../components/tour/EditorMenu";
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

const TiptapPage: NextPage = ({
  propTour,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const pageId = useRef("");
  const unsavedPages = useRef<Map<string, string>>(new Map<string, string>());
  const [tour, setTour] = useState<TourExtend>(propTour);
  const savingTour = useRef<number>(STATUS.DONE);
  const [isLoadingStartup, setIsLoadingStartup] = useState(true);
  const tourImages = useRef<TourSiteImageType[]>([]);
  const [renderTourImages, setRenderTourImages] = useState<TourSiteImageType[]>(
    []
  );

  const editor = useEditorHook({
    savingTour,
    tourImages,
    pageId,
    unsavedPages,
  });

  const getImages = useCallback(
    async (alert?: Id) => {
      try {
        const tours = await fetch(
          `${urlPath}/api/tour/image?tourId=${tour.id}`,
          {
            method: "GET",
          }
        );

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
        setRenderTourImages(images);
        setIsLoadingStartup(false);
      } catch (err) {
        if (!alert)
          return toast.error(
            "Failed to download tour media from server. Please try again."
          );

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
    const warningText =
      "You have unsaved changes.\nAre you sure you wish to leave this page?";
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
                  <div className="flex items-center w-60 h-10 outline-none bg-inherit border-b-2 p-1 text-green-900 border-brown">
                    {tour.tourTitle}
                  </div>
                  <div className="fixed z-20">
                    <TourDescriptionModal tour={tour} setTour={setTour} />
                  </div>
                </div>
                {/* Save button */}
                <button
                  onClick={async () => {
                    const lastSave = editor?.getHTML();

                    if (
                      editor &&
                      unsavedPages.current.has(pageId.current) &&
                      pageId.current &&
                      pageId.current !== ""
                    )
                      unsavedPages.current.set(
                        pageId.current,
                        lastSave ? lastSave : ""
                      );
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

                      const file = new File([data], "blank.html", {
                        type: "text/html",
                      });
                      const formData = new FormData();
                      formData.append("file", file);

                      const res = await fetch(
                        `${urlPath}/api/tour/page?tourId=${tour.id}&pageId=${pageId}`,
                        {
                          method: "PUT",
                          body: formData,
                        }
                      );

                      const json = await res.json();

                      if (res.status === 200)
                        unsavedPages.current.delete(pageId);
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
                  className={`py-1 w-24 ${
                    unsavedPages.current.size !== 0
                      ? "bg-red-700"
                      : "bg-green-700"
                  } text-background-200 rounded-sm`}
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
          <PageSidebar
            tour={tour}
            editor={editor}
            unsavedPages={unsavedPages}
            pageId={pageId}
            setTour={setTour}
          />
          <div className="relative flex flex-[4_1_0] flex-col overflow-auto">
            {pageId.current === "" ? (
              <div className="flex justify-center p-20 h-screen">
                Please select or create a page to load editor.
              </div>
            ) : savingTour.current === STATUS.SAVING ? (
              <>
                <div className="h-screen">
                  <Loading>Saving tour...</Loading>
                </div>
              </>
            ) : (
              <>
                <div className="absolute z-10 flex flex-col justify-end items-end w-full h-full py-6 px-12 text-sm text-gray-400 select-none pointer-events-none">
                  <div>
                    {editor?.storage.characterCount.characters()} characters
                  </div>
                  <div>{editor?.storage.characterCount.words()} words</div>
                </div>
                <EditorMenu
                  tourId={tour.id}
                  setTour={setTour}
                  mediaSize={tour.mediaSize}
                  editor={editor}
                  images={renderTourImages}
                  getImages={getImages}
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
