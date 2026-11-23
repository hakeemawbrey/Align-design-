// npm run pfp -- [--variants star,aura,popup,gaze] [--label align.exe] [--seed x] [--out pfp]
// Renders 1080×1080 profile pictures (PNG) from the reels' cast.
import fs from 'node:fs'
import path from 'node:path'
import { launchBrowser } from './browser.mjs'
import { serve } from './serve.mjs'
import { ROOT } from './content.mjs'

const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf('--' + name)
  return i === -1 || args[i + 1] === undefined ? def : args[i + 1]
}
const VARIANTS = opt('variants', 'star,aura,popup,gaze').split(',')
const SEED = opt('seed', 'align')
const LABEL = opt('label', 'align.exe')
const OUT = path.resolve(ROOT, opt('out', 'pfp'))
fs.mkdirSync(OUT, { recursive: true })

const server = await serve(0)
const browser = await launchBrowser()
const page = await browser.newPage()
page.on('pageerror', (e) => console.error('  page error:', e.message))
await page.goto(`http://127.0.0.1:${server.address().port}/index.html?pfp=1`)
await page.waitForFunction(() => window.PFP_READY === true, null, { timeout: 30000 })
for (const v of VARIANTS) {
  const url = await page.evaluate(([v, seed, label]) => window.PFP(v, { seed, label }), [v, SEED, LABEL])
  const file = path.join(OUT, `pfp-${v}.png`)
  fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'))
  console.log('  ✓', path.relative(process.cwd(), file))
}
await browser.close()
server.close()
