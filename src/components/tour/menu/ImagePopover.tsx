import { Popover, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { ChangeEvent, Fragment, useCallback } from "react";
import { Id, toast } from "react-toastify";
import { TourExtend } from "../../../lib/types/tour-extend";
import { urlLocalPath } from "../../../lib/urlPath";
import { TourSiteImageType } from "../EditorMenu";

interface ImagePopoverProps {
  tourId: string;
  setTour: React.Dispatch<React.SetStateAction<TourExtend>>;
  mediaSize: number;
  editor: Editor | null;
  images: TourSiteImageType[];
  getImages: (alert?: Id) => {};
}

export const ImagePopover = ({ tourId, setTour, mediaSize, editor, images, getImages }: ImagePopoverProps) => {
  const imageLoad = () => {
    if (images.length > 0)
      return images.map((image: TourSiteImageType) => (
        <div key={image.name}>
          <button
            onClick={() => {
              const arr = image.name.match(/\.[0-9a-z]+$/i);
              if (arr) {
                if (arr[0] === ".mp4") {
                  editor
                    ?.chain()
                    .focus()
                    .setVideo({
                      src: image.bloburl,
                      alt: "./images/" + image.name,
                    })
                    .run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .setImage({
                      src: image.bloburl,
                      alt: "./images/" + image.name,
                    })
                    .run();
                }
              }
            }}
            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-background-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
          >
            <div className="text-sm font-medium text-gray-900">{image.name}</div>
          </button>
        </div>
      ));
    else return <div>You have no images on this tour.</div>;
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const alert = toast.loading("Uploading...");
    if (!event.target.files) return;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const res = await fetch(`${urlLocalPath}/api/tour/image?tourId=${tourId}`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (res.status !== 200)
      return toast.update(alert, {
        render: json.error,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        closeButton: true,
        autoClose: 2000,
      });

    setTour(json.tour);

    toast.update(alert, {
      render: "Resyncing...",
    });

    getImages(alert);
  };

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="flex justify-center items-center w-7 h-7">
              <img src={`${urlLocalPath}/images/image-line.svg`} alt="image" title="Insert image or video" className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed z-20 mt-3 max-w-md px-4 right-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex-col gap-8 bg-white px-7 py-2 h-40 overflow-y-auto">{imageLoad()}</div>
                  <div className="bg-gray-50 p-4">
                    <div className="text-sm text-gray-500 text-right">Total: {mediaSize.toFixed(1)} MB</div>
                    <label htmlFor="media-file">
                      <div className="rounded-md px-2 py-2 hover:cursor-pointer hover:bg-background-500 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">Upload</div>
                        </div>
                        <div className="block text-sm text-gray-500">Upload an image or video.</div>
                      </div>
                      <input id="media-file" type="file" onChange={uploadImage} className="hidden" />
                    </label>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
