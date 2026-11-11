// v3a023: star_advice, ADVICE SOLO, "What Virgos need | in love." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Virgo's heart actually needs, one gag each.
//   0.0–3.6    "What Virgos need | *in love.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              someone who shows up early (6:58 for 7:00) · help that's actually helpful (dishes, done right)
//              · permission not to fix it (a crooked frame: leave it, breathe) · notes they can reread ("you're my
//              favourite person", taped up) · plans said out loud (SAT: US) · love that needs no edits (the red pen finds
//              nothing) · folded laundry, basically flowers · someone who says "you did enough" · quiet company on busy days
//  37.8        group ending: "Love, but | *make it tidy.*"  Virgo comes back, big, heart eyes.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

const S = 'virgo'
// ── props
const PLATES = ['.WWWWWW.', 'WWWWWWWW', '.BBBBBB.', 'BBBBBBBB', '.WWWWWW.', 'WWWWWWWW', '.BBBBBB.', 'BBBBBBBB']
const PLATES_C = { W: '#fff', B: SKYB }
const SHIRTS = ['..RR..RR..', '.RRRRRRRR.', 'PPPPPPPPPP', 'PPPPPPPPPP', 'MMMMMMMMMM', 'MMMMMMMMMM', 'LLLLLLLLLL', 'LLLLLLLLLL']
const SHIRTS_C = { R: RED, P: PINK, M: MINT, L: LAV }
const LAPTOP = ['.GGGGGGGG.', '.GSSSSSSG.', '.GSSSSSSG.', '.GSSSSSSG.', '.GGGGGGGG.', 'GGGGGGGGGG']
const LAPTOP_C = { G: '#c9c4d8', S: SKYB }
const BOOKB = ['RRRRRR', 'RWWWWR', 'RWRRWR', 'RWWWWR', 'RRRRRR']
const HEART_S = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -100, 260, 200); x.fillStyle = WOOD; x.fillRect(-122, -92, 244, 184)
  x.fillStyle = SKYB; x.fillRect(-100, -70, 200, 140); x.fillStyle = GREEN; x.fillRect(-100, 20, 200, 50)
  drawBits(x, ['..Y..', '.YYY.', '..Y..'], { Y: GOLD }, 50, -30, 10)
  x.restore()
  x.fillStyle = INK; x.fillRect(cx - 4, cy - 150, 8, 8)
}
function pen(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-20, -150, 40, 250); x.fillStyle = RED; x.fillRect(-13, -143, 26, 200); x.fillStyle = '#c9c4d8'; x.fillRect(-13, 57, 26, 30)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-20, 100); x.lineTo(20, 100); x.lineTo(0, 140); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone who | *shows up early.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const walk = ease.outCubic(prog(lt, 0.3, 1.0)), k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', lerp(990, 790, walk), 980, 190 * k, { mood: 'happy', look: [-1, 0], seed: 61, glyph: false, hops: [P.t0 + 0.5, P.t0 + 0.8] })
      label(x, 790, 680, 'PLAN: 7:00', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 760, 'HERE: 6:58', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 340, 760, P.t0 + 1.4, { n: 4, life: 1.2, spread: 160, cell: 6, seed: 1 })
    } },
  { sign: S, cap: 'Help that’s | *actually helpful.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 1010, 170 * k, { mood: 'happy', look: [-1, 0], seed: 62, glyph: false })
      drawBits(x, PLATES, PLATES_C, 900, 960, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 700, 'DISHES: DONE. RIGHT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 900, 960, P.t0 + 1.0, 6, 110, 0.5)
    } },
  { sign: S, cap: 'Permission to | *not fix it.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, -1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.18 + 0.03 * Math.sin(t * 2))
      bubble(x, 440, 640, 'it’s… tilted.', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.4 ? 1 : 0.001), { size: 38, tail: 'bl' })
      label(x, 790, 1080, 'LEAVE IT. BREATHE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Notes they | *can reread.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 260, pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.05 }, () => {
        x.fillStyle = 'rgba(255,241,200,0.8)'; x.fillRect(-60, -150, 120, 36)
        say(x, 'you’re my', 0, -40, { size: 40, font: "'EB Garamond', Georgia, serif", weight: 500 })
        say(x, 'favourite', 0, 10, { size: 40, font: "'EB Garamond', Georgia, serif", weight: 500 })
        say(x, 'person.', 0, 60, { size: 40, font: "'EB Garamond', Georgia, serif", weight: 500 })
      })
      label(x, 790, 1080, 'READ: 40 TIMES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans said | *out loud.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 840, 320, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04, head: RED, headH: 70 }, () => {
        say(x, 'SATURDAY', 0, -130, { size: 34, color: BONE })
        const rows = [['10AM', 'MARKET'], ['2PM', 'NAP'], ['7PM', 'US']]
        rows.forEach(([h, w], i) => { if (lt < 0.6 + i * 0.3) return; if (i === 2) { x.fillStyle = PINK; x.fillRect(-140, 78, 280, 64) } say(x, h, -70, -50 + i * 80, { size: 28, font: MONO, weight: 700 }); say(x, w, 60, -50 + i * 80, { size: 32 }) })
      })
      label(x, 790, 1110, 'NO SURPRISES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love that | *needs no edits.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.03 }, () => drawBits(x, HEART_S, { H: '#ff4f86', W: '#fff' }, 0, 0, 24))
      const sweep = prog(lt, 0.5, 1.4)
      pen(x, lerp(680, 900, sweep), 700 + 30 * Math.sin(sweep * 12), pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - prog(lt, 1.5, 1.7)), 0.5)
      label(x, 790, 1100, 'NOTES: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Folded laundry? | *Basically flowers.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SHIRTS, SHIRTS_C, 790, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 650, 'for… me?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 340, 780, P.t0 + 1.1, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 4 })
      label(x, 790, 1110, 'CORNERS: CRISP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone who says | *“you did enough.”*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 830, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 }, () => {
        for (let i = 0; i < 5; i++) {
          const y = -130 + i * 64
          x.fillStyle = INK; x.fillRect(-130, y - 18, 36, 36); x.fillStyle = CREAM; x.fillRect(-125, y - 13, 26, 26)
          x.fillStyle = '#b9a9c9'; x.fillRect(-70, y - 6, i % 2 ? 150 : 190, 12)
          if (lt > 0.5 + i * 0.15) { x.strokeStyle = '#2fc79a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-122, y); x.lineTo(-112, y + 10); x.lineTo(-96, y - 14); x.stroke() }
        }
      })
      bubble(x, 760, 1110, 'you did enough. | rest now.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Quiet company | *on busy days.*', mood: 'happy', look: [0, 1], star: { x: -200, y: 10 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 340, 1060, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 780, 960, 200 * k, { mood: 'happy', look: [0, 1], seed: 63, glyph: false })
      drawBits(x, BOOKB, { R: GOLD, W: CREAM }, 780, 1080, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 560, 650, 'TOGETHER. SEPARATELY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a023', key: 'F', accent: MINT, solo: S, ending: 'group',
  title: 'What Virgos need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Love, but | *make it tidy.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
