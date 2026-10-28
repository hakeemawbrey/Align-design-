// st6gemini (30 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 03) · story 0–25.6, then the shared end card.
//   A documentary profile of Gemini, the short one (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  GEMINI, its one kept chat bubble (season 4) typing over its head: "hi! hi. we're— i'm— *hi.*"
//   TITLE      BEHIND THE SIGN · ♊ GEMINI · *the talker.* · AIR · MUTABLE · RULED BY MERCURY / THE TWINS · MAY 21 – JUN 20
//   I MYTH     archive footage: in Greek myth, when mortal Castor died, Pollux shared his immortality; the brothers rise
//              together as two stars. (The ghost peeks over the rock behind them.)
//   II SKY     the real twin stick figures. Castor and Pollux labelled; Pollux is the brighter (β, though Castor is α).
//   III CLOSE  "everyone thinks i'm two-faced. i'm two-*hearted.*"  What scares it: being *boring.*
//   TAKEAWAY   "Talk to *both* of me."
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, monoText, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const TWIN = [            // a young warrior: helmet crest, tunic, a little spear
  '...ccc...',
  '..hhhhh.p',
  '..hSSSh.p',
  '..SESES.p',
  '...SSS..p',
  '.TTTTTTSp',
  'S.TTTTT.p',
  '..TTTTT..',
  '..bbbbb..',
  '..S...S..',
  '..S...S..',
  '.dd...dd.',
]
const TWIN_C = { c: '#c8963e', h: '#b9a27a', S: '#e8b48a', E: '#2a1a12', T: '#e7dcc6', b: '#8a5a2c', p: '#8a6a4a', d: '#5a3a1e' }
const LYING = [           // Castor, fallen (lying down, eyes closed)
  '..........hh.',
  'dd.TTTTTTShhh',
  'dd.TTTTTTSSSE',
  '..SbbbbbbS...',
]
const ROCK = ['....RRRRRR....', '..RRRRrRRRRR..', '.RRrRRRRRRrRR.', 'RRRRRRRRRRRRRR', 'RRRRRrRRRRRRRR']
const ROCK_C = { R: '#8c8274', r: '#b4aa98' }

function tableau(ctx, t, { tabAt, P }) {
  ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1150, P.x1 - P.x0, P.y1 - 1150)
  ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1146 + ((xx / 24) % 2) * 4, 12, 8)
  drawBits(ctx, ROCK, ROCK_C, 790, 1100, 16)
  const rise = ease.inOutQuad(prog(t, tabAt + 1.5, tabAt + 3.4))
  // before: Castor lies, Pollux kneels at his side
  if (rise < 1) {
    ctx.save(); ctx.globalAlpha *= 1 - rise
    drawBits(ctx, LYING, { ...TWIN_C, E: '#e8b48a' }, 470, 1124, 14)
    drawBits(ctx, TWIN, TWIN_C, 330, 1062, 14)
    ctx.restore()
  }
  // after: two stars rise together, holding hands
  if (rise > 0) {
    const y = lerp(1060, 780, rise)
    for (const [dx, i] of [[-70, 0], [70, 1]]) {
      ctx.save(); ctx.globalAlpha *= clamp(rise * 2)
      drawPixelStar(ctx, 540 + dx, y + Math.sin(t * 3 + i) * 8, 84, 0, '#fff1c8', '#ffffff')
      ctx.restore()
    }
    ctx.fillStyle = 'rgba(255,241,200,0.8)'; ctx.fillRect(500, Math.round(y + 10), 80, 6)
  }
}
function tint(ctx, t, { tabAt }) {
  const rise = ease.inOutQuad(prog(t, tabAt + 1.5, tabAt + 3.4))
  if (rise <= 0) return
  const y = lerp(1060, 780, rise)
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  for (const dx of [-70, 70]) {
    const g = ctx.createRadialGradient(540 + dx, y, 0, 540 + dx, y, 110)
    g.addColorStop(0, `rgba(242,207,74,${0.5 * rise})`); g.addColorStop(1, 'rgba(242,207,74,0)')
    ctx.fillStyle = g; ctx.fillRect(430 + dx, y - 110, 220, 220)
  }
  ctx.restore()
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'castor', ra: 7.5767, dec: 31.89, mag: 1.58 },
  { id: 'pollux', ra: 7.7553, dec: 28.03, mag: 1.14 },
  { id: 'alhena', ra: 6.6285, dec: 16.40, mag: 1.9 },
  { id: 'eps', ra: 6.7322, dec: 25.13, mag: 3.0 },
  { id: 'mu', ra: 6.3827, dec: 22.51, mag: 2.9 },
  { id: 'eta', ra: 6.2479, dec: 22.51, mag: 3.3 },
  { id: 'delta', ra: 7.3354, dec: 21.98, mag: 3.5 },
  { id: 'zeta', ra: 7.0685, dec: 20.57, mag: 3.9 },
  { id: 'tau', ra: 7.1857, dec: 30.25, mag: 4.4 },
  { id: 'iota', ra: 7.4289, dec: 27.80, mag: 3.8 },
  { id: 'upsilon', ra: 7.5985, dec: 26.90, mag: 4.1 },
]

