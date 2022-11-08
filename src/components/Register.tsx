import { useState } from "react";
import { toast } from "react-toastify";
import { urlPath } from "../lib/urlPath";
import { FormType } from "../pages/login";

interface RegisterProps {
  hook: (value: FormType) => void;
}

export const Register = (props: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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

  const doRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== password2) return toast.error("Passwords must match");

    const res = await fetch(`${urlPath}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const json = await res.json();

    if (res.status === 200)
      toast.success(
        "Registered! Please check your inbox and verify your email address."
      );
    else toast.error(json.error);
  };

  return (
    <>
      <form onSubmit={doRegister} className="flex flex-col w-64 gap-6">
        <div className="text-3xl">Register</div>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            placeholder="Email"
            className="h-12 appearance-none border border-brown rounded px-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            autoComplete="on"
            placeholder="First Name"
            className="h-12 appearance-none border border-brown rounded px-3"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            autoComplete="on"
            placeholder="Last Name"
            className="h-12 appearance-none border border-brown rounded px-3"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Password"
            className="h-12 appearance-none border border-brown rounded px-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Confirm Password"
            className="h-12 appearance-none border border-brown rounded px-3"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </form>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.LOGIN)}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Already have an account?
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-green-700 hover:bg-green-800"
          >
            Register
          </button>
        </div>
        <div className="text-center">
          <span className={color}>{message}</span>
        </div>
      </form>
    </>
  );
};
