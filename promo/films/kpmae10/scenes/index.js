// kpmae10: PLANET TALK: MARS, Ep 10 · ♑ Capricorn · "Love isn't a Q3 goal" (29 s vertical, star_advice, synthwave · F#m).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-crash through an office whiteboard ("FALL IN LOVE: Q3 NEXT YEAR"), the halves flying; ♑
//        Capricorn mid-gasp at the desk. Hook: "CAPRICORN. Love isn't a Q3 goal."   0.15 shake.
//   1.0  Mars: "You put LOVE on a roadmap?"   3.4 the roadmap draws: promotion → savings → love (if time).
//        Capricorn: "it's very organised."   6.4 Mars: "You can't schedule the feeling."   9.0 "But you CAN make room for it."
//  11.6  a week of meeting blocks; Mars shoves them aside, Thursday evening turns gold: FREE EVENING.
//        Mars: "One free evening a week. Block it. Keep it."   15.6 Capricorn: "…the person from book club did ask about coffee."
//  18.6  sent: "coffee thursday?"   20.6 the reply: "yes!! it's a date."   21.4 ♓ Pisces on a video call, crying.
//  24.2  Mars: "Calendar: improved."   26.2 the line slams: "Block the evening. Keep it."   28.6 → 29.0 loop to frame 0.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, dust, phone, flash, hearts, rr,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 29
const IN = { at: -0.68, x: 720, y: 660, size: 380 }
const T = { land: 0.22, road: [3.4, 6.2], week: [11.6, 15.4], gold: 12.6, phone: [18.4, 18.8], send: 18.9, typing: [19.6, 20.6], reply: 20.6, pis: 21.4, phoneOut: [21.2, 21.5], callOut: [24.0, 24.3] }
const BUB = [
  { t0: 1.0, t1: 3.2, x: 560, y: 1290, who: 'mars', text: 'You put *LOVE* on a roadmap?', tail: 180, tailUp: true },
  { t0: 3.8, t1: 6.2, x: 560, y: 1230, who: 'capricorn', text: 'it’s very *organised.*', tail: -220, tailUp: false },
  { t0: 6.4, t1: 8.8, x: 560, y: 1230, who: 'mars', text: 'You can’t *schedule* the feeling.', tail: 180, tailUp: true },
  { t0: 9.0, t1: 11.4, x: 560, y: 1230, who: 'mars', text: 'But you *CAN* make room for it.', tail: 180, tailUp: true },
  { t0: 12.8, t1: 15.4, x: 560, y: 1230, who: 'mars', text: 'One free evening a week. Block it. *Keep* it.', tail: 180, tailUp: true },
  { t0: 15.6, t1: 18.3, x: 560, y: 1230, who: 'capricorn', text: '…the person from book club did ask about *coffee.*', tail: -220, tailUp: false, maxW: 720 },
  { t0: 21.7, t1: 23.9, x: 560, y: 1230, who: 'pisces', text: 'you made TIME for *love.*', tail: 200, tailUp: true },
  { t0: 24.2, t1: 26.0, x: 560, y: 1230, who: 'mars', text: 'Calendar: *improved.*', tail: 180, tailUp: true, size: 52 },
]
const SHAKE = { at: T.land, len: 0.5, amp: 28 }
const ROAD = [['Q1', 'promotion'], ['Q2', 'savings'], ['Q3 next yr', 'love (if time)']]
const DAYS = ['M', 'T', 'W', 'T', 'F']

