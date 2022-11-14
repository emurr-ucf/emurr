import { urlPath } from "../../lib/urlPath";
import { toast } from "react-toastify";
import { TourExtend } from "../../lib/types/tour-extend";
import download from "downloadjs";
import { ForwardedRef, forwardRef } from "react";

interface DownloadButtonProps {
  tour: TourExtend;
}

export const DownloadButton = forwardRef(
  ({ tour }: DownloadButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const downloadTour = async () => {
      const alert = toast.loading("Downloading...");
      try {
        const res = await fetch(`${urlPath}/api/tour/download`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tourId: tour.id }),
        });

        const blob = await res.blob();
        download(blob, "toursite.zip", "file/zip");
        toast.update(alert, {
          render: "Download Successful",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
          autoClose: 2000,
        });
      } catch (err) {
        toast.update(alert, {
          render: "Failed to download tour site from server. Please try again.",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          closeButton: true,
          autoClose: 2000,
        });
      }
    };

    return (
      <>
        <button
          onClick={downloadTour}
          ref={ref}
          className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-background-500"
        >
          Download
        </button>
      </>
    );
  }
);

DownloadButton.displayName = "DownloadButton";
