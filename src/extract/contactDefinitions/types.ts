export interface FluroDefinitions {
  _id: string
  title: string
  plural?: string
  definitionName?: string
  account?: string
  managedOwners: unknown[]
  owners?: string[]
  author?: string
  realms?: Realm[]
  status?: string
  _type?: string
  _matched?: true
  created?: string
  updated?: string
  firstLine?: string
}

interface Realm {
  _id: string
  title: string
  _type: string
  bgColor: string
  color: string
  slug: string
  definition: string
}
