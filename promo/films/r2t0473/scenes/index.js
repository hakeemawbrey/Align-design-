// r2t0473: star_talk, BELIKE, "The last page? | Zodiacs be like." (topic: zodiacs reading the last page of a book)
// (signs3kit social cut, music: lofi · G). Twelve signs in zodiac order, each the most extreme version of itself at the
// end of a book. Ending: the group beat.
//   ♈ read the last page first · ♉ straight back to page one · ♊ six books at once · ♋ hugged the book for an hour
//   · ♌ wrote themself in as the hero · ♍ found a typo, wrote to the author · ♎ rooting for both love interests
//   · ♏ guessed the twist on page two · ♐ left halfway, living the sequel · ♑ book 52 of 52, on schedule · ♒ hated
//   the ending, wrote a new one · ♓ cried at the acknowledgments.
//  49.2   group (the ending): "The End? | *Not for us.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, ACC = '#ffd166'
/** an open book with a page caption */
function openBook(x, cx, cy, k, { left = '', right = '', col = '#6f8cff', rot = 0, size = 33 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -100, 380, 230)
  x.fillStyle = INK; x.fillRect(-196, -118, 392, 236)
  x.fillStyle = col; x.fillRect(-190, -112, 380, 224)
  x.fillStyle = PAPER; x.fillRect(-178, -104, 174, 206); x.fillRect(4, -104, 174, 206)
  x.fillStyle = '#d9c9ad'; x.fillRect(-6, -104, 12, 206)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${size}px ${INTER}`
  String(left).split('|').forEach((l, i, a) => x.fillText(l.trim(), -91, (i - (a.length - 1) / 2) * size * 1.25))
  String(right).split('|').forEach((l, i, a) => x.fillText(l.trim(), 91, (i - (a.length - 1) / 2) * size * 1.25))
  x.restore()
}
const BOOKS = ['#6f8cff', PINK, MINT, ORANGE, LAV, SKYB]

const CAMEOS = [
  { sign: 'aries', cap: 'Read the last page first. | *Done in four seconds.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.1],
    front(x, t, lt, P) {
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { left: '…', right: 'THE | END', col: RED })
      label(x, 800, 690, 'FINISHED ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.1, 7, 180, 0.2, [GOLD, ORANGE, BONE])
    } },
  { sign: 'taurus', cap: 'The end? | *Back to page one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const back = lt > 1.0
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), back ? { left: 'Chapter | One', right: 'once | upon…', col: GREEN } : { left: '…', right: 'THE | END', col: GREEN })
      label(x, 800, 1090, 'READ AGAIN (AGAIN)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Last page of one. | *Middle of six others.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 5.99)
      for (let i = 0; i < n; i++) drawBits(x, ['BBBBBBBBBBBB', 'BWWWWWWWWWWB', 'BBBBBBBBBBBB'], { B: BOOKS[i], W: PAPER }, 800 + (i % 2 ? 14 : -14), 1060 - i * 60, 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: i % 2 ? 0.05 : -0.05 })
      label(x, 800, 640, 'BOOKMARKS: 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'The end. | *Hugged it for an hour.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, ['BBBBBBBBB.', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BWWWWWWWBB', 'BBBBBBBBBB'], { B: SKYB, W: PAPER }, F.x + 120, F.cy + 30, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      hearts(x, t, F.x + 100, F.cy - 80, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 3 })
      label(x, 820, 1110, 'HOUR 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Last page? | *Starring: Leo.*', mood: 'sparkle', look: [1, -1], star: L, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { left: 'and then…', right: lt > 1.0 ? 'LEO | saved | everyone' : 'the hero | saved | everyone', col: GOLD, size: 28 })
      label(x, 800, 690, 'SEQUEL: ALSO LEO', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Found a typo. | *Wrote to the author.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      openBook(x, 800, 880, k, { left: 'they lived', right: 'happliy | ever | after', col: '#58c26a', size: 28 })
      const c = ease.outCubic(prog(lt, 0.6, 1.0))
      if (c > 0 && k > 0.5) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(891, 845, 80, 26, 0, 0, Math.PI * 2 * c); x.stroke(); x.restore() }
      label(x, 800, 1080, 'LETTER: SENT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two love interests? | *Rooting for both.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 720, 820, 'TEAM A', k, { size: 36, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
      label(x, 890, 940, 'TEAM B', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      label(x, 800, 1090, 'TEAM BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | *on page two.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { left: 'the twist:', right: 'it was | the | butler', col: '#c2375a' })
      bubble(x, 800, 680, 'called it.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Left halfway. | *Off living the sequel.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 800, 960, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 700, 'PAGE 140: ABANDONED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Finished on schedule. | *Book 52 of 52.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'jan: 4 ✓ | jun: 26 ✓ | dec: 52 ✓', { head: 'READING PLAN', headBg: BONE, size: 32, w: 340, font: MONO, weight: 700, rot: -0.03 })
      label(x, 800, 1090, 'ON TIME.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Hated the ending. | *Wrote a better one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1 ? { left: 'and then', right: 'ALIENS | ARRIVED', col: SKYB } : { left: 'and then', right: 'they | went home', col: SKYB })
      label(x, 800, 690, 'ENDING 2.0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the end. | *And the thank-yous.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      openBook(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { left: 'thank you, | mum', right: 'and my | editor', col: LAV, size: 28 })
      label(x, 800, 690, 'PAGES: DAMP', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0473', key: 'G', accent: ACC, ending: 'group',
  title: 'The last page? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'The End? | *Not for us.*',
    draw(x, t, lt) {
      label(x, 540, 720, 'THE END…?', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 44, bg: ACC, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
