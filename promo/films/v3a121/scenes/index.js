// v3a121: star_advice, ADVICE SOLO, "Aquarius, read this | before your next date." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle first-date advice for an Aquarius, one gag each.
//   0.0–3.6    "Aquarius, read this | before *your date.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              lost in a thought cloud of gears, an alarm rings: DATE IN 10 · hands Taurus the mic: "your turn!"
//              · opens with "octopuses have three hearts", Cancer is charmed · frozen in an ice block that melts: WARMING UP
//              · says "I'm having so much fun!" out loud, Leo blushes · wears a silver cape: FULLY YOU
//              · picks a very-them date: a planetarium ticket, ADMIT TWO · phone face down: THEY'RE THE SHOW
//              · the charts click (a chart wheel with a heart line): now say hi
//  37.8        "Be weird. | *Be warm.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "Let them meet | *the real you.*"  DATE: GOING GREAT
//  46.9        "Octopus fact? | *Second date.*"  (card three, paid off). No match card.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#5fc8ff', RED = '#e23d4e', SILVER = '#c9d3e8'
const S = 'aquarius'

// ── props
const OCTO = ['..PPPP..', '.PPPPPP.', 'PPWKPWKP', 'PPPPPPPP', '.PPPPPP.', 'P.P.P.P.', 'P.P..P.P']
const OCTO_C = { P: '#ff8fb1', W: '#fff', K: INK }
const GEAR = ['..G.G..', '.GGGGG.', 'GGG.GGG', '.G...G.', 'GGG.GGG', '.GGGGG.', '..G.G..']
const MIC = ['.KKK.', 'KSSSK', 'KSSSK', 'KSSSK', '.KKK.', '..D..', '..D..', '..D..', '..D..', '.DDD.']
const MIC_C = { K: INK, S: SILVER, D: '#4a4470' }

