import { NextPage } from "next"
import { EditLogin } from "../components/profile/EditLogin";
import { EditPassword } from "../components/profile/EditPassword";
import { EditProfile } from "../components/profile/EditProfile";
import { Navbar } from '../components/Navbar'
import { ManageAccount } from "../components/profile/ManageAccount";

const ProfilePage: NextPage = () => {
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
}

export default ProfilePage
