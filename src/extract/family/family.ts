import { client } from '../client'
import { FluroFamily } from './types'

export async function extract(): Promise<AsyncIterator<FluroFamily[]>> {
  const filterReq = await client.post('/content/family/filter', {
    allDefinitions: true,
    includeArchived: true
  })
  const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
  console.log(`extracting ${allIds.length} families`)
  return {
    next: async () => {
      const ids = allIds.splice(0, 50)
      const req = await client.post('/content/family/multiple', {
        ids,
        limit: 50
      })
      if (req.data.length === 0) {
        return { value: [], done: true }
      } else {
        return { value: req.data, done: false }
      }
    }
  }
}
