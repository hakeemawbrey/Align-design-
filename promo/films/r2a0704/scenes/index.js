// r2a0704: star_advice, ADVICE SOLO (gemini), "How to thank | *a Gemini.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine warm, slightly silly ways to say thank you to a Gemini. Ending: callback (the twins from
// card six come back to say "you're welcome").
//   say it out loud · a voice note (replayed twice) · trade them a fun fact · plan something new · laugh at every joke,
//   all seven · a thank-you note (both twins read it) · ask about their week, clear your evening · thank them for the
//   intro, that match worked out · a simple thanks, they glow for days
//   group "Chatty. Kind. | *Worth thanking.*" · last "Both of them | *say you’re welcome.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe76a', S = 'gemini', ST = { x: -190 }
/** the two little Gemini twins side by side */
function twins(x, t, cx, cy, s, k, { mood = 'happy', look = [0, 0] } = {}) {
  if (k <= 0.01) return
  signChar(x, t, S, cx - s * 0.52, cy, s * k, { mood, look, seed: 51, glyph: false })
  signChar(x, t, S, cx + s * 0.52, cy + 6, s * k, { mood: mood === 'happy' ? 'wink' : mood, look, seed: 52, glyph: false })
}

const CAMEOS = [
  { sign: S, cap: 'Say it out loud. | *They love the words.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'THANK YOU!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: '#ffe76a', tail: 'bl' })
      L(x, 800, 980, 'WORDS: RECEIVED ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 32)
      sparkles(x, t, 400, 820, P.t0 + 1.1, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Send a voice note. | *They’ll replay it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 840); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-190, -60, 380, 120); x.fillStyle = BONE; x.fillRect(-182, -52, 364, 104)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -26); x.lineTo(-110, 0); x.lineTo(-150, 26); x.fill()
      for (let i = 0; i < 14; i++) { const h = 12 + Math.abs(Math.sin(i * 1.7 + t * (lt < 2 ? 5 : 0))) * 34, on = i / 14 < prog(lt, 0.4, 1.6); x.fillStyle = on ? '#e0a800' : STEEL; x.fillRect(-90 + i * 18, -h / 2, 10, h) }
      x.restore()
      L(x, 800, 1040, lt < 1.5 ? 'PLAYING 1/2' : 'PLAYING 2/2 ♥', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Trade them a fun fact. | *Instant best friend.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'otters hold hands | when they sleep', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      L(x, 800, 960, 'MIND: BLOWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 38)
      L(x, 800, 1090, 'BESTIE STATUS: YES', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Plan something new. | *Surprise beats stuff.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 660, 'MYSTERY OUTING', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1090, 'DESTINATION: ???', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Laugh at their jokes. | *All seven at once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const W = ['so then—', 'AND THEN', 'wait, also', 'ok last one'], n = Math.min(3, Math.floor(lt / 0.4))
      for (let i = 0; i <= n; i++) bubble(x, 760 + (i % 2) * 60, 650 + i * 110, W[i], 1, { size: 32, tail: i % 2 ? 'br' : 'bl', col: i % 2 ? '#ffe76a' : BONE })
      L(x, 800, 1140, 'JOKES TOLD: 7', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Write them a note. | *Both twins will read it.*', mood: 'heart', look: [1, 0], star: ST, hideStar: true,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      twins(x, t, 420, 900, 190, pop01(t, P.t0 + 0.1, 0.4, 1.8), { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0] })
      sheet(x, 790, 860, 1.1 * pop01(t, P.t0 + 0.4, 0.3, 2), { w: 300, h: 260, head: 'THANK YOU ♥', headBg: '#ffe76a', headInk: INK, lines: ['for being', 'you (both).'], size: 34, rot: 0.04 })
    } },
  { sign: S, cap: 'Ask about their week. | *Clear your evening.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 3 })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 13)
      L(x, 800, 1080, `STORY ${n} OF 14`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'They set you up? | *Owe them cake.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, lines: [['♉ taurus', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['intro by:', BONE, pop01(t, P.t0 + 0.9, 0.2, 2), false], ['♊ gemini ♥', '#ffe76a', pop01(t, P.t0 + 1.2, 0.2, 2.2), false]], size: 26 })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'A simple “thanks”? | *They’ll glow for days.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const d = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.6) / 0.5))
      L(x, 800, 820, `GLOW: DAY ${d}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 40)
      sparkles(x, t, F.x, F.cy, P.t0 + 0.5, 8, 190, 0.2)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.3, 8, 220, 0.9)
      bubble(x, 800, 1060, 'aww stop', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0704', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'How to thank | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Chatty. Kind. | *Worth thanking.*', mood: 'heart' },
  last: {
    text: 'Both twins say: | *you’re welcome.*',
    draw(x, t, lt) {
      const t0 = t - lt
      twins(x, t, 540, 1080, 260, pop01(t, t0 + 0.2, 0.45, 1.8), { mood: lt > 1.2 ? 'heart' : 'happy' })
      bubble(x, 330, 780, 'you’re welcome!', pop01(t, t0 + 0.8, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      bubble(x, 750, 860, 'you’re welcome!', pop01(t, t0 + 1.1, 0.25, 2.2), { size: 44, col: '#ffe76a', tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
