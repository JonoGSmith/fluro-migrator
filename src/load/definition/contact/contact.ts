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
  if (DefinedTypeId === undefined) {
    const { data } = await GET('/api/DefinedTypes', {
      params: {
        query: {
          $filter: `Name eq 'Connection Status'`,
          $select: 'Id'
        }
      }
    })
    if (data?.[0].Id == null) throw new Error("Couldn't find Family GroupType")

    DefinedTypeId = data?.[0].Id
  }

  const { data } = await GET('/api/DefinedValues', {
    params: {
      query: {
        $filter: `DefinedTypeId eq ${DefinedTypeId} and (ForeignKey eq '${value.ForeignKey}') or (ForeignKey eq null and Value eq '${value.Value}')`,
        $select: 'Id'
      }
    }
  })
  if (data != null && data.length > 0 && data[0].Id != null) {
    const { error } = await PUT('/api/DefinedValues/{id}', {
      params: {
        path: {
          id: data[0].Id
        }
      },
      body: omit({ ...value, Id: data[0].Id, DefinedTypeId }, [
        'ForeignKey',
        'mapper'
      ])
    })
    if (error != null)
      throw new Error(
        (error as { Message: string })?.Message ?? 'Unknown Error'
      )
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
