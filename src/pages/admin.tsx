import type { NextPage } from "next";
import { Navbar } from "../components/navigation/Navbar";
import { useSession } from "next-auth/react";
import {  TourSiteCardTemplate } from "../components/tour/TourSiteCard";
import Router from "next/router";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { urlLocalPath, urlPath } from "../lib/urlPath";
import { Loading } from "../components/util/Loading";
import { UserCard } from "../components/user/UserCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [sortQuery, setSortQuery] = useState({
    type: "Name",
    asc: "asc",
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const queryUsers = () => {
      if (!session) return clearTimeout(timer);
      clearTimeout(timer);

      timer = setTimeout(async () => {
        const res = await fetch(
          `${urlPath}/api/user/query?sortQuery=${sortQuery.type}&query=${query}&asc=${sortQuery.asc}`,
          {
            method: "GET",
          }
        );
        const json = await res.json();

        if (json) setUsers(json.users);
      }, 500);
    };
    queryUsers();
  }, [query, sortQuery, session]);

  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Authentification...</div>
        </div>
      </Loading>
    );
  }

  let role;
  if (users && session) {
    const self = users.find((user) => user.id === session.user.id);
    role = self?.role;
  }
  if (status === "unauthenticated" || role === "USER") {
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
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="flex w-full h-full mt-16 align-center justify-center pb-20">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>Admin Portal</div>
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img
                  src={urlPath + "/images/search.png"}
                  alt=""
                  className="w-5 h-5 m-2"
                />
                <input
                  type="text"
                  placeholder="Search Users by Name or Email Address"
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent rounded-r-sm text-base focus:outline-none placeholder:italic placeholder:text-slate-400"
                />
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <div className="font-bold">
                      Sort By: {sortQuery.type}
                      {sortQuery.asc === "asc" ? " ▲" : " ▼"}
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
                        onClick={(event) =>
                          setSortQuery({
                            type: "Name",
                            asc:
                              sortQuery.type !== "Name"
                                ? "asc"
                                : sortQuery.asc === "asc"
                                ? "desc"
                                : "asc",
                          })
                        }
                      >
                        <Menu.Item>
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
                              Name
                            </a>
                          )}
                        </Menu.Item>
                      </form>
                      <form
                        onClick={(event) =>
                          setSortQuery({
                            type: "Account Created",
                            asc:
                              sortQuery.type !== "Account Created"
                                ? "desc"
                                : sortQuery.asc === "asc"
                                ? "desc"
                                : "asc",
                          })
                        }
                      >
                        <Menu.Item>
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
                              Account Created
                            </a>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="inline-grid grid-cols-3 justify-items-center gap-6">
              {users ? (
                users.map((user: User) => {
                  return (
                    <UserCard user={user} key={user.id} />
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

AdminPage.displayName = "Admin Portal";

export default AdminPage;
