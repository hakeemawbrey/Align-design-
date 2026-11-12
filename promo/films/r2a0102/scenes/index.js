// r2a0102: star_advice, ADVICE SOLO, "Aquarius, feelings | aren't a bug." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): feelings, reframed in Aquarius' own tech language, one gag each.
//   0.0–3.6    "Aquarius, feelings | *aren't a bug.*"
//   3.6–37.8   nine cards (3.8 s each):
//              teary at a sunset, working as intended (ERROR → FEATURE) · missing a friend, nothing to fix (toolbox)
//              · got jealous, human not a robot · cried at a dog video, fully valid · need a hug, just ask
//              · heart skipped: a crush, not a crash (new match) · overwhelmed, reboot with a nap · said "I miss you" first,
//              brave not buggy · feelings on, the best setting (a toggle)
//  37.8        "Not broken. | *Beautifully human.*"  Aquarius comes back, big.
//  41.2        callback: "Bug report: | *It's a feature.*"  the ERROR window comes back, stamped FEATURE.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#6fc3ff', RED = '#e23d4e'
const S = 'aquarius'

// ── props
// a little OS dialog window
function dialog(x, cx, cy, k, title, body, { w = 380, h = 240, bar = RED } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = bar; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -w / 2 + 20, -h / 2 + 29)
  x.fillStyle = INK; x.fillRect(w / 2 - 44, -h / 2 + 14, 28, 28)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'
  String(body).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, 28 + (i - (a.length - 1) / 2) * 46))
  x.restore()
}
function toolbox(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -60, 340, 190); x.fillStyle = RED; x.fillRect(-160, -50, 320, 170)
  x.fillStyle = '#b02a3a'; x.fillRect(-160, 10, 320, 14)
  x.save(); x.translate(-170, -60); x.rotate(-open * 0.5)
  x.fillStyle = INK; x.fillRect(0, -50, 340, 56); x.fillStyle = '#ff6b5a'; x.fillRect(8, -42, 324, 42)
  x.fillStyle = INK; x.fillRect(120, -90, 100, 16); x.fillRect(120, -90, 16, 44); x.fillRect(204, -90, 16, 44)
  x.restore()
  x.restore()
}
function robot(x, t, cx, cy, k, beat) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -230, 12, 60); x.beginPath(); x.arc(0, -236, 18, 0, 7); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, -236, 11, 0, 7); x.fill()
  x.fillStyle = INK; x.fillRect(-150, -180, 300, 340); x.fillStyle = '#9aa5c4'; x.fillRect(-140, -170, 280, 320)
  x.fillStyle = INK; x.fillRect(-90, -120, 50, 50); x.fillRect(40, -120, 50, 50)
  x.fillStyle = SKYB; x.fillRect(-80, -110, 30, 30); x.fillRect(50, -110, 30, 30)
  x.fillStyle = '#6b7290'; x.fillRect(-110, 90, 220, 30)
  const s = 1 + 0.15 * beat * Math.max(0, Math.sin(t * 9))
  x.save(); x.translate(0, 10); x.scale(s, s); drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 0, 0, 10 * beat)
  x.restore()
  x.restore()
}
const DOG = ['T......T.', 'TT....TT.', 'BBBBBBBB.', 'BKBBBKBB.', 'BBBNNBBBT', 'BBBBBBBBT', '.BBBBBBB.', '.BB...BB.']
const DOG_C = { T: '#b06a4a', B: '#e8a24a', K: INK, N: INK }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function pulse(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -110, 400, 220); x.fillStyle = '#0e2a22'; x.fillRect(-190, -100, 380, 200)
  x.strokeStyle = MINT; x.lineWidth = 6; x.lineJoin = 'round'; x.beginPath()
  const skip = lt > 0.9
  for (let i = 0; i <= 76; i++) { const u = i / 76, px = -180 + u * 360; let py = 0; const ph = (u * 3 + lt * 0.6) % 1; if (ph > 0.45 && ph < 0.55) py = -70 * Math.sin((ph - 0.45) / 0.1 * Math.PI) * (skip && u > 0.5 ? 1.5 : 1); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  x.restore()
}
function loading(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -40, 380, 80); x.fillStyle = '#2a2350'; x.fillRect(-180, -30, 360, 60)
  x.fillStyle = MINT; x.fillRect(-180, -30, 360 * p, 60)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`REBOOTING ${Math.round(p * 100)}%`, 0, -80)
  x.restore()
}
function toggle(x, t, cx, cy, k, on) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-150, -70, 300, 140, 70); x.fill()
  x.fillStyle = on > 0.5 ? MINT : '#6b7290'; x.beginPath(); x.roundRect(-140, -60, 280, 120, 60); x.fill()
  const kx = lerp(-80, 80, on)
  x.fillStyle = INK; x.beginPath(); x.arc(kx, 0, 58, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(kx, 0, 50, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Teary at a sunset? | *Working as intended.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt < 1.3 ? 1 : 0, look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fixed = lt > 1.2
      dialog(x, 755, 860, 1.1 * pop01(t, P.t0 + 0.25, 0.3, 2), fixed ? 'NOTICE' : 'ERROR', fixed ? 'FEELINGS: | FEATURE' : 'FEELINGS | DETECTED', { bar: fixed ? '#2fc79a' : RED })
      if (fixed) sparkles(x, t, 780, 860, P.t0 + 1.2 * 1.29, 7, 220, 0.4, [MINT, BONE, AQ])
    } },
  { sign: S, cap: 'Missing a friend? | *Nothing to fix.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      toolbox(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.5, 0.8)) * (1 - ease.inCubic(prog(lt, 1.1, 1.4))))
      label(x, 790, 720, 'NOTHING BROKEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got jealous? | *Human, not a robot.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      robot(x, t, 790, 900, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.9, 1.2)))
      label(x, 790, 1150, 'EVEN ROBOTS FEEL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at a dog video? | *Fully valid.*', mood: 'wide', tears: lt => lt > 0.7 ? 2 : 0, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => { drawBits(x, DOG, DOG_C, 0, -10 + Math.abs(Math.sin(t * 6)) * -10, 18); x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('he found a stick', 0, 120) })
      label(x, 790, 1140, 'VALID', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Need a hug? | *Just ask.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -120 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(860, 650, near), 940, 220 * k, { mood: 'heart', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 300, 620, 'hug?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'br' })
      if (lt > 1.2) hearts(x, t, 520, 820, P.t0 + 1.2 * 1.29, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 3 })
    } },
  { sign: S, cap: 'Heart skipped? | *A crush, not a crash.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.0],
    front(x, t, lt, P) {
      pulse(x, t, 780, 820, 0.95 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1040, '✦ NEW MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Overwhelmed? | *Reboot with a nap.*', mood: lt => lt > 0.8 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      loading(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.6))
      label(x, 790, 1080, 'DO NOT DISTURB', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “I miss you” first? | *Brave, not buggy.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'i miss you', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      bubble(x, 820, 900, 'miss you MORE', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      if (lt > 1.2) hearts(x, t, 800, 980, P.t0 + 1.2 * 1.29, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Feelings: on? | *Best setting.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      toggle(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outBack(prog(lt, 0.7, 1.0)))
      label(x, 790, 700, 'FEELINGS', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1030, 'ON. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0102', key: 'F', accent: AQ, solo: S, ending: 'callback',
  title: 'Aquarius, feelings | *aren’t a bug.*',
  cameos: CAMEOS,
  group: { cap: 'Not broken. | *Beautifully human.*', mood: 'sparkle' },
  last: {
    text: 'Bug report: | *It’s a feature.*',
    draw(x, t, lt) {
      dialog(x, 700, 1110, 1.4 * pop01(t, t - lt + 0.3, 0.45, 1.8), 'BUG #1: FEELINGS', ' ', { bar: '#2fc79a' })
      label(x, 720, 1170, 'FEATURE', pop01(t, t - lt + 1.2, 0.3, 2.8), { size: 72, bg: MINT, rot: -0.14 })
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 290, 1000, 270 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 44, hops: [t - lt + 1.4] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
