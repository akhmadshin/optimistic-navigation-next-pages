import PageRouter, { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatWithValidation } from 'next/dist/shared/lib/router/utils/format-url';

function getPathFromUrl(url: string) {
  return url.split(/[?#]/)[0];
}

export const usePageData = () => {
  const router = useRouter();
  const client = useQueryClient();
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;

  return useQuery<unknown, unknown, any>({
    queryKey: router && client ? [getPathFromUrl(router.asPath)] : undefined,
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