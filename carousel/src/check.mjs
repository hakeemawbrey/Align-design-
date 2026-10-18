// Validate every carousel JSON under content/ (recursively).
//
//   node src/check.mjs [files or dirs ...]

import { readFile } from 'node:fs/promises'
import { statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validate } from './schema.mjs'
import { jsonFiles } from './render.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const files = args.length
  ? args.flatMap((p) => (statSync(p).isDirectory() ? jsonFiles(p) : [p]))
  : jsonFiles(path.join(ROOT, 'content'))

let bad = 0
const ids = new Map()
for (const f of files) {
  const rel = path.relative(process.cwd(), f)
  let c
  try {
    c = JSON.parse(await readFile(f, 'utf8'))
  } catch (e) {
    bad++
    console.log(`✗ ${rel}\n    - unreadable JSON: ${e.message}`)
    continue
  }
  const problems = validate(c)
  // Two files with one id would overwrite each other's renders.
  if (c?.id && ids.has(c.id)) problems.push(`id "${c.id}" also used by ${ids.get(c.id)}`)
  if (c?.id) ids.set(c.id, rel)
  if (c?.id && path.basename(f, '.json') !== c.id) problems.push(`filename should be ${c.id}.json`)
  if (problems.length) {
    bad++
    console.log(`✗ ${rel}\n    - ${problems.join('\n    - ')}`)
  } else {
    console.log(`✓ ${rel}`)
  }
}
console.log(`\n${files.length - bad}/${files.length} valid`)
if (bad) process.exitCode = 1
