// staunties (60 s vertical Align ad, Star Talk season 2 #3: "The Auntie Council") · story 0–55.6, then the shared end card.
//   0.00–4.40  "The stars have | *questions.*"  Extreme close-up: ♋ Auntie Cancer and ♉ Auntie Taurus in tiny pixel reading
//              glasses, leaning in so close their lenses fog. CANCER: "Still single? At your SATURN RETURN??"
//   4.30–4.95  the camera pulls back: they sit on a floating lace doily, YOUR STAR (rose pink) between them in the hot seat.
//   4.95–10.0  "The Auntie | *Council.*"  CANCER: "We only ask because we love you." (Pisces pops in, already crying) ·
//              TAURUS: "And because we have a list."
//  10.20       card cut (flip)
//  10.3–16.6   "They brought | *a list.*"  A parchment scroll unrolls straight past the bottom of the frame. TAURUS: "Earth
//              sign. Good family." (ticks) … pause … "Owns a crockpot." (tick; both aunties go dreamy; your star rolls its eyes)
//  16.95–23.2  "A new | *development.*"  A chat bubble from "you": typing dots, then "I'm kind of talking to someone?"
//              Silence. Both aunties snap their glasses down the nose (record scratch), wide-eyed, and lunge in.
//              CANCER: "WHAT SIGN."  TAURUS: "Birth time. Now."
//  23.30       card cut (deal)
//  23.35–39.9  "Push. Pull. *Align.*"  Two charts; the reading draws between them like a report card (drumroll in).
//              CANCER: "Push: you both like being right." → gasp, Pisces faints (womp). TAURUS fans itself, heart-eyed:
//              "Pull: …that's a LOT of pull." CANCER squints, softens: "Align: you laugh at the same things." A long
//              silent beat… one slow nod from both… pixel tears.
//  40.00       card cut (shuffle)
//  40.1–46.4   "A little push | is *normal.*"  TAURUS: "Push isn't a dealbreaker, baby."  CANCER (holding up a framed photo
//              of a grumpy uncle star with a moustache): "Your uncle and I? All push. 40 years." (heart-eyes at the photo)
//  46.71–50.9  ★ LESSON UNLOCKED (level-up arpeggio, sparkle burst, +1 WISDOM): "Nobody's perfect | for you. | Find who's
//              *worth* | the work."  The aunties squish your star in a hug; Pisces bawls happily.
//  51.1–55.45  "Sunday. | *Seven sharp.*"  Taurus produces a steaming pixel crockpot. THE AUNTIES: "Bring them to dinner.
//              We'll behave." (both wink). Everything pops out by 55.45; the end card takes over at 55.6.
// One canvas (sky + world cast through a camera + charts + banner), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { auntie, bmp, makeDoily, drawDoily, drawScroll, drawFan, drawCrockpot, drawTears, eyesOf, drawSweat, drawHearts, pixelPanel, sparkBurst } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const CAN = signStar('cancer'), TAU_ = signStar('taurus'), PIS = signStar('pisces')
const YOU_COL = '#ff9cc0'
const C_TAG = `${CAN.glyph} AUNTIE CANCER`, T_TAG = `${TAU_.glyph} AUNTIE TAURUS`, BOTH_TAG = 'THE AUNTIES'
const C_TXT = '#8fdcff', T_TXT = '#ffd27a'

// ── the timeline
const T = {
  black: [0, 0.3],
  // 1 · extreme close-up
  h0: 0.15, h0Land: 0.75, h0Out: [4.12, 4.3],
  open1: 0.75, l1: 0.95, fog: [0.9, 2.7], unfog: [3.5, 4.3],
  pull: [4.3, 4.95], drop: BEAT(7),            // 4.489
  // 2 · the council
  h1: 4.78, h1Land: 5.2, l2: 5.25, pis: 6.25, l3: 7.95, h1Out: [9.85, 10.02],
  cut1: 10.2,
  // 3 · the list
  h2: 10.3, h2Land: 10.7, scroll: [10.4, 11.5], l4: 11.0, l5: 13.9, dreamy: 14.5, nodList: 15.25, roll: [15.0, 15.9],
  close1: 16.3, scrollUp: [16.15, 16.55], h2Out: [16.25, 16.45],
  // 4 · a new development
  h3: 16.95, h3Land: 17.4, bubble: 17.15, msg: 17.8, snap: 19.2, open2: 19.3, l6: 19.5, l7: 21.3, unlunge: [22.85, 23.2],
  h3Out: [22.95, 23.12], bubbleOut: [22.9, 23.15],
  cut2: 23.3,
  // 5 · the reading
  charts: [23.35, 23.85], roll2: [23.45, 24.25], l8: 24.3, gasp: 25.75, faint: [25.85, 26.2], womp: 26.05, getUp: [29.9, 30.3],
  fan: [28.35, 33.6], fogFan: [31.3, 32.4], sideEye: [32.5, 33.7], l9: 28.6, l10: 34.2, soften: 35.0, pause: [35.75, 37.35], nod: [37.35, 38.65], tears: 38.35,
  chartsOut: [39.55, 39.95], h4Out: [39.6, 39.8],
  cut3: 40.0,
  // 6 · a little push
  h5: 40.1, h5Land: 40.5, l11: 40.3, l12: 43.1, photo: 42.95, photoHeart: 44.2, photoOut: [46.05, 46.35], close2: 46.45, h5Out: [46.2, 46.4],
  // 7 · lesson unlocked
  scurry1: [46.35, 46.75], banner: BEAT(83), lesson: 47.1, lessonLate: 47.95, hug: [47.0, 47.45], unhug: [50.75, 51.1],
  lessonOut: [50.75, 51.0], scurry2: [50.9, 51.3],
  // 8 · sunday
  h6: 51.1, h6Land: 51.55, crock: 51.3, open3: 51.55, l13: 51.7, winkC: [53.55, 54.05], winkT: [53.8, 54.3], peek: 54.15, close3: 55.0,
  h6Out: [55.0, 55.2], out: [55.0, 55.45],
}
const LINES1 = [
  { t: T.l1, speaker: C_TAG, color: C_TXT, text: 'Still single? At your *SATURN RETURN??*' },
  { t: T.l2, speaker: C_TAG, color: C_TXT, text: 'We only ask because we *love* you.' },
  { t: T.l3, speaker: T_TAG, color: T_TXT, text: 'And because we have *a list.*' },
  { t: T.l4, speaker: T_TAG, color: T_TXT, text: 'Earth sign. Good family.' },
  { t: T.l5, speaker: T_TAG, color: T_TXT, text: 'Owns a *crockpot.*' },
]
const LINES2 = [
  { t: T.l6, speaker: C_TAG, color: C_TXT, text: 'WHAT *SIGN.*' },
  { t: T.l7, speaker: T_TAG, color: T_TXT, text: 'Birth time. *Now.*' },
  { t: T.l8, speaker: C_TAG, color: READING.push, text: 'Push: you both like *being right.*' },
  { t: T.l9, speaker: T_TAG, color: READING.pull, text: "Pull: …that's a *LOT* of pull." },
  { t: T.l10, speaker: C_TAG, color: READING.align, text: 'Align: you laugh at *the same things.*' },
  { t: T.l11, speaker: T_TAG, color: T_TXT, text: "Push isn't a *dealbreaker,* baby." },
  { t: T.l12, speaker: C_TAG, color: C_TXT, text: 'Your uncle and I? *All push.* 40 years.' },
]
const LINES3 = [{ t: T.l13, speaker: BOTH_TAG, color: PINK, text: "Bring them to dinner. *We'll behave.*" }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3]
const CPS = 28
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })
const C_HOPS = [...talkHops(ALL_LINES, C_TAG, { cps: CPS }), T.snap + 0.02, T.gasp, T.banner + 0.05, T.h6Land]
const T_HOPS = [...talkHops(ALL_LINES, T_TAG, { cps: CPS }), T.scroll[0], T.snap + 0.06, T.gasp + 0.05, T.crock, T.banner + 0.1, T.h6Land + 0.06, ...talkHops(LINES3, BOTH_TAG, { cps: CPS })]
const Y_HOPS = [T.pull[1] + 0.05, T.msg + 0.02, T.roll[1], T.charts[1], T.banner + 0.15, T.crock + 0.35]
const BUBBLE_TXT = ["I'm kind of talking", 'to someone?']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const D2R = Math.PI / 180
const inR = (t, [a, b]) => t >= a && t < b

