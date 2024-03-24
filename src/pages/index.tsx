import { promises as fs } from 'fs';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { HomePage } from '@/routes/HomePage';
import { GetServerSideProps } from 'next';
import { timeout } from '@/lib/api-helpers';
import { ArticleList } from '@/types/api';
import { latency } from '@/contants/server';

export type HomePageProps = ArticleList;

export const getServerSideProps: GetServerSideProps<{ dehydratedState: DehydratedState }> = async (props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['/'],
    queryFn: async () => {
      // Imitate slow api
      await timeout(latency);

      // const pageNumber = 0;
      // const limitNumber = 10;
      // const token = process.env.STRAPI_API_TOKEN;
      // const path = `/articles`;
      // const urlParamsObject = {
      //   sort: { createdAt: "desc" },
      //   fields: ['title', 'description', 'slug'],
      //   populate: {
      //     thumbnail: {
      //       fields: ['thumbhash', 'name', 'slug', 'alternativeText', 'height', 'width'],
      //     },
      //   },
      //   pagination: {
      //     start: pageNumber * limitNumber,
      //     limit: limitNumber,
      //   },
      // };
      // const options = { headers: { Authorization: `Bearer ${token}` } };
      // const posts = await fetchAPI<ArticleList>(path, urlParamsObject, options);
      const file = await fs.readFile(process.cwd() + '/public/mocks/articles.json', 'utf8');
      const posts = JSON.parse(file);
      return posts;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Page() {
  return (
    <HomePage />
  )
}
