// srcityla · "LA: everyone's photo is perfect." (Star Talk Remix of cityla, 20 s vertical, music: pop, F) · story 0–15.6,
// then the shared end card (cta VOTE FOR YOUR CITY, as the original).
//   0.00–5.45  "LA: everyone's | photo is *perfect.*"  A ring light, a phone on a tripod, a faceless profile photo. The ♎ Libra
//              star (Venus-ruled, lives for aesthetics) hops on the shutter: flash + GOLDEN HOUR, flash + PALM TREES (drop),
//              flash + GLOW. LIBRA: "ok. just one more *filter.*" → + 1 MORE FILTER, + 1 MORE, + MORE: the photo blows out
//              to pure white glare.
//   5.45–7.40  "Too much | *glow.*"  THE STARS pop in, squinting into the glare: "babe. we can't even see *them.*"
//   7.40–11.4  "Card *first.* | Face last."  The glare softens into an aura veil and the phone turns into a veiled card.
//              THE STARS: "meet the person, not the *preset.*"  Libra goes sparkly.
//  11.50       card cut (flip)
//  11.60–15.3  "Fall for the chart, | not the *lighting.*"  The ring light CLICKs off; the card keeps glowing on its own.
//              Libra gasps, then heart-eyes at the card; THE STARS wink. Everything pops out by 15.45.
// One canvas (sky + ring light + phone + card + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', SUN = '#ff9a4a', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const LIB = signStar('libra')
const L_TAG = `${LIB.glyph}︎ LIBRA`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [5.25, 5.42],
  f: [B(2), B(4), B(6), B(7), B(7.5), B(8)],     // the flashes: GOLDEN HOUR, PALM TREES, GLOW, +1 MORE FILTER, +1 MORE, + MORE
  glare: 5.1,
  l0: 2.0, open: 1.78,
  starsIn: 5.3, h1: 5.55, h1Land: 5.85, h1Out: [7.2, 7.36], l1: 5.75,
  veil: [6.7, 7.5], card: [B(13), B(13) + 0.45], h2: 7.45, h2Land: 7.75, h2Out: [11.15, 11.32], l2: 8.5, close: 11.32,
  cut: 11.5,
  h3: 11.6, h3Land: 12.0, click: B(21), out: [14.95, 15.42],
}
const LINES = [
  { t: T.l0, speaker: L_TAG, color: '#ffb3d1', text: 'ok. just one more *filter.*' },
  { t: T.l1, speaker: S_TAG, text: "babe. we can't even see *them.*" },
  { t: T.l2, speaker: S_TAG, color: PINK, text: 'meet the person, not the *preset.*' },
]
const STICKERS = [
  { text: '+ GOLDEN HOUR', col: GOLD, x: 300, y: 760, rot: -0.08 },
  { text: '+ PALM TREES', col: MINT, x: 790, y: 860, rot: 0.06 },
  { text: '+ GLOW', col: PINK, x: 280, y: 1010, rot: 0.05 },
  { text: '+ 1 MORE FILTER', col: '#9fd8ff', x: 760, y: 1120, rot: -0.05 },
  { text: '+ 1 MORE', col: LAV, x: 330, y: 1200, rot: -0.07 },
  { text: '+ MORE', col: '#fff3c0', x: 740, y: 690, rot: 0.08 },
]
const CUTS = [5.45, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'VOTE FOR YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const filtersOn = t => T.f.filter(f => t >= f).length
const RL = { x: 540, y: 960, r: 300 }               // the ring light
const PH = { w: 340, h: 620 }                       // the phone
const LIB_P = { x: 865, y: 1290, s: 200 }, SKY_P = { x: 210, y: 1280, s: 190 }

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "700 44px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardIm = await loadImg(A + 'card-profile-1.png')
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 104, accentSize: 156, wobble: true, late: 1, ...o })
  const HEADS = [
    [H("LA: everyone's | photo is *perfect.*", { top: 150, at: T.h0, lateAt: T.h0Land, accentColor: GOLD }), T.h0Out],
    [H('Too much | *glow.*', { top: 170, at: T.h1, lateAt: T.h1Land, accentColor: '#fff3c0' }), T.h1Out],
    [H('Card *first.* | Face last.', { top: 150, at: T.h2, late: 3, lateAt: T.h2Land, accentColor: GOLD }), T.h2Out],
    [H('Fall for the chart, | not the *lighting.*', { top: 150, size: 92, accentSize: 140, at: T.h3, lateAt: T.h3Land, accentColor: PINK }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const L_HOPS = [...talkHops(LINES, L_TAG, { cps: CPS }), ...T.f, T.card[1], T.h3Land + 0.6]
  const S_HOPS = [...talkHops(LINES, S_TAG, { cps: CPS }), T.click + 0.4]

  // ── the ring light + tripod
  function drawRing(t, on) {
    x.save()
    // tripod
    x.strokeStyle = rgba(BONE, 0.8); x.lineWidth = 8; x.lineCap = 'round'
    x.beginPath(); x.moveTo(RL.x, RL.y + RL.r); x.lineTo(RL.x, 1440); x.moveTo(RL.x, 1440); x.lineTo(RL.x - 110, 1540); x.moveTo(RL.x, 1440); x.lineTo(RL.x + 110, 1540); x.moveTo(RL.x, 1440); x.lineTo(RL.x, 1545); x.stroke()
    if (on > 0) {
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(RL.x, RL.y, RL.r * 0.7, RL.x, RL.y, RL.r * 1.5)
      g.addColorStop(0, rgba('#fff4dc', 0)); g.addColorStop(0.3, rgba('#fff4dc', 0.28 * on)); g.addColorStop(1, rgba('#fff4dc', 0))
      x.fillStyle = g; x.beginPath(); x.arc(RL.x, RL.y, RL.r * 1.5, 0, TAU); x.fill()
      x.globalCompositeOperation = 'source-over'
    }
    x.shadowColor = rgba('#fff4dc', on); x.shadowBlur = 40 * on
    x.strokeStyle = on > 0.5 ? '#fff8ea' : lerp(0, 1, on) > 0.2 ? '#cfc6b8' : '#4b4366'; x.lineWidth = 46
    x.beginPath(); x.arc(RL.x, RL.y, RL.r, 0, TAU); x.stroke()
    x.shadowBlur = 0
    x.strokeStyle = on > 0.5 ? 'rgba(255,214,150,0.7)' : 'rgba(30,22,60,0.8)'; x.lineWidth = 6
    x.beginPath(); x.arc(RL.x, RL.y, RL.r - 16, 0, TAU); x.stroke()
    x.restore()
  }
  // ── the photo on the phone (faceless bust) with its filter stack
  function photo(t, w, h) {
    const n = filtersOn(t)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2)
    if (n >= 1) { g.addColorStop(0, '#ff7a59'); g.addColorStop(0.55, SUN); g.addColorStop(1, '#ffd27a') } else { g.addColorStop(0, '#5a6a8c'); g.addColorStop(1, '#8a93ad') }
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    if (n >= 1) { x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(0, -h * 0.05, w * 0.32, 0, TAU); x.fill() }
    if (n >= 2) {   // palm trees
      x.fillStyle = '#5a2350'
      for (const [px, s] of [[-w * 0.36, 1], [w * 0.34, 0.85]]) {
        x.save(); x.translate(px, h / 2); x.scale(s, s)
        x.fillRect(-7, -330, 14, 330)
        for (let i = 0; i < 6; i++) { x.save(); x.translate(0, -330); x.rotate(-1.4 + i * 0.56); x.beginPath(); x.ellipse(52, 0, 58, 13, 0, 0, TAU); x.fill(); x.restore() }
        x.restore()
      }
    }
    // the bust
    x.fillStyle = n >= 1 ? '#4a1c49' : '#2a2f4a'
    x.beginPath(); x.moveTo(-w * 0.36, h / 2); x.quadraticCurveTo(-w * 0.34, h * 0.12, 0, h * 0.1); x.quadraticCurveTo(w * 0.34, h * 0.12, w * 0.36, h / 2); x.fill()
    x.beginPath(); x.arc(0, -h * 0.06, w * 0.19, 0, TAU); x.fill()
    if (n >= 3) {   // glow: a rim light + sparkles
      x.save(); x.globalCompositeOperation = 'lighter'
      x.strokeStyle = 'rgba(255,200,230,0.8)'; x.lineWidth = 10; x.shadowColor = PINK; x.shadowBlur = 30
      x.beginPath(); x.arc(0, -h * 0.06, w * 0.19, 0, TAU); x.stroke()
      x.restore()
      for (let i = 0; i < 6; i++) { const a = i * 1.7 + t * 0.6; drawPixelStar(x, Math.cos(a) * w * 0.38, Math.sin(a * 1.3) * h * 0.35, 22 + 8 * Math.sin(t * 5 + i), i % 3, '#fff3e0') }
    }
    if (n >= 4) {   // + more: hue drift, then everything blows out
      const hue = (t * 240) % 360
      x.save(); x.globalCompositeOperation = 'overlay'; x.fillStyle = `hsla(${hue},90%,60%,${0.25 + 0.1 * (n - 4)})`; x.fillRect(-w / 2, -h / 2, w, h); x.restore()
    }
    const blow = clamp(prog(t, T.f[3], T.glare))
    if (blow > 0) { x.fillStyle = `rgba(255,252,242,${ease.inQuad(blow)})`; x.fillRect(-w / 2, -h / 2, w, h) }
  }
  function drawPhone(t, k) {
    if (k <= 0.01) return
    x.save(); x.translate(RL.x, RL.y); x.scale(k, k)
    const w = PH.w, h = PH.h
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 46); x.fill()
    x.strokeStyle = '#fff1d6'; x.lineWidth = 5; x.stroke()
    x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 34); x.clip()
    photo(t, w, h)
    // the veil washes over the glare
    const vk = ease.inOutQuad(prog(t, ...T.veil))
    if (vk > 0) {
      const g = x.createRadialGradient(0, -h * 0.1, 10, 0, 0, h * 0.7)
      g.addColorStop(0, rgba('#ffd6f0', vk)); g.addColorStop(0.4, rgba('#c08bff', vk)); g.addColorStop(1, rgba('#3b1d6e', vk))
      x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    }
    x.restore()
    x.fillStyle = INK; x.beginPath(); x.roundRect(-46, -h / 2 + 10, 92, 22, 11); x.fill()
    x.restore()
    // the glare spills out of the phone
    const gl = clamp(prog(t, T.f[4], T.glare)) * (1 - ease.inOutQuad(prog(t, ...T.veil)))
    if (gl > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(RL.x, RL.y, 60, RL.x, RL.y, 640)
      g.addColorStop(0, rgba('#fffbea', 0.9 * gl)); g.addColorStop(0.5, rgba('#fff0c8', 0.35 * gl)); g.addColorStop(1, rgba('#fff0c8', 0))
      x.fillStyle = g; x.fillRect(0, 300, 1080, 1300)
      x.restore()
    }
  }
  function drawCard(t) {
    if (t < T.card[0] || !cardIm) return
    const k = easeOutBack(prog(t, T.card[0], T.card[1]), 1.6) * (1 - ease.inCubic(prog(t, ...T.out)))
    if (k <= 0.01) return
    const h = 640 * k, w = h * cardIm.width / cardIm.height
    const cy = RL.y + 6 * Math.sin((t - T.card[0]) * 2.2)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(RL.x, cy, 60, RL.x, cy, 520)
    g.addColorStop(0, rgba(PINK, 0.4 * k)); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.beginPath(); x.arc(RL.x, cy, 520, 0, TAU); x.fill()
    x.restore()
    x.save(); x.shadowColor = PINK; x.shadowBlur = 50; x.drawImage(cardIm, RL.x - w / 2, cy - h / 2, w, h); x.restore()
  }
  function drawStickers(t) {
    STICKERS.forEach((s, i) => {
      const t0 = T.f[i]
      if (t < t0) return
      const k = pop01(t, t0, 0.3, 2.6) * (1 - ease.inCubic(prog(t, T.glare + 0.1 + i * 0.04, T.glare + 0.5 + i * 0.04)))
      const fall = ease.inQuad(prog(t, T.glare + 0.1 + i * 0.04, T.glare + 0.6 + i * 0.04)) * 300
      if (k <= 0.01) return
      x.save(); x.translate(s.x, s.y + fall); x.rotate(s.rot + 0.03 * Math.sin(t * 3 + i)); x.scale(k, k)
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText(s.text).width + 44, th = 66
      x.fillStyle = INK; x.beginPath(); x.roundRect(-tw / 2 - 5, -th / 2 - 5, tw + 10, th + 10, 20); x.fill()
      x.fillStyle = s.col; x.beginPath(); x.roundRect(-tw / 2, -th / 2, tw, th, 16); x.fill()
      x.fillStyle = INK; x.fillText(s.text, 0, 2)
      x.restore()
    })
  }
  function drawFlash(t) {
    let a = 0
    for (const f of T.f) if (t >= f && t < f + 0.35) a = Math.max(a, 1 - (t - f) / 0.35)
    if (a <= 0) return
    x.fillStyle = `rgba(255,250,240,${0.55 * a})`; x.fillRect(0, 0, 1080, 1920)
  }
  function libraState(t) {
    const st = { mood: 'happy', look: [-1, -0.4], squash: 0 }
    if (t < T.f[3]) { st.mood = 'sparkle'; if (t >= T.l0 && t < 3.6) st.look = [0, 0] }
    else if (t < T.glare) { st.mood = 'squint' }
    else if (t < T.card[0]) { st.mood = 'wide'; st.squash = 0.15 * bump(t, T.glare, 0.35) }
    else if (t < T.h3) { st.mood = 'sparkle' }
    else if (t < T.click) { st.mood = 'heart' }
    else if (t < T.click + 0.7) { st.mood = 'wide'; st.look = [-0.6, -1]; st.squash = 0.14 * bump(t, T.click, 0.3) }
    else st.mood = 'heart'
    return st
  }
  function skyState(t) {
    const st = { mood: 'squint', look: [1, -0.3], squash: 0 }
    if (t < T.l1) st.squash = 0.12 * bump(t, T.starsIn + 0.2, 0.3)
    else if (t < 7.3) { st.mood = 'squint'; st.look = [0, 0] }
    else if (t < T.l2) { st.mood = 'happy'; st.look = [1, -0.3] }
    else if (t < T.h3) { st.mood = 'neutral'; st.look = [0, 0] }
    else if (t < T.click + 0.3) { st.mood = 'sparkle'; st.look = [1, -0.4] }
    else st.mood = 'wink', st.look = [0, 0]
    return st
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = 1 - ease.inCubic(prog(t, ...T.out))
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.88, 1, o), lerp(0.88, 1, o)); x.translate(-540, -1000)
        const ringIn = pop01(t, 0.2, 0.5, 1.6)
        const on = t < T.click ? 1 : t < T.click + 0.12 ? (Math.floor((t - T.click) / 0.04) % 2 ? 0.6 : 0.1) : 0
        x.save(); x.translate(RL.x, RL.y); x.scale(ringIn, ringIn); x.translate(-RL.x, -RL.y); drawRing(t, on); x.restore()
        const phoneK = pop01(t, 0.4, 0.45, 1.8) * (1 - ease.inCubic(prog(t, T.card[0] - 0.25, T.card[0] + 0.1)))
        drawPhone(t, phoneK)
        drawCard(t)
        drawStickers(t)
        if (t >= T.click && t < T.click + 1.1) {
          const k = pop01(t, T.click, 0.25, 3) * outK(t, [T.click + 0.9, T.click + 1.1])
          x.save(); x.translate(RL.x + 250, RL.y - 300); x.scale(k, k); x.font = `800 64px Inter`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('CLICK.', 4, 4); x.fillStyle = BONE; x.fillText('CLICK.', 0, 0); x.restore()
        }
        // the cast
        const ls = libraState(t)
        drawStarChar(x, LIB_P.x, LIB_P.y, LIB_P.s, t, { color: LIB.color, glyph: LIB.glyph, mood: ls.mood, look: ls.look, squash: ls.squash, hops: L_HOPS, seed: 5, pop: pop01(t, 0.7, 0.4, 2.2) })
        if (t >= T.starsIn) {
          const ss = skyState(t)
          drawStarChar(x, SKY_P.x, SKY_P.y, SKY_P.s, t, { color: STAR.sky, glyph: null, mood: ss.mood, look: ss.look, squash: ss.squash, hops: S_HOPS, seed: 2, pop: pop01(t, T.starsIn, 0.4, 2.2) })
        }
        if (t >= T.click + 0.6 && t < T.out[0]) {   // hearts drift up off Libra at the card
          for (let i = 0; i < 5; i++) { const ph = ((t - T.click) * 0.7 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); drawPixelStar(x, LIB_P.x - 60 + i * 30, LIB_P.y - 120 - ph * 200, 22, i % 3, i % 2 ? PINK : GOLD); x.restore() }
        }
        x.restore()
        drawFlash(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D major; the engine moves them into F)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const flash = (t, i) => [['tick', t, 0.07], ['chip', t, 2600, 0.06, { wave: 'noise', gain: 0.045, decay: 0.05, sustain: 0, bus: 'fx' }], ['pop', +(t + 0.04).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.035, (i % 2 ? 0.4 : -0.4)]]
