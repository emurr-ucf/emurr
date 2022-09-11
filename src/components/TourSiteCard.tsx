import { useState } from "react"

interface TourSiteCardProps {
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
              <button className="flex justify-center items-center w-full hover:bg-slate-100 transition ease-in-out">
                EDIT
              </button>
              <div className="border-l-2 border-stone-400" />
              <button className="flex justify-center items-center w-full text-red-500 hover:bg-slate-100 transition ease-in-out">
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}