import { transform } from '.'
import type { FluroContact } from '../../extract/contact'
import type { RockContact } from '../../load/contact'
import type { Cache } from '../../load/types'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact = {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      gender: 'male'
    } as unknown as FluroContact
    const rockContact: RockContact = {
      BirthMonth: undefined,
      BirthYear: undefined,
      DeceasedDate: undefined,
      Email: '',
      FirstName: 'John',
      FamilyRole: 3,
      ForeignKey: '1',
      Gender: 'Male',
      IsDeceased: undefined,
      IsSystem: false,
      LastName: 'Smith',
      PrimaryFamilyId: undefined
    } as RockContact
    it('should translate a fluro api contact to a rock contact', () => {
      const cache: Cache = {}
      cache['contact'] = {}
      expect(transform(cache, fluroContact)).toEqual(rockContact)
    })
  })
})
