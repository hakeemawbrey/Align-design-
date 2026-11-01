// trstorydare: STORYTIME: HOW WE MET, "My friend dared me to answer the talk card honestly." (45 s vertical, Star Talk
// Trends §19.2, music: cinematic · Em). Story 0–40.6, then the shared end card. The format look lives in ./story.js
// (identical in all five STORYTIME films). ♏ Scorpio tells it from the couch; ♓ Pisces cries on the other end. Rewatch
// bait: the plants on the windowsill are wearing tiny knitted hats from frame 0.
//   0.0–5.6    "My friend dared me | to be *honest.*"  "I'm a Scorpio. I do *mysterious.*"
//   5.6–13.9   FLASHBACK, FIRST DATE · 7:10 PM. "First date. | *Talk card.*"  A café; Scorpio in sunglasses, ♋ Cancer
//              across the table, a talk card between them: "What's your secret hobby?" Behind a potted plant at the back,
//              ♐ Sagittarius (the friend) pops up with a sign: DARE: BE HONEST. Scorpio's cool answer loads: "…the night."
//   13.9–18.4  "Then I saw | *the sign.*"  "my friend. behind a *plant.*"
//  18.38       card cut.
//   18.4–27.8  FLASHBACK, 7:12 PM. "So I told | *the truth.*"  The sunglasses slide down, sweat: "I knit tiny hats… for
//              my plants." * chirp * … * chirp *. Then Cancer: "can you make one for my cactus?" Heart eyes. The sign
//              flips: DARE: WON.
//   27.8–33.4  "Eleven hats | *later.*"  Cancer pops onto the couch in a knitted hat; Pisces has one too.
//              "our plants have *hats.* all of them."
//   33.4       LESSON UNLOCKED: "Honesty is | *attractive.*"  +1 PLANT HAT
//   37.95      "*Dare* accepted."
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, drawCafe, drawTalkCard, pop01, outK, r3,
  GOLD, BONE, PINK, INK, MONO, FR,
} from './story.js'

const ACC = '#ffa65c'
const HAT = ['...WW...', '..RRRR..', '.RWWWWR.', 'RRRRRRRR', 'WWWWWWWW']
const hatCols = c => ({ W: '#fff1c8', R: c })
const drawHat = (x, cx, cy, cell, col = ACC, rot = 0) => drawBits(x, HAT, hatCols(col), cx, cy, cell, { rot })
const POT = ['.LL.LL..', 'LLLLLLL.', '.LLLLLLL', 'LLLLLL..', '..LLL...', 'PPPPPPPP', '.PPPPPP.', '.PPPPPP.', '..PPPP..']
function plant(x, cx, cy, cell, hatCol, t, i = 0) {
  drawBits(x, POT, { L: '#5fd38a', P: '#c8643c' }, cx, cy, cell)
  drawHat(x, cx - cell * 0.5, cy - cell * 5.3 + Math.sin(t * 2 + i) * 1.5, cell * 0.8, hatCol, 0.12 * Math.sin(t * 1.3 + i))
}
// sunglasses on a star sprite (cells); dy slides them down the face
function shades(x, F, dy = 0) {
  inSprite(x, F, () => {
    x.fillStyle = '#100a24'; x.fillRect(9.4, 16.6 + dy, 8, 5.4); x.fillRect(18.6, 16.6 + dy, 8, 5.4); x.fillRect(17.2, 17.4 + dy, 1.6, 1.2)
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(10.4, 17.4 + dy, 2, 1); x.fillRect(19.6, 17.4 + dy, 2, 1)
  })
}
function sweat(x, t, F, k) {
  if (k <= 0) return
  for (let i = 0; i < 3; i++) {
    const ph = ((t * 1.1 + i / 3) % 1)
    drawBits(x, ['.S.', 'SSS', 'SWS', '.S.'], { S: '#8fe3ff', W: '#fff' }, F.x + F.S * (0.32 + 0.06 * i), F.cy - F.S * 0.2 + ph * 90, 6, { alpha: k * (1 - ph) })
  }
}

