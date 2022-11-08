import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { urlLocalPath, urlPath } from "../lib/urlPath";
import { toast } from "react-toastify";

export const ForgotPasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const router = useRouter();
  let rPT = router.query.rPT;

  const doForgotPasswordReset = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (newPassword !== newPassword2)
      return toast.error("Passwords do not match.");

    const res = await fetch(`${urlPath}/api/user/forgot`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword, resPassToken: rPT }),
    });

    const json = await res.json();

    if (res.status === 200)
      toast.success(
        "Password has been reset. Please log in using your new password."
      );
    else toast.error(json.error);
  };

  return (
    <>
      <form
        onSubmit={doForgotPasswordReset}
        className="flex flex-col w-64 gap-6"
      >
        <div className="text-3xl">Reset Password</div>
        <div className="flex flex-col gap-6">
          <input
            type="password"
            autoComplete="on"
            placeholder="New Password"
            className="h-12 appearance-none border border-stone-800 rounded px-3"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="password"
            autoComplete="on"
            placeholder="Re-Enter New Password"
            className="h-12 appearance-none border border-stone-800 rounded px-3"
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Link
            href={`${urlLocalPath}/login`}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Back to login
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm rounded-md text-background-200 bg-green-700 hover:bg-green-900"
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};
