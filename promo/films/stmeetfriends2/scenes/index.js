// stmeetfriends2 (45 s vertical Align ad, Star Talk season 2 extra: "Your date is meeting your friends") · story 0–40.6,
// then the shared end card. (Folder stmeetfriends2: stmeetfriends is a season 3 film.) A talent-show stage: red curtains,
// a spotlight, THE PANEL behind a judges' table (♊ GEMINI, ♌ LEO in a crown, ♐ SAG) with scorecards. The date, a nervous
// ♋ CANCER star, stands on the mark. YOUR STAR peeks from the curtain; ♓ PISCES cries in the front row.
//   0.00–4.30  "Your date is meeting | your *friends.*"  (frame 0) The panel shuffles its scorecards ("?").
//              THE STARS: "The panel is seated. The date is not."
//   4.40–10.2  "Enter: | the *date.*"  The spotlight snaps on; the date shuffles in, sweating.  LEO: "Name. Sign.
//              Intentions."  DATE: "Hi! Cancer. Um. Good ones?"
//  10.40       card cut (flip)
//  10.5–20.9   "Round one: | *favorite movie.*"  GEMINI: "Favorite movie. Go."  DATE: "A cartoon. I cry every time."
//              Scorecards: 4 · 9 · 8 (Leo is weeping).  "Round two: | *cats or dogs?*"  SAG: "Cats or dogs? Choose wisely."
//              DATE: "Allergic to both. Sorry."  Scorecards drop: 2 · 3 · 5 (womp). Pisces gasps.
//  21.10       card cut (deal)
//  21.2–27.4   "Then the date | *asks them.*"  DATE: "Wait. How did you three meet?"  Silence (crickets). The panel melts
//              into puddles of joy. LEO: "…art class. Nobody ever asks that."  Every scorecard flips to ♥, one by one.
//  27.60–32.1  ★ LESSON UNLOCKED (shared lesson.js): "Your friends just want | to see you're | *treated well.*"  +1 SQUAD
//  32.3–35.6   "Talk | *cards.*"  A talk card: "What's a story your friends love?" Both answers flip.
//              THE STARS: "Talk cards: both answer, then both flip."
//  35.7–40.45  "The | *verdict.*"  The gavel bangs. LEO: "The panel has spoken: keep them."  Everything pops out by 40.45.
// One canvas (sky + stage + cast), DOM type + the dialogue boxes, the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { cast, bmp, drawHearts, drawSweat, pixelPanel, sparkBurst, drawCrown, drawPixelHeart, confetti, headCues, chipCue, wompCue, flutterCue, cricketCue, drumrollCue } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const KEY = 'Eb'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GEM = signStar('gemini'), LEO = signStar('leo'), SAG = signStar('sagittarius'), CAN = signStar('cancer'), PIS = signStar('pisces')
const YOU_COL = '#ff9cc0'
const S_TAG = 'THE STARS', G_TAG = `${GEM.glyph} GEMINI · THE PANEL`, L_TAG = `${LEO.glyph} LEO · THE PANEL`, A_TAG = `${SAG.glyph} SAG · THE PANEL`, D_TAG = `${CAN.glyph} THE DATE`
const P_TXT = '#ffe27a', D_TXT = '#8fdcff'

