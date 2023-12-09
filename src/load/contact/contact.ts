import { omit } from 'lodash'
import { client } from '../client'
import { Mapper } from '../types'

export interface RockContact {
  FirstName: string
  LastName: string
  ForeignKey: string
  Gender: number
  Email?: string
  BirthDay?: number
  BirthMonth?: number
  BirthYear?: number
  IsDeceased?: boolean
  DeceasedDate?: string
  Family?: {
    ForeignKey: string
    FamilyRole: string | undefined
  }
}

export async function load(
  mapper: Mapper,
  value: RockContact
): Promise<string> {
  if (value.Family == null) {
    const createRes = await client.post('/people', omit(value, ['Family']))
    return createRes.data
  }

  const rockFamilyId = mapper.family[value.Family.ForeignKey]
  const contactsRes = await client.get('/people', {
    params: { $filter: `ForeignKey eq '${value.ForeignKey}'`, $select: 'Id' }
  })
  if (contactsRes.data.length > 0) {
    if (contactsRes.data[0].PrimaryFamilyId !== rockFamilyId) {
      await client.post(
        `/People/AddExistingPersonToFamily`,
        {},
        {
          params: {
            personId: contactsRes.data[0].Id,
            familyId: +rockFamilyId,
            groupRoleId: value.Family.FamilyRole === 'child' ? 4 : 3,
            removeFromOtherFamilies: true
          }
        }
      )
    }
    await client.patch(
      `/people/${contactsRes.data[0].Id}`,
      omit(value, ['ForeignKey', 'Family'])
    )
    return contactsRes.data[0].Id
  } else {
    const createRes = await client.post(
      `/People/AddNewPersonToFamily/${rockFamilyId}`,
      {
        person: omit(value, ['Family'])
      },
      {
        params: {
          groupRoleId: value.Family.FamilyRole === 'child' ? 4 : 3
        }
      }
    )
    return createRes.data
  }
}
