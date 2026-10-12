// Captures every newly built design state (the master Figma page's to-build sections) as 2x PNGs.
// Usage: npm run build && npx vite preview --port 4174, then: node scripts/capture-tobuild.mjs <out-dir>
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
const OUT = process.argv[2]
const B = process.argv[3] || 'http://localhost:4174'
mkdirSync(OUT, { recursive: true })
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const errs = []
const page = await (await b.newContext()).newPage()
await page.goto(`${B}/`); await page.waitForTimeout(800)
const groups = await page.evaluate(() => window.__alignShots)
const list = []
let n = 0
for (const [group, shots] of Object.entries(groups)) {
  for (const s of shots) {
    const ctx = await b.newContext({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 2 })
    const p = await ctx.newPage()
    p.on('pageerror', (e) => errs.push(`${s.name}: ${e.message}`))
    try {
      await p.goto(`${B}/`)
      if (s.session) await p.evaluate((patch) => { const k = 'align:session:v1'; const cur = JSON.parse(localStorage.getItem(k) || '{}'); localStorage.setItem(k, JSON.stringify({ ...cur, ...patch })) }, s.session)
      await p.goto(`${B}/#${s.hash}`); await p.reload(); await p.waitForTimeout(s.wait ?? 1600)
      n++
      const file = `t${String(n).padStart(2, '0')}.png`
      await p.locator('#phone').screenshot({ path: `${OUT}/${file}` })
      list.push({ file, group, name: s.name, hash: s.hash })
    } catch (e) { errs.push(`${s.name}: ${e.message.split('\n')[0]}`) }
    await ctx.close()
  }
}
writeFileSync(`${OUT}/list.json`, JSON.stringify(list, null, 1))
console.log(`${list.length} screens`, errs.length ? '\nERRORS:\n' + errs.join('\n') : 'no errors')
await b.close()
