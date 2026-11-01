// trpackastro: STARTER PACK, "Just got into astrology" (20 s vertical, Star Talk Trends §5.2, music: funk · F)
// Story 0–15.6, then the shared end card. The format engine is ./packkit.js (identical in every trpack* film).
//   0.1        "Just got into astrology | *starter pack*" over four empty slots (slot 4 is a pulsing "?").
//   1.71       1 · "a chart wheel (laminated)": ♌ Leo hugs a spinning twelve-colour wheel, with a laminate glare.
//   3.93       2 · "sudden opinions": "SO fire sign." "classic water move." "hmm. earthy."
//              THE STARS: "suddenly *everything* is a placement."
//   6.16       3 · "\"that's so Gemini\"": said about a lamp, a cloud, a sandwich… ♊ Gemini pops in: "hey!"
//   8.38       the "?" rattles. THE STARS: "and the *rare* item…"
//   9.49       4 · "asking everyone their moon": Leo with a clipboard asks a star, a dog and the actual Moon.
//   11.16      card cut → payoff: Leo asks the date; ♒ Aquarius: "my moon? nobody's ever *asked.*" The Moon blushes.
//   13.4       last line: "*Moon* sign, please."  Pisces cries behind the box the whole way.
import { makePack, drawBits, bubble, label, star, heart, R, INK, BONE, GOLD, signStar, prog, ease, lerp, clamp, r3 } from './packkit.js'

const LEO = signStar('leo'), GEM = signStar('gemini'), TAU = signStar('aquarius')
const IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const MOON = ['...MMMM...', '.MMMM.....', '.MMM......', 'MMMM......', 'MME.......', 'MMM.......', 'MMMM......', '.MMM......', '.MMMM.....', '...MMMM...']
const MOON_C = { M: '#ffe9a8', E: INK }
const DOG = ['BB.........', 'BBBB.......', 'BEBBBBBBBBT', 'BBBBBBBBBB.', 'N..BBBBBBB.', '...B.B.B.B.', '...B.B.B.B.']
const LAMP = ['..SSSS..', '.SSSSSS.', 'SSSSSSSS', '...PP...', '...PP...', '...PP...', '..PPPP..']
const CLOUD = ['..WWW.....', '.WWWWW.WW.', 'WWWWWWWWWW', 'WWWWWWWWWW', '.WWWWWWWW.']
const SAND = ['.BBBBBBBB.', 'BBBBBBBBBB', 'GGGGGGGGGG', 'RRRRRRRRRR', 'BBBBBBBBBB']
const CLIP = ['..KKK..', 'WWWWWWW', 'WLLLLLW', 'WWWWWWW', 'WLLLLLW', 'WWWWWWW', 'WLLLLLW', 'WWWWWWW']
const CLIP_C = { K: '#9a8fb8', W: '#f6efe2', L: '#7a6aa8' }

function wheel(x, cx, cy, r, rot) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  IDS.forEach((id, i) => {
    x.fillStyle = signStar(id).color
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, rot + i * Math.PI / 6, rot + (i + 1) * Math.PI / 6); x.closePath(); x.fill()
  })
  x.strokeStyle = INK; x.lineWidth = 3
  for (let i = 0; i < 12; i++) { const a = rot + i * Math.PI / 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.fillStyle = '#1b1236'; x.beginPath(); x.arc(0, 0, r * 0.52, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; for (let i = 0; i < 12; i++) { const a = rot + (i + 0.5) * Math.PI / 6; x.fillRect(Math.cos(a) * r * 0.76 - 4, Math.sin(a) * r * 0.76 - 4, 8, 8) }
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 2
  for (let i = 0; i < 3; i++) { const a = rot * 0.3 + i * 2.1; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45); x.lineTo(Math.cos(a + 1.9) * r * 0.45, Math.sin(a + 1.9) * r * 0.45); x.stroke() }
  x.restore()
}

