// r2t0088: star_talk SOLO, "Aquarius siblings | be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards), every card the most extreme sibling version of Aquarius:
//   forgot your birthday, named a star after you · brought a whiteboard to family dinner · borrowed your hoodie,
//   returned it with lights · muted the family chat, started a newsletter · mom asked for help, built her a robot
//   · their bedroom is a science fair · matching family outfits? came in silver · gone a week, back with a podcast
//   · you had a bad day, they made you a flowchart
//  37.8   GROUP ENDING: "Weird. Brilliant. | *Ours.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fc3ff', RED = '#e23d4e', SILVER = '#d8dbe8', BROWN = '#8a4a2e'

// ── props
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = '#fff4e2' } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true            // caller draws inside, then x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
const HOODIE = [
  '...HHHHHHH...',
  '..HHH...HHH..',
  '.HHHHHHHHHHH.',
  'HHHHHHHHHHHHH',
  'HH.HHHHHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HPPPPPH.HH',
  '...HHHHHHH...',
]
const ROBOT = [
  '.....A.....',
  '.....A.....',
  '..SSSSSSS..',
  '..SKSSSKS..',
  '..SSSSSSS..',
  '..SSRRRSS..',
  '...SSSSS...',
  '.SSSSSSSSS.',
  'S.SSGGGSS.S',
  'S.SSSSSSS.S',
  '..SS...SS..',
  '..SS...SS..',
]
const FLASK = ['..WW..', '..WW..', '..WW..', '.WGGW.', 'WGGGGW', 'WGgGGW', 'WGGGGW', '.WWWW.']
const PODMIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', 'GGgGGG', '.GGGG.', '..KK..', '..KK..', '..KK..', 'KKKKKK']
const VISOR = ['..SSSSSSS..', '.SSSSSSSSS.', 'SSBBBBBBBSS', 'SBWBBBBBBBS', 'SSBBBBBBBSS']
function bubbles(x, t, cx, cy, n = 4) {
  for (let i = 0; i < n; i++) { const ph = (t * 0.8 + i / n) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = MINT; x.fillRect(cx + Math.sin(i * 2.1 + ph * 6) * 16 - 6, cy - ph * 120, 12, 12); x.restore() }
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Forgot your birthday. | *Named a star* after you.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.05 })) {
        txt(x, 'OFFICIAL STAR', 0, -62, 30); txt(x, '#4471', 0, -6, 52, '#6b62a8', MONO, 700); txt(x, 'named after: you', 0, 56, 24, INK, MONO, 700); x.restore()
      }
      sparkles(x, t, 790, 860, P.t0 + 0.9, 7, 200, 0.3)
      label(x, 790, 1100, 'BIRTHDAY: MISSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brought a whiteboard | to *family dinner.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 330, 240, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: '#ffffff' })) {
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 5)
        x.strokeStyle = '#3a7bd5'; x.lineWidth = 6
        if (n > 0) { x.beginPath(); x.arc(-80, -40, 36, 0, Math.PI * 2); x.stroke() }
        if (n > 1) { x.beginPath(); x.moveTo(-40, -40); x.lineTo(40, -40); x.lineTo(30, -50); x.moveTo(40, -40); x.lineTo(30, -30); x.stroke() }
        if (n > 2) { x.beginPath(); x.rect(50, -76, 80, 70); x.stroke() }
        if (n > 3) txt(x, 'E = mc(dinner)²', 0, 54, 30, RED, INTER, 800)
        x.restore()
      }
      bubble(x, 790, 640, 'quick question', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Borrowed your hoodie. | Returned it *with lights.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, HOODIE, { H: '#6b62a8', P: '#4b4290' }, 790, 880, 24 * k)
      if (lt > 0.9 && k > 0.5) for (let i = 0; i < 8; i++) { const on = Math.floor(t * 6 + i) % 2; x.fillStyle = INK; x.fillRect(682 + i * 30, 838, 18, 18); x.fillStyle = on ? [GOLD, PINK, MINT, SKYB][i % 4] : '#2a2350'; x.fillRect(685 + i * 30, 841, 12, 12) }
      label(x, 790, 1110, 'UPGRADED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: AQUA, rot: -0.04 })
    } },
  { sign: S, cap: 'Muted the family chat. | *Started a newsletter.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (card(x, 790, 870, 290, 360, pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })) {
        txt(x, 'THE AQUA', 0, -138, 36, INK, INTER, 800); txt(x, 'TIMES', 0, -98, 36, INK, INTER, 800)
        x.fillStyle = INK; x.fillRect(-120, -74, 240, 5)
        txt(x, 'ISSUE 1: ME', 0, -44, 22, '#6b62a8', MONO, 700)
        x.fillStyle = AQUA; x.fillRect(-120, -18, 110, 100)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(4, -14 + i * 18, 116 - (i % 3) * 18, 9)
        for (let i = 0; i < 3; i++) x.fillRect(-120, 100 + i * 18, 240 - (i % 2) * 40, 9)
        x.restore()
      }
      label(x, 790, 640, 'SUBSCRIBERS: MOM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mom asked for help. | They *built a robot.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, ROBOT, { S: SILVER, K: INK, R: RED, G: MINT, A: GOLD }, 800, 920 + Math.sin(t * 5) * 6, 20 * k)
      bubble(x, 800, 650, 'BEEP. DISHES DONE.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, col: MINT, tail: 'bc', font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their bedroom? | A *science fair.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const fx = 680 + i * 110, fy = 980 - (i === 1 ? 50 : 0)
        drawBits(x, FLASK, { W: '#e6f4ff', G: [MINT, PINK, GOLD][i], g: '#ffffff' }, fx, fy, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
        if (lt > 0.6) bubbles(x, t + i, fx, fy - 70, 3)
      }
      label(x, 790, 1120, 'DO NOT KNOCK', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Matching family outfits? | Came *in silver.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -40, y: 20 }, hops: [1.0],
    front(x, t, lt, P, F) {
      // a shiny silver suit over Aquarius, sparkling
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, VISOR, { S: SILVER, B: SKYB, W: '#ffffff' }, F.x, F.top + 4, 13 * k)
      for (let i = 0; i < 2; i++) signChar(x, t, ['taurus', 'cancer'][i], 230 + i * 620 - (i ? 0 : 0), 1000, 150 * pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.0 ? 'wide' : 'happy', seed: 60 + i, glyph: false, look: [i ? -1 : 1, 0] })
      label(x, 540, 640, 'DRESS CODE: FUTURE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SILVER, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 580, 900, P.t0 + 0.9, 7, 160, 0.4, [SILVER, '#ffffff', SKYB])
    } },
  { sign: S, cap: 'Gone for a week. | Back *with a podcast.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.7],
    front(x, t, lt, P, F) {
      drawBits(x, PODMIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }, F.x + 300, F.cy + 10, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 820, 700, 'EPISODE 1', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: AQUA, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, 'RUNTIME: 4 HOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You had a bad day. | They *made a flowchart.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const steps = ['bad day?', 'snacks', 'walk', 'call me']
      const n = Math.floor(clamp((lt - 0.3) / 1.3) * 4.99)
      for (let i = 0; i < Math.min(n, 4); i++) {
        const y = 640 + i * 140
        label(x, 790, y, steps[i], 1, { size: 32, bg: i === 3 ? PINK : i === 0 ? LAV : MINT, rot: (i % 2 ? 0.03 : -0.03) })
        if (i < 3) { x.fillStyle = BONE; x.fillRect(786, y + 34, 8, 60); x.fillRect(776, y + 84, 28, 8) }
      }
      if (n >= 4) hearts(x, t, 930, 1080, P.t0 + 1.9, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0088', key: 'G', accent: AQUA, solo: 'aquarius', ending: 'group',
  title: 'Aquarius siblings | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird. Brilliant. | *Ours.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
