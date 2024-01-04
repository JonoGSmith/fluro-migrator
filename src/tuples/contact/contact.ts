import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import { extract as extractContact } from '../../extract/contact'
import { load as loadContact } from '../../load/contact'
import { transform as transformContact } from '../../transform/contact'
import type { ETLTuple } from '../types'

export const contactEtl: ETLTuple<FluroContact, RockContact> = [
  'contact',
  extractContact,
  transformContact,
  loadContact
]
