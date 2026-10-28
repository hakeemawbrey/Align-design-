// st6scorpio (60 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 08) · story 0–55.6, then the shared end card.
//   A documentary profile of Scorpio (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  SCORPIO, detective fedora on (season 4), squinting at the camera: "before we start. who *sent* you?"
//   TITLE      BEHIND THE SIGN · ♏ SCORPIO · *the deep end.* · WATER · FIXED · RULED BY MARS & PLUTO / THE SCORPION ·
//              OCT 23 – NOV 21
//   I MYTH     archive footage: in Greek myth a scorpion was sent to stop Orion the hunter; they were placed on opposite sides of the sky, so as Scorpius rises, Orion sets
//              (the scorpion climbs over one horizon while Orion sinks below the other).
//   II SKY     the real figure (head β · δ · π, σ, Antares, τ, the tail ε · μ · ζ · η · θ · ι · κ, the stinger Shaula and
//              Lesath). Antares labelled: "rival of Mars", a red supergiant. Ruled by Mars, and Pluto in modern astrology:
//              Pluto pops into the chart's corner, crown askew, smiling ("we're on good terms *now.*").
//   III CLOSE  why it reads everything ("i've been *lied* to."), how it loves (all in), Taurus cutaway, what scares it,
//              what it wishes we'd ask ("what's the soft part?").
//   TAKEAWAY   "Earn it once. Then I'm *yours.*"
//   The ghost rises over the archive horizon, halfway between the rising scorpion and the setting hunter.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { drawPluto } from '../../st5cast.js'
import { makeEpisode, drawBits, monoText, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const SCORP = [          // the scorpion, facing left: two open pincers out front, tail curled over its back
  '...................ttt....',
  '..................tt.tt...',
  '..................t...s...',
  '.................tt.......',
  '.CCC............tt........',
  'C...CC.........tt.........',
  '.CCC..a.......tt..........',
  '......aaBBBBBBBt..........',
  '.CCC..aBBBBBBBBB..........',
  'C...CCaBBBBBBBB...........',
  '.CCC...l.l.l.l.l..........',
  '......l.l.l.l.l...........',
]
const SCORP_C = { C: '#b98a52', a: '#8a5a2c', B: '#a8743e', t: '#a8743e', s: '#5a3a1e', l: '#5a3a1e' }
const ORION = [          // the hunter, club raised, three studs on his belt
  '......hhh.....',
  '.....hhhhh..CC',
  '.....hSSSh..CC',
  '.....hSESh.CC.',
  '......SSS..CC.',
  '....TTTTTTSC..',
  '...TTTTTTTS...',
  '..S.TTTTTT....',
  '..S.TTTTTT....',
  '....bgbgbg....',
  '....TTTTTT....',
  '....SS..SS....',
  '....SS..SS....',
  '...ddd..ddd...',
]
const ORION_C = { h: '#5a3a22', S: '#e8b48a', E: '#2a1a12', T: '#c9b8a0', b: '#6a4424', g: '#f2d27a', C: '#7a4a22', d: '#5a3a1e' }
const HAT = ['....HHHHHHH....', '...HHHHHHHHH...', '...HhhhhhhhH...', '...BBBBBBBBB...', 'HHHHHHHHHHHHHHH', '.HHHHHHHHHHHHH.']
const HAT_C = { H: '#5a4a6e', h: '#6e5e84', B: '#e23d66' }

const HORIZON = 1100
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // Orion, club up; the scorpion creeps in from the right toward his heel
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1160, P.x1 - P.x0, P.y1 - 1160)
    ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1156 + ((xx / 24) % 2) * 4, 12, 8)
    drawBits(ctx, ORION, ORION_C, 360, 1000, 20)
    const p = ease.outCubic(clamp((t - tabAt - 1.5) / 6))
    drawBits(ctx, SCORP, SCORP_C, Math.round(lerp(1000, 720, p) + Math.sin(t * 14) * 2), 1112, 9)
  } else {
    // opposite sides of the sky: the scorpion rises over the left horizon as Orion sinks below the right one
    const p = ease.inOutQuad(clamp((t - tabAt - 1.5) / 6))
    for (let i = 0; i < 14; i++) { const sx = P.x0 + 40 + ((i * 197) % (P.x1 - P.x0 - 80)), sy = P.y0 + 40 + ((i * 131) % 420); if (Math.sin(t * 2 + i) > -0.5) drawPixelStar(ctx, sx, sy, 12 + (i % 3) * 5, i % 2, '#fff1c8') }
    drawBits(ctx, SCORP, SCORP_C, 340, Math.round(lerp(1240, 930, p)), 15)
    drawBits(ctx, ORION, ORION_C, 780, Math.round(lerp(900, 1260, p)), 17)
    ctx.fillStyle = '#5a4a36'; ctx.fillRect(P.x0, HORIZON, P.x1 - P.x0, P.y1 - HORIZON)
    ctx.fillStyle = '#8a7656'; for (let xx = P.x0; xx < P.x1; xx += 30) ctx.fillRect(xx, HORIZON - 6 + ((xx / 30) % 2) * 4, 16, 8)
    // arcs: up on the left, down on the right
    ctx.fillStyle = '#e8d6b0'
    for (let k = 0; k < 8; k++) { const f = k / 7; if (f <= p + 0.05) { ctx.fillRect(Math.round(170 + f * 40), Math.round(1060 - f * 200), 6, 6); ctx.fillRect(Math.round(900 - f * 30), Math.round(860 + f * 200), 6, 6) } }
    monoText(ctx, 'RISES', 300, 1170, { size: 26, color: '#f3e3c3', spacing: 0.2 })
    monoText(ctx, 'SETS', 780, 1170, { size: 26, color: '#f3e3c3', spacing: 0.2 })
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    const p = ease.outCubic(clamp((t - tabAt - 1.5) / 6))
    ctx.save(); ctx.globalAlpha *= 0.6
    drawBits(ctx, SCORP.map(r => r.replace(/[^Ct]/g, '.')), { C: '#ff6a5a', t: '#ff6a5a' }, Math.round(lerp(1000, 720, p) + Math.sin(t * 14) * 2), 1112, 9, { outline: null })
    ctx.restore()
    drawBits(ctx, ['g.g.g'], { g: '#f7cf68' }, 360, 1000 + 20 * 2.5, 20, { outline: null })
  } else {
    // Antares, hand-tinted red, on the rising scorpion's back
    const p = ease.inOutQuad(clamp((t - tabAt - 1.5) / 6)), sy = Math.round(lerp(1240, 930, p))
    if (sy < HORIZON - 10) drawPixelStar(ctx, 380, sy - 8, 34, 0, '#ff5a4a', '#ffd0c0')
  }
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'antares', ra: 16.4901, dec: -26.432, mag: 1.06 },
  { id: 'beta', ra: 16.0906, dec: -19.806, mag: 2.62 },
  { id: 'delta', ra: 16.0056, dec: -22.622, mag: 2.29 },
  { id: 'pi', ra: 15.9809, dec: -26.114, mag: 2.89 },
  { id: 'sigma', ra: 16.3531, dec: -25.593, mag: 2.89 },
  { id: 'tau', ra: 16.5981, dec: -28.216, mag: 2.82 },
  { id: 'eps', ra: 16.8361, dec: -34.293, mag: 2.29 },
  { id: 'mu', ra: 16.8645, dec: -38.047, mag: 3.0 },
  { id: 'zeta', ra: 16.9097, dec: -42.362, mag: 3.6 },
  { id: 'eta', ra: 17.2026, dec: -43.239, mag: 3.33 },
  { id: 'theta', ra: 17.6220, dec: -42.998, mag: 1.86 },
  { id: 'iota', ra: 17.7931, dec: -40.127, mag: 3.0 },
  { id: 'kappa', ra: 17.7081, dec: -39.030, mag: 2.39 },
  { id: 'shaula', ra: 17.5601, dec: -37.104, mag: 1.62 },
  { id: 'lesath', ra: 17.5127, dec: -37.296, mag: 2.7 },
]
let EP = null
const PLU = { x: 850, y: 1010 }
function skyExtras(ctx, t, { k }) {
  // Pluto, Scorpio's modern ruler (and season-5 ex), pops into the empty corner on good terms
  const L = EP.LINES.sky[1], at = L.t + 0.95
  const p = easeOutBack(prog(t, at, at + 0.4), 2.2)
  if (p <= 0) return
  const happy = t >= L.done - 0.6
  drawPluto(ctx, PLU.x, PLU.y, 150, t, { mood: happy ? 'happy' : 'neutral', look: [-1, 0], crownSlip: 0.35, pop: p, seed: 4 })
  ctx.save(); ctx.globalAlpha *= clamp(p)
  monoText(ctx, '♇ PLUTO', PLU.x, PLU.y + 110, { size: 26, color: '#cfcad9', spacing: 0.12 })
  if (happy) monoText(ctx, 'ON GOOD TERMS', PLU.x, PLU.y + 142, { size: 20, color: GOLD, spacing: 0.12, n: Math.floor((t - L.done + 0.6) / 0.04) + 1 })
  ctx.restore()
  void k
}

