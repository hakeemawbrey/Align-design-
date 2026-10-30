// srcitymiami · "Miami: 'just visiting.'" (Star Talk Remix of citymiami, 20 s vertical, music: jazzy, Bb) · story 0–15.6,
// then the shared end card (cta JOIN THE WAITLIST, as the original).
//   0.00–5.60  "Miami: hot nights, | and everyone's | *“just* *visiting.”*"  Neon palms, generic deco hotels, the night
//              ocean. The ♉ TAURUS star (fixed earth: it stays) sits on the promenade. Star travellers roll suitcases past,
//              rule of three: ♊ "IN TOWN: 2 NIGHTS", ♈ (sprinting) "IN TOWN: 1 NIGHT", then ♐ SAG stops right in front of
//              Taurus (drop 2.82), tag "IN TOWN: LAYOVER". SAG: "hiii! i have a *4-hour layover.*" Taurus goes heart-eyed anyway.
//   5.75–10.6  "Dealbreakers | come *first.*"  THE STARS: "babe. that's not a date. that's a *gate.*" A DEALBREAKERS card
//              rises; ✕ JUST VISITING slams on (8.1) and Sag + suitcase bolt off screen with speed lines.
//              THE STARS: "up front. not after *the weekend.*"
//  10.75       card cut (flip)
//  10.85–15.4  "Find someone | who *stays.*"  Sunrise over the ocean. The ♋ CANCER star (ruled by the Moon, the homebody) rolls
//              up with no suitcase, tag "LOCAL · SINCE FOREVER": "i live here. *breakfast?*" Taurus (it loves food) goes
//              heart-eyed; a gold arc and a heart between them. Everything pops out by 15.42.
// One canvas (sky + city/beach + cast + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, ROSE, TEAL, AQUA, RED, VIOLET, SUN, LIME, MONO, SERIF, INTER, rgba, ink, sparkle, palm, hotel, ocean, suitcase, heart } from '../../citymiami/scenes/props.js'
import { tag } from '../../srcityaustin/scenes/props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const TAU = Math.PI * 2, W = 1080
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const TAU_S = signStar('taurus'), LIB = signStar('libra'), ARI = signStar('aries'), SAG = signStar('sagittarius'), CAN = signStar('cancer')
const SG_TAG = `${SAG.glyph}︎ SAGITTARIUS`, CN_TAG = `${CAN.glyph}︎ CANCER`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: B(3), h0Out: [5.45, 5.62],
  hotels: 0.1, palms: [B(0), B(1)], taurus: 0.35,
  walk: [0.3, 1.45, 2.05], stop: B(4), open: 2.95, l0: 3.15, smitten: 4.0,
  h1: 5.8, h1Land: B(10), h1Out: [10.45, 10.62], l1: 5.95, card: [6.3, 6.8], stamp: B(13.5), l2: 9.45,
  cut: 10.75,
  h2: 10.85, h2Land: 11.2, sun: [11.0, 13.2], cancer: [11.0, 11.65], local: 11.8, l3: 12.4, arc: [13.35, 13.75], heart: B(23.5), close: 15.1,
  out: [15.0, 15.42],
}
T.bolt = T.stamp + 0.14
const LINES = [
  { t: T.l0, speaker: SG_TAG, color: '#c9a6ff', text: 'hiii! i have a *4-hour layover.*' },
  { t: T.l1, speaker: S_TAG, color: PINK, text: "babe. that's not a date. that's a *gate.*" },
  { t: T.l2, speaker: S_TAG, text: 'up front. not after *the weekend.*' },
  { t: T.l3, speaker: CN_TAG, color: '#9fe8ff', text: 'i live here. *breakfast?*' },
]
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE WAITLIST' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const beatHop = t => Math.abs(Math.sin(Math.PI * ((t - 0.6) / 0.5556)))
// layout
const BASE = 1090, SEA = 1335, FEET = 1305, SY = 1212, SZ = 190
const HOTELS = [
  { x: 120, w: 210, h: 300, col: TEAL, seed: 3, step: false },
  { x: 330, w: 230, h: 430, col: PINK, seed: 5 },
  { x: 560, w: 200, h: 340, col: AQUA, seed: 8, step: false },
  { x: 770, w: 240, h: 470, col: VIOLET, seed: 11 },
  { x: 980, w: 200, h: 320, col: PINK, seed: 13, step: false },
]
const TAU_P = { x: 195, y: 1418, s: 230 }
const SAG_STOP = 650
// walkers: x(t) left → right, with a suitcase trailing behind
const WALKERS = [
  { s: LIB, v: 720, case: GOLD, label: 'IN TOWN: 2 NIGHTS', bar: GOLD, seed: 4 },
  { s: ARI, v: 1100, case: TEAL, label: 'IN TOWN: 1 NIGHT', bar: '#ff9a7a', seed: 6 },
  { s: SAG, v: 0, case: PINK, label: 'IN TOWN: LAYOVER', bar: VIOLET, seed: 8 },
]
function walkerX(i, t) {
  const t0 = T.walk[i]
  if (i < 2) return -200 + (t - t0) * WALKERS[i].v
  if (t < T.bolt) return lerp(-200, SAG_STOP, ease.outCubic(prog(t, t0, T.stop)))
  return SAG_STOP + ease.inCubic(prog(t, T.bolt, T.bolt + 0.5)) * 900
}
const CARD = { cx: 565, cy: 865, w: 820, h: 470 }
// the beach
const HZ = 1200, SAND = 1415, TB = { x: 345, y: 1375 }, CN = { x: 735, y: 1380 }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 70px Inter", "italic 500 150px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H("Miami: hot nights, | and everyone's | *“just* *visiting.”*", { top: 140, size: 90, accentSize: 136, late: 2, at: T.h0, lateAt: T.h0Land, accentColor: PINK }), T.h0Out],
    [H('Dealbreakers | come *first.*', { top: 150, size: 116, accentSize: 160, at: T.h1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [H('Find someone | who *stays.*', { top: 150, size: 124, accentSize: 176, at: T.h2, lateAt: T.h2Land, accentColor: SUN }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const SAG_HOPS = [T.stop, ...talkHops(LINES, SG_TAG, { cps: CPS }), T.stamp + 0.02]
  const CN_HOPS = [T.cancer[1], ...talkHops(LINES, CN_TAG, { cps: CPS }), T.heart + 0.1]
  const S_HOPS = talkHops(LINES, S_TAG, { cps: CPS })
  const TAU_HOPS = [T.smitten, T.stamp + 0.05, T.heart, T.heart + 0.45]

  function taurusMood(t) {
    const w = walkerX(0, t), a = walkerX(1, t)
    if (t < T.walk[2]) {
      // heart-eyes for each passer-by, then a sad blink as they roll on
      const near = [w, a].some(px => px > 120 && px < 700)
      return near ? { mood: 'heart', look: [1, 0] } : t > 1.0 ? { mood: 'squint', look: [1, 0.5] } : { mood: 'happy', look: [1, 0] }
    }
    if (t < T.smitten) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.stamp) return { mood: 'heart', look: [1, 0] }
    if (t < T.bolt + 0.6) return { mood: 'wide', look: [1, 0] }
    if (t < T.cut) return { mood: 'squint', look: [1, -1] }
    if (t < T.l3 + 0.9) return { mood: 'sparkle', look: [1, 0] }
    return { mood: 'heart', look: [1, 0] }
  }
  function sagMood(t) {
    if (t < T.stop) return { mood: 'happy', look: [1, 0] }
    if (t < T.l1) return { mood: 'wink', look: [-1, 0] }
    if (t < T.stamp) return { mood: 'happy', look: [0, -1] }
    return { mood: 'wide', look: [1, 0] }
  }

  function drawCity(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a
    HOTELS.forEach((Hh, i) => { const k = pop01(t, T.hotels + i * 0.08, 0.45, 1.6); x.save(); x.translate(Hh.x, BASE); hotel(x, t, { ...Hh, k }); x.restore() })
    x.fillStyle = 'rgba(30,16,52,0.97)'; x.fillRect(0, BASE, W, SEA - BASE)
    x.beginPath(); x.moveTo(0, BASE); x.lineTo(W, BASE); ink(x, PINK, { w: 5, fa: 0, glow: 18 })
    x.save(); x.globalAlpha *= 0.35; x.setLineDash([26, 22]); x.lineDashOffset = -t * 60
    x.beginPath(); x.moveTo(0, FEET + 8); x.lineTo(W, FEET + 8); x.strokeStyle = BONE; x.lineWidth = 3; x.stroke(); x.restore()
    ocean(x, t, SEA, 1920, { mx: 930 })
    ;[[95, 0.14, PINK, TEAL, 0], [990, -0.16, TEAL, LIME, 2]].forEach(([px, lean, tr, fr, sd], i) => {
      const k = pop01(t, T.palms[i], 0.45, 2.2)
      if (k <= 0) return
      x.save(); x.translate(px, SEA + 10); x.scale(k * 0.9, k * 0.9); palm(x, t, { h: 620, lean, trunk: tr, frond: fr, seed: sd }); x.restore()
    })
    x.restore()
  }

  function drawWalkers(t, a) {
    WALKERS.forEach((Wk, i) => {
      if (t < T.walk[i]) return
      const px = walkerX(i, t)
      if (px > W + 260) return
      const moving = i < 2 || t < T.stop || t > T.bolt
      const hop = moving ? beatHop(t + i * 0.12) * 14 : 0
      const run = i === 2 && t > T.bolt
      x.save(); x.globalAlpha *= a
      // suitcase trails behind (to the left)
      x.save(); x.translate(px - 150, FEET - (moving ? hop * 0.3 : 0))
      suitcase(x, { col: Wk.case, tilt: moving ? (run ? -0.6 : -0.3) : 0, spin: (t - T.walk[i]) * 8, s: 0.82, sticker: i % 2 })
      x.restore()
      const st = i === 2 ? sagMood(t) : { mood: i === 1 ? 'squint' : 'happy', look: [1, 0] }
      drawStarChar(x, px, SY - hop, SZ, t, { color: Wk.s.color, glyph: Wk.s.glyph, mood: st.mood, look: st.look, seed: Wk.seed, hops: i === 2 ? SAG_HOPS : null, squash: run ? -0.12 : 0 })
      // speed lines
      if (i === 1 || run) {
        x.save(); x.globalAlpha *= run ? 1 - prog(t, T.bolt + 0.3, T.bolt + 0.6) : 0.8
        for (let j = 0; j < 4; j++) { const yy = SY - 60 + j * 40; x.beginPath(); x.moveTo(px - 250 - j * 20, yy); x.lineTo(px - 400 - j * 40, yy); ink(x, BONE, { w: 6, fa: 0, glow: 10 }) }
        x.restore()
      }
      // the tag rides above
      const tk = i < 2 ? pop01(t, T.walk[i] + 0.15, 0.3, 2.6) : pop01(t, T.stop - 0.1, 0.3, 2.6) * outK(t, [T.h0Out[0], T.h0Out[1]])
      tag(x, i < 2 ? px - 40 : px - 60, SY - 165, Wk.label, tk, { size: 32, bar: Wk.bar })
      x.restore()
    })
  }

  function drawCard(t) {
    if (t < T.card[0] || t > T.h1Out[1] + 0.05) return
    const ok = outK(t, T.h1Out)
    const k = pop01(t, T.card[0], 0.45, 1.8) * ok
    if (k <= 0) return
    const rise = (1 - ease.outCubic(prog(t, ...T.card))) * 500
    const shake = t > T.stamp ? 16 * Math.exp(-(t - T.stamp) * 6) * Math.sin((t - T.stamp) * 42) : 0
    const { w, h } = CARD
    x.save(); x.translate(CARD.cx + shake, CARD.cy + rise); x.rotate((1 - k) * 0.12 - 0.015); x.scale(k, k)
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
    x.shadowOffsetY = 0; x.shadowBlur = 0
    const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(PINK, 0.18)); gr.addColorStop(1, rgba(TEAL, 0.06))
    x.fillStyle = gr; x.fill()
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 72)
    x.fillStyle = BONE; x.font = `italic 500 60px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 150)
    const cy = 75
    x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-340, cy - 66, 680, 132, 66); x.stroke(); x.restore()
    if (t >= T.stamp - 0.18) {
      const sp = prog(t, T.stamp - 0.18, T.stamp)
      const sc = lerp(2.8, 1, ease.inCubic(sp)) * (t > T.stamp ? 1 + 0.08 * Math.sin((t - T.stamp) * 30) * Math.exp(-(t - T.stamp) * 9) : 1)
      const hot = t > T.stamp ? Math.exp(-(t - T.stamp) * 3) : 0
      x.save(); x.translate(0, cy); x.rotate(lerp(-0.18, -0.035, ease.inCubic(sp))); x.scale(sc, sc); x.globalAlpha = clamp(sp * 2.5)
      const cw = 700, ch = 140
      x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 70); x.fillStyle = 'rgba(64,8,24,0.97)'; x.fill()
      ink(x, RED, { w: 9, fa: 0, glow: 20 + 34 * hot })
      x.save(); x.translate(-cw / 2 + 80, 0); x.beginPath(); x.moveTo(-22, -22); x.lineTo(22, 22); x.moveTo(22, -22); x.lineTo(-22, 22); ink(x, '#ff5a52', { w: 12, fa: 0, glow: 14 }); x.restore()
      x.fillStyle = '#ffe2dc'; x.font = `900 66px ${INTER}`; x.textAlign = 'center'; x.fillText('JUST VISITING', 46, 4)
      x.restore()
    }
    x.restore()
    sparkle(x, CARD.cx, CARD.cy + 75, t, T.stamp, { n: 18, R: 440, seed: 40, size: 30, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] })
  }

  function drawBeach(t) {
    const sk = ease.inOutCubic(prog(t, ...T.sun))
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, HZ, 20, 540, HZ, 900)
    g.addColorStop(0, rgba(SUN, 0.15 + 0.5 * sk)); g.addColorStop(0.4, rgba(PINK, 0.06 + 0.2 * sk)); g.addColorStop(1, rgba(PINK, 0))
    x.fillStyle = g; x.fillRect(0, HZ - 900, W, 900)
    x.restore()
    x.save(); x.beginPath(); x.rect(0, 0, W, HZ); x.clip()
    const sy = HZ + 170 - 230 * sk
    x.beginPath(); x.arc(540, sy, 170, 0, TAU); ink(x, SUN, { w: 9, fa: 0.85, glow: 40, fill: '#ffb35a' })
    x.fillStyle = 'rgba(30,16,52,0.55)'
    for (let j = 0; j < 4; j++) x.fillRect(340, sy + 30 + j * 34, 400, 9 + j * 2)
    x.restore()
    ocean(x, t, HZ, SAND, { mx: 540 })
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rgba(SUN, 0.5 * sk); for (let j = 0; j < 6; j++) { const ww = 260 - j * 26 + 14 * Math.sin(t * 3 + j); x.fillRect(540 - ww / 2, HZ + 16 + j * 27, ww, 6) } x.restore()
    x.fillStyle = 'rgba(38,20,60,0.98)'; x.fillRect(0, SAND, W, 1920 - SAND)
    x.beginPath(); x.moveTo(0, SAND); for (let px = 0; px <= W; px += 30) x.lineTo(px, SAND + Math.sin(px * 0.02 + t * 2) * 6); ink(x, BONE, { w: 5, fa: 0, glow: 14 })
    x.save(); x.translate(110, SAND + 40); palm(x, t, { h: 700, lean: 0.2, trunk: PINK, frond: TEAL }); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = 1 - ease.inCubic(prog(t, ...T.out))
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.88, 1, o), lerp(0.88, 1, o)); x.translate(-540, -1000)
        if (t < T.cut) {
          const dim = 1 - 0.45 * ease.inOutQuad(prog(t, T.card[0], T.card[1]))
          drawCity(t, dim)
          drawWalkers(t, 1)
          drawCard(t)
          const tm = taurusMood(t)
          drawStarChar(x, TAU_P.x, TAU_P.y, TAU_P.s, t, { color: TAU_S.color, glyph: TAU_S.glyph, mood: tm.mood, look: tm.look, hops: TAU_HOPS, seed: 3, pop: pop01(t, T.taurus, 0.4, 2.2), squash: 0.14 * bump(t, T.stamp, 0.35) })
          // THE STARS, peeking over the card's corner
          if (t >= T.l1 - 0.3) {
            const sm = t < T.stamp ? { mood: 'squint', look: [-1, 1] } : t < T.l2 ? { mood: 'eyeroll', look: [0, 0] } : { mood: 'happy', look: [-1, 1] }
            drawStarChar(x, 925, 640, 165, t, { color: STAR.sky, glyph: null, mood: sm.mood, look: sm.look, hops: S_HOPS, seed: 2, pop: pop01(t, T.l1 - 0.3, 0.4, 2.2) })
          }
        } else {
          drawBeach(t)
          // gold arc + heart between them
          const ak = ease.inOutCubic(prog(t, ...T.arc))
          if (ak > 0) {
            const y0 = TB.y - 135, peak = TB.y - 420
            x.beginPath()
            for (let j = 0; j <= 40 * ak; j++) { const u = j / 40, px = lerp(TB.x, CN.x, u), py = y0 - 4 * (y0 - peak) * u * (1 - u); j ? x.lineTo(px, py) : x.moveTo(px, py) }
            ink(x, GOLD, { w: 10, fa: 0, glow: 30 })
            const hk = pop01(t, T.heart, 0.45, 3), beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
            x.save(); x.translate((TB.x + CN.x) / 2, peak - 30); heart(x, 70 * hk * beat, PINK, clamp(hk * 2)); x.restore()
            sparkle(x, (TB.x + CN.x) / 2, peak - 30, t, T.heart, { n: 16, R: 280, seed: 61, size: 30, cols: [PINK, GOLD, '#fff3e0', SUN] })
          }
          const tm = taurusMood(t)
          drawStarChar(x, TB.x, TB.y, 245, t, { color: TAU_S.color, glyph: TAU_S.glyph, mood: tm.mood, look: tm.look, hops: TAU_HOPS, seed: 3 })
          const cx = lerp(1300, CN.x, ease.outCubic(prog(t, ...T.cancer)))
          const cm = t < T.l3 ? { mood: 'happy', look: [-1, 0] } : t < T.heart ? { mood: 'sparkle', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }
          drawStarChar(x, cx, CN.y, 245, t, { color: CAN.color, glyph: CAN.glyph, mood: cm.mood, look: cm.look, hops: CN_HOPS, seed: 9, blush: t > T.l3 ? 0.9 : undefined })
          tag(x, CN.x - 10, CN.y - 190, 'LOCAL · SINCE FOREVER', pop01(t, T.local, 0.3, 2.6), { size: 32, bar: '#9fe8ff', col: '#dff6ff' })
        }
        sparkle(x, 540, 480, t, T.h0Land + 0.15, { n: 16, R: 400, seed: 9, size: 30, cols: [PINK, ROSE, GOLD, TEAL, '#fff3e0'] })
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell written in Bb major: home key)
const NOTE = [466.16, 523.25, 587.33, 622.25, 698.46, 783.99, 880]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 932.33, 0.05, 0], ['pluck', land, 932.33, 0.04, 0.6, 0]]
const chipC = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, bus: 'fx', ...o }]
const roll = (t, len, g = 0.012) => chipC(t, 180, len, { wave: 'noise', gain: g, decay: len, sustain: 0.8 })
export const CUES = [
  ['whoosh', 0.05, 0.4, 0.03], ...head(T.h0, 5, T.h0Land, 0), ['pop', T.h0Land + 0.1, 1046.5, 0.05, 0], ['glitter', T.h0Land + 0.15, T.h0Land + 0.7],
  ...T.palms.map((p, i) => ['pluck', p, [466.16, 587.33][i], 0.04, 0.4, i ? 0.5 : -0.5]),
  ['pop', T.taurus + 0.1, 587.33, 0.04, -0.5],
  roll(T.walk[0], 2.6), roll(T.walk[1], 1.6, 0.015), roll(T.walk[2], T.stop - T.walk[2]),
  ...T.walk.map((w, i) => ['tick', +(w + 0.15).toFixed(3), 0.04]), ['whoosh', T.walk[1] + 0.15, 0.6, 0.04],
  ['pop', T.stop, 698.46, 0.045, 0.2], ['tick', T.stop + 0.05, 0.06],
  ['bell', T.smitten, 1396.91, 0.03, 1.2, -0.4], ['bell', T.smitten + 0.1, 1864.66, 0.025, 1.2, -0.4],
  ...head(T.h1, 2, T.h1Land, 1),
  ['pop', T.l1 - 0.25, 1174.66, 0.04, 0.5],
  ['whoosh', T.card[0], 0.45, 0.04],
  ['whoosh', T.stamp - 0.2, 0.2, 0.045], ['boom', T.stamp, 0.16], ['tick', T.stamp, 0.09],
  ['whoosh', T.bolt, 0.4, 0.06], roll(T.bolt, 0.5, 0.02), chipC(T.bolt + 0.05, 1200, 0.35, { wave: 'tri', gain: 0.03, slide: 10, decay: 0.3 }),
  ...head(T.h2, 3, T.h2Land, 2),
  ['glitter', T.sun[0] + 0.3, T.sun[1]], ['whoosh', T.cancer[0], 0.5, 0.03], ['pop', T.cancer[1], 783.99, 0.045, 0.4],
  ['tick', T.local, 0.05], ['pop', T.local + 0.02, 1046.5, 0.035, 0.3],
  ['whoosh', T.arc[0], 0.4, 0.03], ['bell', T.heart, 932.33, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1396.91, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ...talkCues(LINES, { cps: CPS, pitch: { [SG_TAG]: 1046.5, [S_TAG]: 739.99, [CN_TAG]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
