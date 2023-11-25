import { contactTranslate } from '.'

describe('contact', () => {
  describe('translate', () => {
    const fluroContact = {
      id: 1,
      name: 'Test Name'
    }
    const rockContact = {}
    it('should translate a fluro api contact object to a rock contact object', () => {
      expect(contactTranslate(fluroContact)).toEqual(rockContact)
    })
  })
})