/** springy word-by-word type: `*word*` = accent (Garamond italic), `|` = line break; per-word times / colours optional */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = null, colors = {}, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (colors[n]) style.color = colors[n]
    const big = late > 0 && n >= nW - late
    const wt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big: big || !!times, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── the camera (world → screen): keys [t, zoom, focusX, focusY, screenX, screenY], eased between
const CAM = [
  [0, 2.7, 540, 1085, 540, 975], [4.3, 2.95, 540, 1085, 540, 975], [4.95, 1, 540, 960, 540, 960],
  [19.18, 1, 540, 960, 540, 960], [19.42, 1.08, 540, 1120, 540, 1120], [22.85, 1.08, 540, 1120, 540, 1120], [23.2, 1, 540, 960, 540, 960],
  [35.8, 1, 540, 960, 540, 960], [38.6, 1.06, 540, 1130, 540, 1130], [39.9, 1.06, 540, 1130, 540, 1130], [40.0, 1, 540, 960, 540, 960],
  [46.45, 1, 540, 960, 540, 960], [47.05, 1, 540, 960, 540, 1225], [50.75, 1, 540, 960, 540, 1225], [51.15, 1, 540, 960, 540, 960],
]
function cam(t) {
  let a = CAM[0], b = CAM[0]
  for (let i = 0; i < CAM.length; i++) { if (CAM[i][0] <= t) { a = CAM[i]; b = CAM[i + 1] || CAM[i] } }
  const e = b === a ? 0 : (a[0] === 0 ? ease.inOutQuad : ease.inOutCubic)(prog(t, a[0], b[0]))
  const k = a.slice(1).map((v, i) => lerp(v, b[i + 1], e))
  return { z: k[0], fx: k[1], fy: k[2], sx: k[3], sy: k[4] }
}
const toS = (C, x, y, s = 0) => ({ x: C.sx + (x - C.fx) * C.z, y: C.sy + (y - C.fy) * C.z, s: s * C.z })

// ── world positions
const SEAT_C = { x: 215, y: 1040, s: 400 }, SEAT_T = { x: 865, y: 1040, s: 400 }, SEAT_Y = { x: 540, y: 1140, s: 200 }
const ECU_C = { x: 445, y: 1110, s: 330 }, ECU_T = { x: 640, y: 1112, s: 330 }
const LUNGE_C = { x: 285, y: 1020, s: 425 }, LUNGE_T = { x: 795, y: 1020, s: 425 }
const READ_C = { x: 180, y: 1120, s: 350 }, READ_T = { x: 900, y: 1120, s: 350 }, READ_Y = { x: 540, y: 1170, s: 170 }
const HUG_C = { x: 345, y: 1040, s: 400 }, HUG_T = { x: 735, y: 1040, s: 400 }
const DOILY = { x: 540, y: 1222, rx: 540, ry: 140 }
const PIS_A = { x: 935, y: 640, s: 140 }, PIS_R = { x: 540, y: 790, s: 150 }, PIS_L = { x: 920, y: 1330, s: 150 }
const lerpP = (A, B, e, arc = 0) => ({ x: lerp(A.x, B.x, e), y: lerp(A.y, B.y, e) - Math.sin(Math.PI * clamp(e)) * arc, s: lerp(A.s, B.s, e) })

function cancerPos(t) {
  if (t < T.pull[0]) return { ...ECU_C, x: ECU_C.x + Math.sin(t * 0.9) * 4 }
  if (t < T.pull[1]) return lerpP(ECU_C, SEAT_C, ease.inOutCubic(prog(t, ...T.pull)))
  if (t < T.snap) return SEAT_C
  if (t < T.cut2) return t < T.unlunge[0] ? lerpP(SEAT_C, LUNGE_C, ease.spring(prog(t, T.snap, T.snap + 0.5), 0.2)) : lerpP(LUNGE_C, SEAT_C, ease.inOutCubic(prog(t, ...T.unlunge)))
  if (t < T.cut3) return READ_C
  if (t < T.hug[0]) return SEAT_C
  if (t < T.unhug[0]) return lerpP(SEAT_C, HUG_C, ease.spring(prog(t, T.hug[0], T.hug[0] + 0.6), 0.2), 30)
  return lerpP(HUG_C, SEAT_C, ease.inOutCubic(prog(t, ...T.unhug)), 30)
}
function taurusPos(t) {
  if (t < T.pull[0]) return { ...ECU_T, x: ECU_T.x - Math.sin(t * 0.8 + 1) * 4 }
  if (t < T.pull[1]) return lerpP(ECU_T, SEAT_T, ease.inOutCubic(prog(t, ...T.pull)))
  if (t < T.snap) return SEAT_T
  if (t < T.cut2) return t < T.unlunge[0] ? lerpP(SEAT_T, LUNGE_T, ease.spring(prog(t, T.snap + 0.04, T.snap + 0.54), 0.2)) : lerpP(LUNGE_T, SEAT_T, ease.inOutCubic(prog(t, ...T.unlunge)))
  if (t < T.cut3) return READ_T
  if (t < T.hug[0]) return SEAT_T
  if (t < T.unhug[0]) return lerpP(SEAT_T, HUG_T, ease.spring(prog(t, T.hug[0] + 0.05, T.hug[0] + 0.65), 0.2), 30)
  return lerpP(HUG_T, SEAT_T, ease.inOutCubic(prog(t, ...T.unhug)), 30)
}
function youPos(t) {
  if (t < T.cut2 || t >= T.cut3) return SEAT_Y
  return READ_Y
}
function pisPos(t) {
  if (t < T.cut2) return PIS_A
  if (t < T.cut3) return PIS_R
  if (t < T.scurry1[0]) return PIS_A
  if (t < T.scurry2[0]) return lerpP(PIS_A, PIS_L, ease.inOutCubic(prog(t, ...T.scurry1)), 120)
  return lerpP(PIS_L, PIS_A, ease.inOutCubic(prog(t, ...T.scurry2)), 120)
}

