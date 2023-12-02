import { client } from '../client'
import { ExtractFn } from '../types'

export interface FluroContact {
  id: string
}

export const extract: ExtractFn = async (): Promise<
  AsyncIterator<FluroContact[]>
> => {
  const filterReq = await client.post('/content/contact/filter', {
    allDefinitions: true,
    includeArchived: true
  })
  const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
  return {
    next: async () => {
      const ids = allIds.splice(0, 50)
      const req = await client.post('/content/contact/multiple', {
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
