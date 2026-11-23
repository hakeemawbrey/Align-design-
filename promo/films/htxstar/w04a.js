// Houston Star Talk, batch w04 (story format): hst086–hst092. Season-2 cast, a setup → escalation → turn → payoff,
// then ★ LESSON UNLOCKED, then the party ticket. See promo/posting/htx/FARM.md and htxstar/w04kit.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table } from '../starrace/ep.js'
import { signChar } from '../signs3kit.js'
import { skyline, car, freeway, sweat, taco, overheadSign, streetSign, cones, mural, coffeeShop, soupPot, heatSun, shield, BRAKE } from './kit.js'
import { story, SFX, Kp, Y, fit, night, sky, sun, ground, tree, kitchen, porch, bayou, bellaire, brunchFront, phoneChat, bigText, steam, boba, bowl, corkBoard, hearts, sparkles, label, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from './w04kit.js'

const YOU = (y = 1480) => [540, y, 100]          // "you": a bubble from the bottom of the frame (the viewer speaks)
const AUNTS = { cancer: 'glasses', taurus: 'glasses' }

// ── hst086 · Your aunties found out you're single (the auntie council, Sunday dinner in Pearland)
const scroll = (x, lt, items, a = 0.2) => {
  const k = clamp(prog(lt, a, a + 1.2)); if (k <= 0) return
  const h = 120 + 560 * ease.outCubic(k)
  box(x, 250, 560, 580, h, BONE, 8); box(x, 230, 540, 620, 40, '#d8c8a8', 6); box(x, 230, 560 + h - 10, 620, 40, '#d8c8a8', 6)
  items.forEach((s, i) => { if (600 + i * 120 < 560 + h - 40) fit(x, s, 540, 640 + i * 120, 520, { size: 40, col: INK, font: MONO, weight: 700 }) })
}
const hst086 = story({
  hook: 'Your aunties | found out | you\'re single', key: 'F',
  close: 'Bring the aunties. Jan 9.', stars: ['cancer', 'taurus', 'pisces', 'leo'],
  scenes: [
    { dur: 3.6, title: 'SUNDAY · PEARLAND', set: (x, t) => { kitchen(x, t); soupPot(x, 540, 980, t) },
      cast: { cancer: [[0, 300, 1200, 260]], taurus: [[0, 780, 1200, 260]] }, mood: { cancer: 'happy', taurus: 'squint' }, props: AUNTS,
      hops: { cancer: [0.02, 0.5], taurus: [0.12, 0.62] },
      lines: [[0.3, 1.6, 'cancer', 'hi baby. | sit. eat.'], [2.1, 1.4, 'taurus', 'so. you\'re | still single?']] },
    { dur: 3.6, set: (x, t) => kitchen(x, t),
      cast: { cancer: [[0, 330, 1150, 400]], taurus: [[0, 760, 1150, 400]] }, mood: { cancer: 'wide', taurus: 'squint' }, props: AUNTS,
      lines: [[0.3, 1.5, 'cancer', 'in a city | this BIG?'], [2.0, 1.5, 'taurus', 'we made | a list.']], sfx: [SFX.thud(2.0)] },
    { dur: 4.0, set: (x, t, lt) => { kitchen(x, t); scroll(x, lt, ['✓ EARTH SIGN', '✓ INSIDE THE LOOP', '✓ OWNS A CRAWFISH POT', '✓ CALLS THEIR MAMA'], 0.1) },
      cast: { taurus: [[0, 860, 1300, 220]], pisces: [[0, 200, 1330, 170]] }, mood: { taurus: 'sparkle', pisces: 'heart' }, props: { taurus: 'glasses' },
      lines: [[1.6, 2.2, 'taurus', 'owns a | crawfish pot.']], sfx: [SFX.pluck(0.3, 660), SFX.pluck(0.6, 784)] },
    { dur: 3.8, set: (x, t) => kitchen(x, t),
      cast: { cancer: [[0, 300, 1150, 260]], taurus: [[0, 780, 1150, 260]] }, mood: { cancer: 'squint', taurus: lt => lt > 1.9 ? 'wide' : 'squint' }, props: AUNTS,
      lines: [[0.2, 1.5, 'cancer', "where'd they go | to high school?"], [1.9, 1.8, YOU(), "I'm not talking | to anyone yet."]], sfx: [SFX.womp(2.0)] },
    { dur: 3.6, set: (x, t) => kitchen(x, t),
      cast: { cancer: [[0, 300, 1150, 260], [1.2, 440, 1150, 260]], taurus: [[0, 780, 1150, 260], [1.2, 640, 1150, 260]], pisces: [[0, 900, 1380, 150]] },
      mood: { cancer: 'squint', taurus: 'squint', pisces: 'wide' }, props: AUNTS, look: { cancer: [1, 0], taurus: [-1, 0] },
      lines: [[1.4, 2.0, 'taurus', 'okay. | huddle.']], stick: [[0.1, 1.2, '*whispering*', BONE]], sfx: [SFX.cricket(0.4), SFX.cricket(0.9)] },
    { dur: 3.8, set: (x, t) => kitchen(x, t),
      cast: { cancer: [[0, 330, 1150, 300]], taurus: [[0, 760, 1150, 260]] }, mood: { cancer: 'happy', taurus: 'happy' }, props: AUNTS,
      lines: [[0.2, 2.0, 'cancer', 'what do YOU | want, baby?']], sfx: [SFX.ding(0.2)] },
    { dur: 4.0, set: (x, t, lt) => { kitchen(x, t); if (lt > 2.2) hearts(x, t, 540, 900, t - lt + 2.2, { n: 8, spread: 300 }) },
      cast: { cancer: [[0, 300, 1150, 260]], taurus: [[0, 780, 1150, 260]], pisces: [[0, 540, 1380, 160]] }, mood: { cancer: 'heart', taurus: 'heart', pisces: 'heart' }, props: AUNTS,
      lines: [[0.2, 1.9, YOU(), 'someone kind. | who gets my jokes.'], [2.3, 1.6, 'taurus', "...that's | a good list."]] },
    { dur: 3.8, set: (x, t, lt) => { kitchen(x, t); label(x, 540, 640, 'BETA PARTY · JAN 9', Kp(lt, 0.4), { size: 46, bg: GOLD, rot: -0.03 }) },
      cast: { cancer: [[0, 300, 1150, 260]], taurus: [[0, 780, 1150, 260]] }, mood: { cancer: 'wide', taurus: 'sparkle' }, props: AUNTS,
      lines: [[0.2, 1.4, YOU(), "there's a party | Jan 9..."], [1.8, 1.8, 'taurus', "we're | coming."]], sfx: [SFX.gasp(1.8)] },
    { dur: 3.6, set: (x, t, lt) => { kitchen(x, t); sparkles(x, t, 540, 1000, t - lt, 12, 380, 5) },
      cast: { cancer: [[0, 300, 1150, 260]], taurus: [[0, 780, 1150, 260]] }, mood: { cancer: 'sparkle', taurus: 'wink' }, props: { cancer: ['glasses', 'crown'], taurus: ['glasses', 'scarf'] },
      hops: { cancer: [0.1, 0.5, 0.9], taurus: [0.2, 0.6, 1.0] },
      lines: [[0.3, 1.4, 'cancer', "we'll | behave."], [1.9, 1.4, 'taurus', 'mostly.']], sfx: [SFX.boing(1.9)] },
  ],
  lesson: { lines: ['They ask because', 'they love you.', 'Your pace is yours.'], cast: { cancer: [[0, 330, 1390, 190]], taurus: [[0, 750, 1390, 190]] }, mood: { cancer: 'heart', taurus: 'heart' }, props: AUNTS, line: ['taurus', 'now eat. | you look thin.'] },
})


// ── shared bits for this file
const liveBug = (x, t) => { box(x, 70, 250, 150, 60, BRAKE, 5); txt(x, '● LIVE', 145, 281, { size: 30, col: BONE, font: MONO, weight: 700 }) }
function tv(x, cx, cy, w, h, focusY, draw, { label: lab = null } = {}) {   // a CRT that shows the world (drawn full-frame, scaled in)
  box(x, cx - w / 2 - 30, cy - h / 2 - 30, w + 60, h + 60, '#4a3a5a', 10)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); const s = w / 1080; x.translate(cx - 540 * s, cy - focusY * s); x.scale(s, s); draw(); x.restore()
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); for (let k = 0; k < h; k += 8) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(cx - w / 2, cy - h / 2 + k, w, 3) } x.restore()
  if (lab) label(x, cx, cy - h / 2 - 10, lab, 1, { size: 30, bg: GOLD, font: MONO, weight: 700 })
}
function studio(x, t) { x.fillStyle = '#1a1230'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? '#20183a' : '#1c1434'; x.fillRect(k * 120, 0, 120, 1400) } box(x, 0, 1380, 1080, 60, '#5a3a6a', 6); x.fillStyle = '#2a1d40'; x.fillRect(0, 1440, 1080, 480) }
const tag = (x, s, cx, cy, col = GOLD) => label(x, cx, cy, s, 1, { size: 26, bg: col, font: MONO, weight: 700, rot: 0 })
function mosquito(x, cx, cy, t) { const bx = cx + Math.sin(t * 7) * 60, by = cy + Math.cos(t * 9) * 40; x.fillStyle = INK; x.fillRect(bx - 10, by - 3, 20, 6); x.fillRect(bx + 8, by - 1, 14, 2); x.fillStyle = 'rgba(239,230,214,0.8)'; const f = Math.sin(t * 60) > 0 ? 10 : 4; x.fillRect(bx - 8, by - 3 - f, 6, f); x.fillRect(bx, by - 3 - f, 6, f) }
function vhs(x, t, lt) { x.fillStyle = 'rgba(255,255,255,0.06)'; for (let k = 0; k < 6; k++) x.fillRect(0, (t * 300 + k * 330) % 1920, 1080, 18); txt(x, '◀◀ REPLAY', 220, 400, { size: 52, col: BONE, font: MONO, weight: 700 }) }

