import { omit } from 'lodash'
import type { components } from '../../client'
import { GET, POST, PUT, RockApiError } from '../../client'
import type { CacheObject } from '../../types'

export type RockDefinitionTeam = components['schemas']['Rock.Model.GroupType']

export async function load(value: RockDefinitionTeam): Promise<CacheObject> {
  const { data, error } = await GET('/api/GroupTypes', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (error != null) throw new RockApiError(error)

  if (data != null && data.length > 0 && data[0].Id != null) {
    await PUT('/api/GroupTypes/{id}', {
      params: {
        path: {
          id: data[0].Id
        }
      },
      body: omit(value, ['ForeignKey'])
    })
    return { rockId: data[0].Id }
  } else {
    const { data, error } = await POST('/api/GroupTypes', {
      body: value
    })
    if (error != null) throw new RockApiError(error)

    return { rockId: data as unknown as number }
  }
}