function phone(x, cx, cy, k, { head = '', headBg = MINT, lines = [], lineBg = '#2a2350', ink = BONE, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-100, -146, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -122) }
  lines.forEach(([txt, a], i) => {
    if (a <= 0.01) return
    x.save(); x.translate(0, -40 + i * 92); x.scale(a, a)
    x.fillStyle = lineBg; x.fillRect(-96, -38, 192, 76)
    x.fillStyle = ink; x.font = `800 26px ${INTER}`
    String(txt).split('|').forEach((l, j, arr) => x.fillText(l.trim(), 0, (j - (arr.length - 1) / 2) * 30 + 2))
    x.restore()
  })
  x.restore()
}
// a thought cloud (puffs + two trailing dots)
function cloud(x, cx, cy, k, w = 300, h = 170) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puffs = [[-w * 0.3, 0, h * 0.42], [0, -h * 0.18, h * 0.5], [w * 0.3, 0, h * 0.42], [-w * 0.12, h * 0.2, h * 0.38], [w * 0.14, h * 0.2, h * 0.38]]
  x.fillStyle = INK; for (const [px, py, r] of puffs) { x.beginPath(); x.arc(px, py, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; for (const [px, py, r] of puffs) { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  for (const [px, py, r] of [[-w * 0.42, h * 0.62, 18], [-w * 0.52, h * 0.85, 11]]) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// a ringing alarm clock
function clock(x, t, cx, cy, k, ring) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (ring ? Math.sin(t * 60) * 6 : 0), cy); x.rotate(ring ? Math.sin(t * 50) * 0.08 : 0); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(-52, -62, 30, 0, Math.PI * 2); x.arc(52, -62, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-52, -62, 22, 0, Math.PI * 2); x.arc(52, -62, 22, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -42); x.moveTo(0, 0); x.lineTo(30, 10); x.stroke()
  x.restore()
  if (ring) { x.save(); x.strokeStyle = BONE; x.lineWidth = 6; for (const s of [-1, 1]) { x.beginPath(); x.arc(cx, cy, 120 + 10 * Math.sin(t * 20), s < 0 ? Math.PI * 0.8 : -Math.PI * 0.2, s < 0 ? Math.PI * 1.2 : Math.PI * 0.2); x.stroke() } x.restore() }
}
// a birth-chart wheel with two glyphs and a heart line between them
function chart(x, t, cx, cy, k, link) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 178, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#241a52'; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 130, Math.sin(a) * 130); x.lineTo(Math.cos(a) * 170, Math.sin(a) * 170); x.stroke() }
  x.rotate(-t * 0.15)
  const A = [-80, -40], B = [80, 40]
  if (link > 0.01) { x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(lerp(A[0], B[0], link), lerp(A[1], B[1], link)); x.stroke() }
  x.font = `700 54px 'Segoe UI Symbol', 'Noto Sans Symbols', ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (const [[px, py], g, c] of [[A, '♒︎', AQ], [B, '♌︎', GOLD]]) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.fillText(g, px, py + 2) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Lost in thought? | An alarm *helps.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, -1], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      const c = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      cloud(x, 640, 640, c)
      if (c > 0.01) for (const [gx, gy, s] of [[580, 630, 9], [680, 610, 7], [700, 680, 5]]) { x.save(); x.translate(gx, gy); x.rotate(t * (s > 6 ? 1.5 : -2)); drawBits(x, GEAR, { G: '#8c88b8' }, 0, 0, s * c); x.restore() }
      clock(x, t, 820, 960, pop01(t, P.t0 + 0.9, 0.3, 2.2), lt > 1.0)
      label(x, 800, 1130, 'DATE IN 10 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about them too. | *They’re fun.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 960, 200 * k, { mood: lt > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.9] })
      const hand = ease.inOutCubic(prog(lt, 0.7, 1.3))
      drawBits(x, MIC, MIC_C, lerp(470, 680, hand), 940, 11 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(-0.4, 0.4, hand) })
      bubble(x, 460, 610, 'your turn!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 820, 1150, 'TAURUS: TALKING', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your weird fact | is *a great opener.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 520, 600, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, OCTO, OCTO_C, 580, 1090, 16 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { rot: Math.sin(t * 3) * 0.1 })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 960, 200 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.6] })
      hearts(x, t, 820, 860, P.t0 + 1.6, { n: 5, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Cool is fine. | *Warm* is better.', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [0, 0], star: { x: 0, y: 0, s: 280 },
    back(x, t, lt, P) {
      const melt = ease.inOutCubic(prog(lt, 0.6, 1.8)), k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      if (k <= 0.01) return
      const h = lerp(380, 60, melt), w = lerp(380, 520, melt)
      x.save(); x.globalAlpha = 0.95 * k
      x.fillStyle = INK; x.fillRect(540 - w / 2 - 6, 1060 - h - 6, w + 12, h + 12)
      x.fillStyle = 'rgba(190,235,255,0.55)'; x.fillRect(540 - w / 2, 1060 - h, w, h)
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(540 - w / 2 + 16, 1060 - h + 14, 18, Math.max(0, h - 40))
      x.restore()
    },
    front(x, t, lt, P) {
      const melt = ease.inOutCubic(prog(lt, 0.6, 1.8))
      if (melt < 0.5) { x.save(); x.globalAlpha = 0.35 * (1 - melt * 2); x.fillStyle = 'rgba(190,235,255,1)'; x.fillRect(350, 680, 380, 380); x.restore() }
      label(x, 540, 560, lt > 1.6 ? 'WARMING UP' : 'FROZEN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: lt > 1.6 ? PINK : SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 540, 820, P.t0 + 2.2, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Having fun? | *Say it out loud.*', mood: lt => lt > 0.9 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 820, 960, 210 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 480, 610, 'I’m having | so much fun!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 820, 1150, 'LEO: BLUSHING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wear the cape. | *Be fully you.*', mood: 'sparkle', star: { x: 0, s: 290 }, hops: [0.5, 1.4],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.8)
      if (k <= 0.01) return
      const sway = Math.sin(t * 3) * 20
      x.save(); x.translate(540, F.cy - 40)
      const q = (o) => { x.beginPath(); x.moveTo(-70 + o, 20 + o); x.lineTo(70 - o, 20 + o); x.lineTo((-60 + sway) * k - o, 230 * k - o); x.lineTo((-300 + sway * 1.6) * k + o, 190 * k - o); x.closePath(); x.fill() }
      x.fillStyle = INK; q(-8); x.fillStyle = SILVER; q(0)
      x.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) x.fillRect((-230 + i * 50 + sway) * k, (150 + (i % 2) * 30) * k, 10, 10)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 540, 570, 'FULLY YOU', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: AQ, rot: -0.04 })
      sparkles(x, t, 540, 860, P.t0 + 1.0, 8, 230, 0.4)
    } },
  { sign: S, cap: 'Pick a date that’s | *very you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 860); x.rotate(0.08); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -96, 350, 210)
        x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = LAV; x.fillRect(-172, -102, 344, 204)
        x.fillStyle = INK; for (let i = 0; i < 8; i++) x.fillRect(84, -94 + i * 25, 6, 14)
        x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('PLANETARIUM', -40, -50); x.font = `800 44px ${INTER}`; x.fillText('ADMIT', -40, 6); x.fillText('TWO', -40, 54)
        x.fillStyle = GOLD; x.font = `700 40px ${INTER}`; x.fillText('✦', 130, 0)
        x.restore()
      }
      sparkles(x, t, 780, 860, P.t0 + 1.0, 7, 220, 0.2)
      label(x, 780, 1110, 'NERD DATE: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone face down. | *They’re* the show.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 930, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 24, glyph: false, hops: [P.t0 + 1.2, P.t0 + 2.0] })
      const flip = ease.inOutCubic(prog(lt, 0.5, 1.0))
      // a little table with the phone flipping face down
      x.fillStyle = INK; x.fillRect(420, 1090, 520, 22); x.fillStyle = '#c98f2a'; x.fillRect(424, 1094, 512, 14)
      x.save(); x.translate(620, 1070); x.scale(1, lerp(1, 0.25, flip) * pop01(t, P.t0 + 0.1, 0.3, 2))
      x.fillStyle = INK; x.fillRect(-60, -20, 120, 40); x.fillStyle = flip > 0.5 ? '#2a2350' : MINT; x.fillRect(-54, -14, 108, 28); x.restore()
      bubble(x, 800, 650, 'and THEN…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      label(x, 600, 1170, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Charts say match. | *Now* say hi.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -230, s: 260 }, hops: [1.5],
    front(x, t, lt, P) {
      chart(x, t, 760, 850, pop01(t, P.t0 + 0.2, 0.4, 1.8), ease.inOutCubic(prog(lt, 0.6, 1.2)))
      label(x, 760, 1120, 'IT CLICKS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'hi. hello. hey!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3a121', key: 'D', accent: AQ, solo: S, ending: 'lesson',
  title: 'Aquarius, read this | before *your date.*',
  cameos: CAMEOS,
  group: { cap: 'Be weird. | *Be warm.*', mood: 'sparkle' },
  lesson: { text: 'Let them meet | *the real you.*', chip: 'DATE: GOING GREAT' },
  last: { text: 'Octopus fact? | *Second date.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
