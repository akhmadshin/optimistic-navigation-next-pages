import { BlogItemPage } from '@/routes/BlogItemPage';
import type { ArticleItemApi, ArticleListApi } from '@/types/api';
import { timeout } from '@/lib/api-helpers';
import { promises as fs } from 'fs';
import { latency } from '@/contants/server';
import { withSSRTanStackQuery } from '@/lib/withSSRTanStackQuery';
import { withSSGTanStackQuery } from '@/lib/withSSGTanStackQuery';

export type BlogItemPageProps = ArticleItemApi;

export default function Page() {
  return (
    <BlogItemPage />
  )
}
// export const getServerSideProps = withSSRTanStackQuery<ArticleItemApi, { slug: string }>(async ({ params }) => {
export const getStaticProps = withSSGTanStackQuery<ArticleItemApi, { slug: string }>(({ slug }) => `/blog/${slug}/`, async ({ params }) => {
  const { slug } = params ?? {};
  // Imitate slow api
  await timeout(latency as number);
  try {
    const file = await fs.readFile(process.cwd() + `/public/mocks/${slug}.json`, 'utf8');
    return {
      props: JSON.parse(file) as ArticleItemApi,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
})
export async function getStaticPaths() {
  const file = await fs.readFile(process.cwd() + `/public/mocks/articles.json`, 'utf8');
  const articles = JSON.parse(file) as ArticleListApi

  const paths = articles.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }))

  return { paths, fallback: false }
}