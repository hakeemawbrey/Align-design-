// srlonely — "Never more connected." (Star Talk Remix of promo/films/lonely, 30 s vertical) · story 0–25.6, then the end card.
//   0.0–3.3   "We've never been more connected."  2:14 AM, a dark sky, one phone glowing: MATCHES · 214 / 0 CONVERSATIONS.
//             The gold star (THE STARS) wakes above it and squints. Box: "214 matches. zero conversations."
//   3.35–7.6  "Or more alone."  The thumb scrolls the grid of faces into a blur. Box: "babe. that's not dating. that's a collection."
//   7.8–13.7  "Small talk. Then silence."  A crowd of sign stars pops in round the phone: hey · hey · wyd · lol, each one
//             greying out with Seen. Typing dots… every star leans in… the dots stop. Womp, crickets.
//             ♓ PISCES (crying): "they were typing."
//  13.93      card cut (flip).
//  14.0–20.9  "What if someone actually asked?"  A talk card drops from the sky and flips: The Fool, "What's a hill you will
//             die on?" THE STARS: "skip the 'hey'. play a talk card." → "No small talk. Real questions." "you both answer.
//             no peeking till you both do."
//  21.0–23.1  "Then you talk."  The phone is back: the card is played, both answers land face-down and flip together; the
//             chat keeps going and the clock jumps from 2:14 to 3:41 AM. Heart eyes; Pisces sobs happily.
//  23.25–25.5 "You deserve to be known."  The gold star winks; everything pops out by 25.5; the end card takes over at 25.6.
// One canvas (sky + phone + card + stars), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawTears } from './props.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)

export const T = {
  black: [0, 0.3],
  phone: 0.1, g0In: 0.45, wake: 0.8,
  h1: 0.25, h1Land: 0.85, h1Out: [3.05, 3.25],
  h2: 3.35, h2Land: 3.55, h2Out: [7.45, 7.65],
  scroll: [3.5, 7.3],
  l1: 0.95, l2: 3.9, closeA: 7.6,
  crowd: 7.8,
  h3: 7.85, h3Land: 11.2, h3Out: [13.55, 13.75],
  bub: [8.3, 8.9, 9.5, 10.1], seenDelay: 0.38,
  dots: [10.5, 11.15], lean: [10.55, 11.0], womp: 11.2, crick: [11.75, 12.55],
  l3: 11.45, closeB: 13.7,
  cut1: BEAT(24),                                   // 13.933
  h4: 14.0, h4Land: 14.5, h4Out: [17.0, 17.2],
  card: 14.05, flip: [15.0, 15.4],
  l4: 14.65, l5: 17.45, closeC: 20.95,
  h5: 17.25, h5Land: 17.8, h5Out: [20.75, 20.95],
  cardOut: [20.6, 20.95],
  phone2: 21.0, h6: 21.05, h6Land: 21.35, h6Out: [23.0, 23.2],
  play: 21.2, ans: [21.5, 21.7], ansFlip: [22.0, 22.3], hearts: 22.35, more: [22.75, 23.15, 23.55], clock: 23.4,
  h7: 23.25, h7Land: 23.85, h7Out: [25.2, 25.45], wink: 24.4,
  out: [25.05, 25.45],
}

// ── the dialogue
const STARS = 'THE STARS', PIS = '♓ PISCES'
const PISC = '#8fd8f6'
const LA_ = [
  { t: T.l1, speaker: STARS, text: '214 matches. *zero* conversations.' },
  { t: T.l2, speaker: STARS, text: "babe. that's not dating. that's a *collection.*" },
]
const LB_ = [{ t: T.l3, speaker: PIS, color: PISC, text: 'they were *typing.*' }]
const LC_ = [
  { t: T.l4, speaker: STARS, text: "skip the 'hey'. play a *talk card.*" },
  { t: T.l5, speaker: STARS, text: 'you both answer. no peeking till you *both* do.' },
]
export const ALL_LINES = [...LA_, ...LB_, ...LC_]
const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const STAR_HOPS = talkHops(ALL_LINES, STARS, { cps: CPS })
const PIS_HOPS = talkHops(ALL_LINES, PIS, { cps: CPS })
const charAt = (li, word) => { const L = ALL_LINES[li].text.replace(/\*/g, ''); return LT[li].chars[Math.max(0, L.indexOf(word))] }
const T_ZERO = charAt(0, 'zero'), T_COLL = charAt(1, 'collection')

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the cast
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  gem: { ...signStar('gemini'), seed: 11 },
  can: { ...signStar('cancer'), seed: 17 },
  sco: { ...signStar('scorpio'), seed: 23 },
  pis: { ...signStar('pisces'), seed: 29 },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['sco', 'can', 'gem', 'pis', 'g0']