// ── hst087 · The stars are live-commenting your date (the booth, a bayou walk at dusk)
const DATE = (x, t, lt, { sweat: sw = 0, phone = 0, love = 0 } = {}) => {
  bayou(x, t, { dusk: 1 })
  const ya = 1250, yb = 1250
  signChar(x, t, 'aquarius', 400, ya, 220, { mood: love ? 'heart' : phone ? 'neutral' : 'happy', look: phone ? [0, 1] : [1, 0], seed: 4, hops: love ? [t - (lt % 0.8)] : null })
  signChar(x, t, 'libra', 680, yb, 220, { mood: love ? 'heart' : 'happy', look: [-1, 0], seed: 9 })
  tag(x, 'YOU', 400, 1400); tag(x, 'THEM', 680, 1400, PINK)
  if (sw) { sweat(x, 470, 1120, t, 3); sweat(x, 750, 1120, t, 3) }
  if (phone) { box(x, 440, 1210, 40, 70, INK, 4); x.fillStyle = SKYB; x.fillRect(446, 1218, 28, 54) }
  if (love) hearts(x, t, 540, 1150, t - lt, { n: 8, spread: 260 })
}
const BOOTH = { gemini: 'headset', sagittarius: 'headset' }
const boothCast = (y = 1450, s = 170) => ({ gemini: [[0, 150, y, s]], sagittarius: [[0, 930, y, s]] })
const hst087 = story({
  hook: 'The stars are | live-commenting | your date', key: 'G',
  close: 'Ask the real question. Jan 9.', stars: ['gemini', 'sagittarius', 'libra', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t, lt) => { studio(x, t); tv(x, 540, 760, 820, 560, 1150, () => DATE(x, t, lt)); liveBug(x, t) },
      cast: { gemini: [[0, 300, 1300, 240]], sagittarius: [[0, 780, 1300, 240]] }, mood: { gemini: 'sparkle', sagittarius: 'wide' }, props: BOOTH,
      hops: { gemini: [0.02, 0.4], sagittarius: [0.1, 0.5] },
      lines: [[0.3, 1.6, 'gemini', "AND WE'RE LIVE | on the bayou!"], [2.1, 1.4, 'sagittarius', "it's your | first date!"]] },
    { dur: 3.6, title: 'BUFFALO BAYOU · 7PM', set: (x, t, lt) => DATE(x, t, lt), cast: boothCast(), mood: { gemini: 'sparkle', sagittarius: 'happy' }, props: BOOTH,
      lines: [[0.4, 1.4, 'gemini', 'strong start. | matching pace.'], [2.0, 1.4, 'sagittarius', 'skyline view. | bold.']] },
    { dur: 3.6, set: (x, t, lt) => DATE(x, t, lt, { sweat: 1 }), cast: boothCast(), mood: { gemini: 'wide', sagittarius: 'squint' }, props: BOOTH,
      lines: [[0.3, 1.5, 'sagittarius', 'oh no. | the humidity.'], [2.0, 1.4, 'gemini', "they're | glistening."]] },
    { dur: 3.8, set: (x, t, lt) => { DATE(x, t, lt, { sweat: 1 }); mosquito(x, 560, 1060, t) }, cast: boothCast(), mood: { gemini: 'wide', sagittarius: 'wide' }, props: BOOTH,
      lines: [[0.2, 1.6, [680, 1250, 220], 'so... what | do you do?'], [2.0, 1.6, 'sagittarius', 'small talk. | losing them.']], sfx: [SFX.womp(2.0)] },
    { dur: 3.4, set: (x, t, lt) => { studio(x, t); tv(x, 540, 760, 820, 560, 1150, () => DATE(x, t, lt)); liveBug(x, t) },
      cast: { gemini: [[0, 300, 1300, 240]], sagittarius: [[0, 780, 1300, 240]], pisces: [[0, 540, 1480, 150]] }, mood: { gemini: 'neutral', sagittarius: 'neutral', pisces: 'wide' }, props: BOOTH,
      look: { gemini: [1, 0], sagittarius: [-1, 0] }, stick: [[0.3, 2.6, '*dead air*', BONE]], sfx: [SFX.cricket(0.5), SFX.cricket(1.1), SFX.cricket(1.7)] },
    { dur: 3.8, set: (x, t, lt) => { DATE(x, t, lt, { phone: 1 }); vhs(x, t, lt) }, cast: boothCast(), mood: { gemini: 'wide', sagittarius: 'squint' }, props: BOOTH,
      lines: [[1.0, 2.2, 'sagittarius', 'phone check. | brutal.']], sfx: [SFX.thud(0.1)] },
    { dur: 3.8, set: (x, t, lt) => DATE(x, t, lt), cast: boothCast(), mood: { gemini: lt => lt > 2.1 ? 'sparkle' : 'wide', sagittarius: lt => lt > 2.1 ? 'sparkle' : 'wide' }, props: BOOTH,
      lines: [[0.2, 1.8, [400, 1250, 220], "what's your fave | spot in Houston?"], [2.1, 1.5, 'gemini', 'A REAL | QUESTION!']], sfx: [SFX.ding(2.1)] },
    { dur: 4.0, set: (x, t, lt) => DATE(x, t, lt, { love: 1 }), cast: boothCast(), mood: { gemini: 'heart', sagittarius: 'heart' }, props: BOOTH, hops: { gemini: [1.8, 2.3], sagittarius: [1.9, 2.4] },
      lines: [[0.2, 1.5, [680, 1250, 220], 'okay so | this taco truck...'], [2.0, 1.8, 'gemini', "THEY'RE | LAUGHING!"]], sfx: [SFX.cheer(1.9)] },
    { dur: 3.6, set: (x, t, lt) => { studio(x, t); tv(x, 540, 760, 820, 560, 1150, () => DATE(x, t, lt, { love: 1 })); liveBug(x, t) },
      cast: { gemini: [[0, 300, 1300, 240]], sagittarius: [[0, 780, 1300, 240]], pisces: [[0, 540, 1480, 150]] }, mood: { gemini: 'heart', sagittarius: 'squint', pisces: 'heart' }, props: { ...BOOTH, pisces: 'tissue' },
      lines: [[0.3, 2.6, 'sagittarius', "we'll be right back. | we need a minute."]] },
  ],
  lesson: { lines: ['Skip the résumé.', 'Ask what', 'they love.'], cast: { gemini: [[0, 330, 1390, 190]], sagittarius: [[0, 750, 1390, 190]] }, mood: { gemini: 'sparkle', sagittarius: 'happy' }, props: BOOTH, line: ['gemini', "and we're | back."] },
})

