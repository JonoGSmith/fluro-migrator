import { FluroFamily } from '../../extract/family'
import { RockFamily } from '../../load/family/family'

export function transform(family: FluroFamily): RockFamily {
  return {
    id: family._id
  }
}
