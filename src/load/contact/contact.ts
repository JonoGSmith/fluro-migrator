import { omit } from 'lodash'
import { client } from '../client'

export interface RockContact {
  FirstName: string
  LastName: string
  ForeignKey: string
  Gender: number
}

export async function load(value: RockContact): Promise<void> {
  const contactsRes = await client.get('/people', {
    params: { $filter: `ForeignKey eq '${value.ForeignKey}'`, $select: 'Id' }
  })
  if (contactsRes.data.length > 0) {
    await client.patch(
      `/people/${contactsRes.data[0].Id}`,
      omit(value, 'ForeignKey')
    )
    console.log(
      `updated contact ${value.ForeignKey} to ${contactsRes.data[0].Id}`,
      value
    )
  } else {
    const createRes = await client.post('/people', value)
    console.log(`created contact ${value.ForeignKey} to ${createRes.data}`)
  }
}
