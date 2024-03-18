import { dehydrate, QueryClient } from '@tanstack/react-query'
import { BlogItemPage } from '@/components/pages/BlogItemPage';
import { GetServerSideProps } from 'next';
import { fetchAPI } from '@/lib/fetch-api';

export default function Page() {
  return (
    <BlogItemPage />
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const posts = await fetchArticles()
  const pageNumber = 0;
  const limitNumber = 10;
  const token = process.env.STRAPI_API_TOKEN;
  const path = `/articles`;

  const urlParamsObject = {
    sort: { createdAt: "desc" },
    fields: ['title', 'description', 'slug', 'content'],
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

  // const posts = await res.json()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.data.map((post: any) => ({
    params: { slug: post.attributes.slug },
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}


export const getStaticProps: GetServerSideProps<{ dehydratedState: any }> = async (props) => {
  const { slug } = props.params as { slug: string };
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [`/blog/${slug}/`],
    queryFn: () => {
      const token = process.env.STRAPI_API_TOKEN;
      const path = `/articles/`;
      const urlParamsObject = {
        filters: {
          slug: slug,
        },
        fields: ['title', 'description', 'slug', 'content'],
        populate: {
          thumbnail: {
            fields: ['thumbhash', 'name', 'slug', 'alternativeText', 'height', 'width'],
          },
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      return fetchAPI(path, urlParamsObject, options).then((article) => article.data[0]).catch((e) => console.log(e));
    }
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}