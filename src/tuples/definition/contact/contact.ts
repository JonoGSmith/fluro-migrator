import {
  FluroContactDefinition,
  extract
} from '../../../extract/definition/contact'

import { RockContactDefinition, load } from '../../../load/definition/contact'
import { transform } from '../../../transform/definition/contact'
import { ETLTuple } from '../../types'

export const contactEtl: ETLTuple<
  FluroContactDefinition,
  RockContactDefinition
> = ['contactDefinition', extract, transform, load]
