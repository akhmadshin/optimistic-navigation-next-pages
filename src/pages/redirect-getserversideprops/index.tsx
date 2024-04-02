import { withServerSideTanStackQuery } from '@/lib/withServerSideTanStackQuery';
import { usePageData } from '@/hooks/usePageData';

export const getServerSideProps = withServerSideTanStackQuery(async () => {
  // Imitate slow api
  return {
    redirect: {
      destination: '/blog/lorem-ipsum4/',
      permanent: false,
    },
  };
})

export default function Page() {
  usePageData();
  return (
    <div></div>
  )
}
