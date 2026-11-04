// nh15e05: HOME FOR THE HOLIDAYS, "Leo planned an entrance" (35 s vertical, Season 15 ep 5; rows in
// promo/films/next30/b03.md; music cinematic · C). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.0    "*Leo* brings someone home. | Cue the *entrance.*"  Frame 0: Leo mid-pose in a spotlight on the doorstep;
//              the Sagittarius date taps a tiny drum. "on three…" "1… 2… 3!" Leo flings the door open.
//   4.0        inside. "Nobody | *looks.*"  Leo: "TA-DAA!" The whole family is on the floor watching the baby nephew
//              take his first wobbly steps. SISTER (Aries): "shh! he's *walking*!" Leo's spotlight slides off; Leo deflates.
//   8.0        "Then Leo | *cheers.*"  Leo kneels: "GO, LITTLE STAR! *you got this!*"
//  11.4        card cut. "First steps… | *to Leo.*"  The baby wobbles all the way to Leo. Confetti. The date melts:
//              "okay. I *really* like you." The Pisces grandpa weeps.
//  17.8        "You gave it | *away.*"  THE STARS: "you gave away the spotlight." → "*they noticed*."
//  24.0–30.5   last line "Best supporting | *star.*"
import { makeHome, drawRoom, drawHouse, drawYard, spotlight, bubble, hearts, sparkles, confetti, snow, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3 } from '../../nh15e01/homekit.js'

const LEO = tagOf('leo'), SIS = '♈︎ SISTER', SAG = tagOf('sagittarius'), STARS = 'THE STARS'
const T = { count: [1.0, 1.9, 2.6, 3.3], fling: 3.5, inside: 4.0, tada: 4.15, slide: [6.2, 6.9], kneel: [7.9, 8.3], cut: 11.4, walk: [11.5, 14.2], arrive: 14.2, last: 24.0 }
const LINES = [
  { t: 5.1, speaker: SIS, color: '#ff9a7a', text: "shh! he's *walking*!" },
  { t: 8.4, speaker: LEO, color: '#ffc06a', text: 'GO, LITTLE STAR! *you got this!*' },
  { t: 14.9, speaker: SAG, color: '#c9a6ff', text: 'okay. I *really* like you.' },
  { t: 18.3, speaker: STARS, text: 'you gave away the *spotlight*.' },
  { t: 21.2, speaker: STARS, text: '*they noticed*.' },
]

