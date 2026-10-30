// guidecapricorn3 (20 s vertical Align ad, Star Talk "Your Star Guide", Capricorn note 3 / 3: try this week) · story 0–15.6,
// then the shared end card.
//   0.00       "Try this week, *Capricorn*."  The ♑ guide hunched over a glowing laptop, keys clacking; a wall clock at 6:59.
//   2.60       The clock ticks to 7:00 (ding).  2.82 drop  ♑ YOUR STAR: "log off at 7. text them first."
//   4.40       The laptop lid slams shut (the star blinks in the dark).  A phone slides up; the star taps out a text
//              ("thinking of you") and sends it (whoosh).
//   6.40       "yes, before the email. we'll wait."  The laptop tries a "1 NEW EMAIL" bubble; the guide holds up its lantern
//              and the bubble shrinks back. The phone lights up: a pink heart reply. The ★ ASTROLOGY SAYS chip: knees and bones.
//   10.40 cut  "Clock out. | *Show up.*"  Clock at 7:00, laptop shut, the star hugging the glowing phone; hearts rise.
// One canvas (sky + desk + guide), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { talkHops, signStar } from '../../startalk.js'
import { guideFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './guide.js'

const CAP = signStar('capricorn')
const ACC = '#5fe0b4'
const SPEAK = '♑ YOUR STAR'
const T = {
  hookOut: [2.3, 2.6], seven: 2.6, open: 2.6, l1: BEAT(4) + 0.02,
  shut: 4.4, phone: [4.9, 5.3], typed: [5.3, 5.9], send: 6.0,
  l2: 6.4, email: 7.0, hush: 7.9, reply: 8.6, fact: 4.6, factDur: 3.6, close: 9.9,
  cut: 10.4, last: 10.48, lastLand: 10.95, out: [15.15, 15.45],
}
const LINES = [
  { t: T.l1, text: 'log off at 7. *text them first.*' },
  { t: T.l2, text: "yes, before the email. *we'll wait.*" },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.shut + 0.1, T.reply, T.lastLand]
const HEART = ['.HH.HH.', 'HHWHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function capState(t) {
  if (t < T.seven) return { mood: 'squint', look: [0, 1] }
  if (t < T.shut) return { mood: 'wide', look: [-1, -1] }
  if (t < T.shut + 0.25) return { mood: 'neutral', blink: 1 }
  if (t < T.send) return { mood: 'neutral', look: [1, 1] }
  if (t < T.email) return { mood: 'happy' }
  if (t < T.hush + 0.4) return { mood: 'squint', look: [-1, 0] }
  if (t < T.reply) return { mood: 'neutral', look: [1, 1] }
  if (t < T.cut) return { mood: 'heart' }
  return { mood: 'happy' }
}

function clock(x, t, cx, cy, vis) {
  const mins = t < T.seven ? 59 : 0
  x.save(); x.globalAlpha = vis; x.translate(cx, cy)
  const k = t > T.seven && t < T.seven + 0.4 ? 1 + 0.12 * Math.sin(Math.PI * (t - T.seven) / 0.4) : 1
  x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -56, 240, 112)
  x.fillStyle = '#20314a'; x.fillRect(-110, -46, 220, 92)
  x.fillStyle = mins === 0 ? ACC : '#ff8a5c'; x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(mins === 0 ? '7:00' : '6:59', 0, 4)
  x.restore()
}

