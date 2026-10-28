// st4confession (25 s vertical Align ad, Star Talk season 4, EP 098, thread C7: the ghost's redemption) · story 0–20.6,
// then the shared end card. The ghost is the star of this episode, so there is no cameo: it confesses to camera instead.
//   0.00–4.70  "The ghost has a | *confession.*"  The ghost (sheet off since EP 088: a shy little blue star) turns to camera.
//              Drop (2.82): THE GHOST: "i've been in *every* episode."
//   4.75–10.2  "Every | *episode.*"  The montage: 97 tiny frames fill a grid, one every 0.045 s, each with an EP stamp and
//              the sheet-ghost in its real hiding spot (from every st4*/lore.json via ../spots.js). An EP counter ticks.
//   10.3–14.6  "Drop 5 had a | *secret.*"  Drop 5's ten last lines (EP 041–050) stack up; their first letters glow one by
//              one and fly down into HELLO TEXAS.
//   14.8 cut → THE GHOST: "i was too shy to say *hi.*" → the twelve sign stars pop up round it, waving; THE STARS:
//              "hi. we *saw* you."  →  "We *see* you."  Everything pops out by 20.45; the end card at 20.6.
// One canvas (sky + montage + letters + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { SPOTS } from '../spots.js'

export const DURATION = 25
const EP = 98
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SHY = '#a9d4ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"

