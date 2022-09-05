import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const DashboardPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (!session) {
    Router.push('/dashboard');
  }

  return (
    <>
      <div className="w-full min-h-screen bg-amber-50">
        <Navbar 
          page="login"
        />
        <div className="flex w-full h-full justify-center text-green-800">
          <div className="flex justify-center h-fit p-5 mt-28 rounded-lg bg-white shadow-hard border-2 border-green-800 sm:rounded-md">
            {formType === FormType.LOGIN && <Login hook={handleChange} />}
            {formType === FormType.REGISTER && <Register hook={handleChange} />}
            {formType === FormType.FORGOT_PASSWORD && <ForgotPassword hook={handleChange} />}
            <div className="mx-10 border-l-2 rounded border-stone-400"></div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
