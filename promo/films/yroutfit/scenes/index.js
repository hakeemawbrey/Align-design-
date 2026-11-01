// yroutfit: THEN vs NOW, "Date outfit in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §16, music: funk · E)
// Story 0–15.6, then the shared end card. The format engine is ./yrkit.js (identical in every Block D film).
//   THEN (old-phone footage, 08·14·2016): ♉ Taurus films a pre-date selfie in a bedroom under fairy lights, side bangs
//     over one eye.  1.71 the FLOWER CROWN filter blooms on (and lags a beat behind every hop).  3.38 the bangs flick…
//     and fall straight back.  TAURUS: "bangs stay. seeing is *optional*."  5.04 the date texts "here!": Taurus jumps,
//     the filter glitches to DOG EARS + tongue: "NOT the dog!!"  ♓ Pisces sobs in the corner ("so pretty").
//   6.71 card cut → NOW: Taurus in a huge striped knit sweater, sneakers, bangs clipped back, warm mug. Three tags pop:
//     "sweater: soft" · "sneakers: walkable" · "bangs: retired". ♋ the date hops in, heart-eyed:
//     "you look so *comfy*. I love it."  Taurus glows.
//   12.27 payoff: the 2016 polaroid (crown + bangs) drops in top-left. THE STARS: "cute then. *comfier* now."
//   13.38 last line: "*Comfy* is the look."
import { makeThenNow, drawBits, bubble, label, star, pisces, heart, sparkles, inSprite, starFrame, bodyPath, R, INK, BONE, GOLD, PINK, CREAM, INTER,
  signStar, prog, ease, lerp, clamp, r3, BEAT, pop01, outK, easeOutBack } from './yrkit.js'

const TAU = signStar('taurus'), CAN = signStar('cancer')
const ME = { x: 540, y: 940, s: 380 }
const PIS0 = { x: 878, y: 1236, s: 120 }
const HAIR = '#5b3420', HAIR_HI = '#8a5634'

// ── THEN props (sprite cells)
const FLOWERS = [[11.2, 11.4, '#ff8fb1'], [14.4, 9.4, '#d9a8ff'], [18, 8.4, '#ffb38a'], [21.6, 9.4, '#ff8fb1'], [24.8, 11.4, '#d9a8ff']]
function crown(x, k) {
  // leaves first, then the blooms (each a 3×3 plus with a yellow heart)
  x.fillStyle = '#5fbf6a'
  for (let i = 0; i < FLOWERS.length - 1; i++) { const [a, b] = FLOWERS[i], [c, d] = FLOWERS[i + 1]; x.fillRect((a + c) / 2 - 0.6, (b + d) / 2 - 0.2, 1.4, 1) }
  FLOWERS.forEach(([fx, fy, col], i) => {
    const s = clamp(k * 5 - i * 0.8)
    if (s <= 0) return
    x.save(); x.translate(fx, fy); x.scale(s, s)
    x.fillStyle = INK; x.fillRect(-2, -1.2, 4, 2.4); x.fillRect(-1.2, -2, 2.4, 4)
    x.fillStyle = col; x.fillRect(-1.5, -0.6, 3, 1.2); x.fillRect(-0.6, -1.5, 1.2, 3)
    x.fillStyle = '#ffe36a'; x.fillRect(-0.55, -0.55, 1.1, 1.1)
    x.restore()
  })
}
function bangs(x, flick) {
  x.save(); x.translate(20, 6); x.rotate(-1.0 * flick); x.translate(-20, -6)
  const pts = [[14, 3.8], [21.5, 6.5], [21, 10.5], [17.6, 14.5], [15.6, 21.6], [10.4, 22.6], [8.6, 18.4], [10.2, 12.6]]
  x.fillStyle = INK; x.beginPath(); pts.forEach(([a, b], i) => { const ax = a + (a - 15) * 0.07, by = b + (b - 13) * 0.06; i ? x.lineTo(ax, by) : x.moveTo(ax, by) }); x.closePath(); x.fill()
  x.fillStyle = HAIR; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.fill()
  x.fillStyle = HAIR_HI; x.fillRect(15, 6, 4, 0.8); x.fillRect(13.5, 10, 4, 0.8); x.fillRect(12, 14.5, 3.2, 0.8); x.fillRect(11, 18.5, 2.5, 0.8)
  x.restore()
}
function dogFace(x, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= clamp(k * 3)
  for (const d of [-1, 1]) {
    const ex = 18 + d * 10.5
    x.fillStyle = INK; x.fillRect(ex - 3, 6, 6, 11)
    x.fillStyle = '#a8683a'; x.fillRect(ex - 2.3, 6.7, 4.6, 9.6)
    x.fillStyle = '#e8a6a0'; x.fillRect(ex - 1.1, 8.6, 2.2, 6)
  }
  x.fillStyle = INK; x.fillRect(16.4, 21.4, 3.2, 2.2)
  const wag = Math.sin(k * 40) * 0.3
  x.fillStyle = INK; x.fillRect(16.6 + wag, 23.6, 2.8, 4.2); x.fillStyle = '#ff6f8e'; x.fillRect(17.1 + wag, 23.6, 1.8, 3.6)
  x.restore()
}

