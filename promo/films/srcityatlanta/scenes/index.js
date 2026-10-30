// srcityatlanta · "Atlanta: a city in a forest." (Star Talk Remix of cityatlanta, 30 s vertical, music: screwed, G) · story
// 0–25.6, then the shared end card (cta VOTE FOR YOUR CITY, as the original).
//   0.00–6.50  "Atlanta: | a city in a | *forest.*"  A canopy of line-art trees grows in (drop 1.71); fireflies. The ♉ TAURUS
//              star (earth, loves nature) bounces in, squinting up at a hundred trees: "ok. which one is *the one?*"
//              Background: ♓ PISCES is already hugging a tree, crying (tag TREE HUGGER).
//   6.60–10.4  "So many trees. | So hard to find | *the one.*"  Taurus hops tree to tree; tags pop, rule of three:
//              "TALL", "ALSO TALL", "TALL · DOESN'T TEXT BACK". TAURUS: "they're all tall and *never text back.*"
//  10.55       card cut (deal)
//  10.70–15.0  "Tonight's deck is | dealt from | *the stars.*"  The forest dims; THE STARS drop down through the canopy:
//              "babe. stop reading the bark. *look up.*" Card backs flutter down like leaves (12.0–14.6); one big card
//              lands in front of Taurus.
//  15.20–19.1  "Card *first.* | Face last."  The card flips (15.6) to a veiled mystery card (a Virgo, words only, no face).
//              THE STARS: "no faces. no bark. just *who they are.*"  Taurus goes heart-eyed.
//  19.30       card cut (flip)
//  19.45–25.4  "Find your one | in the *forest.*"  Under one tree: the ♍ VIRGO star rolls in next to Taurus; chip
//              "EARTH + EARTH · TRINE", a gold line, a heart. VIRGO: "hi. i text back, *btw.*" (the callback). Pisces,
//              still hugging its tree, sobs happily. Everything pops out by 25.42.
// One canvas (sky + forest + cast + cards), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, rgba, sparkle, heart } from '../../citymiami/scenes/props.js'
import { tag, tears } from '../../srcityaustin/scenes/props.js'
import { tree, fireflies, drawCard, LEAF } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN        // 25.6
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const TAU_S = signStar('taurus'), VIR = signStar('virgo'), PIS = signStar('pisces')
const TA_TAG = `${TAU_S.glyph}︎ TAURUS`, VI_TAG = `${VIR.glyph}︎ VIRGO`, S_TAG = 'THE STARS'
const CPS = 28
const MINT = '#7dffb0'

