// nhve07: THEN vs NOW: HOLIDAYS, "Libra's holidays in 2016 / 2026" (18 s, b18 #7, music: dreamy · Ab)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·21·2016"): ♎ Libra at a shop shelf, six gifts in its arms, wobbling at t = 0.
//             "this one? or THIS one?" It buys all six. At ♒ Aquarius' door: "do you… like any?" Aquarius, under the
//             pile: "…all of them?" ♓ Pisces in the shop queue, crying.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: cocoa on a snowy bench. Libra, notebook out: "what would make you feel loved this year?"
//             Aquarius: "a slow walk. no phones." Libra writes it down: "done." Hearts. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "guessing is cute. *asking is love.*"  Last line: "*Asked*, not guessed."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, gift, sign, mug, beanie, scarf, mark, nightSky, snowGround, snowfall, door, tree, RED, GREEN, CREAM, INTER } from '../../nhve01/scenes/holkit.js'

const LIB = signStar('libra'), AQU = signStar('aquarius')
const SIX = [[RED, GOLD], ['#3fa05a', RED], ['#7fd0ff', '#ffffff'], ['#ff8fb1', GOLD], [GOLD, RED], ['#a35cf0', '#9fe6b0']]

function shelf(x) {
  R(x, INK, 40, 200, 820, 430); R(x, '#a8784c', 46, 206, 808, 418)
  for (let j = 0; j < 3; j++) { R(x, INK, 46, 330 + j * 140, 808, 12); for (let i = 0; i < 7; i++) gift(x, 110 + i * 110, 326 + j * 140, 70, 60 + (i % 3) * 12, { col: SIX[(i + j) % 6][0], rib: SIX[(i + j) % 6][1] }) }
}

// ── THEN: 2016
const A = { this: 1.2, THIS: 1.85, buy: 2.8, door: 3.7, like: 4.1, pile: 4.8, all: 5.3 }
function sceneA(x, t) {
  const atDoor = t > A.door
  if (!atDoor) {
    room(x, t, { now: false, wall: '#6a3a5a', wall2: '#74405f' })
    shelf(x)
    pisces(x, t, 780, 760, 120, 3, { mood: 'wide', look: [-1, 0], seed: 6 })
    sign(x, 600, 140, t > A.buy ? 'CHECKOUT: 6 ITEMS' : 'GIFTS', { size: 32, col: '#fff3c8', rot: -0.04, k: t > A.buy && t < A.buy + 0.3 ? pop01(t, A.buy, 0.3, 3) : 1 })
  } else {
    nightSky(x, t); snowGround(x, 760)
    door(x, 640, 760, { w: 220, h: 420, open: 0.8 })
  }
  // ♒ Aquarius at the door, then buried
  if (atDoor) {
    const bury = prog(t, A.pile, A.pile + 0.3)
    drawStarChar(x, 640, 660, 190, t, { color: AQU.color, glyph: AQU.glyph, mood: t > A.all ? 'wide' : 'happy', look: [-1, 0], seed: 11, hops: [A.door + 0.2, A.all] })
    if (bury > 0) SIX.forEach(([c, r], i) => gift(x, 580 + (i % 3) * 60, 790 - Math.floor(i / 3) * 70 - (1 - bury) * 300, 80, 66, { col: c, rib: r, rot: (i - 2.5) * 0.12 }))
  }
  // ♎ Libra with six gifts, wobbling
  const lx = atDoor ? 330 : 300, ly = 740
  const wob = 0.12 * Math.sin(t * 5)
  const lH = [A.this, A.THIS, A.buy, A.door + 0.1, A.like]
  drawStarChar(x, lx, ly, 220, t, { color: LIB.color, glyph: LIB.glyph, mood: t > A.like ? 'sparkle' : t > A.THIS ? 'wide' : 'squint', look: atDoor ? [1, 0] : [0, 1], seed: 3, hops: lH, squash: 0.05 * Math.sin(t * 5) })
  bangs(x, starFrame(lx, ly, 220, t, { hops: lH, seed: 3 }))
  if (t < A.pile) {
    x.save(); x.translate(lx + 190, ly + 150); x.rotate(wob)
    SIX.forEach(([c, r], i) => gift(x, (i % 2 ? 40 : -40) + (i === 2 && t > A.THIS && t < A.buy ? 50 : 0), -i * 62, 100 - (i % 3) * 12, 56, { col: c, rib: r, rot: (i % 2 ? 0.06 : -0.06) }))
    x.restore()
  }
  speech(x, t, 300, 330, A.this, 'this one?', { size: 38, tail: 0, life: 0.65, col: '#fffaf0' })
  speech(x, t, 340, 330, A.THIS, 'or THIS one?', { size: 42, tail: 0, life: 0.85, col: '#ffe36a' })
  speech(x, t, 300, 330, A.like, 'do you…\nlike any?', { size: 40, tail: 0, life: 1.2, col: '#fffaf0' })
  speech(x, t, 660, 430, A.all, '…all of them?', { size: 38, tail: 1, life: 1.3, col: '#e9fff0' })
}

