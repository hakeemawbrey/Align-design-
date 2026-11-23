// Houston Star Talk · w03 stories, part A (hst061–hst068). Grammar: htxstar/w03.js (story wrapper) on starrace/ep.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table } from '../starrace/ep.js'
import { label, sparkles, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { story, Y, Kp, Kin, nightSet, porch, cafe, pond, paddleBoat, duck, museum, foodStreet, boilYard, newspaperTable, crawfish, batBridge, trail, lawn, feederTwo, phone, partySet, heartPop, mosquito, sunset, dayFill, tree, bowl, coffeeShop, car, freeway, heatSun, kolache, klobasnek } from './w03.js'
import { BRAKE, HGREEN, overheadSign, streetSign, skyline, taco, sweat } from './kit.js'

const crockpot = (x, cx, cy, k = 1) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -70, -40, 140, 90, '#c0603a', 6); box(x, -80, -56, 160, 20, '#8a3a2a', 5); box(x, -16, -76, 32, 16, INK, 3); x.fillStyle = GOLD; x.fillRect(-50, 0, 100, 10); x.restore() }
function scroll(x, cx, top, k, items) {
  if (k <= 0) return
  const h = 70 + items.length * 70 * k
  box(x, cx - 220, top, 440, h, '#f4efe4', 6); box(x, cx - 240, top - 20, 480, 30, '#c9a77a', 5)
  items.forEach((s, i) => { if (70 + (i + 1) * 70 <= h + 10) txt(x, '✓ ' + s, cx, top + 70 + i * 70, { size: 36, col: INK }) })
}

// ── hst061 · The aunties found out you're still single (Heights porch)
const aunties = {
  hook: 'The aunties | just found out | you\'re *single*', key: 'F',
  closing: "Bring them Jan 9. We'll behave.", endStars: ['cancer', 'taurus', 'pisces', 'leo'],
  lesson: ['Distance is just minutes.', 'Effort is everything.'],
  lessonSet: (x, t) => porch(x, t), lessonCast: { cancer: [[0, 300, Y + 40, 200]], taurus: [[0, 780, Y + 40, 200]] }, lessonMood: { cancer: 'heart', taurus: 'heart' }, lessonWear: { cancer: ['glasses'], taurus: ['glasses'] },
  scenes: [
    { dur: 3.6, set: (x, t) => porch(x, t), front: (x, t) => mosquito(x, 540, 620, t, 1.6),
      cast: { cancer: [[0, 250, Y, 300], [0.6, 330, Y - 20, 340]], taurus: [[0, 830, Y, 300], [0.6, 750, Y - 20, 340]] }, mood: { cancer: 'squint', taurus: 'squint' }, hops: { cancer: [0.05], taurus: [0.12] },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[0.6, 'tick'], [0.7, 'tick']],
      lines: [[0.5, 2.9, 'cancer', 'Still single, baby? | In THIS humidity?']] },
    { dur: 3.8, set: (x, t) => porch(x, t),
      cast: { cancer: [[0, 300, Y, 260]], taurus: [[0, 780, Y, 260]], pisces: [[0, 540, Y - 120, 150]] }, mood: { cancer: 'happy', taurus: 'wink', pisces: 'sparkle' },
      wear: { cancer: ['glasses'], taurus: ['glasses'] },
      lines: [[0.2, 1.6, 'taurus', 'We only ask | because we love you.'], [2.0, 1.7, 'cancer', 'And because | we have a list.']] },
    { dur: 4.2, set: (x, t) => porch(x, t), back: (x, t, lt) => scroll(x, 540, 560, clamp(lt / 1.6), ['INSIDE THE LOOP', 'GOOD FAMILY', 'SHARES THE QUESO', 'OWNS A CROCKPOT']),
      cast: { cancer: [[0, 220, Y, 230]], taurus: [[0, 860, Y, 230]] }, mood: { cancer: 'squint', taurus: 'happy' }, wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[0.1, 'whoosh']],
      lines: [[2.0, 2.0, 'taurus', 'Owns a crockpot. | For the one cold day.']] },
    { dur: 3.8, set: (x, t) => porch(x, t), back: (x, t, lt) => phone(x, 540, 700, lt, [['r', "I'm kind of talking", 0.2], ['r', 'to someone?', 0.6]], { w: 560, h: 380 }),
      cast: { cancer: [[0, 280, Y, 260]], taurus: [[0, 800, Y, 260]] }, mood: { cancer: lt => lt < 1.1 ? 'neutral' : 'wide', taurus: lt => lt < 1.1 ? 'neutral' : 'wide' }, hops: { cancer: [1.1], taurus: [1.15] },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[1.1, 'scratch']],
      lines: [[1.3, 1.1, 'cancer', 'WHAT SIGN.'], [2.5, 1.2, 'taurus', 'Where do | they live??']] },
    { dur: 3.8, set: (x, t) => porch(x, t), back: (x, t, lt) => phone(x, 540, 700, lt, [['r', 'Pearland.', 0.1]], { w: 560, h: 300 }),
      cast: { cancer: [[0, 280, Y, 260]], taurus: [[0, 800, Y, 260]], pisces: [[0, 540, Y - 60, 150], [0.8, 540, Y + 140, 150]] }, mood: { cancer: 'wide', taurus: 'wide', pisces: lt => lt < 0.8 ? 'wide' : 'sleepy' },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[0.8, 'womp']],
      lines: [[0.7, 1.4, 'cancer', 'PEARLAND?? | That\'s 30 minutes!'], [2.3, 1.4, 'taurus', '...without | traffic.']] },
    { dur: 4.0, set: (x, t) => porch(x, t), back: (x, t, lt) => phone(x, 540, 700, lt, [['r', 'They drive up every', 1.4], ['r', 'Sunday. Even in rain.', 1.8]], { w: 600, h: 380 }),
      cast: { cancer: [[0, 280, Y, 260]], taurus: [[0, 800, Y, 260]] }, mood: { cancer: 'squint', taurus: lt => lt < 2.4 ? 'squint' : 'sparkle' },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[2.4, 'crickets']],
      lines: [[0.2, 1.1, 'taurus', 'Do they | make the drive?'], [2.6, 1.3, 'cancer', '...every | Sunday?']] },
    { dur: 3.8, set: (x, t) => porch(x, t), front: (x, t, lt) => heartPop(x, t, lt, 540, 900, 0.2),
      cast: { cancer: [[0, 300, Y, 270]], taurus: [[0, 780, Y, 270]], pisces: [[0, 540, Y - 140, 150]] }, mood: { cancer: 'heart', taurus: 'heart', pisces: 'heart' }, hops: { pisces: [0.2, 0.8, 1.4] },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[0.2, 'cheer']],
      lines: [[0.3, 1.6, 'cancer', 'Distance is | just minutes, baby.'], [2.1, 1.6, 'taurus', 'Showing up is | the whole thing.']] },
    { dur: 3.4, set: (x, t) => porch(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); crockpot(x, cx - s * 0.55, cy + 40, Kp(lt, 0.2)) },
      cast: { cancer: [[0, 280, Y, 250]], taurus: [[0, 820, Y, 250]] }, mood: { cancer: 'wink', taurus: 'happy' },
      wear: { cancer: ['glasses'], taurus: ['glasses'] }, sfx: [[0.2, 'pop', 660]],
      lines: [[0.3, 1.3, 'taurus', 'Bring them | to dinner.'], [1.8, 1.4, 'cancer', "We'll behave. | Mostly."]] },
  ],
}

