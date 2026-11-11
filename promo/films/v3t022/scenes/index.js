// v3t022: THE SIGNS AS… v3, "Zodiacs when plans | change be like." (~62 s vertical, signs3kit social cut, music: lofi · D)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Zodiacs when plans | change *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign takes a change of plan (3.8 s each), pushed to the extreme:
//              ♈ already at the new place · ♉ the plan changed, Taurus did not (picket sign) · ♊ changed it four more times
//              · ♋ packed snacks for both plans · ♌ fine, if it was Leo's idea · ♍ had plans C to Z (tabbed binder)
//              · ♎ polled the group chat, it's a tie · ♏ saw it coming, it's in their chart · ♐ new plan? already packed
//              · ♑ said "no problem", eye twitched · ♒ never knew there was a plan · ♓ plan A is gone, lit a candle
//  49.2        "Chaos. | *Every time.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Plans change. | Good *people* stay."  PLAN: FLEXIBLE
//  58.3        "Taurus is still | at *the old place.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const CANDLE = pad([
  '...Y...',
  '..YOY..',
  '..YOY..',
  '...Y...',
  '...K...',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  'BBBBBBB',
])
const CANDLE_C = { Y: GOLD, O: ORANGE, K: INK, W: '#fff4e2', B: '#c98f2a' }
const PACK = pad([
  '...KKKK...',
  '..K....K..',
  '.RRRRRRRR.',
  'RRRRRRRRRR',
  'RRYYYYYYRR',
  'RRYRRRRYRR',
  'RRYYYYYYRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  '.RRRRRRRR.',
])
const PACK_C = { K: '#5b3a22', R: '#ff9a4a', Y: '#c95f2a' }
const BOX = pad([
  'KKKKKKKKKK',
  'KYYYYYYYYK',
  'KYYYYYYYYK',
  'KBBBBBBBBK',
  'KBBBBBBBBK',
  'KBBBBBBBBK',
  'KKKKKKKKKK',
])

