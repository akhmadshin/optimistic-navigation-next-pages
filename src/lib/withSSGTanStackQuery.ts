import { ParsedUrlQuery } from 'querystring';
import {
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export const withSSGTanStackQuery = <T extends object, Q extends ParsedUrlQuery = ParsedUrlQuery>(getResolvedUrl: (context: Q) => string, getServerSideProps: GetStaticProps<T, Q>) => async (
  props: GetStaticPropsContext<Q>,
) => {
  let result: GetServerSidePropsResult<T>;
  const queryClient = new QueryClient();

  const resolvedUrl = getResolvedUrl(props.params as Q);
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