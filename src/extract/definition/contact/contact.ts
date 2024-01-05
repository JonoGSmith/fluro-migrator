import type { FluroDefinition } from '../types'
import { extractFromFluro } from '../../lib'

export type FluroDefinitionContact = FluroDefinition

export const extract = extractFromFluro<FluroDefinitionContact>({
  contentType: 'definition',
  filterBody: {
    allDefinitions: true,
    includeArchived: true,
    searchInheritable: false,
    filter: {
      filters: [
        {
          comparator: '==',
          key: 'parentType',
          value: 'contact'
        }
      ]
    }
  }
})
