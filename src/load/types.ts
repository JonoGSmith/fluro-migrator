export interface CacheObject {
  rockId: number
  data?: {
    [key: string]: unknown
  }
}
export interface Cache {
  [tupleName: string]: {
    [fluroId: string]: CacheObject
  }
}
export interface LoadFn<T> {
  (value: T): Promise<CacheObject>
}
