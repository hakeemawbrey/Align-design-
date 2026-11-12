// r2t0593: star_talk, ROLLCALL, "The signs at | *a graduation.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme version of itself at a graduation:
//   ♈ ran across the stage, lapped it · ♉ skipped the speeches, found the buffet · ♊ gave a speech, nine topics
//   · ♋ hugged the principal, twice · ♌ not graduating, walked the stage anyway · ♍ straightened every tassel
//   · ♎ hat or hair? missed the ceremony · ♏ read the diploma's fine print · ♐ threw the cap, it's in orbit
//   · ♑ updated the résumé mid-stage · ♒ wore the gown inside out, on purpose · ♓ not even graduating, cried the most.
// Ending: callback. group "Everyone graduated. | *Somehow.*", then "Sag’s cap came down. | *Next year.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -170 }

const CAP = [
  '.....KK.....',
  '...KKKKKK...',
  '.KKKKKKKKKK.',
  'KKKKKKKKKKKK',
  '.KKKKKKKKKKY',
  '...KKKKKK..Y',
  '...KKKKKK..Y',
  '...KKKKKK.YY',
]
const capBits = (x, cx, cy, cell, o) => drawBits(x, CAP, { K: '#2a2350', Y: GOLD }, cx, cy, cell, { outline: BONE, ...o })
const MIRROR = ['.SSSSSS.', 'SBBBBBBS', 'SBWBBBBS', 'SBBBBBBS', 'SBBBBBBS', 'SBBBBBBS', '.SSSSSS.', '...SS...', '..SSSS..']

const CAMEOS = [
  { sign: 'aries', cap: 'Ran across the stage. | *Lapped it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 3)
      L(x, 800, 760, `LAP ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), RED, 0.05, 60)
      L(x, 800, 960, 'DIPLOMA: GRABBED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Skipped the speeches. | Found *the buffet.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 860, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 680, 'congrats, me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1040, 'PLATE 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Gave a speech. | *Nine* topics.', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const TOP = ['the future!', 'sharks?', 'my cousin', 'soup', 'the moon', 'anyway…']
      const i = Math.min(TOP.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.32))
      bubble(x, 800, 820, TOP[i], 1 * pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1020, `TOPIC ${Math.min(9, i + 1 + Math.floor(lt / 2))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Hugged the principal. | *Twice.*', mood: 'heart', look: [1, 0], star: { x: -130 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 730, 920, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 22 })
      bubble(x, 800, 680, 'what’s your sign? ♡', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      L(x, 800, 1100, 'HUG #2', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 38)
      hearts(x, t, 600, 820, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'leo', cap: 'Not graduating. | *Walked the stage anyway.*', mood: 'sparkle', star: ST, hops: [0.8, 1.4],
    back(x, t, lt, P, F) {
      const k = clamp((lt - 0.5) / 0.3); if (k <= 0) return
      x.globalAlpha = 0.22 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 190, 1160); x.lineTo(F.x - 190, 1160); x.fill()
    },
    front(x, t, lt, P) {
      capBits(x, 790, 760, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 })
      L(x, 790, 960, 'CLASS OF: ME', pop01(t, P.t0 + 1.0, 0.3, 2.3), GOLD, 0.04, 38)
      L(x, 790, 1080, 'NOT A STUDENT', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Straightened every tassel. | *Everyone’s.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const fix = clamp((lt - 0.4 - i * 0.3) / 0.25)
        capBits(x, 640 + (i % 2) * 200, 780 + Math.floor(i / 2) * 170, 10, { rot: lerp(i % 2 ? 0.5 : -0.45, 0, fix) })
      }
      L(x, 790, 1100, 'TASSELS: ALIGNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Hat or hair? | *Missed the ceremony.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { S: GOLD, B: '#3a5a9a', W: '#bfe6ff' }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, Math.floor(lt * 2.5) % 2 ? 'HAT?' : 'HAIR?', 1, PINK, 0.04, 40)
      L(x, 800, 1090, 'CEREMONY: OVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Read the diploma’s | *fine print.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 260, head: 'DIPLOMA', headBg: GOLD, headInk: INK, lines: ['congrats!', ['*terms apply', '#8a8aa0']], size: 32 })
      bits(x, 'LENS', 900, 950, 13 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 1100, 'HIDDEN CLAUSE?', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Threw the cap. | It’s *in orbit.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [0, -1], star: { x: 170 }, hops: [0.6],
    front(x, t, lt, P, F) {
      const up = ease.outCubic(prog(lt, 0.6, 1.6))
      capBits(x, lerp(F.x, 330, up), lerp(F.top - 40, 640, up), 14, { rot: lt * 6 })
      L(x, 330, 1000, 'ALTITUDE: SPACE', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 32)
      sparkles(x, t, 330, 660, P.t0 + 1.5, 7, 120, 0.5)
    } },
  { sign: 'capricorn', cap: 'Updated the résumé | *mid-stage.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      sheet(x, 330, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'RÉSUMÉ', headBg: STEEL, headInk: INK, lines: ['sign: capricorn', 'degree: ✓ (now)', 'goals: more'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 330, 1080, 'SENT: 0.2 SEC AGO', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Wore the gown inside out. | *On purpose.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      capBits(x, 800, 800, 18 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: Math.PI })
      L(x, 800, 1020, 'IT’S A STATEMENT', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Not even graduating. | *Cried the most.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 860, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 680, 'they grow up so fast', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bl' })
      L(x, 800, 1050, 'A STRANGER’S KID', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0593', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs at | *a graduation.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone graduated. | *Somehow.*' },
  last: {
    text: 'Sag’s cap came down. | *Next year.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      const F = k > 0.01 ? signChar(x, t, 'sagittarius', 540, 1130, 300 * k, { mood: lt > 1.5 ? 'wide' : 'happy', seed: 7, look: [0, -1], hops: [t0 + 1.6] }) : null
      if (F) { const d = ease.outCubic(prog(lt, 0.6, 1.5)); capBits(x, 540, lerp(500, F.top - 30, d), 14, { rot: lerp(3, 0.1, d) }) }
      L(x, 540, 1340, 'WELCOME BACK', pop01(t, t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
