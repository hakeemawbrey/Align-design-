// st8sitcom (35 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E13) · story 0–30.6, then the end card.
//   Genre: a 90s multi-cam sitcom (LIVE STUDIO AUDIENCE bug, laugh track, "ooooh", a freeze-frame theme card).
//   Mars, Venus's ex, crashes on Aries and Libra's couch. The real astrology: Mars rules Aries, Venus rules Libra, so
//   their rulers are exes. He keeps asking about Venus; they set a kind boundary.
//   0.00–2.40  FRAME 0: the apartment set, Mars mid-flop onto the couch (pillows flying, the couch bouncing), Aries and
//              Libra at the door wide-eyed. Hook: "Mars is *crashing* on our couch."
//   2.45       MARS: "just till Venus goes direct. *six weeks, tops.*"  [LAUGHTER]
//   5.70       THEME: a freeze-frame, 90s stripes, a polaroid of Aries × Libra hugging (Mars photobombing), the title
//              "♪ THEY'RE IN LOVE ♪" and the credits (… and MARS as himself).
//   8.80       "THE NEXT MORNING". MARS: "so… has Venus said anything about *me?*" → LIBRA: "she rules my sign, not my
//              *group chat.*" [LAUGHTER] → MARS: "did she post? is she *okay?*" [LAUGHTER] → fact chip: MARS RULES ARIES ·
//              VENUS RULES LIBRA → ARIES: "you rule my sign. this is *so weird.*" [OOOOOH] → LIBRA: "you can stay. no
//              Venus talk at *dinner.*" [AWWW] → MARS: "…fair. can i keep the *couch?*" [LAUGHTER]
//  ~27.0       "Our rulers’ drama | isn’t *ours.*"  The frame-0 couch again, changed: all three on it, laughing at the TV.
//   Rewatch bait: the little TV on the wall runs E01's news ticker, "EXES REPORTED IN 12 SIGNS". The hidden comet crosses
//   the window; the ghost peeks round the fridge.
// One canvas (sky + set + cast), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { MARS, drawMars, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { pop01, outK, popOut, r3, R, glow, burst, monoText, panel, seq, wordPops, flash, chip, hiddenComet, rgba, GOLD, BONE, INK, PINK, NOTE } from '../kit.js'

export const DURATION = 35
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const TEAL = '#2fd0c0', MAGENTA = '#ff4fa0', MUSTARD = '#f5c542'
const DAY = { day: 23, phase: 'gone' }
const ARI = signStar('aries'), LIB = signStar('libra')
const TAG = { ARI: '♈ ARIES', LIB: '♎ LIBRA', MARS: MARS.tag }
const CPS = 28

// ── the script
const S1 = seq(2.45, [{ who: TAG.MARS, x: 'just till Venus goes direct. *six weeks, tops.*', color: MARS.tagColor, hold: 1.55 }])
const S2 = seq(9.35, [
  { who: TAG.MARS, x: 'so… has Venus said anything about *me?*', color: MARS.tagColor, hold: 1.5 },
  { who: TAG.LIB, x: 'she rules my sign, not my *group chat.*', hold: 1.5 },
  { mark: 'laugh1' },
  { who: TAG.MARS, x: 'did she post? is she *okay?*', color: MARS.tagColor, hold: 1.5 },
  { mark: 'laugh2' },
  { who: TAG.ARI, x: 'you rule my sign. this is *so weird.*', hold: 1.5 },
  { mark: 'oooh' },
  { who: TAG.LIB, x: 'you can stay. no Venus talk at *dinner.*', hold: 1.5 },
  { mark: 'aww' },
  { who: TAG.MARS, x: '…fair. can i keep the *couch?*', color: MARS.tagColor, hold: 1.5 },
  { mark: 'laugh3' },
])
const L1 = S1.lines, L2 = S2.lines, ALL = [...L1, ...L2], M = S2.marks
const T = {
  hookOut: 2.4, flop: 0.28, laugh0: r3(S1.end - 1.4), close1: r3(S1.end - 0.1),
  theme: [r3(S1.end), r3(S1.end + 3.1)], morning: r3(S1.end + 3.1),
  laugh1: r3(M.laugh1 - 1.4), laugh2: r3(M.laugh2 - 1.4), oooh: r3(M.oooh - 1.4), aww: r3(M.aww - 1.4), laugh3: r3(M.laugh3 - 1.35),
  fact: r3(M.laugh2 - 0.2), close2: r3(S2.end - 0.05),
  last: r3(S2.end - 0.6), sit: r3(S2.end - 1.2), out: [30.05, 30.45],
  comet: 12.0,
}
T.ghost = r3(T.theme[1] + 0.6)

