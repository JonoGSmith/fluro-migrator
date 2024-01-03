import { FluroTeamDefinition } from '../../../extract/definition/team'
import { Mapper } from '../../../load/types'

export function transform(_mapper: Mapper, value: FluroTeamDefinition) {
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
  }
}
