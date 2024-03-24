import { ParentComponent } from '@/types/general';
import { HTMLProps } from 'react';

export const Container: ParentComponent<HTMLProps<HTMLDivElement>> = (
  {children, ...props},
) => {
  return (
    <div {...props}>
      <div className="mx-auto max-w-9xl w-full lg:px-10">
        <div
          className="relative px-6 sm:px-10 lg:px-12"
        >
          <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