// 1 · the laminated chart wheel
function chart(x, t, lt) {
  wheel(x, 150, 186, 116, lt * 0.5)
  // the laminate glare sweeps across
  const g = ((lt * 0.45) % 1) * 360 - 60
  x.save(); x.beginPath(); x.arc(150, 186, 122, 0, Math.PI * 2); x.clip()
  x.fillStyle = 'rgba(255,255,255,0.32)'; x.beginPath(); x.moveTo(g, 40); x.lineTo(g + 40, 40); x.lineTo(g - 40, 340); x.lineTo(g - 80, 340); x.closePath(); x.fill()
  x.restore()
  star(x, 340, 214, 150, t, { color: LEO.color, mood: 'sparkle', look: [-1, 0], seed: 3, glow: 0.8, squash: 0.04 * Math.sin(lt * 6) })
  heart(x, 290, 110 - ((lt * 30) % 40), 3.5, { alpha: 0.9 })
  label(x, 'LAMINATED', 150, 336, { size: 20, col: GOLD })
}

// 2 · sudden opinions
const OPS = ['SO fire sign.', 'classic water move.', 'hmm. earthy.', 'very Mercury.']
function opinions(x, t, lt) {
  const i = Math.max(0, Math.floor(lt / 0.75)) % OPS.length
  const hop = r3(t - lt + Math.floor(Math.max(0, lt) / 0.75) * 0.75)
  star(x, 120, 220, 160, t, { color: LEO.color, mood: i === 2 ? 'squint' : 'wink', look: [1, -1], seed: 3, glow: 0.8, hops: [hop] })
  // a little pointer stick
  x.save(); x.translate(196, 196); x.rotate(-0.6 + 0.15 * Math.sin(lt * 8)); R(x, INK, -3, -3, 110, 10); R(x, '#c9a06a', 0, 0, 104, 4); R(x, GOLD, 96, -2, 10, 8); x.restore()
  bubble(x, 270, 84, OPS[i], { k: clamp(prog(lt % 0.75, 0, 0.12)) * (lt > 0.12 ? 1 : 0), size: 25, tail: -1 })
  // the bystanders' sweatdrop row
  for (let j = 0; j < 3; j++) star(x, 270 + j * 62, 300, 60, t, { color: signStar(IDS[(j * 4 + 2) % 12]).color, mood: 'neutral', look: [-1, -1], seed: 10 + j, glow: 0.4, tips: false })
}

// 3 · "that's so Gemini"
const THINGS = [[LAMP, { S: '#ffd98a', P: '#9a8fb8' }, 12], [CLOUD, { W: '#efe6d6' }, 11], [SAND, { B: '#e8b46a', G: '#7fd06a', R: '#e2564a' }, 10]]
function soGemini(x, t, lt) {
  const i = Math.max(0, Math.floor(lt / 0.8)) % THINGS.length
  const [bm, cols, cell] = THINGS[i]
  const k = clamp(prog(lt % 0.8, 0, 0.15))
  drawBits(x, bm, cols, 290, 214, cell * (0.6 + 0.4 * k))
  star(x, 110, 220, 150, t, { color: LEO.color, mood: 'happy', look: [1, 0], seed: 3, glow: 0.8, hops: [r3(t - lt + Math.floor(Math.max(0, lt) / 0.8) * 0.8)] })
  bubble(x, 200, 74, "that's so Gemini.", { k: lt > 0.15 ? 1 : 0, size: 28, tail: -1 })
  // Gemini pops in, offended-ish
  const gk = ease.outBack(prog(lt, 1.4, 1.7))
  if (gk > 0) {
    star(x, 396, lerp(440, 318, gk), 96, t, { color: GEM.color, mood: 'wide', look: [-1, -1], seed: 9, glow: 0.7 })
    bubble(x, 396, 248, 'hey!', { k: gk, size: 24, tail: 0 })
  }
}