// ── the café (both flashbacks)
const SCO = { x: 300, y: 1020, s: 240 }, CAN = { x: 780, y: 1020, s: 240 }, SAG = { x: 540, y: 860, s: 150 }
function sagPlant(x, t) {   // a big potted plant at the back wall (the friend hides behind it)
  drawBits(x, ['..L....L..', '.LLL..LLL.', 'LLLLLLLLLL', '.LLLLLLLL.', 'LLLLLLLLLL', '.LLLLLLLL.', '..LLLLLL..', '...PPPP...', '...PPPP...', '...PPPP...'], { L: '#3fae6a', P: '#c8643c' }, SAG.x, 900, 20)
}
function cafe(x, t, lt, A, flash2) {
  drawCafe(x, t, FR, { lamps: [0.18, 0.82] })
  // the friend: pops up over the plant with the sign
  const up = flash2 ? 1 : ease.outBack(prog(lt, A.sag, A.sag + 0.35))
  const ty = SAG.y + 40 - up * 170
  const sagMood = flash2 ? (lt < 3.4 ? 'wide' : lt < 7.0 ? 'squint' : 'sparkle') : 'wink'
  if (up > 0.01) signChar(x, t, 'sagittarius', SAG.x, ty, SAG.s, { mood: sagMood, seed: 7, hops: flash2 ? [18.378 + 7.0, 18.378 + 7.4, 18.378 + 7.8] : [5.6 + A.sag + 0.4, 5.6 + 6.2, 5.6 + 6.6] })
  sagPlant(x, t)
  if (up > 0.01) {
    const won = flash2 && lt > 7.0
    const shake = !flash2 && lt > 6 ? 0.06 * Math.sin(lt * 18) : 0
    label(x, SAG.x, ty - 118, won ? 'DARE: WON' : 'DARE: BE HONEST', up * (won ? pop01(lt, 7.0, 0.3, 2.6) : 1), { size: 36, bg: won ? '#7dffb0' : BONE, rot: -0.05 + shake })
  }
}
const F1 = { sag: 2.3, card: 0.9, cool: 4.6 }
function flash1(x, t, lt) {
  cafe(x, t, lt, F1, false)
  const sF = signChar(x, t, 'scorpio', SCO.x, SCO.y, SCO.s, { mood: lt > F1.sag + 0.6 ? 'wide' : 'neutral', look: lt > F1.sag + 0.6 ? [1, -1] : [1, 0], seed: 4, hops: [5.6 + 0.5, 5.6 + F1.cool] })
  shades(x, sF)
  signChar(x, t, 'cancer', CAN.x, CAN.y, CAN.s, { mood: 'happy', look: [-1, 0], seed: 8, hops: [5.6 + 0.7, 5.6 + 1.6] })
  x.save(); drawCafeTable(x); x.restore()
  drawTalkCard(x, 540, 1185, 250, "What's your | secret hobby?", { k: easeIn(lt, F1.card), rot: -0.04, accent: GOLD })
  bubble(x, SCO.x + 10, 840, '…the night.', pop01(lt, F1.cool, 0.3, 2.2), { size: 40, tail: 'bl', col: '#2a1f55', color: BONE })
}
const easeIn = (lt, at) => pop01(lt, at, 0.35, 2)
function drawCafeTable(x) {
  x.fillStyle = INK; x.fillRect(FR.x, 1120, FR.w, 12)
  x.fillStyle = '#b8434f'; x.fillRect(FR.x, 1130, FR.w, 170)
  x.fillStyle = 'rgba(255,255,255,0.14)'; x.fillRect(FR.x, 1130, FR.w, 14)
  x.fillStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < FR.w; i += 60) x.fillRect(FR.x + i, 1144, 30, 160)
}
const F2 = { slide: [0.6, 1.2], say: 1.5, sayOut: 5.2, chirp: [3.5, 5.2], ask: 5.4, heart: 6.4 }
function flash2(x, t, lt) {
  cafe(x, t, lt, F1, true)
  const heart = lt > F2.heart
  const sF = signChar(x, t, 'scorpio', SCO.x, SCO.y, SCO.s, { mood: heart ? 'heart' : lt > F2.ask ? 'wide' : 'squint', look: [1, 0], seed: 4, hops: [18.378 + F2.say, 18.378 + F2.heart, 18.378 + F2.heart + 0.5] })
  shades(x, sF, ease.inOutCubic(prog(lt, ...F2.slide)) * 5.5)
  sweat(x, t, sF, clamp(prog(lt, 0.4, 0.8)) * (1 - clamp(prog(lt, F2.heart - 0.3, F2.heart))))
  signChar(x, t, 'cancer', CAN.x, CAN.y, CAN.s, { mood: heart ? 'heart' : lt > F2.chirp[0] ? 'neutral' : 'happy', look: lt > F2.chirp[0] && lt < F2.ask ? [0, 1] : [-1, 0], seed: 8, hops: [18.378 + F2.ask, 18.378 + F2.ask + 0.4, 18.378 + F2.heart] })
  drawCafeTable(x)
  drawTalkCard(x, 540, 1185, 250, "What's your | secret hobby?", { k: 1, rot: -0.04, accent: GOLD })
  bubble(x, SCO.x + 20, 840, 'I knit tiny hats… | for my plants.', pop01(lt, F2.say, 0.3, 2.2) * outK(lt, [F2.sayOut, F2.sayOut + 0.2]), { size: 38, tail: 'bl' })
  if (lt > F2.chirp[0] && lt < F2.chirp[1]) {
    const ck = Math.sin(Math.PI * prog(lt, ...F2.chirp))
    label(x, 800, 620, '* chirp *', ck, { size: 34, bg: '#9fe6b0', font: MONO, weight: 700, rot: 0.06 })
    label(x, 300, 640, '* chirp *', Math.sin(Math.PI * prog(lt, F2.chirp[0] + 0.6, F2.chirp[1])), { size: 30, bg: '#9fe6b0', font: MONO, weight: 700, rot: -0.08 })
  }
  bubble(x, CAN.x + 10, 840, 'can you make one | for my cactus?', pop01(lt, F2.ask, 0.3, 2.2), { size: 38, tail: 'br', col: '#ffe0b8' })
  if (heart) hearts(x, t, 540, 1000, 18.378 + F2.heart, { n: 8, life: 2, spread: 600, cell: 8, seed: 5 })
  sparkles(x, t, SAG.x, 700, 18.378 + 7.0, 10, 160, 1, ['#7dffb0', GOLD, BONE])
}

