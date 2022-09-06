import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ 
    Component, 
    pageProps : {
      session, ...pageProps
    }
  }: AppProps) {
    return (
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <div className="w-full h-full">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    )
}

export default MyApp
