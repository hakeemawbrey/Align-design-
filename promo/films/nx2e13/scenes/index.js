// nx2e13 (55 s vertical, "Star Talk Explains, Volume 2", episode 13) · story 0–50.6, then the shared end card.
//   ❓ "How does each *mode* handle a fight?"  ♎ LIBRA ("we argued and i just… agreed. again.") asks; ♑ CAPRICORN teaches:
//   ✦ astrologers say cardinal signs start things, fixed signs hold steady and mutable signs bend · ✦ in a fight that can
//   look like three moves: raise it, hold your ground, give a little · ♥ a healthy fight needs all three: start it kindly,
//   hold your values, bend on the details. The Pisces classmate cries happy tears.
//   Last line (Capricorn): "Start kind. Hold true. *Bend* a little."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { chalkLine, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const LIB = signStar('libra'), CAP = signStar('capricorn')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const XS = [140, 400, 660]
const COL = [EX.chalkPink, EX.chalkYellow, EX.chalkBlue]

/** the three mode icons: an arrow (start), a block (hold), a wave (bend) */
function icons(x, t, B, at, step = 0.5, Y = 200) {
  chalkLine(x, t, { pts: [[B.x0 + XS[0] - 70, B.y0 + Y], [B.x0 + XS[0] + 70, B.y0 + Y]], at, dur: 0.4, color: COL[0], width: 9, arrow: true })
  const k = fadeK(t, at + step, 0.25)
  if (k > 0) { x.save(); x.globalAlpha *= k; x.strokeStyle = COL[1]; x.lineWidth = 7; x.strokeRect(B.x0 + XS[1] - 50, B.y0 + Y - 50, 100, 100); x.fillStyle = 'rgba(255,226,122,0.25)'; x.fillRect(B.x0 + XS[1] - 50, B.y0 + Y - 50, 100, 100); x.restore() }
  const wave = Array.from({ length: 25 }, (_, i) => [B.x0 + XS[2] - 75 + i * 6.25, B.y0 + Y + Math.sin(i / 24 * Math.PI * 3) * 26])
  chalkLine(x, t, { pts: wave, at: at + 2 * step, dur: 0.5, color: COL[2], width: 8 })
}

const CFG = {
  id: 'nx2e13', duration: 55, key: 'Eb',
  q: 'How does each *mode* handle a fight?', qAccent: EX.chalkPink,
  teacher: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 466 },
  student: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, pitch: 698 },
  boardTitle: 'THREE MOVES',
  beats: [
    { // ✦ start · hold · bend
      lines: [
        ['student', 'we argued and i just… *agreed.* again.'],
        ['teacher', 'astrologers say cardinal signs *start* things.', { tag: TAG('astro'), point: [140, 200] }],
        ['teacher', 'fixed signs *hold* steady. mutable signs *bend.*', { point: [530, 200] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, c = b.lines[2].t
        chalkLine(x, t, { pts: [[B.x0 + XS[0] - 70, B.y0 + 200], [B.x0 + XS[0] + 70, B.y0 + 200]], at: a + 0.6, dur: 0.4, color: COL[0], width: 9, arrow: true })
        const k = fadeK(t, c + 0.4, 0.25)
        if (k > 0) { x.save(); x.globalAlpha *= k; x.strokeStyle = COL[1]; x.lineWidth = 7; x.strokeRect(B.x0 + XS[1] - 50, B.y0 + 150, 100, 100); x.fillStyle = 'rgba(255,226,122,0.25)'; x.fillRect(B.x0 + XS[1] - 50, B.y0 + 150, 100, 100); x.restore() }
        const wave = Array.from({ length: 25 }, (_, i) => [B.x0 + XS[2] - 75 + i * 6.25, B.y0 + 200 + Math.sin(i / 24 * Math.PI * 3) * 26])
        chalkLine(x, t, { pts: wave, at: c + 1.2, dur: 0.5, color: COL[2], width: 8 })
      },
      chalk: [
        { dt: 0.3, line: 1, text: 'CARDINAL', x: XS[0], y: 110, size: 28, align: 'center', color: COL[0] },
        { dt: 0.2, line: 2, text: 'FIXED', x: XS[1], y: 110, size: 28, align: 'center', color: COL[1] },
        { dt: 1.0, line: 2, text: 'MUTABLE', x: XS[2], y: 110, size: 28, align: 'center', color: COL[2] },
      ],
    },
    { // ✦ three moves in a fight
      lines: [
        ['teacher', 'in a fight, that can look like three *moves.*', { tag: TAG('astro'), point: [400, 200] }],
        ['teacher', 'raise it. hold your ground. *give a little.*', { point: [400, 330] }],
        ['student', 'and i only know the *give* move.'],
      ],
      draw(x, t, B, b) {
        icons(x, t, B, b.at + 0.1, 0.15, 180)
        const s = b.lines[2].t
        chalkLine(x, t, { pts: [[B.x0 + XS[2] - 90, B.y0 + 410], [B.x0 + XS[2] + 90, B.y0 + 410]], at: s + 0.6, dur: 0.3, color: EX.chalkBlue, width: 5 })
      },
      chalk: [
        { dt: 0.4, line: 1, text: 'RAISE IT', x: XS[0], y: 340, size: 30, align: 'center', color: COL[0] },
        { dt: 1.0, line: 1, text: 'HOLD', x: XS[1], y: 340, size: 30, align: 'center', color: COL[1] },
        { dt: 1.6, line: 1, text: 'GIVE', x: XS[2], y: 340, size: 30, align: 'center', color: COL[2] },
      ],
    },
    { // ♥ all three
      lines: [
        ['teacher', 'a healthy fight needs *all three.*', { tag: TAG('tip'), point: [400, 200] }],
        ['student', 'so holding isn’t the same as *winning?*'],
        ['teacher', 'start it *kindly.* hold your values.', { point: [270, 330] }],
        ['teacher', 'and bend on the *details.*', { point: [660, 330] }],
      ],
      draw(x, t, B, b) {
        icons(x, t, B, b.at + 0.1, 0.15, 180)
        pixHeart(x, B.x0 + 400, B.y0 + 278, 6, popK(t, b.lines[0].t + 0.8))
      },
      chalk: [
        { dt: 0.4, line: 2, text: '*KINDLY*', x: XS[0], y: 340, size: 30, align: 'center' },
        { dt: 1.2, line: 2, text: '*VALUES*', x: XS[1], y: 340, size: 30, align: 'center' },
        { dt: 0.6, line: 3, text: '*DETAILS*', x: XS[2], y: 340, size: 30, align: 'center' },
      ],
    },
  ],
  bulb: 'so i get to *start* things too?',
  items: ['Start, hold, *bend*', 'Fights need *all three*', 'Bend on *details*, not values'],
  last: 'Start kind. Hold true. *Bend* a little.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e13: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
