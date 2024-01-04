import type { components } from '../../client'
import { GET, POST } from '../../client'
import type { MapperObject } from '../../types'
import { omit } from 'lodash'

export type RockContactDefinition =
  components['schemas']['Rock.Model.DefinedValue'] & {
    DefinitionName: string
  }

export let allExistingRockDefinitions:
  | { data: Array<RockContactDefinition> }
  | undefined

export async function load(
  transformedDefinition: RockContactDefinition
): Promise<MapperObject> {
  //get list of all definedValues in rock
  const _allExistingRockDefinitions =
    allExistingRockDefinitions ?? (await GET('/api/DefinedValues'))

  //check that singleton object has been populated properly
  if (!Array.isArray(_allExistingRockDefinitions.data)) {
    throw new Error('_allExistingRockDefinitions is undefiend and not an array')
  }

  //check to see if transformed value already exists in Rock
  for (const rockDefinitions of _allExistingRockDefinitions.data) {
    if (
      rockDefinitions.Value === transformedDefinition.Value &&
      rockDefinitions.DefinedTypeId === 4
    ) {
      return {
        rockId: rockDefinitions.Id as number,
        data: {
          ['rockContactDefinition']: rockDefinitions.Value.toLowerCase()
        }
      }
    }
  }

  //load object to rock if there is no duplicates
  const { data } = await POST('/api/DefinedValues', {
    body: omit(transformedDefinition, ['DefinitionName'])
  })

  return {
    rockId: data as unknown as number,
    data: {
      ['rockContactDefinition']: transformedDefinition.DefinitionName
    }
  }
}