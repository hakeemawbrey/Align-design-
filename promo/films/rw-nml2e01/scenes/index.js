// rw-nml2e01: Moonlight Lane "First Snow", retold in the v3 social look (story mode, ~55 s vertical, signs3kit, lofi · F).
// The original (../../nml2e01, 120 s): on the first snow, Cancer realises they're falling for their best friend
// Sagittarius when Gemini's talk card asks "Who do you tell first when something good happens?". Cancer hides, Sag is
// left with half a snow-star, Cancer comes back with one small true line, and they finish the five points together.
// Ten slow beats, one moment each. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Falling for your | *best friend.*"  Cancer, Sagittarius and Gemini pop in side by side.
//   3.6–41.6   ten beats (3.8 s each):
//              ♐ first snow, "make a wish!" · ♋ the polaroid wall, a year of Saturdays · ♊ deals the talk card
//              · ♋ "easy. it's… Sagittarius." · ♋ heart eyes, Sag outside in the snow: "…oh no." · ♋ hides under a
//              blanket, "can't! busy!" · ♐ alone with half a snow-star · ♋ "sorry I went quiet. I missed you."
//              · ♐ "help me with the points?" five points, lit · ♊ at the window with cocoa: "called it."
//  41.6        "Who do you | *tell first?*"  The three side by side.
//  44.8        LESSON UNLOCKED: "Notice who you run to. | *Don't vanish.*"  +1 SNOW-STAR
//  50.7        "Next snow? | Cancer *says it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ICE = '#cfeeff', SNOW = '#ffffff', WARM = '#ffcf8a'

// ── soft snowfall inside the panel (the panel's inner area: x 110–970, y 480–1220)
function snow(x, t, { n = 34, alpha = 1, seed = 0 } = {}) {
  x.save(); x.beginPath(); x.rect(112, 482, 856, 736); x.clip()
  for (let i = 0; i < n; i++) {
    const r = Math.sin(i * 12.9898 + seed * 7.1) * 43758.5453, f = r - Math.floor(r)
    const sp = 70 + 50 * f, ph = ((t * sp / 760 + f + i / n) % 1 + 1) % 1
    const fx = 120 + ((i * 97 + seed * 31) % 840) + Math.sin(t * 1.3 + i) * 18
    const fy = 470 + ph * 770, s = i % 3 === 0 ? 14 : 10
    x.globalAlpha = alpha * (0.7 + 0.3 * f) * Math.min(1, 3 * Math.sin(Math.PI * ph))
    x.fillStyle = SNOW; x.fillRect(fx - s / 2, fy - s / 2, s, s)
  }
  x.restore()
}
const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..']
const FLAKE_C = { W: SNOW }

// ── the snow-star: points 0…5, optionally lit (fairy-light dots)
function snowStar(x, cx, cy, R, points, k, lit = 0, t = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const r = R * 0.45
  const body = () => {
    x.beginPath()
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5 + Math.PI / 5; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
    x.closePath()
  }
  const tip = i => { const a = -Math.PI / 2 + i * Math.PI * 2 / 5, a1 = a - Math.PI / 5, a2 = a + Math.PI / 5; x.beginPath(); x.moveTo(Math.cos(a1) * r, Math.sin(a1) * r); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.lineTo(Math.cos(a2) * r, Math.sin(a2) * r); x.closePath() }
  const pts = Math.floor(points), part = points - pts
  x.lineJoin = 'round'
  if (points < 5) {          // the missing points, as a faint dashed outline
    x.save(); x.setLineDash([12, 10]); x.lineWidth = 5; x.strokeStyle = 'rgba(239,230,214,0.55)'
    for (let i = Math.ceil(points); i < 5; i++) { tip(i); x.stroke() }
    x.restore()
  }
  for (const pass of [0, 1]) {
    x.fillStyle = pass ? SNOW : INK; x.strokeStyle = INK; x.lineWidth = pass ? 0 : 16
    body(); pass ? x.fill() : x.stroke()
    for (let i = 0; i < pts; i++) { tip(i); pass ? x.fill() : x.stroke() }
    if (part > 0.02) { x.save(); x.scale(1, 1); const i = pts; const a = -Math.PI / 2 + i * Math.PI * 2 / 5; x.translate(Math.cos(a) * r * (1 - part), Math.sin(a) * r * (1 - part)); x.scale(part, part); tip(i); pass ? x.fill() : x.stroke(); x.restore() }
  }
  x.fillStyle = ICE; body(); x.globalAlpha = 0.5; x.fill(); x.globalAlpha = 1
  if (lit > 0.01) {
    const LC = [GOLD, PINK, MINT, SKYB, LAV]
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5, on = 0.6 + 0.4 * Math.sin(t * 5 + i * 1.7)
      x.globalAlpha = lit * on; x.fillStyle = LC[i]
      x.shadowColor = LC[i]; x.shadowBlur = 18
      x.fillRect(Math.cos(a) * R * 0.72 - 9, Math.sin(a) * R * 0.72 - 9, 18, 18)
      const b = a + Math.PI / 5
      x.fillRect(Math.cos(b) * r * 0.9 - 7, Math.sin(b) * r * 0.9 - 7, 14, 14)
    }
    x.shadowBlur = 0; x.globalAlpha = 1
  }
  x.restore()
}

