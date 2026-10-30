// srhtxstars · "You can barely see the stars." (Star Talk Remix of htxstars, 45 s vertical) · story 0–40.6, then the
// shared END CARD (default CTA). The one sad star you can see through the Houston haze is your guide. It tries to get
// your attention, gets mistaken for a plane, blows the haze away, and the whole sky turns out to be full of stars (the
// name tag goes from THE STAR to THE STARS). Then they read your chart and tour three features, each presented by a
// sign star. Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556).
//   0.00–5.90   HOOK "In Houston, | you can barely | see the *stars.*" — orange haze over the skyline, a stick person
//               on their phone; one dim gold star flickers through. THE STAR: "hi. it's… just me up here tonight."
//   6.00–12.60  "Just one | *sad* star." — rule of three: (1) it flares "HELLO??" and the haze swallows it; (2) the person
//               points: "ooh, a plane!" THE STAR: "i am *not* a plane."; (3) it squints: "ok. hold my *glow.*" and inhales…
//  12.82–16.80  "*Whoosh.*" — it blows the haze away; twelve sign stars pop out across a clear sky. "They never | *left.*"
//               ♓ Pisces, sobbing happily: "we were here the WHOLE time!!"
//  16.95        card cut (shuffle)
//  17.05–22.60  "We'll show you | *yours.*" — the guide flies to the hub, the chart wheel blooms; Sun ♉ / Moon ♐ /
//               Rising ♎ pop on. THE STARS (plural now): "your sun, your moon, your *rising.*"
//  22.95–33.80  the feature tour, one sign star each: ♏ "Card *first.* | Face last." (a mystery card) — ♐ "A new
//               *deck,* | every night." (cards deal into a fan) — ♊ "Skip the | *small talk.*" ("hey" deflates, a talk
//               card flips in). 30.20 card cut (flip)
//  33.94–38.25 ★ LESSON UNLOCKED: "Can’t see them? | They’re still | *up there.*" (+1 FAITH)
//  38.30–40.30 "*Look* up." — the skyline and the person come back; the person points up; every star waves.
//  40.35–40.60 plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 40.6
// One canvas, DOM type + dialogue boxes + the lesson above it, grain on top. Pure f(t). The skyline is the htxspacecity
// film's, imported read-only from htxspacecity/scenes/props.js.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, ptOf } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { skyline } from '../../htxspacecity/scenes/props.js'
import { BONE, GOLD, PINK, BLUE, LAV, rgba, ink, sparkle, orb, chip, starFrame, inSprite, tearsCells, aside, stickPerson, heyBubble } from './props.js'

export const DURATION = 45
const END = DURATION - ENDCARD_LEN          // 40.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180
const SMOG = '#ff9a4a'
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const win = (t, a, b) => t >= a && t < b

// ── the dialogue
const ONE = 'THE STAR', ALL = 'THE STARS'
const SCO = signStar('scorpio'), SAG = signStar('sagittarius'), GEM = signStar('gemini'), PIS = signStar('pisces')
const TAG_SCO = '♏ SCORPIO STAR', TAG_SAG = '♐ SAG STAR', TAG_GEM = '♊ GEMINI STAR'
const CPS = 28
const F = [22.95, 26.6, 30.25]                // the three features
const BOX_A = [
  { t: 2.8, speaker: ONE, text: "hi. it's… just me up here *tonight.*" },
  { t: 8.6, speaker: ONE, color: PINK, text: 'i am *not* a plane.' },
  { t: 11.0, speaker: ONE, text: 'ok. hold my *glow.*' },
]
const BOX_D = [{ t: 19.3, speaker: ALL, text: 'your sun, your moon, your *rising.*' }]
const BOX_E = [
  { t: F[0] + 0.45, speaker: TAG_SCO, color: SCO.color, text: 'the face comes *last.* trust me.' },
  { t: F[1] + 0.45, speaker: TAG_SAG, color: '#c9a6ff', text: 'new deck. *every* night. no reruns.' },
  { t: F[2] + 0.45, speaker: TAG_GEM, color: GEM.color, text: "skip the 'hey.' ask me *anything.*" },
]
const BOXES = [[BOX_A, 2.6, 13.7], [BOX_D, 19.1, 22.55], [BOX_E, F[0] + 0.25, 33.85]]
const LESSON = { at: BEAT(60), out: [38.0, 38.25], text: 'Can’t see them? | They’re still | *up there.*', chip: '+1 FAITH', accentColor: GOLD, dim: 0.55 }

