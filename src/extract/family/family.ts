import { extractFromFluro } from '../lib'

import type { FluroFamily } from './types'

export const extract = extractFromFluro<FluroFamily>({
  contentType: 'family',
  filterBody: {
    allDefinitions: true,
    includeArchived: true
  }
})
