// nh15e09: HOME FOR THE HOLIDAYS, "Sagittarius said 'my family's chill'" (35 s vertical, Season 15 ep 9; rows in
// promo/films/next30/b03.md; music funk · E). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.0    "*Sagittarius*: "my family's | *chill.*""  Frame 0: Sag mid-stride up to the door, the Virgo date smiling
//              politely. The door opens…
//   4.0        inside. "The family: | *not chill.*"  A conga line of cousins snakes past, a dog in antlers, a tiny drum, a
//              Pisces cousin crying mid-conga. The Virgo's smile freezes.
//   8.6        "Sag | *notices.*"  For once Sag slows down. SAG: "if it's too much, say *cocoa*." → "and we step out. *no
//              questions*."
//  15.6        card cut. "Later… | *"cocoa."*"  VIRGO: "…cocoa?"
//  18.2        the porch: "Five quiet | *minutes.*"  Two mugs, falling snow, the warm door ajar behind them.
//              THE STARS: "the best plan? *a way out*," → "offered *kindly*." Then they head back in, together.
//  25.4–30.5   last line "Code word: | *cocoa.*"
import { makeHome, drawHouse, drawYard, drawRoom, mug, bubble, hearts, sparkles, snow, shadow, drawBits, signStar, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, FLOOR } from '../../nh15e01/homekit.js'

const SAG = tagOf('sagittarius'), VIR = tagOf('virgo'), STARS = 'THE STARS'
const T = { door: [2.6, 3.0], inside: 4.0, freeze: 6.8, notice: 8.6, later: 15.7, cocoa: 16.0, porch: 18.2, back: 23.8, cut: 15.6, last: 25.4 }
const LINES = [
  { t: 9.3, speaker: SAG, color: '#c9a6ff', text: "if it's too much, say *cocoa*." },
  { t: 12.3, speaker: SAG, color: '#c9a6ff', text: 'and we step out. *no questions*.' },
  { t: 16.0, speaker: VIR, color: '#c8e6a0', text: '…*cocoa*?' },
  { t: 19.9, speaker: STARS, text: 'the best plan? *a way out*,' },
  { t: 22.6, speaker: STARS, text: 'offered *kindly*.' },
]
const CONGA = ['aries', 'gemini', 'leo', 'pisces', 'libra', 'aquarius', 'taurus']
const DOG = ['A.....A', 'AA...AA', '.BB.BB.', '.BBBBB.', 'BWBBBWB', 'BKBBBKB', '.BBNBB.', '..BBB..']

