import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


export const ForgotPasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  
  const router = useRouter();
  let resPassToken = router.query.resPassToken;

  const error = (message: string) => {
    setColor("text-red-800");
    setMessage(message);
  }

  const success = (message: string) => {
    setColor("text-green-600");
    setMessage(message);
  }

  const doForgotPasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((typeof(newPassword) !== 'string') && (typeof(newPassword2) !== 'string')) {
      error("Please input a valid password.");
      return;
    }

    if (newPassword !== newPassword2) {
      error("Passwords must match.");
      return;
    }

    const body = {newPassword, resPassToken};
    fetch("api/forgotPassword", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 200) {
        success("Password has been reset. Please log in using your new password.");
      }
      else {
        response.json().then((json) => error(json.error));
      }
    });
  }

  return (
    <>
      <form onSubmit={doForgotPasswordReset} className="flex flex-col w-64 gap-6">
        <div className="text-3xl">
          Reset Password
        </div>
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
            href="/login"
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
        <div className="text-center">
          <span className={color}>{message}</span>
        </div>
      </form>
    </>
  )
}
