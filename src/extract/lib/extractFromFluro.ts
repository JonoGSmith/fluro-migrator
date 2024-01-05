import { client } from '../client'
import type { ExtractIterator } from '../types'
import { PAGE_SIZE } from '../types'

interface ExtractFromFluroOptions {
  contentType: string
  filterBody?: {
    allDefinitions?: boolean
    includeArchived?: boolean
    searchInheritable?: boolean
    filter?: {
      filters?: {
        comparator?: string
        key?: string
        value?: string
      }[]
    }
  }
  multipleBody?: {
    appendAssignments?: boolean
  }
}

export function extractFromFluro<T>({
  contentType,
  filterBody = {},
  multipleBody = {}
}: ExtractFromFluroOptions) {
  return async function extract(): Promise<AsyncIterator<ExtractIterator<T>>> {
    const filterReq = await client.post(`/content/${contentType}/filter`, {
      ...filterBody
    })
    const allIds = filterReq.data.map(({ _id }: { _id: string }) => _id)
    const max = allIds.length

    return {
      next: async () => {
        const ids = allIds.splice(0, PAGE_SIZE)
        const req = await client.post(`/content/${contentType}/multiple`, {
          ...multipleBody,
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
