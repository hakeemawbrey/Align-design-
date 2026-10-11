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

const S = {
  intro: '1 · Intro', ob: '2 · Onboarding', deck: '3 · Tonight’s deck', sky: '4 · Today’s sky', chat: '5 · Match + chat',
  matches: '6 · Matches + trading', binder: '7 · Binder + packs', you: '8 · You', guide: '9 · Chart + calendar',
  club: '10 · Club', plus: '11 · Limits + Align+', notif: '12 · Notifications',
}
const scrollPhone = (p, y) => p.evaluate((y) => {
  const els = [...document.querySelectorAll('#phone *')].filter((e) => e.scrollHeight > e.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(e).overflowY))
  els.sort((a, b) => b.clientHeight - a.clientHeight)
  if (els[0]) els[0].scrollTop = y
}, y)
const swipe = async (p, dx) => {
  const bb = await p.locator('#phone').boundingBox()
  const x = bb.x + bb.width / 2, y = bb.y + bb.height * 0.45
  await p.mouse.move(x, y); await p.mouse.down()
  for (let i = 1; i <= 10; i++) { await p.mouse.move(x + (dx * i) / 10, y + i); await p.waitForTimeout(16) }
  await p.mouse.up()
}

// 1 · Intro
await safe('intro', async () => {
  const p = await fresh()
  await go(p, 'splash', 2200); await shot(p, S.intro, 'Splash', 0)
  await go(p, 'welcome', 2500); await shot(p, S.intro, 'Welcome', 0)
  await go(p, 'dealing', 1100); await shot(p, S.intro, 'Dealing your deck', 0)
  await p.context().close()
})

// 2 · Onboarding: every step, the asides, then the founding offer
await safe('onboarding', async () => {
  const p = await fresh()
  await go(p, 'onboarding', 2600)
  const names = ['Arrival', 'Birth date', 'Birth time + city', 'Your birth sky', 'Sign reveal', 'Your user manual', 'Big three', 'Chart check', 'Venus', 'Element weather', 'The card rule', 'Dealbreakers', 'Your card · face last', 'The field']
  for (let i = 0; i < names.length; i++) {
    await shot(p, S.ob, names[i], i === 0 ? 0 : 2400)
    if (i < names.length - 1) await cta(p).click({ timeout: 8000 }).catch(() => {})
  }
  await p.context().close()
})
await safe('onboarding asides', async () => {
  const p = await fresh()
  await go(p, 'onboarding', 600)
  await p.evaluate(() => { const k = 'align:session:v1'; const s = JSON.parse(localStorage.getItem(k) || '{}'); s.obStep = 6; localStorage.setItem(k, JSON.stringify(s)) })
  await go(p, 'onboarding', 2600); await shot(p, S.ob, 'Welcome back · saved your place', 0)
  await p.evaluate(() => { const k = 'align:session:v1'; const s = JSON.parse(localStorage.getItem(k) || '{}'); s.obStep = 0; localStorage.setItem(k, JSON.stringify(s)) })
  await go(p, 'onboarding', 2600)
  await cta(p).click({ timeout: 6000 }).catch(() => {}); await p.waitForTimeout(2200)
  // roll the year wheel to its newest year: under 18 gets the age gate
  const yr = await p.locator('#phone').getByText('1998', { exact: true }).first().boundingBox()
  if (yr) { await p.mouse.move(yr.x + yr.width / 2, yr.y + yr.height / 2); for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(25) } await p.waitForTimeout(1200) }
  await cta(p).click({ timeout: 6000 }).catch(() => {}); await shot(p, S.ob, 'Under 18 · age gate', 1800)
  await go(p, 'founding', 4500); await shot(p, S.ob, 'Founding member offer', 0)
  await p.locator('#phone').getByText('MONTHLY').first().click(); await shot(p, S.ob, 'Founding offer · monthly', 900)
  await p.context().close()
})

// 3 · Tonight's deck
await safe('deck', async () => {
  const p = await fresh()
  await go(p, 'deck', 2800); await shot(p, S.deck, 'Tonight’s deck · mystery card', 0)
  const card = p.locator('#phone').getByText('Maya, 24').first()
  const bb = await card.boundingBox()
  if (bb) { await p.mouse.move(bb.x + 100, bb.y + 160); await p.mouse.down(); await p.waitForTimeout(1500); await shot(p, S.deck, 'Hold to peek · photo opens', 0); await p.mouse.up(); await p.waitForTimeout(1800) }
  await shot(p, S.deck, 'Peek · sealing back up', 0)
  await p.waitForTimeout(1200)
  await card.click({ force: true }); await shot(p, S.deck, 'Expand card · the full read', 1400)
  await p.keyboard.press('Escape'); await p.waitForTimeout(900)
  await swipe(p, -260); await shot(p, S.deck, 'Released · next card', 1600)
  let gotEvent = false
  for (let i = 0; i < 6 && !gotEvent; i++) {
    if (await p.locator('#phone').getByText(/right to play it/).count()) { gotEvent = true; break }
    await swipe(p, -260); await p.waitForTimeout(1500)
  }
  if (gotEvent) {
    await shot(p, S.deck, 'Event card · tonight’s moon', 0)
    await swipe(p, -260); await shot(p, S.deck, 'Event saved to your hand', 700)
  }
  await p.waitForTimeout(1500)
  await p.getByRole('button', { name: /Your hand/ }).click(); await shot(p, S.deck, 'Your hand · events + packs', 1100)
  await p.context().close()
})

