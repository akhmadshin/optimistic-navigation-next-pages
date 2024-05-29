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
import { OptimisticLinkProvider } from 'next-optimistic-link';
import singletonRouter from 'next/dist/client/router';
import * as process from 'process';
import { ParentComponent } from '@/types/general';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch';

(() => {
  if (typeof window === 'undefined') {
    return;
  }
  const routeLoader = createRouteLoader('');
  routeLoader.prefetch('/[locale]').catch((e: string) => { throw new Error(e) });
  routeLoader.prefetch('/[locale]/blog/[slug]').catch((e: string) => { throw new Error(e) });
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
    <OptimisticLinkProvider pathModifier={pathModifier} singletonRouter={singletonRouter}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </OptimisticLinkProvider>
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