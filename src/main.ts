import 'dotenv/config'
import { tuples } from './tuples'
import { Mapper } from './load/types'

async function main() {
  const mapper: Mapper = {}

  // export interface Mapper {
  //   [tupleName: string]: { [fluroId: string]: string }
  // }

  for (const [name, extract, transform, load] of tuples) {
    mapper[name] = {}

    // create extract iterator
    const iterator = await extract()

    // transform and load data
    let result = await iterator.next()
    while (!result.done) {
      const tmpMapper = await Promise.all(
        result.value.map(async (value) => {
          const id = await load(transform(mapper, value as never) as never)
          console.log(name, 'src:', value._id, 'dst:', id)
          return { [value._id]: id }
        })
      )

      mapper[name] = Object.assign(mapper[name], ...tmpMapper)

      result = await iterator.next()
    }
  }
}

main()
