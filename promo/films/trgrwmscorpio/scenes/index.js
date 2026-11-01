// trgrwmscorpio: GET READY WITH ME, Scorpio: "Mystery: *cancelled*." (30 s vertical, Star Talk Trends §4, music: pop · E)
// Story 0–25.6, then the shared end card. The format look lives in ./grwm.js (identical in all five GRWM films).
//   0.0–6.9    "The mysterious | *look.*"  7:10 PM. ♏ Scorpio clicks the ring light to MOODY (the room goes violet):
//              "tonight I reveal nothing." On the drop, the sunglasses slide on (glint). "LOOK #1: brooding".
//              "they'll wonder about me for weeks."
//   7.0–13.7   "Look #2. | *Enigma.*"  7:25. Scorpio poses… and keeps sneaking glances at the phone: the shades slide down
//              the nose, the eyes flick down, back up. A "phone checks" counter ticks up. "I am a closed book. a locked one."
//  13.9        card cut.
//  14.0–20.2   "Fully | *unreadable.*"  7:50. Phone checks: 14. Fog rolls in; only the shades show above it.
//              THE STARS: "mysterious. you checked your phone 14 times." Scorpio: "that was… research." (15, 16.)
//  20.2–22.3   the turn: the phone buzzes; the date's text: "can't stop smiling about tonight. see you soon!" Scorpio
//              GRINS; the shades fly off, the fog clears, the ring light snaps back to warm.
//  22.3–25.5   "Mystery: | *cancelled.*"  Heart eyes, blushing. Sticker: "LOOK #4: smitten".
// One canvas (room + props + stars), DOM type + dialogue box + bug + clock, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, LAV, FONTS, pop01, outK, popOut, sparkles, starFrame, inSprite, tearsCells,
  buildBug, buildClock, drawRoom, drawTable, drawNotif, drawSticker, drawShades, WIN, TABLE_Y,
} from './grwm.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const SCO = signStar('scorpio'), PIS = signStar('pisces')
const ACC = '#ff6f8f'

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.15, h0Land: 0.75, h0Out: [6.7, 6.9],
  scoIn: 0.3, moody: [0.95, 1.25], shades: [2.82, 3.12], look1: 3.4,
  h1: 7.0, h1Out: [13.45, 13.65], look2: 7.3, look3: 10.0,
  cut: 13.9,
  h2: 14.0, h2Out: [20.05, 20.25], fog: [15.4, 16.4], starsIn: 14.1, starsOut: [20.0, 20.3],
  buzz: [20.25, 20.55], notif: 20.6, notifOut: [22.3, 22.6], grin: 20.95, clear: [20.95, 21.4], heart: 21.6,
  h3: 22.45, h3Land: 23.05, smitten: 23.5,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
// the sneaky phone checks (the shades slide down, the eyes flick to the phone)
const CHECKS = [8.3, 9.25, 10.45, 11.25, 11.85, 12.35, 12.75, 13.1, 18.6, 19.3]
const CHECK_LEN = 0.32
const COUNT = [[8.3, 1], [9.25, 2], [10.45, 3], [11.25, 4], [11.85, 5], [12.35, 6], [12.75, 7], [13.1, 8], [T.h2 + 0.15, 14], [18.6, 15], [19.3, 16]]
const SSP = `${SCO.glyph}︎ SCORPIO`, SPEAK = 'THE STARS'
const LINES = [
  { t: 1.4, speaker: SSP, color: ACC, text: 'tonight I reveal *nothing.*' },
  { t: 4.3, speaker: SSP, color: ACC, text: "they'll wonder about me for *weeks.*" },
  { t: 9.6, speaker: SSP, color: ACC, text: 'I am a closed book. a *locked* one.' },
  { t: 14.4, speaker: SPEAK, text: 'mysterious. you checked your phone *14 times.*' },
  { t: 17.75, speaker: SSP, color: ACC, text: 'that was… *research.*' },
]
const CPS = 30
const BOX1 = { open: 1.25, close: 12.95 }, BOX2 = { open: 14.25, close: 20.5 }
const CLOCK = [[0, '7:10'], [T.h1, '7:25'], [T.h2, '7:50'], [T.notif, '7:54']]

// layout
const SCO_P = { x: 540, y: 960, s: 300 }
const STARS_P = { x: 940, y: 1170, s: 140 }
const PIS_P = { x: WIN.x + 120, y: WIN.y + 170, s: 120 }
const PHONE_X = 330

