import { FluroDefinition } from '../types'
import { extractDefinition } from '../lib'

export type FluroTeamDefinition = FluroDefinition

export const extract = extractDefinition('team')
