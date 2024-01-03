import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import { Mapper } from '../../load/types'

function transformGender(gender: string): 'Unknown' | 'Male' | 'Female' {
  switch (gender) {
    case 'male':
      return 'Male'
    case 'Female':
      return 'Female'
    default:
    case 'unknown':
      return 'Unknown'
  }
}

//to do: add definitions that don't exist to -  defined values -> defined type 4,
function transformDefinitions(definition: string): number {
  switch (definition) {
    case 'attender':
      return 146
    case 'committed':
      return 65
    case 'fringe':
      return 66
    case 'leaderOfLeaders':
      return 65
    case 'supporter':
      return 67
    default:
    case 'visitor':
      return 66
  }
}

/**
 * transforms a fluro api contact object to a rock contact object
 */
export function transform(mapper: Mapper, contact: FluroContact): RockContact {
  return {
    IsSystem: false,
    BirthMonth: contact.dobMonth,
    BirthYear: contact.dobYear,
    IsDeceased: contact.deceased,
    DeceasedDate: contact.deceasedDate,
    Email: contact?.emails?.[0] ?? '',
    FirstName: contact.firstName,
    LastName: contact.lastName,
    ForeignKey: contact._id,
    Gender: transformGender(contact.gender),
    ConnectionStatusValueId: transformDefinitions(
      contact?.definition ?? 'visitor'
    ),
    PrimaryFamilyId:
      contact.family != null
        ? mapper['family'][contact.family._id]?.rockId
        : undefined,
    FamilyRole:
      contact?.householdRole != null && contact.householdRole === 'child'
        ? 4
        : 3
  }
}
