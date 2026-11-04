// nh15e12: HOME FOR THE HOLIDAYS, "Pisces brings someone home" (45 s vertical, Season 15 ep 12; rows in
// promo/films/next30/b03.md; music dreamy · Ab). Story 0–40.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.6    "*Pisces* brings someone home. | Bring *tissues.*"  Frame 0: Pisces mid-sob at the front door; the Capricorn
//              date holds a tissue box out like a gift.
//   4.6–13.8   cries at (rule of three, jump cuts): *the wreath* ("it's so ROUND"), *the doormat* ("it says WELCOME"),
//              *the hallway photos* ("baby me!!").
//  13.8        card cut. "Then *everyone* | cries."  Mom (Pisces) cries, Grandma (Cancer) cries, the dog's ears droop.
//  16.8        "Capricorn: | *tissue duty.*"  The Capricorn stays calm and hands a tissue to everyone.
//  19.6        "The | *toast.*"  GRANDMA: "welcome to the family, dear." The Capricorn's lip wobbles… one single tear.
//  25.0        LESSON UNLOCKED: "Big feelings | aren't *too much* | for the right person." chip "+1 TISSUE BOX"
//  31.0        "Felt it | *with you.*"  THE STARS: "they didn't stop you feeling it." → "they *felt it with you*."
//  36.6–40.5   last line "Tissues | *for two.*"
import { makeHome, drawHouse, drawYard, drawRoom, drawTable, sofa, tissueBox, mug, bubble, label, hearts, sparkles, snow, shadow, drawBits, R, box, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, FLOOR } from '../../nh15e01/homekit.js'

const GMA = '♋︎ GRANDMA', STARS = 'THE STARS'
const T = { wreath: 4.6, mat: 7.6, hall: 10.6, all: 13.8, duty: 16.8, toss: [17.4, 18.0, 18.6], toast: 19.6, tear: 22.7, lesson: 25.0, stars: 31.0, cut: 13.8, last: 36.6 }
const LINES = [
  { t: 20.0, speaker: GMA, color: '#9fd8f6', text: 'welcome to the family, *dear*.' },
  { t: 31.3, speaker: STARS, text: "they didn't stop you *feeling it*." },
  { t: 34.0, speaker: STARS, text: 'they *felt it with you*.' },
]
const TOP = 1250
const DOG = ['E.....E', 'EE...EE', '.BB.BB.', '.BBBBB.', 'BWBBBWB', 'BKBBBKB', '.BBNBB.', '..BBB..']
const DOGDROOP = ['.......', 'E.....E', 'EBB.BBE', 'EBBBBBE', 'BWBBBWB', 'BKBBBKB', '.BBNBB.', '..BBB..']

function frame(x, cx, cy, w, h, inner) {
  R(x, INK, cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16); R(x, GOLD, cx - w / 2 - 4, cy - h / 2 - 4, w + 8, h + 8); R(x, inner, cx - w / 2, cy - h / 2, w, h)
}

