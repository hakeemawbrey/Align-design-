// r2a0755: star_advice, ADVICE SOLO, "How to surprise | *an Aquarius.*" (~45 s vertical, signs3kit social cut, music:
// lofi · G). One sign the whole way, 9 cards for the people who love an Aquarius: a relatable truth + a warm surprise idea.
//   skip the flowers (a telescope) · no surprise party (a weird museum day) · ask about their theory (and listen)
//   · a gift on a random Tuesday · their birth chart, framed · a gadget that does one useless thing · donate in their
//   name · snacks for their friends too · love their weirdness
//  37.8  "Weird is | *the whole point.*"   41.2  callback: "The useless gadget? | *Their favourite thing.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, gift, chart, swapLabel, fitTitleScenes, TELESCOPE, TELESCOPE_C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'aquarius', ACC = '#6fc3ff', ST = { x: -170 }

// a gold frame around a birth chart
function framedChart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 296, 296)
  x.fillStyle = INK; x.fillRect(-156, -156, 312, 312); x.fillStyle = GOLD; x.fillRect(-148, -148, 296, 296)
  x.fillStyle = '#140c30'; x.fillRect(-124, -124, 248, 248)
  x.restore()
  chart(x, cx, cy, 100 * k, 1, t)
}
// a gadget that blinks and beeps, nothing else
function gadget(x, t, cx, cy, cell, k) {
  bits(x, 'GADGET', cx, cy, cell * k)
  if (k > 0.5 && Math.floor(t * 3) % 2) { x.save(); x.fillStyle = '#ff5a5a'; x.beginPath(); x.arc(cx - cell * 1.5, cy - cell * 4.5, cell * 0.9, 0, 7); x.fill(); x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'Skip the flowers. | *Gift a telescope.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      swapLabel(x, 800, 660, lt, 0.8, 'ROSES', 'THE GALAXY', { size: 38, fromBg: PINK, toBg: ACC })
      drawBits(x, TELESCOPE, TELESCOPE_C, 800, 920, 18 * pop01(t, P.t0 + 1.1, 0.35, 2))
      sparkles(x, t, 900, 800, P.t0 + 1.4, 7, 140, 0.4)
    } },
  { sign: S, cap: 'No surprise party. | *A weird museum day.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'STUB', 800, 840, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      L(x, 800, 660, 'MUSEUM OF ODD SPOONS', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 28)
      L(x, 800, 1040, 'ADMIT 2 ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Ask about their theory. | *Then really listen.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'ok so, octopi…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: '#d6f5ff', tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 44)
      L(x, 800, 890, `MINUTE ${n} OF IT`, pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 800, 1060, 'STILL LISTENING ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'A gift on a Tuesday. | *For no reason.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      gift(x, 800, 920, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), { col: ACC, rib: GOLD, open: 0.45 * ease.outCubic(prog(lt, 1.0, 1.5)) })
      L(x, 800, 650, 'OCCASION: NONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, 0.04, 32)
      sparkles(x, t, 800, 840, P.t0 + 1.3, 8, 170, 0.2)
    } },
  { sign: S, cap: 'Their birth chart. | *Framed.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      framedChart(x, t, 800, 850, pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1080, 'NOW IT’S ART', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'A gadget that does | *one useless thing.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      gadget(x, t, 800, 860, 22, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1080, 'IT BEEPS. THAT’S IT.', pop01(t, P.t0 + 1.0, 0.3, 2.4), STEEL, 0.04, 30)
      bubble(x, 800, 650, 'I LOVE IT', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Donate in their name. | *They’ll tear up. Privately.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, tears: lt => lt > 1.3 ? 1 : 0,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'CERTIFICATE', headBg: MINT, headInk: INK, lines: ['one penguin', 'adopted for', ['YOU ♡', '#c0306a']], size: 32, progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1100, '“I’m not crying.”', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#bfe6ff', -0.04, 30)
    } },
  { sign: S, cap: 'Bring snacks. | *For their whole crew.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'COOKIE', 690 + (i % 3) * 110, 940 + Math.floor(i / 3) * 110, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 690, 'FOR THE GROUP CHAT', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Love the weird. | *Best surprise ever.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      L(x, 800, 780, 'YOU, EXACTLY ♡', pop01(t, P.t0 + 0.5, 0.3, 2.4), ACC, -0.04, 44)
      hearts(x, t, 800, 1120, P.t0 + 0.8, { n: 5, life: 1.8, spread: 260, cell: 8, seed: 5 })
      sparkles(x, t, 800, 780, P.t0 + 0.6, 8, 200, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0755', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'How to surprise | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Weird is | *the whole point.*', mood: 'sparkle' },
  last: {
    text: 'The useless gadget? | *Their favourite.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.6, 0.35, 2)
      signChar(x, t, S, 400, 1020, 290 * k, { mood: 'heart', seed: 9, hops: [t0 + 1.3] })
      gadget(x, t, 740, 990, 20, pop01(t, t0 + 0.9, 0.35, 2))
      L(x, 740, 1170, 'STILL BEEPING ♡', pop01(t, t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
      hearts(x, t, 760, 900, t0 + 1.4, { n: 5, life: 2.0, spread: 140, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
