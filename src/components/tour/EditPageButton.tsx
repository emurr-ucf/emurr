import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { TourExtend } from "../../lib/types/tour-extend";
import { Editor } from "@tiptap/react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Page } from "@prisma/client";

interface EditPageButtonProps {
  tour: TourExtend;
  page: Page | undefined;
  setTour: React.Dispatch<React.SetStateAction<TourExtend>>;
}

export const EditPageButton = ({
  tour,
  page,
  setTour,
}: EditPageButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [customURL, setCustomURL] = useState("");

  const open = (bool: boolean) => {
    if (bool) {
      setTitle(page ? page.title : "");
      setCustomURL(page ? (page.customURL ? page.customURL : "") : "");
    }
    setIsOpen(bool);
  };

  const editPage = async () => {
    if (!page) return toast.error("No page selected");

    const res = await fetch(`${urlPath}/api/tour/pagedb`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tourId: tour.id,
        pageId: page.id,
        title,
        customURL,
      }),
    });

    const json = await res.json();
    if (res.status !== 200) return toast.error(json.error);

    setTour(json.tour);
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={`${urlLocalPath}/images/edit-button.svg`}
        alt="Button to edit a page"
        title="Edit Page"
        onClick={() => open(true)}
        className={`w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out`}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => open(false)}>
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
                    Edit...
                  </Dialog.Title>
                  <div className="flex items-center mt-2 gap-4">
                    <div>Title:</div>
                    <input
                      defaultValue={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Title..."
                      className="w-full h-10 bg-inherit border-b-2 p-1 text-green-900 outline-none border-brown"
                    />
                  </div>
                  <div className="flex items-center mt-2 gap-4">
                    <div className="w-28">Custom URL:</div>
                    <div className="flex items-center">
                      emurr.local/
                      <input
                        defaultValue={customURL}
                        onChange={(event) => setCustomURL(event.target.value)}
                        placeholder="Custom URL..."
                        className="w-full h-10 bg-inherit border-b-2 p-1 text-green-900 outline-none border-brown"
                      />
                      .html
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={editPage}
                    >
                      Save
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
