import { omit } from 'lodash'
import f from 'odata-filter-builder'

import type { components } from '../client'
import { GET, POST, PUT, RockApiError } from '../client'
import type { CacheObject } from '../types'

export type RockContact = components['schemas']['Rock.Model.Person'] & {
  FamilyRole: number
}

export async function load(value: RockContact): Promise<CacheObject> {
  const { data, error } = await GET('/api/People', {
    params: {
      query: {
        $filter: f().eq('ForeignKey', value.ForeignKey).toString(),
        $select: 'Id, PrimaryFamilyId'
      }
    }
  })
  if (error != null) throw new RockApiError(error)

  if (data != null && data.length > 0 && data[0].Id != null) {
    // person exists
    let log = 'person exists'
    // add existing person to family if primary family id exists
    if (
      value.PrimaryFamilyId != null &&
      value.PrimaryFamilyId !== data[0].PrimaryFamilyId
    ) {
      const { error } = await POST('/api/People/AddExistingPersonToFamily', {
        params: {
          query: {
            personId: data[0].Id,
            familyId: value.PrimaryFamilyId,
            groupRoleId: value.FamilyRole ?? 3,
            removeFromOtherFamilies: true
          }
        }
      })
      if (error != null) throw new RockApiError(error)
      log = `person exists, moving to new family ${value.PrimaryFamilyId} from ${data[0].PrimaryFamilyId}`
    }

    const { error } = await PUT('/api/People/{id}', {
      params: {
        path: {
          id: data[0].Id
        }
      },
      body: omit({ ...value, Id: data[0].Id }, ['FamilyRole'])
    })
    if (error != null) throw new RockApiError(error)
    return {
      rockId: data[0].Id,
      data: {
        log
      }
    }
  } else {
    // person does not exist

    if (value.PrimaryFamilyId != null) {
      // add new person to family if primary family id exists
      const { data, error } = await POST(
        '/api/People/AddNewPersonToFamily/{familyId}',
        {
          params: {
            path: {
              familyId: value.PrimaryFamilyId
            },
            query: {
              groupRoleId: value.FamilyRole ?? 3
            }
          },
          body: omit(value, ['FamilyRole'])
        }
      )
      if (error != null) throw new RockApiError(error)
      return {
        rockId: data as unknown as number,
        data: {
          log: `person does not exist, add new person to family ${value.PrimaryFamilyId}`
        }
      }
    } else {
      // create new person if primary family id does not exist
      const { data, error } = await POST('/api/People', {
        body: omit(value, ['FamilyRole'])
      })
      if (error != null) throw new RockApiError(error)
      return {
        rockId: data as unknown as number,
        data: {
          log: 'person does not exist, create new person with new family'
        }
      }
    }
  }
}
