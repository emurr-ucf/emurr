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

const ViewOtherPage: NextPage = ({ propTours }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
//   const [tours, setTours] = useState(propTours);
  const [query, setQuery] = useState("");
  let timer: NodeJS.Timeout;

  const queryTours = () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const res = await fetch(`/api/getUserById?query=${query}`, {
        method: "GET"
      })

      const resJSON = await res.json();

      if (resJSON)
        // setTours(resJSON.tours);
        console.log(resJSON.user);
    }, 500)
  }

//   useEffect(() => {
//     queryTours();
//   }, [query]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") Router.push("/");

  return (
    <>
      <div className="w-full min-h-screen">
        
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

export default ViewOtherPage