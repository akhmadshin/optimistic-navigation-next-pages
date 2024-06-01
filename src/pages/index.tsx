import { promises as fs } from 'fs';
import { HomePage } from '@/routes/HomePage';
import { timeout } from '@/lib/timeout';
import { latency } from '@/contants/server';
import type { ArticleListApi } from '@/types/api';
import { withSSGTanStackQuery } from '@/lib/withSSGTanStackQuery';

export type HomePageProps = ArticleListApi;

export const getStaticProps = withSSGTanStackQuery<ArticleListApi>(() => `/`, async () => {
// export const getServerSideProps = withSSRTanStackQuery<ArticleListApi>(async () => {

  // Imitate slow api
  await timeout(latency);
  const file = await fs.readFile(process.cwd() + '/public/mocks/articles.json', 'utf8');
  return {
    props: JSON.parse(file)
  };
})

// export function getStaticPaths() {
//   const paths = [{
//     params: { locale: 'en' },
//   }]
//
//   return { paths, fallback: false }
// }

export default function Page() {
  return (
    <HomePage />
  )
}
