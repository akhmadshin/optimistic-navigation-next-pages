import React, { PropsWithChildren } from 'react';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { useStaticPageData } from '@/hooks/useStaticPageData';
import { Key, keyGetter } from '@/lib/keyGetter';
import { SvgTelegram } from '@/components/pages/HomePage/SvgTelegram';
import { SvgLinkedIn } from '@/components/pages/HomePage/SvgLinkedIn';

export const HomePrePage: React.FC<PropsWithChildren> = ({children}) => {
  useStaticPageData(keyGetter[Key.HOME]());

  return (
    <Container>
      <Meta
        title="Home page"
        description="Home description"
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          This web site on Next.js implements View Transitions API.
        </h1>

        <p className="mt-10 prose lg:prose-xl max-w-none dark:prose-invert">
          It takes a lot of effort to achieve what this web-site does.
          In a nutshell.
          No matter how slow the user’s Internet is or how weak his hardware is, site navigation should be instantaneous.
          Click on any card bellow, to see it.
        </p>


      </div>
      {children}
    </Container>
  )
}