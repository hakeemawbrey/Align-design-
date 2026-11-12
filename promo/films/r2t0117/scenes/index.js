// r2t0117: BELIKE, "Zodiacs giving | directions be like." (~63 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    the hook; the twelve line up, then dive into the pips.
//   3.6–49.2   ♈ "just follow me" (already sprinting) · ♉ every landmark is a bakery · ♊ left, no, right, actually both
//              · ♋ drew a map, packed you lunch · ♌ turn left at their billboard · ♍ forty steps, colour-coded
//              · ♎ both ways are equally lovely · ♏ knows a secret shortcut, won't explain · ♐ "super close" (two countries over)
//              · ♑ printed the route, notarised it · ♒ navigates by the actual stars · ♓ got lost with you, cried together
//  49.2        "Nobody arrived. | *Everyone bonded.*"
//  52.4        LESSON: "Any road is fine | with the *right people.*"  ROUTE: SCENIC
//  58.3        "Still lost. | *Still laughing.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068'

const CROISSANT = ['....OOO....', '..OOYOOOO..', '.OOYOOOYOO.', 'OOYOOOOOYOO', 'OO.OOOOO.OO', 'O...OOO...O']
const CROISSANT_C = { O: '#e8a24a', Y: '#ffd98a' }
const LUNCH = ['...KKKK...', '...K..K...', 'RRRRRRRRRR', 'RWRRRRRRWR', 'RRRRRRRRRR', 'RRRRRRRRRR']
const LUNCH_C = { K: INK, R: PINK, W: BONE }
const STAMP = ['.RRRRRR.', 'RR....RR', 'R.R..R.R', 'R..RR..R', 'R..RR..R', 'R.R..R.R', 'RR....RR', '.RRRRRR.']

