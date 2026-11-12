// r2t0085: star_talk, BELIKE, "A long text from your match? | Zodiacs be like." (~61 s vertical, signs3kit social cut, music: lofi · F)
// Ending: 'card' (lesson + last line over the two-card match).
//   0.0–3.6    "Long text? | Zodiacs *be like.*"
//   3.6–49.2   one reaction per sign (3.8 s each):
//              ♈ replied before line one ended · ♉ got snacks, settled in · ♊ replied to every line separately
//              · ♋ read it aloud to their mom · ♌ counted the compliments · ♍ replied with corrections
//              · ♎ drafted forty replies, sent a heart · ♏ read it once, memorised it · ♐ replied with a plane ticket
//              · ♑ scheduled time to read it · ♒ replied with a longer essay · ♓ cried at "hope your day's good"
//  49.2        "Twelve replies. | *Zero chill.*"
//  52.4        LESSON UNLOCKED: "A long message | means *they care.*"  MATCH: SMITTEN
//  58.3        "Libra’s match? | *Aquarius. Page two.*" over the match card: Libra + Aquarius (the heart and the essay).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e'

// a phone showing a long message; n = visible bars, extra(x) draws over it
function phone(x, cx, cy, k, { head = '✦ YOUR MATCH', headCol = MINT, bars = 7, extra } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  x.fillStyle = PINK; for (let i = 0; i < bars; i++) x.fillRect(-92, -86 + i * 30, i === bars - 1 ? 110 : 184, 18)
  if (extra) extra(x)
  x.restore()
}
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', '.WWWWWW.', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.']
const PEN = ['R', 'R', 'R', 'R', 'R', 'R', 'K', 'W']
const TICKET = ['GGGGGGGGGGGG', 'G.GGGGGGGG.G', 'GGKKGGKKKGGG', 'G.GGGGGGGG.G', 'GGGGGGGGGGGG']
const BRAIN = ['..PPPPP..', '.PPWPPWP.', 'PPWPPPWPP', 'PWPPWPPWP', 'PPPWPPPPP', '.PPPPPPP.', '...PPP...']

const CAMEOS = [
  { sign: 'aries', cap: 'Replied before | *reading line one.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { bars: 1 + Math.floor(prog(lt, 0.3, 1.8) * 6) })
      label(x, 790, 1110, 'REPLY: "SAME!!"', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Got snacks. | *Settled in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 820, 820, 0.85 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, POPCORN, { W: CREAM, R: RED }, 640, 1060, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 820, 1120, 'STORY TIME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Replied to each line. | *Separately.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const R = ['lol', 'WAIT', 'same', 'no way', 'ok and?', '!!!']
      R.forEach((r, i) => bubble(x, 700 + (i % 2) * 170, 620 + i * 90, r, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { size: 32, col: [BONE, GOLD, MINT, PINK, SKYB, LAV][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Read it aloud | *to their mom.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 190 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 11, glyph: false })
      label(x, 800, 820, 'MOM', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 650, '“…and paragraph six”', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Counted the compliments. | *Wants more.*', mood: 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      phone(x, 800, 830, 0.85 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 1090, `COMPLIMENTS: ${Math.min(7, Math.floor(prog(lt, 0.4, 1.4) * 7))}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 600, 'only 7?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Replied with | *corrections.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { extra(x) {
        x.strokeStyle = RED; x.lineWidth = 5
        for (let i = 0; i < 5; i++) if (lt > 0.6 + i * 0.2) { x.beginPath(); x.ellipse(-30 + (i % 2) * 50, -77 + i * 30, 40, 14, 0, 0, Math.PI * 2); x.stroke() }
      } })
      drawBits(x, PEN, { R: RED, K: INK, W: '#fff' }, 920, 780 + 20 * Math.sin(t * 5), 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.5 })
      label(x, 790, 1110, '“your” → “you’re”', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Wrote forty replies. | *Sent a heart.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 640, `DRAFT ${Math.max(1, Math.round(prog(lt, 0.2, 1.4) * 40))}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.5, 0.35, 2.4)
      bubble(x, 790, 900, '♥', k, { size: 90, col: BONE, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Read it once. | *Memorised it.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 820, 800, 0.8 * pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - prog(lt, 1.1, 1.3)))
      drawBits(x, BRAIN, { P: PINK, W: '#ff4f86' }, 790, 820, 22 * pop01(t, P.t0 + 1.3, 0.35, 2.2))
      label(x, 790, 1060, 'SAVED: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Replied with | *a plane ticket.*', mood: 'sparkle', star: { x: 150 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, TICKET, { G: GOLD, K: INK }, 320, 820, 22 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.1 })
      bubble(x, 330, 1040, 'tell me | in person', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Scheduled time | *to read it.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(330, 860); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = CREAM; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = '#9aa5c4'; x.fillRect(-142, -162, 284, 56)
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THURSDAY', 0, -134)
        x.font = `800 26px ${INTER}`; x.textAlign = 'left'
        ;['3:00 meeting', '3:30 meeting', '3:45 READ TEXT', '4:00 reply'].forEach((l, i) => { x.fillStyle = i === 2 ? RED : INK; x.fillText(l, -120, -70 + i * 60) })
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Replied with | *a longer essay.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const len = ease.outCubic(prog(lt, 0.3, 1.6))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 600); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, 0, 260, 60 + 520 * len); x.fillStyle = CREAM; x.fillRect(-122, 8, 244, 44 + 520 * len)
        x.fillStyle = '#b9c7e6'; for (let i = 0; i < Math.floor(len * 16); i++) x.fillRect(-100, 30 + i * 32, i % 4 === 3 ? 120 : 200, 8)
        x.restore()
      }
      label(x, 790, 1150, 'PAGE 1 OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *“hope your day’s good.”*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { bars: 0, extra(x) {
        x.fillStyle = PINK; x.fillRect(-96, -80, 192, 70); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'
        x.fillText('hope your', 0, -58); x.fillText('day’s good :)', 0, -28)
      } })
      hearts(x, t, 800, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0085', key: 'F', accent: '#ff8fb1', ending: 'card',
  title: 'Long text? | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aquarius', chip: "IT'S A MATCH" },
  group: { cap: 'Twelve replies. | *Zero chill.*' },
  lesson: { text: 'A long message | means *they care.*', chip: 'MATCH: SMITTEN' },
  last: { text: 'Libra’s reply: ♥ | Aquarius: *page two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
