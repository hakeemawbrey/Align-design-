// r2a0036: ADVICE SOLO, "Cancer, the right people | will stay." (~47 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "Cancer, the right people | *will stay.*"
//   3.6–37.8   remembers every birthday (add yours to the list) · "home safe?" (the right ones text back) · soup for
//              everyone (keep a bowl) · a shoebox of ticket stubs (memories allowed) · hiding in the shell (back soon)
//              · sorry ×9 (you did nothing wrong) · missing an old friend (call) · loving hard (superpower, with a cape)
//              · a compatibility check (kind is compatible)
//  37.8        "Soft heart. | *Strong shell.*"
//  41.2        CALLBACK: "The soup? | Came *back to you.*"  Three friends turn up with bowls.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, HEART,
} from '../../signs3kit.js'

const S = 'cancer', BLUE = '#7fd0ff', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', WOOD = '#b77a45', NAVY = '#2a2350'

function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// a notepad list of birthdays, ticked one by one; the last line is "ME" and gets a heart
function birthdayList(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  shadow(x, -150, -200, 300, 400); box(x, -150, -200, 300, 400, '#fff4e2')
  x.fillStyle = BLUE; x.fillRect(-150, -200, 300, 50); txt(x, 'BIRTHDAYS', 0, -175, 30, INK, { font: MONO, weight: 700 })
  const rows = ['MOM', 'BEST FRIEND', 'COUSIN', 'MAIL CARRIER', 'THE DOG']
  const n = Math.floor(clamp((lt - 0.2) / 1.0) * rows.length)
  rows.forEach((r, i) => { txt(x, r, -120, -110 + i * 52, 24, '#4a3f7a', { font: MONO, weight: 700, align: 'left' }); if (i < n) txt(x, '✓', 110, -110 + i * 52, 30, '#2a9d5c') })
  if (lt > 1.4) { txt(x, '+ ME', -120, 160, 32, RED, { font: MONO, weight: 700, align: 'left' }); drawBits(x, HEART, { H: RED, W: '#fff' }, 100, 160, 6) }
  x.restore()
}
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  shadow(x, -130, -220, 260, 440); box(x, -130, -220, 260, 440, NAVY); x.fillStyle = '#140c30'; x.fillRect(-114, -190, 228, 380)
  x.restore()
  bubble(x, cx + 10, cy - 90, 'home safe?', pop01(lt, 0.3, 0.25, 2.2) * k, { size: 32, col: BLUE, tail: 'br' })
  bubble(x, cx - 10, cy + 40, 'yes! thank you', pop01(lt, 1.2, 0.25, 2.2) * k, { size: 28, col: BONE, tail: 'bl' })
  bubble(x, cx - 10, cy + 140, 'you’re the best', pop01(lt, 1.6, 0.25, 2.2) * k, { size: 28, col: BONE, tail: 'bl' })
}
function soupPot(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -150, -60, 300, 170)
  box(x, -150, -60, 300, 170, '#c9c9d8'); x.fillStyle = ORANGE; x.fillRect(-150, -60, 300, 30)
  box(x, -186, -30, 30, 26, NAVY); box(x, 156, -30, 30, 26, NAVY)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 7; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); x.moveTo(-60 + i * 60, -80 - ph * 120); x.quadraticCurveTo(-40 + i * 60, -110 - ph * 120, -60 + i * 60, -140 - ph * 120); x.stroke() }
  x.restore()
}
function bowl(x, cx, cy, k, col = ORANGE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI); x.fill(); x.fillRect(-66, -10, 132, 14)
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI); x.fill()
  x.fillStyle = col; x.fillRect(-58, -6, 116, 12)
  x.restore()
}
function shoebox(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const COLS = [PINK, GOLD, MINT, LAV, BLUE, ORANGE]
  for (let i = 0; i < 9; i++) { x.save(); x.translate(-120 + (i % 5) * 60, -70 - Math.floor(i / 5) * 40 + Math.sin(t * 2 + i) * 4); x.rotate(Math.sin(i * 1.7) * 0.5); box(x, -36, -20, 72, 40, COLS[i % 6], 4); x.fillStyle = INK; x.fillRect(-20, -4, 40, 6); x.restore() }
  shadow(x, -170, -40, 340, 170); box(x, -170, -40, 340, 170, '#d99a4e')
  box(x, -110, 0, 220, 60, BONE, 4); txt(x, 'MEMORIES', 0, 30, 30, INK, { font: MONO, weight: 700 })
  x.restore()
}
// a big crab-shell dome over the star
function shell(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + F.S * 0.12); x.scale(k, k)
  const r = F.S * 0.62
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, Math.PI, 0); x.fill(); x.fillRect(-r - 10, -4, 2 * r + 20, 34)
  x.fillStyle = '#ff8a5c'; x.beginPath(); x.arc(0, 0, r, Math.PI, 0); x.fill(); x.fillRect(-r, 0, 2 * r, 22)
  x.fillStyle = '#ffb38f'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-r * 0.6 + i * r * 0.3, -r * 0.45 + Math.abs(i - 2) * 24, 16, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function sorryNotes(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.min(9, 1 + Math.floor(lt / 0.12))
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx + Math.sin(i * 2.1) * 90, cy + Math.cos(i * 1.7) * 130); x.rotate(Math.sin(i * 3.1) * 0.3); x.scale(k, k)
    box(x, -70, -40, 140, 80, GOLD, 4); txt(x, 'sorry', 0, 2, 30)
    x.restore()
  }
  if (lt > 1.3) { x.save(); x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; const p = ease.outCubic(prog(lt, 1.3, 1.6)); x.beginPath(); x.moveTo(cx - 150, cy - 160); x.lineTo(cx - 150 + 300 * p, cy - 160 + 320 * p); x.stroke(); x.restore() }
}
function oldPhone(x, t, cx, cy, k, ring) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (ring ? Math.sin(t * 50) * 5 : 0), cy); x.scale(k, k)
  shadow(x, -130, -40, 260, 140)
  box(x, -130, -20, 260, 120, RED)
  box(x, -150, -80, 300, 50, RED)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 40, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 40, 38, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; x.fillRect(Math.cos(a) * 24 - 4, 40 + Math.sin(a) * 24 - 4, 8, 8) }
  x.restore()
}
// a heart wearing a cape
function capeHeart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(-150 + Math.sin(t * 6) * 12, 120); x.lineTo(150 + Math.sin(t * 6 + 1) * 12, 120); x.lineTo(70, -60); x.fill()
  x.fillStyle = BLUE; x.beginPath(); x.moveTo(-62, -54); x.lineTo(-138 + Math.sin(t * 6) * 12, 110); x.lineTo(138 + Math.sin(t * 6 + 1) * 12, 110); x.lineTo(62, -54); x.fill()
  drawBits(x, HEART, { H: RED, W: '#fff' }, 0, 0, 30)
  x.restore()
}
function meter(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -50, 340, 100); box(x, -170, -50, 340, 100, NAVY)
  const p = ease.outCubic(prog(lt, 0.5, 1.4))
  x.fillStyle = MINT; x.fillRect(-156, -36, 312 * p, 72)
  txt(x, p > 0.98 ? 'COMPATIBLE ✓' : 'CHECKING…', 0, 2, 32, p > 0.5 ? INK : BONE, { font: MONO, weight: 700 })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Remember every birthday? | *Add yours* to the list.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { birthdayList(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Always ask “home safe?” | The right ones *answer.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt) } },
  { sign: S, cap: 'Made soup for everyone? | *Keep a bowl.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      soupPot(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      bowl(x, 600, 1110, pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 790, 1120, 'FOR: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept every ticket stub? | *Memories count.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shoebox(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'SINCE FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hiding in your shell? | *Rest. Then come out.*', mood: 'sleepy', star: { x: 0 },
    front(x, t, lt, P, F) {
      shell(x, F, pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 540, 640, 'BACK SOON', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 760, 1100, 'take your time', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Said sorry nine times? | *You did nothing wrong.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) { sorryNotes(x, t, 760, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Missing an old friend? | *Call. They miss you too.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      oldPhone(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 && lt < 1.8)
      label(x, 790, 730, 'BESTIE SINCE 3RD GRADE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 24, bg: GOLD, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'I was JUST thinking of you', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 26, tail: 'bc' })
    } },
  { sign: S, cap: 'Love so hard it’s scary? | *That’s a superpower.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      capeHeart(x, t, 790, 860 - Math.sin(prog(lt, 0.8, 2.4) * Math.PI) * 30, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1100, 'HERO MODE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: BLUE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 850, P.t0 + 1.0, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Checking who’s compatible? | *Kind people are.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, '♋︎ CANCER + KIND', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, font: MONO, weight: 700 })
      meter(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2), lt)
      hearts(x, t, 790, 1110, P.t0 + 1.6, { n: 5, life: 1.6, spread: 220, cell: 6, seed: 5 })
    } },
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
  id: 'r2a0036', key: 'D', accent: BLUE, solo: S, ending: 'callback',
  title: 'Cancer, the right people | *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong shell.*', mood: 'heart' },
  last: {
    text: 'The soup? | Came *back to you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 540, 1000, 260 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', seed: 40, hops: [t0 + 1.7] })
      ;[['taurus', 260, 1220, 0.7], ['pisces', 540, 1300, 0.95], ['virgo', 820, 1220, 1.2]].forEach(([id, fx, fy, d], i) => {
        const kk = pop01(t, t0 + d, 0.4, 1.9)
        if (kk <= 0.01) return
        signChar(x, t, id, fx, fy, 210 * kk, { mood: 'happy', look: [fx < 540 ? 1 : fx > 540 ? -1 : 0, -1], seed: 50 + i, tears: id === 'pisces' ? 2 : 0, glyph: false })
        bowl(x, fx, fy + 120, kk * 0.9, [ORANGE, GOLD, MINT][i])
      })
      hearts(x, t, 540, 900, t0 + 1.7, { n: 6, life: 2, spread: 300, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
