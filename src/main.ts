import 'dotenv/config'
import { tuples } from './tuples'
import type { Cache } from './load/types'
import fs from 'fs'
import fsPromise from 'node:fs/promises'
import path from 'path'
import { SingleBar } from 'cli-progress'
import colors from 'ansi-colors'

async function main() {
  const cache: Cache = await loadCache()

  for (const [name, extract, transform, load] of tuples) {
    if (cache[name] == null) cache[name] = {}

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

      cache[name] = Object.assign(cache[name], ...tmpCache)

      await saveCache(name, JSON.stringify(cache[name], null, 2))
      result = await iterator.next()
    }
    progress.stop()
  }
}

async function loadCache() {
  const cache: Cache = {}

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

  const basePath = path.join(__dirname, '..', 'tmp', 'cache')
  if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true })

  const files = await walk(basePath)

  for (const file of files) {
    const cacheFile = await fsPromise.readFile(
      path.join(__dirname, '..', 'tmp', 'cache', `${file}.json`),
      'utf8'
    )
    cache[file] = JSON.parse(cacheFile)
  }

  return cache
}

async function saveCache(name: string, contents: string) {
  if (name.includes('/')) {
    const pathWithoutFile = name.split('/')
    pathWithoutFile.pop()
    const dir = path.join(__dirname, '..', 'tmp', 'cache', ...pathWithoutFile)

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }

  await fsPromise.writeFile(
    path.join(__dirname, '..', 'tmp', 'cache', `${name}.json`),
    contents,
    { flag: 'w' }
  )
}

void main()
