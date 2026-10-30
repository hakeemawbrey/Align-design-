// guidevirgo3 (20 s vertical Align ad, Star Talk "Your Star Guide", note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.30  "Try this week, *Virgo*."  ♍ your star admires its weekend planner: SAT and SUN, every block filled.
//   2.50–6.50  YOUR STAR: "leave one thing unplanned this weekend."  An eraser swipes Saturday's 2:00; the empty block
//              glows gold with a "?". Chip: Virgo is the largest zodiac constellation.
//   6.60–11.55 YOUR STAR: "one. we're not monsters."  Virgo panics (shaking, sweat drops), breathes (in… out…), then
//              looks at the gold block and goes starry-eyed.
//   11.62–15.6 card flip · "Let it be *a little* messy."  The planner from frame 0, a bit crooked, one block gold.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { guideFilm } from './guidefilm.js'
import { INK, MONO, SERIF, drawBits } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, erase: 4.2, glow: 4.85, fact: [5.3, 4.4],
  l2: 6.6, panic: 7.7, breathe: 9.2, calm: 10.3, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 540, y: 1105, size: 280 }
const PLAN = { x: 540, y: 740, w: 700, h: 400 }
const SAT = ['9:00  laundry', '11:00  errands', '2:00  meal prep', '6:00  plan sunday']
const SUN = ['9:00  gym', '11:00  inbox zero', '2:00  closet', '6:00  plan week']
const BLK = ['#c9e8ff', '#ffd9e6', '#d8f5d0', '#efe1ff']
const DROP = ['.B.', 'BBB', 'BWB', '.B.']
const ERASE = ['PPPPPP', 'PPPPPP', 'WWWWWW', 'WWWWWW']

function drawPlanner(x, t, ok) {
  const { w, h } = PLAN
  const shake = t > T.panic && t < T.breathe ? Math.sin(t * 60) * 5 : 0
  const tilt = lerp(-0.02, 0.05, ease.inOutQuad(prog(t, T.cut, T.cut + 0.4)))       // a little messy at the end
  x.save(); x.globalAlpha = ok; x.translate(PLAN.x + shake, PLAN.y + Math.sin(t * 2) * 4); x.rotate(tilt)
  x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 26; x.shadowOffsetY = 10
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 20); x.fill()
  x.shadowColor = 'transparent'
  x.fillStyle = '#f5eedf'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 14); x.fill()
  x.fillStyle = '#ef5c94'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, 62, [14, 14, 0, 0]); x.fill()
  x.fillStyle = '#fff3dc'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEKEND', 0, -h / 2 + 32)
  const colW = (w - 60) / 2
  ;[['SAT', SAT], ['SUN', SUN]].forEach(([d, rows], c) => {
    const cx = -w / 2 + 20 + c * (colW + 20)
    x.fillStyle = '#7a6aa8'; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText(d, cx + 6, -h / 2 + 88)
    rows.forEach((s, i) => {
      const y = -h / 2 + 110 + i * 70
      const free = c === 0 && i === 2
      const e = free ? clamp(prog(t, T.erase, T.erase + 0.45)) : 0
      x.fillStyle = BLK[(i + c) % 4]; x.beginPath(); x.roundRect(cx, y, colW, 60, 8); x.fill()
      x.fillStyle = '#3d3170'; x.font = `italic 500 34px ${SERIF}`; x.textAlign = 'left'
      x.fillText(s, cx + 14, y + 31)
      if (free && e > 0) {
        // the eraser wipes left→right, leaving a blank that glows gold
        x.fillStyle = '#f5eedf'; x.fillRect(cx - 2, y - 2, (colW + 4) * e, 64)
        const g = clamp(prog(t, T.glow, T.glow + 0.4))
        if (g > 0) {
          x.save(); x.shadowColor = `rgba(242,199,92,${0.9 * g})`; x.shadowBlur = 30 + 10 * Math.sin(t * 5)
          x.fillStyle = `rgba(242,199,92,${g})`; x.beginPath(); x.roundRect(cx, y, colW, 60, 8); x.fill(); x.restore()
          x.fillStyle = `rgba(122,74,10,${g})`; x.font = `italic 600 40px ${SERIF}`; x.textAlign = 'center'; x.fillText('?', cx + colW / 2, y + 32)
        }
        if (e < 1) drawBits(x, ERASE, { P: '#ff8fb1', W: '#efe6d6' }, cx + colW * e, y + 30, 11, { rot: -0.3 })
      }
    })
  })
  x.restore()
}

