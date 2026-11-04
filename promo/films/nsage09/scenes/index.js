// nsage09: SAG SEASON TAKEOVER, ep 9, "The Honest Toast" (23 s vertical, music: jazzy · F). promo/films/next30/b10.md.
// Story 0–20.6, then the short (2.4 s) end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Never hand Sag | the *microphone.*"  Frame 0: Sag mid-grab of the mic, a mug of cocoa raised.
//   2.6–7.6    "Toast one: | *Aries.*"  SAG: "Aries, you are SO loud."  Gasps.  SAG: "…and you showed up for every
//              one of us."  Aries tears up.
//   7.6–12.1   "Toast two: | *Virgo.*"  SAG: "Virgo, you corrected my toast."  …  "honestly? you wrote half of it."
//              Virgo blushes.
//  12.1–16.1   "*Everybody,* | mugs up."  Every mug goes up; Pisces fountains front and centre.
//  16.1–20.6   SAG: "Roast *nobody.* Toast everybody."
import { makeTakeover, R, box, floor, shadow, glow, sparkles, hearts, confetti, mug, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

function lights(x, t, y = 330) {
  for (let i = 0; i < 13; i++) {
    const X = 40 + i * 83, Y = y + 26 * Math.sin((i / 12) * Math.PI)
    if (i < 12) { x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + 83, y + 26 * Math.sin(((i + 1) / 12) * Math.PI)); x.stroke() }
    glow(x, X, Y + 16, 40, Math.sin(t * 4 + i * 1.7) > -0.3 ? 0.35 : 0.1)
    R(x, INK, X - 9, Y + 4, 18, 24); R(x, [RED, GOLD, '#5fb8ff', '#9fe6b0'][i % 4], X - 6, Y + 7, 12, 18)
  }
}
function mic(x, cx, cy, rot = 0.3) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -10, 0, 20, 90, '#3a3550', { b: 5 })
  box(x, -24, -46, 48, 46, '#c9c3dd', { b: 6 })
  for (let i = 0; i < 3; i++) R(x, '#8a85a0', -18, -38 + i * 12, 36, 4)
  x.restore()
}
const SAGP = { x: 300, y: 980, s: 260 }
function stage(x, t) { floor(x, 1260, '#3a2458', '#4a2f6a'); lights(x, t); box(x, 120, 1150, 420, 40, '#6b4630', { b: 6 }) }

