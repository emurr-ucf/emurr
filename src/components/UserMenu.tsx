import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { urlLocalPath, urlPath } from "../lib/urlPath";
import { HeadlessLink } from "./HeadlessLink";
import { Fragment } from "react";
import { useUserStore } from "../lib/store/user";

export const UserMenu = () => {
  const userImage = useUserStore((state) => state.image);
  const userRemove = useUserStore((state) => state.remove);

  return (
    <>
      <Menu as="div" className="relative w- inline-block text-left">
        <div>
          <Menu.Button className="flex items-center justify-center rounded-full border border-gray-300 text-sm font-medium text-gray-700 shadow-sm hover:outline-none hover:ring-2 hover:ring-green-400 hover:ring-offset-2 hover:ring-offset-gray-100">
            <img
              src={
                process.env.NODE_ENV === "production"
                  ? userImage === ""
                    ? `${urlLocalPath}/images/google.png`
                    : userImage
                  : `${urlLocalPath}/images/google.png`
              }
              alt="User profile image"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full cursor-pointer"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed z-10 mt-2 w-40 right-10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <HeadlessLink href={`${urlLocalPath}/tours`}>
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-background-500`}
                  >
                    Dashboard
                  </div>
                </HeadlessLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <HeadlessLink href={`${urlLocalPath}/users/profile`}>
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-background-500`}
                  >
                    Profile
                  </div>
                </HeadlessLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={async () => {
                    userRemove();
                    await signOut();
                  }}
                  className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-background-500 cursor-pointer`}
                >
                  Sign out
                </div>
              )}
            </Menu.Item>
            <div className="rounded border border-b-1 bg-grey my-1 mx-2"></div>
            <Menu.Item>
              {({ active }) => (
                <HeadlessLink href={`${urlLocalPath}/`}>
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-background-500`}
                  >
                    Home
                  </div>
                </HeadlessLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <HeadlessLink href={`${urlLocalPath}/about`}>
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-background-500`}
                  >
                    About
                  </div>
                </HeadlessLink>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
