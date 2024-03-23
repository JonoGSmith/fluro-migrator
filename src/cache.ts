import fs from 'fs'
import fsPromise from 'node:fs/promises'
import path from 'path'

import type { Cache, CacheObject } from './load/types'

// Reads the cache from ./tmp/cache
export async function loadCache(): Promise<Cache> {
  const cache: Cache = {}

  const walk = async (
    base: string,
    dir: string = base,
    filelist: string[] = []
  ): Promise<string[]> => {
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
    cache[file] = JSON.parse(cacheFile) as {
      [fluroId: string]: CacheObject
    }
  }

  return cache
}

export async function saveCache(name: string, contents: string): Promise<void> {
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