// 4 · Today's sky
await safe('sky', async () => {
  const p = await fresh()
  await go(p, 'sky', 2200); await shot(p, S.sky, 'Draw your three cards', 0)
  const backs = p.locator('#phone div[style*="perspective: 800px"]')
  for (let i = 0; i < 3; i++) { await backs.nth(i).click(); await p.waitForTimeout(700) }
  await shot(p, S.sky, 'Your reading + reward', 1200)
  await scrollPhone(p, 1200); await shot(p, S.sky, 'Tonight', 700)
  await p.getByRole('button', { name: 'WEEK' }).first().click({ force: true }); await shot(p, S.sky, 'This week', 800)
  await p.getByRole('button', { name: 'MOON' }).first().click({ force: true }); await shot(p, S.sky, 'Moon phases', 800)
  await p.context().close()
})

// 5 · Match, reveal and chat
await safe('match', async () => {
  const p = await fresh()
  await go(p, 'match', 3200); await shot(p, S.chat, 'You both aligned', 0)
  await go(p, 'reveal', 4200); await shot(p, S.chat, 'The reveal', 0)
  await p.goto(`${B}/`); await p.waitForTimeout(600); await p.keyboard.press('7'); await p.waitForTimeout(8500)
  await shot(p, S.chat, 'Chat with Juniper', 0)
  await p.getByText('☽ US TODAY').click(); await shot(p, S.chat, 'Us today', 800)
  await p.getByText('☽ US TODAY').click(); await p.waitForTimeout(500)
  await p.getByRole('button', { name: 'Talk cards' }).click(); await shot(p, S.chat, 'Card sheet · today’s card', 1000)
  await p.getByRole('button', { name: 'Your cards' }).click(); await shot(p, S.chat, 'Card sheet · your talk cards', 700)
  await p.getByRole('button', { name: 'Places' }).click(); await shot(p, S.chat, 'Card sheet · places', 700)
  await p.getByText('Agnes Cafe').click(); await p.waitForTimeout(3500); await shot(p, S.chat, 'Place card · it’s a date', 0)
  await p.getByPlaceholder('Say something').fill('Saturday works. I’ll bring the questions.')
  await shot(p, S.chat, 'Typing a message', 300)
  await p.getByRole('button', { name: 'Send' }).click(); await shot(p, S.chat, 'Sent', 900)
  await shot(p, S.chat, 'She replies', 3500)
  await p.getByRole('button', { name: 'Report or block' }).click(); await shot(p, S.chat, 'Report or block', 900)
  await go(p, 'alignment', 2500); await shot(p, S.chat, 'Alignment · pull', 0)
  for (const t of ['Push', 'Align', 'Relationship']) { await p.getByRole('button', { name: t, exact: true }).first().click({ force: true }); await shot(p, S.chat, `Alignment · ${t.toLowerCase()}`, 900) }
  await p.context().close()
})

// 6 · Matches, binder pages and trading
await safe('matches', async () => {
  const p = await fresh()
  await go(p, 'matches', 2200); await shot(p, S.matches, 'Your matches', 0)
  await p.getByRole('button', { name: /^Binder/i }).first().click(); await shot(p, S.matches, 'Binder pages · people', 1400)
  await go(p, 'matches', 2200)
  await p.locator('#phone').getByText('Anselm, 31').first().click(); await shot(p, S.matches, 'Thread · Anselm', 1500)
  await go(p, 'trade', 3000); await shot(p, S.matches, 'Trade a copy', 0)
  await p.context().close()
})

