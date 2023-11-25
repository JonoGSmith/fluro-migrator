/**
 * Translates a fluro api contact object to a rock contact object
 * @param contact fluro api contact object
 * @returns rock contact object
 */
export function translate(contact) {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    created_at: contact.created_at,
    updated_at: contact.updated_at,
  };
}
