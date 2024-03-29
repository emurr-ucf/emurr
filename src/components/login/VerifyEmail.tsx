import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { toast } from "react-toastify";

export const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const router = useRouter();
  let eT = router.query.eT;

  const error = (message: string) => {
    setColor("text-red-800");
    setMessage(message);
  };

  const success = (message: string) => {
    setColor("text-green-600");
    setMessage(message);
  };

  const doVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`${urlPath}/api/user/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailToken: eT }),
    });

    const json = await res.json();

    if (res.status === 200)
      toast.success(
        "Your email has been verified. Please log into your account."
      );
    else toast.error(json.error);
  };

  return (
    <>
      <form onSubmit={doVerifyEmail} className="flex flex-col w-64 gap-6">
        <div className="text-3xl">Verify Email</div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm rounded-md text-background-200 bg-green-700 hover:bg-green-900"
          >
            Click to Verify
          </button>
        </div>
        <div className="flex justify-center">
          <Link
            href={`${urlLocalPath}/login`}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Back to login
          </Link>
        </div>

        <div className="text-center">
          <span className={color}>{message}</span>
        </div>
      </form>
    </>
  );
};
