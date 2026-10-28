// st4aunties2 (25 s vertical Align ad, Star Talk season 4 · EP 069, the Auntie Council reviews Texas) · story 0–20.6, then the end card.
//   0.00–4.90  "The Auntie Council | reviews *Texas.*"  ♋ Auntie Cancer (beaded glasses chain) and ♉ Auntie Taurus, in their
//              tiny pixel reading glasses (staunties), hold up TEXAS · REPORT CARD. Three rows stamp in, an A+ each:
//              Fort Worth: patient. · Austin: listens. · El Paso: shows up.  The aunties nod at every one.
//   5.00–10.25 "The *verdict.*"  CANCER: "Texas *passed.*" → a big PASSED stamp thunks onto the card, Taurus fans itself.
//              TAURUS: "now the rest of the country wants a *turn.*" → envelopes flutter in from both edges, heart seals and
//              all, and pile up around the card. (Ghost: leans out from behind the card's right edge, 7.6–8.9.)
//  10.35–14.15 ★ LESSON UNLOCKED (lesson.js): "Love | *travels.*" +1 PASSPORT STAMP.
//  14.2 cut →  "So… | who's *next?*"  The aunties lean in close, glasses slid down their noses, squinting at you; a blank
//              ??? · REPORT CARD slides up between them and Cancer's pen hovers over it. Both wink. Out by 20.45.
// No vote yet (that starts at EP 070): no cities named after Texas, no counts.
// One canvas (sky + constellation + aunties + card), DOM type + the dialogue box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, MONO, INTER, pop01, outK, popOut, popText, drawBits, sparkles, glow, at, wordT, checkLines, wordPops, NOTE } from './kit.js'
import { auntie, drawFan, drawHearts } from './props.js'

export const DURATION = 25
const EP = 69
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const KEY = 'Bb'
const CAN = signStar('cancer'), TAU_ = signStar('taurus')
const CAN_TAG = `${CAN.glyph} AUNTIE CANCER`, TAU_TAG = `${TAU_.glyph} AUNTIE TAURUS`
const RED = '#d23a5a', SERIF = "'EB Garamond', serif"

