import '@/styles/globals.css'

import {
  Hydrate,
} from '@tanstack/react-query'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useSSRIntercept } from '@/hooks/useSSRIntercept';
import { AppProps } from 'next/app';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/pages/Page';
import { createRouteLoader } from '@/lib/route-loader';
import PageRouter, { useRouter } from 'next/router';
import { hydrate } from '@tanstack/query-core';

(() => {
  if (typeof window === 'undefined') {
    return;
  }
  window.navigator;
  const routeLoader = createRouteLoader('');

  console.log('prefetching');
  routeLoader.prefetch('/').catch(e => console.log('error = ', e));
  routeLoader.prefetch('/blog/[slug]').catch(e => console.log('error = ', e));
})()

export default function MyApp({Component, pageProps}: AppProps) {
  useSSRIntercept();

  const router = useRouter();

  useEffect(() => {
    router.prefetch = async () => { }
  }, [router])

  return (
    <WithQueryClientProvider>
      <Header/>
      <main>
        <Hydrate state={pageProps.dehydratedState}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Hydrate>
      </main>
      <div className="mt-16 sm:mt-32"></div>
    </WithQueryClientProvider>
  )
}