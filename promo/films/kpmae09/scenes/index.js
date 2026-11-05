// kpmae09: PLANET TALK: MARS, Ep 9 · ♐ Sagittarius · "Sometime is not a day" (24.5 s vertical, star_talk, funk · D).
// Hard cut. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-skid in a dust cloud at a trailhead, ♐ Sagittarius mid-shout "we should hang out sometime!"
//        at ♍ walking away. Hook: "SAGITTARIUS. 'Sometime' isn't a DAY."   0.1 Mars stops (shake).
//   1.4  Mars: "'SOMETIME'? You said that last month."   4.0 a wall of sometimes pops up (soon! let's see! one of these
//        days!). Sag: "I say it to everyone! it's friendly!"   7.0 Mars: "That's four 'sometimes.' Zero Saturdays."
//   9.8  a calendar the size of a door slams down. Mars: "PICK. A. DAY."   12.6 Sag: "…Saturday? the hike?" (SAT circled)
//  15.0  ♍ walks back: "yes! finally."   17.6 Mars: "Freedom is great. Plans are ALSO great."
//  20.2  ♓ Pisces pops up on the hill, crying at the view and the plan.   22.9 "Sometime is now Saturday."  Cut at 24.5.
import {
  makeEpisode, drawSign, drawSpace, entrance, drawEntranceFx, entranceCues, pisces, dust, flash, hearts, rr,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 24.5
const IN = { at: -0.62, x: 760, y: 1150, size: 380 }
const T = { land: 0.13, wall: [4.0, 6.9], hop: [9.2, 9.7], cal: 9.8, circle: 13.4, back: [14.6, 15.2], yes: 15.2, pis: 20.2, calOut: [17.4, 17.7] }
const BUB = [
  { t0: -1, t1: 1.2, x: 420, y: 900, who: 'sagittarius', text: 'we should hang out *sometime!*', tail: -120, tailUp: false },
  { t0: 1.4, t1: 3.8, x: 500, y: 780, who: 'mars', text: '‘SOMETIME’? You said that *last month.*', tail: 220, tailUp: false },
  { t0: 4.4, t1: 6.8, x: 480, y: 1000, who: 'sagittarius', text: 'I say it to everyone! it’s *friendly!*', tail: -160, tailUp: false },
  { t0: 7.0, t1: 9.1, x: 500, y: 780, who: 'mars', text: 'That’s four ‘sometimes.’ *Zero* Saturdays.', tail: 220, tailUp: false },
  { t0: 10.2, t1: 12.4, x: 440, y: 330, who: 'mars', text: 'PICK. A. *DAY.*', tail: 260, size: 60 },
  { t0: 12.6, t1: 14.6, x: 420, y: 1720, who: 'sagittarius', text: '…Saturday? the *hike?*', tail: -100, tailUp: true },
  { t0: 15.3, t1: 17.4, x: 660, y: 1720, who: 'virgo', text: 'yes! *finally.*', tail: 160, tailUp: true },
  { t0: 17.6, t1: 20.0, x: 440, y: 330, who: 'mars', text: 'Freedom is great. Plans are *ALSO* great.', tail: 260, maxW: 640 },
  { t0: 20.4, t1: 22.6, x: 540, y: 1000, who: 'pisces', text: 'the view. the PLAN. I can’t *cope.*', tail: 260, tailUp: false },
]
const SHAKE = { at: T.land, len: 0.45, amp: 26 }
const WALL = [['sometime!', 230, 520], ['soon!', 820, 640], ['let’s see!', 640, 470], ['one of these days!', 330, 700], ['we’ll figure it out!', 760, 820], ['maybe next week!', 260, 380], ['for SURE sometime', 700, 300]]

function trail(x, t) {
  drawSpace(x, t, { planet: 'mars', tint: '#ff9a4a', seed: 9, stars: 0.6 })
  // hills
  x.fillStyle = '#3a2252'; x.beginPath(); x.moveTo(0, 1200); x.quadraticCurveTo(260, 980, 520, 1180); x.quadraticCurveTo(800, 960, 1080, 1150); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  x.fillStyle = '#4a2c3e'; x.beginPath(); x.moveTo(0, 1340); x.quadraticCurveTo(540, 1240, 1080, 1340); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
  // the path + trail sign
  x.fillStyle = '#7a4a36'; x.beginPath(); x.moveTo(470, 1920); x.lineTo(610, 1920); x.lineTo(560, 1300); x.lineTo(520, 1300); x.fill()
  x.fillStyle = '#8a5a42'; x.fillRect(116, 1300, 14, 160); rr(x, 50, 1270, 160, 60, 8); x.fill(); x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRAIL →', 130, 1301)
}
function calendar(x, t) {
  if (t < T.cal - 0.4) return
  const drop = ease.outBounce ? ease.outBounce(prog(t, T.cal - 0.4, T.cal)) : ease.outCubic(prog(t, T.cal - 0.4, T.cal))
  const k = outK(t, T.calOut)
  if (k <= 0.01) return
  x.save(); x.translate(540, lerp(-600, 960, drop)); x.scale(k, k); x.rotate(-0.02)
  x.fillStyle = INK; rr(x, -300, -340, 600, 680, 30); x.fill()
  x.fillStyle = CREAM; rr(x, -288, -328, 576, 656, 24); x.fill()
  x.fillStyle = RED; rr(x, -288, -328, 576, 120, 24); x.fill(); x.fillRect(-288, -250, 576, 42)
  x.fillStyle = '#fff'; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -268)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  days.forEach((d, i) => {
    const y = -165 + i * 72
    x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'left'; x.fillText(d, -240, y)
    x.strokeStyle = '#d8cfc2'; x.lineWidth = 3; x.beginPath(); x.moveTo(-100, y + 26); x.lineTo(250, y + 26); x.stroke()
    if (d === 'SAT' && t > T.circle) {
      x.fillStyle = '#2e7d5b'; x.font = `800 40px ${INTER}`; x.globalAlpha = clamp(prog(t, T.circle + 0.3, T.circle + 0.5)); x.fillText('HIKE ♐︎ + ♍︎', -60, y); x.globalAlpha = 1
      const p = ease.outCubic(prog(t, T.circle, T.circle + 0.4))
      x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(-195, y, 90, 42, -0.08, -1.2, -1.2 + p * Math.PI * 2.1); x.stroke()
    }
  })
  x.restore()
}

