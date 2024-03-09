export default (slug: string) => {
  return {
    queryKey: ['blog', slug],
  }
}