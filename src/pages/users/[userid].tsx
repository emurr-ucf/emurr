import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { Navbar } from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import { TourSiteCard } from '../../components/TourSiteCard';
import Router, { useRouter } from 'next/router';
import { Tour, User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { CreateTourResponseType } from '../api/tour';
import { useEffect, useState } from 'react';


const NewPage: NextPage = ({ propTours, userid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [tours, setTours] = useState(propTours);
    const [query, setQuery] = useState("");
    const [changing, setChanging] = useState(false);
    let timer: NodeJS.Timeout;
  
    const queryTours = () => {
      clearTimeout(timer);
  
      timer = setTimeout(async () => {
        const res = await fetch(`/api/tour?query=${query}&userid=${userid}`, {
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
    
    if (status === "loading") return <div>Loading...</div>;
    else if (status === "unauthenticated" && !changing) 
    {
      setChanging(true);
      Router.push("/");
    }
    else if (session?.user.id === userid && !changing)
    {
      setChanging(true);
      Router.push("/tours/");
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
                  <img src="/images/search.png" alt="" className="w-5 h-5 m-2" />
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

    if (token && typeof userid === "string") {
      const user = await prisma.user.findFirst({
        where: {
          id: userid,
        },
      });

      if (!user) return { props: { propTours: [], userid: token.id} }

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
  
    return {
      props: { propTours: [] }
    }
  };


export default NewPage