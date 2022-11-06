import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import { TourSiteCard } from '../../components/TourSiteCard';
import Router, { useRouter } from 'next/router';
import { Tour } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { useEffect, useState } from 'react';
import Error from 'next/error';
import { urlPath } from '../../lib/urlPath';
import { Loading } from '../../components/Loading';


const ViewOtherPage: NextPage = ({ propTours, userid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tours, setTours] = useState(propTours);
  const [query, setQuery] = useState("");
  const [changing, setChanging] = useState(false);
  let timer: NodeJS.Timeout;

  const queryTours = () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const res = await fetch(`${urlPath}/api/tour/tour?query=${query}&userid=${userid}`, {
        method: "GET"
      })

      const resJSON = await res.json();

      if (resJSON)
        setTours(resJSON.tours);
    }, 500)
  }

  useEffect(() => {
    queryTours();
  }, [query]);

  // routing for: status, if changing, and if query (userid) is session id
  if (status === "loading") {
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Loading Authentification...</div>
        </div>
      </Loading>
    );
  }
  else if (status === "unauthenticated" && !changing) {
    setChanging(true);
    Router.push("/");
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
  }
  else if (session?.user.id === userid && !changing) {
    setChanging(true);
    Router.push("/tours");
    return (
      <Loading>
        <div className="flex flex-col justify-center items-center mt-2">
          <div>Redirecting...</div>
        </div>
      </Loading>
    );
  }
  else if (!userid && !changing) {
    return (<Error statusCode={404}></Error>);
  }

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
            </div>
            <div className="flex justify-between">
              <div className="flex w-3/5 h-auto items-center rounded-md border border-green-800 bg-white shadow-sm shadow-black">
                <img src={`${urlPath}/images/search.png`} alt="" className="w-5 h-5 m-2" />
                <input
                  type="text"
                  placeholder="Search by Title, Tour Pack, or Page Contents"
                  onChange={(event) => setQuery(event.target.value)}
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
                  id={tour.id}
                  isVisitor={session?.user.id != userid}
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
  const { userid } = context.query;

  // if valid token and userid query find user to display
  if (token && typeof userid === "string") {
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    // if no user then 404 their ass
    if (!user) return { props: { propTours: [], userid: null } }

    // if user then grab all their tours and return 
    const propTours = await prisma.tour.findMany({
      where: {
        tourAuthorId: userid,
      },
      select: {
        id: true,
        tourTitle: true,
        tourDescription: true,
      },
    });

    return {
      props: { propTours, userid }
    }
  }

  // fallback case so next isn't angry
  return {
    props: { propTours: [], userid: null }
  }
};


export default ViewOtherPage;