// ── drop 5's last lines (EP 041–050), as the films say them (050 from the plan: st4elpaso was not on the branch yet)
const DROP5 = [
  [41, 'Hit the road, Texas.'], [42, 'Eyes up. Sky’s out.'], [43, 'Listen like it’s live.'], [44, 'Look for patterns.'],
  [45, 'Out loud is brave.'], [46, 'This moment is the plan.'], [47, 'Every first is a little cold.'], [48, 'Xs and Os, y’all.'],
  [49, 'Ask what they need.'], [50, 'Show up like the mountain star.'],
]

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [4.5, 4.7],
  ghostIn: 0.3, turn: 1.25, open: 2.66, l1: 2.82, close1: 4.95, ghostOut: [4.55, 4.9],
  h1: 4.8, h1Land: 5.15, tiles: 5.0, gap: 0.045, glowAll: 9.6, h1Out: [10.05, 10.25], gridOut: [10.0, 10.3],
  h2: 10.35, h2Land: 10.75, lines: 10.45, lineGap: 0.1, letters: 11.75, letterGap: 0.1, fly: [12.95, 13.6], word: 13.6,
  h2Out: [14.45, 14.65], helloOut: [14.4, 14.65],
  cut: 14.8,
  ghostBack: 14.9, open2: 14.95, l2: 15.1, crowd: 17.05, l3: 17.35, heart: 18.3,
  close2: 19.85, h3: 18.2, h3Land: 18.55, h3Out: [20.1, 20.35], out: [20.0, 20.45],
}
const GS = 'THE GHOST', NARR = 'THE STARS'
const LINES1 = [{ t: T.l1, speaker: GS, text: 'i’ve been in *every* episode.', color: SHY }]
const LINES2 = [
  { t: T.l2, speaker: GS, text: 'i was too shy to say *hi.*', color: SHY },
  { t: T.l3, speaker: NARR, text: 'hi. we *saw* you.' },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── the montage grid: 97 tiles, 10 columns (the last row of 7 centred)
const COLS = 10, TW = 88, TH = 104, TG = 6, GX0 = (1080 - (COLS * TW + (COLS - 1) * TG)) / 2, GY0 = 600
const tileAt = i => {
  const row = Math.floor(i / COLS), col = i % COLS, inRow = Math.min(COLS, SPOTS.length - row * COLS)
  const off = (COLS - inRow) * (TW + TG) / 2
  return { x: GX0 + off + col * (TW + TG), y: GY0 + row * (TH + TG) }
}
const tileT = i => T.tiles + i * T.gap
// HELLO TEXAS: the big word's letters, with a gap for the space
const WORD = 'HELLO TEXAS', WORD_Y = 1430, WORD_FS = 118
const LINE_Y0 = 640, LINE_DY = 70, LINE_FS = 44

const CROWD = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map((id, i) => {
  const a = Math.PI * (1.02 + 0.96 * i / 11)
  return { id, x: 540 + Math.cos(a) * 400, y: 1060 + Math.sin(a) * 330, size: 108, seed: 40 + i }
})
const GH = { x: 540, y: 1040, size: 360 }

function ghostState(t) {
  if (t < T.turn) return { mood: 'neutral', look: [-1, 0], blush: 0.6 }
  if (t < T.l1 + 0.3) return { mood: 'wide', look: [0, 0], blink: false, blush: 1 }
  if (t < T.ghostBack) return { mood: 'sparkle', look: [0, 0], blush: 1 }
  if (t < T.crowd) return { mood: 'neutral', look: [0, 1], blush: 1 }        // shy, looking down
  if (t < T.heart) return { mood: 'wide', look: [0, -1], blink: false, blush: 1 }
  return { mood: 'heart', blush: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 14px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The ghost has a | *confession.*', { top: 200, size: 108, accentSize: 180, at: T.h0, gap: 0.09, accentColor: SHY, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'Every | *episode.*', { top: 170, size: 112, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const H2 = popText(root, 'Drop 5 had a | *secret.*', { top: 190, size: 112, accentSize: 176, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'We *see* | you.', { top: 200, size: 140, accentSize: 210, at: T.h3, gap: 0.12, late: 2, lateAt: T.h3Land, lateGap: 0.14, wobble: true, accentColor: SHY, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1440, width: 960, height: 280, open: T.open, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1440, width: 960, height: 280, open: T.open2, close: T.close2, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the sheet-ghost sprite, baked once (cell 1 ≈ 31 × 37 px) for the 97 tiles
  const spr = document.createElement('canvas'); spr.width = 34; spr.height = 40
  drawGhostSheet(spr.getContext('2d'), 0.6, 17, 22, 1, { blink: false })
  const sprShut = document.createElement('canvas'); sprShut.width = 34; sprShut.height = 40
  drawGhostSheet(sprShut.getContext('2d'), 0.32, 17, 22, 1, { blink: true })
  // measure the HELLO TEXAS layout once
  x.font = `800 ${WORD_FS}px ${INTER}`
  const wordW = [...WORD].map(c => x.measureText(c).width), wordTot = wordW.reduce((a, b) => a + b, 0)
  const wordX = []; { let cx = 540 - wordTot / 2; for (const w of wordW) { wordX.push(cx + w / 2); cx += w } }
  x.font = `800 ${LINE_FS}px ${INTER}`
  const lineMeta = DROP5.map(([, s]) => { const first = s[0], rest = s.slice(1), wf = x.measureText(first).width, wr = x.measureText(rest).width; return { first, rest, wf, wr, x0: 540 - (wf + wr) / 2 } })
  const letterSlots = (() => { const out = []; let k = 0; for (let i = 0; i < WORD.length; i++) { if (WORD[i] === ' ') continue; out.push(i); k++ } return out })()

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, SHY]) {
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

  function drawMontage(t) {
    const out = 1 - ease.inCubic(prog(t, ...T.gridOut))
    if (out <= 0 || t < T.tiles) return
    const glowAll = prog(t, T.glowAll, T.glowAll + 0.3)
    x.save()
    SPOTS.forEach(([ep, gxp, gyp], i) => {
      const t0 = tileT(i), p = pop01(t, t0, 0.22, 2.4)
      if (p <= 0.01) return
      const { x: tx, y: ty } = tileAt(i)
      const s = p * out
      x.save(); x.translate(tx + TW / 2, ty + TH / 2); x.scale(s, s); x.translate(-TW / 2, -TH / 2)
      const fresh = clamp(1 - (t - t0) / 0.5)
      x.fillStyle = INK; x.fillRect(-2, -2, TW + 4, TH + 4)
      x.fillStyle = '#231a4f'; x.fillRect(0, 0, TW, TH)
      x.fillStyle = '#2f2466'; x.fillRect(0, 0, TW, TH * 0.4)
      for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillRect((ep * 13 + k * 23) % (TW - 4) + 1, (ep * 7 + k * 17) % (TH * 0.5) + 2, 2, 2) }
      // the hiding spot, from that episode's lore.json
      const sx = gxp / 1080 * TW, sy = gyp / 1920 * TH * 1.15
      const shut = (t * 1.1 + ep * 0.37) % 2.6 < 0.12
      x.drawImage(shut ? sprShut : spr, sx - 12, Math.min(TH - 30, sy) - 14, 24, 28)
      if (fresh > 0 || glowAll > 0) { x.strokeStyle = `rgba(242,199,92,${Math.max(fresh, 0.7 * glowAll)})`; x.lineWidth = 3; x.strokeRect(0, 0, TW, TH) }
      x.font = `700 14px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
      x.fillStyle = 'rgba(10,6,24,0.75)'; x.fillRect(0, TH - 20, 38, 20)
      x.fillStyle = BONE; x.fillText(String(ep).padStart(3, '0'), 3, TH - 5)
      x.restore()
    })
    x.restore()
    // the counter
    const n = clamp(Math.floor((t - T.tiles) / T.gap) + 1, 0, SPOTS.length)
    if (n > 0) {
      x.save(); x.globalAlpha = out
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = GOLD; x.fillText(`EP ${String(SPOTS[n - 1][0]).padStart(3, '0')} · ${n} SPOTS`, 540, 548)
      x.restore()
    }
  }

  function drawHello(t) {
    const out = 1 - ease.inCubic(prog(t, ...T.helloOut))
    if (out <= 0 || t < T.lines) return
    const fly = ease.inOutCubic(prog(t, ...T.fly))
    x.save(); x.textBaseline = 'middle'
    DROP5.forEach(([ep], i) => {
      const m = lineMeta[i], y = LINE_Y0 + i * LINE_DY
      const p = pop01(t, T.lines + i * T.lineGap, 0.28, 2.2)
      if (p <= 0.01) return
      const lit = prog(t, T.letters + i * T.letterGap, T.letters + i * T.letterGap + 0.2)
      // the rest of the line (dims once the letters fly)
      x.globalAlpha = out * clamp(p) * lerp(1, 0.28, fly)
      x.font = `800 ${LINE_FS}px ${INTER}`; x.textAlign = 'left'; x.fillStyle = BONE
      x.fillText(m.rest, m.x0 + m.wf, y + (1 - clamp(p)) * 20)
      x.font = `700 16px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText(String(ep).padStart(3, '0'), 84, y + 2)
      // the first letter: glows gold, then flies down into HELLO TEXAS
      const slot = letterSlots[i], fx = lerp(m.x0 + m.wf / 2, wordX[slot], fly), fy = lerp(y, WORD_Y, fly)
      const fs = lerp(LINE_FS * (1 + 0.35 * Math.sin(Math.PI * clamp(lit * 1.4)) * (1 - fly)), WORD_FS, fly)
      x.globalAlpha = out * clamp(p)
      if (lit > 0) {
        const g = x.createRadialGradient(fx, fy, 0, fx, fy, fs)
        g.addColorStop(0, `rgba(242,199,92,${0.35 * lit})`); g.addColorStop(1, 'rgba(242,199,92,0)')
        x.fillStyle = g; x.fillRect(fx - fs, fy - fs, fs * 2, fs * 2)
      }
      x.font = `800 ${fs}px ${INTER}`; x.textAlign = 'center'; x.fillStyle = lit > 0 ? GOLD : BONE
      x.fillText(m.first, fx, fy)
    })
    x.restore()
    sparkles(t, 540, WORD_Y, T.word, 16, 360, 1, [GOLD, BONE, PINK, SHY])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      // the ghost: confesses, steps aside for the montage, comes back for the hello
      const g1 = pop01(t, T.ghostIn, 0.4, 2.2) * (t < T.ghostOut[1] ? popOut(t, T.ghostOut) : 0)
      const g2 = pop01(t, T.ghostBack, 0.4, 2.2) * ok
      const gp = t < T.cut ? g1 : g2
      if (t >= T.cut) {
        CROWD.forEach((m, i) => {
          const p = pop01(t, T.crowd + i * 0.06, 0.35, 2.3) * ok
          if (p <= 0.02) return
          const st = signStar(m.id)
          drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: null, mood: t > T.heart ? (i % 3 ? 'happy' : 'heart') : 'happy', look: [m.x < 540 ? 1 : -1, 0.5], pop: p, seed: m.seed, glow: 0.8, tips: false, hops: [T.crowd + 0.3 + i * 0.06, T.l3 + 0.1 + (i % 3) * 0.12, T.l3 + 0.5 + (i % 4) * 0.1, T.heart + i * 0.04] })
          // little waves: a pixel "hi!" over every other star
          if (i % 2 === 0 && t > T.crowd + 0.3 + i * 0.06) {
            const wp = pop01(t, T.crowd + 0.3 + i * 0.06, 0.25, 2.4) * ok
            x.save(); x.globalAlpha = clamp(wp); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
            x.fillStyle = INK; x.fillRect(m.x - 34, m.y - 104, 68, 36); x.fillStyle = BONE; x.fillRect(m.x - 30, m.y - 100, 60, 28)
            x.fillStyle = INK; x.fillText('hi!', m.x, m.y - 85); x.restore()
          }
        })
      }
      if (gp > 0.02) {
        const glowR = 260
        const g = x.createRadialGradient(GH.x, GH.y, 0, GH.x, GH.y, glowR)
        g.addColorStop(0, `rgba(169,212,255,${0.22 * gp})`); g.addColorStop(1, 'rgba(169,212,255,0)')
        x.fillStyle = g; x.fillRect(GH.x - glowR, GH.y - glowR, glowR * 2, glowR * 2)
        drawStarChar(x, GH.x, GH.y, GH.size, t, { color: SHY, ...ghostState(t), pop: gp, seed: 6, glow: 1.1, hops: [T.ghostIn + 0.3, T.turn, ...talkHops(LINES1, GS, { cps: CPS }), T.ghostBack + 0.3, ...talkHops(LINES2, GS, { cps: CPS }), T.heart] })
      }
      sparkles(t, GH.x, GH.y - 60, T.heart, 12, 220, 2, [SHY, PINK, GOLD, BONE])
      drawMontage(t)
      drawHello(t)
      box1.update(t); box2.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.72 (the confession → the montage) and 14.8 (HELLO TEXAS → the hello). cardfx keeps 14.8.
