import type { FluroContact } from '.'
import { client } from '../client'

const PAGE_SIZE = 50

export async function extract(): Promise<AsyncIterator<FluroContact[]>> {
  const filterReq = await client.post('/content/contact/filter', {
    allDefinitions: true,
    includeArchived: true
  })
  const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
  return {
    next: async () => {
      const ids = allIds.splice(0, PAGE_SIZE)
      const req = await client.post('/content/contact/multiple', {
        ids,
        limit: PAGE_SIZE
      })
      if (req.data.length === 0) {
        return { value: [], done: true }
      } else {
        return { value: req.data, done: false }
      }
    }
  }
}
