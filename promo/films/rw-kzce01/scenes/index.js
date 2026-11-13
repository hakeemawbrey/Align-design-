// rw-kzce01: THE SIGNS AS… v3 STORY film, a retelling of Zodiac Courtroom kzce01 "Three Days, Then a Meme"
// (~41 s vertical, signs3kit social cut, music: lofi · D). Cast: Capricorn (the judge), Gemini (the accused),
// Virgo (the prosecutor), Pisces (the gallery, crying). The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Gemini is on trial. | For a *meme.*"  The four line up.
//   3.6–34.0   eight beats (3.8 s each):
//              ♑ court in session, Capricorn brought two gavels · ♊ pleads guilty AND not guilty
//              · ♍ exhibit A: the chat, read on Monday · ♊ then three days of silence (the calendar flips)
//              · ♊ then a frog meme · ♓ Pisces cried so hard the jury got umbrellas
//              · ♊ the defense: it was a GOOD meme · ♑ GUILTY stamp, sentence: one real reply. today.
//  34.0        ending 'group': the four together, "A meme is not | a *reply.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e8344e'
const WOOD = { d: '#3d2418', m: '#6b3f27', l: '#93603c', h: '#b9824f' }

// ── props
const FROG = ['....GG..GG....', '...GWKGGWKG...', '..GGWWGGWWGG..', '.GGGGGGGGGGGG.', 'GGGGGGGGGGGGGG', 'GGRRRRRRRRRRGG', 'GGGRRRRRRRRGGG', '.GGGGGGGGGGGG.', '..GG......GG..']
const FROG_C = { G: '#5fc46a', W: '#ffffff', K: INK, R: RED }
const UMBRELLA = [
  '.....RRRRR.....',
  '...RRRRRRRRR...',
  '..RRWRRRRRWRR..',
  '.RRRRRRRRRRRRR.',
  'RRRRRRRRRRRRRRR',
  'R..R...K...R..R',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K..K....',
  '........KK.....',
]

const box = (x, X, Y, w, h, col, b = 6) => { x.fillStyle = INK; x.fillRect(X - b, Y - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(X, Y, w, h) }

/** gavel angle for slams at local times (0 = struck, −1.1 = raised) */
function slamAngle(lt, slams) {
  let last = -1e9
  for (const s of slams) if (s <= lt + 0.1 && s > last) last = s
  const UP = -1.1
  if (last < -1e8) return UP
  const d = lt - last
  if (d < 0) return lerp(UP, 0, ease.inCubic(clamp((d + 0.1) / 0.1)))
  if (d < 0.2) return -0.12 * Math.sin(d * 28) * Math.exp(-d * 12)
  return lerp(0, UP, ease.inOutCubic(clamp((d - 0.3) / 0.45)))
}
/** a wooden gavel held at (px, py), swinging toward dir (+1 right, −1 left); impact rays on each slam */
function gavel(x, lt, px, py, slams, { s = 1, dir = 1, k = 1 } = {}) {
  if (k <= 0.01) return
  const a = slamAngle(lt, slams)
  x.save(); x.translate(px, py); x.scale(dir * s * k, s * k); x.rotate(a)
  box(x, 0, -8, 120, 16, WOOD.l, 5)
  box(x, 112, -42, 44, 84, WOOD.m, 6)
  x.fillStyle = GOLD; x.fillRect(112, -26, 44, 8); x.fillRect(112, 18, 44, 8)
  x.restore()
  let last = -1e9; for (const sl of slams) if (sl <= lt && sl > last) last = sl
  const d = lt - last
  if (d >= 0 && d < 0.3) {
    const q = 1 - d / 0.3, hx = px + dir * 134 * s, hy = py + 46 * s
    x.save(); x.globalAlpha *= q
    for (let i = 0; i < 7; i++) {
      const an = Math.PI + (i / 6) * Math.PI, r0 = 40 + 80 * (1 - q), r1 = r0 + 40 + 30 * q
      x.strokeStyle = i % 2 ? GOLD : BONE; x.lineWidth = 8; x.beginPath()
      x.moveTo(hx + Math.cos(an) * r0, hy + Math.sin(an) * r0 * 0.7); x.lineTo(hx + Math.cos(an) * r1, hy + Math.sin(an) * r1 * 0.7); x.stroke()
    }
    x.restore()
  }
}
const block = (x, bx, by) => box(x, bx - 40, by - 12, 80, 20, WOOD.d, 4)

/** the dock rail in front of the accused */
function dock(x, cx, cy, k, plate = 'DEFENDANT') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + (1 - k) * 120); x.globalAlpha *= clamp(k * 1.5)
  box(x, -230, -50, 460, 100, WOOD.m, 6)
  x.fillStyle = WOOD.l; for (let i = 0; i < 4; i++) x.fillRect(-214 + i * 110, -36, 92, 72)
  box(x, -150, -24, 300, 48, '#d9b25e', 4)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(plate, 0, 2)
  x.restore()
}

