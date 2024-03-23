import 'dotenv/config'
import colors from 'ansi-colors'
import { SingleBar } from 'cli-progress'
import { parse } from 'ts-command-line-args'

import { loadCache, saveCache } from './cache'
import type { Cache, CacheObject } from './load/types'
import { tuples } from './tuples'

interface CommandLineArguments {
  exclude?: string[]
  include?: string[]
  help?: boolean
}

const args = parse<CommandLineArguments>(
  {
    exclude: {
      type: String,
      optional: true,
      multiple: true,
      alias: 'e',
      description: 'skips running the named ETL process'
    },
    include: {
      type: String,
      optional: true,
      multiple: true,
      alias: 'i',
      description: 'runs only the named ETL process'
    },
    help: {
      type: Boolean,
      optional: true,
      alias: 'h',
      description: 'Prints this usage guide'
    }
  },
  {
    helpArg: 'help',
    headerContentSections: [
      {
        header: 'Fluro Migrator',
        content: 'Thanks for using Our Awesome Migrator!'
      }
    ],
    footerContentSections: [
      { header: 'Footer', content: `Made with ❤️ By Auckland Ev` }
    ]
  }
)

async function main(): Promise<void> {
  const cache: Cache = await loadCache()

  for (const [name, extract, transform, load] of tuples) {
    if (cache[name] == null) cache[name] = {}
    // skip if excluded
    if (args.exclude?.includes(name)) continue

    // skip if not included
    if (args.include?.includes(name) === false) continue

    // create extract iterator
    const iterator = await extract()

    // transform and load data
    let result = await iterator.next()

    const progress = new SingleBar({
      format: `${colors.cyan(
        '{bar}'
      )} ${name} | {percentage}% | {value}/{total} | duration: {duration_formatted}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    })

    progress.start((result.value as { max: number }).max, 0)

    while (!result.done) {
      const tmpCache = await Promise.all(
        result.value.collection.map(async (value) => {
          if (cache[name][value._id] != null) {
            progress.increment()
            return { [value._id]: cache[name][value._id] }
          } else {
            const cacheObject = await load(
              transform(cache, value as never) as never
            )
            progress.increment()
            return { [value._id]: cacheObject }
          }
        })
      )

      cache[name] = Object.assign(cache[name], ...tmpCache) as {
        [fluroId: string]: CacheObject
      }

      await saveCache(name, JSON.stringify(cache[name], null, 2))
      result = await iterator.next()
    }
    progress.stop()
  }
}

void main()
