import { Fragment, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

export const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`${urlPath}/api/user/reset`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const json = await res.json();

    if (res.status !== 200) return toast.error(json.error);

    toast.success("Updated!");
    setShow(false);
  };

  return (
    <>
      <ProfileCard
        image={`${urlLocalPath}/images/profile/shield.svg`}
        title="Edit password"
        description="Edit your login password"
        onClick={() => setShow(true)}
      />
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShow(false)}
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
                    as="h1"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit password
                  </Dialog.Title>
                  <form onSubmit={handleSave}>
                    <div className="flex flex-col gap-6 mt-4">
                      <input
                        type="password"
                        autoComplete="on"
                        placeholder="Current password"
                        className="h-12 appearance-none border border-brown rounded px-3"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        autoComplete="on"
                        placeholder="New password"
                        className="h-12 appearance-none border border-brown rounded px-3"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        autoComplete="on"
                        placeholder="Confirm new password"
                        className="h-12 appearance-none border border-brown rounded px-3"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-green-700 hover:bg-green-800"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
