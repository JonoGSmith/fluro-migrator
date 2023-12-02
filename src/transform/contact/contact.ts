import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'

/**
 * transforms a fluro api contact object to a rock contact object
 */
export function transform(contact: FluroContact): RockContact {
  return {
    id: contact._id
  }
}
