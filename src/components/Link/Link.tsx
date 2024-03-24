import NextLink, { LinkProps } from 'next/link';
import React, { KeyboardEvent, MouseEvent } from 'react';

import { onActionKeyPress } from '@/lib/navigation-utils';
import { transitionHelper } from '@/lib/transition-utils';
import { getUrl } from '@/lib/getUrl';

type LinkPropsReal = React.PropsWithChildren<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

export type LinkPropsModified = LinkPropsReal & {
  data?: object;
  beforeTransition?: () => void;
  afterTransition?: () => void;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkPropsModified>(function LinkComponent(props, forwardedRef) {
  const {
    data,
    onClick,
    onKeyPress,
    href,
    children,
    beforeTransition,
    afterTransition,
    ...restProps
  } = props;
  let currentUrl = getUrl();
  const isAbsoluteUrlOrAnchorUrl = typeof href === 'string' && (/^http/.test(href) || /^#/.test(href));
  const isSameUrl = currentUrl === href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    currentUrl = getUrl();

    if (onClick) {
      onClick(e);
    }
    if (isAbsoluteUrlOrAnchorUrl || e.metaKey) {
      return;
    }
    handleLocalRouteNavigation();
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
    if (isAbsoluteUrlOrAnchorUrl || e.metaKey) {
      return;
    }
    handleLocalRouteNavigation();
  }

  const handleLocalRouteNavigation = () => {
    if (isSameUrl) {
      return;
    }
    if (data) {
      window.placeholderData = data;
    }

    startPageTransition();
  }

  const startPageTransition = () => {
    if (beforeTransition) {
      beforeTransition()
    }

    if (!window.pageMounted) {
      window.pageMountedPromise = new Promise(resolve => {
        window.pageMounted = resolve as any;
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
      onKeyPress={onActionKeyPress<HTMLAnchorElement>((e) => handleKeyPress(e))}
      href={href}
      prefetch={false}
      ref={forwardedRef}
      {...restProps}
    >{children}</NextLink>
  )
})