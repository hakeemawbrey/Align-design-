// Usage: node scripts/shot.mjs <screenId> [outFile] [waitMs] [--actions=file.mjs]
// Starts against a running dev server at http://localhost:5173 (run `npx vite --port 5173` first).
// Screenshots just the 390x844 phone canvas.
import { chromium } from 'playwright'

const [screen = 'splash', out = `/tmp/shot-${screen}.png`, wait = '1500'] = process.argv.slice(2).filter(a => !a.startsWith('--'))
const actionsArg = process.argv.find(a => a.startsWith('--actions='))
const port = process.env.PORT || 5173

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] }).catch(() => chromium.launch())
const page = await browser.newPage({ viewport: { width: 500, height: 950 }, deviceScaleFactor: 2 })
const errors = []
page.on('pageerror', e => errors.push(e.message))
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
await page.goto(`http://localhost:${port}/#${screen}`)
await page.waitForTimeout(Number(wait))
if (actionsArg) {
  const mod = await import(new URL(actionsArg.split('=')[1], `file://${process.cwd()}/`).href)
  await mod.default(page)
}
await page.locator('#phone').screenshot({ path: out })
console.log('saved', out)
if (errors.length) console.log('PAGE ERRORS:\n' + errors.join('\n'))
await browser.close()
