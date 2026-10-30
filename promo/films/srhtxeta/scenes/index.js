// srhtxeta (20 s vertical, Star Talk Remix of htxeta "10 minutes away.") · story 0–15.6, then the shared end card.
// THE STARS (the gold narrator star) waits with you; ♓ Pisces waits too (and cries, as always).
//   0.00–4.62  "“10 minutes | *away.*”"  His texts pop in on the beat and push the thread up, the timestamps jump
//              (6:40 → 8:20 PM) and the wall clock ticks round: "5 min" · "almost there!" · "parking" · "ok 10 more min".
//              The star starts excited (happy hops), then squints. Box: "babe. we've been waiting since *6:40*."
//              On "ok 10 more min" it does a double take + eye-roll; Pisces bursts into tears.
//   4.62–9.32  "*Houston* | minutes."  The thread whooshes away, the clock races (smear), the star nods off (sleepy z's)
//              and a pixel cobweb (with a tiny spider) grows on it. Box: "he's not late anymore. he's *long-distance*."
//   9.32–13.1  (card cut 9.32) "Make the wait | *worth it.*"  The cobweb poofs, the star wakes. A phone rises, a card back
//              drops onto it and flips to a real talk card ("Morning person or night owl?"). Heart-eyes.
//              Box: "stop watching the door. ask something *real*."  A reply pops: "night owl. you?"
//   13.1–15.4  "Talk like | you *mean it.*"  Callback: "here!" (8:51 PM) finally pops in. Both stars hop, Pisces happy-cries.
//              Everything out by 15.42.
// One canvas (sky + props + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, bubble, clockFace, drawPhone, cobweb, rgba, BONE, GOLD, PINK, VIOLET, SUN, MINT, BLUE, CYAN } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)     // 108 bpm grid
const PIS = signStar('pisces')

// ── the timeline
const MSGS = [
  { t: 0.3, txt: '10 minutes away.', time: '6:40 PM', col: VIOLET, min: 40 },
  { t: BEAT(1), txt: '5 min', time: '7:05 PM', col: BLUE, min: 65 },
  { t: BEAT(2.5), txt: 'almost there!', time: '7:31 PM', col: MINT, min: 91 },
  { t: BEAT(4), txt: 'parking', time: '7:58 PM', col: SUN, min: 118 },
  { t: BEAT(5.5), txt: 'ok 10 more min', time: '8:20 PM', col: PINK, min: 140 },
]
const T = {
  h0: 0.1, h0Late: 0.5, h0Out: [4.44, 4.6],
  clock: 0.2, star: 0.35, pis: 0.8,
  open: 1.95, l1: 2.1,
  double: MSGS[4].t, roll: MSGS[4].t + 0.45,
  threadOut: [4.5, 4.75],
  h1: BEAT(7.5), h1Late: BEAT(8), h1Out: [9.1, 9.3],
  race: [4.7, 9.3], doze: 5.45, web: [5.9, 8.4], l2: 6.5,
  h2: 9.4, h2Late: 9.75, h2Out: [12.92, 13.1],
  wake: 9.45, phone: [9.5, 10.0], cardDrop: [9.95, 10.3], flip: [10.42, 10.68], l3: 10.05, heart: 10.68,
  reply: BEAT(20.5), close: 13.3,
  h3: 13.2, h3Late: 13.55, here: BEAT(25), cheer: BEAT(25) + 0.1,
  out: [15.0, 15.42], h3Out: [15.22, 15.42],
}
const SKY = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SKY, text: "babe. we've been waiting since *6:40*." },
  { t: T.l2, speaker: SKY, text: "he's not late anymore. he's *long-distance*." },
  { t: T.l3, speaker: SKY, text: 'stop watching the door. ask something *real*.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const SEAT = { x: 300, y: 1225, size: 290 }     // the gold star (hook + Houston minutes)
const SEAT2 = { x: 205, y: 1250, size: 250 }    // …slides left when the phone rises
const PSEAT = { x: 948, y: 1328, size: 150 }
const CLK = { x: 770, y: 1105, R: 150 }
const THREAD = { x: 80, y: 1010, step: 160 }    // newest bubble's bottom-left; older ones push up
const PH = { x: 610, y: 890, w: 520, h: 900 }

// clock minutes after 6:00 PM: follows the timestamps, then races through "Houston minutes", then settles at 8:51
function clockMin(t) {
  const K = [[0, 34], ...MSGS.map(m => [m.t, m.min])]
  if (t <= K[K.length - 1][0]) {
    let i = 0
    while (i < K.length - 2 && t > K[i + 1][0]) i++
    const [t0, m0] = K[i], [t1, m1] = K[i + 1]
    return lerp(m0, m1, ease.inOutCubic(prog(t, t0, t1)))
  }
  return 140 + ease.inOutQuad(prog(t, MSGS[4].t + 0.3, T.race[1])) * 60 * 7
}

const SKY_HOPS = [T.star + 0.3, 0.75, 1.25, ...talkHops(LINES, SKY, { cps: CPS }).filter(h => h < T.doze || h > T.wake), T.reply + 0.05, T.here + 0.1, T.here + 0.65, T.here + 1.2]
const PIS_HOPS = [T.pis + 0.3, T.heart + 0.1, T.here + 0.15, T.here + 0.75, T.here + 1.3]

function skyState(t) {
  if (t < 1.2) return { mood: 'happy' }
  if (t < MSGS[2].t) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.double) return { mood: 'squint', look: [-1, -1] }
  if (t < T.roll) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.h1) return { mood: 'eyeroll' }
  if (t < T.doze) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.wake) return { mood: 'sleepy' }
  if (t < T.heart) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.reply) return { mood: 'heart' }
  if (t < T.here) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'happy' }
}
function pisState(t) {
  if (t < T.double) return { mood: 'happy', tears: 0 }
  if (t < T.h1) return { mood: 'squint', tears: 2 }
  if (t < T.wake) return { mood: 'squint', tears: 3 }
  if (t < T.heart) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.here) return { mood: 'heart', tears: 0 }
  return { mood: 'happy', tears: 3 }
}