function mood(t) {
  if (t < T.erase) return { mood: 'happy', look: [0, -1] }
  if (t < T.panic) return { mood: 'wide', look: [0, -1] }
  if (t < T.breathe) return { mood: 'wide', look: [Math.sin(t * 9), 0], blink: false }
  if (t < T.calm) return { mood: 'sleepy', zzz: false, squash: 0.08 * Math.sin((t - T.breathe) * 5.5) }
  return { mood: 'sparkle', look: [-1, -1] }
}
const heroX = t => HERO.x + (t > T.panic && t < T.breathe ? Math.sin(t * 70) * 7 : 0)

const film = guideFilm({
  duration: 20, sign: 'virgo', n: 3, seed: 3,
  hook: 'Try this week, | *Virgo.*',
  lines: [{ t: T.l1, text: 'leave one thing *unplanned* this weekend.' }, { t: T.l2, text: "one. *we're not monsters.*" }],
  T, fact: 'VIRGO IS THE LARGEST|ZODIAC CONSTELLATION', factY: 1352,
  last: 'Let it be | *a little* messy.', lastLate: 0, lastSize: 116, lastAccent: 150, lastTop: 160, hero: t => ({ ...HERO, x: heroX(t) }), mood,
  hops: [T.glow, T.calm],
  back(x, t, S) { drawPlanner(x, t, S.ok) },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    if (t > T.panic && t < T.breathe) for (let k = 0; k < 3; k++) {
      const ph = ((t - T.panic) * 1.6 + k / 3) % 1
      drawBits(x, DROP, { B: '#7fd0ff', W: '#e6f7ff' }, r.x + (k - 1) * 140, r.y - 150 + ph * 60, 7, { alpha: Math.sin(Math.PI * ph) * ok })
    }
    // in… out…
    const word = t > T.breathe && t < T.calm ? ((t - T.breathe) % 1.15 < 0.57 ? 'in…' : 'out…') : null
    if (word) { x.save(); x.globalAlpha = ok; x.fillStyle = '#efe6d6'; x.font = `italic 500 64px ${SERIF}`; x.textAlign = 'center'; x.fillText(word, r.x + 240, r.y - 120); x.restore() }
    if (t > T.panic && t < T.breathe) {
      const p = easeOutBack(prog(t, T.panic, T.panic + 0.25), 3)
      x.save(); x.globalAlpha = ok; x.translate(r.x - 250, r.y - 40); x.rotate(-0.12); x.scale(p, p)
      x.font = '800 72px Inter'; x.textAlign = 'center'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('?!', 0, 0); x.fillStyle = '#ff8fb1'; x.fillText('?!', 0, 0); x.restore()
    }
  },
  cues: [
    ['pluck', 0.3, 1174.66, 0.035, 0.5, 0],
    ['whoosh', T.erase, 0.4, 0.03], ['tick', T.erase + 0.1, 0.02], ['tick', T.erase + 0.25, 0.02], ['tick', T.erase + 0.4, 0.02],
    ['bell', T.glow, 1760, 0.035, 1.3, 0], ['glitter', T.glow, T.glow + 0.8],
    ['boom', T.panic, 0.1], ['pop', T.panic, 220, 0.04, 0], ['tick', T.panic + 0.3, 0.03], ['tick', T.panic + 0.6, 0.03], ['tick', T.panic + 0.9, 0.03],
    ['whoosh', T.breathe, 0.6, 0.02], ['whoosh', T.breathe + 0.57, 0.6, 0.02],
    ['pluck', T.calm, 1318.51, 0.04, 0.6, 0], ['glitter', T.calm, T.calm + 0.7],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
