// r2a0559: star_advice, ADVICE ROLLCALL, "Your sign’s | perfect book." (topic: each sign’s perfect book genre; signs3kit social cut, music: lofi · E).
// Twelve signs, one warm, specific book pick each with a light visual gag (every gag is a book cover). Ending: group.
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, steam, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

/** a chunky pixel book: coloured cover, spine, cream pages, a title */
function book(x, cx, cy, k, title, col, { rot = 0.05, w = 250, h = 320, size = 40, ink = INK, open = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2 + 10, -h / 2 + 6, w - 4, h - 4)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w - 12, h - 8)
  x.fillStyle = 'rgba(0,0,0,0.22)'; x.fillRect(-w / 2, -h / 2, 22, h - 8)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2 + 40, -h / 2 + 30, w - 90, 8); x.fillRect(-w / 2 + 40, h / 2 - 54, w - 90, 8)
  x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(title).split('|').forEach((l, i, a) => x.fillText(l.trim(), 6, (i - (a.length - 1) / 2) * size * 1.1))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fast thrillers. | *Tiny chapters.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      book(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'RUN!', '#ff6b5a', { size: 70 })
      L(x, 800, 660, `CHAPTER ${Math.min(88, 1 + Math.floor(lt * 40))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 32)
      L(x, 800, 1090, 'FINISHED BY LUNCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Cozy cookbooks. | *Snacks* encouraged.', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'SOUP | & BREAD', '#5fd068', { size: 44 })
      bits(x, 'MUG', 880, 1040, 12 * pop01(t, P.t0 + 0.8, 0.3, 2)); if (lt > 1.0) steam(x, t, 872, 990, { n: 2 })
      L(x, 760, 650, 'PAGE STAINS: LOVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Short stories. | *Five at once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COL = ['#ffd23a', '#6fc3ff', PINK, MINT, '#c97bff']
      for (let i = 0; i < 5; i++) book(x, 680 + i * 60, 880 - (i % 2) * 30, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), '', COL[i], { w: 120, h: 170, rot: (i - 2) * 0.12 })
      L(x, 800, 1090, 'BOOKMARKS: 5', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Family sagas. | Keep *tissues* close.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'THE | GRANDMAS', '#6fc3ff', { size: 40 })
      bits(x, 'TISSUE', 880, 1060, 11 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Big, bold memoirs. | *Yours* is next.', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      book(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'ME: | VOL. 3', '#ffb34a', { size: 52 })
      sparkles(x, t, 800, 860, P.t0 + 0.7, 8, 210, 0.2)
      L(x, 800, 650, 'BESTSELLER (AT HOME)', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Whodunits. | Solved *by page ten.*', mood: lt => lt < 1.3 ? 'squint' : 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'WHO | DID IT?', '#7dffb0', { size: 44 })
      bits(x, 'LENS', 890, 760, 13 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1090, 'IT WAS THE BUTLER', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Love stories with | *gorgeous covers.*', mood: 'heart', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), '♡', PINK, { size: 120, ink: '#ffffff' })
      hearts(x, t, 800, 760, P.t0 + 0.9, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
      L(x, 800, 1090, 'MATCH: YOU + THIS BOOK', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Twisty mysteries. | *By candlelight.*', mood: lt => lt < 1.2 ? 'neutral' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 770, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'THE | LOCKED | ROOM', '#7a3aa8', { size: 36, ink: BONE })
      bits(x, 'CANDLE', 900, 1030, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 780, 640, 'TWIST: CALLED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c97bff', 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Travel stories. | *Then* the trip.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'FAR | AWAY', '#ff9a4a', { size: 52 })
      bits(x, 'PLANE', lerp(560, 880, clamp((lt - 0.8) / 1.2)), 660, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: Math.PI / 2 })
      L(x, 800, 1090, 'BOOKED IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Life stories of | *self-made* people.', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'FROM | ZERO', '#2fc79a', { size: 52 })
      L(x, 800, 650, 'NOTES: 41 PAGES', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.05, 30)
      L(x, 800, 1090, 'INSPIRED. RESTED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Sci-fi. | *The weirder,* the better.', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'MOON | COWS', '#6fc3ff', { size: 52 })
      L(x, 800, 650, 'GENRE: YES', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.05, 32)
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 200, 0.5, [MINT, SKYB, BONE])
    } },
  { sign: 'pisces', cap: 'Poetry. | Read it, *cry, repeat.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'tiny | moons', '#b7a6ff', { size: 48 })
      L(x, 800, 1090, 'UNDERLINED: ALL OF IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const COVER = ['#ff6b5a', '#5fd068', '#ffd23a', '#6fc3ff', '#ffb34a', '#7dffb0', PINK, '#7a3aa8', '#ff9a4a', '#2fc79a', '#6fc3ff', '#b7a6ff']
const F = makeFilm({
  id: 'r2a0559', key: 'E', accent: ACC, ending: 'group',
  title: 'Your sign’s | *perfect book.*',
  cameos: CAMEOS,
  group: {
    cap: 'Find your book. | *Take your time.*',
    draw(x, t, lt) { for (let i = 0; i < 6; i++) book(x, 400 + i * 56, 690, pop01(t, t - lt + 1.2 + i * 0.08, 0.3, 2), '', COVER[i * 2], { w: 52, h: 180, rot: i === 5 ? 0.18 : 0 }) ; for (let i = 0; i < 4; i++) book(x, 740, 760 - i * 40, pop01(t, t - lt + 1.7 + i * 0.08, 0.3, 2), '', COVER[i * 3 + 1], { w: 170, h: 38, rot: 0 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
