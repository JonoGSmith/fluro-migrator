import { FluroContact, RockContact, translate } from '.'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact: FluroContact = {
      id: 1,
      name: 'Test Name'
    }
    const rockContact: RockContact = {}
    it('should translate a fluro api contact object to a rock contact object', () => {
      expect(translate(fluroContact)).toEqual(rockContact)
    })
  })
})
