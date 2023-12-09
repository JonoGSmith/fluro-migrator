export interface Mapper {
  [tupleName: string]: { [fluroId: string]: number }
}
export interface LoadFn<T> {
  (value: T): Promise<number>
}
