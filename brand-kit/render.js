// Renders deck.html to Align-Brand-Kit.pdf, plus one PNG per slide for review.
// Usage (from the repo root): node brand-kit/render.js [outdir]
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

;(async () => {
  const out = process.argv[2] || __dirname
  fs.mkdirSync(path.join(out, 'png'), { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('file://' + path.join(__dirname, 'deck.html'), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 })
  const slides = await page.$$('section.s')
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: path.join(out, 'png', `slide-${String(i + 1).padStart(2, '0')}.png`) })
  }
  await page.pdf({ path: path.join(out, 'Align-Brand-Kit.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
  console.log('slides', slides.length, 'errors', JSON.stringify(errors))
  await browser.close()
})()
