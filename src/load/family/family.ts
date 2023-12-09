import { omit } from 'lodash'
import { client } from '../client'
import { Mapper } from '../types'

export interface RockFamily {
  ForeignKey: string
  Name: string
  GroupTypeId?: number
  Id?: number
}

let GroupTypeId: number

export async function load(
  _mapper: Mapper,
  value: RockFamily
): Promise<string> {
  if (GroupTypeId === undefined) {
    const groupTypesRes = await client.get('/groupTypes', {
      params: { $filter: `Name eq 'Family'`, $select: 'Id' }
    })
    GroupTypeId = groupTypesRes.data[0].Id
  }
  const familiesRes = await client.get('/groups', {
    params: { $filter: `ForeignKey eq '${value.ForeignKey}'`, $select: 'Id' }
  })
  if (familiesRes.data.length > 0) {
    await client.patch(
      `/groups/${familiesRes.data[0].Id}`,
      omit(value, 'ForeignKey')
    )
    return familiesRes.data[0].Id
  } else {
    const createRes = await client.post('/groups', {
      ...value,
      GroupTypeId
    })
    return createRes.data
  }
}
