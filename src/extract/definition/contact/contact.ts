import { FluroDefinition } from '../types'
import { client } from '../../client'
import { ExtractIterator, PAGE_SIZE } from '../../types'

export type FluroContactDefinition = FluroDefinition

export async function extract(): Promise<
  AsyncIterator<ExtractIterator<FluroDefinition>>
> {
  const filterReq = await client.post('/content/definition/filter', {
    allDefinitions: true,
    includeArchived: false,
    filters: {
      operator: 'and',
      filters: [
        {
          operator: 'and',
          filters: [
            {
              guid: '18ccd439-f7da-4000-8077-3b565dcaf000',
              comparator: '==',
              title: 'Parent Type',
              key: 'parentType',
              value: 'contact',
              value2: null,
              values: [],
              dataType: 'string'
            }
          ],
          guid: '18ccd256-eef7-4000-8d0b-2242a6cc9000'
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
