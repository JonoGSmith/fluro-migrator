export type LoadFn<T = LoadObject> = (value: T) => Promise<void>

export type LoadObject = {}
