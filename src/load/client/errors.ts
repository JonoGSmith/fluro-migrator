export class RockApiError extends Error {
  constructor(error: { Message?: string }) {
    super(error.Message ?? 'UnknownError')
    this.name = 'RockApiError'
  }
}
