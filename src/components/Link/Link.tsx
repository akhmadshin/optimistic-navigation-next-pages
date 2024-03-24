import NextLink, { LinkProps } from 'next/link';
import React, { KeyboardEvent, MouseEvent } from 'react';

import { onActionKeyPress } from '@/lib/navigation-utils';

type LinkPropsReal = React.PropsWithChildren<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

export type LinkPropsModified = LinkPropsReal;

export const Link = React.forwardRef<HTMLAnchorElement, LinkPropsModified>(function LinkComponent(props, forwardedRef) {
  const {
    onClick,
    onKeyPress,
    href,
    children,
    ...restProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
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