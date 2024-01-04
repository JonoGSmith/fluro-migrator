import type { FluroContactDefinition } from '../../../extract/definition/contact'
import type { Mapper } from '../../../load/types'
import type { RockContactDefinition } from '../../../load/definition/contact'

export function transform(
  _mapper: Mapper,
  value: FluroContactDefinition
): RockContactDefinition {
  return {
    DefinedTypeId: 4,
    Value: value.title,
    Description: value.firstLine,
    IsActive: value.status === 'active',
    CreatedDateTime: value.created,
    ModifiedDateTime: value.updated,
    DefinitionName: value.definitionName
    // ModifiedByPersonAliasId: null,
    // Attributes: null,
    // AttributeValues: null,
    // ForeignId: null,
    // ForeignGuid: null,
    // ForeignKey: null
  } as RockContactDefinition
}
