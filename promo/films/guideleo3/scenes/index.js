// guideleo3 (20 s vertical Align ad, Star Talk "Your Star Guide", note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.30  "Try this week, *Leo*."  ♌ your star in its crown, heart-eyed over its clipboard: DATE NIGHT PLAN,
//              "★ my favorite restaurant". A lavender star waits beside it.
//   2.50–6.50  YOUR STAR: "plan a date around what they love."  The friend dreams "mini golf!"; Leo crosses out its own
//              pick and writes "their favorite: mini golf". Chip: in traditional astrology Leo rules the heart.
//   6.60–11.55 YOUR STAR: "their favorite. not yours. we'll check."  A gold WE CHECKED ✓ stamp slams onto the plan;
//              a little pixel golf flag pops up and the friend goes heart-eyed.
//   11.62–15.6 card flip · "Their *favorite*, not yours."  The same clipboard as frame 0, fixed.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm, bubble } from './guidefilm.js'
import { INK, MONO, SERIF, drawBits, pop01 } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, dream: 3.9, cross: 4.85, write: 5.3, fact: [6.0, 4.3],
  l2: 6.6, stamp: 9.0, flag: 9.6, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 360, y: 1070, size: 300 }
const PAL = { x: 840, y: 1120, size: 200, c: '#c9b8f0' }
const BOARD = { x: 510, y: 710, w: 640, h: 370 }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const CHECK = ['.........GG', '........GGG', '.......GGG.', 'GG....GGG..', 'GGG..GGG...', '.GGGGGG....', '..GGGG.....', '...GG......']
const FLAG = ['.RRRR', '.RRRRR', '.RRRR.', '.W....', '.W....', '.W....', '.W....', 'GGGGGG']
const FLAG_C = { R: '#ff4f6e', W: '#efe6d6', G: '#57c26a' }

function drawBoard(x, t, ok) {
  const { w, h } = BOARD
  const cx = BOARD.x, cy = BOARD.y + Math.sin(t * 2) * 5
  const land = t > T.stamp ? 1 + 0.03 * Math.exp(-(t - T.stamp) * 8) * Math.sin((t - T.stamp) * 40) : 1
  x.save(); x.globalAlpha = ok; x.translate(cx, cy); x.rotate(-0.04); x.scale(land, land)
  x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 26; x.shadowOffsetY = 10
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 18); x.fill()
  x.shadowColor = 'transparent'
  x.fillStyle = '#b9824a'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 12); x.fill()
  x.fillStyle = '#f5eedf'; x.fillRect(-w / 2 + 22, -h / 2 + 30, w - 44, h - 50)
  x.fillStyle = '#9aa3b5'; x.beginPath(); x.roundRect(-70, -h / 2 - 22, 140, 46, 10); x.fill(); x.fillStyle = INK; x.fillRect(-40, -h / 2 - 10, 80, 10)
  x.fillStyle = '#7a6aa8'; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('DATE NIGHT PLAN', -w / 2 + 50, -h / 2 + 76)
  // row 1: Leo's pick, crossed out at T.cross
  x.fillStyle = '#3d3170'; x.font = `italic 500 46px ${SERIF}`
  const r1 = '★ my favorite restaurant'
  x.fillText(r1, -w / 2 + 50, -h / 2 + 150)
  const k = clamp(prog(t, T.cross, T.cross + 0.3))
  if (k > 0) { const tw = x.measureText(r1).width; x.fillStyle = '#ff3d4e'; x.fillRect(-w / 2 + 44, -h / 2 + 146, (tw + 12) * k, 8) }
  // row 2: theirs, writing itself on
  const r2 = '★ their favorite: mini golf'
  const n = Math.round(clamp(prog(t, T.write, T.write + 0.9)) * r2.length)
  x.fillStyle = '#b5761a'; x.font = `italic 600 44px ${SERIF}`
  x.fillText(r2.slice(0, n), -w / 2 + 50, -h / 2 + 228)
  x.restore()
  // the stamp
  const sp = prog(t, T.stamp - 0.12, T.stamp)
  if (sp > 0) {
    const s = lerp(2.4, 1, ease.inQuad(sp))
    x.save(); x.globalAlpha = ok * clamp(sp * 2); x.translate(cx + 150, cy + 128); x.rotate(-0.1); x.scale(s, s)
    x.strokeStyle = '#e6a92a'; x.lineWidth = 8; x.beginPath(); x.roundRect(-150, -36, 300, 72, 12); x.stroke()
    x.fillStyle = '#e6a92a'; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WE CHECKED', 0, 2)
    x.restore()
    drawBits(x, CHECK, { G: '#f2c75c' }, cx - 70, cy + 120, 8 * s, { rot: -0.1, alpha: ok * clamp(sp * 2) })
  }
}