export const CUES = [
  ...head(T.h0, 4, T.h0Land, 0),
  ...T.f.flatMap((f, i) => flash(f, i)),
  ['riser', T.f[3], T.glare, 0.05], ['glitter', T.f[2], T.glare],
  ['swell', T.glare - 0.4, T.glare, { gain: 0.05, f0: 800, f1: 7000 }], ['crash', T.glare, { gain: 0.04, len: 1.6 }],
  ['pop', T.starsIn, 880, 0.04, -0.4],
  ...head(T.h1, 2, T.h1Land, 3),
  ['whoosh', T.veil[0], 0.8, 0.04], ['glitter', T.veil[0], T.veil[1]],
  ['whoosh', T.card[0] - 0.2, 0.4, 0.04], ['bell', T.card[1], 880, 0.045, 2.0, -0.2], ['bell', +(T.card[1] + 0.06).toFixed(3), 1174.66, 0.04, 2.0, 0.2],
  ...head(T.h2, 1, T.h2Land, 1),
  ...head(T.h3, 6, T.h3Land, 2),
  ['tick', T.click, 0.09], ['chip', T.click, 180, 0.08, { wave: 'tri', gain: 0.05, decay: 0.07, sustain: 0, bus: 'fx' }], ['tapeStop', T.click - 0.05, 0.3],
  ['bell', +(T.click + 0.7).toFixed(3), 1318.51, 0.035, 1.8, 0], ['glitter', T.click + 0.7, T.click + 1.6],
  ...talkCues(LINES, { cps: CPS, pitch: { [L_TAG]: 987.77, [S_TAG]: 739.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