// ── shared bits for part A
const ON_AIR = (x) => { box(x, 210, 548, 150, 56, BRAKE, 5); txt(x, '● LIVE', 285, 577, { size: 28, col: BONE, font: MONO, weight: 700 }) }
/** the booth's CRT: inside(cx, cy, w, h) paints the picture; replay adds VHS lines */
function tv(x, t, inside, { cx = 540, cy = 760, w = 700, h = 460, replay = false } = {}) {
  box(x, cx - w / 2 - 30, cy - h / 2 - 30, w + 60, h + 60, '#5a4a6a', 10)
  box(x, cx - w / 2, cy - h / 2, w, h, '#0e1630', 6)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); inside?.(cx, cy, w, h)
  for (let y = cy - h / 2; y < cy + h / 2; y += 8) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(cx - w / 2, y, w, 3) }
  if (replay) { const yy = cy - h / 2 + ((t * 300) % h); x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(cx - w / 2, yy, w, 14); txt(x, '▶ REPLAY', cx - w / 2 + 120, cy - h / 2 + 40, { size: 34, col: BONE, font: MONO, weight: 700 }) }
  x.restore()
  for (const dx of [-120, 120]) box(x, cx + dx - 10, cy + h / 2 + 30, 20, 60, '#5a4a6a', 4)
}
function deskFront(x, col = '#2b5fb0') { box(x, 40, 1330, 1000, 200, col, 8); x.fillStyle = BONE; x.fillRect(40, 1330, 1000, 12); txt(x, 'STAR TALK', 540, 1440, { size: 60, col: BONE }) }
/** a café patio on the TV: a mural strip, a table, two small stars and an optional speech bubble */
function patioShot(x, t, cx, cy, w, h, { a = 'libra', b = 'leo', ma = 'happy', mb = 'happy', say = null, sayL = true, extra } = {}) {
  const cols = ['#ff8fb1', '#ffd36b', '#7dffb0', '#8fe3ff', '#c9a6ff']
  for (let k = 0; k < 5; k++) { x.fillStyle = cols[k]; x.fillRect(cx - w / 2 + k * w / 5, cy - h / 2, w / 5 + 1, h * 0.62) }
  x.fillStyle = '#6a5a4a'; x.fillRect(cx - w / 2, cy + h * 0.12, w, h)
  box(x, cx - 150, cy + 60, 300, 24, '#8a5530', 5); box(x, cx - 10, cy + 84, 20, 100, '#8a5530', 4)
  signChar(x, t, a, cx - 170, cy + 40, 130, { mood: ma, seed: 4 }); signChar(x, t, b, cx + 170, cy + 40, 130, { mood: mb, seed: 9 })
  streetSign(x, cx + 150, cy - h / 2 + 60, 'MONTROSE', { pole: false, k: 0.6 })
  extra?.()
  if (say) { x.font = `800 30px Inter`; const tw = Math.min(w - 40, x.measureText(say).width + 40), bx = clamp(sayL ? cx - 170 : cx + 170, cx - w / 2 + 20 + tw / 2, cx + w / 2 - 20 - tw / 2); box(x, bx - tw / 2, cy - 110, tw, 54, BONE, 4); txt(x, say, bx, cy - 82, { size: 30, col: INK }) }
}
function tumbleweed(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.rotate(t * 5); x.strokeStyle = '#a8865a'; x.lineWidth = 5 * s; for (let k = 0; k < 7; k++) { x.beginPath(); x.arc(0, 0, (20 + k * 6) * s, k, k + 4); x.stroke() } x.restore() }
function rain(x, t, a = 1) { x.save(); x.globalAlpha = a; x.strokeStyle = 'rgba(190,230,255,0.8)'; x.lineWidth = 4; for (let k = 0; k < 60; k++) { const px = (k * 89) % 1080, py = ((t * 1400 + k * 157) % 1500) + 200; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 12, py + 40); x.stroke() } x.restore() }
function clockTag(x, s, k = 1, bg = GOLD) { label(x, 540, 640, s, k, { size: 52, bg, rot: -0.03, font: MONO, weight: 700 }) }
function bottle(x, cx, cy, k = 1) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -20, -50, 40, 100, '#8fe3ff', 5); box(x, -12, -66, 24, 16, BONE, 4); x.restore() }
function itinerary(x, cx, cy, k, rows, done = -1, rot = -0.04) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -300, -260, 600, 560, '#a8723f', 8); box(x, -270, -220, 540, 490, BONE, 4); box(x, -60, -280, 120, 50, '#8f96a0', 5)
  rows.forEach((r, i) => { txt(x, r, -240, -160 + i * 100, { size: 36, col: INK, font: MONO, weight: 700, align: 'left' }); if (i <= done) { x.strokeStyle = BRAKE; x.lineWidth = 7; x.beginPath(); x.moveTo(-250, -160 + i * 100); x.lineTo(250, -160 + i * 100); x.stroke() } })
  x.restore()
}
function rainCloud(x, cx, cy, t) { for (const [dx, r] of [[-70, 60], [0, 80], [70, 60]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, cy, r + 6, 0, Math.PI * 2); x.fill() } for (const [dx, r] of [[-70, 60], [0, 80], [70, 60]]) { x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(cx + dx, cy, r, 0, Math.PI * 2); x.fill() } }
function shopPair(x, t) { feederTwo(x, t); for (const cx of [250, 830]) { x.save(); x.translate(cx, 1140); x.scale(0.62, 0.62); coffeeShop(x, 0, 0); x.restore() } }
function thermo(x, s, k = 1, col = BRAKE) { label(x, 540, 640, s, k, { size: 60, bg: col, color: BONE, rot: -0.03, font: MONO, weight: 700 }) }
function blanket(x, cx = 540, cy = 1360) { box(x, cx - 360, cy - 30, 720, 70, '#e05a5a', 6); for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(cx - 360 + k * 120 + 40, cy - 30, 40, 70) } }

