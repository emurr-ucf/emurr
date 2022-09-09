import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

<<<<<<< HEAD
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="w-full h-full">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
=======
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
>>>>>>> sign-in-connect
}

export default MyApp
