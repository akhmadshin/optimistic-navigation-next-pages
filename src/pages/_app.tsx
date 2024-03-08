import '@/styles/globals.css'

import {
  Hydrate,
} from '@tanstack/react-query'
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { useSSRIntercept } from '@/hooks/useSSRIntercept';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/pages/Page';
import { createRouteLoader } from '@/lib/route-loader';

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
    if (!router) {
      return;
    }
    setTimeout(() => {
      console.log('prefetch');
      router.prefetch('/').catch(e => console.log('error = ', e));
      router.prefetch('/blog/[slug]').catch(e => console.log('error = ', e));
    }, 1000)
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