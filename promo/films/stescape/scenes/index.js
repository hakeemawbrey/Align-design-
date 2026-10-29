// stescape — "First Date Escape Room." (45 s vertical Align ad, Star Talk "Wild Lessons" #15, music: chiptune · C). Story
// 0–40.6, then the shared end card. A pixel escape room floating in the night sky: ♏ Scorpio (a vault) and ♊ Gemini (all
// jokes) are locked in on a first date, and every lock only takes a real answer about yourself. ♑ Capricorn runs the room
// from the OBSERVATION window in a headset; ♓ Pisces sits next to it and sobs harder at every lock (the running gag).
//   0.00–3.38  "First date: | *escape room.*"  The door SLAMS, the sign flips LOCKED, the LED timer flicks on at 60:00. Both
//              stars jump; Gemini is thrilled, Scorpio sweats. Pisces pops up in the window, already crying.
//   3.38       DROP "Every lock needs | a *real answer.*"  GAME MASTER: "no codes. no hints. just honesty."
//              Gemini (an open book pops up): "easy. I'm an open book."
//   8.93       LOCK 1 "Code: your favourite | *childhood memory.*"  A chest + the ANSWER panel. Scorpio (a tiny padlock pops
//              over its head): "I'm a locked one."  It brute-forces: 0000 ✕ · 1234 ✕ · PASS ✕ → "REAL ANSWERS ONLY".
//              Scorpio, quietly: "...grandma's kitchen. I cracked the eggs."  ✓ CLICK, the chest glows open (and the tiny
//              padlock over Scorpio pops open too). Gemini melts; Pisces bawls; the game master slides it the tissues.
//  15.60       LOCK 2 "Riddle: | *name a fear.*"  A safe. Gemini: "a fear? easy. spiders." ✕  "clowns? the ocean? taxes?"
//              ✕ ✕ ✕ → "TRY A REAL ONE".  Crickets. Gemini shrinks: "...that people get bored of me."  ✓ The safe swings open.
//              Pisces is pressed flat against the glass.
//  23.38       BREAKDOWN "Final door: | *no keyhole.*"  The lights dim; the plaque glows: OPENS WHEN YOU DO.
//              Scorpio: "for the record? not bored."  Gemini blushes.  Scorpio: "and… I really like you."
//  27.82       LIFT: the door swings open onto starlight. "It opened when | *they* did."
//  28.93       ESCAPED · 12:07 LEFT (stamp, confetti); Pisces leaps out of the window, sobbing.
//  30.60      ★ LESSON UNLOCKED: "The way out is *in.* | Open up." (+1 VULNERABILITY)
//  34.85       Tie-in, talk cards: "Your favourite | childhood memory?"  Two answers flip at the same time.
//              "Every clue was | a *talk card.*"  ANSWERS STAY HIDDEN TILL YOU BOTH PLAY.
//  38.05       "Escaped. | *Second date?*"  Outside under the stars; Gemini asks with a hop, Scorpio nods, blushing; Pisces
//              sobs in the doorway. Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + scene), DOM type + the text box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCell, headsetCells, blushCells, drawRoom, drawSign, drawTimer, drawWindow, drawDoor,
  drawChest, drawPadlock, drawSafe, drawPanel, drawBook, drawTissues, drawStamp, drawTile, drawHeart, dustPuff, confetti, makeTalkCard,
  WIN, LCD, BUZZ, INK } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid

const SCO = signStar('scorpio'), GEM = signStar('gemini'), CAP = signStar('capricorn'), PIS = signStar('pisces')
const VS = '︎'