function laptop(x, t, K, cx, cy, vis) {
  const shut = ease.inCubic(prog(t, T.shut - 0.2, T.shut))
  x.save(); x.globalAlpha = vis; x.translate(cx, cy)
  // base
  x.fillStyle = INK; x.fillRect(-230, -10, 460, 44); x.fillStyle = '#8aa0b8'; x.fillRect(-222, -4, 444, 32)
  // the lid: open (tall) → shut (flat on the base)
  const lh = lerp(280, 14, shut)
  x.fillStyle = INK; x.fillRect(-210, -10 - lh, 420, lh + 4)
  x.fillStyle = '#5b6e86'; x.fillRect(-202, -4 - lh, 404, lh - 4)
  if (shut < 0.9) {
    x.fillStyle = `rgba(150,220,255,${0.9 * (1 - shut)})`; x.fillRect(-186, 8 - lh, 372, lh - 30)
    // scrolling spreadsheet rows (work work work)
    x.fillStyle = `rgba(27,18,54,${0.5 * (1 - shut)})`
    for (let i = 0; i < 6; i++) { const yy = 20 - lh + ((i * 40 + t * 120) % (lh - 50)); if (yy < -20) x.fillRect(-170, yy, 120 + (i * 53) % 200, 12) }
  }
  x.restore()
  if (shut < 0.9) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25 * (1 - shut) * vis; const g = x.createRadialGradient(cx, cy - 140, 20, cx, cy - 140, 500); g.addColorStop(0, 'rgba(120,200,255,0.8)'); g.addColorStop(1, 'rgba(120,200,255,0)'); x.fillStyle = g; x.fillRect(cx - 520, cy - 640, 1040, 1000); x.restore() }
  if (t > T.shut) sparkles(x, t, cx, cy - 20, T.shut, 8, 200, 0.2, [BONE, ACC, GOLD])
  // the email that tries to get in
  if (t > T.email && t < T.hush + 0.5) {
    const k = K.pop01(t, T.email, 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.hush, T.hush + 0.4)))
    const sh = t < T.hush ? Math.sin(t * 40) * 6 : 0
    x.save(); x.globalAlpha = vis; x.translate(cx + 40 + sh, cy - 470); x.scale(k * 1.4, k * 1.4)
    x.fillStyle = INK; x.fillRect(-170, -44, 340, 88); x.fillStyle = BONE; x.fillRect(-162, -36, 324, 72)
    x.fillStyle = '#ff4a5e'; x.fillRect(-150, -18, 36, 36)
    x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('1 NEW EMAIL', -100, 2)
    x.restore()
  }
}

