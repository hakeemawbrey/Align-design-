// nx2e15 (50 s vertical, "Star Talk Explains, Volume 2", episode 15) · story 0–45.6, then the shared end card.
//   ❓ "Why do same-element signs make a *triangle*?"  ♈ ARIES asks; ♌ LEO teaches: ✦ the wheel has 12 signs of 30° each,
//   and the elements repeat in order (fire, earth, air, water), so same-element signs sit 120° apart: three points of a
//   triangle (the fire triangle on the wheel, then the other three) · ✦ astrologers call 120° a trine and read it as easy
//   flow · ♥ the people who aren't like you teach you too. The Pisces classmate cries happy tears.
//   Last line (Leo): "Easy is nice. *Different* grows you."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { disc, pixHeart, popK } from '../../nx2e01/scenes/x2draw.js'

const ARI = signStar('aries'), LEO = signStar('leo')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const ELC = ['#ff9a6a', EX.chalkGreen, EX.chalkYellow, EX.chalkBlue]
const NAMES = ['ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'SCO', 'SAG', 'CAP', 'AQU', 'PIS']
const RW = 150
const ang = i => Math.PI - i * Math.PI / 6          // Aries at 9 o'clock, then counterclockwise
const pt = (C, i, r = RW) => [C[0] + Math.cos(ang(i)) * r, C[1] + Math.sin(ang(i)) * r]

/** the zodiac wheel: a ring, 12 spokes, a coloured dot + short name per sign; fast = no draw-on */
function wheel(x, t, C, at, fast = false) {
  chalkCircle(x, t, { x: C[0], y: C[1], r: RW, at, dur: fast ? 0.2 : 0.7, color: EX.chalk, width: 3 })
  for (let i = 0; i < 12; i++) {
    const a = ang(i + 0.5)
    chalkLine(x, t, { pts: [[C[0] + Math.cos(a) * (RW - 14), C[1] + Math.sin(a) * (RW - 14)], [C[0] + Math.cos(a) * (RW + 14), C[1] + Math.sin(a) * (RW + 14)]], at: at + (fast ? 0 : 0.5 + i * 0.04), dur: 0.15, width: 3 })
    const [X, Y] = pt(C, i)
    disc(x, X, Y, 10, ELC[i % 4], popK(t, at + (fast ? 0.05 : 0.9 + i * 0.12), 0.25), 0.9)
    const [lx, ly] = pt(C, i, RW + 44)
    chalkText(x, t, { text: NAMES[i], x: lx, y: ly + 8, at: at + (fast ? 0 : 0.9 + i * 0.12), size: 20, align: 'center', color: ELC[i % 4], cps: fast ? 200 : 30 })
  }
}
function triangle(x, t, C, e, at, width = 6, dur = 0.8) {
  const P = [e, e + 4, e + 8, e].map(i => pt(C, i))
  chalkLine(x, t, { pts: P, at, dur, color: ELC[e], width })
}

const CFG = {
  id: 'nx2e15', duration: 50, key: 'Bb',
  q: 'Why do same-element signs make a *triangle?*', qAccent: '#ff9a6a',
  teacher: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, pitch: 587 },
  student: { tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, pitch: 784 },
  boardTitle: 'TRIANGLES',
  beats: [
    { // ✦ 12 × 30°, the elements repeat
      lines: [
        ['student', 'why are the fire signs drawn as a *triangle?*'],
        ['teacher', 'the wheel: 12 signs, 30 degrees *each.*', { tag: TAG('astro'), point: [300, 240] }],
        ['teacher', 'elements repeat: fire, earth, air, *water.*', { point: [300, 240] }],
      ],
      draw(x, t, B, b) {
        wheel(x, t, [B.x0 + 300, B.y0 + 250], b.lines[1].t)
      },
      chalk: [
        { dt: 0.4, line: 2, text: 'FIRE', x: 610, y: 150, size: 30, color: ELC[0] }, { dt: 0.8, line: 2, text: 'EARTH', x: 610, y: 200, size: 30, color: ELC[1] },
        { dt: 1.2, line: 2, text: 'AIR', x: 610, y: 250, size: 30, color: ELC[2] }, { dt: 1.6, line: 2, text: 'WATER', x: 610, y: 300, size: 30, color: ELC[3] },
      ],
    },
    { // ✦ 120° apart → a triangle; four of them
      lines: [
        ['teacher', 'so same-element signs sit *120°* apart.', { tag: TAG('astro'), point: [300, 250] }],
        ['teacher', 'three fire signs: three points of a *triangle.*', { point: [300, 250] }],
        ['student', 'wait. so there are *four* triangles?'],
      ],
      draw(x, t, B, b) {
        const C = [B.x0 + 300, B.y0 + 250]
        wheel(x, t, C, b.at, true)
        triangle(x, t, C, 0, b.lines[1].t + 0.3)
        for (let e = 1; e < 4; e++) triangle(x, t, C, e, b.lines[2].t + 1.0 + (e - 1) * 0.4, 4, 0.5)
      },
      chalk: [{ dt: 0.8, line: 0, text: '*120°*', x: 640, y: 200, size: 46, align: 'center' }],
    },
    { // ✦ the trine
      lines: [
        ['teacher', 'astrologers call 120° a *trine*: easy flow.', { tag: TAG('astro'), point: [300, 250] }],
      ],
      draw(x, t, B, b) {
        const C = [B.x0 + 300, B.y0 + 250]
        wheel(x, t, C, b.at, true)
        triangle(x, t, C, 0, b.at, 6, 0.2)
        // a little glow running round the fire triangle
        const k = Math.max(0, t - b.lines[0].t - 0.6)
        if (k > 0) { const s = (k * 0.5) % 1, seg = Math.floor(s * 3), f = s * 3 - seg; const A = pt(C, seg * 4), Bp = pt(C, seg * 4 + 4); disc(x, A[0] + (Bp[0] - A[0]) * f, A[1] + (Bp[1] - A[1]) * f, 14, EX.chalkYellow, 1, 0.9) }
      },
      chalk: [{ dt: 0.9, line: 0, text: '*TRINE*', x: 640, y: 200, size: 46, align: 'center' }, { dt: 1.5, line: 0, text: 'EASY FLOW', x: 640, y: 260, size: 28, align: 'center' }],
    },
    { // ♥ different teaches you too
      lines: [
        ['teacher', 'the people who *aren’t* like you teach you, too.', { tag: TAG('tip'), point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 250
        chalkLine(x, t, { pts: [[B.x0 + 160, Y - 90], [B.x0 + 250, Y + 70], [B.x0 + 70, Y + 70], [B.x0 + 160, Y - 90]], at: a + 0.2, dur: 0.6, color: ELC[0], width: 6 })
        chalkLine(x, t, { pts: [[B.x0 + 560, Y - 80], [B.x0 + 720, Y - 80], [B.x0 + 720, Y + 80], [B.x0 + 560, Y + 80], [B.x0 + 560, Y - 80]], at: a + 0.8, dur: 0.6, color: ELC[3], width: 6 })
        pixHeart(x, B.x0 + 400, Y, 10, popK(t, a + 1.6))
      },
    },
  ],
  bulb: 'so my squad is a *triangle.* iconic.',
  items: ['12 signs × *30°* = a wheel', 'Same element: *120°* apart', 'Different people *teach* you'],
  last: 'Easy is nice. *Different* grows you.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e15: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
