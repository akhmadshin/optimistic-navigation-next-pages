import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export const withServerSideTanStackQuery = <T extends object, Q extends ParsedUrlQuery = ParsedUrlQuery>(getServerSideProps: GetServerSideProps<T, Q>) => async (
  props: GetServerSidePropsContext<Q>,
) => {
  const { resolvedUrl, res  } = props;
  let result: GetServerSidePropsResult<T>;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [resolvedUrl],
    queryFn: async () => {
      result = await getServerSideProps(props) as { props: T | Promise<T> };
      return result?.props;
    }
  })

  // const originalEnd = res.end;
  // // @ts-ignore
  // res.end = function (...args: any) {
  //   const getFormattedArgs = () => {
  //     console.log('args = ', args);
  //     // @ts-ignore
  //     const [data, ...restArgs] = args;
  //     if (/^<!DOCTYPE html>/.test(data)) {
  //       return args;
  //     }
  //     return [data.replace(`"__N_SSP":true}`, `"__N_SSP":false}`), ...restArgs];
  //   }
  //   originalEnd.apply(res, getFormattedArgs());
  // };

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