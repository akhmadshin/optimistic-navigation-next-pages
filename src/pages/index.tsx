import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HomePage } from '@/routes/HomePage';
import { fetchAPI } from '@/lib/fetch-api';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<{ dehydratedState: any }> = async (props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['/'],
    queryFn: async () => {
      const pageNumber = 0;
      const limitNumber = 10;
      const token = process.env.STRAPI_API_TOKEN;
      const path = `/articles`;

      const urlParamsObject = {
        sort: { createdAt: "desc" },
        fields: ['title', 'description', 'slug'],
        populate: {
          thumbnail: {
            fields: ['thumbhash', 'name', 'slug', 'alternativeText', 'height', 'width'],
          },
        },
        pagination: {
          start: pageNumber * limitNumber,
          limit: limitNumber,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const posts = await fetchAPI(path, urlParamsObject, options);

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
