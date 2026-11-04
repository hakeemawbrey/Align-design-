// nx2e05 (50 s vertical, "Star Talk Explains, Volume 2", episode 5) · story 0–45.6, then the shared end card.
//   ❓ "Is there a *dark side* of the Moon?"  ♏ SCORPIO ("show me your dark side") asks; ☽ THE MOON teaches: ✓ the Moon
//   spins once for every lap around Earth, so we always see the same face · ✓ the far side gets as much sunlight; "dark"
//   only meant unseen · ✦ astrologers read the Moon as the private you · ♥ everyone has a side you haven't seen yet; let
//   them show it when they're ready. The Pisces classmate cries happy tears. Last line (the Moon): "Unseen isn't *dark*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, moonPhase, litHalf, pixHeart, disc, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const SCO = signStar('scorpio')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })

/** a moon seen from above with a pink "face" mark pointing at angle `face` */
function facedMoon(x, cx, cy, r, face, a) {
  if (a <= 0) return
  disc(x, cx, cy, r, EX.chalk, a, 0.25)
  disc(x, cx + Math.cos(face) * r * 0.62, cy + Math.sin(face) * r * 0.62, r * 0.26, EX.chalkPink, a, 0.9)
}

const CFG = {
  id: 'nx2e05', duration: 50, key: 'Dm',
  q: 'Is there a *dark side* of the Moon?', qAccent: '#c9a6ff',
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♏ SCORPIO', color: SCO.color, glyph: SCO.glyph, pitch: 600 },
  boardTitle: 'THE FAR SIDE',
  beats: [
    { // ✓ tidally locked: the same face
      lines: [
        ['student', 'show me your *dark side.* i can handle it.'],
        ['teacher', 'i spin once for every lap around *Earth.*', { tag: TAG('sky'), point: [400, 240] }],
        ['teacher', 'so you always see the *same face.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, cx = B.x0 + 400, cy = B.y0 + 240, R = 150
        chalkCircle(x, t, { x: cx, y: cy, r: R, at: a, dur: 0.7, color: EX.chalk, width: 3 })
        earthChalk(x, cx, cy, 36, popK(t, a + 0.1))
        // the Moon laps Earth, its face mark always turned inward
        const g = -Math.PI / 2 + Math.max(0, t - a - 0.6) * 1.1
        facedMoon(x, cx + Math.cos(g) * R, cy + Math.sin(g) * R, 30, g + Math.PI, popK(t, a + 0.5))
        const s = b.lines[2].t
        for (let i = 0; i < 4; i++) {
          const q = i * Math.PI / 2
          facedMoon(x, cx + Math.cos(q) * R, cy + Math.sin(q) * R, 22, q + Math.PI, 0.55 * popK(t, s + 0.3 + i * 0.15, 0.3))
        }
      },
      chalk: [{ dt: 1.3, line: 2, text: 'SAME *FACE*', x: 690, y: 400, size: 32, align: 'center' }],
    },
    { // ✓ the far side gets sunlight
      lines: [
        ['teacher', 'my far side gets just as much *sunlight.*', { tag: TAG('sky'), point: [400, 230] }],
        ['teacher', 'it’s not dark. it’s just *not facing you.*', { point: [400, 230] }],
        ['student', 'so ‘dark’ just meant *unknown?*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 230
        sunChalk(x, B.x0 + 90, Y, 50, t, popK(t, a))
        for (let i = 0; i < 3; i++) chalkLine(x, t, { pts: [[B.x0 + 170, Y - 40 + i * 40], [B.x0 + 320, Y - 40 + i * 40]], at: a + 0.3 + i * 0.1, dur: 0.3, color: EX.chalkYellow, width: 4, dash: [12, 10], arrow: true })
        litHalf(x, B.x0 + 400, Y, 60, Math.PI, popK(t, a + 0.6))
        earthChalk(x, B.x0 + 690, Y, 40, popK(t, a + 0.8))
        const n = b.lines[1].t
        chalkLine(x, t, { pts: [[B.x0 + 640, Y], [B.x0 + 480, Y]], at: n + 0.5, dur: 0.4, color: EX.chalkBlue, width: 4, dash: [6, 8], arrow: true })
      },
      chalk: [{ dt: 1.2, line: 0, text: 'FAR SIDE: *LIT*', x: 330, y: 340, size: 30, align: 'center' }, { dt: 1.0, line: 1, text: 'YOU', x: 690, y: 320, size: 28, align: 'center', color: EX.chalkBlue }],
    },
    { // ✦ the private you
      lines: [
        ['teacher', 'astrologers read the Moon as the *private* you.', { tag: TAG('astro'), point: [400, 230] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, X = B.x0 + 400, Y = B.y0 + 250
        // a chalk door, swinging half open, light spilling out
        chalkLine(x, t, { pts: [[X - 70, Y + 110], [X - 70, Y - 110], [X + 70, Y - 110], [X + 70, Y + 110]], at: a + 0.2, dur: 0.6, width: 5 })
        const o = ease.inOutCubic(prog(t, a + 1.0, a + 1.8))
        const k = fadeK(t, a + 0.8)
        if (k > 0) {
          x.save(); x.globalAlpha *= k
          x.fillStyle = 'rgba(255,226,122,0.35)'; x.fillRect(X - 64, Y - 104, 128 * o, 210)
          x.strokeStyle = EX.chalk; x.lineWidth = 5
          x.beginPath(); x.moveTo(X - 70 + 140 * o, Y - 110 - 18 * o); x.lineTo(X - 70 + 140 * o, Y + 110 + 18 * o); x.lineTo(X - 70, Y + 110); x.lineTo(X - 70, Y - 110); x.closePath(); x.stroke()
          x.restore()
        }
        moonPhase(x, X, Y - 10, 34, 0.5, fadeK(t, a + 1.6) * o)
      },
      chalk: [{ dt: 1.0, text: '*PRIVATE*', x: 150, y: 120, size: 34, align: 'center' }],
    },
    { // ♥ a side you haven't seen yet
      lines: [
        ['teacher', 'everyone has a side you haven’t *seen* yet.', { tag: TAG('tip'), point: [300, 240] }],
        ['teacher', 'let them show it when they’re *ready.*', { point: [560, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        moonPhase(x, B.x0 + 280, B.y0 + 240, 100, 0.5, popK(t, a))
        pixHeart(x, B.x0 + 590, B.y0 + 240, 14, popK(t, b.lines[1].t + 0.6))
      },
      chalk: [{ dt: 1.4, line: 1, text: 'NOT DARK. *NOT YET.*', x: 400, y: 410, size: 32, align: 'center' }],
    },
  ],
  bulb: 'so: not dark. just *shy.* relatable.',
  items: ['Same face *always* faces us', 'The far side gets *sunlight*', 'Let people show it *slowly*'],
  last: 'Unseen isn’t *dark*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e05: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