// ── hst088 · Virgo planned your date. To the minute. (Montrose → a mural → Bellaire → the bayou)
const plan = (x, lt, done = -1, k = 1) => {
  if (k <= 0) return
  x.save(); x.translate(540, 700); x.scale(k, k); x.rotate(-0.02)
  box(x, -360, -260, 720, 520, BONE, 8); box(x, -360, -260, 720, 80, '#2e8b57', 0); txt(x, 'THE PLAN (LAMINATED)', 0, -220, { size: 34, col: BONE, font: MONO, weight: 700 })
  ;['6:00 COFFEE · MONTROSE', '6:40 MURAL PHOTOS', '7:15 DINNER · BELLAIRE', '8:30 HOME. ON TIME.'].forEach((s, i) => { fit(x, s, 0, -110 + i * 100, 620, { size: 40, col: INK, font: MONO, weight: 700 }); if (i <= done) { x.strokeStyle = BRAKE; x.lineWidth = 8; x.beginPath(); x.moveTo(-300, -110 + i * 100); x.lineTo(300, -110 + i * 100); x.stroke() } })
  x.restore()
}
const hst088 = story({
  hook: 'Virgo planned | your date. | To the minute.', key: 'C',
  close: 'Plan it. Then let it happen. Jan 9.', stars: ['virgo', 'sagittarius', 'pisces', 'libra'],
  scenes: [
    { dur: 3.6, set: (x, t, lt) => { night(x, t); plan(x, lt, -1, 1) }, cast: { virgo: [[0, 540, 1250, 260]] }, mood: { virgo: 'squint' }, props: { virgo: 'clipboard' }, hops: { virgo: [0.02, 0.45] },
      lines: [[0.3, 1.5, 'virgo', 'hi. your date. | I planned it.'], [2.0, 1.4, 'virgo', 'every. | minute.']] },
    { dur: 3.8, title: '6:00 · MONTROSE', set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60) }, cast: { virgo: [[0, 200, Y, 230]] }, mood: { virgo: 'squint' }, props: { virgo: 'clipboard' },
      lines: [[0.3, 1.4, 'virgo', '6:00. | where are they?'], [2.0, 1.7, [880, 1250, 220], 'stuck on 59! | 20 minutes!']], sfx: [SFX.thud(2.0)] },
    { dur: 3.6, set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60) }, cast: { virgo: [[0, 200, Y, 230]], sagittarius: [[0, 1200, Y, 230], [0.6, 860, Y, 230]] }, mood: { virgo: 'eyeroll', sagittarius: 'sparkle' }, props: { virgo: 'clipboard' },
      lines: [[1.0, 1.4, 'sagittarius', 'I\'m here! | hi!!'], [2.4, 1.1, 'virgo', '6:21.']], sfx: [SFX.pluck(2.4, 440)] },
    { dur: 3.8, title: '6:40 · A MURAL', set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) },
      cast: { virgo: [[0, 260, Y, 230]], sagittarius: [[0, 820, Y, 230]], pisces: [[0, 560, 1340, 130]], aries: [[0, 680, 1340, 130]] }, mood: { virgo: 'wide', sagittarius: 'happy', pisces: 'heart', aries: 'happy' }, props: { virgo: 'clipboard' },
      lines: [[0.4, 1.6, 'virgo', 'a LINE? | for a WALL?'], [2.2, 1.4, 'sagittarius', "it's a | good wall!"]] },
    { dur: 3.8, title: '7:15 · BELLAIRE', set: (x, t) => bellaire(x, t, { signs: ['PHO', 'BOBA', 'WAIT: A WHILE', 'HOT POT'] }),
      cast: { virgo: [[0, 300, Y, 240]], sagittarius: [[0, 800, Y, 230]] }, mood: { virgo: lt => lt > 1.8 ? 'wide' : 'squint', sagittarius: 'happy' }, props: { virgo: 'clipboard' },
      lines: [[0.3, 1.4, 'virgo', 'the plan... | the PLAN...'], [2.0, 1.6, 'virgo', "it's 7:52 | and we're LOST."]], sfx: [SFX.womp(2.0)] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); plan(x, lt, 3, 1 - clamp((lt - 2.2) / 0.4)) }, cast: { virgo: [[0, 300, Y, 240]], sagittarius: [[0, 800, Y, 230]] }, mood: { virgo: 'neutral', sagittarius: 'happy' }, props: { virgo: 'clipboard' },
      lines: [[0.3, 2.0, 'sagittarius', 'hey. can we just | sit somewhere?']], sfx: [SFX.ding(0.3)] },
    { dur: 4.0, title: 'THE BAYOU · SUNSET', set: (x, t) => bayou(x, t, { dusk: 1 }), front: (x, t) => { boba(x, 450, 1290, 0.7); boba(x, 640, 1290, 0.7, '#c9a6ff') },
      cast: { virgo: [[0, 330, 1250, 230]], sagittarius: [[0, 760, 1250, 230]] }, mood: { virgo: 'happy', sagittarius: 'heart' }, props: { virgo: 'clipboard' },
      lines: [[0.4, 1.5, 'virgo', "this wasn't | on the plan."], [2.1, 1.6, 'sagittarius', 'best part, | right?']] },
    { dur: 3.6, set: (x, t, lt) => { bayou(x, t, { dusk: 1 }); hearts(x, t, 540, 1100, t - lt + 0.6, { n: 8, spread: 300 }) },
      cast: { virgo: [[0, 330, 1250, 230]], sagittarius: [[0, 760, 1250, 230]] }, mood: { virgo: 'heart', sagittarius: 'heart' }, props: { virgo: 'clipboard' },
      lines: [[0.3, 2.6, 'virgo', '*writes* 8:31: | stay here.']], sfx: [SFX.pluck(0.3, 660)] },
  ],
  lesson: { lines: ['Plan the date.', 'Leave room', 'for the magic.'], cast: { virgo: [[0, 330, 1390, 190]], sagittarius: [[0, 750, 1390, 190]] }, mood: { virgo: 'happy', sagittarius: 'heart' }, props: { virgo: 'clipboard' }, line: ['virgo', "I'm adding | 'magic' to the list."] },
})

