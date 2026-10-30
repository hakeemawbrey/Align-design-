// srghosted — "Seen. 3 days ago." (Star Talk Remix of promo/films/ghosted, 30 s vertical) · story 0–25.6, then the end card.
//   0.0–4.2   "Seen. 3 days ago."  A phone: your "had a really good time tonight :)" and the grey "Seen · 3 days ago". The
//             stars stare at it. Crickets. THE STARS: "it's been 3 days. we *counted.*"
//   4.3–8.7   "Ghosted. Again."  The name in the header fades and a little pixel ghost floats up out of the phone ("boo"),
//             waves, and is gone; the stars jump. The thread list greys out row by row (Seen · Seen · Unmatched), a ghost
//             drifting off each row. THE STARS: "that's not a person. that's a ghost."
//   8.8–13.8  "We made people disposable."  A stack of grey profile cards flicks away left, right, faster and faster; the
//             stars' eyes follow every flick until they spin (Pisces faints). ♑ CAPRICORN blows a whistle: the stack stops.
//             "nobody's disposable." The last card turns face-down to the card back.
//  13.93      card cut (flip).
//  14.0–17.0  "Tonight's deck."  Three veiled cards deal in, slowly, one by one. THE STARS: "a few cards a night. dealt with care."
//  17.1–20.8  "Dealbreakers first."  The middle card comes forward; ✕ GHOSTING and ✕ ONE-WORD TEXTS stamp onto it, the
//             stars cheer each one. THE STARS: "say what ends it *before* it starts."
//  20.95–23.1 "Nobody gets picked alone."  Two cards slide together and lock with a gold glow: YOU BOTH CHOSE. Heart eyes.
//  23.2–25.45 "Be chosen."  The gold star winks; everything pops out by 25.5; the end card at 25.6.
// One canvas (sky + phone + cards + stars), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawTears, drawWhistle, drawBitmap } from './props.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5c6e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)

// the flicks: accelerating, alternating sides
const FLICKS = (() => { const out = []; let t = 9.05, g = 0.62; while (t < 11.15) { out.push(+t.toFixed(3)); t += g; g = Math.max(0.11, g * 0.72) } return out })()

export const T = {
  black: [0, 0.3],
  phone: 0.1,
  h1: 0.25, h1Land: 0.95, h1Out: [4.05, 4.25], crick: [2.95, 3.55],
  l1: 1.3, closeA: 4.4,
  h2: 4.35, h2Land: 4.65, h2Out: [8.5, 8.7], ghost: [4.7, 6.6], boo: 5.2, list: 6.1, rows: [6.35, 6.75, 7.15],
  l2: 5.35, closeB: 8.7,
  h3: 8.8, h3Land: 9.3, h3Out: [13.55, 13.75], stack: 8.85, faint: 10.6,
  whistle: 11.25, l3: 11.42, stop: 11.27, turn: [12.7, 13.2], closeC: 13.85,
  cut1: BEAT(24),                                   // 13.933
  h4: 14.0, h4Land: 14.3, h4Out: [17.35, 17.55], deal: [14.15, 14.55, 14.95],
  l4: 14.6, l5: 17.75, closeD: 20.8,
  h5: 17.6, h5Land: 18.0, h5Out: [20.65, 20.85], fwd: [17.6, 18.0], stamps: [18.3, 18.9],
  h6: 20.95, h6Land: 21.6, h6Out: [22.95, 23.15], slide: [20.95, 21.5], lock: 21.55, hearts: 21.85,
  h7: 23.2, h7Land: 23.5, h7Out: [25.2, 25.45], wink: 24.2,
  out: [25.05, 25.45],
}