const EP = makeTakeover({
  id: 'nsage09', host: 'sag', duration: 25, dy: 120,
  hook: {
    text: 'Never hand Sag | the *microphone.*', dur: 2.6,
    draw(x, t, S) {
      stage(x, t)
      const g = ease.outBack ? ease.outCubic(clamp(prog(t, -0.1, 0.5))) : 1
      S.host(x, t, { ...SAGP, mood: 'sparkle', look: [1, -1], squash: -0.06, hops: [0.5, 1.4] })
      mic(x, lerp(520, 440, g), lerp(820, 860, g), 0.4)
      mug(x, 150, 820, 1.2, '#e86a5a', 1, t)
      S.star(x, t, 'aries', { x: 720, y: 1180, s: 160, mood: 'wide', look: [-1, -1] })
      S.star(x, t, 'virgo', { x: 900, y: 1190, s: 150, mood: 'wide', look: [-1, -1] })
    },
    cues: [['whoosh', 0, 0.4, 0.04], ['tick', 0.4, 0.07]],
  },
  beats: [
    { dur: 5.0, head: 'Toast one: | *Aries.*', accent: '#ff7a5a',
      draw(x, t, S) {
        const { u } = S
        stage(x, t)
        S.host(x, t, { ...SAGP, mood: u < 2.3 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 2.4, S.t0 + 2.9] })
        mic(x, 440, 860, 0.4)
        const am = u < 1.4 ? 'happy' : u < 2.4 ? 'wide' : 'sparkle'
        S.star(x, t, 'aries', { x: 760, y: 1110, s: 240, mood: am, look: [-1, -0.5], squash: u > 1.4 && u < 1.7 ? -0.12 : 0, tears: u > 3.0 ? 2 : 0, hops: [S.t0 + 1.4, S.t0 + 3.0] })
      },
      says: [
        { at: 0.4, until: 2.3, text: 'Aries, you are SO loud.', x: 340, y: 700, who: 'host', tail: -0.2 },
        { at: 2.4, text: '…and you showed up for every one of us.', x: 400, y: 700, who: 'host', tail: -0.3, maxW: 560 },
      ],
      pis: { x: 950, y: 1690, s: 120 },
      cues: [['whoosh', 1.4, 0.2, 0.04], ['pluck', 1.42, 440, 0.04, 0.4, 0.3], ['pluck', 3.0, 1174.66, 0.04, 0.6, 0.3]],
    },
    { dur: 4.5, head: 'Toast two: | *Virgo.*', accent: '#8fd18a',
      draw(x, t, S) {
        const { u } = S
        stage(x, t)
        S.host(x, t, { ...SAGP, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 0.7, S.t0 + 2.1] })
        mic(x, 440, 860, 0.4)
        S.star(x, t, 'virgo', { x: 760, y: 1110, s: 240, mood: u < 2.1 ? 'squint' : 'sparkle', look: [-1, -0.5], blush: u > 2.1 ? 1 : 0, hops: [S.t0 + 2.2] })
      },
      says: [
        { at: 0.3, until: 2.0, text: 'Virgo, you corrected my toast.', x: 360, y: 700, who: 'host', tail: -0.2 },
        { at: 2.05, text: 'honestly? you wrote half of it.', x: 380, y: 700, who: 'host', tail: -0.2 },
      ],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['pluck', 2.2, 1318.51, 0.04, 0.6, 0.3]],
    },
    { dur: 4.0, head: '*Everybody,* | mugs up.', pis: false,
      draw(x, t, S) {
        const { u } = S
        stage(x, t)
        const up = ease.outBack ? ease.outCubic(prog(u, 0.6, 1.0)) : 1
        const CAST = [['aries', 150, 1150], ['virgo', 330, 1170], ['leo', 750, 1170], ['gemini', 930, 1150]]
        CAST.forEach(([id, cx, cy], i) => { S.star(x, t, id, { x: cx, y: cy, s: 150, mood: 'happy', look: [0, -1], hops: [S.t0 + 0.6 + i * 0.05] }); mug(x, cx + 70, cy - 60 - 120 * up, 0.9, [RED, '#5fb8ff', GOLD, '#9fe6b0'][i]) })
        S.host(x, t, { x: 540, y: 820, s: 200, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.6] })
        mug(x, 650, 760 - 100 * up, 1, '#e86a5a')
        S.pisces(x, t, { x: 540, y: 1130, s: 230, hops: [S.t0 + 0.65, S.t0 + 1.8] }, 3, 'happy', [0, 0])
        sparkles(x, t, 540, 700, S.t0 + 1.0, 12, 260, 1)
        confetti(x, t, S.t0 + 1.0, 540, 600)
      },
      cues: [['whoosh', 0.6, 0.35, 0.04], ['bell', 1.0, 1760, 0.035, 1.2, 0], ['glitter', 1.0, 1.6], ['pop', 1.0, 1318.51, 0.04, -0.3], ['pop', 1.05, 1567.98, 0.04, 0.3]],
    },
  ],
  last: { who: 'host', text: 'Roast *nobody.* Toast everybody.' },
  finale(x, t, S) {
    const { ok } = S
    lights(x, t, 560)
    shadow(x, 540, 1120, 260 * ok)
    S.host(x, t, { x: 540, y: 920, s: 290, pop: ok, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    mug(x, 760, 820, 1.2 * ok, '#e86a5a', 1, t)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hearts, BONE]
