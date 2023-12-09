import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'

const GENDER_ENUM: { [key: string]: number } = {
  unknown: 0,
  male: 1,
  female: 2
}

/**
 * transforms a fluro api contact object to a rock contact object
 */
export function transform(contact: FluroContact): RockContact {
  return {
    FirstName: contact.firstName,
    LastName: contact.lastName,
    Gender: GENDER_ENUM[contact.gender] ?? 0,
    ForeignKey: contact._id,
    Family:
      contact.family != null
        ? {
            ForeignKey: contact.family._id,
            FamilyRole: contact.householdRole
          }
        : undefined
  }
}
