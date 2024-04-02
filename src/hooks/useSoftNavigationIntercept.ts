import PageRouter from 'next/router';
import { useEffect } from 'react';

export const useSoftNavigationIntercept = () => {
  useEffect(() => {

    if (!PageRouter.router?.components) return;

    const pageLoader = PageRouter.router.pageLoader;
    if (!pageLoader) return;

    for (const key in PageRouter.router.components) {
      if (key !== '/_app') delete PageRouter.router.components[key];
    }

    const originalLoadPage = pageLoader.loadPage;
    pageLoader.loadPage = (...args) => {
      return (
        originalLoadPage
          .apply(pageLoader, args)
          .then((pageCache) => {
            return ({
              ...pageCache,
              mod: {
                ...pageCache.mod,
                __N_SSG: false,
                __N_SSP: false,
              },
            })
          }))
    }

    return () => {
      pageLoader.loadPage = originalLoadPage;
    };
  }, []);
};