import '@/styles/globals.css'

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query'
import React, { useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import type { AppProps } from 'next/app';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/Page';
import { createRouteLoader } from '@/lib/route-loader';
import { useRouter } from 'next/router';
import { transitionHelper } from '@/lib/transition-utils';
import { OptimisticRouterProvider } from 'next-optimistic-router';
import singletonRouter from 'next/dist/client/router';
import { ParentComponent } from '@/types/general';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch';

(() => {
  if (typeof window === 'undefined') {
    return;
  }
  const routeLoader = createRouteLoader('');
  routeLoader.prefetch('/').catch((e: string) => { throw new Error(e) });
  routeLoader.prefetch('/blog/[slug]').catch((e: string) => { throw new Error(e) });
})()



const Providers: ParentComponent = ({ children }) => {
  const pathModifier = useCallback((pathname: string) => {
    // const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
    // const localeCodes = (process.env.NEXT_PUBLIC_LOCALES ?? '').split(',');
    //
    // if (localeCodes.every((code) => !pathname.startsWith(`/${code}`))) {
    //   pathname = `/${defaultLocale}${pathname}`;
    // }

    return pathname;
  }, []);

  return (
    <OptimisticRouterProvider pathModifier={pathModifier} singletonRouter={singletonRouter}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </OptimisticRouterProvider>
  );
}

export default function MyApp({Component, pageProps}: AppProps<{ dehydratedState: DehydratedState}>) {
  const router = useRouter();

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