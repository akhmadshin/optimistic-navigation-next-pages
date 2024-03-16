import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
import { SvgLinkedIn } from '@/components/pages/HomePage/SvgLinkedIn';
import { SvgTelegram } from '@/components/pages/HomePage/SvgTelegram';
import React from 'react';
import { SvgGithub } from '@/components/pages/HomePage/SvgGithub';

export function Header() {
  return (
    <header
    >
      <Container className="mb-16 main-header">
        <div className="relative flex gap-4 pt-6">
          <div className="flex justify-between flex-1 gap-16">
            <Link
              href="/"
              aria-label="Home"
            >
              <span className="font-bold">Home</span>
            </Link>

            <div className="">

              <div className="flex flex-row gap-3">
                <span className="font-bold">Contacts:</span>

                <a href="https://www.linkedin.com/in/akhmadshin/" target="_blank">
                  <SvgLinkedIn />
                </a>
                <a href="https://github.com/akhmadshin" target="_blank">
                  <SvgGithub />
                </a>
                <a href="https://t.me/nullish" target="_blank">
                  <SvgTelegram />
                </a>
              </div>
            </div>
            {/*<Link*/}
            {/*  href="/blog/lorem-ipsum/"*/}
            {/*  aria-label="Lorem ipsum"*/}
            {/*>*/}
            {/*  <span className="font-bold">Lorem ipsum</span>*/}
            {/*</Link>*/}
          </div>
        </div>
      </Container>
    </header>
  )
}