// ── NOW: 2026
const B = { note: 7.1, ask: 7.4, walk: 9.15, write: [10.1, 10.9], done: 11.0, hug: 11.6 }
function sceneB(x, t) {
  nightSky(x, t, { col: '#24306a', col2: '#2c3878' })
  tree(x, t, 780, 700, 360, { now: true })
  snowGround(x, 700)
  // the bench
  R(x, INK, 120, 820, 660, 30); R(x, WOODC, 126, 824, 648, 20); R(x, INK, 150, 850, 20, 120); R(x, INK, 730, 850, 20, 120)
  R(x, INK, 120, 740, 660, 24); R(x, WOODC, 126, 744, 648, 14)
  pisces(x, t, 830, 900, 110, t > B.hug ? 3 : 2, { mood: t > B.hug ? 'happy' : 'sparkle', look: [-1, -1], seed: 6 })
  const lH = [B.note, B.ask, B.done], aH = [B.walk, B.hug]
  drawStarChar(x, 290, 740, 210, t, { color: LIB.color, glyph: LIB.glyph, mood: t > B.hug ? 'heart' : t > B.walk ? 'sparkle' : 'happy', look: t > B.write[0] && t < B.done ? [0, 1] : [1, 0], seed: 3, hops: lH })
  scarf(x, starFrame(290, 740, 210, t, { hops: lH, seed: 3 }), '#ff8fb1')
  drawStarChar(x, 580, 740, 210, t, { color: AQU.color, glyph: AQU.glyph, mood: t > B.hug ? 'heart' : t > B.ask + 1.0 ? 'happy' : 'sparkle', look: [-1, 0], seed: 11, hops: aH })
  beanie(x, starFrame(580, 740, 210, t, { hops: aH, seed: 11 }), '#7fd0ff')
  mug(x, t, 470, 820, { col: '#ff8fb1', s: 0.8 }); mug(x, t, 700, 820, { col: '#9fe6ff', s: 0.8 })
  // the notebook
  const nk = pop01(t, B.note, 0.3)
  if (nk > 0.02) {
    x.save(); x.translate(330, 900); x.scale(nk, nk); x.rotate(-0.06)
    R(x, INK, -110, -70, 220, 140); R(x, '#fffaf0', -104, -64, 208, 128); for (let i = 0; i < 4; i++) R(x, '#c9d8ff', -96, -36 + i * 26, 192, 3)
    const n = Math.floor(prog(t, ...B.write) * 22)
    x.fillStyle = INK; x.font = `700 17px ${INTER}`; x.textAlign = 'left'; x.fillText('slow walk. no phones.'.slice(0, n), -94, -14)
    x.restore()
  }
  speech(x, t, 330, 470, B.ask, 'what would make you\nfeel loved this year?', { size: 34, tail: -1, life: 1.75, col: '#fffaf0' })
  speech(x, t, 600, 480, B.walk, 'a slow walk.\nno phones.', { size: 38, tail: 1, life: 1.75, col: '#e9fff0' })
  speech(x, t, 300, 500, B.done, 'done.', { size: 46, tail: -1, life: 1.0, col: '#ffe36a' })
  if (t > B.hug) hearts(x, t, 440, 600, B.hug, { n: 6, life: 1.3, cell: 6, spread: 280 })
  snowfall(x, t, { n: 22, seed: 7 })
}
const WOODC = '#9a5f38'

const EP = makeThenNow({
  id: 'nhve07', thing: 'Libra’s holidays in', then: '2016', stamp: '12·21·2016', accent: '#ffb0f0',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: 'Libra in 2016 bought *every option.*' },
    { t: 7.6, text: 'Libra in 2026 *just asks.*' },
    { t: 12.92, text: 'guessing is cute. *asking is love.*' },
  ],
  last: '*Asked*, | not guessed.',
  cues: () => [
    ['pop', A.this, 783.99, 0.03, -0.3], ['pop', A.THIS, 1046.5, 0.04, -0.3], ['tick', A.buy, 0.06], ['pop', r3(A.buy + 0.05), 1318.51, 0.035, 0.2],
    ['whoosh', A.door - 0.15, 0.3, 0.03], ['pop', A.like, 880, 0.03, -0.3],
    ...[0, 1, 2, 3, 4, 5].map(i => ['tom', r3(A.pile + i * 0.05), 160 + i * 10, { gain: 0.1, decay: 0.12 }]), ['pop', A.all, 587.33, 0.03, 0.4],
    ['tick', B.note, 0.05], ['pop', B.ask, 880, 0.03, -0.3], ['pop', B.walk, 1046.5, 0.035, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(B.write[0] + i * 0.13), 0.025]),
    ['pop', B.done, 1318.51, 0.04, -0.2], ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3], ['glitter', B.hug, r3(B.hug + 0.4)],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
