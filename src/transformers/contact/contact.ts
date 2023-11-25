export interface FluroContact {}

export interface RockContact {}

/**
 * Translates a fluro api contact object to a rock contact object
 */
export function translate(contact: FluroContact): RockContact {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    created_at: contact.created_at,
    updated_at: contact.updated_at,
  };
}
