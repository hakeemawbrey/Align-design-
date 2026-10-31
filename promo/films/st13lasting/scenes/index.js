// st13lasting (60 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E32) · story 0–55.6, then the end card.
//   ❓ "What keeps love *lasting*?" A young ♌ LEO (student) wants a love like the movies; the Aunties (AUNTIE ♋ CANCER with
//   the beaded glasses chain, AUNTIE ♉ TAURUS) teach it as a chalk plant that grows one habit at a time: small daily
//   attention, staying curious, saying thank you, repairing after fights (♥ each). Gag: "He still brings me *tea*." (a
//   steaming teacup, two swooning aunties). Lightbulb: "So it's not fireworks. It's *tea*." Last line (Auntie Cancer):
//   "Love is a *daily* thing."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine } from '../../stexplain.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { cast, drawHearts, bitmap } from './props.js'

const CAN = signStar('cancer'), TAU = signStar('taurus'), LEO = signStar('leo')
const CUP = [
  '..S..S...',
  '...S..S..',
  '..S..S...',
  'OOOOOOO..',
  'OWWWWWOOO',
  'OWPWWWO.O',
  'OWWWWWOOO',
  '.OWWWO...',
  'OOOOOOOO.',
]

const EP = makeLesson({
  id: 'st13lasting', numeral: 'S13 E32', duration: 60, key: 'Eb',
  q: 'What keeps love *lasting*?', qAccent: '#ffadc6',
  cast: {
    cancerA: {
      tag: 'AUNTIE ♋ CANCER', color: CAN.color, glyph: CAN.glyph, x: 165, y: 1186, size: 220, enter: 2.2, pitch: 493.88,
      draw: (ctx, X, Y, s, t, o) => cast(ctx, X, Y, s, t, { color: CAN.color, glyph: CAN.glyph, ...o, glasses: { chain: true, ...(o.glasses || {}) } }),
    },
    taurusA: {
      tag: 'AUNTIE ♉ TAURUS', color: TAU.color, glyph: TAU.glyph, x: 395, y: 1186, size: 220, enter: 2.4, pitch: 415.3,
      draw: (ctx, X, Y, s, t, o) => cast(ctx, X, Y, s, t, { color: TAU.color, glyph: TAU.glyph, ...o, glasses: { frame: '#3d2a6e', ...(o.glasses || {}) } }),
    },
    leo: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, x: 880, y: 1196, size: 190, x0: 600, y0: 930, size0: 420, pitch: 783.99 },
  },
  student: 'leo',
  board: { title: 'LOVE THAT LASTS' },
  lines: [
    ['leo', 'I want a love like in the *movies*.'],
    ['cancerA', 'Oh, honey. Movies *end*. We\'re still going.'],
    ['taurusA', 'Lasting love is small stuff. *Daily*.', { mark: 'daily' }],
    ['cancerA', 'Notice them. A little, every *day*.'],
    ['taurusA', 'And stay *curious*. People keep changing.', { mark: 'curious' }],
    ['leo', 'Curious? You\'ve known him *forever*.'],
    ['taurusA', 'And he still brings me *tea*.', { mark: 'tea' }],
    ['cancerA', 'Mine still asks how I *slept*.', { mark: 'slept' }],
    ['cancerA', 'Say *thank you*. Out loud. Often.', { mark: 'thanks' }],
    ['taurusA', 'And after a fight? *Repair*.', { mark: 'repair' }],
    ['cancerA', 'A sorry, a hug, a *fresh start*.'],
    ['leo', 'So it\'s not fireworks. It\'s *tea*.', { mark: 'bulb' }],
    ['taurusA', 'Fireworks are nice. Tea is *daily*.'],
  ],
  chalk: [
    { text: '1. Small *daily* attention', at: ['daily', 0.6], x: 0, y: 90, size: 38 },
    { text: '2. Stay *curious*', at: ['curious', 0.6], x: 0, y: 168, size: 38 },
    { text: '3. Say *thank you*', at: ['thanks', 0.5], x: 0, y: 246, size: 38 },
    { text: '4. *Repair* after fights', at: ['repair', 0.5], x: 0, y: 324, size: 38 },
  ],
  tags: [
    { kind: 'tip', at: ['daily', 1.9], out: ['curious', 1.5], x: 0, y: 440 },
    { kind: 'tip', at: ['curious', 1.7], out: ['thanks', 1.4], x: 0, y: 440 },
    { kind: 'tip', at: ['thanks', 1.6], out: ['repair', 1.4], x: 0, y: 440 },
    { kind: 'tip', at: ['repair', 1.6], x: 0, y: 440 },
  ],
  bulb: ['bulb', 0.25],
  recap: ['Notice them *daily*', 'Stay curious. Say *thanks*.', 'After fights, *repair*'],
  last: 'Love is a *daily* thing.', lastWho: 'cancerA',
  maxExtra: 0.8,
  moods(who, t, T) {
    const swoon = t >= T.m.tea + 0.6 && t < T.m.thanks
    if (who === 'leo') {
      if (t < T.walk[0]) return { mood: 'sparkle', look: [-1, -1], tilt: -0.1 }
      if (t < T.m.daily) return { mood: 'sparkle', look: [-1, 0] }
      if (t >= T.m.tea + 0.6 && t < T.m.slept + 1.5) return { mood: 'wide', look: [-1, 0] }
      if (t < T.bulb) return { mood: 'neutral', look: [-1, -1] }
      return { mood: 'happy', look: [-1, 0] }
    }
    if (swoon) return { mood: 'heart', look: [0, 0], glasses: { down: 1 } }
    if (t < T.m.daily) return { mood: 'happy', look: [1, 0] }
    if (t >= T.bulb) return { mood: 'happy', look: [1, 0] }
    return { mood: 'neutral', look: who === 'cancerA' ? [1, -1] : [1, 0] }
  },
  draw(x, t, T, B) {
    // the plant: a chalk pot, then one growth stage per habit
    const px = B.x0 + 640, base = B.y0 + 470
    const pot = T.boardAt + 0.6
    chalkLine(x, t, { pts: [[px - 70, base - 80], [px - 55, base], [px + 55, base], [px + 70, base - 80], [px - 70, base - 80]], at: pot, dur: 0.5, color: CHALK.gold })
    const st = [T.m.daily + 1.0, T.m.curious + 1.0, T.m.thanks + 1.0, T.m.repair + 1.0]
    const h = [0, 110, 190, 260, 320]
    let n = 0
    st.forEach(s => { if (t >= s) n++ })
    const g = n ? ease.outBack(clamp(prog(t, st[n - 1], st[n - 1] + 0.5))) : 0
    const H = n ? lerp(h[n - 1], h[n], g) : 0
    if (H > 0) {
      x.save(); x.strokeStyle = CHALK.green; x.lineWidth = 7; x.lineCap = 'round'
      x.shadowColor = 'rgba(168,240,184,0.5)'; x.shadowBlur = 8
      x.beginPath(); x.moveTo(px, base - 80)
      for (let y = 0; y <= H; y += 10) x.lineTo(px + Math.sin(y / 40 + t * 0.8) * 8, base - 80 - y)
      x.stroke()
      // leaves, a pair per stage reached
      const leaves = n * 2 - (g < 0.6 ? 2 : 0)
      for (let i = 0; i < leaves; i++) {
        const ly = base - 110 - i * 34, side = i % 2 ? 1 : -1
        if (ly < base - 80 - H + 20) continue
        x.fillStyle = CHALK.green
        x.beginPath(); x.ellipse(px + side * 30 + Math.sin(ly / 40 + t * 0.8) * 8, ly, 28, 12, side * -0.5, 0, Math.PI * 2); x.fill()
      }
      x.restore()
    }
    // the bloom at stage 4
    const bk = n >= 4 ? ease.outBack(clamp(prog(t, st[3] + 0.3, st[3] + 0.8))) : 0
    if (bk > 0) {
      const fx = px + Math.sin((H) / 40 + t * 0.8) * 8, fy = base - 80 - H
      x.save(); x.translate(fx, fy); x.scale(bk, bk)
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t * 0.3; x.fillStyle = CHALK.pink; x.beginPath(); x.arc(Math.cos(a) * 24, Math.sin(a) * 24, 17, 0, Math.PI * 2); x.fill() }
      x.fillStyle = CHALK.gold; x.beginPath(); x.arc(0, 0, 15, 0, Math.PI * 2); x.fill()
      x.restore()
    }
    // a watering-can drip at each stage
    st.forEach((s, i) => {
      const d = t - s + 0.7
      if (d < 0 || d > 0.7) return
      for (let k = 0; k < 4; k++) {
        const yy = base - 80 - h[i + 1] - 90 + ((d * 300 + k * 30) % 90)
        x.fillStyle = CHALK.blue; x.fillRect(px - 30 + k * 18, yy, 6, 12)
      }
    })
  },
  front(x, t, T, Rr) {
    const tA = Rr.taurusA, cA = Rr.cancerA
    // the tea: a steaming pixel teacup popping up beside Auntie Taurus
    const k = clamp(prog(t, T.m.tea + 0.5, T.m.tea + 0.8)) * (1 - clamp(prog(t, T.m.thanks, T.m.thanks + 0.3)))
    if (tA && k > 0) {
      const P = 15, cx = tA.x + tA.size * 0.62, cy = tA.top + 20 - 6 * Math.sin(t * 3)
      x.save(); x.globalAlpha *= k
      const sOff = Math.floor(t * 5) % 2
      bitmap(x, CUP.map((r, j) => (j < 3 && sOff ? r.slice(1) + '.' : r)), { O: '#1b1236', W: '#fbf3e2', P: '#ff8fb1', S: 'rgba(255,255,255,0.75)' }, cx - 4.5 * P, cy - 4.5 * P, P)
      x.restore()
      drawHearts(x, t, T.m.tea + 0.7, tA.x, tA.top - 10, { n: 6, px: 6, spread: 120 })
    }
    if (cA) drawHearts(x, t, T.m.slept + 0.5, cA.x, cA.top - 10, { n: 6, px: 6, spread: 120 })
    if (cA) drawHearts(x, t, T.last + 0.2, cA.x, cA.top - 10, { n: 6, px: 6, spread: 120 })
  },
  cues: T => [['pluck', +(T.m.tea + 0.55).toFixed(3), 1567.98, 0.05, 0.7, 0], ['pluck', +(T.m.tea + 0.75).toFixed(3), 2093, 0.04, 0.7, 0],
    ...[T.m.daily, T.m.curious, T.m.thanks, T.m.repair].map(s => ['pop', +(s + 1.0).toFixed(3), 880, 0.03, 0.2])],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
