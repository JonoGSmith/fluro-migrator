import { extractFromFluro } from '../../lib'
import type { FluroDefinition } from '../types'

export type FluroDefinitionTeam = FluroDefinition

export const extract = extractFromFluro<FluroDefinitionTeam>({
  contentType: 'definition',
  filterBody: {
    allDefinitions: true,
    includeArchived: true,
    searchInheritable: true,
    filter: {
      filters: [
        {
          comparator: '==',
          key: 'parentType',
          value: 'team'
        }
      ]
    }
  }
})
