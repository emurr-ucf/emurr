import Link from "next/link";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { User } from "@prisma/client";
import { MouseEventHandler } from "react";
import { userAgent } from "next/server";
import { useUserStore } from "../../lib/store/user";

interface UserCardProps {
  user: User;
}

export const UserCard = (props: UserCardProps) => {
  const user = props.user;
  const email = useUserStore((state) => state.email);
  const isSelfUser = email === user.email;
  const url = isSelfUser ? `${urlLocalPath}/tours` : `${urlLocalPath}/users/${user.id}`
  const bold = isSelfUser ? " font-bold" : "";

  return (
    <>
      <Link href={url}>
        <div className="flex justify-center h-40 w-11/12 align-middle rounded-lg bg-white shadow-md shadow-slate-400 border-2 border-stone-500 sm:rounded-md transition ease-in-out hover:bg-grey hover:cursor-pointer hover:scale-110 hover:animate-pulse select-none">
          <div className={"flex flex-col h-full w-full justify-between p-2 min-width-0" + bold}>
            <div className="flex flex-col w-full">
              <div className="text-2xl">
                {user.name + (user.lastName ? ` ${user.lastName}` : "")}
              </div>
              <div className="text-sm overflow-y-hidden overflow-x-hidden">
                {user.email || ""}
              </div>
            </div>
            <div className="flex justify-between items-center w-full text-sm">
              {user.role === "ADMIN" ? 
                <>
                  Administrator
                  <img src={`${urlLocalPath}/images/profile/shield.svg`}
                    height={32}
                    width={32}
                    title="Administrator"
                    alt="Administrator"
                  />
                </>
                :
                <>User</>
              }
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