const EP = makeHome({
  id: 'nh15e05', duration: 35, hero: 'leo', date: 'sagittarius',
  heads: [
    { text: '*Leo* brings someone home. | Cue the *entrance.*', at: -1, out: [3.85, 4.0], size: 84, accentSize: 112 },
    { text: 'Nobody | *looks.*', at: T.inside + 0.6, out: [7.8, 8.0], accent: '#9fd8f6' },
    { text: 'Then Leo | *cheers.*', at: 8.05, out: [11.2, 11.4], accent: GOLD },
    { text: 'First steps… | *to Leo.*', at: 11.5, out: [17.6, 17.8], accent: PINK },
    { text: 'You gave it | *away.*', at: 17.85, out: [23.75, 23.95], accent: GOLD },
    { text: 'Best supporting | *star.*', at: T.last, out: [30.05, 30.45], size: 100, accentSize: 170, late: 1, lateAt: T.last + 0.7, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 7.95 }, { from: 1, to: 1, close: 11.3 }, { from: 2, to: 2, close: 17.6 }, { from: 3, to: 4, close: 23.8 }],
  flashes: [T.inside], shakes: [T.arrive],
  cuts: [T.inside, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < T.inside) {
      const op = ease.inOutCubic(prog(t, T.fling, T.fling + 0.35))
      drawHouse(x, t, { open: op, wall: '#7a5a3a', trim: '#6a4a30', door: '#a03a4a' })
      drawYard(x, t)
      spotlight(x, 360, 0, 330, 1350, 320, 1)
      shadow(x, 330, 1350, 200); shadow(x, 800, 1350, 180)
      K.hero(x, t, { x: 330, y: stand(260), s: 260, mood: t < T.fling ? 'sparkle' : 'happy', look: [0, 0], hops: [-0.1, ...T.count, T.fling], scarf: GOLD, squash: t < 0.6 ? -0.06 : 0 })
      K.date(x, t, { x: 800, y: stand(220), s: 220, mood: 'happy', look: [-1, 0], hops: [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2] })
      // the tiny drum
      R(x, INK, 760, stand(220) + 50, 100, 60); R(x, RED, 766, stand(220) + 56, 88, 48); R(x, BONE, 766, stand(220) + 56, 88, 12)
      const bt = Math.sin(t * 22); R(x, INK, 790 + bt * 8, stand(220) + 10, 8, 50); R(x, INK, 826 - bt * 8, stand(220) + 10, 8, 50)
      ;['on three…', '1…', '2…', '3!'].forEach((s, i) => bubble(x, t, 470, 900 - i * 10, T.count[i] - 0.6 * (i === 0), (T.count[i + 1] ?? T.inside) - 0.02, s, { size: i === 3 ? 48 : 38, tail: -0.5 }))
      snow(x, t, { n: 60 })
      return
    }
    drawRoom(x, t, { fireX: 620, treeX: 930, windowX: 90, wall: '#6a4a3a', stripe: '#735040' })
    // Leo's spotlight: on Leo, slides off onto the baby, then (at the hug) back on both
    const sl = ease.inOutCubic(prog(t, ...T.slide)), back = ease.inOutCubic(prog(t, T.arrive, T.arrive + 0.6))
    const bx = lerp(lerp(270, 600, sl), 340, back)
    spotlight(x, bx + 40, 0, bx, 1350, lerp(300, 260, sl) + back * 120, 1)
    // the baby: wobbling first steps (toward the camera, then all the way to Leo)
    const w = ease.inOutSine ? ease.inOutSine(prog(t, ...T.walk)) : prog(t, ...T.walk)
    const babyX = t < T.walk[0] ? 600 + 10 * Math.sin(t * 3) : lerp(600, 420, w)
    const wob = t < T.arrive ? 0.18 * Math.sin(t * 9) : 0
    // family on the floor, facing the baby
    K.pisces(x, t, { x: 930, y: stand(170), s: 170, tears: t > T.arrive ? 3 : 2, look: [-1, 0.5], tag: 'GRANDPA', hat: '#9fd8f6' })
    K.fam(x, t, 'aries', { x: 760, y: stand(210) + 20, s: 210, mood: t > T.arrive ? 'happy' : 'sparkle', look: [-1, 0.6], tag: 'SISTER', hops: [...K.hops(SIS), T.arrive + 0.1] })
    shadow(x, babyX, 1350, 90)
    x.save(); x.translate(babyX, 1350); x.rotate(wob); x.translate(-babyX, -1350)
    K.fam(x, t, 'leo', { x: babyX, y: stand(130), s: 130, hat: '#7fd0ff', tag: 'NEPHEW', mood: t > T.arrive ? 'heart' : 'happy', look: [-1, 0], hops: [11.6, 12.2, 12.8, 13.4, 14.0], seed: 4 })
    x.restore()
        // Leo: TA-DAA in the doorway… deflates… kneels and cheers
    const kneel = ease.inOutCubic(prog(t, ...T.kneel))
    const lx = lerp(270, 300, kneel)
    shadow(x, lx, 1350, 200)
    const lm = t < T.slide[0] ? 'sparkle' : t < T.kneel[0] ? 'neutral' : t < T.arrive ? 'happy' : 'heart'
    K.hero(x, t, { x: lx, y: stand(250) + 40 * kneel, s: 250, mood: lm, look: t < T.slide[0] ? [0, 0] : [1, 0.3], hops: [T.tada, ...K.hops(LEO), T.arrive, T.arrive + 0.5], squash: t > T.slide[1] && t < T.kneel[0] ? 0.12 : 0.08 * kneel, scarf: GOLD })
    bubble(x, t, 330, 900, T.tada, T.slide[0] + 0.2, 'TA-DAA!', { size: 50, tail: -0.2 })
    // the date watching from the doorway
    K.date(x, t, { x: 100, y: stand(170), s: 170, alpha: 0.98, mood: t > 14.6 ? 'heart' : 'happy', look: [1, 0], hops: K.hops(SAG) })
    confetti(x, t, T.arrive, 390, 1100)
    hearts(x, t, T.arrive + 0.6, 160, 1000, { n: 6 })
    if (win(t, 17.9, T.last)) K.stars(x, t, { x: 860, y: 640, s: 170, pop: pop01(t, 18.0, 0.36, 2.1) * outK(t, [23.6, 23.9]), mood: t > 21 ? 'happy' : 'neutral', look: [-1, 0.6], hops: K.hops(STARS) })
    if (t > T.last) { sparkles(x, t, 390, 1100, T.last + 0.7, 12, 240, 3); confetti(x, t, T.last + 0.7, 540, 900) }
    void [drawBits, clamp]
  },
  cues: [
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.2 + i * 0.27), 0.03]),
    ...T.count.map((c, i) => ['pop', c, [880, 987.77, 1174.66, 1567.98][i], 0.04, -0.2]),
    ['whoosh', T.fling, 0.4, 0.04], ['pop', T.tada, 1567.98, 0.05, 0], ['bell', T.tada + 0.05, 2349.32, 0.025, 0.8, 0],
    ['whoosh', T.slide[0], 0.6, 0.025], ['pluck', T.slide[1], 440, 0.04, 0.6, -0.3],
    ...[11.6, 12.2, 12.8, 13.4, 14.0].map((s, i) => ['pop', s, NOTEP(i), 0.03, 0]),
    ['pluck', T.arrive, 1174.66, 0.045, 0.6, 0], ['glitter', T.arrive, T.arrive + 0.6], ['bell', T.arrive + 0.05, 1760, 0.03, 1.2, 0],
    ['pluck', 15.2, 2349.32, 0.015, 0.3, 0.6],
    ['pop', T.last + 0.7, 1174.66, 0.05, 0], ['bell', T.last + 0.75, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.7, T.last + 1.2],
  ],
})
function NOTEP(i) { return [659.25, 739.99, 880, 987.77, 1174.66][i] }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
