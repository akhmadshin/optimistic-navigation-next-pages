import React from 'react';

import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
export function Header() {
  return (
    <header>
      <Container className="mb-16 main-header">
        <div className="flex justify-between items-center flex-1 pt-6 gap-6">
          <div className="flex items-center gap-6 lg:gap-12">
            <Link
              href="/"
              aria-label="Home"
            >
              <span className="font-bold">Home</span>
            </Link>
            <Link
              scroll={false}
              href="/blog/lorem-ipsum/#testHash?test=query&query=test"
              aria-label="Lorem-ipsum"
            >
              <span className="font-bold">Lorem ipsum</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}