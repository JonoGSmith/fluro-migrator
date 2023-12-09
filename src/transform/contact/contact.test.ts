import { transform } from '.'
import { FluroContact } from '../../extract/contact'
import { RockContact } from '../../load/contact'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact = {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      gender: 'male'
    } as unknown as FluroContact
    const rockContact: RockContact = {
      ForeignKey: '1',
      FirstName: 'John',
      LastName: 'Smith',
      Gender: 1
    }
    it('should translate a fluro api contact to a rock contact', () => {
      expect(transform(fluroContact)).toEqual(rockContact)
    })
  })
})
