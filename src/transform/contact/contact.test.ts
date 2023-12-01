import { transform } from '.'
import { FluroContact } from '../../extract/contact'
import { RockContact } from '../../load/contact'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact: FluroContact = {
      id: '1'
    }
    const rockContact: RockContact = {
      id: '1'
    }
    it('should translate a fluro api contact to a rock contact', () => {
      expect(transform(fluroContact)).toEqual(rockContact)
    })
  })
})
