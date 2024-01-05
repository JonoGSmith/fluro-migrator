import type { FluroDefinitionContact } from '../../../extract/definition/contact'
import type { Cache } from '../../../load/types'
import type { RockDefinitionContact } from '../../../load/definition/contact'

export function transform(
  _cache: Cache,
  value: FluroDefinitionContact
): RockDefinitionContact {
  return {
    IsSystem: false,
    Order: 0,
    Value: value.title,
    Description: value.firstLine,
    IsActive: value.status === 'active',
    CreatedDateTime: value.created,
    ModifiedDateTime: value.updated,
    ForeignKey: value._id,
    cache: {
      definitionName: value.definitionName
    }
  }
}
