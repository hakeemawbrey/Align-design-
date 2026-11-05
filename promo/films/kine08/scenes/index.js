// kine08: IS THIS NORMAL?, "One great date, one whole day alone" (17.9 s vertical, star_advice post, music: dreamy · F).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Great date. | Now I need a *week.*" landed; ♒ Aquarius mid-flop onto the couch; a social battery
//              blinks red at 1%.
//   0.60       notification drop: "had fun!! again soon?" Punch.
//   1.9–5.7    "Had fun. | Now: *hibernate.*"  A loading bar: "recharging…" crawls to 3%. ♓ Pisces, wrapped in the
//              same blanket on the couch arm, cries: "me too".
//   5.85–9.6   NORMAL-O-METER: SO NORMAL.
//   9.7–16.0   THE STARS: "some people refuel *alone* after a good time." → "tell them: 'I had fun. I'm a *slow
//              recharger.*'"  The battery fills; Aquarius sends it; the reply: "same honestly. saturday?"
//  16.1–17.9   last line: "Recharging is not | losing *interest.*"  Then the loop back into frame 0.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar,
} from '../../kine01/normalkit.js'

const D = 17.9, FLOOR = 1540
const LIB = signStar('libra')
const T = {
  notif: 0.6, h0Out: [1.75, 1.9], h1: 1.9, h1Out: [5.5, 5.7], load: 2.6, pisIn: 2.2,
  meter: 5.85, mOut: [9.45, 9.7],
  starsIn: 9.6, l1: 9.85, l2: 12.9, boxClose: 16.0, fill: [9.9, 14.2], send: 14.4, reply: 15.1,
  last: 16.1,
}
const NOTIF = { at: T.notif, out: [1.75, 1.95], title: 'texts', body: 'had fun!! again *soon?*', glyph: LIB.glyph, color: LIB.color, y: 620 }
const LOAD = { at: T.load, len: 2.8, label: 'recharging…', stallAt: 3, error: 'Error: still at 3%', y: 1740 }

function lounge(x, t) {
  room(x, { y: FLOOR, wall: '#1a2246', floor: '#2a2a50' })
  box(x, 760, 470, 220, 260, '#0d1a3a', { b: 8 })
  // a floor lamp
  R(x, INK, 140, 700, 12, FLOOR - 700); box(x, 90, 640, 110, 70, GOLD, { b: 6 }); glowAt(x, 145, 720, 240, '255,214,150', 0.25)
}
function couch(x) {
  box(x, 150, 1080, 780, 130, '#3f7c8a', { b: 8, hi: '#4f94a4' })
  box(x, 110, 1170, 860, 190, '#346a77', { b: 8 })
  box(x, 90, 1120, 110, 240, '#3f7c8a', { b: 8 }); box(x, 880, 1120, 110, 240, '#3f7c8a', { b: 8 })
  R(x, INK, 140, 1360, 20, FLOOR - 110 - 1360); R(x, INK, 920, 1360, 20, FLOOR - 110 - 1360)
}
function battery(x, t, cx, cy, s, pct, blink) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -46, 220, 92, '#120c2a', { b: 7 }); R(x, INK, 110, -20, 20, 40)
  const col = pct < 0.15 ? RED : pct < 0.6 ? GOLD : MINT
  const on = !blink || Math.floor(t * 4) % 2 === 0
  if (on) R(x, col, -100, -36, Math.max(8, 200 * pct), 72)
  x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(pct * 100)}%`, 0, 2)
  x.font = `700 18px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('SOCIAL BATTERY', 0, -70)
  x.restore()
}

