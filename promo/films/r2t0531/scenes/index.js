// r2t0531: star_talk, SOLO (sagittarius), "Sagittarius bosses | be like." (signs3kit social cut, music: lofi · C).
// Nine cards, each the most extreme free-spirited Sagittarius boss. Ending: callback (your one day off: the boss came too).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Monday meeting? | Held it *on a plane.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bits(x, 'PLANE', 800 + lt * 30, 820 - lt * 20, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.2 })
      L(x, 800, 640, 'MEETING: 30,000 FT', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.04, 30)
      bubble(x, 800, 1080, 'can you hear me?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Asked for one day off. | Got *a month.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'LEAVE REQUEST', headBg: STEEL, headInk: INK, lines: ['1 day, please?'], size: 32 })
      if (lt > 0.3) swapLabel(x, 800, 1070, lt, 1.2, 'ASKED: 1 DAY', 'APPROVED: 30', { size: 34 })
      sparkles(x, t, 800, 1070, P.t0 + 1.7, 7, 150, 0.4)
    } },
  { sign: 'sagittarius', cap: 'Team-building day? | *Skydiving.* At dawn.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      // a parachute canopy with the team dangling below
      if (k > 0.01) {
        x.save(); x.translate(800, 760 + Math.sin(t * 2) * 10); x.scale(k, k)
        const cols = [RED, GOLD, MINT, SKYB, PINK]
        for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-160 + i * 64 - 4, -64, 72, 68); x.fillStyle = cols[i]; x.fillRect(-160 + i * 64, -60, 64, 60 - Math.abs(i - 2) * 14) }
        x.strokeStyle = BONE; x.lineWidth = 3
        for (const sx of [-150, -50, 50, 150]) { x.beginPath(); x.moveTo(sx, 0); x.lineTo(0, 170); x.stroke() }
        x.restore()
        friend(x, t, 'virgo', 800, 960 + Math.sin(t * 2) * 10, 130, k, { mood: 'wide', seed: 33 })
      }
      L(x, 800, 1120, 'MANDATORY FUN', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Performance review? | *A road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 26 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.05 })
      bits(x, 'SUITCASE', 690, 1040, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 830, 1060, 'REVIEW: MILE 400', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'You made a mistake. | They *laughed.* Moved on.', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 240, head: 'OOPS', headBg: RED, lines: ['sent to', 'the wrong team'], size: 30 })
      bubble(x, 800, 1060, 'HA! next!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Office address? | *Changes weekly.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.7, 1.4, 2.1],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 830, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const opts = [['OFFICE: A BEACH', SKYB], ['OFFICE: A TENT', MINT], ['OFFICE: A BOAT', GOLD], ['OFFICE: ???', PINK]]
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.45))
      if (lt > 0.5) L(x, 800, 1080, opts[i][0], 1, opts[i][1], 0.04 * Math.sin(i * 2), 32)
    } },
  { sign: 'sagittarius', cap: 'Job interview? | *“What’s your sign?”*', mood: lt => lt > 1.4 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'INTERVIEW', headBg: LAV, headInk: INK, lines: ['Q1. your sign?', 'Q2. no, really', 'Q3. that’s it'], size: 28, align: 'left' })
      L(x, 800, 1090, 'ARIES? HIRED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 1090, P.t0 + 1.5, 7, 150, 0.2)
    } },
  { sign: 'sagittarius', cap: 'Feedback? | *Brutally* honest.', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'this slide is ugly. | love you though!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'bl' })
      friend(x, t, 'cancer', 820, 1000, 150, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: lt > 1.3 ? 'wide' : 'neutral', look: [-1, -1], seed: 34 })
      L(x, 800, 1140, 'TOO HONEST', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Out of office: | *“back eventually.”*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'AUTO-REPLY', headCol: GOLD, lines: [['gone exploring', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['back eventually', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['maybe', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2)]] })
    } },
]

const F = makeFilm({
  id: 'r2t0531', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'callback',
  title: 'Sagittarius bosses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best boss ever. | *Never* in the office.', mood: 'sparkle' },
  last: {
    text: 'Your one day off? | They *came too.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 400, 1060, 260 * k, { mood: 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.0, t0 + 1.6, t0 + 2.2] })
      bits(x, 'SUITCASE', 760, 1060, 14 * pop01(t, t0 + 0.6, 0.3, 2))
      L(x, 760, 1220, 'TRIP FOR TWO', pop01(t, t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 32)
      if (lt > 1.4) confetti(x, t, 540, 960, t0 + 1.4, { n: 20, spread: 320 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
