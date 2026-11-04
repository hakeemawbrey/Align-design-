// ngfe01: 24 DAYS OF GREEN FLAGS, door 1: "Says sorry without a 'but'." (18 s vertical, dreamy · C)
//   0.0–2.35  hook "An apology with | *no fine print.*" — the calendar, door 1 glows, ♈ Aries mid-hop at it.
//   2.35–8.8  Behind the door: a quiet living room. Aries to Cancer (turned away): "I'm sorry I snapped earlier."
//             A red "BUT…" bubble starts to grow behind Aries; Aries spots it and swats it off-screen.
//             Aries: "that's it. that's the whole apology." Cancer turns: "…oh." Heart eyes.
//   8.8 card cut · 9.35 the flag plants · THE STARS: "Sorry. *Full stop.*"
import { makeDoor, room, windowFrame, bubble, hearts, sparkles, shadow, label, R, INK, BONE, RED, INTER, prog, ease, lerp, clamp, pop01, outK } from './advent.js'

function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2b2252', wall2: '#33295f', floor: '#4b3262' })
  windowFrame(x, t, 380, 330, 320, 300)
  // a rug
  R(x, INK, 150, 1196, 780, 44); R(x, '#8a3a5a', 158, 1200, 764, 34); R(x, '#b0527a', 158, 1212, 764, 8)
  shadow(x, 320, 1160, 260); shadow(x, 770, 1160, 260)
  // the BUT… bubble: grows behind Aries, gets swatted away
  const grow = ease.outCubic(prog(u, 1.55, 2.5)), swat = ease.inCubic(prog(u, 2.75, 3.15))
  if (u > 1.55 && swat < 1) {
    x.save(); x.translate(lerp(200, -320, swat), lerp(560, 300, swat)); x.rotate(-swat * 2.2 + 0.05 * Math.sin(t * 9)); x.scale(lerp(0.3, 1, grow), lerp(0.3, 1, grow))
    R(x, INK, -150, -62, 300, 124); R(x, '#ffb3bf', -144, -56, 288, 112)
    x.font = `800 64px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUT…', 0, 4)
    R(x, INK, 70, 62, 16, 16); R(x, INK, 96, 84, 10, 10)
    x.restore()
  }
  if (u > 2.75 && u < 3.4) label(x, 'SWAT!', 250, 520, { size: 52, col: '#ffd23a', font: INTER, weight: 800, rot: -0.2, alpha: 1 - prog(u, 3.1, 3.4) })
  sparkles(x, t, 200, 560, S.t0 + 2.8, 8, 90, 1, [RED, BONE, '#ffd23a'])
  // Aries
  const hm = u > 2.4 && u < 2.75 ? 'wide' : u > 4.6 ? 'happy' : 'neutral'
  const hl = u > 2.35 && u < 2.85 ? [-1, -1] : [1, 0]
  hero(x, t, { x: 320, y: 990, s: 290, mood: hm, look: hl, hops: [S.t0 + 0.55, S.t0 + 2.75, S.t0 + 3.4, S.t0 + 5.0], squash: u > 0.4 && u < 1.5 ? 0.05 : 0 })
  // Cancer: turned away, then turns back and melts
  const cm = u < 4.0 ? 'squint' : u < 4.5 ? 'wide' : 'heart'
  mate(x, t, { x: 770, y: 990, s: 290, mood: cm, look: u < 4.0 ? [1, -0.3] : [-1, 0], hops: [S.t0 + 4.0, S.t0 + 4.55] })
  hearts(x, t, S.t0 + 4.6, 760, 820, { n: 6 })
  bubble(x, t, 380, 690, S.t0 + 0.5, S.t0 + 2.65, "I'm sorry I\nsnapped earlier.", { size: 46, tail: -0.2 })
  bubble(x, t, 400, 660, S.t0 + 3.35, S.t1 - 0.2, "that's it. that's\nthe whole apology.", { size: 44, tail: -0.25 })
  bubble(x, t, 780, 760, S.t0 + 4.2, S.t1 - 0.2, '…oh.', { size: 46, tail: 0.1, col: '#ffe0c2' })
  void clamp; void pop01; void outK
}

const EP = makeDoor({
  day: 1, hero: 'aries', mate: 'cancer',
  hook: 'An apology with | *no fine print.*',
  flag: 'says sorry *without a “but.”*',
  scene,
  cues: [['pop', 0.5, 880, 0.035, -0.3], ['riser', 1.55, 2.5, 0.02], ['pop', 2.4, 1318.51, 0.035, -0.2],
    ['clap', 2.75, { gain: 0.14, pan: -0.4 }], ['whoosh', 2.78, 0.35, 0.04], ['pop', 3.35, 987.77, 0.035, -0.3],
    ['pop', 4.0, 659.25, 0.03, 0.3], ['pluck', 4.55, 1174.66, 0.04, 0.5, 0.3], ['pluck', 4.67, 1567.98, 0.035, 0.5, 0.3]],
  last: 'Sorry. *Full stop.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
