import { transform } from '.'
import { FluroContact } from '../../extract/contact'
import { RockContact } from '../../load/contact'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact = {
      _id: '1'
    } as unknown as FluroContact
    const rockContact: RockContact = {
      id: '1'
    }
    it('should translate a fluro api contact to a rock contact', () => {
      expect(transform(fluroContact)).toEqual(rockContact)
    })
  })
})
