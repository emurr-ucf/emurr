import { Dialog, Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import Router from "next/router";
import { ForwardedRef, forwardRef, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { urlLocalPath, urlPath } from "../../lib/urlPath";

interface ConfirmDeleteUserProps {
  userID: string;
}

export const ConfirmDeleteUser = forwardRef(
  ({ userID }: ConfirmDeleteUserProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
          ref={ref}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm bg-red-200 hover:bg-red-300`}
        >
          Delete account
        </button>

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
                      Are you sure you want to delete this account?
                    </Dialog.Title>
                    <div className="mt-4">
                      <div>
                        This account and all created tours will be lost. This action
                        cannot be undone.
                      </div>
                      <button
                        type="button"
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900 focus-visible:ring-offset-2"
                        onClick={async () => {
                          const res = await fetch(`${urlPath}/api/user/super`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userID }),
                          });

                          const json = await res.json();

                          if (res.status === 200) Router.push(`${urlLocalPath}/admin`);
                          else toast.error(json.error);
                        }}
                      >
                        Yes, delete this account.
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
  }
);

ConfirmDeleteUser.displayName = "ConfirmDeleteUser";
