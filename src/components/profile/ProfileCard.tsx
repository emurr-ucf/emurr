import { MouseEventHandler } from "react";

export interface ProfileCardProps {
  image: string;
  title: string;
  description: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div
      className="flex justify-start items-center shadow-hard border-2 border-green-800 sm:rounded-md cursor-pointer w-2/5 bg-white p-2 m-2 transition ease-in-out hover:bg-grey hover:scale-110 hover:animate-pulse select-none"
      onClick={props.onClick}
    >
      <img alt={`${props.title}`} className="m-4 h-12 w-12" src={props.image} />
      <div className="flex flex-col">
        <div className="text-left text-3xl">{props.title}</div>
        <div className="text-left text-base">{props.description}</div>
      </div>
    </div>
  );
};
