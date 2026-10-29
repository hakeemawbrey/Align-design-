// st8comeback (30 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E15) · story 0–25.6, then the end card.
//   Genre: sports commentary. Leo (play-by-play) and Sagittarius (colour) call Capricorn's ex's comeback attempt:
//   the run, the speech, the slow-mo replay with the telestrator ("SAID" circled four times, "SHOWN" empty), then the
//   ref, Saturn (Capricorn's real ruler), throws a flag. Capricorn: show it, over time.
//   0.00–2.45  FRAME 0: night stadium, the ex mid-sprint across the field with a bouquet, speed lines; Capricorn waiting
//              on the right; the booth windows (Leo, Sag) and the SAID / SHOWN scoreboard. Hook: "And he's going for
//              the *I've changed!*"
//   2.50       LEO: "UNBELIEVABLE. he *rehearsed* this!" → SAG: "he said that last *season,* Leo." → THE EX: "cap.
//              i've changed. i *swear.*" (SAID +1)
//  ~10.7       ▶ REPLAY, slo-mo, VHS blue: the telestrator circles the speech bubble (SAID ×4) and the empty hands
//              (SHOWN: ?). SAG: "lots of said. zero *shown.*"
//  ~13.8       WHISTLE. Ref Saturn pops in and throws the flag: FLAG · SAID ≠ SHOWN. Chip: SATURN RULES CAPRICORN.
//              CAPRICORN: "if you've changed, i'll *see* it. no speech needed."  The ex: "…fair." and jogs back out
//              the way he came (the frame-0 lane, reversed), waving; the scoreboard flips SHOWN to "TBD".
//  ~21.7       "Changed is *shown,* | not said."
//   Rewatch bait: the Orbiter (E03) sits in the stands' back row, its red "viewed" light blinking. The hidden comet
//   crosses the night sky over the stadium; the ghost peeks up from behind the team bench.
// One canvas (sky + stadium + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits, drawSaturn, SATURN } from '../../st5cast.js'
import { drawSatellite, exPin, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { pop01, outK, popOut, r3, R, glow, burst, monoText, panel, seq, wordPops, flash, chip, hiddenComet, rgba, GOLD, BONE, INK, PINK, NOTE } from '../kit.js'

export const DURATION = 30
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const TURF = '#2f8a4a', TURF2 = '#2a7a42', CHALK = '#e8f5e0', MARKER = '#ffe23d'
const DAY = { day: 26, phase: 'morning' }
const LEO = signStar('leo'), SAG = signStar('sagittarius'), CAP = signStar('capricorn')
const TAG = { LEO: '♌ LEO · PLAY-BY-PLAY', SAG: '♐ SAG · COLOUR', EX: '✕ CAP’S EX', CAP: '♑ CAPRICORN' }
const CPS = 28

// ── the script
const S1 = seq(2.5, [
  { who: TAG.LEO, x: 'UNBELIEVABLE. he *rehearsed* this!', hold: 1.4 },
  { who: TAG.SAG, x: 'he said that last *season,* Leo.', hold: 1.5 },
  { mark: 'arrive' },
  { who: TAG.EX, x: 'cap. i’ve changed. i *swear.*', color: '#ff8a9a', hold: 1.4 },
  { mark: 'replay' },
  { who: TAG.SAG, x: 'lots of said. zero *shown.*', hold: 1.5, pre: 0.3 },
  { mark: 'whistle' },
  { who: TAG.CAP, x: 'if you’ve changed, i’ll *see* it. no speech needed.', hold: 1.5, pre: 1.6 },
  { mark: 'leave' },
])
const LINES = S1.lines, M = S1.marks
const T = {
  hookOut: 2.45, arrive: r3(M.arrive - 0.2), said: r3(M.arrive + 0.6),
  replay: [r3(M.replay - 0.1), r3(M.whistle)], whistle: r3(M.whistle + 0.05), flag: r3(M.whistle + 0.25),
  leave: r3(M.leave - 1.0), close: r3(S1.end + 0.15),
  comet: 4.2,
}
T.last = r3(Math.max(S1.end + 0.05, 21.4)); T.out = [25.05, 25.45]
T.ghost = r3(T.replay[1] + 1.8)
export const TIMES = T

// ── layout
const FIELD = { y0: 800, y1: 1440 }
const BENCH = { x0: 60, x1: 260, y: 1180 }
const CAPP = [840, 1210, 270], EXY = 1240, EXS = 250
export const GHOST = { at: T.ghost, x: 160, y: BENCH.y - 10, where: 'rising from behind the team bench on the left sideline' }
export const COMET = { at: T.comet, from: [1050, 330], to: [640, 420] }

const BOUQ = ['.P.R.P.', 'PRPYPRP', '.RPRPR.', '..GGG..', '...G...', '..GGG..']
const BOUQ_C = { P: '#ff8fb1', R: '#e2334c', Y: '#ffd34d', G: '#5fbf6a' }
const TIE = ['KK', 'BB', 'BB', 'BBB', '.B.']
const TIE_C = { K: '#1b1236', B: '#2a4a9a' }
const FLAG = ['YYYYY', 'YKYYY', 'YYYKY', 'YYYYY']
const FLAG_C = { Y: MARKER, K: '#c9a000' }
const HEADSET = ['.KKKKK.', 'K.....K', 'K.....K', 'R.....R']
const HEADSET_C = { K: '#3a3358', R: '#e2334c' }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'And he’s going for | the *I’ve changed!*', at: 0, out: T.hookOut, accentColor: MARKER })
  const box = dialogueBox(root, { lines: LINES, y: 1480, width: 960, height: 290, cps: CPS, close: T.close })
  const LAST = popText(root, 'Changed is *shown,* | not said.', { top: 200, size: 112, accentSize: 186, at: T.last, gap: 0.08, accentColor: MARKER, wobble: true, late: 0, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** where the ex is: sprinting in (frame 0 mid-run), standing at Capricorn, jogging back out the same lane */
  function exPos(t) {
    if (t < T.arrive) return { x: lerp(300, 620, ease.outCubic(clamp(t / T.arrive))), run: 1, dir: 1 }
    if (t < T.leave) return { x: 620, run: 0, dir: 1 }
    const p = prog(t, T.leave, T.leave + 3.2)
    return { x: lerp(620, 300, ease.inOutQuad(p)), run: p < 1 ? 0.6 : 0, dir: -1 }
  }
  function stadium(t, rt) {
    // floodlights + the stands
    for (const lx of [120, 960]) { R(x, '#3a3358', lx - 6, 560, 12, 120); R(x, '#fff6dc', lx - 40, 540, 80, 26); glow(x, lx, 553, 220, '#fff6dc', 0.5) }
    R(x, '#221a3e', 0, 660, 1080, 150)
    for (let row = 0; row < 3; row++) for (let i = 0; i < 26; i++) {
      const cx = 20 + i * 42 + (row % 2) * 20, cy = 680 + row * 40, hop = Math.max(0, Math.sin(rt * 6 + i * 1.7 + row)) * (rt > T.said && rt < T.said + 1.5 ? 10 : 2)
      R(x, ['#f0603a', '#2fc79a', '#f39a3a', '#a35cf0', '#e9e4ff'][(i + row * 2) % 5], cx, cy - hop, 18, 18)
    }
    // the Orbiter in the back row (rewatch bait)
    drawSatellite(x, 905, 668, 70, t, { mood: 'neutral', look: [-1, 1], aura: false, exPin: false })
    R(x, '#3a3358', 0, 800, 1080, 10)
    // the turf, mowed stripes + yard lines in perspective
    for (let i = 0; i < 8; i++) R(x, i % 2 ? TURF : TURF2, 0, FIELD.y0 + i * 80, 1080, 80)
    for (let k = -3; k <= 3; k++) { x.save(); x.strokeStyle = rgba(CHALK, 0.8); x.lineWidth = 6; x.beginPath(); x.moveTo(540 + k * 130, FIELD.y0); x.lineTo(540 + k * 200, FIELD.y1); x.stroke(); x.restore() }
    monoText(x, '40', 540 - 2 * 160, FIELD.y1 - 60, { size: 40, color: rgba(CHALK, 0.8), shadow: false })
    monoText(x, '50', 540, FIELD.y1 - 60, { size: 40, color: rgba(CHALK, 0.8), shadow: false })
    monoText(x, '40', 540 + 2 * 160, FIELD.y1 - 60, { size: 40, color: rgba(CHALK, 0.8), shadow: false })
    R(x, '#1e5a30', 0, FIELD.y1, 1080, 480)
    // the team bench (the ghost hides behind it)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    R(x, INK, BENCH.x0 - 6, BENCH.y - 6, BENCH.x1 - BENCH.x0 + 12, 40); R(x, '#5a6a8a', BENCH.x0, BENCH.y, BENCH.x1 - BENCH.x0, 26)
    R(x, INK, BENCH.x0 + 10, BENCH.y + 30, 14, 50); R(x, INK, BENCH.x1 - 24, BENCH.y + 30, 14, 50)
  }
  function booth(t) {
    const k = 1
    for (const [i, who, sc, col] of [[0, 'LEO', LEO, LEO.color], [1, 'SAG', SAG, SAG.color]]) {
      const bx = i ? 760 : 70, by = 480
      panel(x, bx, by, 250, 160, { P: 5, border: col, fill: 'rgba(16,9,38,0.95)', glow: 0.3 })
      x.save(); x.beginPath(); x.rect(bx + 12, by + 12, 226, 136); x.clip()
      const talking = LINES.some(L => L.speaker === TAG[who] && t >= L.t && t < L.t + 2.2)
      const r = drawStarChar(x, bx + 125, by + 104, 120, t, { color: sc.color, glyph: null, mood: who === 'LEO' ? (t < 6 ? 'wide' : 'happy') : 'squint', look: [i ? -1 : 1, 0], hops: talking ? talkHops(LINES, TAG[who], { cps: CPS }) : [], seed: 3 + i, glow: 0.6, pop: k })
      drawBits(x, HEADSET, HEADSET_C, Math.round(r.x), Math.round(r.top + 30), 7)
      x.restore()
      monoText(x, i ? 'COLOUR' : 'PLAY-BY-PLAY', bx + 125, by + 182, { size: 18, color: col })
    }
    // the scoreboard between them
    const said = t < T.said ? 3 : 4, shown = t >= T.leave + 1.2 ? 'TBD' : '0'
    panel(x, 360, 492, 360, 136, { P: 5, border: MARKER, fill: '#0b0820', glow: 0.3 })
    monoText(x, 'SAID', 450, 530, { size: 22, color: CHALK }); monoText(x, 'SHOWN', 630, 530, { size: 22, color: CHALK })
    const bump = Math.max(0, 1 - Math.abs(t - T.said) * 4), bump2 = Math.max(0, 1 - Math.abs(t - T.leave - 1.2) * 4)
    monoText(x, String(said), 450, 586, { size: 52 + 20 * bump, color: '#ff6a5a' })
    monoText(x, shown, 630, 586, { size: (shown === 'TBD' ? 38 : 52) + 20 * bump2, color: shown === 'TBD' ? '#9dffb0' : CHALK })
  }
  function players(t) {
    const e = exPos(t)
    // speed lines behind a runner
    if (e.run > 0) for (let i = 0; i < 6; i++) { const yy = EXY - 70 + i * 28, len = 120 + (i * 37) % 80; R(x, rgba(CHALK, 0.6 * e.run), e.x - e.dir * (130 + len) , yy, len, 6) }
    const tilt = e.run * 0.15 * e.dir
    x.save(); x.translate(e.x, EXY); x.rotate(tilt); x.translate(-e.x, -EXY)
    const holding = t < T.leave + 0.2
    const r = drawStarChar(x, e.x, EXY, EXS, t, { color: '#efe6d6', mood: t < T.arrive ? 'sparkle' : t < T.whistle ? 'happy' : t < T.leave ? 'wide' : 'neutral', look: [e.dir, 0], hops: e.run > 0 ? Array.from({ length: 30 }, (_, i) => i * 0.32) : talkHops(LINES, TAG.EX, { cps: CPS }), seed: 8, glow: 0.7 })
    x.restore()
    exPin(x, r.x - 70, r.top + 30, t, { scale: 1.2 })
    if (holding) drawBits(x, BOUQ, BOUQ_C, Math.round(r.x + e.dir * 110), Math.round(r.y - 10), 9)
    // the leave: a little "…fair." bubble and a wave
    if (t > T.leave - 0.2 && t < T.leave + 2.2) chip(x, t, { at: T.leave - 0.2, out: T.leave + 2.2, text: '…fair.', x: r.x, y: r.top - 50, size: 30, color: INK, border: BONE, fill: '#fff6e2', type: false })
    // Capricorn, in its tie, waiting
    const capMood = t < T.arrive ? 'neutral' : t < T.whistle ? 'squint' : t < M.leave ? 'neutral' : 'happy'
    const rc = drawStarChar(x, CAPP[0], CAPP[1], CAPP[2], t, { color: CAP.color, glyph: CAP.glyph, mood: capMood, look: [-1, 0], hops: talkHops(LINES, TAG.CAP, { cps: CPS }), seed: 12, glow: 0.9 })
    drawBits(x, TIE, TIE_C, Math.round(rc.x), Math.round(rc.y + 40), 9)
    return r
  }
  function referee(t) {
    const k = pop01(t, T.whistle - 0.25, 0.35, 2.2) * (1 - ease.inCubic(prog(t, M.leave + 0.5, M.leave + 1.0)))
    if (k <= 0.02) return
    const sx = 940, sy = 1000
    drawSaturn(x, sx, sy, 230, t, { mood: t < T.flag + 0.5 ? 'wide' : 'squint', look: [-1, 1], pop: k, hops: [T.whistle - 0.1, T.flag], seed: 4 })
    // ref stripes on a little pixel shirt under the planet
    for (let i = 0; i < 6; i++) R(x, i % 2 ? '#ffffff' : INK, sx - 48 + i * 16, sy + 86, 16, 46 * k)
    // the flag, thrown in an arc to the ex's feet
    const fp = prog(t, T.flag, T.flag + 0.7)
    if (fp > 0) {
      const fx = lerp(sx - 80, 640, ease.outQuad(fp)), fy = lerp(sy - 40, EXY + 120, fp) - Math.sin(Math.PI * fp) * 260
      drawBits(x, FLAG, FLAG_C, Math.round(fx), Math.round(fy), 10, { rot: fp * 7 })
    }
  }
  /** the replay: blue VHS tint, scanlines, ▶ REPLAY and the telestrator */
  function replayFx(t) {
    const [a, b] = T.replay
    x.save(); x.globalCompositeOperation = 'color'; x.fillStyle = 'rgba(80,140,255,0.55)'; x.fillRect(0, 0, 1080, 1920); x.restore()
    for (let y = 0; y < 1920; y += 6) R(x, 'rgba(0,0,20,0.18)', 0, y, 1080, 2)
    monoText(x, '▶ REPLAY  ·  SLO-MO', 96, 870, { size: 34, color: '#ffffff', align: 'left' })
    // the speech bubble in the replay
    panel(x, 380, 950, 300, 90, { P: 5, border: BONE, fill: '#fff6e2', glow: 0 })
    monoText(x, 'I’VE CHANGED', 530, 996, { size: 28, color: INK, shadow: false })
    // telestrator strokes: drawn progressively
    const tel = (p, fn) => { if (p <= 0) return; x.save(); x.strokeStyle = MARKER; x.lineWidth = 12; x.lineCap = 'round'; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 6; fn(clamp(p)); x.restore() }
    tel(prog(t, a + 0.3, a + 0.9), p => { x.beginPath(); x.ellipse(530, 995, 190, 75, -0.05, -1.4, -1.4 + p * Math.PI * 2.1); x.stroke() })
    tel(prog(t, a + 1.0, a + 1.3), p => { x.beginPath(); x.moveTo(700, 940); x.lineTo(lerp(700, 780, p), lerp(940, 880, p)); x.stroke() })
    if (t > a + 1.3) monoText(x, 'SAID ×4', 800, 860, { size: 34, color: MARKER, align: 'left' })
    tel(prog(t, a + 1.5, a + 2.1), p => { x.setLineDash([22, 16]); x.beginPath(); x.ellipse(620, 1260, 130, 60, 0, 0, p * Math.PI * 2); x.stroke() })
    if (t > a + 2.1) monoText(x, 'SHOWN: ?', 620, 1360, { size: 34, color: MARKER })
    void b
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      hiddenComet(x, t, { at: COMET.at, from: COMET.from, to: COMET.to, dur: 2.4 })
      const ok = popOut(t, T.out)
      const inReplay = t >= T.replay[0] && t < T.replay[1]
      // in the replay, time slows down over the ex's arrival
      const rt = inReplay ? lerp(T.arrive - 0.6, T.said + 0.4, (t - T.replay[0]) / (T.replay[1] - T.replay[0])) : t
      x.save(); x.globalAlpha = ok
      stadium(t, rt)
      players(rt)
      referee(t)
      if (inReplay) replayFx(t)
      booth(t)
      if (!inReplay) {
        chip(x, t, { at: T.flag + 0.6, out: M.leave + 0.6, text: '🚩 FLAG · SAID ≠ SHOWN', x: 540, y: 760, size: 32, color: MARKER, border: MARKER, type: false })
        chip(x, t, { at: T.flag + 1.4, out: M.leave + 0.6, text: '✦ REAL: SATURN RULES CAPRICORN', x: 540, y: 860, size: 24, color: GOLD, type: false })
      }
      x.restore()
      flash(x, t, T.replay[0], { dur: 0.2, peak: 0.6, col: '#cfe0ff' })
      flash(x, t, T.replay[1], { dur: 0.2, peak: 0.5 })
      if (t < T.out[1]) {
        drawDayChip(x, t, DAY)
        genreBug(x, t, { text: inReplay ? '▶ REPLAY' : '● LIVE · 5TH HOUSE SPORTS', x: 96, y: 1838, color: '#e2334c', blink: false })
      }
      hook.update(t)
      box.update(t)
      LAST.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: into the replay, out of it, the last line
const CUTS = [{ t: T.replay[0] - 0.03, kind: 'flip' }, { t: T.replay[1] - 0.03, kind: 'deal' }, { t: T.last - 0.08, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E15' }), cardCuts(CUTS)]

// ── sound
const cheer = (at, n = 10, g = 0.04) => Array.from({ length: n }, (_, i) => ['whoosh', r3(at + i * 0.09), 0.2, +(g * (1 - i / (n + 4))).toFixed(4)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...cheer(0.05, 14),
  ...talkCues(LINES, { cps: CPS, pitch: { [TAG.LEO]: 880, [TAG.SAG]: 659.25, [TAG.EX]: 739.99, [TAG.CAP]: 523.25 } }),
  ['tick', r3(T.comet + 0.6), 0.012],
  ['pop', T.said, 1318.51, 0.05, 0], ['pluck', T.said, 1174.66, 0.04, 0.4, 0], ...cheer(T.said, 8, 0.03),
  ['tapeStop', r3(T.replay[0] - 0.05), 0.35], ['whoosh', T.replay[0], 0.5, 0.04],
  ...[0.3, 1.0, 1.5].map(d => ['whoosh', r3(T.replay[0] + d), 0.3, 0.05]),
  ...stingerCues(T.whistle, { key: KEY, kind: 'sports' }),
  ['whoosh', T.flag, 0.6, 0.04], ['tick', r3(T.flag + 0.7), 0.08], ['bell', r3(T.flag + 1.4), 1760, 0.025, 1.2, 0],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ['pop', r3(T.leave + 1.2), 1567.98, 0.045, 0.3], ...cheer(r3(T.leave + 0.6), 10, 0.03),
  ...wordPops(T.last, 4, 0.08, 1), ['bell', r3(T.last + 0.3), 2093, 0.03, 1.6, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
