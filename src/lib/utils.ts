export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getPlaceholderData = () => {
  if (typeof window === 'undefined') {
    return;
  }
  return window.placeholderData
}