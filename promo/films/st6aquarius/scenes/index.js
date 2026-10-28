// st6aquarius (45 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 11) · story 0–40.6, then the shared end card.
//   A documentary profile of Aquarius (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  AQUARIUS, pink headphones on (season 3): "one ear on. i’m *listening.* promise."
//   TITLE      BEHIND THE SIGN · ♒ AQUARIUS · *the outsider.* · AIR · FIXED · RULED BY URANUS & SATURN /
//              THE WATER-BEARER · JAN 20 – FEB 18
//   I MYTH     archive footage: in Greek myth Ganymede was carried up (by an eagle) to be cupbearer of the gods; the
//              Babylonians saw "the Great One" pouring water (a bearded figure, two streams from a jar).
//   II SKY     the real figure, faint (ε · Sadalsuud · Sadalmelik · the Water Jar γ ζ η π · θ · λ · φ · τ · Skat · 88).
//              Sadalsuud labelled (its brightest); the headline says it: "Faint, but *there.*" Uranus, found in 1781, is the modern ruler, Saturn the traditional:
//              a sideways-ringed Uranus rolls into the corner. AQUARIUS: "both my rulers have rings. now *i* do too."
//              (engaged to Leo in season 5)
//   III CLOSE  "i’m not cold. i’m *buffering.*"  The headphones are about overwhelm, not distance. Leo cutaway (chyron
//              "THE FIANCÉ"): "it takes them off for me. that’s the *real* proposal."
//   TAKEAWAY   "Weird and *wanted.* Still both." (a callback to season 4). The headphones slide down round its neck.
//   The ghost rises out of the Great One's water jar.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'
import { makeEpisode, drawBits, monoText, KID, KID_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const EAGLE = [          // Zeus's eagle, wings up
  'WW..............WW',
  'WWW............WWW',
  '.WWW....HH....WWW.',
  '..WWW..HHHB..WWW..',
  '...WWWWBBBWWWWW...',
  '....WWWBBBWWWW....',
  '.......BBBB.......',
  '.......BBBB.......',
  '........TT........',
  '.......T..T.......',
]
const EAGLE_C = { W: '#8a6a44', H: '#f3ead8', B: '#6a4a2a', T: '#c8963e' }
const GREAT = [          // "the Great One": a bearded figure tipping a jar
  '.....hhhh.......',
  '....hSSSSh......',
  '....hSESSh......',
  '....BBBBB.......',
  '....BBBB.....JJ.',
  '...TTTTTTSSSJJJJ',
  '..TTTTTTT...JJJJ',
  '..TTTTTTT....JJ.',
  '..TTTTTTT.......',
  '...TTTTT........',
  '...TTTTT........',
  '..TTTTTTT.......',
  '..dd...dd.......',
]
const GREAT_C = { h: '#3a2a1a', S: '#e8b48a', E: '#2a1a12', B: '#8a6a4a', T: '#c9b8a0', J: '#c8863e', d: '#5a3a1e' }
const CUP = ['GGGGG', '.GGG.', '..G..', '.GGG.']
const PHONE_C = { band: '#3a2a6e', cup: '#ff4fd8', hi: '#ffb3f0' }

function ground(ctx, P) {
  ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1170, P.x1 - P.x0, P.y1 - 1170)
  ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1166 + ((xx / 24) % 2) * 4, 12, 8)
}
// the jar's mouth (cell 18, GREAT centred at 420, 960): col 15, row 5
const G = { x: 420, y: 960, c: 18 }
const jarMouth = () => ({ x: G.x + (15 - 8) * G.c + G.c / 2, y: G.y + (5 - 6.5) * G.c })
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // the eagle carries Ganymede up into the sky; a cup glints in his hand
    for (let i = 0; i < 10; i++) if (Math.sin(t * 2 + i) > -0.3) drawPixelStar(ctx, P.x0 + 60 + (i * 89) % 760, P.y0 + 40 + (i * 61) % 260, 14 + (i % 3) * 5, i % 2, '#fff1c8')
    ground(ctx, P)
    const p = ease.inOutQuad(clamp((t - tabAt) / 5))
    const x = lerp(380, 640, p), y = lerp(1060, 760, p) + Math.sin(t * 4) * 8
    const flap = Math.sin(t * 8) > 0
    drawBits(ctx, flap ? EAGLE : EAGLE.map((r, j) => j < 2 ? r.replace(/W/g, '.') : r), EAGLE_C, Math.round(x), Math.round(y), 16)
    drawBits(ctx, KID, { ...KID_C, h: '#3a2a1a' }, Math.round(x), Math.round(y + 122), 13)
    drawBits(ctx, CUP, { G: '#c8963e' }, Math.round(x + 62), Math.round(y + 140), 7)
  } else {
    // the Great One pours: two streams fall from the jar
    ground(ctx, P)
    drawBits(ctx, GREAT, GREAT_C, G.x, G.y, G.c)
    const m = jarMouth()
    for (const [dx, sp] of [[0, 1], [30, 1.3]]) for (let k = 0; k < 16; k++) {
      const f = ((t * sp * 0.9 + k / 16) % 1)
      const x = m.x + 20 + dx + f * 90 * (1 + dx / 60), y = m.y + f * f * (1170 - m.y)
      ctx.fillStyle = k % 3 ? '#9ab8c8' : '#d8eef6'; ctx.fillRect(Math.round(x) - 6, Math.round(y), 12, 14)
    }
    ctx.fillStyle = '#6a8a9a'; ctx.fillRect(m.x + 20, 1162, 240, 12)
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    const p = ease.inOutQuad(clamp((t - tabAt) / 5))
    const x = lerp(380, 640, p), y = lerp(1060, 760, p) + Math.sin(t * 4) * 8
    drawBits(ctx, CUP, { G: '#f7cf68' }, Math.round(x + 62), Math.round(y + 140), 7, { outline: null })
  } else {
    // the water, hand-tinted aqua
    const m = jarMouth()
    ctx.save(); ctx.globalAlpha *= 0.55
    for (const [dx, sp] of [[0, 1], [30, 1.3]]) for (let k = 0; k < 16; k++) {
      const f = ((t * sp * 0.9 + k / 16) % 1)
      const x = m.x + 20 + dx + f * 90 * (1 + dx / 60), y = m.y + f * f * (1170 - m.y)
      ctx.fillStyle = '#7fe0f0'; ctx.fillRect(Math.round(x) - 6, Math.round(y), 12, 14)
    }
    ctx.restore()
  }
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'sadalsuud', ra: 21.5260, dec: -5.571, mag: 2.87 },
  { id: 'sadalmelik', ra: 22.0964, dec: -0.320, mag: 2.94 },
  { id: 'skat', ra: 22.9108, dec: -15.821, mag: 3.27 },
  { id: 'gamma', ra: 22.3609, dec: -1.387, mag: 3.84 },
  { id: 'zeta', ra: 22.4806, dec: -0.020, mag: 3.65 },
  { id: 'eta', ra: 22.5893, dec: -0.117, mag: 4.02 },
  { id: 'pi', ra: 22.4214, dec: 1.377, mag: 4.66 },
  { id: 'lambda', ra: 22.8769, dec: -7.580, mag: 3.74 },
  { id: 'tau', ra: 22.8265, dec: -13.592, mag: 4.0 },
  { id: 'eps', ra: 20.7946, dec: -9.496, mag: 3.77 },
  { id: 'theta', ra: 22.2806, dec: -7.783, mag: 4.16 },
  { id: 'phi', ra: 23.2385, dec: -6.049, mag: 4.22 },
  { id: 'a88', ra: 23.1574, dec: -21.172, mag: 3.66 },
]
let EP = null
function drawUranus(ctx, x, y, t, k) {
  // a pale cyan disc with its rings standing on end (Uranus spins on its side), two dot eyes
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(x, y); ctx.scale(k, k)
  const ring = front => { for (let a = 0; a < Math.PI * 2; a += 0.06) { const c = Math.cos(a); if ((c > 0) !== front) continue; const rx = c * 16, ry = Math.sin(a) * 92; ctx.fillStyle = INK; ctx.fillRect(rx - 5, ry - 5, 10, 10); ctx.fillStyle = '#cfe8f0'; ctx.fillRect(rx - 3, ry - 3, 6, 6) } }
  ring(false)
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 9.5) continue; ctx.fillStyle = d > 8.5 ? INK : (i + j < -5 ? '#bff2f4' : '#7fd6e0'); ctx.fillRect(i * 6 - 3, j * 6 - 3, 6, 6) }
  ring(true)
  const blink = (t % 3.1) < 0.12
  ctx.fillStyle = INK; ctx.fillRect(-18, -8, 8, blink ? 3 : 10); ctx.fillRect(10, -8, 8, blink ? 3 : 10)
  ctx.restore()
}
function skyExtras(ctx, t) {
  const L = EP.LINES.sky[0], at = L.t + 0.5
  const p = easeOutBack(prog(t, at, at + 0.4), 2.2)
  if (p <= 0) return
  drawUranus(ctx, 690, 1060, t, p)
  ctx.save(); ctx.globalAlpha *= clamp(p)
  monoText(ctx, 'URANUS · 1781', 690, 1176, { size: 22, color: '#bff2f4', spacing: 0.1 })
  ctx.restore()
}

