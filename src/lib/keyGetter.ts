export enum Key {
  HOME = 'HOME',
  BLOG_ITEM = 'BLOG_ITEM',
}

export const keyGetter = {
  [Key.HOME]: () => ['/'],
  [Key.BLOG_ITEM]: (slug: string) => ['blog', slug],
}