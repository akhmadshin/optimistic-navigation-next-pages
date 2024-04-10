import { promises as fs } from 'fs';
import { HomePage } from '@/routes/HomePage';
import { timeout } from '@/lib/api-helpers';
import { ArticleList } from '@/types/api';
import { latency } from '@/contants/server';
import { withSSGTanStackQuery } from '@/lib/withSSGTanStackQuery';
import { withSSRTanStackQuery } from '@/lib/withSSRTanStackQuery';

export type HomePageProps = ArticleList;

export const getServerSideProps = withSSRTanStackQuery(async () => {
  // Imitate slow api
  await timeout(latency);
  const file = await fs.readFile(process.cwd() + '/public/mocks/articles.json', 'utf8');
  return {
    props: JSON.parse(file)
  };
})

// export const getStaticProps = withSSGTanStackQuery(() => '/', async () => {
//   // Imitate slow api
//   await timeout(latency);
//   const file = await fs.readFile(process.cwd() + '/public/mocks/articles.json', 'utf8');
//   return {
//     props: JSON.parse(file)
//   };
// })

export default function Page() {
  return (
    <HomePage />
  )
}
