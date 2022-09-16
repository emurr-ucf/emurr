import type { NextPage } from 'next';
import { Login } from '../components/Login';
import { Navbar } from '../components/Navbar';
import { OAuth } from '../components/OAuth';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Register } from '../components/Register';
import { ForgotPassword } from '../components/ForgotPassword';

export enum FormType { LOGIN = 1, REGISTER, FORGOT_PASSWORD };

const LoginPage: NextPage = () => {
  const [formType, setFormType] = useState(FormType.LOGIN);
  const { data: session, status } = useSession();

  const handleChange = (value: FormType) => {
    console.log("Test");
    setFormType(value);
  }

  if (session) {
    Router.push('/dashboard');
  }

  return (
    <>
      <div className="min-h-screen">
        <Navbar 
          page="login"
        />
        <div className="flex justify-center text-green-800">
          <div className="flex justify-center h-fit p-5 mt-28 rounded-lg bg-background-200 border-2 border-l-4 border-b-4 border-brown sm:rounded-md">
            {formType === FormType.LOGIN && <Login hook={handleChange} />}
            {formType === FormType.REGISTER && <Register hook={handleChange} />}
            {formType === FormType.FORGOT_PASSWORD && <ForgotPassword hook={handleChange} />}
            <div className="mx-10 border-l-2 rounded border-brown"></div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
