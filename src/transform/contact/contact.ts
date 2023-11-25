import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import { TransformFn } from '../types'

/**
 * transforms a fluro api contact object to a rock contact object
 */
export const transform: TransformFn<FluroContact, RockContact> = (contact) => {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    created_at: contact.created_at,
    updated_at: contact.updated_at
  }
}
