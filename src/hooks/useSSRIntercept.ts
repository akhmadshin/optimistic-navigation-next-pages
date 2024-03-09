import PageRouter, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, useQueryClient } from '@tanstack/react-query';

export const useSSRIntercept = () => {
  useEffect(() => {

    if (!PageRouter.router?.components) return;
    console.log('PageRouter.router?.components = ', PageRouter.router?.components);

    const pageLoader = PageRouter.router.pageLoader;
    if (!pageLoader) return;

    for (const key in PageRouter.router.components) {
      if (key !== '/_app') delete PageRouter.router.components[key];
    }

    const {loadPage: originalLoadPage} = pageLoader;
    pageLoader.loadPage = (...args) => {
      console.log('args = ', args);
      console.log('pageLoader = ', pageLoader);
      return (
        originalLoadPage
          .apply(pageLoader, args)
          .then((pageCache) => {



            console.log('pageCache = ', pageCache);
            return ({
              ...pageCache,
              mod: {
                ...pageCache.mod,
                __N_SSG: false,
              },
            })
          }))
    }

    return () => {
      pageLoader.loadPage = originalLoadPage;
    };
  }, []);
};