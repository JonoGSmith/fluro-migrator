import { FluroFamily } from '../../extract/family'
import { RockFamily } from '../../load/family/family'
import { Mapper } from '../../load/types'

export function transform(_mapper: Mapper, family: FluroFamily): RockFamily {
  return {
    IsSystem: false,
    IsSecurityRole: false,
    IsActive: true,
    ForeignKey: family._id,
    Name: family.title,
    Order: 0,
    IsPublic: false
  }
}
