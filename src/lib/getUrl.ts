export const getUrl = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  const pathname = location.pathname;
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  return `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;
}
