import { extract as extractContact } from './extract/contact'
import type { ExtractFn } from './extract/types'
import { load as loadContact } from './load/contact'
import type { LoadFn } from './load/types'
import { transform as transformContact } from './transform/contact'
import type { TransformFn } from './transform/types'

// define types of data
const types: [ExtractFn, TransformFn, LoadFn][] = [
  [extractContact, transformContact, loadContact]
]

// loop through data types

async function main() {
  await Promise.all(
    types.map(async ([extract, transform, load]) => {
      // import data
      const data = await extract()

      // transform data
      const transformed = data.map(transform)

      // export data
      await load(transformed)
    })
  )
}

main()
