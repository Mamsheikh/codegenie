import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
       <Analytics /> 
    </>
  );
}

export default MyApp;
