import type { FluroDefinition } from '../types'
import { extractDefinition } from '../lib'

export type FluroDefinitionTeam = FluroDefinition

export const extract = extractDefinition('team', true)