const SCO_HOPS = [T.scoIn + 0.3, ...talkHops(LINES, SSP, { cps: CPS }), T.grin, T.heart, T.h3Land]
const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
const checkAt = t => { for (const c of CHECKS) if (t >= c && t < c + CHECK_LEN) return Math.sin(Math.PI * (t - c) / CHECK_LEN); return 0 }
const moodyK = t => ease.inOutCubic(prog(t, ...T.moody)) * (1 - ease.inOutCubic(prog(t, ...T.clear)))

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }

  const root = el('div', { position: 'absolute', inset: 0, overflow: 'hidden', background: '#140c2c' }, stage)
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'The mysterious | *look.*', { top: 172, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Look #2. | *Enigma.*', { top: 178, size: 104, accentSize: 150, at: T.h1, gap: 0.1, accentColor: LAV })
  const H2 = popText(root, 'Fully | *unreadable.*', { top: 178, size: 104, accentSize: 146, at: T.h2, gap: 0.1, accentColor: '#b9b0ff' })
  const H3 = popText(root, 'Mystery: | *cancelled.*', { top: 172, size: 112, accentSize: 156, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { at: T.clock, keys: CLOCK, date: '8:00' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function pisces(t) {
    let tears = 1, mood = 'sparkle'
    if (t > T.h1) tears = 2
    if (t > T.grin) { tears = 3; mood = 'happy' }
    const P = { ...PIS_P, x: PIS_P.x + 6 * Math.sin(t * 0.9) }
    const opts = { color: PIS.color, mood, look: mood === 'happy' ? undefined : [1, 1], seed: 6, glow: 0.8, pop: pop01(t, 1.2, 0.4, 2), hops: [T.grin + 0.1, T.h3Land] }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(x, t, tears))
  }

  function scorpio(t) {
    const k = pop01(t, T.scoIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    const ck = checkAt(t)
    let mood = 'neutral', look = [0, 0]
    if (t > T.moody[0]) { mood = 'squint'; look = [1, 0] }
    if (t > T.look1) { mood = 'squint'; look = [-1, 0] }
    if (t > T.look2) { mood = 'neutral'; look = [1, 0] }
    if (ck > 0.2) { mood = 'wide'; look = [-1, 1] }
    if (t > T.buzz[0] && t < T.grin) { mood = 'wide'; look = [-1, 1] }
    if (t > T.grin) { mood = 'happy'; look = undefined }
    if (t > T.heart) mood = 'heart'
    if (t > T.h3Land) mood = 'happy'
    // pose sway: brooding lean (beat 0), over-the-shoulder turn (beat 1)
    const lean = t > T.look2 && t < T.cut ? 0.06 * Math.sin((t - T.look2) * 0.9) : 0
    const opts = { color: SCO.color, glyph: SCO.glyph, mood, look, hops: SCO_HOPS, pop: k, seed: 8, glow: 1.15, squash: lean + (t > T.grin && t < T.grin + 0.3 ? 0.12 : 0), blush: t > T.grin ? 1 : undefined }
    drawStarChar(x, SCO_P.x, SCO_P.y, SCO_P.s, t, opts)
    // the shades: slide on, slide down the nose on each check, fly off at the grin
    if (t > T.shades[0]) {
      const on = ease.outBack(prog(t, ...T.shades))
      const off = ease.inCubic(prog(t, T.grin, T.grin + 0.6))
      if (off < 1) inSprite(x, starFrame(SCO_P.x, SCO_P.y, SCO_P.s, t, opts), () => {
        x.save()
        const dy = lerp(-14, 0, on) + ck * 3.6 + (t > T.buzz[0] && t < T.grin ? 3.6 * clamp((t - T.buzz[0]) / 0.15) : 0)
        x.translate(18 + off * 30, 19 + dy - off * 24 + 40 * off * off); x.rotate(off * 2.4); x.translate(-18, -19)
        drawShades(x, { glint: t < T.shades[1] + 0.5 ? prog(t, T.shades[1], T.shades[1] + 0.4) : -1 })
        x.restore()
      })
    }
  }

  function fog(t) {
    const k = ease.inOutCubic(prog(t, ...T.fog)) * (1 - ease.inOutCubic(prog(t, ...T.clear)))
    if (k <= 0.01) return
    x.save()
    for (let i = 0; i < 26; i++) {
      const px = ((i * 97 + t * (20 + (i % 5) * 9)) % 1300) - 110, py = TABLE_Y - 40 - (i % 6) * 48 - 30 * Math.sin(t * 0.8 + i)
      const w = 160 + (i % 4) * 40, h = 48
      x.globalAlpha = k * (0.55 + 0.25 * Math.sin(i + t))
      x.fillStyle = i % 3 ? '#cbbcf2' : '#e6dcff'
      x.fillRect(Math.round(px / 8) * 8, Math.round(py / 8) * 8, w, h)
      x.fillRect(Math.round(px / 8) * 8 + 16, Math.round(py / 8) * 8 - 16, w - 32, 16)
    }
    x.restore()
  }

  function theStars(t) {
    const k = pop01(t, T.starsIn, 0.36, 2.1) * outK(t, T.starsOut)
    if (k <= 0.02) return
    const mood = t > LINES[4].t + 0.8 ? 'eyeroll' : 'neutral'
    drawStarChar(x, STARS_P.x, STARS_P.y + (1 - k) * 80, STARS_P.s, t, { color: STAR.sky, mood, look: mood === 'eyeroll' ? undefined : [-1, -0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      const m = moodyK(t)
      drawRoom(x, t, { moody: m * 0.85, ring: lerp(1, 0.75, m), ringCol: m > 0.5 ? '#b47cff' : '#fff1d6', inWindow: (_, tt) => pisces(tt) })
      scorpio(t)
      fog(t)
      drawTable(x, t, { phone: { cx: PHONE_X, buzz: T.buzz } })
      // the phone lights up on each check
      const ck = checkAt(t)
      if (ck > 0) { x.fillStyle = `rgba(160,220,255,${0.55 * ck})`; x.fillRect(PHONE_X - 120, TABLE_Y - 42, 240, 10) }
      theStars(t)
      // stickers
      drawSticker(x, t, { at: T.moody[0], out: [T.h0Out[0], T.h0Out[0] + 0.2], text: 'lighting: *moody*', cx: 790, cy: 640, rot: 0.05, size: 38 })
      drawSticker(x, t, { at: T.look1, out: T.h0Out, text: 'LOOK #1: *brooding*', cx: 540, cy: 1205, rot: -0.03, size: 40 })
      drawSticker(x, t, { at: T.look2, out: [T.look3 - 0.2, T.look3], text: 'LOOK #2: *enigma*', cx: 540, cy: 1205, rot: 0.03, size: 40 })
      drawSticker(x, t, { at: T.look3, out: T.h1Out, text: 'LOOK #3: *unreadable*', cx: 540, cy: 1205, rot: -0.03, size: 40 })
      COUNT.forEach(([a, n], i) => {
        const nx = COUNT[i + 1] && COUNT[i + 1][0] < T.h2Out[0] ? COUNT[i + 1][0] : null
        const end = nx ?? (a < T.cut ? T.h1Out[0] : T.h2Out[0])
        drawSticker(x, t, { at: a, out: nx ? [nx, nx + 0.01] : [end, end + 0.2], text: `phone checks: *${n}*`, cx: 800, cy: 640, rot: 0.05, size: 36, bg: '#fff1c8' })
      })
      drawNotif(x, t, { at: T.notif, out: T.notifOut, text: 'can’t stop smiling about tonight. see you soon!', cy: 560 })
      drawSticker(x, t, { at: T.smitten, out: T.out, text: 'LOOK #4: *smitten*', cx: 540, cy: 1540, rot: -0.04, size: 48 })
      sparkles(x, t, SCO_P.x, SCO_P.y - 40, T.grin, 12, 210, 1, [GOLD, BONE, ACC])
      if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, SCO_P.x, SCO_P.y - 40, T.heart, 10, 200, 3, ['#ff4f86', BONE, GOLD])
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, the time skip from 7:25 to 7:50)
const CUTS = [6.95, { t: T.cut, kind: 'flip' }, 20.22]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => [...Array.from({ length: 7 }, (_, i) => ['tick', +(t0 + i * 0.045).toFixed(3), 0.05]), ['tom', t0, 70, { gain: 0.12, decay: 0.2 }]]
export const CUES = [
  ...wordPops(T.h0, 2, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.scoIn + 0.05, 880, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock + 0.05, 0.04],
  ['tick', T.moody[0], 0.08], ['tom', T.moody[0] + 0.02, 90, { gain: 0.15, decay: 0.3 }],
  ['whoosh', T.shades[0], 0.3, 0.04], ['pluck', T.shades[1], 2349.32, 0.035, 0.5, 0.2], ['glitter', T.shades[1], T.shades[1] + 0.3],
  ...[T.look1, T.look2, T.look3].map((a, i) => ['pop', a, NOTE[i * 2 + 1], 0.035, 0]),
  ['tick', T.h1, 0.06], ...wordPops(T.h1, 3, 0.1, 2, 0.024),
  ...CHECKS.flatMap((c, i) => [['tick', c, 0.04], ['pop', c + 0.05, NOTE[(i * 3) % 7] * 2, 0.02, -0.4]]),
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.h2, 0.06], ...wordPops(T.h2, 2, 0.1, 1, 0.024), ['pop', T.h2 + 0.15, 1318.51, 0.04, 0.3],
  ['riser', T.fog[0], T.fog[1] + 0.6, 0.025], ['pop', T.starsIn + 0.05, 739.99, 0.04, 0.4],
  ...buzz(T.buzz[0]), ...buzz(T.buzz[1]), ['pop', T.notif + 0.05, 1174.66, 0.05, 0], ['bell', T.notif + 0.15, 1760, 0.03, 1.0, 0],
  ['pop', T.grin, 1567.98, 0.05, 0], ['whoosh', T.grin + 0.05, 0.45, 0.045], ['tick', T.clear[0] + 0.1, 0.08], ['glitter', T.grin, T.grin + 0.5],
  ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ...wordPops(T.h3, 1, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0], ['bell', T.h3Land + 0.05, 1760, 0.035, 1.2, 0],
  ['pop', T.smitten, 1318.51, 0.035, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