const CUTS = [4.72, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.ghostIn + 0.05, 739.99, 0.04, 0], ['tick', T.turn, 0.03], ['pop', T.turn + 0.05, 987.77, 0.03, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [GS]: 880 } }),
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h1, 1, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...SPOTS.filter((_, i) => i % 2 === 0).map((s, k) => ['tick', +(tileT(k * 2) + 0.02).toFixed(3), 0.018 + 0.008 * (k % 3 === 0)]),
  ['glitter', T.glowAll, T.glowAll + 0.5], ['bell', T.glowAll + 0.05, 1318.51, 0.03, 1.2, 0],
  ...wordPops(T.h2, 3, 0.09, 1, 0.025), ['pop', T.h2Land, 1318.51, 0.045, 0],
  ...DROP5.map((_, i) => ['pop', +(T.lines + i * T.lineGap + 0.02).toFixed(3), NOTE[i % NOTE.length], 0.022, 0]),
  ...DROP5.map((_, i) => ['pluck', +(T.letters + i * T.letterGap).toFixed(3), NOTE[(i + 2) % NOTE.length] * 2, 0.03, 0.4, (i - 4.5) / 9]),
  ['whoosh', T.fly[0], 0.65, 0.04], ['pop', T.word, 1318.51, 0.06, 0], ['bell', T.word + 0.02, 1760, 0.035, 1.4, 0], ['glitter', T.word, T.word + 0.6],
  ['pop', T.ghostBack + 0.05, 739.99, 0.04, 0],
  ['pop', T.open2, 739.99, 0.04, 0], ['pop', T.open2 + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES2, { cps: CPS, pitch: { [GS]: 880 } }),
  ...CROWD.map((m, i) => ['pop', +(T.crowd + 0.05 + i * 0.06).toFixed(3), NOTE[i % NOTE.length], 0.026, (m.x - 540) / 600]),
  ...wordPops(T.h3, 1, 0.12, 1, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pop', T.h3Land + 0.14, 1567.98, 0.05, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.6, 0], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
