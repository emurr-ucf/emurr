import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { urlLocalPath, urlPath } from "../lib/urlPath";

export interface NavbarProps {
  page?: string;
  children?: JSX.Element;
}

export const Navbar = (props: NavbarProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <nav className="animate-pulse sticky top-0 z-50 border-b border-brown backdrop-blur-md bg-background-400">
          <div className="flex justify-between h-auto py-2 px-10">
            <div className="flex flex-row items-center gap-4 w-full">
              <div className="rounded w-10 h-10 bg-grey"></div>
              <div className="rounded w-20 h-10 bg-grey"></div>
            </div>
            <div className="rounded w-20 h-10 bg-grey"></div>
          </div>
        </nav>
      </>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <nav className="sticky top-0 z-50 border-b border-brown backdrop-blur-md bg-background-400">
          <div className="flex justify-between h-auto py-2 px-10">
            <div className="flex flex-row items-center gap-4 w-full">
              <img
                src={`${urlLocalPath}/images/logo_vert_5.png`}
                alt="An SVG of the Emurr Logo"
                className="w-10 h-10"
              />
              {props.children ? (
                <div className="w-full pr-4">{props.children}</div>
              ) : (
                <>
                  <div className="text-2xl font-semibold">EMURR</div>
                </>
              )}
            </div>
            <div className="flex flex-row justify-center items-center text-xl text-brown gap-2">
              <UserMenu />
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-brown backdrop-blur-md bg-background-400">
        <div className="flex justify-between h-auto py-2 px-10">
          <div className="flex flex-row justify-center items-center gap-4">
            <img
              src={`${urlLocalPath}/images/logo_vert_5.png`}
              alt="An SVG of the Emurr Logo"
              className="w-10 h-10"
            />
            <div className="text-2xl font-semibold">EMURR</div>
          </div>
          <div className="flex flex-row justify-center items-center text-xl text-brown gap-2">
            <div
              className={`py-1 px-2 rounded-md ${
                props.page === "home" ? "font-semibold hover:font-semibold" : ""
              } hover:bg-background-600 transition ease-in-out delay-50`}
            >
              <Link href={`${urlLocalPath}/`}>home</Link>
            </div>
            <div
              className={`py-1 px-2 rounded-md ${
                props.page === "about"
                  ? "font-semibold hover:font-semibold"
                  : ""
              } hover:bg-background-600 transition ease-in-out delay-50`}
            >
              <Link href={`${urlLocalPath}/about`} className="m-5">
                about
              </Link>
            </div>
            <div
              className={`py-1 px-2 rounded-md ${
                props.page === "login"
                  ? "font-semibold hover:font-semibold"
                  : ""
              } hover:bg-background-600 transition ease-in-out delay-50`}
            >
              <Link href={`${urlLocalPath}/login`} className="m-5">
                login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