// ── the prop: its one kept chat bubble (season 4), typing
function prop(ctx, t, r, { seg, size }) {
  if (seg === 'sky') return
  const bx = r.x + 0.42 * size, by = r.top - 10
  ctx.save()
  ctx.fillStyle = INK; ctx.fillRect(bx - 66, by - 40, 132, 72)
  ctx.fillStyle = BONE; ctx.fillRect(bx - 60, by - 34, 120, 60)
  ctx.fillStyle = INK; ctx.fillRect(bx - 40, by + 32, 18, 12)
  ctx.fillStyle = BONE; ctx.fillRect(bx - 36, by + 26, 12, 12)
  for (let i = 0; i < 3; i++) { ctx.fillStyle = Math.floor(t * 4) % 3 === i ? '#f2cf4a' : '#8a7fa8'; ctx.fillRect(bx - 34 + i * 28, by - 10, 14, 14) }
  ctx.restore()
}

const EP = makeEpisode({
  id: 'st6gemini', sign: 'gemini', ep: 3, duration: 30, pitch: 987.77,
  cold: [{ text: 'hi! hi. we’re— i’m— *hi.*', mood: 'happy' }],
  title: { accent: 'the talker.', facts: [['AIR', 'MUTABLE', 'RULED BY MERCURY'], ['THE TWINS', 'MAY 21 – JUN 20']] },
  myth: {
    head: 'The *twins.*',
    lines: [{ who: 'stars', tab: 0, text: 'in Greek myth, when Castor died, Pollux shared his *immortality.*' }],
    tableau, tint,
  },
  sky: {
    head: 'Two *stars.*',
    map: { name: 'Gemini', stars: STARS, bright: 'pollux', brightCol: '#ffcf7a',
      lines: [['castor', 'tau'], ['tau', 'eps'], ['eps', 'mu'], ['mu', 'eta'], ['pollux', 'upsilon'], ['upsilon', 'delta'], ['delta', 'zeta'], ['zeta', 'alhena'], ['tau', 'iota'], ['iota', 'upsilon']],
      box: { cx: 540, cy: 950, w: 760, h: 600, rot: Math.PI / 2 },
      labels: [
        { star: 'pollux', text: 'POLLUX', sub: 'THE BRIGHTER TWIN', dx: -90, dy: 60, align: 'right', at: 1.2 },
        { star: 'castor', text: 'CASTOR', dx: 50, dy: 60, align: 'left', at: 1.5, size: 34 },
      ] },
    lines: [{ who: 'stars', text: 'two bright stars bear their names. Pollux is *brighter.*' }],
    heroAt: [904, 1238],
  },
  personal: {
    chyron: 'SIGN No. 3 · MUTABLE AIR',
    items: [
      { q: 'Q. *Two*-faced?', lines: [{ text: 'everyone thinks i’m two-faced. i’m two-*hearted.*', mood: 'sparkle' }] },
    ],
  },
  takeaway: { min: 3.4, text: 'Talk to | *both* of me.', words: 2, late: 3, top: 420, size: 120, accentSize: 190, byY: 820 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'wink', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'myth', at: 1.6, x: 820, y: 1062, from: 'below', cell: 3, where: 'peeking over the rock behind the twins (archive footage, right)' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void GOLD; void monoText
