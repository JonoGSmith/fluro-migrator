import type { FluroDefinitionTeam } from '../../../extract/definition/team'
import type { RockDefinitionTeam } from '../../../load/definition/team'
import type { Mapper } from '../../../load/types'

export function transform(
  _mapper: Mapper,
  definitionTeam: FluroDefinitionTeam
): RockDefinitionTeam {
  return {
    IsSystem: false,
    ForeignKey: definitionTeam._id,
    Name: definitionTeam.title,
    Description: definitionTeam.firstLine,
    CreatedDateTime: definitionTeam.created,
    ModifiedDateTime: definitionTeam.updated,
    GroupTerm: 'Group',
    GroupMemberTerm: 'Member',
    IsCapacityRequired: false,
    ShowAdministrator: true,
    Order: 0
  }
}
