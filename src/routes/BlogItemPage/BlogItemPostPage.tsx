import { Component } from '@/types/general';
import { SkeletonBlogItemPostPage } from '@/routes/BlogItemPage/SkeletonBlogItemPostPage';
import React, { useEffect, useMemo, useState } from 'react';
import { RichText } from '@/components/RichText';
import { usePageData } from '@/hooks/usePageData';

export const BlogItemPostPage: Component = () => {
  const { data: article, isLoading, isFetching} = usePageData();

  const iterations = 50;
  const multiplier = 1000000000;



  const [isClient, setIsClient] = useState(false)

  const primes = useMemo(() => {
    if (!isClient) {
      return [];
    }
    function calculatePrimes(iterations: number, multiplier: number) {
      const primes = [];
      for (let i = 0; i < iterations; i++) {
        const candidate = i * (multiplier * Math.random());
        let isPrime = true;
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
          if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          primes.push(candidate);
        }
      }
      return primes;
    }
    return calculatePrimes(iterations, multiplier);
  }, [isClient])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (isLoading || isFetching) {
    return <SkeletonBlogItemPostPage/>
  }

  const articleAttributes = article.attributes;
  const { content } = articleAttributes;

  return (
    <div className="mt-10">
      <div className="prose lg:prose-xl max-w-none dark:prose-invert">
        <p>Calculating random numbers to simulate heavy app</p>
        <div>
          {primes.join(' ')}
        </div>
        <RichText content={content} />
      </div>
    </div>

  );
}