// Bulk carousel generator.
//
//   node src/generate.mjs [--engine bank|ai] [--sign leo|all] [--theme <arc>] [--count N]
//                         [--seed S] [--render] [--out out] [--format jpg|png] [--model ...]
//   node src/generate.mjs --list-themes
//   node src/generate.mjs --calendar 30 [--engine bank|ai] [--seed S]
//
// Writes content/generated/<id>.json and prints each carousel on one line.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SIGNS } from './schema.mjs'
import { ARCS, THEMES, generateBank } from './bank.mjs'
import { makeRng } from './rng.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GEN_DIR = path.join(ROOT, 'content', 'generated')

const USAGE = `usage:
  node src/generate.mjs [--engine bank|ai] [--sign <sign>|all] [--theme <theme>] [--count N]
                        [--seed S] [--render] [--out out] [--format jpg|png] [--model <id>]
  node src/generate.mjs --list-themes
  node src/generate.mjs --calendar 30 [--engine bank|ai] [--seed S] [--render]

  --engine   bank (offline phrase bank, default) or ai (Claude API, needs ANTHROPIC_API_KEY)
  --sign     one sign, or "all" to rotate through the twelve (default all)
  --theme    one advice theme (see --list-themes); default rotates themes
  --count    how many carousels (default 1, or 12 with --sign all)
  --seed     integer; same seed + args = same bank output (default: time-based, printed)
  --render   render the results with src/render.mjs
  --model    Claude model for --engine ai (default ALIGN_MODEL or claude-fable-5-1)`

function parseArgs(argv) {
  const o = { engine: 'bank', sign: 'all', theme: null, count: null, seed: null, render: false, out: null, format: null, model: null, listThemes: false, calendar: null, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    const val = () => {
      const v = argv[++i]
      if (v === undefined) throw new Error(`${a} needs a value`)
      return v
    }
    if (a === '--engine') o.engine = val()
    else if (a === '--sign') o.sign = val().toLowerCase()
    else if (a === '--theme') o.theme = val().toLowerCase()
    else if (a === '--count') o.count = parseInt(val(), 10)
    else if (a === '--seed') o.seed = parseInt(val(), 10)
    else if (a === '--render') o.render = true
    else if (a === '--out') o.out = val()
    else if (a === '--format') o.format = val()
    else if (a === '--model') o.model = val()
    else if (a === '--list-themes') o.listThemes = true
    else if (a === '--calendar') o.calendar = /^\d+$/.test(argv[i + 1] ?? '') ? parseInt(argv[++i], 10) : 30
    else if (a === '-h' || a === '--help') o.help = true
    else throw new Error(`unknown argument: ${a}`)
  }
  if (!['bank', 'ai'].includes(o.engine)) throw new Error(`--engine must be bank or ai`)
  if (o.sign !== 'all' && !SIGNS.includes(o.sign)) throw new Error(`--sign must be one of: all, ${SIGNS.join(', ')}`)
  if (o.theme && !THEMES.includes(o.theme) && o.engine === 'bank') throw new Error(`unknown theme "${o.theme}" (see --list-themes)`)
  if (o.count !== null && !(o.count > 0)) throw new Error('--count must be a positive integer')
  if (o.seed !== null && !Number.isFinite(o.seed)) throw new Error('--seed must be an integer')
  return o
}

/** jobs for a normal run: rotate signs and themes, no repeated sign+theme pair */
function planJobs({ sign, theme, count, seed }) {
  const rng = makeRng(seed ^ 0x5eed)
  const signs = sign === 'all' ? rng.shuffle(SIGNS) : [sign]
  const themes = theme ? [theme] : rng.shuffle(THEMES)
  const jobs = []
  const seen = new Set()
  for (let i = 0; jobs.length < count && i < count * 50; i++) {
    const s = signs[jobs.length % signs.length]
    // walk the theme list with an offset so each pass gives a sign a new theme
    let t = themes[(jobs.length + Math.floor(jobs.length / signs.length)) % themes.length]
    for (let k = 0; seen.has(`${s}|${t}`) && k < themes.length; k++) t = themes[(themes.indexOf(t) + 1) % themes.length]
    seen.add(`${s}|${t}`)
    jobs.push({ sign: s, theme: t })
  }
  return jobs
}

