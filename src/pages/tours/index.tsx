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
import Router from "next/router";
import { Tour } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../lib/prisma";
import { useEffect, useState } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { urlLocalPath, urlPath } from "../../lib/urlPath";
import { Loading } from "../../components/util/Loading";
import { toast } from "react-toastify";
import { useUserStore } from "../../lib/store/user";
import { TourExtend } from "../../lib/types/tour-extend";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DashboardPage: NextPage = () => {
  const { data: session, status } = useSession();
  const [tours, setTours] = useState<TourExtend[] | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [sortQuery, setSortQuery] = useState({
    type: "Date Updated",
    asc: "desc",
  });
  const userName = useUserStore((state) => state.name);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const queryTours = () => {
      if (!session) return clearTimeout(timer);
      clearTimeout(timer);

      timer = setTimeout(async () => {
        const res = await fetch(
          `${urlPath}/api/tour?sortQuery=${sortQuery.type}&query=${query}&asc=${sortQuery.asc}`,
          {
            method: "GET",
          }
        );
        const json = await res.json();

        if (json) setTours(json.tours);
      }, 500);
    };
    queryTours();
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
      <div className="w-full min-h-screen">
        <Navbar page="dashboard" />
        <div className="flex w-full h-full mt-16 align-center justify-center pb-20">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>{userName.split(" ")[0]}&apos;s Tours</div>
              <button
                onClick={async () => {
                  const file = new File([], "blank.html");
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch(`${urlPath}/api/tour`, {
                    method: "POST",
                    body: formData,
                  });

                  const json = await res.json();

                  if (res.status !== 200) return toast.error(json.error);

                  Router.push(`${urlPath}/tours/${json.tourId}`);
                }}
                className="shadow-md rounded-md px-2 bg-green-800 text-base font-bold text-white hover:bg-green-600 transition ease-in-out delay-50"
              >
                Create New Tour +
              </button>
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
                  placeholder="Search by Title, Tour Pack, or Page Contents"
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
                            type: "Title",
                            asc:
                              sortQuery.type !== "Title"
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
                              Title
                            </a>
                          )}
                        </Menu.Item>
                      </form>
                      <form
                        onClick={(event) =>
                          setSortQuery({
                            type: "Date Created",
                            asc:
                              sortQuery.type !== "Date Created"
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
                              Date Created
                            </a>
                          )}
                        </Menu.Item>
                      </form>
                      <form
                        onClick={(event) =>
                          setSortQuery({
                            type: "Date Updated",
                            asc:
                              sortQuery.type !== "Date Updated"
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
                              Date Updated
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
              {tours ? (
                tours.map((tour: TourExtend) => {
                  return (
                    <TourSiteCard
                      id={tour.id}
                      key={tour.id}
                      title={tour.tourTitle}
                      description={
                        tour.tourDescription
                          ? tour.tourDescription
                          : "No description..."
                      }
                      mediaSize={tour.mediaSize}
                      createdAt={tour.tourCreatedAt}
                      updatedAt={tour.tourUpdatedAt}
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

DashboardPage.displayName = "Dashboard";

export default DashboardPage;