const T = {
  open1: -1.3, l1: -1.1, h0Out: [4.15, 4.32],
  spot: 4.4, walk: [4.45, 5.4], h1: 4.5, h1Land: 4.9, l2: 4.75, l3: 7.4, close1: 10.15, h1Out: [10.1, 10.28],
  cut1: 10.4,
  h2: 10.5, h2Land: 10.95, open2: 10.6, l4: 10.75, l5: 12.6, score1: 14.3, h2Out: [15.6, 15.78],
  h3: 15.85, h3Land: 16.3, l6: 15.95, l7: 18.4, score2: 19.6, close2: 20.85, h3Out: [20.8, 20.98],
  cut2: 21.1,
  h4: 21.2, h4Land: 21.65, open3: 21.3, l8: 21.5, freeze: [22.7, 24.0], melt: [24.0, 24.5], l9: 24.4, hearts: 26.0, close3: 27.35, h4Out: [27.3, 27.45],
  lesson: 27.6, lessonOut: [31.9, 32.15],
  h5: 32.3, h5Land: 32.7, card: [32.3, 32.7], open4: 32.4, l10: 32.55, flip: 34.3, cardOut: [35.35, 35.6], h5Out: [35.4, 35.58],
  h6: 35.7, h6Land: 36.1, l11: 35.8, gavel: 37.2, close4: 40.0, h6Out: [40.0, 40.2], out: [40.0, 40.45],
}
const LINES1 = [
  { t: T.l1, speaker: S_TAG, text: 'The panel is *seated.* The date is *not.*' },
  { t: T.l2, speaker: L_TAG, color: P_TXT, text: 'Name. Sign. *Intentions.*' },
  { t: T.l3, speaker: D_TAG, color: D_TXT, text: 'Hi! Cancer. Um. *Good ones?*' },
]
const LINES2 = [
  { t: T.l4, speaker: G_TAG, color: P_TXT, text: 'Favorite movie. *Go.*' },
  { t: T.l5, speaker: D_TAG, color: D_TXT, text: 'A cartoon. I cry *every time.*' },
  { t: T.l6, speaker: A_TAG, color: P_TXT, text: 'Cats or dogs? *Choose wisely.*' },
  { t: T.l7, speaker: D_TAG, color: D_TXT, text: 'Allergic to both. *Sorry.*' },
]
const LINES3 = [
  { t: T.l8, speaker: D_TAG, color: D_TXT, text: 'Wait. How did *you three* meet?' },
  { t: T.l9, speaker: L_TAG, color: P_TXT, text: '…art class. *Nobody ever asks that.*' },
]
const LINES4 = [
  { t: T.l10, speaker: S_TAG, text: 'Talk cards: both answer, *then* both flip.' },
  { t: T.l11, speaker: L_TAG, color: P_TXT, text: 'The panel has spoken: *keep them.*' },
]
const CPS = 28
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Your friends just want | to see you’re | *treated well.*', chip: '+1 SQUAD', dim: 0.55, size: 84 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const seg = (t, a, b, d = 0.3) => (t < a || t >= b) ? 0 : pop01(t, a, d, 2) * popOut(t, [b - 0.3, b])
function moodAt(M, t) { let m = M[0]; for (const e of M) if (e[0] <= t) m = e; return { mood: m[1], look: m[2] } }

// ── the panel: positions, scores, moods
const PANEL = [
  { id: 'g', x: 250, col: GEM.color, tag: G_TAG, name: 'GEMINI', seed: 5 },
  { id: 'l', x: 540, col: LEO.color, tag: L_TAG, name: 'LEO', seed: 7 },
  { id: 's', x: 830, col: SAG.color, tag: A_TAG, name: 'SAG', seed: 9 },
]
const PANEL_Y = 618, PANEL_S = 190, DESK_Y = 760
// [t, gemini, leo, sag]: '?' = shuffling, '♥' = love
const SCORES = [[-9, '?', '?', '?'], [T.score1, '4', '9', '8'], [T.score2, '2', '3', '5'], [T.hearts, '♥', '?', '?'], [T.hearts + 0.35, '♥', '♥', '?'], [T.hearts + 0.7, '♥', '♥', '♥']]
const scoreAt = (t, i) => { let s = SCORES[0], prev = SCORES[0]; for (const e of SCORES) if (e[0] <= t) { if (e[i + 1] !== s[i + 1]) prev = s; s = e } return { v: s[i + 1], t0: s[0] } }
const MOODS = {
  g: [[-9, 'squint', [0, 1]], [T.spot, 'neutral', [0, 1]], [T.l5 + 0.5, 'squint', [0, 1]], [T.score2, 'wide', [0, 1]], [T.freeze[0], 'wide', [0, 1]], [T.melt[0], 'sparkle', [0, 1]], [T.hearts, 'heart'], [T.h5, 'happy'], [T.gavel, 'happy']],
  l: [[-9, 'squint', [0, 1]], [T.spot, 'neutral', [0, 1]], [T.l5 + 0.5, 'sparkle', [0, 1]], [T.score1, 'happy'], [T.score2, 'squint', [0, 1]], [T.freeze[0], 'wide', [0, 1]], [T.melt[0], 'sparkle', [0, 1]], [T.hearts, 'heart'], [T.h5, 'happy'], [T.gavel, 'wink']],
  s: [[-9, 'squint', [-1, 1]], [T.spot, 'neutral', [0, 1]], [T.l6, 'squint', [0, 1]], [T.score2, 'eyeroll'], [T.score2 + 1, 'neutral', [0, 1]], [T.freeze[0], 'wide', [0, 1]], [T.melt[0], 'sparkle', [0, 1]], [T.hearts, 'heart'], [T.h5, 'happy'], [T.gavel, 'happy']],
}
const D_MOOD = [[-9, 'wide', [0, -1]], [T.walk[1], 'wide', [0, -1]], [T.l3, 'happy', [0, -1]], [T.l4, 'wide', [0, -1]], [T.l5, 'sparkle', [0, -1]], [T.score1, 'happy'],
  [T.l6, 'wide', [0, -1]], [T.score2, 'squint', [0, -1]], [T.l8, 'neutral', [0, -1]], [T.melt[0], 'sparkle', [0, -1]], [T.hearts, 'happy'], [T.h5, 'neutral', [0, -1]], [T.flip + 0.3, 'happy'], [T.gavel, 'heart']]

