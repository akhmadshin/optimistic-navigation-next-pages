import NextLink, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import { handleOptimisticNavigation } from 'next-optimistic-router';
import singletonRouter from 'next/router';
import { transitionHelper } from '@/lib/transition-utils';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

type Props = NextLinkProps & {
  placeholderData?: object;
  beforeTransition?: () => void;
  afterTransition?: () => void;
}
export const Link = React.forwardRef<HTMLAnchorElement, Props>(function LinkComponent(props, forwardedRef) {
  const {
    onClick,
    href,
    beforeTransition,
    afterTransition,
    placeholderData,
    children,
    ...restProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    handleOptimisticNavigation(props.href, singletonRouter, () => {
      window.placeholderData = placeholderData;
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
      href={href}
      prefetch={false}
      ref={forwardedRef}
      {...restProps}
    >{children}</NextLink>
  )
})