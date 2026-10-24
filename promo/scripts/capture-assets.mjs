// Capture high-resolution promo assets from the Align app.
//
// Usage (from repo root):  node promo/scripts/capture-assets.mjs [--only=screens,cards,mark]
// Needs the Vite dev server running at http://127.0.0.1:5173
//   (cd app && npx vite --port 5173 --host 127.0.0.1)
// Output: promo/assets/*.png
//
// Screens: #phone at 390x844, deviceScaleFactor 3  -> 1170x2532 PNG.
// Isolated elements: transparent PNGs (everything except the target is hidden with
// visibility:hidden and the page background is omitted), rendered at a higher DSF.
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { execFileSync } from 'child_process'

const here = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(here, '../..')
const require = createRequire(path.join(ROOT, 'app/package.json'))
const { chromium } = require('playwright')

const BASE = process.env.ALIGN_URL || 'http://127.0.0.1:5173'
const OUT = path.join(ROOT, 'promo/assets')
fs.mkdirSync(OUT, { recursive: true })

const onlyArg = process.argv.find((a) => a.startsWith('--only='))
const ONLY = onlyArg ? new Set(onlyArg.split('=')[1].split(',')) : null
const want = (k) => !ONLY || ONLY.has(k)

const SCREEN_DSF = 3
const ELEMENT_DSF = 4

const browser = await chromium.launch({
  executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined,
  args: ['--autoplay-policy=no-user-gesture-required'],
})

const saved = []
const problems = []
const log = (...a) => console.log(...a)

/** A fresh page. 390x844 viewport puts PhoneFrame in bare mode at scale 1, #phone at (0,0). */
async function open(hash, { dsf = SCREEN_DSF, wait = 3000, holdSplash = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dsf })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => problems.push(`[${hash}] pageerror: ${e.message}`))
  if (holdSplash) {
    // keep the splash on screen: swallow the 2.9s "leave" timer
    await page.addInitScript(() => {
      const st = window.setTimeout
      window.setTimeout = (fn, ms, ...rest) => (ms === 2900 ? 0 : st(fn, ms, ...rest))
    })
  }
  await page.goto(`${BASE}/#${hash}`)
  await page.evaluate(() => document.fonts && document.fonts.ready)
  if (wait) await page.waitForTimeout(wait)
  page._ctx = ctx
  return page
}
const close = (page) => page._ctx.close()

async function screen(page, name) {
  const file = path.join(OUT, `${name}.png`)
  await page.locator('#phone').screenshot({ path: file, animations: 'allow' })
  saved.push(name + '.png')
  log('saved', name + '.png')
}

/**
 * Screenshot only the given elements on a transparent background.
 * handles: ElementHandle[]; pad: CSS px around the union box (for glows).
 * clipTo: optional ElementHandle whose box defines the crop instead of the union.
 */
async function isolated(page, name, handles, { pad = 24, clipTo = null, css = '', flatten = [] } = {}) {
  handles = handles.filter(Boolean)
  // flatten: elements whose own transform is neutralised (e.g. a card caught mid-flight)
  for (const f of flatten.filter(Boolean)) await f.evaluate((e) => e.setAttribute('data-isofix', ''))
  if (!handles.length) { problems.push(`${name}: target element not found`); log('MISSING', name); return }
  const box = await page.evaluate(([els, pad, clipEl, css]) => {
    els.forEach((e) => e.setAttribute('data-iso', ''))
    const st = document.createElement('style')
    st.id = '__iso'
    st.textContent = `
      html, body, #root { background: transparent !important; }
      #phone { background: transparent !important; }
      body * { visibility: hidden !important; }
      [data-iso], [data-iso] * { visibility: visible !important; }
      [data-isofix] { transform: none !important; opacity: 1 !important; }
      ${css}`
    document.head.appendChild(st)
    const rs = (clipEl ? [clipEl] : els).map((e) => e.getBoundingClientRect())
    const ph = document.getElementById('phone').getBoundingClientRect()
    const x0 = Math.max(ph.left, Math.min(...rs.map((r) => r.left)) - pad)
    const y0 = Math.max(ph.top, Math.min(...rs.map((r) => r.top)) - pad)
    const x1 = Math.min(ph.right, Math.max(...rs.map((r) => r.right)) + pad)
    const y1 = Math.min(ph.bottom, Math.max(...rs.map((r) => r.bottom)) + pad)
    return { x: Math.round(x0), y: Math.round(y0), width: Math.round(x1 - x0), height: Math.round(y1 - y0) }
  }, [handles, pad, clipTo, css])
  await page.waitForTimeout(120)
  const file = path.join(OUT, `${name}.png`)
  await page.screenshot({ path: file, clip: box, omitBackground: true })
  // drop fully transparent margins (glows are kept); skipped if ImageMagick is missing
  try { execFileSync('convert', [file, '-trim', '+repage', file]) } catch { /* optional */ }
  await page.evaluate(() => {
    document.getElementById('__iso')?.remove()
    document.querySelectorAll('[data-iso]').forEach((e) => e.removeAttribute('data-iso'))
    document.querySelectorAll('[data-isofix]').forEach((e) => e.removeAttribute('data-isofix'))
  })
  saved.push(name + '.png')
  log('saved', name + '.png', box)
}