// ── the dialogue
const STARS = 'THE STARS', CAP = '♑ CAPRICORN'
const CAPC = '#5fe0b8'
const LA_ = [{ t: T.l1, speaker: STARS, text: "it's been 3 days. we *counted.*" }]
const LB_ = [{ t: T.l2, speaker: STARS, text: "that's not a person. that's a *ghost.*" }]
const LC_ = [{ t: T.l3, speaker: CAP, color: CAPC, text: "nobody's *disposable.*" }]
const LD_ = [{ t: T.l4, speaker: STARS, text: 'a few cards. dealt with *care.*' }, { t: T.l5, speaker: STARS, text: 'say what ends it *before* it starts.' }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LD_]
const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LD_, T.closeD]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
void LT
const HOPS_OF = sp => talkHops(ALL_LINES, sp, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const lastFlick = t => { let n = -1; for (let i = 0; i < FLICKS.length; i++) if (t >= FLICKS[i]) n = i; return n }

// ── the cast
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  gem: { ...signStar('gemini'), seed: 11 },
  sco: { ...signStar('scorpio'), seed: 23 },
  pis: { ...signStar('pisces'), seed: 29 },
  cap: { ...signStar('capricorn'), seed: 37 },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['sco', 'gem', 'pis', 'cap', 'g0']
const LAY = {
  A: { g0: [880, 568, 150], gem: [152, 730, 132], sco: [930, 800, 132], pis: [150, 1185, 146] },
  C: { g0: [930, 1240, 150], gem: [140, 600, 124], sco: [940, 600, 124], pis: [150, 1250, 140] },
  C2: { g0: [930, 1240, 150], gem: [140, 600, 124], sco: [940, 600, 124], pis: [150, 1250, 140], cap: [540, 1290, 180] },
  D: { g0: [165, 1265, 165], cap: [918, 1265, 150], gem: [120, 600, 110], pis: [960, 600, 110] },
}
const SEG = [{ t: 0, L: LAY.A }, { t: T.h3, L: LAY.C, anim: 0.4 }, { t: T.whistle - 0.25, L: LAY.C2, anim: 0.25 }, { t: T.cut1, L: LAY.D }]
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.03
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + (k === 'cap' ? 0 : stag), p = prog(t, t0, t0 + S.anim)
    if (cur && prev) { const e = ease.inOutCubic(p); return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 50, lerp(prev[2], cur[2], e)], pk: 1 } }
    if (cur) return { p: [cur[0], lerp(2100, cur[1], ease.outCubic(p)), cur[2]], pk: 1 }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, 0.4 + stag * 3, 0.4, 1.8)
  return { p: cur, pk }
}