// ── moods
function cancerState(t) {
  const g = { frame: '#b3203f', hi: '#ffe08a', chain: true, down: 0, fog: 0 }
  // fog: two breaths in, wiped clean on the way out
  g.fog = t < T.pull[1] ? clamp(prog(t, ...T.fog) * (0.85 + 0.15 * Math.sin(t * 9))) * (1 - prog(t, ...T.unfog)) : 0
  if (t >= T.snap && t < T.cut2) g.down = ease.outBack(prog(t, T.snap, T.snap + 0.12))
  const st = { mood: 'neutral', look: [0, 0], blink: undefined, squash: 0, dy: 0, g }
  if (t < T.pull[0]) {
    st.mood = t < LT1[0].chars[22] ? 'squint' : t < 3.4 ? 'wide' : 'squint'
    return st
  }
  if (t < T.pull[1]) { st.mood = 'neutral'; st.look = [1, 0]; return st }
  if (t < T.l2) { st.mood = 'neutral'; st.look = [1, 0]; return st }
  if (t < T.l3) { st.mood = t < LT1[1].chars[22] ? 'neutral' : 'sparkle'; st.look = t < LT1[1].chars[22] ? [0, 0] : [0, 0]; return st }
  if (t < T.cut1) { st.mood = t < LT1[2].chars[18] ? 'happy' : 'wink'; st.look = [1, 0]; return st }
  if (t < T.dreamy) { st.mood = 'happy'; st.look = [1, -1]; return st }
  if (t < T.nodList) { st.mood = 'sparkle'; st.look = [0, -1]; return st }
  if (t < T.bubble) { const k = nodK(t, T.nodList); st.mood = 'happy'; st.squash = 0.1 * k; st.dy = 14 * k; return st }
  if (t < T.snap) { st.mood = t < T.msg ? 'neutral' : 'neutral'; st.look = t < T.msg + 0.5 ? [0, 0] : [1, 0]; st.blink = t > T.msg + 0.4 ? false : undefined; return st }
  if (t < T.cut2) { st.mood = 'wide'; st.look = t < T.l7 ? [1, 0] : [0, 0]; return st }
  if (t < T.cut3) {
    if (t < T.l8) { st.mood = 'neutral'; st.look = [1, -1]; return st }
    if (t < T.gasp) { st.mood = 'squint'; st.look = [1, -1]; return st }
    if (t < T.l9) { st.mood = 'wide'; st.look = [0, 0]; return st }
    if (t < T.l10) { st.mood = inR(t, [T.l9 + 1.5, T.l9 + 2.6]) ? 'eyeroll' : inR(t, T.sideEye) ? 'squint' : 'neutral'; st.look = [1, 0]; return st }
    if (t < T.soften) { st.mood = 'squint'; st.look = [1, -1]; return st }
    if (t < T.nod[0]) { st.mood = 'sparkle'; st.look = [0, 0]; st.blink = t > T.pause[0] ? false : undefined; return st }
    if (t < T.nod[1]) { const k = slowNod(t); st.mood = k > 0.15 ? 'happy' : 'sparkle'; st.look = [0, 1]; st.squash = 0.12 * k; st.dy = 20 * k; return st }
    st.mood = 'sparkle'; return st
  }
  if (t < T.banner) {
    if (t < T.l12) { st.mood = 'happy'; st.look = [1, 0]; return st }
    if (t < T.photoHeart) { st.mood = 'neutral'; st.look = [0, 0]; return st }
    st.mood = 'heart'; return st
  }
  if (t < T.unhug[0]) { st.mood = t < T.hug[1] ? 'happy' : 'sparkle'; return st }
  if (inR(t, T.winkC)) { st.mood = 'wink'; return st }
  if (t >= T.peek) { st.mood = t < T.peek + 0.5 ? 'squint' : 'wink'; st.look = [1, 0]; return st }
  st.mood = 'happy'; st.look = [1, 0]
  return st
}
function taurusState(t) {
  const g = { frame: '#5a2e14', hi: '#ffd98a', down: 0, fog: 0 }
  g.fog = t < T.pull[1] ? clamp(prog(t, T.fog[0] + 0.3, T.fog[1] + 0.3) * (0.85 + 0.15 * Math.sin(t * 8 + 1))) * (1 - prog(t, ...T.unfog)) : 0
  if (t >= T.snap + 0.06 && t < T.cut2) g.down = ease.outBack(prog(t, T.snap + 0.06, T.snap + 0.18))
  if (inR(t, [T.fogFan[0], T.l10])) g.fog = clamp(prog(t, ...T.fogFan)) * (1 - prog(t, T.fan[1], T.l10)) * (0.85 + 0.15 * Math.sin(t * 8))
  const st = { mood: 'neutral', look: [0, 0], squash: 0, dy: 0, g, fan: null }
  if (t < T.pull[0]) { st.mood = t < LT1[0].chars[22] + 0.1 ? 'squint' : t < 3.5 ? 'wide' : 'squint'; return st }
  if (t < T.l2) { st.look = [-1, 0]; return st }
  if (t < T.l3) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  if (t < T.cut1) { st.mood = t < LT1[2].chars[18] ? 'neutral' : 'squint'; st.look = [0, 0]; return st }
  if (t < T.dreamy) { st.mood = 'squint'; st.look = [-1, 0]; return st }
  if (t < T.nodList) { st.mood = 'sparkle'; st.look = [0, -1]; return st }
  if (t < T.bubble) { const k = nodK(t, T.nodList + 0.05); st.mood = 'happy'; st.squash = 0.1 * k; st.dy = 14 * k; return st }
  if (t < T.snap) { st.look = t < T.msg + 0.5 ? [0, 0] : [-1, 0]; st.blink = t > T.msg + 0.45 ? false : undefined; return st }
  if (t < T.cut2) { st.mood = t < T.l7 ? 'wide' : 'squint'; st.look = t < T.l7 ? [-1, 0] : [0, 0]; return st }
  if (t < T.cut3) {
    if (t < T.gasp) { st.mood = t < T.l8 ? 'neutral' : 'squint'; st.look = [-1, -1]; return st }
    if (t < T.fan[0]) { st.mood = 'wide'; st.look = [0, 0]; return st }
    if (t < T.fan[1]) { st.mood = 'heart'; st.fan = prog(t, ...T.fan); return st }
    if (t < T.l10) { st.mood = 'happy'; st.look = [-1, 0]; return st }
    if (t < T.soften + 0.2) { st.mood = 'neutral'; st.look = [-1, -1]; return st }
    if (t < T.nod[0]) { st.mood = 'sparkle'; st.blink = t > T.pause[0] ? false : undefined; return st }
    if (t < T.nod[1]) { const k = slowNod(t - 0.05); st.mood = k > 0.15 ? 'happy' : 'sparkle'; st.look = [0, 1]; st.squash = 0.12 * k; st.dy = 20 * k; return st }
    st.mood = 'sparkle'; return st
  }
  if (t < T.banner) {
    if (t < T.l12) { st.mood = t < LT2[5].chars[25] ? 'neutral' : 'sparkle'; return st }
    st.mood = t < T.photoHeart ? 'wide' : 'happy'; st.look = [-1, 0]; return st
  }
  if (t < T.unhug[0]) { st.mood = t < T.hug[1] ? 'happy' : 'sparkle'; return st }
  if (inR(t, T.winkT)) { st.mood = 'wink'; return st }
  st.mood = 'happy'; st.look = [-1, 0]
  return st
}
function youState(t) {
  const st = { mood: 'neutral', look: [0, 0], squash: 0, sweat: 0 }
  if (t < T.l2) { st.look = [-1, 0]; st.sweat = 1; return st }
  if (t < T.l3) { st.mood = t < LT1[1].chars[22] ? 'neutral' : 'happy'; st.look = [-1, 0]; return st }
  if (t < T.cut1) { st.mood = t < LT1[2].chars[18] ? 'neutral' : 'wide'; st.look = [1, 0]; return st }
  if (t < T.l5) { st.mood = 'wide'; st.look = [0, -1]; st.sweat = 1; return st }
  if (t < T.roll[0]) { st.mood = 'wide'; st.look = [0, -1]; return st }
  if (t < T.roll[1]) { st.mood = 'eyeroll'; return st }
  if (t < T.bubble) { st.mood = 'neutral'; return st }
  if (t < T.snap) { st.mood = 'sparkle'; st.look = [0, 1]; return st }
  if (t < T.cut2) { st.mood = 'wide'; st.squash = 0.18 * ease.outCubic(prog(t, T.snap, T.snap + 0.2)); st.sweat = 1; st.look = t < T.l7 ? [-1, 0] : [1, 0]; return st }
  if (t < T.cut3) {
    if (t < T.l8) { st.look = [0, -1]; return st }
    if (t < T.l9) { st.mood = t < T.gasp ? 'squint' : 'wide'; st.sweat = t > T.gasp ? 1 : 0; return st }
    if (t < T.l10) { st.mood = t < LT2[3].chars[10] ? 'neutral' : 'heart'; return st }
    if (t < T.nod[1]) { st.mood = 'sparkle'; st.look = [0, 0]; st.blink = t > T.pause[0] ? false : undefined; return st }
    st.mood = 'happy'; return st
  }
  if (t < T.banner) { st.mood = t < T.l12 ? 'happy' : 'neutral'; st.look = t < T.l12 ? [1, 0] : [-1, 0]; return st }
  if (t < T.unhug[0]) { st.mood = 'happy'; st.squash = 0.2 * ease.outCubic(prog(t, T.hug[0] + 0.15, T.hug[0] + 0.4)) * (1 - prog(t, ...T.unhug)); return st }
  if (t < T.crock + 0.3) { st.mood = 'wide'; st.look = [1, -1]; return st }
  st.mood = 'happy'; return st
}
function pisState(t) {
  const st = { mood: 'happy', look: [0, 0], tears: 1, rot: 0, dy: 0, fountain: true }
  if (t >= T.bubble + 0.3 && t < T.cut2) { st.mood = 'wide'; st.tears = t > T.snap ? 0.5 : 0.3; st.fountain = false }
  if (t >= T.cut2 && t < T.cut3) {
    if (t < T.gasp) { st.mood = 'neutral'; st.look = [0, -1]; st.tears = 0.35; st.fountain = false }
    else if (t < T.faint[0]) { st.mood = 'wide'; st.tears = 0 }
    else if (t < T.getUp[1]) {
      const f = ease.inQuad(prog(t, ...T.faint)), u = ease.outBack(prog(t, ...T.getUp))
      st.rot = -Math.PI * f * (1 - u); st.dy = 95 * f * (1 - u)
      st.mood = 'neutral'; st.blink = t < T.getUp[0] ? 1 : undefined; st.tears = 0
      if (t > T.getUp[1] - 0.1) st.mood = 'heart'
    } else if (t < T.l10) { st.mood = 'heart'; st.tears = 0.4; st.fountain = false }
    else if (t < T.nod[0]) { st.mood = 'sparkle'; st.tears = 0.6; st.fountain = false }
  }
  return st
}
// a nod: down and up twice; a single slow nod for the Align beat
function nodK(t, t0) { const k = t - t0; if (k < 0 || k > 0.9) return 0; return Math.max(0, Math.sin(k / 0.45 * Math.PI)) * (k < 0.45 ? 1 : 0.8) }
function slowNod(t) { const p = prog(t, ...T.nod); return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p) ** 1.5 }

