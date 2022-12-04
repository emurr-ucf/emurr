import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Navbar } from "../../components/navigation/Navbar";
import { useSession } from "next-auth/react";
import {
  TourSiteCard,
  TourSiteCardTemplate,
} from "../../components/tour/TourSiteCard";
import Router, { useRouter } from "next/router";
import { Tour, User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../lib/prisma";
import { useEffect, useState } from "react";
import Error from "next/error";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { Loading } from "../../components/util/Loading";
import { TourExtend } from "../../lib/types/tour-extend";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { ConfirmDeleteUser } from "../../components/user/ConfirmDeleteUser";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ViewOtherPage: NextPage = ({
  userid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const [tours, setTours] = useState<TourExtend[] | undefined>([]);
  const [query, setQuery] = useState("");
  const [changing, setChanging] = useState(false);
  const [pageUserId, setPageUserId] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [foundUser, setFoundUser] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const queryTours = () => {
      if (!session) return clearTimeout(timer);
      clearTimeout(timer);

      timer = setTimeout(async () => {
        const res = await fetch(
          `${urlPath}/api/tour?query=${query}&userid=${userid}`,
          {
            method: "GET",
          }
        );

        const json = await res.json();

        if (json) setTours(json.tours);
      }, 500);
      setPageUserId(userid);
    };

    queryTours();
  }, [query, userid, session]);

  // routing for: status, if changing, and if query (userid) is session id
  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Authentification...</div>
        </div>
      </Loading>
    );
  } else if (status === "unauthenticated" && !changing) {
    setChanging(true);
    Router.push(`${urlLocalPath}/`);
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
  } else if (session?.user.id === userid && !changing) {
    setChanging(true);
    Router.push(`${urlLocalPath}/tours`);
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
  } else if (!userid && !changing) {
    return <Error statusCode={404}></Error>;
  }

  if (!foundUser) {
    // set value to avoid duplicate requests
    setFoundUser(true);
    const findUser = async () => {
      const res = await fetch(`${urlLocalPath}/api/user/role?userID=${userid}`, {
        method: "GET",
      });
      const json = await res.json();
      setRole(json.role);
      setFirstName(json.name);
    }
    findUser();
  }

  return (
    <>
      <div className="w-full min-h-screen">
        <Navbar page="dashboard" />
        <div className="flex w-full h-full mt-16 align-center justify-center pb-20">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>{firstName}&apos;s Tours</div>
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img
                  src={`${urlPath}/images/search.png`}
                  alt=""
                  className="w-5 h-5 m-2"
                />
                <input
                  type="text"
                  placeholder="Search by Title, Tour Pack, or Page Contents"
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent rounded-r-sm text-base focus:outline-none placeholder:italic placeholder:text-slate-400"
                />
              </div>



              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <div className="font-bold">
                      User actions ▼
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <form
                        onClick={async (event) => {
                          if (role === "")
                            return;
                          const res = await fetch(
                            `${urlPath}/api/user/super`,
                            {
                              // "PUT" demotes to user
                              // "POST" promotes to admin
                              method: role === "ADMIN" ? "PUT" : "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                userID: userid,
                              }),
                            }
                          );
                          if (res.status === 200) {
                            setRole(role === "ADMIN" ? "USER" : "ADMIN");
                            toast.success("Updated user role");
                          }
                          else {
                            const json = await res.json();
                            toast.error(json.error);
                          }
                        }}
                      >
                        <Menu.Item disabled={role === ""}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {
                                role === "ADMIN" ? "Demote to User" :
                                role === "USER" ? "Promote to Administrator" :
                                "Loading..."
                              }
                            </a>
                          )}
                        </Menu.Item>
                      </form>
                      <form
                        onClick={(event) => {}}
                      >
                        <Menu.Item>
                          <ConfirmDeleteUser userID={userid} />
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>



            </div>
            <div className="inline-grid grid-cols-3 justify-items-center gap-6">
              {tours !== undefined ? (
                tours.map((tour: TourExtend) => {
                  return (
                    <TourSiteCard
                      id={tour.id}
                      isVisitor={session?.user.id != userid}
                      key={tour.id}
                      title={tour.tourTitle}
                      description={
                        tour.tourDescription
                          ? tour.tourDescription
                          : "No description..."
                      }
                      createdAt={tour.tourCreatedAt}
                      updatedAt={tour.tourUpdatedAt}
                      mediaSize={tour.mediaSize}
                    />
                  );
                })
              ) : (
                <>
                  <TourSiteCardTemplate />
                  <TourSiteCardTemplate />
                  <TourSiteCardTemplate />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userid } = context.query;
  return {
    props: { userid },
  };
};

ViewOtherPage.displayName = "Profile";

export default ViewOtherPage;
