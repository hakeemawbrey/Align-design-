// trgrwmcancer: GET READY WITH ME, Cancer: "Practice makes *Pisces*." (30 s vertical, Star Talk Trends §4, music: pop · D)
// Story 0–25.6, then the shared end card. The format look lives in ./grwm.js (identical in all five GRWM films).
//   0.0–6.9    "Talk card | *rehearsal.*"  7:00 PM. ♋ Cancer faces a standing vanity mirror (its reflection copies it):
//              "ok mirror. we're practicing." Card one drops in: "Morning person or night owl?" → "morning! I make tea for
//              everyone." The reflection nods. Sticker: "nailed it."
//   7.0–13.7   "Card two. | *Uh oh.*"  7:20. "What's your comfort meal?" → "my grandma's soup. she'd hum while—" The sniffles
//              start, in the mirror too. "I'm fine. it's the onions." Sticker: "there are no onions."
//  13.9        card cut.
//  14.0–20.2   "Card three. | *The big one.*"  7:45. "What does a perfect lazy Sunday look like for you?" → "someone to come
//              home to, and…" FOUNTAINS, Cancer and the reflection both, and Pisces in the window. THE STARS: "sweetie,
//              that was the practice round." Sticker: "tissues: gone."
//  20.2–22.3   the turn: the phone buzzes; the date's text: "fair warning: I cry at everything. hope that's ok :)"
//  22.3–25.5   "Practice makes | *Pisces.*"  The reflection turns into Pisces; both cry happily. Sticker: "crying: mutual."
// One canvas (room + props + stars), DOM type + dialogue box + bug + clock, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, FONTS, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, buildClock, drawRoom, drawTable, drawNotif, drawSticker, drawSpiral, WIN, TABLE_Y,
} from './grwm.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAN = signStar('cancer'), PIS = signStar('pisces')
const ACC = '#8fdcff'

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.15, h0Land: 0.75, h0Out: [6.7, 6.9],
  canIn: 0.3, card1: 2.82, nailed: 5.4, nailedOut: [6.6, 6.85],
  h1: 7.0, h1Out: [13.45, 13.65], card2: 7.15, sniff: 9.0, stream: 10.0, onions: 11.95, onionsOut: [13.3, 13.55],
  cut: 13.9,
  h2: 14.0, h2Out: [20.05, 20.25], card3: 14.15, spiral: 14.6, sob: 16.4, starsIn: 17.1, starsOut: [20.0, 20.3], tissues: 18.3,
  cardsOut: [20.0, 20.3],
  buzz: [20.25, 20.55], notif: 20.6, notifOut: [22.3, 22.6], stop: 20.7, heart: 21.45,
  morph: [22.2, 22.6], h3: 22.45, h3Land: 23.05, mutual: 23.5,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const CSP = `${CAN.glyph}︎ CANCER`, SPEAK = 'THE STARS'
const LINES = [
  { t: 0.9, speaker: CSP, color: ACC, text: "ok mirror. we're *practicing.*" },
  { t: 3.6, speaker: CSP, color: ACC, text: 'morning! I make tea for *everyone.*' },
  { t: 7.9, speaker: CSP, color: ACC, text: "my grandma's soup. she'd hum *while—*" },
  { t: 10.55, speaker: CSP, color: ACC, text: "I'm fine. it's the *onions.*" },
  { t: 14.9, speaker: CSP, color: ACC, text: 'someone to come home to, *and…*' },
  { t: 17.5, speaker: SPEAK, text: 'sweetie, that was the *practice* round.' },
]
const CPS = 30
const BOX1 = { open: 0.75, close: 12.95 }, BOX2 = { open: 14.7, close: 20.15 }
const CLOCK = [[0, '7:00'], [T.h1, '7:20'], [T.h2, '7:45'], [T.notif, '7:52']]
const CARDS = [{ img: 'card-talk-2.png', at: T.card1, out: T.h1 - 0.1 }, { img: 'card-talk-5.png', at: T.card2, out: T.cut - 0.4 }, { img: 'card-talk-3.png', at: T.card3, out: T.cardsOut[0] }]

// layout
const CAN_P = { x: 470, y: 980, s: 280 }
const MIR = { cx: 835, cy: 930, rx: 150, ry: 215 }
const REF_P = { x: MIR.cx + 10, y: 990, s: 200 }
const CARD = { cx: 190, cy: 985, w: 210 }
const STARS_P = { x: 610, y: 1185, s: 130 }
const PIS_P = { x: WIN.x + 120, y: WIN.y + 170, s: 120 }

