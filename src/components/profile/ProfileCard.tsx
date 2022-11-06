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
      className="shadow-hard border-2 border-green-800 sm:rounded-md cursor-pointer w-2/5 bg-white p-2 m-2"
      onClick={props.onClick}
    >
      <span>
        <img
          alt={`${props.title}`}
          className="block m-auto w-12"
          src={props.image}
        />
        <div className="text-center items-center w-full text-3xl">
          {props.title}
        </div>
        <div className="text-center items-center w-full text-base">
          {props.description}
        </div>
      </span>
    </div>
  );
};
