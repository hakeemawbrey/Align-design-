// r2t0574: THE SIGNS AS… v3, "The signs | *at a bake sale.*" (~54 s vertical, signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each the most extreme version of itself at the bake sale. Ending: group.
//   0.0–3.6    "The signs | *at a bake sale.*"
//   3.6–49.2   ♈ opened early, yesterday · ♉ came to buy, bought everything · ♊ talked to everyone, sold nothing
//              · ♋ every cookie comes with a hug · ♌ gave a speech about their muffins · ♍ labelled every crumb
//              · ♎ priced it fairly, then made it free · ♏ mystery brownies, don't ask · ♐ snacks from six countries
//              · ♑ receipts for every cookie · ♒ cookies shaped like planets · ♓ adopted the sad cupcake, cried
//  49.2        "Profit: zero. | *Vibes: immaculate.*"  the cash box pops open: three dollars. (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffb38a', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4', CHOC = '#5a3020'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const COOKIE = ['..CCCC..', '.CCdCCC.', 'CCCCCdCC', 'CdCCCCCC', 'CCCCdCCC', '.CCCCCC.', '..CCCC..']
const COOKIE_C = { C: '#e0a85a', d: CHOC }
const MUFFIN = ['..PPPPP..', '.PPpPPPP.', 'PPPPPpPPP', 'WWWWWWWWW', '.WwWwWwW.', '.WwWwWwW.', '..WWWWW..']
const MUFFIN_C = { P: '#c97b4a', p: CHOC, W: '#ff8fb1', w: '#ffd0e0' }
const CUP = ['....R....', '..PPPPP..', '.PPPPPPP.', 'PPPPPPPPP', 'WWWWWWWWW', '.WwWwWwW.', '..WWWWW..']
const CUP_C = { R: RED, P: '#ffd0e0', W: SKYB, w: '#d8f6ff' }
const BROWNIE = ['BBBBBBBB', 'BbBBBbBB', 'BBBBBBBB', 'BBbBBBbB', 'BBBBBBBB']
const SATURN = ['.....CCCC.....', '...CCCCCCCC...', 'RRRRRRRRRRRRRR', '..CCCCCCCCCC..', '...CCCCCCCC...', '.....CCCC.....']
const BOX = ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPPPPWWPPPPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// the bake-sale table along the bottom of the panel
function table(x, k, col = '#ff8fb1') {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(560, 1060, 420, 30)
  x.fillStyle = col; x.fillRect(566, 1064, 408, 22)
  for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? PAPER : col; x.fillRect(566 + i * 45, 1086, 45, 40) }
  x.restore()
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Opened early. | *Yesterday.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.5, 1.1],
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.15, 0.3, 2), '#ff6b5a')
      card(x, 790, 840, 260, 140, pop01(t, P.t0 + 0.3, 0.3, 2), -0.05, () => txt(x, 'OPEN!', 0, 4, 64, RED, INTER, 800))
      L(x, 790, 660, 'SALE STARTS: TOMORROW', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 26)
    } },
  { sign: 'taurus', cap: 'Came to buy. | *Bought everything.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, BOX, { K: BROWN, P: '#ffd0e0', W: PAPER }, 800 + (i % 2 ? 12 : -12), 1040 - i * 72, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 660, 'SOLD OUT (TO ME)', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Talked to everyone. | *Sold nothing.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.15, 0.3, 2), GOLD)
      for (let i = 0; i < 4; i++) drawBits(x, COOKIE, COOKIE_C, 640 + i * 100, 1030, 9)
      const W = ['hi!! so anyway—', 'you have to hear—', 'ok ok ok, wait—']
      bubble(x, 790, 760, W[Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.5))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 920, 'SALES: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'cancer', cap: 'Every cookie | *comes with a hug.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 680, 280, 90, pop01(t, P.t0 + 0.6, 0.3, 2), 0.04, () => txt(x, '1 cookie + 1 hug', 0, 2, 30, INK), SKYB)
      hearts(x, t, 800, 1060, P.t0 + 1.0, { n: 7, life: 2.0, spread: 240, cell: 8, seed: 2 })
      L(x, 800, 1140, 'HUGS: NON-REFUNDABLE', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 26)
    } },
  { sign: 'leo', cap: 'Gave a speech | *about their muffins.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MUFFIN, MUFFIN_C, 800, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'this muffin | changed my life.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1150, 'SPEECH: 20 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), ORANGE, -0.04, 30)
      sparkles(x, t, 800, 980, P.t0 + 1.2, 7, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Labelled every crumb. | *With allergens.*', mood: 'squint', look: [1, 0.5], star: LS,
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 760, 980, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 820, 760, 300, 210, pop01(t, P.t0 + 0.5, 0.3, 2), 0.04, x => {
        txt(x, 'CONTAINS:', 0, -70, 26, INK, MONO, 700)
        const R = ['wheat · butter', 'sugar · love', '1 (one) chip']
        const n = Math.min(3, Math.floor(clamp((lt - 0.6) / 1.0) * 3) + 1)
        for (let i = 0; i < n; i++) txt(x, R[i], 0, -22 + i * 42, 28, '#4a4470', INTER, 700)
      })
      L(x, 800, 1140, 'CRUMB #1 OF 212', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.05, 30)
    } },
  { sign: 'libra', cap: 'Priced it fairly. | *Then made it free.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 800, 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 790, 260, 130, pop01(t, P.t0 + 0.4, 0.3, 2), -0.04, x => {
        txt(x, '$2', 0, 2, 64, INK, MONO, 700)
        if (lt > 1.1) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(-80, 30); x.lineTo(80, -30); x.stroke() }
      })
      L(x, 800, 650, 'FREE. FOR FAIRNESS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Mystery brownies. | *Don’t ask.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, BROWNIE, { B: CHOC, b: '#3a1e14' }, 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 1070, 200, 70, pop01(t, P.t0 + 0.5, 0.3, 2), 0.04, () => txt(x, '???', 0, 2, 40, INK, MONO, 700))
      L(x, 800, 680, 'RECIPE: CLASSIFIED', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#c97bff', -0.04, 30, PAPER)
      bubble(x, 800, 1170, 'just trust me.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Brought snacks | *from six countries.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], star: RS, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const COLS = [['#e23d4e', PAPER], ['#2fc79a', GOLD], ['#5fb4ff', PAPER], [GOLD, RED], ['#c97bff', MINT], [ORANGE, '#2a2350']]
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), c = i % 3, r = Math.floor(i / 3)
        card(x, 200 + c * 100, 800 + r * 150, 80, 110, k, (i % 2 ? 0.06 : -0.06), x => { x.fillStyle = COLS[i][0]; x.fillRect(-40, -55, 80, 40); x.fillStyle = COLS[i][1]; x.fillRect(-28, 0, 56, 36) })
      }
      L(x, 300, 1130, 'PASSPORT: FULL', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'A receipt | *for every cookie.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const len = 120 + 360 * clamp((lt - 0.3) / 1.4)
      x.save(); x.fillStyle = INK; x.fillRect(686, 620, 228, len + 10); x.fillStyle = PAPER; x.fillRect(692, 626, 216, len)
      for (let i = 0; i * 34 + 40 < len; i++) { txt(x, i % 2 ? 'cookie' : 'cookie', 712, 652 + i * 34, 22, '#4a4470', MONO, 700, 'left'); txt(x, '$1.00', 890, 652 + i * 34, 22, INK, MONO, 700, 'right') }
      x.restore()
      L(x, 800, 1150, 'TAX: INCLUDED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Cookies shaped | *like planets.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SATURN, { C: '#e0a85a', R: SKYB }, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      drawBits(x, COOKIE, { C: '#ff8f6a', d: '#c05a3a' }, 700, 1050, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, COOKIE, { C: '#8fb4ff', d: '#4a6fd0' }, 890, 1050, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 680, 'SATURN: $3', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Adopted the sad cupcake. | *Cried.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CUP, { ...CUP_C, R: GREY, P: '#d8d0e0' }, 800, 940, 20 * k, { rot: 0.2, sy: 0.85 })
      L(x, 800, 1110, 'LAST ONE LEFT', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, 0.04, 30)
      bubble(x, 800, 680, 'you’re coming | home with me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 800, 880, P.t0 + 1.6, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0574', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs | *at a bake sale.*',
  cameos: CAMEOS,
  group: {
    cap: 'Profit: zero. | *Vibes: immaculate.*',
    moods: ['sparkle', 'sleepy', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'squint', 'sparkle', 'neutral', 'wide', 'wide'],
    draw(x, t, lt) {
      const t0 = t - lt
      card(x, 540, 640, 300, 170, pop01(t, t0 + 1.6, 0.35, 2), -0.03, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-150, -85, 300, 50); txt(x, 'CASH BOX', 0, -60, 28, PAPER, MONO, 700)
        txt(x, 'TOTAL: $3', 0, 20, 46, INK, MONO, 700)
      }, '#d8f0ff')
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
