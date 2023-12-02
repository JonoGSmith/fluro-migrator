export interface LoadFn<T> {
  (value: T): Promise<void>
}
