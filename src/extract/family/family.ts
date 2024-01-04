import { client } from '../client'
import type { ExtractIterator} from '../types';
import { PAGE_SIZE } from '../types'
import type { FluroFamily } from './types'

export async function extract(): Promise<
  AsyncIterator<ExtractIterator<FluroFamily>>
> {
  const filterReq = await client.post('/content/family/filter', {
    allDefinitions: true,
    includeArchived: true
  })
  const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
  const max = allIds.length
  return {
    next: async () => {
      const ids = allIds.splice(0, PAGE_SIZE)
      const req = await client.post('/content/family/multiple', {
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
