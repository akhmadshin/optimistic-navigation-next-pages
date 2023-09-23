import { Component } from '@/types/general';

interface Props {
  className?: string;
  width?: string;
}

export const SkeletonText: Component<Props> = (
  {
    className = 'bg-zinc-600 dark:bg-zinc-400',
    width,
  },
) => {
  const style = {
    width: width || 'auto',
    'animationFillMode': 'backwards',
    'animationDelay': '150ms',
  }
  return (
    <div
      className={`${className} animate-pulse`}
      style={style}
    >
      &nbsp;
    </div>
  );
};