function office(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1c1440'); g.addColorStop(0.7, '#2a1f52'); g.addColorStop(1, '#181030'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // city window strip
  x.fillStyle = '#0c0828'; x.fillRect(0, 300, 1080, 520)
  for (let i = 0; i < 9; i++) { const h = 120 + (i * 73) % 260; x.fillStyle = '#231a4a'; x.fillRect(i * 125, 820 - h, 110, h); for (let j = 0; j < 8; j++) { if ((i * 7 + j * 3) % 5 === 0) continue; x.fillStyle = `rgba(255,214,120,${0.25 + 0.2 * Math.sin(t + i + j)})`; x.fillRect(i * 125 + 14 + (j % 3) * 30, 840 - h + Math.floor(j / 3) * 34, 14, 18) } }
  x.strokeStyle = '#3a2f6a'; x.lineWidth = 14; x.strokeRect(0, 300, 1080, 520); for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(i * 270, 300); x.lineTo(i * 270, 820); x.stroke() }
  // desk + laptop
  x.fillStyle = '#5a3f8a'; x.fillRect(0, 1640, 1080, 40); x.fillStyle = '#3a2a5a'; x.fillRect(0, 1680, 1080, 240)
  x.fillStyle = '#b8b0d0'; rr(x, 560, 1520, 300, 120, 10); x.fill(); x.fillStyle = '#7fe0ff'; x.globalAlpha = 0.5; rr(x, 575, 1532, 270, 96, 6); x.fill(); x.globalAlpha = 1
  x.fillStyle = '#d0c8e8'; x.fillRect(530, 1636, 360, 10)
}
function whiteboard(x, t) {
  const p = clamp((t + 0.68) / 1.9)
  if (p >= 1) return
  for (const s of [-1, 1]) {
    x.save(); x.globalAlpha = 1 - ease.inQuad(p)
    x.translate(720 + s * (170 + p * 520), 640 + p * p * 700); x.rotate(s * p * 1.1)
    x.fillStyle = '#f4f2f8'; x.fillRect(-170, -150, 340, 300); x.strokeStyle = '#8a80a0'; x.lineWidth = 10; x.strokeRect(-170, -150, 340, 300)
    x.fillStyle = '#2a6fd0'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if (s < 0) { x.fillText('FALL IN', 40, -40); x.fillText('LOVE:', 40, 20) } else { x.fillText('Q3 NEXT', -40, -40); x.fillText('YEAR', -40, 20) }
    x.restore()
  }
}
function roadmap(x, t) {
  if (t < T.road[0] - 0.2 || t > T.road[1] + 0.4) return
  const k = pop01(t, T.road[0] - 0.2, 0.3, 1.8) * outK(t, [T.road[1], T.road[1] + 0.3])
  x.save(); x.translate(540, 990); x.scale(k, k)
  x.fillStyle = INK; rr(x, -500, -150, 1000, 300, 30); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 8; const lp = ease.outCubic(prog(t, T.road[0], T.road[0] + 1.6)); x.beginPath(); x.moveTo(-400, 0); x.lineTo(-400 + 800 * lp, 0); x.stroke()
  ROAD.forEach(([q, s], i) => {
    const at = T.road[0] + 0.3 + i * 0.6, kk = pop01(t, at, 0.25, 2.4); if (kk <= 0) return
    const X = -360 + i * 360
    x.save(); x.translate(X, 0); x.scale(kk, kk)
    x.fillStyle = i === 2 ? '#ff8fb1' : GOLD; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(q, 0, -70)
    x.font = `800 ${i === 2 ? 34 : 38}px ${INTER}`; x.fillStyle = i === 2 ? '#ff8fb1' : BONE; x.fillText(s, 0, 70)
    x.restore()
  })
  x.restore()
}
function week(x, t) {
  if (t < T.week[0] - 0.2 || t > T.week[1] + 0.4) return
  const k = pop01(t, T.week[0] - 0.2, 0.3, 1.8) * outK(t, [T.week[1], T.week[1] + 0.3])
  x.save(); x.translate(540, 980); x.scale(k, k)
  x.fillStyle = INK; rr(x, -470, -170, 940, 340, 26); x.fill()
  DAYS.forEach((d, i) => {
    const X = -380 + i * 190
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(d, X, -135)
    for (let j = 0; j < 3; j++) {
      const thu = i === 3 && j === 2
      const shove = thu ? 0 : ease.inOutCubic(prog(t, T.gold - 0.5 + (i + j) * 0.05, T.gold)) * (j === 2 ? 1 : 0)
      const Y = -80 + j * 82
      x.save(); x.translate(X + shove * (i < 3 ? -40 : 40), Y + shove * 30); x.globalAlpha = 1 - shove * 0.6
      const gold = thu && t > T.gold
      x.fillStyle = gold ? GOLD : ['#5b4a8a', '#4a6fa0', '#6a4a7a'][(i + j) % 3]; rr(x, -82, -34, 164, 68, 12); x.fill()
      x.fillStyle = gold ? INK : 'rgba(255,255,255,0.75)'; x.font = `700 ${gold ? 22 : 20}px ${MONO}`
      x.fillText(gold ? 'FREE EVENING' : j === 2 ? 'work late' : 'meeting', 0, 1)
      x.restore()
    }
  })
  x.restore()
}