const PH = { x: 540, y: 1005, s: 1.0 }
const GHOST = [
  '...XXXXX...',
  '..XWWWWWX..',
  '.XWWWWWWWX.',
  'XWWKWWWKWWX',
  'XWWKWWWKWWX',
  'XWWWWWWWWWX',
  'XWWWWOWWWWX',
  'XWWWWWWWWWX',
  'XWWWWWWWWWX',
  'XWXWWXWWXWX',
  '.X.XX.XX.X.',
]
const drawGhost = (x, gx, gy, cell, alpha = 1, wave = 0) => {
  drawBitmap(x, GHOST, gx, gy, cell, { X: '#5b5f86', W: '#e9ecff', K: '#1b1236', O: '#1b1236' }, { alpha, rot: Math.sin(wave) * 0.12 })
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all(['card-back.png', 'card-profile-1.png', 'card-profile-2.png', 'card-profile-3.png', 'card-profile-4.png'].map(loadImg))
  const BACK = bake(ims[0], 560), PROF = ims.slice(1).map(im => bake(im, 640))
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = (text, o) => popText(root, text, { wobble: true, late: 1, fit: true, ...o })
  const H1 = H('Seen. | 3 days *ago.*', { top: 190, size: 116, accentSize: 160, at: T.h1, lateAt: T.h1Land, accentColor: '#9aa3c7', gap: 0.2 })
  const H2 = H('Ghosted. | *Again.*', { top: 190, size: 116, accentSize: 164, at: T.h2, lateAt: T.h2Land, accentColor: '#c9d0ff' })
  const H3 = H('We made people | *disposable.*', { top: 190, size: 104, accentSize: 150, at: T.h3, lateAt: T.h3Land, accentColor: RED })
  const H4 = H("Tonight's *deck.*", { top: 215, size: 120, accentSize: 168, at: T.h4, lateAt: T.h4Land, accentColor: LAV })
  const H5 = H('Dealbreakers | *first.*', { top: 190, size: 116, accentSize: 164, at: T.h5, lateAt: T.h5Land, accentColor: PINK })
  const H6 = H('Nobody gets | picked *alone.*', { top: 190, size: 112, accentSize: 156, at: T.h6, lateAt: T.h6Land, accentColor: GOLD })
  const H7 = H('Be *chosen.*', { top: 215, size: 140, accentSize: 196, at: T.h7, lateAt: T.h7Land, accentColor: GOLD })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1430, width: 960, height: 290, close, cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (local units 420 × 800)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawPhone(t) {
    if (t >= T.h3 + 0.4) return
    const k = easeOutBack(prog(t, T.phone, T.phone + 0.45), 1.7) * (1 - ease.inCubic(prog(t, T.h3 - 0.05, T.h3 + 0.35)))
    if (k <= 0.01) return
    const boo = pulse(t, T.boo, 0.3)
    x.save()
    x.translate(PH.x + boo * 8 * Math.sin(t * 90), PH.y); x.rotate(-1.5 * Math.PI / 180); x.scale(PH.s * k, PH.s * k)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    x.save(); x.shadowColor = rgba('#7f9cff', 0.5); x.shadowBlur = 80; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#121a3c'); g.addColorStop(1, '#1d2550'); x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    const lp = prog(t, T.list, T.list + 0.35)
    if (lp < 1) { x.save(); x.globalAlpha = 1 - lp; drawThread(t, sx, sy, sw, sh); x.restore() }
    if (lp > 0) { x.save(); x.globalAlpha = lp; drawList(t, sx, sy, sw, sh); x.restore() }
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    x.globalAlpha = 0.07; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }
  function drawThread(t, sx, sy, sw, sh) {
    const fade = 1 - clamp(prog(t, T.ghost[0], T.ghost[0] + 0.6))
    x.fillStyle = 'rgba(10,6,28,0.45)'; x.fillRect(sx, sy + 52, sw, 92)
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `700 40px ${INTER}`; x.fillText('‹', sx + 20, sy + 112)
    x.save(); x.globalAlpha *= fade
    x.fillStyle = '#7b7d96'; x.beginPath(); x.arc(sx + 80, sy + 98, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText('sam', sx + 116, sy + 109)
    x.restore()
    if (fade < 1) { x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.4 * (1 - fade)); x.fillText('[ user unavailable ]', sx + 72, sy + 108) }
    x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.55); x.textAlign = 'center'; x.fillText('FRI 11:52 PM', 0, sy + 196)
    // your message (right)
    x.font = `700 32px ${INTER}`
    const lines = ['had a really good', 'time tonight :)'], bw = 300, bh = 112, bx = sw / 2 - 22 - bw, by = sy + 222
    rr(bx, by, bw, bh, 28); x.fillStyle = LAV; x.fill()
    x.fillStyle = '#1b1236'; x.textAlign = 'left'; lines.forEach((l, i) => x.fillText(l, bx + 24, by + 46 + i * 40))
    const sp = 1 + 0.15 * pulse(t, T.h1Land, 0.4)
    x.save(); x.translate(bx + bw - 6, by + bh + 34); x.scale(sp, sp); x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.7); x.textAlign = 'right'; x.fillText('Seen · 3 days ago', 0, 0); x.restore()
  }
  const ROWS = [['alex', 'Seen'], ['jordan', 'Seen'], ['sam', 'Unmatched']]
  function drawList(t, sx, sy, sw, sh) {
    x.textAlign = 'left'; x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.fillText('Messages', sx + 28, sy + 120)
    ROWS.forEach(([n, s], i) => {
      const y0 = sy + 170 + i * 130, gr = clamp(prog(t, T.rows[i], T.rows[i] + 0.35))
      x.globalAlpha = 1 - 0.55 * gr
      x.fillStyle = gr > 0.5 ? '#4a4e6a' : '#7b7d96'; x.beginPath(); x.arc(sx + 70, y0 + 50, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = BONE; x.font = `800 32px ${INTER}`; x.fillText(n, sx + 128, y0 + 44)
      x.fillStyle = s === 'Unmatched' ? RED : rgba(BONE, 0.6); x.font = `700 22px ${MONO}`; x.fillText(s, sx + 128, y0 + 80)
      x.globalAlpha = 1
      // a ghost lifts off the row
      const gp = prog(t, T.rows[i] + 0.1, T.rows[i] + 1.4)
      if (gp > 0 && gp < 1) drawGhost(x, sx + 70 + gp * 40, y0 + 50 - gp * 160, 5, Math.sin(Math.PI * gp), t * 8)
    })
  }

  // the big ghost floats out of the phone, says boo, waves, gone
  function drawBigGhost(t) {
    const p = prog(t, ...T.ghost)
    if (p <= 0 || p >= 1) return
    const a = Math.min(1, p * 5) * (1 - ease.inQuad(prog(t, T.ghost[1] - 0.5, T.ghost[1])))
    const gx2 = PH.x + 40 * Math.sin(p * 6), gy = lerp(1050, 640, ease.outCubic(Math.min(1, p * 1.6)))
    drawGhost(x, gx2, gy, 12, a, t * 5)
    if (t >= T.boo && t < T.boo + 0.9) {
      x.save(); x.globalAlpha = a; x.font = `800 40px ${INTER}`; x.textAlign = 'left'
      const bx = gx2 + 80, by = gy - 110
      rr(bx, by, 120, 64, 24); x.fillStyle = BONE; x.fill(); x.fillStyle = '#1b1236'; x.fillText('boo', bx + 26, by + 46); x.restore()
    }
  }

  // ─────────────────────────────── the disposable stack
  const NAMES = ['riley, 29', 'max, 31', 'dee, 27', 'kai, 26', 'lou, 33', 'nat, 28', 'ash, 30', 'cam, 25', 'jo, 32', 'eli, 29', 'sky, 27', 'bo, 34']
  const TC = ['#6f7290', '#7b7d96', '#5f6382', '#8a8ca2', '#676a86', '#74778f']
  function greyCard(cx, cy, rot, i, a = 1) {
    const w = 420, h = 560
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot)
    x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 30); x.fillStyle = TC[i % 6]; x.fill(); x.shadowBlur = 0
    x.save(); rr(-w / 2, -h / 2, w, h, 30); x.clip()
    x.fillStyle = 'rgba(20,18,40,0.5)'; x.beginPath(); x.arc(0, -60, 90, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(0, 220, 170, 150, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(10,8,24,0.55)'; x.fillRect(-w / 2, h / 2 - 90, w, 90)
    x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.fillText(NAMES[i % NAMES.length], -w / 2 + 28, h / 2 - 32)
    x.restore(); x.restore()
  }
  function drawStack(t) {
    if (t < T.stack || t >= T.cut1 + 0.05) return
    const ip = easeOutBack(prog(t, T.stack, T.stack + 0.4), 1.6)
    const n = lastFlick(t), cy = 945
    // the pile behind
    const left = FLICKS.length - n
    for (let j = Math.min(3, left); j >= 1; j--) greyCard(540 + j * 6, cy + j * 10, (j % 2 ? 1 : -1) * 0.03 * j, n + 1 + j, ip)
    // the cards flying off
    for (let i = Math.max(0, n - 2); i <= n; i++) {
      const p = prog(t, FLICKS[i], FLICKS[i] + 0.32)
      if (p >= 1) continue
      const d = i % 2 ? 1 : -1
      greyCard(540 + d * ease.inQuad(p) * 900, cy - p * 120, d * p * 0.6, i, 1)
    }
    // the top card: still once the whistle blows, then turns face-down
    const top = n + 1
    const f = prog(t, ...T.turn), sx2 = Math.cos(f * Math.PI)
    x.save(); x.translate(540, cy); x.scale(Math.abs(sx2) * ip, ip); x.translate(-540, -cy)
    if (sx2 >= 0) greyCard(540, cy, 0, top, 1)
    else if (BACK) { const w = 420 / BACK_BODY, h = w * BACK.height / BACK.width; x.drawImage(BACK, 540 - w / 2, cy - h / 2, w, h) }
    x.restore()
    if (f > 0.5) { const gg = x.createRadialGradient(540, cy, 0, 540, cy, 520); gg.addColorStop(0, rgba(LAV, 0.25 * clamp((f - 0.5) * 2))); gg.addColorStop(1, rgba(LAV, 0)); x.fillStyle = gg; x.fillRect(0, cy - 520, W, 1040) }
    sparkles(t, 540, cy, T.turn[1] - 0.1, 12, 300, 0.5, 0.7, 26)
  }

  // ─────────────────────────────── tonight's deck, dealbreakers, both choose
  function drawImg(img, body, cx, cy, wBody, rot, a = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  const FAN = [[-1, 280, 0.16], [0, 540, 0], [1, 800, -0.16]]
  function drawDeck(t) {
    if (t < T.deal[0] || t >= T.h6) return
    const fw = ease.inOutCubic(prog(t, ...T.fwd)), o = prog(t, T.h5Out[0] - 0.1, T.h6)
    FAN.forEach(([side, fx, rot], i) => {
      const p = prog(t, T.deal[i], T.deal[i] + 0.5)
      if (p <= 0) return
      const e = easeOutBack(p, 1.4)
      let cx = lerp(540, fx, e), cy = lerp(2300, 960, e), r = lerp(0.6 * (side || 1), -rot * -1, e), wB = 280, a = 1
      if (side !== 0) { cx += side * fw * 70; cy += fw * 60; a = 1 - 0.55 * fw; wB = 280 - fw * 30 }
      else { cy -= fw * 20; wB = 280 + fw * 140 }
      a *= 1 - o
      drawImg(PROF[i], FACE_BODY, cx, cy, wB, side === 0 ? 0 : -rot, a)
    })
    // stamps on the middle card
    const STAMPS = [['✕ GHOSTING', 1110], ['✕ ONE-WORD TEXTS', 1200]]
    STAMPS.forEach(([txt, y], i) => {
      const t0 = T.stamps[i], p = prog(t, t0 - 0.12, t0)
      if (t < t0 - 0.12) return
      const sc = t < t0 ? lerp(2.4, 1, ease.inCubic(p)) : 1 + 0.08 * pulse(t, t0, 0.2)
      x.save(); x.globalAlpha = (t < t0 ? p : 1) * (1 - o); x.translate(540, y); x.rotate(-0.06 + i * 0.05); x.scale(sc, sc)
      x.font = `700 40px ${MONO}`; const tw = x.measureText(txt).width
      x.fillStyle = 'rgba(20,8,24,0.92)'; x.fillRect(-tw / 2 - 24, -36, tw + 48, 72)
      x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-tw / 2 - 18, -30, tw + 36, 60)
      x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    })
  }
  function drawPair(t) {
    if (t < T.h6 - 0.1) return
    const p = ease.inOutCubic(prog(t, ...T.slide)), k = popOut(t, T.out), ip = easeOutBack(prog(t, T.h6 - 0.1, T.h6 + 0.3), 1.6)
    const lk = clamp(prog(t, T.lock, T.lock + 0.4))
    if (lk > 0) { const gg = x.createRadialGradient(540, 960, 0, 540, 960, 620); gg.addColorStop(0, rgba(GOLD, 0.35 * lk * k)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.fillRect(0, 340, W, 1240) }
    drawImg(PROF[0], FACE_BODY, lerp(-200, 380, p), 960, 290 * ip, lerp(-0.4, -0.08, p), k)
    drawImg(PROF[3], FACE_BODY, lerp(1280, 700, p), 960, 290 * ip, lerp(0.4, 0.08, p), k)
    if (lk > 0) {
      // a gold pixel heart where they meet + the label
      const hb = 1 + 0.15 * Math.sin((t - T.lock) * 8)
      drawBitmap(x, ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], 540, 960, 14 * easeOutBack(lk, 2.6) * hb, { X: GOLD }, { alpha: k })
      x.save(); x.globalAlpha = lk * k; x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('YOU BOTH CHOSE', 540, 1340); x.restore()
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4]) }
    x.restore()
  }

  // ─────────────────────────────── the cast
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  const HOPS = {
    g0: [...HOPS_OF(STARS), T.boo + 0.02, ...T.stamps, T.lock, T.h7Land],
    gem: [T.boo + 0.04, ...T.stamps.map(s => s + 0.05), T.lock + 0.05, T.whistle + 0.02],
    sco: [T.boo + 0.06, T.whistle + 0.04],
    pis: [T.boo + 0.03, ...T.stamps.map(s => s + 0.08), T.lock + 0.08],
    cap: [...HOPS_OF(CAP), T.whistle, ...T.stamps.map(s => s + 0.03), T.lock + 0.03],
  }
  function stateOf(k, t, p) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, rot = 0
    if (t < T.h3) {
      look = toward(p, PH.x, PH.y)
      if (t >= T.h1Land) mood = 'squint'
      for (const c of T.crick) { const b = t - (c + p[0] / W * 0.25); if (b >= 0 && b < 0.13) blink = 1 }
      if (t >= T.ghost[0]) { mood = 'wide'; blink = false; look = toward(p, PH.x, 760) }
      if (t >= T.boo) { const kk = t - T.boo; dy = -60 * Math.exp(-kk * 4) * Math.abs(Math.sin(kk * 9)); squash = -0.2 * Math.exp(-kk * 5) }
      if (t >= T.list) { mood = 'squint'; blink = undefined; look = toward(p, PH.x, PH.y) }
      if (k === 'pis') tears = t >= T.list ? 0.8 : t >= T.h1Land ? 0.3 : 0
      if (k === 'g0' && t >= T.l2 && t < T.list) { mood = 'squint'; look = [0, 0] }
    } else if (t < T.cut1) {                       // the flicks
      const n = lastFlick(t)
      if (n >= 0 && t < T.whistle) {
        const d = n % 2 ? 1 : -1
        look = [d, 0]; mood = n >= 5 ? 'eyeroll' : 'wide'; blink = false
        dx = d * 8 * Math.min(n, 6)
      }
      if (k === 'pis' && t >= T.faint && t < T.whistle + 0.6) { rot = Math.min(1, (t - T.faint) * 4) * 1.4; mood = 'sleepy'; dy = 30 * Math.min(1, (t - T.faint) * 4) }
      if (t >= T.whistle) { mood = 'wide'; look = toward(p, 540, 1290); blink = undefined; dx = 0; const kk = t - T.whistle; squash = -0.2 * Math.exp(-kk * 6) * Math.cos(kk * 22) }
      if (t >= T.turn[0]) { mood = 'sparkle'; look = toward(p, 540, 945) }
      if (k === 'cap') { mood = t < T.turn[0] ? 'squint' : 'happy'; look = [0, 0] }
      if (k === 'pis') tears = t >= T.whistle ? 0.6 : 0
    } else if (t < T.h6) {                          // the deck, the stamps
      look = toward(p, 540, 980); mood = 'sparkle'
      if (t >= T.stamps[0] - 0.12) { mood = 'wide'; blink = false }
      for (const s of T.stamps) if (t >= s && t < s + 0.5) { mood = 'happy'; blink = undefined }
      if (t >= T.stamps[1] + 0.5) mood = 'happy'
      if (k === 'g0' && t >= T.l4 && t < T.l4 + 1.6) look = [0, 0]
      if (k === 'pis') tears = t >= T.deal[2] ? 0.5 : 0
    } else {                                        // both choose
      look = toward(p, 540, 960); mood = 'wide'
      if (t >= T.hearts + p[0] / W * 0.15) mood = 'heart'
      if (t >= T.h7) { mood = 'happy'; look = [0, 0] }
      if (k === 'g0' && t >= T.wink) mood = 'wink'
      if (k === 'pis') tears = t >= T.lock ? 1 : 0.5
    }
    return { mood, look, blink, squash, dx, dy, tears, rot }
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) {
      const P = place(k, t)
      if (!P) continue
      const p = P.p, pk = P.pk * ok
      if (pk <= 0.02) continue
      const C = CAST[k], st = stateOf(k, t, p)
      x.save()
      if (st.rot) { x.translate(p[0], p[1]); x.rotate(st.rot); x.translate(-p[0], -p[1]) }
      const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * 0.04 })
      x.restore()
      if (st.tears > 0) { const S = R.size, ey = R.y + S * 0.07, exo = S * 0.17; drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears }) }
      if (k === 'cap' && t < T.cut1) { const blow = pulse(t, T.whistle - 0.02, 0.62); drawWhistle(x, R.x + R.size * 0.03, R.y + R.size * 0.13, R.size / 24, { blow, t, flip: true }) }
    }
  }

  function drawWorld(t) {
    const warm = clamp(prog(t, T.cut1 - 0.1, T.cut1 + 0.2))
    drawSky(x, t, { ...SKY_H, dim: lerp(0.32, SKY_H.dim, warm), stars: lerp(0.5, 1, warm) })
    const cold = 1 - warm
    if (cold > 0) { x.fillStyle = rgba('#0b1028', 0.35 * cold); x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawPhone(t)
        drawBigGhost(t)
        drawStack(t)
        drawDeck(t)
        drawPair(t)
        drawCast(t)
        sparkles(t, 540, 960, T.lock, 14, 380, 0.2, 0.8, 30)
        for (const s of T.stamps) sparkles(t, 540, 1150, s, 8, 260, s, 0.5, 22)
      }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the middle one: 13.93 flip). 8.75 and 20.9 stay inert.
