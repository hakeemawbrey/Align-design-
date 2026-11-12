// v3t068: THE SIGNS AS… v3, "The signs | on a hike." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order on one hike, each pushed to the extreme; lesson ending.
//   0.0–3.6    "The signs | *on a hike.*"
//   3.6–49.2   ♈ ran to the top, wrong mountain · ♉ found a nice rock, stayed · ♊ narrated it like a nature show
//              · ♋ adopted a trail snail · ♌ gave a summit speech · ♍ corrected the map in pen · ♎ still at the fork
//              · ♏ the trail nobody knows · ♐ a shortcut, plus five hours · ♑ at the summit since dawn
//              · ♒ hiked backwards for science · ♓ a pretty leaf, wept
//  49.2        "Same trail. | *Twelve hikes.*"
//  52.4        LESSON UNLOCKED: "Go at your pace. | The view *waits.*"  STATUS: SUMMIT
//  58.3        "Snack break? | *Taurus started.*"
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT, GREEN, BROWN } from './props.js'

const ACC = GREEN
// a wooden trail sign on a post with a painted word
function post(x, cx, cy, k, text, { rot = -0.04, dir = 1, bg = '#c98f5a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -10, 28, 230); x.fillStyle = BROWN; x.fillRect(-8, -6, 16, 222)
  x.rotate(rot)
  x.font = `800 30px ${INTER}`; const w = x.measureText(text).width + 50
  const tip = (pad, col) => { x.fillStyle = col; x.fillRect(-w / 2 - pad, -28 - pad, w + 2 * pad, 56 + 2 * pad); x.beginPath(); x.moveTo(dir * w / 2, -28 - pad); x.lineTo(dir * (w / 2 + 26 + pad), 0); x.lineTo(dir * w / 2, 28 + pad); x.closePath(); x.fill() }
  tip(7, INK); tip(0, bg)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran to the top. | *Wrong mountain.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -180 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bits(x, 'MOUNTAIN', 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'TRAIL: OTHER ONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'FIRST!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Hiked ten minutes. | Found *a nice rock.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -150, y: -60 },
    back(x, t, lt, P) {
      drawBits(x, ['....GGGGGG....', '..GGGGGGGGGG..', '.GGgGGGGGGGGG.', 'GGGGGGGGGgGGGG', 'GgGGGGGGGGGGGG', '.GGGGGGGGGGGG.'], { G: '#8a87a8', g: '#6b6890' }, 390, 1050, 24 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 720, 'HIKE: OVER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'i live | here now', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Narrated the hike | *like a nature show.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const L = ['and here… | a rock.', 'majestic. | a stick.', 'the wild | bee appears']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      bubble(x, 790, 680, L[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'TREE', 800, 960, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 600, 1140, 'EPISODE 4', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#f2cf4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted a lost | *trail snail.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      bits(x, 'SNAIL', 790, 960, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 790, 700, 'NAME: PEBBLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'he’s family now', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.1, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Reached the summit. | *Gave a speech.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'i’d like to | thank me.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 960, 180 * k, { mood: 'sleepy', look: [-1, 0], seed: 13, glyph: false })
      label(x, 800, 1130, 'AUDIENCE: 1 GOAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#f39a3a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Corrected the trail map. | *In pen.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#e8dcc0'; x.fillRect(-160, -140, 320, 280)
        x.fillStyle = '#a8d08a'; x.fillRect(-150, -130, 120, 100); x.fillRect(40, 20, 110, 110)
        x.strokeStyle = '#8a6a4a'; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(-140, 110); x.bezierCurveTo(-40, 0, 20, 80, 130, -110); x.stroke()
        const s = clamp((lt - 0.7) / 0.9)
        x.setLineDash([]); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.moveTo(-140, 110)
        for (let i = 1; i <= 20 * s; i++) { const u = i / 20; x.lineTo(lerp(-140, 130, u), lerp(110, -110, u)) } x.stroke()
        x.restore()
      }
      label(x, 790, 1100, 'FIXED. YOU’RE WELCOME.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: '#ef5c94', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Left or right? | *Still at the fork.*', mood: lt => lt > 1.6 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      post(x, 790, 700, 1.4 * k, 'LEFT', { dir: -1, rot: 0.06 })
      post(x, 790, 820, 1.4 * k, 'RIGHT', { dir: 1, rot: -0.06, bg: '#d9a870' })
      const h = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 2)
      label(x, 800, 1140, `HOUR ${h}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: '#e163d6', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Took the trail | *nobody knows about.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bits(x, 'TREE', 700, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TREE', 900, 920, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      post(x, 800, 650, pop01(t, P.t0 + 0.6, 0.3, 2), 'SECRET PATH', { dir: 1, bg: '#9a6a8a' })
      bubble(x, 800, 1130, 'don’t tell.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Found a shortcut. | It *added five hours.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -180 }, hops: [0.5],
    front(x, t, lt, P) {
      post(x, 800, 700, pop01(t, P.t0 + 0.2, 0.3, 2), 'SHORTCUT', { dir: 1, bg: '#b88ae8' })
      const h = Math.floor(clamp((lt - 0.7) / 1.0) * 5)
      readout(x, 800, 1020, pop01(t, P.t0 + 0.7, 0.3, 2), `+${h} HRS`, { size: 56, color: '#a35cf0' })
      bubble(x, 420, 620, 'trust me!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'At the summit already. | *Since dawn.*', mood: 'happy', star: { x: 0, y: -170, s: 230 }, hops: [1.4],
    back(x, t, lt, P) {
      drawBits(x, B.MOUNTAIN.bm, B.MOUNTAIN.c, 540, 1040, 46 * pop01(t, P.t0 + 0.05, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SUMMIT · 5 AM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 300, 1090, 'you’re late.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Hiked backwards. | *For science.*', mood: 'sparkle', look: [-1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 800, 700, '← THIS WAY (BACKWARDS)', k, { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      paper(x, 800, 920, pop01(t, P.t0 + 0.7, 0.3, 2), { w: 280, h: 220, rot: 0.04, head: 'DATA', headBg: SKYB, headColor: INK, lines: ['trees: same', 'me: thrilled'], size: 28 })
      label(x, 800, 1120, 'HYPOTHESIS: FUN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw a pretty leaf. | *Wept.*', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'LEAF', 800 + Math.sin(t * 2) * 10, 880, 26 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: Math.sin(t * 1.6) * 0.2 })
      label(x, 800, 650, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'it’s perfect…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      sparkles(x, t, 800, 880, P.t0 + 0.6, 6, 140, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3t068', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs | *on a hike.*',
  cameos: CAMEOS,
  group: { cap: 'Same trail. | *Twelve hikes.*' },
  lesson: { text: 'Go at your pace. | The view *waits.*', chip: 'STATUS: SUMMIT' },
  last: {
    text: 'Snack break? | *Taurus started.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
