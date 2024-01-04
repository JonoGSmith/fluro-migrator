import type { components } from '../../client'
import { GET, PUT, POST } from '../../client'
import type { MapperObject } from '../../types'
import { omit } from 'lodash'

let DefinedTypeId: number
export type RockDefinitionContact = Omit<
  components['schemas']['Rock.Model.DefinedValue'],
  'DefinedTypeId'
> & {
  mapper: MapperObject['data']
}

export let allExistingRockDefinitions:
  | { data: Array<RockDefinitionContact> }
  | undefined

export async function load(
  value: RockDefinitionContact
): Promise<MapperObject> {
  // TODO: fetch DefinedTypeId from Rock
  DefinedTypeId = 4

  const { data } = await GET('/api/DefinedValues', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (data != null && data.length > 0 && data[0].Id != null) {
    await PUT('/api/DefinedValues/{id}', {
      params: {
        path: {
          id: data[0].Id
        }
      },
      body: omit({ ...value, DefinedTypeId }, ['ForeignKey', 'mapper'])
    })
    return {
      rockId: data[0].Id,
      data: value.mapper
    }
  } else {
    const { data } = await POST('/api/DefinedValues', {
      body: omit({ ...value, DefinedTypeId }, 'mapper')
    })
    return {
      rockId: data as unknown as number,
      data: value.mapper
    }
  }
}
