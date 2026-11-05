// kine11: IS THIS NORMAL?, "Scared to say it first" (17.6 s vertical, star_advice post, music: dreamy · Eb).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
// This time the asker IS ♓ Pisces (so Pisces cries the whole way through, of course).
//   0.00       frame 0: "Scared to say | *“I love you”* first." landed; Pisces mid-swallow, cheeks puffed, a speech
//              bubble stuck at "I L—"; ♋ Cancer, the partner, looks over, curious.
//   0.60       whip zoom onto the stuck bubble.
//   1.9–5.4    "What if they don't | say it *back?*"  A heartbeat 3-2-1 countdown… and Pisces chickens out:
//              "I LOVE… your… jacket."
//   5.55–9.3   NORMAL-O-METER: SO NORMAL.
//   9.4–15.5   THE STARS: "it's scary because it *matters.*" → "say it with no deadline on *theirs.*"  Pisces says
//              it. Cancer blushes: "I'm really glad you told me." Both happy-cry; hearts.
//  15.6–17.6   last line: "Saying it first is | brave, not *needy.*"  Then the loop back into frame 0.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, starFrame, inSprite, tearsCells, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 17.6, FLOOR = 1520
const CAN = signStar('cancer')
const T = {
  whip: 0.6, h0Out: [1.75, 1.9], h1: 1.9, h1Out: [5.2, 5.4], count: 2.5, chicken: 4.1,
  meter: 5.55, mOut: [9.15, 9.4],
  starsIn: 9.3, l1: 9.55, l2: 11.95, boxClose: 15.4, say: 12.7, glad: 13.7, both: 14.6,
  last: 15.6,
}
const COUNT = { at: T.count, from: 3, gap: 0.5, go: null, y: 980, color: PINK }

function evening(x, t) {
  room(x, { y: FLOOR, wall: '#2a1840', floor: '#36244e' })
  // a string of fairy lights
  for (let i = 0; i < 12; i++) { const lx = 60 + i * 88, ly = 520 + 30 * Math.sin(i * 0.9); R(x, INK, lx - 2, ly - 30, 4, 30); glowAt(x, lx, ly, 40, '255,214,150', 0.5 + 0.3 * Math.sin(t * 3 + i)); R(x, i % 2 ? GOLD : PINK, lx - 8, ly - 4, 16, 16) }
}
// the stuck speech bubble, big
function stuck(x, t, cx, cy, text, k, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.03 + 0.02 * Math.sin(t * 13))
  x.font = `800 84px ${INTER}`
  const w = x.measureText(text).width + 80, h = 140
  box(x, -w / 2, -h / 2, w, h, col, { b: 8 })
  R(x, INK, -40, h / 2 + 6, 26, 26); R(x, col, -34, h / 2 - 2, 16, 22)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
function partner(x, t, o, tears = 0) {
  const opts = { color: CAN.color, glyph: o.s >= 150 ? CAN.glyph : null, seed: 9, glow: 1, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (tears) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => tearsCells(x, t, tears)) }
}

