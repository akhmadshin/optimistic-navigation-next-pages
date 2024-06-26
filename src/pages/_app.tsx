import '@/styles/globals.css'

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query'
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import type { AppProps } from 'next/app';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/Page';
import { useRouter } from 'next/router';
import { transitionHelper } from '@/lib/transitionHelper';
import { OptimisticRouterProvider } from 'next-optimistic-router';
import singletonRouter from 'next/dist/client/router';
import { ParentComponent } from '@/types/general';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { useClientLayoutEffect } from '@/hooks/useClientLayoutEffect';

const Providers: ParentComponent = ({ children }) => {
  return (
    <OptimisticRouterProvider singletonRouter={singletonRouter}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </OptimisticRouterProvider>
  );
}

export default function MyApp({Component, pageProps}: AppProps<{ dehydratedState: DehydratedState}>) {
  const router = useRouter();

  useClientLayoutEffect(() => {
    router.prefetch('/').catch((e: string) => { throw new Error(e) });
    router.prefetch('/blog/[slug]').catch((e: string) => { throw new Error(e) });
  }, [])

  useEffect(() => {
    router.prefetch = async () => Promise.resolve(undefined);

    router.beforePopState(() => {
      transitionHelper({
        updateDOM: async () => {
          if (window.pageMounted) {
            await window.pageMountedPromise;
          }
        },
      });

      return true;
    });
  }, [router])

  return (
    <WithQueryClientProvider>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Providers>
          <Header/>
            <main className="pb-28 pt-24">
              <Page>
                <Component {...pageProps} />
                <ThemeSwitch />
              </Page>
            </main>
          <div className="mt-16 sm:mt-32"></div>
        </Providers>
      </HydrationBoundary>
    </WithQueryClientProvider>
  )
}