// ── hst089 · Pisces took you to Galveston. Bring tissues.
function pelican(x, cx, cy, t) { const f = Math.sin(t * 6) * 18; x.fillStyle = INK; x.fillRect(cx - 60, cy - 8 - f, 50, 12); x.fillRect(cx + 10, cy - 8 - f, 50, 12); box(x, cx - 30, cy - 14, 70, 32, '#c8b8a0', 4); box(x, cx + 34, cy - 24, 24, 22, '#c8b8a0', 3); box(x, cx + 56, cy - 18, 50, 12, '#e8a040', 3) }
function gull(x, cx, cy, t, fry = 0) { box(x, cx - 30, cy - 18, 60, 34, BONE, 4); box(x, cx + 22, cy - 34, 24, 22, BONE, 3); box(x, cx + 44, cy - 28, 18, 8, '#f2c75c', 2); x.fillStyle = INK; x.fillRect(cx + 32, cy - 28, 5, 5); if (fry) box(x, cx + 54, cy - 36, 10, 40, '#f2c75c', 2) }
const hst089 = story({
  hook: 'Pisces took you | to Galveston. | Bring tissues.', key: 'Eb',
  close: 'Bring tissues. Jan 9.', stars: ['pisces', 'cancer', 'scorpio', 'taurus'],
  scenes: [
    { dur: 3.6, set: (x, t) => { sky(x, '#8fd0ff', '#e8f6ff', FLOOR - 160); freeway(x, FLOOR - 160, 600, 4, t * 380); overheadSign(x, 540, 760, 'GALVESTON', '45 SOUTH', 1) },
      front: (x, t) => car(x, 540, FLOOR + 120, '#c9a6ff', { open: true }), cast: { pisces: [[0, 520, FLOOR + 5, 200]] }, mood: { pisces: 'sparkle' }, hops: { pisces: [0.02, 0.4, 0.8] },
      lines: [[0.3, 1.5, 'pisces', 'beach day!! | just us!'], [2.0, 1.4, 'pisces', "I'm already | emotional."]] },
    { dur: 3.8, title: 'THE GULF', set: (x, t) => beach(x, t), cast: { pisces: [[0, 540, 1250, 260]] }, mood: { pisces: 'wide' },
      lines: [[0.3, 1.5, 'pisces', 'the water... | is so brown.'], [2.0, 1.6, 'pisces', '...and I | LOVE it.']], sfx: [SFX.gasp(2.0)] },
    { dur: 3.6, set: (x, t, lt) => { beach(x, t); pelican(x, -100 + lt * 380, 560, t) }, cast: { pisces: [[0, 540, 1250, 260]] }, mood: { pisces: 'heart' }, look: { pisces: [-1, -1] },
      lines: [[1.0, 2.2, 'pisces', 'a pelican. | he\'s so FREE.']] },
    { dur: 3.8, set: (x, t, lt) => { beach(x, t); gull(x, 760 + (lt > 1 ? (lt - 1) * 500 : 0), 1220 - (lt > 1 ? (lt - 1) * 260 : 0), t, lt > 0.9 ? 1 : 0); if (lt < 0.9) box(x, 700, 1250, 40, 30, '#d8402a', 3) },
      cast: { pisces: [[0, 360, 1250, 240]] }, mood: { pisces: lt => lt > 1 ? 'wide' : 'happy' },
      lines: [[1.2, 1.2, 'pisces', 'he took | our FRY.'], [2.5, 1.2, YOU(), 'Pisces. | it\'s a bird.']], sfx: [SFX.womp(1.1)] },
    { dur: 3.8, set: (x, t) => beach(x, t), cast: { pisces: [[0, 540, 1250, 250]] }, mood: { pisces: 'wide' }, props: { pisces: 'tissue' },
      stick: [[0.1, 1.6, 'TISSUES LEFT: 0', BRAKE]],
      lines: [[0.4, 1.4, 'pisces', "I'm out | of tissues."], [2.0, 1.6, YOU(), 'here. use | my sleeve.']] },
    { dur: 4.0, title: 'SEAWALL · SUNSET', set: (x, t) => { sky(x, '#5a3a8a', '#ff9a5a', 1100); sun(x, 540, 880, 120, '#ffb36b'); x.fillStyle = '#7a5a5a'; x.fillRect(0, 940, 1080, 260); box(x, -10, 1180, 1100, 260, '#b8b0a0', 6) },
      cast: { pisces: [[0, 760, 1250, 240]] }, mood: { pisces: lt => lt > 2.1 ? 'wide' : 'heart' }, look: { pisces: [-1, 0] },
      lines: [[0.4, 1.6, YOU(), 'okay this is | beautiful.'], [2.2, 1.6, 'pisces', 'are you... | CRYING?']], sfx: [SFX.gasp(2.2)] },
    { dur: 3.8, set: (x, t, lt) => { sky(x, '#5a3a8a', '#ff9a5a', 1100); sun(x, 540, 880, 120, '#ffb36b'); x.fillStyle = '#7a5a5a'; x.fillRect(0, 940, 1080, 260); box(x, -10, 1180, 1100, 260, '#b8b0a0', 6); hearts(x, t, 540, 1000, t - lt, { n: 10, spread: 320 }) },
      cast: { pisces: [[0, 760, 1250, 240]] }, mood: { pisces: 'heart' }, hops: { pisces: [1.6, 2.0, 2.4] },
      lines: [[0.2, 1.4, YOU(), "it's the | SUNSET."], [1.8, 1.8, 'pisces', "we're the | SAME!!"]], sfx: [SFX.cheer(1.8)] },
    { dur: 3.4, set: (x, t) => { night(x, t); freeway(x, FLOOR - 160, 600, 4, t * 300) }, front: (x, t) => car(x, 540, FLOOR + 120, '#c9a6ff', { open: true }),
      cast: { pisces: [[0, 520, FLOOR + 5, 200]] }, mood: { pisces: 'sleepy' }, lines: [[0.4, 2.4, 'pisces', 'same time | next week?']] },
  ],
  lesson: { lines: ['Feel it out loud.', 'The right one', 'stays.'], cast: { pisces: [[0, 540, 1390, 200]] }, mood: { pisces: 'heart' }, props: { pisces: 'tissue' }, line: ['pisces', "I'm fine. | *sob*"] },
})

