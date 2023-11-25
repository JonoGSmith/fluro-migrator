import { ExtractObject } from '../extract/types'
import { LoadObject } from '../load/types'

export type TransformFn<TInput = ExtractObject, TOutput = LoadObject> = (
  value: TInput
) => TOutput
