// guidecancer2 (15 s vertical Align ad, Star Talk "Your Star Guide", note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.20  "What you *need*, Cancer."  ♋ your star (lantern lit) watches a lavender star scribble on a sticky note.
//   2.40–5.30  YOUR STAR: "someone who remembers the little things…"  The note slaps up big: "you said you like
//              peaches" + a pixel peach. Cancer goes heart-eyed. Chip: Cancer, natural ruler of the 4th house (home).
//   5.40–8.05  YOUR STAR: "and lets you be soft."  A pink cloud pillow puffs up under Cancer; it sinks in, squish.
//   8.12–10.6  card flip · "Soft is *safe* here."  Cancer on its pillow, the note still stuck up, the friend beaming.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm } from './guidefilm.js'
import { INK, SERIF, drawBits, pop01, popOut } from './kit.js'

const T = {
  hookOut: [1.9, 2.2], open: 2.2, l1: 2.4, slap: 3.0, heart: 3.45, fact: [4.15, 3.6],
  l2: 5.45, pillow: 6.15, close: 8.05, cut: 8.12, last: 8.2, lastLand: 8.65, out: [10.1, 10.45],
}
export const CPS = 30
const HERO = { x: 400, y: 1030, size: 320 }
const PAL = { x: 840, y: 1090, size: 190, c: '#c9b8f0' }
const NOTE = { x: 610, y: 650 }
const PEACH = ['.....gg..', '...ggG...', '..pppPP..', '.pPPPPPP.', 'pPPPPPPPP', 'pPPPPPPPW', 'pPPPPPPPP', '.pPPPPPP.', '..ppppp..']
const PEACH_C = { g: '#57c26a', G: '#2f8a45', p: '#ff8f6b', P: '#ffbf86', W: '#ffe2c4' }

function mood(t) {
  if (t < T.slap) return { mood: 'neutral', look: [1, 0] }
  if (t < T.heart) return { mood: 'wide', look: [1, -1] }
  if (t < T.pillow) return { mood: 'heart' }
  if (t < T.lastLand) return { mood: 'happy', squash: 0.1 * clamp(prog(t, T.pillow, T.pillow + 0.3)) }
  return { mood: 'heart', squash: 0.1 }
}

