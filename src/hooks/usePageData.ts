import PageRouter, { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { formatWithValidation } from 'next/dist/shared/lib/router/utils/format-url';

export const usePageData = <T>() => {
  const router = useRouter();
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;
  const resolvedUrl = router.asPath;

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
            router.reload();
            throw new Error('pageProps.dehydratedState is empty');
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