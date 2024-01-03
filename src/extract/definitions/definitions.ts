import type { FluroDefinitions } from '.'
import { client } from '../client'
import { ExtractIterator, PAGE_SIZE } from '../types'

export async function extract(): Promise<
  AsyncIterator<ExtractIterator<FluroDefinitions>>
> {
  const filterReq = await client.post('/defined/type/definition', {
    allDefinitions: true,
    includeArchived: false
  })
  const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
  const max = allIds.length
  return {
    next: async () => {
      const ids = allIds.splice(0, PAGE_SIZE)
      const req = await client.post('/content/definition/multiple', {
        ids,
        limit: PAGE_SIZE
      })
      if (req.data.length === 0) {
        return { value: { collection: [], max }, done: true }
      } else {
        return { value: { collection: req.data, max }, done: false }
      }
    }
  }
}
