// r2a0699: star_advice, ADVICE SOLO (taurus), "Signs a Taurus | *misses you.*" (signs3kit social cut, music: lofi · E)
// One sign (solo, 9 cards): the quiet ways a Taurus shows they miss you, each with a warm read + one gag. Ending: card.
//   kept your hoodie (it's theirs now) · cooked for two, just in case · sent you a photo of a cloud · replays your
//   voice note · mentions you at dinner (twice) · planned a visit months ahead · still has the cactus you gave them
//   (named it after you) · suddenly needs your opinion · "come over" means now
//   group "Quiet love. | *Big feelings.*"  LESSON "Taurus love is slow. | It *stays.*"  last "Miss them back. | *Say it first.*"
//   over the match card: Taurus + Cancer (the hoodie friend), chip MISSED YOU
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, steam, RED, CREAM, STEEL, clamp, ease, prog, lerp } from './props.js'

const S = 'taurus', ST = { x: -190 }, ACC = '#7ed38a'
const HOODIE = ['..HHHHH..', '.HH...HH.', 'HHHHHHHHH', 'HHHHHHHHH', 'HHHHPHHHH', 'HH.HPH.HH', 'HH.HHH.HH', 'HH.HHH.HH', '...HHH...']
const CACTUS = ['...G...', '..GGG..', 'G.GGG.G', 'GGGGGGG', '..GGG..', '..GGG..', '.PPPPP.', '.PPPPP.', '..PPP..']
const WAVE = [3, 6, 9, 5, 8, 4, 7, 10, 6, 3, 5, 8]

const CAMEOS = [
  { sign: S, cap: 'Kept your hoodie. | *It’s theirs now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: '#9aa5c4', P: '#6b62a8' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 660, 'YOURS?', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.05, 36)
      L(x, 790, 1110, 'NOT ANYMORE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Cooked for two. | *Just in case.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 720, 910, 16 * pop01(t, P.t0 + 0.2, 0.3, 2)); bits(x, 'PLATE', 880, 960, 16 * pop01(t, P.t0 + 0.45, 0.3, 2))
      steam(x, t, 800, 860, { n: 3, h: 120 })
      L(x, 790, 1120, 'TABLE FOR 2', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Sent you a photo | *of a cloud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TAURUS ♡', headCol: ACC, size: 24, lines: [['[photo]', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['looks like u', BONE, pop01(t, P.t0 + 1.1, 0.25, 2), true]] })
      bits(x, 'CLOUD', 770, 790, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.05, alpha: 0.95 })
    } },
  { sign: S, cap: 'They replay | *your voice note.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -70, 340, 140); x.fillStyle = LAV; x.fillRect(-162, -62, 324, 124)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-136, -26); x.lineTo(-100, 0); x.lineTo(-136, 26); x.fill()
        WAVE.forEach((h, i) => { const a = h * (0.7 + 0.3 * Math.sin(t * 8 + i)); x.fillRect(-80 + i * 20, -a * 4, 10, a * 8) }); x.restore() }
      L(x, 790, 1080, `PLAYS: ${1 + Math.floor(clamp((lt - 0.4) / 1.4) * 39)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 38)
    } },
  { sign: S, cap: 'Mentions you at dinner. | *Twice.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'my friend | always says…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 940, 'oh! and also…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl', col: '#ffd0e0' })
      L(x, 790, 1120, 'MENTIONS: 2', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Planned your visit | *months ahead.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'MAY', headBg: '#3a8a4a', lines: ['picnic ✓', 'pasta night ✓', ['YOU ♡', '#d0406a']], size: 34, progress: clamp((lt - 0.4) / 1.0) })
    } },
  { sign: S, cap: 'Still has the cactus | *you gave them.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CACTUS, { G: '#4fbf6a', P: '#c9603a' }, 790, 890, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1110, 'ITS NAME? YOURS.', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 34)
      sparkles(x, t, 790, 860, P.t0 + 1.1, 6, 150, 0.3)
    } },
  { sign: S, cap: 'Suddenly needs | *your opinion.*', mood: 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 700, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2)); bits(x, 'MUG', 880, 900, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 680, 'which mug??', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1100, '(it’s about you)', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: '“Come over” | *means right now.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'come over!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1120, 'KETTLE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0699', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Taurus | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'MISSED YOU' },
  group: { cap: 'Quiet love. | *Big feelings.*', mood: 'heart' },
  lesson: { text: 'Taurus love is slow. | It *stays.*', chip: 'LOYAL: ALWAYS' },
  last: { text: 'Miss them back. | *Say it first.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