function signpost(x, cx, cy, k, left, right) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 330); x.fillStyle = BROWN; x.fillRect(-8, -144, 16, 318)
  const arrow = (y, dir, txt, col) => {
    x.save(); x.translate(0, y)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-dir * 10, -36); x.lineTo(dir * 170, -36); x.lineTo(dir * 210, 0); x.lineTo(dir * 170, 36); x.lineTo(-dir * 10, 36); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(-dir * 2, -28); x.lineTo(dir * 166, -28); x.lineTo(dir * 198, 0); x.lineTo(dir * 166, 28); x.lineTo(-dir * 2, 28); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, dir * 90, 2)
    x.restore()
  }
  arrow(-90, -1, left, PINK); arrow(10, 1, right, MINT)
  x.restore()
}
function map(x, cx, cy, k, p, { rot = 0.05, upside = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + (upside ? Math.PI : 0)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -116, 312, 232)
  x.fillStyle = '#fff4e2'; x.fillRect(-148, -108, 296, 216)
  x.fillStyle = '#cfe9c0'; x.fillRect(-148, -108, 110, 90); x.fillStyle = '#bfe3ff'; x.fillRect(40, 30, 108, 78)
  x.strokeStyle = RED; x.lineWidth = 7; x.setLineDash([16, 12]); x.beginPath()
  const pts = [[-120, 80], [-60, 20], [0, 50], [40, -40], [110, -70]]
  const n = pts.length - 1, q = p * n
  x.moveTo(...pts[0])
  for (let i = 1; i <= n; i++) { if (q < i - 1) break; const f = clamp(q - (i - 1)); x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)) }
  x.stroke(); x.setLineDash([])
  if (p >= 1) { x.fillStyle = RED; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 110, -70) }
  x.restore()
}
function billboard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, 80, 20, 140); x.fillRect(40, 80, 20, 140)
  x.fillRect(-180, -130, 360, 220); x.fillStyle = GOLD; x.fillRect(-172, -122, 344, 204)
  x.fillStyle = '#ffe7a8'; x.fillRect(-160, -110, 180, 180)
  x.restore()
  signChar(x, t, 'leo', cx - 70 * k, cy - 20 * k, 170 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 })
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('IT’S', 95, -50); x.fillText('ME.', 95, 0)
  x.restore()
}
function steps(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -200, 272, 400); x.fillStyle = '#fff4e2'; x.fillRect(-128, -192, 256, 384)
  const COLS = [RED, ORANGE, GOLD, GREEN, SKYB, LAV, PINK]
  x.font = `700 20px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  for (let i = 0; i < Math.min(n, 11); i++) {
    const y = -168 + i * 34
    x.fillStyle = COLS[i % 7]; x.fillRect(-112, y - 12, 24, 24)
    x.fillStyle = INK; x.fillText(String(i + 1).padStart(2, '0'), -80, y + 1)
    x.fillStyle = '#c9c0b0'; x.fillRect(-40, y - 4, 130 - (i % 3) * 24, 8)
  }
  x.restore()
}
function keyhole(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360); x.fillStyle = BROWN; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = '#6b3a22'; x.fillRect(-90, -150, 180, 130); x.fillRect(-90, 0, 180, 150)
  x.fillStyle = GOLD; x.beginPath(); x.arc(70, 10, 14, 0, Math.PI * 2); x.fill()
  if (open > 0) { x.fillStyle = `rgba(255,241,176,${0.8 * open})`; x.fillRect(-110, -170, 220 * open * 0.3, 340) }
  x.restore()
}
function globe(x, t, cx, cy, r, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#4aa3e8'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  x.fillStyle = GREEN; const s = (t * 30) % 300
  for (const [a, b, w, h] of [[-120, -60, 110, 70], [30, -90, 90, 120], [-60, 40, 140, 60], [150, 20, 90, 80]]) x.fillRect(a - s + (a - s < -r - 150 ? 300 : 0), b, w, h)
  x.restore()
  x.strokeStyle = BONE; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.arc(0, 0, r * 0.6, Math.PI * 1.1, Math.PI * (1.1 + 1.6 * p)); x.stroke(); x.setLineDash([])
  x.restore()
}
function telescopeSky(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  const pts = [[cx - 150, cy - 40], [cx - 70, cy - 120], [cx + 20, cy - 70], [cx + 120, cy - 140], [cx + 160, cy - 30]]
  x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 4; x.beginPath()
  const q = p * (pts.length - 1)
  x.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { if (q < i - 1) break; const f = clamp(q - (i - 1)); x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)) } x.stroke()
  for (const [a, b] of pts) { x.fillStyle = GOLD; x.fillRect(a - 9, b - 9, 18, 18); x.fillStyle = '#fff'; x.fillRect(a - 3, b - 3, 6, 6) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: '"Just follow me." | *Already sprinting.*', mood: 'sparkle', star: { x: -150 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P, F) {
      x.save(); x.fillStyle = BONE; x.globalAlpha = 0.6
      for (let i = 0; i < 4; i++) x.fillRect(F.x - 260 - (t * 400 + i * 70) % 120, F.cy - 80 + i * 50, 90, 10)
      x.restore()
      label(x, 780, 720, 'KEEP UP!', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 52, bg: RED, color: '#fff4e2', rot: 0.05 })
      bubble(x, 780, 960, 'it’s that way!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Every landmark | is a *bakery.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, CROISSANT_C, 790, 960, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 730, 'LEFT AT THE CROISSANT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '"Left. No, right." | *Actually both.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const f = Math.floor(lt * 2.5) % 2 ? 1 : -1
      label(x, 790, 860, f > 0 ? 'RIGHT →' : '← LEFT', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 64, bg: f > 0 ? MINT : PINK, rot: 0.04 * f, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'trust me!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Drew you a map. | *Packed you lunch.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      map(x, 780, 760, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.0), { rot: -0.05 })
      drawBits(x, LUNCH, LUNCH_C, 800, 1050, 20 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: 0.06 })
      hearts(x, t, 800, 1000, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Turn left | at *my billboard.*', mood: 'sparkle', star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      billboard(x, t, 760, 820, pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 760, 800, P.t0 + 0.9, 7, 220, 0.4)
      label(x, 760, 1110, 'CAN’T MISS IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Forty steps. | *Color-coded.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      steps(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.3) / 1.4) * 11))
      label(x, 790, 1100, 'STEP 1 OF 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Both ways are | *equally lovely.*', mood: 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      signpost(x, 770, 880, pop01(t, P.t0 + 0.25, 0.3, 2), 'LOVELY', 'LOVELY')
      bubble(x, 770, 650, 'you pick!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Knows a secret shortcut. | *Won’t explain.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      keyhole(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.8, 1.3)))
      bubble(x, 790, 640, 'don’t ask.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: '"It’s super close." | *Two countries over.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      globe(x, t, 790, 840, 150, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.2))
      label(x, 790, 1080, '5 MIN AWAY*', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1160, '*BY PLANE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 24, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Printed the route. | *Notarized it.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-136, -180, 272, 360); x.fillStyle = '#fff4e2'; x.fillRect(-128, -172, 256, 344)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('OFFICIAL ROUTE', 0, -130)
        x.fillStyle = '#c9c0b0'; for (let i = 0; i < 6; i++) x.fillRect(-100, -90 + i * 30, 200 - (i % 2) * 40, 8)
        x.restore()
      }
      const s = prog(lt, 1.0, 1.2)
      if (s > 0) drawBits(x, STAMP, { R: RED }, 840, 980, lerp(22, 12, ease.outCubic(s)), { rot: -0.2, alpha: s })
      label(x, 790, 640, 'SIGNED · DATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#9aa5c4', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Navigate by | the *actual stars.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      telescopeSky(x, t, 760, 760, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.3) / 1.2))
      label(x, 780, 1020, 'HEAD NORTH-ISH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Got lost with you. | *Cried together.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      map(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 0.6, { upside: true })
      bubble(x, 790, 1060, 'where ARE we', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0117', key: 'E', accent: MINT, ending: 'lesson',
  title: 'Zodiacs giving | directions *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody arrived. | *Everyone bonded.*' },
  lesson: { text: 'Any road is fine | with the *right people.*', chip: 'ROUTE: SCENIC' },
  last: { text: 'Still lost. | *Still laughing.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
