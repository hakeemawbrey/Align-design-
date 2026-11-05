// kpmae12: PLANET TALK: MARS, Ep 12 · ♓ Pisces · "Have you said hi?" (29.5 s vertical, star_advice, dreamy · Ab).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-dive through ♓ Pisces's dream bubble (a whole wedding imagined), the bubble mid-pop, Pisces
//        mid-tear at a night bus stop. Hook: "PISCES. Have you even said hi?"
//   1.0  Mars: "You planned a WEDDING? With the bus stop person?"   3.8 Pisces: "and a dog. and a little house by the sea."
//   6.6  Mars: "Have you said ONE word to them?"   8.8 Pisces: "…does smiling count?"
//  11.0  Mars: "Daydreams are lovely. But one real 'hi' beats a hundred of them."   14.8 countdown 3 · 2 · 1 · GO.
//  17.0  Pisces, shaking: "hi."   18.6 ♉: "hi! I like your scarf."   21.0 Pisces, happy-fountain: "they like my SCARF."
//  23.2  Mars, eyes shiny: "I'm not crying. It's the dust."   25.8 "It's dust. Mars is very dusty."   29.1 → 29.5 loop.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, flash, hearts, rr,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { drawSpace } from '../../planetkit.js'
import { screenShake, shakeCues, countdown, countdownCues } from '../../hookkit.js'

