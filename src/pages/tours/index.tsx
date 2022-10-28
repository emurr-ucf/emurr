import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import { TourSiteCard } from '../../components/TourSiteCard';
import Router from 'next/router';
import { Tour } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { CreateTourResponseType } from '../api/tour';
import { useEffect, useState } from 'react';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { title } from 'process';
import { urlPath } from '../../lib/urlPath';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const DashboardPage: NextPage = ({ propTours }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const [tours, setTours] = useState(propTours);
  const [query, setQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  let timer: NodeJS.Timeout;

  const queryTours = () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const res = await fetch(`${urlPath}/api/tour?sortQuery=${sortQuery}&query=${query}`, {
        method: "GET"
      })
      const resJSON = await res.json();

      if (resJSON)
        setTours(resJSON.tours);
    }, 500)
  }

  useEffect(() => {
    queryTours();
  }, [query, sortQuery])

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") Router.push("/");

  return (
    <>
      <div className="w-full min-h-screen">
        <Navbar
          page="dashboard"
        />
        <div className="flex w-full h-full mt-16 align-center justify-center pb-20">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>
                Users Pages
              </div>
              <button
                onClick={async () => {
                  const file = new File([], "blank.html");
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch(`${urlPath}/api/tour`, {
                    method: "POST",
                    body: formData,
                  });

                  const body: CreateTourResponseType = await res.json();

                  if (!body.error)
                    Router.push("/tours/${body.tourId}");
                }}
                className="shadow-md rounded-md px-2 bg-green-800 text-base font-bold text-white hover:bg-green-600 transition ease-in-out delay-50"
              >
                Create New Tour +
              </button>
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img src={urlPath + "/images/search.png"} alt="" className="w-5 h-5 m-2" />
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
                      Sort By: {sortQuery} ▾
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
                      <form onClick={(event) => setSortQuery(' ')}>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>None</a>
                          )}
                        </Menu.Item>
                      </form>
                      <form onClick={(event) => setSortQuery('Title')}>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>Title</a>
                          )}
                        </Menu.Item>
                      </form>
                      <form onClick={(event) => setSortQuery('Date')}>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>Date Created</a>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="inline-grid grid-cols-3 justify-items-center gap-6">
              {tours.map((tour: Tour) => {
                return <TourSiteCard
                  id={tour.id}
                  key={tour.id}
                  title={tour.tourTitle}
                  description={tour.tourDescription ? tour.tourDescription : "No description..."}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken(context);

  if (token) {
    const propTours = await prisma.tour.findMany({
      where: {
        tourAuthorId: token.id,
      },
      select: {
        id: true,
        tourTitle: true,
        tourDescription: true,
      }
    });

    return {
      props: { propTours }
    }
  }

  return {
    props: { propTours: [] }
  }
}

export default DashboardPage