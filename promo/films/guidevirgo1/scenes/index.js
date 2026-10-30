// guidevirgo1 (20 s vertical Align ad, Star Talk "Your Star Guide", note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.30  "*Virgo*, your star has a note."  ♍ your star, mid-stroke with a giant red pen, marking up a yellow star
//              like an essay: a circle, "fix?".
//   2.50–6.50  YOUR STAR: "you're looking for flaws to fix."  More red: "posture?", another circle, "needs work".
//              The yellow star shrinks a little. Chip: Virgo, mutable earth, ruled by Mercury.
//   6.60–11.55 YOUR STAR: "they're a person, not a project."  Virgo meets its eyes, puts the pen down (clatter); the red
//              marks melt into gold hearts and an "AS IS ♥" tag swings onto the yellow star.
//   11.62–15.6 card flip · "Love them *as is*."  The same two stars as frame 0: no pen, one tag.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm } from './guidefilm.js'
import { INK, MONO, SERIF, drawBits } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, fact: [5.3, 4.2],
  l2: 6.6, look: 8.3, drop: 8.75, melt: 9.2, tag: 9.8, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 320, y: 1080, size: 290 }
const PAL = { x: 770, y: 1040, size: 250, c: '#f2cf4a' }
const RED = '#ff3d4e'
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
// the markup: circles round its points and margin notes, each drawn on at t
const MARKS = [
  { t: -1.2, kind: 'circle', x: 770, y: 935, rx: 70, ry: 58 },
  { t: -0.5, kind: 'text', x: 935, y: 870, text: 'fix?', rot: 0.12 },
  { t: 3.2, kind: 'text', x: 895, y: 1230, text: 'posture?', rot: -0.08 },
  { t: 3.9, kind: 'circle', x: 650, y: 1010, rx: 62, ry: 52 },
  { t: 4.6, kind: 'text', x: 760, y: 770, text: 'needs work', rot: -0.05 },
]

