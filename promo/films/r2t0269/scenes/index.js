// r2t0269: THE SIGNS AS… v3, BELIKE, topic "Zodiacs when someone cheats at cards", hook "Card cheat spotted. |
// Zodiacs be like:" (~62 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "Card cheat spotted. | Zodiacs *be like:*"
//   3.6–49.2   ♈ demanded a rematch mid-shuffle · ♉ confiscated the snack bowl · ♊ also cheating, different game
//              · ♋ forgave them, then told Mom · ♌ gasped so loud the neighbours came · ♍ read the whole rulebook aloud
//              · ♎ called a mediation session · ♏ checked their chart, knew it · ♐ laughed so hard they dropped their hand
//              · ♑ kept score in a spreadsheet · ♒ invented a game where cheating's legal · ♓ cried, then let them win
//  49.2        "Game night: | *postponed.*"
//  52.4        LESSON UNLOCKED: "Fair play | *keeps friends close.*"  GAME: STILL ON
//  58.3        "Taurus still has | *the snack bowl.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff8a7a'
const ST = { x: -170 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const BOWL = ['.Y.O.Y.O.Y.', 'YOYOYOYOYOY', 'BBBBBBBBBBB', '.BBBBBBBBB.', '..BBBBBBB..']
const BOWL_C = { Y: '#ffd23a', O: '#e8a24a', B: '#6fc3ff' }
const BOOK = ['RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']

/** a playing card (face) */
function pcard(x, cx, cy, k, s, { rot = 0, col = RED, w = 110, h = 150 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  txt(x, s, 0, 0, { size: 52, color: col })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Demanded a rematch. | *Mid-shuffle.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: ST, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) pcard(x, 790 + Math.sin(t * 9 + i) * 60 * clamp(lt), 900 - i * 6, pop01(t, P.t0 + 0.2, 0.3, 2), '♠', { rot: Math.sin(t * 7 + i * 2) * 0.4 * clamp(lt), col: INK })
      bubble(x, 790, 690, 'REMATCH!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 56, col: '#ff8a7a', tail: 'bl' })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'CURRENT GAME: 3 SEC OLD', BONE, 0.04, 26)
    } },
  { sign: 'taurus', cap: 'Confiscated | *the snack bowl.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const take = ease.inOutCubic(prog(lt, 0.7, 1.2))
      drawBits(x, BOWL, BOWL_C, lerp(800, F.x + 170, take), lerp(880, F.cy + 130, take), 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      tag(x, 790, 680, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'CHEATERS: NO CHIPS', GOLD, -0.04, 32)
      tag(x, 790, 1060, pop01(t, P.t0 + 1.7, 0.3, 2.2), 'TAURUS: ALL CHIPS', MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Also cheating. | *At a different game.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      pcard(x, 720, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'A♥', { rot: -0.15 })
      pcard(x, 860, 840, pop01(t, P.t0 + 0.5, 0.3, 2), 'A♥', { rot: 0.15 })
      tag(x, 790, 660, pop01(t, P.t0 + 0.8, 0.3, 2.2), 'PLAYING: GO FISH?', LAV, -0.04, 32)
      tag(x, 790, 1060, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TABLE: PLAYING HEARTS', BONE, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Forgave them. | *Then told Mom.*', mood: lt => lt > 1.2 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MOM ♥', headCol: PINK, size: 24, lines: [['it’s fine!!', MINT, pop01(t, P.t0 + 0.5, 0.3, 2)], ['but guess what', GOLD, pop01(t, P.t0 + 1.0, 0.3, 2)], ['they cheated…', '#ff8a7a', pop01(t, P.t0 + 1.5, 0.3, 2)]] })
    } },
  { sign: 'leo', cap: 'Gasped so loud | *the neighbors came.*', mood: lt => lt > 0.6 ? 'wide' : 'happy', star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const g = pop01(t, P.t0 + 0.5, 0.3, 2.8)
      bubble(x, 760, 820, 'GASP!!!', g * (1 + 0.04 * Math.sin(t * 20)), { size: 76, col: GOLD, tail: 'bl' })
      tag(x, 790, 1060, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'KNOCK KNOCK: "U OK?"', BONE, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Read the rulebook. | *Out loud. All of it.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { R: '#2fc79a', W: CREAM }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 660, '…rule 4(c)…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      tag(x, 790, 1020, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'PAGE 1 OF 80', MINT, -0.04, 34)
      tag(x, 790, 1110, pop01(t, P.t0 + 1.8, 0.3, 2.2), 'EVERYONE: ASLEEP', LAV, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Called a | *mediation session.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (const d of [-1, 1]) { const k = pop01(t, P.t0 + 0.3 + (d > 0 ? 0.2 : 0), 0.3, 2); if (k > 0.01) { x.save(); x.translate(790 + d * 110, 920); x.scale(k * -d, k); x.fillStyle = WOOD; x.fillRect(-50, -120, 20, 160); x.fillRect(-50, 0, 100, 20); x.fillRect(-50, 20, 16, 60); x.fillRect(34, 20, 16, 60); x.restore() } }
      card(x, 790, 720, 260, 90, pop01(t, P.t0 + 0.8, 0.3, 2), { bg: PINK, rot: -0.03 }, () => txt(x, 'FEELINGS FIRST', 0, 2, { size: 28, font: MONO, weight: 700 }))
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TISSUES PROVIDED', BONE, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Checked their chart. | *Knew it.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      tag(x, 790, 1000, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'RISING: SUSPICIOUS', '#c97bff', -0.04, 32)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'CALLED IT: AGAIN', MINT, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | *they dropped their hand.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      const S = ['K♣', '7♦', 'Q♥', '2♠']
      S.forEach((s, i) => { const p = clamp(prog(lt, 0.4 + i * 0.1, 1.6 + i * 0.1)); if (p > 0) pcard(x, 680 - i * 110 - p * 80, 700 + p * 360 - Math.sin(Math.PI * p) * 180, 1, s, { rot: p * (i % 2 ? 2 : -2), col: s.includes('♥') || s.includes('♦') ? RED : INK }) })
      bubble(x, 330, 640, 'HAHAHA', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Kept score | *in a spreadsheet.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 380, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.strokeStyle = '#c9c0ae'; x.lineWidth = 3
        for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(-170, -130 + i * 64); x.lineTo(170, -130 + i * 64); x.stroke() }
        x.beginPath(); x.moveTo(20, -130); x.lineTo(20, 126); x.stroke()
        ;[['YOU', '12'], ['ME', '14'], ['SAM', '9'], ['CHEAT', '-999']].forEach(([a, b], i) => { if (lt > 0.4 + i * 0.3) { txt(x, a, -150, -98 + i * 64, { size: 28, align: 'left', color: i === 3 ? RED : INK }); txt(x, b, 150, -98 + i * 64, { size: 28, align: 'right', color: i === 3 ? RED : INK }) } })
      })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.8, 0.3, 2.2), 'AUDITED TWICE', GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Invented a game | *where cheating’s legal.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SKYB, rot: -0.04 }, () => {
        txt(x, 'CHAOS CARDS', 0, -100, { size: 36 })
        txt(x, 'rule 1: cheat', -140, -20, { size: 28, weight: 700, align: 'left' })
        txt(x, 'rule 2: cheat more', -140, 34, { size: 28, weight: 700, align: 'left' })
        txt(x, 'rule 3: have fun', -140, 88, { size: 28, weight: 700, align: 'left' })
      })
      tag(x, 790, 1090, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'PROBLEM: SOLVED', MINT, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried. Then | *let them win.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), give = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (k > 0.01) {
        x.save(); x.translate(lerp(640, 830, give), 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-74, -94, 148, 108); x.fillRect(-24, 10, 48, 60); x.fillRect(-64, 66, 128, 34)
        x.fillStyle = GOLD; x.fillRect(-66, -86, 132, 92); x.fillRect(-16, 10, 32, 60); x.fillRect(-56, 72, 112, 22)
        txt(x, '#1', 0, -40, { size: 40 })
        x.restore()
      }
      tag(x, 790, 1080, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TROPHY: DONATED', SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0269', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Card cheat spotted. | Zodiacs *be like:*',
  cameos: CAMEOS,
  group: { cap: 'Game night: | *postponed.*' },
  lesson: { text: 'Fair play | *keeps friends close.*', chip: 'GAME: STILL ON' },
  last: { text: 'Taurus still has | *the snack bowl.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
