// import { client } from '../client'

export interface RockContact {
  id: string
}

export async function load(value: RockContact): Promise<void> {
  console.log(value)
  // await client.put('/contact', value)
}
