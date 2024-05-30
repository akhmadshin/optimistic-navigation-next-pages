import { useQuery } from '@tanstack/react-query';
import { usePageDataOptions } from 'next-optimistic-router';
import { useRouter } from 'next/router';

export const usePageData = <T>() => {
  const router = useRouter();
  const { queryKey, queryFn } = usePageDataOptions(router, Boolean(process.env.__NEXT_TRAILING_SLASH));
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;

  return useQuery<unknown, unknown, T>({
    queryKey,
    queryFn,
    placeholderData,
    staleTime: 5 * 60 * 1000,
  });
}