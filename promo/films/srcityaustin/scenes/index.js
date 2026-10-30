// srcityaustin · "Austin: everyone's 'in a band.'" (Star Talk Remix of cityaustin, 20 s vertical, music: house, Dm) · story
// 0–15.6, then the shared end card (cta VOTE FOR YOUR CITY, as the original).
//   0.00–5.60  "Austin: | everyone's | *“in a band.”*"  A food truck under string lights; a three-star band in front of it.
//              Tags pop over each, rule of three: ♌ LEO "LEAD GUITAR", ♊ GEMINI "ALSO LEAD GUITAR", ♓ PISCES
//              "TAMBOURINE · SOBBING" (it is already crying). Drop (2.82): they strum on the beat, notes float up.
//              GEMINI (sparkle eyes, straight at you): "hey. i'm in a *band.*"
//   5.75–10.6  "…and | *“between* *things.”*"  Record scratch: the strumming stops (5.88). Bats stream over the truck.
//              GEMINI: "also kinda… *between things.*"  The band echoes it in bubbles: Leo "we'll see", Pisces "kinda".
//              THE STARS pop in over the truck, eye-rolling: "babe. “between things” is not a *genre.*"
//  10.75       card cut (flip)
//  10.85–15.4  "Know what | they're about, | *first.*"  A DEALBREAKERS card; three chips stamp in: ✕ “BETWEEN THINGS”
//              (Gemini's top string snaps), ✕ FLAKY PLANS, ✕ “WE'LL SEE”. THE STARS: "dealbreakers first. *then* the jam."
//              Button: Gemini tries one strum on the snapped guitar, "plonk."; Leo and THE STARS roll their eyes in sync.
//              Everything pops out by 15.42.
// One canvas (sky + lights + truck + bats + band + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, CYAN, ORANGE, LILAC, MINT, rgba, sparkle, guitar, tambourine, note, truck, stringLights, bat, chatBubble, CARD, CHIP_Y, dealCard, xChip, tag, tears } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const TAU = Math.PI * 2
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const LEO = signStar('leo'), GEM = signStar('gemini'), PIS = signStar('pisces')
const G_TAG = `${GEM.glyph}︎ GEMINI`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: B(2), h0Out: [5.45, 5.62],
  band: [0.3, 0.42, 0.54], tags: [1.95, 2.5, B(4)], strum: [B(4), B(9.5)], open: 3.28, l0: 3.5,
  h1: 5.8, h1Land: B(10), h1Out: [10.45, 10.62], scratch: B(9.5), l1: 5.95, bubs: [B(12), B(13)], bats: [6.0, 9.6], starsIn: 7.9, l2: 9.0,
  cut: 10.75,
  h2: 10.85, h2Land: 11.25, card: [10.95, 11.4], stamps: [B(20), B(21), B(22)], l3: 12.3, plonk: B(25), roll: B(25) + 0.25, close: 15.22,
  out: [15.0, 15.42],
}
const LINES = [
  { t: T.l0, speaker: G_TAG, color: '#ffe27a', text: "hey. i'm in a *band.*" },
  { t: T.l1, speaker: G_TAG, color: '#ffe27a', text: 'also kinda… *between things.*' },
  { t: T.l2, speaker: S_TAG, color: PINK, text: 'babe. “between things” is not a *genre.*' },
  { t: T.l3, speaker: S_TAG, text: 'dealbreakers first. *then* the jam.' },
]
const CHIPS = ['“BETWEEN THINGS”', 'FLAKY PLANS', '“WE’LL SEE”']
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'VOTE FOR YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const STAR_Y = 1372, SZ = 240
const BAND = [
  { id: 'leo', s: LEO, x: 205, seed: 3, g: ORANGE },
  { id: 'gem', s: GEM, x: 540, seed: 5, g: GOLD },
  { id: 'pis', s: PIS, x: 875, seed: 7, g: null },
]
const SKY_P = { x: 905, y: 700, s: 175 }
const CARD_P = { x: 510, y: 955, k: 0.8 }
const strumBeats = (() => { const a = []; for (let n = 4; n < 9.5; n++) a.push(B(n)); return a })()
const strumming = t => inR(t, ...T.strum)
const beatPh = t => { const u = (t - 0.6) / (60 / 108); return u - Math.floor(u) }

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "900 80px Inter", "italic 500 150px 'EB Garamond'", "italic 500 66px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H("Austin: | everyone's | *“in* *a* *band.”*", { top: 140, size: 98, accentSize: 140, late: 3, at: T.h0, lateAt: T.h0Land, accentColor: GOLD }), T.h0Out],
    [H('…and | *“between* *things.”*', { top: 150, size: 108, accentSize: 150, late: 2, at: T.h1, lateAt: T.h1Land, accentColor: PINK }), T.h1Out],
    [H("Know what | they're about, | *first.*", { top: 140, size: 96, accentSize: 150, at: T.h2, lateAt: T.h2Land, accentColor: GOLD }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const HOPS = {
    leo: [...strumBeats.map(b => b + 0.04), T.stamps[0] + 0.05],
    gem: [...strumBeats, ...talkHops(LINES, G_TAG, { cps: CPS }), T.stamps[0] + 0.02, T.plonk],
    pis: [...strumBeats.map(b => b + 0.08), T.stamps[2] + 0.05],
  }
  const S_HOPS = [...talkHops(LINES, S_TAG, { cps: CPS })]

  function moodOf(id, t) {
    if (id === 'gem') {
      if (t < T.l0) return { mood: 'happy', look: [0, 0] }
      if (t < T.scratch) return { mood: 'sparkle', look: [0, 0] }
      if (t < T.l2) return { mood: 'wink', look: [0, 0] }
      if (t < T.stamps[0]) return { mood: 'squint', look: [1, -1] }
      if (t < T.plonk) return { mood: 'wide', look: [0, -1] }
      return { mood: 'squint', look: [0, 1] }
    }
    if (id === 'leo') {
      if (t < T.scratch) return { mood: 'happy', look: [1, 0] }
      if (t < T.stamps[0]) return { mood: 'neutral', look: [1, 0] }
      if (t < T.roll) return { mood: 'wide', look: [1, -1] }
      return { mood: 'eyeroll', look: [0, -1] }
    }
    if (t < T.tags[2]) return { mood: 'sparkle', look: [-1, 0] }
    if (t < T.stamps[0]) return { mood: 'sparkle', look: [-1, 0] }
    return { mood: 'wide', look: [-1, -1] }
  }
  function skyMood(t) {
    if (t < T.l2) return { mood: 'eyeroll', look: [0, 0] }
    if (t < T.l3) return { mood: 'squint', look: [-1, 1] }
    if (t < T.roll) return { mood: 'happy', look: [-1, 1] }
    return { mood: 'eyeroll', look: [0, -1] }
  }

  function drawBand(t, o) {
    const strum = strumming(t)
    BAND.forEach((m, i) => {
      const k = pop01(t, T.band[i], 0.42, 2.2)
      if (k <= 0) return
      const st = moodOf(m.id, t)
      const sq = (m.id === 'gem' ? 0.16 * bump(t, T.stamps[0], 0.35) : 0) + (m.id === 'leo' ? 0.12 * bump(t, T.scratch, 0.3) : 0)
      const r = drawStarChar(x, m.x, STAR_Y, SZ, t, { color: m.s.color, glyph: m.s.glyph, mood: st.mood, look: st.look, hops: HOPS[m.id], seed: m.seed, pop: k, squash: sq, glow: 1.1 })
      const cy = r.y
      // instruments
      const rock = strum ? 0.08 * Math.sin(beatPh(t) * TAU) : 0
      if (m.g) {
        const snap = m.id === 'gem' ? clamp((t - T.stamps[0]) / 0.25) : 0
        const pl = m.id === 'gem' ? 0.15 * bump(t, T.plonk, 0.35) : 0
        x.save(); x.translate(m.x + SZ * 0.2, cy + SZ * 0.4); x.rotate(0.5 + rock + pl); x.scale(0.46 * k, 0.46 * k); guitar(x, m.g, { snap }); x.restore()
      } else {
        const shake = strum ? 1 : t > T.stamps[2] && t < T.stamps[2] + 0.5 ? 1 : 0
        x.save(); x.translate(m.x - SZ * 0.4, cy + SZ * 0.3); x.scale(0.66 * k, 0.66 * k); tambourine(x, t, shake); x.restore()
      }
      // Pisces cries the whole time; harder once the stamps start
      if (m.id === 'pis' && t > T.tags[2]) tears(x, t, m.x, cy, SZ, t > T.stamps[0] ? 2 : 1)
    })
    // notes float up off the guitars while they strum
    if (t > T.strum[0] && t < T.strum[1] + 1.4) {
      for (let i = 0; i < 9; i++) {
        const t0 = T.strum[0] + i * 0.36
        if (t0 > T.strum[1]) break
        const ph = (t - t0) / 1.5
        if (ph < 0 || ph > 1) continue
        const sx = [205, 540, 875][i % 3] + (i % 2 ? 40 : -60)
        note(x, sx + Math.sin(ph * 5 + i) * 30, STAR_Y - 150 - ph * 330, 0.9, [GOLD, PINK, CYAN, MINT][i % 4], Math.sin(Math.PI * ph) * o, 0.2 * Math.sin(i), i % 3 === 1)
      }
    }
    // the tags (rule of three)
    const tagOut = outK(t, [5.2, 5.45])
    tag(x, 225, 1165, 'LEAD GUITAR', pop01(t, T.tags[0], 0.3, 2.6) * tagOut, { bar: ORANGE, size: 34 })
    tag(x, 540, 1075, 'ALSO LEAD GUITAR', pop01(t, T.tags[1], 0.3, 2.6) * tagOut, { bar: GOLD, size: 34 })
    tag(x, 795, 1165, 'TAMBOURINE · SOBBING', pop01(t, T.tags[2], 0.3, 2.6) * tagOut, { bar: '#8fe3ff', col: '#cfeeff', size: 34 })
  }

  function drawBats(t) {
    if (!inR(t, T.bats[0], T.bats[1])) return
    for (let i = 0; i < 9; i++) {
      const t0 = T.bats[0] + i * 0.32, p = (t - t0) / 2.4
      if (p < 0 || p > 1) continue
      const bx = lerp(-120, 1200, p), by = 720 + 50 * Math.sin(i * 2.1) + 26 * Math.sin(p * 8 + i)
      bat(x, bx, by, 0.55 + 0.25 * ((i * 37) % 10) / 10, (t * 3.2 + i * 0.27) % 1)
    }
  }

  function drawBubbles(t) {
    const o = outK(t, [T.h1Out[0] - 0.1, T.h1Out[0] + 0.1])
    ;[[T.bubs[0], 250, 1150, "we'll see", 0, -0.05], [T.bubs[1], 840, 1150, 'kinda', 0, 0.05]].forEach(([t0, bx, by, txt, tdx, rot]) => {
      const k = pop01(t, t0, 0.3, 2.6) * o
      if (k <= 0.01) return
      x.save(); x.translate(bx, by); x.rotate(rot); x.scale(k, k); chatBubble(x, txt, 50, tdx, 90); x.restore()
    })
    // the button: "plonk."
    const pk = pop01(t, T.plonk + 0.05, 0.25, 2.8) * outK(t, [T.out[0] - 0.1, T.out[0] + 0.15])
    if (pk > 0.01) { x.save(); x.translate(735, 1262); x.rotate(0.06); x.scale(pk, pk); chatBubble(x, 'plonk.', 44, -110, 70); x.restore() }
  }

  function drawCard(t) {
    if (t < T.card[0]) return
    const k = pop01(t, T.card[0], 0.45, 1.7)
    const rise = (1 - ease.outCubic(prog(t, ...T.card))) * 500
    const last = T.stamps.filter(s => t >= s).pop()
    const shake = last ? 14 * Math.exp(-(t - last) * 7) * Math.sin((t - last) * 44) : 0
    x.save(); x.translate(CARD_P.x + shake, CARD_P.y + rise); x.rotate((1 - k) * 0.1 - 0.02); x.scale(k * CARD_P.k, k * CARD_P.k)
    dealCard(x)
    T.stamps.forEach((s, i) => {
      if (t < s - 0.16) return
      const sp = prog(t, s - 0.16, s)
      const sc = lerp(2.6, 1, ease.inCubic(sp)) * (t > s ? 1 + 0.07 * Math.sin((t - s) * 30) * Math.exp(-(t - s) * 9) : 1)
      x.save(); x.translate(0, CHIP_Y[i]); x.rotate(lerp(-0.16, 0, ease.inCubic(sp))); x.scale(sc, sc); x.globalAlpha = clamp(sp * 2.5)
      xChip(x, CHIPS[i], t > s ? Math.exp(-(t - s) * 3) : 0)
      x.restore()
    })
    x.restore()
    T.stamps.forEach((s, i) => sparkle(x, CARD_P.x, CARD_P.y + CHIP_Y[i] * CARD_P.k, t, s, { n: 12, R: 330, seed: 30 + i, size: 26, cols: ['#ff3d3d', '#ff8a80', GOLD, '#fff3e0'] }))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = 1 - ease.inCubic(prog(t, ...T.out))
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.88, 1, o), lerp(0.88, 1, o)); x.translate(-540, -1000)
        // string lights + the truck behind the band (dims when the music stops, fades under the card)
        stringLights(x, t, 600, 60)
        const lit = t < T.scratch ? 1 : t < T.scratch + 0.3 ? 1 - 0.6 * prog(t, T.scratch, T.scratch + 0.3) : 0.4
        const ta = 0.62 * pop01(t, 0.1, 0.5, 1.4) * (1 - 0.55 * prog(t, T.card[0], T.card[1]))
        if (ta > 0) { x.save(); x.globalAlpha *= ta; x.translate(540, 1470); x.scale(0.8, 0.8); x.translate(-540, -1470); truck(x, t, lit); x.restore() }
        drawBats(t)
        drawCard(t)
        drawBand(t, o)
        drawBubbles(t)
        if (t >= T.starsIn) { const ss = skyMood(t); drawStarChar(x, SKY_P.x, SKY_P.y, SKY_P.s, t, { color: STAR.sky, glyph: null, mood: ss.mood, look: ss.look, hops: S_HOPS, seed: 2, pop: pop01(t, T.starsIn, 0.4, 2.2) }) }
        // record-scratch flash
        if (inR(t, T.scratch, T.scratch + 0.35)) { x.fillStyle = rgba(LILAC, 0.25 * (1 - prog(t, T.scratch, T.scratch + 0.35))); x.fillRect(0, 0, 1080, 1920) }
        sparkle(x, 540, 470, t, T.h0Land + 0.2, { n: 14, R: 380, seed: 9, size: 28, cols: [GOLD, PINK, CYAN, '#fff3e0'] })
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell written in D minor: home key)
const NOTE = [587.33, 659.25, 698.46, 783.99, 880, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chipC = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, bus: 'fx', ...o }]
const strumC = (t, root) => [0, 0.018, 0.036].map((d, i) => ['pluck', +(t + d).toFixed(3), root * [1, 1.189, 1.498][i], 0.022, 0.5, [-0.3, 0, 0.3][i]])
export const CUES = [
  ...head(T.h0, 2, T.h0Land, 0), ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0.2], ['pop', T.h0Land + 0.2, 1396.91, 0.04, -0.2], ['glitter', T.h0Land + 0.2, T.h0Land + 0.8],
  ...T.band.map((b, i) => ['pop', b + 0.1, [587.33, 698.46, 880][i], 0.04, [-0.5, 0, 0.5][i]]),
  ...T.tags.map((b, i) => ['tick', b, 0.05]), ...T.tags.map((b, i) => ['pop', b + 0.02, [880, 987.77, 1174.66][i], 0.035, [-0.4, 0, 0.4][i]]),
  ...strumBeats.flatMap((b, i) => strumC(b, [293.66, 293.66, 233.08, 261.63][Math.floor(i / 2) % 4])),
  // record scratch + the strumming stops
  chipC(T.scratch - 0.05, 1400, 0.35, { wave: 'noise', gain: 0.05, slide: -18, decay: 0.3, sustain: 0.2 }), ['whoosh', T.scratch - 0.1, 0.35, 0.04],
  ...head(T.h1, 1, T.h1Land, 2), ['pop', T.h1Land + 0.1, 1318.51, 0.045, 0],
  ...T.bubs.map((b, i) => ['pop', b, [783.99, 698.46][i], 0.04, i ? 0.4 : -0.4]),
  ['whoosh', T.bats[0] + 0.2, 2.4, 0.025], ...[0, 1, 2, 3, 4].map(i => chipC(T.bats[0] + 0.4 + i * 0.5, 2600 + i * 120, 0.04, { gain: 0.01, decay: 0.03, sustain: 0 })),
  ['pop', T.starsIn, 1174.66, 0.04, 0.4],
  ...head(T.h2, 3, T.h2Land, 1),
  ['whoosh', T.card[0], 0.45, 0.04],
  ...T.stamps.flatMap((s, i) => [['whoosh', s - 0.18, 0.18, 0.04], ['boom', s, 0.12], ['tick', s, 0.08]]),
  chipC(T.stamps[0] + 0.03, 1320, 0.5, { wave: 'tri', gain: 0.045, slide: -12, vib: 0.4, decay: 0.45 }),   // the string snaps: twang
  ['pluck', T.plonk, 146.83, 0.05, 0.25, 0.2], chipC(T.plonk + 0.02, 220, 0.25, { wave: 'tri', gain: 0.03, slide: -6, decay: 0.2 }),
  ['whoosh', T.roll, 0.3, 0.02],
  ...talkCues(LINES, { cps: CPS, pitch: { [G_TAG]: 987.77, [S_TAG]: 739.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
