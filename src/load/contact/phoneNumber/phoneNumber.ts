import f from 'odata-filter-builder'

import { GET, POST, RockApiError } from '../../client'

let NumberTypeValueId: number

export async function load(
  phoneNumber: string,
  personId: number,
  fluroId: string
): Promise<void> {
  // get number type value id - add number in as "mobile" by default
  if (NumberTypeValueId === undefined) {
    const { data, error } = await GET('/api/DefinedValues', {
      params: {
        query: {
          $filter: f().eq('Description', 'Mobile/Cell phone number').toString(),
          $select: 'Id'
        }
      }
    })
    if (error != null) throw new RockApiError(error)

    if (data?.[0].Id == null)
      throw new Error("Couldn't find Number Type Id in Defined Values")

    NumberTypeValueId = data?.[0].Id
  }
  // check if current number already exists
  const { data: phoneNumbers, error } = await GET('/api/PhoneNumbers', {
    params: {
      query: {
        $filter: f().eq('Description', 'Mobile/Cell phone number').toString(),
        $select: 'Id'
      }
    }
  })
  if (error != null) throw new RockApiError(error)

  if (phoneNumbers == null || phoneNumbers?.length > 0) {
    const { error } = await POST('/api/PhoneNumbers', {
      body: {
        PersonId: personId,
        CountryCode: '+64',
        Number: phoneNumber,
        NumberTypeValueId,
        ForeignKey: fluroId,
        FullNumber: '64' + phoneNumber,
        IsSystem: false,
        IsMessagingEnabled: false
      }
    })
    if (error != null) throw new RockApiError(error)
  }
}
