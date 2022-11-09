import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { urlLocalPath } from "../lib/urlPath";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      basePath={`${urlLocalPath}/api/auth`}
      refetchInterval={5 * 60}
    >
      <Head>
        <title>{`${
          Component.displayName ? Component.displayName : "Emurr"
        }`}</title>
        <link rel="shortcut icon" href={`${urlLocalPath}/favicon.ico`} />
      </Head>
      <div className="w-screen h-screen m-0 p-0 text-green-900 bg-background-400 overflow-auto">
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-left"
          newestOnTop
          closeOnClick
          draggable={false}
        />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
