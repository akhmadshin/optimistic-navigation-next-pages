import { ParentComponent } from '@/types/general';
import { useClientLayoutEffect } from '@/hooks/useClientLayoutEffect';

export const Page: ParentComponent = ({children}) => {
  useClientLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.pageMounted) {
      window.pageMounted();
      window.pageMounted = undefined;
    }
  })
  return children;
}