function prop(ctx, t, r, { size }) {
  const c = Math.max(3, Math.round(size / 36))
  drawBits(ctx, HAT, HAT_C, Math.round(r.x + c), Math.round(r.top + c * 0.5), c * 1.15, { rot: -0.1 })
}

const SPEC = {
  id: 'st6scorpio', sign: 'scorpio', ep: 8, duration: 60, pitch: 659.25,
  cold: [{ text: 'before we start. who *sent* you?', mood: 'squint', look: [0, 0] }],
  title: { accent: 'the deep end.', facts: [['WATER', 'FIXED', 'RULED BY MARS & PLUTO'], ['THE SCORPION', 'OCT 23 – NOV 21']] },
  myth: {
    head: 'Sent for *Orion.*',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, a scorpion was sent to stop Orion the *hunter.*' },
      { who: 'stars', tab: 1, text: 'they were placed on opposite sides of the *sky…*' },
      { who: 'stars', tab: 1, text: '…so as Scorpius rises, Orion *sets.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'The red *heart.*',
    map: { name: 'Scorpius', stars: STARS, bright: 'antares', brightCol: '#ff7a5a',
      lines: [['beta', 'delta'], ['delta', 'pi'], ['delta', 'sigma'], ['sigma', 'antares'], ['antares', 'tau'], ['tau', 'eps'], ['eps', 'mu'], ['mu', 'zeta'], ['zeta', 'eta'], ['eta', 'theta'], ['theta', 'iota'], ['iota', 'kappa'], ['kappa', 'shaula'], ['shaula', 'lesath']],
      box: { cx: 540, cy: 900, w: 760, h: 560 },
      labels: [{ star: 'antares', text: 'ANTARES', sub: '“RIVAL OF MARS” · RED SUPERGIANT', dx: -60, dy: -80, align: 'right', at: 1.6, subSize: 22 }] },
    lines: [
      { who: 'stars', text: 'Antares, a red supergiant. its name means “rival of *Mars.*”' },
      { text: 'ruled by Mars. and Pluto. we’re on good terms *now.*', mood: 'happy', look: [1, 0] },
    ],
    heroAt: [176, 1238],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 8 · FIXED WATER',
    cutChyron: 'CUTAWAY · THE PARTNER',
    items: [
      { q: 'Q. Why do you | *read* everything?', lines: [{ text: 'i read everything because i’ve been *lied* to.', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'all in. i’ll know your coffee order by date *two.*', mood: 'happy' },
        { who: 'taurus', text: 'it acts scary. it texts me goodnight. *every* night.' },
      ] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'letting someone *all* the way in. and then they leave.', mood: 'wide', look: [0, 1] }] },
      { q: 'Q. What do you wish | we’d *ask?*', lines: [{ text: '“what’s the soft part?” …there’s a *lot* of it.', mood: 'heart' }] },
    ],
  },
  takeaway: { min: 5, text: 'Earn it once. | Then I’m *yours.*', words: 5, top: 330, size: 108, accentSize: 170, byY: 820 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'heart', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [1, -1] } : { mood: 'squint' } },
  ghost: { seg: 'myth', at: 0, x: 540, y: HORIZON, from: 'below', cell: 3, where: 'rising over the archive horizon, halfway between the rising scorpion and the setting hunter (I · THE MYTH, tableau 2)' },
}
// the ghost rises over the horizon in tableau 2 (timed from a first pass of the schedule)
SPEC.ghost.t = +(makeEpisode(SPEC).T.tabs[1] + 2.4).toFixed(3)
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void BONE
