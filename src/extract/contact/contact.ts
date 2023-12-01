import { client } from '../client'
import { ExtractFn, ExtractObject } from '../types'

export interface FluroContact extends ExtractObject {
  id: string
}

export const extract: ExtractFn = async (): Promise<FluroContact[]> => {
  const req = await client.get('/contact')

  return req.data
}