// ── the timeline
export const T = {
  black: [0, 0.25],
  slam: [0.04, 0.2], h0: 0.35, h0Land: 1.1, sign: 0.45, timerOn: 1.4, gemYay: 1.7, pisIn: 2.2,
  drop: BEAT(5),                                    // 3.378 the rules
  book: 6.8,
  p1: BEAT(15),                                     // 8.933 lock 1
  force: [9.95, 10.5, 11.05], real: 11.6, open1: 14.15, tissues: [14.55, 14.95],
  p2: BEAT(27),                                     // 15.6 lock 2
  buzzA: 17.3, buzzB: [20.1, 20.35, 20.6], tryReal: 20.8, quiet: [20.8, 21.35], press: [21.4, 21.8], open2: 22.72,
  fin: BEAT(41),                                    // 23.378 breakdown: the final door
  open3: BEAT(49),                                  // 27.822 lift: the door opens
  esc: BEAT(51),                                    // 28.933 ESCAPED
  pisLeap: [29.15, 29.75],
  cutL: 30.55, lesson: BEAT(54),                    // 30.6
  lessonOut: [34.75, 34.95],
  tie: 34.85, tiles: 35.35, flip: [36.45, 36.8], tieOut: [37.85, 38.05],
  last: 38.05, lastLand: 38.7, nod: 39.2,
  out: [40.0, 40.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The way out is *in.* | Open up.', chip: '+1 VULNERABILITY', accentColor: GOLD, dim: 0.66 }

// ── dialogue
const GM = `${CAP.glyph}${VS} GAME MASTER`, SC = `${SCO.glyph}${VS} SCORPIO`, GE = `${GEM.glyph}${VS} GEMINI`
const CPS = 28
const LINES = [
  { t: 3.65, speaker: GM, color: CAP.color, text: 'no codes. no hints. *just honesty.*' },
  { t: 6.5, speaker: GE, color: GEM.color, text: "easy. I'm an *open book.*" },
  { t: 9.1, speaker: SC, color: SCO.color, text: "I'm a *locked one.*" },
  { t: 12.0, speaker: SC, color: SCO.color, text: "…grandma's kitchen. *I cracked the eggs.*" },
  { t: 15.95, speaker: GE, color: GEM.color, text: 'a fear? easy. *spiders.*' },
  { t: 18.7, speaker: GE, color: GEM.color, text: 'clowns? the ocean? *taxes?*' },
  { t: 21.35, speaker: GE, color: GEM.color, text: '…that people *get bored of me.*' },
  { t: 23.95, speaker: SC, color: SCO.color, text: 'for the record? *not bored.*' },
  { t: 26.6, speaker: SC, color: SCO.color, text: 'and… I *really like you.*' },
]
export const LT = lineTimes(LINES, { cps: CPS })
const SH = talkHops(LINES, SC, { cps: CPS }), GH = talkHops(LINES, GE, { cps: CPS }), MH = talkHops(LINES, GM, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const flinch = (t, times, d = 0.3) => times.reduce((m, v) => Math.max(m, bump(t, v, d)), 0)

// ── the countdown: 60:00 at timerOn, frozen at 12:07 when the door opens (time runs ~109× fast: the date flies by)
const LEFT_AT_ESCAPE = 12 * 60 + 7
const RATE = (3600 - LEFT_AT_ESCAPE) / (T.open3 - T.timerOn)
const secsLeft = t => t < T.timerOn ? 3600 : 3600 - (Math.min(t, T.open3) - T.timerOn) * RATE

// ── the ANSWER panel's script
const P1 = { force: ['0000', '1234', 'PASS'], answer: "GRANDMA'S KITCHEN" }
const P2 = { first: 'SPIDERS', rapid: ['CLOWNS', 'OCEAN', 'TAXES'], answer: 'PEOPLE GET BORED OF ME' }
const typed = (s, k) => s.slice(0, Math.round(s.length * clamp(k)))
function panelState(t) {
  if (t < T.p2) {
    for (let i = 2; i >= 0; i--) if (t >= T.force[i]) {
      if (i === 2 && t >= T.real) break
      const r = t - T.force[i]
      return { text: typed(P1.force[i], r / 0.22), mark: r > 0.28 ? 'x' : null, flash: r > 0.28 ? 1 - prog(r, 0.28, 0.5) : 0 }
    }
    if (t >= LINES[3].t) {
      const k = prog(t, LT[3].chars[0], LT[3].done)
      return t >= T.open1 ? { text: P1.answer, mark: 'ok', flash: 1 - prog(t, T.open1, T.open1 + 0.4) } : { text: typed(P1.answer, k), caret: true }
    }
    if (t >= T.real) return { text: 'REAL ANSWERS ONLY', mark: 'x', small: true, sub: 'ERROR:', flash: 1 - prog(t, T.real, T.real + 0.3) }
    return { text: '', caret: true }
  }
  // lock 2
  if (t >= T.open2) return { text: P2.answer, mark: 'ok', small: true, flash: 1 - prog(t, T.open2, T.open2 + 0.4) }
  if (t >= LINES[6].t) return { text: typed(P2.answer, prog(t, LT[6].chars[0], LT[6].done)), caret: true, small: true }
  if (t >= T.tryReal) return { text: 'TRY A REAL ONE', mark: 'x', small: true, sub: 'ERROR:' }
  for (let i = 2; i >= 0; i--) if (t >= T.buzzB[i] - 0.12) {
    const r = t - T.buzzB[i]
    return { text: P2.rapid[i], mark: r >= 0 ? 'x' : null, flash: r >= 0 ? 1 - prog(r, 0, 0.2) : 0 }
  }
  if (t >= LINES[4].t) {
    const k = prog(t, LT[4].done - 0.35, LT[4].done)
    return { text: typed(P2.first, k), mark: t >= T.buzzA ? 'x' : null, flash: t >= T.buzzA ? 1 - prog(t, T.buzzA, T.buzzA + 0.3) : 0, caret: t < T.buzzA }
  }
  return { text: '', caret: true }
}
const BUZZES = [...T.force.map(v => v + 0.28), T.real, T.buzzA, ...T.buzzB]

// ── geometry
const SCP = { x: 228, y: 1212, s: 250 }
const GEP = { x: 852, y: 1212, s: 250 }
const CHEST = { cx: 540, by: 1336, w: 290, h: 206 }
const SAFE = { cx: 540, by: 1336, w: 250, h: 230 }
const PANEL = { cx: 540, cy: 1000, w: 600, h: 150 }
const TIMER = { cx: 540, cy: 512 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 64px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 64px 'Space Mono'", "700 52px 'Space Mono'", "700 42px 'Space Mono'", "700 24px 'Space Mono'", "700 18px 'Space Mono'", "400 21px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const TALK = makeTalkCard(document, await loadImg('card-talk-6.png'), ['Your favourite', 'childhood memory?'])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'First date: | *escape room.*', { top: 120, size: 96, accentSize: 150, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HR = popText(root, 'Every lock needs | a *real answer.*', { top: 130, size: 86, accentSize: 128, at: T.drop + 0.05, gap: 0.07, late: 2, lateAt: T.drop + 0.5, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HP1 = popText(root, 'Code: your favourite | *childhood memory.*', { top: 130, size: 80, accentSize: 118, at: T.p1 + 0.05, gap: 0.06, late: 2, lateAt: T.p1 + 0.45, wobble: true, accentColor: LCD, lineHeight: 1.0, fit: true })
  const HP2 = popText(root, 'Riddle: | *name a fear.*', { top: 130, size: 92, accentSize: 140, at: T.p2 + 0.05, gap: 0.08, late: 3, lateAt: T.p2 + 0.4, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HF = popText(root, 'Final door: | *no keyhole.*', { top: 130, size: 92, accentSize: 140, at: T.fin + 0.08, gap: 0.1, late: 2, lateAt: T.fin + 0.55, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HO = popText(root, 'It opened when | *they* did.', { top: 130, size: 92, accentSize: 140, at: T.open3 + 0.1, gap: 0.07, lateAt: T.open3 + 0.45, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HT = popText(root, 'Every clue was | a *talk card.*', { top: 120, size: 88, accentSize: 132, at: T.tie + 0.05, gap: 0.06, late: 2, lateAt: T.tie + 0.4, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HE = popText(root, 'Escaped. | *Second date?*', { top: 130, size: 104, accentSize: 150, at: T.last + 0.02, gap: 0.09, late: 2, lateAt: T.lastLand, wobble: true, accentColor: PINK, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1480, width: 960, height: 250, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flashEl = el('div', { position: 'absolute', inset: 0, background: '#fff4dc', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  function star(px, py, size, t, opts, { rot = 0, cells, after } = {}) {
    x.save(); x.translate(px, py); x.rotate(rot)
    const F = starFrame(0, 0, size, t, opts)
    drawStarChar(x, 0, 0, size, t, opts)
    if (cells) inSprite(x, F, () => cells(F))
    if (after) after(F)
    x.restore()
    return F
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LCD]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  const pisces = (t, px, py, size, o = {}) => star(px, py, size, t, { color: PIS.color, glyph: size >= 120 ? PIS.glyph : null, mood: o.mood || 'sparkle', look: o.look || [0, -1], seed: 61, bob: o.bob ?? 3, pop: o.pop ?? 1, hops: o.hops || null, squash: o.squash || 0 }, { rot: o.rot || 0, cells: () => tearsCells(x, t, o.tears ?? 3) })
  const crickets = t => {
    if (!inR(t, T.quiet[0], T.quiet[1] + 0.2)) return
    x.save(); x.globalAlpha = 0.8 * popOut(t, [T.quiet[1], T.quiet[1] + 0.2])
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.75)'
    if (t > T.quiet[0] + 0.1) x.fillText('chirp', 640, 820 - 10 * Math.sin(t * 9))
    if (t > T.quiet[0] + 0.35) x.fillText('chirp', 440, 880 - 10 * Math.sin(t * 9 + 1))
    x.restore()
  }

  // ═══════════════════════ the observation window: ♑ game master + ♓ Pisces ═══════════════════════
  function windowScene(t) {
    const pressK = inR(t, T.press[0], T.esc) ? ease.outBack(prog(t, ...T.press)) * (1 - prog(t, T.open2 + 0.6, T.open2 + 1.0)) : 0
    drawWindow(x, t, (cx, cy) => {
      // the monitor on the desk
      x.fillStyle = INK; x.fillRect(cx - 30, cy + 40, 60, 40); x.fillStyle = '#2a6a50'; x.fillRect(cx - 24, cy + 44, 48, 26)
      // ♑ the game master (headset, deadpan)
      const gmMood = t >= T.esc ? 'wink' : inR(t, T.open1, T.open1 + 1.2) || inR(t, T.open2, T.open2 + 1.0) ? 'happy' : inR(t, T.buzzB[0], T.tryReal + 0.4) ? 'eyeroll' : 'neutral'
      star(cx - 80, cy + 18, 112, t, { color: CAP.color, glyph: null, mood: gmMood, look: t < T.drop ? [1, 1] : [1, 1], seed: 21, bob: 2, hops: MH }, { cells: () => headsetCells(x) })
      // ♓ Pisces: pops up at 2.2, sobs harder every lock, presses against the glass at the fear, leaps out at ESCAPED
      if (t < T.pisLeap[0] && t >= T.pisIn) {
        const pin = pop01(t, T.pisIn, 0.35, 2)
        const tears = t < T.p1 ? 1 : t < T.open1 ? 2 : 3
        const sz = lerp(110, 150, pressK)
        const hops = [T.open1 + 0.05, T.open1 + 0.45, T.open1 + 0.85, T.open2 + 0.05, T.open2 + 0.45, T.open3 + 0.1, T.open3 + 0.5, T.esc + 0.05]
        pisces(t, cx + 74 + 10 * pressK, cy + 22 - 8 * pressK + (1 - pin) * 120, sz, { mood: t >= T.open3 ? 'heart' : 'sparkle', tears, look: [-1, 1], squash: 0.22 * pressK + 0.05 * Math.sin(t * 20) * (tears === 3 ? 1 : 0), hops })
        // the tissue box slides over from the game master
        const tk = prog(t, ...T.tissues)
        if (t >= T.tissues[0]) drawTissues(x, lerp(cx - 40, cx + 18, ease.outCubic(tk)), cy + 92, 46, t)
      }
    }, { press: pressK })
  }

  // ═══════════════════════ the room ═══════════════════════
  function drawStars(t) {
    // ── ♏ Scorpio
    {
      let mood = 'neutral', look = [1, 0], sq = 0, sweat = 0, blush = 0, hops = [...SH], blink, size = SCP.s
      if (t < T.drop) {
        if (t < T.slam[1]) { look = [1, -1] } else { mood = 'wide'; look = t < T.timerOn ? [1, -1] : [0, -1]; sq = 0.16 * bump(t, T.slam[1], 0.35) + 0.1 * bump(t, T.timerOn, 0.3); sweat = prog(t, T.timerOn, T.timerOn + 1.2) }
        hops = [T.slam[1] + 0.02]
      } else if (t < T.p1) {
        mood = t < LT[1].done + 0.2 ? 'neutral' : 'eyeroll'; look = t < LINES[1].t ? [-1, -1] : [1, 0]
      } else if (t < T.p2) {
        if (t < T.force[0]) { mood = 'neutral'; look = [0, 0] }
        else if (t < T.real) { mood = 'squint'; look = [1, -1]; sq = 0.12 * flinch(t, T.force.map(v => v + 0.28)) }
        else if (t < LINES[3].t) { mood = 'wide'; look = [0, 0]; sq = 0.12 * bump(t, T.real, 0.3) }
        else if (t < T.open1) { mood = 'sparkle'; look = [0, 1]; blush = 0.5 }
        else { mood = t < T.open1 + 1.0 ? 'happy' : 'squint'; look = [1, 0]; blush = 1 }
        hops = [...SH, T.open1 + 0.05]
      } else if (t < T.fin) {
        mood = t < LINES[6].t ? 'neutral' : t < T.open2 ? 'sparkle' : 'happy'; look = [1, 0]; sq = 0.06 * flinch(t, [T.buzzA, ...T.buzzB], 0.25)
      } else if (t < T.open3) {
        mood = t < LINES[7].t ? 'neutral' : t < LINES[8].t ? 'happy' : 'sparkle'; look = [1, 0]; blush = t >= LINES[8].t ? 1 : 0
      } else {
        const d = t - T.open3
        mood = d < 0.6 ? 'wide' : 'happy'; look = d < 0.6 ? [0, -1] : [1, 0]; sq = 0.14 * bump(t, T.open3, 0.3); blush = 0.6
        hops = [T.esc + 0.05, T.esc + 0.45]
      }
      const F = star(SCP.x, SCP.y, size, t, { color: SCO.color, glyph: SCO.glyph, mood, look, squash: sq, hops, blink, seed: 8 }, { cells: () => { sweatCell(x, sweat); blushCells(x, blush) } })
      // "I'm a locked one": a tiny padlock over Scorpio's head; it pops open with lock 1
      if (inR(t, LINES[2].t, T.open1 + 0.9)) {
        const k = pop01(t, LINES[2].t + 0.35, 0.3, 2.4), o = prog(t, T.open1, T.open1 + 0.3)
        drawPadlock(x, SCP.x + 4, F.cy - 150 - 30 * o, 56 * k, { open: o, alpha: 1 - prog(t, T.open1 + 0.5, T.open1 + 0.9) })
      }
    }
    // ── ♊ Gemini
    {
      let mood = 'neutral', look = [-1, 0], sq = 0, sweat = 0, blush = 0, hops = [...GH], size = GEP.s
      if (t < T.drop) {
        if (t < T.slam[1]) { look = [-1, -1] } else if (t < T.gemYay) { mood = 'wide'; look = [-1, -1]; sq = 0.16 * bump(t, T.slam[1], 0.35) } else { mood = 'happy'; look = [-1, 0] }
        hops = [T.slam[1] + 0.02, T.gemYay, T.gemYay + 0.38, T.gemYay + 0.76]
      } else if (t < T.p1) {
        mood = t < LINES[1].t ? 'neutral' : 'happy'; look = t < LINES[1].t ? [-1, -1] : [0, 0]
      } else if (t < T.p2) {
        if (t < T.force[0]) { mood = 'squint'; look = [-1, 0] }
        else if (t < LINES[3].t) { mood = 'squint'; look = [-1, -1]; sq = 0.08 * flinch(t, [...T.force.map(v => v + 0.28), T.real]) }
        else if (t < T.open1) { mood = 'sparkle'; look = [-1, 0] }
        else { mood = 'sparkle'; look = [-1, 0]; blush = 1 }
        hops = [T.open1 + 0.1, T.open1 + 0.5]
      } else if (t < T.fin) {
        if (t < T.quiet[0]) { mood = inR(t, T.buzzA, T.buzzA + 0.9) || t >= T.buzzB[0] ? 'wide' : 'happy'; look = [0, -1]; sq = 0.14 * flinch(t, [T.buzzA, ...T.buzzB], 0.28) }
        else if (t < T.open2) { mood = t < LINES[6].t ? 'neutral' : 'sparkle'; look = [0, 1]; size = lerp(GEP.s, 214, ease.inOutQuad(prog(t, T.quiet[0], LINES[6].t + 0.6))); sweat = t < LINES[6].t ? prog(t, T.quiet[0], T.quiet[1]) : 0 }
        else { mood = 'wide'; look = [-1, 0]; size = lerp(214, GEP.s, ease.outBack(prog(t, T.open2, T.open2 + 0.4))) }
        if (t >= T.quiet[0]) hops = [T.open2 + 0.05]
      } else if (t < T.open3) {
        mood = t < LT[7].done ? 'neutral' : t < LT[8].done ? 'sparkle' : 'heart'; look = [-1, 0]; blush = t >= LT[7].done ? 1 : 0
        hops = [LT[7].done + 0.05, LT[8].done + 0.05, LT[8].done + 0.45]
      } else {
        const d = t - T.open3
        mood = d < 0.6 ? 'wide' : 'heart'; look = d < 0.6 ? [0, -1] : [-1, 0]; sq = 0.14 * bump(t, T.open3, 0.3); blush = 0.6
        hops = [T.esc + 0.1, T.esc + 0.5, T.esc + 0.9]
      }
      star(GEP.x, GEP.y + (GEP.s - size) * 0.44, size, t, { color: GEM.color, glyph: GEM.glyph, mood, look, squash: sq, hops, seed: 4 }, { cells: () => { sweatCell(x, sweat); blushCells(x, blush) } })
      // "I'm an open book": a book pops up next to Gemini
      if (inR(t, T.book, T.p1 + 0.3)) drawBook(x, GEP.x - 150, 1110 + Math.sin(t * 3) * 6, 120, t, { k: pop01(t, T.book, 0.3, 2.4) * popOut(t, [T.p1 - 0.1, T.p1 + 0.2]), rot: -0.12 })
    }
  }

  function drawRoomScene(t) {
    const dim = t >= T.fin && t < T.open3 ? ease.inOutQuad(prog(t, T.fin, T.fin + 0.6)) * (1 - prog(t, T.open3, T.open3 + 0.3)) : 0
    const alarm = inR(t, T.buzzB[0], T.tryReal + 0.3) ? 0.6 + 0.4 * Math.sin(t * 20) : 0
    drawRoom(x, t, { dim: dim * 0.9, alarm })
    drawSign(x, 880, 680, t)
    // the door: slammed in the hook, opens at the lift
    const doorOpen = t < T.slam[1] ? lerp(0.75, 0, ease.inQuad(prog(t, ...T.slam))) : t >= T.open3 ? ease.outCubic(prog(t, T.open3, T.open3 + 0.7)) : 0
    const glow = t >= T.fin ? clamp(prog(t, T.fin + 0.3, T.fin + 0.9)) * (0.7 + 0.3 * Math.sin(t * 4)) : 0
    const slamShake = t > T.slam[1] ? 8 * Math.exp(-(t - T.slam[1]) * 10) * Math.sin((t - T.slam[1]) * 60) : 0
    x.save(); x.translate(slamShake, 0)
    drawDoor(x, t, { open: doorOpen, glow, sign: t >= T.open3 ? 'EXIT' : 'LOCKED', signK: t < T.sign ? 0 : pop01(t, T.sign, 0.25, 2.6) })
    x.restore()
    dustPuff(x, 420, 1196, prog(t, T.slam[1], T.slam[1] + 0.8), { n: 8, spread: 160, seed: 3 })
    dustPuff(x, 660, 1196, prog(t, T.slam[1], T.slam[1] + 0.8), { n: 8, spread: 160, seed: 4 })
    // the countdown
    drawTimer(x, TIMER.cx, TIMER.cy, secsLeft(t), t, { on: t < T.timerOn ? 0 : (Math.floor((t - T.timerOn) * 14) % 2 || t > T.timerOn + 0.3 ? 1 : 0), frozen: t >= T.open3, red: secsLeft(t) < 20 * 60 })
    windowScene(t)

    // lock 1: the chest (slides out left at lock 2)
    if (t >= T.p1 && t < T.p2 + 0.4) {
      const inK = pop01(t, T.p1 + 0.02, 0.35, 1.8), outP = ease.inCubic(prog(t, T.p2, T.p2 + 0.35))
      const shake = flinch(t, T.force.map(v => v + 0.28), 0.2) * 6 * Math.sin(t * 80)
      x.save(); x.translate(CHEST.cx - 700 * outP, CHEST.by); x.scale(inK, inK); x.translate(-CHEST.cx, -CHEST.by)
      drawChest(x, CHEST.cx, CHEST.by, CHEST.w, CHEST.h, t, { lock: prog(t, T.open1, T.open1 + 0.6), lid: prog(t, T.open1 + 0.15, T.open1 + 0.55), shake })
      x.restore()
      if (t >= T.open1) sparkleRing(t, CHEST.cx, CHEST.by - CHEST.h, T.open1 + 0.2, 10, 200, 0.2)
    }
    // lock 2: the safe (slides in from the right, out left at the final door)
    if (t >= T.p2 && t < T.fin + 0.4) {
      const inP = ease.outBack(prog(t, T.p2 + 0.05, T.p2 + 0.42), 1.4), outP = ease.inCubic(prog(t, T.fin, T.fin + 0.35))
      const shake = flinch(t, [T.buzzA, ...T.buzzB], 0.2) * 6 * Math.sin(t * 80)
      drawSafe(x, SAFE.cx + 700 * (1 - inP) - 700 * outP, SAFE.by, SAFE.w, SAFE.h, t, { open: prog(t, T.open2, T.open2 + 0.5), shake, dial: t * 0.6 + flinch(t, [T.buzzA, ...T.buzzB], 0.3) * 0.8 })
      if (t >= T.open2) sparkleRing(t, SAFE.cx, SAFE.by - SAFE.h / 2, T.open2 + 0.15, 10, 190, 0.5)
    }
    // the ANSWER panel (locks 1 + 2)
    if (t >= T.p1 && t < T.fin + 0.35) {
      const sc = pop01(t, T.p1 + 0.15, 0.32, 2) * (1 - ease.inCubic(prog(t, T.fin, T.fin + 0.3)))
      const st = panelState(t)
      const shake = (st.mark === 'x' && st.flash > 0 ? 8 * Math.sin(t * 90) * st.flash : 0)
      drawPanel(x, PANEL.cx + shake, PANEL.cy, PANEL.w, PANEL.h, t, { ...st, sc })
    }
    crickets(t)

    drawStars(t)
    // the escape: stamp + confetti + Pisces leaps out of the window
    if (t >= T.esc) {
      confetti(x, t, T.esc, { n: 50, seed: 15 })
      const sk = pop01(t, T.esc, 0.24, 3)
      drawStamp(x, 540, 860, sk, ['ESCAPED!', '12:07 LEFT · ROOM RECORD'], { color: LCD, rot: -0.12, size: 84, w: 720 })
      const lp = prog(t, ...T.pisLeap)
      if (t >= T.pisLeap[0]) {
        const px = lerp(WIN.x + 224, 540, lp), py = lerp(WIN.y + 140, 1250, lp) - Math.sin(Math.PI * lp) * 260
        const land = t > T.pisLeap[1] ? 0.2 * Math.exp(-(t - T.pisLeap[1]) * 8) * Math.cos((t - T.pisLeap[1]) * 26) : 0
        pisces(t, px, py, lerp(120, 190, lp), { mood: 'heart', tears: 3, look: [0, 0], rot: lp < 1 ? lp * TAU : 0, squash: land, hops: [T.pisLeap[1] + 0.5, T.pisLeap[1] + 0.9, T.pisLeap[1] + 1.3] })
      }
    }
    if (t >= T.open3) sparkleRing(t, 540, 940, T.open3 + 0.1, 14, 330, 0.1)
  }

  // ═══════════════════════ tie-in: talk cards ═══════════════════════
  function drawTie(t) {
    const kIn = ease.outCubic(prog(t, T.tie, T.tie + 0.42)), kOut = popOut(t, T.tieOut)
    const cw = 430, ch = cw * 1170 / 732
    const cy = lerp(1700, 860, kIn), rot = lerp(0.35, -0.03, kIn)
    if (TALK) {
      x.save(); x.translate(540, cy); x.rotate(rot); x.scale(kOut, kOut)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(0, 0, 100, 0, 0, 420); g.addColorStop(0, 'rgba(242,199,92,0.28)'); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.fillRect(-420, -420, 840, 840); x.restore()
      x.imageSmoothingEnabled = true; x.drawImage(TALK, -cw / 2, -ch / 2, cw, ch)
      x.restore()
    }
    // the caption
    x.save(); x.globalAlpha = clamp(prog(t, T.tie + 0.4, T.tie + 0.7)) * kOut
    x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.85)'
    x.fillText('ANSWERS STAY HIDDEN TILL YOU BOTH PLAY', 540, 1236)
    x.restore()
    // two face-down answers flip at the same moment
    const fl = ease.inOutQuad(prog(t, ...T.flip))
    const tk = pop01(t, T.tiles, 0.3, 2) * kOut
    if (tk > 0) {
      x.save(); x.translate(300, 1340); x.scale(tk, tk); drawTile(x, 0, 0, 340, 116, fl, { who: 'SCORPIO', text: "grandma's kitchen" }); x.restore()
      x.save(); x.translate(780, 1340); x.scale(tk, tk); drawTile(x, 0, 0, 340, 116, fl, { who: 'GEMINI', text: "dad's bad jokes" }); x.restore()
      if (t >= T.flip[1]) { sparkleRing(t, 300, 1340, T.flip[1], 8, 170, 0.2); sparkleRing(t, 780, 1340, T.flip[1], 8, 170, 0.6) }
    }
    const pk = (i) => kOut * pop01(t, T.tie + 0.1 + i * 0.08, 0.3, 2)
    star(250, 1560, 210, t, { color: SCO.color, glyph: SCO.glyph, mood: t >= T.flip[1] ? 'happy' : 'neutral', look: [1, -1], seed: 8, pop: pk(0), hops: [T.flip[1] + 0.05] }, { cells: () => blushCells(x, t >= T.flip[1] ? 0.8 : 0.3) })
    star(830, 1560, 210, t, { color: GEM.color, glyph: GEM.glyph, mood: t >= T.flip[1] ? 'heart' : 'happy', look: [-1, -1], seed: 4, pop: pk(1), hops: [T.flip[1] + 0.1, T.flip[1] + 0.5] })
    pisces(t, 540, 1700, 130, { mood: 'sparkle', tears: 3, look: [0, -1], pop: pk(2) })
  }

  // ═══════════════════════ the last line: outside, under the stars ═══════════════════════
  function drawLast(t) {
    const pk = (i) => popOut(t, [T.out[0] + i * 0.04, T.out[0] + 0.3 + i * 0.04])
    const rk = pop01(t, T.last, 0.4, 1.6) * pk(3)
    // the room, small, floating behind them, its door wide open
    if (rk > 0) {
      x.save(); x.translate(540, 900); x.scale(0.46 * rk, 0.46 * rk); x.translate(-540, -910)
      drawRoom(x, t)
      drawSign(x, 880, 680, t)
      drawDoor(x, t, { open: 1, sign: 'EXIT' })
      drawTimer(x, TIMER.cx, TIMER.cy, LEFT_AT_ESCAPE, t, { frozen: true })
      drawWindow(x, t, (cx, cy) => star(cx - 60, cy + 18, 112, t, { color: CAP.color, mood: 'happy', look: [1, 1], seed: 21, bob: 2 }, { cells: () => headsetCells(x) }))
      pisces(t, 540, 1100, 200, { mood: 'heart', tears: 3, look: [0, 0], hops: [T.last + 0.6, T.last + 1.0, T.last + 1.4] })
      x.restore()
    }
    star(330, 1330, 300, t, { color: SCO.color, glyph: SCO.glyph, mood: t < T.nod ? 'sparkle' : 'happy', look: [1, 0], seed: 8, pop: pk(0) * pop01(t, T.last, 0.3, 2), hops: [T.nod, T.nod + 0.36], squash: 0.1 * bump(t, T.nod - 0.2, 0.3) }, { cells: () => blushCells(x, 1) })
    star(750, 1330, 300, t, { color: GEM.color, glyph: GEM.glyph, mood: 'heart', look: [-1, 0], seed: 4, pop: pk(1) * pop01(t, T.last + 0.08, 0.3, 2), hops: [T.last + 0.35, T.lastLand + 0.05, T.nod + 0.4] }, { cells: () => blushCells(x, 0.7) })
    // the souvenir: lock 1's open padlock, held up by Gemini
    drawPadlock(x, 900, 1170 + Math.sin(t * 3) * 6, 70 * pk(2) * pop01(t, T.last + 0.3, 0.3, 2.4), { open: 1, rot: 0.2 })
    const rr = rng(77)
    for (let k = 0; k < 9; k++) { const t0 = T.lastLand + rr() * 1.2, d = t - t0, hx = 260 + rr() * 560; if (d > 0 && d < 1.6) { x.save(); x.globalAlpha = (1 - d / 1.6) * pk(2); drawHeart(x, hx + Math.sin(d * 4 + k) * 20, 1180 - d * 220, 6, k % 2 ? PINK : '#ff4f7e'); x.restore() } }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.tie) drawRoomScene(t)
      else if (t < T.last) drawTie(t)
      else if (t < T.out[1] + 0.05) drawLast(t)
      // type
      H0.update(t, t < T.drop ? 1 : 0)
      HR.update(t, t >= T.drop && t < T.p1 ? 1 : 0)
      HP1.update(t, t >= T.p1 && t < T.p2 ? 1 : 0)
      HP2.update(t, t >= T.p2 && t < T.fin ? 1 : 0)
      HF.update(t, t >= T.fin && t < T.open3 ? 1 : 0)
      HO.update(t, t >= T.open3 && t < T.lesson ? 1 : 0)
      HT.update(t, t >= T.tie && t < T.last ? outK(t, T.tieOut) : 0)
      HE.update(t, t >= T.last ? outK(t, [T.out[0] + 0.05, T.out[0] + 0.35]) : 0)
      box.update(t)
      lesson.update(t)
      const fl = Math.max(bump(t, T.open3, 0.35) * 0.45, bump(t, T.slam[1], 0.12) * 0.25)
      flashEl.style.opacity = String(fl)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 3 of these 7 (indices 1, 3, 5):
// 8.88 (→ lock 1), 23.33 (→ the final door), 34.8 (→ talk cards). The end card flips at 40.6.
export const CUTS = [3.33, 8.88, 15.55, 23.33, T.cutL, 34.8, 38.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in D and moved by the engine; chip is written in C major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const CM = { C3: 130.81, G3: 196, C4: 261.63, E4: 329.63, G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51, G6: 1567.98 }
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const noise = (t, f, len, g, o = {}) => ['chip', r3(t), f, len, { wave: 'noise', gain: g, decay: len * 0.6, sustain: 0, ...FXO, ...o }]
const beep = (t, f, len = 0.07, g = 0.02) => ['chip', r3(t), f, len, { wave: 'square', duty: 0.125, gain: g, decay: len * 0.7, sustain: 0.4, ...FXO }]
const buzz = (t, len = 0.3, g = 0.03) => ['chip', r3(t), 110, len, { wave: 'square', duty: 0.5, gain: g, decay: len * 0.9, sustain: 0.9, ...FXO }]
const keys = (t0, n) => Array.from({ length: n }, (_, k) => ['tick', r3(t0 + k * 0.06), 0.022])
const clunk = t => [['pop', r3(t), 147, 0.07, 0], ['tick', r3(t), 0.06], noise(t, 1400, 0.08, 0.03)]
const unlock = t => [...clunk(t), ...[CM.C5, CM.E5, CM.G5, CM.C6].map((f, k) => ['chip', r3(t + 0.12 + k * 0.06), f, 0.18, { duty: 0.25, gain: 0.03, decay: 0.14, sustain: 0.6, rev: 0.15, dly: 0.12, bus: 'fx' }]), ['bell', r3(t + 0.15), 1318.51, 0.035, 1.4, 0], ['glitter', r3(t + 0.15), r3(t + 0.9)]]
const chirp = t => [0, 0.07, 0.14].map(d => ['chip', r3(t + d), 4186, 0.04, { wave: 'square', duty: 0.5, gain: 0.009, decay: 0.03, sustain: 0.3, ...FXO }])
const typeOn = (i, n) => keys(LT[i].chars[0], n)

export const CUES = [
  // 0 · the hook: the door slams, the lock clunks, the sign buzzes on, the timer beeps on, Gemini squeals
  ['whoosh', 0.0, 0.3, 0.05], ['boom', r3(T.slam[1]), 0.28], noise(T.slam[1], 500, 0.3, 0.05), ...clunk(T.slam[1] + 0.12),
  ...head(T.h0, 2, T.h0Land, 0),
  ['chip', r3(T.sign), CM.C3 * 2, 0.22, { wave: 'square', duty: 0.5, gain: 0.02, decay: 0.2, sustain: 0.8, ...FXO }],
  beep(T.timerOn, CM.C6, 0.08, 0.025), beep(T.timerOn + 0.14, CM.C6, 0.08, 0.025), beep(T.timerOn + 0.28, CM.G6, 0.16, 0.025),
  ...[0, 0.38, 0.76].map((d, k) => ['pop', r3(T.gemYay + d), NOTE[3 + k], 0.035, 0.4]),
  ['pop', r3(T.pisIn + 0.1), 1318.51, 0.03, -0.5],
  // 1 · the rules
  ['boom', r3(T.drop - 0.02), 0.14], ...head(T.drop + 0.05, 2, T.drop + 0.5, 3),
  ...talkCues(LINES, { cps: CPS, pitch: { [GM]: 587.33, [SC]: 659.25, [GE]: 987.77 } }),
  ['pop', r3(T.book), 880, 0.04, 0.4], ['pluck', r3(T.book + 0.05), 1318.51, 0.03, 0.5, 0.4],
  // 2 · lock 1: the brute force, the error, the memory typed in, the unlock
  ['whoosh', r3(T.p1), 0.35, 0.04], ...head(T.p1 + 0.05, 3, T.p1 + 0.45, 1), ['pop', r3(T.p1 + 0.15), 659.25, 0.03, 0],
  ['pop', r3(LINES[2].t + 0.35), 1174.66, 0.03, -0.4],
  ...T.force.flatMap(f => [...keys(f, 4), buzz(f + 0.28, 0.22)]),
  buzz(T.real, 0.4, 0.032), ...[CM.E5, CM.C5, CM.G4].map((f, k) => beep(T.real + 0.05 + k * 0.12, f, 0.1, 0.02)),
  ...typeOn(3, 17),
  ...unlock(T.open1), ['pop', r3(T.open1 + 0.15), 196, 0.05, 0], ['whoosh', r3(T.open1 + 0.15), 0.4, 0.035],
  ['pop', r3(T.tissues[0]), 440, 0.03, -0.5], ['tick', r3(T.tissues[1]), 0.03],
  // 3 · lock 2: the safe, the fears, the buzzers, crickets, the real one
  ['whoosh', r3(T.p2), 0.4, 0.045], ['boom', r3(T.p2 + 0.42), 0.12], ...head(T.p2 + 0.05, 1, T.p2 + 0.4, 2),
  ...keys(LT[4].done - 0.35, 6), buzz(T.buzzA, 0.3),
  ...T.buzzB.flatMap(b => [...keys(b - 0.12, 2), buzz(b, 0.18, 0.03)]),
  buzz(T.tryReal, 0.35, 0.03), ...T.buzzB.map((b, k) => ['chip', r3(b), [CM.A5, CM.E5, CM.A5][k], 0.18, { wave: 'square', duty: 0.5, slide: k % 2 ? 6 : -6, gain: 0.012, decay: 0.15, sustain: 0.8, ...FXO }]),
  ...chirp(T.quiet[0] + 0.1), ...chirp(T.quiet[0] + 0.35),
  ...typeOn(6, 22),
  ...unlock(T.open2),
  // 4 · the final door (breakdown): the plaque hums
  ['whoosh', r3(T.fin), 0.4, 0.035], ...head(T.fin + 0.08, 2, T.fin + 0.55, 4),
  ['chip', r3(T.fin + 0.3), CM.C4, 1.6, { wave: 'tri', vib: 0.03, gain: 0.02, decay: 1.4, sustain: 0.7, rev: 0.25, dly: 0, bus: 'fx' }],
  ['pop', r3(LT[7].done + 0.05), 1318.51, 0.03, 0.5], ['pop', r3(LT[8].done + 0.05), 1174.66, 0.035, 0.5],
  ['riser', r3(T.open3 - 1.2), r3(T.open3), 0.04],
  // 5 · the door opens (lift) + ESCAPED
  ...clunk(T.open3), ['chip', r3(T.open3 + 0.05), CM.G3, 0.6, { wave: 'square', duty: 0.25, slide: 9, gain: 0.016, decay: 0.5, sustain: 0.6, ...FXO }],
  ['bell', r3(T.open3 + 0.1), 1174.66, 0.04, 1.8, 0], ['glitter', r3(T.open3 + 0.1), r3(T.open3 + 1.0)],
  ...head(T.open3 + 0.1, 3, T.open3 + 0.45, 0),
  ['boom', r3(T.esc), 0.18], ['pop', r3(T.esc), 130, 0.07, 0], ['tick', r3(T.esc), 0.06],
  ...[CM.C5, CM.E5, CM.G5, CM.C6, CM.E6].map((f, k) => ['chip', r3(T.esc + 0.05 + k * 0.07), f, 0.2, { duty: 0.25, gain: 0.028, decay: 0.16, sustain: 0.6, rev: 0.15, dly: 0.12, bus: 'fx' }]),
  ['whoosh', r3(T.pisLeap[0]), 0.5, 0.04], ['pop', r3(T.pisLeap[1]), 330, 0.05, 0], ['tick', r3(T.pisLeap[1]), 0.05],
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'C' }),
  // 7 · tie-in: the talk card deals in, the two answers flip together
  ['whoosh', r3(T.tie), 0.4, 0.04], ...head(T.tie + 0.05, 3, T.tie + 0.4, 2),
  ['pop', r3(T.tiles), 880, 0.03, -0.3], ['pop', r3(T.tiles + 0.04), 1174.66, 0.03, 0.3],
  ['whoosh', r3(T.flip[0]), 0.3, 0.03], ['tick', r3(T.flip[1] - 0.17), 0.04], ['pluck', r3(T.flip[1]), 1174.66, 0.04, 0.6, -0.3], ['pluck', r3(T.flip[1]), 1479.98, 0.04, 0.6, 0.3], ['glitter', r3(T.flip[1]), r3(T.flip[1] + 0.6)],
  // 8 · the last line
  ...head(T.last + 0.02, 1, T.lastLand, 0),
  ...[T.last + 0.35, T.lastLand + 0.05].flatMap((c, j) => Array.from({ length: 4 }, (_, k) => ['pop', r3(c + k * 0.04), NOTE[(k * 2 + j) % 7], 0.02, ((k % 3) - 1) * 0.4])),
  ['pop', r3(T.nod), 784, 0.035, -0.3], ['pop', r3(T.nod + 0.36), 988, 0.035, -0.3],
  ['whoosh', r3(T.out[0]), 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BUZZES
