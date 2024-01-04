import type { Realm } from '../types'

interface Address {
  addressLine1: string
  suburb: string
  postalCode: string
}

export interface FluroFamily {
  _id: string
  status: string
  realms: Realm[]
  address: Address
  title: string
  _type: string
  created: string
  updated: string
  firstLine: string
}
