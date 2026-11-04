// nx2e06 (45 s vertical, "Star Talk Explains, Volume 2", episode 6) · story 0–40.6, then the shared end card.
//   ❓ "Why does the Moon look *huge* tonight?"  ♈ ARIES asks; ♍ VIRGO teaches (with a chalk ruler on the board):
//   ✓ near the horizon the Moon looks bigger, but it isn't: a pinky at arm's length covers it high or low, and a photo
//   shows the same size · ✓ it's a trick of how brains judge size · ♥ big feelings can look huge at first too: check the
//   real size before you react. The Pisces classmate cries happy tears. Last line (Virgo): "Big feeling. *Same* moon."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { moonPhase, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const ARI = signStar('aries'), VIR = signStar('virgo')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })

/** a chalk ruler from (x0, y) to (x1, y) with ticks */
function ruler(x, t, x0, x1, y, at) {
  const k = fadeK(t, at)
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.strokeStyle = EX.chalkYellow; x.lineWidth = 4; x.shadowColor = EX.chalkYellow; x.shadowBlur = 8
  x.strokeRect(x0, y - 16, x1 - x0, 32)
  for (let X = x0 + 14; X < x1; X += 14) { x.beginPath(); x.moveTo(X, y - 16); x.lineTo(X, y - 16 + ((X - x0) % 70 < 14 ? 16 : 8)); x.stroke() }
  x.restore()
}
/** little chalk rooftops along the horizon */
function roofs(x, t, B, H, at) {
  const pts = [[B.x0 + 20, H]]
  for (let i = 0; i < 5; i++) { const X = B.x0 + 30 + i * 70; pts.push([X, H - 30], [X + 30, H - 55], [X + 60, H - 30], [X + 60, H]) }
  pts.push([B.x1 - 20, H])
  chalkLine(x, t, { pts, at, dur: 0.8, width: 4 })
}

const CFG = {
  id: 'nx2e06', duration: 45, key: 'F',
  q: 'Why does the Moon look *huge* tonight?', qAccent: '#ffe27a',
  teacher: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, pitch: 587 },
  student: { tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, pitch: 784 },
  boardTitle: 'THE BIG MOON',
  beats: [
    { // ✓ it only looks bigger; the pinky test
      lines: [
        ['student', 'the Moon is *massive* tonight! look!'],
        ['teacher', 'near the horizon it *looks* bigger. it isn’t.', { tag: TAG('sky'), point: [200, 280] }],
        ['teacher', 'a pinky at arm’s length covers it *high or low.*', { point: [600, 140] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, p = b.lines[2].t, H = B.y0 + 380
        roofs(x, t, B, H, a - 0.2)
        // the low Moon: drawn big at first, shrinks to its true size on "covers it"
        const shrink = ease.inOutCubic(prog(t, p + 0.6, p + 1.4))
        moonPhase(x, B.x0 + 200, H - 150, lerp(96, 46, shrink), 0.5, popK(t, a + 0.3))
        moonPhase(x, B.x0 + 600, B.y0 + 140, 46, 0.5, popK(t, a + 0.8))
        // the pinky (a chalk fingertip) covering each
        for (const [X, Y, d] of [[B.x0 + 600, B.y0 + 140, 1.5], [B.x0 + 200, H - 150, 1.9]]) {
          const k = fadeK(t, p + d, 0.25)
          if (k <= 0) continue
          x.save(); x.globalAlpha *= k * 0.9
          x.fillStyle = 'rgba(255,200,170,0.85)'; x.strokeStyle = EX.chalk; x.lineWidth = 4
          x.beginPath(); x.roundRect(X - 52, Y - 56, 104, 190, 50); x.fill(); x.stroke()
          x.restore()
        }
      },
      chalk: [{ dt: 0.8, line: 1, text: 'LOW', x: 330, y: 200, size: 30, align: 'center' }, { dt: 1.2, line: 1, text: 'HIGH', x: 720, y: 150, size: 30, align: 'center' }],
    },
    { // ✓ a photo shows the same size; brains judge size
      lines: [
        ['teacher', 'a photo shows it the *same size* too.', { tag: TAG('sky'), point: [400, 200] }],
        ['teacher', 'it’s a trick of how brains *judge size.*', { point: [400, 350] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 200
        chalkLine(x, t, { pts: [[B.x0 + 160, Y - 110], [B.x1 - 160, Y - 110], [B.x1 - 160, Y + 110], [B.x0 + 160, Y + 110], [B.x0 + 160, Y - 110]], at: a, dur: 0.6, width: 5 })
        moonPhase(x, B.x0 + 300, Y + 10, 46, 0.5, popK(t, a + 0.5))
        moonPhase(x, B.x0 + 500, Y - 10, 46, 0.5, popK(t, a + 0.7))
        ruler(x, t, B.x0 + 254, B.x0 + 346, Y + 76, a + 1.2)
        ruler(x, t, B.x0 + 454, B.x0 + 546, Y + 56, a + 1.4)
      },
      chalk: [{ dt: 1.8, line: 0, text: '*=*', x: 400, y: 205, size: 48, align: 'center' }, { dt: 0.9, line: 1, text: 'IT’S A *TRICK*', x: 400, y: 380, size: 38, align: 'center' }],
    },
    { // ♥ big feelings, measured gently
      lines: [
        ['teacher', 'big feelings can look huge at first, *too.*', { tag: TAG('tip'), point: [300, 220] }],
        ['teacher', 'check the real size before you *react.*', { point: [400, 340] }],
        ['student', 'measure first, *panic* later. or never.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t
        const s = lerp(26, 14, ease.inOutCubic(prog(t, c + 0.6, c + 1.4)))
        pixHeart(x, B.x0 + 400, B.y0 + 200, s, popK(t, a + 0.3))
        ruler(x, t, B.x0 + 230, B.x0 + 570, B.y0 + 345, c + 0.3)
      },
      chalk: [{ dt: 1.0, line: 2, text: 'MEASURE *FIRST*', x: 400, y: 420, size: 34, align: 'center' }],
    },
  ],
  bulb: 'same moon. my brain is just *dramatic.*',
  items: ['Low Moon only *looks* bigger', 'Same size in a *photo*', 'Measure feelings *gently*'],
  last: 'Big feeling. *Same* moon.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e06: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
