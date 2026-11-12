// r2t0761: star_talk, ROLLCALL, "The signs | at an auction." (signs3kit social cut, lofi · C). Ending: callback
// (Sagittarius' accidental canoe comes back as the ride home).
//   ♈ raised the paddle, never lowered it · ♉ bid on the buffet · ♊ bid against themself · ♋ adopted a stranger's
//   photo album · ♌ took the podium, sold autographs · ♍ magnifier, found one smudge · ♎ paddle half up for an hour
//   (does it match my chart?) · ♏ bid from behind a plant · ♐ waved at a friend, now owns a canoe · ♑ set a budget,
//   spent nothing · ♒ won the weirdest lot: forty old keys · ♓ cried at a lamp, named it (it's a match)
//   group "Nobody left | *empty-handed.*"   last "Sag's ride home? | *The canoe.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a'

const CANOE = [
  'R..................R',
  'RR................RR',
  'RRRRRRRRRRRRRRRRRRRR',
  '.RWWWWWWWWWWWWWWWWR.',
  '..RRRRRRRRRRRRRRRR..',
  '....RRRRRRRRRRRR....',
]
const CANOE_C = { R: '#d9653b', W: '#ffd9a0' }
const PLANT = [
  '..G...G..G...',
  '.GGG.GGG.GGG.',
  'GGGGGGGGGGGGG',
  '.GGGGGGGGGGG.',
  'GGGGGGGGGGGGG',
  '.GGGGGGGGGGG.',
  '...GGGGGGG...',
  '....PPPPP....',
  '....PPPPP....',
  '.....PPP.....',
]
const PLANT_C = { G: '#4fbf6a', P: '#c97a4a' }
const ALBUM = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPWWPPWWPK', 'KPWWPPWWPK', 'KPPPPPPPPK', 'KPWWPPWWPK', 'KPWWPPWWPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const ALBUM_C = { K: INK, P: '#c97bff', W: '#fff4e2' }
const PODIUM = ['WWWWWWWWWW', 'WYYYYYYYYW', '.WWWWWWWW.', '.WWWWWWWW.', '.WWWWWWWW.', '.WWWWWWWW.', '.WWWWWWWW.', 'WWWWWWWWWW']
const PODIUM_C = { W: WOOD, Y: GOLD }

