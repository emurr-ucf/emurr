import { Role } from "@prisma/client";
import { NextPage } from "next";
import { EditLogin } from "../../components/profile/EditLogin";
import { EditPassword } from "../../components/profile/EditPassword";
import { EditProfile } from "../../components/profile/EditProfile";
import { Navbar } from "../../components/navigation/Navbar";
import { ManageAccount } from "../../components/profile/ManageAccount";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Loading } from "../../components/util/Loading";
import { urlLocalPath } from "../../lib/urlPath";

const TestPage: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="w-full h-full">
        <Navbar page="profile" />
        <div className="flex flex-wrap px-28 mt-10 text-green-700 justify-center w-4/5 m-auto">
          <>token.role</>
        </div>
      </div>
    </>
  );
};
TestPage.displayName = "Profile";

export default TestPage;

