// ndbe03: DEALBREAKER OR NOT? E3, "They talk through | the *whole* movie." (13 s vertical trial reel, music: chiptune · A).
//   0.0–3.9   frame 0: ♊ Gemini mid-sentence on the couch, the TV glowing, a bubble already up: "wait who's that".
//             Bubbles pile over the screen: "ok theory:" · "is that the SAME guy??" · "I'd never go in there".
//             2.7 ♉ Taurus presses pause (❚❚); 3.0 both laugh.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    paused screen, the two chatting and laughing; 2.6 ▶ play. THE STARS: "Pause it. Chat. *Then* press play."
import { makeDeal, R, box, bubble, shadow, hearts, couch, floor, glow, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, T } from '../../ndbe01/scenes/dealkit.js'

function tv(x, t, mode, k = 1, cy = 560) {
  x.save(); x.translate(540, cy); x.scale(k, k)
  box(x, -230, -140, 460, 280, '#2a2148', { b: 8 })
  R(x, '#0d1b3a', -210, -120, 420, 240)
  if (mode === 'play') {
    // a tiny pixel scene: a door and a figure creeping toward it
    R(x, '#1e3566', -210, 40, 420, 80); box(x, 90, -70, 70, 110, '#6b4a2f', { b: 4 }); R(x, GOLD, 140, -20, 8, 8)
    const fx = -150 + ((t * 40) % 200); R(x, '#cfc8e8', fx, -10, 28, 50); R(x, '#cfc8e8', fx + 4, -32, 20, 20)
  } else {
    R(x, '#1e3566', -210, 40, 420, 80); box(x, 90, -70, 70, 110, '#6b4a2f', { b: 4 }); R(x, '#cfc8e8', -40, -10, 28, 50); R(x, '#cfc8e8', -36, -32, 20, 20)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-210, -120, 420, 240)
    if (mode === 'pause') { box(x, -46, -50, 30, 100, BONE, { b: 5 }); box(x, 16, -50, 30, 100, BONE, { b: 5 }) }
    else { x.fillStyle = INK; x.beginPath(); x.moveTo(-40, -60); x.lineTo(60, 0); x.lineTo(-40, 60); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(-32, -46); x.lineTo(44, 0); x.lineTo(-32, 46); x.fill() }
  }
  R(x, INK, -20, 140, 40, 60); box(x, -90, 200, 180, 16, '#4a3a6a', { b: 5 })
  x.restore()
}
function remote(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -16, -50, 32, 100, '#3a3060', { b: 5 }); R(x, '#e8344e', -7, -38, 14, 14); for (let i = 0; i < 3; i++) R(x, BONE, -7, -14 + i * 18, 14, 10); x.restore() }

const B = [-0.6, 0.55, 1.25, 1.95], PAUSE = 2.7, LAUGH = 3.0
const EP = makeDeal({
  id: 'ndbe03', sign: 'gemini', date: 'taurus', verdict: 'not', accent: '#ffd23a',
  hook: 'They talk through | the *whole* movie.',
  last: 'Pause it. Chat. *Then* press play.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2c2244')
    glow(x, 540, 600, 420, 0.18, '127,208,255')
    tv(x, t, u < PAUSE ? 'play' : 'pause')
    couch(x, 540, 1060, 700)
    const lg = u > LAUGH
    hero(x, t, { x: 370, y: 950, s: 240, mood: lg ? 'happy' : u < PAUSE ? 'sparkle' : 'wide', look: u < PAUSE ? [1, -1] : [1, 0], hops: [...B.filter(b => b > -0.5), LAUGH, LAUGH + 0.35] })
    date(x, t, { x: 720, y: 955, s: 230, mood: lg ? 'happy' : u > 1.5 ? 'eyeroll' : 'neutral', look: u < PAUSE ? [0, -1] : [-1, 0], hops: [PAUSE, LAUGH + 0.15, LAUGH + 0.5] })
    remote(x, 830, 1010, u > PAUSE ? -0.4 : 0.2)
    const txt = ["wait who's that", 'ok theory:', 'is that the SAME guy??', "I'd never go in there"]
    const pos = [[330, 470], [700, 420], [520, 620], [360, 760]]
    txt.forEach((s, i) => bubble(x, t, pos[i][0], pos[i][1], B[i], 3.85, s, { size: 34, tail: -0.4 }))
    if (u > LAUGH) for (const [hx, i] of [[300, 0], [790, 1]]) { const k = pop01(t, LAUGH + i * 0.1, 0.2, 3); if (k > 0.01) bubble(x, t, hx, 830, LAUGH + i * 0.1, 3.85, 'HA!', { size: 40, col: GOLD }) }
  },
  sceneCues: [...B.filter(b => b >= 0).map((b, i) => ['pop', b, [880, 987.77, 1174.66][i], 0.045, -0.3]), ['tick', PAUSE, 0.07], ['pop', PAUSE + 0.02, 440, 0.04, 0.3], ['pop', LAUGH, 1318.51, 0.04, -0.3], ['pop', LAUGH + 0.1, 1567.98, 0.04, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#2c2244')
    if (k <= 0.01) return
    const play = u > 2.6
    tv(x, t, play ? 'play' : 'pause', 0.72 * k, 640)
    couch(x, 540, 1060, 700)
    hero(x, t, { x: 400, y: 950, s: 230, pop: k, mood: 'happy', look: [1, 0], hops: [T.stamp + 0.8, T.stamp + 1.6] })
    date(x, t, { x: 690, y: 955, s: 220, pop: k, mood: play ? 'sparkle' : 'happy', look: play ? [0, -1] : [-1, 0], hops: [T.stamp + 1.2, T.stamp + 2.6] })
    bubble(x, t, 380, 760, T.stamp + 0.7, T.stamp + 2.4, 'ok, your theory?', { size: 30, tail: -0.3 })
    bubble(x, t, 700, 790, T.stamp + 1.4, T.stamp + 2.5, 'it’s the twin.', { size: 30, tail: 0.2 })
    hearts(x, t, T.stamp + 2.65, 545, 860, { n: 4 })
    void clamp
  },
  finaleCues: [['pop', 0.7, 880, 0.035, -0.3], ['pop', 1.4, 739.99, 0.035, 0.3], ['tick', 2.6, 0.06], ['pluck', 2.65, 1174.66, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, ease, outK]