// ── the set
const WIN = { x0: 380, x1: 700, y0: 520, y1: 800 }
const TV = { x0: 770, x1: 960, y0: 560, y1: 700 }
const FRIDGE = { x0: 900, x1: 1020, y0: 760, y1: 1300 }
const COUCH = { x0: 250, x1: 830, y: 1250 }
const POS = { MARS: [540, 1170, 240], ARI: [150, 1200, 220], LIB: [920, 1210, 220] }
const SIT = { ARI: [340, 1190, 190], LIB: [740, 1190, 190] }
export const GHOST = { at: T.ghost, x: FRIDGE.x0, y: 900, where: 'leaning out from behind the fridge, right of the apartment set' }
export const COMET = { at: T.comet, from: [690, 560], to: [400, 640] }

const SCALE = ['.YYYYYYY.', 'Y...Y...Y', '.Y..Y..Y.', 'YYY.Y.YYY', '....Y....', '..YYYYY..']
const SCALE_C = { Y: '#f2c75c' }
const GLOVE = ['.RRRR.', 'RRRRRR', 'RRRRRW', 'RRRRRR', '.RRRR.', '.WWWW.']
const GLOVE_C = { R: '#e2334c', W: '#fff1c8' }
const PILLOW = ['MMMMMMM', 'MmMMMmM', 'MMMMMMM', 'MmMMMmM', 'MMMMMMM']
const PILLOW_C = { M: '#ffd166', m: '#e8a93a' }
const BOWL = ['.Y.Y.Y.', 'YWYWYWY', 'RRRRRRR', '.RWRWR.', '..RRR..']
const BOWL_C = { Y: '#fff1c8', W: '#ffd34d', R: '#e2334c' }

const CAPS = [[T.laugh0, '[ AUDIENCE LAUGHS ]'], [T.laugh1, '[ LAUGHTER ]'], [T.laugh2, '[ LAUGHTER ]'], [T.oooh, '[ AUDIENCE: “OOOOOH” ]'], [T.aww, '[ AUDIENCE: “AWWW” ]'], [T.laugh3, '[ LAUGHTER ]']]

