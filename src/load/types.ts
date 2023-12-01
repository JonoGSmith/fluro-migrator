export interface LoadObject {
  id: string
}
export type LoadFn<T = LoadObject> = (value: T) => Promise<void>