const EP = makeNormal({
  id: 'kine08', D, ending: 'loop', hero: 'aquarius',
  hook: { text: 'Great date. | Now I need a *week.*', out: T.h0Out, accentColor: CYAN },
  fx: [[hook.notification, hook.notificationCues, NOTIF], [hook.loadingBar, hook.loadingBarCues, LOAD]],
  heads: [{ text: 'Had fun. | Now: *hibernate.*', at: T.h1, out: T.h1Out, size: 100, accent: CYAN, late: 1, lateAt: T.h1 + 0.45 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'some people refuel *alone* after a good time.' },
    { t: T.l2, text: "tell them: 'I had fun. I'm a *slow recharger.*'" },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Recharging is not | losing *interest.*', at: T.last, lateAt: T.last + 0.5, accent: GOLD, size: 94 },
  punches: [T.notif + 0.1, T.h1, T.meter + 1.75, T.reply],
  scene(x, t, S) {
    if (t < T.meter) {
      lounge(x, t)
      x.save(); x.translate(0, 110)
      couch(x)
      // Aquarius: mid-flop (falling onto the couch at frame 0, landing 0.35)
      const f = ease.inQuad(clamp((t + 0.25) / 0.6))
      const hy = lerp(900, 1110, f), rot = lerp(-0.6, -1.35, f)
      const land = t > 0.35
      x.save(); x.translate(520, hy); x.rotate(land ? -1.35 + 0.02 * Math.sin(t * 2) : rot); x.translate(-520, -hy)
      S.hero(x, t, { x: 520, y: hy, s: 360, mood: t < 0.35 ? 'wide' : t > T.notif + 0.1 && t < T.h1 ? 'wide' : 'sleepy', look: [0, 0], squash: land ? 0.1 * Math.exp(-(t - 0.35) * 5) : -0.06, hops: [] })
      x.restore()
      battery(x, t, 540, 700, 1.4, 0.01 + (t > T.load ? 0.02 * prog(t, T.load, T.load + 2) : 0), true)
      // Pisces on the couch arm, wrapped in a blanket corner
      const pk = pop01(t, T.pisIn, 0.35, 2.2)
      S.pis(x, t, { x: 910, y: 1050, s: 170, pop: pk, tears: 3, mood: 'sleepy', look: [-1, 0.3], say: [T.pisIn + 0.4, T.meter - 0.2, 'me too'], sayDx: -40, saySize: 32 })
      if (pk > 0.01) { x.save(); x.globalAlpha = pk; box(x, 830, 1080, 170, 70, '#ff9f6a', { b: 6 }); x.restore() }
      x.restore()
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'sleepy', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      lounge(x, t)
      x.save(); x.translate(0, 110)
      couch(x)
      const pct = lerp(0.03, 1, ease.inOutCubic(prog(t, ...T.fill)))
      battery(x, t, 540, 600, 1.5, pct, false)
      if (t > T.fill[1]) sparkles(x, t, 540, 600, T.fill[1], 10, 200, 1, [MINT, BONE, GOLD])
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      S.hero(x, t, { x: 470, y: 1080, s: 340, pop: k, mood: t > T.reply ? 'sparkle' : pct > 0.6 ? 'happy' : 'sleepy', look: [1, -0.3], hops: [T.mOut[0] + 0.2, T.send, T.reply] })
      bubble(x, t, 560, 900, T.send - 0.1, T.reply + 0.05, "I had fun. I'm a slow recharger.", { size: 30, col: '#4f8df0', ink: BONE, tail: -0.3 })
      bubble(x, t, 640, 900, T.reply, D, 'same honestly. saturday?', { size: 32, col: '#c9ecfb', tail: 0.4 })
      if (t > T.reply) hearts(x, t, T.reply + 0.1, 470, 900, { n: 5 })
      S.pis(x, t, { x: 880, y: 1080, s: 180, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.send ? 3 : 2, mood: t > T.send ? 'happy' : 'sparkle', look: [-1, -0.2], hops: [T.send + 0.2, T.reply + 0.2, T.last + 0.5] })
      x.restore()
      S.stars(x, t, { x: 150, y: 860, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.reply ? 'happy' : 'neutral', look: [1, -0.3] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.3, 0.04], ['tom', 0.35, 80, { gain: 0.24, decay: 0.3 }], ['tick', 0.36, 0.06],
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(0.75 + i * 0.25 + (i > 2 ? 1.2 : 0)), 440, 0.012, 0]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['riser', T.fill[0], T.fill[1], 0.02], ['bell', T.fill[1], 1760, 0.03, 1.2, 0], ['glitter', T.fill[1], T.fill[1] + 0.4],
    ['whoosh', T.send - 0.1, 0.3, 0.04], ['pop', T.send, 1318.51, 0.04, -0.2],
    ['pop', T.reply, 1174.66, 0.045, 0.3], ['pop', T.reply + 0.08, 1567.98, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, drawBits, label, shadow]
