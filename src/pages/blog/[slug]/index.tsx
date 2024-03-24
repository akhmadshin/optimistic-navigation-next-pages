import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { BlogItemPage } from '@/routes/BlogItemPage';
import { GetStaticProps } from 'next';
import { ArticleItem } from '@/types/api';
import { timeout } from '@/lib/api-helpers';
import { promises as fs } from 'fs';
import { latency } from '@/contants/server';

export type BlogItemPageProps = ArticleItem;

export default function Page() {
  return (
    <BlogItemPage />
  )
}

export const getServerSideProps: GetStaticProps<{ dehydratedState: DehydratedState }> = async (props) => {
  const { slug } = props.params as { slug: string };
  let result;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [`/blog/${slug}/`],
    queryFn: async () => {
      // Imitate slow api
      await timeout(latency);

      // const token = process.env.STRAPI_API_TOKEN;
      // const path = `/articles/`;
      // const urlParamsObject = {
      //   filters: {
      //     slug: slug,
      //   },
      //   fields: ['title', 'description', 'slug', 'content'],
      //   populate: {
      //     thumbnail: {
      //       fields: ['thumbhash', 'name', 'slug', 'alternativeText', 'height', 'width'],
      //     },
      //   },
      // };
      // const options = { headers: { Authorization: `Bearer ${token}` } };
      // return fetchAPI<ArticleList>(path, urlParamsObject, options).then((article) => article.data[0]).catch((e) => console.log(e));
      const file = await fs.readFile(process.cwd() + `/public/mocks/${slug}.json`, 'utf8').catch(e => {
        throw new Error(e);
      });
      result = JSON.parse(file)
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