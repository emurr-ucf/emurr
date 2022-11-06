import { useState } from "react";
import { urlPath } from "../lib/urlPath";
import { FormType } from "../pages/login";

interface ForgotPasswordProps {
  hook: (value: FormType) => void;
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const error = (message: string) => {
    setColor("text-red-800");
    setMessage(message);
  };

  const success = (message: string) => {
    setColor("text-green-600");
    setMessage(message);
  };

  const doForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof email !== "string") {
      error("Please input a valid email.");
      return;
    }

    const body = { email };
    fetch(`${urlPath}/api/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response: Response) => {
      if (response.status === 200) {
        success("Email sent. Please check your inbox to reset your password.");
      } else {
        response.json().then((json) => error(json.error));
      }
    });
  };

  return (
    <>
      <form onSubmit={doForgotPassword} className="flex flex-col w-64 gap-6">
        <div className="text-3xl">Forgot Password</div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            placeholder="Email"
            className="h-12 appearance-none border border-stone-800 rounded px-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.LOGIN)}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Back to login
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm rounded-md text-background-200 bg-green-700 hover:bg-green-900"
          >
            Send Email
          </button>
        </div>
        <div className="text-center">
          <span className={color}>{message}</span>
        </div>
      </form>
    </>
  );
};
