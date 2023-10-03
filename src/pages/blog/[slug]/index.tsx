import { dehydrate, QueryClient } from '@tanstack/react-query'
import getQueryOptions from '@/components/pages/BlogItemPage/getQueryOptions';
import { BlogItemPage } from '@/components/pages/BlogItemPage';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{ dehydratedState: any }> = async ({params}) => {
  const {slug} = params as { slug: string };
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(getQueryOptions(slug))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Page() {
  return (
    <BlogItemPage/>
  )
}
