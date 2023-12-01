import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import { TransformFn } from '../types'

/**
 * transforms a fluro api contact object to a rock contact object
 */
export const transform: TransformFn = (contact: FluroContact): RockContact => {
  return {
    id: contact.id
  }
}
