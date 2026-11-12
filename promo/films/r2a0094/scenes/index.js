// r2a0094: star_advice, ADVICE ROLL CALL, "Each sign | after a good cry." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line per sign about how they bounce back, each with a light visual gag.
//   0.0–3.6    "Each sign | *after a good cry.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each):
//              ♈ four minutes, fully reset · ♉ cocoa and a blanket, earned both · ♊ told three friends (and a match) · ♋ called
//              home, felt held · ♌ even the tears are iconic · ♍ listed every feeling, let them fly · ♎ a bath, balance restored
//              · ♏ cried in private, came back stronger · ♐ opened a window: big sky, small problem · ♑ scheduled the cry
//              (honestly? healthy) · ♒ looked at the stars, felt small in a good way · ♓ cried about feeling better
//  49.2        "Tears out. | *Lighter now.*"  The twelve fly up into a group photo.
//  52.6        callback: "Capricorn’s next one? | *Thursday, 6 p.m.*"  The planner comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'

// ── props
const MUG = [
  '..s.s.....',
  '.s.s......',
  'WWWWWWW...',
  'WCCCCCWWW.',
  'WCCCCCW.W.',
  'WCCCCCWWW.',
  'WWWWWWW...',
  '.WWWWW....',
]
const MUG_C = { W: '#ff8fb1', C: '#8a4a2e', s: 'rgba(239,230,214,0.75)' }
const PLANE = [
  'W.........',
  'WWW.......',
  '.WWWW.....',
  '.WWWWWWWWW',
  '.WWWW.....',
  'WWW.......',
  'W.........',
]
const TUB = [
  '..b.bb.b.bb.b..',
  '.bbbbbbbbbbbbb.',
  'WWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWW',
  '.WWWWWWWWWWWWW.',
  '..K.........K..',
]
const TUB_C = { b: '#ffffff', W: '#cfe6ff', K: '#2a2350' }
const TISSUE = [
  '....WW....',
  '...WWWW...',
  'BBBBWWBBBB',
  'BPPPPPPPPB',
  'BPPPPPPPPB',
  'BPPPPPPPPB',
  'BBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: LAV, P: '#d9d2f0' }
const DOOR = [
  'KKKKKKKK',
  'KDDDDDDK',
  'KDddddDK',
  'KDddddDK',
  'KDDDDDDK',
  'KDDDDYDK',
  'KDddddDK',
  'KDddddDK',
  'KDDDDDDK',
  'KDDDDDDK',
]
const DOOR_C = { K: INK, D: '#8a4a2e', d: '#a5643a', Y: GOLD }

function phone(x, cx, cy, k, { head = 'MESSAGES', headCol = LAV, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -176, 240, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -152)
  lines.forEach(([txt, col, kk, side = -1, size = 24], i) => {
    if (kk <= 0.01) return
    x.save(); x.font = `800 ${size}px ${INTER}`; const w = Math.min(244, x.measureText(txt).width + 28)
    x.translate(side * (120 - w / 2), -88 + i * 70); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
/** a day planner page with one entry */
function planner(x, cx, cy, k, lt, { entry = '6 PM: CRY', day = 'TUESDAY', tick = true, rot = -0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -160, 296, 340)
  x.fillStyle = INK; x.fillRect(-152, -172, 304, 344); x.fillStyle = CREAM; x.fillRect(-144, -164, 288, 328)
  x.fillStyle = '#2fc79a'; x.fillRect(-144, -164, 288, 54)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(day, 0, -136)
  x.fillStyle = '#d9cfbd'; for (let i = 0; i < 4; i++) x.fillRect(-120, -60 + i * 60, 240, 3)
  x.fillStyle = '#b9b0a0'; x.font = `700 20px ${MONO}`; x.textAlign = 'left'
  x.fillText('4 PM: meeting', -116, -80); x.fillText('5 PM: gym', -116, -20)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText(entry, -116, 40)
  if (tick && lt > 1.2) { x.fillStyle = '#2fc79a'; x.fillRect(84, 40, 10, 14); x.fillRect(92, 48, 10, 10); x.fillRect(100, 30, 10, 20); x.fillRect(108, 18, 10, 16) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cried for four minutes. | *Fully reset.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: lt => lt < 1.1 ? 2 : 0, star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const s = Math.max(0, 240 - Math.floor(clamp((lt - 0.2) / 1.0) * 240))
      label(x, 790, 760, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 940, 'RESET: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Cocoa and a blanket. | *You earned both.*', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P, F) {
      const b = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (b > 0.01) { x.save(); x.translate(F.x, F.cy + 100); x.scale(b, b); x.fillStyle = INK; x.fillRect(-180, -60, 360, 130); x.fillStyle = '#5fd068'; x.fillRect(-172, -52, 344, 114); x.fillStyle = '#7be07f'; for (let i = 0; i < 6; i++) x.fillRect(-160 + i * 56, -40, 26, 90); x.restore() }
      drawBits(x, MUG, MUG_C, 790, 860, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 1060, 'COMFORT: SERVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told three friends. | *Felt lighter already.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'FRIENDS (3)', headCol: '#ffd23a', lines: [
        ['here for you ♡', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['omg calling now', SKYB, pop01(t, P.t0 + 0.7, 0.25, 2.2)],
        ['bringing snacks', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['✦ match: you ok?', LAV, pop01(t, P.t0 + 1.4, 0.25, 2.2), -1, 22],
      ] })
      hearts(x, t, 580, 900, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: 'cancer', cap: 'Called home. | *Felt held.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', tears: lt => lt < 1.0 ? 1 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 900, 210 * k, { mood: 'heart', look: [-1, 0], seed: 11, glyph: false })
      label(x, 800, 700, 'HOME', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 540, 1160, 'CALL LENGTH: 2 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 560, 880, P.t0 + 1.1, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Even your tears | *are iconic.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', tears: lt => lt < 1.4 ? 2 : 0, star: { x: -150 }, hops: [1.5],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.6))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'CRYING: CINEMATIC', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 30, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'TAKE 2: BETTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.5, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Listed every feeling. | *Then let them go.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const fold = prog(lt, 1.0, 1.25), fly = ease.inOutCubic(prog(lt, 1.25, 2.3))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (fold < 1 && k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.04); x.scale(k * (1 - 0.7 * fold), k)
        x.fillStyle = INK; x.fillRect(-130, -160, 260, 320); x.fillStyle = CREAM; x.fillRect(-122, -152, 244, 304)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        ;['1. sad', '2. tired', '3. annoyed', '4. hungry?'].forEach((l, i) => { if (lt > 0.3 + i * 0.15) x.fillText(l, -100, -100 + i * 60) })
        x.restore()
      }
      if (fold >= 1) drawBits(x, PLANE, { W: '#ffffff' }, lerp(790, 1040, fly), lerp(850, 520, fly), 14, { rot: -0.4 })
      label(x, 790, 1120, 'FEELINGS: SENT OFF', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Ran a bubble bath. | *Balance restored.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -170, y: -20 },
    front(x, t, lt, P, F) {
      drawBits(x, TUB, TUB_C, F.x, F.cy + 140, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 6; i++) { const ph = (t * 0.4 + i / 6) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.beginPath(); x.arc(F.x - 150 + i * 60, F.cy + 40 - ph * 260, 12 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 760, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Cried in private. | *Came back stronger.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -150 }, hops: [1.3],
    back(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 860, 34 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const sign = lt < 1.1
      label(x, 800, 720, sign ? 'DO NOT DISTURB' : 'OPEN AGAIN', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 28, bg: sign ? '#c97bff' : MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1080, 'LEVEL UP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.3, 8, 170, 0.2)
    } },
  { sign: 'sagittarius', cap: 'Opened a window. | *Big sky, small problem.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [-1, -1], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(310, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -190, 320, 380); x.fillStyle = WOOD; x.fillRect(-152, -182, 304, 364)
        const o = ease.inOutCubic(prog(lt, 0.4, 1.0))
        x.fillStyle = '#6fc3ff'; x.fillRect(-136, -166, 272, 332)
        x.fillStyle = '#ffffff'; x.fillRect(-100 + 20 * Math.sin(t), -100, 90, 30); x.fillRect(-80 + 20 * Math.sin(t), -120, 50, 24); x.fillRect(30 - 15 * Math.sin(t), 20, 80, 26)
        x.fillStyle = GOLD; x.fillRect(60, -130, 44, 44)
        x.fillStyle = WOOD; x.fillRect(-136, -166, 136 * (1 - o) + 8, 332); x.fillRect(136 - 136 * (1 - o) - 8, -166, 136 * (1 - o) + 8, 332)
        x.restore()
      }
      label(x, 310, 1100, 'PROBLEM: SHRINKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Scheduled the cry. | *Honestly? Healthy.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', tears: lt => lt > 0.6 && lt < 1.2 ? 1 : 0, look: [-1, 0], star: { x: 170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      planner(x, 310, 830, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 310, 1110, 'FEELINGS: PROCESSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Looked up at the stars. | *Small, in a good way.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -150, y: 60, s: 260 },
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 1.0))
      const PTS = [[650, 600], [740, 660], [830, 620], [900, 700], [760, 760], [860, 820]]
      x.save(); x.globalAlpha = k; x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 3; x.beginPath()
      PTS.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke()
      PTS.forEach(([px, py], i) => { x.fillStyle = i % 2 ? SKYB : GOLD; const s = 10 + 4 * Math.sin(t * 3 + i); x.fillRect(px - s / 2, py - s / 2, s, s) })
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 1000, 'PERSPECTIVE: FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried, then cried | *about feeling better.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(1, 9 - Math.floor(clamp((lt - 0.3) / 1.5) * 8))
      label(x, 800, 720, `TISSUES LEFT: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0094', key: 'E', accent: LAV, ending: 'callback',
  title: 'Each sign | *after a good cry.*',
  cameos: CAMEOS,
  group: { cap: 'Tears out. | *Lighter now.*' },
  last: {
    text: 'Capricorn’s next one? | *Thursday, 6 p.m.*',
    draw(x, t, lt) {
      const t0 = t - lt
      planner(x, 600, 1050, 1.5 * pop01(t, t0 + 0.6, 0.35, 2), 2, { day: 'THURSDAY', rot: 0.03 })
      if (lt > 1.2) signChar(x, t, 'capricorn', 300, 1250, 200, { mood: 'happy', seed: 33, glyph: false, hops: [t0 + 1.3] , pop: pop01(t, t0 + 1.2, 0.35, 2) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
