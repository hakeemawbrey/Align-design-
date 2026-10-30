// guidecapricorn1 (20 s vertical Align ad, Star Talk "Your Star Guide", Capricorn note 1 / 3: the blind spot) · story 0–15.6,
// then the shared end card.
//   0.00       "*Capricorn*, your star has a note."  The ♑ guide, lantern lit, ducks a hail of pixel emails whizzing past.
//   2.62       An INBOX window slides in above it and keeps filling: the count ticks up to 40 (a red badge thunks).
//   2.82 drop  ♑ YOUR STAR: "work comes first. every time. we see you."  The star squints; the ★ ASTROLOGY SAYS chip:
//              cardinal earth, ruled by Saturn.
//   6.30       "love doesn't wait in your inbox."  The guide lifts its lantern: the rows swipe away one by one and at the
//              bottom, buried, a pink heart message glows ("♥ dinner tonight?").
//   10.40 cut  "Love isn't a | *task.*"  The heart message opens into a big pixel heart that floats up between the star and
//              you; the red 40 badge shrinks to nothing.
// One canvas (sky + inbox + guide), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './guide.js'

const CAP = signStar('capricorn')
const ACC = '#5fe0b4'
const SPEAK = '♑ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], inbox: 2.62, fill: [2.7, 4.4], badge: 4.45,
  open: 2.6, l1: BEAT(4) + 0.02, fact: 4.7, factDur: 4.4,
  l2: 6.3, lift: 6.6, swipe: [7.0, 9.0], reveal: 9.1, close: 9.9,
  cut: 10.4, last: 10.48, lastLand: 10.95, heart: [11.2, 12.4], out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: 'work comes first. every time. *we see you.*' },
  { t: T.l2, text: "love doesn't wait in *your inbox.*" },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.reveal, T.lastLand, 13.4, 13.75]
const ENV = ['WWWWWWWWW', 'WBWWWWWBW', 'WWBBWBBWW', 'WWWWBWWWW', 'WWWWWWWWW']
const HEART = ['.HH.HH.', 'HHWHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const SUBJ = ['RE: RE: Q3 deck', 'URGENT (not really)', 'fwd: fwd: budget', 'meeting moved', 'quick sync?', 'per my last email', 'invoice #2', 'calendar: 7am']

// the inbox count: ticks up 31 → 40 across the fill
const count = t => t < T.fill[0] ? 31 : Math.min(40, 31 + Math.floor(prog(t, ...T.fill) * 9.999))

function capState(t) {
  if (t < T.inbox) return { mood: 'wide', look: [1, -1] }
  if (t < T.l1 + 0.4) return { mood: 'neutral', look: [0, -1] }
  if (t < T.l2) return { mood: 'squint', look: [0, 0] }
  if (t < T.reveal) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.heart[0] + 0.6) return { mood: 'happy' }
  return { mood: 'heart' }
}

// emails whizzing past in the cold open (frame 0 is mid-hail)
function hail(x, t, K) {
  if (t > T.inbox + 0.3) return
  const a = 1 - prog(t, T.inbox - 0.1, T.inbox + 0.3)
  for (let i = 0; i < 7; i++) {
    const sp = 0.55 + (i % 3) * 0.18, ph = ((t * sp + i * 0.37) % 1 + 1) % 1
    const y = 620 + ((i * 173) % 560), xx = lerp(-120, 1200, ph) * (i % 2 ? 1 : -1) + (i % 2 ? 0 : 1080)
    K.drawBits(x, ENV, { W: BONE, B: '#7c8cff' }, xx, y + Math.sin(ph * 9 + i) * 20, 9, { rot: (i % 2 ? 1 : -1) * 0.2, alpha: a })
  }
}