// ── timeline
const T = {
  h0: 0.25, h0Late: BEAT(1), h0Out: 5.65, person: 1.3, star: 1.95,
  h1: 6.0, h1Late: BEAT(11), h1Out: 12.55, flare: BEAT(10), hello: [6.25, 7.55], point: 7.55, plane: [7.65, 9.3],
  inhale: [11.95, 12.75], blow: BEAT(22), clear: [12.85, 13.9], crowd: 13.0, h2: BEAT(22), h2Out: 13.95,
  h3: 14.15, h3Late: BEAT(25), h3Out: 16.75, whole: [14.5, 16.55],
  toChart: [16.85, 17.55], h4: 17.05, h4Late: BEAT(30), bloom: BEAT(31), planets: [BEAT(33), BEAT(34), BEAT(35)], h4Out: 22.6,
  feat: F, featOut: 3.45,
  lesson: LESSON.at, back: [37.9, 38.5], h5: BEAT(68), fade: [39.9, 40.3],
}

// ── layout
const BASE = 1585
const PERSON = { x: 165, y: BASE, s: 0.95 }
const CROWD = [   // sign index → [x, y, size] in the clear sky
  [150, 650, 92], [340, 610, 80], [745, 600, 84], [935, 660, 92], [120, 900, 100], [300, 1040, 80],
  [820, 1050, 86], [960, 880, 96], [330, 1190, 88], [540, 1215, 76], [720, 1235, 82], [925, 1250, 104],
]
const PIS_I = 11
const GUIDE = [[0, 770, 770, 128], [11.9, 770, 770, 128], [12.7, 540, 880, 220], [16.85, 540, 880, 220], [17.55, 540, 1010, 150],
  [22.7, 540, 1010, 150], [23.2, 905, 615, 104], [37.9, 905, 615, 104], [38.5, 540, 880, 200]]
