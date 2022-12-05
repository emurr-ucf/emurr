import { NextPage } from "next";
import { EditPassword } from "../../components/profile/EditPassword";
import { EditProfile } from "../../components/profile/EditProfile";
import { Navbar } from "../../components/navigation/Navbar";
import { ManageAccount } from "../../components/profile/ManageAccount";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Loading } from "../../components/util/Loading";
import { urlLocalPath } from "../../lib/urlPath";
import { useState } from "react";
import { useUserStore } from "../../lib/store/user";

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();
  const userImage = useUserStore((state) => state.image);
  const [avatar, setAvatar] = useState(
    process.env.NODE_ENV === "production" && userImage !== ""
      ? userImage : `${urlLocalPath}/images/default-user.png`
  );
  const [avatarVersion, setAvatarVersion] = useState(1);
  const updateAvatar = (newAvatar: string) => {
    setAvatar(`${newAvatar}?${avatarVersion}`);
    setAvatarVersion(avatarVersion + 1);
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
  if (status === "unauthenticated") {
    Router.push(`${urlLocalPath}/`);
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
        <Navbar page="profile" avatar={avatar} />
        <div className="flex flex-col px-28 mt-10 text-green-700 items-center w-4/5 m-auto">
          <EditPassword />
          <EditProfile avatar={avatar} updateAvatar={updateAvatar} />
          <ManageAccount />
        </div>
      </div>
    </>
  );
};

ProfilePage.displayName = "Profile";

export default ProfilePage;