const D = 29.5
const IN = { at: -0.62, x: 600, y: 560, size: 340 }
const T = { land: 0.28, dream2: [3.8, 6.4], pop2: 6.5, count: 14.8, hi: 17.0, reply: 18.6, joy: 21.0, dusty: 23.2 }
const BUB = [
  { t0: 1.1, t1: 3.6, x: 540, y: 1160, who: 'mars', text: 'You planned a *WEDDING?* With the bus stop person?', tail: 60, tailUp: true, maxW: 760 },
  { t0: 3.8, t1: 6.4, x: 560, y: 1180, who: 'pisces', text: 'and a dog. and a little house by the *sea.*', tail: -240, tailUp: false, maxW: 720 },
  { t0: 6.6, t1: 8.6, x: 540, y: 1160, who: 'mars', text: 'Have you said *ONE* word to them?', tail: 60, tailUp: true },
  { t0: 8.8, t1: 10.8, x: 560, y: 1180, who: 'pisces', text: '…does *smiling* count?', tail: -240, tailUp: false },
  { t0: 11.0, t1: 14.6, x: 540, y: 1160, who: 'mars', text: 'Daydreams are lovely. But one real ‘hi’ beats a *hundred* of them.', tail: 60, tailUp: true, maxW: 780, size: 44 },
  { t0: 17.0, t1: 18.4, x: 400, y: 1200, who: 'pisces', text: 'hi.', tail: -100, tailUp: false, size: 36 },
  { t0: 18.6, t1: 20.8, x: 640, y: 1180, who: 'taurus', text: 'hi! I like your *scarf.*', tail: 160, tailUp: false },
  { t0: 21.0, t1: 23.0, x: 520, y: 1180, who: 'pisces', text: 'they like my *SCARF.*', tail: -220, tailUp: false, size: 52, shake: 3 },
  { t0: 23.2, t1: 25.6, x: 540, y: 1160, who: 'mars', text: 'I’m not crying. It’s the *dust.*', tail: 60, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.45, amp: 22 }
const CD = { at: T.count, from: 3, gap: 0.5, go: 'HI!', y: 900 }

function street(x, t) {
  drawSpace(x, t, { planet: 'neptune', tint: '#4f7ff0', seed: 12, horizon: null })
  // buildings
  for (let i = 0; i < 6; i++) { const h = 300 + (i * 97) % 280; x.fillStyle = '#1a1440'; x.fillRect(i * 190 - 20, 1300 - h, 170, h); for (let j = 0; j < 6; j++) { if ((i + j) % 3 === 0) continue; x.fillStyle = 'rgba(255,214,140,0.35)'; x.fillRect(i * 190 + (j % 2) * 70, 1330 - h + Math.floor(j / 2) * 60, 30, 34) } }
  // pavement
  x.fillStyle = '#2a2050'; x.fillRect(0, 1300, 1080, 620); x.fillStyle = '#3a2f66'; x.fillRect(0, 1300, 1080, 16)
  // lamp
  x.fillStyle = '#4a4070'; x.fillRect(960, 700, 16, 620); x.fillStyle = '#ffe9b0'; x.beginPath(); x.ellipse(968, 700, 50, 18, 0, 0, Math.PI * 2); x.fill()
  const lg = x.createRadialGradient(968, 760, 0, 968, 1100, 520); lg.addColorStop(0, 'rgba(255,233,176,0.3)'); lg.addColorStop(1, 'rgba(255,233,176,0)'); x.fillStyle = lg; x.fillRect(400, 700, 680, 900)
  // bus stop sign + bench
  x.fillStyle = '#6a6090'; x.fillRect(110, 960, 12, 400); x.fillStyle = '#2a8fd0'; x.beginPath(); x.arc(116, 950, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUS', 116, 952)
  x.fillStyle = '#7a4a36'; rr(x, 140, 1470, 360, 30, 8); x.fill(); x.fillRect(160, 1500, 16, 70); x.fillRect(460, 1500, 16, 70)
}
function dream(x, t, cx, cy, R, k, popAt, scene) {
  if (k <= 0.01) return
  const pp = popAt != null ? prog(t, popAt, popAt + 0.5) : 0
  if (pp >= 1) return
  x.save()
  if (pp <= 0) {
    // thought dots
    for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(239,230,214,0.85)'; x.beginPath(); x.arc(cx - 40 + i * 30, cy + R * k + 30 + i * 36, (14 - i * 3) * k, 0, Math.PI * 2); x.fill() }
    x.globalAlpha = 0.95; x.fillStyle = 'rgba(239,230,255,0.92)'; x.beginPath(); x.arc(cx, cy, R * k, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#c9a6ff'; x.lineWidth = 6; x.stroke()
    x.save(); x.beginPath(); x.arc(cx, cy, R * k - 6, 0, Math.PI * 2); x.clip(); scene(x, cx, cy, R * k); x.restore()
  } else {
    // shards flying out
    for (let i = 0; i < 16; i++) {
      const a = i * 0.39 + 0.2, r = R * (1 + pp * 1.4)
      x.globalAlpha = 1 - pp; x.fillStyle = i % 2 ? 'rgba(239,230,255,0.9)' : '#c9a6ff'
      x.save(); x.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.rotate(a + pp * 4); x.fillRect(-22, -10, 44, 20); x.restore()
    }
  }
  x.restore()
}
const wedding = (x, cx, cy, R) => {
  x.strokeStyle = '#ff8fb1'; x.lineWidth = 12; x.beginPath(); x.arc(cx, cy + R * 0.35, R * 0.62, Math.PI, 0); x.stroke()
  for (let i = 0; i < 7; i++) { const a = Math.PI + i * Math.PI / 6; x.fillStyle = i % 2 ? '#ff5c8e' : '#fff'; x.beginPath(); x.arc(cx + Math.cos(a) * R * 0.62, cy + R * 0.35 + Math.sin(a) * R * 0.62, 12, 0, Math.PI * 2); x.fill() }
  drawSign(x, 'pisces', cx - R * 0.25, cy + R * 0.25, R * 0.55, 0.5, { mood: 'heart', glyph: false, bob: 0 })
  drawSign(x, 'taurus', cx + R * 0.25, cy + R * 0.25, R * 0.55, 0.5, { mood: 'happy', glyph: false, bob: 0 })
}
const house = (x, cx, cy, R) => {
  x.fillStyle = '#5fa8e0'; x.fillRect(cx - R, cy + R * 0.35, R * 2, R)
  x.fillStyle = '#f7c6a8'; x.fillRect(cx - R * 0.45, cy - R * 0.1, R * 0.6, R * 0.5); x.fillStyle = '#e5573b'; x.beginPath(); x.moveTo(cx - R * 0.55, cy - R * 0.1); x.lineTo(cx - R * 0.15, cy - R * 0.45); x.lineTo(cx + R * 0.25, cy - R * 0.1); x.fill()
  x.fillStyle = '#b8935a'; x.beginPath(); x.ellipse(cx + R * 0.48, cy + R * 0.22, R * 0.2, R * 0.12, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(cx + R * 0.66, cy + R * 0.1, R * 0.1, 0, Math.PI * 2); x.fill()
}
function scarf(x, X, Y, s) { x.fillStyle = '#ff8f3a'; rr(x, X - s * 0.32, Y + s * 0.08, s * 0.64, s * 0.12, s * 0.05); x.fill(); x.fillRect(X + s * 0.12, Y + s * 0.15, s * 0.1, s * 0.25) }

function draw(x, t, K) {
  street(x, t)
  // the dream bubbles: the wedding (popping on frame 0), then the dog-and-house one
  dream(x, t, 330, 760, 230, 1, 0.12, wedding)
  dream(x, t, 330, 800, 190, pop01(t, T.dream2[0], 0.4, 1.8), T.pop2, house)
  // ♉ at the stop
  drawSign(x, 'taurus', 800, 1410, 250, t, { mood: t < T.hi ? 'neutral' : t < T.joy ? 'happy' : 'heart', look: t < T.hi ? [1, -0.3] : [-1, 0], hops: [18.7, 19.2, 19.7, 20.2], shadow: true, seed: 4 })
  // Pisces on the bench (always crying: sad, nervous, then happy fountains)
  const pm = t < 3.8 ? 'wide' : t < 6.4 ? 'sparkle' : t < 11 ? 'neutral' : t < T.reply ? 'wide' : t < T.joy ? 'sparkle' : 'happy'
  const px = lerp(300, 380, ease.inOutCubic(prog(t, 16.6, 17.0)))
  pisces(x, t, px, 1400, 280, { mood: pm, tears: t < T.joy ? 2 : 3, look: t < 14.8 ? [0.4, -1] : [1, 0], sweat: t > 14.8 && t < T.reply, hops: [3.9, 4.4, 4.9, 8.9, 9.4, 17.1, T.joy, T.joy + 0.35, T.joy + 0.7, T.joy + 1.05, T.joy + 1.4], squash: t > T.count && t < T.reply ? 0.04 * Math.sin(t * 40) : 0, shadow: true })
  scarf(x, px, 1400, 280)
  hearts(x, t, T.reply + 0.2, 600, 1300, { n: 14, col: '#8fd0ff' })
  // Mars: dives through the dream
  const P = entrance('zoom', t, IN)
  drawEntranceFx(x, 'mars', 'zoom', t, IN)
  const mm = t < 3.8 ? 'angry' : t < 11 ? 'wide' : t < 17 ? 'happy' : t < T.dusty ? 'love' : t < 25.6 ? 'cry' : 'proud'
  K.mars(P.x, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, tears: t > T.dusty && t < 25.6 ? 1 : 0, look: t < T.hi ? [-1, 1] : [0.3, 1], hops: [1.1, 1.7, 2.4, 6.7, 7.3, 11.1, 11.7, 12.5, 13.3, 23.3, 23.9] })
  // red dust drifting off Mars while he "isn't crying"
  if (t > T.dusty) for (let i = 0; i < 14; i++) { const ph = ((t - T.dusty) * 0.4 + i / 14) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = '#e5573b'; x.beginPath(); x.arc(P.x - 200 + (i * 37) % 400, P.y - 80 + ph * 300, 6 + (i % 3) * 3, 0, Math.PI * 2); x.fill() }
  x.globalAlpha = 1
}
function over(x, t) { flash(x, t, T.land, { col: '#e8dcff', d: 0.2, a: 0.5 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae12', duration: D, end: 'loop',
  hook: { at: -1, text: 'PISCES. Have you even | said *hi?*', out: [3.5, 3.7], top: 1650, size: 100 },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE), countdown(CD)],
  last: { at: 25.8, text: 'It’s dust. | Mars is *very* dusty.', top: 1650, size: 100 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('zoom', IN), ['glitter', 0.0, 0.5], ['pop', 0.02, 1567.98, 0.05, -0.3],
    ['whoosh', T.dream2[0], 0.4, 0.03], ['glitter', T.dream2[0], T.dream2[0] + 0.5], ['pop', T.pop2, 1318.51, 0.05, -0.3], ['glitter', T.pop2, T.pop2 + 0.4],
    ...countdownCues(CD), popCue(T.reply, 1318.51, 0.05, 0.3), ['glitter', T.reply, T.reply + 0.8],
    ...sobCues(4.0, 3), ...sobCues(9.0, 3), ...sobCues(21.1, 4), ...sobCues(22.3, 3), ['pluck', T.dusty + 0.4, 587.33, 0.03, 0.8, 0],
  ],
})
