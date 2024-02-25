import { DependencyList, EffectCallback, useLayoutEffect } from 'react';

export const useClientLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : (effect: EffectCallback, deps?: DependencyList) => {}