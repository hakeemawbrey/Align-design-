// r2t0039: THE SIGNS AS… v3 SOLO, "Virgos on a day off | be like." (~49 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: lesson.
//   0.0–3.6    "Virgos on a day off | *be like.*"
//   3.6–37.8   a schedule for the day off · "slept in" (6:45 AM) · a novel, three typos circled · the fridge, every jar
//              labelled · one show, with notes · "just chill" (researched it: 12 steps) · socks sorted by mood
//              · dating profile: fixed a comma · finally sat down (cushions straightened first, with a ruler)
//  37.8        "Off duty. | *Technically.*"
//  41.0        LESSON UNLOCKED: "Rest doesn’t have | to be *perfect.*"  REST: ENOUGH
//  46.9        "Next day off? | *Already scheduled.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo', SAGE = '#9fe0a0', RED = '#e23d4e', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e', WOOD = '#b77a45'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function clipboard(x, cx, cy, k, lt, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  shadow(x, -150, -200, 300, 400); box(x, -150, -200, 300, 400, WOOD); x.fillStyle = '#fff4e2'; x.fillRect(-130, -170, 260, 350)
  box(x, -50, -216, 100, 30, '#c9c9d8', 4)
  const n = Math.floor(clamp((lt - 0.2) / 1.2) * rows.length + 0.99)
  rows.slice(0, n).forEach((r, i) => { txt(x, r[0], -116, -130 + i * 56, 22, '#6b62a8', { font: MONO, weight: 700, align: 'left' }); txt(x, r[1], -36, -130 + i * 56, 24, INK, { font: MONO, weight: 700, align: 'left' }) })
  x.restore()
}
function sunrise(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.beginPath(); x.rect(-170, -200, 340, 200); x.clip()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 30, 116, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 30, 108, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) / 7 * Math.PI; x.save(); x.rotate(a); x.fillRect(130, -8, 40 + 8 * Math.sin(t * 3 + i), 16); x.restore() }
  x.restore()
  box(x, -190, 0, 380, 14, SAGE, 4)
  x.restore()
}
function novel(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -200, -130, 400, 260); box(x, -200, -130, 400, 260, '#fff4e2'); x.fillStyle = INK; x.fillRect(-4, -130, 8, 260)
  for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 7; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(s * 100 - 76, -100 + i * 30, 152 - (i % 3) * 20, 10) }
  const circ = [[-120, -40], [80, 0], [130, 80]]
  circ.forEach(([px, py], i) => { if (lt > 0.6 + i * 0.4) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(px, py + 4, 46, 22, 0, 0, Math.PI * 2); x.stroke() } })
  x.restore()
}
function fridge(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -230, 340, 460); box(x, -170, -230, 340, 460, '#e8ecf6'); x.fillStyle = '#fffbe8'; x.fillRect(-150, -210, 300, 420)
  for (let r = 0; r < 3; r++) { x.fillStyle = '#c9c9d8'; x.fillRect(-150, -80 + r * 120, 300, 8) }
  const J = [[RED, 'KETCHUP'], [GOLD, 'MUSTARD'], [SAGE, 'PICKLES'], [PINK, 'JAM'], [ORANGE, 'SAUCE'], [LAV, 'MYSTERY?']]
  J.forEach(([c, w], i) => { const px = -90 + (i % 2) * 180, py = -150 + Math.floor(i / 2) * 120; box(x, px - 36, py - 40, 72, 70, c, 4); box(x, px - 70, py + 10, 140, 26, BONE, 3); txt(x, w, px, py + 23, 16, INK, { font: MONO, weight: 700 }) })
  x.restore()
}
function tvNotes(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -200, 340, 220); box(x, -170, -200, 340, 220, NAVY); x.fillStyle = SKYB; x.fillRect(-150, -180, 300, 180)
  x.fillStyle = '#6fc3ff'; x.fillRect(-150, -60, 300, 60); signChar(x, t, 'pisces', 40, -100, 90, { mood: 'happy', seed: 9, glyph: false, glow: 0.3, tears: 1 })
  box(x, -40, 30, 80, 20, NAVY, 4)
  // the notebook
  x.save(); x.translate(60, 150); x.rotate(-0.06)
  box(x, -110, -70, 220, 140, '#fff4e2'); txt(x, 'EP 1 NOTES', 0, -46, 22, RED, { font: MONO, weight: 700 })
  const n = Math.floor(clamp((lt - 0.5) / 1.2) * 4)
  for (let i = 0; i < n; i++) { x.fillStyle = '#6b62a8'; x.fillRect(-90, -16 + i * 22, 170 - (i % 2) * 40, 8) }
  x.restore()
  x.restore()
}
function laptop(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -150, 340, 260); box(x, -150, -150, 300, 200, '#d8dbe8'); x.fillStyle = '#140c30'; x.fillRect(-136, -136, 272, 172)
  txt(x, 'HOW TO CHILL', 0, -108, 28, SAGE, { font: MONO, weight: 700 })
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 4)
  for (let i = 0; i < n; i++) txt(x, `step ${i + 1}: …`, -110, -64 + i * 30, 20, BONE, { font: MONO, weight: 700, align: 'left' })
  box(x, -180, 56, 360, 26, NAVY)
  x.restore()
}
function sockDrawer(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -190, -60, 380, 180); box(x, -190, -60, 380, 180, WOOD); x.fillStyle = '#5b2e1a'; x.fillRect(-176, -46, 352, 150)
  const C = [[GOLD, 'HAPPY'], [SKYB, 'SAD'], [RED, 'MAD'], [LAV, 'MEH']]
  C.forEach(([c, w], i) => { const px = -132 + i * 88; for (let j = 0; j < 2; j++) box(x, px - 28, -30 + j * 50, 56, 38, c, 4); txt(x, w, px, -86, 20, BONE, { font: MONO, weight: 700 }) })
  x.restore()
}
function profileCard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  shadow(x, -150, -200, 300, 400); box(x, -150, -200, 300, 400, NAVY); x.fillStyle = '#140c30'; x.fillRect(-134, -184, 268, 200)
  signChar(x, t, 'virgo', 0, -90, 150, { mood: 'happy', seed: 71, glyph: false, glow: 0.6 })
  txt(x, '♍︎ VIRGO', 0, 50, 28, SAGE, { font: MONO, weight: 700 })
  txt(x, 'likes: lists, quiet', 0, 100, 22, BONE, { font: MONO, weight: 700 })
  txt(x, 'tidy desks', 0, 134, 22, BONE, { font: MONO, weight: 700 })
  if (lt > 0.9) { txt(x, ',', -6, 100, 30, RED, { font: MONO, weight: 700 }); x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.arc(-8, 102, 20, 0, Math.PI * 2); x.stroke() }
  x.restore()
}
function cushions(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -200, -40, 400, 150); box(x, -200, -20, 400, 120, '#7a6aa8'); box(x, -220, -60, 30, 160, '#5a4a8a'); box(x, 190, -60, 30, 160, '#5a4a8a')
  const fix = ease.inOutCubic(prog(lt, 0.5, 1.3))
  const C = [PINK, GOLD, SAGE]
  C.forEach((c, i) => { x.save(); x.translate(-120 + i * 120, -60); x.rotate(lerp([0.4, -0.3, 0.25][i], 0, fix)); box(x, -46, -46, 92, 92, c); x.restore() })
  if (lt > 1.3) { box(x, -170, -126, 340, 18, GOLD, 4); x.fillStyle = INK; for (let i = 0; i < 17; i++) x.fillRect(-166 + i * 20, -126, 3, i % 5 ? 8 : 14) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Day off? | *Made a schedule for it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { clipboard(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt, [['9:00', 'RELAX'], ['9:15', 'RELAX MORE'], ['10:00', 'CHILL (B)'], ['11:30', 'FUN'], ['12:00', 'REVIEW FUN']]) } },
  { sign: S, cap: 'Finally slept in. | *Until 6:45.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sunrise(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, '6:45 AM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 52, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'so lazy today', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Read a novel for fun. | *Found three typos.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      novel(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.82, lt)
      label(x, 790, 1080, 'EMAILED THE AUTHOR', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cleaned the fridge. | *Labelled the labels.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { fridge(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85) } },
  { sign: S, cap: 'Watched one episode. | *Took notes.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { tvNotes(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lt) } },
  { sign: S, cap: 'Told to “just chill.” | *Researched it.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      laptop(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'CHILL: 12 STEPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sorted the sock drawer. | *By mood.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      sockDrawer(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9)
      sparkles(x, t, 780, 880, P.t0 + 1.2, 7, 190, 0.4)
    } },
  { sign: S, cap: 'Their dating profile? | *Fixed a comma.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profileCard(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'ATTRACTIVE NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally sat down. | *After fixing the cushions.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180, y: -60, s: 260 },
    front(x, t, lt, P) { cushions(x, t, 640, 1050, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, lt) } },
]

function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'
        for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0039', key: 'D', accent: SAGE, solo: S, ending: 'lesson',
  title: 'Virgos on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Off duty. | *Technically.*', mood: 'happy' },
  lesson: { text: 'Rest doesn’t have | to be *perfect.*', chip: 'REST: ENOUGH' },
  last: {
    text: 'Next day off? | *Already scheduled.*',
    draw(x, t, lt) { clipboard(x, 780, 1170, pop01(t, t - lt + 0.6, 0.35, 2) * 0.95, 3, [['SAT', 'DAY OFF'], ['SAT', 'REST ✓'], ['SAT', 'NO NOTES']]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