/** first element in #phone matching a predicate (run in page) */
const find = (page, fnSrc, arg) => page.evaluateHandle(([src, arg]) => {
  // eslint-disable-next-line no-new-func
  const pred = new Function('el', 'arg', src)
  return [...document.querySelectorAll('#phone *')].find((el) => pred(el, arg)) || null
}, [fnSrc, arg]).then((h) => h.asElement())

const findAll = async (page, fnSrc, arg) => {
  const arr = await page.evaluateHandle(([src, arg]) => {
    const pred = new Function('el', 'arg', src)
    return [...document.querySelectorAll('#phone *')].filter((el) => pred(el, arg))
  }, [fnSrc, arg])
  const props = await arr.getProperties()
  return [...props.values()].map((h) => h.asElement()).filter(Boolean)
}

const press = async (page, key, wait = 600) => { await page.keyboard.press(key); await page.waitForTimeout(wait) }
const clickText = async (page, text, wait = 800) => {
  const loc = page.locator('#phone').getByText(text, { exact: false }).first()
  await loc.click({ timeout: 4000 })
  await page.waitForTimeout(wait)
}

// ---------------------------------------------------------------------------
// 1. Full screens
// ---------------------------------------------------------------------------
if (want('screens')) {
  const simple = [
    // id, wait ms
    ['welcome', 4000], ['deck', 3000], ['match', 4000], ['reveal', 9000], ['chat', 14000],
    ['alignment', 4000], ['sky', 3500], ['chart', 3500], ['collection', 3500], ['you', 3500],
    ['founding', 4000], ['paywall', 4000],
  ]
  {
    const p = await open('splash', { wait: 3300, holdSplash: true })
    await screen(p, 'screen-splash'); await close(p)
  }
  {
    // mid-deal: cards in flight, before the top card flips (FLIP_AT 1.95s)
    const p = await open('dealing', { wait: 1250 })
    await screen(p, 'screen-dealing'); await close(p)
    const q = await open('dealing', { wait: 2900 })
    await screen(q, 'screen-dealing-settled'); await close(q)
  }
  for (const [id, wait] of simple) {
    const p = await open(id, { wait })
    await screen(p, `screen-${id}`)
    await close(p)
  }
  // founding: claim -> gold card stamps down
  {
    const p = await open('founding', { wait: 3000 })
    await page_click_cta(p)
    await p.waitForTimeout(3500)
    await screen(p, 'screen-founding-claimed'); await close(p)
  }
  // chat with the hand of talk cards open
  {
    const p = await open('chat', { wait: 14000 })
    await p.locator('[aria-label="Talk cards"]').click()
    await p.waitForTimeout(1500)
    await screen(p, 'screen-chat-cards'); await close(p)
  }
  // onboarding steps (Enter advances; lock between steps is 380ms)
  {
    const p = await open('onboarding', { wait: 3000 })
    await screen(p, 'screen-onboarding-arrival')
    await press(p, 'Enter', 3000); await screen(p, 'screen-onboarding-birthdate')
    await press(p, 'Enter', 3000); await screen(p, 'screen-onboarding-birthtime')
    await press(p, 'Enter', 6000); await screen(p, 'screen-onboarding-sky')
    await press(p, 'Enter', 500) // ring done -> next (or finishes the ring)
    if (!(await find(p, `return el.style.perspective === '900px'`))) await press(p, 'Enter', 500)
    // sign card charges, then auto-flips 2.35s after the step mounts
    await p.waitForTimeout(900); await screen(p, 'screen-onboarding-sign-charging')
    await p.waitForTimeout(5000); await screen(p, 'screen-onboarding-sign-reveal')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-manual')
    await press(p, 'Enter', 4500); await screen(p, 'screen-onboarding-big-three')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-chart-check')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-venus')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-element')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-card-rule')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-dealbreakers')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-face-last')
    await press(p, 'Enter', 3500); await screen(p, 'screen-onboarding-field')
    await close(p)
  }
}

