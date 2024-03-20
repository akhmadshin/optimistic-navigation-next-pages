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
        <div className="flex justify-between items-center flex-1 pt-6 gap-6">
          <Link
            href="/"
            aria-label="Home"
          >
            <span className="font-bold">Home</span>
          </Link>
          {/*<div className="flex items-center">*/}
          {/*  <input*/}
          {/*    id="default-checkbox"*/}
          {/*    type="checkbox"*/}
          {/*    value=""*/}
          {/*    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"*/}
          {/*  />*/}
          {/*  <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Optimistic navigation</label>*/}
          {/*</div>*/}
          <div className="">
            <div className="flex flex-row gap-3">
              <span className="font-bold hidden sm:block">Contacts:</span>

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
      </Container>
    </header>
  )
}