// ── the reading: two charts + three lines (screen space)
const CH_S = 0.4, CHART_W = { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.92 }, R_DOT = 330 * CH_S
const CHA = { x: 272, y: 790 }, CHB = { x: 808, y: 790 }
const READ = [
  { a: -58, b: -122, apex: 560, col: READING.push, label: 'PUSH', t: T.l8 },
  { a: 52, b: 128, apex: 1010, col: READING.pull, label: 'PULL', t: T.l9 },
  { a: -16, b: -164, apex: 690, col: READING.align, label: 'ALIGN', t: T.l10 },
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 50px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const DOILY_IMG = makeDoily(document, 66)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The stars have | *questions.*', { top: 190, size: 112, accentSize: 168, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'The Auntie | *Council.*', { top: 190, size: 120, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: C_TXT })
  const H2 = popText(root, 'They brought | *a list.*', { top: 150, size: 112, accentSize: 160, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: T_TXT })
  const H3 = popText(root, 'A new | *development.*', { top: 190, size: 120, accentSize: 168, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Push. Pull. *Align.*', { top: 300, size: 100, accentSize: 136, times: [T.l8, T.l9, T.l10], wobble: true, colors: { 0: READING.push, 1: READING.pull, 2: READING.align } })
  const H5 = popText(root, 'A little push | is *normal.*', { top: 190, size: 112, accentSize: 168, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: READING.push })
  const H6 = popText(root, 'Sunday. | *Seven sharp.*', { top: 190, size: 120, accentSize: 168, at: T.h6, late: 2, lateAt: T.h6Land, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const LESSON = popText(root, "Nobody's perfect | for you. | Find who's *worth* | the work.", { top: 655, size: 100, accentSize: 132, at: T.lesson, gap: 0.09, late: 1, lateAt: T.lessonLate, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [LESSON, T.lessonOut]]
  const BOX_Y = 1450
  const box1 = dialogueBox(root, { lines: LINES1, y: BOX_Y, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: BOX_Y, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: BOX_Y, width: 960, height: 290, open: T.open3, close: T.close3, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── world draws (camera C)
  function doily(t, C) {
    if (t < T.pull[0] - 0.4) return
    const o = popOut(t, T.out)
    const p = toS(C, DOILY.x, DOILY.y)
    const k = t < T.pull[1] ? ease.outCubic(prog(t, T.pull[0] - 0.4, T.pull[1])) : 1
    drawDoily(x, DOILY_IMG, p.x, p.y + Math.sin(t * 1.3) * 5, DOILY.rx * C.z * o, DOILY.ry * C.z * o, k * clamp(o))
  }
  function drawCancer(t, C) {
    const P = cancerPos(t), st = cancerState(t), S = toS(C, P.x, P.y + st.dy, P.s), o = popOut(t, T.out)
    return auntie(x, S.x, S.y, S.s, t, { color: CAN.color, glyph: S.s >= 150 ? CAN.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: C_HOPS, seed: 3, pop: o, glasses: st.g })
  }
  function drawTaurus(t, C) {
    const P = taurusPos(t), st = taurusState(t), S = toS(C, P.x, P.y + st.dy, P.s), o = popOut(t, T.out)
    const r = auntie(x, S.x, S.y, S.s, t, { color: TAU_.color, glyph: S.s >= 150 ? TAU_.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: T_HOPS, seed: 8, pop: o, glasses: st.g })
    if (st.fan != null) {
      const f = st.fan, inK = easeOutBack(prog(f, 0, 0.08), 2) * (1 - ease.inCubic(prog(f, 0.93, 1)))
      const ang = -0.5 + 0.45 * Math.sin((t - T.fan[0]) * 14) - (1 - inK) * 1.2
      drawFan(x, S.x - S.s * 0.42, S.y - S.s * 0.08, S.s * 0.42 * inK, ang, clamp(inK * 1.5))
    }
    return r
  }
  function drawYou(t, C) {
    if (t < T.pull[0] + 0.25) return null
    const P = youPos(t), st = youState(t), o = popOut(t, T.out)
    let pk = t < T.pull[1] + 0.3 ? pop01(t, T.pull[0] + 0.3, 0.4, 2.2) : 1
    if (t >= T.cut2 && t < T.cut2 + 0.5) pk = pop01(t, T.cut2 + 0.08, 0.32, 2)
    const S = toS(C, P.x, P.y, P.s)
    const r = drawStarChar(x, S.x, S.y, S.s, t, { color: YOU_COL, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: Y_HOPS, seed: 12, pop: pk * o, glow: 0.9 })
    if (st.sweat && pk * o > 0.5) drawSweat(x, t, S.x + S.s * 0.36, S.y - S.s * 0.5, Math.max(4, Math.round(S.s / 36)), 1)
    return r
  }
  function drawPisces(t, C) {
    if (t < T.pis) return
    const P = pisPos(t), st = pisState(t), o = popOut(t, T.out)
    let pk = pop01(t, T.pis, 0.4, 2.4)
    if (t >= T.cut2 && t < T.cut2 + 0.5) pk = pop01(t, T.cut2 + 0.12, 0.32, 2)
    if (t >= T.cut3 && t < T.cut3 + 0.5) pk = pop01(t, T.cut3 + 0.12, 0.32, 2)
    const S = toS(C, P.x, P.y, P.s)
    x.save(); x.translate(S.x, S.y + st.dy * C.z); x.rotate(st.rot)
    const r = drawStarChar(x, 0, 0, S.s, t, { color: PIS.color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, seed: 17, pop: pk * o, glow: 0.8, hops: [T.pis + 0.3, T.getUp[1], T.banner + 0.2, T.scurry1[1], T.scurry2[1]] })
    x.restore()
    // dizzy pixel stars circling the fainted Pisces
    if (st.rot !== 0 && t > T.faint[1] && t < T.getUp[0]) for (let i = 0; i < 3; i++) {
      const a = t * 4 + i * 2.094
      drawPixelStar(x, S.x + Math.cos(a) * S.s * 0.5, S.y + st.dy * C.z - S.s * 0.55 + Math.sin(a) * S.s * 0.14, 26, 1, [GOLD, BONE, PINK][i])
    }
    if (st.tears > 0 && pk * o > 0.3 && st.rot === 0) { const e = eyesOf({ x: S.x, y: r.y + S.y + st.dy * C.z, size: r.size }); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: st.tears * o, seed: 4, fountain: st.fountain }) }
  }
  function tearsOn(t, r, seed) {
    if (!r || t < T.tears || t >= T.cut3) return
    const k = clamp(prog(t, T.tears, T.tears + 0.3)) * (1 - prog(t, T.chartsOut[0], T.chartsOut[1]))
    drawTears(x, t, r.x, r.eyeY + r.cell * 3, r.eyeDX, Math.max(8, r.cell * 1.15), { amount: k, seed, fountain: false })
  }

  // the list (Taurus's scroll)
  const LIST = [
    { text: 'Earth sign', check: LT1[3].chars[10] }, { text: 'Good family', check: LT1[3].done },
    { text: 'Owns a crockpot', check: LT1[4].done + 0.05 }, { text: 'Calls their mother' }, { text: 'Brings a dish' },
    { text: 'Good teeth' }, { text: 'Thank-you notes' }, { text: 'Not a drummer' }, { text: 'Knows a guy' },
    { text: 'Tall-ish' }, { text: 'Remembers birthdays' }, { text: 'Drives at night' }, { text: 'Has a nice laugh', dim: true },
    { text: 'Fixes things', dim: true }, { text: '(see page 2)', dim: true },
  ]
  function drawList(t, C) {
    if (t < T.scroll[0] || t > T.scrollUp[1]) return
    const top = toS(C, 540, 520)
    let len = ease.outCubic(prog(t, ...T.scroll)) * 1600
    if (t > T.scrollUp[0]) len *= 1 - ease.inCubic(prog(t, ...T.scrollUp))
    const k = easeOutBack(prog(t, T.scroll[0] - 0.05, T.scroll[0] + 0.2), 2)
    x.save(); x.translate(top.x, top.y); x.scale(k, k); x.translate(-top.x, -top.y)
    drawScroll(x, t, top.x, top.y, 430, len, LIST, { rowH: 64, font: "italic 600 42px 'EB Garamond', serif" })
    x.restore()
  }

  // the chat bubble from "you"
  function drawBubble(t, C) {
    if (t < T.bubble || t > T.bubbleOut[1]) return
    const k = pop01(t, T.bubble, 0.34, 2.2) * (1 - ease.inCubic(prog(t, ...T.bubbleOut)))
    if (k <= 0.01) return
    const p = toS(C, 540, 770)
    const msg = t >= T.msg
    const w = msg ? 640 : 220, h = msg ? 190 : 110
    x.save(); x.translate(p.x, p.y); x.scale(k * C.z, k * C.z)
    // label
    x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(BONE, 0.8)
    x.fillText('you', -w / 2 + 14, -h / 2 - 16)
    // pixel bubble (stepped corners) + tail toward your star
    const P = 8, bx = -w / 2, by = -h / 2
    x.fillStyle = '#3d6cf2'
    x.fillRect(bx + 2 * P, by, w - 4 * P, h); x.fillRect(bx, by + 2 * P, w, h - 4 * P); x.fillRect(bx + P, by + P, w - 2 * P, h - 2 * P)
    for (let i = 0; i < 4; i++) x.fillRect(-P * (3 - i), h / 2 + i * P, P * (6 - 2 * i), P)
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(bx + 3 * P, by + P, w - 6 * P, P)
    x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'
    if (!msg) {
      for (let i = 0; i < 3; i++) { const b = Math.sin((t - T.bubble) * 9 - i * 0.9) > 0.3 ? -8 : 0; x.fillRect(-48 + i * 36, -8 + b, 20, 20) }
    } else {
      const mk = easeOutBack(prog(t, T.msg, T.msg + 0.25), 2.4)
      x.save(); x.scale(mk, mk)
      x.font = `700 50px ${INTER}`
      x.fillText(BUBBLE_TXT[0], 0, -30); x.fillText(BUBBLE_TXT[1], 0, 34)
      x.restore()
    }
    x.restore()
  }

  // the uncle photo (held up beside Cancer)
  function drawPhoto(t, C) {
    if (t < T.photo || t > T.photoOut[1]) return
    const k = pop01(t, T.photo, 0.36, 2.2) * (1 - ease.inCubic(prog(t, ...T.photoOut)))
    if (k <= 0.01) return
    const p = toS(C, 330, 690)
    x.save(); x.translate(p.x, p.y); x.rotate(-0.08 + 0.03 * Math.sin(t * 2)); x.scale(k * C.z * 1.45, k * C.z * 1.45)
    pixelPanel(x, -110, -130, 220, 250, { P: 8, fill: '#1d2a4a', border: GOLD, glow: 0.35 })
    const r = drawStarChar(x, 0, -6, 144, t, { color: '#5aa6e8', mood: t > T.photoHeart + 0.4 ? 'squint' : 'squint', look: [0, 0], blink: false, bob: 0, seed: 30, glow: 0.4, tips: false })
    // a grumpy pixel moustache
    const c = r.size / 36, mx = -6 * c, my = r.y + 4.6 * c
    bmp(x, ['.XX....XX.', 'XXXX..XXXX', 'XXXXXXXXXX', 'XX......XX'], mx - 2 * c, my, c * 1.0, { X: '#3b2418' })
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('UNCLE', 0, 104)
    x.restore()
    drawHearts(x, t, T.photoHeart, p.x + 175 * C.z, p.y + 120, { n: 7, px: 8, spread: 90, life: 1.1 })
  }

  // the crockpot (Taurus)
  function drawCrock(t, C) {
    if (t < T.crock) return
    const o = popOut(t, T.out)
    const k = pop01(t, T.crock, 0.42, 2.2) * o
    if (k <= 0.01) return
    const tp = taurusPos(t), base = toS(C, tp.x - 250, tp.y - 30)
    const rise = (1 - ease.outCubic(prog(t, T.crock, T.crock + 0.4))) * 120
    x.save(); x.translate(base.x, base.y + rise); x.scale(k, k)
    drawCrockpot(x, t, 0, 0, 18, { rattle: inR(t, [T.l13 + 0.2, T.l13 + 1.4]) ? 1 : 0.25, steam: 1 })
    x.restore()
    sparkBurst(x, t, base.x, base.y - 90, T.crock + 0.2, { n: 10, R: 150, size: 22, seed: 3 })
    drawHearts(x, t, T.winkC[0], base.x, base.y - 180, { n: 5, px: 6, spread: 120 })
  }

  // …and the list is already back out (a tiny one, peeking from behind Cancer)
  function drawPeek(t, C) {
    if (t < T.peek) return
    const k = pop01(t, T.peek, 0.34, 2.4) * popOut(t, T.out)
    if (k <= 0.01) return
    const cp = cancerPos(t), p = toS(C, cp.x + 150, cp.y - 210)
    x.save(); x.translate(p.x, p.y); x.rotate(0.22 + 0.05 * Math.sin(t * 5)); x.scale(k * C.z, k * C.z)
    drawScroll(x, t, 0, -80, 120, 150, [], {})
    x.fillStyle = 'rgba(74,40,20,0.75)'
    for (let i = 0; i < 4; i++) x.fillRect(-42, -50 + i * 28, i % 2 ? 64 : 84, 7)
    x.restore()
  }

  // ── screen draws: the reading
  function drawReading(t) {
    if (t < T.charts[0] || t > T.chartsOut[1] + 0.05) return
    const k = easeOutBack(prog(t, ...T.charts), 1.6) * (1 - ease.inCubic(prog(t, ...T.chartsOut)))
    if (k <= 0) return
    const pausePush = 1
    for (const [side, P] of [[0, CHA], [1, CHB]]) {
      x.save(); x.translate(P.x, P.y); x.rotate((side ? 1 : -1) * (1 - ease.outCubic(prog(t, ...T.charts))) * 1.4 + (side ? -1 : 1) * t * 0.04)
      x.scale(CH_S * k * pausePush, CH_S * k * pausePush); drawWheelH(x, { W: CHART_W, k: clamp(k) }); x.restore()
      x.save(); x.globalAlpha = clamp(k); x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillStyle = rgba(BONE, 0.85)
      x.fillText(side ? 'THEM' : 'YOU', P.x, P.y + 7); x.restore()
    }
    READ.forEach((L, i) => {
      const A_ = { x: CHA.x + Math.cos(L.a * D2R) * R_DOT * k, y: CHA.y + Math.sin(L.a * D2R) * R_DOT * k }
      const B_ = { x: CHB.x + Math.cos(L.b * D2R) * R_DOT * k, y: CHB.y + Math.sin(L.b * D2R) * R_DOT * k }
      const cX = (A_.x + B_.x) / 2, cY = 2 * L.apex - (A_.y + B_.y) / 2
      const lk = ease.inOutCubic(prog(t, L.t, L.t + 0.45)) * clamp(k)
      if (lk > 0) {
        const pulse = 1 + 0.4 * Math.exp(-Math.max(0, t - L.t - 0.45) * 4) + (i === 1 && inR(t, T.fan) ? 0.35 + 0.25 * Math.sin(t * 12) : 0)
        x.save(); x.globalAlpha = clamp(k); x.strokeStyle = L.col; x.lineCap = 'round'; x.lineWidth = 10 * pulse; x.shadowColor = L.col; x.shadowBlur = 26
        x.beginPath(); x.moveTo(A_.x, A_.y)
        const N = 40
        for (let s = 1; s <= Math.round(N * lk); s++) { const u = s / N, v = 1 - u; x.lineTo(v * v * A_.x + 2 * v * u * cX + u * u * B_.x, v * v * A_.y + 2 * v * u * cY + u * u * B_.y) }
        x.stroke(); x.restore()
        sparkBurst(x, t, B_.x, B_.y, L.t + 0.42, { n: 8, R: 80, size: 20, seed: 11 + i, cols: [L.col, '#fff3e0'] })
        // label chip at the apex
        const ck = easeOutBack(prog(t, L.t + 0.3, L.t + 0.6), 2.4) * clamp(k)
        if (ck > 0) {
          const ax = cX * 0.5 + (A_.x + B_.x) * 0.25, ay = 0.5 * cY + 0.25 * (A_.y + B_.y)
          x.save(); x.translate(ax, ay); x.scale(ck, ck)
          x.font = `700 30px ${MONO}`; const tw = x.measureText(L.label).width + 40
          x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-tw / 2, -24, tw, 48); x.fillStyle = L.col; x.fillRect(-tw / 2, -24, tw, 4); x.fillRect(-tw / 2, 20, tw, 4)
          x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.label, 0, 2); x.restore()
        }
      }
      const dk = pop01(t, T.charts[1] - 0.1 + i * 0.07, 0.3, 2.4) * clamp(k)
      for (const [p, col] of [[A_, YOU_COL], [B_, LAV]]) {
        if (dk <= 0) continue
        x.save(); x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(p.x, p.y, 15 * dk, 0, Math.PI * 2); x.fill()
        x.fillStyle = col; x.beginPath(); x.arc(p.x, p.y, 11 * dk, 0, Math.PI * 2); x.fill(); x.restore()
      }
    })
  }

  // ── screen draws: LESSON UNLOCKED
  function drawBanner(t) {
    if (t < T.banner - 0.05 || t > T.lessonOut[1] + 0.05) return
    const k = easeOutBack(prog(t, T.banner, T.banner + 0.38), 2.6) * (1 - ease.inCubic(prog(t, ...T.lessonOut)))
    if (k <= 0.01) return
    const cx = 540, cy = 520, w = 880, h = 150
    // light rays
    x.save(); x.translate(cx, cy); x.globalAlpha = 0.16 * clamp(k); x.fillStyle = GOLD
    for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, -720); x.lineTo(60, -720); x.closePath(); x.fill() }
    x.restore()
    x.save(); x.translate(cx, cy); x.rotate((1 - clamp(k)) * -0.12 + Math.sin((t - T.banner) * 18) * 0.02 * Math.exp(-(t - T.banner) * 3)); x.scale(k, k)
    pixelPanel(x, -w / 2, -h / 2, w, h, { P: 10, glow: 0.8 })
    x.font = `700 62px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('★ LESSON UNLOCKED', 0, 8)
    x.fillStyle = GOLD; x.fillText('★ LESSON UNLOCKED', 0, 3)
    // shine sweep
    const sw = prog(t, T.banner + 0.35, T.banner + 0.95)
    if (sw > 0 && sw < 1) { x.save(); x.beginPath(); x.rect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20); x.clip(); x.fillStyle = 'rgba(255,248,220,0.35)'; x.translate(lerp(-w / 2 - 80, w / 2 + 80, sw), 0); x.rotate(0.35); x.fillRect(-26, -150, 52, 300); x.restore() }
    x.restore()
    sparkBurst(x, t, cx, cy, T.banner + 0.05, { n: 16, R: 520, size: 34, seed: 2, life: 0.9 })
    sparkBurst(x, t, cx, cy, T.banner + 0.25, { n: 10, R: 360, size: 24, seed: 5, life: 0.8 })
    // +1 WISDOM
    const xp = prog(t, T.banner + 0.45, T.banner + 1.9)
    if (xp > 0 && xp < 1) { x.save(); x.globalAlpha = Math.sin(Math.PI * xp); x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#7fe08a'; x.fillText('+1 WISDOM', cx + 300, cy - 100 - xp * 70); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t)
        doily(t, C)
        drawReading(t)
        drawPisces(t, C)
        // in the close-up Taurus sits just behind Cancer; the list hangs in front of both; your star sits in front of it
        const rT = drawTaurus(t, C)
        const rC = drawCancer(t, C)
        drawList(t, C)
        drawYou(t, C)
        if (inR(t, [T.dreamy, T.nodList + 0.4])) for (const [r, i] of [[rC, 0], [rT, 1]]) drawHearts(x, t, T.dreamy + i * 0.1, r.x, r.y - r.size * 0.3, { n: 4, px: 7, spread: 120, life: 1.2 })
        tearsOn(t, rC, 1); tearsOn(t, rT, 2)
        drawBubble(t, C)
        drawPhoto(t, C)
        drawCrock(t, C)
        drawPeek(t, C)
        drawBanner(t)
        // gasp pop lines + the snap
        if (inR(t, [T.snap, T.snap + 0.35])) sparkBurst(x, t, 540, 1000, T.snap, { n: 10, R: 380, size: 26, seed: 9, cols: [BONE, GOLD] })
      }
      box1.update(t); box2.update(t); box3.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change); the default selection keeps 10.2 (→ the list), 23.3 (→ the reading) and
// 40.0 (→ "a little push"), about one per 13–17 s. The others play as plain beat changes.
const CUTS = [4.42, { t: T.cut1, kind: 'flip' }, 16.85, { t: T.cut2, kind: 'deal' }, 34.0, { t: T.cut3, kind: 'shuffle' }, 46.55]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the score's key by the engine; chip / snare / tom / crash sit on music buses)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const EB = { Eb4: 311.13, G4: 392, Ab4: 415.3, Bb4: 466.16, C5: 523.25, Eb5: 622.25, F5: 698.46, G5: 783.99, Bb5: 932.33, C6: 1046.5, Eb6: 1244.51, G6: 1567.98 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const scratch = t => [chip(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chip(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', t, 0.06]]
const womp = t => [[EB.Bb4, 0], [EB.Bb4 * 0.944, 0.36], [EB.Bb4 * 0.891, 0.72]].map(([f, d]) => chip(t + d, f, 0.3, { duty: 0.5, gain: 0.06, slide: -0.6, decay: 0.2, sustain: 0.6 })).concat([chip(t + 1.08, EB.Bb4 * 0.841, 0.95, { duty: 0.5, gain: 0.06, slide: -2.2, vib: 0.03, decay: 0.4, sustain: 0.7 })])
const drumroll = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 0.042, i++) out.push(['snare', +t.toFixed(3), { gain: 0.04 + 0.11 * (t - t0) / (t1 - t0), tone: 210, decay: 0.07, snappy: 0.9, rev: 0.1 }]); return out }
const levelUp = t => [[EB.Eb5, 0], [EB.G5, 0.065], [EB.Bb5, 0.13], [EB.Eb6, 0.195], [EB.Bb5, 0.26], [EB.Eb6, 0.325]].map(([f, d], i) => chip(t + d, f, i === 5 ? 0.55 : 0.07, { gain: 0.07, duty: 0.5, decay: 0.08, sustain: i === 5 ? 0.6 : 0.8, rev: 0.15, dly: 0.2 }))
  .concat([chip(t + 0.325, EB.G6, 0.55, { gain: 0.04, duty: 0.25, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0.25 })])
const flutter = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (1 - i / n * 0.5)])

export const CUES = [
  // 1 · the close-up
  ...head(T.h0, 3, T.h0Land, 0),
  ['pop', T.open1, 659.25, 0.04, 0], ['pop', T.open1 + 0.06, 880, 0.03, 0],
  ['whoosh', 1.4, 0.7, 0.02], ['whoosh', 2.5, 0.7, 0.018],                      // fogging breaths
  ['pop', LT1[0].chars[22], 392, 0.035, 0],                                      // "SATURN…" eyes go wide
  ['whoosh', T.pull[0] + 0.25, 0.55, 0.06], ['bell', T.pull[1], 1567.98, 0.025, 1.4, 0], ['glitter', T.pull[1] - 0.1, T.pull[1] + 0.4],
  // 2 · the council
  ...head(T.h1, 2, T.h1Land, 2),
  ['pop', T.pis + 0.1, 1174.66, 0.035, 0.6], ['glitter', T.pis + 0.15, T.pis + 0.45],
  ['pluck', LT1[1].chars[22], 1318.51, 0.035, 0.5, -0.3],                        // "love"
  ['pop', LT1[2].chars[18], 440, 0.035, 0.3],                                    // "a list"
  // 3 · the list
  ...head(T.h2, 2, T.h2Land, 1),
  ['whoosh', T.scroll[0] + 0.3, 0.6, 0.05], ...flutter(T.scroll[0] + 0.05, 14, 0.07),
  ['tom', T.scroll[1] - 0.05, 90, { gain: 0.25, decay: 0.35, rev: 0.2 }],       // the roller thunks off-screen
  ...LIST_CHECKS(),
  ['bell', T.dreamy, 1318.51, 0.03, 1.6, 0], ['glitter', T.dreamy, T.dreamy + 0.5],
  ['pop', T.roll[0] + 0.05, 440, 0.025, -0.1], ['pop', T.roll[0] + 0.2, 392, 0.025, 0.1],
  ['pop', T.nodList + 0.2, 523.25, 0.03, 0], ['pop', T.nodList + 0.65, 523.25, 0.025, 0],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.scrollUp[0] + 0.15, 0.35, 0.05], ...flutter(T.scrollUp[0], 6, 0.05, 0.025),
  // 4 · a new development
  ...head(T.h3, 2, T.h3Land, 3),
  ['pop', T.bubble, 880, 0.03, 0], ...[0, 1, 2, 3].map(i => ['tick', +(T.bubble + 0.12 + i * 0.14).toFixed(3), 0.02]),
  ['pop', T.msg, 1174.66, 0.045, 0], ['pluck', T.msg + 0.02, 1567.98, 0.03, 0.4, 0],
  ...scratch(T.snap), ['pop', T.snap + 0.04, 330, 0.04, -0.3], ['pop', T.snap + 0.1, 330, 0.04, 0.3],
  ['pop', T.open2, 659.25, 0.04, 0], ['pop', T.open2 + 0.06, 880, 0.03, 0],
  // 5 · the reading
  ['whoosh', T.charts[0], 0.45, 0.03], ['glitter', T.charts[0] + 0.1, T.charts[1] + 0.1],
  ...drumroll(T.roll2[0], T.roll2[1]), ['crash', T.l8, { gain: 0.06, len: 2 }],
  ...[0, 1, 2].map(i => ['pluck', +(READ[i].t + 0.42).toFixed(3), [1046.5, 1318.51, 1567.98][i], 0.035, 0.6, (i - 1) * 0.3]),
  ['pop', T.gasp, 392, 0.05, -0.3], ['pop', T.gasp + 0.04, 349.23, 0.05, 0.3],
  ['whoosh', T.faint[0] + 0.15, 0.35, 0.04], ['boom', T.faint[1], 0.12],
  ...womp(T.womp + 0.25),
  ...Array.from({ length: 10 }, (_, i) => ['brush', +(T.fan[0] + 0.15 + i * 0.45).toFixed(3), { gain: 0.03, len: 0.18, bus: 'drums' }]),
  ['bell', T.l9 + 1.0, 1318.51, 0.03, 1.2, 0.4],
  ['whoosh', T.fogFan[0] + 0.3, 0.6, 0.02], ['whoosh', T.fogFan[0] + 0.9, 0.6, 0.02], ['pop', T.sideEye[0], 440, 0.03, -0.3],
  ['pop', T.getUp[1] - 0.1, 1046.5, 0.035, 0], ['pluck', T.getUp[1], 1318.51, 0.03, 0.4, 0],
  ['tick', T.soften, 0.03], ['bell', T.soften + 0.05, 1174.66, 0.025, 1.8, 0],
  // the long, silent beat: nothing… then the slow nod (two soft knocks) and the tears
  ['pop', T.nod[0] + 0.55, 392, 0.035, 0], ['pluck', T.tears + 0.1, 1567.98, 0.025, 1.2, 0], ['glitter', T.tears + 0.2, T.tears + 0.8],
  // 6 · a little push
  ...head(T.h5, 2, T.h5Land, 4),
  ['pop', T.photo + 0.05, 783.99, 0.04, -0.3], ['bell', T.photo + 0.1, 1046.5, 0.025, 1.0, -0.3],
  ['pop', T.photoHeart, 1174.66, 0.035, -0.3], ['pop', T.photoHeart + 0.12, 1318.51, 0.03, -0.2],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // 7 · lesson unlocked (level-up arpeggio in Eb, sparkle burst, cheers)
  ['whoosh', T.scurry1[0] + 0.2, 0.3, 0.025],
  ...levelUp(T.banner), ['glitter', T.banner + 0.05, T.banner + 0.9], ['swell', T.banner, T.banner + 1.6, { gain: 0.05, f0: 800, f1: 5000, bus: 'drums' }],
  ['pop', T.banner + 0.45, 1567.98, 0.03, 0.4],
  ...wordPops(T.lesson, 7, 0.09, 0, 0.022), ['pop', T.lessonLate, 1046.5, 0.05, 0], ['pluck', T.lessonLate, 1318.51, 0.045, 0.8, 0],
  ['pop', T.hug[0] + 0.3, 523.25, 0.04, -0.3], ['pop', T.hug[0] + 0.35, 523.25, 0.04, 0.3],
  ['whoosh', T.lessonOut[0] + 0.1, 0.35, 0.03],
  // 8 · sunday
  ...head(T.h6, 2, T.h6Land, 0),
  ['pop', T.crock + 0.1, 659.25, 0.045, 0.3], ['bell', T.crock + 0.2, 1318.51, 0.03, 1.2, 0.3], ['glitter', T.crock + 0.2, T.crock + 0.6],
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.l13 + 0.25 + i * 0.18).toFixed(3), 0.03]),     // the lid rattles
  ['pop', T.open3, 659.25, 0.035, 0],
  ['pluck', T.winkC[0], 1318.51, 0.035, 0.5, -0.3], ['pluck', T.winkT[0], 1567.98, 0.035, 0.5, 0.3],
  ['pop', T.peek + 0.05, 1174.66, 0.04, -0.3], ...flutter(T.peek, 4, 0.05, 0.03),
  ['pop', T.close3, 880, 0.03, 0], ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue blips
  ...talkCues(LINES1, { cps: CPS, pitch: { [C_TAG]: 880, [T_TAG]: 659.25 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [C_TAG]: 880, [T_TAG]: 659.25 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [BOTH_TAG]: 783.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function LIST_CHECKS() { return [LT1[3].chars[10], LT1[3].done, LT1[4].done + 0.05].map((t, i) => ['pluck', +t.toFixed(3), [1046.5, 1174.66, 1567.98][i], 0.035, 0.3, 0.2]) }
