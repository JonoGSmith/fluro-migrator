import { find, truncate } from 'lodash'

import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import type { Cache } from '../../load/types'

function transformGender(gender: string): 'Unknown' | 'Male' | 'Female' {
  switch (gender) {
    case 'male':
      return 'Male'
    case 'female':
      return 'Female'
    default:
    case 'unknown':
      return 'Unknown'
  }
}

/**
 * transforms a fluro api contact object to a rock contact object
 */
export function transform(cache: Cache, value: FluroContact): RockContact {
  const ConnectionStatusValueId = find(cache['definition/contact'], (val) => {
    if (value.definition == null || value.definition === '') {
      return val.data?.definitionName === 'visitor'
    } else {
      return val.data?.definitionName === value.definition
    }
  })?.rockId

  if (ConnectionStatusValueId == null)
    throw new Error(
      `Couldn't find connection status value id for contact ${value._id} with definition ${value.definition}`
    )

  return {
    IsSystem: false,
    BirthDay: value?.dobDay,
    BirthMonth: value.dobMonth,
    BirthYear: value.dobYear,
    BirthDate: value?.dob,
    IsDeceased: value.deceased,
    DeceasedDate: value.deceasedDate,
    Email: value?.emails?.[0],
    FirstName: truncate(value.firstName, { length: 50 }),
    LastName: value.lastName,
    ForeignKey: value._id,
    Gender: transformGender(value.gender),
    ConnectionStatusValueId,
    PrimaryFamilyId:
      value.family != null
        ? cache['family'][value.family._id]?.rockId
        : undefined,
    FamilyRole:
      value?.householdRole != null && value.householdRole === 'child' ? 4 : 3,
    PhoneNumber: value?.phoneNumbers,
    FluroRecordStatus: value.status
  }
}
