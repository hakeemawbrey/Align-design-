// st13seventh (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E35) · story 0–40.6, then the end card.
//   ❓ "What's your *7th house*?"  ♍ VIRGO (clipboard) teaches ♐ SAGITTARIUS at the chalkboard: a chart wheel, its
//   horizon, the rising sign on the left, the descendant exactly opposite, and the 7th house starting there (✦ ✦), the
//   house of partnership (✦), which describes and never picks your person (♥). Lightbulb: "it's a room, not a
//   reservation." Last line (Virgo): "Your sky has a *partner* room."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { EX } from '../../stexplain.js'
import { drawClipboard } from './props.js'
import { makeEpisode, atOf } from './classkit.js'

const VIR = signStar('virgo'), SAG = signStar('sagittarius')
const C = { x: 230, y: 250, r: 140 }          // the chart wheel, board-relative

function wheel(x, t, B, M) {
  const cx = B.x0 + C.x, cy = B.y0 + C.y
  // the 12 house lines, faint, after the circle
  const sp = clamp(prog(t, M.hz + 0.9, M.hz + 1.5))
  if (sp > 0) {
    x.save(); x.globalAlpha *= 0.32 * sp; x.strokeStyle = EX.chalk; x.lineWidth = 3; x.setLineDash([8, 8])
    for (let i = 0; i < 12; i++) { if (i % 6 === 0) continue; const a = i * Math.PI / 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * C.r, cy + Math.sin(a) * C.r); x.stroke() }
    x.restore()
  }
  // the 7th house wedge: from the descendant (right) one slice counterclockwise, above the horizon
  const w7 = clamp(prog(t, M.seventh + 0.2, M.seventh + 0.7))
  if (w7 > 0) {
    const pulse = 0.28 + 0.1 * Math.sin(t * 4)
    x.save(); x.globalAlpha *= w7
    x.fillStyle = `rgba(255,173,198,${pulse})`; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, C.r - 4, 0, -Math.PI / 6 * w7, true); x.closePath(); x.fill()
    x.restore()
  }
  // little house numbers: 1 under the rising end, 7 over the descendant end
  const lab = (n, a, at, col) => { const p = clamp(prog(t, at, at + 0.25)); if (p <= 0) return; x.save(); x.globalAlpha *= p; x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(n, cx + Math.cos(a) * C.r * 0.68, cy + Math.sin(a) * C.r * 0.68); x.restore() }
  lab('1', Math.PI - Math.PI / 12, M.hz + 1.6, 'rgba(244,241,232,0.55)')
  lab('7', -Math.PI / 12, M.seventh + 0.5, EX.chalkPink)
  // the partner door in the 7th: a tiny pixel door with a heart, once it's the partnership house
  const d = clamp(prog(t, M.partner + 0.3, M.partner + 0.6))
  if (d > 0) {
    const a = -Math.PI / 12, dx = cx + Math.cos(a) * (C.r + 46), dy = cy + Math.sin(a) * (C.r + 46) - 30, s = 5
    x.save(); x.globalAlpha *= d
    x.fillStyle = EX.ink; x.fillRect(dx - 7 * s, dy - 12 * s, 14 * s, 22 * s)
    x.fillStyle = EX.wood; x.fillRect(dx - 6 * s, dy - 11 * s, 12 * s, 20 * s)
    x.fillStyle = EX.woodLite; x.fillRect(dx - 6 * s, dy - 11 * s, 12 * s, s)
    x.fillStyle = EX.chalkPink
    for (const [i, j] of [[-2, -6], [-1, -6], [1, -6], [2, -6], [-3, -5], [-2, -5], [-1, -5], [0, -5], [1, -5], [2, -5], [3, -5], [-2, -4], [-1, -4], [0, -4], [1, -4], [2, -4], [-1, -3], [0, -3], [1, -3], [0, -2]]) x.fillRect(dx + i * s - s / 2, dy + j * s, s, s)
    x.fillStyle = EX.gold; x.fillRect(dx + 3 * s, dy + 1 * s, 2 * s, 2 * s)
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'st13seventh', numeral: 'S13 E35', duration: 45, key: 'D',
  q: "What's your *7th house*?", qAccent: EX.chalkPink,
  teacher: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, pitch: 587.33,
    prop: (x, r, t) => drawClipboard(x, r.x - r.size * 0.42, r.y + r.size * 0.12, 6, { rot: -0.18, page: (t % 9) > 4.5 ? 1 : 0 }) },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, pitch: 783.99 },
  board: { title: 'THE 7TH HOUSE' },
  script: [
    { who: 's', text: 'my app says my 7th house is busy. what IS it?' },
    { who: 't', text: "Here's a chart. Left end: your *rising* sign.", mark: 'hz' },
    { who: 't', text: 'Exactly opposite it: the *descendant*.', mark: 'dsc' },
    { who: 't', text: 'Your 7th house starts right there.', mark: 'seventh', tag: { kind: 'astro', x: 470, y: 202 } },
    { who: 't', text: 'Astrologers call it the *partnership* house.', mark: 'partner', tag: { kind: 'astro', x: 470, y: 316 } },
    { who: 's', text: "so it tells me WHO I'll end up with?", mark: 'who' },
    { who: 't', text: "Nope. It *describes*. It doesn't pick.", mark: 'nope', tag: { kind: 'tip', x: 470, y: 430 } },
    { who: 't', text: 'You still find your person by... meeting them.' },
    { who: 's', text: "oh. it's a *room*, not a reservation.", mark: 'bulb' },
  ],
  bulb: 'bulb',
  chalk: [
    { circle: [C.x, C.y, C.r], at: 'hz+0.2', dur: 0.8 },
    { line: [[C.x - C.r - 50, C.y], [C.x + C.r + 50, C.y]], at: 'hz+0.7', dur: 0.5, color: EX.chalkYellow },
    { text: 'ASC', x: 0, y: C.y - 44, at: 'hz+1.0', size: 30, color: EX.chalkYellow, cps: 18 },
    { text: 'ASC = *rising*', x: 470, y: 40, at: 'hz+1.2', size: 32 },
    { text: 'DSC', x: C.x + C.r + 4, y: C.y + 18, at: 'dsc+0.3', size: 30, color: EX.chalkPink, cps: 18 },
    { line: [[C.x - C.r + 20, C.y + 30], [C.x + C.r - 20, C.y + 30]], at: 'dsc+0.4', dur: 0.6, color: EX.chalkPink, width: 4, arrow: true },
    { text: 'DSC = *opposite*', x: 470, y: 86, at: 'dsc+0.6', size: 32 },
    { text: '7th starts at DSC', x: 470, y: 132, at: 'seventh+0.4', size: 30 },
    { draw: wheel },
    { text: '= *PARTNERSHIP*', x: 470, y: 246, at: 'partner+0.5', size: 32 },
    { text: 'DESCRIBES, NOT PICKS', x: 470, y: 362, at: 'nope+0.4', size: 26, color: EX.chalkPink },
  ],
  recap: ['7th starts at the *descendant*', 'Astro: the *partnership* house', 'It *describes*. It never picks.'],
  last: 'Your sky has a *partner* room.', lastWho: 't',
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [1, 0] }
      if (ph === 'bulb') return { mood: 'sparkle', look: [1, 0] }
      if (t >= M.who - 0.05 && t < M.nope) return { mood: 'squint', look: [1, 0] }
      if (ph === 'q') return { mood: 'neutral', look: [1, 0] }
      return { mood: 'neutral', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'wide', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, 0] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, -1] }
    if (t >= M.who - 0.05 && t < M.nope) return { mood: 'heart', look: [-1, 0] }
    if (t >= M.nope && t < M.nope + 1.6) return { mood: 'wide', look: [-1, 0] }
    return { mood: 'neutral', look: [-1, -1] }
  },
  cues: (T, M) => [['pop', atOf('seventh+0.25', M), 1318.51, 0.035, -0.2], ['tick', atOf('partner+0.35', M), 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
