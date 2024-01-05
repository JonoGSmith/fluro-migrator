import type { Cache } from '../load/types'

export interface TransformFn<TInput, TOutput> {
  (cache: Cache, value: TInput): TOutput
}
