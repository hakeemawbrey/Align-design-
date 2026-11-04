// nt2e69: PLOT TWIST, "Plot Twist: still typing" (18 s vertical, Star Talk Trends Vol. 2 ep 69, promo/films/next30/b14.md;
// music: cinematic · Fm). Story 0–15.6, then the shared short end card. Format: ../../nt2e66/scenes/twist.js.
//   0.0–2.1    hook (frame 0, cold blue): "They’ve been typing for *ages.*"  Aries tapping a foot over a phone, the dots going.
//   2.1–4.85   BEAT 1 "the dots: on. off. *on.*"  The typing dots blink in and out; Aries hops each time.
//   4.85–7.6   BEAT 2 "you picture an *essay.*"  Aries paces a groove into the rug; the thought cloud: "PART 1 OF 12".
//   7.6        PLOT TWIST slam.
//   8.75–11.35 BEAT 3 (warm) "they wanted to hear your *voice.*"  The text: "can i call you instead? i want to hear how
//              you say it." The phone rings; Aries answers mid-hop: "hi!!"
//   11.95      THE STARS: "Some things don’t *fit* in a text."  Pisces, sobbing happily: "aww."
import { makeTwist, drawStage, chatPhone, thought, rug, sfx, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, T } from '../../nt2e66/scenes/twist.js'

const FLOOR = 1180
function room(x, t, warm) { drawStage(x, t, { warm, wall: '#2a2a52', floor: '#38385e' }); rug(x, 540, FLOOR + 90, 780, warm ? '#c85a6e' : '#4a4f7a') }

function beat1(x, t, S) {
  const { u, hero } = S
  room(x, t, 0)
  const on = [[0.2, 0.7], [1.2, 1.6], [2.1, 9]].some(([a, b]) => u >= a && u < b)
  chatPhone(x, t, 720, 860, [], { s: 1.1, rot: 0.04, name: 'SCORPIO', typing: on })
  hero(x, t, { x: 290, y: 1010, s: 230, mood: on ? 'wide' : 'squint', look: [1, -0.4], hops: [S.t0 + 0.2, S.t0 + 1.2, S.t0 + 2.1] })
  for (const [at, w] of [[0.2, 'on.'], [0.7, 'off.'], [1.2, 'on.'], [1.6, 'off.'], [2.1, 'ON.']]) sfx(x, t, w, 300, 760, S.t0 + at, { size: 46, col: BONE, life: 0.35 })
}

function beat2(x, t, S) {
  const { u, hero } = S
  room(x, t, 0)
  // the groove: a darker oval track growing on the rug
  x.save(); x.globalAlpha = 0.5 * clamp(u / 2); x.strokeStyle = '#1a1838'; x.lineWidth = 18; x.beginPath(); x.ellipse(540, FLOOR + 90, 300, 40, 0, 0, Math.PI * 2); x.stroke(); x.restore()
  const px = 540 + 300 * Math.sin(u * 3.2)
  hero(x, t, { x: px, y: 1050, s: 200, mood: 'squint', look: [Math.cos(u * 3.2) > 0 ? 1 : -1, 0], hops: Array.from({ length: 10 }, (_, i) => S.t0 + 0.1 + i * 0.28) })
  const k = pop01(t, S.t0 + 0.6, 0.3, 2.2)
  if (k > 0.01) {
    thought(x, t, 540, 640, 'PART 1 OF 12', S.t0 + 0.6, S.t1, { size: 44 })
    x.save(); x.translate(540, 830); x.scale(k, k)
    box(x, -150, -40, 300, 120, BONE, { b: 5 }); for (let i = 0; i < 5; i++) R(x, 'rgba(27,18,54,0.35)', -126, -24 + i * 20, 252 - (i === 4 ? 100 : 0), 8)
    x.restore()
  }
}

function beat3(x, t, S) {
  const { u, hero } = S
  room(x, t, 1)
  const call = ease.outCubic(prog(u, 2.6, 2.8))
  chatPhone(x, t, 700, 800, [{ text: 'can i call you\ninstead? i want\nto hear how you\nsay it.', at: S.t0 + 1.2, size: 28 }], { s: 1.15, rot: 0.03, name: 'SCORPIO', call })
  if (call > 0.5) for (let i = 0; i < 3; i++) { const ph = (t * 1.6 + i / 3) % 1; x.save(); x.globalAlpha = 1 - ph; x.strokeStyle = '#9fe6b0'; x.lineWidth = 6; x.beginPath(); x.arc(700, 800, 220 + ph * 160, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(700, 800, 220 + ph * 160, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore() }
  hero(x, t, { x: 280, y: 1010, s: 230, mood: u > 2.85 ? 'sparkle' : 'wide', look: [1, -0.4], hops: [S.t0 + 1.3, S.t0 + 2.85, S.t0 + 3.15] })
  bubble(x, t, 280, 760, S.t0 + 2.9, S.t1, 'hi!!', { size: 48, tail: 0 })
  sfx(x, t, 'ring!', 920, 460, S.t0 + 2.65, { size: 44, col: '#9fe6b0', rot: 0.15, life: 0.7 })
}

const EP = makeTwist({
  id: 'nt2e69', sign: 'aries', name: 'Aries', date: 'scorpio', deep: '#c0392b', accent: '#7fd0ff',
  hookText: 'They’ve been typing for *ages.*',
  room,
  hook(x, t, S) {
    room(x, t, 0)
    chatPhone(x, t, 720, 860, [], { s: 1.1, rot: 0.04, name: 'SCORPIO', typing: true })
    S.hero(x, t, { x: 300, y: 1000, s: 260, mood: 'squint', look: [1, -0.4], hops: [0.15, 0.45, 0.75, 1.05, 1.35, 1.65, 1.95] })
    for (let i = 0; i < 6; i++) sfx(x, t, 'tap', 210 + (i % 2) * 30, 1160, 0.15 + i * 0.3, { size: 30, col: BONE, life: 0.2 })
  },
  hookCues: Array.from({ length: 6 }, (_, i) => ['tick', 0.15 + i * 0.3, 0.05]),
  tells: [
    { caption: 'the dots: on. off. *on.*', draw: beat1, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.2, 880, 0.03, 0.3], ['pop', 0.7, 659.25, 0.025, 0.3], ['pop', 1.2, 880, 0.03, 0.3], ['pop', 1.6, 659.25, 0.025, 0.3], ['pop', 2.1, 987.77, 0.04, 0.3]] },
    { caption: 'you picture an *essay.*', draw: beat2, pis: { x: 960, y: 1660 },
      cues: Array.from({ length: 9 }, (_, i) => ['tick', 0.1 + i * 0.28, 0.03]).concat([['pop', 0.6, 622.25, 0.04, 0]]) },
    { caption: 'they wanted to hear your *voice.*', draw: beat3, pis: { x: 960, y: 1660 },
      cues: [['pop', 1.2, 987.77, 0.04, 0.3], ['bell', 2.65, 1318.51, 0.04, 0.4, 0.3], ['bell', 2.8, 1567.98, 0.04, 0.4, 0.3], ['bell', 2.95, 1318.51, 0.035, 0.4, 0.3], ['pop', 2.9, 1760, 0.04, -0.3], ['glitter', 2.9, 3.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: 'sparkle', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: 'happy', look: [-1, 0], blush: 1, hops: [T.stamp + 0.1, T.last + 1.7] })
    hearts(x, t, T.stamp + 0.3, 550, 760, { n: 4 })
  },
  last: 'Some things don’t *fit* in a text.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, lerp, sparkles, label, GOLD, RED, MONO, INTER]
