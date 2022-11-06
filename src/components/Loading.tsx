import { Circles } from "react-loader-spinner";

export interface LoadingProps {
  children?: JSX.Element | string;
}

export const Loading = ({ children }: LoadingProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        {children}
      </div>
    </>
  );
};
