import type { FluroDefinitionTeam } from '../../../extract/definition/team'
import type { RockDefinitionTeam } from '../../../load/definition/team'
import type { Cache } from '../../../load/types'

export function transform(
  _cache: Cache,
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
