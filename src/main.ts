import 'dotenv/config'
import { tuples } from './tuples'
import { Mapper } from './load/types'
import fs from 'node:fs/promises'
import path from 'path'

async function main() {
  const mapper: Mapper = {}

  for (const [name, extract, transform, load] of tuples) {
    try {
      const cache = await fs.readFile(
        path.join(__dirname, '..', 'tmp', `${name}Mapper.json`),
        'utf8'
      )
      mapper[name] = JSON.parse(cache)
    } catch (error) {
      mapper[name] = {}
    }

    // create extract iterator
    const iterator = await extract()

    // transform and load data
    let result = await iterator.next()
    while (!result.done) {
      const tmpMapper = await Promise.all(
        result.value.map(async (value) => {
          if (mapper[name][value._id] != null) {
            // cached
            console.log(
              name,
              'src:',
              value._id,
              'dst:',
              mapper[name][value._id],
              '(cached)'
            )
            return { [value._id]: mapper[name][value._id] }
          } else {
            // not cached
            const id = await load(transform(mapper, value as never) as never)
            console.log(name, 'src:', value._id, 'dst:', id)
            return { [value._id]: id }
          }
        })
      )

      mapper[name] = Object.assign(mapper[name], ...tmpMapper)

      result = await iterator.next()
    }

    await fs.writeFile(
      path.join(__dirname, '..', 'tmp', `${name}Mapper.json`),
      JSON.stringify(mapper[name]),
      { flag: 'w' }
    )
  }
}

main()
