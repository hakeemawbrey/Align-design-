// srflipit (30 s vertical, Star Talk Remix of "Flip it") · story 0–25.6, then the shared end card.
// The original: we swipe on faces in half a second; the card flips to a blind one. Take a chance on the stars.
// Here THE STARS (the gold narrator) catch you mid-swipe and flip the card themselves.
//   0.00–7.85   "We swipe on | *faces.*"  A grey, drained world: a phone flicks through grey pixel faces every 0.3 s, a
//               JUDGED IN 0.3s chip ticks under it. The gold star (the only colour on screen) peeks in, squinting.
//               THE STARS: "you judged that face in *0.3 seconds.*" · "In half a | *second.*"
//               THE STARS: "babe. they're made of stardust. *ours.*" (offended, wide eyes; the phone keeps swiping)
//   7.95        card cut (deal)
//   8.05–12.7   "What if we | *flipped* it?"  One grey face card sits centre. The star hops onto it and the card FLIPS:
//               the back is a veiled mystery card, colour floods back into the sky. A pink FACE: LAST stamp lands.
//               THE STARS: "card first. *face last.*"
//   12.9–17.9   "Everyone gets a | *chance.*"  Nine mystery cards deal across the sky and a little sign star pops onto each
//               one, hopping (Pisces in the middle, crying). THE STARS: "no timers. everyone gets a *real* look."
//   18.25       card cut (flip)
//   18.4–22.55  ★ LESSON UNLOCKED: "Give people more | than *0.3 seconds.*"  +1 PATIENCE (the star glows underneath)
//   22.6–25.42  "Take a chance | on the *stars.*"  The star winks, pixel hearts rise; everything pops out.
//   25.42→      plain sky; the end card takes over at 25.6.
// One canvas (sky + props + cast), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { BM, drawPixels, glowAt, burst, drawPhone, drawFace, drawCardImg, drawTears } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7fe0b8', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SKY_TAG = 'THE STARS'

// ── the timeline
const T = {
  // A · the old way
  h0: 0.12, h0Land: BEAT(1), h0Out: [3.95, 4.12],
  phone: 0.2, swipe0: 0.45, swipeGap: 0.3, peek: 1.2, open1: 1.6, l1: 1.8,
  h0b: 4.2, h0bLand: BEAT(7) + 0.1, l2: 4.6, offended: 5.9, close1: 7.8, h0bOut: [7.62, 7.8], aOut: [7.45, 7.85],
  // B · the flip
  h1: 8.05, h1Land: BEAT(14) + 0.1, card: 8.15, hop: [8.85, 9.2], flip: [9.2, 9.7], flood: [9.35, 10.0],
  open2: 9.8, l3: 10.0, stamp: 11.2, close2: 12.5, h1Out: [12.5, 12.68], bOut: [12.45, 12.85],
  // C · everyone gets a chance
  h2: 12.9, h2Land: BEAT(23) + 0.05, deal0: 13.0, dealGap: 0.07, stars0: 13.75, starGap: 0.07,
  open3: 14.2, l4: 14.4, close3: 17.6, h2Out: [17.72, 17.9], cOut: [17.6, 18.05],
  // D · the lesson + the close
  lesson: { at: 18.4, out: [22.35, 22.55], text: 'Give people more | than *0.3 seconds.*', chip: '+1 PATIENCE' },
  dStar: 18.45, h3: 22.6, h3Land: BEAT(40) + 0.05, wink: 23.4, hearts: 23.5, out: [25.0, 25.42], h3Out: [25.08, 25.34],
}
const CPS = 30
const L1 = [
  { t: T.l1, speaker: SKY_TAG, text: 'you judged that face in *0.3 seconds.*' },
  { t: T.l2, speaker: SKY_TAG, text: 'babe. they’re made of stardust. *ours.*' },
]
const L2 = [{ t: T.l3, speaker: SKY_TAG, text: 'card first. *face last.*' }]
const L3 = [{ t: T.l4, speaker: SKY_TAG, text: 'no timers. everyone gets a *real* look.' }]
const HOPS = [...talkHops(L1, SKY_TAG, { cps: CPS }), T.offended, ...talkHops(L2, SKY_TAG, { cps: CPS }), T.stamp + 0.1, T.dStar + 0.4, T.h3Land, T.wink]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// the narrator: [t, x, y, size]
const KF = [
  [0, 1260, 690, 230], [T.peek, 1260, 690, 230], [T.peek + 0.45, 885, 690, 230], [T.aOut[0], 885, 690, 230], [T.card, 885, 700, 200],
  [T.hop[0], 885, 700, 200], [T.hop[1], 700, 700, 200], [T.flip[1], 870, 700, 200], [T.bOut[0], 870, 700, 200],
  [T.dStar, 540, 1240, 260], [T.h3, 540, 1240, 260], [T.h3 + 0.5, 540, 1020, 320], [99, 540, 1020, 320],
]
function narr(t) {
  let i = 0
  while (i < KF.length - 2 && t >= KF[i + 1][0]) i++
  const [t0, x0, y0, s0] = KF[i], [t1, x1, y1, s1] = KF[i + 1]
  const k = ease.inOutCubic(prog(t, t0, t1))
  let y = lerp(y0, y1, k)
  if (t > T.hop[0] && t < T.flip[1]) y -= Math.sin(Math.PI * prog(t, T.hop[0], T.flip[1])) * 80
  return { x: lerp(x0, x1, k), y, s: lerp(s0, s1, k) }
}
function narrMood(t) {
  if (t < T.peek + 0.45) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.l2) return { mood: 'squint', look: t < T.l1 ? [-1, 0] : [0, 0] }
  if (t < T.offended) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.aOut[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.hop[0]) return { mood: 'squint', look: [-1, 1] }
  if (t < T.flood[1]) return { mood: 'wink' }
  if (t < T.stamp) return { mood: 'sparkle', look: [-1, 1] }
  if (t < T.bOut[1]) return { mood: 'happy' }
  if (t < T.h3) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.wink) return { mood: 'happy' }
  if (t < T.wink + 0.6) return { mood: 'wink' }
  return { mood: 'heart' }
}

