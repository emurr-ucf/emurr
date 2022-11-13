import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { HeadlessLink } from "../util/HeadlessLink";
import { Fragment, forwardRef, ForwardedRef } from "react";
import { useUserStore } from "../../lib/store/user";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { TourExtend } from "../../lib/types/tour-extend";
import { DownloadButton } from "../../components/tour/DownloadButton";

interface TourUserMenuChildrenProps {
  tour: TourExtend;
}

export const TourUserMenuChildren = ({ tour }: TourUserMenuChildrenProps) => {
  return (
    <>
      <Menu.Item>
        {/* Download button */}
        {({ active }) => <DownloadButton tour={tour} />}
      </Menu.Item>
      <Menu.Item>
        {/* Publish button */}
        {({ active }) => (
          <button
            className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-background-500`}
          >
            Publish
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {/* Delete Button */}
        {({ active }) => <ConfirmDeleteModal tour={tour} />}
      </Menu.Item>
    </>
  );
};
