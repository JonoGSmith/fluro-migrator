import { ExtractFn } from '../extract/types'
import { LoadFn } from '../load/types'
import { TransformFn } from '../transform/types'

export type ETLTuple<TInput, TOutput> = [
  name: string,
  extract: ExtractFn<TInput>,
  transform: TransformFn<TInput, TOutput>,
  load: LoadFn<TOutput>
]
