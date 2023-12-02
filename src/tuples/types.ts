import { ExtractFn } from '../extract/types'
import { LoadFn } from '../load/types'
import { TransformFn } from '../transform/types'

export type ETLTuple<TInput, TOutput> = [
  ExtractFn<TInput>,
  TransformFn<TInput, TOutput>,
  LoadFn<TOutput>
]
