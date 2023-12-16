import { omit } from 'lodash'
import { GET, POST, PUT, components } from '../client'

export type RockContact = components['schemas']['Rock.Model.Person']

export async function load(value: RockContact): Promise<number> {
  if (value.PrimaryFamilyId == null) {
    const { data } = await POST('/api/People', {
      body: value
    })
    return data as unknown as number
  }

  const { data: people } = await GET('/api/People', {
    params: {
      query: {
        $filter: `ForeignKey eq '${value.ForeignKey}'`,
        $select: 'Id'
      }
    }
  })
  if (people != null && people.length > 0 && people[0].Id != null) {
    await POST('/api/People/AddExistingPersonToFamily', {
      params: {
        query: {
          personId: people[0].Id,
          familyId: value.PrimaryFamilyId,
          groupRoleId: 4,
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
      body: omit(value, ['ForeignKey'])
    })
    return people[0].Id
  } else {
    const { data } = await POST('/api/People/AddNewPersonToFamily/{familyId}', {
      params: {
        path: {
          familyId: value.PrimaryFamilyId
        },
        query: {
          groupRoleId: 4
        }
      },
      body: value
    })
    return data as unknown as number
  }
}