// ── hst062 · We're LIVE from your first date (the booth, a Montrose patio)
const S62 = (x, t, opts, tvo) => { x.fillStyle = '#20183a'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#261d46' : '#1d1638'; x.fillRect(k * 135, 0, 135, 1920) } tv(x, t, (cx, cy, w, h) => patioShot(x, t, cx, cy, w, h, opts), tvo); ON_AIR(x) }
const B62 = { gemini: ['headset', '#5ec8ff'], sagittarius: ['headset', PINK] }
const booth = (extra = {}) => ({ gemini: [[0, 290, 1190, 230]], sagittarius: [[0, 790, 1190, 230]], ...extra })
const live = {
  hook: "We're LIVE from | your first date", key: 'A',
  closing: 'Live from Jan 9. Be there.', endStars: ['gemini', 'sagittarius', 'libra', 'pisces'],
  lesson: ['Skip the interview.', 'Ask what they love.'],
  lessonSet: (x, t) => S62(x, t, { ma: 'heart', mb: 'heart' }), lessonCast: booth(), lessonMood: { gemini: 'heart', sagittarius: 'heart' }, lessonWear: B62,
  scenes: [
    { dur: 3.6, set: (x, t) => S62(x, t, {}), front: (x) => deskFront(x), cast: booth(), mood: { gemini: 'sparkle', sagittarius: 'happy' }, hops: { gemini: [0.05, 0.5], sagittarius: [0.15] }, wear: B62,
      lines: [[0.4, 2.8, 'gemini', "AND WE'RE LIVE | from your first date!"]] },
    { dur: 3.8, set: (x, t) => S62(x, t, {}), front: (x, t) => { deskFront(x); mosquito(x, 700, 700, t, 1.4) }, cast: booth(), mood: { gemini: 'happy', sagittarius: 'squint' }, wear: B62,
      lines: [[0.2, 1.6, 'sagittarius', 'Montrose patio. | Bold choice.'], [2.0, 1.7, 'gemini', 'Mosquitoes are | in attendance.']] },
    { dur: 3.8, set: (x, t) => S62(x, t, { say: "where'd you go to high school?", sayL: false }), front: (x) => deskFront(x), cast: booth(), mood: { gemini: 'wide', sagittarius: 'wide' }, hops: { gemini: [0.9], sagittarius: [0.95] }, wear: B62, sfx: [[0.9, 'boom']],
      lines: [[1.0, 1.4, 'gemini', 'THE HOUSTON | QUESTION!'], [2.5, 1.2, 'sagittarius', 'A classic | opener.']] },
    { dur: 3.8, set: (x, t, lt) => S62(x, t, { ma: 'neutral', mb: 'neutral', extra: () => tumbleweed(x, 140 + lt * 220, 900, t) }), front: (x) => deskFront(x),
      cast: booth({ pisces: [[0, 540, 1100, 140]] }), mood: { gemini: 'neutral', sagittarius: 'neutral', pisces: 'wide' }, look: { gemini: [1, 0], sagittarius: [-1, 0] }, wear: B62, sfx: [[0.3, 'crickets']],
      lines: [[1.6, 1.0, 'sagittarius', 'Dead air.'], [2.7, 1.0, 'gemini', "We're losing | them."]] },
    { dur: 3.8, set: (x, t) => S62(x, t, { mb: 'squint', extra: () => { box(x, 680, 840, 50, 80, INK, 4); x.fillStyle = '#5ec8ff'; x.fillRect(686, 848, 38, 60) } }, { replay: true }), front: (x) => deskFront(x), cast: booth(), mood: { gemini: 'eyeroll', sagittarius: 'squint' }, wear: B62, sfx: [[0.1, 'tape']],
      lines: [[0.4, 1.6, 'sagittarius', 'Phone check. | Under the table.'], [2.3, 1.2, 'gemini', 'Brutal.']] },
    { dur: 3.8, set: (x, t) => S62(x, t, { say: 'flour or corn tortilla?', sayL: true, ma: 'sparkle' }), front: (x) => deskFront(x), cast: booth(), mood: { gemini: 'wide', sagittarius: 'sparkle' }, hops: { gemini: [0.6], sagittarius: [0.65] }, wear: B62, sfx: [[0.6, 'scratch']],
      lines: [[0.8, 1.4, 'gemini', 'A REAL | QUESTION!'], [2.4, 1.3, 'sagittarius', 'Now we have | a date.']] },
    { dur: 4.0, set: (x, t, lt) => S62(x, t, { say: lt < 1.4 ? 'FLOUR. obviously.' : '...corn??', sayL: lt >= 1.4, ma: lt < 1.4 ? 'squint' : 'happy', mb: 'happy', extra: () => { if (lt > 2.2) sparkles(x, t, 540, 820, t - lt + 2.2, 10, 200, 3, [PINK, GOLD]) } }), front: (x) => deskFront(x),
      cast: booth(), mood: { gemini: lt => lt < 2.2 ? 'wide' : 'heart', sagittarius: lt => lt < 2.2 ? 'wide' : 'heart' }, hops: { gemini: [2.2, 2.6], sagittarius: [2.3, 2.7] }, wear: B62, sfx: [[2.2, 'cheer']],
      lines: [[0.4, 1.2, 'sagittarius', 'They disagree!'], [2.3, 1.6, 'gemini', "...and they're | LAUGHING."]] },
    { dur: 3.4, set: (x, t) => S62(x, t, { ma: 'heart', mb: 'heart' }), front: (x) => deskFront(x), cast: booth({ pisces: [[0, 540, 1100, 150]] }), mood: { gemini: 'sparkle', sagittarius: 'sparkle', pisces: 'heart' }, wear: B62, sfx: [[0.3, 'sob']],
      lines: [[0.3, 1.4, 'sagittarius', "They've been | talking an hour."], [1.9, 1.4, 'gemini', 'We need | a minute.']] },
  ],
}

// ── hst063 · Virgo planned your whole date to the minute
const PLAN = ['6:00 BAYOU WALK', '6:20 PADDLE BOATS', '6:45 MUSEUM', '7:30 DINNER']
const V = { virgo: ['clipboard'] }
const plan = {
  hook: 'Virgo planned | your whole date | to the minute', key: 'D',
  closing: 'Jan 9 is the only plan.', endStars: ['virgo', 'aries', 'pisces', 'taurus'],
  lesson: ['Plan the date.', "Don't plan the feelings."],
  lessonSet: (x, t) => pond(x, t, { sky: ['#ffb38a', '#e08aa0', '#5a4a90'] }), lessonCast: { virgo: [[0, 330, Y + 40, 210]], aries: [[0, 750, Y + 40, 210]] }, lessonMood: { virgo: 'heart', aries: 'heart' },
  scenes: [
    { dur: 3.6, set: (x, t) => { dayFill(x, '#8fd3ff', '#ffe3b0', 1920); tree(x, 950, 1300, 1, '#2f6a3a', t) }, back: (x, t, lt) => itinerary(x, 380, 880, 1, PLAN, -1, -0.04 + 0.02 * Math.sin(t * 2)),
      cast: { virgo: [[0, 820, Y + 60, 250]] }, mood: { virgo: 'sparkle' }, hops: { virgo: [0.05, 0.6] }, wear: V,
      lines: [[0.5, 2.8, 'virgo', 'Your date. | Minute by minute.']] },
    { dur: 3.8, set: (x, t) => pond(x, t), front: (x, t, lt) => paddleBoat(x, 540, 1290, '#ff8fb1', Math.sin(lt * 3) * 0.15),
      cast: { virgo: [[0, 400, 1160, 200]], aries: [[0, 680, 1160, 200]] }, mood: { virgo: 'happy', aries: 'wide' }, wear: V, sfx: [[0.1, 'blip', 1046.5]], stick: [[0.1, 1.2, '6:20 ✓', MINT]],
      lines: [[1.0, 1.3, 'aries', 'Why are we | spinning?'], [2.5, 1.2, 'virgo', 'Ahead of | schedule.']] },
    { dur: 3.6, set: (x, t) => pond(x, t, { water: '#4a6a80', grass: '#3a6a3a' }), front: (x, t, lt) => { paddleBoat(x, 540, 1290, '#ff8fb1'); rainCloud(x, 540, 380, t); rain(x, t) },
      cast: { virgo: [[0, 400, 1160, 200]], aries: [[0, 680, 1160, 200]] }, mood: { virgo: 'wide', aries: 'happy' }, wear: V, sfx: [[0.3, 'womp']], stick: [[0.2, 1.3, '6:31 RAIN?!', BRAKE]],
      lines: [[1.6, 1.8, 'virgo', 'Rain was NOT | on the list.']] },
    { dur: 3.6, set: (x, t) => pond(x, t), front: (x, t, lt) => { paddleBoat(x, 540, 1290, '#ff8fb1'); heatSun(x, 880, 380, t, 80) },
      cast: { virgo: [[0, 400, 1160, 200]], aries: [[0, 680, 1160, 200]] }, mood: { virgo: 'eyeroll', aries: 'happy' }, hops: { aries: [1.9] }, wear: V,
      lines: [[0.3, 1.4, 'virgo', 'And now | sunny AGAIN?'], [1.9, 1.5, 'aries', "That's Houston, | baby."]] },
    { dur: 3.8, set: (x, t) => museum(x, t),
      cast: { virgo: [[0, 860, Y, 220], [1.0, 780, Y, 220]], aries: [[0, 470, Y, 220]] }, mood: { virgo: 'squint', aries: 'sparkle' }, look: { aries: [0, -1] }, wear: V,
      lines: [[0.3, 1.5, 'aries', 'Wait. Look at | this one.'], [2.0, 1.6, 'virgo', 'We have | four minutes.']] },
    { dur: 3.8, set: (x, t) => museum(x, t), back: (x, t, lt) => { for (let k = 0; k < 5; k++) { const ph = clamp((lt - 0.4 - k * 0.15) / 1.2); x.save(); x.translate(560 + k * 70 + ph * 300, 1000 - ph * 500 + k * 40); x.rotate(ph * 4 + k); box(x, -40, -50, 80, 100, BONE, 4); x.restore() } },
      cast: { virgo: [[0, 540, Y, 250]], pisces: [[0, 170, Y - 40, 150]] }, mood: { virgo: 'wide', pisces: 'wide' }, hops: { virgo: [0.3, 0.6, 0.9] }, wear: V, sfx: [[0.3, 'scratch']],
      lines: [[0.4, 1.6, 'virgo', "We're 19 minutes | BEHIND."], [2.2, 1.4, 'virgo', 'Dinner is | RUINED.']] },
    { dur: 3.8, set: (x, t) => museum(x, t),
      cast: { virgo: [[0, 330, Y, 230]], aries: [[0, 750, Y, 230]] }, mood: { virgo: lt => lt < 1.6 ? 'wide' : 'neutral', aries: 'heart' }, wear: V, sfx: [[1.5, 'crickets']],
      lines: [[0.2, 1.4, 'aries', "Best date | I've had."], [2.6, 1.1, 'aries', 'Food truck?']] },
    { dur: 3.6, set: (x, t) => { dayFill(x, '#ffb38a', '#ffe3b0', 1920); x.fillStyle = '#b8a88a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 600, 700, 420, 420, '#ff9a3c', 8); box(x, 650, 760, 320, 160, '#1b1236', 6); txt(x, 'TACOS', 810, 1000, { size: 64, col: INK }) },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); taco(x, cx - s * 0.5, cy + 30, 1.2); if (lt > 1.4) heartPop(x, t, lt, 540, 1000, 1.4) },
      cast: { virgo: [[0, 280, Y, 230]], aries: [[0, 560, Y, 230]] }, mood: { virgo: lt => lt < 1.4 ? 'squint' : 'heart', aries: 'happy' }, wear: { virgo: [] },
      lines: [[0.2, 1.2, 'virgo', '...okay.'], [1.6, 1.8, 'virgo', 'This is better | than my plan.']] },
  ],
}

// ── hst064 · Your date was across the feeder road
const across = {
  hook: 'Your date was | across the | feeder road', key: 'E',
  closing: 'Jan 9. Same side of the road.', endStars: ['capricorn', 'scorpio', 'pisces', 'aquarius'],
  lesson: ['Say exactly where you are.', 'Literally and emotionally.'],
  lessonSet: (x, t) => shopPair(x, t), lessonCast: { capricorn: [[0, 420, Y + 60, 200]], scorpio: [[0, 660, Y + 60, 200]] }, lessonMood: { capricorn: 'heart', scorpio: 'heart' },
  scenes: [
    { dur: 3.6, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 250, Y + 80, 200]], scorpio: [[0, 830, Y + 80, 200]] }, mood: { capricorn: 'happy', scorpio: 'happy' }, hops: { capricorn: [0.05], scorpio: [0.2] },
      lines: [[0.4, 2.8, 'capricorn', "I'm here. | Where are you?"]] },
    { dur: 3.8, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 250, Y + 80, 200]], scorpio: [[0, 830, Y + 80, 200]] }, mood: { capricorn: 'squint', scorpio: 'squint' }, look: { capricorn: [-1, 0], scorpio: [1, 0] },
      lines: [[0.2, 1.6, 'scorpio', "I'm HERE. | Coffee place."], [2.0, 1.6, 'capricorn', 'The one on | the feeder?']] },
    { dur: 3.8, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 250, Y + 80, 200]], scorpio: [[0, 830, Y + 80, 200]] }, mood: { capricorn: 'wide', scorpio: 'wide' }, look: { capricorn: [1, 0], scorpio: [-1, 0] }, hops: { capricorn: [0.4], scorpio: [0.45] }, sfx: [[0.4, 'womp']],
      stick: [[0.3, 2.0, 'SAME SHOP. OTHER SIDE.', GOLD]], lines: [[2.4, 1.3, 'capricorn', '...oh no.']] },
    { dur: 3.6, set: (x, t) => shopPair(x, t), front: (x, t, lt) => car(x, 250 + ease.inOutCubic(clamp(lt / 3)) * 380, 1290, '#5ec8ff', { s: 0.9 }),
      cast: { capricorn: [[0, 260, 1180, 170], [3.0, 640, 1180, 170]] }, mood: { capricorn: 'squint' },
      lines: [[0.2, 1.8, 'capricorn', "I'll come to you. | Texas U-turn."]] },
    { dur: 3.8, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 830, Y + 80, 200]], scorpio: [[0, 250, Y + 80, 200]] }, mood: { capricorn: 'wide', scorpio: 'wide' }, hops: { capricorn: [0.3], scorpio: [0.35] }, sfx: [[0.3, 'scratch']],
      stick: [[0.2, 1.4, 'THEY SWAPPED.', BRAKE]], lines: [[1.8, 1.8, 'scorpio', 'I came to YOU!']] },
    { dur: 3.8, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 830, Y + 80, 200]], scorpio: [[0, 250, Y + 80, 200]], pisces: [[0, 540, 960, 140]] }, mood: { capricorn: 'squint', scorpio: 'eyeroll', pisces: 'heart' }, sfx: [[0.2, 'sob']],
      lines: [[0.2, 1.5, 'pisces', 'This is so | romantic *sob*'], [2.0, 1.6, 'capricorn', 'Okay. Stop. | Stay put.']] },
    { dur: 3.8, set: (x, t) => shopPair(x, t), cast: { capricorn: [[0, 830, Y + 80, 200], [2.4, 640, Y + 80, 200]], scorpio: [[0, 250, Y + 80, 200], [2.4, 440, Y + 80, 200]] }, mood: { capricorn: 'happy', scorpio: 'happy' },
      lines: [[0.2, 1.1, 'capricorn', 'Where EXACTLY?'], [1.4, 1.5, 'scorpio', 'Left of the cone. | Waving.']] },
    { dur: 3.4, set: (x, t) => shopPair(x, t), front: (x, t, lt) => heartPop(x, t, lt, 540, 1100, 0.3), cast: { capricorn: [[0, 620, Y + 80, 210]], scorpio: [[0, 460, Y + 80, 210]] }, mood: { capricorn: 'heart', scorpio: 'heart' }, hops: { capricorn: [0.3], scorpio: [0.35] }, sfx: [[0.3, 'ding']],
      lines: [[0.4, 1.2, 'scorpio', 'Hi. Finally.'], [1.8, 1.4, 'capricorn', 'Worth the | U-turn.']] },
  ],
}

