import { Fragment, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { getSession, signIn, useSession } from "next-auth/react";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { useUserStore } from "../../lib/store/user";
import shallow from "zustand/shallow";

export const EditProfile = () => {
  const { userName, userLastName, userImage, userUpdate } = useUserStore(
    (state) => ({
      userName: state.name,
      userLastName: state.lastName,
      userImage: state.image,
      userUpdate: state.update,
    }),
    shallow
  );

  const [firstName, setFirstName] = useState(userName);
  const [lastName, setLastName] = useState(userLastName);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(userImage);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`${urlPath}/api/user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    });

    const json = await res.json();

    if (res.status !== 200) return toast.error(json.error);

    await userUpdate();

    toast.success("Updated name.");
    setShow(false);
  };

  return (
    <>
      <ProfileCard
        image={`${urlLocalPath}/images/profile/profile.svg`}
        title="Edit profile"
        description="Edit your profile information, such as your name and profile picture"
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
                    Edit profile
                  </Dialog.Title>
                  <form onSubmit={handleSave}>
                    <div className="flex flex-col gap-6 mt-4">
                      <label>
                        <img
                          src={
                            process.env.NODE_ENV === "production"
                              ? image === ""
                                ? `${urlLocalPath}/images/default-user.png`
                                : image
                              : `${urlLocalPath}/images/default-user.png`
                          }
                          alt="User profile image"
                          className="filter hover:contrast-200 m-auto w-20 h-20 hover:bg-"
                        />
                        <input
                          type="file"
                          accept="image/jpeg, image/png"
                          onChange={async (event) => {
                            if (!event.target.files) return;

                            const formData = new FormData();
                            formData.append("file", event.target.files[0]);

                            const res = await fetch(
                              `${urlLocalPath}/api/user/image`,
                              {
                                method: "PUT",
                                body: formData,
                              }
                            );

                            const json = await res.json();

                            // For testing purposes
                            if (process.env.NODE_ENV) console.log(json.error);

                            if (res.status !== 200)
                              return toast.error(json.error);

                            await userUpdate();
                            setImage(userImage);

                            toast.success("Updated profile image.");
                          }}
                          className="hidden"
                        />
                      </label>

                      <input
                        type="text"
                        placeholder="First name"
                        defaultValue={firstName}
                        className="h-12 appearance-none border border-brown rounded px-3"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        defaultValue={lastName}
                        className="h-12 appearance-none border border-brown rounded px-3"
                        onChange={(e) => setLastName(e.target.value)}
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
