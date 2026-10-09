// Export print files for the SF-01 cards.
//
//   node print/sf-cards/render.mjs            proof + letter sheets PDF + 12 front PNGs + back PNG
//   node print/sf-cards/render.mjs --all      also every numbered front (12 × 15 PNGs) for a print shop
//
// PNGs are 825 × 1125 px: 2.75 × 3.75 in at 300 dpi (2.5 × 3.5 in card + 1/8 in bleed).
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, 'out')
const page$ = (q) => `${pathToFileURL(join(here, 'cards.html')).href}?${q}`
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const ALL = process.argv.includes('--all')

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const ready = (p) => p.waitForSelector('body[data-ready="1"]').then(() => p.waitForLoadState('networkidle'))

async function shot(q, file) {
  const p = await browser.newPage({ viewport: { width: 264, height: 360 }, deviceScaleFactor: 300 / 96 })
  await p.goto(page$(q)); await ready(p)
  await p.locator('.card').screenshot({ path: file, omitBackground: true })
  await p.close()
}

await mkdir(join(out, 'print-files'), { recursive: true })
await mkdir(join(here, 'grounds'), { recursive: true })

// card backgrounds, one per sign, rendered once and reused by every card (keeps the PDF small)
for (const s of SIGNS) {
  const p = await browser.newPage({ viewport: { width: 264, height: 360 }, deviceScaleFactor: 300 / 96 })
  await p.goto(page$(`view=ground&sign=${s}`)); await ready(p)
  await p.locator('.ppanel').screenshot({ path: join(here, 'grounds', `${s}.jpg`), type: 'jpeg', quality: 92 })
  await p.close()
}

// screen proof
{
  const p = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 2 })
  await p.goto(page$('view=proof')); await ready(p)
  await p.screenshot({ path: join(out, 'proof.png'), fullPage: true })
  await p.close()
}

// 600 dpi image of each design (serial hidden), so the sheets print sharp: soft glows and
// fades would otherwise be rasterised by Chromium at a lower resolution inside the PDF
await mkdir(join(here, 'hires'), { recursive: true })
async function hires(q, file) {
  const p = await browser.newPage({ viewport: { width: 264, height: 360 }, deviceScaleFactor: 600 / 96 })
  await p.goto(page$(q)); await ready(p)
  await p.locator('.card').screenshot({ path: join(here, 'hires', file), type: 'jpeg', quality: 95 })
  await p.close()
}
await hires('view=card&side=back', 'back.jpg')
for (const s of SIGNS) await hires(`view=card&side=front&sign=${s}&noserial=1`, `front-${s}.jpg`)
for (const s of SIGNS) await hires(`view=card&side=front&sign=${s}`, `front-${s}-blank.jpg`)

// home / office print: letter, 3×3, crop marks, fronts + backs interleaved for duplex
{
  const p = await browser.newPage()
  await p.goto(page$('view=sheet&raster=1')); await ready(p)
  await p.pdf({ path: join(out, 'SF-01-letter-sheets.pdf'), width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true })
  await p.close()
}
// Chromium repeats identical objects per card; merge them (needs python3 + pypdf, skipped if missing)
{
  const res = spawnSync('python3', [join(here, 'compact-pdf.py'), join(out, 'SF-01-letter-sheets.pdf')], { stdio: 'inherit' })
  if (res.status !== 0) console.warn('PDF not compacted (pip install pypdf); it is still valid, just larger')
}

// one of each design, one card per page at bleed size (2.75 × 3.75 in): back first, then the 12 fronts
{
  const p = await browser.newPage()
  await p.goto(page$('view=designs')); await ready(p)
  await p.pdf({ path: join(out, 'SF-01-designs-1-each.pdf'), width: '2.75in', height: '3.75in', printBackground: true, preferCSSPageSize: true, pageRanges: '1-13' })
  await p.close()
}

// print-shop files (bleed included)
await shot('view=card&side=back', join(out, 'print-files', 'back.png'))
for (const s of SIGNS) {
  if (ALL) {
    await mkdir(join(out, 'print-files', 'numbered', s), { recursive: true })
    for (let n = 1; n <= 15; n++)
      await shot(`view=card&side=front&sign=${s}&n=${n}`, join(out, 'print-files', 'numbered', s, `${s}-${String(n).padStart(2, '0')}.png`))
  }
  await shot(`view=card&side=front&sign=${s}`, join(out, 'print-files', `front-${s}.png`))
}

await browser.close()
console.log('done →', out)
