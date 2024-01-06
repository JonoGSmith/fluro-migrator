import { extractFromFluro } from '../lib'

import type { FluroContact } from './types'

export const extract = extractFromFluro<FluroContact>({
  contentType: 'contact',
  filterBody: {
    allDefinitions: true,
    includeArchived: true
  }
})
