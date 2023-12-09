export interface Mapper {
  [tupleName: string]: { [fluroId: string]: string }
}
export interface LoadFn<T> {
  (mapper: Mapper, value: T): Promise<string>
}
