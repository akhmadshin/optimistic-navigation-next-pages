export function transitionHelper({
  skipTransition = false,
  classNames = [],
  updateDOM,
	onFinish,
}: any) {
	// @ts-ignore
	if (skipTransition || !document.startViewTransition) {
		const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

		return {
			ready: Promise.reject(Error('View transitions unsupported')),
			updateCallbackDone,
			finished: updateCallbackDone,
			skipTransition: () => {},
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