// ── the stage
function drawStage(x, t, spot) {
  // the floor
  x.fillStyle = '#24183f'; x.fillRect(0, 1240, 1080, 680)
  x.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < 6; i++) x.fillRect(0, 1260 + i * 34 + i * i * 4, 1080, 3)
  // the curtains
  for (const side of [-1, 1]) {
    const x0 = side < 0 ? 0 : 1080 - 110
    x.fillStyle = INK; x.fillRect(x0 - 6, 0, 122, 1300)
    for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#a3203d' : '#c92e4f'; x.fillRect(x0 + i * 22, 0, 22, 1290 - (side < 0 ? i : 4 - i) * 14) }
    x.fillStyle = GOLD; x.fillRect(x0, 900, 110, 14)
  }
  x.fillStyle = '#c92e4f'; x.fillRect(0, 0, 1080, 40); for (let i = 0; i < 1080; i += 60) { x.fillStyle = '#a3203d'; x.fillRect(i, 40, 30, 20) }
  // the spotlight on the mark
  if (spot > 0) {
    x.save(); x.globalAlpha = 0.22 * spot; x.fillStyle = '#fff3c4'
    x.beginPath(); x.moveTo(470, 0); x.lineTo(610, 0); x.lineTo(760, 1330); x.lineTo(320, 1330); x.closePath(); x.fill()
    x.globalAlpha = 0.35 * spot; x.beginPath(); x.ellipse(540, 1310, 220, 42, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }
  // the mark
  x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 8; x.beginPath(); x.moveTo(510, 1295); x.lineTo(570, 1325); x.moveTo(570, 1295); x.lineTo(510, 1325); x.stroke()
}
function drawSign(x, t) {
  x.save(); x.translate(540, 470)
  pixelPanel(x, -230, -46, 460, 92, { P: 8, fill: 'rgba(13,8,32,0.95)', border: GOLD, glow: 0.45 })
  for (let i = 0; i < 12; i++) { const on = Math.floor(t * 4 + i) % 3 !== 0; x.fillStyle = on ? '#fff3c4' : '#6b5a2a'; x.fillRect(-214 + i * 38, -40, 10, 10); x.fillRect(-214 + i * 38, 30, 10, 10) }
  x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('★ THE PANEL ★', 0, 2)
  x.restore()
}
function drawDesk(x) {
  x.fillStyle = INK; x.fillRect(90, DESK_Y - 8, 900, 150)
  x.fillStyle = '#3d2c68'; x.fillRect(98, DESK_Y, 884, 134)
  x.fillStyle = GOLD; x.fillRect(98, DESK_Y, 884, 10)
  for (const p of PANEL) {
    x.fillStyle = '#efe6d6'; x.fillRect(p.x - 80, DESK_Y + 40, 160, 44)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(p.name, p.x, DESK_Y + 63)
  }
}
function drawScorecard(x, t, cx, cy, s, panelK) {
  const { v, t0 } = s, f = prog(t, t0, t0 + 0.3), sx = Math.max(0.05, Math.abs(Math.cos(f * Math.PI)))
  const show = f < 0.5 && t0 > 0 ? null : v
  x.save(); x.translate(cx, cy + (v === '?' ? Math.sin(t * 9 + cx) * 6 : 0)); x.scale(sx * panelK, panelK)
  x.fillStyle = INK; x.fillRect(-7, 40, 14, 70); x.fillStyle = '#a8693a'; x.fillRect(-4, 40, 8, 70)
  x.fillStyle = INK; x.fillRect(-66, -66, 132, 112); x.fillStyle = '#fbf3e2'; x.fillRect(-60, -60, 120, 100)
  const val = show ?? '?'
  if (val === '♥') drawPixelHeart(x, 0, -8, 11, '#ff4f7e')
  else { x.font = `700 76px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = val === '?' ? '#8e7aa8' : +val >= 7 ? '#1e9e5a' : +val >= 5 ? '#c98a1a' : '#d6324d'; x.fillText(val, 0, -6) }
  x.restore()
}
function drawGavel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const bang = inR(t, [T.gavel - 0.35, T.gavel]) ? -0.9 * Math.sin(Math.PI * prog(t, T.gavel - 0.35, T.gavel)) : 0
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.5 + bang)
  x.fillStyle = INK; x.fillRect(-6, -10, 12, 120); x.fillStyle = '#d08a50'; x.fillRect(-3, -8, 6, 116)
  x.fillStyle = INK; x.fillRect(-46, -40, 92, 46); x.fillStyle = '#a8693a'; x.fillRect(-42, -36, 84, 38); x.fillStyle = GOLD; x.fillRect(-20, -36, 6, 38); x.fillRect(14, -36, 6, 38)
  x.restore()
}
function drawTalkCard(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 760); x.rotate((1 - k) * -0.2); x.scale(k, k)
  pixelPanel(x, -320, -230, 640, 300, { P: 10, fill: '#fbf3e2', border: GOLD, glow: 0.6 })
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#8e3b5c'; x.fillText('TALK CARD', 0, -180)
  x.font = `800 48px ${INTER}`; x.fillStyle = INK; x.fillText("What's a story", 0, -110)
  x.font = `italic 600 60px 'EB Garamond', serif`; x.fillStyle = '#8e3b5c'; x.fillText('your friends love?', 0, -45)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillText('answers hidden till you both play', 0, 20)
  for (const [d, txt] of [[-1, 'the art class one'], [1, 'the road trip']]) {
    const f = prog(t, T.flip, T.flip + 0.35), sx = Math.abs(Math.cos(f * Math.PI)), up = f > 0.5
    x.save(); x.translate(d * 160, 180); x.scale(Math.max(0.04, sx), 1)
    pixelPanel(x, -140, -56, 280, 112, { P: 8, fill: up ? '#1b1236' : '#3d2c68', border: up ? MINT : GOLD, glow: 0.3 })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    if (up) { x.font = `italic 600 34px 'EB Garamond', serif`; x.fillStyle = BONE; x.fillText(txt, 0, 2) } else { x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.fillText('?', 0, 2) }
    x.restore()
  }
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 48px Inter", "italic 500 190px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "700 76px 'Space Mono'", "700 40px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, at, land, out, o = {}) => [popText(root, text, { top: 130, size: 104, accentSize: 146, at, late: 1, lateAt: land, wobble: true, fit: true, ...o }), out]
  const HEADS = [
    H('Your date is meeting | your *friends.*', -1.2, -0.7, T.h0Out, { size: 96, accentSize: 140, accentColor: PINK }),
    H('Enter: | the *date.*', T.h1, T.h1Land, T.h1Out, { accentColor: D_TXT }),
    H('Round one: | *favorite movie.*', T.h2, T.h2Land, T.h2Out, { late: 2, lateGap: 0.12, accentColor: P_TXT }),
    H('Round two: | *cats or dogs?*', T.h3, T.h3Land, T.h3Out, { late: 3, lateGap: 0.1, accentColor: P_TXT }),
    H('Then the date | *asks them.*', T.h4, T.h4Land, T.h4Out, { late: 2, lateGap: 0.12, accentColor: PINK }),
    H('Talk | *cards.*', T.h5, T.h5Land, T.h5Out, { accentColor: GOLD }),
    H('The | *verdict.*', T.h6, T.h6Land, T.h6Out, { accentColor: '#ff4f7e' }),
  ]
  const B = (lines, open, close) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [B(LINES1, T.open1, T.close1), B(LINES2, T.open2, T.close2), B(LINES3, T.open3, T.close3), B(LINES4, T.open4, T.close4)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        const spot = t < T.spot ? 0.25 : clamp(0.25 + 0.75 * prog(t, T.spot, T.spot + 0.12))
        x.save(); x.globalAlpha = clamp(o); drawStage(x, t, spot); drawSign(x, t); x.restore()
        // the panel (hidden behind the talk card / lesson only by the scrim)
        const pk = o
        const melt = t >= T.melt[0] && t < T.h5 ? ease.outBack(prog(t, ...T.melt)) : 0
        for (const p of PANEL) {
          const m = moodAt(MOODS[p.id], t)
          const r = cast(x, p.x, PANEL_Y + melt * 30, PANEL_S, t, { color: p.col, glyph: p.id === 'l' ? null : null, mood: m.mood, look: m.look, seed: p.seed, pop: pk,
            squash: melt * 0.28, tears: p.id === 'l' && inR(t, [T.score1, T.l6]) ? 2 : melt > 0.5 ? 1 : 0,
            hops: [...talkHops(ALL, p.tag, { cps: CPS }), T.score1, T.score2, T.hearts + PANEL.indexOf(p) * 0.35, T.gavel + 0.1] })
          if (p.id === 'l') drawCrown(x, r.x + 6, r.top + 16 + melt * 10, 7, -0.12 + (inR(t, [T.freeze[0], T.melt[0]]) ? 0 : 0.05 * Math.sin(t * 2)))
        }
        drawDesk(x)
        const ck = t >= T.h5 && t < T.h6 ? 0 : o
        PANEL.forEach((p, i) => drawScorecard(x, t, p.x + (i - 1) * 10, DESK_Y - 40, scoreAt(t, i), ck * 0.82))
        if (inR(t, [T.hearts, T.hearts + 2])) PANEL.forEach((p, i) => drawHearts(x, t, T.hearts + i * 0.35, p.x, DESK_Y - 160, { n: 5, px: 7, spread: 120, life: 1.4 }))
        if (inR(t, [T.freeze[0] + 0.3, T.melt[0]])) { x.save(); x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('…', 540, 600 + Math.sin(t * 6) * 4); x.restore() }
        // your star peeking from the curtain
        const pe = t < T.spot ? 0.4 : 1
        const ry = cast(x, 1050 - 40 * pe, 1080, 170, t, { color: YOU_COL, mood: inR(t, [T.score2, T.melt[0]]) ? 'wide' : inR(t, [T.hearts, 99]) ? 'heart' : 'sparkle', look: [-1, 0], seed: 2, pop: o })
        x.fillStyle = '#c92e4f'; x.fillRect(1080 - 50, 960, 50, 260)                      // the curtain edge it hides behind
        if (inR(t, [T.score2, T.melt[0]])) drawSweat(x, t, ry.x - 110, ry.y - 90, 6, 1)
        // the date
        const dx = t < T.walk[0] ? -300 : lerp(-300, 540, ease.outCubic(prog(t, ...T.walk)))
        const dm = moodAt(D_MOOD, t)
        const shake = t < T.melt[0] ? Math.sin(t * 40) * 2 : 0
        const rd = cast(x, dx + shake, 1180, 250, t, { color: CAN.color, glyph: CAN.glyph, mood: dm.mood, look: dm.look, seed: 3, pop: o,
          hops: [...talkHops(ALL, D_TAG, { cps: CPS }), T.walk[0] + 0.2, T.walk[0] + 0.5, T.walk[0] + 0.8, T.hearts + 0.2, T.gavel + 0.2] })
        if (t < T.melt[0] && t >= T.walk[0]) drawSweat(x, t, rd.x + rd.size * 0.38, rd.y - rd.size * 0.5, 7, 1)
        // Pisces in the front row (bottom left, half off-stage)
        cast(x, 120, 1340, 150, t, { color: PIS.color, glyph: null, mood: inR(t, [T.score2, T.freeze[1]]) ? 'wide' : 'happy', look: [1, -1], seed: 17, pop: o,
          tears: inR(t, [T.score2, T.freeze[1]]) ? 0 : t >= T.melt[0] ? 3 : 1, hops: [T.score2 + 0.1, T.hearts, T.gavel] })
        drawTalkCard(x, t, easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut))))
        drawGavel(x, t, 690, DESK_Y - 30, t < T.h6 ? 0 : pop01(t, T.h6, 0.35, 2) * o)
        if (inR(t, [T.gavel, T.gavel + 0.6])) sparkBurst(x, t, 650, DESK_Y, T.gavel, { n: 12, R: 220, size: 24, seed: 5 })
        confetti(x, t, T.gavel, { x0: 540, y0: 900, n: 70, seed: 9, life: 2.6 })
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 10.4 and 21.1
const CUTS = [4.38, { t: T.cut1, kind: 'flip' }, 15.8, { t: T.cut2, kind: 'deal' }, 27.5]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const flipCue = (t, f) => [['pop', +t.toFixed(3), f, 0.05, 0], ['tick', +(t + 0.15).toFixed(3), 0.04]]
export const CUES = [
  ...flutterCue(0.1, 10, 0.18, 0.025),                                                 // scorecards shuffling
  // enter the date
  ['boom', T.spot, 0.12], ['bell', T.spot, 1046.5, 0.03, 1.2, 0], ...headCues(T.h1, 2, T.h1Land, 0),
  ...[0, 1, 2].map(i => ['tom', +(T.walk[0] + 0.2 + i * 0.3).toFixed(3), 120, { gain: 0.08, decay: 0.1 }]),
  // round one
  ...headCues(T.h2, 3, T.h2Land, 2), ...drumrollCue(T.score1 - 0.8, T.score1),
  ...[0, 1, 2].map(i => flipCue(T.score1 + i * 0.06, [659.25, 1046.5, 987.77][i])).flat(), ['crash', T.score1, { gain: 0.04, len: 1.4 }],
  ['pluck', T.score1 + 0.3, 1318.51, 0.035, 0.6, 0],
  // round two
  ...headCues(T.h3, 4, T.h3Land, 4), ...drumrollCue(T.score2 - 0.8, T.score2),
  ...[0, 1, 2].map(i => flipCue(T.score2 + i * 0.06, [392, 440, 523.25][i])).flat(), ...wompCue(T.score2 + 0.25, 466.16),
  ['pop', T.score2 + 0.1, 349.23, 0.05, -0.4],
  // they ask
  ...headCues(T.h4, 3, T.h4Land, 1), ...cricketCue(T.freeze[0] + 0.1, 2),
  ['swell', T.melt[0] - 0.2, T.melt[1] + 0.8, { gain: 0.05, f0: 600, f1: 4500, bus: 'drums' }], ['bell', T.melt[0], 1567.98, 0.035, 1.6, 0], ['glitter', T.melt[0], T.melt[0] + 0.8],
  ...[0, 1, 2].map(i => ['pop', +(T.hearts + i * 0.35).toFixed(3), [1046.5, 1174.66, 1318.51][i], 0.05, (i - 1) * 0.4]),
  ['pluck', T.hearts + 0.7, 1567.98, 0.04, 0.8, 0],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // talk cards + verdict
  ...headCues(T.h5, 2, T.h5Land, 3), ['whoosh', T.card[0], 0.4, 0.04], ['pop', T.flip, 784, 0.04, -0.3], ['pop', T.flip + 0.05, 988, 0.04, 0.3], ['bell', T.flip + 0.35, 1318.51, 0.03, 1, 0],
  ...headCues(T.h6, 2, T.h6Land, 0), ['tom', T.gavel, 70, { gain: 0.3, decay: 0.3, rev: 0.2 }], ['tick', T.gavel, 0.08], ['crash', T.gavel, { gain: 0.05, len: 2 }],
  ['swell', T.gavel, T.gavel + 1.5, { gain: 0.04, f0: 800, f1: 5000, bus: 'drums' }],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [S_TAG]: 659.25, [L_TAG]: 783.99, [D_TAG]: 1046.5 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [G_TAG]: 987.77, [A_TAG]: 698.46, [D_TAG]: 1046.5 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [D_TAG]: 1046.5, [L_TAG]: 783.99 } }),
  ...talkCues(LINES4, { cps: CPS, pitch: { [S_TAG]: 659.25, [L_TAG]: 783.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
