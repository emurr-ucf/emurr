<<<<<<< HEAD
=======
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { LoginRequestType, LoginResponseType } from '../pages/api/user/login';
>>>>>>> sign-in-connect
import { FormType } from '../pages/login';

interface LoginProps {
  hook: (value: FormType) => void;
}

export const Login = (props: LoginProps) => {
<<<<<<< HEAD
  return (
    <>
      <form action="/api/login" method="POST" className="flex flex-col w-64 gap-6">
=======

  const [loginFormState, setLoginFormState] = useState<LoginRequestType>({
    email: "",
    password: ""
  });

  const handleFormChange = ({
    target: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginRequest = async () => {
    try {
      const res = await axios.post<LoginRequestType, AxiosResponse<LoginResponseType>>("/api/user/login", loginFormState);

      if (res.status === 200) {
        Router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form action="#" method="POST" className="flex flex-col w-64 gap-6">
>>>>>>> sign-in-connect
        <div className="text-3xl">
          Login
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
<<<<<<< HEAD
            placeholder="Email"
=======
            name="email"
            placeholder="Email"
            onChange={handleFormChange}
>>>>>>> sign-in-connect
            className="w-full h-12 appearance-none border border-stone-800 rounded px-3"
          />
          <input
            type="password"
            autoComplete="on"
<<<<<<< HEAD
            placeholder="Password"
=======
            name="password"
            placeholder="Password"
            onChange={handleFormChange}
>>>>>>> sign-in-connect
            className="w-full h-12 appearance-none border border-stone-800 rounded px-3"
          />
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.FORGOT_PASSWORD)}
            className="cursor-pointer select-none"
          >
            Forgot password?
          </div>
          <div className="mx-2 border-l-2 rounded border-stone-400"></div>
          <div
            onClick={() => props.hook(FormType.REGISTER)}
            className="cursor-pointer select-none"
          >
            Register
          </div>
        </div>
        <div className="flex justify-center">
          <button
<<<<<<< HEAD
            type="submit"
=======
            type="button"
            onClick={handleLoginRequest}
>>>>>>> sign-in-connect
            className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}
