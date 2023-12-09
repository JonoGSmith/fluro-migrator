import { omit } from 'lodash'
import { client } from '../client'
import { Mapper } from '../types'

export interface RockContact {
  FirstName: string
  LastName: string
  ForeignKey: string
  Gender: number
}

export async function load(
  _mapper: Mapper,
  value: RockContact
): Promise<string> {
  const contactsRes = await client.get('/people', {
    params: { $filter: `ForeignKey eq '${value.ForeignKey}'`, $select: 'Id' }
  })
  if (contactsRes.data.length > 0) {
    await client.patch(
      `/people/${contactsRes.data[0].Id}`,
      omit(value, 'ForeignKey')
    )
    return contactsRes.data[0].Id
  } else {
    const createRes = await client.post('/people', value)
    return createRes.data
  }
}
