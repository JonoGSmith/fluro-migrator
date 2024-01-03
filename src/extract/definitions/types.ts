interface Field {
  title: string
  type: string
  description: string
  directive: string
  minimum?: number
  maximum?: number
  batchEditable?: boolean
  key: string
  params?: {
    restrictType?: string
    allowedTags?: string[]
    disableSanitize?: boolean
    population?: string
    populationDetails?: string
  }
  options?: { value: string; name: string }[]
  _discriminatorDefinition?: string
  sourceQuery?: unknown
  queryTemplate?: unknown
  developerOnly?: unknown
  defaultValues?: unknown[]
  allowedValues?: unknown[]
  defaultReferences?: unknown[]
  allowedReferences?: unknown[]
  fields?: Field[]
  askCount?: number
  asObject?: boolean
  className?: string
}

interface TypeDefinition {
  title: string
  plural: string
  definitionName: string
  fields: Field[]
}

export interface Definition {
  _id: string
  title: string
  plural?: string
  definitionName?: string
  fields?: Field[]
  account?: string
  managedOwners: unknown[]
  owners?: string[]
  author?: string
  realms?: { _id: string; title: string; bgColor: string; color: string }[]
  status?: string
  _type?: string
  _matched?: true
}

export interface FluroDefinitions {
  definition: unknown
  type: TypeDefinition
  definitions: Definition[]
  details: unknown[]
}
