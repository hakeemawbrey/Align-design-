// v3t127: THE SIGNS AS… v3, "The signs | on their birthday." (~54 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   every sign's birthday, pushed to the extreme:
//              ♈ blew out the candles before the song · ♉ birthday wish: the whole cake, alone · ♊ two parties, same night
//              · ♋ spent it hosting everyone else · ♌ declared a holiday · ♍ planned their party minute by
//              minute · ♎ changed the theme nine times, day of · ♏ told nobody, still knows who forgot · ♐ blew out the
//              candles mid-skydive · ♑ turned thirty, in bed by nine · ♒ celebrates the half-birthday instead
//              · ♓ opened the card, still crying
//  49.2        group ending: "Another year. | *Same chaos.*" (a giant cake with twelve candles over the group photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SIGN_IDS,
} from '../../signs3kit.js'
import { signStar } from '../../startalk.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e'

const CAKE = [
  '..C..C..C..',
  '..C..C..C..',
  '.PPPPPPPPP.',
  '.PWPPWPPWP.',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
]
const CAKE_C = { C: BONE, P: PINK, W: '#fff', B: '#c98a5a' }
const FLAME = ['.F.', 'FYF', '.F.']
const FORK = [
  'S.S.S',
  'S.S.S',
  'SSSSS',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
]
const CHUTE = [
  '...RRRRRRR...',
  '.RRWWRRRWWRR.',
  'RRRWWRRRWWRRR',
  'K...........K',
  '.K.........K.',
  '..K.......K..',
  '...K.....K...',
]
const CHUTE_C = { R: RED, W: BONE, K: BONE }
const CARD = [
  'PPPPPPPPP',
  'PWWWWWWWP',
  'PWHHWHHWP',
  'PWHHHHHWP',
  'PWWHHHWWP',
  'PWWWHWWWP',
  'PPPPPPPPP',
]
const CARD_C = { P: GOLD, W: BONE, H: PINK }
const NOTEBOOK = [
  'KKKKKKKKK',
  'KWWWWWWWK',
  'KWSSSSSWK',
  'KWWWWWWWK',
  'KWSSSSWWK',
  'KWWWWWWWK',
  'KWSSSSSWK',
  'KKKKKKKKK',
]
const MUG = [
  '.WWWWW...',
  '.WTTTW...',
  '.WTTTWWW.',
  '.WTTTW.W.',
  '.WTTTWWW.',
  '..WWW....',
]

const flames = (x, t, cx, cy, n, gap, k) => { for (let i = 0; i < n; i++) drawBits(x, FLAME, { F: '#ffb34a', Y: '#fff1b0' }, cx + (i - (n - 1) / 2) * gap + Math.sin(t * 9 + i) * 2, cy, 8 * k * (0.9 + 0.1 * Math.sin(t * 13 + i))) }

const CAMEOS = [
  { sign: 'aries', cap: 'Blew out the candles | *before the song.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: { x: -150 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 790, 960, 22 * k)
      if (lt < 0.8) flames(x, t, 790, 860, 3, 66, k)
      else { x.save(); x.globalAlpha = clamp(1 - (lt - 0.8)); x.fillStyle = '#d9d2e8'; for (let i = 0; i < 3; i++) x.fillRect(780 + (i - 1) * 66, 820 - (lt - 0.8) * 120, 14, 30); x.restore() }
      bubble(x, 790, 680, 'happy bi—', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'Birthday wish: | *the whole cake.* Alone.', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 790, 960, 24 * k)
      drawBits(x, FORK, { S: STEEL }, 900, 820, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: 0.3 })
      label(x, 790, 680, 'SERVES: 1', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two parties. | *Same night.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 720, 'PARTY 1 · 8 P.M.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 860, 'PARTY 2 · 8 P.M.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'i’ll do both', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Their birthday. | *Hosted everyone else.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, MUG, { W: BONE, T: [PINK, MINT, LAV, GOLD][i] }, 680 + (i % 2) * 200, 860 + Math.floor(i / 2) * 150, 14 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2))
      bubble(x, 790, 660, 'more cake?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Birthday? | Declared *a holiday.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 790, 740, 'LEO DAY', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 56, bg: '#ffb34a', rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 920, 'SCHOOLS: CLOSED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05 })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 8, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Planned their party | *minute by minute.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = BONE; x.fillRect(-142, -172, 284, 344)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const rows = ['7:40 ARRIVE', '7:41 HUGS', '7:42 CAKE', '7:43 PHOTO', '7:44 BED']
        const n = Math.floor(clamp((lt - 0.3) / 1.4) * rows.length + 0.001)
        for (let i = 0; i < Math.min(n + 1, rows.length); i++) x.fillText(rows[i], -120, -120 + i * 60)
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Changed the theme. | *Nine times.* Day of.', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const TH = ['DISCO', 'GARDEN', 'SPACE', 'BEACH', 'DISCO?', 'PINK', 'GOLD', 'BOTH', 'DISCO.']
      const n = Math.min(8, Math.floor(Math.max(0, lt - 0.2) / 0.2))
      label(x, 790, 740, `THEME ${n + 1}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, TH[n].toLowerCase(), pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Told nobody. | *Still knows* who forgot.', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, NOTEBOOK, { K: DARK, W: BONE, S: '#c97bff' }, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 640, 'noted.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Blew out the candles | *mid-skydive.*', mood: 'sparkle', star: { x: -170, y: 40 }, hops: [0.4],
    back(x, t, lt, P, F) { drawBits(x, CHUTE, CHUTE_C, F.x, F.top - 110, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 790, 900 + Math.sin(t * 4) * 10, 16 * k)
      flames(x, t, 790, 830, 3, 48, k * (lt < 1.5 ? 1 : 0))
      label(x, 790, 680, 'ALTITUDE: HIGH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Turned thirty. | *In bed by nine.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, '9:00 P.M.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 52, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'great party. | goodnight.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Celebrates their | *half-birthday* instead.', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.beginPath(); x.rect(600, 600, 190, 600); x.clip()
        drawBits(x, CAKE, CAKE_C, 790, 960, 24 * k)
        x.restore()
        flames(x, t, 735, 860, 1, 0, k)
      }
      label(x, 790, 700, 'AGE: 27½', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Opened the card. | *Still crying.*', mood: 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CARD, CARD_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      bubble(x, 790, 660, 'you SIGNED it', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t127', key: 'D', accent: PINK, ending: 'group',
  title: 'The signs | *on their birthday.*',
  cameos: CAMEOS,
  group: {
    cap: 'Another year. | *Same chaos.*',
    moods: Array(12).fill('sparkle'),
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.3, 0.4, 2)
      drawBits(x, CAKE, CAKE_C, 540, 720, 24 * k)
      if (k > 0.5) for (let i = 0; i < 12; i++) drawBits(x, FLAME, { F: signStar(SIGN_IDS[i]).color, Y: '#fff1b0' }, 540 + (i - 5.5) * 22, 610 + Math.sin(t * 9 + i) * 2, 6)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