// ── hst065 · It hit 55°. Leo wore the full puffer.
const bayouSet = (x, t, sun = false) => { dayFill(x, '#9fd8ff', '#fff0c0', FLOOR + 60); skyline(x, 980, t, { alpha: 0.6 }); x.fillStyle = '#4a8a4a'; x.fillRect(0, 970, 1080, 140); x.fillStyle = '#4a7a8a'; x.fillRect(0, 1110, 1080, 120); x.fillStyle = '#5a9a4a'; x.fillRect(0, 1230, 1080, 700); if (sun) heatSun(x, 880, 330, t, 70) }
const PUF = { leo: [['puffer', '#e05a3a']] }
const puffer = {
  hook: 'It hit 55°. | Leo wore the | full puffer.', key: 'G',
  closing: 'Jan 9. Dress for 80°.', endStars: ['leo', 'aquarius', 'pisces', 'gemini'],
  lesson: ['Real beats perfect.', 'Let them see you sweat.'],
  lessonSet: (x, t) => bayouSet(x, t, true), lessonCast: { leo: [[0, 330, Y + 60, 210]], aquarius: [[0, 750, Y + 60, 210]] }, lessonMood: { leo: 'heart', aquarius: 'happy' },
  scenes: [
    { dur: 3.4, set: (x, t) => { dayFill(x, '#b8d8f0', '#e8eef4', 1920); skyline(x, 1100, t, { alpha: 0.5 }) }, front: (x, t, lt) => { box(x, 160, 760, 220, 300, INK, 6); x.fillStyle = '#bfe6ff'; x.fillRect(176, 780, 188, 250); txt(x, '55°', 270, 905, { size: 90, col: INK }) },
      cast: { leo: [[0, 700, Y, 300]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5, 1.0] }, wear: PUF, sfx: [[0.3, 'tick'], [1.0, 'ding', 1567.98]],
      lines: [[0.5, 2.6, 'leo', 'You wish you | looked this cozy.']] },
    { dur: 3.8, set: (x, t) => bayouSet(x, t), front: (x) => blanket(x), cast: { leo: [[0, 330, Y, 240]], aquarius: [[0, 750, Y, 240]] }, mood: { leo: 'squint', aquarius: 'eyeroll' }, wear: PUF,
      lines: [[0.2, 1.6, 'aquarius', "It's 55. | Not the Arctic."], [2.0, 1.6, 'leo', 'I have a | LOOK, okay?']] },
    { dur: 3.6, set: (x, t) => bayouSet(x, t), front: (x, t, lt, P) => { blanket(x); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 2) }, cast: { leo: [[0, 330, Y, 240]], aquarius: [[0, 750, Y, 240]] }, mood: { leo: 'happy', aquarius: 'neutral' }, wear: PUF,
      stick: [[0.1, 1.6, '11 AM · 68°', GOLD]], lines: [[1.8, 1.6, 'leo', 'Still cozy. | Totally fine.']] },
    { dur: 3.8, set: (x, t) => bayouSet(x, t, true), front: (x, t, lt, P) => { blanket(x); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 4) }, cast: { leo: [[0, 330, Y, 240]], aquarius: [[0, 750, Y, 240]] }, mood: { leo: 'squint', aquarius: 'squint' }, wear: PUF,
      stick: [[0.1, 1.2, '1 PM · 79°', '#ff9a3c']], lines: [[1.3, 1.1, 'aquarius', 'Take off | the coat.'], [2.5, 1.2, 'leo', 'The coat IS | the outfit.']] },
    { dur: 3.6, set: (x, t) => bayouSet(x, t, true), front: (x, t, lt, P) => { blanket(x); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 6); sweat(x, cx - s * 0.35, cy - s * 0.3, t + 0.4, 3) },
      cast: { leo: [[0, 330, Y + 30, 240]], aquarius: [[0, 750, Y, 240]], pisces: [[0, 560, 1000, 140]] }, mood: { leo: 'eyeroll', aquarius: 'wide', pisces: 'wide' }, wear: PUF, sfx: [[0.2, 'womp']],
      stick: [[0.1, 1.2, '2 PM · 82°', BRAKE]], lines: [[1.4, 0.9, 'leo', "I'm FINE."], [2.4, 1.1, 'pisces', "he's melting | *sob*"]] },
    { dur: 3.8, set: (x, t) => bayouSet(x, t, true), front: (x) => blanket(x), cast: { leo: [[0, 330, Y, 240]], aquarius: [[0, 750, Y, 240]] }, mood: { leo: lt => lt < 1.8 ? 'squint' : 'wide', aquarius: 'happy' },
      wear: { leo: PUF.leo, aquarius: [['puffer', '#7dffb0']] }, hops: { aquarius: [0.3] }, sfx: [[0.3, 'whoosh']],
      lines: [[0.4, 1.4, 'aquarius', 'Then we | both suffer.'], [2.0, 1.6, 'leo', "...you'd do | that for me?"]] },
    { dur: 3.8, set: (x, t) => bayouSet(x, t, true), front: (x, t, lt) => { blanket(x); heartPop(x, t, lt, 540, 1100, 0.3) }, cast: { leo: [[0, 360, Y, 240]], aquarius: [[0, 720, Y, 240]] }, mood: { leo: 'happy', aquarius: 'happy' }, hops: { leo: [0.2, 0.7], aquarius: [0.3, 0.8] }, sfx: [[0.2, 'cheer']],
      lines: [[0.4, 1.5, 'leo', 'Okay. I was | DYING in there.'], [2.1, 1.5, 'aquarius', 'I know. | You were steaming.']] },
    { dur: 3.2, set: (x, t) => bayouSet(x, t, true), front: (x) => blanket(x), cast: { leo: [[0, 360, Y, 240]], aquarius: [[0, 720, Y, 240]] }, mood: { leo: 'heart', aquarius: 'heart' },
      lines: [[0.3, 2.6, 'leo', 'Next cold day? | Matching coats.']] },
  ],
}