// 7 · Binder and packs
async function openPack(p, name, label) {
  await p.getByRole('button', { name }).first().click(); await shot(p, S.binder, `${label} · sealed`, 1500)
  const pk = p.locator('#phone div[style*="cursor: grab"]')
  const bb = await pk.boundingBox()
  await p.mouse.move(bb.x + 20, bb.y + 30); await p.mouse.down()
  for (let i = 1; i <= 7; i++) { await p.mouse.move(bb.x + 20 + i * 12, bb.y + 30); await p.waitForTimeout(40) }
  if (label === 'Align pack') await shot(p, S.binder, 'Pack · swipe to tear', 0)
  for (let i = 8; i <= 16; i++) { await p.mouse.move(bb.x + 20 + i * 12, bb.y + 30); await p.waitForTimeout(40) }
  await p.mouse.up(); await p.waitForTimeout(2200)
  if (label === 'Align pack') await shot(p, S.binder, 'Pack · torn open', 0)
  const card = p.locator('#phone div[style*="cursor: pointer"]').last()
  await card.click({ force: true }); await shot(p, S.binder, `${label} · card by card`, 900)
  if (label === 'Align pack') { await card.click({ force: true }); await shot(p, S.binder, 'Pack · next card', 900) }
  await p.getByText(/SHOW ALL/).click(); await shot(p, S.binder, `${label} · your pull`, 1800)
  await p.getByRole('button', { name: /Keep them/ }).click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(800)
}
await safe('binder', async () => {
  const p = await fresh()
  await go(p, 'collection', 1600); await shot(p, S.binder, 'Your binder · packs', 0)
  await openPack(p, /Align pack/, 'Align pack')
  await p.context().close()
})
await safe('talk pack', async () => {
  const p = await fresh()
  await go(p, 'collection', 1600)
  await openPack(p, /First Nights/, 'First Nights')
  await p.context().close()
})
await safe('sets', async () => {
  const p = await fresh()
  await go(p, 'collection', 1600)
  await p.getByRole('button', { name: 'Sets' }).click(); await shot(p, S.binder, 'Binder · sets', 700)
  await scrollPhone(p, 700); await shot(p, S.binder, 'Sets · signs, all 48', 600)
  await scrollPhone(p, 2400); await shot(p, S.binder, 'Sets · sky, events, talk, places', 600)
  await scrollPhone(p, 0); await p.waitForTimeout(300)
  await p.getByText('The Keeper').first().click({ force: true }); await shot(p, S.binder, 'Sign card · facts', 1000)
  await p.mouse.click(215, 820); await p.waitForTimeout(600)
  await p.getByRole('button', { name: 'Season' }).click(); await shot(p, S.binder, 'Binder · season + print runs', 700)
  await p.context().close()
})

// 8 · You
await safe('you', async () => {
  const p = await fresh()
  await go(p, 'you', 1800); await shot(p, S.you, 'You', 0)
  await scrollPhone(p, 900); await shot(p, S.you, 'You · Align+, settings, help', 600)
  await scrollPhone(p, 0); await p.waitForTimeout(400)
  await p.getByText('Face down to strangers').click(); await shot(p, S.you, 'Your card · mystery', 1300)
  await p.getByRole('button', { name: 'REVEALED' }).click(); await shot(p, S.you, 'Your card · revealed', 1800)
  await go(p, 'howto', 1500); await shot(p, S.you, 'How to play', 0)
  await scrollPhone(p, 900); await shot(p, S.you, 'How to play · cards and places', 600)
  await scrollPhone(p, 2000); await shot(p, S.you, 'How to play · energy and packs', 600)
  await scrollPhone(p, 9000); await shot(p, S.you, 'How to play · binder and Align+', 600)
  await p.context().close()
})

// 9 · Chart and calendar
await safe('chart', async () => {
  const p = await fresh()
  await go(p, 'chart', 2000); await shot(p, S.guide, 'Your chart · Sun', 0)
  for (const t of ['Moon', 'Rising', 'Traits', 'Element', 'Ruler', 'House']) { await p.getByRole('button', { name: t, exact: true }).first().click({ force: true }); await shot(p, S.guide, `Your chart · ${t}`, 900) }
  await go(p, 'calendar', 1800); await shot(p, S.guide, 'Cosmic calendar', 0)
  await p.getByRole('button', { name: '24', exact: true }).click(); await shot(p, S.guide, 'Calendar · picking a day', 800)
  await p.context().close()
})

// 10 · Club
await safe('club', async () => {
  const p = await fresh()
  await go(p, 'club', 2000); await shot(p, S.club, 'Club · your sign’s room', 0)
  await p.locator('#phone').getByText('Mireya, 28').first().click(); await shot(p, S.club, 'Post · replies', 1200)
  await go(p, 'club', 2000)
  await p.getByRole('button', { name: /Say it to the room/ }).click(); await shot(p, S.club, 'Write a post', 1200)
  await go(p, 'club', 2000)
  await p.locator('#phone').getByText(/Mercury goes direct/).first().click(); await shot(p, S.club, 'Tonight’s prompt', 1200)
  await p.context().close()
})

// 11 · Limits and Align+
await safe('plus', async () => {
  const p = await fresh()
  await go(p, 'spent', 2200); await shot(p, S.plus, 'Your deck is spent', 0)
  await go(p, 'paywall', 4000); await shot(p, S.plus, 'Align+ · yearly', 0)
  await p.locator('#phone').getByText('MONTHLY').first().click(); await shot(p, S.plus, 'Align+ · monthly', 900)
  await go(p, 'block', 1600); await shot(p, S.plus, 'Block a sign', 0)
  await p.getByRole('button', { name: /Choose signs to block/ }).click(); await shot(p, S.plus, 'Choose signs to block', 900)
  await p.getByRole('button', { name: /Gemini/ }).first().click(); await shot(p, S.plus, 'Blocking Gemini', 700)
  await p.context().close()
})

// 12 · Notifications
await safe('notif', async () => {
  const p = await fresh()
  await go(p, 'deck', 2400)
  await p.getByRole('button', { name: 'Notifications' }).click(); await shot(p, S.notif, 'Notifications', 1500)
  await p.context().close()
})

writeFileSync(`${OUT}/list.json`, JSON.stringify(list, null, 1))
console.log(`${list.length} screens`, errs.length ? '\nERRORS:\n' + errs.join('\n') : 'no errors')
await b.close()
