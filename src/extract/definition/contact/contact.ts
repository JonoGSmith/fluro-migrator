import type { FluroDefinition } from '../types'
import { extractDefinition } from '../lib'

export type FluroDefinitionContact = FluroDefinition

export const extract = extractDefinition('contact')
