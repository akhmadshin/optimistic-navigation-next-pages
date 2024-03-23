import { BlogItemPage } from '@/routes/BlogItemPage';
import { GetStaticProps } from 'next';
import { fetchAPI } from '@/lib/fetch-api';
import { timeout } from '@/lib/api-helpers';

export default function Page({ article }: any) {
  return (
    <BlogItemPage article={article} />
  )
}

// export async function getStaticPaths() {
//   const pageNumber = 0;
//   const limitNumber = 10;
//   const token = process.env.STRAPI_API_TOKEN;
//   const path = `/articles`;
//
//   const urlParamsObject = {
//     sort: { createdAt: "desc" },
//     fields: ['title', 'description', 'slug', 'content'],
//     populate: {
//       thumbnail: {
//         fields: ['thumbhash', 'name', 'slug', 'alternativeText', 'height', 'width'],
//       },
//     },
//     pagination: {
//       start: pageNumber * limitNumber,
//       limit: limitNumber,
//     },
//   };
//   const options = { headers: { Authorization: `Bearer ${token}` } };
//   const posts = await fetchAPI(path, urlParamsObject, options);
//
//   const paths = posts.data.map((post: any) => ({
//     params: { slug: post.attributes.slug },
//   }))
//
//   return { paths, fallback: false }
// }

export const getServerSideProps: GetStaticProps<{ article: any }> = async (props) => {
  const { slug } = props.params as { slug: string };
  const token = process.env.STRAPI_API_TOKEN;
  const path = `/articles/`;

  // Imitate slow api
  await timeout(1000);

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
  const article = await fetchAPI(path, urlParamsObject, options).then((article) => article.data[0]).catch((e) => console.log(e));

  return {
    props: {
      article,
    },
  }
}