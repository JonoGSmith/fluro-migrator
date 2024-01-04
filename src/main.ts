import 'dotenv/config'
import { tuples } from './tuples'
import type { Mapper } from './load/types'
import fs from 'fs'
import fsPromise from 'node:fs/promises'
import path from 'path'
import { SingleBar } from 'cli-progress'
import colors from 'ansi-colors'

async function main() {
  const mapper: Mapper = await loadMapper()

  for (const [name, extract, transform, load] of tuples) {
    if (mapper[name] == null) mapper[name] = {}

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

    progress.start(result.value.max, 0)

    while (!result.done) {
      const tmpMapper = await Promise.all(
        result.value.collection.map(async (value) => {
          if (mapper[name][value._id] != null) {
            progress.increment()
            return { [value._id]: mapper[name][value._id] }
          } else {
            const mapperObject = await load(
              transform(mapper, value as never) as never
            )
            progress.increment()
            return { [value._id]: mapperObject }
          }
        })
      )

      mapper[name] = Object.assign(mapper[name], ...tmpMapper)

      await saveMapper(name, JSON.stringify(mapper[name], null, 2))
      result = await iterator.next()
    }
    progress.stop()
  }
}

async function loadMapper() {
  const mapper: Mapper = {}

  const walk = async (
    base: string,
    dir: string = base,
    filelist: string[] = []
  ) => {
    const files = await fsPromise.readdir(dir)

    for (const file of files) {
      const filepath = path.join(dir, file)
      const stat = await fsPromise.stat(filepath)

      if (stat.isDirectory()) {
        filelist = await walk(base, filepath, filelist)
      } else {
        filelist.push(filepath.replace(`${base}/`, '').replace('.json', ''))
      }
    }

    return filelist
  }

  const files = await walk(path.join(__dirname, '..', 'tmp', 'mapper'))

  for (const file of files) {
    const cache = await fsPromise.readFile(
      path.join(__dirname, '..', 'tmp', 'mapper', `${file}.json`),
      'utf8'
    )
    mapper[file] = JSON.parse(cache)
  }

  return mapper
}

async function saveMapper(name: string, contents: string) {
  if (name.includes('/')) {
    const pathWithoutFile = name.split('/')
    pathWithoutFile.pop()
    const dir = path.join(__dirname, '..', 'tmp', 'mapper', ...pathWithoutFile)

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }

  await fsPromise.writeFile(
    path.join(__dirname, '..', 'tmp', 'mapper', `${name}.json`),
    contents,
    { flag: 'w' }
  )
}

main()