const EP = makeHome({
  id: 'nh15e09', duration: 35, hero: 'sagittarius', date: 'virgo',
  heads: [
    { text: '*Sagittarius:* “my family’s | *chill.*”', at: -1, out: [3.8, 4.0], size: 88, accentSize: 118, accent: '#ffd27a' },
    { text: 'The family: | *not chill.*', at: T.inside + 0.1, out: [8.4, 8.6], accent: '#ff9a7a' },
    { text: 'Sag | *notices.*', at: T.notice + 0.1, out: [15.4, 15.6], accent: '#c9a6ff' },
    { text: 'Later… | *“cocoa.”*', at: T.later, out: [18.0, 18.2], accent: '#c08a5a' },
    { text: 'Five quiet | *minutes.*', at: T.porch + 0.1, out: [25.15, 25.35], accent: '#9fd8f6' },
    { text: 'Code word: | *cocoa.*', at: T.last, out: [30.05, 30.45], size: 110, accentSize: 170, late: 1, lateAt: T.last + 0.6, wobble: true, accent: '#ffd27a' },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 1, close: 15.4 }, { from: 2, to: 2, close: 18.0 }, { from: 3, to: 4, close: 25.2 }],
  flashes: [T.inside, T.porch], shakes: [],
  cuts: [T.inside, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < T.inside) {
      const op = ease.inOutCubic(prog(t, ...T.door))
      drawHouse(x, t, { open: op, wall: '#6a5a9a', trim: '#5a4a8a', door: '#d0802a' })
      drawYard(x, t)
      // party noise leaking from the door
      if (op > 0.2) for (let i = 0; i < 5; i++) drawBits(x, ['.NN', '.N.', 'NN.'], { N: [GOLD, PINK, '#7fd0ff'][i % 3] }, 540 + Math.sin(t * 4 + i) * 120, 1000 - ((t * 200 + i * 60) % 300), 7)
      const walk = ease.outCubic(prog(t, -0.5, 2.0))
      shadow(x, lerp(220, 330, walk), 1350, 190); shadow(x, 780, 1350, 180)
      K.hero(x, t, { x: lerp(220, 330, walk), y: stand(240), s: 240, mood: 'happy', look: [1, 0], hops: [-0.15, 0.25, 0.65, 1.05, 1.45], scarf: '#c9a6ff' })
      K.date(x, t, { x: 780, y: stand(230), s: 230, mood: op > 0.5 ? 'wide' : 'happy', look: op > 0.5 ? [-1, -0.3] : [-1, 0], hops: [T.door[1]], scarf: '#c8e6a0' })
      snow(x, t, { n: 60 })
      return
    }
    if (t < T.porch) {
      drawRoom(x, t, { fireX: 540, treeX: 920, windowX: 90, wall: '#7a4a5a', stripe: '#84526a' })
      // the conga line snakes across the back
      const busy = t < T.later ? 1 : 0.5
      CONGA.forEach((id, i) => {
        const u = ((t - T.inside) * 170 * busy + i * 150) % 1500 - 200
        const cx = 1180 - u, cy = 1130 + 18 * Math.sin(u / 60)
        const S = signStar(id)
        if (id === 'pisces') K.pisces(x, t, { x: cx, y: cy, s: 130, tears: 3, mood: 'happy', look: [-1, 0] })
        else K.fam(x, t, id, { x: cx, y: cy, s: 130, mood: 'happy', look: [-1, 0], hops: [Math.floor(t * 3) / 3 + (i % 2) * 0.16], seed: i + 20, hat: [RED, GOLD, '#7fd0ff'][i % 3], col: S.color })
      })
      // the dog in antlers + the tiny drum
      drawBits(x, DOG, { A: '#a07850', B: '#c08a5a', W: '#ffffff', K: INK, N: RED }, 900, 1300 - Math.abs(Math.sin(t * 6)) * 20, 11)
      R(x, INK, 140, 1270, 90, 70); R(x, RED, 146, 1276, 78, 58); R(x, BONE, 146, 1276, 78, 12)
      // the pair in front
      const sx = 330, dx = 640
      shadow(x, sx, 1350, 200); shadow(x, dx, 1350, 190)
      const vMood = t < T.freeze ? 'happy' : t < 12.6 ? 'neutral' : t < T.later ? 'happy' : 'neutral'
      K.date(x, t, { x: dx, y: stand(240), s: 240, mood: vMood, look: t < T.notice ? [0, 0] : [-1, 0], squash: win(t, T.freeze, 12.6) ? 0.08 : 0, bob: win(t, T.freeze, 12.6) ? 0 : undefined, hops: [T.cocoa], scarf: '#c8e6a0', blink: win(t, T.freeze, 12.6) ? false : undefined })
      K.hero(x, t, { x: sx, y: stand(250), s: 250, mood: t < T.notice ? 'sparkle' : t < T.notice + 0.6 ? 'wide' : 'happy', look: t < T.notice ? [0.4, -1] : [1, 0], hops: [T.inside + 0.3, T.inside + 0.9, T.inside + 1.5, T.inside + 2.1, ...K.hops(SAG), T.cocoa + 0.5], scarf: '#c9a6ff' })
      // the frozen smile: a sweat drop
      if (win(t, T.freeze, 12.6)) drawBits(x, ['.W.', 'WWW', 'WWW', '.W.'], { W: '#8fe3ff' }, dx + 90, stand(240) - 60 + 20 * prog(t, T.freeze, T.freeze + 2), 7)
      bubble(x, t, 540, 860, T.inside + 0.6, T.notice - 0.1, 'WELCOME!!!', { size: 44, tail: 0.6 })
      return
    }
    // ── the porch: five quiet minutes
    const back = ease.inOutCubic(prog(t, T.back, T.back + 1.0))
    drawHouse(x, t, { open: 0.35, wall: '#6a5a9a', trim: '#5a4a8a', door: '#d0802a' })
    drawYard(x, t, { path: false })
    // the porch step
    R(x, INK, 300, FLOOR - 6, 480, 70); R(x, '#a89cc8', 306, FLOOR, 468, 58); R(x, '#f4f1ff', 306, FLOOR, 468, 10)
    const sx = lerp(420, 500, back), dx = lerp(660, 590, back)
    const sy = lerp(FLOOR - 110, stand(230), back)
    K.hero(x, t, { x: sx, y: sy, s: 230, mood: t > 21 ? 'happy' : 'sparkle', look: [1, 0], hops: [T.back, T.last + 0.3], scarf: '#c9a6ff' })
    K.date(x, t, { x: dx, y: sy, s: 220, mood: t > 21 ? 'heart' : 'happy', look: [-1, 0], hops: [T.back + 0.1, T.last + 0.4], scarf: '#c8e6a0' })
    if (back < 0.5) { mug(x, sx + 80, sy + 50, 1.1, '#c9a6ff'); mug(x, dx - 80, sy + 50, 1.1, '#c8e6a0') }
    // steam
    for (let i = 0; i < 2; i++) { const p = ((t * 0.6 + i * 0.5) % 1); x.save(); x.globalAlpha *= 0.5 * (1 - p) * (1 - back); R(x, BONE, sx + 76 + Math.sin(p * 6) * 6, sy - 10 - p * 70, 8, 18); R(x, BONE, dx - 84 + Math.sin(p * 6 + 1) * 6, sy - 10 - p * 70, 8, 18); x.restore() }
    hearts(x, t, T.back + 0.6, 540, sy - 160, { n: 6 })
    if (win(t, 19.6, T.last)) K.stars(x, t, { x: 860, y: 1070, s: 150, pop: pop01(t, 19.7, 0.36, 2.1) * outK(t, [25.0, 25.3]), mood: 'happy', look: [-1, 0.4], hops: K.hops(STARS) })
    snow(x, t, { n: 70, speed: 0.6 })
    if (t > T.last) sparkles(x, t, 540, sy - 60, T.last + 0.6, 12, 240, 3)
    void [GOLD, clamp]
  },
  cues: [
    ...[0.25, 0.65, 1.05, 1.45].map(s => ['tick', s, 0.03]), ['whoosh', T.door[0], 0.4, 0.035],
    ['pop', T.inside + 0.6, 1567.98, 0.045, 0.3], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.inside + 0.3 + i * 0.36), 0.025]),
    ['pluck', T.freeze, 440, 0.035, 0.5, 0.3], ['pop', T.notice, 880, 0.04, -0.3],
    ['pop', T.cocoa, 987.77, 0.035, 0.3], ['whoosh', T.porch - 0.1, 0.5, 0.03], ['pluck', T.back + 0.6, 1174.66, 0.04, 0.5, 0], ['glitter', T.back + 0.6, T.back + 1.1],
    ['pluck', 7.3, 2349.32, 0.015, 0.3, 0.7],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
