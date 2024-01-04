import type { FluroFamily } from '../../extract/family'
import type { RockFamily } from '../../load/family'
import { extract as extractFamily } from '../../extract/family'
import { load as loadFamily } from '../../load/family'
import { transform as transformFamily } from '../../transform/family'
import type { ETLTuple } from '../types'

export const familyEtl: ETLTuple<FluroFamily, RockFamily> = [
  'family',
  extractFamily,
  transformFamily,
  loadFamily
]
