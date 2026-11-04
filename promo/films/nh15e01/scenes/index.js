// nh15e01: HOME FOR THE HOLIDAYS, "Aries arrives two hours early" (30 s vertical, Season 15 ep 1; rows in
// promo/films/next30/b03.md; music pop · D). Story 0–25.6, then the shared end card. The show look is ../homekit.js.
//   0.0–4.6    "*Aries* brings someone home… | *two hours* early."  Frame 0: Aries mid-sprint up the snowy path, hauling a
//              calm Libra by the hand; the car is parked crooked on the lawn; the clock over the door says 3:00.
//              KNOCK KNOCK KNOCK. The door opens: Mom (Cancer) in curlers. MOM: "you said FIVE. it's *three*."
//   4.6        jump cut inside. "Speed *decorating.*"  Aries zips back and forth hanging tinsel: it lands on Mom, on Libra,
//              on the Pisces cousin (already crying by the tree). Aries: "DONE! what's next?!" Libra calmly hands Mom
//              her tea back.
//  11.2        card cut.
//  11.3–17.5   "Slow *down*, star."  THE STARS: "slow down. they came to meet *your people*." → "not to watch you
//              *sprint*." Aries freezes mid-zip, then one big breath (a puff of warm air).
//  17.6–21.6   "The *proper* hello."  ARIES: "Mom, this is *Libra*. Libra, this is *home*." Mom hugs Libra; the Pisces
//              cousin fountains.
//  21.7–25.5   last line "Fast car. | *Slow* hello."
import { makeHome, drawHouse, drawYard, drawRoom, clockFace, mug, bubble, label, hearts, sparkles, snow, shadow, drawBits, inSprite, R, INK, BONE, GOLD, PINK, RED, SNOW, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3 } from '../homekit.js'

const MOM = '♋︎ MOM', STARS = 'THE STARS', ARI = tagOf('aries')
const T = { knock: [1.05, 1.27, 1.49], open: [1.7, 2.1], cutIn: 5.0, zip: [5.3, 9.9], done: 8.2, tea: 9.0, cut: 11.2, freeze: 11.55, breath: 15.9, hello: 17.9, hug: 19.6, last: 21.7 }
const LINES = [
  { t: 2.25, speaker: MOM, color: '#9fd8f6', text: "you said FIVE. it's *three*." },
  { t: 11.75, speaker: STARS, text: 'slow down. they came to meet *your people*.' },
  { t: 15.0, speaker: STARS, text: 'not to watch you *sprint*.' },
  { t: 17.95, speaker: ARI, color: '#ff9a7a', text: 'Mom, this is *Libra*. Libra, this is *home*.' },
]

// curlers on Mom's head (sprite cells)
const curlers = (x) => { for (const [cx, cy] of [[13, 4], [17, 2.6], [21, 4]]) { x.fillStyle = INK; x.fillRect(cx - 1.9, cy - 1.4, 3.8, 2.8); x.fillStyle = PINK; x.fillRect(cx - 1.4, cy - 0.9, 2.8, 1.8) } }
// a tinsel garland draped across a star (k grows it on)
function tinsel(x, t, cx, cy, w, k, seed = 0) {
  if (k <= 0.01) return
  const n = Math.round(14 * k)
  for (let i = 0; i < n; i++) {
    const u = i / 13, px = cx - w / 2 + u * w, py = cy + 26 * Math.sin(Math.PI * u) + 6 * Math.sin(t * 4 + i + seed)
    R(x, INK, px - 7, py - 7, 14, 14); R(x, i % 2 ? '#d8e0ff' : GOLD, px - 4, py - 4, 8, 8)
  }
}
function car(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const w = 250, h = 62, col = '#e0503a'
  R(x, INK, -w * 0.28 - 6, -h - 56, w * 0.56 + 12, 62); R(x, col, -w * 0.28, -h - 50, w * 0.56, 54)
  R(x, '#bfe8ff', -w * 0.24, -h - 42, w * 0.2, 36); R(x, '#bfe8ff', w * 0.04, -h - 42, w * 0.2, 36)
  R(x, INK, -w / 2 - 6, -h - 6, w + 12, h + 12); R(x, col, -w / 2, -h, w, h)
  R(x, '#fff1a8', w / 2 - 22, -h + 12, 16, 14)
  for (const d of [-0.3, 0.3]) { R(x, INK, d * w - 28, -12, 56, 42); R(x, '#5a5470', d * w - 13, 2, 26, 14) }
  R(x, SNOW, -w * 0.28, -h - 58, w * 0.56, 10)
  x.restore()
}

