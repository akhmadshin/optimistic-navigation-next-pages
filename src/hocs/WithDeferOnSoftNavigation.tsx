import { Component, ParentComponent } from '@/types/general';
import { useEffect, useState } from 'react';

interface Props {
  loader?: Component;
  defer?: boolean;
}
export const WithDeferOnSoftNavigation: ParentComponent<Props> = ({ children, loader: Loader, defer = false }) => {
  const [isSoftNavigationActive, setSoftNavigationActive] = useState(typeof window !== 'undefined' && Boolean(window.pageMounted))

  useEffect(() => {
    if (!defer) {
      return;
    }
    // @ts-ignore
    const deferTime = document.startViewTransition ? 532 : 32;
    setTimeout(async () => {
      setSoftNavigationActive(false)
    }, deferTime)
  }, [])

  if (!defer) {
    return children;
  }

  return Loader && isSoftNavigationActive ? <Loader /> : children;
}