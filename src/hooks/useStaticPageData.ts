import PageRouter, { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useStaticPageData = (queryKey: string[], placeholderData?: any) => {
  const router = useRouter();
  const client = useQueryClient();

  return useQuery<unknown, unknown, any>({
    queryKey: router && client ? queryKey : undefined,
    placeholderData,
    queryFn: () => {
      console.log('router = ', router);
      console.log('PageRouter?.router = ', PageRouter?.router);
      if (router && PageRouter?.router) {
        return fetch(
          PageRouter.router!.pageLoader.getDataHref({
            href: router.route,
            asPath: router.asPath,
          })
        )
          .then((res) => res.json())
          .then(async (res) => {
            const { state } = res.pageProps.dehydratedState.queries[0];
            // client.setQueriesData(queryKey, state.data);
            return state.data;
          });
      }
    },
  });

}