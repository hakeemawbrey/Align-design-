// npye08: YOUR SIGN AT THE HOLIDAY PARTY, "Scorpio at the holiday party" (16 s vertical trial reel, music: synthwave · F#m).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Scorpio* at the | holiday party:" — the room is dimmed; Scorpio mid-glance from the corner, a
//             slit of light across its eyes.
//   2.4–5.2   1 "skips small talk: *'what scares you?'*" A guest sweats: "…um, geese?"
//   5.2       card cut.
//   5.2–8.0   2 "and actually *listens* to the answer." The goose story; Scorpio nods along: "tell me more."
//             The guest melts.
//   8.0–11.6  THE STARS: "Deep is lovely. Start with the *weather.*"
import { makeEp, R, bubble, shadow, spotlight, hearts, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

function sweat(x, t, cx, cy) { for (let i = 0; i < 2; i++) { const p = (t * 1.4 + i / 2) % 1; x.save(); x.globalAlpha = 1 - p; R(x, INK, cx + i * 40 - 2, cy + p * 50 - 2, 14, 18); R(x, '#8fe3ff', cx + i * 40, cy + p * 50, 10, 14); x.restore() } }

const EP = makeEp({
  id: 'npye08', series: 'party', sign: 'scorpio', name: 'Scorpio', room: { dim: 0.35 },
  hook(x, t, S) {
    const { hero, heroHat } = S
    x.save(); x.globalCompositeOperation = 'lighter'; R(x, 'rgba(255,220,240,0.14)', 120, 860, 560, 70); x.restore()
    shadow(x, 380, 1125, 230)
    const o = { x: 380, y: 950, s: 270, mood: 'squint', look: [Math.min(1, t * 2) * 1, 0], hops: [-0.25] }
    hero(x, t, o); heroHat(x, t, o)
    bubble(x, t, 470, 650, 1.0, 2.35, 'hello. who are you, really?', { size: 34, col: '#ffd6e2' })
  },
  hookCues: [['riser', 0.0, 1.0, 0.012], ['pop', 1.0, 739.99, 0.035, 0]],
  beats: [
    { caption: 'skips small talk: *‘what scares you?’*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        spotlight(x, 540, 380, 540, 1110, 620, 0.8, '255,190,220')
        shadow(x, 360, 1110, 220); shadow(x, 720, 1110, 170)
        const o = { x: 360, y: 950, s: 250, mood: 'squint', look: [1, 0], hops: [S.t0 + 0.3] }
        hero(x, t, o); heroHat(x, t, o)
        guest(x, t, 'gemini', { x: 720, y: 990, s: 180, mood: 'wide', look: [-1, 0], seed: 60, squash: 0.03 * Math.sin(u * 30) })
        sweat(x, t, 790, 880)
        bubble(x, t, 400, 650, S.t0 + 0.3, S.t1, 'so. what scares you?', { size: 36, col: '#ffd6e2', tail: 0.2 })
        bubble(x, t, 740, 770, S.t0 + 1.4, S.t1, '…um, geese?', { size: 32, col: '#fff3b8', tail: 0 })
      },
      cues: [['pop', 0.3, 739.99, 0.035, 0], ['tick', 0.9, 0.04], ['pop', 1.4, 1318.51, 0.035, 0.3]] },
    { caption: 'and actually *listens* to the answer.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        spotlight(x, 540, 380, 540, 1110, 620, 0.8, '255,210,230')
        shadow(x, 360, 1110, 220); shadow(x, 720, 1110, 170)
        const o = { x: 360, y: 950, s: 250, mood: u > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], hops: [0.3, 0.7, 1.1].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        guest(x, t, 'gemini', { x: 720, y: 990, s: 180, mood: u > 1.6 ? 'heart' : 'happy', look: [-1, 0], hops: [0.2, 0.5, 0.8, 1.6].map(h => S.t0 + h), seed: 60 })
        bubble(x, t, 720, 760, S.t0 + 0.1, S.t1, '…and that’s the goose story.', { size: 30, col: '#fff3b8', tail: 0 })
        bubble(x, t, 380, 640, S.t0 + 1.3, S.t1, 'tell me more.', { size: 38, col: '#ffd6e2', tail: 0.2 })
        hearts(x, t, S.t0 + 1.7, 720, 860, { n: 6 })
      },
      pis: { x: 960, y: 1180, s: 120 },
      cues: [['pop', 0.1, 1318.51, 0.03, 0.3], ['pop', 1.3, 739.99, 0.035, 0], ['pluck', 1.7, 1174.66, 0.04, 0.5, 0.3], ['pluck', 1.82, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    shadow(x, 420, 1110, 230 * ok); shadow(x, 690, 1110, 170 * ok)
    const o = { x: 420, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'gemini', { x: 690, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.8], seed: 60 })
    bubble(x, t, 430, 690, 8.6, 11.0, 'so… chilly out, huh?', { size: 30, col: '#ffd6e2' })
  },
  last: 'Deep is lovely. Start with the *weather.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog, BONE, GOLD, PINK]