function mood(t) {
  if (t < T.dream) return { mood: 'heart', look: [1, -1] }
  if (t < T.cross) return { mood: 'wide', look: [1, 0] }
  if (t < T.stamp) return { mood: 'happy', look: [1, -1] }
  return { mood: 'sparkle', look: [1, 0] }
}

const film = guideFilm({
  duration: 20, sign: 'leo', n: 3, seed: 3, side: -1,
  hook: 'Try this week, | *Leo.*',
  lines: [{ t: T.l1, text: 'plan a date around what *they* love.' }, { t: T.l2, text: "their favorite. not yours. *we'll check.*" }],
  T, fact: 'IN TRADITIONAL ASTROLOGY,|LEO RULES THE HEART', factY: 1310,
  last: 'Their *favorite,* | not yours.', lastLate: 0, lastSize: 116, lastAccent: 160, lastTop: 170, hero: HERO, mood,
  hops: [T.cross, T.write + 0.4, T.stamp + 0.1],
  back(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    drawStarChar(x, PAL.x, PAL.y, PAL.size, t, { color: PAL.c, mood: t < T.dream ? 'neutral' : t < T.flag ? 'sparkle' : 'heart', look: [-1, -1], seed: 6, glow: 0.8, pop: ok, hops: [T.dream, T.flag + 0.1] })
    const fp = easeOutBack(prog(t, T.flag, T.flag + 0.35), 2.5)
    if (fp > 0) drawBits(x, FLAG, FLAG_C, 620, 1180, 13 * fp, { alpha: ok, rot: 0.05 * Math.sin(t * 3) })
  },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    const cell = Math.round(HERO.size / 36)
    drawBits(x, CROWN, CROWN_C, r.x, r.top + cell * 0.6, cell, { rot: -0.2 + 0.04 * Math.sin(t * 3), alpha: ok })
    drawBoard(x, t, ok)
    const ds = pop01(t, T.dream, 0.3, 2.4) * (1 - prog(t, T.l2 - 0.2, T.l2 + 0.1))
    bubble(x, PAL.x + 10, PAL.y - 260, ds, 'mini golf!', { thought: true, tail: 'br', size: 54, color: '#5b4a9a' })
  },
  cues: [
    ['pluck', 0.3, 1174.66, 0.035, 0.5, 0], ['pluck', 0.6, 1567.98, 0.03, 0.5, 0],
    ['pop', T.dream, 987.77, 0.035, 0.3], ['whoosh', T.cross, 0.25, 0.03], ['tick', T.cross + 0.05, 0.03], ['tick', T.cross + 0.2, 0.03],
    ...[0, 0.2, 0.4, 0.6, 0.8].map(d => ['tick', T.write + d, 0.018]),
    ['whoosh', T.stamp - 0.15, 0.25, 0.03], ['boom', T.stamp, 0.14], ['pop', T.stamp, 523.25, 0.05, 0.2], ['bell', T.stamp + 0.1, 1760, 0.03, 1.0, 0],
    ['pop', T.flag, 1318.51, 0.04, 0.1], ['glitter', T.flag, T.flag + 0.7],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
