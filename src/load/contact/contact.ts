import { omit } from 'lodash'
import type { components } from '../client';
import { GET, POST, PUT } from '../client'
import type { MapperObject } from '../types'

export type RockContact = components['schemas']['Rock.Model.Person'] & {
  FamilyRole: number
}

export async function load(value: RockContact): Promise<MapperObject> {
  // if not part of a family, add person and create a new family
  if (value.PrimaryFamilyId == null) {
    const { data } = await POST('/api/People', {
      body: omit(value, ['FamilyRole'])
    })
    return { rockId: data as unknown as number }
  }

  const { data: people } = await GET('/api/People', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  // if person exists, make sure they are in correct family
  if (people != null && people.length > 0 && people[0].Id != null) {
    await POST('/api/People/AddExistingPersonToFamily', {
      params: {
        query: {
          personId: people[0].Id,
          familyId: value.PrimaryFamilyId,
          groupRoleId: value.FamilyRole ?? 3,
          removeFromOtherFamilies: true
        }
      }
    })
    await PUT('/api/People/{id}', {
      params: {
        path: {
          id: people[0].Id
        }
      },
      body: omit(value, ['ForeignKey', 'FamilyRole'])
    })
    return { rockId: people[0].Id }
  } else {
    // add new person to rock and also puts them into their correct family
    const { data } = await POST('/api/People/AddNewPersonToFamily/{familyId}', {
      params: {
        path: {
          familyId: value.PrimaryFamilyId
        },
        query: {
          groupRoleId: value.FamilyRole ?? 3
        }
      },
      body: omit(value, ['FamilyRole'])
    })
    return { rockId: data as unknown as number }
  }
}
