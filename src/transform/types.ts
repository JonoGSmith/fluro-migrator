import { Mapper } from '../load/types'

export interface TransformFn<TInput, TOutput> {
  (mapper: Mapper, value: TInput): TOutput
}
