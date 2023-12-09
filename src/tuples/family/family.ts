import { extract as extractFamily } from '../../extract/family'
import { FluroFamily } from '../../extract/family'
import { load as loadFamily } from '../../load/family'
import { RockFamily } from '../../load/family/family'
import { transform as transformFamily } from '../../transform/family'
import { ETLTuple } from '../types'

export const familyEtl: ETLTuple<FluroFamily, RockFamily> = [
  extractFamily,
  transformFamily,
  loadFamily
]