/** the evidence bag with the chat inside: asked Monday, read Monday, nothing */
function evidence(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const w = 420, h = 470
  x.save(); x.translate(cx, cy); x.rotate(0.04 + 0.02 * Math.sin(t * 1.3)); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  box(x, -w / 2, -h / 2, w, h, '#1d1640', 6)
  // the chat
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2 + 26, w, 64)
  x.fillStyle = '#ffe27a'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♊︎ gemini', 0, -h / 2 + 58)
  const mk = pop01(t, t - lt + 0.55, 0.3, 2)
  if (mk > 0.01) {
    x.save(); x.translate(40, -30); x.scale(mk, mk)
    box(x, -150, -66, 300, 132, PINK, 4)
    x.fillStyle = INK; x.font = `800 34px ${INTER}`
    x.fillText('how did the', 0, -24); x.fillText('interview go??', 0, 24)
    x.restore()
  }
  if (lt > 1.0) {
    x.globalAlpha = clamp((lt - 1.0) / 0.2)
    x.fillStyle = PINK; x.font = `700 32px ${MONO}`; x.textAlign = 'right'; x.fillText('Read · Mon', 186, 76)
    x.globalAlpha = 1
  }
  if (lt > 1.4) {
    x.globalAlpha = clamp((lt - 1.4) / 0.2) * (0.6 + 0.4 * Math.sin(t * 5))
    x.fillStyle = '#8a82c0'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('(no reply)', 0, 150)
    x.globalAlpha = 1
  }
  // plastic sheen + red zip
  x.fillStyle = 'rgba(220,235,255,0.10)'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(-w / 2 + 16, -h / 2 + 110, 10, h - 160)
  x.fillStyle = RED; x.fillRect(-w / 2, -h / 2, w, 26)
  x.fillStyle = '#a01c30'; for (let i = 0; i < w / 18; i++) x.fillRect(-w / 2 + i * 18 + 4, -h / 2 + 10, 9, 6)
  x.restore()
}

/** a desk calendar that flips MON → THU */
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const DAYS = ['MON', 'TUE', 'WED', 'THU']
  const d = Math.min(3, Math.floor(Math.max(0, lt - 0.35) / 0.45))
  const flip = clamp(((Math.max(0, lt - 0.35)) % 0.45) / 0.15)
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 300, 300)
  box(x, -150, -150, 300, 290, BONE, 6)
  x.fillStyle = RED; x.fillRect(-150, -150, 300, 70)
  x.fillStyle = '#fff4e2'; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DAY', 0, -114)
  x.fillStyle = INK; x.font = `800 110px ${INTER}`
  const sq = d < 3 ? 1 : 1
  x.save(); x.translate(0, 20); x.scale(1, d > 0 && flip < 1 ? 0.4 + 0.6 * flip : sq); x.fillText(DAYS[d], 0, 0); x.restore()
  x.fillStyle = '#8a7a66'; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 44, -88, 16, 12)
  x.restore()
}

