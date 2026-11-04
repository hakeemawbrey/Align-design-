// nx2e09 (50 s vertical, "Star Talk Explains, Volume 2", episode 9) · story 0–45.6, then the shared end card.
//   ❓ "Why does the Moon turn *red* in an eclipse?"  ♑ CAPRICORN ("you went red. are you okay?") asks; ☽ THE MOON
//   teaches: ✓ in a total lunar eclipse the Moon is in Earth's shadow · ✓ Earth's air bends a little sunlight into the
//   shadow and the reds get through, as at sunset · ✓ a lunar eclipse is safe to watch, no glasses · ✦ astrologers read
//   lunar eclipses as feelings peaking · ♥ in hard weeks, let your people in. The Pisces classmate cries happy tears.
//   Last line (the Moon): "Even the shadow *glows*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, moonPhase, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const CAP = signStar('capricorn')
const MOONC = '#e9e4ff', RED = '#ff7a5c'
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })

/** the Moon, fading from full to eclipse red by k */
function redMoon(x, cx, cy, r, k, a = 1) {
  if (a <= 0) return
  moonPhase(x, cx, cy, r, 0.5, a * (1 - k))
  if (k > 0) disc(x, cx, cy, r, RED, a * k, 0.75)
}
/** Earth's shadow: a dark wedge from Earth toward +x */
function shadow(x, ex, ey, er, len, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= 0.55 * k; x.fillStyle = '#05100c'
  x.beginPath(); x.moveTo(ex, ey - er); x.lineTo(ex + len, ey - er * 0.6); x.lineTo(ex + len, ey + er * 0.6); x.lineTo(ex, ey + er); x.closePath(); x.fill()
  x.restore()
}

const CFG = {
  id: 'nx2e09', duration: 50, key: 'Cm',
  q: 'Why does the Moon turn *red* in an eclipse?', qAccent: RED,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: '#ffb3a1', pitch: 392 },
  student: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 523 },
  boardTitle: 'THE RED MOON',
  beats: [
    { // ✓ Earth's shadow
      lines: [
        ['student', 'you went *red.* are you okay?'],
        ['teacher', 'Earth slipped between me and the *Sun.*', { tag: TAG('sky'), point: [400, 240] }],
        ['teacher', 'i’m standing in Earth’s *shadow.*', { point: [640, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, s = b.lines[2].t, Y = B.y0 + 240
        sunChalk(x, B.x0 + 80, Y, 50, t, popK(t, a))
        earthChalk(x, B.x0 + 380, Y, 48, popK(t, a + 0.4))
        shadow(x, B.x0 + 380, Y, 48, 330, fadeK(t, s, 0.6))
        redMoon(x, B.x0 + 660, Y, 40, ease.inOutCubic(prog(t, s + 0.4, s + 1.6)), popK(t, a + 0.8))
      },
      chalk: [{ dt: 0.2, line: 1, text: 'SUN', x: 80, y: 340, size: 26, align: 'center' }, { dt: 0.6, line: 1, text: 'EARTH', x: 380, y: 340, size: 26, align: 'center' }, { dt: 1.0, line: 1, text: 'MOON', x: 660, y: 340, size: 26, align: 'center' }, { dt: 1.0, line: 2, text: '*SHADOW*', x: 520, y: 150, size: 30, align: 'center' }],
    },
    { // ✓ the air bends the red in
      lines: [
        ['teacher', 'Earth’s air bends a little *sunlight* in.', { tag: TAG('sky'), point: [380, 240] }],
        ['teacher', 'the reds get through. same as *sunsets.*', { point: [640, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 240, ex = B.x0 + 380
        earthChalk(x, ex, Y, 48, popK(t, a - 0.2))
        chalkCircle(x, t, { x: ex, y: Y, r: 60, at: a + 0.1, dur: 0.6, color: EX.chalkBlue, width: 3 })
        shadow(x, ex, Y, 48, 330, 1)
        redMoon(x, B.x0 + 660, Y, 40, 1, popK(t, a))
        for (const s of [-1, 1]) {
          chalkLine(x, t, { pts: [[B.x0 + 40, Y + s * 70], [ex - 10, Y + s * 66], [ex + 90, Y + s * 40], [B.x0 + 620, Y + s * 10]], at: a + 0.6, dur: 0.8, color: RED, width: 5, arrow: true })
        }
      },
      chalk: [{ dt: 1.0, line: 1, text: 'LIKE A *SUNSET*', x: 200, y: 400, size: 32, align: 'center' }],
    },
    { // ✓ safe to watch
      lines: [
        ['teacher', 'a lunar eclipse is safe to watch, *no glasses.*', { tag: TAG('sky'), point: [300, 240] }],
        ['student', 'finally, a sky thing i can just *stare* at.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, ex = B.x0 + 260, ey = B.y0 + 240
        // a chalk eye
        chalkCircle(x, t, { x: ex, y: ey + 40, r: 90, at: a + 0.2, dur: 0.4, color: EX.chalk, width: 5, from: Math.PI * 1.2, sweep: Math.PI * 0.6 })
        chalkCircle(x, t, { x: ex, y: ey - 40, r: 90, at: a + 0.4, dur: 0.4, color: EX.chalk, width: 5, from: Math.PI * 0.2, sweep: Math.PI * 0.6 })
        disc(x, ex, ey, 22, EX.chalk, popK(t, a + 0.8), 0.9)
        chalkLine(x, t, { pts: [[ex + 130, ey], [ex + 170, ey + 40], [ex + 250, ey - 50]], at: a + 1.2, dur: 0.4, color: EX.mint, width: 9 })
        redMoon(x, B.x0 + 620, B.y0 + 200, 50, 1, popK(t, a + 0.3))
      },
    },
    { // ✦ feelings peaking · ♥ let your people in
      lines: [
        ['teacher', 'astrologers read them as feelings *peaking.*', { tag: TAG('astro'), point: [400, 240] }],
        ['teacher', 'in hard weeks, let your people *in.*', { tag: TAG('tip', 84), point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t, cx = B.x0 + 400, cy = B.y0 + 250
        chalkLine(x, t, { pts: [[cx - 160, cy + 60], [cx - 90, cy - 20], [cx - 40, cy + 30], [cx, cy - 110], [cx + 40, cy + 30], [cx + 90, cy - 20], [cx + 160, cy + 60]], at: a + 0.5, dur: 0.8, color: EX.lilac, width: 4, alpha: 0.7 * (1 - fadeK(t, c)) })
        redMoon(x, cx, cy, 70, 1, popK(t, a))
        for (let i = 0; i < 3; i++) {
          const g = -Math.PI / 2 + i * 2 * Math.PI / 3 + (t - c) * 0.8
          pixHeart(x, cx + Math.cos(g) * 150, cy + 20 + Math.sin(g) * 95, 6, popK(t, c + 0.5 + i * 0.2))
        }
      },
    },
  ],
  bulb: 'so you’re not upset. you’re *backlit.*',
  items: ['Earth’s *shadow* covers it', 'Air bends the *red* light in', 'Safe to watch, *no glasses*'],
  last: 'Even the shadow *glows*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e09: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void lerp
