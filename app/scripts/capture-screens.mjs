// Captures every demo screen, in demo order, as 2x PNGs of the 390x844 phone.
// Usage: npm run build && npx vite preview --port 4174, then: node scripts/capture-screens.mjs <out-dir>
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
const OUT = process.argv[2]
const B = process.argv[3] || 'http://localhost:4174'
mkdirSync(OUT, { recursive: true })
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const list = []
let n = 0
const errs = []

async function fresh() {
  const ctx = await b.newContext({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 2 })
  const p = await ctx.newPage()
  p.on('pageerror', (e) => errs.push(e.message))
  return p
}
async function shot(p, section, name, wait = 900) {
  await p.waitForTimeout(wait)
  n++
  const file = `${String(n).padStart(2, '0')}.png`
  await p.locator('#phone').screenshot({ path: `${OUT}/${file}` })
  list.push({ file, section, name })
}
const go = async (p, hash, wait = 1600) => { await p.goto(`${B}/#${hash}`); await p.reload(); await p.waitForTimeout(wait) }
const safe = async (label, fn) => { try { await fn() } catch (e) { errs.push(`${label}: ${e.message.split('\n')[0]}`) } }
const cta = (p) => p.locator('#phone .chrome-cta:visible').last()

// 1 · Intro
await safe('intro', async () => {
  const p = await fresh()
  await go(p, 'splash', 2200); await shot(p, '1 · Intro', 'Splash', 0)
  await go(p, 'welcome', 2500); await shot(p, '1 · Intro', 'Welcome', 0)
  await go(p, 'dealing', 1100); await shot(p, '1 · Intro', 'Dealing your deck', 0)
  await p.context().close()
})

// 2 · Onboarding: every step, then the founding offer
await safe('onboarding', async () => {
  const p = await fresh()
  await go(p, 'onboarding', 2600)
  const names = ['Arrival', 'Birth date', 'Birth time + city', 'Your birth sky', 'Sign reveal', 'Your user manual', 'Big three', 'Chart check', 'Venus', 'Element weather', 'The card rule', 'Dealbreakers', 'Your card · face last', 'The field']
  for (let i = 0; i < names.length; i++) {
    await shot(p, '2 · Onboarding', names[i], i === 0 ? 0 : 2400)
    if (i < names.length - 1) await cta(p).click({ timeout: 8000 }).catch(() => {})
  }
  await go(p, 'founding', 4500); await shot(p, '2 · Onboarding', 'Founding member offer', 0)
  await p.context().close()
})

// 3 · Tonight's deck
await safe('deck', async () => {
  const p = await fresh()
  await go(p, 'deck', 2800); await shot(p, '3 · Tonight’s deck', 'Tonight’s deck · mystery card', 0)
  // hold to peek
  const card = p.locator('#phone').getByText('Maya, 24').first()
  const bb = await card.boundingBox()
  if (bb) { await p.mouse.move(bb.x + 100, bb.y + 160); await p.mouse.down(); await p.waitForTimeout(1500); await shot(p, '3 · Tonight’s deck', 'Hold to peek', 0); await p.mouse.up(); await p.waitForTimeout(1500) }
  await p.getByRole('button', { name: /Your hand/ }).click(); await shot(p, '3 · Tonight’s deck', 'Your hand · events + packs', 1100)
  await p.keyboard.press('Escape'); await p.mouse.click(215, 120); await p.waitForTimeout(600)
  await p.context().close()
})
await safe('sky', async () => {
  const p = await fresh()
  await go(p, 'sky', 2200); await shot(p, '3 · Tonight’s deck', 'Today’s sky · draw your three cards', 0)
  const backs = p.locator('#phone div[style*="perspective: 800px"]')
  for (let i = 0; i < 3; i++) { await backs.nth(i).click(); await p.waitForTimeout(700) }
  await shot(p, '3 · Tonight’s deck', 'Today’s sky · your reading + reward', 1200)
  const sc = p.locator('#phone div[style*="130px"]').first()
  await sc.evaluate((e) => { e.scrollTop = 1200 }); await shot(p, '3 · Tonight’s deck', 'Today’s sky · tonight, week, moon', 700)
  await go(p, 'spent', 2200); await shot(p, '3 · Tonight’s deck', 'Your deck is spent', 0)
  await go(p, 'paywall', 4000); await shot(p, '3 · Tonight’s deck', 'Align+ paywall', 0)
  await p.context().close()
})