const EP = makeHome({
  id: 'nh15e01', duration: 30, hero: 'aries', date: 'libra',
  heads: [
    { text: '*Aries* brings someone home… | *two hours* early.', at: -1, out: [4.8, 5.0], size: 84, accentSize: 112 },
    { text: 'Speed | *decorating.*', at: 5.1, out: [11.0, 11.2], accent: GOLD },
    { text: 'Slow *down*, | star.', at: 11.3, out: [17.4, 17.6], accent: '#9fd8f6' },
    { text: 'The *proper* | hello.', at: 17.7, out: [21.45, 21.65], accent: PINK },
    { text: 'Fast car. | *Slow* hello.', at: T.last, out: [25.05, 25.45], size: 104, accentSize: 150, late: 1, lateAt: T.last + 0.55, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 4.9 }, { from: 1, to: 2, close: 17.5 }, { from: 3, to: 3, close: 21.55 }],
  flashes: [T.cutIn], shakes: [T.freeze],
  cuts: [5.0, { t: T.cut, kind: 'flip' }, 17.6],
  draw(x, t, K) {
    if (t < T.cutIn) {
      // ── the porch
      const op = ease.inOutCubic(prog(t, ...T.open))
      drawHouse(x, t, { open: op, wall: '#6a4a7a', trim: '#5a3d6a' })
      clockFace(x, 540, 800, 44, 3, Math.floor(prog(t, 0, 5) * 4))
      drawYard(x, t)
      car(x, 880, 1365, -0.12)
      // exhaust puffs from the hurried parking
      for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha *= 0.5 * (1 - p); R(x, '#cfc8e8', 1010 + p * 50, 1320 - p * 60 - i * 8, 22, 22); x.restore() }
      // the sprint: Aries hauls Libra up the path, arriving by the door
      const run = ease.outCubic(prog(t, -0.6, 1.0))
      const ax = lerp(180, 330, run), dx = ax - 175
      const runHops = [0, 0.22, 0.44, 0.66, 0.88]
      shadow(x, ax, 1350, 170); shadow(x, dx, 1350, 150)
      // the date, tilted from being pulled
      x.save(); x.translate(dx, stand(210)); x.rotate(lerp(0.32, 0, prog(t, 0.8, 1.3))); x.translate(-dx, -stand(210))
      K.date(x, t, { x: dx, y: stand(210), s: 210, mood: t < 1.1 ? 'squint' : 'happy', look: [1, 0], hops: t < 1.1 ? [0.1, 0.5, 0.9] : [] })
      x.restore()
      R(x, INK, dx + 40, stand(210) + 10, ax - dx - 80, 10); R(x, BONE, dx + 40, stand(210) + 12, ax - dx - 80, 6)
      K.hero(x, t, { x: ax, y: stand(230), s: 230, mood: t < 1.7 ? 'happy' : 'sparkle', look: [1, 0], hops: [...runHops, ...T.knock], scarf: true })
      // KNOCK ×3
      T.knock.forEach((k, i) => { const kk = pop01(t, k, 0.18, 3) * outK(t, [k + 0.5, k + 0.7]); if (kk > 0.01) label(x, 'KNOCK', 470 + i * 22, 1020 - i * 60, { size: 40 * kk, col: GOLD, font: "Inter, sans-serif", weight: 800, rot: [-0.2, 0.15, -0.05][i] }) })
      // Mom in the doorway, in curlers
      if (op > 0.2) {
        const mk = pop01(t, T.open[0] + 0.15, 0.35, 2.2)
        const m = K.fam(x, t, 'cancer', { x: 560, y: stand(230), s: 230, pop: mk, mood: 'wide', look: [-1, 0], tag: 'MOM', blink: false })
        if (m) inSprite(x, m.F, () => curlers(x))
      }
      snow(x, t, { n: 60 })
      return
    }
    // ── inside: the living room
    const pk = clamp(prog(t, T.cutIn, T.cutIn + 0.01))
    drawRoom(x, t, { fireX: 520, treeX: 880 })
    const z = prog(t, ...T.zip)
    const tinselK = i => clamp(prog(t, 5.7 + i * 1.05, 6.2 + i * 1.05))
    // Pisces cousin by the tree: crying from the start (tinsel makes it worse)
    K.pisces(x, t, { x: 930, y: stand(150), s: 150, pop: pk, tears: t > T.hello + 1.5 ? 3 : 2, look: [-1, -0.3], tag: 'COUSIN' })
    tinsel(x, t, 930, stand(150) - 30, 110, tinselK(2), 2)
    // Mom (curlers out of frame? no — still in), and Libra
    const hug = ease.inOutCubic(prog(t, T.hug, T.hug + 0.5))
    const mx = lerp(250, 430, hug), lx = lerp(560, 600, hug)
    shadow(x, mx, 1350, 170); shadow(x, lx, 1350, 160)
    const momMood = t < 6 ? 'wide' : t < T.tea ? 'squint' : t < T.hello + 1.4 ? 'happy' : 'heart'
    const mm = K.fam(x, t, 'cancer', { x: mx, y: stand(230), s: 230, mood: momMood, look: t < T.tea ? [1, -0.4] : [1, 0], tag: 'MOM', hops: [T.tea + 0.15, T.hug, T.hug + 0.5] })
    if (mm) inSprite(x, mm.F, () => curlers(x))
    tinsel(x, t, mx, stand(230) - 40, 150, tinselK(0), 0)
    K.date(x, t, { x: lx, y: stand(220), s: 220, mood: t < T.hug ? 'happy' : 'heart', look: [-1, 0], hops: [T.tea, T.hug + 0.1], tag: 'LIBRA' })
    tinsel(x, t, lx, stand(220) - 34, 140, tinselK(1), 1)
    // the mug of tea: Libra hands it back to Mom
    const tm = ease.inOutCubic(prog(t, T.tea, T.tea + 0.5))
    if (t < T.hug) mug(x, lerp(lx - 70, mx + 80, tm), lerp(1210, 1190, tm) - 40 * Math.sin(Math.PI * tm), 1.1, '#9fd8f6')
    bubble(x, t, 560, 960, T.tea + 0.1, 10.9, 'your tea, ma’am.', { size: 32, tail: 0.1 })
    hearts(x, t, T.hug + 0.4, 520, 1060, { n: 7 })
    // Aries: zip, zip, zip… freeze… breathe… stand still
    let ax, amood = 'happy', look = [0, 0], hops = []
    if (t < T.freeze) {
      const ph = z * 5.2, side = Math.floor(ph) % 2
      const f = ph - Math.floor(ph)
      ax = side ? lerp(940, 140, ease.inOutCubic(f)) : lerp(140, 940, ease.inOutCubic(f))
      if (t > T.zip[1]) ax = 780
      hops = [5.4, 5.9, 6.4, 6.9, 7.4, 7.9, 8.4, 8.9, 9.4, 9.9, 10.4, 10.9]
      // speed streaks
      if (t < T.zip[1]) for (let i = 0; i < 5; i++) { x.save(); x.globalAlpha *= 0.45; R(x, '#ff9a7a', ax + (side ? 60 : -200) + i * 4, stand(230) - 70 + i * 34, 140, 8); x.restore() }
      amood = 'sparkle'
    } else {
      ax = 780
      amood = t < 13 ? 'wide' : t < T.breath ? 'neutral' : t < T.breath + 0.8 ? 'sleepy' : 'happy'
      look = t < T.hello ? [-0.6, -0.8] : [-1, 0]
      hops = [T.freeze, ...K.hops(ARI)]
    }
    const breathSq = t > T.breath && t < T.breath + 1.1 ? -0.12 * Math.sin(Math.PI * prog(t, T.breath, T.breath + 1.1)) : 0
    shadow(x, ax, 1350, 170)
    K.hero(x, t, { x: ax, y: stand(240), s: 240, mood: amood, look, hops, squash: breathSq, scarf: true, zzz: false })
    // the breath: a puff of warm air
    if (t > T.breath + 0.6 && t < T.breath + 1.6) { const p = prog(t, T.breath + 0.6, T.breath + 1.6); x.save(); x.globalAlpha *= 0.7 * (1 - p); for (let i = 0; i < 4; i++) R(x, BONE, ax - 40 - p * 140 - i * 26, stand(240) - 20 - i * 10 - p * 30, 26 - i * 4, 26 - i * 4); x.restore() }
    bubble(x, t, 600, 880, T.done, 10.6, 'DONE! what’s next?!', { size: 38, tail: 0.5 })
    // THE STARS drop in, top right
    if (win(t, 11.3, 17.6)) K.stars(x, t, { x: 860, y: 660, s: 190, pop: pop01(t, 11.45, 0.36, 2.1) * outK(t, [17.3, 17.55]), mood: t > 15.2 ? 'happy' : 'neutral', look: [-1, 0.6], hops: K.hops(STARS) })
    sparkles(x, t, 860, 660, 11.5, 8, 130, 1)
    // the proper hello: the stars twinkle around the pair
    sparkles(x, t, 520, 1060, T.hug + 0.2, 10, 220, 2, [GOLD, PINK, BONE])
    if (t > T.last) { sparkles(x, t, 540, 1060, T.last + 0.6, 12, 260, 3) }
  },
  cues: [
    ['whoosh', 0.1, 0.3, 0.03],
    ...[0, 0.22, 0.44, 0.66, 0.88].map((h, i) => ['tick', r3(h + 0.05), 0.025 + (i % 2) * 0.01]),
    ...T.knock.flatMap(k => [['tom', k, 120, { gain: 0.22, decay: 0.18 }], ['tick', k, 0.06]]),
    ['whoosh', T.open[0], 0.5, 0.03], ['pop', T.open[0] + 0.2, 739.99, 0.04, 0.1],
    ...Array.from({ length: 9 }, (_, i) => ['whoosh', r3(5.35 + i * 0.52), 0.22, 0.03]),
    ['glitter', 5.7, 6.2], ['glitter', 6.75, 7.25], ['glitter', 7.8, 8.3],
    ['pop', T.done, 1318.51, 0.045, 0.2], ['pop', T.done + 0.08, 1567.98, 0.035, 0.2],
    ['pluck', T.tea + 0.1, 987.77, 0.03, 0.4, -0.2],
    ['riser', T.breath, T.breath + 0.6, 0.02], ['whoosh', T.breath + 0.6, 0.6, 0.03],
    ['pluck', T.hug, 1174.66, 0.04, 0.6, 0], ['pluck', T.hug + 0.12, 1567.98, 0.035, 0.6, 0], ['glitter', T.hug + 0.2, T.hug + 0.7],
    ['pluck', 20.4, 2349.32, 0.015, 0.3, 0.6],
    ['pop', T.last + 0.55, 1174.66, 0.05, 0], ['bell', T.last + 0.6, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, RED, lerp]