const EP = makeNormal({
  id: 'kine11', D, ending: 'loop', hero: 'pisces',
  hook: { text: 'Scared to say | *“I love you”* first.', out: T.h0Out, accentColor: PINK },
  whips: [{ at: T.whip, len: 0.45, from: 1.6, cx: 420, cy: 740 }],
  fx: [[hook.countdown, hook.countdownCues, COUNT]],
  heads: [{ text: 'What if they don’t | say it *back?*', at: T.h1, out: T.h1Out, size: 96, accent: PINK, late: 1, lateAt: T.h1 + 0.6 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "it's scary because it *matters.*" },
    { t: T.l2, text: 'say it with no deadline on *theirs.*' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Saying it first is | brave, not *needy.*', at: T.last, lateAt: T.last + 0.55, accent: GOLD, size: 94 },
  punches: [T.h1, T.chicken, T.meter + 1.75, T.say],
  scene(x, t, S) {
    if (t < T.meter) {
      evening(x, t)
      shadow(x, 320, FLOOR, 360); shadow(x, 800, FLOOR, 320)
      // Pisces: mid-swallow (puffed), crying
      const puff = t < T.chicken ? 0.1 + 0.03 * Math.sin(t * 11) : 0
      S.pis(x, t, { x: 320, y: 1190, s: 420, tears: t > T.chicken ? 3 : 2, mood: t > T.chicken ? 'squint' : 'wide', look: [1, -0.2], hops: [T.chicken], blush: true })
      void puff
      partner(x, t, { x: 810, y: 1220, s: 340, mood: t > T.chicken + 0.3 ? 'happy' : 'neutral', look: [-1, -0.2], hops: [T.chicken + 0.4] })
      if (t < T.count) stuck(x, t, 420, 740, 'I L—', 1.25)
      if (t > T.chicken - 0.05) stuck(x, t, 520, 740, 'I LOVE… your… jacket.', pop01(t, T.chicken, 0.25, 2.6) * 0.72 * outK(t, [T.meter - 0.2, T.meter]))
      // heartbeat ring behind the countdown
      if (t > T.count && t < T.chicken) { const b = (t - T.count) % 0.5; glowAt(x, 540, 980, 300 + 80 * Math.exp(-b * 8), '255,120,160', 0.3 * Math.exp(-b * 5)) }
      if (t > T.chicken + 0.3) label(x, 'nice jacket.', 810, 940, { size: 30, col: BONE, alpha: pop01(t, T.chicken + 0.3, 0.25, 2) * outK(t, [T.meter - 0.2, T.meter]) })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.pis(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
      partner(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'neutral', look: [-1, -1], pop: k, hops: [land] })
    }
    if (t >= T.mOut[0]) {
      evening(x, t)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 330, FLOOR - 40, 300 * k); shadow(x, 780, FLOOR - 40, 260 * k)
      const closer = ease.inOutCubic(prog(t, T.both, T.both + 0.6))
      S.pis(x, t, { x: lerp(330, 400, closer), y: 1130, s: 330, pop: k, tears: t > T.glad ? 3 : 2, mood: t > T.glad ? 'happy' : t > T.say ? 'sparkle' : 'wide', look: [1, -0.2], hops: [T.mOut[0] + 0.2, T.say, T.glad + 0.2, T.both], blush: t > T.say })
      partner(x, t, { x: lerp(780, 700, closer), y: 1150, s: 290, pop: k, mood: t > T.glad ? 'happy' : t > T.say ? 'wide' : 'neutral', look: [-1, -0.2], hops: [T.say + 0.3, T.glad, T.both], blush: t > T.say + 0.3 }, t > T.both ? 2 : 0)
      bubble(x, t, 380, 820, T.say, T.glad + 0.6, 'I love you.', { size: 44, col: '#ffd1e0', tail: -0.3 })
      bubble(x, t, 700, 830, T.glad, D, "I'm really glad you told me.", { size: 32, col: '#c9ecfb', tail: 0.4 })
      if (t > T.say) hearts(x, t, T.say + 0.2, 380, 900, { n: 5 })
      if (t > T.both) hearts(x, t, T.both + 0.1, 550, 950, { n: 7, cell: 8 })
      S.stars(x, t, { x: 940, y: 700, s: 130, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.glad ? 'happy' : 'neutral', look: [-1, 0.4] })
    }
  },
  cues: [
    ['pop', 0.05, 587.33, 0.03, -0.3], ['pop', 0.2, 587.33, 0.025, -0.3],
    ['tom', T.count + 0.25, 70, { gain: 0.2, decay: 0.2 }], ['tom', T.count + 0.75, 70, { gain: 0.2, decay: 0.2 }], ['tom', T.count + 1.25, 70, { gain: 0.22, decay: 0.2 }],
    ['pop', T.chicken, 440, 0.05, -0.3], ['pop', T.chicken + 0.25, 392, 0.04, -0.3], ['pluck', T.chicken + 0.5, 330, 0.04, 0.5, -0.3],
    ['pop', T.say, 1318.51, 0.045, -0.3], ['pluck', T.say + 0.15, 1567.98, 0.04, 0.6, -0.3],
    ['pop', T.glad, 1174.66, 0.045, 0.3], ['bell', T.both, 1760, 0.03, 1.2, 0], ['glitter', T.both, T.both + 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, MINT, CYAN, MONO, drawBits, sparkles, clamp]