const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [4.75, 4.93],
  cIn: 0.3, tIn: 0.45, card: [0.6, 1.1], rows: [1.8, 2.8, 3.8],
  h1: 5.0, h1Land: 5.3, open: 5.15, a1: 5.3, a2: 7.32, h1Out: [10.12, 10.3], close: 10.3,
  env: 8.3, fan: [6.1, 7.3],
  lesson: 10.35, lessonOut: [13.95, 14.15], cardOut: [10.35, 10.65],
  cut: 14.2,
  h2: 14.27, h2Land: 14.8, lean: [14.2, 14.75], blank: [15.6, 16.1], pen: 16.6, scan: [17.0, 18.2], wink: [18.6, 19.2],
  out: [20.05, 20.45], h2Out: [20.18, 20.44],
  ghost: 7.6,
}
const CPS = 28
const LINES = [
  { t: T.a1, speaker: CAN_TAG, color: CAN.color, text: 'Texas *passed.*' },
  { t: T.a2, speaker: TAU_TAG, color: '#9fe08a', text: 'now the rest of the country wants a *turn.*' },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_PASS = LT[0].done + 0.05, T_TURN = wordT(LT, LINES, 1, 'turn')
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Love | *travels.*', chip: '+1 PASSPORT STAMP', accentColor: GOLD, dim: 0.55 }

const ROWS = [['Fort Worth', 'patient.'], ['Austin', 'listens.'], ['El Paso', 'shows up.']]
const CARD = { x: 540, y: 820, w: 780, h: 540 }
const CP = { x: 215, y: 1265, s: 270 }, TP = { x: 865, y: 1265, s: 270 }
const CF = { x: 270, y: 1290, s: 390 }, TF = { x: 810, y: 1290, s: 390 }
const after = t => t >= T.cut

const nod = (t, t0) => { const k = t - t0; return k > 0 && k < 0.6 ? Math.sin(k / 0.6 * Math.PI) : 0 }
const C_HOPS = [T.cIn + 0.3, T.a1 + 0.05, T.a1 + 0.35, T_PASS + 0.1, T.lesson + 0.6, T.cut + 0.3, T.pen + 0.05]
const T_HOPS = [T.tIn + 0.3, T.a2 + 0.05, T.a2 + 0.6, T.a2 + 1.2, T_TURN + 0.05, T.lesson + 0.7, T.cut + 0.4]

function canState(t) {
  const g = { frame: '#b3203f', hi: '#ffe08a', chain: true, down: 0, fog: 0 }
  const st = { mood: 'neutral', look: [1, -1], g, squash: 0 }
  if (t < T.card[1]) { st.mood = 'happy'; st.look = [0, 0]; return st }
  if (t < T.h1) { st.mood = 'squint'; st.look = [1, -1]; st.squash = 0.1 * Math.max(...T.rows.map(r => nod(t, r + 0.2))); return st }
  if (t < T_PASS) { st.mood = 'neutral'; st.look = [0, 0]; return st }
  if (t < T.a2) { st.mood = 'happy'; return st }
  if (t < T.env) { st.mood = 'neutral'; st.look = [1, 0]; return st }
  if (t < T.lesson) { st.mood = 'wide'; st.look = [1, -1]; st.blink = false; return st }
  if (t < T.cut) { st.mood = 'sparkle'; return st }
  g.down = ease.outBack(prog(t, T.lean[0] + 0.2, T.lean[1]))
  g.fog = clamp(prog(t, T.lean[1], T.lean[1] + 0.6)) * (1 - prog(t, T.blank[0], T.blank[1])) * 0.8
  if (t < T.blank[0]) { st.mood = 'squint'; st.look = [0, 0]; return st }
  if (t < T.scan[0]) { st.mood = 'neutral'; st.look = [1, 1]; return st }
  if (t < T.scan[1]) { st.mood = 'squint'; st.look = [Math.sin((t - T.scan[0]) * 4) > 0 ? 1 : -1, 0]; return st }
  if (t >= T.wink[0] && t < T.wink[1]) { st.mood = 'wink'; st.look = [0, 0]; return st }
  st.mood = 'happy'; return st
}
function tauState(t) {
  const g = { frame: '#5a2e14', hi: '#ffd98a', down: 0, fog: 0 }
  const st = { mood: 'neutral', look: [-1, -1], g, squash: 0 }
  if (t < T.card[1]) { st.mood = 'happy'; st.look = [0, 0]; return st }
  if (t < T.h1) { st.mood = 'neutral'; st.look = [-1, -1]; st.squash = 0.1 * Math.max(...T.rows.map(r => nod(t, r + 0.3))); return st }
  if (t < T_PASS) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.fan[1]) { st.mood = 'heart'; g.fog = 0.5 * Math.sin(Math.PI * prog(t, T.fan[0], T.fan[1])); return st }
  if (t < T.lesson) { st.mood = t < T_TURN ? 'neutral' : 'wink'; st.look = [0, 0]; return st }
  if (t < T.cut) { st.mood = 'sparkle'; return st }
  g.down = ease.outBack(prog(t, T.lean[0] + 0.28, T.lean[1] + 0.08))
  g.fog = clamp(prog(t, T.lean[1] + 0.1, T.lean[1] + 0.7)) * (1 - prog(t, T.blank[0], T.blank[1])) * 0.8
  if (t < T.blank[0]) { st.mood = 'squint'; st.look = [0, 0]; return st }
  if (t < T.scan[0]) { st.mood = 'neutral'; st.look = [-1, 1]; return st }
  if (t < T.scan[1]) { st.mood = 'squint'; st.look = [Math.sin((t - T.scan[0]) * 4 + 1) > 0 ? 1 : -1, 0]; return st }
  if (t >= T.wink[0] + 0.1 && t < T.wink[1] + 0.1) { st.mood = 'wink'; st.look = [0, 0]; return st }
  st.mood = 'happy'; return st
}