// ── hst090 · Leo dragged you to every mural in Houston
function grackle(x, cx, cy, t) { box(x, cx - 34, cy - 16, 68, 34, '#1a1430', 4); box(x, cx + 24, cy - 34, 26, 24, '#1a1430', 3); box(x, cx + 48, cy - 26, 18, 8, INK, 2); x.fillStyle = '#ffd36b'; x.fillRect(cx + 34, cy - 28, 6, 6); box(x, cx - 70, cy - 10, 40, 14, '#2a2050', 3) }
function polaroid(x, t, k, id = 'leo') { if (k <= 0) return; x.save(); x.translate(540, 760); x.rotate(-0.05); x.scale(k, k); box(x, -260, -300, 520, 600, BONE, 8); x.fillStyle = '#ff9a3c'; x.fillRect(-220, -260, 440, 420); signChar(x, t, id, 0, -40, 300, { mood: 'sparkle', seed: 3, hops: [t - (t % 0.9)] }); txt(x, 'candid. not posed.', 0, 230, { size: 34, col: INK, font: SERIF, weight: 500, italic: true }); x.restore() }
const muralB = (x, t) => { const cols = ['#2b5fb0', '#ffd36b', '#ff5a6e', '#2e8b57']; for (let k = 0; k < 8; k++) { x.fillStyle = cols[k % 4]; x.beginPath(); x.moveTo(k * 140 - 100, 1400); x.lineTo(k * 140 + 60, 400); x.lineTo(k * 140 + 200, 400); x.lineTo(k * 140 + 40, 1400); x.fill() } fit(x, 'HOUSTON', 540, 720, 900, { size: 150, col: BONE }); outside(x, { ground: '#2a2440' }) }
const hst090 = story({
  hook: 'Leo dragged you | to every mural | in Houston', key: 'A',
  close: 'Come as you are. Jan 9.', stars: ['leo', 'virgo', 'gemini', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'sparkle' }, props: { leo: 'crown' }, hops: { leo: [0.02, 0.4, 0.8] },
      lines: [[0.3, 1.6, 'leo', 'hold my phone. | get my good side.'], [2.1, 1.3, 'leo', 'both sides.']] },
    { dur: 3.6, title: 'MONTROSE', set: (x, t, lt) => { mural(x, t); outside(x, { ground: '#2a2440' }); if (lt > 1.4 && lt < 1.6) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(0, 0, 1080, 1920) } },
      cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'wink' }, props: { leo: 'crown' }, stick: [[0.2, 1.2, 'TAKE 12', BONE]],
      lines: [[1.8, 1.6, 'leo', 'again. | the light moved.']], sfx: [SFX.ding(1.4)] },
    { dur: 3.8, title: 'EADO', set: (x, t) => muralB(x, t), cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'sparkle' }, props: { leo: 'crown' }, stick: [[0.2, 1.2, 'TAKE 31', BONE]],
      lines: [[0.5, 2.6, 'leo', 'this wall | matches my aura.']] },
    { dur: 3.6, set: (x, t) => { muralB(x, t); heatSun(x, 880, 300, t, 80) }, front: (x, t) => sweat(x, 640, 1080, t, 3), cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'squint' }, props: { leo: 'crown' },
      lines: [[0.3, 1.5, YOU(), "Leo. it's | SO hot."], [2.0, 1.5, 'leo', 'beauty | is pain.']] },
    { dur: 3.8, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'neutral' }, props: { leo: ['crown', 'phone'] },
      lines: [[0.3, 1.5, 'leo', '*scrolling* | hm.'], [2.0, 1.7, 'leo', "they're all... | so posed."]], sfx: [SFX.womp(2.0)] },
    { dur: 3.8, set: (x, t, lt) => { mural(x, t); outside(x, { ground: '#2a2440' }); grackle(x, 1100 - lt * 300, 1340, t) },
      cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: lt => lt > 1.6 ? 'happy' : 'wide' }, props: { leo: 'crown' }, hops: { leo: [1.6, 1.9, 2.2] },
      lines: [[0.6, 1.2, 'leo', 'is that | a GRACKLE?'], [2.0, 1.6, 'leo', 'HAHA he\'s | judging me!']], sfx: [SFX.ding(2.4)] },
    { dur: 4.0, set: (x, t, lt) => { mural(x, t); outside(x, { ground: '#2a2440' }); x.fillStyle = 'rgba(8,5,22,0.6)'; x.fillRect(0, 0, 1080, 1920); polaroid(x, t, Kp(lt, 0.1, 0.4)) },
      cast: { leo: [[0, 820, 1300, 220]], pisces: [[0, 220, 1340, 150]] }, mood: { leo: 'wide', pisces: 'heart' }, props: { leo: 'crown' },
      lines: [[1.0, 1.4, 'leo', '...that\'s me?'], [2.5, 1.4, 'leo', 'I look | happy.']] },
    { dur: 3.4, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, cast: { leo: [[0, 540, 1240, 280]] }, mood: { leo: 'heart' }, props: { leo: ['crown', 'phone'] },
      lines: [[0.3, 2.6, 'leo', 'now you. | your turn. candid.']] },
  ],
  lesson: { lines: ['Stop performing.', 'Let them see', 'the real you.'], cast: { leo: [[0, 540, 1390, 200]] }, mood: { leo: 'heart' }, props: { leo: 'crown' }, line: ['leo', 'still my | good side.'] },
})