// ── NOW props
function sweater(x) {
  x.save(); bodyPath(x, 0.25); x.clip()
  x.fillStyle = '#f1e3c4'; x.fillRect(0, 23.2, 36, 14); x.fillRect(0, 10, 7.6, 12); x.fillRect(28.4, 10, 7.6, 12)
  x.fillStyle = '#7fbf86'; for (const y of [27, 31]) x.fillRect(0, y, 36, 1.4)
  x.fillStyle = '#d8c6a0'; for (let i = 0; i < 36; i += 2) x.fillRect(i, 33.4, 1, 3)
  x.fillStyle = '#d8c6a0'; x.fillRect(0, 23.2, 36, 1.4); x.fillRect(6.6, 10, 1, 12); x.fillRect(28.4, 10, 1, 12)
  x.restore()
  x.fillStyle = INK; x.fillRect(5, 23, 26, 0.5)
}
function clip(x) {
  x.fillStyle = INK; x.fillRect(15.4, 3.6, 5.6, 2.2)
  x.fillStyle = GOLD; x.fillRect(15.8, 4, 4.8, 1.4)
  x.fillStyle = HAIR; x.fillRect(16.4, 1.4, 3.6, 2.4)
}
const MUG = ['.KKKK..', 'WWWWWK.', 'WGGGWKK', 'WWWWW.K', 'WGGGWKK', 'WWWWWK.', '.WWW...']
const SNEAK = ['..WWWW..', '.WWBBWW.', 'WWWWWWWW', 'RRRRRRRR']
const STEAM = ['.S.', 'S..', '.S.', '..S']

