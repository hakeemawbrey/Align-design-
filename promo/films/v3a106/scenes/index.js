// v3a106: zodiac.advice444 (star_advice), ADVICE SOLO, "How to love | a Virgo." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): small, specific ways to love a Virgo, one gag each.
//   0.0–3.6    "How to love | *a Virgo.*"
//   3.6–37.8   nine cards: show up when you said (6:59) · thank them for the tiny stuff (you refilled the tape?!)
//              · done beats perfect (a crooked frame: GOOD ENOUGH) · a date with an actual plan (BOOKED)
//              · rest without guilt (TO-DO: NOTHING) · hear the whole worry list (item 47 of 48)
//              · keep the dishes promise · tell them they're enough (NO EDITS) · a label maker that prints I LIKE YOU
//  37.8        ending (group): "Small details. | *Huge love.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo'
const GREEN = '#9be58a'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const TAPE = ['..KKKK..', '.KSSSSK.', 'KSSKKSSK', 'KSKWWKSK', 'KSSKKSSK', '.KSSSSK.', 'BBBBBBBBB']
const TAPE_C = { K: INK, S: SKYB, W: WHITE, B: '#8a8a9e' }
const PLATES = ['.WWWWWWW.', 'WWWWWWWWW', '.SSSSSSS.', 'WWWWWWWWW', '.SSSSSSS.', 'WWWWWWWWW', '.WWWWWWW.']
const PLATES_C = { W: WHITE, S: SKYB }
const COUCH = ['.RRRRRRRRRR.', '.RRRRRRRRRR.', 'RRWWWWWWWWRR', 'RRWWWWWWWWRR', 'RRRRRRRRRRRR', '.K........K.']
const COUCH_C = { R: GREEN, W: '#c9f2bd', K: INK }
// a picture frame that wobbles level, then gives up a little
function frame(x, cx, cy, k, ang) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(ang); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -95, 240, 190); x.fillStyle = WOOD; x.fillRect(-112, -87, 224, 174)
  x.fillStyle = SKYB; x.fillRect(-92, -67, 184, 134)
  x.fillStyle = GREEN; x.beginPath(); x.moveTo(-92, 67); x.lineTo(-20, -10); x.lineTo(40, 40); x.lineTo(92, 0); x.lineTo(92, 67); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(50, -30, 18, 0, 7); x.fill()
  x.restore()
}
// a long worry list unrolling down to the floor
function scroll(x, cx, top, len, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-84, -6, 168, len + 12); x.fillStyle = WHITE; x.fillRect(-78, 0, 156, len)
  x.fillStyle = '#b9b0d0'; for (let y = 20; y < len - 10; y += 22) x.fillRect(-62, y, 100 + ((y * 7) % 24), 6)
  x.fillStyle = INK; x.fillRect(-96, -18, 192, 24); x.fillStyle = WOOD; x.fillRect(-92, -14, 184, 16)
  x.restore()
}
// a label maker printing a strip
function labelMaker(x, cx, cy, k, strip, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (strip > 0.01) {
    x.font = `700 32px ${MONO}`; const full = x.measureText(text).width + 40, w = full * strip
    x.fillStyle = INK; x.fillRect(84, -32, w + 8, 64); x.fillStyle = WHITE; x.fillRect(88, -28, w, 56)
    x.save(); x.beginPath(); x.rect(88, -28, w, 56); x.clip(); x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, 108, 2); x.restore()
  }
  x.fillStyle = INK; x.fillRect(-90, -70, 180, 140); x.fillStyle = GREEN; x.fillRect(-82, -62, 164, 124)
  x.fillStyle = '#21184a'; x.fillRect(-64, -48, 128, 40)
  x.fillStyle = INK; for (let i = 0; i < 8; i++) x.fillRect(-60 + (i % 4) * 32, 6 + Math.floor(i / 4) * 24, 22, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Show up | *when you said.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 780, 820, 'YOU SAID: 7:00', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 940, 'YOU CAME: 6:59', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 940, P.t0 + 1.2, 7, 190, 0.4)
    } },
  { sign: S, cap: 'Thank them | *for the tiny stuff.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TAPE, TAPE_C, 790, 1010, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 690, 'you refilled | the tape?!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Remind them: | *done beats perfect.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const ang = lt < 1.5 ? 0.12 * Math.cos(lt * 7) * (1 - lt / 1.6) : 0.04
      frame(x, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ang)
      label(x, 780, 1080, 'GOOD ENOUGH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A date | *with an actual plan.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ YOUR MATCH', 'dinner sat | 7pm. | booked.', pop01(t, P.t0 + 0.7, 0.3, 2.2), { msgCol: GREEN, msgSize: 30 })
      label(x, 780, 1110, 'SWOON: CONFIRMED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them rest | *without guilt.*', mood: 'sleepy', look: [1, 0], star: { x: -60, y: 20, s: 260 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 480, 960, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 760, 660, 'TO-DO: NOTHING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hear the whole | *worry list.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 860, 1040, 140 * k, { mood: 'happy', look: [-1, -1], seed: 81, glyph: false })
      scroll(x, 610, 600, 80 + 520 * ease.outCubic(prog(lt, 0.3, 1.6)), k)
      label(x, 830, 740, 'ITEM 47 OF 48', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 830, 870, 'go on.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: 'Keep the promise | *about the dishes.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      table(x, 790, 1060, 280)
      drawBits(x, PLATES, PLATES_C, 790, 990, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 760, 'DONE. NOT ASKED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 990, P.t0 + 1.0, 6, 150, 0.7)
    } },
  { sign: S, cap: 'Tell them | *they’re enough.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [0, 0], star: { x: 0, y: 30, s: 320 }, hops: [1.5],
    front(x, t, lt, P) {
      label(x, 540, 620, 'ENOUGH. NO EDITS.', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 40, bg: GOLD, rot: -0.05 })
      hearts(x, t, 540, 960, P.t0 + 1.5, { n: 6, life: 1.6, spread: 360, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Speak their language: | *labels.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: { x: -250, s: 270 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      labelMaker(x, 520, 1030, 1.35 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.6, 1.5)), 'I LIKE YOU')
    } },
]

const F = makeFilm({
  id: 'v3a106', key: 'D', accent: GREEN, solo: S, ending: 'group',
  title: 'How to love | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Small details. | *Huge love.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
