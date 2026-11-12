// r2t0398: star_talk ROLLCALL, "Holiday market. | By sign." (signs3kit social cut, music: lofi · G). Ending: callback.
//   ♈ whole market in four minutes · ♉ every free sample, twice · ♊ friends with every vendor · ♋ an ornament for every
//   cousin (43) · ♌ light-up sweater outshone the tree · ♍ mapped every stall · ♎ two scarves, forty minutes · ♏ found the
//   secret stall · ♐ tried to buy the reindeer · ♑ haggled a candle for an hour · ♒ bought a frog nutcracker · ♓ cried at
//   the snow globe.   group: "Bags full. | Wallets empty."   callback: "The reindeer? | Still not for sale."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b6b', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
const TRAY = ['.C.C.C.C.', 'CCCCCCCCC', 'KKKKKKKKK', '.KKKKKKK.']
const ORN = ['...Y...', '..Y.Y..', '.RRRRR.', 'RRWRRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..']
const SWEAT = ['..RRRRRRR..', '.RRRRRRRRR.', 'RRRRRRRRRRR', 'RRRRRRRRRRR', 'RR.RRRRR.RR', 'RR.RRRRR.RR', '...RRRRR...', '...RRRRR...']
const TREE = ['....G....', '...GGG...', '..GGGGG..', '...GGG...', '..GGGGG..', '.GGGGGGG.', 'GGGGGGGGG', '....B....', '....B....']
const SCARF = ['SSSS', 'SWSS', 'SSSS', 'SSWS', 'SSSS', 'SWSS', 'SSSS', 'SSWS', 'F.F.']
const DEER = ['B.B.....', '.BB.....', '.BBBB...', 'BRBBB...', '.BBBBBBB', '...BBBBB', '...B.B.B', '...B.B.B']
const DEER_C = { B: '#c98f5a', R: RED }
const CANDLE = ['...Y...', '..YOY..', '...K...', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', 'KKKKKKK']
const FROG = ['..RRRR..', '..RRRR..', '.RRRRRR.', 'GWGGGGWG', 'GKGGGGKG', 'GGGGGGGG', 'GGWWWWGG', '.GGGGGG.', '.G....G.']
const GLOBE = ['...WWWWW...', '.WWSSSSSWW.', 'WSSSWSSSSSW', 'WSSSSSGSSSW', 'WSSWSGGGSSW', 'WSSSGGGGGSW', '.WSSSSBSSW.', '..WWWWWWW..', '.RRRRRRRRR.', 'RRRRRRRRRRR']
const GLOBE_C = { W: '#c4f0ff', S: '#2a4a8a', G: GREEN, B: '#8a4a2e', R: RED }
function snow(x, t, cx, cy, w, h, n = 14) {
  x.save(); x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) { const ph = ((t * 0.35 + i * 0.173) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.fillRect(cx - w / 2 + ((i * 0.618) % 1) * w + 10 * Math.sin(t + i), cy - h / 2 + ph * h, 8, 8) }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Did the whole market | in *four minutes.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const s = Math.min(240, Math.floor(clamp((lt - 0.3) / 1.2) * 240))
      L(x, 800, 780, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.25, 0.3, 2), BONE, -0.04, 64)
      L(x, 800, 960, 'DONE. NEXT?', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 40, CREAM)
    } },
  { sign: 'taurus', cap: 'Tried every free sample. | *Twice.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TRAY, { C: '#ffe36a', K: '#8a4a2e' }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 37)
      L(x, 800, 720, `SAMPLE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.04, 40)
      bubble(x, 800, 1080, 'for research.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Best friends with | *every vendor.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['hi Marge!', 'hi Tomas!', 'hi Bea!', 'hi Lou!']
      W.forEach((w, i) => bubble(x, 700 + (i % 2) * 190, 640 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 32, col: i % 2 ? '#ffe36a' : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'An ornament | for *every cousin.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const COLS = [RED, SKYB, GOLD, PINK, MINT, LAV]
      for (let i = 0; i < 6; i++) drawBits(x, ORN, { Y: GOLD, R: COLS[i], W: '#ffffff' }, 680 + (i % 3) * 120, 820 + Math.floor(i / 3) * 140, 10 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      L(x, 800, 1110, 'COUSINS: 43', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 36)
      if (k < 0) return
    } },
  { sign: 'leo', cap: 'Light-up sweater. | *Outshone the tree.*', mood: 'sparkle', look: [-1, 0], star: { x: -170, y: 0 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SWEAT, { R: RED }, F.x, F.cy + 112, 15 * k)
      if (k > 0.8) for (let i = 0; i < 6; i++) { if (Math.floor(t * 6 + i) % 2) continue; x.fillStyle = [GOLD, MINT, SKYB][i % 3]; x.fillRect(F.x - 50 + (i % 3) * 42, F.cy + 80 + Math.floor(i / 3) * 40, 14, 14) }
      drawBits(x, TREE, { G: '#2f7d3a', B: '#8a4a2e' }, 820, 900, 22 * pop01(t, P.t0 + 0.5, 0.3, 2), { alpha: lt > 1.2 ? 0.45 : 1 })
      L(x, 820, 650, 'THE TREE: OUTSHONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Mapped every stall. | *Colour-coded.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 }, () => {
        const COLS = [RED, GREEN, GOLD, SKYB, PINK, LAV]
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 9)
        for (let i = 0; i < 9; i++) { x.fillStyle = i < n ? COLS[i % 6] : '#d8d2c2'; x.fillRect(-130 + (i % 3) * 92, -130 + Math.floor(i / 3) * 92, 76, 76) }
        x.strokeStyle = INK; x.lineWidth = 4; x.setLineDash([10, 8]); x.beginPath(); x.moveTo(-92, -92); x.lineTo(92, -92); x.lineTo(92, 92); x.lineTo(-92, 92); x.stroke(); x.setLineDash([])
      })
      L(x, 800, 1100, 'ROUTE: OPTIMISED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Two scarves. | *Forty minutes.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCARF, { S: PINK, W: '#ffffff', F: PINK }, 710, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, SCARF, { S: '#ff9ec5', W: '#ffffff', F: '#ff9ec5' }, 890, 900, 22 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.08 })
      const m = Math.floor(clamp((lt - 0.4) / 1.5) * 40)
      L(x, 800, 660, `MINUTE ${m}`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, 0.04, 40)
      bubble(x, 800, 1130, 'they’re the same.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Found the secret stall | *nobody knows about.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.03, bg: '#2a2350' }, () => {
        x.fillStyle = '#5b2e8a'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 60, -150, 30, 70)
        x.fillStyle = INK; x.fillRect(-60, -20, 120, 170); x.fillStyle = GOLD; x.fillRect(30, 60, 14, 14)
      })
      L(x, 800, 660, 'INVITE ONLY', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#c97bff', 0.04, 38, CREAM)
      bubble(x, 800, 1110, 'password?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tried to buy | *the reindeer.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DEER, DEER_C, 820, 940, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 760, 650, 'how much for him?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 820, 1150, 'NOT FOR SALE', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 34, CREAM)
    } },
  { sign: 'capricorn', cap: 'Haggled over one candle | *for an hour.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CANDLE, { Y: '#ffe36a', O: '#ffb34a', K: INK, W: BONE }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = lt > 1.4
      L(x, 800, 660, p ? '$12 → $11.50' : '$12', 1, BONE, 0.04, 44)
      if (p) L(x, 800, 1120, 'A VICTORY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Bought the weirdest thing. | A *frog nutcracker.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FROG, { R: RED, G: GREEN, W: '#ffffff', K: INK }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 3) })
      L(x, 800, 660, 'ONE OF ONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, 0.04, 38)
      L(x, 800, 1130, 'HIS NAME IS DOUG', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Shook a snow globe. | *Sobbed.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sh = lt > 0.4 && lt < 0.9 ? 0.2 * Math.sin(t * 40) : 0
      drawBits(x, GLOBE, GLOBE_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: sh })
      if (lt > 0.6) snow(x, t, 800, 850, 200, 160, 10)
      L(x, 800, 650, 'IT’S SO TINY', pop01(t, P.t0 + 1.1, 0.3, 2.4), SKYB, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0398', key: 'G', accent: ACC, ending: 'callback',
  title: 'Holiday market. | *By sign.*',
  cameos: CAMEOS,
  group: { cap: 'Bags full. | *Wallets empty.*' },
  last: {
    text: 'The reindeer? | *Still not for sale.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 360, 1090, 300 * k, { mood: lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], seed: 85, glyph: false, hops: [t0 + 1.2, t0 + 1.8] })
      drawBits(x, DEER, DEER_C, 760, 1080, 34 * pop01(t, t0 + 0.5, 0.4, 2), { sx: -1 })
      if (lt > 1.0) bubble(x, 720, 820, 'what about now?', pop01(t, t0 + 1.0, 0.25, 2.4), { size: 40, tail: 'bl' })
      snow(x, t, 540, 1000, 800, 500, 18)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