async function page_click_cta(p) {
  await p.locator('#phone .chrome-cta').first().click()
}

// ---------------------------------------------------------------------------
// 2. Isolated cards
// ---------------------------------------------------------------------------
if (want('cards')) {
  // --- deck: profile cards (veiled), event card ---
  {
    const p = await open('deck', { dsf: ELEMENT_DSF, wait: 3000 })
    const top = () => find(p, `return el.style.cursor === 'grab'`)
    let n = 0, ev = 0
    for (let i = 0; i < 14 && n < 6; i++) {
      const h = await top()
      if (!h) { problems.push(`deck: no top card at swipe ${i}`); break }
      const isEvent = await h.evaluate((el) => /WHY TONIGHT/i.test(el.innerText))
      if (isEvent) {
        if (!ev) { ev++; await isolated(p, 'card-event', [h], { pad: 30 }) }
      } else {
        n++
        await isolated(p, `card-profile-${n}`, [h], { pad: 30 })
      }
      await press(p, 'ArrowLeft', 1700)
    }
    // peeked (photo open) state of the next top card
    const h = await top()
    if (h) {
      await p.keyboard.down(' ')
      await p.waitForTimeout(1300)
      const h2 = await top()
      await isolated(p, 'card-profile-peek', [h2], { pad: 30 })
      await p.keyboard.up(' ')
    }
    await close(p)
  }
  // --- card back: the top card while it flies in face-down on the dealing screen ---
  {
    const p = await open('dealing', { dsf: ELEMENT_DSF, wait: 1500 })
    const backs = await findAll(p, `return el.tagName === 'svg' && !!el.querySelector('linearGradient[id="cb-bg"]')`)
    const last = backs[backs.length - 1]
    const card = last ? await last.evaluateHandle((s) => s.parentElement) : null
    // the top card is still springing in: flatten its flight transform (and the 0.95 deck scale)
    const flight = await find(p, `return el.style.perspective === '1400px'`)
    const scaled = card ? (await card.evaluateHandle((c) => c.parentElement)).asElement() : null
    const rotY = card ? (await card.evaluateHandle((c) => c.parentElement.parentElement.parentElement)).asElement() : null
    await isolated(p, 'card-back', [card?.asElement()], { pad: 30, flatten: [flight, rotY, scaled] })
    await close(p)
  }
  // --- reveal: the flipped card after the veil lifts ---
  {
    const p = await open('reveal', { dsf: ELEMENT_DSF, wait: 9000 })
    const persp = await find(p, `return el.style.perspective === '1500px'`)
    const card = persp ? (await persp.evaluateHandle((e) => e.parentElement)).asElement() : null
    await isolated(p, 'card-reveal', [card], { pad: 30 })
    await close(p)
    // face-down state of the same card (before the auto flip at 1.85s)
    const q = await open('reveal', { dsf: ELEMENT_DSF, wait: 1500 })
    const persp2 = await find(q, `return el.style.perspective === '1500px'`)
    const card2 = persp2 ? (await persp2.evaluateHandle((e) => e.parentElement)).asElement() : null
    await isolated(q, 'card-reveal-facedown', [card2], { pad: 30 })
    await close(q)
  }
  // --- talk cards: chat -> cards button -> hand sheet ---
  {
    const p = await open('chat', { dsf: 6, wait: 9000 })
    await p.locator('[aria-label="Talk cards"]').click()
    await p.waitForTimeout(1500)
    const daily = await find(p, `return el.style.width === '164px' && el.getBoundingClientRect().height > 250`)
    if (daily) await isolated(p, 'card-talk-daily', [daily], { pad: 16 })
    await clickText(p, 'Your cards', 1200)
    const hand = await findAll(p, `return el.style.width === '102px' && el.getBoundingClientRect().height > 150`)
    let k = 0
    for (const h of hand.slice(0, 6)) {
      const r = await h.boundingBox()
      if (!r || r.y + r.height > 844) continue // below the fold of the sheet
      k++
      await isolated(p, `card-talk-${k}`, [h], { pad: 10 })
    }
    if (!k && !daily) problems.push('talk cards: none found in hand sheet')
    await close(p)
  }
  // --- sign card: onboarding Taurus reveal ---
  {
    const p = await open('onboarding', { dsf: ELEMENT_DSF, wait: 2500 })
    await press(p, 'Enter', 1500) // birth
    await press(p, 'Enter', 1500) // time
    await press(p, 'Enter', 1500) // sky
    await press(p, 'Enter', 1000) // finish sky ring / next
    if (await p.locator('#phone').getByText('Read my sky').count()) await press(p, 'Enter', 1000)
    // the card auto-flips 2.35s after the step mounts: grab the face-down state quickly
    let persp = null
    for (let t = 0; t < 40 && !persp; t++) { persp = await find(p, `return el.style.perspective === '900px'`); if (!persp) await p.waitForTimeout(100) }
    await p.waitForTimeout(600)
    if (persp) await isolated(p, 'card-sign-back', [persp], { pad: 30 })
    await p.waitForTimeout(5000) // auto flip + settle
    const persp2 = await find(p, `return el.style.perspective === '900px'`)
    const stamp = await find(p, `return el.textContent.trim() === '✦ YOUR CARD'`)
    if (persp2) {
      await isolated(p, 'card-sign', [persp2], { pad: 30 })
      await isolated(p, 'card-sign-stamped', [persp2, stamp], { pad: 30 })
    } else problems.push('card-sign: sign reveal not reached')
    await close(p)
  }
  // --- founding member gold card ---
  {
    const p = await open('founding', { dsf: ELEMENT_DSF, wait: 3000 })
    await page_click_cta(p)
    await p.waitForTimeout(3500)
    const card = await find(p, `return el.style.width === '236px' && el.style.height === '316px' && el.style.borderRadius === '20px'`)
    // straighten it: drop the -3deg stamp rotation and the idle bob
    const bob = card ? (await card.evaluateHandle((c) => c.parentElement)).asElement() : null
    const stampEl = card ? (await card.evaluateHandle((c) => c.parentElement.parentElement)).asElement() : null
    await isolated(p, 'card-founding', [card], { pad: 40, flatten: [bob, stampEl] })
    await close(p)
  }
}