// the room: three hatted plants on the windowsill (from frame 0)
function room(x, t) {
  plant(x, 150, 762, 9, ACC, t, 0)
  plant(x, 245, 762, 9, '#8fe3ff', t, 1)
  plant(x, 340, 762, 9, '#ff8fb1', t, 2)
}
// the framed photo: the talk card itself
function photo(x, cx, cy, w, h, t) {
  x.fillStyle = '#3a2440'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  drawTalkCard(x, cx, cy + 4, 120, 'secret | hobby?', { accent: GOLD })
}

const F = makeFilm({
  id: 'trstorydare', key: 'Em', seed: 1902, accent: ACC,
  narrator: 'scorpio', partner: 'cancer',
  heads: [
    'My friend dared me | to be *honest.*',
    'First date. | *Talk card.*',
    'Then I saw | *the sign.*',
    'So I told | *the truth.*',
    'Eleven hats | *later.*',
  ],
  stamps: [null, 'FIRST DATE · 7:10 PM', null, 'FIRST DATE · 7:12 PM', null],
  lines: [
    { t: 1.2, text: "I'm a Scorpio. I do *mysterious.*" },
    { t: 6.0, text: 'talk card: my *secret* hobby.' },
    { t: 9.8, text: 'I had a cool answer *ready.*' },
    { t: 14.3, text: 'my friend. behind a *plant.*' },
    { t: 19.0, text: 'so I told the *truth.*' },
    { t: 23.9, text: 'they asked for a *cactus hat.*' },
    { t: 28.75, text: 'our plants have *hats.* all of them.' },
  ],
  hops: [16.0],
  mood(t) {
    if (t < 3.2) return { mood: 'squint' }
    if (t < 5.6) return { mood: 'wink' }
    if (t < 8.0) return { mood: 'neutral', look: [-1, -0.4] }
    if (t < 13.93) return { mood: 'squint', look: [-1, -0.4] }
    if (t < 18.38) return { mood: 'wide' }
    if (t < 23.9) return { mood: 'wide', look: [-1, -0.5] }
    if (t < 27.82) return { mood: 'heart' }
    if (t < 37.95) return { mood: 'happy', look: t < 31 ? [1, 0] : undefined }
    return { mood: 'heart' }
  },
  partnerIn: 28.3,
  partnerMood: t => ({ mood: t < 31 ? 'happy' : 'sparkle', look: t < 31 ? [-1, 0] : undefined }),
  room, photo,
  flash: [flash1, flash2],
  talk(x, t, K) {
    if (K.pF) drawHat(x, K.pF.x, K.pF.top - 18, 11, ACC, 0.08)
    // Pisces gets a hat too
    if (t >= 28.3) {
      const pin = ease.inOutCubic(prog(t, 28.2, 28.75))
      drawHat(x, lerp(905, 975, pin), lerp(1150, 1120, pin) - lerp(150, 120, pin) * 0.42 - 8, 6, '#c9a6ff', -0.1)
    }
  },
  lesson: { text: 'Honesty is | *attractive.*', chip: '+1 PLANT HAT' },
  last: { text: '*Dare* accepted.' },
  music: { breakdown: [13.933], hits: [27.822] },
  cues: [
    ['whoosh', r3(5.6 + F1.card), 0.3, 0.03], ['pluck', r3(5.6 + F1.card + 0.3), 1174.66, 0.035, 0.4, 0],
    ['whoosh', r3(5.6 + F1.sag), 0.3, 0.035], ['pop', r3(5.6 + F1.sag + 0.3), 880, 0.045, 0], ['pop', r3(5.6 + F1.sag + 0.4), 1318.51, 0.035, 0],
    ['pluck', r3(5.6 + F1.cool), 293.66, 0.04, 0.6, -0.3],
    ...[6.2, 6.6].map(d => ['tick', r3(5.6 + d), 0.04]),
    ['whoosh', r3(18.378 + F2.slide[0]), 0.3, 0.02], ['tick', r3(18.378 + F2.slide[1]), 0.04],
    ['pop', r3(18.378 + F2.say), 783.99, 0.04, -0.3],
    ...[0, 0.09, 0.6, 0.69, 1.2, 1.29].map(d => ['pluck', r3(18.378 + F2.chirp[0] + 0.1 + d), 2637, 0.012, 0.1, 0.3]),
    ['pop', r3(18.378 + F2.ask), 987.77, 0.045, 0.3], ['pluck', r3(18.378 + F2.heart), 1174.66, 0.045, 0.5, 0], ['pluck', r3(18.378 + F2.heart + 0.12), 1567.98, 0.04, 0.5, 0],
    ['pop', r3(18.378 + 7.0), 1318.51, 0.05, 0], ['glitter', r3(18.378 + 7.0), r3(18.378 + 7.4)],
    ['pop', 30.0, 1046.5, 0.03, 0.4],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const T = F.T
export const LINES = F.LINES