const LAY = {
  A: { g0: [840, 545, 196] },
  B: { g0: [860, 520, 166], gem: [152, 730, 132], can: [930, 790, 132], pis: [150, 1185, 146], sco: [932, 1205, 132] },
  C: { g0: [178, 1235, 204], gem: [140, 650, 124], can: [944, 650, 124], pis: [916, 1250, 150] },
  D: { g0: [860, 520, 166], gem: [152, 730, 132], can: [930, 790, 132], pis: [150, 1185, 146], sco: [932, 1205, 132] },
}
const SEG = [{ t: 0, L: LAY.A }, { t: T.crowd, L: LAY.B, anim: 0.4 }, { t: T.cut1, L: LAY.C }, { t: T.phone2, L: LAY.D, anim: 0.42 }]
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.03
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (cur && prev) { const e = ease.inOutCubic(p); return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 60, lerp(prev[2], cur[2], e)], pk: 1 } }
    if (cur) return { p: cur, pk: pop01(t, t0, 0.34, 2.2) }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, T.g0In, 0.4, 1.8)
  else if (t < S.t + 0.7) pk = pop01(t, S.t + 0.06 + stag, 0.32, 2.2)
  return { p: cur, pk }
}

const PH = { x: 540, y: 1005, s: 1.0 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "500 30px Inter", "700 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-1.png')])
  const BACK = bake(backIm, 560), TALK = bake(talkIm, 560)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { wobble: true, late: 1, fit: true, ...o })
  const H1 = H("We've never been | more *connected.*", { top: 190, size: 104, accentSize: 140, at: T.h1, lateAt: T.h1Land, accentColor: LAV })
  const H2 = H('Or more *alone.*', { top: 215, size: 130, accentSize: 176, at: T.h2, lateAt: T.h2Land, accentColor: '#8fb6ff', gap: 0.12 })
  const H3 = H('Small talk. | Then *silence.*', { top: 190, size: 112, accentSize: 150, at: T.h3, lateAt: T.h3Land, late: 2, accentColor: '#9aa3c7' })
  const H4 = H('What if someone | actually *asked?*', { top: 190, size: 104, accentSize: 144, at: T.h4, lateAt: T.h4Land, accentColor: GOLD })
  const H5 = H('No small talk. | Real *questions.*', { top: 190, size: 104, accentSize: 144, at: T.h5, lateAt: T.h5Land, accentColor: GOLD })
  const H6 = H('Then you *talk.*', { top: 215, size: 120, accentSize: 168, at: T.h6, lateAt: T.h6Land, accentColor: PINK })
  const H7 = H('You deserve | to be *known.*', { top: 190, size: 116, accentSize: 164, at: T.h7, lateAt: T.h7Land, accentColor: GOLD, gap: 0.09 })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1430, width: 960, height: 290, close, cps: CPS }))

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (local units 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function phoneK(t) {
    if (t < T.cut1) return easeOutBack(prog(t, T.phone, T.phone + 0.45), 1.7)
    if (t < T.phone2) return 0
    return easeOutBack(prog(t, T.phone2, T.phone2 + 0.42), 1.8) * popOut(t, T.out)
  }
  function drawPhone(t) {
    const k = phoneK(t)
    if (k <= 0.01) return
    const sh = pulse(t, T.womp, 0.35)
    x.save()
    x.translate(PH.x, PH.y + sh * 10); x.rotate((t < T.cut1 ? -1.5 : 1.5) * Math.PI / 180); x.scale(PH.s * k, PH.s * k)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    x.save(); x.shadowColor = rgba(t > T.phone2 ? PINK : '#7f9cff', 0.55); x.shadowBlur = 80
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, shh = h - 32
    x.save(); rr(sx, sy, sw, shh, 50); x.clip()
    const warm = clamp(prog(t, T.hearts, T.hearts + 0.8))
    const g = x.createLinearGradient(0, sy, 0, sy + shh)
    g.addColorStop(0, mixc('#121a3c', '#2a1650', warm)); g.addColorStop(1, mixc('#1d2550', '#5b2a74', warm))
    x.fillStyle = g; x.fillRect(sx, sy, sw, shh)
    if (t < T.crowd) drawMatches(t, sx, sy, sw, shh)
    else if (t < T.cut1) drawChat(t, sx, sy, sw, shh)
    else drawTalk(t, sx, sy, sw, shh)
    // status bar clock
    x.fillStyle = rgba(BONE, 0.85); x.font = `700 24px ${INTER}`; x.textAlign = 'left'
    const clk = t >= T.clock ? '3:41' : '2:14'
    const cp = pulse(t, T.clock, 0.35)
    x.save(); x.translate(sx + 40, sy + 40); x.scale(1 + cp * 0.5, 1 + cp * 0.5); x.fillStyle = cp > 0 || t >= T.clock ? '#ffcf5a' : rgba(BONE, 0.85); x.fillText(clk, -10, 8); x.restore()
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    x.globalAlpha = 0.07; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + shh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }
  const mixc = (a, b, k) => { const A1 = parseInt(a.slice(1), 16), B1 = parseInt(b.slice(1), 16); const c = s => Math.round(lerp((A1 >> s) & 255, (B1 >> s) & 255, clamp(k))); return `rgb(${c(16)},${c(8)},${c(0)})` }

  // matches: a grid of grey faces, scrolled into a blur by the thumb
  const TILE_COLS = ['#6f7290', '#7b7d96', '#5f6382', '#8a8ca2', '#676a86', '#74778f']
  function tile(cx, cy, s, i) {
    rr(cx - s / 2, cy - s / 2, s, s * 1.12, 18); x.fillStyle = TILE_COLS[i % 6]; x.fill()
    x.save(); rr(cx - s / 2, cy - s / 2, s, s * 1.12, 18); x.clip()
    x.fillStyle = 'rgba(20,18,40,0.55)'
    x.beginPath(); x.arc(cx, cy - s * 0.08, s * 0.2, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(cx, cy + s * 0.5, s * 0.38, s * 0.3, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function drawMatches(t, sx, sy, sw, sh) {
    x.textAlign = 'left'; x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.fillText('Matches', sx + 28, sy + 120)
    x.font = `700 27px ${MONO}`; x.fillStyle = rgba(BONE, 0.85); x.fillText('214 MATCHES', sx + 28, sy + 166)
    const zp = pulse(t, T_ZERO, 0.4)
    x.save(); x.translate(sx + 28, sy + 202); x.scale(1 + zp * 0.25, 1 + zp * 0.25); x.fillStyle = PINK; x.fillText('0 CONVERSATIONS', 0, 0); x.restore()
    // grid, scrolling
    const sp = prog(t, ...T.scroll), speed = Math.sin(Math.PI * sp)
    const off = (ease.inOutQuad(sp) * 2600) % 360
    x.save(); x.beginPath(); x.rect(sx, sy + 230, sw, sh - 230); x.clip()
    const s = 104
    const blur = speed * 16
    for (let pass = 0; pass < (blur > 1 ? 4 : 1); pass++) {
      x.globalAlpha = blur > 1 ? 0.3 : 1
      for (let r = -1; r < 6; r++) for (let c = 0; c < 3; c++) tile(sx + 70 + c * 126, sy + 310 + r * 120 - off + pass * blur, s, r * 3 + c + 99)
    }
    x.globalAlpha = 1
    x.restore()
    // the thumb: a pale pill swiping up
    if (speed > 0.05) {
      const ty = sy + sh - 120 - ((t * 2.4) % 1) * 260
      x.globalAlpha = 0.35 * speed; x.fillStyle = '#ffffff'; rr(sw / 2 - 90, ty, 60, 120, 30); x.fill(); x.globalAlpha = 1
    }
  }
  function header(sy, sw, name = 'match #187') {
    x.fillStyle = 'rgba(10,6,28,0.45)'; x.fillRect(-sw / 2, sy + 52, sw, 92)
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `700 40px ${INTER}`; x.fillText('‹', -sw / 2 + 20, sy + 112)
    x.fillStyle = '#6f7290'; x.beginPath(); x.arc(-sw / 2 + 80, sy + 98, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText(name, -sw / 2 + 116, sy + 109)
  }
  function bubble(text, side, by, sw, { size = 38, col, txt = '#1b1236', alpha = 1, label = null, faceDown = 0 } = {}) {
    x.save(); x.globalAlpha *= alpha
    x.font = `700 ${size}px ${INTER}`
    const tw = x.measureText(text).width, bw = Math.min(sw - 60, tw + 48), bh = size + 36
    const bx = side < 0 ? -sw / 2 + 22 : sw / 2 - 22 - bw
    rr(bx, by, bw, bh, 28); x.fillStyle = col; x.fill()
    if (faceDown > 0) {
      // a face-down answer: violet card-back stripes over the bubble
      x.save(); rr(bx, by, bw, bh, 28); x.clip(); x.globalAlpha *= faceDown
      x.fillStyle = '#3b2370'; x.fillRect(bx, by, bw, bh)
      x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 3; rr(bx + 8, by + 8, bw - 16, bh - 16, 20); x.stroke()
      x.fillStyle = GOLD; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('?', bx + bw / 2, by + bh / 2 + 11)
      x.restore()
    }
    if (faceDown < 1) { x.globalAlpha *= 1 - faceDown; x.fillStyle = txt; x.textAlign = 'left'; x.fillText(text, bx + 24, by + bh / 2 + size * 0.36) }
    x.restore()
    if (label) { x.save(); x.globalAlpha *= alpha * label[1]; x.font = `700 20px ${MONO}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = side < 0 ? 'left' : 'right'; x.fillText(label[0], side < 0 ? bx + 8 : bx + bw - 8, by + bh + 26); x.restore() }
    return bh
  }
  const SMALL = [['hey', -1], ['hey', 1], ['wyd', -1], ['lol', 1]]
  function drawChat(t, sx, sy, sw, sh) {
    header(sy, sw)
    SMALL.forEach(([txt, side], i) => {
      const tb = T.bub[i], p = easeOutBack(prog(t, tb, tb + 0.3), 2)
      if (p <= 0) return
      const grey = clamp(prog(t, tb + T.seenDelay, tb + T.seenDelay + 0.4))
      const col = side < 0 ? mixc('#efe6d6', '#545a78', grey) : mixc('#c9a6ff', '#545a78', grey)
      x.save(); x.translate(0, (1 - p) * 30)
      bubble(txt, side, sy + 180 + i * 122, sw, { col, txt: mixc('#1b1236', '#9aa0bd', grey), label: [side < 0 ? 'Seen' : 'Delivered', grey] })
      x.restore()
    })
    // typing dots… then nothing
    if (t >= T.dots[0] && t < T.dots[1]) {
      const bx = -sw / 2 + 22, by = sy + 180 + 4 * 122
      rr(bx, by, 126, 70, 35); x.fillStyle = 'rgba(239,230,214,0.9)'; x.fill()
      for (let i = 0; i < 3; i++) { const ph = (t * 2.4 - i * 0.18) % 1; x.fillStyle = rgba('#1b1236', ph < 0.5 ? 0.9 : 0.35); x.beginPath(); x.arc(bx + 33 + i * 30, by + 35 - (ph < 0.5 ? 4 : 0), 9, 0, Math.PI * 2); x.fill() }
    }
  }
  const ANS = [['cereal is a soup.', -1, '#efe6d6'], ['WAIT. same??', 1, '#ff8fb1']]
  const MORE = [['ok defend it', -1], ['milk = broth.', 1], ['marry me lol', -1]]
  function drawTalk(t, sx, sy, sw, sh) {
    // the played card (small, centred); the thread scrolls under the header
    x.save(); x.beginPath(); x.rect(-sw / 2, sy + 144, sw, sh - 144); x.clip()
    const cp = easeOutBack(prog(t, T.play, T.play + 0.4), 1.8)
    const scroll = ease.inOutCubic(prog(t, T.more[0] - 0.1, T.more[2] + 0.2)) * 200
    x.save(); x.translate(0, -scroll)
    if (cp > 0 && TALK) { const w = 150 * cp, h2 = w * TALK.height / TALK.width; x.drawImage(TALK, -w / 2, sy + 160, w, h2) }
    x.font = `700 18px ${MONO}`; x.fillStyle = rgba(GOLD, clamp(cp)); x.textAlign = 'center'; x.fillText('YOU BOTH PLAYED', 0, sy + 418)
    ANS.forEach(([txt, side, col], i) => {
      const p = easeOutBack(prog(t, T.ans[i], T.ans[i] + 0.3), 2)
      if (p <= 0) return
      const fl = prog(t, ...T.ansFlip), fd = fl < 0.5 ? 1 : 0, sq = Math.abs(Math.cos(fl * Math.PI))
      x.save(); x.translate(0, sy + 448 + i * 104 + 36); x.scale(1, Math.max(0.05, sq)); x.translate(0, -(sy + 448 + i * 104 + 36))
      x.translate(0, (1 - p) * 30)
      bubble(txt, side, sy + 448 + i * 104, sw, { size: 32, col: fd ? '#3b2370' : col, faceDown: fd })
      x.restore()
    })
    MORE.forEach(([txt, side], i) => {
      const p = easeOutBack(prog(t, T.more[i], T.more[i] + 0.28), 2)
      if (p <= 0) return
      x.save(); x.translate(0, (1 - p) * 30)
      bubble(txt, side, sy + 656 + i * 100, sw, { size: 32, col: side < 0 ? '#efe6d6' : '#ff8fb1' })
      x.restore()
    })
    x.restore()
    x.restore()
    header(sy, sw, 'match #187')
  }

  // ─────────────────────────────── the talk card, dealt from the sky
  function drawCard(t) {
    if (t < T.card || t > T.cardOut[1]) return
    const p = prog(t, T.card, T.card + 0.55), e = easeOutBack(p, 1.4)
    const o = prog(t, ...T.cardOut)
    const cx = 540, cy = lerp(-500, 900, e) - ease.inCubic(o) * 200
    const wob = Math.sin((t - T.card) * 2.2) * 0.03
    const f = prog(t, ...T.flip), sx2 = Math.cos(f * Math.PI)
    const wBody = 420 * (1 + 0.06 * pulse(t, T.flip[1], 0.4)) * (1 - 0.8 * ease.inCubic(o))
    // halo
    const halo = clamp(f * 2) * (1 - o)
    if (halo > 0) { const gg = x.createRadialGradient(cx, cy, 0, cx, cy, 560); gg.addColorStop(0, rgba(GOLD, 0.28 * halo)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.fillRect(cx - 560, cy - 560, 1120, 1120) }
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(wob + (1 - e) * 0.4)
    if (sx2 > 0 && BACK) { const w = wBody / BACK_BODY, h = w * BACK.height / BACK.width; x.scale(sx2, 1); x.drawImage(BACK, -w / 2, -h / 2, w, h) }
    else if (TALK) { const w = wBody, h = w * TALK.height / TALK.width; x.scale(-sx2, 1); x.drawImage(TALK, -w / 2, -h / 2, w, h) }
    x.restore()
    sparkles(t, cx, cy, T.flip[0] + 0.25, 14, 330, 0.4, 0.8, 30)
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  // ─────────────────────────────── the cast
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  function hopsFor(k) {
    const C = CAST[k], st = (C.seed % 5) * 0.03
    const h = [T.crowd + 0.4 + st, T.flip[1] + st, T.hearts + st, T.h7Land + st]
    if (C.gold) h.push(...STAR_HOPS)
    if (k === 'pis') h.push(...PIS_HOPS)
    if (k !== 'g0') h.push(...T.bub.slice(0, 2).map(b => b + 0.05 + st))
    return h
  }
  const HOPS = Object.fromEntries(Object.keys(CAST).map(k => [k, hopsFor(k)]))

  function stateOf(k, t, p) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0
    if (t < T.crowd) {                                   // one star, one phone
      look = toward(p, PH.x, PH.y)
      if (t < T.wake) { mood = 'sleepy' }
      else if (t < T.wake + 0.4) { mood = 'wide'; squash = -0.18 * Math.exp(-(t - T.wake) * 6) }
      else if (t >= T_ZERO - 0.05 && t < T.l2) { mood = 'wide'; look = [0, 0] }
      else if (t >= T.l2 && t < T_COLL) { mood = 'squint'; look = toward(p, PH.x, PH.y) }
      else if (t >= T_COLL) { mood = 'eyeroll' }
      if (t >= T.l2 + 3.0) { mood = 'neutral'; look = [0, 0] }
    } else if (t < T.cut1) {                             // small talk, then silence
      look = toward(p, PH.x, PH.y)
      let n = 0; for (const b of T.bub) if (t >= b) n++
      if (n === 1 || n === 2) mood = 'sparkle'
      if (n === 3) mood = k === 'gem' || k === 'g0' ? 'eyeroll' : 'squint'
      if (n === 4) mood = 'squint'
      if (t >= T.dots[0]) {
        mood = 'wide'; blink = false
        const ln = ease.inOutCubic(prog(t, ...T.lean)) * (t < T.dots[1] ? 1 : Math.max(0, 1 - (t - T.dots[1]) * 3))
        dx = Math.sign(PH.x - p[0]) * 60 * ln; squash = -0.14 * ln
      }
      if (t >= T.dots[1]) {
        mood = 'neutral'; blink = undefined; look = [0, 0]
        const kk = t - T.womp; squash = 0.2 * Math.exp(-kk * 5) * Math.abs(Math.cos(kk * 10))
        for (const c of T.crick) { const b = t - (c + (p[0] / W) * 0.25); if (b >= 0 && b < 0.13) blink = 1 }
      }
      if (k === 'pis') { tears = t >= T.dots[1] ? 1 : n >= 3 ? 0.4 : 0; if (t >= T.l3) { mood = 'squint'; look = [1, 0] } }
    } else if (t < T.phone2) {                           // the talk card
      look = toward(p, 540, 900)
      mood = t < T.flip[0] ? 'wide' : 'sparkle'
      if (k === 'g0' && t >= T.l4) look = [0, 0]
      if (k === 'g0' && t >= T.l5) mood = 'happy'
      if (k === 'pis') tears = t >= T.flip[1] ? 0.7 : 0.3
    } else {                                             // they talk
      look = toward(p, PH.x, PH.y)
      if (t >= T.ansFlip[0] - 0.4) { mood = 'wide'; blink = false }
      if (t >= T.hearts + (p[0] / W) * 0.15) { mood = 'heart'; blink = undefined }
      if (t >= T.h7) { mood = 'happy'; look = [0, 0] }
      if (k === 'g0' && t >= T.wink) mood = 'wink'
      if (k === 'pis') tears = t >= T.hearts ? 1 : 0.4
    }
    return { mood, look, blink, squash, dx, dy, tears }
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
      const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * 0.04 })
      if (st.tears > 0) { const S = R.size, ey = R.y + S * 0.07, exo = S * 0.17; drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears }) }
    }
  }

  function drawWorld(t) {
    const night = 1 - clamp(prog(t, T.cut1 - 0.1, T.cut1 + 0.2))
    drawSky(x, t, { ...SKY_H, dim: lerp(SKY_H.dim, 0.3, night), stars: lerp(1, 0.45, night) })
    // cold blue phone glow on the dark sky
    const gl = night * clamp(prog(t, T.phone, T.phone + 0.6)) * (0.85 + 0.15 * Math.sin(t * 2.6))
    if (gl > 0) { const g = x.createRadialGradient(PH.x, PH.y, 0, PH.x, PH.y, 820); g.addColorStop(0, rgba('#6f8cff', 0.24 * gl)); g.addColorStop(1, rgba('#6f8cff', 0)); x.fillStyle = g; x.fillRect(0, 0, W, 1920) }
    const warm = clamp(prog(t, T.hearts, T.hearts + 0.8)) * popOut(t, T.out)
    if (warm > 0) { const g = x.createRadialGradient(PH.x, PH.y, 0, PH.x, PH.y, 900); g.addColorStop(0, rgba(PINK, 0.2 * warm)); g.addColorStop(1, rgba(PINK, 0)); x.fillStyle = g; x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawCard(t)
        drawPhone(t)
        drawCast(t)
        sparkles(t, PH.x, PH.y, T.hearts, 12, 380, 0.2, 0.8, 26)
        sparkles(t, 540, 400, T.h7Land, 10, 380, 0.7, 0.8, 26)
      }
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the middle one: 13.93 flip). 7.7 and 20.98 stay inert.
export const CUTS = [7.7, { t: T.cut1, kind: 'flip' }, 20.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are moved into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.022) => [['pop', r3(t0), 659.25, gain, -0.35], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, -0.35], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, -0.35]]
const womp = t0 => [['pop', r3(t0), 392, 0.04, 0], ['pop', r3(t0 + 0.18), 369.99, 0.036, 0], ['pop', r3(t0 + 0.36), 349.23, 0.034, 0], ['pluck', r3(t0 + 0.54), 293.66, 0.04, 1.2, 0]]
const cheer = t0 => [['whoosh', r3(t0 + 0.3), 0.6, 0.045], ['glitter', r3(t0), r3(t0 + 0.5)], ['pop', r3(t0 + 0.02), NOTE[5], 0.035, 0]]
const PITCH = { [STARS]: 880, [PIS]: 739.99 }

export const CUES = [
  // 1 · connected / alone
  ...head(T.h1, 4, T.h1Land, 0),
  ['bell', T.phone + 0.1, 880, 0.014, 1.2, 0],
  ['pop', T.wake, 1174.66, 0.03, 0], ['pop', r3(T.wake + 0.07), 1318.51, 0.026, 0],
  ['pop', T_ZERO, 1318.51, 0.03, 0.2],
  ...head(T.h2, 2, T.h2Land, 2),
  ['whoosh', T.scroll[0] + 0.2, 1.4, 0.035], ['whoosh', r3(T.scroll[0] + 1.8), 1.4, 0.03],
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.scroll[0] + 0.3 + i * 0.24), 0.014]),
  // 2 · small talk, then silence
  ['whoosh', T.crowd, 0.3, 0.04], ...[0, 1, 2, 3].map(i => ['pop', r3(T.crowd + 0.08 + i * 0.05), NOTE[i + 1], 0.024, (i % 2 ? 0.4 : -0.4)]),
  ...wordPops(T.h3, 2, 0.07, 1),
  ...T.bub.flatMap((b, i) => [['pop', b, NOTE[3 + (i % 2) * 2], 0.04, i % 2 ? 0.25 : -0.25], ['tick', r3(b + T.seenDelay + 0.1), 0.02]]),
  ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.dots[0] + 0.05 + i * 0.13), 0.022]),
  ['riser', T.lean[0], T.dots[1], 0.028],
  ...womp(T.womp), ['pop', T.h3Land, 293.66, 0.04, 0], ['pluck', T.h3Land, 587.33, 0.03, 0.8, 0],
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.011)]),
  ...sob(r3(T.womp + 0.55)), ...sob(r3(T.l3 + 0.9), 0.018),
  // 3 · the talk card
  ...head(T.h4, 3, T.h4Land, 0),
  ['whoosh', T.card, 0.5, 0.05], ['tick', r3(T.card + 0.52), 0.05],
  ['whoosh', T.flip[0], 0.3, 0.04], ['bell', T.flip[1], 1318.51, 0.045, 1.6, 0], ['glitter', r3(T.flip[0] + 0.2), r3(T.flip[1] + 0.6)],
  ...head(T.h5, 4, T.h5Land, 2),
  ['whoosh', T.cardOut[0], 0.35, 0.03],
  // 4 · then you talk
  ['whoosh', T.phone2, 0.3, 0.04], ...head(T.h6, 2, T.h6Land, 3),
  ['pop', T.play, 880, 0.035, 0], ...T.ans.map((a, i) => ['pop', a, NOTE[2 + i * 2], 0.035, i ? 0.25 : -0.25]),
  ['tick', T.ansFlip[0], 0.04], ['bell', r3(T.ansFlip[0] + 0.15), 1174.66, 0.04, 1.2, 0], ...cheer(T.hearts),
  ...T.more.map((m, i) => ['pop', m, NOTE[(i * 2 + 4) % 7], 0.03, i % 2 ? 0.25 : -0.25]),
  ['pop', T.clock, 1318.51, 0.035, -0.2], ['pop', r3(T.clock + 0.06), 1567.98, 0.03, -0.2],
  ...sob(r3(T.hearts + 0.4), 0.016),
  ...head(T.h7, 4, T.h7Land, 1), ['bell', r3(T.h7Land + 0.02), 1760, 0.03, 1.6, 0],
  ['tick', T.wink, 0.04], ['pluck', r3(T.wink + 0.02), 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