/** the frog meme ("me rn") */
function meme(x, t, cx, cy, k, { frame = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(frame ? -0.03 : 0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-160, -134, 340, 300)
  if (frame) {
    box(x, -200, -174, 400, 368, GOLD, 6)
    x.fillStyle = '#c98f2a'; x.fillRect(-176, -150, 352, 320)
    x.fillStyle = '#fff1b0'; for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) x.fillRect(a * 186 - 8, b * 160 - 8 + 10, 16, 16)
  }
  box(x, -164, -144, 328, 288, '#f4e8cc', 6)
  x.fillStyle = '#7fd0ff'; x.fillRect(-164, -144, 328, 196)
  drawBits(x, FROG, FROG_C, 0, -44 + 4 * Math.sin(t * 6), 16)
  x.fillStyle = INK; x.font = `900 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('me rn', 0, 98)
  x.restore()
}

/** the verdict stamp: slams from big to size at local time l0 */
function stamp(x, lt, l0, text, col, { cx = 540, cy = 760, size = 110, rot = -0.12 } = {}) {
  const d = lt - l0
  if (d < 0) return
  const sc = d < 0.12 ? lerp(3, 1, ease.inCubic(d / 0.12)) : 1 + 0.06 * Math.exp(-(d - 0.12) * 9) * Math.cos((d - 0.12) * 30)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc); x.globalAlpha *= clamp(d / 0.06)
  x.font = `900 ${size}px ${INTER}`
  const tw = x.measureText(text).width, bw = tw + 80, bh = size * 1.3
  x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-bw / 2 + 14, -bh / 2 + 16, bw, bh)
  x.fillStyle = 'rgba(255,248,236,0.95)'; x.fillRect(-bw / 2, -bh / 2, bw, bh)
  x.strokeStyle = col; x.lineWidth = 12; x.strokeRect(-bw / 2 + 12, -bh / 2 + 12, bw - 24, bh - 24)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 6)
  x.fillStyle = 'rgba(255,248,236,0.9)'; for (let i = 0; i < 20; i++) x.fillRect(-bw / 2 + 30 + ((i * 97) % (bw - 60)), -bh / 2 + 24 + ((i * 53) % (bh - 48)), 7, 5)
  x.restore()
}

/** a puddle growing under Pisces */
function puddle(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.fillStyle = 'rgba(143,227,255,0.55)'; x.beginPath(); x.ellipse(cx, cy, 190 * k, 30 * k, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - 90 * k, cy - 8 * k, 50 * k, 5); x.restore()
}

const CAMEOS = [
  // 1 · the judge: court is in session, with a gavel in each hand
  { sign: 'capricorn', cap: 'Court is in session. | Capricorn brought *two gavels.*', mood: lt => lt < 0.4 ? 'squint' : 'neutral', star: { y: 40, s: 280 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      block(x, F.x + 250, F.cy + 100); block(x, F.x - 250, F.cy + 100)
      gavel(x, lt, F.x + 110, F.cy + 40, [0.55, 1.15, 1.6], { s: 1.05, dir: 1, k })
      gavel(x, lt, F.x - 110, F.cy + 40, [0.85, 1.4], { s: 1.05, dir: -1, k })
      bubble(x, 540, 590, 'ORDER! ORDER!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  // 2 · the accused: Gemini pleads both ways at once
  { sign: 'gemini', cap: 'Gemini pleads guilty. | And *not guilty.*', mood: lt => lt > 1.6 ? 'wink' : 'happy', look: lt => lt < 0.6 ? undefined : lt < 1.1 ? [-1, 0] : lt < 1.6 ? [1, 0] : [0, 0], star: { y: -30, s: 280 }, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      dock(x, 540, 1150, pop01(t, P.t0 + 0.1, 0.35, 1.8))
      bubble(x, 300, 600, 'guilty.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'br' })
      bubble(x, 770, 600, 'NOT guilty.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl', col: '#ffe9a8' })
      label(x, 540, 1025, 'BOTH. FINAL ANSWER.', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: '#ffe27a', rot: -0.04, font: MONO, weight: 700 })
    } },
  // 3 · the prosecutor: Virgo presents exhibit A (with tweezers)
  { sign: 'virgo', cap: 'Exhibit A: | read on *Monday.*', mood: 'squint', look: [1, 0], star: { x: -210, y: 40, s: 270 }, hops: [0.5],
    front(x, t, lt, P) {
      evidence(x, t, 740, 830, pop01(t, P.t0 + 0.2, 0.35, 1.8), lt)
      label(x, 610, 570, 'EXHIBIT A', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, color: RED, rot: -0.08, font: MONO, weight: 700 })
    } },
  // 4 · three days of silence (the calendar flips)
  { sign: 'gemini', cap: 'Then three days | of *silence.*', mood: lt => lt > 1.7 ? 'sleepy' : 'happy', look: [-1, -1], star: { x: -200, y: 40, s: 270 },
    front(x, t, lt, P) {
      calendar(x, 760, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 760, 1060, 'STILL ON READ', pop01(t, P.t0 + 1.75, 0.3, 2.2), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  // 5 · the reply: a frog meme
  { sign: 'gemini', cap: 'Then Gemini replied | with a *frog meme.*', mood: lt => lt > 0.9 ? 'wink' : 'happy', look: [1, 0], star: { x: -210, y: 40, s: 270 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      meme(x, t, 760, 800, pop01(t, P.t0 + 0.9, 0.35, 2.2))
      label(x, 760, 1060, 'Thu 11:48 PM', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 800, P.t0 + 0.9, 7, 200, 0.4)
    } },
  // 6 · the gallery: Pisces cries so hard the jury needs umbrellas
  { sign: 'pisces', cap: 'Pisces cried so hard | the jury got *umbrellas.*', mood: 'wide', tears: 3, star: { x: -190, y: 30, s: 270 }, hops: [0.4],
    back(x, t, lt, P) { puddle(x, 350, 1050, ease.outCubic(prog(lt, 0.3, 2.2))) },
    front(x, t, lt, P) {
      bubble(x, 350, 600, 'GASP!', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 48, tail: 'bc' })
      const j = [['virgo', 720, 0.5], ['capricorn', 870, 0.8]]
      for (const [id, jx, at] of j) {
        const k = pop01(t, P.t0 + at, 0.3, 2)
        if (k <= 0.01) continue
        signChar(x, t, id, jx, 1020, 150 * k, { mood: 'squint', look: [-1, -1], seed: jx, glyph: false })
        drawBits(x, UMBRELLA, { R: id === 'virgo' ? MINT : LAV, W: '#ffffff', K: '#d8d0c0' }, jx, 900, 11 * k)
      }
      label(x, 795, 640, 'JURY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 7 · the defense
  { sign: 'gemini', cap: 'The defense: | it was a *GOOD* meme.', mood: 'sparkle', look: [1, 0], star: { x: -220, y: 40, s: 260 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      meme(x, t, 760, 800, pop01(t, P.t0 + 0.2, 0.35, 2), { frame: true })
      label(x, 760, 1080, 'A MASTERPIECE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 800, P.t0 + 0.5, 8, 230, 0.8)
    } },
  // 8 · the verdict
  { sign: 'capricorn', cap: 'Sentence: one real reply. | *Today.*', mood: lt => lt > 0.6 ? 'squint' : 'neutral', star: { x: -230, y: 60, s: 250 },
    keyCue: t0 => ['pluck', t0 + 0.9, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      block(x, F.x + 230, F.cy + 90)
      gavel(x, lt, F.x + 95, F.cy + 30, [0.55], { s: 0.95, dir: 1, k: pop01(t, P.t0 + 0.1, 0.3, 2) })
      stamp(x, lt, 0.62, 'GUILTY', RED, { cx: 700, cy: 640, size: 96, rot: -0.1 })
      const k = pop01(t, P.t0 + 1.1, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 1000, 170 * k, { mood: 'wide', look: [-1, -1], seed: 31, glyph: false })
    } },
]

const F = makeFilm({
  id: 'rw-kzce01', key: 'D', accent: '#7fd0ff', cast: ['capricorn', 'gemini', 'virgo', 'pisces'], ending: 'group',
  title: 'Gemini is on trial. | For a *meme.*',
  cameos: CAMEOS,
  group: { cap: 'A meme is not | a *reply.*', moods: ['happy', 'wink', 'happy', 'heart'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
