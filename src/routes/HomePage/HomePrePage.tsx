import React, { PropsWithChildren } from 'react';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { usePageData } from '@/hooks/usePageData';

export const HomePrePage: React.FC<PropsWithChildren> = ({children}) => {
  usePageData();

  return (
    <Container>
      <Meta
        title="Next.js site with optimistic navigation and View Transitions API"
        description="No matter how slow the user’s Internet is or how weak his hardware is, site navigation remains instantaneous"
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Next.js site with optimistic navigation and View Transitions API.
        </h1>
        <p className="mt-10 text-lg text-zinc-600 dark:text-zinc-100">
          This site looks simple but it takes a lot of effort to achieve what it does.
          No matter how slow the user’s Internet is or how weak his hardware is, site navigation remains instantaneous.
          Click on any card bellow, to see it.
        </p>
      </div>
      {children}
    </Container>
  )
}