// C · the sea of cards (3 × 3) and the little sign stars on them
const SEA_SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'pisces', 'leo', 'virgo', 'scorpio', 'capricorn']
const SEA = Array.from({ length: 9 }, (_, i) => {
  const c = i % 3, r = Math.floor(i / 3)
  return { x: 220 + c * 320, y: 720 + r * 225, rot: ((i * 37) % 9 - 4) * 0.025, t: T.deal0 + [4, 1, 6, 0, 8, 3, 7, 2, 5][i] * T.dealGap, st: T.stars0 + [3, 0, 5, 1, 8, 4, 2, 7, 6][i] * T.starGap, im: i % 6, sign: signStar(SEA_SIGNS[i]), id: SEA_SIGNS[i] }
})
const HEARTS = Array.from({ length: 9 }, (_, i) => ({ t: T.hearts + 0.1 + i * 0.2, x: 540 + ((i * 53) % 260) - 130, col: [PINK, '#ff4f86', GOLD, LAV][i % 4], s: 7 + (i % 3) }))
const HEART = BM('.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...')
const FACE_SEED = k => 3 + k * 5

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all([1, 2, 3, 4, 5, 6].map(n => loadImg(`card-profile-${n}.png`)))
  const SMALL = ims.map(im => bake(im, 250)), MYST = bake(ims[2], 520)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'We swipe on | *faces.*', { top: 190, size: 124, accentSize: 184, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: BONE })
  const H0b = popText(root, 'In half a | *second.*', { top: 190, size: 124, accentSize: 184, at: T.h0b, late: 1, lateAt: T.h0bLand, wobble: true, accentColor: BONE })
  const H1 = popText(root, 'What if we | *flipped* it?', { top: 190, size: 120, accentSize: 172, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.16, wobble: true })
  const H2 = popText(root, 'Everyone gets a | *chance.*', { top: 190, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, 'Take a chance | on the *stars.*', { top: 190, size: 116, accentSize: 168, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true })
  const HEADS = [[H0, T.h0Out], [H0b, T.h0bOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: L1, y: 1420, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: L2, y: 1420, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: L3, y: 1420, open: T.open3, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, { ...T.lesson, dim: 0.5 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // grey world: drains the colour from what's painted so far
  function desat(k) {
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = clamp(k); x.fillStyle = '#808080'; x.fillRect(0, 0, 1080, 1920); x.restore()
    x.save(); x.globalAlpha = 0.25 * clamp(k); x.fillStyle = '#0a0a10'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }

  // ── A · the phone, flicking grey faces every 0.3 s
  function drawPhoneA(t) {
    if (t < T.phone || t > T.aOut[1]) return
    const k = pop01(t, T.phone, 0.4, 1.8) * popOut(t, T.aOut)
    if (k <= 0) return
    const n = Math.floor((t - T.swipe0) / T.swipeGap)
    drawPhone(x, 540, 960, 420, 700, { sc: k, rot: Math.sin(t * 1.3) * 0.012, screen: (c, sw, sh) => {
      const cw = sw - 44
      const card = (kk, dx, rot, sc) => {
        c.save(); c.translate(dx, -40); c.rotate(rot); c.scale(sc, sc)
        c.fillStyle = '#d8d8dc'; c.beginPath(); c.roundRect(-cw / 2 - 6, -cw * 0.625 - 6, cw + 12, cw * 1.25 + 56, 22); c.fill()
        c.save(); c.beginPath(); c.roundRect(-cw / 2, -cw * 0.625, cw, cw * 1.25, 18); c.clip(); drawFace(c, 0, 0, cw, FACE_SEED(kk), { gray: 0.85 }); c.restore()
        c.fillStyle = '#2a2a30'; c.fillRect(-cw / 2 + 16, cw * 0.625 + 14, cw * 0.4, 13); c.fillRect(-cw / 2 + 16, cw * 0.625 + 34, cw * 0.22, 9)
        c.restore()
      }
      const k0 = Math.max(0, n + 1), ts = T.swipe0 + (n + 1) * T.swipeGap, sp = prog(t, ts, ts + 0.14)
      card(k0 + 1, 0, 0, 0.95)
      const dir = k0 % 4 === 2 ? 1 : -1
      card(k0, dir * ease.inCubic(sp) * sw * 1.3, dir * ease.inCubic(sp) * 0.5, 1)
    } })
    // the judging chip under the phone
    const ck = pop01(t, T.swipe0 + 0.3, 0.3, 2.2) * popOut(t, T.aOut)
    if (ck > 0) {
      x.save(); x.translate(540, 1352); x.scale(ck, ck)
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const label = `JUDGED IN 0.3s · FACE ${String(Math.max(1, n + 1)).padStart(3, '0')}`
      const w = x.measureText(label).width + 44
      x.fillStyle = 'rgba(10,10,16,0.92)'; x.beginPath(); x.roundRect(-w / 2, -28, w, 56, 10); x.fill()
      x.strokeStyle = '#9a9aa4'; x.lineWidth = 3; x.stroke(); x.fillStyle = '#e4e4ea'; x.fillText(label, 0, 2)
      x.restore()
    }
  }

  // ── B · the face card flips to the mystery card
  function drawFlip(t) {
    if (t < T.card || t > T.bOut[1]) return
    const o = popOut(t, T.bOut)
    const k = pop01(t, T.card, 0.38, 1.7) * o
    if (k <= 0) return
    const fp = prog(t, ...T.flip), cx = 520, cy = 1010
    const land = t > T.hop[1] && t < T.flip[0] + 0.1 ? 0.04 * Math.sin(Math.PI * prog(t, T.hop[1], T.flip[0] + 0.1)) : 0
    if (fp < 0.5) {
      const cw = 400, ch = 500
      x.save(); x.translate(cx, cy + land * 400); x.scale(k * Math.max(0.001, Math.cos(fp * Math.PI)), k)
      x.fillStyle = '#d8d8dc'; x.beginPath(); x.roundRect(-cw / 2 - 10, -ch / 2 - 10, cw + 20, ch + 100, 28); x.fill()
      x.save(); x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 20); x.clip(); drawFace(x, 0, 0, cw, FACE_SEED(6), { gray: 0.85 }); x.restore()
      x.fillStyle = '#2a2a30'; x.fillRect(-cw / 2 + 20, ch / 2 + 22, cw * 0.45, 18); x.fillRect(-cw / 2 + 20, ch / 2 + 52, cw * 0.25, 12)
      x.restore()
    } else {
      glowAt(x, cx, cy, 420, LAV, 0.85 * o)
      drawCardImg(x, MYST, cx, cy + Math.sin(t * 2) * 6, 560, { flip: 2 - fp * 2, sc: k })
      // FACE: LAST stamp over the veiled photo window
      const sk = prog(t, T.stamp, T.stamp + 0.16)
      if (sk > 0) {
        const s = lerp(2.2, 1, ease.outCubic(sk)) * o
        x.save(); x.translate(cx + 10, cy - 130); x.rotate(-0.16); x.scale(s, s); x.globalAlpha = clamp(sk * 2)
        x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = x.measureText('FACE: LAST').width + 48
        x.fillStyle = 'rgba(20,8,24,0.75)'; x.fillRect(-w / 2, -38, w, 76)
        x.strokeStyle = PINK; x.lineWidth = 7; x.strokeRect(-w / 2, -38, w, 76)
        x.fillStyle = PINK; x.fillText('FACE: LAST', 0, 3)
        x.restore()
      }
    }
    burst(x, t, cx, cy, T.flip[0] + 0.25, { n: 16, R: 320, size: 30, seed: 3 })
  }

  // ── C · the sea
  function drawSea(t) {
    if (t < T.deal0 || t > T.cOut[1]) return
    const o = popOut(t, T.cOut)
    if (o <= 0) return
    SEA.forEach((c, i) => {
      const p = ease.outCubic(prog(t, c.t, c.t + 0.4))
      if (p <= 0) return
      const cx = lerp(540, c.x, p), cy = lerp(1500, c.y, p) - Math.sin(Math.PI * p) * 80
      drawCardImg(x, SMALL[c.im], cx, cy + Math.sin(t * 2 + i) * 5, 250, { rot: lerp(i % 2 ? 1.2 : -1.2, c.rot, p), sc: o })
      const sk = pop01(t, c.st, 0.34, 2.4) * o
      if (sk > 0) {
        const pis = c.id === 'pisces', sx = cx + 70, sy = cy - 92
        drawStarChar(x, sx, sy, 96, t, { color: c.sign.color, mood: pis ? 'sparkle' : ['happy', 'wink', 'sparkle'][i % 3], look: [0, 0], pop: sk, seed: 31 + i, hops: Array.from({ length: 6 }, (_, j) => +(c.st + 0.5 + j * 0.62 + (i % 3) * 0.12).toFixed(3)) })
        if (pis) { drawTears(x, sx - 14, sy - 2, 2.4, t, 1.1 * sk, -1, i); drawTears(x, sx + 14, sy - 2, 2.4, t, 1.1 * sk, 1, i + 1) }
      }
    })
  }

  function drawHearts(t) {
    const o = popOut(t, T.out)
    if (o <= 0 || t < T.hearts) return
    HEARTS.forEach((h, i) => {
      const k = (t - h.t) / 1.6
      if (k < 0 || k > 1) return
      drawPixels(x, HEART, h.x + Math.sin(k * 7 + i) * 18, 900 - k * 300, h.s, { X: h.col }, { alpha: Math.sin(Math.PI * k) * o, sc: o, outline: 'rgba(14,8,32,0.85)' })
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      const grey = 1 - ease.inOutCubic(prog(t, ...T.flood))
      desat(grey)
      if (t < T.out[1] + 0.02) {
        drawPhoneA(t)
        drawFlip(t)
        drawSea(t)
        drawHearts(t)
        const N = narr(t), no = popOut(t, T.out)
        const show = t >= T.peek && (t < T.bOut[1] || t >= T.dStar)
        const k = t >= T.dStar ? pop01(t, T.dStar, 0.4, 2) : t > T.bOut[0] ? popOut(t, T.bOut) : 1
        if (show && no > 0 && k > 0) {
          glowAt(x, N.x, N.y, N.s * 1.3, GOLD, t >= T.dStar ? 0.6 : 0)
          drawStarChar(x, N.x, N.y, N.s, t, { color: STAR.sky, ...narrMood(t), hops: HOPS, seed: 2, pop: no * k })
        }
        burst(x, t, 700, 760, T.hop[1], { n: 10, R: 150, size: 22, seed: 5 })
        burst(x, t, 540, 1020, T.wink, { n: 12, R: 260, size: 26, seed: 6 })
      }
      box1.update(t); box2.update(t); box3.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cuts: A→B at 7.95 and C→lesson at 18.25 (both kept; the B→C change at 12.85 clears on its own)
const CUTS = [{ t: 7.95, kind: 'deal', keep: true }, { t: 18.25, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FX = { rev: 0.1, dly: 0, bus: 'fx' }
const PITCH = { [SKY_TAG]: 880 }
const swipeCues = []
for (let n = 0; ; n++) { const ts = T.swipe0 + n * T.swipeGap; if (ts > T.aOut[0]) break; swipeCues.push(['whoosh', +ts.toFixed(3), 0.12, 0.01], ['tick', +(ts + 0.1).toFixed(3), 0.014]) }
export const CUES = [
  // A
  ...wordPops(T.h0, 3, 0.09, 0, 0.02), ['pop', T.h0Land, 880, 0.04, 0], ['pluck', T.h0Land, 587.33, 0.035, 0.5, 0],
  ['whoosh', T.phone, 0.3, 0.02], ...swipeCues,
  ['whoosh', T.peek, 0.4, 0.025], ['pop', T.peek + 0.45, 987.77, 0.04, 0.5],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L1, { cps: CPS, pitch: PITCH }),
  ...wordPops(T.h0b, 3, 0.07, 1, 0.02), ['pop', T.h0bLand, 880, 0.04, 0],
  ['chip', T.offended, 700, 0.3, { slide: 20, gain: 0.025, decay: 0.2, sustain: 0.5, ...FX }],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // B
  ...wordPops(T.h1, 3, 0.08, 1, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.16, 1318.51, 0.045, 0],
  ['whoosh', T.card, 0.3, 0.02], ['whoosh', T.hop[0], 0.3, 0.03], ['tick', T.hop[1], 0.05],
  ['whoosh', T.flip[0], 0.5, 0.04], ['boom', T.flip[0] + 0.25, 0.14], ['glitter', T.flip[0] + 0.25, T.flood[1] + 0.3],
  ['bell', T.flip[0] + 0.27, 1318.51, 0.04, 1.4, -0.2], ['bell', T.flip[0] + 0.33, 1760, 0.03, 1.4, 0.2], ['swell', T.flood[0], T.flood[1], { gain: 0.04, f0: 500, f1: 3500 }],
  ['pop', T.open2, 739.99, 0.04, 0], ...talkCues(L2, { cps: CPS, pitch: PITCH }),
  ['tom', T.stamp + 0.12, 90, { gain: 0.22, decay: 0.25 }], ['tick', T.stamp + 0.12, 0.08],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // C
  ...wordPops(T.h2, 3, 0.08, 2, 0.025), ['pop', T.h2Land, 1318.51, 0.045, 0], ['pluck', T.h2Land, 1174.66, 0.04, 0.6, 0],
  ...SEA.map((c, i) => ['tick', +(c.t + 0.38).toFixed(3), 0.03]), ['whoosh', T.deal0, 0.6, 0.03],
  ...SEA.map((c, i) => ['pop', +(c.st + 0.05).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.022, +((c.x / 1080 - 0.5) * 1.2).toFixed(2)]),
  ['chip', T.stars0 + 0.7, 3000, 0.07, { wave: 'noise', slide: 30, gain: 0.016, decay: 0.05, sustain: 0.5, ...FX }],
  ['pop', T.open3, 739.99, 0.04, 0], ...talkCues(L3, { cps: CPS, pitch: PITCH }),
  ['pop', T.close3, 880, 0.03, 0], ['pop', T.close3 + 0.07, 587.33, 0.03, 0],
  // D
  ...lessonCues(T.lesson.at, { ...T.lesson, key: 'A' }),
  ...wordPops(T.h3, 4, 0.08, 1, 0.024), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0],
  ['pop', T.wink, 1567.98, 0.035, 0], ['bell', T.wink + 0.04, 2093, 0.02, 0.8, 0],
  ...HEARTS.map((h, i) => ['pop', +h.t.toFixed(3), NOTE[(i * 2 + 3) % 7] * 2, 0.016, +((h.x / 1080 - 0.5) * 1.2).toFixed(2)]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
