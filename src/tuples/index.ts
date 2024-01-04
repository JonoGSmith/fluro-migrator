import { contactEtl } from './contact/contact'
import { definitionContactETL } from './definition/contact/contact'
import { definitionTeamEtl } from './definition/team/team'
import { familyEtl } from './family/family'

export const tuples = [
  definitionContactETL,
  definitionTeamEtl,
  familyEtl,
  contactEtl
]
