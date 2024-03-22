import '@/styles/globals.css'

import {
  Hydrate,
} from '@tanstack/react-query'
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { useSoftNavigationIntercept } from '@/hooks/useSoftNavigationIntercept';
import { AppProps } from 'next/app';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/Page';
import { createRouteLoader } from '@/lib/route-loader';
import { useRouter } from 'next/router';

(() => {
  if (typeof window === 'undefined') {
    return;
  }
  const routeLoader = createRouteLoader('');
  routeLoader.prefetch('/').catch(e => console.log('error = ', e));
  routeLoader.prefetch('/blog/[slug]').catch(e => console.log('error = ', e));
})()

export default function MyApp({Component, pageProps}: AppProps) {
  useSoftNavigationIntercept();

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