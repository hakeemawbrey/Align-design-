// npm run plan -- --count 240 [--out out/plan.json]
//
// Picks a batch of reels up front: an even share per sign (in zodiac order),
// half love and half self, no line used twice, and the worlds spread evenly.
// Render it with:  npm run render -- --from out/plan.json --jobs 4
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, SIGNS, loadLibrary } from './content.mjs'

const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf('--' + name)
  return i === -1 || args[i + 1] === undefined ? def : args[i + 1]
}
const COUNT = +opt('count', 240)
const OUT = path.resolve(ROOT, opt('out', 'out/plan.json'))

// The engine's worlds (engine/worlds.js + engine/worlds-extra.js).
const WORLDS = ['cavelake', 'poolrooms', 'meadow', 'checker', 'dunes', 'nightsea', 'snow', 'cloudtops', 'mallcourt', 'hallway', 'playground', 'moonbase']

const shuffle = (a) => {
  a = a.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const library = loadLibrary()
const per = Math.ceil(COUNT / SIGNS.length)
const bySign = {}
for (const sign of SIGNS) {
  const pool = library.filter((l) => l.sign === sign)
  const love = shuffle(pool.filter((l) => l.topic === 'love'))
  const self = shuffle(pool.filter((l) => l.topic === 'self'))
  const picked = []
  for (let i = 0; picked.length < per; i++) {
    const src = i % 2 === 0 ? love : self
    const l = src[Math.floor(i / 2) % src.length]
    picked.push(l)
  }
  bySign[sign] = shuffle(picked)
}

// zodiac order round after round, so any slice of the batch covers every sign
const items = []
for (let r = 0; items.length < COUNT; r++) {
  for (const sign of SIGNS) {
    if (items.length >= COUNT) break
    items.push(bySign[sign][r])
  }
}
let worlds = []
const plan = items.map((l) => {
  if (!worlds.length) worlds = shuffle(WORLDS)
  return {
    sign: l.sign, topic: l.topic, text: l.text, caption: l.caption, id: l.id,
    ...(l.core ? { core: l.core } : {}),
    seed: `${l.id}:${Math.floor(Math.random() * 36 ** 6).toString(36)}`,
    world: worlds.pop(),
  }
})

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(plan, null, 2))
const repeats = plan.length - new Set(plan.map((p) => p.id)).size
console.log(`${plan.length} reels planned → ${path.relative(process.cwd(), OUT)}`)
console.log(`  ${per} per sign, ${plan.filter((p) => p.topic === 'love').length} love / ${plan.filter((p) => p.topic === 'self').length} self, ${plan.filter((p) => p.core).length} carry an Align message, ${repeats} repeated lines`)