const CAN_HOPS = [T.canIn + 0.3, ...talkHops(LINES, CSP, { cps: CPS }), T.sob, T.heart, T.h3Land]
const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]

/** Cancer's state (the reflection copies it) */
function canState(t) {
  let mood = 'happy', look = [1, 0], tears = 0
  if (t > T.card1) { mood = 'neutral'; look = [-1, 0] }
  if (t > LINES[1].t) { mood = 'happy'; look = [1, 0] }
  if (t > T.card2) { mood = 'neutral'; look = [-1, 0] }
  if (t > LINES[2].t) { mood = 'sparkle'; look = [1, 0] }
  if (t > T.sniff) tears = 1
  if (t > T.stream) { tears = 2; mood = 'wide' }
  if (t > LINES[3].t) { mood = 'squint'; look = [1, 0] }
  if (t > T.h2) { tears = 0; mood = 'neutral'; look = [-1, 0] }
  if (t > LINES[4].t) { mood = 'sparkle'; look = [1, 0] }
  if (t > T.sob) { tears = 3; mood = 'wide'; look = [1, -1] }
  if (t > T.notif) { tears = 2; mood = 'wide'; look = [0, -1] }
  if (t > T.heart) { tears = 2; mood = 'heart'; look = undefined }
  if (t > T.h3Land) { tears = 3; mood = 'happy' }
  return { mood, look, tears }
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const imgs = await Promise.all(CARDS.map(c => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + c.img })))

  const root = el('div', { position: 'absolute', inset: 0, overflow: 'hidden', background: '#140c2c' }, stage)
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Talk card | *rehearsal.*', { top: 172, size: 104, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Card two. | *Uh oh.*', { top: 178, size: 104, accentSize: 150, at: T.h1, gap: 0.1, accentColor: GOLD })
  const H2 = popText(root, 'Card three. | *The big one.*', { top: 178, size: 104, accentSize: 142, at: T.h2, gap: 0.1, accentColor: '#ff8fa0' })
  const H3 = popText(root, 'Practice makes | *Pisces.*', { top: 172, size: 104, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#a9a3ff' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 4), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(4), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { at: T.clock, keys: CLOCK, date: '8:00' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function pisces(t) {
    let tears = 1, mood = 'sparkle'
    if (t > T.h1) tears = 2
    if (t > T.sob) { tears = 3; mood = 'wide' }
    if (t > T.notif) { tears = 3; mood = 'happy' }
    const P = { ...PIS_P, x: PIS_P.x + 6 * Math.sin(t * 0.9) }
    const opts = { color: PIS.color, mood, look: mood === 'happy' ? undefined : [1, 1], seed: 6, glow: 0.8, pop: pop01(t, 1.2, 0.4, 2), hops: [T.sob + 0.1, T.h3Land] }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(x, t, tears))
  }

  function cancer(t) {
    const k = pop01(t, T.canIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    const s = canState(t)
    const opts = { color: CAN.color, glyph: CAN.glyph, mood: s.mood, look: s.look, hops: CAN_HOPS, pop: k, seed: 7, glow: 1.15, squash: t > T.sob && t < T.sob + 0.35 ? 0.12 : 0 }
    drawStarChar(x, CAN_P.x, CAN_P.y, CAN_P.s, t, opts)
    inSprite(x, starFrame(CAN_P.x, CAN_P.y, CAN_P.s, t, opts), () => tearsCells(x, t, s.tears))
  }

  /** the standing vanity mirror; the reflection copies Cancer (mirrored), then turns into Pisces */
  function mirror(t) {
    const k = pop01(t, T.canIn + 0.15, 0.4, 1.8) * popOut(t, T.out)
    if (k <= 0.02) return
    x.save(); x.translate(MIR.cx, MIR.cy); x.scale(k, k); x.translate(-MIR.cx, -MIR.cy)
    // stand
    x.fillStyle = INK; x.fillRect(MIR.cx - 14, MIR.cy + MIR.ry, 28, TABLE_Y - MIR.cy - MIR.ry); x.fillRect(MIR.cx - 70, TABLE_Y - 18, 140, 18)
    x.fillStyle = '#c99a6a'; x.fillRect(MIR.cx - 7, MIR.cy + MIR.ry, 14, TABLE_Y - MIR.cy - MIR.ry - 6); x.fillRect(MIR.cx - 62, TABLE_Y - 13, 124, 8)
    // frame: pixel oval rings
    const C = 10
    for (let j = -MIR.ry - 30; j <= MIR.ry + 30; j += C) for (let i = -MIR.rx - 30; i <= MIR.rx + 30; i += C) {
      const d = Math.hypot((i + C / 2) / (MIR.rx + 14), (j + C / 2) / (MIR.ry + 14))
      if (d > 0.93 && d < 1.07) { x.fillStyle = d < 0.96 || d > 1.04 ? INK : (i + j) % 40 === 0 ? '#fff1c8' : GOLD; x.fillRect(MIR.cx + i, MIR.cy + j, C, C) }
    }
    // glass + the reflection (clipped)
    x.save(); x.beginPath(); x.ellipse(MIR.cx, MIR.cy, MIR.rx, MIR.ry, 0, 0, Math.PI * 2); x.clip()
    const g = x.createLinearGradient(MIR.cx - MIR.rx, MIR.cy - MIR.ry, MIR.cx + MIR.rx, MIR.cy + MIR.ry)
    g.addColorStop(0, '#5a4a8e'); g.addColorStop(1, '#2e2358'); x.fillStyle = g; x.fillRect(MIR.cx - MIR.rx, MIR.cy - MIR.ry, MIR.rx * 2, MIR.ry * 2)
    const m = ease.inOutCubic(prog(t, ...T.morph))
    const s = canState(t)
    const look = s.look ? [-s.look[0], s.look[1]] : undefined
    const sq = m > 0 && m < 1 ? 0.25 * Math.sin(m * Math.PI * 3) : 0
    if (m < 0.5) {
      const opts = { color: CAN.color, mood: s.mood, look, hops: CAN_HOPS, seed: 7, glow: 0.7, alpha: 0.85, squash: sq }
      drawStarChar(x, REF_P.x, REF_P.y, REF_P.s, t, opts)
      inSprite(x, starFrame(REF_P.x, REF_P.y, REF_P.s, t, opts), () => tearsCells(x, t, s.tears))
    } else {
      const opts = { color: PIS.color, glyph: PIS.glyph, mood: t > T.h3Land ? 'happy' : 'sparkle', look: [-1, 0], hops: [T.morph[1], T.h3Land + 0.1], seed: 6, glow: 0.9, squash: sq }
      drawStarChar(x, REF_P.x, REF_P.y, REF_P.s, t, opts)
      inSprite(x, starFrame(REF_P.x, REF_P.y, REF_P.s, t, opts), () => tearsCells(x, t, 3))
    }
    // glass sheen
    x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(MIR.cx - MIR.rx + 30, MIR.cy - MIR.ry + 40, 18, 160); x.fillRect(MIR.cx - MIR.rx + 58, MIR.cy - MIR.ry + 70, 10, 90)
    x.restore()
    x.restore()
    sparkles(x, t, MIR.cx, MIR.cy, T.morph[0] + 0.2, 12, 170, 2, ['#a9a3ff', BONE, GOLD])
  }

  function cards(t) {
    CARDS.forEach((c, i) => {
      const im = imgs[i]
      if (!im || t < c.at) return
      const k = easeOutBack(prog(t, c.at, c.at + 0.4), 1.4), o = ease.inCubic(prog(t, c.out, c.out + 0.3))
      if (o >= 1) return
      const w = CARD.w, h = w * im.height / im.width
      const cx = lerp(-200, CARD.cx, k) - o * 60, cy = lerp(700, CARD.cy, k) + o * 900, rot = lerp(-0.7, -0.07, k) + o * 0.5 + 0.02 * Math.sin(t * 2)
      x.save(); x.translate(cx, cy); x.rotate(rot)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 16, w, h)
      x.drawImage(im, -w / 2, -h / 2, w, h)
      x.restore()
    })
  }

  function theStars(t) {
    const k = pop01(t, T.starsIn, 0.36, 2.1) * outK(t, T.starsOut)
    if (k <= 0.02) return
    drawStarChar(x, STARS_P.x, STARS_P.y + (1 - k) * 80, STARS_P.s, t, { color: STAR.sky, mood: t > T.tissues ? 'happy' : 'neutral', look: [-1, -0.6], hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
    // the STARS' tissue (offered up)
    if (t > T.tissues) drawBits(x, ['.WW.', 'WWWW', 'WWWW', 'BBBB', 'BBBB'], { W: '#ffffff', B: ACC }, STARS_P.x - 95, STARS_P.y - 30 + (1 - k) * 80, 8 * pop01(t, T.tissues, 0.3, 2))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      drawRoom(x, t, { ring: 1, inWindow: (_, tt) => pisces(tt) })
      mirror(t)
      cancer(t)
      cards(t)
      drawTable(x, t, { phone: { cx: 300, buzz: T.buzz } })
      theStars(t)
      drawSpiral(x, t, CAN_P.x, CAN_P.y - 60, { from: T.spiral, stop: T.stop, R: 230, tokens: ['sniff', '…', '!', 'sob', '?', 'sniff', '!!', '…'], cols: [ACC, BONE, '#a9a3ff', GOLD] })
      // each card's question, readable
      drawSticker(x, t, { at: T.card1 + 0.35, out: T.h0Out, text: '“Morning person or *night owl?*”', cx: 540, cy: 640, rot: -0.03, size: 38, bg: '#fff1c8' })
      drawSticker(x, t, { at: T.card2 + 0.35, out: [T.cut - 0.55, T.cut - 0.35], text: '“What’s your *comfort meal?*”', cx: 540, cy: 640, rot: 0.03, size: 38, bg: '#fff1c8' })
      drawSticker(x, t, { at: T.card3 + 0.35, out: T.cardsOut, text: '“Your perfect *lazy Sunday?*”', cx: 540, cy: 640, rot: -0.03, size: 38, bg: '#fff1c8' })
      drawSticker(x, t, { at: T.nailed, out: T.nailedOut, text: 'nailed *it.*', cx: 700, cy: 1205, rot: 0.06 })
      drawSticker(x, t, { at: T.onions, out: T.onionsOut, text: 'there are *no onions.*', cx: 540, cy: 1205, rot: -0.03, size: 40 })
      drawSticker(x, t, { at: T.tissues, out: T.h2Out, text: 'tissues: *gone.*', cx: 330, cy: 1205, rot: 0.04, size: 40 })
      drawNotif(x, t, { at: T.notif, out: T.notifOut, text: 'fair warning: I cry at everything. hope that’s ok :)', cy: 560 })
      drawSticker(x, t, { at: T.mutual, out: T.out, text: 'crying: *mutual.*', cx: 540, cy: 1540, rot: -0.04, size: 48 })
      if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, CAN_P.x, CAN_P.y - 40, T.heart, 10, 200, 3, ['#ff4f86', BONE, GOLD])
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between card two and card three)
const CUTS = [6.95, { t: T.cut, kind: 'flip' }, 20.22]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => [...Array.from({ length: 7 }, (_, i) => ['tick', +(t0 + i * 0.045).toFixed(3), 0.05]), ['tom', t0, 70, { gain: 0.12, decay: 0.2 }]]
const sniff = t0 => [['pluck', t0, 1567.98, 0.02, 0.15, 0.2], ['pluck', t0 + 0.12, 1760, 0.02, 0.15, 0.2]]
export const CUES = [
  ...wordPops(T.h0, 2, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.canIn + 0.05, 880, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock + 0.05, 0.04],
  ...CARDS.flatMap(c => [['whoosh', c.at, 0.4, 0.04], ['pluck', c.at + 0.4, 1318.51, 0.035, 0.5, -0.3], ['whoosh', c.out + 0.1, 0.3, 0.025]]),
  ...CARDS.map((c, i) => ['pop', c.at + 0.35, NOTE[i * 2], 0.03, 0]), ['pop', T.nailed, 1567.98, 0.04, 0.3], ['bell', T.nailed + 0.05, 2349.32, 0.02, 0.8, 0.3],
  ['tick', T.h1, 0.06], ...wordPops(T.h1, 4, 0.1, 2, 0.024),
  ...sniff(T.sniff), ...sniff(T.stream), ...sniff(T.stream + 0.9), ['pop', T.onions, 659.25, 0.035, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.h2, 0.06], ...wordPops(T.h2, 5, 0.1, 1, 0.024),
  ['riser', T.spiral, T.sob, 0.025], ['boom', T.sob, 0.18], ['glitter', T.sob, T.sob + 0.5], ...sniff(T.sob + 0.3), ...sniff(T.sob + 1.2),
  ['pop', T.starsIn + 0.05, 739.99, 0.04, 0.2], ['pop', T.tissues, 1318.51, 0.035, -0.2],
  ...buzz(T.buzz[0]), ...buzz(T.buzz[1]), ['pop', T.notif + 0.05, 1174.66, 0.05, 0], ['bell', T.notif + 0.15, 1760, 0.03, 1.0, 0],
  ['whoosh', T.stop + 0.1, 0.5, 0.03], ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ['whoosh', T.morph[0], 0.4, 0.035], ['pop', T.morph[1], 1567.98, 0.045, 0.4], ['glitter', T.morph[0] + 0.2, T.morph[1] + 0.3],
  ...wordPops(T.h3, 2, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0], ['bell', T.h3Land + 0.05, 1760, 0.035, 1.2, 0],
  ['pop', T.mutual, 1318.51, 0.035, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
