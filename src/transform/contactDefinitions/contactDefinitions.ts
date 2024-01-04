import { FluroDefinition } from '../../extract/definition/types'
import { Mapper } from '../../load/types'

export function transform(_mapper: Mapper, value: FluroDefinition) {
  return {
    DefinedTypeId: 4,
    Value: value.title,
    Description: value.firstLine,
    IsActive: value.status === 'active',
    CreatedDateTime: value.created,
    ModifiedDateTime: value.updated,
    DefinitionName: value.definitionName
  }
}