// ── the headphones: on its head; for the takeaway they slide down round its neck
function prop(ctx, t, r, { seg, size }) {
  const c = Math.max(4, Math.round(size / 30))
  let k = 0
  if (seg === 'take') k = ease.inOutCubic(prog(t, EP.T.take[0] + 0.1, EP.T.take[0] + 0.7))
  const cupY = r.y - size * 0.06 + k * size * 0.42, cupX = size * 0.4, ry = -size * 0.44 * (1 - k * 1.6)
  const band = (col, w) => { for (let i = 0; i <= 26; i++) { const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry; ctx.fillStyle = col; ctx.fillRect(Math.round(bx - w / 2), Math.round(by - w / 2), w, w) } }
  band(INK, c * 3); band(PHONE_C.band, c * 2)
  for (const sd of [-1, 1]) {
    const cx = r.x + sd * cupX
    ctx.fillStyle = INK; ctx.fillRect(Math.round(cx - 2.5 * c), Math.round(cupY - 3.5 * c), 5 * c, 7 * c)
    ctx.fillStyle = PHONE_C.cup; ctx.fillRect(Math.round(cx - 1.5 * c), Math.round(cupY - 2.5 * c), 3 * c, 5 * c)
    ctx.fillStyle = PHONE_C.hi; ctx.fillRect(Math.round(cx - 1.5 * c), Math.round(cupY - 2.5 * c), c, 2 * c)
  }
}

