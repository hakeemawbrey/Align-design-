// r2t0538: star_talk, ROLLCALL, "The signs | *packing light.*" (topic: the signs packing for a trip; nobody packs light).
// signs3kit social cut, music: lofi · G. Ending: lesson.
//   ♈ packed in four minutes, forgot shoes · ♉ snacks first, clothes optional · ♊ fourteen outfits for day one
//   · ♋ brought the pillow and the blanket · ♌ packed the crown for the airport · ♍ laminated list, plus a backup list
//   · ♎ couldn't pick a jacket, brought eleven · ♏ all black, even the socks · ♐ packed a passport, bought the rest there
//   · ♑ packing spreadsheet, colour-coded · ♒ a telescope for a beach trip · ♓ cried waving bye to the house
//  group "Nobody packed | *a toothbrush.*"  lesson "Bring what you love. | *Leave room for more.*"  last "Aries’ shoes | *made the next trip.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#ffd23a'
const SHOE = ['......RRR.', '.....RRRR.', 'RRRRRRRRRR', 'RRRRRRRRRR', 'WWWWWWWWWW']
const SHOE_C = { R: RED, W: PAPER }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const JACKET = ['.JJ...JJ.', 'JJJJ.JJJJ', 'JJJJWJJJJ', 'JJJJWJJJJ', 'JJ.JWJ.JJ', 'JJ.JWJ.JJ', '...JWJ...']
const SCOPE = ['............WW', '..........WWWW', '........WWWWW.', '......WWWWW...', '....SSWWW.....', '..SSSS........', '...L..........', '..L.L.........', '.L...L........']
const SCOPE_C = { W: '#c9d4ff', S: '#6b62a8', L: WOOD }
const SOCK = ['.KK', '.KK', '.KK', 'KKK', 'KK.']

// an open suitcase (lid up) with a few items drawn inside by fill(x)
function openCase(x, cx, cy, k, inner, { col = ORANGE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 330, 260)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 120); x.fillStyle = col; x.fillRect(-160, -180, 320, 104)
  x.fillStyle = INK; x.fillRect(-170, -70, 340, 200); x.fillStyle = col; x.fillRect(-160, -60, 320, 180)
  x.fillStyle = '#3a2e55'; x.fillRect(-140, -45, 280, 150)
  inner && inner(x)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Packed in four minutes. | *Forgot shoes.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 1], star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 800, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 800, 660, 'DONE: 4 MIN', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 42, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, SHOE, SHOE_C, 800, 830, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
      label(x, 900, 790, '?', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.1 })
    } },
  { sign: 'taurus', cap: 'Snacks packed first. | *Clothes: optional.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      openCase(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), x2 => { bits(x2, 'cookie', -80, 40, 10); bits(x2, 'cake', 20, 30, 9); bits(x2, 'cookie', 100, 50, 10) })
      label(x, 790, 650, 'SNACK BAG 1 OF 3', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Fourteen outfits. | *For day one.*', mood: lt => ['wink', 'sparkle', 'wide'][Math.floor(lt * 3) % 3], look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 13.99)
      const cols = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      drawBits(x, JACKET, { J: cols[n % cols.length], W: PAPER }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(n) })
      label(x, 800, 650, `OUTFIT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'DAY 1 OF 2', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed their pillow. | *And their blanket.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'pillow', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'house', 800, 780, 15 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 620, 'HOME: TRAVEL SIZE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Packed the crown. | *For the airport.*', mood: 'sparkle', look: [1, -1], star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CROWN, CROWN_C, 800, 860, 22 * k, { rot: -0.08 })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 7, 150, 0.2, [GOLD, '#ffb34a', BONE])
      label(x, 800, 1050, 'CARRY-ON: ROYAL', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Laminated the packing list. | *Packed a backup.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 750, 790, pop01(t, P.t0 + 0.2, 0.3, 2), '☑ socks ×9 | ☑ socks ×9 | ☑ list', { head: 'PACKING LIST', headBg: MINT, size: 32, w: 300, rot: -0.05 })
      note(x, 860, 1060, pop01(t, P.t0 + 1.2, 0.3, 2), '☑ same | ☑ list | ☑ again', { head: 'BACKUP LIST', headBg: '#7dffb0', size: 30, w: 260, rot: 0.06 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a jacket. | *Brought eleven.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.13))
      const cols = [PINK, SKYB, MINT, GOLD, LAV]
      for (let i = 0; i < Math.min(n, 5); i++) drawBits(x, JACKET, { J: cols[i], W: PAPER }, 710 + (i % 3) * 95, 1060 - Math.floor(i / 3) * 170, 15 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { rot: (i - 2) * 0.08 })
      label(x, 800, 660, `JACKETS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Packed all black. | *Even the socks.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      openCase(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), x2 => { drawBits(x2, JACKET, { J: '#1b1236', W: '#3a2e55' }, -60, 30, 11, { outline: '#6b62a8' }); drawBits(x2, SOCK, { K: '#1b1236' }, 60, 40, 12, { outline: '#6b62a8' }); drawBits(x2, SOCK, { K: '#1b1236' }, 110, 50, 12, { outline: '#6b62a8' }) }, { col: '#5a4a8a' })
      label(x, 790, 650, 'PALETTE: BLACK', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Packed a passport. | *Bought the rest there.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.5, 1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(320, 870); x.rotate(-0.06); x.scale(k, k); x.fillStyle = INK; x.fillRect(-96, -130, 192, 260); x.fillStyle = '#3d4fa8'; x.fillRect(-88, -122, 176, 244); x.fillStyle = GOLD; x.beginPath(); x.arc(0, -10, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3d4fa8'; x.beginPath(); x.arc(0, -10, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('PASSPORT', 0, 80); x.restore() }
      label(x, 320, 640, 'BAG: THIS.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Packing spreadsheet. | *Colour-coded.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = PAPER; x.fillRect(-152, -142, 304, 284)
        const C = [MINT, GOLD, PINK, SKYB]
        for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const on = clamp((lt - 0.3) * 6 - (r * 4 + c) * 0.25); x.fillStyle = on > 0.5 ? C[(r + c) % 4] : '#e8dcc4'; x.fillRect(-140 + c * 72, -128 + r * 44, 64, 36) }
        x.restore()
      }
      label(x, 320, 1080, 'TAB 3 OF 9', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Packed a telescope. | *For the beach.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 800, 900, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bits(x, 'sun', 880, 650, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: t * 0.5 })
      bubble(x, 760, 1100, 'daytime stars | exist. probably.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Waved bye to the house. | *Sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'house', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'i’ll miss | you, house', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 800, 1100, 'TRIP: 2 NIGHTS', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0538', key: 'G', accent: ACC, ending: 'lesson',
  title: 'The signs | *packing light.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody packed | *a toothbrush.*', moods: ['wide', 'happy', 'wink', 'sleepy', 'sparkle', 'squint', 'heart', 'wink', 'sparkle', 'happy', 'wide', 'wide'] },
  lesson: { text: 'Bring what you love. | *Leave room for more.*', chip: 'BAGS: PACKED' },
  last: { text: 'Aries’ shoes | *made the next trip.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
