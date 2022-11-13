import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { TourExtend } from "../../lib/types/tour-extend";
import { urlLocalPath, urlPath } from "../../lib/urlPath";

interface TourDescriptionModal {
  tour: TourExtend;
  setTour: Dispatch<SetStateAction<TourExtend>>;
}

export const TourDescriptionModal = ({
  tour,
  setTour,
}: TourDescriptionModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tourTitle, setTourTitle] = useState(tour.tourTitle);
  const [tourDescription, setTourDescription] = useState(tour.tourDescription);

  const save = async () => {
    const res = await fetch(`${urlPath}/api/tour`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tourId: tour.id,
        tourTitle: tour.tourTitle !== tourTitle ? tourTitle : undefined,
        tourDescription:
          tour.tourDescription !== tourDescription
            ? tourDescription
            : undefined,
      }),
    });

    const json = await res.json();

    if (res.status !== 200) return toast.error("Error saving tour");

    setTour(json.tour);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center shrink-0">
        <img
          src={`${urlLocalPath}/images/edit-button.svg`}
          alt="custom url"
          title="Edit tour data"
          onClick={() => setIsOpen(true)}
          className="w-6 h-6 p-1 hover:bg-background-700 rounded transition ease-in-out"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsOpen(false)}
          className="relative z-50 pointer-events-none"
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

          <div className="fixed inset-0 overflow-y-auto pointer-events-auto">
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
                    {/* Tour title */}
                    <div>Title:</div>
                    <input
                      type="text"
                      defaultValue={tourTitle}
                      onChange={(event) => setTourTitle(event.target.value)}
                      className="w-full h-10 bg-inherit border-b-2 p-1 text-green-900 border-grey outline-none"
                    />
                  </div>
                  <div className="flex-col mt-4">
                    {/* Tour description */}
                    <div>Description:</div>
                    <textarea
                      defaultValue={
                        tourDescription
                          ? tourDescription
                          : "Write your description here..."
                      }
                      onChange={(event) =>
                        setTourDescription(event.target.value)
                      }
                      maxLength={150}
                      className="w-full h-10 mt-2 bg-inherit border-2 p-1 text-sm text-green-900 border-grey outline-none"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={save}
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
