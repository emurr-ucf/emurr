import type { NextPage } from "next";
import { Login } from "../components/login/Login";
import { Navbar } from "../components/navigation/Navbar";
import { OAuth } from "../components/login/OAuth";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Register } from "../components/login/Register";
import { ForgotPassword } from "../components/login/ForgotPassword";
import { Loading } from "../components/util/Loading";
import { useUserStore } from "../lib/store/user";
import { urlLocalPath } from "../lib/urlPath";

export enum FormType {
  LOGIN = 1,
  REGISTER,
  FORGOT_PASSWORD,
}

const LoginPage: NextPage = () => {
  const [formType, setFormType] = useState(FormType.LOGIN);
  const { data: session, status } = useSession();
  const userUpdate = useUserStore((state) => state.update);

  const loggedIn = async () => {
    await userUpdate();
    Router.push(`${urlLocalPath}/tours`);
  };

  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Authentification...</div>
        </div>
      </Loading>
    );
  }

  if (session) {
    loggedIn();
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
        <Navbar page="login" />
        <div className="flex justify-center text-green-800">
          <div className="flex justify-center h-fit p-5 mt-28 rounded-lg bg-background-200 border-2 border-l-4 border-b-4 border-brown sm:rounded-md">
            {formType === FormType.LOGIN && <Login hook={setFormType} />}
            {formType === FormType.REGISTER && <Register hook={setFormType} />}
            {formType === FormType.FORGOT_PASSWORD && (
              <ForgotPassword hook={setFormType} />
            )}
            <div className="mx-10 border-l-2 rounded border-brown"></div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  );
};

LoginPage.displayName = "Login";

export default LoginPage;
