// st4deck (15 s vertical Align ad, Star Talk S4 EP 007: tonight's deck) · story 0–10.6, then the shared end card.
//   0.00–4.70  "Houston is full | of *people.*"  The night skyline, every window lit. A lilac "you" star stares up at a
//              giant pixel phone whose feed scrolls up forever (speed lines, a "∞" counter); its eyes roll and spin.
//              Drop (2.82): THE STARS: "no endless scroll."  4.45: the phone pops into pixel shards.
//   4.70–8.20  "One *hand* a night."  A deck hovers over the skyline and deals card backs, round-robin, to four stars
//              on the rooftops (you, ♉ Taurus, ♐ Sagittarius, ♓ Pisces): three each, fanned above their heads.
//              THE STARS: "a new hand every night. *tonight's* deck."
//   8.25 cut (deal) → "Tonight, | *deal* me in."  The you star, front and centre, gets its own hand of three; the
//              middle card flips to a veiled profile card (no photo). Heart eyes. Out by 10.45; end card at 10.6.
// One canvas (sky + skyline + phone + cards + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, LAV, MONO, BEAT, pop01, outK, popOut, rgba, sparkles, floatHearts, drawSkyline } from './kit.js'

export const EP = 7
export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const YOU = '#b8a4ff'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.5, 4.68],
  sky: 0.2, phoneIn: 0.55, youIn: 0.75, dizzy: 1.9,
  open: 2.62, l1: BEAT(4),                                    // the drop: 2.82
  pop: 4.45,
  h1: 4.76, h1Land: 5.1, l2: 5.05, deck: 4.9, deal: 5.35, dealGap: 0.11, cheer: 7.0,
  close: 8.1, h1Out: [7.98, 8.16],
  cut: 8.25, h2: 8.32, h2Land: 8.7, myDeal: 8.45, flip: [9.15, 9.5], heart: 9.6, h2Out: [10.2, 10.42], out: [10.1, 10.45],
}
const GHOST = { at: 8.9, x: 145, y: 1062, from: 'below', dur: 1.3 }     // peeks over the left-hand rooftop
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'no endless scroll.' },
  { t: T.l2, speaker: SPEAK, text: 'a new hand every night. *tonight\'s* deck.' },
]
const CPS = 30

// ── layout
const SKY_Y = 1420                                  // skyline baseline (its foot hides under the box)
const PHONE = { x: 540, y: 820, w: 330, h: 560 }
const YOU_A = { x: 540, y: 1220, size: 230 }
const ROW = [
  { id: null, x: 190, y: 1170, size: 160, seed: 4 },
  { id: 'taurus', x: 420, y: 1190, size: 150, seed: 5 },
  { id: 'sagittarius', x: 660, y: 1175, size: 155, seed: 6 },
  { id: 'pisces', x: 890, y: 1190, size: 150, seed: 7 },
]
const DECK = { x: 540, y: 690 }
const CW = 74                                        // a dealt card's width (row hands)
const YOU_F = { x: 540, y: 1420, size: 320 }
const MY_CW = 190

const DEAL = []   // [{ star, k, t }] round-robin, three cards each
for (let k = 0; k < 3; k++) for (let s = 0; s < 4; s++) DEAL.push({ s, k, t: T.deal + (k * 4 + s) * T.dealGap })
const MY = [0, 1, 2].map(k => ({ k, t: T.myDeal + k * 0.16 }))

