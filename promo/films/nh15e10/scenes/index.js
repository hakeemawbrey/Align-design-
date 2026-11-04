// nh15e10: HOME FOR THE HOLIDAYS, "Capricorn fixes the whole house" (30 s vertical, Season 15 ep 10; rows in
// promo/films/next30/b03.md; music synthwave · Cm). Story 0–25.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–3.8    "*Capricorn* brings someone home… | and fixes *everything.*"  Frame 0: Capricorn mid-climb up a ladder with
//              a screwdriver; the Gemini date below with two mugs. The string lights flicker.
//   3.8–13.4   three fixes (rule of three, jump cuts): #1 the lights (flicker → steady, FIXED), #2 the wobbly side table
//              (wobble → still), #3 the squeaky door (SQUEAK → silence). Each time the date pats the empty sofa seat:
//              "saved you a seat!"
//  13.4        card cut. "Then | *Grandma.*"  GRANDMA (Capricorn): "sit down, dear. *you're home*."
//  17.0        "Capricorn | *sits.*"  Capricorn sits; the date leans on its shoulder; the Pisces aunt sniffles on the sofa
//              arm. THE STARS: "you don't have to earn *a seat*" → "at your own *table*."
//  21.8–25.5   last line "Nothing to fix. | *Just stay.*"
import { makeHome, drawRoom, sofa, mug, bubble, label, hearts, sparkles, shadow, drawBits, bulbs, R, box, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, FLOOR } from '../../nh15e01/homekit.js'

const GMA = '♑︎ GRANDMA', STARS = 'THE STARS'
const T = { fix: [3.8, 7.4, 10.6], fixed: [5.6, 9.2, 12.2], pat: [6.3, 9.9, 12.8], gma: 13.5, sit: [16.9, 17.6], cut: 13.4, last: 21.8 }
const LINES = [
  { t: 13.8, speaker: GMA, color: '#c8d0e0', text: "sit down, dear. *you're home*." },
  { t: 17.3, speaker: STARS, text: "you don't have to earn *a seat*" },
  { t: 19.6, speaker: STARS, text: 'at your own *table*.' },
]
const SEAT = 1210

