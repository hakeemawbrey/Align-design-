// npye01: YOUR SIGN AT THE HOLIDAY PARTY, "Aries at the holiday party" (16 s vertical trial reel, music: house · F).
// Story 0–11.6, then the shared end card. The format look lives in ./kit.js (shared by npye01–12 and ngie01–12).
//   0.0–2.4   hook "*Aries* at the | holiday party:" — Aries is mid-leap through the doorway at frame 0, hat flying;
//             lands, the hat drops back on: "I'm here!!"
//   2.4–5.2   1 "arrives *first.* sets up the chairs." The clock says 6:58, the sign says PARTY AT 8. Aries hops in
//             under a stack of folding chairs: "where do these go?!"
//   5.2       card cut.
//   5.2–8.0   2 "starts the *dance floor* so nobody goes first." Aries dances alone on the lit tiles; two shy guests
//             watch… then hop in.
//   8.0–11.6  THE STARS: "Say hi first. Then *listen* just as hard." Aries waves, a guest beside it, Pisces fountains.
import { makeEp, R, box, bubble, card, shadow, sparkles, confetti, hearts, clock, drawBits, hatCells, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, MINT, RED } from './kit.js'

function door(x, t, k = 1) {
  const X = 650, Y = 560, W = 300, H = 590
  R(x, INK, X - 16, Y - 16, W + 32, H + 16)
  const g = x.createLinearGradient(0, Y, 0, Y + H); g.addColorStop(0, '#1a2a52'); g.addColorStop(1, '#3a4f80')
  x.fillStyle = g; x.fillRect(X, Y, W, H)
  for (let i = 0; i < 18; i++) { const px = X + ((i * 71) % W), py = Y + (((i * 53) % H) + t * 90) % H; R(x, '#ffffff', px, py, 6, 6) }
  R(x, '#e6eef9', X, Y + H - 60, W, 60)
  // the door itself, swung open
  x.save(); x.translate(X + W, Y); x.scale(lerp(0.25, 0.25, k), 1)
  box(x, 0, 0, W, H, '#8a3a3a', { b: 8 }); R(x, '#a64a4a', 30, 30, W - 60, H * 0.4); R(x, '#a64a4a', 30, H * 0.5, W - 60, H * 0.42)
  x.restore()
}
function chair(x, cx, cy, s, col = '#c9c2dc') {
  box(x, cx - 40 * s, cy - 90 * s, 80 * s, 70 * s, col, { b: 5 })
  box(x, cx - 46 * s, cy - 16 * s, 92 * s, 16 * s, col, { b: 5 })
  R(x, INK, cx - 44 * s, cy, 10 * s, 70 * s); R(x, INK, cx + 34 * s, cy, 10 * s, 70 * s)
}
function flyingHat(x, t, cx, cy, rot) {
  drawBits(x, ['....B....', '...PPP...', '...GGG...', '..PPPPP..', '..GGGGG..', '.PPPPPPP.'], { B: BONE, P: PINK, G: GOLD }, cx, cy, 11, { rot })
}

