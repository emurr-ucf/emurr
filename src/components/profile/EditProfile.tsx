import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { useSession } from "next-auth/react";
import { urlLocalPath } from "../../lib/urlPath";

export const EditProfile = () => {
  const { data: session, status } = useSession();
  const isProd = process.env.NODE_ENV === "production";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);

    // TODO consider loading screen while awaiting api call
    // TODO consider making lastName information part of session information
    const res = await fetch("/api/user/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user.email || "",
      }),
    });
    const json = await res.json();

    if (json.error) {
      alert(json.error);
      return;
    }

    setFirstName(json.user.name || "");
    setLastName(json.user.lastName || "");
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/user/editUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    });

    const json = await res.json();
    if (json.error) {
      alert(json.error); // TODO improve interface
    } else {
      alert("Updated!"); // TODO improve interface
      setShow(false);
    }
  };

  return (
    <>
      <ProfileCard
        image={`${urlLocalPath}/images/profile/profile.svg`}
        title="Edit profile"
        description="Edit your profile information, such as your name and profile picture"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSave}>
            <div className="flex flex-col gap-6">
              <label>
                <img
                  src={
                    process.env.NODE_ENV === "production"
                      ? session?.user.image ||
                        `${urlLocalPath}/images/google.png`
                      : `${urlLocalPath}/images/google.png`
                  }
                  alt="User profile image"
                  className="filter hover:contrast-200 m-auto w-20 h-20 hover:bg-"
                />
                <input
                  type="file"
                  onChange={async (event) => {
                    if (!event.target.files) return;

                    const formData = new FormData();
                    formData.append("file", event.target.files[0]);

                    const res = await fetch(
                      `${urlLocalPath}/api/user/profileImage`,
                      {
                        method: "PUT",
                        body: formData,
                      }
                    );

                    const json = await res.json();

                    if (process.env.NODE_ENV) console.log(json.error);

                    if (res.status === 200 && session)
                      session.user.image = json.image;
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
        </Modal.Body>
      </Modal>
    </>
  );
};
