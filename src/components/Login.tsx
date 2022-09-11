import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { LoginRequestType, LoginResponseType } from '../pages/api/user/login';
import { FormType } from '../pages/login';

interface LoginProps {
  hook: (value: FormType) => void;
}

export const Login = (props: LoginProps) => {

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
        <div className="text-2xl">
          Login
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            name="email"
            placeholder="Email"
            onChange={handleFormChange}
            className="h-12 appearance-none border border-brown rounded px-3"
          />
          <input
            type="password"
            autoComplete="on"
            name="password"
            placeholder="Password"
            onChange={handleFormChange}
            className="h-12 appearance-none border border-brown rounded px-3"
          />
        </div>
        <div className="flex justify-center text-brown">
          <div
            onClick={() => props.hook(FormType.FORGOT_PASSWORD)}
            className="cursor-pointer select-none hover:text-background-900"
          >
            Forgot password?
          </div>
          <div className="mx-2 border-l-2 rounded border-brown"></div>
          <div
            onClick={() => props.hook(FormType.REGISTER)}
            className="cursor-pointer select-none hover:text-background-900"
          >
            Register
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLoginRequest}
            className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-green-700 hover:bg-green-800"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}
