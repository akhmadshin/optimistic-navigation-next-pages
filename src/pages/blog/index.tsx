import { timeout } from '@/lib/api-helpers';
import { latency } from '@/contants/server';
import { promises as fs } from 'fs';
import { usePageData } from '@/hooks/usePageData';
import { ArticleListApi } from '@/types/api';
import { withSSGTanStackQuery } from '@/lib/withSSGTanStackQuery';
import { Meta } from '@/components/Meta';
import React from 'react';
import { Container } from '@/components/Container';
import { withSSRTanStackQuery } from '@/lib/withSSRTanStackQuery';
import { ArticleList } from '@/components/ArticleList';

export type BlogPageProps = ArticleListApi;

export const getStaticProps = withSSGTanStackQuery<ArticleListApi>(() => `/blog/`, async () => {
// export const getServerSideProps = withSSRTanStackQuery(async () => {
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
  const { data: articles, isLoading, isFetching} = usePageData<BlogPageProps>();

  if (!articles?.data && (!isLoading && !isFetching)) {
    return;
  }

  return (
    <Container>
      <Meta
        title="Next.js site with optimistic navigation and View Transitions API"
        description="No matter how slow the user’s Internet is or how weak his hardware is, site navigation remains instantaneous"
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
      </div>
      <ArticleList articles={articles} />
    </Container>
  )
}
