import 'dotenv/config'
import { tuples } from './tuples'

async function main() {
  for (const [extract, transform, load] of tuples) {
    // create extract iterator
    const iterator = await extract()

    // transform and load data
    let result = await iterator.next()
    while (!result.done) {
      await Promise.all(
        result.value.map((value) => load(transform(value as any) as any))
      )
      result = await iterator.next()
    }
  }
}

main()