/** an auction paddle with a number on it */
function paddle(x, cx, cy, k, num, { rot = 0.08, col = CREAM, size = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * size, k * size)
  x.fillStyle = INK; x.fillRect(-14, 40, 28, 170); x.fillStyle = WOOD; x.fillRect(-8, 44, 16, 162)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, -20, 82, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 ${String(num).length > 3 ? 46 : 62}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(num), 0, -16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raised the paddle. | *Never lowered it.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 40) * 50 + 100
      paddle(x, 790, 800, pop01(t, P.t0 + 0.25, 0.3, 2), 7, { rot: 0.06 + 0.05 * Math.sin(t * 9) })
      L(x, 790, 1080, `BID: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 40)
      bubble(x, 400, 620, 'MORE!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Bid on the painting? | No. *The buffet.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'PLATE', 700, 1080, 16 * k); bits(x, 'PIZZA', 860, 1060, 12 * k, { rot: 0.2 }); bits(x, 'COOKIE', 790, 960, 14 * k)
    },
    front(x, t, lt, P) {
      L(x, 790, 760, 'SOLD: THE BUFFET', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, 0.05, 34)
      bubble(x, 790, 610, 'all of it, | please', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Kept bidding | against *themself.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const flip = Math.floor(lt * 2.6) % 2
      paddle(x, F.x - 150, F.cy - 130 - (flip ? 0 : 50), pop01(t, P.t0 + 0.2, 0.3, 2), 3, { rot: -0.2, size: 0.6 })
      paddle(x, F.x + 150, F.cy - 130 - (flip ? 50 : 0), pop01(t, P.t0 + 0.3, 0.3, 2), 3, { rot: 0.2, size: 0.6, col: '#ffe27a' })
      const n = 100 + Math.floor(Math.max(0, lt - 0.4) * 2.6) * 100
      L(x, 790, 820, `BIDDER 3 VS 3`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.05, 34)
      L(x, 790, 960, `NOW: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2), MINT, -0.04, 38)
    } },
  { sign: 'cancer', cap: 'Bought a stranger’s | *photo album.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ALBUM, ALBUM_C, 790, 860, 24 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.06 })
      L(x, 790, 1090, 'THEY NEED A HOME', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 32)
      hearts(x, t, 790, 780, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Took the podium. | Sold *autographs.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -160, y: -60 }, hops: [1.3],
    back(x, t, lt, P) { drawBits(x, PODIUM, PODIUM_C, 380, 1090, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 280, h: 200, head: 'LOT 1', headBg: '#ffb34a', headInk: INK, lines: ['signed by', 'ME ✦'], size: 40 })
      L(x, 790, 1060, 'BIDDING: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 34)
      sparkles(x, t, 790, 840, P.t0 + 1.0, 6, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Brought a magnifier. | Found *one smudge.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {   // a framed painting
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = GOLD; x.fillRect(-142, -112, 284, 224)
        x.fillStyle = '#6fc3ff'; x.fillRect(-120, -90, 240, 180); x.fillStyle = '#4fbf6a'; x.fillRect(-120, 20, 240, 70)
        x.fillStyle = '#ffe76a'; x.fillRect(50, -70, 40, 40)
        if (lt > 1.4) { x.fillStyle = '#7a6a5a'; x.fillRect(-60, -30, 10, 8) }
        x.restore()
      }
      const p = ease.inOutCubic(prog(lt, 0.5, 1.4))
      bits(x, 'LENS', lerp(900, 760, p), lerp(950, 800, p), 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1080, 'DEFECT: FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Paddle halfway up. | *For an hour.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.2) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P, F) {
      paddle(x, F.x + 170, F.cy - 20 - 30 * Math.sin(t * 2.5), pop01(t, P.t0 + 0.2, 0.3, 2), 6, { rot: 0.3, size: 0.75 })
      bubble(x, 790, 650, 'does it match | my chart?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1070, 'GOING ONCE… STILL', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.05, 30)
    } },
  { sign: 'scorpio', cap: 'Bid in secret. | From *behind a plant.*', mood: 'wink', look: [1, 0], star: { x: -200, s: 260 }, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, PLANT, PLANT_C, F.x + 30, F.cy + 130, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      paddle(x, F.x + 130, F.cy - 160, pop01(t, P.t0 + 1.0, 0.3, 2), '?', { rot: 0.15, size: 0.55, col: LAV })
      L(x, 790, 1060, 'BIDDER: UNKNOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Waved at a friend. | Now owns *a canoe.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', star: { x: 160 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'heyyy!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'br' })
      L(x, 330, 760, 'SOLD! TO THE WAVER', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.05, 30)
      drawBits(x, CANOE, CANOE_C, 340, 1060, 18 * pop01(t, P.t0 + 1.2, 0.35, 2), { rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Set a budget. | Spent *nothing.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 290, h: 360, head: 'RECEIPT', headBg: STEEL, headInk: INK, lines: ['bids: 0', 'won: 0', 'spent: 0', ['saved: ALL', '#2f8a48']], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1110, 'NAILED IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Won the weirdest lot. | *Forty old keys.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.12))
      for (let i = 0; i < n; i++) bits(x, 'KEY', 700 + (i % 3) * 90, 800 + Math.floor(i / 3) * 70, 9, { rot: (i * 0.7) % 1 - 0.5 })
      L(x, 790, 660, 'LOT 404: ???', pop01(t, P.t0 + 0.2, 0.3, 2), MINT, 0.05, 34)
      bubble(x, 790, 1080, 'they open | SOMETHING', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at an old lamp. | Bought it. *Named it.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01 && lt > 1.1) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff1b0'; x.beginPath(); x.ellipse(790, 860, 160, 130, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      bits(x, 'LAMP', 790, 900, 22 * k)
      L(x, 790, 660, 'HI, LAMPY ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 36)
      L(x, 790, 1110, "IT'S A MATCH", pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0761', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *at an auction.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody left | *empty-handed.*' },
  last: {
    text: 'Sag’s ride home? | *The canoe.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      const dx = lerp(-80, 80, ease.inOutCubic(prog(lt, 1.0, 3.6)))
      drawBits(x, CANOE, CANOE_C, 540 + dx, 1180, 30 * k, { rot: 0.04 * Math.sin(t * 2.2) })
      if (k > 0.01) signChar(x, t, 'sagittarius', 540 + dx, 1040, 300 * k, { mood: 'sparkle', seed: 40, hops: [t - lt + 1.2, t - lt + 2.2] })
      // little water ripples
      x.save(); x.fillStyle = SKYB; x.globalAlpha = 0.6 * k
      for (let i = 0; i < 8; i++) x.fillRect(240 + i * 80 + ((t * 40) % 80), 1250 + (i % 2) * 14, 40, 8)
      x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
