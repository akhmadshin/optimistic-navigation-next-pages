import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HomePage } from '@/components/pages/HomePage';
import { Key, keyGetter } from '@/lib/keyGetter';
import { fetchAPI } from '@/lib/fetch-api';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: keyGetter[Key.HOME](),
    queryFn: async () => {
      const pageNumber = 0;
      const limitNumber = 10;
      const token = process.env.STRAPI_API_TOKEN;
      const path = `/articles`;

      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          thumbnail: {
            'url': true,
            'hash': true,
            'ext': true,
            'height': true,
            'width': true,
            'thumbhash': true,
            'alternativeText': true,
            'formats': true,
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
