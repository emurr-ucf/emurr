import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { TourExtend } from "../../lib/types/tour-extend";
import { Editor } from "@tiptap/react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface DeletePageButtonProps {
  tour: TourExtend;
  unsavedPages: React.MutableRefObject<Map<string, string>>;
  pageId: React.MutableRefObject<string>;
  setTour: React.Dispatch<React.SetStateAction<TourExtend>>;
}

export const DeletePageButton = ({
  tour,
  unsavedPages,
  pageId,
  setTour,
}: DeletePageButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const deletePage = async () => {
    const res = await fetch(`${urlPath}/api/tour/pagedb`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourId: tour.id, pageId: pageId.current }),
    });

    const json = await res.json();

    if (res.status !== 200) return toast.error(json.error);

    toast.success("Page deleted.");
    unsavedPages.current.delete(pageId.current);
    pageId.current = "";
    setTour(json.tour);
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={`${urlLocalPath}/images/trash.svg`}
        alt="Button to delete a page"
        title="Delete Page"
        onClick={() => setIsOpen(true)}
        className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this page?
                  </Dialog.Title>
                  <div className="mt-4">
                    <div>
                      Everything about this page will be lost. This action
                      cannot be undone.
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-2"
                      onClick={deletePage}
                    >
                      Yes, delete page.
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
