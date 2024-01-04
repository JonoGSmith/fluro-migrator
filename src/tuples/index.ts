import { contactEtl } from './contact/contact'
import { definitionContactETL } from './definition/contact/contact'
import { familyEtl } from './family/family'

export const tuples = [definitionContactETL, familyEtl, contactEtl]
