import PageRouter, { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPlaceholderData } from '@/lib/utils';

export const useStaticPageData = (queryKey: string[]) => {
  const router = useRouter();
  const client = useQueryClient();
  const placeholderData = getPlaceholderData();

  return useQuery<unknown, unknown, any>({
    queryKey: router && client ? queryKey : undefined,
    placeholderData,
    queryFn: () => {
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