function guideAt(t) {
  let i = 0
  while (i < GUIDE.length - 1 && t >= GUIDE[i + 1][0]) i++
  if (i >= GUIDE.length - 1) return GUIDE[GUIDE.length - 1].slice(1)
  const [t0, ...a] = GUIDE[i], [t1, ...b] = GUIDE[i + 1]
  const k = ease.inOutCubic(prog(t, t0, t1))
  const p = a.map((v, j) => lerp(v, b[j], k))
  p[1] -= Math.sin(Math.PI * k) * 60
  return p
}
// the chart: Sun ♉, Moon ♐, Rising ♎
const PLANETS = [
  { lon: 45, r: 250, col: GOLD, label: 'SUN · TAURUS', dx: 0, dy: 72 },
  { lon: 255, r: 250, col: '#e3ecff', label: 'MOON · SAG', dx: 0, dy: -70 },
  { lon: 195, r: 250, col: '#e163d6', label: 'RISING · LIBRA', dx: -20, dy: 72 },
]
const PRES = { x: 230, y: 1300, s: 175 }      // the feature presenter's spot
const PROP = { x: 625, y: 1010 }

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 190px Inter", "italic 500 190px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, profIm, talkIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-3.png'), loadImg(A + 'card-talk-1.png')])
  const backBmp = bitmap(backIm, 420), profBmp = bitmap(profIm, 760), talkBmp = bitmap(talkIm, 720)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: SMOG, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX · TONIGHT')
  const H0 = popText(root, 'In Houston, | you can barely | see the *stars.*', { top: 205, size: 104, accentSize: 140, at: T.h0, gap: 0.07, late: 1, lateAt: T.h0Late, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Just one | *sad* star.', { top: 215, size: 124, accentSize: 170, at: T.h1, gap: 0.09, late: 2, lateAt: T.h1Late, lateGap: 0.14, wobble: true, accentColor: BLUE })
  const H2 = popText(root, '*Whoosh.*', { top: 240, size: 190, accentSize: 230, at: T.h2, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'They never | *left.*', { top: 215, size: 124, accentSize: 180, at: T.h3, gap: 0.09, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, "We'll show you | *yours.*", { top: 215, size: 112, accentSize: 170, at: T.h4, gap: 0.08, late: 1, lateAt: T.h4Late, wobble: true, accentColor: GOLD })
  const HF = [
    popText(root, 'Card *first.* | Face last.', { top: 215, size: 112, accentSize: 150, at: F[0] + 0.05, gap: 0.09, wobble: true, accentColor: PINK }),
    popText(root, 'A new *deck,* | every night.', { top: 215, size: 108, accentSize: 146, at: F[1] + 0.05, gap: 0.09, wobble: true, accentColor: GOLD }),
    popText(root, 'Skip the | *small talk.*', { top: 215, size: 112, accentSize: 150, at: F[2] + 0.05, gap: 0.09, wobble: true, accentColor: BLUE }),
  ]
  const H5 = popText(root, '*Look* up.', { top: 300, size: 190, accentSize: 230, at: T.h5, gap: 0.16, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], ...HF.map((h, i) => [h, F[i] + T.featOut]), [H5, 39.95]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the haze, the city, the person
  const hazeK = t => 1 - ease.inOutCubic(prog(t, ...T.clear))
  function drawHaze(t) {
    const k = hazeK(t)
    if (k <= 0.01) return
    // swallow the sky's own stars, then the orange glow; it rolls off to the right as it clears
    const shift = 1400 * ease.inCubic(prog(t, ...T.clear))
    x.save(); x.translate(shift, 0)
    x.fillStyle = `rgba(30,14,28,${0.62 * k})`; x.fillRect(-200, 0, W + 400, 1920)
    const g = x.createLinearGradient(0, 0, 0, 1920)
    g.addColorStop(0, rgba(SMOG, 0.12 * k)); g.addColorStop(0.55, rgba(SMOG, 0.32 * k)); g.addColorStop(1, rgba('#ff7a3a', 0.55 * k))
    x.fillStyle = g; x.fillRect(-200, 0, W + 400, 1920)
    // drifting smog banks
    for (let i = 0; i < 6; i++) {
      const by = 560 + i * 170, bx = ((t * (14 + i * 5) + i * 230) % 1400) - 200
      const rg = x.createRadialGradient(bx, by, 20, bx, by, 360)
      rg.addColorStop(0, rgba('#ffb27a', 0.14 * k)); rg.addColorStop(1, rgba('#ffb27a', 0))
      x.fillStyle = rg; x.fillRect(bx - 360, by - 360, 720, 720)
    }
    x.restore()
  }
  const cityK = t => (1 - ease.inCubic(prog(t, 16.85, 17.4))) + ease.outCubic(prog(t, ...T.back)) - (t > T.fade[0] ? ease.inQuad(prog(t, ...T.fade)) : 0)
  function drawCity(t) {
    const k = clamp(cityK(t))
    if (k <= 0.01) return
    const sink = (1 - k) * 700
    skyline(x, t, BASE + sink, j => pop01(t, 0.05 + j * 0.04, 0.42, 1.6), { sc: 0.78, a: 1 })
    // the person
    const pk = pop01(t, T.person, 0.4, 2.2)
    let arm = 1.15, head = -1, phone = 1
    if (t >= T.point - 0.1 && t < 10.2) { arm = lerp(1.15, -1.05, ease.outBack(prog(t, T.point - 0.1, T.point + 0.15))); head = 1; phone = 0.4 }
    else if (t >= 10.2 && t < 12.85) { arm = lerp(-1.05, 1.15, ease.inOutCubic(prog(t, 10.2, 10.6))); head = -1; phone = 1 }
    else if (t >= 12.85) { head = 1; phone = 1 - prog(t, 12.85, 13.2); arm = 1.15 }
    if (t >= T.back[0]) { phone = 0; head = 1; arm = lerp(1.15, -1.2, ease.outBack(prog(t, T.h5 - 0.05, T.h5 + 0.3))) + 0.06 * Math.sin(t * 10) * (t > T.h5 + 0.3 ? 1 : 0) }
    stickPerson(x, PERSON.x, PERSON.y + sink, PERSON.s * pk, { arm, head, phone, a: clamp(pk * 2) })
  }

  // ── the crowd of sign stars
  function crowdState(i, t) {
    const S = SIGNS[i], [cx, cy, cs] = CROWD[i]
    const k0 = pop01(t, T.crowd + i * 0.075, 0.42, 2.4)
    // chart phase: pushed out to the edges, small, dim; features: gone; finale: back
    const toEdge = ease.inOutCubic(prog(t, ...T.toChart)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
    const gone = ease.inOutCubic(prog(t, 22.7, 23.1)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
    const ex = lerp(cx, 540 + (cx - 540) * 1.15, toEdge), ey = lerp(cy, cy < 900 ? cy - 20 : lerp(cy, 1460, 0.6), toEdge)
    return { S, x: ex, y: ey, s: cs * lerp(1, 0.6, toEdge), a: k0 > 0 ? clamp(k0 * 2) * lerp(1, 0.45, toEdge) * (1 - gone) : 0, pop: k0 }
  }
  const crowdHops = i => [T.crowd + i * 0.075 + 0.3, ...(i === PIS_I ? [T.whole[0], T.whole[0] + 0.5] : []), T.h5 + (i % 4) * 0.12, T.h5 + 0.6 + (i % 3) * 0.1]
  function drawCrowd(t, fadeAll) {
    if (t < T.crowd) return
    for (let i = 0; i < 12; i++) {
      const c = crowdState(i, t)
      if (c.a <= 0.01) continue
      let mood = ['happy', 'sparkle', 'wink', 'happy'][i % 4], look = [(540 - c.x) / 600, (880 - c.y) / 600], tears = 0
      if (t < T.crowd + 1.4) { mood = 'wide'; look = [0, 0] }
      if (i === PIS_I) { mood = t < T.toChart[0] ? 'sparkle' : 'squint'; tears = t < T.whole[0] ? 1 : 3 }
      if (t >= T.h5) { mood = i % 3 ? 'happy' : 'heart'; look = [0, 0]; if (i === PIS_I) tears = 3 }
      const opts = { color: c.S.color, glyph: c.s >= 90 ? c.S.glyph : null, mood, look, hops: crowdHops(i), seed: 20 + i, pop: c.pop, alpha: c.a * fadeAll, glow: 0.8 }
      drawStarChar(x, c.x, c.y, c.s, t, opts)
      if (tears) { const Fr = starFrame(c.x, c.y, c.s, t, opts); x.save(); x.globalAlpha = c.a * fadeAll; inSprite(x, Fr, () => tearsCells(x, t, tears)); x.restore() }
    }
    sparkle(x, 540, 880, t, T.crowd + 0.2, { n: 22, R: 520, seed: 14, size: 30, dur: 1.0 })
  }

  // ── the guide
  const G_HOPS = [...BOXES.flatMap(([L]) => talkHops(L, ONE, { cps: CPS })), ...talkHops(BOX_D, ALL, { cps: CPS }), T.flare, T.flare + 0.4, T.blow, ...T.planets.map(p => p + 0.05), T.h5, T.h5 + 0.55]
  function guideState(t) {
    const st = { mood: 'neutral', look: [0, 0], squash: 0, blink: undefined, zzz: false }
    if (t < T.flare) { st.mood = 'sleepy'; st.look = [0, 0.6] }
    else if (t < T.hello[1]) { st.mood = 'wide'; st.look = [0, 0]; st.squash = 0.16 * bump(t, T.flare, 0.35); st.blink = false }
    else if (t < T.point) { st.mood = 'sleepy'; st.look = [-1, 1] }
    else if (t < 8.6) { st.mood = 'wide'; st.look = [-1, 1]; st.blink = false; st.squash = 0.14 * bump(t, T.plane[0], 0.3) }
    else if (t < 9.9) { st.mood = 'squint'; st.look = [-1, 1] }
    else if (t < 11.0) { st.mood = 'eyeroll' }
    else if (t < T.inhale[0]) { st.mood = 'squint'; st.look = [0, 0] }
    else if (t < T.blow) { st.mood = 'wide'; st.look = [0, -0.3]; st.squash = 0.22 * ease.inOutQuad(prog(t, ...T.inhale)); st.blink = false }
    else if (t < 13.5) { st.mood = 'squint'; st.squash = -0.16 * (1 - prog(t, T.blow, 13.5)); st.look = [1, 0] }
    else if (t < 16.85) { st.mood = 'sparkle' }
    else if (t < T.planets[0]) { st.mood = 'happy' }
    else if (t < T.planets[2] + 0.5) { st.mood = 'wide'; st.blink = false; st.look = [[1, 1], [0.5, -1], [-1, 0.3]][Math.min(2, Math.floor((t - T.planets[0]) / 0.5556))] }
    else if (t < 22.7) { st.mood = 'heart' }
    else if (t < F[1]) { st.mood = 'squint'; st.look = [-1, 0.7] }
    else if (t < F[2]) { st.mood = 'happy'; st.look = [-1, 0.7] }
    else if (t < T.lesson) { st.mood = 'wink'; st.look = [-1, 0.7] }
    else if (t < T.back[0]) { st.mood = 'sparkle' }
    else st.mood = 'happy'
    return st
  }
  function drawGuide(t, fadeAll) {
    if (t < T.star) return
    const [gx0, gy0, gs] = guideAt(t)
    const st = guideState(t)
    // in the haze it flickers, dim and small; the flare punches through for a moment, then the haze swallows it
    const hk = hazeK(t)
    const flick = 0.55 + 0.25 * Math.sin(t * 13) * Math.sin(t * 7.3) + 0.6 * bump(t, T.flare, 0.9)
    const a = clamp(lerp(1, flick, hk)) * fadeAll
    const glow = lerp(1.2, 0.5 + 1.2 * bump(t, T.flare, 0.9), hk)
    const rise = 30 * (1 - ease.outCubic(prog(t, T.star, T.star + 0.8)))
    drawStarChar(x, gx0, gy0 + rise, gs, t, { color: STARC.sky, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, zzz: false, hops: G_HOPS, seed: 3, pop: pop01(t, T.star, 0.8, 1.6), alpha: a, glow })
    if (t >= T.flare && t < T.flare + 0.9) sparkle(x, gx0, gy0, t, T.flare, { n: 10, R: 170, seed: 5, size: 26, dur: 0.8 })
    // the blow: a gust of pixel puffs to the right
    if (t >= T.blow && t < T.blow + 1.2) {
      const p = prog(t, T.blow, T.blow + 1.2)
      for (let j = 0; j < 9; j++) {
        const r = rng(400 + j), d = ease.outCubic(p) * (500 + r() * 400), yy = gy0 + (r() - 0.5) * 300 * p
        x.save(); x.globalAlpha = (1 - p) * 0.85; x.fillStyle = j % 2 ? '#ffd9b0' : BONE
        const sz = 14 + r() * 20; x.fillRect(Math.round(gx0 + 120 + d), Math.round(yy), sz, sz * 0.6); x.restore()
      }
    }
  }

  // ── the chart
  function drawChart(t, fadeAll) {
    const k = ease.outCubic(prog(t, T.bloom, T.bloom + 0.6)) * outK(t, 22.55, 0.35) * fadeAll
    if (k <= 0.01) return
    const sc = lerp(0.7, 1, easeOutBack(prog(t, T.bloom, T.bloom + 0.6), 1.4))
    x.save(); x.translate(540, 1010); x.scale(sc, sc); x.rotate((1 - ease.outCubic(prog(t, T.bloom, T.bloom + 1.0))) * -0.8); x.translate(-540, -1010)
    drawWheelH(x, { k })
    x.restore()
    sparkle(x, 540, 1010, t, T.bloom, { n: 16, R: 460, seed: 9, size: 30 })
    PLANETS.forEach((P, i) => {
      const pk = pop01(t, T.planets[i], 0.4, 2.4) * outK(t, 22.55, 0.3) * fadeAll
      if (pk <= 0) return
      const p = ptOf(P.lon, P.r)
      x.save(); x.beginPath(); x.moveTo(540, 1010); x.lineTo(lerp(540, p.x, clamp(pk)), lerp(1010, p.y, clamp(pk))); x.globalAlpha = 0.45 * clamp(pk); ink(x, P.col, { w: 3, fa: 0, glow: 10 }); x.restore()
      orb(x, p.x, p.y, 24 * pk, P.col, clamp(pk * 2))
      chip(x, p.x + P.dx, p.y + P.dy, P.label, pk, { size: 28, col: P.col, edge: P.col })
      sparkle(x, p.x, p.y, t, T.planets[i], { n: 8, R: 110, seed: 50 + i, size: 22 })
    })
  }

  // ── the feature tour
  function drawCardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  const PRESENTERS = [[SCO, 'scorpio'], [SAG, 'sagittarius'], [GEM, 'gemini']]
  function drawFeatures(t, fadeAll) {
    F.forEach((f, i) => {
      if (t < f - 0.1 || t > f + T.featOut + 0.5) return
      const o = 1 - ease.inCubic(prog(t, f + T.featOut, f + T.featOut + 0.35))
      if (i === 0) {   // the mystery card drops in
        const p = easeOutBack(prog(t, f + 0.15, f + 0.65), 1.5)
        const land = t > f + 0.65 ? 0.05 * Math.exp(-(t - f - 0.65) * 7) * Math.sin((t - f - 0.65) * 24) : 0
        const ag = x.createRadialGradient(PROP.x, PROP.y, 30, PROP.x, PROP.y, 480)
        ag.addColorStop(0, rgba(PINK, 0.4 * clamp(p) * o)); ag.addColorStop(1, rgba(PINK, 0))
        x.fillStyle = ag; x.fillRect(PROP.x - 480, PROP.y - 480, 960, 960)
        drawCardImg(profBmp, PROP.x, lerp(-500, PROP.y, p) + 8 * Math.sin((t - f) * 2.2), 640 * (1 + land), -3 + 3 * clamp(p), 1, fadeAll * o, 40, LAV)
        sparkle(x, PROP.x, PROP.y, t, f + 0.65, { n: 14, R: 380, seed: 77, size: 30 })
      } else if (i === 1) {   // the presenter deals five card backs into a fan
        for (let k = 0; k < 5; k++) {
          const td = f + 0.35 + k * 0.28, p = ease.outCubic(prog(t, td - 0.3, td))
          if (p <= 0) continue
          const fx = PROP.x + (k - 2) * 112, fy = 1060 + Math.abs(k - 2) * 22, fr = (k - 2) * 9
          const cx = lerp(PRES.x + 60, fx, p), cy = lerp(PRES.y - 60, fy, p) - Math.sin(Math.PI * p) * 160
          const hop = t > f + 2.0 ? -10 * Math.max(0, Math.sin((t - f) * 11.3 + k)) : 0
          drawCardImg(backBmp, cx, cy + hop, 330 * lerp(0.2, 1, p), lerp(fr + 200, fr, p), 1, fadeAll * o)
          sparkle(x, fx, fy, t, td, { n: 6, R: 120, seed: 30 + k, size: 22 })
        }
      } else {   // "hey" deflates; a talk card flips in
        const bk = pop01(t, f + 0.2, 0.36, 2.4), dk = prog(t, f + 1.2, f + 1.55)
        const wob = 1 + 0.12 * Math.sin((t - f - 1.2) * 40) * (dk > 0 && dk < 1 ? 1 : 0)
        heyBubble(x, PROP.x + 20, 860, bk * (1 - ease.inCubic(dk)) * wob, 'hey', fadeAll * o)
        const fp = prog(t, f + 1.55, f + 2.0), sx = Math.abs(Math.cos(Math.PI * (1 - fp) * 0.5))
        if (fp > 0) {
          drawCardImg(talkBmp, PROP.x, 1060 + 8 * Math.sin((t - f) * 2.2), 600 * easeOutBack(clamp(fp * 1.4), 1.6), 0, Math.max(0.03, sx), fadeAll * o, 36, BLUE)
          sparkle(x, PROP.x, 1060, t, f + 2.0, { n: 14, R: 360, seed: 88, size: 30 })
        }
      }
      // the presenter
      const [S, id] = PRESENTERS[i]
      const ink0 = ease.outBack(prog(t, f, f + 0.45)), out = ease.inCubic(prog(t, f + T.featOut - 0.1, f + T.featOut + 0.3))
      const px = lerp(-180, PRES.x, clamp(ink0)) - 420 * out
      const L = BOX_E[i]
      const hops = [f + 0.4, ...talkHops([L], L.speaker, { cps: CPS }), i === 1 ? f + 0.35 : f + 2.0]
      const mood = i === 0 ? (t < f + 2.0 ? 'squint' : 'wink') : i === 1 ? (t < f + 1.8 ? 'happy' : 'sparkle') : (t < f + 1.5 ? 'eyeroll' : 'happy')
      drawStarChar(x, px, PRES.y, PRES.s, t, { color: S.color, glyph: S.glyph, mood, look: i === 2 && t < f + 1.5 ? undefined : [1, -0.4], hops, seed: 30 + i, alpha: fadeAll })
    })
  }

  // ── asides
  function drawAsides(t, fadeAll) {
    const [gx, gy] = guideAt(t)
    if (win(t, ...T.hello)) aside(x, gx - 120, gy - 120, 'HELLO??', pop01(t, T.hello[0], 0.3, 2.6) * outK(t, T.hello[1] - 0.2, 0.2) * fadeAll, { size: 40, edge: GOLD, col: GOLD, tx: gx, ty: gy - 40 })
    if (win(t, ...T.plane)) aside(x, 360, 1150, 'ooh, a plane!', pop01(t, T.plane[0], 0.3, 2.4) * outK(t, T.plane[1] - 0.2, 0.2) * fadeAll, { size: 36, edge: BONE, tx: PERSON.x + 20, ty: PERSON.y - 300 })
    if (win(t, ...T.whole)) { const c = crowdState(PIS_I, t); aside(x, 700, c.y - 150, 'we were here the WHOLE time!!', pop01(t, T.whole[0], 0.3, 2.4) * outK(t, T.whole[1] - 0.2, 0.2) * fadeAll, { size: 32, edge: PIS.color, tx: c.x, ty: c.y - 40 }) }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 40.33) {
        const fadeAll = 1 - ease.inQuad(prog(t, ...T.fade))
        drawHaze(t)
        drawCity(t)
        drawChart(t, fadeAll)
        drawCrowd(t, fadeAll)
        drawFeatures(t, fadeAll)
        drawGuide(t, fadeAll)
        drawAsides(t, fadeAll)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, 0.08, 0.4)) * outK(t, T.h0Out))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine moves pitched cues into the key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // hook
  ...wordPops(T.h0, 7, 0.07, 0), ['pluck', r3(T.h0Late), 1174.66, 0.05, 0.6, 0], ['pop', r3(T.h0Late), 1318.51, 0.045, 0],
  ['pop', T.person, 659.25, 0.035, -0.5], ['bell', T.star, 1760, 0.018, 1.4, 0.4], ['pop', r3(T.star + 0.3), 1318.51, 0.02, 0.4],
  // sad star
  ...wordPops(T.h1, 2, 0.09, 1, 0.026), ['pluck', r3(T.h1Late), 587.33, 0.05, 0.6, 0], ['pop', r3(T.h1Late + 0.14), 739.99, 0.04, 0],
  ['riser', r3(T.flare - 0.4), r3(T.flare), 0.03], ['bell', r3(T.flare), 1318.51, 0.045, 1.2, 0.4], ['glitter', r3(T.flare), r3(T.flare + 0.5)],
  ['pop', r3(T.hello[0]), 1174.66, 0.04, 0.4], ['pop', r3(T.hello[0] + 0.12), 1318.51, 0.04, 0.4],
  ['whoosh', r3(T.point - 0.05), 0.3, 0.03], ['pop', T.plane[0], 880, 0.04, -0.4], ['pop', r3(T.plane[0] + 0.12), 1174.66, 0.035, -0.4],
  ['riser', T.inhale[0], T.blow, 0.05],
  // whoosh
  ['whoosh', r3(T.blow - 0.05), 1.6, 0.08], ['boom', r3(T.blow), 0.12], ['pluck', r3(T.blow), 880, 0.05, 0.6, 0],
  ['glitter', T.crowd, 14.2], ...SIGNS.map((_, i) => ['pop', r3(T.crowd + i * 0.075 + 0.1), NOTE[i % 7] * 2, 0.016, (CROWD[i][0] / 540 - 1) * 0.6]),
  ...wordPops(T.h3, 2, 0.09, 2, 0.026), ['pluck', r3(T.h3Late), 1174.66, 0.055, 0.6, 0], ['bell', r3(T.h3Late), 1760, 0.03, 1.8, 0],
  ['pop', T.whole[0], 1318.51, 0.035, 0.5], ['pop', r3(T.whole[0] + 0.12), 1567.98, 0.03, 0.5],
  // chart
  ['whoosh', T.toChart[0], 0.7, 0.04], ...wordPops(T.h4, 3, 0.08, 3, 0.026), ['pluck', r3(T.h4Late), 1318.51, 0.055, 0.6, 0],
  ['boom', r3(T.bloom), 0.1], ['bell', r3(T.bloom), 587.33, 0.05, 2.0, 0], ['glitter', r3(T.bloom), r3(T.bloom + 0.6)],
  ...T.planets.map((s, i) => ['pluck', r3(s), [880, 1174.66, 987.77][i], 0.05, 0.6, (i - 1) * 0.4]),
  ...T.planets.map((s, i) => ['pop', r3(s + 0.05), [1318.51, 1567.98, 1479.98][i], 0.03, (i - 1) * 0.4]),
  // features
  ...F.flatMap((f, i) => [...wordPops(f + 0.05, 4, 0.09, i * 2, 0.026), ['whoosh', r3(f), 0.5, 0.035], ['pop', r3(f + 0.4), 739.99, 0.035, -0.5], ['whoosh', r3(f + T.featOut), 0.45, 0.03]]),
  ['whoosh', r3(F[0] + 0.2), 0.45, 0.04], ['boom', r3(F[0] + 0.65), 0.08], ['bell', r3(F[0] + 0.65), 1318.51, 0.045, 2.0, 0.2], ['glitter', r3(F[0] + 0.65), r3(F[0] + 1.2)],
  ...[0, 1, 2, 3, 4].flatMap(k => [['whoosh', r3(F[1] + 0.07 + k * 0.28), 0.3, 0.025], ['pop', r3(F[1] + 0.35 + k * 0.28), NOTE[(k * 2) % 7], 0.045, (k - 2) * 0.25]]),
  ['pop', r3(F[2] + 0.2), 659.25, 0.045, 0], ['whoosh', r3(F[2] + 1.2), 0.35, 0.03], ['pop', r3(F[2] + 1.45), 440, 0.04, 0],
  ['whoosh', r3(F[2] + 1.55), 0.4, 0.03], ['bell', r3(F[2] + 2.0), 1174.66, 0.05, 2.0, 0.2], ['glitter', r3(F[2] + 2.0), r3(F[2] + 2.5)],
  // lesson + finale
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Eb' }),
  ['whoosh', T.back[0], 0.8, 0.04], ['pluck', r3(T.h5), 880, 0.055, 0.6, 0], ['pop', r3(T.h5), 1174.66, 0.05, 0], ['pop', r3(T.h5 + 0.16), 1318.51, 0.05, 0],
  ['bell', r3(T.h5 + 0.2), 1760, 0.035, 2.0, 0], ['glitter', r3(T.h5), r3(T.h5 + 0.9)],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.h5 + 0.4 + i * 0.12), NOTE[(i * 2) % 7] * 2, 0.018, (i % 2 ? 0.4 : -0.4)]),
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [ONE]: 739.99, [ALL]: 739.99, [TAG_SCO]: 587.33, [TAG_SAG]: 880, [TAG_GEM]: 987.77 } })),
]

// card-motif candidate cuts (cardfx keeps 16.95 + 30.2):
//   5.85  hook type out (5.65–5.87), box A open across it → "Just one sad star." (6.0)
//  16.95  "They never left" out (16.75–16.97), box A shut (13.7) → "We'll show you yours." (17.05)
//  22.85  box D shut (22.55), chart out (22.9) → 01 "Card first. Face last." (23.0)
//  26.55  01 out (26.4–26.75) → 02 "A new deck, every night." (26.65)   ·  30.20  02 out (30.05–30.4) → 03 "Skip the small talk." (30.3)
//  33.80  box E shut (33.85) → ★ LESSON UNLOCKED (33.94)
const CUTS = [{ t: 5.85, kind: 'flip' }, { t: 16.95, kind: 'shuffle' }, { t: 22.85, kind: 'deal' }, { t: 26.55, kind: 'flip' }, { t: 30.2, kind: 'flip', dir: -1 }, { t: 33.8, kind: 'shuffle' }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
export { T, BOXES as ALL_BOXES }
