import 'dotenv/config'
import { tuples } from './tuples'
import { Mapper } from './load/types'

async function main() {
  const loaderMap: Mapper = {}

  for (const [name, extract, transform, load] of tuples) {
    loaderMap[name] = {}

    // create extract iterator
    const iterator = await extract()

    // transform and load data
    let result = await iterator.next()
    while (!result.done) {
      const mapper = await Promise.all(
        result.value.map(async (value) => {
          const id = await load(loaderMap, transform(value as never) as never)
          console.log(name, 'src:', value._id, 'dst:', id)
          return { [value._id]: id }
        })
      )

      loaderMap[name] = Object.assign(loaderMap[name], ...mapper)

      result = await iterator.next()
    }
  }
}

main()
