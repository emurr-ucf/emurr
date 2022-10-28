import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { OAuth } from '../components/OAuth';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { VerifyEmail } from '../components/VerifyEmail';
import { urlPath } from '../lib/urlPath';

const VerifyEmailPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (session) {
    Router.push(`${urlPath}/tours`);
  }

  return (
    <>
      <div className="min-h-screen">
        <Navbar
          page="verifyEmail"
        />
        <div className="flex justify-center text-green-800">
          <div className="flex justify-center h-fit p-5 mt-28 rounded-lg bg-background-200 border-2 border-l-4 border-b-4 border-brown sm:rounded-md">
            <VerifyEmail />
            <div className="mx-10 border-l-2 rounded border-brown"></div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyEmailPage
