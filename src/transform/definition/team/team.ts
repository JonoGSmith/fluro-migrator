import type { FluroTeamDefinition } from '../../../extract/definition/team'
import type { Mapper } from '../../../load/types'

export function transform(
  _mapper: Mapper,
  teamDefinition: FluroTeamDefinition
) {
  return {
    IsSystem: false,
    IsSecurityRole: false,
    IsActive: true,
    ForeignKey: teamDefinition._id,
    Name: teamDefinition.title,
    IsPublic: false
  }
}
