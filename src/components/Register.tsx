import { useState } from 'react';
import { FormType } from '../pages/login';

interface RegisterProps {
  hook: (value: FormType) => void;
}

export const Register = (props: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const doRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== password2) {
      setError("Passwords must match");
      return;
    }

    const body = {firstName, lastName, email, password};
    fetch("api/user/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then((response: Response) => {
      
      if (response.status === 200) {
        // TODO do registration magic here
        setError("Registered!")
      }
      else {
        //setError("Error :( " + response.status);
        response.json().then((json) => setError(json.error));
      }
    });
  }

  return (
    <>
      <form onSubmit={doRegister} className="flex flex-col w-64 gap-6">
        <div className="text-3xl">
          Register
        </div>
        <div className="flex flex-col gap-6">
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
        </div>
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
        <div className="text-center text-red-800">{error}</div>
      </form>
    </>
  )
}
