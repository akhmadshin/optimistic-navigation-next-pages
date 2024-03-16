import React, { PropsWithChildren } from 'react';
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { useStaticPageData } from '@/hooks/useStaticPageData';
import { Key, keyGetter } from '@/lib/keyGetter';

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
          Aliquam aliquet ipsum eget velit rutrum sagittis. Ut tempus libero sem, at fringilla massa varius quis.
        </h1>
        <p className="mt-10 prose lg:prose-xl max-w-none dark:prose-invert">
          Ut tincidunt tristique auctor. Sed aliquam massa id felis lobortis dictum.
          Sed cursus risus sit amet eros finibus scelerisque. Praesent non dignissim neque.
          Etiam ultricies libero sodales elit dictum venenatis.
          Integer condimentum lorem in ligula condimentum, vitae suscipit ligula pulvinar.
          Quisque iaculis vel justo at tristique. Duis a urna interdum, iaculis orci quis,
          dignissim dui. Nullam nec volutpat velit.
        </p>
      </div>
      {children}
    </Container>
  )
}