const ENV = ['XXXXXXXXXXXX', 'XWwWWWWWWwWX', 'XWWwWWWWwWWX', 'XWWWwWWwWWWX', 'XWWWWhhWWWWX', 'XWWWWhhWWWWX', 'XWWWWWWWWWWX', 'XXXXXXXXXXXX']
const ENVS = [[-1, 690, 0.0], [1, 760, 0.2], [-1, 980, 0.35], [1, 1040, 0.5], [-1, 560, 0.65], [1, 600, 0.8]]

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 46px Inter", "italic 500 150px 'EB Garamond'", "italic 500 54px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 64px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The Auntie Council | reviews *Texas.*', { top: 200, size: 92, accentSize: 140, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const H1 = popText(root, 'The *verdict.*', { top: 250, size: 110, accentSize: 160, at: T.h1, times: [T.h1, T.h1Land], wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'So… | who’s *next?*', { top: 190, size: 120, accentSize: 190, at: T.h2, times: [T.h2, T.h2 + 0.3, T.h2Land], wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the report card: cream paper, a header bar, rows that stamp in with an A+, then PASSED
  function paper(cx, cy, w, h, rot, title, a) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha *= a
    x.fillStyle = 'rgba(14,8,32,0.85)'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#f7ead0'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#e6cf9f'; x.fillRect(-w / 2, h / 2 - 10, w, 10)
    x.fillStyle = '#2a1858'; x.fillRect(-w / 2, -h / 2, w, 86)
    x.fillStyle = GOLD; x.font = `700 34px ${MONO}`; x.letterSpacing = '0.12em'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(title, 6, -h / 2 + 45); x.letterSpacing = '0px'
    // ruled lines
    x.fillStyle = 'rgba(74,40,20,0.18)'
    for (let i = 0; i < 4; i++) x.fillRect(-w / 2 + 40, -h / 2 + 196 + i * 100, w - 80, 3)
    return () => x.restore()
  }
  function drawCard(t) {
    if (after(t) || t < T.card[0]) return
    const up = easeOutBack(prog(t, ...T.card), 1.5), o = prog(t, ...T.cardOut)
    const cy = lerp(1500, CARD.y, up) - ease.inCubic(o) * 200, a = 1 - o
    if (a <= 0) return
    glow(x, CARD.x, cy, 520, GOLD, 0.35 * a)
    const done = paper(CARD.x, cy, CARD.w, CARD.h, lerp(0.08, -0.015, up), 'TEXAS · REPORT CARD', a)
    const { w, h } = CARD
    ROWS.forEach(([city, note], i) => {
      const t0 = T.rows[i], p = prog(t, t0, t0 + 0.2)
      if (p <= 0) return
      const yy = -h / 2 + 150 + i * 100
      x.save(); x.globalAlpha *= clamp(p * 2); x.translate(0, (1 - ease.outCubic(p)) * 14)
      x.textBaseline = 'middle'; x.textAlign = 'left'
      x.font = `800 46px ${INTER}`; x.fillStyle = '#2a1858'; x.fillText(city + ':', -w / 2 + 44, yy)
      const cw = x.measureText(city + ':').width
      x.font = `italic 500 54px ${SERIF}`; x.fillStyle = '#7a3a1e'; x.fillText(note, -w / 2 + 58 + cw, yy + 2)
      x.restore()
      // the A+ stamp
      const s = prog(t, t0 + 0.25, t0 + 0.45)
      if (s > 0) {
        const sc = lerp(1.8, 1, ease.outCubic(s))
        x.save(); x.translate(w / 2 - 80, yy); x.rotate(-0.12 + i * 0.05); x.scale(sc, sc); x.globalAlpha *= clamp(s * 2)
        x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.stroke()
        x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A+', 2, 2)
        x.restore()
      }
    })
    // PASSED
    const ps = prog(t, T_PASS, T_PASS + 0.22)
    if (ps > 0) {
      const sc = lerp(2.2, 1, ease.outCubic(ps)) + 0.05 * Math.sin(Math.PI * clamp((t - T_PASS - 0.22) / 0.2))
      x.save(); x.translate(0, h / 2 - 78); x.rotate(-0.06); x.scale(sc, sc); x.globalAlpha *= clamp(ps * 2)
      x.font = `700 64px ${MONO}`; x.letterSpacing = '0.2em'; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText('PASSED').width + 50
      x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-tw / 2, -46, tw, 92); x.lineWidth = 3; x.strokeRect(-tw / 2 + 10, -36, tw - 20, 72)
      x.fillStyle = RED; x.fillText('PASSED', 10, 4); x.letterSpacing = '0px'
      x.restore()
    }
    done()
    sparkles(x, t, CARD.x, cy + h / 2 - 78, T_PASS + 0.15, { n: 14, R: 300, size: 26, seed: 1, cols: [GOLD, PINK, BONE] })
  }

  // envelopes from everywhere else (no names yet), fluttering in and piling up by the card
  function drawEnvelopes(t) {
    if (after(t)) return
    const o = 1 - prog(t, ...T.cardOut)
    ENVS.forEach(([side, y1, d], i) => {
      const t0 = T.env + d, p = prog(t, t0, t0 + 0.7)
      if (p <= 0 || o <= 0) return
      const e = ease.outCubic(p)
      const lx = side < 0 ? 92 + (i % 3) * 6 : 988 - (i % 3) * 6
      const ex = lerp(side < 0 ? -120 : 1200, lx, e), ey = lerp(y1 - 260, y1, e) + Math.sin(p * 9) * 30 * (1 - p)
      drawBits(x, ENV, { X: '#c9a76a', W: '#f7ead0', w: '#e6cf9f', h: '#ff4f86' }, ex, ey, 7, { rot: (1 - e) * side * 0.8 + side * 0.15 * Math.sin(t * 2 + i), alpha: o })
    })
  }

  // the blank card of the final beat + Cancer's pen
  function drawBlank(t) {
    if (!after(t) || t < T.blank[0]) return
    const o = popOut(t, T.out)
    const up = easeOutBack(prog(t, ...T.blank), 1.4)
    const cy = lerp(1900, 760, up)
    const done = paper(540, cy, 520, 380, -0.03, '??? · REPORT CARD', o)
    // a blinking caret on the first row
    if (Math.floor(t * 2.4) % 2 === 0) { x.fillStyle = '#2a1858'; x.fillRect(-216, -190 + 120, 6, 50) }
    done()
    if (t >= T.pen) {
      const pk = pop01(t, T.pen, 0.3, 2) * o, bob = Math.sin((t - T.pen) * 5) * 8
      x.save(); x.translate(470, cy + 20 + bob); x.rotate(-0.7); x.scale(pk, pk)
      x.fillStyle = INK; x.fillRect(-14, -96, 28, 150)
      x.fillStyle = '#b3203f'; x.fillRect(-9, -90, 18, 110); x.fillStyle = GOLD; x.fillRect(-9, -60, 18, 8)
      x.fillStyle = '#f7ead0'; x.fillRect(-9, 20, 18, 20); x.fillStyle = INK; x.fillRect(-4, 40, 8, 12)
      x.restore()
    }
  }

  function aunt(t, P, F, tag) {
    const fin = after(t)
    const st = tag === 'c' ? canState(t) : tauState(t)
    let pos = P
    if (fin) { const e = ease.inOutCubic(prog(t, ...T.lean)); pos = { x: lerp(P.x, F.x, e), y: lerp(P.y, F.y, e), s: lerp(P.s, F.s, e) } }
    const o = popOut(t, T.out)
    const pk = pop01(t, tag === 'c' ? T.cIn : T.tIn, 0.36, 2.1) * o
    if (pk <= 0.01) return null
    const col = tag === 'c' ? CAN : TAU_
    return auntie(x, pos.x, pos.y, pos.s, t, { color: col.color, glyph: col.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: tag === 'c' ? C_HOPS : T_HOPS, seed: tag === 'c' ? 3 : 8, pop: pk, glasses: st.g })
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    drawCard(t)
    // the ghost leans out from behind the card's right edge (drawn after the card), below the rows
    if (!after(t)) drawGhostCameo(x, t, { x: CARD.x + CARD.w / 2 + 4, y: CARD.y + 140, at: T.ghost, dur: 1.3, from: 'left', cell: 3 })
    drawEnvelopes(t)
    drawBlank(t)
    const rc = aunt(t, CP, CF, 'c'), rt = aunt(t, TP, TF, 't')
    // Taurus fans itself at PASSED
    if (rt && t > T.fan[0] && t < T.fan[1] + 0.2) {
      const a = clamp(prog(t, T.fan[0], T.fan[0] + 0.2)) * (1 - prog(t, T.fan[1], T.fan[1] + 0.2))
      drawFan(x, TP.x - 120, TP.y + 10, 90, -0.6 + 0.35 * Math.sin(t * 16), a)
    }
    if (rc && t > T_PASS && t < T.a2 + 0.8) drawHearts(x, t, T_PASS + 0.1, CP.x, CP.y - 160, { n: 5, px: 6, spread: 160 })
    if (after(t) && t > T.wink[0]) { drawHearts(x, t, T.wink[0], CF.x, CF.y - 230, { n: 6, px: 7, spread: 200 }); drawHearts(x, t, T.wink[0] + 0.1, TF.x, TF.y - 230, { n: 6, px: 7, spread: 200 }) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.95 (inert: hook → the verdict), 14.2 (the lesson clears → "So… who's next?", plays).
const CUTS = [4.95, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const PITCH = { [CAN_TAG]: 587.33, [TAU_TAG]: 493.88 }
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.022), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.cIn + 0.05, 659.25, 0.035, -0.5], ['pop', T.tIn + 0.05, 587.33, 0.035, 0.5],
  ['whoosh', T.card[0], 0.45, 0.03], ['tick', T.card[1] - 0.1, 0.04],
  ...T.rows.flatMap((r, i) => [['pop', r, NOTE[i * 2], 0.03, 0], ['boom', +(r + 0.4).toFixed(3), 0.08], ['tick', +(r + 0.4).toFixed(3), 0.06], ['pluck', +(r + 0.42).toFixed(3), [1046.5, 1174.66, 1318.51][i], 0.035, 0.4, 0.3]]),
  ['pop', T.h1, 880, 0.03, 0], ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.open, 587.33, 0.035, 0], ['pop', T.open + 0.06, 739.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ['boom', T_PASS + 0.2, 0.16], ['tick', T_PASS + 0.2, 0.08], ['glitter', T_PASS + 0.15, T_PASS + 0.8], ['bell', T_PASS + 0.25, 1567.98, 0.03, 1.4, 0],
  ['whoosh', T.fan[0], 0.3, 0.02], ['whoosh', T.fan[0] + 0.5, 0.3, 0.02],
  ...ENVS.map(([side, , d], i) => ['whoosh', +(T.env + d).toFixed(3), 0.3, 0.018]), ...ENVS.map(([side, , d], i) => ['tick', +(T.env + d + 0.7).toFixed(3), 0.03]),
  ['tick', T.ghost + 0.05, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.cardOut[0], 0.3, 0.025],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.3, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.lean[0], 0.4, 0.025], ['pop', T.lean[1], 392, 0.035, 0],
  ['whoosh', T.blank[0], 0.45, 0.025], ['tick', T.blank[1], 0.04], ['pop', T.pen, 1174.66, 0.03, -0.3],
  ['tick', T.scan[0] + 0.2, 0.025], ['tick', T.scan[0] + 0.6, 0.025], ['tick', T.scan[0] + 1.0, 0.025],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.3], ['pluck', T.wink[0] + 0.1, 1567.98, 0.035, 0.5, 0.3], ['glitter', T.wink[0], T.wink[0] + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
