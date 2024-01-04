import type { FluroDefinitionContact } from '../../../extract/definition/contact'
import type { Mapper } from '../../../load/types'
import type { RockDefinitionContact } from '../../../load/definition/contact'

export function transform(
  _mapper: Mapper,
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
    mapper: {
      definitionName: value.definitionName
    }
  }
}
