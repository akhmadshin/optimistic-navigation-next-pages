import PageRouter, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, useQueryClient } from '@tanstack/react-query';

export const useSSGIntercept = () => {
  useEffect(() => {

    if (!PageRouter.router?.components) return;

    const pageLoader = PageRouter.router.pageLoader;
    if (!pageLoader) return;

    for (const key in PageRouter.router.components) {
      if (key !== '/_app') delete PageRouter.router.components[key];
    }

    const {loadPage: originalLoadPage} = pageLoader;
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
              },
            })
          }))
    }

    return () => {
      pageLoader.loadPage = originalLoadPage;
    };
  }, []);
};