async function build(stage) {
  try {
    await Promise.all(["800 116px Inter", "800 60px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [back, talk] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-2.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, '“10 minutes | *away.”*', { top: 150, size: 116, accentSize: 156, at: T.h0, gap: 0.08, accentColor: VIOLET, wobble: true, late: 1, lateAt: T.h0Late })
  const H1 = popText(root, '*Houston* | minutes.', { top: 170, size: 150, accentSize: 190, at: T.h1, gap: 0.08, accentColor: SUN, wobble: true, late: 1, lateAt: T.h1Late, lineHeight: 0.98 })
  const H2 = popText(root, 'Make the wait | *worth* *it.*', { top: 150, size: 108, accentSize: 140, at: T.h2, gap: 0.07, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Late, lateGap: 0.12 })
  const H3 = popText(root, 'Talk like | you *mean* *it.*', { top: 150, size: 116, accentSize: 150, at: T.h3, gap: 0.07, accentColor: PINK, wobble: true, late: 2, lateAt: T.h3Late, lateGap: 0.12 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── the thread: newest at THREAD.y, each new one pushes the rest up by one step (eased); fades near the headline
  function drawThread(t) {
    const out = prog(t, ...T.threadOut)
    if (out >= 1) return
    let n = 0
    for (const m of MSGS) if (t >= m.t) n++
    if (!n) return
    const push = i => ease.outBack(prog(t, MSGS[i].t, MSGS[i].t + 0.3), 1.4)
    for (let i = 0; i < n; i++) {
      // how many newer bubbles have pushed this one up (fractional while animating)
      let up = 0
      for (let j = i + 1; j < n; j++) up += push(j)
      const by = THREAD.y - up * THREAD.step - ease.inCubic(out) * 1400
      const a = clamp((by - 470) / 140) * (1 - out)
      if (a <= 0.01) continue
      const k = pop01(t, MSGS[i].t, 0.32, 2.2)
      const shake = i === 4 && t < MSGS[4].t + 0.5 ? 8 * Math.sin((t - MSGS[4].t) * 60) * (1 - prog(t, MSGS[4].t, MSGS[4].t + 0.5)) : 0
      bubble(x, THREAD.x + shake, by, MSGS[i].txt, { size: 60, k, a, col: MSGS[i].col, stamp: MSGS[i].time })
    }
  }

  function drawClock(t, ok) {
    // hook: on the wall at CLK; Houston minutes: grows + races; gone under the 9.32 cut
    if (t > 9.33) return
    const ck = pop01(t, T.clock, 0.45, 2.0) * ok
    if (ck <= 0.01) return
    const g = ease.inOutCubic(prog(t, T.h1, T.h1 + 0.5))
    const cx = lerp(CLK.x, 700, g), cy = lerp(CLK.y, 860, g), R = lerp(CLK.R, 220, g)
    const racing = clamp((t - T.race[0]) / 0.6) * (1 - prog(t, T.race[1] - 0.4, T.race[1]))
    const bounce = t > 0.6 ? 1 + 0.035 * Math.exp(-(((t - 0.6) % 0.5556) * 10)) : 1
    const shake = racing > 0 ? 0.05 * racing * Math.sin(t * 60) : 0
    clockFace(x, cx, cy, R, clockMin(t), { k: ck * bounce, blur: racing, rot: shake })
  }

  function drawPisces(t, ok) {
    const pp = pop01(t, T.pis, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, PSEAT.x, PSEAT.y, PSEAT.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    const F = starFrame(PSEAT.x, PSEAT.y, PSEAT.size, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
  }

  function drawSkyStar(t, ok) {
    const sp = pop01(t, T.star, 0.38, 2.2) * ok
    if (sp <= 0.02) return
    const st = skyState(t)
    const mv = ease.inOutCubic(prog(t, T.phone[0] - 0.1, T.phone[1]))
    const sx = lerp(SEAT.x, SEAT2.x, mv), sy = lerp(SEAT.y, SEAT2.y, mv), size = lerp(SEAT.size, SEAT2.size, mv)
    let squash = 0
    if (t >= T.double && t < T.double + 0.4) squash = -0.18 * Math.exp(-(t - T.double) * 7) * Math.cos((t - T.double) * 24)
    if (t >= T.wake && t < T.wake + 0.4) squash += -0.2 * Math.exp(-(t - T.wake) * 7) * Math.cos((t - T.wake) * 24)
    // dozing: slow sag + a nod on every other beat
    const dozing = t >= T.doze && t < T.wake
    if (dozing) squash += 0.06 + 0.04 * Math.sin((t - T.doze) * 2.6)
    const opts = { hops: dozing ? null : SKY_HOPS, seed: 3, pop: sp, squash, bob: dozing ? 3 : undefined }
    const r = drawStarChar(x, sx, sy, size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
    const F = starFrame(sx, sy, size, t, opts)
    if (t >= MSGS[3].t && t < T.h1) inSprite(x, F, () => sweatCells(x, t))
    // the cobweb grows on its upper-left while it dozes; poofs at the wake
    const wg = ease.outCubic(prog(t, ...T.web))
    if (t < T.wake && wg > 0) cobweb(x, sx - size * 0.5, sy - size * 0.42, size * 0.48, wg, t, 1)
    if (t >= T.wake) sparkles(t, sx - size * 0.25, sy - size * 0.2, T.wake, 10, 130, 2, [BONE, GOLD, CYAN])
    return r
  }

  function drawPhoneBeat(t, ok) {
    const pk = ease.outBack(prog(t, ...T.phone), 1.3)
    if (pk <= 0 || t < T.phone[0]) return
    const cy = lerp(1920 + PH.h / 2, PH.y, pk)
    const scr = drawPhone(x, PH.x, cy, PH.w, PH.h, ok)
    // the card: back drops in, then flips (squash on x) to the talk card
    const cw = scr.w - 30, chh = cw * 1170 / 732
    const ccx = PH.x, ccy = cy - 40
    const dp = prog(t, ...T.cardDrop)
    if (dp > 0) {
      const land = easeOutBack(dp, 1.6)
      const yy = lerp(ccy - 700, ccy, land)
      const fp = prog(t, ...T.flip)
      const sx = Math.abs(Math.cos(Math.PI * fp))
      const img = fp < 0.5 ? back : talk
      x.save(); x.globalAlpha *= ok; x.translate(ccx, yy); x.scale(Math.max(0.02, sx), 1)
      x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 30
      if (img) x.drawImage(img, -cw / 2, -chh / 2, cw, chh)
      x.restore()
      if (t >= T.flip[1]) {
        // glow ring behind on the flip
        const gk = 1 - prog(t, T.flip[1], T.flip[1] + 1.2)
        if (gk > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * gk * ok; x.strokeStyle = GOLD; x.lineWidth = 10; x.shadowColor = GOLD; x.shadowBlur = 30; x.strokeRect(ccx - cw / 2 - 6, yy - chh / 2 - 6, cw + 12, chh + 12); x.restore() }
      }
    }
    // the reply, then the callback "here!"
    const rk = pop01(t, T.reply, 0.32, 2.2)
    if (rk > 0) bubble(x, PH.x - PH.w / 2 + 30, cy + PH.h / 2 - 40, 'night owl. you?', { size: 50, k: rk, a: ok, col: MINT, stamp: '8:24 PM' })
    const hk = pop01(t, T.here, 0.32, 2.4)
    if (hk > 0) bubble(x, PH.x + PH.w / 2 + 10, cy - PH.h / 2 + 160, 'here!', { size: 64, k: hk, a: ok, col: GOLD, side: 1, stamp: '8:51 PM' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        drawClock(t, ok)
        drawThread(t)
        drawPhoneBeat(t, ok)
        drawPisces(t, ok)
        drawSkyStar(t, ok)
        // "ok 10 more min" hit: red-ish flash sparkles round the newest bubble
        sparkles(t, THREAD.x + 260, THREAD.y - 50, T.double, 10, 220, 1, [PINK, SUN, BONE])
        sparkles(t, PH.x, PH.y - 40, T.flip[1], 14, 300, 3, [GOLD, PINK, BONE])
        if (t > T.heart && t < T.reply) {
          for (let i = 0; i < 6; i++) {
            const born = T.heart + i * 0.36, p = (t - born) / 1.3
            if (p < 0 || p >= 1) continue
            const hx = (i % 2 ? PSEAT.x : SEAT2.x) + Math.sin(p * 6 + i) * 30, hy = (i % 2 ? PSEAT.y - 80 : SEAT2.y - 140) - p * 220
            x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, hx, hy, 22, 2, PINK); x.restore()
          }
        }
        if (t >= T.cheer) sparkles(t, 540, 1150, T.cheer, 14, 400, 4, [MINT, GOLD, PINK, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.62 (thread → Houston minutes), 9.32 (→ the phone), 13.12 (→ Talk like you mean it).
// cardfx keeps one for a 20 s film: the 9.32 deal (the film flips its own talk card right after, so not a flip).
const CUTS = [4.62, { t: 9.32, kind: 'deal' }, 13.12]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 698.46, 880, 932.33, 1174.66, 1318.51]   // D minor-ish
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const ding = (t, i) => [['pluck', t, 1318.51, 0.045, 0.4, -0.3], ['pluck', +(t + 0.08).toFixed(3), 1760, 0.035 + i * 0.004, 0.4, -0.3], ['tick', t, 0.04]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const snore = t => [['chip', t, 160, 0.5, { ...FX, wave: 'tri', slide: 3, gain: 0.03, decay: 0.3, sustain: 0.6 }], ['chip', +(t + 0.62).toFixed(3), 240, 0.4, { ...FX, wave: 'tri', slide: -5, gain: 0.02, decay: 0.25, sustain: 0.5 }]]
const ticks = (t0, t1, gap) => { const o = []; for (let s = t0; s < t1; s += gap) o.push(['tick', +s.toFixed(3), 0.03]); return o }
const fastTicks = (t0, t1) => { const o = []; let s = t0, g = 0.25; while (s < t1) { o.push(['tick', +s.toFixed(3), 0.025]); s += g; g = Math.max(0.07, g * 0.9) } return o }
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: the thread
  ...wordPops(T.h0, 2, 0.08, 0, 0.026), ['pop', T.h0Late, 880, 0.05, 0],
  ['pop', T.clock + 0.05, 587.33, 0.035, 0.3], ['pop', T.star + 0.05, 698.46, 0.04, -0.2], ['pop', T.pis + 0.05, 932.33, 0.035, 0.4],
  ...MSGS.flatMap((m, i) => ding(m.t, i)), ...ticks(0.6, 4.5, 0.5556),
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SKY]: 700 } }),
  // the double take + Pisces
  ['boom', T.double, 0.1], ['pluck', T.double + 0.05, 466.16, 0.04, 0.5, 0], ['whoosh', T.roll, 0.3, 0.04],
  ...sob(T.double + 0.2, 1400), ...sob(T.double + 0.8, 1320, 2),
  // Houston minutes: the thread whooshes away, the clock races, the star dozes
  ['whoosh', T.threadOut[0], 0.35, 0.07], ...head(T.h1, 1, 0.08, T.h1Late, 3), ['glitter', T.h1Late, T.h1Late + 0.5],
  ['riser', T.race[0] + 0.3, 8.9, 0.025], ...fastTicks(4.9, 8.9),
  ...snore(T.doze + 0.3), ...snore(7.7), ...sob(6.0, 1500, 3), ...sob(8.2, 1450, 2),
  // make the wait worth it
  ['pop', T.wake, 1174.66, 0.045, -0.2], ['glitter', T.wake, T.wake + 0.5],
  ...head(T.h2, 3, 0.07, T.h2Late, 1), ['pop', T.h2Late + 0.12, 1318.51, 0.04, 0],
  ['whoosh', T.phone[0], 0.4, 0.06], ['whoosh', T.cardDrop[0], 0.25, 0.05], ['pop', T.cardDrop[1], 880, 0.04, 0],
  ['whoosh', T.flip[0], 0.18, 0.05], ['bell', T.flip[1], 1318.51, 0.045, 1.8, 0], ['glitter', T.flip[1], T.flip[1] + 0.7],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['pluck', T.heart + 0.1, 1567.98, 0.035, 0.5, 0.3],
  ...ding(T.reply, 3),
  // talk like you mean it + here!
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...head(T.h3, 2, 0.07, T.h3Late, 2), ['pop', T.h3Late + 0.12, 1318.51, 0.05, 0],
  ...ding(T.here, 5), ['bell', T.here + 0.1, 1760, 0.035, 1.4, 0.3],
  ...cheers(T.cheer, T.cheer + 1.5), ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
