// r2a0703: star_advice, ADVICE SOLO (leo), "Leo, it's okay | *to miss them.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths about a Leo missing someone, each with a warm reframe and one light gag.
// Ending: card (lesson, then the last line over a Leo + Libra match card: the new match from card nine).
//   "totally fine" in public, you can be soft too · a sad song came on, let it play · miss being their favourite, you're
//   still someone's · roaring is tiring, quiet tears count · keep the photos, keep your glow · big heart, big ache
//   · texted them in your head, text a friend · bad mane day, still a whole lion · new match? no rush, sunshine
//   lesson "Missing them means | *you loved big.*" · last "Your next match? | *Lucky them.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, HEART } from '../../signs3kit.js'
import { L, sheet, phone, friend, swapLabel, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }

const CAMEOS = [
  { sign: S, cap: '“Totally fine” in public? | *You can be soft.*', mood: lt => lt > 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const tilt = lerp(0, 0.35, ease.inOutCubic(prog(lt, 1.0, 1.6)))
      drawBits(x, CROWN, CROWN_C, F.x + 20, F.top - 40, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tilt })
      L(x, 800, 760, 'TOTALLY FINE ✦', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 36)
      L(x, 800, 960, '(MISSES THEM)', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'A sad song came on? | *Let it play.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 780, 1020, { n: 5, cell: 15, col: ACC, seed: 3 })
      L(x, 800, 700, 'NOW PLAYING: FEELS', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 32)
      L(x, 800, 1100, 'REPEAT: ON (OKAY)', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Miss being their fave? | *You’re still someone’s.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      ;['taurus', 'gemini', 'pisces'].forEach((id, i) => friend(x, t, id, 660 + i * 140, 1010 - (i % 2) * 60, 160, pop01(t, P.t0 + 0.6 + i * 0.15, 0.3, 2), { mood: 'heart', look: [-1, 0], tears: id === 'pisces' ? 2 : 0 }))
      L(x, 800, 700, 'FAN CLUB: STILL OPEN', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Roaring gets tiring. | *Quiet tears count too.*', mood: 'neutral', tears: lt => lt > 0.9 ? 1 : 0, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 780, lt, 0.9, 'ROAR: MAX', 'ROAR: RESTING', { size: 38, fromBg: RED, toBg: SKYB })
      bits(x, 'TISSUE', 800, 1030, 18 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: S, cap: 'Keep the good photos. | *Keep your glow.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 870); x.rotate(-0.05); x.scale(k, k)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -150, 296, 320); x.fillStyle = INK; x.fillRect(-156, -166, 312, 332); x.fillStyle = GOLD; x.fillRect(-148, -158, 296, 316); x.fillStyle = '#2a2350'; x.fillRect(-124, -134, 248, 268)
      x.restore()
      if (k > 0.5) { signChar(x, t, 'leo', 760, 880, 120, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.5 }); signChar(x, t, 'aries', 850, 880, 110, { mood: 'happy', seed: 62, glyph: false, glow: 0.5 }) }
      sparkles(x, t, 800, 870, P.t0 + 1.3, 7, 210, 0.5)
      L(x, 800, 1100, 'GLOW: KEPT', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Big heart, big ache. | *That’s how love works.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const beat = 1 + 0.06 * Math.max(0, Math.sin(t * 7))
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 800, 860, 36 * beat * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1100, 'HEART SIZE: XXL', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Drafting texts to them? | *Text a friend.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: MINT, lines: [['i miss them', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['on my way', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), false], ['with snacks', GOLD, pop01(t, P.t0 + 1.7, 0.2, 2), false]], typing: lt > 0.6 && lt < 1.0 ? 1 : 0, size: 26 })
    } },
  { sign: S, cap: 'Bad mane day? | *Still a whole lion.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    back(x, t, lt, P, F) {
      // a scruffy mane behind the star: tufts that fluff up when the pep talk lands
      const k = pop01(t, P.t0 + 0.1, 0.3, 2), up = ease.outCubic(prog(lt, 1.1, 1.5))
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 165 + (i % 2) * 22 + up * 14, wob = (1 - up) * Math.sin(i * 2.3) * 0.4; drawBits(x, ['.OO.', 'OOOO', 'OOOO', '.OO.'], { O: i % 2 ? '#e8842a' : '#ffb34a' }, F.x + Math.cos(a + wob) * r, F.cy + Math.sin(a + wob) * r * 0.95, 12 * k) }
    },
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'still iconic', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: '#ffd23a', tail: 'bl' })
      L(x, 800, 1020, 'LION STATUS: 100%', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'A new match? | *No rush, sunshine.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♎ libra', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['whenever', MINT, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['you’re ready', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 26 })
      L(x, 810, 1130, 'NO RUSH ✦', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0703', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Leo, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'libra', chip: 'WHEN READY' },
  group: { cap: 'Still shining. | *Just softer.*', mood: 'heart' },
  lesson: { text: 'Missing them means | *you loved big.*', chip: 'HEART: HEALING' },
  last: { text: 'Your next match? | *Lucky them.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
