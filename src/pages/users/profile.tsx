import { NextPage } from "next";
import { EditLogin } from "../../components/profile/EditLogin";
import { EditPassword } from "../../components/profile/EditPassword";
import { EditProfile } from "../../components/profile/EditProfile";
import { Navbar } from "../../components/Navbar";
import { ManageAccount } from "../../components/profile/ManageAccount";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Loading } from "../../components/Loading";

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Authentification...</div>
        </div>
      </Loading>
    );
  }
  if (status === "unauthenticated") {
    Router.push("/");
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
      <div className="w-full h-full">
        <Navbar page="profile" />
        <div className="flex flex-wrap px-28 mt-10 text-green-700 justify-center w-4/5 m-auto">
          <EditLogin />
          <EditPassword />
          <EditProfile />
          <ManageAccount />
        </div>
      </div>
    </>
  );
};

ProfilePage.displayName = "PROFILE";

export default ProfilePage;
