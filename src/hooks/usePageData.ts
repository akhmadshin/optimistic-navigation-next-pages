import PageRouter, { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { formatUrl, formatWithValidation } from 'next/dist/shared/lib/router/utils/format-url';
import { ParsedUrlQuery } from 'querystring';

const getResolvedUrl = (urlPathname: string, query: ParsedUrlQuery) => {
  const hadTrailingSlash = urlPathname !== '/' && process.env.__NEXT_TRAILING_SLASH;

  return formatUrl({
    pathname: `${urlPathname}${hadTrailingSlash ? '/' : ''}`,
    query,
  })
}

export const usePageData = <T>() => {
  const router = useRouter();
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;

  const resolvedUrl = getResolvedUrl(router.pathname, router.query);
  return useQuery<unknown, unknown, T>({
    queryKey: resolvedUrl ? [resolvedUrl] : undefined,
    placeholderData,
    queryFn: async () => {
      if (router && PageRouter?.router) {
        const res = await fetch(
          PageRouter.router!.pageLoader.getDataHref({
            href: formatWithValidation({ pathname: router.route, query: router.query }),
            asPath: router.asPath,
          })
        );
        if (res.ok) {
          const data = await res.json();
          if (!data.pageProps.dehydratedState) {
            return router.reload();
          }
          const { state } = data.pageProps.dehydratedState.queries[0];
          // client.setQueriesData(queryKey, state.data);
          return state.data;
        }
        router.reload();
        throw new Error(res.statusText);
      }
    },
  });
}