// kare12 — THE ALMOST RELATIONSHIP, Ep 12: "Was that a date?" (16 s vertical, star_advice; chiptune · G; loop).
//   0.0–2.5   Leo mid-squint at a giant phone ("wanna grab food?" from Taurus) under the kit's game HUD (DECODING…),
//             a decoder wheel spinning: DATE? · FOOD? · BOTH?  Hook "'Wanna grab food?' | Date or *not?*"
//   2.5–8.0   clue splits pop on the HUD: "just us" · picked the cute place · asked what I like. The wheel lands on BOTH?
//   8.0–10.6  QUEST FAILED: CLARITY. Pisces, at the HUD, sobbing: "so close!!"
//  10.6–16.0  THE STARS: "You can just *ask.*" · "Ask *'as a date?'* Clarity is cute."  14.1 Leo sends "as a date?" →
//             "yes!! i was hoping" (14.9). The last 0.45 s blend back into frame 0.
import { makeAlmost, drawApartment, star, stars, say, sparkles, bigPhone, prog, ease, pop01, R, box, INK, BONE, GOLD, PINK, MINT, CYAN, INTER } from '../../kare01/scenes/almostkit.js'

const D = 16
const T = { clues: [2.6, 4.2, 5.8], land: 7.0, fail: 8.0, pis: 8.3, close: 8.7, stars: 10.6, l1: 11.0, l2: 12.3, send: 14.1, yes: 14.8 }
const OPTS = [['DATE?', PINK], ['FOOD?', GOLD], ['BOTH?', MINT], ['DATE?', CYAN], ['FOOD?', GOLD], ['BOTH?', PINK]]

function wheel(x, t, cx, cy, r) {
  // spins fast, eases to land on a BOTH? segment at T.land
  const p = ease.outCubic(prog(t, -1.2, T.land)), ang = -(Math.PI * 2 * 6 * p) - Math.PI / 3 * 2 - Math.PI / 6
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  OPTS.forEach(([s, c], i) => {
    const a0 = ang + i * Math.PI / 3, a1 = a0 + Math.PI / 3
    x.fillStyle = c; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, a0, a1); x.closePath(); x.fill()
    x.save(); x.rotate((a0 + a1) / 2); x.font = `800 ${Math.round(r * 0.2)}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, r * 0.6, 0); x.restore()
  })
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.14, 0, Math.PI * 2); x.fill()
  x.restore()
  // pointer
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx + r + 34, cy - 26); x.lineTo(cx + r - 14, cy); x.lineTo(cx + r + 34, cy + 26); x.fill()
  x.fillStyle = RED2; x.beginPath(); x.moveTo(cx + r + 26, cy - 16); x.lineTo(cx + r - 4, cy); x.lineTo(cx + r + 26, cy + 16); x.fill()
}
const RED2 = '#e8344e'
const MSGS = [{ at: -2, side: 'L', text: 'wanna grab food? just us :)' }, { at: T.send, side: 'R', text: 'as a date?' }, { at: T.yes, side: 'L', text: 'yes!! i was hoping' }]

const shots = [
  { a: 0, b: T.stars, draw(x, t) {
    drawApartment(x, t, { lamp: 0.9 })
    R(x, 'rgba(10,6,30,0.35)', 0, 0, 1080, 1920)
    bigPhone(x, t, 330, 980, { w: 380, h: 600, k: 1.15, title: 'taurus', msgs: MSGS.slice(0, 1), rot: -0.05 })
    wheel(x, t, 760, 1000, 200)
    const failed = t > T.fail
    star(x, 'leo', 560, 1460, 300, t, { mood: failed ? 'wide' : 'squint', look: [-0.6, -0.8], hops: [...T.clues, T.land] })
    if (t > T.pis) {
      const pk = pop01(t, T.pis, 0.35, 2.2)
      star(x, 'pisces', 870, 1500 + (1 - pk) * 400, 220, t, { tears: 3, mood: 'wide', look: [-0.4, -1], hops: [T.close, T.close + 0.5] })
      say(x, t, 820, 1290, T.close, T.stars, 'so close!!', { size: 38 })
    }
    sparkles(x, t, 760, 1000, T.land, 12, 240, 3)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawApartment(x, t, { lamp: 0.9 })
    bigPhone(x, t, 380, 980, { w: 380, h: 600, k: 1.15, title: 'taurus', msgs: MSGS, rot: -0.03 })
    const yes = t > T.yes
    star(x, 'leo', 780, 1180, 270, t, { mood: yes ? 'sparkle' : 'neutral', look: [-1, -0.2], hops: [T.send, T.yes + 0.1, T.yes + 0.5] })
    star(x, 'pisces', 900, 1480, 140, t, { tears: 2, mood: 'sparkle', look: [-1, -0.4], box: false })
    stars(x, 760, 600, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.4 ? 'happy' : 'neutral', look: [-0.6, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  const hit = [T.fail, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1 + 0.1 * k, dx: 40 * k }
}
const HUD = { at: -1, out: [T.stars - 0.3, T.stars], title: 'DECODING…', start: -1.4, splits: [{ at: T.clues[0], name: '“just us”' }, { at: T.clues[1], name: 'cute place' }, { at: T.clues[2], name: 'asked my faves' }], color: MINT }
const E = makeAlmost({
  id: 'kare12', duration: D, ending: 'loop',
  hook: '‘Wanna grab food?’ | Date or *not?*', hookOut: [2.3, 2.5], hookTop: 1630, hookSize: 96, hookPlate: [1600, 1900],
  shots, cam,
  fx: [
    ['gameHud', HUD],
    ['achievement', { at: T.fail, out: [T.stars - 0.4, T.stars - 0.1], title: 'QUEST FAILED', text: 'clarity: *not found*', icon: '?', y: 380 }],
    ['screenShake', { at: T.fail, len: 0.4, amp: 16 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'You can just *ask.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'Ask *‘as a date?’* Clarity is cute.' },
  ],
  box: { close: D - 0.5 },
  cues: [['chip', T.land, 1567.98, 0.25, { gain: 0.03 }], ['pop', T.close, 1318.51, 0.035, 0.4], ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0],
    ['pop', T.send, 880, 0.035, -0.3], ['pluck', T.yes, 1174.66, 0.04, 0.5, -0.3], ['pluck', T.yes + 0.12, 1567.98, 0.035, 0.5, -0.3]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [box, BONE]
