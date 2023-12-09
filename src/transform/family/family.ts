import { FluroFamily } from '../../extract/family'
import { RockFamily } from '../../load/family/family'

export function transform(family: FluroFamily): RockFamily {
  return {
    ForeignKey: family._id,
    Name: family.title
  }
}