function ladder(x, cx, base, h) {
  for (const d of [-1, 1]) { R(x, INK, cx + d * 60 - 8, base - h, 16, h); R(x, '#c0a070', cx + d * 60 - 4, base - h, 8, h) }
  for (let y = base - 40; y > base - h; y -= 70) { R(x, INK, cx - 60, y - 6, 120, 12); R(x, '#c0a070', cx - 56, y - 3, 112, 6) }
}
function sideTable(x, cx, base, wob) {
  x.save(); x.translate(cx, base); x.rotate(wob)
  box(x, -80, -150, 160, 22, '#8a5a3a', { b: 6 }); R(x, INK, -66, -128, 14, 128); R(x, INK, 52, -128, 14, 128 - (wob ? 10 : 0))
  x.restore()
}
function innerDoor(x, cx, base) {
  box(x, cx - 90, base - 360, 180, 360, '#a0705a', { b: 6, hi: 'rgba(255,255,255,0.12)' })
  R(x, 'rgba(0,0,0,0.15)', cx - 70, base - 330, 140, 130); R(x, 'rgba(0,0,0,0.15)', cx - 70, base - 180, 140, 150); R(x, GOLD, cx + 52, base - 190, 14, 14)
}
function fixedStamp(x, t, cx, cy, t0, t1) {
  const k = pop01(t, t0, 0.2, 3) * outK(t, [t1 - 0.2, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(k, k)
  x.strokeStyle = '#5fd38a'; x.lineWidth = 8; x.strokeRect(-120, -42, 240, 84)
  x.font = '800 54px Inter, sans-serif'; x.fillStyle = '#5fd38a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FIXED', 0, 4)
  x.restore()
}

const EP = makeHome({
  id: 'nh15e10', duration: 30, hero: 'capricorn', date: 'gemini',
  heads: [
    { text: '*Capricorn* brings someone home… | and fixes *everything.*', at: -1, out: [3.6, 3.8], size: 74, accentSize: 100, accent: '#c8d0ff' },
    { text: 'Fix #1: | *the lights.*', at: T.fix[0] + 0.1, out: [7.2, 7.4], accent: GOLD },
    { text: 'Fix #2: | *the table.*', at: T.fix[1] + 0.1, out: [10.4, 10.6], accent: '#c08a5a' },
    { text: 'Fix #3: | *the door.*', at: T.fix[2] + 0.1, out: [13.3, 13.45], accent: '#ff9a7a' },
    { text: 'Then | *Grandma.*', at: T.gma, out: [16.8, 17.0], accent: '#c8d0ff' },
    { text: 'Capricorn | *sits.*', at: 17.05, out: [21.6, 21.8], accent: PINK },
    { text: 'Nothing to fix. | *Just stay.*', at: T.last, out: [25.05, 25.45], size: 100, accentSize: 156, late: 2, lateAt: T.last + 0.6, wobble: true, accent: '#c8d0ff' },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 16.85 }, { from: 1, to: 2, close: 21.7 }],
  flashes: [T.fix[0], T.fix[1], T.fix[2]], shakes: [],
  cuts: [T.fix[1], { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    // lights flicker until fix #1 lands
    drawRoom(x, t, { fire: false, tree: false, windowX: 70, wall: '#3a4a6a', stripe: '#425276', garland: false })
    const flick = t < T.fixed[0] ? (Math.sin(t * 23) > 0.2 ? 1 : 0) : 1
    x.save(); x.globalAlpha *= flick ? 1 : 0.35; bulbs(x, t, 0, 380, 540, 360, { n: 8, sag: 40, size: 11 }); bulbs(x, t, 540, 360, 1080, 380, { n: 8, sag: 40, size: 11 }); x.restore()
    innerDoor(x, 930, FLOOR)
    // the sofa (the date's saved seat is the left cushion)
    sofa(x, 470, SEAT, 520, '#6a4a3a')
    K.pisces(x, t, { x: 715, y: SEAT - 95, s: 130, tears: t > T.sit[1] ? 3 : 1, look: [-1, 0], tag: null })
    const sit = ease.inOutCubic(prog(t, ...T.sit))
    const lean = ease.inOutCubic(prog(t, T.sit[1], T.sit[1] + 0.5))
    // the date: on the sofa, two mugs, patting the empty seat
    const patting = T.pat.some(p => win(t, p, p + 0.9))
    K.date(x, t, { x: lerp(470, 430, lean), y: SEAT - 120, s: 220, mood: t < T.sit[1] ? (patting ? 'happy' : 'neutral') : 'heart', look: t < T.sit[1] ? [-1, -0.3] : [-1, 0], hops: T.pat.flatMap(p => [p, p + 0.4]), scarf: '#ffe27a' })
    if (t < T.sit[0]) { mug(x, 400, SEAT - 40, 1, '#9fd8f6') }
    T.pat.forEach((p, i) => bubble(x, t, 330, SEAT - 300, p, p + 1.4, ['saved you a seat!', 'still saved!', 'seat: still warm!'][i], { size: 32, tail: -0.1 }))
    // Capricorn: ladder (fix 1), under the table (fix 2), at the door (fix 3), then sits
    let cx, cy, cm = 'squint', look = [0, -1], hops = []
    if (t < T.fix[1]) {
      ladder(x, 700, FLOOR, 520)
      const climb = ease.outCubic(prog(t, -0.6, 1.2))
      cx = 700; cy = lerp(FLOOR - 260, FLOOR - 520, climb); look = [0.3, -1]
      if (t > T.fixed[0]) { cm = 'happy'; look = [0, 0] }
      hops = [-0.1, 0.5, 1.0, T.fixed[0]]
      // the screwdriver
      R(x, INK, cx + 70, cy - 70, 12, 70); R(x, '#ff6b6b', cx + 66, cy - 20, 20, 36)
      fixedStamp(x, t, 520, 720, T.fixed[0], T.fix[1])
    } else if (t < T.fix[2]) {
      const wob = t < T.fixed[1] ? 0.06 * Math.sin(t * 20) : 0
      sideTable(x, 860, FLOOR, wob)
      mug(x, 860, FLOOR - 186, 1, '#ff9aa8')
      cx = 760; cy = stand(200); look = [1, 0.4]; if (t > T.fixed[1]) { cm = 'happy'; look = [0, 0] }
      hops = [T.fix[1] + 0.4, T.fix[1] + 1.0, T.fixed[1]]
      // the wrench
      drawBits(x, ['W.W', 'WWW', '.W.', '.W.', '.W.'], { W: '#c8c8d8' }, cx + 70, cy + 30 + 10 * Math.sin(t * 12), 9)
      fixedStamp(x, t, 520, 720, T.fixed[1], T.fix[2])
    } else {
      sideTable(x, 860, FLOOR, 0)
      const sq = t < T.fixed[2] ? Math.sin(t * 10) : 0
      cx = lerp(760, 470 + 110, sit); cy = lerp(stand(220), SEAT - 120, sit)
      cm = t < T.fixed[2] ? 'squint' : t < T.gma + 0.6 ? 'wide' : t < T.sit[1] ? 'happy' : 'heart'
      look = t < T.gma ? [1, 0] : [-1, 0]
      hops = [T.fix[2] + 0.4, T.fixed[2], T.gma + 0.3, T.sit[0], T.last + 0.3]
      if (t < T.fixed[2]) { label(x, 'SQUEAK', 930, 820 + sq * 8, { size: 48, col: '#ff9a7a', font: 'Inter, sans-serif', weight: 800, rot: 0.08 * sq }); drawBits(x, ['.OO.', 'OOOO', 'OOOO', '.O..'], { O: '#c8c8d8' }, cx + 80, cy - 40, 9) }
      fixedStamp(x, t, 520, 720, T.fixed[2], T.gma)
      // Grandma
      if (t > T.gma) {
        const gk = pop01(t, T.gma, 0.35, 2.1)
        shadow(x, 965, FLOOR, 160)
        K.fam(x, t, 'capricorn', { x: 965, y: stand(190), s: 190, pop: gk, mood: 'happy', look: [-1, 0], tag: 'GRANDMA', hat: '#c8d0ff', hops: K.hops(GMA) })
      }
    }
    if (t < T.fix[2] || t < T.sit[0]) shadow(x, cx, FLOOR, 170)
    K.hero(x, t, { x: cx, y: cy, s: 230, mood: cm, look, hops, scarf: '#c8d0ff' })
    hearts(x, t, T.sit[1] + 0.3, 500, SEAT - 300, { n: 7 })
    if (win(t, 17.1, T.last)) K.stars(x, t, { x: 860, y: 640, s: 160, pop: pop01(t, 17.15, 0.36, 2.1) * outK(t, [21.5, 21.75]), mood: 'happy', look: [-1, 0.6], hops: K.hops(STARS) })
    if (t > T.last) sparkles(x, t, 500, SEAT - 130, T.last + 0.6, 12, 240, 3)
    void [RED, BONE, clamp]
  },
  cues: [
    ...[0.5, 1.0].map(s => ['tick', s, 0.04]),
    ...T.fixed.flatMap(f => [['pop', f, 1318.51, 0.05, 0], ['bell', r3(f + 0.05), 1760, 0.03, 1.0, 0], ['tick', f, 0.06]]),
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.fix[0] + 0.2 + i * 0.2), 0.02]),
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.fix[1] + 0.3 + i * 0.25), 0.04]),
    ...[0, 1, 2].map(i => ['pluck', r3(T.fix[2] + 0.3 + i * 0.5), 2637, 0.025, 0.2, 0.6]),
    ...T.pat.map(p => ['pop', p, 987.77, 0.035, -0.3]),
    ['pop', T.gma, 739.99, 0.04, 0.4], ['whoosh', T.sit[0], 0.5, 0.03], ['pluck', T.sit[1], 1174.66, 0.04, 0.6, 0], ['glitter', T.sit[1] + 0.3, T.sit[1] + 0.8],
    ['pluck', 18.0, 2349.32, 0.015, 0.3, 0.3],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
