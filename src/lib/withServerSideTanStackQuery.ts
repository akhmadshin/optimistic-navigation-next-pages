import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export const withServerSideTanStackQuery = <T extends object, Q extends ParsedUrlQuery = ParsedUrlQuery>(getServerSideProps: GetServerSideProps<T, Q>) => async (
  props: GetServerSidePropsContext<Q>,
) => {
  const { resolvedUrl  } = props;
  let result: GetServerSidePropsResult<T>;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [resolvedUrl],
    queryFn: async () => {
      result = await getServerSideProps(props) as { props: T | Promise<T> };
      return result?.props;
    }
  })

  // @ts-ignore
  if (!result) {
    return;
  }

  if (!(result as { props: T | Promise<T> }).props) {
    return result;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}