import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { OAuth } from '../components/OAuth';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { VerifyEmail } from '../components/VerifyEmail';
import { urlPath } from '../lib/urlPath';
import { Loading } from '../components/Loading';

const VerifyEmailPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading...</div>
        </div>
      </Loading>
    );
  }

  if (session) {
    Router.push("/tours");
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
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
