// guideaquarius1 (20 s vertical Align ad, Star Talk "Your Star Guide", Aquarius note 1 / 3: the blind spot) · story 0–15.6,
// then the shared end card.
//   0.00       "*Aquarius*, your star has a note."  A coral star asks "can we talk?"; the ♒ guide is mid-slide pulling a pair
//              of pixel headphones on, synth notes leaking out.
//   2.82 drop  ♒ YOUR STAR: "you go quiet when it gets emotional."  The volume meter maxes; the coral star's bubble turns
//              to "…?" and it droops. The ★ ASTROLOGY SAYS chip: fixed air; Saturn (traditional) and Uranus (modern).
//   6.40       "say 'i need a minute.' then come back."  The guide pops its own bubble, "i need a minute."; the coral star
//              nods; a little timer ring sweeps round; the headphones lift off and float away.
//   10.40 cut  "Step back. | *Come back.*"  The guide steps back… and comes back to stand beside the coral star; a heart.
// One canvas (sky + stars + props), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './guide.js'

const AQU = signStar('aquarius')
const ACC = '#7fe3ff'
const MATE = '#ffa070'
const SPEAK = '♒ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], phonesOn: [0, 0.5], open: 2.6, l1: BEAT(4) + 0.02, droop: 3.6, fact: 4.6, factDur: 4.2,
  l2: 6.4, own: 7.4, nod: 8.0, timer: [8.0, 9.0], phonesOff: [9.1, 9.7], close: 9.9,
  cut: 10.4, last: 10.48, lastLand: 10.95, back: [11.0, 11.6], come: [11.7, 12.4], heart: 12.5, out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: 'you go quiet when it *gets emotional.*' },
  { t: T.l2, text: "say 'i need a minute.' *then come back.*" },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.own, T.phonesOff[1], T.come[1]]
const MATE_HOPS = [0.2, T.nod, T.nod + 0.4, T.come[1] + 0.1, T.heart]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']

function aquState(t) {
  if (t < T.l1) return { mood: 'sleepy', zzz: false, look: [-1, 0] }
  if (t < T.l2) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.own) return { mood: 'squint', look: [1, 0] }
  if (t < T.phonesOff[1]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.cut) return { mood: 'happy' }
  return { mood: t > T.heart ? 'heart' : 'happy', look: [1, 0] }
}

