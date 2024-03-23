import '@/styles/globals.css'

import React from 'react';
import { Header } from '@/components/Header';
import { AppProps } from 'next/app';
import { Page } from '@/components/Page';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Header/>
      <main>
        <Page>
          <Component {...pageProps} />
        </Page>
      </main>
      <div className="mt-16 sm:mt-32"></div>
    </>
  )
}