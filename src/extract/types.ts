export interface ExtractFn<T> {
  (): Promise<AsyncIterator<T[]>>
}
