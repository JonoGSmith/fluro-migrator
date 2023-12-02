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
      // create extract iterator
      const iterator = await extract()

      // transform and load data
      let result = await iterator.next()
      while (!result.done) {
        await Promise.all(result.value.map((value) => load(transform(value))))
        result = await iterator.next()
      }
    })
  )
}

main()
