import type { Realm } from '../types'

export interface FluroContact {
  _id: string
  owners: unknown[]
  ownerGroups?: unknown[]
  managedOwners: unknown[]
  status: string
  hashtags: unknown[]
  _references: string[]
  mentions: unknown[]
  keywords: string[]
  privacy: string
  emails: string[]
  phoneNumbers: string[]
  local: string[]
  international: string[]
  capabilities: unknown[]
  locations: unknown[]
  realms: Realm[]
  tags: Tag[]
  verified: boolean
  deceased: boolean
  distinctFrom: unknown[]
  historicalIDs: string[]
  _type: string
  _external?: string
  firstName: string
  lastName: string
  created: string
  householdRole?: string
  definition?: string
  data?: Data
  account: Account
  gender: string
  updated: string
  relationships: Relationship[]
  title: string
  dobVerified?: boolean
  deceasedDate?: string
  __v?: number
  family?: Family2
  touchpoints?: Touchpoints
  details?: Details
  statDates?: StatDates
  updatedBy?: string
  _sid?: number
  countryCode?: string
  timezone?: string
  preferredName?: string
  _ss_unique?: SsUnique
  stats?: Stats
  age?: number
  ageCalculated: unknown
  dob?: string
  dobDay?: number
  dobDayUTC?: number
  dobHour?: number
  dobHourUTC?: number
  dobMonth?: number
  dobMonthName?: string
  dobMonthNameUTC?: string
  dobMonthTitle?: string
  dobMonthTitleUTC?: string
  dobMonthUTC?: number
  dobYear?: number
  dobYearUTC?: number
  dateOfBirth?: string
  maritalStatus?: string
  maidenName?: string
}

interface Tag {
  _id: string
  title: string
  _type: string
  slug: string
}

interface Data {
  elvanto?: Elvanto
  import?: Import
}

interface Elvanto {
  date_added: string
  date_modified: string
  firstname: string
  lastname: string
  phone?: string
  status: string
  last_login: string
  picture: string
  family_relationship: string
  id: string
  category_id: string
  contact?: number
  demographics?: Demographic[]
  locations?: Location[]
  development_child: string
  special_needs_child: string
  email?: string
  archived?: number
  mailing_address?: string
  mailing_city?: string
  family_id?: string
  family?: Family
  marital_status?: string
  custom?: Custom
  username?: string
  gender?: string
  mailing_address2?: string
  mailing_country?: string
  home_country?: string
  'custom_ecdf83f9-1e6a-11e7-ba01-061a3b9c64af'?: CustomEcdf83f91e6a11e7Ba01061a3b9c64af
  'custom_fa49b155-5a94-4b65-99e3-1392181aed4d'?: string
  mailing_postcode?: string
  'custom_1ad4e1ca-2e36-11e4-91c4-06d3d709c2b0'?: string
  home_address2?: string
  home_city?: string
  mobile?: string
  'custom_0f27c626-b153-4228-b38f-9ae922934e80'?: string
  'custom_090b4e9e-8a5b-4555-b1e9-34a89967d486'?: string
  'custom_7d62fcdb-36d5-4e63-97c9-c3ce12337a35'?: string
  'custom_53c0d810-57c2-11e7-ace4-061a3b9c64af'?: Custom53c0d81057c211e7Ace4061a3b9c64af
  home_address?: string
  preferred_name?: string
}

interface Demographic {
  title: string
  _external: string
  _type: string
  data: Data2
}

interface Data2 {
  elvanto: Elvanto2
}

interface Elvanto2 {
  id: string
  name: string
  sub_demographics?: SubDemographics
}

interface SubDemographics {
  sub_demographic: SubDemographic[]
}

interface SubDemographic {
  id: string
  name: string
}

interface Location {
  title: string
  _external: string
  _type: string
  data: Data3
  realms?: Realm2[]
  _id?: string
}

interface Data3 {
  elvanto: Elvanto3
}

interface Elvanto3 {
  id: string
  name: string
}

interface Realm2 {
  _id: string
  owners: Owner[]
  status: string
  title: string
  account: string
  _type: string
  author: Author
  created: string
  updated: string
  bgColor: string
  color: string
  slug: string
  managedOwners?: unknown[]
}

interface Owner {
  _id: string
  name: string
  firstName: string
  lastName: string
}

interface Author {
  _id: string
  name: string
}

interface Family {
  family_id: string
  family_member: FamilyMember[]
}

interface FamilyMember {
  id: string
  firstname: string
  lastname: string
  relationship: string
}

interface Custom {
  christian?: Christian
  '2ndVisit'?: string
  pluggedInToADifferentChurch?: string
  '1stVisit'?: string
  previousChurch?: string
  vocation?: string
  newishPathway?: NewishPathway[]
}

interface Christian {
  id: string
  name: string
}

interface NewishPathway {
  id: string
  name: string
}

interface CustomEcdf83f91e6a11e7Ba01061a3b9c64af {
  id: string
  name: string
}

interface Custom53c0d81057c211e7Ace4061a3b9c64af {
  custom_field: CustomField[]
}

interface CustomField {
  id: string
  name: string
}

interface Import {
  'First Name': string
  'Preferred Name': string
  'Last Name': string
  'Email Address'?: string
  'Contact Number'?: string
  Demographics: string
  '2nd_Visit': string
  '1st_Visit'?: string
}

interface Account {
  _id: string
  status: string
  timezone: string
  title: string
  countryCode: string
}

interface Relationship {
  contacts: string[]
  relationship: string
}

interface Family2 {
  _id: string
  title: string
  _type: string
}

interface Touchpoints {
  interaction?: Interaction
  mailoutOpen?: MailoutOpen
  guestExpected?: GuestExpected
  teamLeave?: TeamLeave
  mailoutSent?: MailoutSent
  checkin?: Checkin
}

interface Interaction {
  last: string
  first: string
  sum: number
}

interface MailoutOpen {
  last: string
  first: string
  sum: number
}

interface GuestExpected {
  last: string
  first: string
  sum: number
}

interface TeamLeave {
  last: string
  first: string
  sum: number
}

interface MailoutSent {
  last: string
  first: string
  sum: number
}

interface Checkin {
  last: string
  first: string
  sum: number
}

interface Details {}

interface StatDates {
  view?: string
}

interface SsUnique {
  type: string
  coordinates: number[]
}

interface Stats {
  view?: number
}
