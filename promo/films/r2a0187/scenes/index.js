// r2a0187: star_advice, ADVICE SOLO (Aries), "What Aries need | to feel heard." (~51 s vertical, signs3kit social cut,
// music: lofi · F). Nine cards: a relatable Aries truth + a warm reframe, one light gag each. Ending: lesson.
//   0.0–3.6    "What Aries need | *to feel heard.*"
//   3.6–37.8   let them finish the whole story (the scroll unrolls) · big news, big reaction (WOW!! sign)
//              · "calm down" crossed out → "tell me more" · fast feelings are real (gauge at full speed)
//              · reply fast, patience isn't their sign · let them vent, then race them · take the wild ideas seriously
//              · say it straight (road sign) · remember what they said (a notebook of Aries quotes)
//  37.8        "Loud heart. | *Listen close.*"
//  41.0        LESSON: "Hear the fire. | Find the *warmth.*"  STATUS: HEARD
//  46.9        "Ask “and then?” | *They light up.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const S = 'aries', ACC = '#ff6b5a', L = { x: -160 }
const SHOE = ['....RRR.', '...RRRRR', '.RRRWRRR', 'RRRRRRRR', 'WWWWWWWW']
const BULB = ['..YYYYY..', '.YYYYYYY.', 'YYYWYYYYY', 'YYWYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...GGG...', '...GGG...', '...GGG...']
const SIGN = ['.....G.....', '....GGG....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', '....GGG....', '....GGG....', '....GGG....', '....GGG....']

/** a friend star popping in on the right */
function friend(x, t, P, id, cx, cy, at, s = 200, mood = 'happy', look = [-1, 0]) {
  const k = pop01(t, P.t0 + at, 0.4, 2)
  if (k > 0.01) return signChar(x, t, id, cx, cy, s * k, { mood, look, seed: 13, glyph: false, hops: [P.t0 + at + 0.6], tears: id === 'pisces' ? 1 : 0 })
}
/** a speed gauge whose needle swings to the top */
function gauge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 20); x.lineTo(-150, 20); x.fill()
  const Z = [MINT, GOLD, ORANGE, RED]
  Z.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 26; x.beginPath(); x.arc(0, 0, 118, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.stroke() })
  const a = Math.PI + lerp(0.2, Math.PI - 0.15, ease.outBack(prog(lt, 0.4, 1.0))) + (lt > 1 ? Math.sin(lt * 30) * 0.03 : 0)
  x.strokeStyle = CREAM; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 16, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Let them finish | *the whole story.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.6))
      card(x, 700, 640 + u * 180, 220, 80 + u * 360, 1, { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = GREY; for (let i = 0; i < Math.floor(u * 9); i++) x.fillRect(-80, -u * 170 + i * 40, 160 - (i % 3) * 30, 10)
      })
      friend(x, t, P, 'cancer', 880, 1010, 0.5, 180, 'happy')
      bubble(x, 880, 820, 'and then?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bc' })
    } },
  { sign: S, cap: 'Big news? | *Give a big reaction.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: L, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      const Ff = friend(x, t, P, 'leo', 790, 1000, 0.5, 200, 'wide')
      if (Ff) label(x, 790, 720 + Math.sin(t * 9) * 8, 'WOW!!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 64, bg: GOLD, rot: Math.sin(t * 9) * 0.08 })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 200, 0.4)
    } },
  { sign: S, cap: 'Skip “calm down.” | Try *“tell me more.”*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.25, 2.2)
      bubble(x, 790, 720, 'calm down', a, { size: 42, col: GREY, tail: 'bc' })
      const cr = clamp((lt - 0.6) / 0.3)
      if (cr > 0 && a > 0.5) { x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(650, 720); x.lineTo(650 + 280 * cr, 720); x.stroke() }
      bubble(x, 790, 960, 'tell me more', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Fast feelings | *are still real feelings.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      gauge(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'FULL SPEED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 680, 'VALID', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reply fast. | *Patience isn’t their sign.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        txt(x, 'MY MATCH', 0, -130, { size: 22, font: MONO, weight: 700, color: GOLD })
        const dots = lt < 1.2
        if (dots) { for (let i = 0; i < 3; i++) { x.fillStyle = i === Math.floor(lt * 6) % 3 ? CREAM : GREY; x.fillRect(-36 + i * 28, -12, 18, 18) } }
        else {
          const k = pop01(lt, 1.2, 0.25, 2)
          x.save(); x.scale(k, k); x.fillStyle = PINK; x.fillRect(-92, -34, 184, 68); txt(x, 'yes!! tell me', 0, 0, { size: 26 }); x.restore()
        }
      })
      label(x, 790, 1130, 'REPLIED: INSTANTLY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them vent. | *Then race them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.3, 1.7],
    front(x, t, lt, P, F) {
      if (lt < 1.2) for (let i = 0; i < 3; i++) { const ph = (lt * 2 + i / 3) % 1; x.save(); x.globalAlpha = 0.7 * (1 - ph); x.fillStyle = CREAM; x.beginPath(); x.arc(F.x - 60 + i * 60, F.top - 20 - ph * 120, 18 + ph * 20, 0, 7); x.fill(); x.restore() }
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      drawBits(x, SHOE, { R: RED, W: CREAM }, 720, 1060, 18 * k); drawBits(x, SHOE, { R: RED, W: CREAM }, 880, 1040, 18 * k)
      label(x, 800, 700, 'RACE YOU!', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'Take the wild ideas | *seriously.*', mood: 'sparkle', look: [1, -1], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.globalAlpha = 0.3 * k * (0.7 + 0.3 * Math.sin(t * 8)); x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(790, 820, 150, 0, 7); x.fill(); x.restore()
      drawBits(x, BULB, { Y: GOLD, W: '#fff', G: GREY }, 790, 820, 22 * k)
      card(x, 790, 1100, 380, 100, pop01(t, P.t0 + 1.1, 0.3, 2.2), { bg: CREAM, rot: -0.04 }, () => txt(x, 'a bakery… on a boat', 0, 2, { size: 34 }))
    } },
  { sign: S, cap: 'Say it straight. | *They’ll respect it.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.fillStyle = INK; x.fillRect(782, 900, 16, 260 * k)
      drawBits(x, SIGN, { G: '#2fc79a' }, 790, 820, 26 * k)
      label(x, 790, 1120, 'NO GAMES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remember what they said. | *They’ll glow.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 870, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-165, -190, 330, 56); txt(x, 'ARIES SAID:', 0, -162, { size: 26, font: MONO, weight: 700, color: CREAM })
        const N = ['loves mango', 'race in june', 'dream: bakery']
        N.forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, '• ' + s, -145, -80 + i * 70, { size: 32, align: 'left' }) })
      })
      sparkles(x, t, 400, 820, P.t0 + 1.6, 7, 200, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0187', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'What Aries need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Loud heart. | *Listen close.*', mood: 'sparkle' },
  lesson: { text: 'Hear the fire. | Find the *warmth.*', chip: 'STATUS: HEARD' },
  last: {
    text: 'Ask “and then?” | *They light up.*',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 0.6, 10, 260, 0.2); sparkles(x, t, 540, 860, t - lt + 1.4, 8, 320, 0.9) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
