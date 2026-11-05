// kpmae08: PLANET TALK: MARS, Ep 8 · ♏ Scorpio · "Say it warm" (30.5 s vertical, star_advice, cinematic · Dm).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-landing in a red dust storm that freezes mid-air in ♏ Scorpio's icy silence (frost on the
//        phone, frost creeping round the frame). Hook: "SCORPIO. The silent treatment isn't a plan."
//   1.0  Mars: "Three days of silence. What happened?"   3.8 Scorpio: "they forgot our plans. I'm fine."  (−40°: "fine")
//   6.6  Mars: "In astrology, I rule anger. And anger's allowed."   10.0 "But silence makes them guess. Say it out loud. Warm."
//  13.6  the script card: "I felt hurt when you forgot our plans. Can we talk?"   15.6 Scorpio: "…say it warm. okay."
//  18.6  sent.   20.6 the reply: "you're right. I'm sorry. can I call you tonight?"   21.2 the frost melts, the dust settles.
//  22.6  ♓ Pisces in the doorway, weeping: "that was so healthy. I'm a mess."   25.2 Mars: "That's the move."
//  27.4  the line slams: "Feel it hot. Say it warm."   30.1 → 30.5 loop back into frame 0.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, flash, hearts, rr, phone, panel,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { drawSpace } from '../../planetkit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 30.5
const IN = { at: -0.62, x: 540, y: 660, size: 400 }
const T = { land: 0.08, temp: [3.8, 6.4], card: [13.6, 18.3], phone: [18.4, 18.8], send: 18.9, typing: [19.6, 20.6], reply: 20.6, melt: [21.2, 22.6], pis: 22.4, phoneOut: [24.9, 25.2] }
const BUB = [
  { t0: 1.0, t1: 3.6, x: 540, y: 1040, who: 'mars', text: 'Three days of silence. What *happened?*', tail: 0, tailUp: true },
  { t0: 3.8, t1: 6.4, x: 540, y: 1100, who: 'scorpio', text: 'they forgot our plans. I’m *fine.*', tail: 0, tailUp: false },
  { t0: 6.6, t1: 9.8, x: 540, y: 1040, who: 'mars', text: 'In astrology, I rule *anger.* And anger’s allowed.', tail: 0, tailUp: true },
  { t0: 10.0, t1: 13.4, x: 540, y: 1040, who: 'mars', text: 'But silence makes them *guess.* Say it out loud. Warm.', tail: 0, tailUp: true, maxW: 760 },
  { t0: 15.6, t1: 18.1, x: 540, y: 1260, who: 'scorpio', text: '…say it *warm.* okay.', tail: 0, tailUp: false, size: 42 },
  { t0: 22.7, t1: 25.0, x: 520, y: 1720, who: 'pisces', text: 'that was so *healthy.* I’m a mess.', tail: 300, tailUp: true, size: 42 },
  { t0: 25.2, t1: 27.2, x: 540, y: 1040, who: 'mars', text: 'That’s the *move.*', tail: 0, tailUp: true, size: 54 },
]
const SHAKE = { at: T.land, len: 0.5, amp: 30 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const DUST = Array.from({ length: 70 }, (_, i) => [fr(i, 1) * 1080, 300 + fr(i, 2) * 1300, 4 + fr(i, 3) * 12, fr(i, 4)])

function frost(x, t, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a
  const g = x.createRadialGradient(540, 960, 420, 540, 960, 1200); g.addColorStop(0, 'rgba(180,225,255,0)'); g.addColorStop(1, 'rgba(200,235,255,0.55)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.strokeStyle = 'rgba(230,248,255,0.8)'; x.lineWidth = 3
  for (let i = 0; i < 26; i++) {
    const edge = i % 4, u = fr(i, 9)
    const X = edge === 0 ? u * 1080 : edge === 1 ? 1080 : edge === 2 ? u * 1080 : 0
    const Y = edge === 0 ? 0 : edge === 1 ? u * 1920 : edge === 2 ? 1920 : u * 1920
    const ang = Math.atan2(960 - Y, 540 - X), L = 80 + 120 * fr(i, 10)
    x.save(); x.translate(X, Y); x.rotate(ang)
    x.beginPath(); x.moveTo(0, 0); x.lineTo(L, 0); for (let k = 1; k < 4; k++) { const p = L * k / 4; x.moveTo(p, 0); x.lineTo(p + 22, -18); x.moveTo(p, 0); x.lineTo(p + 22, 18) } x.stroke()
    x.restore()
  }
  x.restore()
}

function draw(x, t, K) {
  const melt = ease.inOutCubic(prog(t, ...T.melt))
  drawSpace(x, t, { planet: 'mars', tint: lerp(0, 1, melt) > 0.5 ? '#e5573b' : '#5fa8e0', seed: 8, horizon: { y: 1560, color: '#20163a', rim: melt > 0.5 ? '#ff9a6a' : '#8fd0ff' } })
  // the dust storm: frozen in the air, then it drifts down when the frost melts
  for (const [dx, dy, s, ph] of DUST) {
    const fall = melt * (300 + ph * 500), jit = Math.sin(t * 3 + ph * 20) * 2
    const y = dy + fall + (t < 0.4 ? (0.4 - t) * -600 * ph : 0)
    if (y > 1600) continue
    x.globalAlpha = 0.75 * (1 - melt * 0.6); x.fillStyle = ph > 0.5 ? '#e5573b' : '#c9765a'
    x.beginPath(); x.arc(dx + jit, y, s, 0, Math.PI * 2); x.fill()
  }
  x.globalAlpha = 1
  // Mars
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'mars', 'crash', t, IN)
  const mm = t < 3.6 ? 'angry' : t < 6.6 ? 'sad' : t < 13.6 ? 'neutral' : t < T.reply ? 'happy' : 'proud'
  K.mars(P.x, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: [0, 1], hops: [1.1, 1.7, 2.4, 6.7, 7.3, 8.0, 10.1, 10.8, 11.6, 25.3, 25.9] })
  // Scorpio, icy, with the frosted phone
  const sm = t < 1 ? 'wide' : t < 6.4 ? 'squint' : t < 13.6 ? 'neutral' : t < T.reply ? 'wide' : 'happy'
  drawSign(x, 'scorpio', 540, 1440, 300, t, { mood: sm, look: t < 13.6 ? [-0.5, 0.6] : [0, -1], hops: [3.9, 4.4, 15.7, 16.2, T.reply + 0.2, T.reply + 0.6], shadow: true })
  hearts(x, t, T.reply + 0.1, 540, 1340, { n: 12, col: '#ff8f6a' })
  // the thermometer while Scorpio is "fine"
  if (t > T.temp[0] - 0.2 && t < T.temp[1] + 0.3) {
    const k = pop01(t, T.temp[0] - 0.2, 0.3, 2) * outK(t, [T.temp[1], T.temp[1] + 0.3])
    x.save(); x.translate(900, 1300); x.scale(k, k)
    x.fillStyle = INK; rr(x, -60, -220, 120, 330, 50); x.fill(); x.fillStyle = '#d8f0ff'; rr(x, -22, -190, 44, 250, 22); x.fill()
    x.fillStyle = '#5fa8e0'; rr(x, -22, 20, 44, 40, 20); x.fill(); x.beginPath(); x.arc(0, 80, 42, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText('−40°', 0, 170); x.font = `700 26px ${MONO}`; x.fillText('(“fine”)', 0, 205)
    x.restore()
  }
  // the script card
  if (t > T.card[0] && t < T.card[1] + 0.3) {
    const k = pop01(t, T.card[0], 0.35, 1.8) * outK(t, [T.card[1], T.card[1] + 0.3])
    if (panel(x, 540, 1040, 820, 260, { k, rot: -0.03, fill: CREAM })) {
      x.fillStyle = RED; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAY IT WARM', 0, -90)
      x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.fillText('“I felt hurt when you forgot', 0, -25); x.fillText('our plans. Can we talk?”', 0, 35)
      x.restore()
    }
  }
  // the phone
  const pk = ease.outBack(prog(t, ...T.phone)) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
  if (pk > 0.01) phone(x, t, { cx: 540, cy: 1050, w: 600, h: 450, k: pk, title: '♏︎ → them', size: 34, typing: T.typing,
    msgs: [{ at: T.send, side: 'R', text: 'I felt hurt when you forgot our plans. can we talk?' }, { at: T.reply, side: 'L', text: 'you’re right. I’m sorry. can I call you tonight?' }] })
  // Pisces in the doorway
  if (t > T.pis) {
    const k = ease.outBack(prog(t, T.pis, T.pis + 0.4)) * outK(t, [29.0, 29.5])
    x.fillStyle = 'rgba(255,214,150,0.25)'; x.globalAlpha = clamp(k); rr(x, 860, 1280, 200, 300, 10); x.fill(); x.globalAlpha = 1
    pisces(x, t, lerp(1200, 950, k), 1480, 200, { look: [-1, 0], hops: [22.8, 23.2, 23.6, 24.0, 24.4], squash: 0.05 * Math.sin(t * 22) })
  }
  frost(x, t, 1 - melt)
}
function over(x, t) { flash(x, t, T.land, { col: '#ffb08a', d: 0.2, a: 0.55 }); flash(x, t, T.melt[0], { col: '#ffd8b0', d: 0.5, a: 0.35 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae08', duration: D, end: 'loop',
  hook: { at: -1, text: 'SCORPIO. The silent treatment | isn’t a *plan.*', out: [3.5, 3.7], size: 90, top: 1700 },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE)],
  last: { at: 27.4, text: 'Feel it hot. | Say it *warm.*', top: 240 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('crash', IN), ['whoosh', 0.0, 0.6, 0.05],
    ['bell', 0.3, 2349.32, 0.02, 1.6, 0.3], ['bell', 0.45, 2793.83, 0.015, 1.6, -0.3],
    popCue(T.temp[0], 440, 0.03, 0.4),
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[0] + 0.3, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.phone[0], 0.35, 0.03], ...thud(T.send), popCue(T.send, 880, 0.04, 0.2),
    ['tick', 19.7, 0.02], ['tick', 19.85, 0.02], ['tick', 20.0, 0.02],
    popCue(T.reply, 1318.51, 0.05, -0.2), ['riser', T.melt[0] - 0.4, T.melt[0] + 0.3, 0.05], ['glitter', T.melt[0], T.melt[1]],
    ['whoosh', T.pis, 0.3, 0.03], ...sobCues(22.9, 4), ...sobCues(24.2, 3),
  ],
})
