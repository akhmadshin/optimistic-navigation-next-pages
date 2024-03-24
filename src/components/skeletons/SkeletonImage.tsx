import { Component } from '@/types/general';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const SkeletonImage: Component<Props> = (
  {
    className = 'bg-zinc-600 dark:bg-zinc-400 rounded-2xl',
    width,
    height,
  },
) => {
  const style = {
    animationFillMode: 'backwards',
    animationDelay: '150ms',
  }
  return (
    <div className="aspect-[4/3] lg:aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-zinc-400 object-cover pointer-events-none animate-pulse"></div>
  );
};
