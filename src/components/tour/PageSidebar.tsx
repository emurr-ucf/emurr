import { Page } from "@prisma/client";
import { Editor } from "@tiptap/react";
import { MutableRefObject, useState } from "react";
import { toast } from "react-toastify";
import { TourExtend } from "../../lib/types/tour-extend";
import { urlPath } from "../../lib/urlPath";
import { CreatePageButton } from "./CreatePageButton";
import { DeletePageButton } from "./DeletePageButton";
import { EditPageButton } from "./EditPageButton";

interface PageSidebarProps {
  tour: TourExtend;
  editor: Editor | null;
  unsavedPages: React.MutableRefObject<Map<string, string>>;
  pageId: React.MutableRefObject<string>;
  setTour: React.Dispatch<React.SetStateAction<TourExtend>>;
}

export const PageSidebar = ({
  tour,
  editor,
  unsavedPages,
  pageId,
  setTour,
}: PageSidebarProps) => {
  const [page, setPage] = useState<Page | undefined>();

  const selectPage = async (page: Page) => {
    // Stash changes with content manager
    // Update "unsaved" state for old page
    if (
      editor &&
      unsavedPages.current.has(pageId.current) &&
      pageId.current &&
      pageId.current !== ""
    )
      unsavedPages.current.set(pageId.current, editor.getHTML());

    const contents = unsavedPages.current.get(page.id);

    // restore stashed changes from ContentManager, if possible
    if (contents) editor?.commands.setContent(contents);
    // otherwise, fetch content from api
    else {
      const res = await fetch(
        `${urlPath}/api/tour/page?tourId=${tour.id}&pageId=${page.id}`,
        {
          method: "GET",
        }
      );

      const html = await res.text();

      if (res.status === 200)
        editor?.commands.setContent(html === "" ? "" : html);
      else return toast.error("Page does not exist.");
    }

    // update current page id
    pageId.current = page.id;
    setPage(page);
  };

  return (
    <>
      <div className="flex-1 bg-background-200 p-4 rounded-tl-md overflow-scroll">
        <div className="flex justify-between w-full border-b-2 border-grey pb-2">
          <div>
            <CreatePageButton
              tour={tour}
              editor={editor}
              unsavedPages={unsavedPages}
              pageId={pageId}
              setTour={setTour}
            />
          </div>
          <div className="flex items-center">
            {page !== undefined && (
              <>
                <EditPageButton
                  tour={tour}
                  page={page}
                  setTour={setTour}
                  setPage={setPage}
                />
                <DeletePageButton
                  tour={tour}
                  unsavedPages={unsavedPages}
                  pageId={pageId}
                  setTour={setTour}
                />
              </>
            )}
          </div>
        </div>

        {/* Page titles on sidebar */}
        {tour.tourPages.map((page: Page) => {
          return (
            <div
              key={page.id}
              className="group flex rounded-md border-b-2 bg-inherit focus:bg-background-300 hover:bg-background-300"
            >
              {/* Load tour page into editor */}
              <button
                onClick={() => selectPage(page)}
                className="w-full text-left"
              >
                {/* Rename page title */}
                <div
                  className={`w-full ${
                    pageId.current === page.id ? " font-bold" : ""
                  } ${
                    unsavedPages.current.has(page.id) ? " text-red-800" : ""
                  }`}
                >
                  {page.title === "" ? "Untitled" : page.title}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
