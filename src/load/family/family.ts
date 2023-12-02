// import { client } from '../client'

export interface RockFamily {
  id: string
}

export async function load(value: RockFamily): Promise<void> {
  console.log(value)
  //await client.put(/contact/family, value)
}
