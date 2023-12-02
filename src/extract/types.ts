export interface ExtractFn<T> {
  (): Promise<AsyncIterator<T[]>>
}

export interface Realm {
  _id: string
  title: string
  _type: string
  bgColor?: string
  color?: string
  slug?: string
  definition?: string
}
