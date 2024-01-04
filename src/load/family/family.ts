import { omit } from 'lodash'
import type { components } from '../client';
import { GET, POST, PUT } from '../client'
import type { MapperObject } from '../types'

let GroupTypeId: number
export type RockFamily = Omit<
  components['schemas']['Rock.Model.Group'],
  'GroupTypeId'
>

export async function load(value: RockFamily): Promise<MapperObject> {
  if (GroupTypeId === undefined) {
    const { data } = await GET('/api/GroupTypes', {
      params: {
        query: {
          $filter: `Name eq 'Family'`,
          $select: 'Id'
        }
      }
    })
    if (data?.[0].Id == null) throw new Error("Couldn't find Family GroupType")

    GroupTypeId = data?.[0].Id
  }
  const { data: families } = await GET('/api/Groups', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (families != null && families.length > 0 && families[0].Id != null) {
    await PUT('/api/Groups/{id}', {
      params: {
        path: {
          id: families[0].Id
        }
      },
      body: omit({ ...value, GroupTypeId }, ['ForeignKey'])
    })
    return { rockId: families[0].Id }
  } else {
    const { data } = await POST('/api/Groups', {
      body: {
        ...value,
        GroupTypeId
      }
    })
    return { rockId: data as unknown as number }
  }
}