// ── a polaroid: bone frame, a little coloured scene with two stars' colours, tilted
function polaroid(x, cx, cy, k, rot, top, bottom, word) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-84, -94, 180, 210)
  x.fillStyle = INK; x.fillRect(-94, -104, 188, 214)
  x.fillStyle = BONE; x.fillRect(-88, -98, 176, 202)
  x.fillStyle = '#2a2350'; x.fillRect(-74, -84, 148, 134)
  x.fillStyle = top; x.fillRect(-52, -20, 40, 40)
  x.fillStyle = bottom; x.fillRect(12, -20, 40, 40)
  x.fillStyle = BONE; x.fillRect(-44, -8, 8, 8); x.fillRect(-28, -8, 8, 8); x.fillRect(20, -8, 8, 8); x.fillRect(36, -8, 8, 8)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, 78)
  x.restore()
  // the pin
  x.fillStyle = INK; x.fillRect(cx - 10, cy - 116, 20, 20); x.fillStyle = PINK; x.fillRect(cx - 6, cy - 112, 12, 12)
}

// ── the talk card: a big bone card with the question
function talkCard(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  const W = 380, H = 300
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-W / 2 + 10, -H / 2 + 12, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = BONE; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#ffe27a'; x.fillRect(-W / 2, -H / 2, W, 50)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 24px ${MONO}`; x.fillText('✦ TALK CARD ✦', 0, -H / 2 + 27)
  x.font = `800 36px ${INTER}`
  ;['Who do you', 'tell first when', 'something good', 'happens?'].forEach((l, i) => x.fillText(l, 0, -62 + i * 46))
  x.restore()
}

// ── a cosy blanket lump (Cancer under it, eyes peeking)
function blanket(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 212, 152, 0, Math.PI, 0); x.lineTo(212, 52); x.lineTo(-212, 52); x.closePath(); x.fill()
  x.fillStyle = '#ff8fb1'; x.beginPath(); x.ellipse(0, 0, 200, 140, 0, Math.PI, 0); x.lineTo(200, 44); x.lineTo(-200, 44); x.closePath(); x.fill()
  x.fillStyle = '#ffb8cf'
  for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) { const px = i * 52 + (j % 2) * 26, py = -100 + j * 48; if (Math.abs(px) < 190 - j * 10 && (py > -Math.sqrt(Math.max(0, 1 - (px / 200) ** 2)) * 140 + 14)) x.fillRect(px - 9, py - 9, 18, 18) }
  x.restore()
}

