import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="w-full h-full">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
