import { client } from '../client'
import { LoadFn, LoadObject } from '../types'

export interface RockContact extends LoadObject {
  id: string
}

export const load: LoadFn = async (value: RockContact): Promise<void> => {
  await client.put('/contact', value)
}