// ---------------------------------------------------------------------------
// 3. The Align mark + wordmark (from the splash), scaled up in place
// ---------------------------------------------------------------------------
if (want('mark')) {
  const p = await open('splash', { dsf: 3, wait: 3400, holdSplash: true })
  const svg = await find(p, `return el.tagName === 'svg' && el.parentElement && el.parentElement.style.left === '133px'`)
  const word = await find(p, `return el.textContent === 'Align' && el.classList.contains('serif')`)
  // natural size lockup first
  if (svg && word) await isolated(p, 'align-lockup', [svg, word], { pad: 30 })
  // mark alone, scaled 3x around its centre (vector, so it stays crisp) -> ~1120px
  if (svg) {
    const wrap = (await svg.evaluateHandle((s) => s.parentElement)).asElement()
    await wrap.evaluate((w) => { w.style.transform = 'scale(2.9)'; w.style.transformOrigin = '62px 62px' })
    await p.waitForTimeout(200)
    await isolated(p, 'align-mark', [svg], { pad: 16 })
    await wrap.evaluate((w) => { w.style.transform = '' })
  } else problems.push('align-mark: svg not found')
  if (word) {
    await word.evaluate((w) => { w.style.transform = 'scale(2.5)'; w.style.transformOrigin = '50% 50%' })
    await p.waitForTimeout(200)
    // the div is full width; crop to the text
    const textBox = await word.evaluate((w) => {
      const r = document.createRange(); r.selectNodeContents(w); const b = r.getBoundingClientRect()
      return { left: b.left, top: b.top, width: b.width, height: b.height }
    })
    const span = await p.evaluateHandle((b) => {
      const d = document.createElement('div')
      Object.assign(d.style, { position: 'fixed', left: b.left + 'px', top: b.top + 'px', width: b.width + 'px', height: b.height + 'px', pointerEvents: 'none' })
      document.body.appendChild(d); return d
    }, textBox)
    await isolated(p, 'align-wordmark', [word], { pad: 24, clipTo: span.asElement() })
  }
  await close(p)
}

await browser.close()
log(`\n${saved.length} files written to ${OUT}`)
if (problems.length) log('PROBLEMS:\n' + problems.join('\n'))
