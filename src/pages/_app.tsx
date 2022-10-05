// import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <div className="w-screen h-screen m-0 p-0 text-green-900 bg-background-400 overflow-auto">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
