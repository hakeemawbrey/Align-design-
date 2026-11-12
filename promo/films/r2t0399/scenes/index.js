// r2t0399: star_talk SOLO (sagittarius), "Sagittarians vs. | staying in." (signs3kit social cut, music: lofi · D). Ending: group.
//   nine cards: a cosy night that lasted nine minutes · a travel show, then a booked flight · blanket on, shoes on · went to
//   pick up the takeout, 40 km away · read one book, now learning a language · "stayed in", hiked the hallway · texted
//   "staying in" from a summit · their chart says every planet: go · bored by 8 p.m., started a podcast
//   group (the ending): "Staying in? | Never heard of her."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'
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
const TV = ['K........K', '.K......K.', '..K....K..', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK', '..K....K..']
const PLANE = ['....W.....', '....WW....', 'W...WWW...', 'WWWWWWWWWW', 'W...WWW...', '....WW....', '....W.....']
const BOOT = ['.BBB..', '.BBB..', '.BBB..', '.BBBBB', 'BBBBBB', 'KKKKKK']
const BOOK = ['KKKKKKKKKK', 'KRRRRKWWWK', 'KRRRRKWWWK', 'KRRRRKWWWK', 'KRRRRKWWWK', 'KKKKKKKKKK']
const PACK = ['..KKKK..', '.K....K.', 'GGGGGGGG', 'GGGGGGGG', 'GGYYYYGG', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.']
const MTN = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '.KKKK.']
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 114, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 88, Math.sin(a) * 88); x.lineTo(Math.cos(a) * 114, Math.sin(a) * 114); x.stroke() }
  for (let i = 0; i < 5; i++) { const a = i * 1.3 + t * 0.5; x.fillStyle = MINT; x.fillRect(Math.cos(a) * 60 - 8, Math.sin(a) * 60 - 8, 16, 16) }
  x.restore()
}

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Planned a cosy night. | *Lasted nine minutes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const s = Math.min(9, Math.floor(clamp((lt - 0.3) / 1.2) * 9))
      L(x, 800, 760, `COSY: 0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 48)
      if (lt > 1.5) L(x, 800, 940, 'OK I’M BORED', pop01(t, P.t0 + 1.55, 0.3, 2.4), RED, 0.05, 40, CREAM)
    } },
  { sign: S, cap: 'Watched one travel show. | *Booked the flight.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: SKYB }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = ease.inOutCubic(prog(lt, 1.0, 2.0))
      if (lt > 1.0) drawBits(x, PLANE, { W: '#ffffff' }, lerp(760, 920, f), lerp(900, 700, f), 12, { rot: -0.5 })
      L(x, 800, 1110, 'GATE 9. BOARDING.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Blanket on. | *Shoes still on.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 80); x.scale(k, k); x.fillStyle = INK; x.fillRect(-170, -20, 340, 110); x.fillStyle = '#c4b0ff'; x.fillRect(-162, -12, 324, 94); x.fillStyle = LAV; for (let i = 0; i < 6; i++) x.fillRect(-150 + i * 56, 10, 28, 28); x.restore() }
      drawBits(x, BOOT, { B: '#8a4a2e', K: INK }, F.x + 200, F.cy + 140, 16 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
      L(x, 800, 760, 'JUST IN CASE', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 38)
    } },
  { sign: S, cap: 'Ordered takeout. | *Went to pick it up.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const km = Math.floor(clamp((lt - 0.4) / 1.4) * 40)
      L(x, 800, 760, `WALKED: ${km} KM`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 40)
      bubble(x, 800, 960, 'quick stroll!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1120, 'FOOD: COLD. WORTH IT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, 0.04, 26)
    } },
  { sign: S, cap: 'Read one book. | *Now learning a language.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, R: '#c97bff', W: CREAM }, 800, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 690, 'bonjour! hola! ciao!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 1120, 'LESSON 1 OF 900', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'A night in? | *Hiked the hallway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P, F) {
      drawBits(x, PACK, { K: '#8a4a2e', G: '#5fa84a', Y: GOLD }, F.x - 150, F.cy + 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'TRAIL: HALLWAY', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 36)
      L(x, 800, 900, 'LAPS: 41', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 44)
    } },
  { sign: S, cap: 'Texted “staying in.” | *From a mountain.*', mood: 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, MTN, { W: '#ffffff', G: '#6b62a8' }, 770, 1010, 30 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'staying in tonight!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1150, 'LOCATION: SUMMIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Checked their chart. | Every planet: *“go.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1030, 'MARS: GO. VENUS: GO.', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 28)
      L(x, 800, 1120, 'COUCH: NO', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 30, CREAM)
    } },
  { sign: S, cap: 'Bored by 8 p.m. | *Started a podcast.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }, F.x + 200, F.cy + 30, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 820, 700, 'EPISODE 1:', pop01(t, P.t0 + 0.7, 0.3, 2), ACC, -0.04, 36)
      L(x, 820, 800, '“WALLS”', pop01(t, P.t0 + 1.1, 0.3, 2.4), BONE, 0.04, 48)
      L(x, 820, 1110, 'LISTENERS: MOM', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0399', key: 'D', accent: ACC, solo: 'sagittarius', ending: 'group',
  title: 'Sagittarians vs. | *staying in.*',
  cameos: CAMEOS,
  group: { cap: 'Staying in? | *Never heard of her.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
