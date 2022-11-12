import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { urlLocalPath, urlPath } from "../lib/urlPath";
import { toast } from "react-toastify";

interface TourSiteCardProps {
  id: string;
  isVisitor?: boolean;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  mediaSize: number;
}

export const TourSiteCard = (props: TourSiteCardProps) => {
  return (
    <>
      <Link href={`${urlLocalPath}/tours/${props.id}`}>
        <div className="flex justify-center h-40 w-11/12 align-middle rounded-lg bg-white shadow-md shadow-slate-400 border-2 border-stone-500 sm:rounded-md transition ease-in-out hover:bg-grey hover:cursor-pointer hover:scale-110 hover:animate-pulse select-none">
          <div className="flex flex-col h-full w-full justify-between p-2">
            <div className="flex flex-col w-full">
              <div className="text-2xl">{props.title}</div>
              <div className="text-sm overflow-y-hidden">{props.description}</div>
            </div>
            <div className="flex justify-between items-center w-full text-sm">
              <div className={`${props.mediaSize >= 5000 ? "text-red" : ""}`}>{props.mediaSize.toFixed(1)} MB</div>
              <div className="flex flex-col">
                <div>{props.updatedAt.includes("PM") || props.updatedAt.includes("AM") ? "Opened " + props.updatedAt : props.updatedAt}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export const TourSiteCardTemplate = () => {
  return (
    <>
      <div className="animate-pulse flex justify-center h-36 w-11/12 align-middle rounded-lg bg-white shadow-md shadow-slate-400 border-2 border-stone-500 sm:rounded-md">
        <div className="flex flex-col h-full w-full justify-between p-2">
          <div className="flex flex-col w-full gap-2">
            <div className="h-8 w-24 bg-grey rounded"></div>
            <div className="h-12 w-full bg-grey rounded"></div>
          </div>
          <div className="flex justify-between items-center w-full text-sm">
            <div className="h-4 w-8 bg-grey rounded"></div>
            <div className="h-4 w-8 bg-grey rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};