// ── hst066 · Your date was late to the bat bridge
const late = {
  hook: 'Your date was | late to the | bat bridge', key: 'A',
  closing: 'Jan 9. Leave early.', endStars: ['pisces', 'sagittarius', 'cancer', 'libra'],
  lesson: ['A real apology', 'has no "but".'],
  lessonSet: (x, t) => batBridge(x, t, 30), lessonCast: { pisces: [[0, 330, Y + 60, 210]], sagittarius: [[0, 750, Y + 60, 210]] }, lessonMood: { pisces: 'heart', sagittarius: 'happy' },
  scenes: [
    { dur: 3.6, set: (x, t) => batBridge(x, t, 3), cast: { pisces: [[0, 540, Y, 280]] }, mood: { pisces: 'sparkle' }, hops: { pisces: [0.05, 0.4] }, sfx: [[0.2, 'tick'], [0.7, 'tick']],
      lines: [[0.5, 2.8, 'pisces', 'You said 7:45. | It is 7:52.']] },
    { dur: 3.8, set: (x, t) => batBridge(x, t, 3), back: (x, t, lt) => phone(x, 540, 640, lt, [['l', '5 min!!', 0.2], ['l', 'traffic on Memorial', 1.0]], { w: 520, h: 330 }),
      cast: { pisces: [[0, 540, Y, 260]] }, mood: { pisces: 'squint' }, lines: [[2.0, 1.7, 'pisces', 'Every Houston excuse | is traffic.']] },
    { dur: 3.6, set: (x, t) => batBridge(x, t, 8), cast: { pisces: [[0, 540, Y, 260]] }, mood: { pisces: 'wide' }, look: { pisces: [0, -1] }, sfx: [[0.2, 'whoosh']],
      lines: [[0.6, 2.4, 'pisces', 'The bats | are LEAVING.']] },
    { dur: 3.8, set: (x, t) => batBridge(x, t, 46), cast: { pisces: [[0, 540, Y, 260]] }, mood: { pisces: 'sparkle' }, sfx: [[0.4, 'sob']],
      lines: [[0.4, 2.8, 'pisces', "It's beautiful. | And I'm ALONE."]] },
    { dur: 3.8, set: (x, t) => batBridge(x, t, 46), cast: { pisces: [[0, 330, Y, 240]], sagittarius: [[0, 1200, Y, 240], [1.0, 760, Y, 240]] }, mood: { pisces: 'squint', sagittarius: 'wide' }, hops: { sagittarius: [1.0, 1.3] }, sfx: [[0.2, 'whoosh']],
      lines: [[1.3, 2.2, 'sagittarius', "I'm late. | I'm sorry."]] },
    { dur: 3.8, set: (x, t) => batBridge(x, t, 46), cast: { pisces: [[0, 330, Y, 240]], sagittarius: [[0, 760, Y, 240]] }, mood: { pisces: 'squint', sagittarius: 'neutral' },
      lines: [[0.2, 1.4, 'pisces', 'And...? | The traffic?'], [1.9, 1.8, 'sagittarius', "No excuse. Should've | left earlier."]] },
    { dur: 3.6, set: (x, t) => batBridge(x, t, 46), cast: { pisces: [[0, 330, Y, 240]], sagittarius: [[0, 760, Y, 240]] }, mood: { pisces: lt => lt < 1.2 ? 'wide' : 'heart', sagittarius: 'neutral' }, sfx: [[0.1, 'crickets']],
      lines: [[1.3, 2.1, 'pisces', 'You apologized | with no "but"?']] },
    { dur: 3.4, set: (x, t) => batBridge(x, t, 60), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 0.2), cast: { pisces: [[0, 380, Y, 240]], sagittarius: [[0, 700, Y, 240]] }, mood: { pisces: 'heart', sagittarius: 'happy' }, sfx: [[0.2, 'sob'], [0.3, 'ding']],
      lines: [[0.3, 1.4, 'sagittarius', 'Next time | I come early.'], [1.9, 1.3, 'pisces', '*sob* okay.']] },
  ],
}

