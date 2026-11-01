// trwrongsay: WRONG ANSWERS ONLY, "What do you say on a first date?" (20 s vertical, Star Talk Trends §17,
// music: chiptune · B). Story 0–15.6, then the shared end card. The format look lives in ./wrongkit.js (identical in all five).
//   0.0–2.3    hook: the question card "What do you say on | a *first date?*" pops, the tape slaps on, ♈ ♑ ♊ hop.
//   2.3–5.0    ♈ ARIES "So… who's *winning?*"  A pixel scoreboard: ARIES 1 · DATE 0, then 2, then 3. The date:
//              "…winning what?"
//   5.0–7.7    ♑ CAPRICORN "Here's my *five-year plan.*"  A scroll unrolls to the floor: YEAR 1 dessert, YEAR 2 a second
//              date, YEAR 3 a dog?, YEAR 4 a bigger dog. "questions at the end."
//   7.7        card cut.
//   7.7–10.6   ♊ GEMINI (the unhinged third) "Everything. *At once.*"  A storm of topic bubbles (dogs! space? bread…),
//              and the date is a Gemini too, talking right back; a "4 HOURS LATER" timestamp.
//   10.6       the turn: THE STARS: "ahem. the real one?"
//   11.75      THE STARS: "*Ask* them things."  13.0 RIGHT ANSWER stamp. In the middle: two stars and a talk card
//              ("What made you smile today?"); one asks, the other lights up.
import { makeWrong, drawStarChar, R, box, bubble, label, shadow, sparkles, hearts, table, drawBits, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, RED, INTER, MONO, PAPER, T } from './wrongkit.js'

const mate = (SIGN, seed) => (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1, ...o })
const libra = mate(signStar('libra'), 11), sag = mate(signStar('sagittarius'), 13), gem2 = mate(signStar('gemini'), 17)
const cancer = mate(signStar('cancer'), 19), leo = mate(signStar('leo'), 21)

// ── ANSWER 1: the scoreboard
function ans1(x, t, S) {
  const { u, t0, t1, hero } = S
  const CX = 540, top = 440
  box(x, CX - 300, top, 600, 250, '#1a1430', { b: 8 })
  R(x, '#2a2150', CX - 290, top + 10, 580, 50)
  x.save(); x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffe27a'; x.fillText('FIRST DATE', CX, top + 46)
  x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText('ARIES', CX - 150, top + 100); x.fillText('DATE', CX + 150, top + 100)
  const sc = u < 0.9 ? 1 : u < 1.5 ? 2 : 3
  const bump = [0.9, 1.5].some(b => u > b && u < b + 0.2) ? 1.25 : 1
  x.font = `700 ${Math.round(96 * bump)}px ${MONO}`; x.fillStyle = '#ff6b5a'; x.fillText(String(sc), CX - 150, top + 205)
  x.font = `700 96px ${MONO}`; x.fillStyle = '#7fd0ff'; x.fillText('0', CX + 150, top + 205)
  x.restore()
  R(x, '#3a2d66', CX - 4, top + 70, 8, 160)
  // Aries, fired up
  shadow(x, 330, 1150, 210)
  hero(x, t, { x: 330, y: 960, s: 240, mood: 'sparkle', look: [1, -0.5], hops: [t0 + 0.3, t0 + 0.88, t0 + 1.48, t0 + 1.8, t0 + 2.1] })
  bubble(x, t, 330, 760, t0 + 0.5, t1, 'point: me!', { size: 34, tail: 0, col: '#ffe27a' })
  // the date: baffled
  shadow(x, 790, 1150, 180)
  libra(x, t, { x: 790, y: 990, s: 200, mood: u > 1.7 ? 'wide' : 'neutral', look: [-1, -0.3], hops: [t0 + 1.75] })
  bubble(x, t, 790, 800, t0 + 1.8, t1, '…winning what?', { size: 32, tail: 0 })
}

// ── ANSWER 2: the five-year plan
function ans2(x, t, S) {
  const { u, t0, t1, hero } = S
  const CX = 360, top = 430
  const unroll = ease.outCubic(prog(u, 0.2, 1.4))
  const L = 30 + 680 * unroll
  box(x, CX - 200, top, 400, L, PAPER, { b: 6 })
  box(x, CX - 230, top - 26, 460, 34, '#a07850', { b: 6 })
  box(x, CX - 230, top + L - 4, 460, 34, '#a07850', { b: 6 })
  const rows = [['YEAR 1', 'dessert'], ['YEAR 2', 'a second date'], ['YEAR 3', 'a dog?'], ['YEAR 4', 'a bigger dog'], ['YEAR 5', 'see year 1']]
  x.save(); x.beginPath(); x.rect(CX - 200, top, 400, L); x.clip()
  rows.forEach(([a, b], i) => {
    const y = top + 70 + i * 128
    x.font = `700 24px ${MONO}`; x.fillStyle = '#7a3a9a'; x.fillText(a, CX - 170, y)
    x.font = `italic 500 42px 'EB Garamond'`; x.fillStyle = INK; x.fillText(b, CX - 170, y + 48)
    R(x, 'rgba(120,150,210,0.45)', CX - 180, y + 70, 360, 3)
  })
  x.restore()
  // Capricorn presents
  shadow(x, 720, 1150, 200)
  hero(x, t, { x: 720, y: 950, s: 230, mood: u > 1.8 ? 'happy' : 'squint', look: [-1, -0.3], hops: [t0 + 0.25, t0 + 1.4, t0 + 1.85] })
  bubble(x, t, 730, 730, t0 + 1.85, t1, 'questions at the end.', { size: 32, tail: 0 })
  // the date peeks in from the edge, eyes wide
  const dk = ease.outBack(prog(u, 0.9, 1.3))
  sag(x, t, { x: lerp(1160, 960, dk), y: 1080, s: 150, mood: 'wide', look: [-1, -1] })
}

