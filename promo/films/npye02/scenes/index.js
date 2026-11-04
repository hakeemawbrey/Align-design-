// npye02: YOUR SIGN AT THE HOLIDAY PARTY, "Taurus at the holiday party" (16 s vertical trial reel, music: jazzy · Bb).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Taurus* at the | holiday party:" — Taurus is mid-bite of a cookie at the snack table at frame 0.
//   2.4–5.2   1 "finds the *snack table.* stays there." A plate piled into a wobbling tower: "this dip is a whole
//             personality."
//   5.2       card cut.
//   5.2–8.0   2 "saves the last cookie… for *you.*" The table's empty; a late guest: "aw, all gone?" Taurus brings out
//             a plate from behind its back: one cookie. Hearts.
//   8.0–11.6  THE STARS: "Love sounds like *'I saved you a plate.'*" Taurus and the guest share the cookie.
import { makeEp, R, box, bubble, shadow, sparkles, hearts, cookie, plate, mug, hatCells, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, PINK, MINT } from '../../npye01/scenes/kit.js'

function table(x, t, cx, w, { full = 1 } = {}) {
  const top = 1000
  box(x, cx - w / 2, top, w, 30, '#c84a4a', { b: 6 })
  for (let i = 0; i < w / 40; i++) R(x, i % 2 ? '#e6e0d4' : '#c84a4a', cx - w / 2 + i * 40, top + 30, 40, 26)
  R(x, INK, cx - w / 2 + 20, top + 56, 14, 94); R(x, INK, cx + w / 2 - 34, top + 56, 14, 94)
  if (full > 0) {
    // a dip bowl, a cocoa mug, a cookie platter
    box(x, cx - w * 0.38, top - 50, 120, 50, '#7fd0ff', { b: 5 }); R(x, '#e9d37a', cx - w * 0.38 + 8, top - 46, 104, 14)
    mug(x, t, cx + w * 0.3, top - 34, 54)
    plate(x, cx, top - 10, 150)
    for (let i = 0; i < Math.round(4 * full); i++) cookie(x, cx - 40 + i * 26, top - 26 - (i % 2) * 10, 22)
  }
}

const EP = makeEp({
  id: 'npye02', series: 'party', sign: 'taurus', name: 'Taurus',
  hook(x, t, S) {
    const { hero, heroHat } = S
    table(x, t, 760, 440)
    shadow(x, 390, 1125, 240)
    const chew = Math.floor(t * 6) % 2
    const o = { x: 390, y: 950, s: 280, mood: t < 1.3 ? 'happy' : 'sparkle', look: [1, 0], hops: [1.3], squash: chew ? 0.04 : -0.02 }
    hero(x, t, o); heroHat(x, t, o)
    // the cookie, mid-bite at frame 0
    cookie(x, 520, 900 + Math.sin(t * 6) * 4, 38, t < 0.6 ? 0.5 : 1)
    for (let i = 0; i < 4; i++) { const p = ((t * 1.6 + i / 4) % 1); x.save(); x.globalAlpha = 1 - p; R(x, '#d9a35a', 520 + i * 9, 940 + p * 120, 8, 8); x.restore() }
    bubble(x, t, 430, 660, 1.3, 2.35, 'mmm. staying here.', { size: 36, tail: -0.2 })
  },
  hookCues: [['tick', 0.0, 0.05], ['tick', 0.17, 0.04], ['tick', 0.34, 0.04], ['pop', 1.3, 987.77, 0.035, 0]],
  beats: [
    { caption: 'finds the *snack table.* stays there.',
      draw(x, t, S) {
        const { u, hero, heroHat } = S
        table(x, t, 760, 440)
        shadow(x, 400, 1125, 240)
        const o = { x: 400, y: 960, s: 260, mood: u < 1.0 ? 'happy' : 'sparkle', look: [0, -1], hops: [S.t0 + 0.1, S.t0 + 1.0] }
        hero(x, t, o); heroHat(x, t, o)
        // the tower plate: cookies keep landing on it
        const n = Math.min(7, Math.floor(u * 3.2) + 1), wob = Math.sin(u * 7) * 0.05 * n / 7
        x.save(); x.translate(400, 800); x.rotate(wob)
        plate(x, 0, 0, 200)
        for (let i = 0; i < n; i++) cookie(x, ((i % 2) - 0.5) * 16, -22 - i * 30, 34)
        x.restore()
        bubble(x, t, 640, 500, S.t0 + 1.2, S.t1, 'this dip is a whole personality.', { size: 32, tail: -0.5 })
      },
      cues: [['pop', 0.3, 880, 0.02, 0], ['pop', 0.6, 987.77, 0.02, 0], ['pop', 0.93, 1108.73, 0.02, 0], ['pop', 1.25, 1174.66, 0.025, 0], ['pop', 1.56, 1318.51, 0.025, 0], ['pop', 1.87, 1479.98, 0.03, 0]] },
    { caption: 'saves the last cookie… for *you.*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        table(x, t, 760, 440, { full: 0 })
        plate(x, 760, 990, 150)
        shadow(x, 360, 1125, 230); shadow(x, 720, 1125, 170)
        const give = ease.outCubic(prog(u, 1.2, 1.5))
        const o = { x: 360, y: 960, s: 250, mood: u < 1.2 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 1.2] }
        hero(x, t, o); heroHat(x, t, o)
        const gIn = ease.outCubic(prog(u, 0, 0.5))
        const g = { x: lerp(1150, 720, gIn), y: 980, s: 180, mood: u < 1.5 ? 'wide' : 'heart', look: u < 0.9 ? [0, 1] : [-1, 0], hops: [S.t0 + 0.5, S.t0 + 1.6], seed: 8 }
        guest(x, t, 'cancer', g); dress(x, t, g, () => hatCells(x, GOLD, BONE, -0.1))
        bubble(x, t, 760, 760, S.t0 + 0.55, S.t0 + 1.3, 'aw, all gone?', { size: 32, col: '#dff1ff' })
        // the saved plate, from behind its back
        const px = lerp(300, 540, give), py = lerp(1040, 880, give)
        if (u > 1.15) { plate(x, px, py, 130); cookie(x, px, py - 22, 34) }
        sparkles(x, t, 540, 860, S.t0 + 1.5, 8, 120, 2, [GOLD, BONE, PINK])
        hearts(x, t, S.t0 + 1.7, 720, 840, { n: 6 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.02], ['pop', 0.55, 739.99, 0.03, 0.3], ['whoosh', 1.18, 0.25, 0.025], ['pop', 1.5, 1318.51, 0.045, 0], ['pluck', 1.7, 1174.66, 0.04, 0.5, 0.3], ['pluck', 1.82, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    shadow(x, 420, 1110, 230 * ok); shadow(x, 690, 1110, 170 * ok)
    const o = { x: 420, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'cancer', { x: 690, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.9], seed: 8 })
    // two halves of one cookie
    if (ok > 0.3) { cookie(x, 545, 860, 28, 1); cookie(x, 600, 870, 28, 1) }
  },
  last: 'Love sounds like *‘I saved you a plate.’*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, pop01, MINT]
