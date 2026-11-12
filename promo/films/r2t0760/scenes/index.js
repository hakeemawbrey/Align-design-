// r2t0760: star_talk, BELIKE, "Trying to read more? | Zodiacs *be like.*" (topic: zodiacs trying to read more;
// signs3kit social cut, lofi · F). Twelve signs in zodiac order, each one's most extreme reading habit.
// Ending: callback (Taurus, asleep on page two, wakes up: page three).
//   ♈ skipped to the last page · ♉ blanket, tea, asleep by page two · ♊ seven books at once · ♋ the comfort book,
//   forty-first time · ♌ reads in public, cover facing out (a book about Leos) · ♍ annotated page one, forty tabs
//   · ♎ judged every cover, still picking · ♏ sided with the villain, again · ♐ bought thirty books, read the blurbs
//   · ♑ goal fifty-two, read fifty-three · ♒ reading the dictionary, for fun · ♓ cried at the dedication page
//   group "Reading goal: | *very flexible.*"   last "Taurus woke up. | *Page three.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, book, zzz, steam, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Opened the book. | *Read the last page.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.7],
    front(x, t, lt, P) {
      bits(x, 'OPENBOOK', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'PAGE 412 / 412', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, -0.04, 32)
      L(x, 800, 1080, 'DONE. NEXT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Blanket. Tea. | *Asleep by page two.*', mood: lt => lt > 1.0 ? 'squint' : 'heart', look: [1, 0], star: { x: -170, y: 10 },
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 110, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TEA', 850, 1000, 12 * pop01(t, P.t0 + 0.4, 0.3, 2)); steam(x, t, 840, 950, { n: 2, alpha: 0.6, h: 100 })
      if (lt > 1.0) zzz(x, t, F.x + 90, F.top, { size: 46 })
      L(x, 820, 700, 'PAGE 2', pop01(t, P.t0 + 1.1, 0.3, 2.2), CREAM, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Reading | *seven books at once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COL = [PINK, SKYB, MINT, GOLD, LAV, '#ff6b5a', '#7dd18a']
      COL.forEach((c, i) => book(x, 680 + (i % 4) * 82, 780 + Math.floor(i / 4) * 210, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { w: 90, h: 150, col: c, rot: (i - 3) * 0.06, spine: false }))
      L(x, 800, 1120, 'FINISHED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'The comfort book. | *Forty-first time.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { col: SKYB, title: 'THE SAME | BOOK', size: 30 })
      L(x, 800, 650, `READ: ${40 + (lt > 1.2 ? 1 : 0)}×`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 34)
      L(x, 800, 1080, 'STILL CRIES AT CH. 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: 'leo', cap: 'Reads in public. | *Cover facing out.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [-1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { col: GOLD, title: '♌︎ LEOS: | A HISTORY', size: 32, rot: -0.03 })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 7, 200, 0.4)
      L(x, 800, 1090, 'PAGES READ: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#ffb34a', 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Annotated page one. | *Forty sticky tabs.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.floor(clamp((lt - 0.4) / 1.3) * 16), COL = [PINK, MINT, GOLD, SKYB]
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(902, 720 + i * 18 - 2, 44, 16); x.fillStyle = COL[i % 4]; x.fillRect(904, 720 + i * 18, 40, 12) }
      book(x, 800, 860, k, { col: '#ff8fb1', title: 'PAGE 1 | (NOTES)', size: 28, rot: 0 })
      L(x, 800, 1100, 'COLOUR-CODED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Judged every cover. | *Still picking.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const a = Math.sin(lt * 4) > 0
      book(x, 700, 860 - (a ? 30 : 0), pop01(t, P.t0 + 0.2, 0.3, 2), { w: 150, h: 220, col: PINK, title: 'PRETTY', size: 24 })
      book(x, 890, 860 - (a ? 0 : 30), pop01(t, P.t0 + 0.35, 0.3, 2), { w: 150, h: 220, col: LAV, title: 'PRETTIER', size: 24 })
      L(x, 800, 1100, 'SHOP CLOSING', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Sided with | *the villain.* Again.', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'OPENBOOK', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'honestly? | fair point.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1090, 'TEAM VILLAIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#c97bff', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Bought thirty books. | Read *the blurbs.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const COL = [PINK, SKYB, MINT, GOLD, LAV, '#ff6b5a']
      const n = Math.min(10, Math.floor(clamp((lt - 0.2) / 1.0) * 10) + 1)
      for (let i = 0; i < n; i++) drawBits(x, ['KKKKKKKKKKKKKKKK', 'KCCCCCCCCCCCCCCK', 'KKKKKKKKKKKKKKKK'], { K: INK, C: COL[i % 6] }, 800 + (i % 2 ? 10 : -10), 1060 - i * 34, 11)
      L(x, 800, 650, 'TBR: 30', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Reading goal: 52. | *Read 53.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(53, Math.floor(clamp((lt - 0.3) / 1.3) * 53))
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'GOAL: 52', headBg: '#7dd18a', headInk: INK, lines: [`${n} / 52`], size: 64, font: MONO, weight: 700 })
      L(x, 800, 1090, 'AHEAD OF SCHEDULE', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Reading the dictionary. | *For fun.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 250, h: 320, col: '#3a5a9a', title: 'DICTIONARY', ink: CREAM, size: 28 })
      L(x, 800, 1100, 'CURRENTLY ON: Q', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at | *the dedication page.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.7 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 280, h: 300, rot: 0.04, lines: ['', 'for mum.'], size: 54, font: "'EB Garamond', Georgia, serif", weight: 500 })
      L(x, 800, 1100, 'PAGES READ: 0.5', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0760', key: 'F', accent: ACC, ending: 'callback',
  title: 'Trying to read more? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Reading goal: | *very flexible.*', moods: ['wide', 'squint', 'wink', 'heart', 'wink', 'happy', 'neutral', 'wink', 'sparkle', 'sparkle', 'sparkle', 'wide'] },
  last: {
    text: 'Taurus woke up. | *Page three.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const F = friend(x, t, 'taurus', 540, 1000, 360, pop01(t, t0 + 0.5, 0.4, 2), { mood: lt > 1.4 ? 'sparkle' : 'squint', hops: [t0 + 1.4] })
      if (F) bits(x, 'BLANKET', 540, F.cy + 190, 22)
      bits(x, 'OPENBOOK', 540, 1380, 18 * pop01(t, t0 + 1.0, 0.3, 2))
      L(x, 540, 1530, 'PAGE 3', pop01(t, t0 + 1.4, 0.3, 2.2), GOLD, -0.03, 44)
      sparkles(x, t, 540, 1080, t0 + 1.4, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