// ── hst067 · The stars commentate your crawfish date (the booth, a backyard boil)
const BOOTH2 = { gemini: [[0, 170, 900, 170]], sagittarius: [[0, 910, 900, 170]] }
const W67 = { gemini: ['headset', '#5ec8ff'], sagittarius: ['headset', PINK] }
const pile = (x, n = 9) => { for (let k = 0; k < n; k++) crawfish(x, 420 + (k % 5) * 60, 1300 - Math.floor(k / 5) * 34, 0.9, k * 0.7) }
const yard = (x, t) => { boilYard(x, t); }
const boil = {
  hook: 'The stars | commentate your | crawfish date', key: 'C',
  closing: 'Jan 9. Hands free.', endStars: ['taurus', 'virgo', 'gemini', 'sagittarius'],
  lesson: ['The best dates leave', 'no hands for your phone.'],
  lessonSet: yard, lessonCast: { taurus: [[0, 330, Y, 210]], virgo: [[0, 750, Y, 210]] }, lessonMood: { taurus: 'heart', virgo: 'heart' },
  scenes: [
    { dur: 3.6, set: yard, front: (x) => { newspaperTable(x); pile(x) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'sparkle', sagittarius: 'happy', taurus: 'happy', virgo: 'squint' }, hops: { gemini: [0.05], sagittarius: [0.2], taurus: [0.1] }, wear: W67,
      lines: [[0.4, 2.8, 'gemini', 'LIVE from your | crawfish date!']] },
    { dur: 3.8, set: yard, front: (x) => { newspaperTable(x); pile(x) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'happy', sagittarius: 'squint', taurus: 'happy', virgo: 'squint' }, wear: W67,
      lines: [[0.2, 1.5, 'virgo', 'How do I | even start?'], [2.0, 1.6, 'sagittarius', "Never peeled one, | folks!"]] },
    { dur: 3.8, set: yard, front: (x, t, lt) => { newspaperTable(x); pile(x, 6); crawfish(x, 330, 1000, 1.6, lt * 2) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'sparkle', sagittarius: 'happy', taurus: 'sparkle', virgo: 'wide' }, wear: W67,
      sfx: [[0.5, 'pop', 660], [1.0, 'pop', 880], [1.5, 'pop', 1046.5]], lines: [[0.4, 2.6, 'taurus', 'Pinch. Twist. | Peel.']] },
    { dur: 3.6, set: yard, front: (x, t, lt) => { newspaperTable(x); pile(x, 6); const p = clamp((lt - 0.3) / 1.2); crawfish(x, 750 - p * 420, 1050 - Math.sin(Math.PI * p) * 520 - p * 60, 1.4, lt * 9) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'wide', sagittarius: 'wide', taurus: 'wide', virgo: 'wide' }, wear: W67,
      sfx: [[0.3, 'whoosh'], [1.5, 'thud']], lines: [[1.5, 1.8, 'sagittarius', "AND IT'S | AIRBORNE!"]] },
    { dur: 3.6, set: yard, front: (x, t, lt, P) => { newspaperTable(x); pile(x, 6); const [cx, cy, s] = P.at('taurus'); crawfish(x, cx, cy - s * 0.52, 1.3, 0.2) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'wide', sagittarius: 'neutral', taurus: 'neutral', virgo: 'wide' }, wear: W67, sfx: [[0.2, 'crickets']],
      lines: [[1.6, 1.6, 'gemini', 'Oh no.']] },
    { dur: 3.8, set: yard, front: (x, t, lt, P) => { newspaperTable(x); pile(x, 6); const [cx, cy, s] = P.at('taurus'); crawfish(x, cx, cy - s * 0.52, 1.3, 0.2); heartPop(x, t, lt, 540, 1000, 1.0) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'heart', sagittarius: 'heart', taurus: 'happy', virgo: 'happy' }, hops: { taurus: [0.3, 0.7], virgo: [0.4, 0.8] }, wear: W67, sfx: [[1.0, 'cheer']],
      lines: [[0.3, 1.4, 'taurus', 'Okay, that | was amazing.'], [2.0, 1.6, 'sagittarius', "THEY'RE | LAUGHING!"]] },
    { dur: 3.8, set: yard, front: (x, t, lt) => { newspaperTable(x); pile(x, 8); box(x, 520, 1240, 70, 110, INK, 4); x.fillStyle = Math.sin(t * 20) > 0 ? '#5ec8ff' : '#3a6a8a'; x.fillRect(527, 1247, 56, 96) }, cast: { ...BOOTH2, taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'sparkle', sagittarius: 'happy', taurus: 'happy', virgo: 'happy' }, wear: W67, sfx: [[0.2, 'buzz'], [1.0, 'buzz']],
      lines: [[0.4, 1.4, 'gemini', 'Spicy hands. | No phones!'], [2.1, 1.5, 'sagittarius', 'Fully present, | folks.']] },
    { dur: 3.2, set: yard, front: (x) => { newspaperTable(x); pile(x, 4) }, cast: { ...BOOTH2, pisces: [[0, 540, 880, 150]], taurus: [[0, 330, 1180, 220]], virgo: [[0, 750, 1180, 220]] }, mood: { gemini: 'heart', sagittarius: 'heart', pisces: 'heart', taurus: 'heart', virgo: 'heart' }, wear: W67, sfx: [[0.2, 'sob']],
      lines: [[0.3, 2.5, 'gemini', 'We need | a minute.']] },
  ],
}

