import 'dotenv/config'
import { tuples } from './tuples'

async function main() {
  await Promise.all(
    tuples.map(async ([extract, transform, load]) => {
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
