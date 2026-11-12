// r2t0225: star_talk, SOLO, "Geminis on a first date | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): the most extreme, lovable Gemini first date.
//   0.0–3.6    "Geminis on a first date | *be like.*"
//   3.6–37.8   brought their twin for a second opinion · ordered two meals, ate half of each · forty questions before
//              the menus · live-updated nine group chats · now best friends with the waiter · ran a compatibility check
//              mid-date, twice · suggested a second venue, and a third · told one story, it had sequels · texted "that
//              was fun!" before you got home
//  37.8        "Never boring. | *Not once.*"
//  41.0        LESSON UNLOCKED: "Date a Gemini? | Bring *your curiosity.*"  VIBE: CHATTY
//  46.9        "Their twin | *says hi too.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN, PHONEC } from './props.js'

const S = 'gemini', ST = { x: -190 }, YEL = '#ffd23a'

const PLATE = ['..WWWWWWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']

/** a phone with chat bubbles stacking up */
function phone(x, cx, cy, k, lines, { rot = 0.05, head = 'CHATS' } = {}) {
  card(x, cx, cy, 250, 400, k, { bg: PHONEC, rot }, () => {
    x.fillStyle = DEEP; x.fillRect(-110, -180, 220, 350)
    x.fillStyle = LAV; x.fillRect(-100, -170, 200, 40); txt(x, head, 0, -150, { size: 22, font: MONO, weight: 700 })
    lines.forEach(([s, col], i) => { x.fillStyle = col; x.fillRect(-96 + (i % 2) * 20, -116 + i * 56, 172, 44); txt(x, s, -10 + (i % 2) * 20, -94 + i * 56, { size: 20, font: MONO, weight: 700 }) })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Brought their twin. | *For a second opinion.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 790, 930, 260 * k, { mood: lt > 1.3 ? 'wink' : 'squint', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.5] })
      label(x, 790, 1130, 'TWIN: TAKING NOTES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 680, '…solid 8', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Ordered two meals. | *Ate half of each.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) {
        const cx = 700 + i * 180, k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2)
        drawBits(x, PLATE, { W: CREAM }, cx, 1000, 16 * k)
        const half = lt > 0.8 + i * 0.4
        if (k > 0.5) { x.fillStyle = INK; x.fillRect(cx - 56, 950, half ? 56 : 112, 44); x.fillStyle = i ? '#5fd068' : '#e8a24a'; x.fillRect(cx - 50, 956, half ? 46 : 100, 32) }
      }
      label(x, 790, 760, 'PASTA + TACOS', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'BOTH: HALF', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty questions. | *Before the menus.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const Q = ['fave dinosaur?', 'cats or owls?', 'ever met a ghost?', 'top 3 soups?']
      bubble(x, 790, 720, Q[Math.min(3, Math.floor(lt / 0.55))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 39)
      label(x, 790, 960, `QUESTION ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'MENUS: NOT YET', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Live-updated | *nine group chats.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(lt / 0.35))
      const L = [['GC 1: and??', PINK], ['GC 2: details', SKYB], ['GC 3: is it cute', MINT], ['GC 4: ???', SUN], ['GC 5: TELL US', ORANGE]].slice(0, n)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), L, { head: 'LIVE UPDATES' })
      label(x, 790, 1120, 'GROUP CHATS: 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Now best friends | *with the waiter.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 800, 720, 'see you sunday!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
      label(x, 800, 1140, 'WAITER: NEW BESTIE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Compatibility check. | *Mid-date. Twice.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 660, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 850, 'CHECK 1: YES', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'CHECK 2: STILL YES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 980, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Suggested a second venue. | *And a third.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 880, 340, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#b9e8a0', rot: 0.03 }, () => {
        x.fillStyle = CREAM; x.fillRect(-170, -20, 340, 30); x.fillRect(-40, -170, 30, 340)
        x.strokeStyle = INK; x.lineWidth = 4; x.setLineDash([10, 8]); x.beginPath(); x.moveTo(-110, 110); x.lineTo(-20, -40); x.lineTo(100, 60); x.lineTo(110, -120); x.stroke(); x.setLineDash([])
      })
      ;[[680, 990], [770, 840], [890, 940], [900, 760]].forEach(([px, py], i) => { if (lt > 0.4 + i * 0.35) drawBits(x, PIN, { R: RED, W: CREAM }, px, py - 30, 9) })
      label(x, 790, 1120, `VENUES: ${Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.35))}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Told one story. | *It had sequels.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'anyway, part two—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const n = 2 + Math.floor(clamp((lt - 0.5) / 1.5) * 5)
      label(x, 790, 980, `PART ${n} OF 9`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “that was fun!” | *Before you got home.*', mood: 'heart', look: [1, 1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const L = [['that was fun!!', PINK], ['date 2??', MINT], ['also my twin', SKYB], ['says hi', SKYB]].slice(0, Math.min(4, Math.floor(lt / 0.4) + 1))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), L, { head: '✦ YOUR MATCH' })
      label(x, 790, 1120, 'SENT: 4 SEC LATER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0225', key: 'F', accent: YEL, solo: S, ending: 'lesson',
  title: 'Geminis on a first date | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never boring. | *Not once.*', mood: 'sparkle' },
  lesson: { text: 'Date a Gemini? | Bring *your curiosity.*', chip: 'VIBE: CHATTY' },
  last: { text: 'Their twin | *says hi too.*' },
})
export const DURATION = F.DURATION
// line one is long: widen the title box so it stays on one line, then scale it to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-90px', width: '1260px', transformOrigin: '50% 0', transform: 'scale(0.8)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
