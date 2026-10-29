// st8morning (45 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E14) · story 0–40.6, then the end card.
//   Genre: a dawn reveal (sunrise cam + a makeover-show BEFORE / AFTER), then a therapy session. The real sky: after
//   passing between Earth and the Sun (inferior conjunction), Venus leaves the evening sky and comes back in the
//   morning sky, before sunrise in the east: the "Morning Star".
//   0.00–2.60  FRAME 0: the eastern horizon before dawn, Venus rising with her new gold rim, the Moon on the hill
//              pointing, wide-eyed. Hook: "She's back. | And she's *different.*"  SUNRISE CAM bug, clock 5:41 AM.
//   2.70       MOON: "Venus?? you were *gone.*" → VENUS: "i passed between Earth and the Sun. *lost in the glare.*"
//              Fact chip: VENUS RETURNS IN THE MORNING SKY.
//   9.70       BEFORE / AFTER wipe: EVENING STAR (dim, retro arrow, sunset) | MORNING STAR (gold rim, sunrise).
//  12.90       Dr. Moon's office: armchair, notepad, tissues, the rear-view mirror. MOON: "so. how was the *retrograde?*"
//              → VENUS: "i kept checking the mirror. *every ex.*" → MOON: "and *now?*" → VENUS: "i kept looking back.
//              now i'm up *early.*" → MOON: "growth looks *good* on you." (honk) → VENUS hands over the mirror: "keep
//              this. i don't need the *rearview.*"  Rewatch bait: the diploma ("8 PHASES OF LISTENING") and the wall
//              clock, which runs backwards until she gives up the mirror. Ghost behind the armchair; comet in the window.
//  ~32.4       back on the hill (the frame-0 framing, changed): full sunrise, Venus high and gold, the Moon with a mug.
//  ~34.9       "Same star. | *New* morning."  Plain sky at 40.6, end card.
// One canvas (sky + scenes + cast), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { VENUS, drawVenus, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { pop01, outK, popOut, r3, R, glow, burst, monoText, seq, wordPops, flash, chip, lowerThird, hiddenComet, rgba, GOLD, BONE, INK, PINK, NOTE } from '../kit.js'

export const DURATION = 45
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff', DAWN = '#ffcf6e'
const DAY = { day: 25, phase: 'morning' }
const MOON = '☽ THE MOON', VEN = VENUS.tag
const CPS = 28

// ── the script
const S1 = seq(2.7, [
  { who: MOON, x: 'Venus?? you were *gone.*', color: MOONLIGHT, hold: 1.5 },
  { who: VEN, x: 'i passed between Earth and the Sun. *lost in the glare.*', color: '#ffb3d1', hold: 1.6 },
])
const S2 = seq(13.3, [
  { who: MOON, x: 'so. how was the *retrograde?*', color: MOONLIGHT, hold: 2.0 },
  { who: VEN, x: 'i kept checking the mirror. *every ex.*', color: '#ffb3d1', hold: 2.0 },
  { who: MOON, x: 'and *now?*', color: MOONLIGHT, hold: 1.8 },
  { mark: 'early' },
  { who: VEN, x: 'i kept looking back. now i’m up *early.*', color: DAWN, hold: 2.2 },
  { mark: 'growth' },
  { who: MOON, x: 'growth looks *good* on you.', color: MOONLIGHT, hold: 2.0 },
  { mark: 'keep' },
  { who: VEN, x: 'keep this. i don’t need the *rearview.*', color: '#ffb3d1', hold: 2.0 },
])
const L1 = S1.lines, L2 = S2.lines, ALL = [...L1, ...L2], M = S2.marks
const T = {
  hookOut: 2.6, close1: r3(S1.end - 0.05), fact: 7.4,
  ba: [r3(S1.end + 0.05), r3(S1.end + 3.2)],
  office: r3(S1.end + 3.2), close2: r3(S2.end - 0.05),
  early: M.early, honk: r3(M.growth + 0.4), hand: r3(M.keep + 0.4),
  hill: r3(S2.end + 0.05), last: r3(S2.end + 2.6), out: [40.05, 40.45],
}
T.ghost = r3(T.office + 2.2)
T.comet = r3(T.office + 6.0)
export const TIMES = T