const EP = makeHome({
  id: 'nh15e12', duration: 45, hero: 'pisces', date: 'capricorn',
  heads: [
    { text: '*Pisces* brings someone home. | Bring *tissues.*', at: -1, out: [4.4, 4.6], size: 82, accentSize: 110, accent: '#c9a6ff' },
    { text: 'Cries at: | *the wreath.*', at: T.wreath + 0.1, out: [7.4, 7.6], accent: '#5fd38a' },
    { text: 'Cries at: | *the doormat.*', at: T.mat + 0.1, out: [10.4, 10.6], accent: '#e0a860' },
    { text: 'Cries at: | *the hallway photos.*', at: T.hall + 0.1, out: [13.6, 13.8], accent: GOLD },
    { text: 'Then *everyone* | cries.', at: T.all + 0.1, out: [16.6, 16.8], accent: '#9fd8f6' },
    { text: 'Capricorn: | *tissue duty.*', at: T.duty + 0.05, out: [19.4, 19.6], accent: '#c8d0ff' },
    { text: 'The | *toast.*', at: T.toast + 0.1, out: [22.5, 22.7], accent: GOLD },
    { text: 'And then… | *one tear.*', at: T.tear, out: [24.8, 25.0], accent: '#8fe3ff' },
    { text: 'Felt it | *with you.*', at: T.stars, out: [36.35, 36.55], accent: PINK },
    { text: 'Tissues | *for two.*', at: T.last, out: [40.05, 40.45], size: 116, accentSize: 170, late: 2, lateAt: T.last + 0.6, wobble: true, accent: '#c9a6ff' },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 24.7 }, { from: 1, to: 2, close: 36.45 }],
  lesson: { at: T.lesson, out: [30.6, 30.85], text: 'Big feelings | aren’t *too much* | for the right person.', chip: '+1 TISSUE BOX' },
  flashes: [T.wreath, T.mat, T.hall, T.toast], shakes: [],
  cuts: [T.hall, { t: T.cut, kind: 'flip' }, T.toast],
  draw(x, t, K) {
    if (t < T.hall) {
      // the porch: wide (0–4.6), the wreath close-up (4.6–7.6), the doormat (7.6–10.6)
      const close = t >= T.wreath && t < T.mat
      drawHouse(x, t, { wall: '#5a4a7a', trim: '#4f406e', door: '#3a7a5a', zoom: close ? 1.9 : 1, cx: 540 })
      drawYard(x, t)
      if (t >= T.mat) {
        // the doormat
        R(x, INK, 330, FLOOR + 10, 420, 120); R(x, '#a0603a', 336, FLOOR + 16, 408, 108)
        x.font = "800 52px Inter, sans-serif"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WELCOME', 540, FLOOR + 72)
      }
      shadow(x, 320, 1350, 200); shadow(x, 790, 1350, 190)
      const pm = t < T.wreath ? 'sparkle' : 'wide'
      K.hero(x, t, { x: 320, y: stand(240), s: 240, mood: pm, look: close ? [1, -1] : t >= T.mat ? [1, 1] : [1, 0], tears: 3, hops: [-0.1, 1.0, 2.0, T.wreath + 0.2, T.mat + 0.2, T.mat + 1.0], tips: true, scarf: '#c9a6ff' })
      K.date(x, t, { x: 790, y: stand(230), s: 230, mood: 'neutral', look: [-1, 0], hops: [T.wreath + 0.6, T.mat + 0.6], scarf: '#c8d0ff' })
      tissueBox(x, 790 - 70, stand(230) + 50, 1.0, 1)
      bubble(x, t, 380, 900, T.wreath + 0.4, T.mat - 0.1, 'it’s so ROUND', { size: 40, tail: -0.3 })
      bubble(x, t, 380, 900, T.mat + 0.4, T.hall - 0.1, 'it says WELCOME', { size: 40, tail: -0.3 })
      snow(x, t, { n: 60 })
      return
    }
    if (t < T.all) {
      // the hallway photos
      drawRoom(x, t, { fire: false, tree: false, windowX: null, wall: '#5a4a7a', stripe: '#62527f' })
      frame(x, 280, 760, 220, 260, '#bfe8ff'); frame(x, 600, 700, 200, 200, '#ffe0c8'); frame(x, 860, 820, 180, 230, '#d8f0d0')
      drawBits(x, ['..P..', '.PPP.', 'PPPPP', '.P.P.'], { P: '#c9a6ff' }, 280, 770, 22)
      drawBits(x, ['..P..', 'PPPPP', '.P.P.'], { P: '#c9a6ff' }, 600, 710, 18)
      drawBits(x, ['.C.', 'CCC', 'C.C'], { C: '#9fd8f6' }, 860, 830, 26)
      shadow(x, 380, 1350, 200); shadow(x, 760, 1350, 190)
      K.hero(x, t, { x: 380, y: stand(240), s: 240, mood: 'sparkle', look: [-1, -1], tears: 3, hops: [T.hall + 0.3, T.hall + 1.0, T.hall + 1.7], scarf: '#c9a6ff' })
      K.date(x, t, { x: 760, y: stand(230), s: 230, mood: 'happy', look: [-1, -0.5], scarf: '#c8d0ff' })
      bubble(x, t, 330, 1010, T.hall + 0.4, T.all - 0.1, 'baby me!!', { size: 40, tail: 0 })
      return
    }
    if (t < T.toast) {
      // the living room: everyone cries; the Capricorn hands out tissues
      drawRoom(x, t, { fireX: 540, treeX: 940, windowX: 70, wall: '#5a4a7a', stripe: '#62527f' })
      sofa(x, 470, 1210, 600, '#3f6d9a')
      K.pisces(x, t, { x: 290, y: 1090, s: 200, tears: 3, tag: 'MOM', hat: PINK, look: [1, 0], hops: [T.toss[0] + 0.35] })
      K.fam(x, t, 'cancer', { x: 500, y: 1090, s: 200, tears: 3, mood: 'sparkle', tag: 'GRANDMA', hat: '#ff9aa8', look: [-1, 0], hops: [T.toss[1] + 0.35] })
      K.hero(x, t, { x: 690, y: 1100, s: 200, tears: 3, mood: 'sparkle', look: [1, 0], scarf: '#c9a6ff', hops: [T.toss[2] + 0.35] })
      const droop = t > T.all + 0.8
      drawBits(x, droop ? DOGDROOP : DOG, { E: '#8a5a3a', B: '#c08a5a', W: '#ffffff', K: INK, N: INK }, 170, 1300, 12)
      shadow(x, 900, 1350, 190)
      K.date(x, t, { x: 900, y: stand(230), s: 230, mood: t < T.duty ? 'wide' : 'neutral', look: [-1, 0], hops: T.toss, scarf: '#c8d0ff' })
      tissueBox(x, 830, stand(230) + 60, 0.9, 1)
      T.toss.forEach((s, i) => {
        const f = prog(t, s, s + 0.4)
        if (f <= 0) return
        const tx = [290, 500, 690][i], ty = 990
        const px = lerp(830, tx + 70, f), py = lerp(stand(230) - 20, ty, f) - Math.sin(Math.PI * f) * 160
        R(x, INK, px - 18, py - 22, 36, 44); R(x, '#ffffff', px - 14, py - 18, 28, 36)
      })
      return
    }
    // ── the table: the toast, the single tear, the lesson, THE STARS
    drawRoom(x, t, { fire: false, treeX: 960, windowX: 70, wall: '#5a4a7a', stripe: '#62527f' })
    const y = TOP - 115
    K.pisces(x, t, { x: 170, y, s: 190, tears: 2, tag: null, hat: PINK, look: [1, 0] })
    K.fam(x, t, 'cancer', { x: 380, y, s: 200, tears: 2, mood: 'happy', hat: '#ff9aa8', look: [1, 0], hops: K.hops(GMA) })
    K.hero(x, t, { x: 600, y, s: 210, tears: 2, mood: t > T.tear ? 'heart' : 'sparkle', look: [1, 0], scarf: '#c9a6ff', hops: [T.tear + 0.4, T.last + 0.3] })
    const tear = t > T.tear
    K.date(x, t, { x: 830, y, s: 220, mood: t < T.toast + 1.5 ? 'neutral' : tear ? 'sparkle' : 'wide', look: [-1, 0], tears: tear ? 1 : 0, squash: win(t, T.toast + 2.4, T.tear) ? 0.04 * Math.sin(t * 40) : 0, scarf: '#c8d0ff', hops: [T.tear, T.last + 0.4] })
    drawTable(x, t, { y: TOP, dishes: [{ kind: 'candle', x: 490 }, { kind: 'roast', x: 720, s: 0.8 }] })
    // the single tear, big enough to see: rolls down the Capricorn's cheek with a sparkle
    if (win(t, T.tear, T.lesson)) {
      const f = prog(t, T.tear, T.tear + 1.4)
      drawBits(x, ['.T.', 'TTT', 'TWT', '.T.'], { T: '#8fe3ff', W: '#ffffff' }, 830 - 46, y + 6 + 70 * ease.inQuad(f), 9)
      sparkles(x, t, 784, y + 10, T.tear, 6, 50, 2, ['#8fe3ff', BONE])
    }
    // the toast: Grandma's mug up
    const up = ease.outBack(prog(t, T.toast + 0.2, T.toast + 0.6))
    mug(x, 380 + 90, TOP - 40 - 120 * up, 1.2, '#9fd8f6')
    sparkles(x, t, 470, TOP - 160, T.toast + 0.6, 8, 100, 1)
    tissueBox(x, 960, TOP - 30, 0.9, 1)
    hearts(x, t, T.tear + 0.3, 720, y - 160, { n: 8 })
    if (win(t, T.stars, T.last)) K.stars(x, t, { x: 540, y: 640, s: 160, pop: pop01(t, T.stars + 0.1, 0.36, 2.1) * outK(t, [36.3, 36.55]), mood: 'happy', look: [0, 0.6], hops: K.hops(STARS) })
    if (t > T.last) sparkles(x, t, 720, y - 60, T.last + 0.6, 12, 240, 3)
    void [label, box, RED, clamp]
  },
  cues: [
    ['pluck', 0.3, 2349.32, 0.015, 0.3, -0.4], ['pluck', 1.3, 2349.32, 0.015, 0.3, -0.4],
    ['pop', T.wreath + 0.4, 1174.66, 0.04, -0.2], ['pop', T.mat + 0.4, 1318.51, 0.04, -0.2], ['pop', T.hall + 0.4, 1567.98, 0.045, -0.2],
    ...[0, 1, 2].map(i => ['pluck', r3(T.all + 0.3 + i * 0.25), [1760, 2093, 2349.32][i], 0.015, 0.3, (i - 1) * 0.5]),
    ['pluck', T.all + 0.8, 392, 0.03, 0.6, -0.5],
    ...T.toss.flatMap((s, i) => [['whoosh', s, 0.3, 0.03], ['pop', r3(s + 0.4), [987.77, 1174.66, 1318.51][i], 0.035, 0]]),
    ['pop', T.toast + 0.4, 1318.51, 0.045, 0], ['bell', T.toast + 0.45, 2093, 0.025, 1.0, 0],
    ['bell', T.tear, 1760, 0.03, 1.4, 0.3], ['glitter', T.tear + 0.3, T.tear + 0.8],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
