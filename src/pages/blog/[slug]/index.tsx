import { BlogItemPage } from '@/routes/BlogItemPage';
import { ArticleItem } from '@/types/api';
import { timeout } from '@/lib/api-helpers';
import { promises as fs } from 'fs';
import { latency } from '@/contants/server';
import { withServerSideTanStackQuery } from '@/lib/withServerSideTanStackQuery';

export type BlogItemPageProps = ArticleItem;

export default function Page() {
  return (
    <BlogItemPage />
  )
}

export const getServerSideProps = withServerSideTanStackQuery<ArticleItem, { slug: string }>(async ({ params }) => {
  const { slug } = params || {};
  // Imitate slow api
  await timeout(latency);
  const file = await fs.readFile(process.cwd() + `/public/mocks/${slug}.json`, 'utf8').catch(e => {
    throw new Error(e);
  });
  return {
    props: JSON.parse(file) as ArticleItem,
  }
})