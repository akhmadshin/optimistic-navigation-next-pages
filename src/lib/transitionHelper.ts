interface Props {
  skipTransition?: boolean;
  classNames?: string[];
  updateDOM: () => Promise<void>;
  onFinish?: () => void;
}
export function transitionHelper({
  skipTransition = false,
  classNames = [],
  updateDOM,
  onFinish,
}: Props) {
  // @ts-ignore
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM());

    return {
      ready: Promise.reject(Error('View transitions unsupported')),
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => {
      },
    };
  }

  document.documentElement.classList.add(...classNames);

  // @ts-ignore
  const transition = document.startViewTransition(updateDOM);
  transition.finished.finally(() => {
      if (onFinish) {
        onFinish();
      }
    }
  );
  return transition;
}