import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import singletonRouter from 'next/router';
import { handleOptimisticNavigation } from 'next-optimistic-router';
import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import React from 'react';
import { transitionHelper } from '@/lib/transition-utils';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

type Props = NextLinkProps & {
  data?: object;
  beforeTransition?: () => void;
  afterTransition?: () => void;
}

export const Link: React.FC<PropsWithChildren<Props>> = (props) => {
  const {
    onClick,
    children,
    beforeTransition,
    afterTransition,
    ...restProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    handleOptimisticNavigation(props.href, singletonRouter, () => {
      window.placeholderData = props.data;
      startPageTransition();
    });
  }

  const startPageTransition = () => {
    if (beforeTransition) {
      beforeTransition()
    }

    if (!window.pageMounted) {
      window.pageMountedPromise = new Promise(resolve => {
        window.pageMounted = resolve;
      })
    }

    transitionHelper({
      updateDOM: async () => {
        if (window.pageMounted) {
          if (afterTransition) {
            afterTransition();
          }
          await window.pageMountedPromise;
        }
      },
    });
  }

  return (
    <NextLink
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </NextLink>
  )
}