import { omit } from 'lodash'
import type { components } from '../../client'
import { GET, POST, PUT } from '../../client'
import type { MapperObject } from '../../types'

export type RockDefinitionTeam = components['schemas']['Rock.Model.GroupType']

export async function load(value: RockDefinitionTeam): Promise<MapperObject> {
  const { data: teams } = await GET('/api/GroupTypes', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (teams != null && teams.length > 0 && teams[0].Id != null) {
    await PUT('/api/GroupTypes/{id}', {
      params: {
        path: {
          id: teams[0].Id
        }
      },
      body: omit(value, ['ForeignKey'])
    })
    return { rockId: teams[0].Id }
  } else {
    const { data } = await POST('/api/GroupTypes', {
      body: value
    })
    return { rockId: data as unknown as number }
  }
}
