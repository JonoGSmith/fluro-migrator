import { client } from '../../client'
import { ExtractIterator, PAGE_SIZE } from '../../types'
import { FluroDefinition } from '../types'

export function extractDefinition(parentType: string) {
  return async function extract(): Promise<
    AsyncIterator<ExtractIterator<FluroDefinition>>
  > {
    const filterReq = await client.post('/content/definition/filter', {
      allDefinitions: true,
      includeArchived: true,
      filter: {
        filters: [
          {
            comparator: '==',
            key: 'parentType',
            value: parentType
          }
        ]
      }
    })
    const allIds = filterReq.data.map((val: FluroDefinition) => {
      if (val?._matched) return val._id
    })
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
}
