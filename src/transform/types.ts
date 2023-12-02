export interface TransformFn<TInput, TOutput> {
  (value: TInput): TOutput
}
