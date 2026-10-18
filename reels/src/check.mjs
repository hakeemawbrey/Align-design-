// npm run check — validates every line in content/ against CONTENT.md.
import { checkLibrary } from './content.mjs'

const { problems, counts } = checkLibrary()
let total = 0
for (const [sign, c] of Object.entries(counts)) {
  total += c.love + c.self
  console.log(`${sign.padEnd(12)} love ${String(c.love).padStart(3)}  self ${String(c.self).padStart(3)}`)
}
console.log(`\n${total} lines`)
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  for (const p of problems) console.log('  ' + p)
  process.exit(1)
}
console.log('all good')