export const CUTS = [8.75, { t: T.cut1, kind: 'flip' }, 20.9]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are moved into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, gap = 0.07) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.02) => [['pop', r3(t0), 659.25, gain, -0.35], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, -0.35], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, -0.35]]
const whistle = (t0, len = 0.5, gain = 0.03) => Array.from({ length: Math.round(len / 0.03) }, (_, i) => ['pop', r3(t0 + i * 0.03), i % 2 ? 2793.83 : 2349.32, gain * (1 - 0.4 * i / (len / 0.03)), 0.1])
const cheer = t0 => [['whoosh', r3(t0 + 0.2), 0.4, 0.035], ['glitter', r3(t0), r3(t0 + 0.25)], ['pop', r3(t0 + 0.02), NOTE[3], 0.035, 0]]
const PITCH = { [STARS]: 880, [CAP]: 659.25 }

export const CUES = [
  ...wordPops(T.h1, 1, 0.2, 0), ['pop', r3(T.h1 + 0.2), 659.25, 0.026, 0], ['pop', T.h1Land, 587.33, 0.04, 0], ['pluck', T.h1Land, 587.33, 0.035, 0.8, 0],
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.011)]),
  ...head(T.h2, 1, T.h2Land, 2),
  ['whoosh', T.ghost[0], 0.8, 0.03], ['pop', T.boo, 392, 0.05, 0], ['pop', r3(T.boo + 0.1), 311.13, 0.045, 0], ['boom', T.boo, 0.08],
  ['tick', T.list, 0.03], ...T.rows.flatMap((r, i) => [['pop', r3(r + 0.2), 440 - i * 40, 0.025, 0], ['whoosh', r3(r + 0.1), 0.6, 0.015]]),
  ...head(T.h3, 2, T.h3Land, 4),
  ...FLICKS.map((f, i) => ['whoosh', f, 0.14, 0.03 + Math.min(i, 8) * 0.002]),
  ['riser', FLICKS[2], T.whistle, 0.03],
  ['pop', T.faint, 523.25, 0.03, -0.4], ['pop', r3(T.faint + 0.12), 392, 0.03, -0.4], ['pop', r3(T.faint + 0.24), 261.63, 0.03, -0.4],
  ...whistle(T.whistle, 0.5), ['tapeStop', T.whistle, 0.45], ['boom', r3(T.whistle + 0.01), 0.1],
  ['whoosh', T.turn[0], 0.4, 0.035], ['bell', T.turn[1], 1318.51, 0.04, 1.6, 0], ['glitter', r3(T.turn[1] - 0.1), r3(T.turn[1] + 0.5)],
  ...head(T.h4, 1, T.h4Land, 3),
  ...T.deal.map((d, i) => ['tick', r3(d + 0.35), 0.05]), ...T.deal.map((d, i) => ['pop', r3(d + 0.35), NOTE[i * 2], 0.03, (i - 1) * 0.3]),
  ...head(T.h5, 1, T.h5Land, 1), ['whoosh', T.fwd[0], 0.35, 0.03],
  ...T.stamps.flatMap(s => [['boom', s, 0.12], ['tick', s, 0.06], ...cheer(r3(s + 0.08))]),
  ...head(T.h6, 3, T.h6Land, 0), ['whoosh', T.slide[0], 0.5, 0.04],
  ['bell', T.lock, 1760, 0.045, 2, 0], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['pluck', r3(T.lock + i * 0.01), f, 0.03, 1.2, (i - 1.5) * 0.2]), ['glitter', T.lock, r3(T.lock + 0.6)],
  ...sob(r3(T.hearts + 0.3), 0.016),
  ...head(T.h7, 1, T.h7Land, 2), ['bell', r3(T.h7Land + 0.02), 1760, 0.03, 1.6, 0],
  ['tick', T.wink, 0.04], ['pluck', r3(T.wink + 0.02), 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