function phone(x, t, K, cx, cy, vis, big = false) {
  const pin = big ? 1 : K.pop01(t, T.phone[0], 0.4, 1.8)
  if (!big && t < T.phone[0]) return
  x.save(); x.globalAlpha = vis; x.translate(cx, cy + (1 - pin) * 400); x.rotate(big ? -0.06 : 0.08)
  const s = big ? 1.15 : 1; x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-100, -170, 200, 340); x.fillStyle = '#d9b25a'; x.fillRect(-92, -162, 184, 324)
  x.fillStyle = '#241848'; x.fillRect(-82, -146, 164, 292)
  // the text, typed out
  const msg = 'thinking of you', n = big ? msg.length : Math.floor(prog(t, ...T.typed) * msg.length)
  if (n > 0) {
    const sent = big || t > T.send, by = sent ? -110 : 80
    x.fillStyle = sent ? ACC : 'rgba(239,230,214,0.25)'; x.fillRect(-70, by - 26, 150, 66)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(msg.slice(0, 8), -60, by - 6); x.fillText(msg.slice(8, n), -60, by + 18)
  }
  // the reply: a pink heart
  if (big || t > T.reply) {
    const k = big ? 1 : K.pop01(t, T.reply, 0.35, 2.6)
    x.save(); x.translate(-20, 10); x.scale(k, k)
    x.fillStyle = '#ff8fb1'; x.fillRect(-60, -30, 120, 90)
    K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 0, 15, 9)
    x.restore()
  }
  x.restore()
  if (!big && t > T.reply) {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * prog(t, T.reply, T.reply + 0.4) * vis
    const g = x.createRadialGradient(cx, cy, 20, cx, cy, 300); g.addColorStop(0, 'rgba(255,120,170,0.8)'); g.addColorStop(1, 'rgba(255,120,170,0)'); x.fillStyle = g; x.fillRect(cx - 320, cy - 320, 640, 640); x.restore()
    sparkles(x, t, cx, cy, T.reply, 10, 200, 0.3, [PINK, GOLD, BONE])
  }
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  // the room gets darker once the laptop is shut, warmer once the reply lands
  const dark = prog(t, T.shut, T.shut + 0.3) * (1 - prog(t, T.reply, T.reply + 0.6) * 0.6)
  x.save(); x.fillStyle = `rgba(6,4,20,${0.3 * dark * out})`; x.fillRect(0, 0, 1080, 1920); x.restore()
  clock(x, t, 820, last ? 720 : 620, out)
  // the desk
  x.save(); x.globalAlpha = out; x.fillStyle = INK; x.fillRect(60, 1250, 960, 30); x.fillStyle = '#7a4a2a'; x.fillRect(70, 1254, 940, 22); x.restore()
  if (!last) laptop(x, t, K, 420, 1240, out)
  const typing = t < T.seven ? Math.abs(Math.sin(t * 18)) * 0.05 : 0
  const P = last ? { x: 400, y: 1080 } : t < T.shut ? { x: 420, y: 960 } : { x: 360, y: 1080 }
  const hush = ease.outBack(prog(t, T.email + 0.3, T.hush)) * (1 - prog(t, T.hush + 0.6, T.hush + 1))
  K.guide(t, { ...P, size: 280, color: CAP.color, glyph: CAP.glyph, ...capState(t), hops: HOPS, seed: 10, pop: out, squash: typing,
    side: hush > 0.5 ? -1 : 1, lanternGlow: 1 + 0.5 * hush })
  if (!last) phone(x, t, K, 770, 1040, out)
  else {
    phone(x, t, K, 740, 1000, out, true)
    for (let i = 0; i < 4; i++) { const b = T.lastLand + i * 0.55, p = prog(t, b, b + 1.6); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 560 + Math.sin(i * 2.3) * 180, 860 - p * 260, 6, { alpha: Math.sin(Math.PI * p) }) }
  }
}

const F = guideFilm({
  duration: 20, sign: 'capricorn', n: 3, speaker: SPEAK, accent: ACC,
  hook: 'Try this week, | *Capricorn.*', hookOut: T.hookOut, chipOut: [T.cut - 0.3, T.cut],
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'IN TRADITIONAL ASTROLOGY,|CAPRICORN RULES THE KNEES AND BONES', at: T.fact, dur: T.factDur, x: 540, y: 330 },
  heads: [
    { text: 'Clock out. | *Show* *up.*', at: T.last, out: T.out, top: 230, size: 124, accentSize: 186, accentColor: ACC, late: 2, lateAt: T.lastLand },
  ],
  drawBack: drawStage,
  cues: [
    ...Array.from({ length: 14 }, (_, i) => ['tick', +(0.08 + i * 0.17).toFixed(2), 0.018 + (i % 3) * 0.006]),
    ['bell', T.seven, 1318.51, 0.04, 1.2, 0.3],
    ['boom', T.shut, 0.14], ['tick', T.shut, 0.07],
    ['whoosh', T.phone[0], 0.4, 0.03], ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.typed[0] + i * 0.1).toFixed(2), 1760, 0.015, 0.3]),
    ['whoosh', T.send, 0.25, 0.03], ['pop', T.send + 0.1, 1174.66, 0.04, 0.3],
    ['pop', T.email, 466.16, 0.04, -0.3], ['tick', T.email + 0.2, 0.03], ['tick', T.email + 0.4, 0.03],
    ['whoosh', T.hush, 0.3, 0.025], ['pop', T.hush + 0.2, 349.23, 0.03, -0.3],
    ['pluck', T.reply, 1567.98, 0.05, 0.6, 0.3], ['glitter', T.reply, T.reply + 0.6],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