const EP = makeThenNow({
  thing: 'Date outfit', thenYear: '2016', stamp: '08·14·2016', clock: 'PM 7:42',
  thenBack(x, t) {
    // a bedroom wall with fairy lights and a dresser edge
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#3a2350'); g.addColorStop(0.6, '#5a3466'); g.addColorStop(1, '#2a1838')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    x.fillStyle = 'rgba(255,220,240,0.06)'; for (let j = 0; j < 30; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2 === 0) x.fillRect(i * 96 + 40, j * 70 + 20, 8, 8)
    // fairy lights: a sagging string
    x.strokeStyle = '#2a1830'; x.lineWidth = 4; x.beginPath()
    for (let i = 0; i <= 24; i++) { const u = i / 24, px = u * 1080, py = 560 + Math.sin(u * Math.PI) * 80 + Math.sin(u * Math.PI * 3) * 14; i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    for (let i = 1; i < 12; i++) {
      const u = i / 12, px = u * 1080, py = 560 + Math.sin(u * Math.PI) * 80 + Math.sin(u * Math.PI * 3) * 14
      const on = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7)
      const c = ['#ffd36a', '#ff9ec4', '#9fe6ff'][i % 3]
      const gg = x.createRadialGradient(px, py + 14, 0, px, py + 14, 46); gg.addColorStop(0, c + '88'); gg.addColorStop(1, c + '00')
      x.globalAlpha = on; x.fillStyle = gg; x.fillRect(px - 46, py - 32, 92, 92); x.globalAlpha = 1
      R(x, INK, px - 8, py + 2, 16, 24); R(x, c, px - 5, py + 5, 10, 18)
    }
    // a dresser edge at the bottom
    R(x, '#2b1a20', 0, 1300, 1080, 400); R(x, '#6b4630', 0, 1290, 1080, 22); R(x, '#8a5e40', 0, 1290, 1080, 6)
  },
  then(x, t) {
    const T = EP.T
    const crownAt = BEAT(2), flick = BEAT(5), dog = BEAT(8)
    const hops = [0.45, crownAt + 0.9, crownAt + 1.25, flick, dog + 0.05, dog + 0.4]
    // ♓ Pisces in the corner on the dresser, sniffling (sobbing once the dog arrives)
    pisces(x, t, PIS0.x, PIS0.y, PIS0.s, { tears: t > dog + 0.3 ? 3 : 2, mood: t > dog + 0.3 ? 'happy' : 'sparkle', look: [-1, -1] })
    if (t > 1.0 && t < dog) bubble(x, PIS0.x - 20, PIS0.y - 118, 'so pretty', { k: pop01(t, 1.0, 0.3, 2), size: 24, tail: 0 })
    // the selfie arm: a chunky older phone held up at the left
    let mood = 'wink', look
    if (t > flick + 0.45 && t < dog) mood = 'happy'
    if (t > dog && t < dog + 0.35) mood = 'wide'
    if (t > dog + 0.35) { mood = 'wide'; look = [1, 1] }
    const opts = { color: TAU.color, glyph: TAU.glyph, mood, look, hops, seed: 3, glow: 1 }
    const F = star(x, ME.x, ME.y, ME.s, t, opts, { sweat: t > dog ? 2 : 0 })
    // the flower crown filter lags behind the face (tracks the frame from 0.14 s ago)
    const ck = prog(t, crownAt, crownAt + 0.5) * (t < dog + 0.1 ? 1 : 0)
    if (ck > 0) { const Fl = starFrame(ME.x, ME.y, ME.s, t - 0.14, opts); inSprite(x, Fl, () => crown(x, ck)) }
    // the bangs flick up, then fall back
    const fUp = ease.outCubic(prog(t, flick, flick + 0.18)), fDown = ease.outBounce ? ease.outBounce(prog(t, flick + 0.45, flick + 0.8)) : ease.outCubic(prog(t, flick + 0.45, flick + 0.8))
    inSprite(x, F, () => bangs(x, fUp * (1 - fDown)))
    // the dog filter glitch
    if (t > dog + 0.1) {
      const gl = t < dog + 0.4 && Math.floor(t * 30) % 2 === 0
      inSprite(x, F, () => { if (gl) crown(x, 1); dogFace(x, prog(t, dog + 0.1, dog + 0.3)) })
    }
    // sparkle filter bits floating around the crown
    if (ck > 0.5 && t < dog) for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#fff3b0' }, ME.x + Math.cos(i * 1.9) * 210, ME.y - 150 - ph * 200, 6, { alpha: Math.sin(Math.PI * ph), outline: null }) }
    // the date's text arrives on the phone
    if (t > dog - 0.05) {
      const k = pop01(t, dog - 0.05, 0.3, 2.2)
      bubble(x, 300, 640, 'here! :)', { k, size: 30, col: '#9fe6ff', tail: 1 })
    }
    if (t > dog + 0.55) bubble(x, ME.x + 210, ME.y - 230, 'NOT the dog!!', { k: pop01(t, dog + 0.55, 0.28, 2.4), size: 34, tail: -1 })
    if (t > flick && t < flick + 0.6) label(x, '*flick*', ME.x + 200, ME.y - 210, { size: 34, col: '#fff1c8', font: INTER, weight: 800, rot: 0.15 })
    // filter chip
    const fk = pop01(t, crownAt + 0.1, 0.3, 2)
    if (fk > 0.01) bubble(x, 540, 1340, t > dog + 0.1 ? 'filter: DOG' : 'filter: flower crown', { k: fk, size: 26, col: t > dog + 0.1 ? '#ffd0a0' : '#ffd6ec' })
    void T
  },
  snap: { at: 2.9, cx: 540, cy: 900, size: 620 },
  now(x, t, lt, P) {
    const T = EP.T
    const tags = [r3(T.cut + 0.6), r3(T.cut + 1.1), r3(T.cut + 1.6)]
    const dateIn = r3(T.cut + 2.0), glow = r3(T.cut + 3.9)
    // ♓ Pisces, now in a sweater too, crying happy tears at the left
    pisces(x, t, 150, 1290, 140, { tears: t > glow ? 3 : 2, mood: 'happy', pop: pop01(t, T.cut + 0.3, 0.3, 2) })
    const hops = [T.cut + 0.25, dateIn + 0.5, glow, glow + 0.45, T.last + 0.1]
    const mood = t > glow ? 'heart' : t > dateIn + 0.3 ? 'sparkle' : 'happy'
    const mx = lerp(ME.x, 430, ease.inOutCubic(prog(t, dateIn - 0.2, dateIn + 0.4)))
    const opts = { color: TAU.color, mood, hops, seed: 3, glow: 1.1, pop: pop01(t, T.cut + 0.05, 0.35, 1.8) }
    const F = star(x, mx, ME.y, ME.s, t, opts)
    inSprite(x, F, () => { sweater(x); clip(x) })
    // sneakers + the warm mug
    drawBits(x, SNEAK, { W: '#f6efe2', B: '#7fbf86', R: '#c9b28a' }, mx - 104, ME.y + 182, 9)
    drawBits(x, SNEAK, { W: '#f6efe2', B: '#7fbf86', R: '#c9b28a' }, mx + 104, ME.y + 182, 9, { sx: -1 })
    drawBits(x, MUG, { K: INK, W: '#f6efe2', G: '#7fbf86' }, mx + 168, F.cy + 30, 9)
    for (let i = 0; i < 2; i++) { const ph = (t * 0.6 + i * 0.5) % 1; drawBits(x, STEAM, { S: 'rgba(255,255,255,0.7)' }, mx + 160 + i * 18, F.cy - 40 - ph * 70, 6, { alpha: Math.sin(Math.PI * ph), outline: null }) }
    // three tags (the third is the callback)
    const TG = [['sweater: soft', mx - 250, 700, -0.06], ['sneakers: walkable', mx + 60, 1262, 0.04], ['bangs: retired', mx + 220, 660, 0.07]]
    TG.forEach(([s, tx, ty, rot], i) => {
      const k = pop01(t, tags[i], 0.3, 2.4) * outK(t, [T.pay - 0.2, T.pay + 0.1])
      if (k <= 0.01) return
      x.save(); x.translate(tx, ty); x.rotate(rot); bubble(x, 0, 0, s, { k, size: 30, col: i === 2 ? GOLD : CREAM, maxW: 360 }); x.restore()
    })
    // ♋ the date hops in, heart-eyed, also comfy
    if (t > dateIn) {
      const e = easeOutBack(prog(t, dateIn, dateIn + 0.45), 1.5)
      const dx = lerp(1260, 850, e)
      star(x, dx, ME.y + 80, 230, t, { color: CAN.color, glyph: CAN.glyph, mood: t > dateIn + 0.5 ? 'heart' : 'wide', look: [-1, 0], hops: [dateIn + 0.45, glow + 0.2], seed: 8, glow: 1 })
      if (t > glow && t < T.pay + 0.4) for (let i = 0; i < 3; i++) { const ph = ((t - glow) * 0.6 + i / 3) % 1; heart(x, 640 + i * 60, ME.y - 120 - ph * 220, 4, { alpha: Math.sin(Math.PI * ph) }) }
    }
    sparkles(x, t, mx, ME.y, glow, 12, 240, 1, [GOLD, '#7fbf86', BONE])
    void lt; void P
  },
  lines: [
    { t: 3.0, speaker: `${TAU.glyph}︎ TAURUS`, color: '#ffd98a', text: 'bangs stay. seeing is *optional*.' },
    { t: 9.15, speaker: `${CAN.glyph}︎ THE DATE`, color: '#9fe6ff', text: 'you look so *comfy*. I love it.' },
  ],
  starsLine: 'cute then. *comfier* now.',
  last: '*Comfy* is the look.', lastAccent: '#9fe6b0',
  cues: T => [
    // the crown blooms (five little pops)
    ...Array.from({ length: 5 }, (_, i) => ['pop', r3(BEAT(2) + 0.05 + i * 0.08), [1318.51, 1479.98, 1661.22, 1479.98, 1318.51][i], 0.025, (i - 2) * 0.15]),
    ['glitter', r3(BEAT(2)), r3(BEAT(2) + 0.5)],
    // the flick + the flop
    ['whoosh', BEAT(5), 0.2, 0.03], ['tom', r3(BEAT(5) + 0.55), 140, { gain: 0.14, decay: 0.15 }],
    // the date's text, the glitch, the dog
    ['pop', r3(BEAT(8) - 0.05), 1567.98, 0.04, -0.4], ['pop', r3(BEAT(8) + 0.02), 1975.53, 0.03, -0.4],
    ...[0.12, 0.17, 0.22, 0.27, 0.32].map(d => ['tick', r3(BEAT(8) + d), 0.04]),
    ['pluck', r3(BEAT(8) + 0.35), 392, 0.04, 0.4, 0.2], ['pop', r3(BEAT(8) + 0.58), 1174.66, 0.04, 0.2],
    // NOW: three tags, the date hops in, Taurus glows
    ...[0.6, 1.1, 1.6].map((d, i) => ['pop', r3(T.cut + d), [987.77, 1174.66, 1567.98][i], 0.035, 0.2 * (i - 1)]),
    ['whoosh', r3(T.cut + 1.95), 0.3, 0.03], ['pop', r3(T.cut + 2.4), 880, 0.03, 0.4],
    ['bell', r3(T.cut + 3.9), 1760, 0.03, 1.0, 0], ['glitter', r3(T.cut + 3.9), r3(T.cut + 4.4)],
  ],
})
void PINK

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