export const T = {
  h0: 0.15, h0Land: B(2), h0Out: [6.3, 6.48], grow: 0.25, taurus: [0.9, 1.7], hugger: 3.9, open: 2.4, l0: 2.62,
  h1: 6.6, h1Land: 7.25, h1Out: [10.3, 10.48], tags: [6.95, 7.5, 8.05], l1: 8.45,
  cut1: 10.55,
  h2: 10.7, h2Land: 11.1, h2Out: [14.85, 15.05], dim: [10.6, 11.2], starsDown: [10.75, 11.55], l2: 11.75, fall: [12.0, 14.6], big: [13.7, 14.6],
  h3: 15.2, h3Land: 15.55, h3Out: [19.0, 19.2], flip: [B(27) - 0.2, B(27) + 0.2], l3: 15.05, smitten: 16.6,
  cut2: 19.3,
  h4: 19.45, h4Land: 19.85, virgo: [19.6, 20.35], l4: 20.65, trine: 21.0, line: [21.0, 21.4], heart: B(39), close: 24.75,
  out: [24.95, 25.42],
}
const LINES = [
  { t: T.l0, speaker: TA_TAG, color: MINT, text: 'ok. which one is *the one?*' },
  { t: T.l1, speaker: TA_TAG, color: MINT, text: "they're all tall and *never text back.*" },
  { t: T.l2, speaker: S_TAG, color: PINK, text: 'babe. stop reading the bark. *look up.*' },
  { t: T.l3, speaker: S_TAG, text: 'no faces. no bark. just *who they are.*' },
  { t: T.l4, speaker: VI_TAG, color: '#ffa8c8', text: 'hi. i text back, *btw.*' },
]
const CUTS = [{ t: T.cut1, kind: 'deal', keep: true }, { t: T.cut2, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'VOTE FOR YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const FLOOR = 1470
// back row (small, dim), front row (the three tagged trees)
const BACK = Array.from({ length: 9 }, (_, i) => ({ cx: -40 + i * 145 + (i % 2) * 30, base: 1330 - (i % 3) * 20, h: 400 + (i * 53) % 90, r: 125 + (i * 31) % 35, col: LEAF[i % LEAF.length], seed: 20 + i }))
const FRONT = [
  { cx: 190, base: FLOOR, h: 580, r: 190, col: LEAF[0], seed: 3 },
  { cx: 560, base: FLOOR, h: 650, r: 205, col: LEAF[1], seed: 5 },
  { cx: 920, base: FLOOR, h: 600, r: 195, col: LEAF[4], seed: 7 },
]
const TAG_TXT = [['TALL', '#a8ffcf'], ['ALSO TALL', '#a8ffcf'], ["TALL · DOESN'T TEXT BACK", '#ffb0b0']]
const SY = 1345, SZ = 225
// Taurus x over the film: walks in, hops to each tagged tree, steps aside for the card, centres for the end
function taurusX(t) {
  if (t < T.taurus[1]) return lerp(-180, 470, ease.outCubic(prog(t, ...T.taurus)))
  if (t < T.tags[0] - 0.25) return 470
  const hopTo = (a, b, t0) => lerp(a, b, ease.inOutCubic(prog(t, t0 - 0.25, t0)))
  if (t < T.tags[1] - 0.25) return hopTo(470, 260, T.tags[0])
  if (t < T.tags[2] - 0.25) return hopTo(260, 600, T.tags[1])
  if (t < T.cut1) return hopTo(600, 770, T.tags[2])
  if (t < T.cut2) return 230
  return 380
}
const LEAVES = (() => { const R = rng(77); return Array.from({ length: 11 }, (_, i) => ({ i, x0: 80 + R() * 920, land: 1440 + R() * 60, ph: R() * 6, w: 110 + R() * 30 })) })()
const PIS_P = { x: 975, y: 1300, s: 150 }
const CARD_P = { x: 585, y: 1000, w: 430 }

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, faceIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-1.png')])
  const shrink = im => { if (!im) return null; const c = document.createElement('canvas'); c.width = 520; c.height = Math.round(520 * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const back = shrink(backIm), face = shrink(faceIm)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Atlanta: | a city in a | *forest.*', { top: 130, size: 100, accentSize: 170, at: T.h0, lateAt: T.h0Land, accentColor: MINT }), T.h0Out],
    [H('So many trees. | So hard to find | *the* *one.*', { top: 140, size: 92, accentSize: 140, late: 2, at: T.h1, lateAt: T.h1Land, accentColor: PINK }), T.h1Out],
    [H("Tonight's deck is | dealt from | *the* *stars.*", { top: 140, size: 92, accentSize: 140, late: 2, at: T.h2, lateAt: T.h2Land, accentColor: GOLD }), T.h2Out],
    [H('Card *first.* | Face last.', { top: 150, size: 112, accentSize: 160, late: 0, at: T.h3, accentColor: GOLD }), T.h3Out],
    [H('Find your one | in the *forest.*', { top: 150, size: 108, accentSize: 168, at: T.h4, lateAt: T.h4Land, accentColor: MINT }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const TA_HOPS = [T.taurus[1], ...talkHops(LINES, TA_TAG, { cps: CPS }), ...T.tags, T.big[1] + 0.05, T.smitten, T.heart, T.heart + 0.45]
  const VI_HOPS = [T.virgo[1], ...talkHops(LINES, VI_TAG, { cps: CPS }), T.heart + 0.2]
  const S_HOPS = [T.starsDown[1], ...talkHops(LINES, S_TAG, { cps: CPS })]
  const PI_HOPS = [T.hugger, T.heart + 0.1, T.heart + 0.5]

  function taurusMood(t) {
    if (t < T.l0) return { mood: 'happy', look: [0, -1] }
    if (t < T.h1) return { mood: 'squint', look: [0, -1] }
    if (t < T.tags[2]) return { mood: 'sparkle', look: [t < T.tags[1] ? -1 : 1, -1] }
    if (t < T.cut1) return { mood: 'eyeroll', look: [0, -1] }
    if (t < T.l2 + 1.2) return { mood: 'wide', look: [1, -1] }
    if (t < T.big[1]) return { mood: 'wide', look: [0, -1] }
    if (t < T.smitten) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.cut2) return { mood: 'heart', look: [1, 0] }
    if (t < T.l4) return { mood: 'sparkle', look: [1, 0] }
    return { mood: 'heart', look: [1, 0] }
  }

  function drawForest(t, dim) {
    BACK.forEach((b, i) => tree(x, t, { ...b, k: pop01(t, T.grow + 0.05 * i, 0.5, 1.6), dim: 0.45 + 0.4 * dim }))
    // the forest floor
    x.fillStyle = 'rgba(14,30,28,0.98)'; x.fillRect(0, FLOOR - 40, 1080, 1920 - FLOOR + 40)
    x.beginPath(); x.moveTo(0, FLOOR - 40); for (let px = 0; px <= 1080; px += 40) x.lineTo(px, FLOOR - 40 + Math.sin(px * 0.03) * 8); x.strokeStyle = rgba(LEAF[0], 0.8); x.lineWidth = 5; x.shadowColor = LEAF[0]; x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0
    FRONT.forEach((f, i) => tree(x, t, { ...f, k: pop01(t, T.grow + 0.35 + 0.12 * i, 0.55, 1.6), dim: 0.7 * dim }))
    // Pisces hugging the front-right tree, sobbing
    const pk = pop01(t, T.hugger, 0.4, 2.2)
    if (pk > 0) {
      const ps = t < T.heart ? { mood: 'squint', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }
      const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, glyph: null, mood: ps.mood, look: ps.look, hops: PI_HOPS, seed: 11, pop: pk, alpha: 1 - 0.5 * dim, squash: 0.06 * Math.sin(t * 9) })
      if (dim < 0.5) tears(x, t, PIS_P.x, r.y, PIS_P.s, t > T.heart ? 2 : 1)
      tag(x, PIS_P.x - 70, PIS_P.y - 120, 'TREE HUGGER', pk * outK(t, [T.h0Out[0], T.h0Out[1]]) * (t < T.cut2 ? 1 : 0), { size: 30, bar: '#8fe3ff', col: '#cfeeff' })
    }
    fireflies(x, t, { a: 1 - 0.5 * dim })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = 1 - ease.inCubic(prog(t, ...T.out))
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.88, 1, o), lerp(0.88, 1, o)); x.translate(-540, -1000)
        const dim = t < T.cut2 ? ease.inOutQuad(prog(t, ...T.dim)) : 0
        drawForest(t, dim)
        // the tree tags (rule of three)
        if (t < T.cut1) TAG_TXT.forEach(([txt, col], i) => {
          const k = pop01(t, T.tags[i], 0.3, 2.6) * outK(t, T.h1Out)
          tag(x, [230, 560, 735][i], [1020, 930, 1080][i], txt, k, { size: 34, bar: col, col, rot: [-0.05, 0.04, -0.03][i] })
        })
        // falling card backs, like leaves
        if (inR(t, T.fall[0], T.cut2)) {
          for (const { i, x0, land, ph, w } of LEAVES) {
            const t0 = T.fall[0] + i * 0.22
            if (t < t0) continue
            const p = clamp((t - t0) / 1.9)
            const px = x0 + Math.sin(p * 7 + ph) * 70, py = lerp(-160, land, ease.inOutQuad(p))
            const rot = p < 1 ? 0.6 * Math.sin(p * 8 + ph) : 0.3 * Math.sin(ph)
            const sx = p < 1 ? Math.cos(p * 9 + ph) : 1
            drawCard(x, back, px, py, w, rot, Math.abs(sx) < 0.15 ? 0.15 * Math.sign(sx || 1) : sx, 1 - 0.4 * prog(t, T.h3, T.h3 + 0.4))
          }
        }
        // the big card: falls in, lands, flips to the mystery card
        if (inR(t, T.big[0], T.cut2)) {
          const p = prog(t, ...T.big)
          const py = lerp(-500, CARD_P.y, ease.outCubic(p)) + 8 * Math.sin((t - T.big[1]) * 2.2) * clamp(t - T.big[1])
          const rot = lerp(0.5, -0.04, ease.outCubic(p))
          const fp = prog(t, ...T.flip), sx = Math.cos(Math.PI * fp)
          // aura behind once flipped
          const ak = ease.outCubic(prog(t, T.flip[1] - 0.1, T.flip[1] + 0.5))
          if (ak > 0) {
            x.save(); x.globalCompositeOperation = 'lighter'
            const g = x.createRadialGradient(CARD_P.x, CARD_P.y, 40, CARD_P.x, CARD_P.y, 520)
            g.addColorStop(0, rgba('#ff6fa8', 0.5 * ak)); g.addColorStop(0.5, rgba('#b45cf0', 0.2 * ak)); g.addColorStop(1, rgba('#7c74f0', 0))
            x.fillStyle = g; x.fillRect(0, CARD_P.y - 520, 1080, 1040); x.restore()
          }
          drawCard(x, fp < 0.5 ? back : face, CARD_P.x, py, CARD_P.w, rot, Math.max(0.02, Math.abs(sx)))
          sparkle(x, CARD_P.x, CARD_P.y, t, T.flip[1], { n: 18, R: 420, seed: 31, size: 30 })
          sparkle(x, CARD_P.x, CARD_P.y + 200, t, T.big[1], { n: 12, R: 300, seed: 32, size: 24 })
        }
        // the end: Virgo rolls in under the canopy; trine chip, gold line, heart
        if (t >= T.cut2) {
          const vx = lerp(1300, 720, ease.outCubic(prog(t, ...T.virgo)))
          const lk = ease.outCubic(prog(t, ...T.line))
          if (lk > 0) {
            x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.shadowColor = GOLD; x.shadowBlur = 30; x.lineCap = 'round'
            x.beginPath(); x.moveTo(380 + 120, SY + 10); x.lineTo(lerp(500, 720 - 120, lk), SY + 10); x.stroke(); x.restore()
          }
          tag(x, 550, SY - 200, 'EARTH + EARTH · TRINE', pop01(t, T.trine, 0.3, 2.4), { size: 32, bar: GOLD, col: GOLD })
          const hk = pop01(t, T.heart, 0.45, 3), beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
          if (hk > 0) { x.save(); x.translate(550, SY - 330); heart(x, 72 * hk * beat, PINK, clamp(hk * 2)); x.restore() }
          sparkle(x, 550, SY - 330, t, T.heart, { n: 16, R: 300, seed: 61, size: 30, cols: [PINK, GOLD, '#fff3e0', MINT] })
          const vm = t < T.l4 ? { mood: 'squint', look: [-1, 0] } : t < T.heart ? { mood: 'happy', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }
          drawStarChar(x, vx, SY, SZ, t, { color: VIR.color, glyph: VIR.glyph, mood: vm.mood, look: vm.look, hops: VI_HOPS, seed: 9 })
        }
        // Taurus
        const tm = taurusMood(t)
        drawStarChar(x, taurusX(t), SY, SZ, t, { color: TAU_S.color, glyph: TAU_S.glyph, mood: tm.mood, look: tm.look, hops: TA_HOPS, seed: 3, pop: pop01(t, T.taurus[0], 0.4, 2.2), squash: 0.12 * bump(t, T.big[1], 0.35) })
        // THE STARS drop through the canopy
        if (inR(t, T.starsDown[0], T.cut2)) {
          const sp = easeOutBack(prog(t, ...T.starsDown), 1.4)
          const sm = t < T.l3 ? { mood: 'squint', look: [-1, 1] } : t < T.smitten ? { mood: 'happy', look: [-1, 1] } : { mood: 'wink', look: [-1, 1] }
          drawStarChar(x, 890, lerp(-200, 700, sp), 175, t, { color: STAR.sky, glyph: null, mood: sm.mood, look: sm.look, hops: S_HOPS, seed: 2 })
        }
        sparkle(x, 540, 470, t, T.h0Land + 0.2, { n: 16, R: 400, seed: 9, size: 28, cols: [MINT, GOLD, PINK, '#fff3e0'] })
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell written in G major: home key)
const NOTE = [392, 440, 493.88, 523.25, 587.33, 659.25, 739.99]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 783.99, 0.05, 0], ['pluck', land, 783.99, 0.04, 0.6, 0]]
export const CUES = [
  ...head(T.h0, 5, T.h0Land, 0), ['glitter', T.h0Land, T.h0Land + 0.8],
  ...[0, 1, 2].map(i => ['pluck', +(T.grow + 0.45 + 0.12 * i).toFixed(3), [392, 493.88, 587.33][i], 0.04, 0.6, [-0.4, 0, 0.4][i]]), ['whoosh', T.grow, 1.2, 0.03],
  ['whoosh', T.taurus[0], 0.6, 0.03], ['pop', T.taurus[1], 587.33, 0.045, -0.2],
  ['pop', T.hugger, 659.25, 0.035, 0.6],
  ...head(T.h1, 5, T.h1Land, 2),
  ...T.tags.flatMap((s, i) => [['whoosh', s - 0.25, 0.25, 0.03], ['tick', s, 0.05], ['pop', s + 0.02, [783.99, 880, 659.25][i], 0.04, [-0.4, 0.1, 0.4][i]]]),
  ...head(T.h2, 5, T.h2Land, 1),
  ['whoosh', T.starsDown[0], 0.8, 0.04], ['pop', T.starsDown[1], 987.77, 0.045, 0.5],
  ['riser', T.fall[0], T.big[1], 0.035], ...Array.from({ length: 11 }, (_, i) => ['tick', +(T.fall[0] + 0.3 + i * 0.22).toFixed(3), 0.02]),
  ['boom', T.big[1], 0.1], ['pop', T.big[1], 587.33, 0.045, 0],
  ...wordPops(T.h3, 4, 0.07, 3),
  ['whoosh', T.flip[0], 0.4, 0.045], ['bell', T.flip[1], 783.99, 0.05, 1.8, 0], ['glitter', T.flip[1], T.flip[1] + 0.8],
  ['bell', T.smitten, 1567.98, 0.03, 1.2, -0.3],
  ...head(T.h4, 5, T.h4Land, 0),
  ['whoosh', T.virgo[0], 0.6, 0.03], ['pop', T.virgo[1], 739.99, 0.045, 0.4],
  ['tick', T.trine, 0.05], ['bell', T.line[1], 987.77, 0.04, 1.6, 0],
  ['bell', T.heart, 783.99, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1174.66, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ...talkCues(LINES, { cps: CPS, pitch: { [TA_TAG]: 659.25, [S_TAG]: 739.99, [VI_TAG]: 987.77 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