// ── hst091 · Aries is late to your date (Houston traffic, a Texas U-turn, Kuykendahl)
const road = (x, t, sc = 380) => { sky(x, '#ffb36b', '#ffe0b0', FLOOR - 160); skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 4, t * sc) }
const ariesCar = (x, t, lt, o = {}) => car(x, 540, FLOOR + 120, '#ff5a4e', { open: true, ...o })
const hst091 = story({
  hook: 'Aries is late | to your date', key: 'E',
  close: 'Leave early. Jan 9.', stars: ['aries', 'libra', 'capricorn', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t) => road(x, t), front: (x, t, lt) => ariesCar(x, t, lt), cast: { aries: [[0, 520, FLOOR + 5, 210]] }, mood: { aries: 'sparkle' }, hops: { aries: [0.02, 0.35, 0.7] },
      lines: [[0.3, 1.5, 'aries', "on my way | to you!"], [2.0, 1.4, 'aries', 'SO on time.']] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); phoneChat(x, 540, 760, [[0.2, 1, 'omw!! 10 min'], [1.4, 0, 'see you soon!']], lt, { title: 'ARIES ♈' }) }, cast: { aries: [[0, 860, 1300, 200]] }, mood: { aries: 'wink' },
      lines: [[2.2, 1.3, 'aries', 'ten minutes. | easy.']] },
    { dur: 3.8, set: (x, t) => { road(x, t, 40); cones(x, FLOOR + 40, 6, t) }, front: (x, t) => ariesCar(x, t, 0, { brake: 1 }), cast: { aries: [[0, 520, FLOOR + 5, 210]] }, mood: { aries: 'wide' },
      stick: [[2.0, 1.6, 'SINCE FOREVER', GOLD]], lines: [[0.3, 1.6, 'aries', 'construction?! | since WHEN?']], sfx: [SFX.thud(0.3)] },
    { dur: 3.8, set: (x, t, lt) => { road(x, t); overheadSign(x, 540, 760, 'EXIT CLOSED', 'USE FEEDER', Kp(lt, 0.1)) }, front: (x, t, lt) => ariesCar(x, t, lt), cast: { aries: [[0, 520, FLOOR + 5, 210]] }, mood: { aries: 'squint' },
      lines: [[1.0, 2.4, 'aries', 'the feeder! | TAKE THE FEEDER!']] },
    { dur: 3.6, set: (x, t, lt) => { road(x, t); overheadSign(x, 540, 760, 'TEXAS U-TURN', 'NEXT LEFT', 1) }, front: (x, t, lt) => ariesCar(x, t, lt, { flip: lt > 1.4 }), cast: { aries: [[0, 520, FLOOR + 5, 210]] }, mood: { aries: lt => lt > 1.4 ? 'wide' : 'sparkle' },
      lines: [[0.3, 1.0, 'aries', 'U-turn.'], [1.6, 1.8, 'aries', 'wrong... | direction.']], sfx: [SFX.boing(1.4)] },
    { dur: 3.8, set: (x, t, lt) => { night(x, t); streetSign(x, 700, 720, 'KUYKENDAHL', { k: Kp(lt, 0.05) }) }, cast: { aries: [[0, 300, Y, 240]] }, mood: { aries: 'wide' },
      lines: [[0.3, 1.4, 'aries', 'kirk-en... | KIRK-en-DOLL?'], [2.0, 1.6, 'aries', 'where AM I?']], sfx: [SFX.womp(2.0)] },
    { dur: 4.0, set: (x, t, lt) => { night(x, t); phoneChat(x, 540, 760, [[0.3, 1, 'running 25 late. | so sorry.'], [1.6, 1, 'order the queso, | my treat?']], lt, { title: 'ARIES ♈' }) }, cast: { aries: [[0, 860, 1300, 200]] }, mood: { aries: 'neutral' },
      stick: [[0.1, 1.0, '*deep breath*', BONE]], sfx: [SFX.pluck(0.3, 523), SFX.pluck(1.6, 659)] },
    { dur: 3.8, set: (x, t, lt) => { night(x, t); phoneChat(x, 540, 760, [[0, 1, 'running 25 late. | so sorry.'], [0, 1, 'order the queso, | my treat?'], [0.4, 0, "lol I'm stuck | on 290 too"]], lt, { title: 'ARIES ♈' }) },
      cast: { aries: [[0, 860, 1300, 200]] }, mood: { aries: lt => lt > 1.2 ? 'heart' : 'wide' }, hops: { aries: [1.3, 1.7] },
      lines: [[1.5, 2.0, 'aries', "we're | perfect."]], sfx: [SFX.ding(0.4)] },
    { dur: 3.4, set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60) }, cast: { aries: [[0, -200, Y, 230], [0.8, 300, Y, 230]] }, mood: { aries: 'heart' },
      lines: [[1.0, 2.2, YOU(), 'right on time. | (we\'re both late)']] },
  ],
  lesson: { lines: ['Late happens.', 'Text before,', 'not after.'], cast: { aries: [[0, 540, 1390, 200]] }, mood: { aries: 'happy' }, line: ['aries', 'I left early | this time.'] },
})

