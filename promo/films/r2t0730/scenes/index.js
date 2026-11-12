// r2t0730: star_talk, ROLLCALL, "The signs at a | *lake house.*" (signs3kit social cut, lofi · F). Ending: lesson.
//   ♈ jumped in before unpacking · ♉ claimed the hammock all weekend · ♊ asked every duck their sign
//   · ♋ made breakfast for the whole lake · ♌ brought a floatie shaped like themself · ♍ labeled everything, even the canoe
//   · ♎ lake or pool, still on the dock · ♏ read the whole guestbook, back to 1987 · ♐ kayaked to the next town
//   · ♑ answered emails from the canoe · ♒ stargazed, found their own sign · ♓ cried at the sunset every night
//   group "Twelve signs. | *One dock.*" · lesson "Best weekends? | *Your people.*" · last "Same lake. | *Next summer?*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#6fc3ff', WATER = '#3a7bd5'
Object.assign(B, {
  KAYAK: ['......K.......', '.....K........', 'RRRRKRRRRRRRR.', '.RRRRRRRRRRRRR', '..RRRRRRRRRRR.', '....K.........', '...K..........'],
  CANOE: ['W............W', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.', '..WWWWWWWWWW..'],
  FISH: ['....OO.....', '..OOOOOO..O', '.OOKOOOOOOO', 'OOOOOOOOOOO', '.OOOOOOOOOO', '..OOOOOO..O', '....OO.....'],
  STACK: ['..YYYYYYYY..', '.YYYYYYYYYY.', '..BBBBBBBB..', '.BBBBBBBBBB.', '..BBBBBBBB..', '.BBBBBBBBBB.', '..BBBBBBBB..', 'PPPPPPPPPPPP'],
  DOCK: ['WWWWWWWWWWWWWWWW', 'DDDDDDDDDDDDDDDD', '.K....K....K....', '.K....K....K....'],
})
Object.assign(C, {
  KAYAK: { K: INK, R: '#ff9a4a' }, CANOE: { W: WOOD }, FISH: { O: '#ffb34a', K: INK },
  STACK: { Y: '#ffe76a', B: '#e8b36a', P: BONE }, DOCK: { W: '#c98f5a', D: WOOD, K: WOOD },
})
/** a strip of lake water with little waves */
function lake(x, t, y, a = 1) {
  x.save(); x.globalAlpha = a; x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
  x.fillStyle = WATER; x.fillRect(110, y, 860, 1220 - y)
  x.fillStyle = '#8fe3ff'; for (let i = 0; i < 10; i++) { const wx = 130 + ((i * 97 + t * 40) % 820); x.fillRect(wx, y + 30 + (i % 3) * 50, 40, 8) }
  x.restore()
}
const tiny = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 70, ...o }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Jumped in the lake. | *Before unpacking.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -150 }, hops: [0.4, 0.8],
    back(x, t, lt, P) { lake(x, t, 1040) },
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 300, 1000, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (lt > 0.9) for (let i = 0; i < 10; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 9), d = clamp((lt - 0.9) / 0.6); x.fillStyle = '#bfe6ff'; x.fillRect(790 + Math.cos(a) * 150 * d, 1040 + Math.sin(a) * 180 * d + 200 * d * d, 16, 16) }
      L(x, 790, 700, 'UNPACKED: 0%', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 34)
      bubble(x, 790, 880, 'CANNONBALL!', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Claimed the hammock. | *All weekend.*', mood: 'sleepy', star: { x: -150, y: 10 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = '#ffe27a'; x.lineWidth = 10
      x.beginPath(); x.moveTo(170, 860); x.quadraticCurveTo(390, 1160, 610, 860); x.stroke()
      x.fillStyle = WOOD; x.fillRect(150, 780, 22, 380); x.fillRect(600, 780, 22, 380); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 800, 720, 'RESERVED: TAURUS', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.04, 30)
      L(x, 800, 900, 'CHECK-OUT: NEVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), CREAM, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Asked every duck | *their sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 1], star: { x: -170 },
    back(x, t, lt, P) { lake(x, t, 1060) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'DUCK', 680 + i * 110, 1040 + Math.sin(t * 3 + i) * 6, 12 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      bubble(x, 760, 720, "what's your sign?", pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 880, 900, 'quack. (leo)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: '#ffe76a', tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Made breakfast | for *the whole lake.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'STACK', 680 + i * 120, 960, 12 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      L(x, 790, 720, 'SERVINGS: 40', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 36)
      bubble(x, 790, 1120, 'neighbors too!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Brought a floatie. | It\'s *a giant Leo.*', mood: 'sparkle', look: [1, 0], star: { x: -200, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { lake(x, t, 1080) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      tiny(x, t, 'leo', 780, 960 + Math.sin(t * 2) * 10, 340, k, { mood: 'wink', glow: 1.3 })
      L(x, 790, 640, 'INFLATED: 3 HOURS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Labeled everything. | *Even the canoe.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'CANOE', 790, 1060, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const tags = [['CANOE', 790, 960], ['DOCK', 680, 690], ['LAKE', 900, 760], ['TREE?', 700, 860]]
      tags.forEach(([w, lx, ly], i) => L(x, lx, ly, w, pop01(t, P.t0 + 0.5 + i * 0.3, 0.3, 2.2), CREAM, i % 2 ? 0.06 : -0.06, 32))
    } },
  { sign: 'libra', cap: 'Lake or pool? | *Still on the dock.*', mood: 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170, y: -20 },
    back(x, t, lt, P) { lake(x, t, 1060); bits(x, 'DOCK', 340, 1050, 20) },
    front(x, t, lt, P) {
      bubble(x, 790, 720, Math.floor(lt * 2.5) % 2 ? 'pool?' : 'lake?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 920, 'HOUR 6', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.05, 38)
    } },
  { sign: 'scorpio', cap: 'Read the guestbook. | *Back to 1987.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const yr = Math.round(lerp(2026, 1987, ease.inOutCubic(clamp((lt - 0.4) / 1.3))))
      L(x, 790, 720, `PAGE: ${yr}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.04, 38)
      L(x, 790, 1130, 'KNOWS ALL THE LORE', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Kayaked to | *the next town.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -40 }, hops: [1.0],
    back(x, t, lt, P) { lake(x, t, 1060) },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(clamp((lt - 0.2) / 2.0))
      bits(x, 'KAYAK', lerp(520, 820, p), 1050 + Math.sin(t * 3) * 6, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 720, 'WELCOME TO: ELSEWHERE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 28)
      bubble(x, 800, 880, 'back by dinner!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Answered emails | *from the canoe.*', mood: 'neutral', look: [1, 1], star: { x: -170, y: -30 },
    back(x, t, lt, P) { lake(x, t, 1060) },
    front(x, t, lt, P) {
      bits(x, 'CANOE', 560, 1060 + Math.sin(t * 2) * 6, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bits(x, 'LAPTOP', 820, 900, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 820, 700, 'OUT OF OFFICE: NO', pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Stargazed. | Found *their own sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      const pts = [[680, 620], [760, 680], [840, 640], [900, 720], [820, 800], [740, 780]]
      const n = Math.min(pts.length, Math.floor(clamp((lt - 0.2) / 1.2) * pts.length) + 1)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
      for (let i = 0; i < n; i++) { const [px, py] = pts[i]; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke(); x.restore()
      for (let i = 0; i < n; i++) drawPixelStar(x, pts[i][0], pts[i][1], 44, 2, '#ffffff')
      L(x, 790, 940, 'SIGN: AQUARIUS ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried at the sunset. | *Every single night.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170, y: -20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      const g = x.createLinearGradient(0, 600, 0, 1060); g.addColorStop(0, 'rgba(255,143,177,0)'); g.addColorStop(1, 'rgba(255,154,74,0.55)')
      x.fillStyle = g; x.fillRect(110, 600, 860, 460)
      x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(790, 1040, 120, Math.PI, 0); x.fill(); x.restore()
      lake(x, t, 1060)
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) L(x, 790 + (i - 1) * 40, 660 + i * 90, ['NIGHT 1', 'NIGHT 2', 'NIGHT 3'][i], pop01(t, P.t0 + 0.4 + i * 0.4, 0.3, 2.2), CREAM, (i - 1) * 0.05, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0730', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs at a | *lake house.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One dock.*' },
  lesson: { text: 'Best weekends? | *Your people.*', chip: 'VIBES: RESTORED' },
  last: { text: 'Same lake. | *Next summer?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