// 4 · Match, reveal and chat
await safe('match', async () => {
  const p = await fresh()
  await go(p, 'match', 3200); await shot(p, '4 · Match + chat', 'You both aligned', 0)
  await go(p, 'reveal', 4200); await shot(p, '4 · Match + chat', 'The reveal', 0)
  await p.goto(`${B}/`); await p.waitForTimeout(600); await p.keyboard.press('7'); await p.waitForTimeout(8500)
  await shot(p, '4 · Match + chat', 'Chat with Juniper', 0)
  await p.getByText('☽ US TODAY').click(); await shot(p, '4 · Match + chat', 'Us today', 800)
  await p.getByText('☽ US TODAY').click(); await p.waitForTimeout(500)
  await p.getByRole('button', { name: 'Talk cards' }).click(); await shot(p, '4 · Match + chat', 'Card sheet · today’s card', 1000)
  await p.getByRole('button', { name: 'Your cards' }).click(); await shot(p, '4 · Match + chat', 'Card sheet · your talk cards', 700)
  await p.getByRole('button', { name: 'Places' }).click(); await shot(p, '4 · Match + chat', 'Card sheet · places', 700)
  await p.getByText('Agnes Cafe').click(); await p.waitForTimeout(3500); await shot(p, '4 · Match + chat', 'Place card · it’s a date', 0)
  await go(p, 'alignment', 2500); await shot(p, '4 · Match + chat', 'Cosmic alignment reading', 0)
  await p.context().close()
})

// 5 · Matches, binder pages and trading
await safe('matches', async () => {
  const p = await fresh()
  await go(p, 'matches', 2200); await shot(p, '5 · Matches + trading', 'Your matches', 0)
  await p.getByRole('button', { name: /^Binder/i }).first().click(); await shot(p, '5 · Matches + trading', 'Binder pages · people', 1400)
  await go(p, 'trade', 3000); await shot(p, '5 · Matches + trading', 'Trade a copy', 0)
  await p.context().close()
})

// 6 · Binder and packs
await safe('binder', async () => {
  const p = await fresh()
  await go(p, 'collection', 1600); await shot(p, '6 · Binder + packs', 'Your binder · packs', 0)
  await p.getByRole('button', { name: /Align pack/ }).first().click(); await shot(p, '6 · Binder + packs', 'Pack · sealed', 1500)
  const pk = p.locator('#phone div[style*="cursor: grab"]')
  const bb = await pk.boundingBox()
  await p.mouse.move(bb.x + 20, bb.y + 30); await p.mouse.down()
  for (let i = 1; i <= 7; i++) { await p.mouse.move(bb.x + 20 + i * 12, bb.y + 30); await p.waitForTimeout(40) }
  await shot(p, '6 · Binder + packs', 'Pack · swipe to tear', 0)
  for (let i = 8; i <= 16; i++) { await p.mouse.move(bb.x + 20 + i * 12, bb.y + 30); await p.waitForTimeout(40) }
  await p.mouse.up(); await p.waitForTimeout(2200)
  const card = p.locator('#phone div[style*="cursor: pointer"]').last()
  await card.click({ force: true }); await shot(p, '6 · Binder + packs', 'Pack · card by card', 900)
  await p.getByText(/SHOW ALL/).click(); await shot(p, '6 · Binder + packs', 'Pack · your pull', 1800)
  await p.getByRole('button', { name: /Keep them/ }).click(); await p.waitForTimeout(800)
  await p.getByRole('button', { name: 'Sets' }).click(); await shot(p, '6 · Binder + packs', 'Binder · sets', 700)
  await p.getByText('The Keeper').first().click({ force: true }); await shot(p, '6 · Binder + packs', 'Sign card · facts', 1000)
  await p.mouse.click(215, 820); await p.waitForTimeout(600)
  await p.getByRole('button', { name: 'Season' }).click(); await shot(p, '6 · Binder + packs', 'Binder · season + print runs', 700)
  await p.context().close()
})

// 7 · You
await safe('you', async () => {
  const p = await fresh()
  await go(p, 'you', 1800); await shot(p, '7 · You', 'You', 0)
  await p.getByText('Face down to strangers').click(); await shot(p, '7 · You', 'Your card · mystery', 1300)
  await p.getByRole('button', { name: 'REVEALED' }).click(); await shot(p, '7 · You', 'Your card · revealed', 1800)
  await go(p, 'howto', 1500); await shot(p, '7 · You', 'How to play', 0)
  await go(p, 'chart', 2000); await shot(p, '7 · You', 'Your chart', 0)
  await go(p, 'calendar', 1800); await shot(p, '7 · You', 'Cosmic calendar', 0)
  await go(p, 'block', 1600); await shot(p, '7 · You', 'Block a sign', 0)
  await go(p, 'notifications', 1600); await shot(p, '7 · You', 'Notifications', 0)
  await go(p, 'club', 2000); await shot(p, '7 · You', 'Club · your sign’s room', 0)
  await p.context().close()
})

writeFileSync(`${OUT}/list.json`, JSON.stringify(list, null, 1))
console.log(`${list.length} screens`, errs.length ? '\nERRORS:\n' + errs.join('\n') : 'no errors')
await b.close()