function draw(x, t, K) {
  trail(x, t)
  // the wall of sometimes
  WALL.forEach(([s, cx, cy], i) => {
    const at = T.wall[0] + i * 0.35, k = pop01(t, at, 0.25, 2.4) * outK(t, [T.wall[1], T.wall[1] + 0.25])
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 1 : -1) * 0.12); x.scale(k, k)
    x.font = `800 44px ${INTER}`; const w = x.measureText(s).width + 50
    x.fillStyle = GOLD; rr(x, -w / 2, -38, w, 76, 38); x.fill(); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
    x.restore()
  })
  // ♍ walking away, then back
  const back = ease.inOutCubic(prog(t, ...T.back))
  const vx = t < T.back[0] ? lerp(930, 1180, ease.inQuad(prog(t, -0.5, 2.2))) : lerp(1180, 780, back)
  drawSign(x, 'virgo', vx, 1430, 220, t, { mood: t < T.yes ? 'neutral' : 'heart', look: t < T.back[0] ? [1, 0] : [-1, 0], hops: [15.4, 15.8, 16.2], shadow: true, seed: 5 })
  hearts(x, t, T.yes + 0.1, 600, 1350, { n: 14 })
  // Sagittarius
  const sm = t < 1.4 ? 'happy' : t < 4 ? 'wide' : t < 6.9 ? 'happy' : t < 12.6 ? 'wide' : t < T.yes ? 'squint' : 'heart'
  drawSign(x, 'sagittarius', 300, 1420, 290, t, { mood: sm, look: t < 1.4 ? [1, 0] : [1, -0.6], hops: [0.2, 4.5, 5.0, 5.5, 12.7, 13.2, T.yes + 0.1, T.yes + 0.5], shadow: true })
  calendar(x, t)
  // Pisces on the hill
  if (t > T.pis) {
    const k = ease.outBack(prog(t, T.pis, T.pis + 0.4))
    x.save(); x.beginPath(); x.rect(700, 0, 380, 1180); x.clip()
    pisces(x, t, 900, lerp(1300, 1080, k), 210, { look: [-1, -0.5], hops: [20.5, 20.9, 21.3, 21.7, 22.1], squash: 0.05 * Math.sin(t * 22) })
    x.restore()
  }
  // Mars: skids in, then hops up top for the calendar
  const P = entrance('slide', t, IN)
  drawEntranceFx(x, 'mars', 'slide', t, IN)
  dust(x, t, -0.5, 900, 1320, { R: 420, life: 1.2, up: 0.4, seed: 6 })
  const hp = ease.inOutCubic(prog(t, ...T.hop))
  const mx = lerp(P.x, 860, hp), my = lerp(P.y, 420, hp) - Math.sin(hp * Math.PI) * 160, ms = lerp(P.size, 290, hp)
  const mm = t < 4 ? 'angry' : t < 7 ? 'sly' : t < 12.6 ? 'angry' : t < T.yes ? 'wide' : 'proud'
  K.mars(mx, my, ms, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: t < T.hop[0] ? [-1, 0.6] : [-1, 1], hops: [1.5, 2.1, 2.8, 7.1, 7.7, 8.4, 10.3, 10.8, 11.3, 17.7, 18.3, 19.0] })
}
function over(x, t) { flash(x, t, T.land, { col: '#ffd0a0', d: 0.2, a: 0.55 }); flash(x, t, T.cal, { col: '#ffffff', d: 0.12, a: 0.35 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae09', duration: D, end: 'cut',
  hook: { at: -1, text: 'SAGITTARIUS. ‘Sometime’ | isn’t a *DAY.*', out: [3.6, 3.8], size: 96 },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE), screenShake({ at: T.cal, len: 0.35, amp: 22, seed: 4 })],
  last: { at: 22.9, text: 'Sometime is now | *Saturday.*', top: 1640 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('slide', IN), ['whoosh', 0.0, 0.5, 0.05],
    ...WALL.map((_, i) => popCue(T.wall[0] + i * 0.35, 659.25 + i * 70, 0.035, (i % 2 ? 0.3 : -0.3))),
    ['whoosh', T.hop[0], 0.4, 0.04], ['whoosh', T.cal - 0.4, 0.4, 0.05], ...thud(T.cal), ...shakeCues({ at: T.cal, len: 0.35 }),
    ['tick', T.circle, 0.04], ['tick', T.circle + 0.15, 0.04], ['bell', T.circle + 0.4, 1760, 0.03, 0.8, 0],
    popCue(T.yes, 1318.51, 0.05, 0.3), ['glitter', T.yes, T.yes + 0.8],
    ['whoosh', T.pis, 0.3, 0.03], ...sobCues(20.6, 4), ...sobCues(21.9, 3),
  ],
})
