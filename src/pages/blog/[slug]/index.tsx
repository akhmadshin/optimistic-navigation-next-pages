import { BlogItemPage } from '@/routes/BlogItemPage';
import { ArticleItem } from '@/types/api';
import { timeout } from '@/lib/api-helpers';
import { promises as fs } from 'fs';
import { latency } from '@/contants/server';
import { withSSGTanStackQuery } from '@/lib/withSSGTanStackQuery';
import { withSSRTanStackQuery } from '@/lib/withSSRTanStackQuery';

export type BlogItemPageProps = ArticleItem;

export default function Page() {
  return (
    <BlogItemPage />
  )
}

export const getServerSideProps = withSSRTanStackQuery<ArticleItem, { slug: string }>(async ({ params }) => {
  const { slug } = params || {};
  // Imitate slow api
  await timeout(latency);
  try {
    const file = await fs.readFile(process.cwd() + `/public/mocks/${slug}.json`, 'utf8');
    return {
      props: JSON.parse(file) as ArticleItem,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
})

// export async function getStaticPaths() {
//   const file = await fs.readFile(process.cwd() + `/public/mocks/articles.json`, 'utf8');
//   const articles = JSON.parse(file)
//
//   const paths = articles.data.map((post: ArticleItem) => ({
//     params: { slug: post.attributes.slug },
//   }))
//
//   return { paths, fallback: false }
// }
//
// export const getStaticProps = withSSGTanStackQuery<ArticleItem, { slug: string }>(({ slug }) => `/blog/[slug]/?slug=${slug}`, async ({ params }) => {
//   const { slug } = params || {};
//   // Imitate slow api
//   await timeout(latency);
//   try {
//     const file = await fs.readFile(process.cwd() + `/public/mocks/${slug}.json`, 'utf8');
//     return {
//       props: JSON.parse(file) as ArticleItem,
//     }
//   } catch (e) {
//     return {
//       notFound: true,
//     }
//   }
// })