// ── hst068 · Aries joined a run club to impress you
const SB = { aries: [['sweatband', BRAKE]], cancer: [['sweatband', '#5ec8ff']] }
const run = {
  hook: 'Aries joined | a run club | to impress you', key: 'A',
  closing: 'Jan 9. No sprinting required.', endStars: ['aries', 'cancer', 'capricorn', 'leo'],
  lesson: ['Find someone who', 'matches your pace.'],
  lessonSet: (x, t) => trail(x, t), lessonCast: { aries: [[0, 330, Y + 60, 210]], cancer: [[0, 750, Y + 60, 210]] }, lessonMood: { aries: 'heart', cancer: 'heart' }, lessonWear: SB,
  scenes: [
    { dur: 3.6, set: (x, t) => trail(x, t), cast: { aries: [[0, 540, Y, 300]] }, mood: { aries: 'sparkle' }, hops: { aries: [0.05, 0.35, 0.65, 0.95] }, wear: SB, sfx: [[0.05, 'blip', 880], [0.35, 'blip', 1046.5]],
      lines: [[0.6, 2.7, 'aries', "You're watching? | Good. 5 AM."]] },
    { dur: 3.6, set: (x, t) => trail(x, t), cast: { aries: [[0, 300, Y, 220], [1.2, 1300, Y, 220]], cancer: [[0, 140, Y + 20, 220], [3.6, 380, Y + 20, 220]] }, mood: { aries: 'squint', cancer: 'happy' }, wear: SB, sfx: [[0.4, 'whoosh']],
      lines: [[1.8, 1.7, 'cancer', "It's a social | run, Aries..."]] },
    { dur: 3.8, set: (x, t) => trail(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 4) }, cast: { aries: [[0, 760, Y, 250]] }, mood: { aries: 'wide' }, wear: SB, sfx: [[0.3, 'womp']],
      stick: [[0.1, 1.4, 'MILE 1 · HUMIDITY', SKYB]], lines: [[1.6, 2.0, 'aries', 'Why is the | air WET?']] },
    { dur: 3.6, set: (x, t) => trail(x, t), cast: { aries: [[0, 760, Y, 250], [0.8, 760, Y + 140, 250]] }, mood: { aries: 'sleepy' }, wear: SB, sfx: [[0.8, 'thud'], [1.2, 'crickets']],
      lines: [[1.6, 1.6, 'aries', "I'm resting. | Strategically."]] },
    { dur: 3.8, set: (x, t) => trail(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); bottle(x, cx + s * 0.55, cy, Kp(lt, 0.6)) }, cast: { aries: [[0, 760, Y + 140, 250]], cancer: [[0, -200, Y, 240], [1.2, 400, Y, 240]] }, mood: { aries: 'wide', cancer: 'happy' }, wear: SB,
      lines: [[1.3, 2.2, 'cancer', 'Water? | We can walk.']] },
    { dur: 3.8, set: (x, t) => trail(x, t), cast: { aries: [[0, 760, Y + 140, 250], [2.4, 700, Y, 240]], cancer: [[0, 400, Y, 240]] }, mood: { aries: lt => lt < 2.2 ? 'squint' : 'happy', cancer: 'happy' }, wear: SB,
      lines: [[0.2, 1.4, 'aries', 'Walking is | for quitters.'], [2.3, 1.3, 'aries', '...okay fine.']] },
    { dur: 3.8, set: (x, t) => trail(x, t), cast: { aries: [[0, 660, Y, 240], [3.8, 700, Y, 240]], cancer: [[0, 420, Y, 240], [3.8, 460, Y, 240]] }, mood: { aries: 'happy', cancer: 'happy' }, wear: SB,
      lines: [[0.2, 1.5, 'cancer', 'So what do | you love?'], [1.9, 1.7, 'aries', 'Honestly? | This pace.']] },
    { dur: 3.2, set: (x, t) => trail(x, t, { sky: ['#ffe08a', '#ffb38a', '#7a9ad0'] }), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 0.3), cast: { aries: [[0, 680, Y, 240]], cancer: [[0, 420, Y, 240]] }, mood: { aries: 'heart', cancer: 'heart' }, wear: SB, sfx: [[0.3, 'ding']],
      stick: [[0.1, 1.2, 'MILE 3', MINT]], lines: [[1.2, 1.8, 'aries', 'Same time | next week?']] },
  ],
}

export const W03A = { hst061: story(aunties), hst062: story(live), hst063: story(plan), hst064: story(across), hst065: story(puffer), hst066: story(late), hst067: story(boil), hst068: story(run) }
