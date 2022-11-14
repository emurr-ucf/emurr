import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { TourExtend } from "../../lib/types/tour-extend";
import { Editor } from "@tiptap/react";
import { toast } from "react-toastify";

interface CreatePageButtonProps {
  tour: TourExtend;
  editor: Editor | null;
  unsavedPages: React.MutableRefObject<Map<string, string>>;
  pageId: React.MutableRefObject<string>;
  setTour: React.Dispatch<React.SetStateAction<TourExtend>>;
}

export const CreatePageButton = ({
  tour,
  editor,
  unsavedPages,
  pageId,
  setTour,
}: CreatePageButtonProps) => {
  const createPage = async () => {
    if (
      editor &&
      unsavedPages.current.has(pageId.current) &&
      pageId.current &&
      pageId.current !== ""
    )
      unsavedPages.current.set(pageId.current, editor.getHTML());

    const file = new File([], "blank.html", { type: "text/html" });
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${urlPath}/api/tour/page?tourId=${tour.id}`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (res.status !== 200) return toast.error(json.error);

    setTour(json.tour);
  };

  return (
    <>
      <img
        src={`${urlLocalPath}/images/plus-add.svg`}
        alt="Button to create a new page"
        title="Create New Page"
        onClick={createPage}
        className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
      />
    </>
  );
};