// the sticky note: small in the friend's hand at frame 0, slapped up big at T.slap
function drawNote(x, t, ok) {
  const p = prog(t, T.slap, T.slap + 0.28)
  const land = t > T.slap + 0.28 ? 1 + 0.08 * Math.exp(-(t - T.slap - 0.28) * 8) * Math.sin((t - T.slap - 0.28) * 34) : 1
  const q = ease.inOutCubic(prog(t, T.cut - 0.05, T.cut + 0.2))       // after the flip it moves down out of the last line's way
  const cx = lerp(lerp(PAL.x - 120, NOTE.x, ease.outCubic(p)), 800, q), cy = lerp(lerp(PAL.y - 40, NOTE.y, ease.outCubic(p)), 1330, q)
  const s = lerp(lerp(0.4, 1, ease.outCubic(p)) * land, 0.62, q) * ok, rot = lerp(lerp(0.2, -0.06, p), 0.08, q)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 24; x.shadowOffsetY = 10
  x.fillStyle = '#ffe476'; x.fillRect(-210, -170, 420, 340)
  x.shadowColor = 'transparent'
  x.fillStyle = '#f5c94a'; x.fillRect(-210, -170, 420, 44)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-60, -186, 120, 34)            // a scrap of tape
  x.fillStyle = '#3d3170'; x.font = `italic 500 58px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  // the words write themselves on while the friend scribbles (frame 0: half written)
  const w = clamp(prog(t, -0.9, T.slap - 0.1))
  const L1 = 'you said you', L2 = 'like peaches'
  const n = Math.round(w * (L1.length + L2.length))
  x.fillText(L1.slice(0, n), -40, -52); x.fillText(L2.slice(0, Math.max(0, n - L1.length)), -40, 22)
  x.restore()
  if (w >= 1) drawBits(x, PEACH, PEACH_C, cx + 150 * s, cy + 92 * s, 9 * s, { rot: rot + 0.1 })
  // the pencil, scribbling while the note is small
  if (p < 0.5) {
    const jig = Math.sin(t * 28) * 8
    x.save(); x.translate(cx + 40 + jig, cy - 10); x.rotate(0.7)
    x.fillStyle = INK; x.fillRect(-12, -70, 24, 120); x.fillStyle = '#ffcf4a'; x.fillRect(-8, -66, 16, 90)
    x.fillStyle = '#ff8fb1'; x.fillRect(-8, -66, 16, 16); x.fillStyle = '#e9c9a0'; x.fillRect(-8, 24, 16, 14); x.fillStyle = INK; x.fillRect(-4, 38, 8, 8)
    x.restore()
  }
}

function drawPillow(x, t, ok) {
  const p = easeOutBack(prog(t, T.pillow, T.pillow + 0.45), 2.2) * ok
  if (p <= 0.01) return
  const cx = HERO.x, cy = HERO.y + 150
  x.save(); x.translate(cx, cy); x.scale(p, p * (1 + 0.04 * Math.sin(t * 3)))
  const puff = [[-150, 10, 70], [-80, -14, 84], [0, -24, 92], [80, -14, 84], [150, 10, 70], [0, 26, 100]]
  x.fillStyle = INK; puff.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r + 8, 0, 7); x.fill() })
  x.fillStyle = '#ffb6cf'; puff.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() })
  x.fillStyle = '#ffd6e4'; puff.slice(0, 5).forEach(([a, b, r]) => { x.beginPath(); x.arc(a - r * 0.2, b - r * 0.3, r * 0.45, 0, 7); x.fill() })
  x.restore()
  // "squish" puffs
  const sq = t - T.pillow - 0.4
  if (sq > 0 && sq < 0.8) {
    x.save(); x.globalAlpha = 1 - sq / 0.8; x.fillStyle = '#ffd6e4'
    for (let i = 0; i < 6; i++) { const a = i * 1.05; x.fillRect(cx + Math.cos(a) * (180 + sq * 160), cy + Math.sin(a) * 50 - sq * 40, 14, 14) }
    x.restore()
  }
}

const film = guideFilm({
  duration: 15, sign: 'cancer', n: 2, seed: 3, side: -1,
  hook: 'What you *need,* | Cancer.',
  lines: [{ t: T.l1, text: 'someone who remembers the *little things…*' }, { t: T.l2, text: 'and lets you be *soft.*' }],
  cps: CPS, T, fact: 'CANCER IS THE NATURAL RULER|OF THE 4TH HOUSE (HOME)', factY: 1290,
  last: 'Soft is | *safe* here.', hero: HERO, mood,
  hops: [T.heart, T.pillow + 0.4],
  back(x, t, S) { drawPillow(x, t, S.ok) },
  front(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    drawStarChar(x, PAL.x, PAL.y, PAL.size, t, { color: PAL.c, mood: t < T.slap ? 'squint' : t < T.pillow + 0.3 ? 'happy' : 'heart', look: t < T.slap ? [-1, -1] : [-1, 0], seed: 6, glow: 0.7, pop: ok, hops: [T.slap - 0.05, T.lastLand + 0.1] })
    drawNote(x, t, ok)
  },
  cues: [
    ['tick', 0.15, 0.02], ['tick', 0.45, 0.02], ['tick', 0.8, 0.02], ['tick', 1.2, 0.02], ['tick', 1.6, 0.02], ['tick', 2.1, 0.02],
    ['whoosh', T.slap - 0.05, 0.3, 0.03], ['boom', T.slap + 0.28, 0.1], ['pop', T.slap + 0.28, 523.25, 0.04, 0.2],
    ['bell', T.heart, 1760, 0.03, 1.0, -0.2], ['glitter', T.heart, T.heart + 0.6],
    ['pop', T.pillow, 440, 0.04, 0], ['pop', T.pillow + 0.4, 329.63, 0.045, 0], ['whoosh', T.pillow + 0.4, 0.4, 0.02],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
void pop01; void popOut
