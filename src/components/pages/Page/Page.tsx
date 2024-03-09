'use client'

import { ParentComponent } from '@/types/general';
import { useQueryClient } from '@tanstack/react-query';
import { useClientLayoutEffect } from '@/hooks/useClientLayoutEffect';
import { useStaticPageData } from '@/hooks/useStaticPageData';

export const Page: ParentComponent = ({children}) => {
  const queryClient = useQueryClient()

  useClientLayoutEffect(() => {
    if (!queryClient.isFetching()) {
      window.placeholderData = undefined;
    }
    if (typeof window !== 'undefined' && window.pageMounted) {
      window.pageMounted();
      window.pageMounted = undefined;
    }
  })
  return children;
}