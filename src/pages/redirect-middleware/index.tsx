import { timeout } from '@/lib/api-helpers';
import { latency } from '@/contants/server';
import { withServerSideTanStackQuery } from '@/lib/withServerSideTanStackQuery';
import { usePageData } from '@/hooks/usePageData';

export const getServerSideProps = withServerSideTanStackQuery(async () => {
  // Imitate slow api
  return {
    props: {},
  };
})

export default function Page() {
  usePageData();
  return (
    <div></div>
  )
}
