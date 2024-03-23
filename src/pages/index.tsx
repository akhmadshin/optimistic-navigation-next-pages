import { HomePage } from '@/routes/HomePage';
import { fetchAPI } from '@/lib/fetch-api';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { timeout } from '@/lib/api-helpers';
import { ArticleList } from '@/types/api';

export const getServerSideProps: GetStaticProps<{ articles: ArticleList }> = async (props) => {
  const pageNumber = 0;
  const limitNumber = 10;
  const token = process.env.STRAPI_API_TOKEN;
  const path = `/articles`;

  // Imitate slow api
  await timeout(1000);

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
  const articles = await fetchAPI(path, urlParamsObject, options);


  return {
    props: {
      articles,
    },
  }
}

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ articles }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomePage articles={articles} />
  )
}