const SPEC = {
  id: 'st6aquarius', sign: 'aquarius', ep: 11, duration: 45, pitch: 1046.5,
  cold: [{ text: 'one ear on. i’m *listening.* promise.', mood: 'neutral', look: [1, 0] }],
  title: { accent: 'the outsider.', facts: [['AIR', 'FIXED', 'RULED BY URANUS & SATURN'], ['THE WATER-BEARER', 'JAN 20 – FEB 18']] },
  myth: {
    head: 'The *cupbearer.*',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, Ganymede became cupbearer of the *gods.*' },
      { who: 'stars', tab: 1, text: 'the Babylonians saw “the Great One” pouring *water.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'Faint, but *there.*',
    map: { name: 'Aquarius', stars: STARS, bright: 'sadalsuud', brightCol: '#cfe2ff',
      lines: [['eps', 'sadalsuud'], ['sadalsuud', 'sadalmelik'], ['sadalmelik', 'gamma'], ['gamma', 'zeta'], ['zeta', 'eta'], ['zeta', 'pi'], ['sadalmelik', 'theta'], ['theta', 'lambda'], ['lambda', 'phi'], ['lambda', 'tau'], ['tau', 'skat'], ['skat', 'a88']],
      box: { cx: 540, cy: 880, w: 800, h: 440 },
      labels: [{ star: 'sadalsuud', text: 'SADALSUUD', sub: 'ITS BRIGHTEST STAR', dx: 40, dy: -80, align: 'left', at: 1.5, size: 36, subSize: 22 }] },
    lines: [
      { who: 'stars', text: 'Uranus, found in 1781, is its modern ruler. Saturn, the *traditional.*' },
      { text: 'both my rulers have rings. now *i* do too.', mood: 'heart' },
    ],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 11 · FIXED AIR',
    cutChyron: 'CUTAWAY · THE FIANCÉ',
    items: [
      { q: 'Q. Why so | *cold?*', lines: [
        { text: 'i’m not cold. i’m *buffering.*', mood: 'squint', look: [0, 0] },
        { text: 'the headphones? not distance. *overwhelm.*', mood: 'neutral', look: [0, 1] },
        { who: 'leo', text: 'it takes them off for me. that’s the *real* proposal.' },
      ] },
    ],
  },
  takeaway: { min: 4.4, text: 'Weird and *wanted.* | Still both.', words: 5, late: 3, top: 330, size: 108, accentSize: 170, byY: 820 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'sparkle', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'neutral' } },
  ghost: { seg: 'myth', at: 0, x: 0, y: 0, from: 'below', cell: 3, where: 'rising out of the Great One’s water jar (I · THE MYTH, Babylon)' },
}
{
  const m = jarMouth()
  SPEC.ghost = { ...SPEC.ghost, t: +(makeEpisode(SPEC).T.tabs[1] + 1.4).toFixed(3), x: Math.round(m.x - 10), y: Math.round(m.y - 4) }
}
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void BONE; void GOLD