// ── a window frame (the café window: someone outside in the snow)
function windowFrame(x, l, tp, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = 'rgba(143,227,255,0.10)'; x.fillRect(l, tp, w, h)
  x.fillStyle = INK; x.fillRect(l - 14, tp - 14, w + 28, 14); x.fillRect(l - 14, tp + h, w + 28, 14); x.fillRect(l - 14, tp, 14, h); x.fillRect(l + w, tp, 14, h)
  x.fillStyle = '#8a5a3e'; x.fillRect(l - 8, tp - 8, w + 16, 6); x.fillRect(l - 8, tp + h + 2, w + 16, 6); x.fillRect(l - 8, tp, 6, h); x.fillRect(l + w + 2, tp, 6, h)
  x.fillRect(l + w / 2 - 3, tp, 6, h); x.fillRect(l, tp + h / 2 - 3, w, 6)
  x.restore()
}

const MUG = [
  '.S.S...',
  '..S.S..',
  'KKKKK..',
  'KWWWKKK',
  'KWWWK.K',
  'KWWWKKK',
  'KWWWK..',
  '.KKK...',
]
const MUG_C = { S: BONE, K: '#8a4a2e', W: '#ffcf8a' }

const CAMEOS = [
  // 1 · the first snow
  { sign: 'sagittarius', cap: 'First snow. | Sagittarius *loses it.*', mood: 'sparkle', look: [0, -1], star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    back(x, t) { snow(x, t, { n: 40 }) },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'first snow! | make a wish!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      drawBits(x, FLAKE, FLAKE_C, 770, 900, 24 * k, { rot: 0.1 * Math.sin(t * 2) })
      sparkles(x, t, 770, 900, P.t0 + 1.1, 6, 110, 0.4, [SNOW, ICE, GOLD])
    } },
  // 2 · the polaroid wall
  { sign: 'cancer', cap: 'Best friends. | *One whole year.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: { x: -190, y: 40, s: 260 },
    front(x, t, lt, P) {
      const SAG = '#c97bff', CAN = '#8fe3ff'
      polaroid(x, 640, 640, pop01(t, P.t0 + 0.3, 0.3, 2), -0.08, CAN, SAG, 'CAFÉ')
      polaroid(x, 850, 650, pop01(t, P.t0 + 0.6, 0.3, 2), 0.07, SAG, CAN, 'WALK')
      polaroid(x, 650, 920, pop01(t, P.t0 + 0.9, 0.3, 2), 0.05, CAN, SAG, 'SNACKS')
      polaroid(x, 860, 930, pop01(t, P.t0 + 1.2, 0.3, 2), -0.06, SAG, CAN, 'SAT.')
      label(x, 750, 1130, 'EVERY SATURDAY', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 34, bg: PINK, rot: -0.04 })
    } },
  // 3 · Gemini deals the talk card
  { sign: 'gemini', cap: 'Gemini deals | a *talk card.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: { x: -200, y: 30, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.4, 2)
      talkCard(x, lerp(560, 750, ease.outCubic(prog(lt, 0.35, 0.9))), 820, k, lerp(-0.3, 0.04, ease.outCubic(prog(lt, 0.35, 0.9))))
    } },
  // 4 · the answer
  { sign: 'cancer', cap: 'Easy question. | *Too* easy.', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, "easy. it's…", pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 740, 1010, '…Sagittarius.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 50, col: LAV, tail: 'bl' })
    } },
  // 5 · …oh no.
  { sign: 'cancer', cap: 'Every good thing. | Told *them first.*', mood: 'heart', look: [1, 0], star: { x: -190, y: 20, s: 280 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      windowFrame(x, 640, 640, 300, 360, k)
      x.save(); x.beginPath(); x.rect(640, 640, 300, 360); x.clip()
      for (let i = 0; i < 14; i++) { const ph = ((t * 0.18 + i / 14) % 1), fx = 650 + (i * 67) % 280 + Math.sin(t + i) * 8; x.globalAlpha = 0.8 * k; x.fillStyle = SNOW; x.fillRect(fx, 640 + ph * 360, 7, 7) }
      x.restore()
      if (k > 0.3) signChar(x, t, 'sagittarius', 790, 900, 140, { mood: 'sparkle', hops: [P.t0 + 0.6, P.t0 + 1.6], seed: 11, glyph: false, alpha: k })
    },
    front(x, t, lt, P) {
      bubble(x, 350, 640, '…oh no.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 52, tail: 'bc' })
    } },
  // 6 · hiding
  { sign: 'cancer', cap: 'So Cancer | *hides.*', mood: 'wide', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 280 }, hideStar: false,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      blanket(x, 540, 1110, k)
      bubble(x, 540, 610, "can't! busy!", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, tail: 'bc' })
      label(x, 800, 1150, 'HIDING (BADLY)', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  // 7 · half a snow-star
  { sign: 'sagittarius', cap: 'Half a | *snow-star.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 1], star: { x: -180, y: 20 },
    back(x, t) { snow(x, t, { n: 22, alpha: 0.7, seed: 3 }) },
    front(x, t, lt, P) {
      snowStar(x, 770, 930, 150, 2, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 760, 640, 'did I do | something?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  // 8 · the small true thing
  { sign: 'cancer', cap: 'One small | *true thing.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 260 },
    back(x, t) { snow(x, t, { n: 18, alpha: 0.6, seed: 5 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.05) signChar(x, t, 'sagittarius', 810, 990, 200, { mood: lt > 1.6 ? 'sparkle' : 'neutral', look: [-1, 0], pop: k, hops: [P.t0 + 1.9], seed: 12, glyph: false })
      bubble(x, 560, 650, 'sorry I went quiet. | I missed you.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 680, 900, P.t0 + 1.7, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 4 })
    } },
  // 9 · five points, together
  { sign: 'sagittarius', cap: 'Five points. | *Together.*', mood: 'sparkle', look: [1, 0], star: { x: -200, s: 260 }, hops: [1.6],
    back(x, t) { snow(x, t, { n: 26, alpha: 0.8, seed: 7 }) },
    front(x, t, lt, P) {
      const pts = 2 + 3 * ease.inOutCubic(prog(lt, 0.3, 1.2))
      snowStar(x, 780, 850, 150, pts, 1, prog(lt, 1.3, 1.6), t)
      if (lt > 1.3) sparkles(x, t, 780, 850, P.t0 + 1.35, 8, 170, 0.2, [GOLD, SNOW, PINK])
      signChar(x, t, 'cancer', 600, 1090, 140, { mood: 'happy', look: [-1, -1], seed: 13, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 520, 600, 'help with | the points?', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  // 10 · Gemini knew
  { sign: 'gemini', cap: 'Gemini knew | the *whole time.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [-1, 0], star: { x: 170, y: 20, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      windowFrame(x, 160, 620, 320, 380, k)
      x.save(); x.beginPath(); x.rect(160, 620, 320, 380); x.clip()
      for (let i = 0; i < 14; i++) { const ph = ((t * 0.18 + i / 14) % 1), fx = 170 + (i * 67) % 300 + Math.sin(t + i) * 8; x.globalAlpha = 0.8 * k; x.fillStyle = SNOW; x.fillRect(fx, 620 + ph * 380, 7, 7) }
      x.restore()
      if (k > 0.3) {
        snowStar(x, 320, 760, 60, 5, k, 1, t)
        signChar(x, t, 'cancer', 260, 920, 110, { mood: 'happy', seed: 14, glyph: false, alpha: k })
        signChar(x, t, 'sagittarius', 380, 920, 110, { mood: 'sparkle', seed: 15, glyph: false, alpha: k })
      }
    },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 880, 1130, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 760, 610, 'called it.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 48, col: '#ffe27a', tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'rw-nml2e01', key: 'F', accent: '#8fe3ff',
  title: 'Falling for your | *best friend.*',
  cast: ['cancer', 'sagittarius', 'gemini'],
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Who do you | *tell first?*', moods: ['heart', 'sparkle', 'wink'] },
  lesson: { text: 'Notice who you run to. | *Don’t vanish.*', chip: '+1 SNOW-STAR' },
  last: {
    text: 'Next snow? | Cancer *says it.*',
    draw(x, t, lt) {
      snowStar(x, 540, 1170, 140, 5, pop01(t, t - lt + 0.4, 0.4, 2), 1, t)
      hearts(x, t, 540, 1300, t - lt + 0.8, { n: 6, life: 2.0, spread: 420, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