// ── ANSWER 3: everything, at once
const TOPICS = ['dogs!', 'space?', 'my cousin', 'ok but bread', 'aliens', 'wait', 'jazz??', 'my 3rd grade teacher', 'clouds', 'soup!', 'anyway', 'birds']
function ans3(x, t, S) {
  const { u, t0, t1, hero } = S
  shadow(x, 330, 1150, 200); shadow(x, 760, 1150, 200)
  const chat = [0.3, 0.55, 0.8, 1.05, 1.3, 1.55, 1.8, 2.05, 2.3].map(c => t0 + c)
  hero(x, t, { x: 330, y: 960, s: 220, mood: 'sparkle', look: [1, -0.4], hops: chat })
  gem2(x, t, { x: 760, y: 960, s: 220, mood: 'sparkle', look: [-1, -0.4], hops: chat.map(c => c + 0.12) })
  TOPICS.forEach((s, i) => {
    const at = t0 + 0.25 + i * 0.17
    const side = i % 2 ? 1 : -1
    const bx = 540 + side * (80 + (i * 53) % 230) + Math.sin(t * 2 + i) * 8, by = 470 + ((i * 97) % 330)
    bubble(x, t, bx, by, at, t1, s, { size: 28, tail: side * -0.4, col: i % 2 ? '#d6f7e4' : BONE, rot: side * 0.05 })
  })
  const lk = pop01(t, t0 + 1.7, 0.3, 2.4)
  if (lk > 0.01) { x.save(); x.translate(540, 1210); x.scale(lk, lk); box(x, -200, -32, 400, 64, '#ffe27a', { b: 5 }); x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('4 HOURS LATER', 0, 2); x.restore() }
}

// ── the finale: a talk card between two stars
function finale(x, t, S) {
  const { ok } = S
  const k = pop01(t, T.undock[0] + 0.15, 0.4, 2.2) * ok
  if (k <= 0.01) return
  x.save(); x.translate(540, 1200); x.scale(1.2 * k, 1.2 * k); x.translate(-540, -1170)
  table(x, 540, 1150, 380)
  cancer(x, t, { x: 360, y: 1020, s: 170, mood: 'happy', look: [1, -0.3], hops: [T.right + 0.1] })
  leo(x, t, { x: 720, y: 1020, s: 170, mood: t > T.right ? 'heart' : 'sparkle', look: [-1, -0.3], hops: [T.right + 0.15, T.right + 0.6] })
  // the talk card, standing on the table
  x.save(); x.translate(540, 1060); x.rotate(-0.04 + 0.02 * Math.sin(t * 2))
  box(x, -88, -90, 176, 180, '#2a1f55', { b: 6 })
  R(x, GOLD, -80, -82, 160, 6)
  x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('TALK CARD', 0, -52)
  x.font = `italic 500 30px 'EB Garamond'`; x.fillStyle = BONE
  ;['What made', 'you smile', 'today?'].forEach((s, i) => x.fillText(s, 0, -8 + i * 32))
  x.restore()
  x.restore()
  hearts(x, t, T.right + 0.35, 700, 900, { n: 6, spread: 160 })
  sparkles(x, t, 540, 960, T.right + 0.25, 10, 200, 2, [GOLD, PINK, BONE])
}

const EP = makeWrong({
  q: 'What do you say on | a *first date?*', deep: '#b8326a',
  answers: [
    { sign: 'aries', text: '“So… who’s *winning?*”', draw: ans1,
      cues: [['pop', 0.5, 1174.66, 0.03, -0.3], ['bell', 0.9, 1318.51, 0.03, 0.6, -0.2], ['bell', 1.5, 1567.98, 0.03, 0.6, -0.2], ['pop', 1.8, 659.25, 0.035, 0.3]] },
    { sign: 'capricorn', text: '“Here’s my | *five-year plan.*”', draw: ans2,
      cues: [['whoosh', 0.2, 1.2, 0.025], ['tick', 1.4, 0.05], ['pop', 1.1, 987.77, 0.03, 0.5], ['pop', 1.85, 880, 0.035, 0.1]] },
    { sign: 'gemini', text: '“Everything. *At once.*”', draw: ans3,
      cues: [...TOPICS.map((_, i) => ['pop', +(0.25 + i * 0.17).toFixed(3), [880, 987.77, 1174.66, 1318.51][i % 4] * (i % 2 ? 1 : 1.5), 0.025, i % 2 ? 0.4 : -0.4]), ['tick', 1.7, 0.06], ['pluck', 1.72, 1567.98, 0.035, 0.5, 0]] },
  ],
  hookBubbles: ['ooh!', 'me! me!', 'me AND me'],
  speaker: 'THE STARS', ask: 'ahem. the real one?', askY: 820,
  last: '*Ask* them things.',
  finale,
  finaleCues: [['pop', +(T.undock[0] + 0.2).toFixed(3), 1174.66, 0.035, 0], ['pluck', +(T.right + 0.25).toFixed(3), 1567.98, 0.035, 0.6, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp, label, RED]
