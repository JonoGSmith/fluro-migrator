import { omit } from 'lodash'
import type { components } from '../client'
import { GET, POST, PUT, RockApiError } from '../client'
import type { MapperObject } from '../types'

let GroupTypeId: number
export type RockFamily = Omit<
  components['schemas']['Rock.Model.Group'],
  'GroupTypeId'
>

export async function load(value: RockFamily): Promise<MapperObject> {
  if (GroupTypeId === undefined) {
    const { data, error } = await GET('/api/GroupTypes', {
      params: {
        query: {
          $filter: `Name eq 'Family'`,
          $select: 'Id'
        }
      }
    })
    if (error != null) throw new RockApiError(error)

    if (data?.[0].Id == null) throw new Error("Couldn't find Family GroupType")

    GroupTypeId = data?.[0].Id
  }
  const { data, error } = await GET('/api/Groups', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (error != null) throw new RockApiError(error)

  if (data != null && data.length > 0 && data[0].Id != null) {
    const { error } = await PUT('/api/Groups/{id}', {
      params: {
        path: {
          id: data[0].Id
        }
      },
      body: omit({ ...value, Id: data[0].Id, GroupTypeId }, ['ForeignKey'])
    })
    if (error != null) throw new RockApiError(error)
    return { rockId: data[0].Id }
  } else {
    const { data, error } = await POST('/api/Groups', {
      body: {
        ...value,
        GroupTypeId
      }
    })
    if (error != null) throw new RockApiError(error)

    return { rockId: data as unknown as number }
  }
}