function draw(x, t, K) {
  office(x, t)
  whiteboard(x, t)
  roadmap(x, t)
  week(x, t)
  // Capricorn at the desk
  const cm = t < 1 ? 'wide' : t < 6.2 ? 'happy' : t < 11.4 ? 'neutral' : t < 15.6 ? 'wide' : t < T.reply ? 'squint' : 'heart'
  drawSign(x, 'capricorn', 280, 1500, 300, t, { mood: cm, look: [1, -0.6], hops: [3.9, 4.4, 15.7, 16.2, 16.8, T.reply + 0.2, T.reply + 0.6], shadow: false })
  hearts(x, t, T.reply + 0.1, 300, 1400, { n: 12, col: '#ff8fb1' })
  // the phone
  const pk = ease.outBack(prog(t, ...T.phone)) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
  if (pk > 0.01) phone(x, t, { cx: 540, cy: 1010, w: 600, h: 400, k: pk, title: '♑︎ → them', size: 36, typing: T.typing,
    msgs: [{ at: T.send, side: 'R', text: 'coffee thursday?' }, { at: T.reply, side: 'L', text: 'yes!! it’s a date.' }] })
  // Pisces on a video call
  if (t > T.pis) {
    const k = pop01(t, T.pis, 0.35, 1.8) * outK(t, T.callOut)
    x.save(); x.translate(540, 1000); x.scale(k, k)
    x.fillStyle = INK; rr(x, -260, -200, 520, 400, 30); x.fill(); x.fillStyle = '#2a4a7a'; rr(x, -246, -186, 492, 372, 22); x.fill()
    x.save(); rr(x, -246, -186, 492, 372, 22); x.clip(); pisces(x, t, 0, 30, 260, { look: [0, 0], hops: [21.8, 22.2, 22.6, 23.0, 23.4], squash: 0.05 * Math.sin(t * 22) }); x.restore()
    x.fillStyle = '#ff3b3b'; x.beginPath(); x.arc(-210, -150, 10, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('video call · ♓︎', -190, -150)
    x.restore()
  }
  // Mars
  const P = entrance('zoom', t, IN)
  drawEntranceFx(x, 'mars', 'zoom', t, IN)
  dust(x, t, T.land, 720, 760, { R: 380, seed: 10 })
  const shove = t > T.gold - 0.6 && t < T.gold ? Math.sin((t - T.gold) * 30) * 14 : 0
  const mm = t < 3.4 ? 'angry' : t < 6.4 ? 'wide' : t < 12.6 ? 'neutral' : t < T.reply ? 'happy' : t < 24 ? 'love' : 'proud'
  K.mars(P.x + shove, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: [-1, 1], hops: [1.1, 1.7, 6.5, 7.1, 9.1, 9.8, 12.9, 13.5, 14.2, 24.3, 24.9] })
}
function over(x, t) { flash(x, t, T.land, { col: '#d0e0ff', d: 0.2, a: 0.55 }); flash(x, t, T.gold, { col: GOLD, d: 0.25, a: 0.25 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae10', duration: D, end: 'loop',
  hook: { at: -1, text: 'CAPRICORN. Love isn’t | a *Q3 goal.*', out: [3.2, 3.4], top: 900 },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE)],
  last: { at: 26.2, text: 'Block the evening. | *Keep* it.', top: 960, size: 96 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('zoom', IN), ['crash', 0.0, { gain: 0.04 }],
    ...ROAD.map((_, i) => popCue(T.road[0] + 0.3 + i * 0.6, 659.25 + i * 150, 0.04, 0)),
    ['whoosh', T.week[0], 0.4, 0.035], ...Array.from({ length: 6 }, (_, i) => ['whoosh', +(T.gold - 0.5 + i * 0.08).toFixed(2), 0.15, 0.02]),
    ['bell', T.gold, 1760, 0.04, 1.0, 0], ['glitter', T.gold, T.gold + 0.6],
    ['whoosh', T.phone[0], 0.35, 0.03], ...thud(T.send), popCue(T.send, 880, 0.04, 0.2),
    ['tick', 19.7, 0.02], ['tick', 19.85, 0.02], ['tick', 20.0, 0.02],
    popCue(T.reply, 1318.51, 0.05, -0.2), popCue(T.reply + 0.07, 1567.98, 0.04, -0.2), ['glitter', T.reply, T.reply + 0.8],
    ['pop', T.pis, 659.25, 0.04, 0], ['pop', T.pis + 0.12, 880, 0.04, 0], ...sobCues(21.9, 4), ...sobCues(23.0, 3),
  ],
})
