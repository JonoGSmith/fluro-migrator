import type { FluroDefinitionContact } from '../../../extract/definition/contact'
import { extract } from '../../../extract/definition/contact'
import type { RockDefinitionContact } from '../../../load/definition/contact'
import { load } from '../../../load/definition/contact'
import { transform } from '../../../transform/definition/contact'
import type { ETLTuple } from '../../types'

export const definitionContactEtl: ETLTuple<
  FluroDefinitionContact,
  RockDefinitionContact
> = ['definition/contact', extract, transform, load]
