// guideaquarius2 (15 s vertical Align ad, Star Talk "Your Star Guide", Aquarius note 2 / 3: what you need) · story 0–10.6,
// then the shared end card.
//   0.00       "What you *need*, Aquarius."  The ♒ guide mid-hop in a propeller beanie, propeller whirring, lantern lit.
//   2.50 drop  ♒ YOUR STAR: "someone who's also your best friend…"  A coral star pops in; the two do a secret handshake
//              (a "BFF!" burst). The ★ ASTROLOGY SAYS chip: the natural ruler of the 11th house (friendship).
//   5.60       "and loves your weird. all of it."  A tiny UFO parks over the guide's beanie, beam on… and the coral star
//              pops on the exact same beanie + UFO. Matching weird hats.
//   8.40 cut   "Friend | *first.*"  Side by side, propellers spinning flat out, both UFOs beaming little hearts.
// One canvas (sky + stars + hats), DOM type above it. Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { drawBurst } from '../../stguide.js'
import { guideFilm, BEAT, GOLD, BONE, INK, PINK, sparkles } from './guide.js'

const AQU = signStar('aquarius')
const ACC = '#7fe3ff'
const MATE = '#ffa070'
const SPEAK = '♒ YOUR STAR'
const T = {
  hookOut: [2.15, 2.45], open: 2.3, l1: BEAT(3.4) + 0.01, mate: 2.7, shake: 3.7, fact: 4.4, factDur: 3.6,
  l2: 5.6, ufo: 6.1, match: 6.9, sync: 7.4, close: 8.3,
  cut: 8.4, last: 8.46, out: [10.2, 10.45],
}
const LINES = [
  { t: T.l1, text: "someone who's also *your best friend…*" },
  { t: T.l2, text: 'and loves your weird. *all of it.*' },
]
const HOPS = [0.05, 0.7, 1.35, 2.0, ...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.shake, T.sync, T.sync + 0.5, T.last + 0.3, T.last + 0.9]
const MATE_HOPS = [T.mate + 0.3, T.shake, T.match, T.sync, T.sync + 0.5, T.last + 0.3, T.last + 0.9]
const UFO = ['...GGG...', '..GWWWG..', '.SSSSSSS.', 'SSYSSYSSS', '.SSSSSSS.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

function beanie(x, t, K, cx, top, size, k, spin) {
  if (k <= 0.01) return
  const c = size / 300
  x.save(); x.translate(cx, top + 30 * c); x.scale(k * c, k * c)
  // dome: four stripes
  const cols = ['#ff5f6d', '#ffd24a', '#5fb3ff', '#5fe0b4']
  x.fillStyle = INK; x.fillRect(-92, -64, 184, 76); x.fillRect(-72, -84, 144, 24)
  for (let i = 0; i < 4; i++) { x.fillStyle = cols[i]; x.fillRect(-84 + i * 42, -58, 42, 64) }
  x.fillStyle = cols[2]; x.fillRect(-64, -78, 128, 22)
  // stalk + propeller (width oscillates to fake the spin)
  x.fillStyle = INK; x.fillRect(-8, -122, 16, 48)
  const w = Math.abs(Math.cos(t * spin)) * 110 + 12
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -136, w + 12, 26)
  x.fillStyle = Math.cos(t * spin) > 0 ? '#ff5f6d' : '#ffd24a'; x.fillRect(-w / 2, -130, w, 14)
  x.restore()
}

function ufo(x, t, K, cx, top, size, k) {
  if (k <= 0.01) return
  const c = size / 300, y = top - 210 * c + Math.sin(t * 3) * 8
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25 * k
  x.fillStyle = '#9ff7c8'; x.beginPath(); x.moveTo(cx - 20, y + 20); x.lineTo(cx + 20, y + 20); x.lineTo(cx + 70 * c, top + 20); x.lineTo(cx - 70 * c, top + 20); x.closePath(); x.fill()
  x.restore()
  K.drawBits(x, UFO, { G: '#bdf5ff', W: '#ffffff', S: '#a9b6c8', Y: '#ffd24a' }, cx, y, 12 * c * k)
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  const slide = ease.inOutCubic(prog(t, T.mate - 0.2, T.mate + 0.3))
  const lean = t > T.shake && t < T.shake + 0.7 ? Math.sin(Math.PI * (t - T.shake) / 0.7) * 50 : 0
  const gx = lerp(540, 330, slide) + lean, mx = 760 - lean
  const mk = ease.outBack(prog(t, T.mate, T.mate + 0.35))
  const spin = last ? 40 : 18
  const m = mk > 0.01 ? K.guide(t, { x: mx, y: 1150, size: 260, color: MATE, glyph: null, mood: t > T.match ? 'happy' : 'neutral', look: [-1, 0], hops: MATE_HOPS, seed: 4, pop: out * mk, lantern: 0 }) : null
  const r = K.guide(t, { x: gx, y: 1140, size: 300, color: AQU.color, glyph: AQU.glyph, mood: t < T.l1 ? 'happy' : t < T.l2 ? 'sparkle' : 'happy', look: t < T.mate ? [0, 0] : [1, 0], hops: HOPS, seed: 11, pop: out })
  beanie(x, t, K, r.x, r.top, 300, out, spin)
  ufo(x, t, K, r.x, r.top, 300, ease.outBack(prog(t, T.ufo, T.ufo + 0.4)) * out)
  if (m) {
    const hk = ease.outBack(prog(t, T.match, T.match + 0.35)) * out
    beanie(x, t, K, m.x, m.top, 260, hk, spin)
    ufo(x, t, K, m.x, m.top, 260, ease.outBack(prog(t, T.match + 0.15, T.match + 0.5)) * out)
    sparkles(x, t, m.x, m.top, T.match, 10, 140, 0.3, [GOLD, ACC, PINK])
  }
  if (t > T.shake && t < T.shake + 0.8) drawBurst(x, 545, 1010, 120, t, T.shake + 0.25, { word: 'BFF!' })
  if (last) for (let i = 0; i < 6; i++) {
    const b = T.last + 0.4 + i * 0.3, p = prog(t, b, b + 1.2), who = i % 2 ? m : r
    if (who && p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, who.x + Math.sin(i * 2) * 30, who.top - 60 - p * 140, 6, { alpha: Math.sin(Math.PI * p) })
  }
}

const F = guideFilm({
  duration: 15, sign: 'aquarius', n: 2, speaker: SPEAK, accent: ACC,
  hook: 'What you | *need,* | Aquarius.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'AQUARIUS IS THE NATURAL RULER|OF THE 11TH HOUSE (FRIENDSHIP)', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Friend | *first.*', at: T.last, out: T.out, top: 260, size: 132, accentSize: 200, accentColor: ACC },
  ],
  drawBack: drawStage,
  cues: [
    ['riser', 0, 2.2, 0.012], ['whoosh', T.mate, 0.3, 0.03], ['pop', T.mate + 0.2, 880, 0.04, 0.4],
    ['tick', T.shake, 0.04], ['tick', T.shake + 0.12, 0.04], ['tick', T.shake + 0.24, 0.04], ['pop', T.shake + 0.25, 1318.51, 0.05, 0], ['glitter', T.shake + 0.25, T.shake + 0.7],
    ['riser', T.ufo - 0.2, T.ufo + 0.4, 0.025], ['pop', T.ufo + 0.3, 1567.98, 0.035, -0.3],
    ['pop', T.match, 1046.5, 0.045, 0.3], ['riser', T.match, T.match + 0.4, 0.02], ['pluck', T.sync, 1318.51, 0.04, 0.6, 0],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
