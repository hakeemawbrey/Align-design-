// r2t0663: star_talk, SOLO (pisces), "Pisces daydreaming | *at work.*" (signs3kit social cut, music: lofi · G).
// Nine cards, the most extreme (and lovable) Pisces drifting off on the clock. Pisces cries in every card. Ending: lesson.
//   meeting started, Pisces is on a boat · one email, a whole novel · gave the stapler a sad backstory · planned a life
//   with Tuesday's match · became the rain on the window · coffee went cold three times · got called on, returned from
//   orbit · cell B12 is a sunset now · lunch break, wrote a song about the sandwich
//   group "Body: at work. | *Soul: at sea.*"  lesson "Dreamers make | the world *softer.*"  last "Back to work, Pisces. | *…Pisces?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'pisces', ST = { x: -170 }
const ACC = '#8fb8ff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a', SEA = '#3a7bd5'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
// a dreamy thought cloud with trailing dots back toward the star; fn draws inside (origin at the cloud's centre)
function thought(x, t, cx, cy, k, fn, { w = 330, h = 250, fromX = 470, fromY = 800 } = {}) {
  if (k <= 0.01) return
  for (let i = 0; i < 3; i++) { const p = (i + 1) / 4, r = (8 + i * 6) * k; x.fillStyle = INK; x.beginPath(); x.arc(lerp(fromX, cx - w / 3, p), lerp(fromY, cy + h / 3, p), r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(lerp(fromX, cx - w / 3, p), lerp(fromY, cy + h / 3, p), r, 0, Math.PI * 2); x.fill() }
  x.save(); x.translate(cx, cy + Math.sin(t * 1.6) * 6); x.scale(k, k)
  const blobs = [[-w / 3, 0, h / 2.6], [0, -h / 6, h / 2.2], [w / 3, 0, h / 2.6], [-w / 6, h / 5, h / 2.8], [w / 6, h / 5, h / 2.8]]
  x.fillStyle = INK; for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = CREAM; for (const [bx, by, r] of blobs) { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const BOAT = ['....W.....', '....WW....', '....WWW...', '....WWWW..', '....WWWWW.', '....K.....', 'RRRRRRRRRR', '.RRRRRRRR.', '..RRRRRR..']
const MUG = ['.MMMMMM...', 'MMMMMMMMMM', 'MCCCCCCM.M', 'MCCCCCCM.M', 'MCCCCCCMMM', 'MCCCCCCM..', '.MMMMMM...']
const STAPLER = ['..KKKKKKKKKK', '.KRRRRRRRRRK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const ROCKET = ['...W...', '..WWW..', '..WBW..', '..WWW..', '.WWWWW.', 'RW.W.WR', '..O.O..']

const CAMEOS = [
  { sign: SG, cap: 'Meeting started. | Pisces is *on a boat.*', mood: 'happy', look: [1, -1], tears: 1, star: ST,
    front(x, t, lt, P) {
      thought(x, t, 770, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = SKYB; x.fillRect(-120, 20, 240, 50)
        x.fillStyle = SEA; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 42 + Math.sin(t * 3 + i) * 6, 40, 26, 8)
        drawBits(x, BOAT, { W: '#fff', K: INK, R: RED }, Math.sin(t * 1.5) * 20, -10 + Math.sin(t * 3) * 4, 9)
      })
      L(x, 800, 1080, 'AGENDA: ITEM 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: SG, cap: 'Typed one email. | Wrote *a novel.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt > 1.2 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-130, -170, 260, 340)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('RE: printer jam', 0, -146)
        const n = Math.min(12, Math.floor(clamp((lt - 0.2) / 1.4) * 12) + 1)
        for (let i = 0; i < n; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-114, -110 + i * 22, 228 - (i % 3) * 30, 10) }
      })
      L(x, 790, 1110, 'CHAPTER 12', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: SG, cap: 'Stared at the stapler. | Gave it *a backstory.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], tears: lt => lt > 1.3 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, STAPLER, { K: INK, R: RED, G: '#c9c9d8' }, 790, 960, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 720, 'it never knew | its mother', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: SG, cap: 'Planned a whole life | with *Tuesday’s match.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, -1], tears: 2, star: ST,
    front(x, t, lt, P) {
      thought(x, t, 770, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = PINK; x.fillRect(-40, -10, 80, 60); x.beginPath(); x.moveTo(-56, -10); x.lineTo(0, -60); x.lineTo(56, -10); x.fill()
        x.fillStyle = INK; x.fillRect(-12, 20, 24, 30)
        signChar(x, t, 'pisces', -100, 20, 70, { mood: 'heart', glyph: false, seed: 3, glow: 0.4 })
        signChar(x, t, 'cancer', 100, 20, 70, { mood: 'heart', glyph: false, seed: 4, glow: 0.4 })
      })
      L(x, 800, 1090, 'MATCHED: 1 DAY AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: SG, cap: 'Watched the rain. | *Became the rain.*', mood: 'neutral', look: [1, 0], tears: 3, star: ST,
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.15, 0.3, 2), 0, () => {
        x.fillStyle = '#4a5a8a'; x.fillRect(-136, -156, 272, 312)
        x.fillStyle = INK; x.fillRect(-4, -156, 8, 312); x.fillRect(-136, -4, 272, 8)
        x.fillStyle = SKYB; for (let i = 0; i < 14; i++) { const ph = (t * 0.9 + i * 0.17) % 1; x.fillRect(-120 + (i * 37) % 240, -150 + ph * 290, 6, 20) }
      }, BROWN)
      L(x, 790, 1110, 'ONE WITH THE WEATHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 26)
    } },
  { sign: SG, cap: 'Coffee went cold. | *Three times.*', mood: 'neutral', look: [1, 0], tears: 1, star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { M: CREAM, C: BROWN }, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 2)
      L(x, 790, 680, `REHEAT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), ORANGE, 0.05, 40)
      L(x, 790, 1100, 'STILL NOT SIPPED', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: SG, cap: 'Got called on. | *Returned from orbit.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', look: [1, 0], tears: lt => lt > 1.0 ? 2 : 1, star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const land = ease.outCubic(prog(lt, 0.2, 1.0))
      drawBits(x, ROCKET, { W: '#e8e8f4', B: SKYB, R: RED, O: ORANGE }, lerp(880, 790, land), lerp(560, 880, land), 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lerp(0.6, 0, land) })
      bubble(x, 800, 660, 'Pisces? thoughts?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      L(x, 790, 1100, 'RE-ENTRY: BUMPY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Cell B12. | Pisces sees *a sunset.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      box(x, 790, 860, 330, 300, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = CREAM; x.fillRect(-150, -136, 300, 272)
        x.strokeStyle = '#b9b0a0'; x.lineWidth = 2
        for (let i = 0; i <= 6; i++) { x.beginPath(); x.moveTo(-150 + i * 50, -136); x.lineTo(-150 + i * 50, 136); x.stroke() }
        for (let j = 0; j <= 6; j++) { x.beginPath(); x.moveTo(-150, -136 + j * 45); x.lineTo(150, -136 + j * 45); x.stroke() }
        const g = clamp((lt - 0.6) / 0.8)
        x.fillStyle = `rgba(255,154,74,${g})`; x.fillRect(-50, -46, 100, 90)
        x.fillStyle = `rgba(255,210,58,${g})`; x.beginPath(); x.arc(0, 10, 26 * g, Math.PI, 0); x.fill()
        x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.fillText('B12', -125, -118)
      })
      L(x, 790, 1100, '=SUNSET()', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, -0.04, 34)
    } },
  { sign: SG, cap: 'Lunch break? | Wrote *a song* about it.', mood: 'sparkle', look: [1, 0], tears: 2, star: ST, hops: [0.8],
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: ACC, seed: 2 })
      L(x, 790, 680, 'TRACK 1: SANDWICH', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 30)
      bubble(x, 800, 1080, 'oh, sweet bread…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0663', key: 'G', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Pisces daydreaming | *at work.*',
  cameos: CAMEOS,
  group: { cap: 'Body: at work. | *Soul: at sea.*', mood: 'happy' },
  lesson: { text: 'Dreamers make | the world *softer.*', chip: 'STATUS: FLOATING' },
  last: {
    text: 'Back to work, Pisces. | *…Pisces?*',
    draw(x, t, lt) {
      thought(x, t, 800, 690, pop01(t, t - lt + 0.8, 0.4, 2), () => {
        x.fillStyle = SKYB; x.fillRect(-120, 20, 240, 50)
        drawBits(x, BOAT, { W: '#fff', K: INK, R: RED }, Math.sin(t * 1.5) * 20, -10 + Math.sin(t * 3) * 4, 9)
      }, { fromX: 660, fromY: 800, w: 300, h: 220 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
