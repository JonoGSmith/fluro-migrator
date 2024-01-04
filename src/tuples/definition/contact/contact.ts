import type { FluroContactDefinition } from '../../../extract/definition/contact'
import { extract } from '../../../extract/definition/contact'

import type { RockContactDefinition } from '../../../load/definition/contact'
import { load } from '../../../load/definition/contact'
import { transform } from '../../../transform/definition/contact'
import type { ETLTuple } from '../../types'

export const definitionContactETL: ETLTuple<
  FluroContactDefinition,
  RockContactDefinition
> = ['contactDefinition', extract, transform, load]