function moods(t) {
  if (t < 1.4) return { MARS: { mood: 'happy' }, ARI: { mood: 'wide', look: [1, 0], blink: false }, LIB: { mood: 'wide', look: [-1, 0], blink: false } }
  if (t < T.theme[0]) return { MARS: { mood: 'smug', look: [0, 0] }, ARI: { mood: 'squint', look: [1, 0] }, LIB: { mood: 'neutral', look: [-1, 0] } }
  if (t >= T.sit) return { MARS: { mood: 'happy' }, ARI: { mood: 'happy' }, LIB: { mood: 'happy' } }
  const l = ALL.filter(L => L.t <= t).pop()
  const who = l ? l.speaker : null
  const idx = l ? L2.indexOf(l) : -1
  const marsMood = idx === 4 ? (t < T.aww + 0.6 ? 'sad' : 'happy') : idx === 5 ? 'happy' : idx === 2 ? 'wide' : 'neutral'
  return {
    MARS: { mood: marsMood, look: who === TAG.ARI ? [-1, 0] : who === TAG.LIB ? [1, 0] : [0, 0] },
    ARI: { mood: idx === 3 ? 'wide' : idx >= 4 ? 'happy' : 'eyeroll', look: [1, 0] },
    LIB: { mood: idx === 1 ? 'wink' : idx === 4 ? 'happy' : 'neutral', look: [-1, 0] },
  }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 800 120px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Mars is *crashing* | on our couch.', at: 0, out: T.hookOut, accentColor: '#ff9a6a' })
  const box1 = dialogueBox(root, { lines: L1, y: 1480, width: 960, height: 290, cps: CPS, close: T.close1 })
  const box2 = dialogueBox(root, { lines: L2, y: 1480, width: 960, height: 290, cps: CPS, close: T.close2 })
  const LAST = popText(root, 'Our rulers’ drama | isn’t *ours.*', { top: 200, size: 104, accentSize: 180, at: T.last, gap: 0.08, accentColor: '#ff9a6a', wobble: true, late: 1, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function set(t) {
    // back wall (striped 90s wallpaper), floor, skirting
    R(x, '#5b3a6e', 0, 430, 1080, 870)
    for (let i = 0; i < 1080; i += 60) R(x, '#674480', i, 430, 30, 870)
    R(x, '#3a2448', 0, 1290, 1080, 14)
    const fg = x.createLinearGradient(0, 1300, 0, 1920); fg.addColorStop(0, '#8a5a3a'); fg.addColorStop(1, '#4a2e1e')
    x.fillStyle = fg; x.fillRect(0, 1300, 1080, 620)
    for (let i = 0; i < 9; i++) R(x, '#7a4e32', 0, 1330 + i * 70, 1080, 4)
    // the window: the real night, the hidden comet
    R(x, INK, WIN.x0 - 14, WIN.y0 - 14, WIN.x1 - WIN.x0 + 28, WIN.y1 - WIN.y0 + 28)
    R(x, '#f3e3c3', WIN.x0 - 8, WIN.y0 - 8, WIN.x1 - WIN.x0 + 16, WIN.y1 - WIN.y0 + 16)
    x.save(); x.beginPath(); x.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0); x.clip()
    R(x, '#0d0a2a', WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0)
    for (let i = 0; i < 16; i++) { x.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2 + i); R(x, BONE, WIN.x0 + (i * 97) % 300, WIN.y0 + (i * 53) % 260, 4, 4) }
    x.globalAlpha = 1
    hiddenComet(x, t, { at: COMET.at, from: COMET.from, to: COMET.to, dur: 2.4, size: 26 })
    x.restore()
    R(x, '#f3e3c3', (WIN.x0 + WIN.x1) / 2 - 5, WIN.y0, 10, WIN.y1 - WIN.y0); R(x, '#f3e3c3', WIN.x0, (WIN.y0 + WIN.y1) / 2 - 5, WIN.x1 - WIN.x0, 10)
    // the door (left)
    R(x, INK, 50, 720, 180, 580); R(x, '#a86a3a', 58, 728, 164, 572); R(x, '#8a5228', 78, 760, 124, 200); R(x, '#8a5228', 78, 1000, 124, 260); R(x, GOLD, 196, 1020, 14, 14)
    // the TV on its shelf: E01's ticker (rewatch bait)
    R(x, INK, TV.x0 - 8, TV.y0 - 8, TV.x1 - TV.x0 + 16, TV.y1 - TV.y0 + 16); R(x, '#3a3358', TV.x0, TV.y0, TV.x1 - TV.x0, TV.y1 - TV.y0)
    R(x, '#1b2a4a', TV.x0 + 10, TV.y0 + 10, TV.x1 - TV.x0 - 20, TV.y1 - TV.y0 - 20)
    R(x, '#ff86b8', TV.x0 + 60, TV.y0 + 24, 60, 50)
    x.save(); x.beginPath(); x.rect(TV.x0 + 10, TV.y0 + 10, TV.x1 - TV.x0 - 20, TV.y1 - TV.y0 - 20); x.clip()
    R(x, '#ff3d5a', TV.x0 + 10, TV.y1 - 40, TV.x1 - TV.x0 - 20, 22)
    const tk = 'EXES REPORTED IN 12 SIGNS • VENUS STILL RETROGRADE • '
    monoText(x, tk + tk, TV.x1 - ((t * 60) % 620), TV.y1 - 29, { size: 14, color: BONE, align: 'left', shadow: false, spacing: 0.04 })
    x.restore()
    R(x, '#6a4a32', TV.x0 - 30, TV.y1 + 8, TV.x1 - TV.x0 + 60, 12)
    // kitchen: counter + fridge (the ghost leans out from behind the fridge)
    R(x, INK, 700, 1080, 220, 220); R(x, '#d9cdb8', 706, 1086, 208, 30); R(x, '#8a6a9a', 706, 1116, 208, 184)
    R(x, '#3a3358', 760, 1040, 30, 46)                      // a mug on the counter
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
    R(x, INK, FRIDGE.x0 - 6, FRIDGE.y0 - 6, FRIDGE.x1 - FRIDGE.x0 + 12, FRIDGE.y1 - FRIDGE.y0 + 6)
    R(x, '#e8eef2', FRIDGE.x0, FRIDGE.y0, FRIDGE.x1 - FRIDGE.x0, FRIDGE.y1 - FRIDGE.y0); R(x, '#b9c3cc', FRIDGE.x0, FRIDGE.y0 + 170, FRIDGE.x1 - FRIDGE.x0, 8)
    R(x, '#9aa4ad', FRIDGE.x0 + 12, FRIDGE.y0 + 60, 8, 70); R(x, '#9aa4ad', FRIDGE.x0 + 12, FRIDGE.y0 + 220, 8, 90)
    R(x, '#ff86b8', FRIDGE.x0 + 50, FRIDGE.y0 + 40, 26, 26); R(x, '#f0603a', FRIDGE.x0 + 70, FRIDGE.y0 + 90, 22, 22)       // magnets
  }
  function couch(t, front) {
    const bounce = Math.exp(-Math.max(0, t - T.flop) * 4) * Math.sin(Math.max(0, t - T.flop) * 22) * 10 * (t > T.flop ? 1 : 0)
    const { x0, x1, y } = COUCH
    if (!front) {
      R(x, INK, x0 - 6, y - 140 + bounce, x1 - x0 + 12, 150); R(x, '#2fa89a', x0, y - 134 + bounce, x1 - x0, 140)
      for (let i = 0; i < 3; i++) R(x, '#27917f', x0 + 14 + i * (x1 - x0 - 28) / 3, y - 120 + bounce, (x1 - x0 - 28) / 3 - 10, 110)
    } else {
      R(x, INK, x0 - 6, y - 6 + bounce, x1 - x0 + 12, 96); R(x, '#36c0ad', x0, y + bounce, x1 - x0, 84); R(x, '#27917f', x0, y + 70 + bounce, x1 - x0, 14)
      for (const ax of [x0 - 50, x1]) { R(x, INK, ax - 6, y - 70 + bounce, 62, 166); R(x, '#2fa89a', ax, y - 64 + bounce, 50, 154) }
      R(x, '#4a2e1e', x0 + 10, y + 90, 20, 30); R(x, '#4a2e1e', x1 - 30, y + 90, 20, 30)
    }
  }
  function cast(t, layer) {
    const m = moods(t), sat = t >= T.sit
    const sp = ease.inOutQuad(prog(t, T.sit - 0.5, T.sit))
    // Mars: mid-flop at frame 0 (dropping onto the couch), then sprawled on it
    const front = sp < 0.5
    if (layer === 'back') {
    const fall = 1 - ease.inQuad(clamp(t / T.flop))
    const mY = POS.MARS[1] - 150 * fall
    drawMars(x, POS.MARS[0], mY, POS.MARS[2], t, { ...m.MARS, moonMood: t < 1.6 || t > T.last ? 'hype' : m.MARS.mood === 'sad' ? 'cry' : 'neutral', hops: [T.flop, ...talkHops(ALL, TAG.MARS, { cps: CPS }), T.sit], seed: 9, squash: t < T.flop ? -0.1 : 0 })
    // pillows flying off at the flop
    for (const [i, dir] of [[0, -1], [1, 1]]) {
      const p = prog(t, 0, 1.0)
      if (p >= 1) { drawBits(x, PILLOW, PILLOW_C, COUCH.x0 + 40 + i * (COUCH.x1 - COUCH.x0 - 80), COUCH.y - 30, 8); continue }
      const px = lerp(540 + dir * 60, COUCH.x0 + 40 + i * (COUCH.x1 - COUCH.x0 - 80), p), py = lerp(1140, COUCH.y - 30, p) - Math.sin(Math.PI * p) * 220
      drawBits(x, PILLOW, PILLOW_C, Math.round(px), Math.round(py), 8, { rot: dir * p * 5 })
    }
    burst(x, t, T.flop, 540, COUCH.y - 20, { n: 10, R: 200, cols: [BONE, '#d9cdb8', MUSTARD], seed: 2, flat: 0.4 })
    }
    if ((layer === 'front') !== front) return
    // Aries (door side, gloves) and Libra (kitchen side, scale on its head); they sit down for the last shot
    const ax = lerp(POS.ARI[0], SIT.ARI[0], sp), ay = lerp(POS.ARI[1], SIT.ARI[1], sp), as = lerp(POS.ARI[2], SIT.ARI[2], sp)
    const lx = lerp(POS.LIB[0], SIT.LIB[0], sp), ly = lerp(POS.LIB[1], SIT.LIB[1], sp), ls = lerp(POS.LIB[2], SIT.LIB[2], sp)
    const ra = drawStarChar(x, ax, ay, as, t, { color: ARI.color, glyph: ARI.glyph, ...m.ARI, hops: [0.3, ...talkHops(ALL, TAG.ARI, { cps: CPS }), T.sit - 0.5], seed: 13, glow: 0.8 })
    drawBits(x, GLOVE, GLOVE_C, ra.x + as * 0.42, ra.y + 20, 7)
    const rl = drawStarChar(x, lx, ly, ls, t, { color: LIB.color, glyph: LIB.glyph, ...m.LIB, hops: [0.45, ...talkHops(ALL, TAG.LIB, { cps: CPS }), T.sit - 0.5], seed: 21, glow: 0.8 })
    drawBits(x, SCALE, SCALE_C, rl.x, rl.top + 4, 6, { rot: 0.08 * Math.sin(t * 2) })
    if (sat) drawBits(x, BOWL, BOWL_C, 540, COUCH.y - 20, 9)
  }
  /** the theme card: a 90s freeze-frame with stripes, a polaroid and the title */
  function theme(t) {
    const [a, b] = T.theme, p = prog(t, a, b)
    R(x, '#1a0f30', 0, 0, 1080, 1920)
    x.save(); x.translate(540, 960); x.rotate(-0.35)
    const off = (t * 80) % 240
    for (let i = -12; i < 12; i++) R(x, [TEAL, MAGENTA, MUSTARD, '#7c74f0'][(i + 40) % 4], -1400, i * 240 + off - 120, 2800, 120)
    x.restore()
    x.fillStyle = 'rgba(10,6,24,0.35)'; x.fillRect(0, 0, 1080, 1920)
    // the polaroid
    const k = pop01(t, a + 0.05, 0.4, 2.2)
    x.save(); x.translate(540, 1080); x.rotate(-0.06); x.scale(k, k)
    R(x, INK, -330, -330, 660, 720); R(x, '#fff8ea', -320, -320, 640, 700)
    R(x, '#5b3a6e', -290, -290, 580, 520)
    drawMars(x, 150, -120, 170, a + 0.3, { mood: 'happy', moonMood: 'hype', seed: 9 })            // the photobomb
    drawStarChar(x, -110, 30, 260, a + 0.3, { color: ARI.color, glyph: ARI.glyph, mood: 'heart', seed: 13 })
    drawStarChar(x, 90, 50, 260, a + 0.3, { color: LIB.color, glyph: LIB.glyph, mood: 'heart', seed: 21 })
    x.font = `italic 500 52px 'EB Garamond', serif`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('us ♡ (and mars?)', 0, 312)
    x.restore()
    // the title, bubbly and skewed
    const tk = pop01(t, a + 0.35, 0.4, 2.6)
    x.save(); x.translate(540, 470); x.rotate(-0.05); x.scale(tk, tk); x.transform(1, 0, -0.18, 1, 0, 0)
    x.font = `italic 800 110px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = 26; x.strokeStyle = INK; x.strokeText('THEY’RE IN', 0, -70); x.strokeText('LOVE', 0, 50)
    x.fillStyle = MUSTARD; x.fillText('THEY’RE IN', 0, -70); x.fillStyle = MAGENTA; x.fillText('LOVE', 0, 50)
    x.restore()
    for (const [nx, ny, d] of [[150, 380, 0], [930, 560, 0.2]]) { const bob = Math.sin((t - d) * 6) * 10; x.save(); x.font = `800 90px Inter, sans-serif`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('♪', nx, ny + bob); x.restore() }
    const n = Math.floor((t - a - 0.9) / 0.03)
    monoText(x, 'STARRING ♈ ARIES · ♎ LIBRA', 540, 1560, { size: 30, color: BONE, n })
    monoText(x, '…AND ♂ MARS AS “HIMSELF”', 540, 1610, { size: 30, color: MUSTARD, n: n - 28 })
    void p
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = popOut(t, T.out)
      if (t >= T.theme[0] && t < T.theme[1]) {
        theme(t)
      } else {
        x.save(); x.globalAlpha = ok
        set(t); couch(t, false); cast(t, 'back'); couch(t, true); cast(t, 'front')
        // the "laugh track" captions
        for (const [at, cap] of CAPS) chip(x, t, { at, out: at + 1.3, text: cap, x: 540, y: 1405, size: 26, color: MUSTARD, border: MUSTARD, type: false })
        chip(x, t, { at: T.fact, out: T.oooh + 1.4, text: '✦ REAL: MARS RULES ARIES · VENUS RULES LIBRA', x: 540, y: 470, size: 24, color: GOLD })
        if (t >= T.morning && t < T.morning + 1.6) chip(x, t, { at: T.morning, out: T.morning + 1.6, text: 'THE NEXT MORNING…', x: 540, y: 470, size: 30, color: BONE, border: TEAL })
        x.restore()
        // the 4:3 TV feel: a soft rounded vignette
        const g = x.createRadialGradient(540, 980, 520, 540, 980, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.5)')
        x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      }
      flash(x, t, T.theme[0], { dur: 0.25, peak: 0.85 })
      flash(x, t, T.theme[1], { dur: 0.2, peak: 0.5 })
      if (t < T.out[1]) {
        drawDayChip(x, t, DAY)
        genreBug(x, t, { text: '● LIVE STUDIO AUDIENCE', x: 96, y: 1838, color: MAGENTA, blink: false })
      }
      hook.update(t)
      box1.update(t); box2.update(t)
      LAST.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the theme card in and out, the last shot
const CUTS = [{ t: T.theme[0] - 0.03, kind: 'flip' }, { t: T.morning - 0.03, kind: 'deal' }, { t: T.sit - 0.6, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E13' }), cardCuts(CUTS)]

// ── sound: the laugh track is little noise bursts in a "ha-ha-ha" rhythm with a falloff, plus the sitcom sting
const laugh = (at, n = 9, g = 0.05) => Array.from({ length: n }, (_, i) => ['whoosh', r3(at + i * 0.12 + (i % 3) * 0.015), 0.11, +(g * (1 - i / (n + 2))).toFixed(4)])
const oooh = at => [['swell', at, r3(at + 1.0), { gain: 0.035, f0: 300, f1: 900 }], ['whoosh', r3(at + 0.1), 0.9, 0.03]]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['boom', T.flop, 0.18], ['tom', T.flop, 90, { gain: 0.25 }], ['whoosh', 0.05, 0.3, 0.04],
  ...talkCues(ALL, { cps: CPS, pitch: { [TAG.MARS]: 392, [TAG.LIB]: 987.77, [TAG.ARI]: 739.99 } }),
  ...laugh(T.laugh0),
  ...stingerCues(T.theme[0], { key: KEY, kind: 'sitcom' }),
  ['glitter', T.theme[0] + 0.35, T.theme[0] + 1.0], ['pluck', r3(T.theme[0] + 0.4), 1174.66, 0.05, 0.6, 0], ['pluck', r3(T.theme[0] + 0.55), 1318.51, 0.05, 0.6, 0],
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.theme[0] + 0.9 + i * 0.09), 0.015]),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...laugh(T.laugh1), ...stingerCues(T.laugh1, { key: KEY, kind: 'sitcom' }),
  ...laugh(T.laugh2, 7),
  ['bell', T.fact, 1760, 0.025, 1.2, 0],
  ...oooh(T.oooh),
  ['swell', T.aww, r3(T.aww + 0.9), { gain: 0.03, f0: 900, f1: 400 }],
  ...laugh(T.laugh3), ...stingerCues(T.laugh3 + 0.1, { key: KEY, kind: 'sitcom' }),
  ...wordPops(T.last, 4, 0.08, 2), ['pop', r3(T.last + 0.45), 1567.98, 0.05, 0], ['bell', r3(T.last + 0.45), 2093, 0.03, 1.6, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const SECT = { drop: T.theme[0], lift: T.morning }
export const TIMES = T