const EP = makeEp({
  id: 'npye01', series: 'party', sign: 'aries', name: 'Aries',
  hook(x, t, S) {
    const { hero } = S
    door(x, t)
    // mid-leap at frame 0: from the doorway to centre
    const p = ease.outCubic(clamp(t / 0.55))
    const X = lerp(760, 520, p), arc = Math.sin(Math.PI * clamp(0.55 + t / 1.1)) * 120 * (1 - p)
    shadow(x, X, 1125, 240 * (0.6 + 0.4 * p))
    const o = { x: X, y: 960 - arc, s: 280, mood: t < 0.6 ? 'wide' : 'happy', look: [-1, 0], hops: [0.55, 1.25], squash: t < 0.5 ? -0.08 : 0 }
    hero(x, t, o)
    // the hat: flying up off the head, then dropping back on at 1.1
    const hp = clamp(t / 1.1)
    if (t < 1.1) flyingHat(x, t, X + lerp(60, 0, hp), 760 - Math.sin(Math.PI * hp) * 160 - arc + hp * 40, 0.8 * (1 - hp) + t * 5 * (1 - hp))
    else S.dress(x, t, o, () => hatCells(x, PINK, GOLD, 0.15))
    sparkles(x, t, 540, 900, 1.12, 8, 200, 1, [GOLD, BONE, '#f0603a'])
    bubble(x, t, 520, 640, 1.2, 2.35, 'I’m here!!', { size: 40, tail: 0.1 })
  },
  hookCues: [['whoosh', 0.02, 0.3, 0.03], ['tom', 0.55, 110, { gain: 0.16, decay: 0.18 }], ['pop', 1.12, 1318.51, 0.04, 0], ['pop', 1.22, 880, 0.03, 0]],
  beats: [
    { caption: 'arrives *first.* sets up the chairs.',
      draw(x, t, S) {
        const { u, hero, heroHat } = S
        clock(x, 600, 600, 62, 6, 58 + Math.min(1, u * 0.4))
        card(x, 860, 860, 250, 120, ['PARTY', 'AT 8:00'], { size: 34, rot: 0.05 })
        const X = lerp(-150, 520, ease.outCubic(prog(u, 0, 0.7)))
        shadow(x, X, 1125, 240)
        const o = { x: X, y: 960, s: 260, mood: u < 1.2 ? 'happy' : 'wide', look: u < 1.2 ? [1, 0] : [0, -1], hops: [0.1, 0.35, 0.6, 0.85].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        const wob = Math.sin(u * 8) * 0.06
        x.save(); x.translate(X, 760); x.rotate(wob)
        for (let i = 0; i < 4; i++) chair(x, 0, -i * 50, 1, ['#c9c2dc', '#b6aed0', '#c9c2dc', '#b6aed0'][i])
        x.restore()
        bubble(x, t, 600, 470, S.t0 + 1.0, S.t1, 'where do these go?!', { size: 36, tail: -0.4 })
      },
      cues: [['tick', 0.1, 0.04], ['tick', 0.35, 0.04], ['tick', 0.6, 0.04], ['pop', 1.0, 880, 0.035, 0]] },
    { caption: 'starts the *dance floor* so nobody goes first.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        // the lit tiles
        const cols = [PINK, GOLD, '#7fd0ff', MINT]
        for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) {
          const on = Math.floor(u * 3 + i + j * 2) % 4
          x.save(); x.globalAlpha = 0.5; R(x, cols[on], 240 + i * 100, 1110 + j * 46, 92, 40); x.restore()
        }
        const beat = [0, 0.38, 0.76, 1.14, 1.52, 1.9, 2.28, 2.66].map(h => S.t0 + h)
        const o = { x: 540, y: 950, s: 260, mood: 'happy', look: [Math.sin(u * 5) > 0 ? 1 : -1, 0], hops: beat, squash: 0.05 * Math.sin(u * 16) }
        shadow(x, 540, 1120, 230); hero(x, t, o); heroHat(x, t, o)
        // two shy guests at the edges, then they hop in
        const join = ease.outCubic(prog(u, 1.3, 1.8))
        for (const [id, sx, ex, d] of [['taurus', 120, 300, 1], ['libra', 960, 780, -1]]) {
          const gx = lerp(sx, ex, join)
          const go = { x: gx, y: 1010, s: 160, mood: u < 1.3 ? 'neutral' : 'happy', look: u < 1.3 ? [d, 0] : [0, 0], hops: u > 1.3 ? beat.slice(4) : [], seed: d > 0 ? 8 : 9 }
          guest(x, t, id, go); dress(x, t, go, () => hatCells(x, d > 0 ? MINT : GOLD, BONE, -0.1 * d))
        }
        confetti(x, t, S.t0 + 1.8, 540, 700)
        bubble(x, t, 540, 560, S.t0 + 1.85, S.t1, 'okay okay we’re in!', { size: 34, col: '#ffe1ea' })
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['clap', 0.38, { gain: 0.08 }], ['clap', 1.14, { gain: 0.08 }], ['pop', 1.3, 1318.51, 0.04, 0], ['glitter', 1.8, 2.3], ['pop', 1.85, 987.77, 0.035, 0]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, dress, ok, HOPS } = S
    shadow(x, 430, 1110, 230 * ok); shadow(x, 700, 1110, 170 * ok)
    const o = { x: 430, y: 900, s: 270, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    const g = { x: 700, y: 960, s: 180, pop: ok, mood: t > 9.2 ? 'happy' : 'neutral', look: [-1, 0], hops: [8.6, 9.6], seed: 8 }
    guest(x, t, 'taurus', g); dress(x, t, g, () => hatCells(x, MINT, BONE, -0.1))
    bubble(x, t, 700, 720, 8.6, 11.0, 'hi! I’m new.', { size: 30, col: '#ffe1ea' })
  },
  last: 'Say hi first. Then *listen* just as hard.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hearts, outK, pop01, RED]
