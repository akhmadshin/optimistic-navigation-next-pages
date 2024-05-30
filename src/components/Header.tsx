import React from 'react';

import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
import { SvgLinkedIn } from '@/components/svg/SvgLinkedIn';
import { SvgTelegram } from '@/components/svg/SvgTelegram';
import { SvgGithub } from '@/components/svg/SvgGithub';

export function Header() {
  return (
    <header>
      <Container className="mb-16 main-header">
        <div className="flex justify-between items-center flex-1 pt-6 gap-6">
          <Link
            href="/"
            aria-label="Home"
          >
            <span className="font-bold">Home</span>
          </Link>
          {/*<Link*/}
          {/*  href="/deep/deep/test-404"*/}
          {/*  aria-label="Home"*/}
          {/*>*/}
          {/*  <span className="font-bold">404</span>*/}
          {/*</Link>*/}
          <Link
            href="/blog/lorem-ipsum-404/"
            aria-label="404"
          >
            <span className="font-bold">Article 404</span>
          </Link>
          <Link
            scroll={false}
            href="/blog/lorem-ipsum/#testHash?test=query&query=test"
            aria-label="Lorem-ipsum"
          >
            <span className="font-bold">Lorem ipsum</span>
          </Link>
          {/*<div className="flex justify-between items-center gap-6">*/}
          {/*  <Link*/}
          {/*    href="/blog/lorem-ipsum"*/}
          {/*    aria-label="Lorem ipsum"*/}
          {/*  >*/}
          {/*    <span className="font-bold">Lorem ipsum</span>*/}
          {/*  </Link>*/}
          {/*  <Link*/}
          {/*    href="/blog/lorem-ipsum404"*/}
          {/*    aria-label="404"*/}
          {/*  >*/}
          {/*    <span className="font-bold">404</span>*/}
          {/*  </Link>*/}
          {/*  <Link*/}
          {/*    href="/redirect-middleware"*/}
          {/*    aria-label="Redirect middleware"*/}
          {/*  >*/}
          {/*    <span className="font-bold">Middleware</span>*/}
          {/*  </Link>*/}
          {/*  <Link*/}
          {/*    href="/redirect-getserversideprops"*/}
          {/*    aria-label="Redirect"*/}
          {/*  >*/}
          {/*    <span className="font-bold">Redirect</span>*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <div className="">
            <div className="flex flex-row gap-3">
              <span className="font-bold hidden sm:block">Contacts:</span>

              <a href="https://www.linkedin.com/in/akhmadshin/" target="_blank" rel="noreferrer">
                <SvgLinkedIn />
              </a>
              <a href="https://github.com/akhmadshin" target="_blank" rel="noreferrer">
                <SvgGithub />
              </a>
              <a href="https://t.me/nullish" target="_blank" rel="noreferrer">
                <SvgTelegram />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}