// ── layout
const HILL = { y: 1360 }
const MOONP = [250, 1250, 230], VENR = [690, 1330, 300]      // frame 0: the Moon on the hill, Venus on the horizon
const CHAIR = { x: 270, y: 1160 }, COUCHV = { x: 790, y: 1150 }
const OWIN = { x0: 420, x1: 660, y0: 560, y1: 780 }
export const GHOST = { at: T.ghost, x: CHAIR.x - 150, y: 1050, where: 'leaning out from behind Dr. Moon’s armchair in the therapy office' }
export const COMET = { at: T.comet, from: [650, 600], to: [440, 690] }

const MUG = ['.WWWW..', 'WCCCCWW', 'WCCCC.W', 'WCCCCWW', '.WWWW..']
const MUG_C = { W: '#efe6d6', C: '#6b3b2a' }
const PAD = ['WWWWWW', 'WkkkkW', 'WWWWWW', 'WkkkWW', 'WWWWWW', 'WkkkkW', 'WWWWWW']
const PAD_C = { W: '#fff6e2', k: '#7c74f0' }
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BbBBbB', 'BBBBBB']
const TISSUE_C = { W: '#ffffff', B: '#7fd0f0', b: '#5ab4d8' }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'She’s back. | And she’s *different.*', at: 0, out: T.hookOut, accentColor: DAWN })
  const box1 = dialogueBox(root, { lines: L1, y: 1480, width: 960, height: 290, cps: CPS, close: T.close1 })
  const box2 = dialogueBox(root, { lines: L2, y: 1480, width: 960, height: 290, cps: CPS, close: T.close2 })
  const LAST = popText(root, 'Same star. | *New* morning.', { top: 220, size: 118, accentSize: 196, at: T.last, gap: 0.09, accentColor: DAWN, wobble: true, late: 2, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const moonChar = (X, Y, S, t, o = {}) => drawStarChar(x, X, Y, S, t, { color: MOONC, glyph: '☽', seed: 6, glow: 0.8, ...o })
  /** the eastern horizon at dawn: k = how far the sunrise has come (0 = pre-dawn, 1 = sun up) */
  function horizon(t, k) {
    const g = x.createLinearGradient(0, 300, 0, HILL.y)
    g.addColorStop(0, 'rgba(255,140,170,0)'); g.addColorStop(0.3, `rgba(255,140,170,${0.05 + 0.25 * k})`); g.addColorStop(0.7, `rgba(255,170,120,${0.25 + 0.4 * k})`); g.addColorStop(1, `rgba(255,214,140,${0.55 + 0.4 * k})`)
    x.fillStyle = g; x.fillRect(0, 300, 1080, HILL.y - 300)
    // the Sun, still below the horizon, then peeking
    glow(x, 860, HILL.y + 40 - 120 * k, 520, '#ffb070', 0.6 + 0.6 * k)
    if (k > 0.5) { const sy = HILL.y + 60 - 160 * (k - 0.5) * 2; for (let yy = -8; yy <= 8; yy++) { const w = Math.round(Math.sqrt(64 - yy * yy)); if (sy + yy * 8 < HILL.y) R(x, '#ffe08a', 860 - w * 8, sy + yy * 8, w * 16, 8) } }
    // far hills + the near hill (the Moon's spot)
    x.fillStyle = '#3a2350'; x.beginPath(); x.moveTo(0, HILL.y); for (let i = 0; i <= 12; i++) x.lineTo(i * 90, HILL.y - 30 - 26 * Math.sin(i * 1.3)); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
    R(x, '#2a1840', 0, HILL.y + 10, 1080, 1920 - HILL.y)
    x.fillStyle = '#1e1030'; x.beginPath(); x.moveTo(0, 1320); x.quadraticCurveTo(260, 1200, 560, 1350); x.quadraticCurveTo(800, 1440, 1080, 1420); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill()
    monoText(x, 'E', 860, HILL.y + 50, { size: 26, color: rgba(DAWN, 0.8) })
  }
  function clockChip(t) {
    const hm = t < T.ba[0] ? 341 + Math.floor(t / 3) : t >= T.hill ? 372 : null
    if (hm === null) return
    const s = `${Math.floor(hm / 60)}:${String(hm % 60).padStart(2, '0')} AM · EASTERN SKY`
    chip(x, t, { at: t < T.ba[0] ? 0 : T.hill, out: t < T.ba[0] ? T.ba[0] : T.out[0], text: s, x: 1010, y: t < T.ba[0] ? 520 : 1480, size: 24, color: DAWN, border: DAWN, align: 'right', type: false })
  }
  function hillScene(t, end) {
    const k = end ? 0.6 + 0.4 * ease.outCubic(prog(t, T.hill, T.hill + 2)) : 0.15 + 0.1 * clamp(t / 9)
    horizon(t, k)
    // Venus: rising at frame 0 (clipped by the horizon), high and gold at the end
    const vy = end ? 820 : lerp(HILL.y - 120, HILL.y - 330, ease.outCubic(clamp(t / 5)))
    x.save(); x.beginPath(); x.rect(0, 0, 1080, HILL.y - 18); x.clip()
    glow(x, VENR[0], vy, 360, DAWN, 0.8)
    drawVenus(x, VENR[0], vy, end ? 260 : VENR[2], t, { morning: 1, mood: end ? 'happy' : t < 2.7 ? 'happy' : 'neutral', look: [-1, 0], hops: [...talkHops(L1, VEN, { cps: CPS }), ...(end ? [T.last + 0.5] : [])], seed: 5 })
    x.restore()
    // the Moon on the hill: pointing (a little pixel arm) at frame 0; a mug at the end
    const r = moonChar(MOONP[0], MOONP[1], MOONP[2], t, { mood: end ? 'happy' : t < 2.7 ? 'wide' : 'sparkle', look: [1, -1], blink: end ? undefined : false, hops: end ? [T.hill + 0.4] : [0.15, ...talkHops(L1, MOON, { cps: CPS })] })
    if (!end) { x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(r.x + 80, r.y - 10); x.lineTo(r.x + 190, r.y - 120); x.stroke(); x.strokeStyle = MOONC; x.lineWidth = 8; x.stroke(); x.restore()
      for (let i = 0; i < 3; i++) R(x, '#fff1c8', r.x + 210 + i * 18, r.y - 150 - i * 18, 10, 10) }
    else drawBits(x, MUG, MUG_C, r.x + 120, r.y + 30, 8)
  }
  function beforeAfter(t) {
    const [a] = T.ba, wipe = ease.inOutCubic(prog(t, a + 0.6, a + 1.3))
    // BEFORE: dusk, the evening star, retro and dim
    x.save(); x.beginPath(); x.rect(0, 0, 1080, 1920); x.clip()
    const g1 = x.createLinearGradient(0, 400, 0, 1500); g1.addColorStop(0, '#1d0f3a'); g1.addColorStop(1, '#6a2a52'); x.fillStyle = g1; x.fillRect(0, 0, 1080, 1920)
    glow(x, 200, 1500, 500, '#ff7a6a', 0.8)
    drawVenus(x, 540, 1000, 320, t, { retro: 1, mood: 'sleepy', seed: 5 })
    x.restore()
    // AFTER: wipes in from the right
    const wx = lerp(1080, 0, wipe)
    x.save(); x.beginPath(); x.rect(wx, 0, 1080 - wx, 1920); x.clip()
    const g2 = x.createLinearGradient(0, 400, 0, 1500); g2.addColorStop(0, '#2a1d5a'); g2.addColorStop(1, '#ffb070'); x.fillStyle = g2; x.fillRect(0, 0, 1080, 1920)
    glow(x, 880, 1500, 520, '#ffd98a', 1)
    drawVenus(x, 540, 1000, 320, t, { morning: 1, mood: 'sparkle', seed: 5, hops: [a + 1.3] })
    x.restore()
    R(x, BONE, wx - 4, 0, 8, 1920)
    chip(x, t, { at: a + 0.1, out: a + 0.9, text: 'BEFORE · THE EVENING STAR', x: 540, y: 1420, size: 30, color: '#ffc2d8', border: PINK, type: false })
    chip(x, t, { at: a + 1.25, out: T.ba[1], text: 'AFTER · THE MORNING STAR', x: 540, y: 1420, size: 30, color: DAWN, border: DAWN, type: false })
    burst(x, t, a + 1.3, 540, 1000, { n: 14, R: 260, cols: [DAWN, BONE, PINK], seed: 7 })
    monoText(x, 'THE REVEAL', 540, 470, { size: 40, color: BONE, spacing: 0.4 })
  }
  function office(t) {
    // walls, floor, a rug
    R(x, '#3a2a5e', 0, 430, 1080, 900); R(x, '#2a1d48', 0, 1320, 1080, 600)
    for (let i = 0; i < 1080; i += 90) R(x, '#43316a', i, 430, 6, 890)
    x.fillStyle = '#5a3a6e'; x.beginPath(); x.ellipse(540, 1330, 470, 80, 0, 0, Math.PI * 2); x.fill()
    // the window (the comet crosses it)
    R(x, INK, OWIN.x0 - 12, OWIN.y0 - 12, OWIN.x1 - OWIN.x0 + 24, OWIN.y1 - OWIN.y0 + 24)
    x.save(); x.beginPath(); x.rect(OWIN.x0, OWIN.y0, OWIN.x1 - OWIN.x0, OWIN.y1 - OWIN.y0); x.clip()
    const wg = x.createLinearGradient(0, OWIN.y0, 0, OWIN.y1); wg.addColorStop(0, '#2a1d5a'); wg.addColorStop(1, '#ff9a7a'); x.fillStyle = wg; x.fillRect(OWIN.x0, OWIN.y0, OWIN.x1 - OWIN.x0, OWIN.y1 - OWIN.y0)
    hiddenComet(x, t, { at: COMET.at, from: COMET.from, to: COMET.to, dur: 2.4, size: 26 })
    x.restore()
    R(x, '#d9cdb8', (OWIN.x0 + OWIN.x1) / 2 - 4, OWIN.y0, 8, OWIN.y1 - OWIN.y0)
    // the diploma (rewatch bait)
    R(x, INK, 110, 560, 220, 160); R(x, '#c98a1f', 116, 566, 208, 148); R(x, '#fff6e2', 128, 578, 184, 124)
    monoText(x, 'DR. MOON', 220, 605, { size: 18, color: INK, shadow: false })
    monoText(x, '8 PHASES OF', 220, 638, { size: 14, color: '#7c74f0', shadow: false })
    monoText(x, 'LISTENING', 220, 662, { size: 14, color: '#7c74f0', shadow: false })
    R(x, '#ff4f86', 205, 680, 30, 14)
    // the wall clock: backwards until she gives up the mirror, then forwards (rewatch bait)
    const cx = 870, cy = 640
    x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 72, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff6e2'; x.beginPath(); x.arc(cx, cy, 62, 0, Math.PI * 2); x.fill()
    const dir = t < T.hand ? -1 : 1, ang = dir * (t - T.hand) * 2.2
    x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ang) * 48, cy - Math.cos(ang) * 48); x.stroke()
    x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ang / 12) * 30, cy - Math.cos(ang / 12) * 30); x.stroke(); x.restore()
    // the armchair (the ghost peeks out from behind it)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
    R(x, INK, CHAIR.x - 156, 1010, 312, 300); R(x, '#8a3a4a', CHAIR.x - 150, 1016, 300, 288); R(x, '#a84a5a', CHAIR.x - 150, 1016, 300, 20)
    R(x, '#6e2a38', CHAIR.x - 150, 1200, 300, 104)
    // the couch (Venus)
    R(x, INK, COUCHV.x - 226, 1060, 452, 250); R(x, '#4a7a8a', COUCHV.x - 220, 1066, 440, 238); R(x, '#5a8e9e', COUCHV.x - 220, 1066, 440, 20)
    R(x, '#3a6a7a', COUCHV.x - 220, 1220, 440, 84)
    // the side table + tissues
    R(x, INK, 500, 1200, 90, 110); R(x, '#8a5a3a', 506, 1206, 78, 98)
    drawBits(x, TISSUE, TISSUE_C, 545, 1170, 8)
  }
  function officeCast(t) {
    const kept = t < T.hand + 0.3
    const vm = t < M.early ? (t < L2[1].t ? 'neutral' : 'squint') : t < T.honk ? 'sparkle' : t < T.honk + 0.8 ? 'sleepy' : 'happy'
    const rv = drawVenus(x, COUCHV.x, COUCHV.y - 10, 270, t, { morning: 0.5 + 0.5 * prog(t, M.early, M.early + 1.5), mood: vm, look: t < M.early ? [1, 0] : [-1, 0], mirror: kept ? true : false, mirrorLook: t < M.early ? 1 : 0, hops: [T.office + 0.2, ...talkHops(L2, VEN, { cps: CPS }), T.honk], seed: 5 })
    // honk: a tissue to the face
    if (t > T.honk && t < T.honk + 0.9) drawBits(x, ['WWWW', 'WWWW', 'WWWW'], { W: '#ffffff' }, rv.x - 40, rv.y + 10, 12)
    const rm = moonChar(CHAIR.x, CHAIR.y - 30, 250, t, { mood: t < M.growth ? 'neutral' : 'happy', look: [1, 0], hops: [T.office + 0.1, ...talkHops(L2, MOON, { cps: CPS }), T.hand + 0.8] })
    drawBits(x, PAD, PAD_C, rm.x + 110, rm.y + 50, 8, { rot: 0.2 })
    // the mirror goes over to the Moon
    const hp = prog(t, T.hand + 0.3, T.hand + 1.1)
    if (hp > 0) {
      const mx = lerp(rv.x + 150, rm.x + 140, ease.inOutQuad(hp)), my = lerp(rv.y - 60, rm.y - 70, hp) - Math.sin(Math.PI * hp) * 140
      R(x, INK, mx - 34, my - 22, 68, 44); R(x, '#cfe6ff', mx - 28, my - 16, 56, 32); R(x, '#ffffff', mx - 22, my - 12, 14, 8)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = popOut(t, T.out)
      x.save(); x.globalAlpha = ok
      if (t < T.ba[0]) {
        hillScene(t, false)
        chip(x, t, { at: T.fact, out: T.ba[0], text: '✦ REAL: VENUS RETURNS IN THE MORNING SKY', x: 540, y: 470, size: 26, color: DAWN, border: DAWN })
      } else if (t < T.ba[1]) beforeAfter(t)
      else if (t < T.hill) {
        office(t); officeCast(t)
        lowerThird(x, t, { at: T.office + 0.3, out: T.office + 3.6, name: 'DR. MOON', sub: 'LISTENER · EVERY PHASE', y: 470, w: 560, color: MOONLIGHT })
      } else hillScene(t, true)
      clockChip(t)
      x.restore()
      flash(x, t, T.ba[0], { dur: 0.25, peak: 0.8, col: '#fff1d8' })
      flash(x, t, T.office, { dur: 0.2, peak: 0.5 })
      flash(x, t, T.hill, { dur: 0.3, peak: 0.8, col: '#fff1d8' })
      if (t < T.out[1]) {
        drawDayChip(x, t, DAY)
        genreBug(x, t, { text: t >= T.office && t < T.hill ? 'SESSION 1 · 50 MIN' : '● SUNRISE CAM', x: 96, y: 1838, color: t >= T.office && t < T.hill ? '#7c74f0' : '#e8803a', blink: false })
      }
      hook.update(t)
      box1.update(t); box2.update(t)
      LAST.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the reveal, the office, back to the hill
const CUTS = [{ t: T.ba[0] - 0.03, kind: 'flip' }, { t: T.office - 0.03, kind: 'deal' }, { t: T.hill - 0.03, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E14' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['glitter', 0.2, 1.2], ['bell', 0.3, 1760, 0.03, 1.8, 0.2],
  ...talkCues(ALL, { cps: CPS, pitch: { [MOON]: 659.25, [VEN]: 987.77 } }),
  ['bell', T.fact, 2093, 0.025, 1.4, 0],
  ['whoosh', T.ba[0] + 0.6, 0.7, 0.04], ['crash', r3(T.ba[0] + 1.3), { gain: 0.05, len: 2.2 }], ['glitter', r3(T.ba[0] + 1.3), r3(T.ba[0] + 2.0)],
  ['pluck', r3(T.ba[0] + 1.3), 1174.66, 0.05, 0.6, 0],
  ['tick', r3(T.ghost + 0.05), 0.015], ['tick', r3(T.comet + 0.6), 0.012],
  ['bell', r3(M.early + 1.2), 2349.32, 0.03, 1.8, 0], ['swell', M.early, r3(M.early + 1.4), { gain: 0.03 }],
  ['whoosh', T.honk, 0.25, 0.08], ['tom', r3(T.honk + 0.05), 140, { gain: 0.15 }],
  ['whoosh', r3(T.hand + 0.3), 0.8, 0.03], ['pop', r3(T.hand + 1.1), 1318.51, 0.045, -0.3],
  ['riser', r3(T.hill - 1.0), T.hill, 0.04], ['crash', T.hill, { gain: 0.05, len: 2.6 }], ['glitter', T.hill, r3(T.hill + 0.9)],
  ...wordPops(T.last, 2, 0.09, 1), ['pop', r3(T.last + 0.45), 1318.51, 0.05, 0], ['pop', r3(T.last + 0.55), 1567.98, 0.05, 0], ['bell', r3(T.last + 0.5), 2349.32, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