function inbox(x, t, K, vis) {
  if (t < T.inbox) return
  const pin = K.pop01(t, T.inbox, 0.4, 1.8)
  const cx = 540, cy = 690, w = 820, h = 620
  x.save(); x.globalAlpha = vis * clamp(pin * 1.5); x.translate(cx, cy + (1 - pin) * -300)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#d8e4ef'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#3d5a80'; x.fillRect(-w / 2, -h / 2, w, 70)
  for (let i = 0; i < 3; i++) { x.fillStyle = ['#ff6b6b', '#ffd24a', '#5fe0b4'][i]; x.fillRect(-w / 2 + 24 + i * 34, -h / 2 + 24, 20, 20) }
  x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(`INBOX (${count(t)})`, -w / 2 + 140, -h / 2 + 36)
  // rows: the top 7 slots are work; the last slot (buried) is the heart. On the swipe they leave top-down.
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2 + 70, w, h - 70); x.clip()
  const rowH = 66, y0 = -h / 2 + 70
  const nIn = t < T.fill[0] ? 4 : 4 + Math.floor(prog(t, ...T.fill) * 4.999)
  for (let i = 0; i < 7; i++) {
    const appear = i < nIn ? 1 : 0
    if (!appear) continue
    const sw = ease.inCubic(prog(t, T.swipe[0] + i * 0.26, T.swipe[0] + i * 0.26 + 0.3))
    const ry = y0 + i * rowH, rx = -w / 2 + sw * (w + 60)
    x.fillStyle = i % 2 ? '#c5d3e0' : '#d8e4ef'; x.fillRect(rx, ry, w, rowH)
    x.fillStyle = '#3d5a80'; x.fillRect(rx + 22, ry + 22, 22, 22)
    x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.fillText(SUBJ[i], rx + 64, ry + 34)
    x.fillStyle = '#ff6b6b'; x.fillRect(rx + w - 46, ry + 26, 14, 14)
  }
  // the buried heart message (row 8)
  const ry = y0 + 7 * rowH, glow = prog(t, T.lift, T.reveal)
  x.fillStyle = `rgba(255,143,177,${0.2 + 0.6 * glow})`; x.fillRect(-w / 2, ry, w, rowH + 20)
  K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, -w / 2 + 46, ry + 40, 5)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.fillText('them: dinner tonight?', -w / 2 + 88, ry + 40)
  x.restore()
  // the red badge: thunks on at 40
  const bk = K.pop01(t, T.badge, 0.3, 3) * (1 - ease.inCubic(prog(t, T.cut + 0.6, T.cut + 1.2)))
  if (t >= T.badge && bk > 0.01) {
    x.save(); x.translate(w / 2 - 10, -h / 2 + 4); x.scale(bk, bk)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ff4a5e'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.fillText('40', 0, 3)
    x.restore()
  }
  x.restore()
  // lantern light falling on the list
  if (t > T.lift && t < T.cut) {
    const k = ease.outCubic(prog(t, T.lift, T.lift + 0.6)) * (1 - prog(t, T.cut - 0.3, T.cut))
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * k * vis
    const g = x.createRadialGradient(cx, cy + 200, 30, cx, cy + 200, 420); g.addColorStop(0, 'rgba(255,214,120,0.9)'); g.addColorStop(1, 'rgba(255,214,120,0)')
    x.fillStyle = g; x.fillRect(cx - 450, cy - 300, 900, 900); x.restore()
  }
  if (t > T.reveal) sparkles(x, t, cx - w / 2 + 46, cy + y0 + 7 * rowH + 40, T.reveal, 10, 120, 0.2, [PINK, GOLD, BONE])
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  hail(x, t, K)
  if (!last) inbox(x, t, K, out)
  // the guide: dodging (frame 0) → under the inbox → centre stage for the last line
  const dodge = t < T.inbox ? Math.sin(t * 7) * 26 : 0
  const lift = ease.outBack(prog(t, T.lift, T.lift + 0.4))
  const P = last ? { x: 540, y: 1140, size: 320 } : t < T.inbox ? { x: 540 + dodge, y: 1100, size: 340 } : { x: lerp(540, 270, ease.inOutCubic(prog(t, T.inbox, T.inbox + 0.5))), y: lerp(1100, 1240, ease.inOutCubic(prog(t, T.inbox, T.inbox + 0.5))), size: lerp(340, 280, prog(t, T.inbox, T.inbox + 0.5)) }
  const r = K.guide(t, { ...P, color: CAP.color, glyph: CAP.glyph, ...capState(t), hops: HOPS, seed: 10, pop: out,
    lanternGlow: 1 + 0.5 * (last ? 0 : lift), squash: t < T.inbox ? Math.sin(t * 14) * 0.04 : 0 })
  if (last) {
    const hp = ease.outBack(prog(t, ...T.heart))
    if (hp > 0) {
      const hy = lerp(r.y, 700, hp) + Math.sin(t * 2.4) * 10
      K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, hy, lerp(6, 34, hp) * out)
      sparkles(x, t, 540, 700, T.heart[1], 12, 220, 0.4, [PINK, GOLD, BONE])
      sparkles(x, t, 540, 700, 13.4, 10, 180, 0.9, [ACC, GOLD, BONE])
    }
  }
}

const F = guideFilm({
  duration: 20, sign: 'capricorn', n: 1, speaker: SPEAK, accent: ACC,
  hook: '*Capricorn,* | your star | has a note.', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'CAPRICORN: CARDINAL EARTH,|RULED BY SATURN', at: T.fact, dur: T.factDur, x: 740, y: 1250 },
  heads: [
    { text: "Love isn't a | *task.*", at: T.last, out: T.out, top: 230, size: 124, accentSize: 190, accentColor: ACC, late: 1, lateAt: T.lastLand },
  ],
  drawBack: drawStage,
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', +(0.1 + i * 0.36).toFixed(2), 0.2, 0.02]),
    ['whoosh', T.inbox, 0.4, 0.035], ['pop', T.inbox + 0.3, 659.25, 0.035, 0],
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.fill[0] + (i + 1) * (T.fill[1] - T.fill[0]) / 9).toFixed(3), 0.03]),
    ['boom', T.badge, 0.12], ['pop', T.badge, 1174.66, 0.04, 0.4],
    ['riser', T.lift - 0.2, T.lift + 0.5, 0.025], ['bell', T.lift + 0.3, 1318.51, 0.03, 1.4, 0],
    ...Array.from({ length: 7 }, (_, i) => ['whoosh', +(T.swipe[0] + i * 0.26).toFixed(2), 0.15, 0.022]),
    ['glitter', T.reveal, T.reveal + 0.6], ['pluck', T.reveal, 1567.98, 0.04, 0.6, 0],
    ['whoosh', T.heart[0], 0.6, 0.03], ['glitter', T.heart[1], T.heart[1] + 0.6], ['pluck', T.heart[1], 1318.51, 0.04, 0.6, 0],
    ['pluck', 13.4, 1567.98, 0.035, 0.6, 0], ['glitter', 13.4, 13.9],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
