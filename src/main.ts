import 'dotenv/config'
import { extract as extractContact } from './extract/contact'
import type { ExtractFn } from './extract/types'
import { load as loadContact } from './load/contact'
import type { LoadFn } from './load/types'
import { transform as transformContact } from './transform/contact'
import type { TransformFn } from './transform/types'

type ETLTuple = [ExtractFn, TransformFn, LoadFn]

// define types of data
const etl: ETLTuple[] = [[extractContact, transformContact, loadContact]]

// loop through data types

async function main() {
  await Promise.all(
    etl.map(async ([extract, transform, load]) => {
      // extract data
      const data = await extract()

      // transform and load data
      await Promise.all(data.map((value) => load(transform(value))))
    })
  )
}

main()