/** a sign on a stick (a picket) with text */
function picket(x, cx, cy, k, text, rot = -0.06) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, 60, 24, 230); x.fillStyle = '#8a4a2e'; x.fillRect(-8, 60, 16, 226)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -90, 296, 170)
  x.fillStyle = INK; x.fillRect(-156, -106, 312, 180); x.fillStyle = '#fff4e2'; x.fillRect(-148, -98, 296, 164)
  x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -16 + (i - (a.length - 1) / 2) * 48))
  x.restore()
}
/** a card with two poll bars that tie */
function poll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -122, 300, 260)
  x.fillStyle = INK; x.fillRect(-156, -136, 312, 272); x.fillStyle = '#2a2350'; x.fillRect(-148, -128, 296, 256)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW PLAN?', 0, -92)
  const g = ease.outCubic(prog(lt, 0.5, 1.4))
  ;[['YES', '#7dffb0'], ['NO', '#ff8fb1']].forEach(([w, c], i) => {
    const y = -30 + i * 90
    x.fillStyle = '#140c30'; x.fillRect(-128, y, 256, 60)
    x.fillStyle = c; x.fillRect(-128, y, 128 * g, 60)
    x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.fillText(w, -116, y + 32)
    x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.fillText(`${Math.round(50 * g)}%`, 118, y + 32)
  })
  x.restore()
}
/** a binder with tabs A…Z sticking out */
function binder(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 24)
  const TC = [GOLD, PINK, MINT, SKYB, LAV, ORANGE]
  for (let i = 0; i < n; i++) {
    const y = -150 + (i % 12) * 26, side = i < 12 ? 1 : -1
    x.fillStyle = INK; x.fillRect(side > 0 ? 110 : -146, y - 2, 36, 24)
    x.fillStyle = TC[i % 6]; x.fillRect(side > 0 ? 112 : -144, y, 32, 20)
    x.fillStyle = INK; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String.fromCharCode(67 + i), side > 0 ? 130 : -126, y + 11)
  }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -162, 236, 340)
  x.fillStyle = INK; x.fillRect(-126, -176, 252, 352); x.fillStyle = '#2fc79a'; x.fillRect(-118, -168, 236, 336)
  x.fillStyle = '#fff4e2'; x.fillRect(-80, -100, 160, 90)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLANS', 0, -70); x.fillText('C–Z', 0, -32)
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
/** a small wall calendar with one entry being crossed out */
function calendarX(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = BONE; x.fillRect(-142, -142, 284, 284)
  x.fillStyle = RED; x.fillRect(-142, -142, 284, 56)
  x.fillStyle = '#fff4e2'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -114)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`
  ;['10:00 brunch', '12:30 walk', '15:00 film'].forEach((r, i) => x.fillText(r, 0, -40 + i * 64))
  const g = ease.outCubic(prog(lt, 0.4, 0.9))
  x.fillStyle = RED; x.fillRect(-120, -44, 240 * g, 8); x.fillRect(-120, 20, 240 * clamp(g * 1.4 - 0.2), 8); x.fillRect(-120, 84, 240 * clamp(g * 1.8 - 0.5), 8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'New place? | *Already there.*', mood: 'sparkle', star: { x: 120 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      // speed lines streaking behind the star as it skids in
      const k = 1 - prog(lt, 0.6, 1.2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(150, 790 + i * 40, 300 - i * 30, 10); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 330, 680, 'ARRIVED: 1ST', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05 })
      bubble(x, 330, 1080, 'what took you?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'The plan changed. | Taurus *did not.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', star: { x: -150 },
    front(x, t, lt, P) {
      picket(x, 790, 760, pop01(t, P.t0 + 0.3, 0.35, 2), 'THE OLD | PLAN.')
      label(x, 790, 1120, 'NOT MOVING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Changed it back. | *Four more times.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      label(x, 790, 820, `PLAN v${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 64, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 780, 640, ['ok so—', 'wait no—', 'actually—', 'hear me out—', 'back to v1?'][n - 1], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Packed snacks | for *both plans.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, { K: INK, Y: '#ffd23a', B: '#ff8fb1' }, 730, 1010, 16 * k)
      drawBits(x, BOX, { K: INK, Y: '#7dffb0', B: '#6fc3ff' }, 860, 1000, 16 * pop01(t, P.t0 + 0.45, 0.3, 2))
      label(x, 730, 900, 'PLAN A', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: GOLD, rot: -0.06 })
      label(x, 860, 890, 'PLAN B', pop01(t, P.t0 + 0.85, 0.3, 2), { size: 28, bg: MINT, rot: 0.06 })
      bubble(x, 780, 680, 'everyone eat!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Totally fine. | If it was *Leo’s idea.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, lt < 1.1 ? 'whose idea?' : 'MY idea!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 920, 'IDEA BY: LEO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: 'virgo', cap: 'Plan B? | Virgo has *C to Z.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { binder(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'Polled the group chat. | It’s *a tie.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      poll(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'RE-POLL?', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Saw it coming. | It’s *in their chart.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 1000, 'CALLED IT: TUESDAY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'New plan? | *Already packed.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 320, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      bubble(x, 330, 680, 'where to?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'br' })
      label(x, 320, 1150, 'PASSPORT: READY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Said “no problem.” | *Eye twitched.*', mood: lt => lt > 1.2 ? (Math.floor(lt * 7) % 2 ? 'squint' : 'neutral') : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      calendarX(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 560, 640, 'no problem.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'aquarius', cap: 'There was | *a plan?*', mood: 'happy', look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = '#2a2350'; x.fillRect(-132, -182, 264, 364); x.fillStyle = '#140c30'; x.fillRect(-118, -160, 236, 310)
        x.fillStyle = MINT; x.fillRect(-108, -130, 216, 120); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `800 24px ${INTER}`; x.fillText('✦ your match:', 0, -96); x.fillText('where are you??', 0, -50)
        x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.fillText('14 unread', 0, 40)
        x.restore()
      }
      bubble(x, 560, 640, 'a plan?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Plan A is gone. | Pisces *lit a candle.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      const fl = 1 + 0.08 * Math.sin(t * 17)
      drawBits(x, CANDLE, CANDLE_C, 790, 980, 18 * k, { sy: fl })
      label(x, 790, 760, 'R.I.P. PLAN A', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: LAV, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t022', key: 'D', accent: GOLD, ending: 'lesson',
  title: 'Zodiacs when plans | change *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos. | *Every time.*' },
  lesson: { text: 'Plans change. | Good *people* stay.', chip: 'PLAN: FLEXIBLE' },
  last: { text: 'Taurus is still | at *the old place.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
