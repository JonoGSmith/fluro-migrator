export interface MapperObject {
  rockId: number
  data?: {
    [key: string]: unknown
  }
}
export interface Mapper {
  [tupleName: string]: {
    [fluroId: string]: MapperObject
  }
}
export interface LoadFn<T> {
  (value: T): Promise<MapperObject>
}