// 4 · asking everyone their moon
function moon(x, t, lt) {
  // the queue: a star, a dog, the Moon
  const who = Math.max(0, Math.floor(lt / 0.7)) % 3
  star(x, 200, 262, 100, t, { color: signStar('virgo').color, mood: who === 0 ? 'wide' : 'neutral', look: [-1, 0], seed: 12, glow: 0.5, tips: false })
  drawBits(x, DOG, { B: '#c98a52', E: INK, N: INK, T: '#c98a52' }, 300, 290, 8.5, { sx: -1 })
  drawBits(x, MOON, MOON_C, 386, 130, 8.5, { rot: 0.15 * Math.sin(t * 2) })
  if (lt > 0.2) bubble(x, [200, 300, 386][who], [188, 230, 222][who], '?', { size: 28, tail: 0 })
  star(x, 76, 232, 140, t, { color: LEO.color, mood: 'sparkle', look: [1, 0], seed: 3, glow: 0.8, hops: [r3(t - lt + Math.floor(Math.max(0, lt) / 0.7) * 0.7)] })
  drawBits(x, CLIP, CLIP_C, 140, 250, 6, { rot: 0.2 })
  bubble(x, 108, 92, 'your moon?', { k: lt > 0.1 ? 1 : 0, size: 26, tail: -1 })
}
function payoff(x, t, pt, P) {
  const warm = pt > 1.9
  // the Moon in the corner, blushing once asked
  drawBits(x, MOON, MOON_C, 384, 72, 6.5, { rot: 0.1 * Math.sin(t * 2) })
  if (warm) { R(x, '#ff8fb1', 374, 84, 10, 5) }
  const hops = [r3(t - pt + 0.35), ...(warm ? [r3(t - pt + 1.95), r3(t - pt + 2.4)] : [])]
  star(x, 110, 210, 150, t, { color: LEO.color, glyph: LEO.glyph, mood: warm ? 'heart' : 'sparkle', look: [1, 0], seed: 3, glow: 0.9, hops })
  drawBits(x, CLIP, CLIP_C, 182, 236, 5, { rot: 0.2 })
  star(x, 330, 210, 150, t, { color: TAU.color, glyph: TAU.glyph, mood: warm ? 'sparkle' : 'wide', look: [-1, 0], seed: 8, glow: 0.9, hops })
  if (warm) {
    const k = clamp(prog(pt, 2.0, 2.3))
    for (let i = 0; i < 3; i++) { const ph = ((pt - 2.0) * 0.5 + i / 3) % 1; heart(x, 170 + i * 50, 300 - ph * 220, 2.6, { alpha: Math.sin(Math.PI * ph) * k }) }
  }
}

const EP = makePack({
  caption: 'Just got into astrology | *starter pack*', captionAccent: '#ffcf7a',
  items: [
    { label: 'a chart wheel (laminated)', tint: '#2c2a6a', draw: chart },
    { label: 'sudden opinions', tint: '#5a2a4a', draw: opinions },
    { label: '"that\'s so Gemini" (a lamp)', tint: '#2a4a5a', draw: soGemini },
  ],
  twist: { label: '…asking everyone their moon', tint: '#33285e', draw: moon, payoff },
  lines: [
    { text: 'suddenly *everything* is a placement.' },
    { text: 'and the *rare* item…' },
  ],
  payoffLine: { speaker: `${TAU.glyph}︎ THE DATE`, color: '#9fe6ff', text: "my moon? nobody's ever *asked.*" },
  last: '*Moon* sign, please.', lastAccent: '#ffe9a8',
  cues: T => [
    // the wheel glints
    ['glitter', r3(T.items[0] + 0.5), r3(T.items[0] + 1.0)], ['bell', r3(T.items[0] + 0.6), 1760, 0.02, 0.8, -0.3],
    // opinions
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.items[1] + 0.02 + i * 0.75), [987.77, 783.99, 659.25, 1174.66][i], 0.032, 0.3]),
    // that's so Gemini x3, then "hey!"
    ...Array.from({ length: 3 }, (_, i) => ['pop', r3(T.items[2] + 0.05 + i * 0.8), 1046.5, 0.03, -0.3]),
    ['pop', r3(T.items[2] + 1.55), 1567.98, 0.04, 0.3], ['pop', r3(T.items[2] + 1.62), 1318.51, 0.03, 0.3],
    // your moon? to each
    ...Array.from({ length: 3 }, (_, i) => ['pluck', r3(T.twist + 0.25 + i * 0.7), [880, 987.77, 1318.51][i], 0.03, 0.4, 0]),
    // the Moon blushes
    ['bell', r3(T.cut + 1.95), 2093, 0.025, 1.2, 0.3], ['pop', r3(T.cut + 2.0), 1567.98, 0.03, 0.2],
  ],
})
void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