function bubble(x, t, cx, cy, text, k, col = BONE, tailR = false) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 42px ${MONO}`; const w = x.measureText(text).width + 60
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -44, w + 16, 88)
  x.fillStyle = col; x.fillRect(-w / 2, -36, w, 72)
  const tx = tailR ? w / 2 - 50 : -w / 2 + 40
  x.fillStyle = INK; x.fillRect(tx - 8, 36, 32, 24); x.fillStyle = col; x.fillRect(tx, 36, 16, 14)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

function headphones(x, t, tip, size, onK, offK) {
  if (offK >= 1) return
  const y = lerp(tip.y - size * 0.5, tip.y + size * 0.2, onK) - offK * 600, rot = offK * 0.8
  x.save(); x.globalAlpha *= 1 - offK; x.translate(tip.x + offK * 220, y); x.rotate(rot)
  const R = size * 0.5
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.arc(0, 0, R, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
  x.strokeStyle = '#ff5fa2'; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, R, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * R - 34, -14, 68, 92); x.fillStyle = '#ff5fa2'; x.fillRect(s * R - 26, -6, 52, 76); x.fillStyle = AQU.color; x.fillRect(s * R - 14, 6, 28, 52) }
  x.restore()
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  // positions: guide left, the coral star right; on the last line the guide steps back, then comes back close
  let gx = 380
  if (last) gx = 380 - 140 * ease.inOutCubic(prog(t, ...T.back)) + 210 * ease.inOutCubic(prog(t, ...T.come))
  const droop = t > T.droop && t < T.nod ? ease.outCubic(prog(t, T.droop, T.droop + 0.4)) : 0
  const mate = K.guide(t, { x: 790, y: 1150 + droop * 30, size: 240, color: MATE, glyph: null, mood: droop > 0.5 ? 'sparkle' : t > T.nod ? 'happy' : 'neutral', look: [-1, 0], hops: MATE_HOPS, seed: 4, pop: out, lantern: 0, squash: droop * 0.08 })
  const r = K.guide(t, { x: gx, y: 1110, size: 300, color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: HOPS, seed: 11, pop: out })
  // headphones on (frame 0 mid-slide) → off (float away)
  if (!last) {
    const tip = { x: r.x, y: r.top }
    headphones(x, t, tip, 300, ease.outBack(prog(t, ...T.phonesOn)), ease.inCubic(prog(t, ...T.phonesOff)))
    // synth notes leaking while the phones are on
    if (t < T.phonesOff[0]) for (let i = 0; i < 4; i++) {
      const ph = ((t * 0.7 + i * 0.25) % 1 + 1) % 1
      K.drawBits(x, NOTE, { X: ['#ff5fa2', ACC, GOLD][i % 3] }, r.x - 160 - ph * 120, r.top + 40 - ph * 260 + Math.sin(ph * 8 + i) * 20, 9, { alpha: Math.sin(Math.PI * ph) * out })
    }
    // volume meter (maxes on line 1)
    if (t < T.l2) {
      const n = 3 + Math.round(prog(t, T.l1, T.l1 + 1) * 5)
      for (let i = 0; i < 8; i++) { x.fillStyle = INK; x.fillRect(140 + i * 34 - 4, 760 - i * 8 - 4, 30, 40 + i * 8 + 8); x.fillStyle = i < n ? (i > 5 ? '#ff5f6d' : ACC) : 'rgba(239,230,214,0.15)'; x.fillRect(140 + i * 34, 760 - i * 8, 22, 40 + i * 8) }
      x.save(); x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText('VOL', 140, 840); x.restore()
    }
    // the coral star's bubble: "can we talk?" → "…?"
    const mb = K.pop01(t, 0, 0.01) * (1 - ease.inCubic(prog(t, T.own - 0.3, T.own)))
    bubble(x, t, 760, 900, t < T.droop ? 'can we talk?' : '…?', mb * out, BONE, true)
    // the guide's own bubble
    const ob = K.pop01(t, T.own, 0.32, 2.4) * (1 - ease.inCubic(prog(t, T.close - 0.45, T.close - 0.1)))
    if (t > T.own) bubble(x, t, 420, 850, 'i need a minute.', ob * out, ACC)
    // the timer ring
    if (t > T.timer[0] && t < T.timer[1] + 0.5) {
      const p = prog(t, ...T.timer), a = 1 - prog(t, T.timer[1] + 0.1, T.timer[1] + 0.5)
      x.save(); x.globalAlpha = a * out; x.translate(r.x, r.top - 130)
      x.strokeStyle = INK; x.lineWidth = 20; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.stroke()
      x.strokeStyle = GOLD; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 46, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.stroke()
      x.restore()
    }
    sparkles(x, t, r.x, r.top - 130, T.timer[1], 8, 80, 0.3, [GOLD, ACC, BONE])
  } else {
    // the headphones hang on a little hook, left
    x.save(); x.globalAlpha = out; x.fillStyle = INK; x.fillRect(110, 760, 60, 14); x.restore()
    headphones(x, t, { x: 140, y: 780 }, 160, 1, 0)
    if (t > T.heart) for (let i = 0; i < 3; i++) { const b = T.heart + i * 0.45, p = prog(t, b, b + 1.3); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, (r.x + mate.x) / 2 + (i - 1) * 70, 900 - p * 200, 8, { alpha: Math.sin(Math.PI * p) }) }
  }
}

const F = guideFilm({
  duration: 20, sign: 'aquarius', n: 1, speaker: SPEAK, accent: ACC,
  hook: '*Aquarius,* | your star | has a note.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'AQUARIUS: FIXED AIR|RULED BY SATURN (TRADITIONAL)|AND URANUS (MODERN)', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Step back. | *Come* *back.*', at: T.last, out: T.out, top: 230, size: 124, accentSize: 186, accentColor: ACC, late: 2, lateAt: T.lastLand },
  ],
  drawBack: drawStage,
  cues: [
    ['whoosh', 0.02, 0.4, 0.03], ['pop', 0.4, 523.25, 0.03, -0.3],
    ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.l1 + 0.1 + i * 0.2).toFixed(2), 0.025]),
    ['pop', T.droop, 392, 0.03, 0.4],
    ['pop', T.own, 1046.5, 0.045, -0.3], ['pluck', T.own + 0.05, 1318.51, 0.03, 0.6, -0.3],
    ['pop', T.nod, 880, 0.03, 0.4], ['riser', T.timer[0], T.timer[1], 0.02], ['bell', T.timer[1], 1567.98, 0.035, 1.2, 0],
    ['whoosh', T.phonesOff[0], 0.5, 0.035],
    ['whoosh', T.back[0], 0.3, 0.025], ['whoosh', T.come[0], 0.4, 0.03], ['pluck', T.heart, 1318.51, 0.04, 0.6, 0], ['glitter', T.heart, T.heart + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
