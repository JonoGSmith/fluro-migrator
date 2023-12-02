import 'dotenv/config'
import { tuples } from './tuples'
import { FluroContact } from './extract/contact'
import { FluroFamily } from './extract/family'

type temporaryIntersection = FluroContact & FluroFamily

await (async function main() {
  await Promise.all(
    tuples.map(async ([extract, transform, load]) => {
      // create extract iterator
      const iterator = await extract()

      // transform and load data
      let result = await iterator.next()
      while (!result.done) {
        await Promise.all(
          result.value.map((value) =>
            load(transform(value as unknown as temporaryIntersection))
          )
        )
        result = await iterator.next()
      }
    })
  )
})()
