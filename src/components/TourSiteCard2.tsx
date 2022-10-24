import { useState } from "react"
import Link from "next/link";
import Router from "next/router";

interface TourSiteCardProps {
  id: string;
  title: string;
  description: string;
}

export const TourSiteCard = (props: TourSiteCardProps) => {
  return (
    <>
      <div className="flex justify-center h-36 w-11/12 align-middle rounded-lg bg-white shadow-md shadow-slate-400 border-2 border-stone-500 sm:rounded-md">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col w-full p-2">
            <div className="text-2xl">
              {props.title}
            </div>
            <div className="text-sm">
              {props.description}
            </div>
          </div>
          <div>
            <div className="border-t-2 w- border-stone-400" />
            <div className="flex justify-between h-8 text-base font-bold">
              {/* <Link href={`/tours/${props.id}`}>
                <button className="flex justify-center items-center w-full hover:bg-slate-100 transition ease-in-out">
                  VIEW
                </button>
              </Link> */} VIEW
              <div className="border-l-2 border-stone-400" />
              {/* <button
                onClick={async () => {
                  const bodyData = { tourId: props.id };

                  const res = await fetch("/api/tour", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                  });

                  if (res.status === 200)
                    Router.reload();
                }}
                className="flex justify-center items-center w-full text-red-500 hover:bg-slate-100 transition ease-in-out"
              >
                DELETE
              </button> */} CLONE
            </div>
          </div>
        </div>
      </div>
    </>
  )
}