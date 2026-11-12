// r2t0570: THE SIGNS AS… v3, "The signs | *on the boardwalk.*" (signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order, each the most extreme version of itself on the boardwalk. Ending: lesson.
//   ♈ rode the coaster eleven times, front row · ♉ funnel cake the size of a tyre · ♊ talked to every vendor, twice
//   · ♋ won a giant plushie for a stranger's kid · ♌ caricature? asked for a mural · ♍ sunscreen every eleven minutes
//   · ♎ photo booth with their match, forty strips · ♏ stared down the fortune machine, it blinked first
//   · ♐ rented a bike, ended up two towns over · ♑ now owns the lemonade stand · ♒ gave the seagulls a speech
//   · ♓ watched the sunset, wept, ninety photos.
//   group "Sandy shoes. | *Zero regrets.*"  lesson "Best days are simple. | *Sun. Snacks. You.*"
//   last "Same time | *next summer?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

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
// boardwalk planks under every card
function planks(x) {
  x.save(); x.beginPath(); x.rect(110, 1080, 860, 140); x.clip()
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#8a5a36' : '#9b6a42'; x.fillRect(110, 1090 + i * 34, 860, 30) }
  x.fillStyle = 'rgba(20,12,48,0.5)'; for (let i = 0; i < 9; i++) x.fillRect(140 + i * 100 + (i % 2) * 30, 1090, 4, 140)
  x.restore()
}
const COASTER = ['...RRRRRRRR..', '..RYYYYYYYYR.', 'RRRRRRRRRRRRR', 'RRRRRRRRRRRRR', '.KK.......KK.', '.KK.......KK.']
const FUNNEL = ['....WWWWWW....', '..WWwWWWWwWW..', '.WWWWWwWWWWWW.', 'WWwWWWWWWwWWWW', 'WWWWWWwWWWWWwW', '.WWwWWWWWWWWW.', '..WWWWWwWWWW..', '....WWWWWW....']
const BEAR = ['.BB.....BB.', 'BBBBBBBBBBB', '.BBBBBBBBB.', '.BKBBBBBKB.', '.BBBBNBBBB.', '..BBBBBBB..', '.BBBBBBBBB.', 'BBBPPPPPBBB', 'BBBPPPPPBBB', '.BBBBBBBBB.', '.BB.....BB.']
const BOTTLE = ['.KK.', '.KK.', 'YYYY', 'YOOY', 'YOOY', 'YYYY', 'YYYY']
const BIKE = ['......KK.....', '.....K.......', 'KKKKKKKKK....', '.K....K.K....', 'WWW..KKKWWW..', 'W.W..K..W.W..', 'WWW.....WWW..']
const GULL = ['WW...WW', '.WW.WW.', '..WWW..']
const STALL = ['YWYWYWYWYWYW', 'YWYWYWYWYWYW', 'B..........B', 'B..........B', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']
const MACHINE = ['.PPPPPPPP.', 'PPGGGGGGPP', 'PG......GP', 'PG..EE..GP', 'PG......GP', 'PPGGGGGGPP', 'PPPPPPPPPP', 'PPPYYYYPPP', 'PPPPPPPPPP', 'PP......PP']

const LS = { x: -190 }
const CAMEOS = [
  { sign: 'aries', cap: 'Rode the coaster | *eleven times. Front row.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.6, 1.2, 1.8],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      const a = lt * 2.2
      x.save(); x.fillStyle = '#6b62a8'; for (let i = 0; i <= 6; i++) { const px = 600 + i * 60; x.fillRect(px - 4, 900 - Math.sin(i / 6 * Math.PI * 2) * 140, 8, 1080 - (900 - Math.sin(i / 6 * Math.PI * 2) * 140)) } x.strokeStyle = '#c9c9d8'; x.lineWidth = 12; x.beginPath(); for (let i = 0; i <= 30; i++) { const px = 600 + i * 12, py = 900 - Math.sin(i / 30 * Math.PI * 2) * 140; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke(); x.restore()
      const u = (a % 1), px = 600 + u * 360, py = 900 - Math.sin(u * Math.PI * 2) * 140 - 30
      drawBits(x, COASTER, { R: RED, Y: GOLD, K: INK }, px, py, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, `RIDE #${Math.min(11, 1 + Math.floor(lt * 4.5))}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.05, 36)
    } },
  { sign: 'taurus', cap: 'Ordered a funnel cake | *the size of a tyre.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: LS,
    back(x) { planks(x) },
    front(x, t, lt, P) {
      drawBits(x, FUNNEL, { W: '#f2d39a', w: '#ffffff' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.4, 1.8))
      L(x, 790, 650, 'SIZE: XXXL', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.05, 34)
      L(x, 790, 1050, 'SHARING: NO', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Talked to every vendor. | *Twice.*', mood: 'sparkle', look: [1, 0], star: LS, hops: [0.5, 1.0, 1.5],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      const W = ['hi corn guy!', 'love the hat!', 'hi again!', 'it’s me again!']
      W.forEach((w, i) => bubble(x, 760 + (i % 2) * 70, 630 + i * 100, w, pop01(t, P.t0 + 0.3 + i * 0.35, 0.22, 2.2), { size: 32, tail: 'bl', col: i % 2 ? LAV : BONE }))
    } },
  { sign: 'cancer', cap: 'Won a giant plushie | *for a stranger’s kid.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    back(x) { planks(x) },
    front(x, t, lt, P) {
      drawBits(x, BEAR, { B: '#c98f5a', K: INK, N: INK, P: PINK }, 720, 870, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 890, 1000, 120 * k, { mood: 'heart', look: [-1, 0], seed: 44, glyph: false, glow: 0.4, hops: [P.t0 + 1.6] })
      hearts(x, t, 820, 900, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Caricature artist? | *Asked for a mural.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.1],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      card(x, 790, 820, 360, 340, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        signChar(x, t, 'leo', 0, 20, 220, { mood: 'wink', seed: 9, glyph: false, glow: 0.3 })
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('“A SMALL ONE”', 0, -140)
      })
      L(x, 790, 1050, 'SIZE: WHOLE WALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Sunscreen reapplied | *every eleven minutes.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: LS,
    back(x) { planks(x) },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: INK, Y: '#ffd23a', O: '#ff6b5a' }, 760, 870, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      L(x, 880, 700, `NEXT COAT: 0:${String(59 - Math.floor(lt * 20) % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.04, 28)
      L(x, 800, 1050, 'SPF: 100', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Photo booth with a match. | *Forty strips.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: LS, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      for (let s = 0; s < 3; s++) card(x, 700 + s * 100, 850 + s * 14, 110, 360, pop01(t, P.t0 + 0.2 + s * 0.3, 0.3, 2), -0.1 + s * 0.1, x => {
        for (let i = 0; i < 3; i++) { x.fillStyle = ['#ffd0e0', '#d6ffe6', '#e3c8ff'][i]; x.fillRect(-44, -160 + i * 110, 88, 96); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, -112 + i * 110, 6) }
      })
      L(x, 790, 650, '✦ MATCHED', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 790, 1080, 'STRIPS: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Stare-off with a fortune machine. | *It blinked first.*', mood: 'squint', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      const blink = lt > 1.2 && lt < 1.45
      drawBits(x, MACHINE, { P: '#7a2e6a', G: GOLD, E: blink ? '#7a2e6a' : '#8fe3ff', Y: GOLD }, 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 620, 'FORTUNES: ON', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.04, 28)
      L(x, 800, 1060, 'SCORPIO: 1  MACHINE: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 24, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Rented a bike. | *Ended up two towns over.*', mood: 'sparkle', look: [1, 0], star: LS, hops: [0.4, 0.8, 1.2],
    back(x) { planks(x) },
    front(x, t, lt, P) {
      drawBits(x, BIKE, { K: '#ffb34a', W: '#e8e8f4' }, 730 + Math.min(lt, 1.4) * 50, 900, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 860, 680, 300, 90, pop01(t, P.t0 + 1.0, 0.3, 2.2), 0.04, x => { x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('NEXT TOWN →', 0, 0) }, '#5fd068')
      L(x, 800, 1060, 'RETURN: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Bought the lemonade stand. | *Franchising by noon.*', mood: 'neutral', look: [1, 0], star: LS,
    back(x) { planks(x) },
    front(x, t, lt, P) {
      drawBits(x, STALL, { Y: '#ffd23a', W: PAPER, B: '#2fc79a' }, 790, 890, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 960, 'CAPRI-CORN LEMON CO.', pop01(t, P.t0 + 0.7, 0.3, 2.2), PAPER, 0, 22)
      L(x, 790, 660, 'LOCATIONS: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Gave the seagulls | *a speech on freedom.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    back(x) { planks(x) },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, GULL, { W: PAPER }, 680 + i * 80 + Math.sin(t * 3 + i) * 10, 940 - (i % 2) * 50 + Math.sin(t * 4 + i) * 8, 10 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2))
      bubble(x, 790, 660, 'you were born | to be free!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1050, 'GULLS: MOVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Saw the sunset. | *Wept. Ninety photos.*', mood: 'heart', tears: 3, look: [1, 0], star: LS,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.5, 1.6)
      x.save(); x.globalAlpha = clamp(k); x.beginPath(); x.rect(110, 480, 860, 600); x.clip()
      const g = x.createLinearGradient(0, 600, 0, 1080); g.addColorStop(0, 'rgba(255,143,177,0)'); g.addColorStop(1, 'rgba(255,179,74,0.55)'); x.fillStyle = g; x.fillRect(110, 480, 860, 600)
      x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(790, 1040, 120, Math.PI, 0); x.fill()
      x.restore(); planks(x)
    },
    front(x, t, lt, P) {
      L(x, 800, 650, `PHOTO ${Math.min(90, 1 + Math.floor(lt * 40))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 34)
    } },
]

// keep the hook on two lines: shrink the title block if it runs wide
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0570', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs | *on the boardwalk.*',
  cameos: CAMEOS,
  group: { cap: 'Sandy shoes. | *Zero regrets.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'wink', 'happy', 'heart', 'squint', 'sparkle', 'neutral', 'happy', 'heart'] },
  lesson: { text: 'Best days are simple. | *Sun. Snacks. You.*', chip: 'MOOD: GOLDEN' },
  last: { text: 'Same time | *next summer?*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