/** a posting plan: every sign once per 12 days, every theme once per pass, no pair twice */
function planCalendar(days, seed) {
  const rng = makeRng(seed ^ 0xca1e)
  const signs = rng.shuffle(SIGNS)
  const themes = rng.shuffle(THEMES)
  const plan = []
  const pairs = new Set()
  for (let d = 0; d < days; d++) {
    const sign = signs[d % signs.length]
    let ti = d % themes.length
    while (pairs.has(`${sign}|${themes[ti]}`)) ti = (ti + 1) % themes.length
    pairs.add(`${sign}|${themes[ti]}`)
    plan.push({ day: d + 1, sign, theme: themes[ti] })
  }
  return plan
}

function existingTitles() {
  const dirs = [path.join(ROOT, 'content'), GEN_DIR]
  const titles = []
  for (const dir of dirs) {
    if (!existsSync(dir)) continue
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue
      try {
        const c = JSON.parse(readFileSync(path.join(dir, f), 'utf8'))
        if (c.title) titles.push(c.title)
      } catch {}
    }
  }
  return titles
}

async function produce(jobs, o) {
  if (o.engine === 'bank') return generateBank({ jobs, seed: o.seed })
  const { generateAI } = await import('./ai.mjs')
  return generateAI({ jobs, seed: o.seed, model: o.model, existingTitles: existingTitles() })
}

async function save(carousels) {
  await mkdir(GEN_DIR, { recursive: true })
  for (const c of carousels) {
    await writeFile(path.join(GEN_DIR, `${c.id}.json`), JSON.stringify(c, null, 2) + '\n')
    console.log(`${c.id}  ${c.slides.map((s) => s.text.replace(/\n/g, ' ')).join(' / ')}`)
  }
}

async function render(carousels, o) {
  let mod
  try {
    mod = await import('./render.mjs')
  } catch (e) {
    console.error(`render: could not load src/render.mjs (${e.message}); JSON was still written to content/generated/`)
    process.exitCode = 1
    return
  }
  const opts = {}
  if (o.out) opts.out = path.resolve(o.out)
  if (o.format) opts.format = o.format
  await mod.renderCarousels(carousels, opts)
}

const csvCell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v))

async function main() {
  const o = parseArgs(process.argv.slice(2))
  if (o.help) return console.log(USAGE)
  if (o.listThemes) {
    for (const t of THEMES) console.log(`${t.padEnd(16)} ${ARCS[t].label}  [${ARCS[t].core.join(', ')}]`)
    return
  }
  if (o.seed === null) o.seed = Math.floor(Date.now() / 1000) % 1000000
  console.error(`seed ${o.seed}  engine ${o.engine}`)

  if (o.calendar) {
    const plan = planCalendar(o.calendar, o.seed)
    const carousels = await produce(plan, o)
    await save(carousels)
    const byKey = new Map(carousels.map((c) => [`${c.signs[0]}|${c.theme}`, c]))
    const rows = [['day', 'id', 'sign', 'theme', 'caption']]
    for (const p of plan) {
      const c = byKey.get(`${p.sign}|${p.theme}`)
      rows.push([p.day, c?.id ?? '(missing)', p.sign, c?.theme ?? p.theme, c?.caption ?? ''])
    }
    const file = path.join(GEN_DIR, 'calendar.csv')
    await writeFile(file, rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n')
    console.error(`calendar: ${plan.length} days -> ${path.relative(process.cwd(), file)}`)
    if (o.render) await render(carousels, o)
    return
  }

  const count = o.count ?? (o.sign === 'all' ? 12 : 1)
  const jobs = planJobs({ sign: o.sign, theme: o.theme, count, seed: o.seed })
  const carousels = await produce(jobs, o)
  await save(carousels)
  console.error(`${carousels.length} carousel(s) -> ${path.relative(process.cwd(), GEN_DIR)}/`)
  if (o.render) await render(carousels, o)
}

main().catch((e) => {
  console.error(e.code === 'NO_API_KEY' ? e.message : `error: ${e.message}`)
  process.exitCode = 1
})