function youA(t) {
  if (t < T.dizzy) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.pop) return { mood: 'eyeroll', blink: false }
  if (t < T.pop + 0.35) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'happy' }
}
const rowMood = (t, i) => t < T.deal + (8 + i) * T.dealGap + 0.2 ? { mood: 'wide', look: [0, -1], blink: false } : t < T.cheer + i * 0.1 ? { mood: 'happy' } : { mood: 'sparkle', look: [0, -1] }
function youF(t) {
  if (t < T.flip[0]) return { mood: 'happy', look: [0, -1] }
  if (t < T.heart) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK_S = bake(backIm, 110), BACK = bake(backIm, 260), FACE = bake(faceIm, 300)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston is full | of *people.*', { top: 200, size: 112, accentSize: 176, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'One *hand* | a night.', { top: 200, size: 124, accentSize: 180, at: T.h1, gap: 0.08, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Tonight, | *deal* me in.', { top: 200, size: 128, accentSize: 190, at: T.h2, late: 3, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawImg(img, bodyFrac, wBody) { if (!img) return; const w = wBody / bodyFrac, h = w * img.height / img.width; x.drawImage(img, -w / 2, -h / 2, w, h) }

  // ── the endless-scroll phone
  function drawPhone(t) {
    const pin = easeOutBack(prog(t, T.phoneIn, T.phoneIn + 0.4), 1.6)
    if (pin <= 0.01 || t >= T.pop) return
    const P = PHONE, shake = t > T.pop - 0.5 ? Math.sin(t * 90) * 6 * prog(t, T.pop - 0.5, T.pop) : 0
    x.save(); x.translate(P.x + shake, P.y); x.scale(pin, pin); x.rotate(-0.04)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-P.w / 2 - 10, -P.h / 2 - 10, P.w + 20, P.h + 20, 46); x.fill()
    x.fillStyle = '#3a2a6e'; x.beginPath(); x.roundRect(-P.w / 2, -P.h / 2, P.w, P.h, 38); x.fill()
    const sw = P.w - 36, sh = P.h - 70
    x.save(); x.beginPath(); x.roundRect(-sw / 2, -sh / 2 + 6, sw, sh, 20); x.clip()
    x.fillStyle = '#120a28'; x.fillRect(-sw / 2, -sh / 2, sw, sh + 20)
    // the feed: rows rushing upward, faster and faster
    const speed = 900 + 2600 * ease.inQuad(prog(t, T.phoneIn, T.pop))
    const off = (t - T.phoneIn) * speed * 0.6 + 400 * ease.inQuad(prog(t, T.phoneIn, T.pop)) * (t - T.phoneIn)
    const RH = 96, cols = [PINK, '#7fdcff', GOLD, '#9be08a', LAV, '#ff9a5a']
    for (let i = -1; i < sh / RH + 2; i++) {
      const n = Math.floor(off / RH) + i, ry = -sh / 2 + 6 + i * RH - (off % RH)
      x.fillStyle = '#20163f'; x.fillRect(-sw / 2 + 12, ry + 8, sw - 24, RH - 16)
      x.fillStyle = cols[((n % 6) + 6) % 6]; x.fillRect(-sw / 2 + 24, ry + 20, 56, 56)
      x.fillStyle = '#4a3a8c'; x.fillRect(-sw / 2 + 96, ry + 26, 150, 14); x.fillRect(-sw / 2 + 96, ry + 52, 100, 12)
    }
    // speed lines over the feed
    x.globalAlpha = clamp((speed - 1400) / 1600) * 0.6; x.fillStyle = BONE
    for (let i = 0; i < 6; i++) x.fillRect(-sw / 2 + 20 + i * 48, ((t * 2400 + i * 137) % (sh + 200)) - sh / 2 - 100, 4, 120)
    x.restore()
    // the counter pill: "∞ more"
    x.fillStyle = PINK; x.beginPath(); x.roundRect(-92, -P.h / 2 - 34, 184, 52, 26); x.fill()
    x.lineWidth = 5; x.strokeStyle = INK; x.stroke()
    x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('∞ more', 0, -P.h / 2 - 7)
    x.restore()
  }
  function shards(t) {
    const tt = t - T.pop
    if (tt < 0 || tt > 0.9) return
    const p = tt / 0.9
    x.save(); x.globalAlpha = 1 - ease.inQuad(p)
    for (let i = 0; i < 22; i++) {
      const a = i * 2.4 + 0.3, v = 380 + (i * 53) % 300
      const sx = PHONE.x + Math.cos(a) * v * p, sy = PHONE.y + Math.sin(a) * v * p + 600 * p * p
      x.fillStyle = [INK, '#3a2a6e', PINK, '#7fdcff', GOLD][i % 5]
      const s = 14 + (i % 3) * 8
      x.fillRect(Math.round(sx - s / 2), Math.round(sy - s / 2), s, s)
    }
    x.restore()
    sparkles(x, t, PHONE.x, PHONE.y, T.pop, 12, 260, 1)
  }

  // ── the deck + the dealt hands
  function cardAt(img, cx, cy, w, rot, body = BACK_BODY) { x.save(); x.translate(cx, cy); x.rotate(rot); drawImg(img, body, w); x.restore() }
  function drawDeck(t, ok) {
    const k = easeOutBack(prog(t, T.deck, T.deck + 0.35), 1.8) * ok * (1 - ease.inCubic(prog(t, T.cheer - 0.2, T.cheer + 0.15)))
    if (k <= 0.01) return
    x.save(); x.translate(DECK.x, DECK.y + Math.sin(t * 2) * 5); x.scale(k, k)
    const g = x.createRadialGradient(0, 0, 0, 0, 0, 160); g.addColorStop(0, rgba(LAV, 0.35)); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(-160, -160, 320, 320)
    for (let i = 4; i >= 0; i--) cardAt(BACK_S, -i * 2, -i * 3, 96, -0.04)
    x.restore()
  }
  function handPos(s, k) {
    const R = ROW[s], a = (k - 1) * 0.28
    return { x: R.x + (k - 1) * 34, y: R.y - R.size * 0.62 - Math.cos(a) * 18 + (k === 1 ? -14 : 0), rot: a }
  }
  function drawDeals(t, ok) {
    for (const d of DEAL) {
      const p = prog(t, d.t, d.t + 0.32)
      if (p <= 0) continue
      const e = ease.outCubic(p), H = handPos(d.s, d.k)
      const cx = lerp(DECK.x, H.x, e), cy = lerp(DECK.y, H.y, e) - Math.sin(Math.PI * e) * 120
      const sc = ok * (t > T.cheer ? 1 + 0.06 * Math.sin((t - T.cheer) * 12) * Math.exp(-(t - T.cheer) * 3) : 1)
      cardAt(BACK_S, cx, cy, CW * sc, lerp(1.6 * (d.s % 2 ? 1 : -1), H.rot, e) + (t > T.cheer ? 0.08 * Math.sin(t * 5 + d.s) : 0))
    }
  }
  function drawMyHand(t, ok) {
    const flipP = prog(t, ...T.flip)
    MY.forEach(({ k, t: t0 }) => {
      const p = prog(t, t0, t0 + 0.34)
      if (p <= 0) return
      const e = easeOutBack(p, 1.3), a = (k - 1) * 0.26
      const hx = YOU_F.x + (k - 1) * 190, hy = 1000 - (k === 1 ? 40 : 0) + Math.abs(k - 1) * 20
      const cx = lerp(YOU_F.x + (k - 1) * 600, hx, e), cy = lerp(1950, hy, e)
      x.save(); x.translate(cx, cy + Math.sin(t * 2 + k) * 5); x.rotate(lerp(0.6 * (k - 1), a, e)); x.scale(ok, ok)
      if (k === 1 && flipP > 0) {
        const sx = Math.cos(flipP * Math.PI)
        if (sx > 0) { x.scale(sx, 1); drawImg(BACK, BACK_BODY, MY_CW) } else { x.scale(-sx * 1.18, 1.18); drawImg(FACE, FACE_BODY, MY_CW) }
      } else drawImg(BACK, BACK_BODY, MY_CW * (k === 1 ? 1 : 0.92))
      x.restore()
    })
    if (flipP > 0.4) sparkles(x, t, YOU_F.x, 960, T.flip[1] - 0.15, 12, 260, 2)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const sk = ease.outCubic(prog(t, T.sky, T.sky + 0.6))
      drawSkyline(x, t, { y: SKY_Y + (1 - sk) * 500, scale: 1, alpha: ok, lit: t < T.cut ? 0.42 : 0.3 })
      if (ok > 0) { x.save(); x.globalAlpha = ok; const gg = x.createLinearGradient(0, SKY_Y + (1 - sk) * 500, 0, 1920); gg.addColorStop(0, '#0c0720'); gg.addColorStop(1, '#05030f'); x.fillStyle = gg; x.fillRect(0, SKY_Y + (1 - sk) * 500 - 1, 1080, 1920); x.restore() }
      drawGhostCameo(x, t, GHOST)
      if (ok > 0) {
        if (t < T.cut) {
          // beat 1: you vs the feed
          drawPhone(t)
          shards(t)
          const yp = pop01(t, T.youIn, 0.34, 2.1) * (1 - ease.inCubic(prog(t, T.h1, T.h1 + 0.3)))
          if (yp > 0.02) drawStarChar(x, YOU_A.x, YOU_A.y, YOU_A.size, t, { color: YOU, ...youA(t), hops: [T.youIn + 0.3, T.pop + 0.05], pop: yp, seed: 4, glow: 1, squash: t > T.dizzy && t < T.pop ? 0.05 * Math.sin(t * 14) : 0 })
          // beat 2: the deal
          drawDeck(t, ok)
          ROW.forEach((R, i) => {
            const p = pop01(t, T.h1 + 0.1 + i * 0.08, 0.32, 2.2)
            if (p <= 0.02) return
            const st = R.id ? signStar(R.id) : { color: YOU, glyph: null }
            drawStarChar(x, R.x, R.y, R.size, t, { color: st.color, glyph: st.glyph, ...rowMood(t, i), pop: p, seed: R.seed, glow: 0.8, hops: [T.cheer + i * 0.1, T.cheer + 0.5 + i * 0.1] })
          })
          drawDeals(t, ok)
          if (t > T.cheer) ROW.forEach((R, i) => sparkles(x, t, R.x, R.y - R.size * 0.6, T.cheer + i * 0.1, 8, 90, i))
        } else {
          // beat 3: your own hand
          drawMyHand(t, ok)
          const fp = pop01(t, T.cut + 0.06, 0.34, 2) * ok
          if (fp > 0.02) drawStarChar(x, YOU_F.x, YOU_F.y, YOU_F.size, t, { color: YOU, ...youF(t), hops: [T.h2Land, T.heart], pop: fp, seed: 4, glow: 1.2 })
          if (t > T.heart) floatHearts(x, t, YOU_F.x, YOU_F.y - 80, T.heart, T.out[0], 2, 7, 260)
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.7 (inert: the phone has popped, the deal begins) and 8.25 (box shut → "Tonight, deal me in.").
const CUTS = [4.7, { t: T.cut, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.sky, 0.5, 0.03], ['pop', T.phoneIn + 0.05, 659.25, 0.04, 0.2], ['pop', T.youIn + 0.05, 880, 0.035, -0.2],
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.phoneIn + 0.4 + i * (0.3 - i * 0.025)).toFixed(3), 0.018]),
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAK]: 880 } }),
  ['boom', T.pop, 0.12], ['pop', T.pop, 440, 0.05, 0], ['glitter', T.pop, T.pop + 0.5],
  ...wordPops(T.h1, 4, 0.08, 2, 0.025),
  ['whoosh', T.deck, 0.3, 0.03], ...DEAL.map((d, i) => ['tick', +(d.t + 0.3).toFixed(3), 0.026 + (i % 2) * 0.006]),
  ['glitter', T.cheer, T.cheer + 0.5], ['pluck', T.cheer, 1174.66, 0.035, 0.5, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.08, 1, 0.028), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pop', T.h2Land + 0.12, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.24, 1318.51, 0.05, 0],
  ...MY.map(m => ['tick', +(m.t + 0.32).toFixed(3), 0.04]),
  ['tick', T.flip[0] + 0.05, 0.05], ['bell', T.flip[1], 1318.51, 0.04, 1.4, 0], ['glitter', T.flip[1] - 0.15, T.flip[1] + 0.5],
  ['pluck', T.heart, 1318.51, 0.035, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
