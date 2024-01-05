import type { FluroFamily } from '../../extract/family'
import type { RockFamily } from '../../load/family/family'
import type { Cache } from '../../load/types'

export function transform(_cache: Cache, family: FluroFamily): RockFamily {
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