// ── hst092 · Capricorn brought a 5-year plan to brunch (Midtown)
function easel(x, lt, slide, k = 1) {
  if (k <= 0) return
  x.save(); x.translate(560, 760); x.scale(k, k)
  box(x, -12, 200, 24, 340, '#6b3b1f', 4); box(x, -200, 200, 20, 340, '#6b3b1f', 4); box(x, 180, 200, 20, 340, '#6b3b1f', 4)
  box(x, -300, -240, 600, 440, BONE, 8); x.fillStyle = '#2e8b57'; x.fillRect(-300, -240, 600, 70)
  txt(x, 'THE 5-YEAR PLAN', 0, -205, { size: 34, col: BONE, font: MONO, weight: 700 })
  slide.forEach((s, i) => fit(x, s, 0, -110 + i * 90, 540, { size: 42, col: INK, font: MONO, weight: 700 }))
  x.restore()
}
const pager = (x, cx, cy, t, on) => { const j = on ? Math.sin(t * 60) * 5 : 0; box(x, cx - 50 + j, cy - 70, 100, 140, '#2a2a3a', 5); x.fillStyle = on && Math.sin(t * 20) > 0 ? BRAKE : '#5a2030'; x.fillRect(cx - 30 + j, cy - 50, 60, 30) }
const hst092 = story({
  hook: 'Capricorn brought | a 5-year plan | to brunch', key: 'Bb',
  close: 'No slides. Just come. Jan 9.', stars: ['capricorn', 'gemini', 'virgo', 'pisces'],
  scenes: [
    { dur: 3.6, title: 'MIDTOWN · BRUNCH', set: (x, t) => brunchFront(x, t), cast: { capricorn: [[0, 330, 1260, 260]], gemini: [[0, 820, 1260, 230]] }, mood: { capricorn: 'squint', gemini: 'happy' }, hops: { capricorn: [0.02], gemini: [0.2, 0.6] }, look: { capricorn: [0, 0] },
      lines: [[0.3, 1.5, 'capricorn', "you're early | too? good."], [2.0, 1.5, 'gemini', 'the wait is | "a while."']] },
    { dur: 3.6, set: (x, t, lt) => { brunchFront(x, t); easel(x, lt, [], Kp(lt, 1.5)) }, cast: { capricorn: [[0, 200, 1300, 230]], gemini: [[0, 900, 1300, 210]] }, mood: { capricorn: 'sparkle', gemini: 'happy' },
      lines: [[0.2, 1.3, 'capricorn', 'perfect.'], [1.6, 1.8, 'capricorn', 'I brought | slides.']], sfx: [SFX.thud(1.5)] },
    { dur: 3.8, set: (x, t, lt) => { brunchFront(x, t); easel(x, lt, ['YEAR 1: DATE', 'YEAR 2: A DOG']) }, cast: { capricorn: [[0, 200, 1300, 230]], gemini: [[0, 900, 1300, 210]] }, mood: { capricorn: 'squint', gemini: 'wide' },
      lines: [[0.3, 1.4, 'capricorn', 'year one.'], [2.0, 1.6, 'gemini', 'a DOG?']] },
    { dur: 3.8, set: (x, t, lt) => { brunchFront(x, t); easel(x, lt, ['YEAR 1: DATE', 'YEAR 2: A DOG', 'YEAR 4: A PORCH', 'IN THE HEIGHTS']) }, cast: { capricorn: [[0, 200, 1300, 230]], gemini: [[0, 900, 1300, 210]] }, mood: { capricorn: 'sparkle', gemini: 'eyeroll' },
      lines: [[0.3, 1.5, 'capricorn', 'a porch. | in the Heights.'], [2.0, 1.6, 'gemini', "it's our | FIRST date."]], sfx: [SFX.womp(2.0)] },
    { dur: 3.6, set: (x, t, lt) => { brunchFront(x, t); easel(x, lt, ['YEAR 5: PICKLEBALL', 'LEAGUE (DOUBLES)']) }, cast: { capricorn: [[0, 200, 1300, 230]], gemini: [[0, 900, 1300, 210]], pisces: [[0, 560, 1420, 140]] }, mood: { capricorn: 'squint', gemini: 'neutral', pisces: 'wide' },
      stick: [[0.6, 2.4, 'STILL NOT BUZZING', BRAKE]], sfx: [SFX.cricket(0.4), SFX.cricket(1.2)] },
    { dur: 3.8, set: (x, t, lt) => { brunchFront(x, t); pager(x, 540, 800, t, lt < 1.6) }, cast: { capricorn: [[0, 260, 1300, 230]], gemini: [[0, 840, 1300, 220]] }, mood: { capricorn: 'wide', gemini: 'sparkle' }, hops: { gemini: [0.2, 0.5] },
      lines: [[1.0, 1.4, 'gemini', "table's ready!"], [2.4, 1.3, 'gemini', 'quick question:']], sfx: [SFX.ding(0.1)] },
    { dur: 3.8, set: (x, t) => { kitchen(x, t, { wall: '#ffe0e8', tile: '#ffb0c8' }); table(x, 540, 640, 1240) }, cast: { capricorn: [[0, 300, 1150, 240]], gemini: [[0, 780, 1150, 230]] }, mood: { capricorn: lt => lt > 1.8 ? 'wide' : 'neutral', gemini: 'happy' },
      lines: [[0.3, 1.6, 'gemini', 'what do you | do for FUN?'], [2.2, 1.3, 'capricorn', '...fun?']], sfx: [SFX.cricket(2.6), SFX.cricket(3.1)] },
    { dur: 3.8, set: (x, t, lt) => { kitchen(x, t, { wall: '#ffe0e8', tile: '#ffb0c8' }); table(x, 540, 640, 1240); taco(x, 460, 1220, 1); taco(x, 620, 1220, 1); if (lt > 1.8) hearts(x, t, 540, 1000, t - lt + 1.8, { n: 8 }) },
      cast: { capricorn: [[0, 300, 1150, 240]], gemini: [[0, 780, 1150, 230]] }, mood: { capricorn: 'happy', gemini: 'sparkle' }, hops: { capricorn: [1.9, 2.2], gemini: [1.9, 2.3] },
      lines: [[0.2, 1.5, 'capricorn', '...I like | breakfast tacos?'], [1.9, 1.8, 'gemini', 'FLOUR | OR CORN?']], sfx: [SFX.cheer(1.9)] },
    { dur: 3.4, set: (x, t) => { kitchen(x, t, { wall: '#ffe0e8', tile: '#ffb0c8' }); table(x, 540, 640, 1240) }, cast: { capricorn: [[0, 300, 1150, 240]], gemini: [[0, 780, 1150, 230]] }, mood: { capricorn: 'heart', gemini: 'heart' },
      lines: [[0.3, 2.6, 'capricorn', 'new plan. | year one: tacos.']] },
  ],
  lesson: { lines: ['A first date', "isn't an interview.", 'Be curious.'], cast: { capricorn: [[0, 330, 1390, 190]], gemini: [[0, 750, 1390, 190]] }, mood: { capricorn: 'happy', gemini: 'sparkle' }, line: ['capricorn', 'flour. obviously.'] },
})

export const W04A = { hst086, hst087, hst088, hst089, hst090, hst091, hst092 }