function drawMark(x, m, t, a) {
  const p = clamp(prog(t, m.t, m.t + 0.4))
  if (p <= 0 || a <= 0) return
  x.save(); x.globalAlpha = a; x.strokeStyle = RED; x.fillStyle = RED; x.lineWidth = 9; x.lineCap = 'round'
  if (m.kind === 'circle') { x.beginPath(); x.ellipse(m.x, m.y, m.rx, m.ry, -0.2, -1.2, -1.2 + p * Math.PI * 2.15); x.stroke() }
  else {
    x.translate(m.x, m.y); x.rotate(m.rot); x.font = `italic 700 56px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const n = Math.round(p * m.text.length); x.fillText(m.text.slice(0, n), 0, 0)
  }
  x.restore()
}
// where the pen tip is: on the newest mark while marking; it clatters down at T.drop
function penTip(t) {
  let m = MARKS[0]
  for (const k of MARKS) if (t >= k.t) m = k
  const k = prog(t, m.t, m.t + 0.4)
  const tx = m.kind === 'circle' ? m.x + Math.cos(-1.2 + k * 6.6) * m.rx : m.x - 60 + 120 * k
  const ty = m.kind === 'circle' ? m.y + Math.sin(-1.2 + k * 6.6) * m.ry : m.y + 10 + Math.sin(t * 30) * 6
  return { x: tx, y: ty }
}
function drawPen(x, t, ok) {
  const d = prog(t, T.drop, T.drop + 0.5)
  const tip = penTip(Math.min(t, T.look))
  const lift = clamp(prog(t, T.look - 0.2, T.look)) * 60
  const px = lerp(tip.x, 470, ease.inQuad(d)), py = lerp(tip.y - lift, 1300, ease.inQuad(d))
  const rot = lerp(-0.75, 1.9, ease.inQuad(d))
  if (d >= 1) return
  x.save(); x.globalAlpha = ok; x.translate(px, py); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-20, -330, 40, 330); x.beginPath(); x.moveTo(-20, -6); x.lineTo(20, -6); x.lineTo(0, 30); x.closePath(); x.fill()
  x.fillStyle = RED; x.fillRect(-14, -324, 28, 230); x.fillStyle = '#c91f33'; x.fillRect(4, -324, 10, 230)
  x.fillStyle = '#efe6d6'; x.fillRect(-14, -94, 28, 80); x.fillStyle = '#e9c9a0'; x.beginPath(); x.moveTo(-14, -14); x.lineTo(14, -14); x.lineTo(0, 18); x.closePath(); x.fill()
  x.fillStyle = RED; x.fillRect(-4, 8, 8, 12)
  x.restore()
}

function mood(t) {
  if (t < T.look) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.melt) return { mood: 'wide', look: [1, 0] }
  if (t < T.tag) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart', look: [1, 0] }
}

const film = guideFilm({
  duration: 20, sign: 'virgo', n: 1, seed: 3, side: -1,
  hook: '*Virgo,* your star | has a note.',
  lines: [{ t: T.l1, text: "you're looking for *flaws to fix.*" }, { t: T.l2, text: "they're a person, *not a project.*" }],
  T, fact: 'VIRGO: MUTABLE EARTH · RULED BY MERCURY', factY: 1320,
  last: 'Love them | *as is.*', hero: HERO, mood,
  hops: [T.drop + 0.1, T.tag + 0.2],
  back(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    const shrink = lerp(1, 0.93, clamp(prog(t, 3, 5))) * lerp(1, 1 / 0.93, clamp(prog(t, T.melt, T.melt + 0.4)))
    const m = t < T.l1 ? 'neutral' : t < T.look ? 'sleepy' : t < T.melt ? 'sparkle' : 'happy'
    drawStarChar(x, PAL.x, PAL.y, PAL.size * shrink, t, { color: PAL.c, mood: m, zzz: false, look: [-1, t < T.look ? 1 : 0], seed: 6, glow: 0.8, pop: ok, blush: t > T.melt, hops: [T.melt + 0.1, T.tag + 0.3] })
  },
  front(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    const fade = 1 - prog(t, T.melt, T.melt + 0.35)
    MARKS.forEach((m, i) => {
      drawMark(x, m, t, ok * fade)
      const hp = prog(t, T.melt + 0.1 + i * 0.06, T.melt + 0.5 + i * 0.06)
      if (hp > 0) drawBits(x, HEART, { H: '#f2c75c', W: '#fff1c8' }, m.x, m.y - (t - T.melt) * 30, 9 * easeOutBack(hp, 2.5), { alpha: ok * (1 - prog(t, T.close, T.close + 0.6)) })
    })
    drawPen(x, t, ok)
    // the AS IS ♥ tag swinging from the yellow star's top point
    const tp = prog(t, T.tag, T.tag + 0.4)
    if (tp > 0) {
      const sw = 0.5 * Math.exp(-(t - T.tag) * 2.5) * Math.sin((t - T.tag) * 9) + 0.06 * Math.sin(t * 2)
      x.save(); x.globalAlpha = ok * clamp(tp * 3); x.translate(PAL.x + 50, PAL.y + 20 + (1 - easeOutBack(tp, 2)) * -200); x.rotate(sw)
      x.strokeStyle = '#efe6d6'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(40, 70); x.stroke()
      x.translate(40, 70); x.rotate(-0.2)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-6, -6, 190, 92, 14); x.fill()
      x.fillStyle = '#f5eedf'; x.beginPath(); x.roundRect(0, 0, 178, 80, 10); x.fill()
      x.fillStyle = INK; x.beginPath(); x.arc(20, 40, 8, 0, 7); x.fill()
      x.fillStyle = '#b5761a'; x.font = `700 40px ${MONO}`; x.textBaseline = 'middle'; x.fillText('AS IS', 38, 42)
      x.restore()
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, PAL.x + 150, PAL.y - 190, 7, { alpha: ok * clamp(tp * 3) })
    }
  },
  cues: [
    ['tick', 0.1, 0.02], ['tick', 0.3, 0.02], ['tick', 0.55, 0.02],
    ...MARKS.filter(m => m.t > 0).flatMap(m => [['tick', m.t, 0.025], ['tick', m.t + 0.15, 0.02], ['tick', m.t + 0.3, 0.02]]),
    ['pluck', T.look, 587.33, 0.035, 0.5, 0], ['whoosh', T.drop, 0.3, 0.025], ['tick', T.drop + 0.5, 0.045], ['tick', T.drop + 0.6, 0.03], ['tick', T.drop + 0.68, 0.02],
    ['glitter', T.melt, T.melt + 0.8], ['bell', T.melt + 0.1, 1760, 0.03, 1.2, 0.2],
    ['pop', T.tag + 0.3, 987.77, 0.04, 0.3],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
