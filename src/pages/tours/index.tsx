import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import { TourSiteCard } from '../../components/TourSiteCard';
import Router from 'next/router';
import { Tour } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";

const DashboardPage: NextPage = ({ tours }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <div className="w-full min-h-screen">
        <Navbar 
          page="dashboard"
        />
        <div className="flex w-full h-full mt-16 align-center justify-center">
          <div className="flex flex-col w-4/5 text-3xl gap-6">
            <div className="flex justify-between">
              <div>
                Users Pages
              </div>
              <button
                onClick={async () => {
                  const res = await fetch("/api/user/editUser", {
                  method: "POST",
                  body: JSON.stringify({ test: "test" })
                  })
                  const val = res.json();

                  console.log(session?.user.id);
              }}
                className="shadow-md rounded-md px-2 bg-green-800 text-base font-bold text-white hover:bg-green-600 transition ease-in-out delay-50"
              >
                Create New Page +
              </button>
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img src="/images/search.png" alt="" className="w-5 h-5 m-2" />
                <input
                  type="text"
                  placeholder="Search by Title, Tour Pack, or Page Contents"
                  className="w-full bg-transparent rounded-r-sm text-base focus:outline-none placeholder:italic placeholder:text-slate-400"
                />
              </div>
              <button className="flex items-center justify-between w-36 border border-green-800 shadow-md rounded-md px-2 text-black bg-white text-base hover:bg-slate-200 transition ease-in-out delay-50">
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
            <div className="inline-grid grid-cols-3 justify-items-center gap-6">
              {tours.map((tour: Tour) => {
                return <TourSiteCard
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
    const tours = await prisma.tour.findMany({
      where: {
        tourAuthorId: token.id,
      },
      select: {
        id: true,
        tourTitle: true,
        tourDescription: true,
      }
    })
  
    return {
      props: { tours }
    }
  }

  return {
    props: {  }
  }
}

export default DashboardPage