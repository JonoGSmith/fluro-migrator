import type { FluroDefinitionTeam } from '../../../extract/definition/team'
import { extract as extractDefinitionTeam } from '../../../extract/definition/team'
import type { RockDefinitionTeam } from '../../../load/definition/team'
import { load as loadDefinitionTeam } from '../../../load/definition/team'
import { transform as transformDefinitionTeam } from '../../../transform/definition/team'
import type { ETLTuple } from '../../types'

export const definitionTeamEtl: ETLTuple<
  FluroDefinitionTeam,
  RockDefinitionTeam
> = [
  'definition/team',
  extractDefinitionTeam,
  transformDefinitionTeam,
  loadDefinitionTeam
]
