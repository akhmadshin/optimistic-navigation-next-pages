import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';

export const withServerSideTanStackQuery = <Q extends ParsedUrlQuery = ParsedUrlQuery>(getServerSideProps: GetServerSideProps<{ dehydratedState: DehydratedState }, Q>) => async (
  props: GetServerSidePropsContext<Q>,
) => {
  const { resolvedUrl  } = props;
  let result;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [resolvedUrl],
    queryFn: async () => {
      result = await getServerSideProps(props);
      return result;
    }
  })

  if (!result) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}