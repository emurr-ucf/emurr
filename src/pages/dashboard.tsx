import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { TourSiteCard } from '../components/TourSiteCard';
import Router from 'next/router';

const DashboardPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  if (status === "unauthenticated") {
    Router.push("/");
  }

  return (
    <>
      <div className="w-full min-h-screen bg-amber-50">
        <Navbar 
          page="login"
        />
        <div className="flex w-full h-full mt-16 align-center justify-center text-green-800">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>
                Users Pages
              </div>
              <button className="shadow-md rounded-md px-2 bg-green-800 text-base font-bold text-white hover:bg-green-600 transition ease-in-out delay-50">
                Create New Page +
              </button>
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img src="/images/search.png" className="w-5 h-5 m-2" />
                <input
                  type="text"
                  placeholder="Search by Title, Tour Pack, or Page Contents"
                  className="w-full bg-transparent rounded-r-sm text-base focus:outline-none placeholder:italic placeholder:text-slate-400"
                />
              </div>
              <button className="flex items-center justify-between w-36 border border-green-800 shadow-md rounded-md px-2 text-black bg-white text-base text-white hover:bg-slate-200 transition ease-in-out delay-50">
                <div className="flex justify-center gap-2">
                  <div className="font-bold">
                    Sort By:
                  </div>
                  <div>
                    nil
                  </div>
                </div>
                <div className="text-slate-300">
                  ▼
                </div>
              </button>
            </div>
            <div className="flex justify-between w-full">
              <TourSiteCard
                title="Name"
                description="description"
              />
              <TourSiteCard
                title="Name"
                description="description"
              />
              <TourSiteCard
                title="Name"
                description="description"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
