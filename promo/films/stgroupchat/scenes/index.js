// stgroupchat — "✨her date tonight✨" (45 s vertical Align ad, Star Talk season 3 #14, music: pop in D).
// Story 0–40.6, then the shared end card. The stars have a group chat about YOUR date tonight; every friend is a type.
//   0.00–3.3   "The stars have a | group chat. | It's about *you.*"  The chat pops up as a brand-new group (✨ her date
//              tonight ✨ · 12 stars · ♋ CANCER made this chat). Below it the cast sits in two little stands, everyone
//              hunched over a glowing phone, typing… (dots over every head, a full typing row in the chat).
//   3.38→      the drop: one bubble per bar (two quick ones first), each sender hops into the spotlight with its prop:
//              3.38 ♋ "did she eat before? she has to eat."   (soup)                        "The *mom* friend."
//              5.04 ♎ "what's she wearing. send fit pic."      (a dress on a hanger)          "The *stylist.*"
//              6.71 ♏ "found his ex's cousin's dog's account." (magnifier + dog link; the stands eye-roll in sync)
//              8.93 ♍ "made a pros/cons doc. it's shared."      (the doc unrolls; rows race to 40 · "40 ROWS")
//             11.16 ♈ "if he's rude I'm fighting him."          (boxing gloves: jab, jab, POW)  "The *bodyguard.*"
//             13.38 ♐ "if it's boring just leave lol"  → ♐ SAG left the chat (zoom!) → ♋ CANCER added SAG back (yank)
//  15.32      card cut (flip).
//  15.60      ♓ "wait. what does he look like?"  "The *real* question."  Everyone starts typing… every dot stops.
//             The music dies. "Seen by *11.*"  Twelve stars stare, side-eye, crickets. Scorpio types (hope!)… "the dog
//             never posts him." (womp).  THE STARS (box, top): "…nobody knows. it's a *blind date.*"  GASP. Libra faints.
//  22.55      The mystery card deals into the spotlight: "Here's what | we *know.*" — funny. / loves maps. / hates
//             cilantro.  "Five words. | *Sold.*"  ♋ "…honestly? I like him already."  ♉ "hates cilantro?? marry him."
//  28.38      ♉ TAURUS renamed the chat: ✨ her WEDDING ✨ (bells, confetti, Pisces wails)  "That *escalated.*"
//  29.90      card cut (deal) → 30.04 ★ LESSON UNLOCKED "Chemistry starts | in conversation, | not the *camera roll.*"
//  34.40      "Card first. | Face *last.*"  The chat slides away, the card rises, veiled. THE STARS: "no photo till you
//             both *align.*" (gone by 37.7)
//  37.78      "Fall for the | *words* first."  A heart-eyed group-photo row under the card. Everything pops out by 40.46;
//             the end card takes over at 40.6.
// One canvas (sky + chat + cast + props + card), DOM type + dialogue boxes + the shared LESSON beat, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { GOLD, BONE, PINK, LAV, INK, MINT, hexA, rig, drawBits, drawGlasses, drawMagnifier, drawGloves, drawPhone, drawSoup, drawDress, drawClipboard,
  drawBell, drawBang, drawSweat, drawTears, drawHearts, drawConfetti, sparkles, glow, typingBubble } from './props.js'
import { buildChat, PANEL, sparkleMark } from './chat.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
const r3 = v => +v.toFixed(3)

// ── the timeline
export const T = {
  black: [0, 0.3],
  panel: 0.06, h0: 0.14, h0Land: BEAT(2), h0Out: [3.12, 3.3], castIn: 0.3,
  m1: BEAT(5), m2: BEAT(8), m3: BEAT(11), m4: BEAT(15), m5: BEAT(19), m6: BEAT(23),
  roll: BEAT(12.5), doc: [BEAT(15.05), BEAT(16.8)], docTag: BEAT(16.8), punch: [BEAT(20), BEAT(20.5), BEAT(21)],
  left: BEAT(24.5), added: BEAT(25.5),
  cut1: 15.32,
  m7: BEAT(27), allType: 15.92, stop0: 16.3, stopGap: 0.1, tape: 16.28,
  seen: 17.12, stare: 17.16, side: [17.46, 17.76], scoType: [17.98, 18.34], m8: BEAT(32), droop: 18.86, crick: [17.24, 19.02],
  lA: 19.5,
  pisBack: 22.05,
  card: 22.55, flip: [22.83, 23.15], w: [BEAT(41), BEAT(42), BEAT(43)], wake: 23.19,
  m9: BEAT(45), m10: BEAT(48), rename: BEAT(50),
  cut2: 29.9,
  lesson: BEAT(53), lessonOut: [34.16, 34.36],
  tie: 34.4, tieMove: [34.4, 34.95], lB: 34.85,
  last: 37.78, hopEnd: [38.1, 38.66, 39.21],
  out: [40.04, 40.46],
}
// headline beats: [text, at, out, opts]
const ROLE = { size: 96, accentSize: 132, top: 196 }
const HEADS = [
  ['The stars have a | group chat. | It’s about *you.*', T.h0, T.h0Out, { size: 84, accentSize: 124, top: 108, late: 1, lateAt: T.h0Land, gap: 0.08, lineHeight: 1.0 }],
  ['The *mom* friend.', T.m1 - 0.04, [T.m2 - 0.24, T.m2 - 0.08], { ...ROLE, accentColor: '#7fd6ff' }],
  ['The *stylist.*', T.m2 - 0.04, [T.m3 - 0.24, T.m3 - 0.08], { ...ROLE, accentColor: '#ff9be9', late: 1, lateAt: T.m2 + 0.1 }],
  ['The *detective.*', T.m3 - 0.04, [T.m4 - 0.24, T.m4 - 0.08], { ...ROLE, accentColor: '#ff6f8e', late: 1, lateAt: T.m3 + 0.1 }],
  ['The *planner.*', T.m4 - 0.04, [T.m5 - 0.24, T.m5 - 0.08], { ...ROLE, accentColor: '#ff8fb8', late: 1, lateAt: T.m4 + 0.1 }],
  ['The *bodyguard.*', T.m5 - 0.04, [T.m6 - 0.24, T.m6 - 0.08], { ...ROLE, accentColor: '#ff8a5c', late: 1, lateAt: T.m5 + 0.1 }],
  ['The *flight risk.*', T.m6 - 0.04, [T.cut1 - 0.2, T.cut1 - 0.04], { ...ROLE, accentColor: '#c9a6ff', late: 2, lateAt: T.m6 + 0.1, lateGap: 0.12 }],
  ['The *real* question.', T.m7 + 0.02, [T.seen - 0.2, T.seen - 0.04], { ...ROLE, size: 86, accentSize: 120, accentColor: '#a9a3ff' }],
  ['Seen by *11.*', T.seen, [T.lA - 0.42, T.lA - 0.26], { ...ROLE, size: 104, accentSize: 144, accentColor: BONE, late: 1, lateAt: T.seen + 0.2 }],
  ['Here’s what | we *know.*', T.card + 0.06, [T.m9 - 0.24, T.m9 - 0.08], { size: 100, accentSize: 140, top: 150, late: 1, lateAt: T.card + 0.4, accentColor: GOLD, lineHeight: 1.0 }],
  ['Five words. | *Sold.*', T.m9 - 0.02, [T.rename - 0.2, T.rename - 0.04], { size: 100, accentSize: 150, top: 150, late: 1, lateAt: T.m9 + 0.36, accentColor: '#ff8fb1', lineHeight: 1.0 }],
  ['That *escalated.*', T.rename + 0.02, [T.cut2 - 0.2, T.cut2 - 0.04], { ...ROLE, size: 98, accentSize: 140, late: 1, lateAt: T.rename + 0.2, accentColor: GOLD }],
  ['Card first. | Face *last.*', T.tie + 0.05, [T.last - 0.22, T.last - 0.06], { late: 1, lateAt: T.tie + 0.45, accentColor: PINK, lineHeight: 1.0 }],
  ['Fall for the | *words* first.', T.last, T.out, { late: 0, accentColor: GOLD, lineHeight: 1.0, gap: 0.09 }],
]

// ── the cast (12 stars in the chat; 8 on screen)
const CK = { can: 'cancer', lib: 'libra', sco: 'scorpio', vir: 'virgo', ari: 'aries', sag: 'sagittarius', pis: 'pisces', tau: 'taurus' }
const NAMES = { can: 'CANCER', lib: 'LIBRA', sco: 'SCORPIO', vir: 'VIRGO', ari: 'ARIES', sag: 'SAG', pis: 'PISCES', tau: 'TAURUS' }
const SEEDS = { can: 3, lib: 7, sco: 11, vir: 13, ari: 17, sag: 19, pis: 23, tau: 29 }
const mixHex = (a, b, k) => { const A1 = parseInt(a.slice(1), 16), B1 = parseInt(b.slice(1), 16); const c = s => Math.round(lerp((A1 >> s) & 255, (B1 >> s) & 255, k)).toString(16).padStart(2, '0'); return '#' + c(16) + c(8) + c(0) }
const CAST = Object.fromEntries(Object.entries(CK).map(([k, id]) => { const s = signStar(id); return [k, { ...s, name: NAMES[k], seed: SEEDS[k], light: mixHex(s.color, '#ffffff', 0.42) }] }))
CAST.ring = SIGNS.map(s => s.color)

// bleacher slots [x, y, size]: two little stands either side of the spotlight
const SLOT = {
  tau: [110, 1338, 124], can: [272, 1392, 142], sco: [118, 1590, 152], ari: [280, 1772, 162],
  pis: [970, 1338, 124], lib: [808, 1392, 142], vir: [962, 1590, 152], sag: [800, 1772, 162],
}
const SPOT = [540, 1626, 292]
// the payoff: the stands shuffle outward so nobody covers the mystery card in the spotlight
const SLOT_C = {
  tau: [108, 1336, 124], can: [228, 1420, 142], sco: [98, 1600, 140], ari: [200, 1790, 150],
  pis: [972, 1336, 124], lib: [852, 1420, 142], vir: [982, 1600, 140], sag: [880, 1790, 150],
}
// the tie-in: everyone flanks the risen card
const SLOT_E = {
  tau: [150, 640, 138], can: [128, 905, 160], sco: [168, 1170, 150], ari: [118, 1420, 150],
  pis: [930, 640, 138], lib: [952, 905, 160], vir: [912, 1170, 150], sag: [962, 1420, 150],
}
// the last line: a group-photo row under the card
const SLOT_F = {
  ari: [104, 1612, 136], sco: [230, 1664, 136], can: [356, 1612, 138], tau: [480, 1664, 138],
  pis: [602, 1612, 138], lib: [726, 1664, 138], vir: [852, 1612, 136], sag: [976, 1664, 136],
}
const ORDER = ['tau', 'pis', 'can', 'lib', 'sco', 'vir', 'ari', 'sag']
const SPOTS = [['can', T.m1], ['lib', T.m2], ['sco', T.m3], ['vir', T.m4], ['ari', T.m5], ['sag', T.m6], ['pis', T.m7]]
const HOP_D = 0.34
function spotWin(k) {
  const i = SPOTS.findIndex(s => s[0] === k)
  if (i < 0) return null
  const a = SPOTS[i][1] - 0.38, b = k === 'pis' ? T.pisBack : SPOTS[i + 1][1] - 0.38
  return [a, b]
}

// ── the chat thread
const ITEMS = [
  { t: T.panel + 0.05, kind: 'hello', who: 'can', text: 'CANCER made this chat', stamp: 'TODAY 7:42 PM' },
  { t: T.m1, kind: 'msg', who: 'can', lines: ['did she eat before?', 'she has to eat.'] },
  { t: T.m2, kind: 'msg', who: 'lib', lines: ['what’s she wearing.', 'send fit pic.'] },
  { t: T.m3, kind: 'msg', who: 'sco', lines: ['found his ex’s cousin’s', 'dog’s account.'], attach: 'dog' },
  { t: T.m4, kind: 'msg', who: 'vir', lines: ['made a pros/cons doc.', 'it’s shared.'], attach: 'doc' },
  { t: T.m5, kind: 'msg', who: 'ari', lines: ['if he’s rude', 'I’m fighting him.'] },
  { t: T.m6, kind: 'msg', who: 'sag', lines: ['if it’s boring', 'just leave lol'] },
  { t: T.left, kind: 'sys', who: 'sag', text: 'SAG left the chat' },
  { t: T.added, kind: 'sys', who: 'can', text: 'CANCER added SAG back' },
  { t: T.m7, kind: 'msg', who: 'pis', lines: ['wait. what does', 'he look like?'] },
  { t: T.seen, kind: 'seen', text: 'Seen by 11' },
  { t: T.m8, kind: 'msg', who: 'sco', lines: ['the dog never', 'posts him.'] },
  { t: T.m9, kind: 'msg', who: 'can', lines: ['…honestly?', 'I like him already.'] },
  { t: T.m10, kind: 'msg', who: 'tau', lines: ['hates cilantro??', 'marry him.'] },
  { t: T.rename, kind: 'sys', who: 'tau', text: 'TAURUS renamed the chat' },
]
// who is typing when (the chat's typing row + the dots over their heads)
const TYPERS = ['can', 'lib', 'sco', 'vir', 'ari', 'sag', 'tau']
const TYPING = [
  ...['can', 'lib', 'sco', 'vir', 'ari', 'sag', 'tau', 'pis'].map((k, i) => ({ who: k, a: 0.55 + i * 0.11, b: 3.22 + (i % 3) * 0.04 })),
  ...SPOTS.slice(1).map(([k, m]) => ({ who: k, a: m - 1.05, b: m - 0.42 })),
  ...TYPERS.map((k, i) => ({ who: k, a: T.allType + i * 0.05, b: T.stop0 + [3, 0, 5, 1, 6, 2, 4][i] * T.stopGap })),
  { who: 'sco', a: T.scoType[0], b: T.scoType[1] },
  { who: 'can', a: T.m9 - 0.95, b: T.m9 - 0.12 }, { who: 'tau', a: T.m10 - 0.95, b: T.m10 - 0.12 },
]
const typingOf = (k, t) => { let v = 0; for (const s of TYPING) if (s.who === k) v = Math.max(v, easeOutBack(prog(t, s.a, s.a + 0.26), 2.2) * (1 - ease.inQuad(prog(t, s.b, s.b + 0.2)))); return v }
const TYPE_ROW = TYPING.filter(s => s.who !== 'pis' || s.b < 4)

// ── the dialogue (THE STARS, in the RPG box)
const STARS = 'THE STARS'
const L_A = [{ t: T.lA, speaker: STARS, text: '…nobody knows. it’s a *blind date.*' }]
const L_B = [{ t: T.lB, speaker: STARS, text: 'no photo till you both *align.*' }]
const CPS = 28
const LTA = lineTimes(L_A, { cps: CPS }), LTB = lineTimes(L_B, { cps: CPS })
const charAt = (LT, L, word) => { const s = L.text.replace(/\*/g, ''); return LT.chars[Math.max(0, s.indexOf(word))] }
T.gasp = r3(charAt(LTA[0], L_A[0], 'date') + 0.12)
T.faint = r3(T.gasp + 0.32)
T.closeA = r3(LTA[0].done + 1.62)
T.closeB = r3(LTB[0].done + 1.6)

// ── the lesson
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Chemistry starts | in conversation, | not the *camera roll.*', chip: '+1 MYSTERY', accentColor: GOLD, dim: 0.8, accentSize: 128 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b

// hop schedules
const HOPS = {}
for (const k of ORDER) {
  const st = (SEEDS[k] % 5) * 0.035
  const h = [T.castIn + 0.3 + st, T.gasp + 0.02 + st * 0.4, T.rename + 0.03 + st, T.rename + 0.59 + st, T.lesson + 1.2 + st, ...T.hopEnd.map(v => v + st * 0.5)]
  const sp = SPOTS.find(s => s[0] === k)
  if (sp) h.push(sp[1] + 0.02, sp[1] + 0.6)
  if (k === 'sco') h.push(T.m8 + 0.02)
  if (k === 'can') h.push(T.m9 + 0.02, T.m9 + 0.62)
  if (k === 'tau') h.push(T.m10 + 0.02, T.m10 + 0.5, T.m10 + 0.98)
  if (k === 'lib') h.push(T.wake + 0.05)
  if (k === 'sag') h.push(T.added + 0.3)
  HOPS[k] = h
}

/** where star k is at t → { x, y, s, rot, alpha, spot } (null = hidden) */
function placeOf(k, t) {
  let [x, y, s] = SLOT[k]
  let rot = 0, spot = 0
  // the card deals in: the stands shuffle outward a little
  const C0 = SLOT_C[k]
  if (t >= T.card - 0.1) {
    const st = (SEEDS[k] % 4) * 0.04, p = prog(t, T.card - 0.1 + st, T.card + 0.3 + st), e = ease.inOutCubic(p)
    x = lerp(x, C0[0], e); y = lerp(y, C0[1], e) - Math.sin(Math.PI * p) * 40; s = lerp(s, C0[2], e)
  }
  // the tie-in: everyone hops over to flank the risen card
  if (t >= T.tieMove[0]) {
    const st = (SEEDS[k] % 4) * 0.05, p = prog(t, T.tieMove[0] + st, T.tieMove[0] + st + 0.42), e = ease.inOutCubic(p)
    const E = SLOT_E[k]
    let px = lerp(C0[0], E[0], e), py = lerp(C0[1], E[1], e) - Math.sin(Math.PI * p) * 140, ps = lerp(C0[2], E[2], e)
    if (t >= T.last - 0.05) {
      const F = SLOT_F[k], st2 = (SEEDS[k] % 4) * 0.04, q = prog(t, T.last - 0.05 + st2, T.last + 0.37 + st2), f = ease.inOutCubic(q)
      px = lerp(px, F[0], f); py = lerp(py, F[1], f) - Math.sin(Math.PI * q) * 120; ps = lerp(ps, F[2], f)
    }
    return { x: px, y: py, s: ps, rot: 0, spot: 0 }
  }
  // spotlight turns: hop from the slot into the spotlight and back
  const w = spotWin(k)
  if (w && t >= w[0] && t < w[1] + HOP_D) {
    const pin = prog(t, w[0], w[0] + HOP_D), pout = prog(t, w[1], w[1] + HOP_D)
    const p = pin * (1 - pout), e = ease.inOutCubic(p)
    const arc = Math.sin(Math.PI * (pout > 0 ? pout : pin)) * 130
    x = lerp(x, SPOT[0], e); y = lerp(y, SPOT[1], e) - arc; s = lerp(s, SPOT[2], e); spot = e
  }
  // Sag leaves the chat (zoom out of frame) and gets added back (yanked in)
  if (k === 'sag' && t >= T.left && t < T.added + 0.5) {
    const go = ease.inCubic(prog(t, T.left + 0.05, T.left + 0.3)), back = prog(t, T.added + 0.02, T.added + 0.36)
    const ex = lerp(SPOT[0], 1500, go)
    x = back > 0 ? lerp(1500, SPOT[0], easeOutBack(back, 1.4)) : ex
    rot = back > 0 ? (1 - back) * -0.5 : go * 0.35
  }
  // Libra faints at the gasp (tips over and drops), wakes up when the card lands
  if (k === 'lib' && t >= T.faint && t < T.wake + 0.4) {
    const f = ease.inCubic(prog(t, T.faint, T.faint + 0.32)), u = easeOutBack(prog(t, T.wake, T.wake + 0.36), 2)
    rot = (f * (1 - u)) * Math.PI / 2
    y += (f * (1 - u)) * s * 0.18
  }
  return { x, y, s, rot, spot }
}

/** mood etc. of star k at t */
function stateOf(k, t, P) {
  let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, rot = 0
  const spotK = SPOTS.find(s => s[0] === k)
  const win = spotWin(k), inSpot = win && t >= win[0] && t < win[1]
  const toward = (tx, ty) => [Math.abs(tx - P.x) > 60 ? Math.sign(tx - P.x) : 0, Math.abs(ty - P.y) > 120 ? Math.sign(ty - P.y) : 0]
  const atSpot = toward(SPOT[0], SPOT[1] - 40)
  if (k === 'pis') tears = 0.9
  if (t < T.m1 - 0.4) {                                              // the hook: everyone typing, looking at their phones
    mood = 'squint'; look = [0, 1]
    if (typingOf(k, t) < 0.5 && t > 0.6) { mood = 'neutral' }
    if (t > T.h0Land && t < T.h0Land + 0.7 && (SEEDS[k] % 3 === 0)) { mood = 'wide'; look = [0, -1] }
  } else if (t < T.m7 - 0.4) {                                        // the messages
    look = atSpot; mood = 'neutral'
    if (typingOf(k, t) > 0.5) { mood = 'squint'; look = [0, 1] }
    // reactions per message
    if (inR(t, T.m1 + 0.3, T.m2 - 0.4) && k === 'tau') { mood = 'happy' }
    if (inR(t, T.m2 + 0.2, T.m3 - 0.4)) mood = k === 'tau' || k === 'can' ? 'happy' : mood
    if (inR(t, T.roll, T.roll + 0.95) && k !== 'sco') { const e = Math.sin(Math.PI * prog(t, T.roll, T.roll + 0.95)); mood = 'eyeroll'; rot = -0.2 * e; squash += 0.07 * e }
    if (inR(t, T.roll + 0.95, T.m4 - 0.4) && k !== 'sco') { mood = 'squint'; look = atSpot }
    if (inR(t, T.doc[0], T.doc[1] + 0.6) && k !== 'vir') { mood = 'wide'; look = [Math.sign(SPOT[0] - 120 - P.x) || 0, 1] }
    for (const [i, pt] of T.punch.entries()) { const d = t - pt; if (d >= 0 && d < 0.32 && k !== 'ari') { mood = 'wide'; squash -= (i === 2 ? 0.16 : 0.09) * Math.sin(Math.PI * d / 0.32); dx += Math.sign(P.x - SPOT[0]) * (i === 2 ? 26 : 12) * Math.sin(Math.PI * d / 0.32) } }
    if (inR(t, T.punch[2] + 0.32, T.m6 - 0.4) && k !== 'ari') { mood = 'neutral'; look = atSpot }
    if (inR(t, T.left + 0.1, T.added) && k !== 'sag') { mood = 'wide'; look = [1, 0] }
    if (inR(t, T.added, T.added + 0.9) && k === 'can') { mood = 'squint'; look = [1, 1] }
    if (inR(t, T.added + 0.3, T.m7 - 0.4) && k !== 'can' && k !== 'sag') { mood = 'happy' }
  } else if (t < T.lA) {                                               // Pisces asks… silence
    look = atSpot
    if (t >= T.allType && typingOf(k, t) > 0.4) { mood = 'squint'; look = [0, 1] }
    else if (t >= T.allType) { mood = 'neutral'; look = [0, 0]; blink = false }
    if (t >= T.stare) { mood = 'neutral'; look = [0, 0]; blink = false }
    if (inR(t, T.side[0], T.side[1])) look = [-1, 0]
    if (inR(t, T.side[1], T.scoType[0])) look = [1, 0]
    if (t >= T.scoType[0] && t < T.droop && k !== 'sco') { mood = 'wide'; look = toward(SLOT.sco[0], SLOT.sco[1]); blink = undefined }
    if (t >= T.droop) { mood = 'sleepy'; squash = 0.12 * prog(t, T.droop, T.droop + 0.3); look = [0, 1]; blink = undefined }
    if (t >= T.droop + 0.9) { mood = 'neutral'; look = [0, -1]; squash = 0.06 }
  } else if (t < T.card) {                                             // the reveal
    look = [0, -1]; mood = 'neutral'
    if (t >= T.gasp) { mood = 'wide'; look = [0, 0]; blink = false; squash -= 0.18 * Math.exp(-(t - T.gasp) * 5) * Math.cos((t - T.gasp) * 20) }
    if (k === 'pis' && t >= T.gasp) tears = 1.3
  } else if (t < T.lesson) {                                           // the card
    const cardP = [SPOT[0], SPOT[1] + 40]
    look = toward(...cardP); mood = 'squint'
    dx = Math.sign(SPOT[0] - P.x) * 14 * ease.inOutQuad(prog(t, T.card + 0.4, T.card + 0.9))
    if (t >= T.w[0]) mood = 'neutral'
    if (k === 'sag' && t >= T.w[1]) mood = 'happy'
    if (k === 'tau' && t >= T.w[2]) { mood = 'wide'; look = [0, 0] }
    if (k === 'can' && t >= T.m9 - 0.95) { mood = 'squint'; look = [0, 1] }
    if (k === 'can' && t >= T.m9) mood = 'heart'
    if (k === 'tau' && t >= T.m10 - 0.95) { mood = 'squint'; look = [0, 1] }
    if (k === 'tau' && t >= T.m10) mood = 'heart'
    if (t >= T.m9 + 0.5 && k !== 'can' && k !== 'tau') mood = 'happy'
    if (t >= T.rename) { mood = 'heart'; look = [0, 0] }
    if (k === 'pis') tears = t >= T.rename ? 1.6 : 0.7
  } else if (t < T.tie) {                                              // the lesson
    mood = 'sparkle'; look = [0, -1]
    if (k === 'pis') tears = 1.2
  } else {                                                              // card first, face last
    look = toward(540, 980); mood = 'heart'
    if (t >= T.last) { mood = t >= T.hopEnd[0] ? 'heart' : 'happy'; look = [0, 0] }
    if (k === 'pis') tears = 0.9
  }
  // the spotlight speaker
  if (inSpot && spotK) {
    look = [0, 0]
    const m = spotK[1]
    if (k === 'can') mood = t < m + 0.9 ? 'wide' : 'happy'
    if (k === 'lib') mood = 'heart'
    if (k === 'sco') { mood = 'squint'; look = [0, 0] }
    if (k === 'vir') mood = t < T.doc[0] ? 'neutral' : 'happy'
    if (k === 'ari') mood = 'squint'
    if (k === 'sag') { mood = t < T.left ? (t < m + 0.6 ? 'happy' : 'wink') : 'wide' }
    if (k === 'pis') {
      mood = t < T.seen ? 'sparkle' : 'neutral'
      if (t >= T.stare) { look = [0, 0]; blink = false }
      if (inR(t, T.side[0], T.side[1])) look = [-1, 0]
      if (inR(t, T.side[1], T.scoType[0])) look = [1, 0]
      if (t >= T.scoType[0] && t < T.droop) { mood = 'wide'; look = [-1, 0] }
      if (t >= T.droop) { mood = 'neutral'; look = [0, 1] }
      if (t >= T.lA - 0.2) { mood = 'neutral'; look = [0, -1] }
      if (t >= T.gasp) { mood = 'wide'; look = [0, 0] }
      tears = t >= T.gasp ? 1.7 : t >= T.stare && t < T.gasp ? 0.35 : 1.15
    }
  }
  if (k === 'lib' && t >= T.faint && t < T.wake) { mood = 'neutral'; blink = 1 }
  if (k === 'lib' && t >= T.wake && t < T.wake + 1.2) { mood = 'heart' }
  return { mood, look, blink, squash, dx, dy, tears, rot }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "700 44px Inter", "700 28px Inter", "600 22px Inter", "italic 500 150px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "italic 600 40px 'EB Garamond'",
      "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 25px 'Space Mono'", "700 21px 'Space Mono'", "24px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 560), BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (headlines), the RPG boxes, the lesson; grain + the black fade on top
  const heads = HEADS.map(([text, at, out, o]) => [popText(root, text, { top: 168, size: 112, accentSize: 156, at, wobble: true, ...o }), out])
  const boxA = dialogueBox(root, { lines: L_A, y: 150, width: 640, height: 236, size: 48, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: L_B, y: 1556, width: 960, height: 268, close: T.closeB, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the chat (measured now that the fonts are in)
  const chat = buildChat(x, {
    cast: CAST, items: ITEMS, typing: TYPE_ROW, renameAt: T.rename,
    avatar: (who, t) => {
      if (inR(t, T.roll, T.roll + 0.95) && who !== 'sco') return { mood: 'eyeroll' }
      if (inR(t, T.stare, T.lA) ) return { mood: 'neutral', look: inR(t, T.side[0], T.side[1]) ? [-1, 0] : inR(t, T.side[1], T.side[1] + 0.4) ? [1, 0] : [0, 0], blink: false }
      if (t >= T.gasp && t < T.card) return { mood: 'wide', blink: false }
      if (t >= T.rename) return { mood: 'heart' }
      if (who === 'can' && t >= T.m9) return { mood: 'heart' }
      if (who === 'tau' && t >= T.m10) return { mood: 'heart' }
      return { mood: 'neutral' }
    },
  })

  // ── camera (scene canvas only): a slow push into the silence, a punch on the gasp, a shake on the POW
  function cam(t) {
    let s = 1, cx = 540, cy = 1120, sx = 0, sy = 0
    if (t >= T.seen && t < T.gasp) s = 1 + 0.05 * ease.inOutQuad(prog(t, T.seen, T.lA))
    if (t >= T.gasp && t < T.card) s = lerp(1.05, 1.0, ease.outCubic(prog(t, T.gasp, T.gasp + 0.5))) + 0.06 * pulse(t, T.gasp, 0.24)
    for (const [i, pt] of T.punch.entries()) { const d = t - pt; if (d >= 0 && d < 0.25) { const a = (i === 2 ? 14 : 6) * (1 - d / 0.25); sx += Math.sin(d * 90) * a; sy += Math.cos(d * 70) * a * 0.6 } }
    const r = t - T.rename; if (r >= 0 && r < 0.4) { sy += Math.sin(r * 60) * 8 * (1 - r / 0.4) }
    return { s, cx, cy, sx, sy }
  }

  // ── the spotlight: a soft glow in the speaker's colour
  function spotlight(t) {
    if (t >= T.card - 0.2) return
    let col = null, a = 0
    for (const [k, m] of SPOTS) { const w = spotWin(k); const v = clamp(prog(t, w[0] + 0.1, w[0] + 0.35)) * (1 - prog(t, w[1], w[1] + 0.25)); if (v > a) { a = v; col = CAST[k].color } }
    if (!col) return
    glow(x, SPOT[0], SPOT[1] + 10, 300, col, 0.55 * a)
    x.save(); x.globalAlpha = 0.22 * a; x.fillStyle = col; x.beginPath(); x.ellipse(SPOT[0], SPOT[1] + 150, 170, 26, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }

  /** Virgo's clipboard: at the left arm in the stands, held out front in the spotlight */
  const clipAt = (R, spot) => { const [a, b] = R.at(0.5, 19), [c, d] = R.at(18, 27.5); return [lerp(a, c, spot), lerp(b, d, spot)] }

  // ── one star + its props
  function drawActor(k, t, ok) {
    const P = placeOf(k, t)
    if (!P) return null
    const C = CAST[k]
    const st = stateOf(k, t, P)
    const pk = ok * pop01(t, T.castIn + (SEEDS[k] % 7) * 0.06, 0.42, 1.8)
    if (pk <= 0.02) return null
    const opts = { color: C.color, glyph: P.s >= 120 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: k === 'pis' ? 0.75 : 0.95, bob: P.s * 0.035, zzz: false }
    const X = P.x + st.dx, Y = P.y + st.dy
    x.save()
    const rotA = P.rot + st.rot
    if (rotA) { x.translate(X, Y); x.rotate(rotA); x.translate(-X, -Y) }
    // speed lines behind Sag as it zooms off / gets yanked back
    if (k === 'sag' && inR(t, T.left + 0.05, T.added + 0.4)) {
      const a = Math.max(pulse(t, T.left + 0.05, 0.35), pulse(t, T.added, 0.4))
      x.save(); x.globalAlpha = a
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? hexA(LAV, 0.8) : hexA(BONE, 0.7); x.fillRect(X - 360 - i * 30, Y - 90 + i * 34, 300 - i * 20, 8) }
      x.restore()
    }
    const R = rig(X, Y, P.s, t, { hops: HOPS[k], squash: st.squash, seed: C.seed, pop: pk, bob: opts.bob })
    const spot = P.spot
    // things held behind the body
    const r = drawStarChar(x, X, Y, P.s, t, opts)
    if (k === 'lib' && spot > 0.05) { const [hx, hy] = R.at(-6.5, 11.5); drawDress(x, hx, hy, R.cell * 1.12, t, { k: spot, swing: 1 }) }
    // glasses (the aunties)
    if (k === 'can' || k === 'tau') drawGlasses(x, R, { frame: k === 'can' ? '#7a1f3d' : '#5a3a12', down: (st.mood === 'squint' ? 0.6 : 0) })
    // phones while typing in the hook / the all-typing beat
    const ty = typingOf(k, t)
    if (ty > 0.02 && (t < T.m1 - 0.3 || inR(t, T.allType, T.scoType[1] + 0.2))) drawPhone(x, R, { k: ty, t })
    // per-star props
    if (k === 'can' && spot > 0.05) { const [bx, by] = R.at(38.5, 21); drawSoup(x, bx, by, R.cell * 1.18, t, { k: spot }) }
    if (k === 'sco' && t >= T.m3 - 0.38) drawMagnifier(x, R, t, { k: pop01(t, T.m3 - 0.2, 0.34, 2.2), look: spot > 0.5 ? [0, 0] : st.look })
    if (k === 'vir' && t >= T.m4 - 0.38) { const [cx2, cy2] = clipAt(R, spot); drawClipboard(x, cx2, cy2, R.cell * lerp(0.95, 1.15, spot), { k: pop01(t, T.m4 - 0.2, 0.34, 2.2), rot: lerp(-0.14, 0.04, spot) }) }
    if (k === 'ari' && t >= T.m5 - 0.38) drawGloves(x, R, t, T.punch.map((p, i) => ({ t: p, side: i % 2 ? -1 : 1 })).filter(() => spot > 0.5), { k: pop01(t, T.m5 - 0.2, 0.34, 2.2), guard: spot > 0.5 ? 1 : 0 })
    // tears (Pisces, always)
    if (st.tears > 0) {
      const [lx, ly] = R.at(13.4, 21), [rx2, ry] = R.at(22.6, 21)
      drawTears(x, [[lx, ly], [rx2, ry]], t, { cell: Math.max(5, R.cell * 1.15), strength: st.tears })
    }
    x.restore()
    // things above the head: typing dots, the gasp's "!", sweat in the silence, hearts
    const top = r.top
    if (ty > 0.02 && !(spot > 0.5)) typingBubble(x, t, X + P.s * 0.28, top + 6, ty * clamp(P.s / 150, 0.75, 1.1), { col: C.color, P: 4 })
    if (t >= T.gasp && t < T.card - 0.1) { const b = pop01(t, T.gasp + (SEEDS[k] % 5) * 0.03, 0.26, 2.6) * (1 - prog(t, T.card - 0.4, T.card - 0.1)); if (b > 0.02) drawBang(x, X + (SEEDS[k] % 2 ? -1 : 1) * P.s * 0.12, top - 34 * b, Math.max(5, P.s / 22) * b, { rot: (SEEDS[k] % 2 ? -0.2 : 0.2) }) }
    if (inR(t, T.stare + 0.2, T.scoType[0])) drawSweat(x, X + P.s * 0.34, Y - P.s * 0.12 + ((t * 40) % 30), Math.max(3, P.s / 34), 0.9)
    if (k === 'can' && inR(t, T.m9, T.m9 + 1.6)) drawHearts(x, t, T.m9, X, top, { cell: 5, seed: 3 })
    if (k === 'tau' && inR(t, T.m10, T.m10 + 1.6)) drawHearts(x, t, T.m10, X, top, { cell: 5, seed: 5 })
    return { ...r, P }
  }

  // ── Virgo's doc: the paper unrolls from the clipboard off the bottom of the frame; the rows race up to 40
  function docScroll(t) {
    if (t < T.doc[0] || t > T.m5) return
    const P = placeOf('vir', t)
    const kp = 1 - ease.inQuad(prog(t, T.m5 - 0.5, T.m5 - 0.36))
    if (P.spot > 0.5 && kp > 0) {
      const R = rig(P.x, P.y, P.s, t, { hops: HOPS.vir, seed: CAST.vir.seed, bob: P.s * 0.035 })
      const [cx, cy0] = clipAt(R, P.spot), cy = cy0 + 6.2 * R.cell * 1.15
      const len = ease.outQuad(prog(t, T.doc[0], T.doc[0] + 0.5)) * (1960 - cy)
      const w = 176, rowH = 36, vis = 1920 - cy
      const scroll = ease.inOutQuad(prog(t, T.doc[0] + 0.3, T.doc[1])) * Math.max(0, 40 * rowH + 18 - vis)
      x.save(); x.globalAlpha = kp
      x.fillStyle = INK; x.fillRect(cx - w / 2 - 5, cy, w + 10, len)
      x.fillStyle = '#fffaf0'; x.fillRect(cx - w / 2, cy, w, len)
      x.beginPath(); x.rect(cx - w / 2, cy, w, len); x.clip()
      x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      for (let n = 1; n <= 40; n++) {
        const ry = cy + n * rowH - 14 - scroll
        if (ry < cy - rowH || ry > cy + len + rowH) continue
        x.fillStyle = n === 40 ? '#ef5c94' : '#7a8296'; x.fillText(String(n).padStart(2, '0'), cx - w / 2 + 10, ry)
        x.fillStyle = '#c9cfdc'; x.fillRect(cx - w / 2 + 50, ry - 3, 46 + ((n * 37) % 44), 7)
        x.fillStyle = n % 3 === 0 ? '#ef5c94' : '#3fae74'; x.fillRect(cx + w / 2 - 26, ry - 7, 14, 14)
      }
      x.restore()
    }
    // the row counter tag, pinned beside the spotlight; it stays up until Aries pings
    const tg = pop01(t, T.docTag, 0.3, 2.6) * (1 - ease.inQuad(prog(t, T.m5 - 0.2, T.m5 - 0.04)))
    if (tg > 0.02) {
      x.save(); x.translate(SPOT[0] + 205, SPOT[1] + 92); x.scale(tg, tg); x.rotate(-0.08)
      x.font = `700 36px ${MONO}`; const tw = x.measureText('40 ROWS').width + 38
      x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -33, tw + 12, 66)
      x.fillStyle = GOLD; x.fillRect(-tw / 2, -27, tw, 54)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('40 ROWS', 0, 2)
      x.restore()
    }
  }

  // ── Aries' POW
  function pow(t) {
    const d = t - T.punch[2]
    if (d < 0 || d > 0.5) return
    const k = easeOutBack(prog(d, 0, 0.16), 2.4) * (1 - ease.inQuad(prog(d, 0.3, 0.5)))
    x.save(); x.translate(SPOT[0] - 10, SPOT[1] - 250); x.scale(k, k); x.rotate(-0.12)
    x.fillStyle = INK; x.beginPath()
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? 70 : 128; x.lineTo(Math.cos(a) * rr * 1.25, Math.sin(a) * rr * 0.8) }
    x.closePath(); x.fill()
    x.fillStyle = '#ffd24a'; x.beginPath()
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? 58 : 112; x.lineTo(Math.cos(a) * rr * 1.25, Math.sin(a) * rr * 0.8) }
    x.closePath(); x.fill()
    x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8382c'; x.fillText('POW', 0, 4)
    x.restore()
  }

  // ── crickets in the silence
  function crickets(t) {
    for (const [i, c] of T.crick.entries()) {
      const d = t - c
      if (d < 0 || d > 1.1) continue
      x.save(); x.globalAlpha = Math.min(1, d / 0.1) * (1 - prog(d, 0.8, 1.1))
      x.font = `700 40px ${MONO}`; x.fillStyle = hexA(BONE, 0.85); x.textAlign = i ? 'left' : 'right'
      x.fillText('*chirp*', i ? 92 : 990, 1258 - d * 26)
      x.restore()
    }
  }

  // ── the mystery card
  const CARD = { x: 540, y: 1572, w: 404 }
  function cardPos(t) {
    if (t < T.card) return null
    const din = prog(t, T.card, T.flip[0])
    let cx = lerp(820, CARD.x, ease.outCubic(din)), cy = lerp(-300, CARD.y, ease.outCubic(din)), w = CARD.w, rot = (1 - ease.outCubic(din)) * 1.4
    if (t >= T.tieMove[0]) { const e = ease.inOutCubic(prog(t, T.tieMove[0], T.tieMove[1])); cx = lerp(CARD.x, 540, e); cy = lerp(CARD.y, 990, e); w = lerp(CARD.w, 520, e) }
    const out = popOut(t, T.out)
    return { cx, cy, w: w * out, rot }
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardFace(w, t) {
    const h = w * 1.5, X = -w / 2, Y = -h / 2, u = w / 400
    // body + iridescent rim
    x.save(); x.shadowColor = 'rgba(255,111,181,0.55)'; x.shadowBlur = 50 * u
    rr(X, Y, w, h, 30 * u); x.fillStyle = '#150c2c'; x.fill(); x.restore()
    const gr = x.createLinearGradient(X, Y, X + w, Y + h); gr.addColorStop(0, '#ff6fb5'); gr.addColorStop(0.5, '#b46cff'); gr.addColorStop(1, '#7fd0f0')
    x.lineWidth = 6 * u; x.strokeStyle = gr; rr(X, Y, w, h, 30 * u); x.stroke()
    // header
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `italic 500 ${Math.round(40 * u)}px ${SERIF}`; x.fillStyle = BONE; x.fillText('Mystery card', X + 26 * u, Y + 60 * u)
    const cx2 = X + w - 46 * u, cy2 = Y + 46 * u, pulse2 = 0.65 + 0.35 * Math.sin(t * 5)
    x.save(); x.shadowColor = '#b46cff'; x.shadowBlur = (16 + 18 * pulse2) * u; x.beginPath(); x.arc(cx2, cy2, 22 * u, 0, Math.PI * 2); x.fillStyle = '#b46cff'; x.fill(); x.restore()
    x.font = `800 ${Math.round(28 * u)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'; x.fillText('?', cx2, cy2 + 1 * u)
    // veiled photo: an aura with a blurred silhouette and a big "?"
    const ax = X + 22 * u, ay = Y + 90 * u, aw = w - 44 * u, ah = 236 * u
    x.save(); rr(ax, ay, aw, ah, 18 * u); x.clip()
    const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
    g.addColorStop(0, '#ff6fb5'); g.addColorStop(0.45, '#b46cff'); g.addColorStop(1, '#2a1a6e')
    x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
    x.fillStyle = 'rgba(26,14,48,0.4)'; x.filter = `blur(${Math.round(12 * u)}px)`
    x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.16, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.04, aw * 0.36, ah * 0.4, 0, 0, Math.PI * 2); x.fill()
    x.filter = 'none'
    const vs = ((t * 0.5) % 1.4) - 0.2
    const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
    x.font = `800 ${Math.round(120 * u)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = hexA(BONE, 0.85); x.fillText('?', ax + aw / 2, ay + ah * 0.47)
    x.font = `700 ${Math.round(15 * u)}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = hexA(BONE, 0.8); x.fillText('NO PHOTO YET', ax + 14 * u, ay + ah - 14 * u)
    x.restore()
    // the words (only words)
    const lines = ['“funny.', 'loves maps.', 'hates cilantro.”']
    lines.forEach((l, i) => {
      const p = prog(t, T.w[i], T.w[i] + 0.34)
      if (p <= 0) return
      const k = easeOutBack(p, 2.6)
      const ly = ay + ah + (62 + i * 58) * u
      x.save(); x.translate(X + 30 * u, ly); x.scale(k, k); x.globalAlpha *= clamp(p * 3)
      x.font = `italic 500 ${Math.round(48 * u)}px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = i === 2 ? '#ffd98a' : BONE
      x.fillText(l, 0, 0)
      x.restore()
    })
    // footer
    x.fillStyle = hexA(BONE, 0.14); x.fillRect(X + 26 * u, Y + h - 62 * u, w - 52 * u, 2 * u)
    x.font = `700 ${Math.round(15 * u)}px ${MONO}`; x.textAlign = 'left'; x.fillStyle = hexA(BONE, 0.55); x.fillText('№ 027/∞', X + 26 * u, Y + h - 30 * u)
    x.textAlign = 'right'; x.fillText('MYSTERY CARD', X + w - 26 * u, Y + h - 30 * u)
  }
  function drawCard(t) {
    const C = cardPos(t)
    if (!C || C.w <= 2) return
    const f = prog(t, T.flip[0], T.flip[1]), sx = Math.cos(f * Math.PI)
    // halo
    const halo = clamp(prog(t, T.flip[1], T.flip[1] + 0.4))
    if (halo > 0) glow(x, C.cx, C.cy, C.w * 1.15, '#b46cff', 0.45 * halo)
    x.save(); x.translate(C.cx, C.cy); x.rotate(C.rot * (1 - f))
    if (sx > 0) {
      x.scale(sx, 1)
      if (BACK) { const bw = C.w / BACK_BODY, bh = bw * BACK.height / BACK.width; x.drawImage(BACK, -bw / 2, -bh / 2, bw, bh) }
    } else {
      x.scale(-sx, 1)
      cardFace(C.w, t)
    }
    x.restore()
    if (f > 0.4 && f < 1) sparkles(x, t, C.cx, C.cy, T.flip[0] + 0.15, { n: 12, R: 300, size: 30, seed: 2 })
    for (let i = 0; i < 3; i++) sparkles(x, t, C.cx - C.w * 0.2, C.cy + C.w * (0.42 + i * 0.145), T.w[i], { n: 6, R: 90, size: 22, seed: i, dur: 0.5 })
  }

  // ── the wedding bells + confetti at the rename
  function wedding(t) {
    if (t < T.rename || t > T.cut2 + 0.1) return
    const k = pop01(t, T.rename + 0.05, 0.36, 2.4) * (1 - prog(t, T.cut2 - 0.2, T.cut2))
    if (k <= 0.02) return
    for (const side of [-1, 1]) {
      const sw = Math.sin((t - T.rename) * 7 + (side > 0 ? 1.2 : 0)) * 0.35 * Math.exp(-(t - T.rename) * 0.6)
      drawBell(x, 540 + side * 420, PANEL.y - 44 - 20 * (1 - k), 9 * k, sw * side)
    }
    drawConfetti(x, t, T.rename + 0.05, { y0: PANEL.y + 40, fall: 1600, n: 80, seed: 9 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * (inR(t, T.tape, T.gasp) ? 0.72 : 1) })
      if (t < T.out[1] + 0.02) {
        const C = cam(t)
        x.save(); x.translate(C.cx + C.sx, C.cy + C.sy); x.scale(C.s, C.s); x.translate(-C.cx, -C.cy)
        // the chat: pops up first, slides away for the tie-in
        const ck = pop01(t, T.panel, 0.42, 1.6)
        const cOut = prog(t, T.tieMove[0], T.tieMove[0] + 0.45)
        const lk = clamp(prog(t, T.lesson, T.lesson + 0.4))
        chat.draw(t, { pk: ck, dy: -ease.inCubic(cOut) * 900, alpha: (1 - ease.inQuad(cOut)) * (1 - 0.75 * lk) })
        wedding(t)
        spotlight(t)
        const ok = popOut(t, T.out)
        // stars: the bleachers (back to front), the spotlight speaker last
        const order = [...ORDER].sort((a, b) => (placeOf(a, t).spot || 0) - (placeOf(b, t).spot || 0))
        if (t < T.tie) drawCard(t)
        for (const k of order) drawActor(k, t, ok)
        if (t >= T.tie) drawCard(t)
        docScroll(t)
        pow(t)
        crickets(t)
        sparkles(x, t, 540, 330, T.h0Land, { n: 10, R: 260, size: 30, seed: 1 })
        x.restore()
      }
      for (const [h, o] of heads) h.update(t, outK(t, o))
      boxA.update(t); boxB.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.3 (hook → the first message), 15.32 (the six types → Pisces' question, flip), 22.45 (the
// reveal → the card), 29.9 (the wedding → LESSON, deal), 34.38 (lesson → card first). Default selection: 15.32 + 29.9.
export const CUTS = [3.3, { t: T.cut1, kind: 'flip' }, 22.45, { t: T.cut2, kind: 'deal' }, 34.38]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into D by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const headCue = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ...(land ? [['pop', r3(land), 1174.66, 0.045, 0], ['pluck', r3(land), 1174.66, 0.035, 0.6, 0]] : [])]
// a message "ding": two bright notes
const ding = (t0, i = 0, pan = 0) => [['pop', r3(t0), [1174.66, 1318.51, 987.77, 1174.66, 1318.51, 1479.98, 987.77][i % 7], 0.05, pan], ['bell', r3(t0 + 0.012), 1760, 0.024, 0.55, pan]]
// phone typing: soft clicky ticks
const clicks = (a, b, gain = 0.01, seed = 1) => { const out = []; let t = a, s = seed; while (t < b) { out.push(['tick', r3(t), gain * (0.7 + 0.3 * ((s * 7) % 3) / 2)]); s++; t += 0.055 + ((s * 13) % 7) * 0.012 } return out }
const chirp = (t0, gain = 0.016, pan = 0.4) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', r3(t0 + d), 4186, gain, pan])
const womp = t0 => [['pluck', r3(t0), 220, 0.07, 0.32, 0], ['pluck', r3(t0 + 0.3), 207.65, 0.075, 0.9, 0]]
const boing = (t0, up = true) => [0, 1, 2, 3].map(i => ['pop', r3(t0 + i * 0.045), up ? [392, 523.25, 659.25, 880][i] : [880, 659.25, 523.25, 392][i], 0.03, 0.3])
const roll = (a, b, gain = 0.03) => { const n = Math.round((b - a) / 0.03); return Array.from({ length: n }, (_, i) => ['tick', r3(a + i * 0.03), 0.01 + gain * (i / n)]) }
/** real silence in the score: a tape stop at t0, then more chained over its own silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', r3(q0), r3(L)]); q = L }
  return out
}
const PITCH = { [STARS]: 880 }

export const CUES = [
  // 1 · the hook: the chat pops, everyone types
  ['pop', T.panel + 0.05, 880, 0.04, 0], ['bell', r3(T.panel + 0.08), 1318.51, 0.025, 0.8, 0],
  ...headCue(T.h0, 8, T.h0Land, 0),
  ...clicks(0.6, 3.25, 0.011, 1), ...clicks(0.75, 3.2, 0.008, 5),
  ...[0, 1, 2].map(i => ['pop', r3(1.2 + i * 0.5), NOTE[(i * 2) % 7], 0.018, (i - 1) * 0.4]),
  // 2 · the six types, one bubble per bar
  ...SPOTS.slice(0, 6).flatMap(([k, m], i) => [...ding(m, i, (i % 2 ? 0.25 : -0.25)), ['whoosh', r3(m - 0.36), 0.3, 0.035]]),
  ...HEADS.slice(1, 7).flatMap(([, at], i) => wordPops(at + 0.02, 2, 0.07, i + 2, 0.02)),
  ...clicks(T.m2 - 1.05, T.m2 - 0.45, 0.009, 2), ...clicks(T.m3 - 1.05, T.m3 - 0.45, 0.009, 3), ...clicks(T.m4 - 1.05, T.m4 - 0.45, 0.009, 4), ...clicks(T.m5 - 1.05, T.m5 - 0.45, 0.009, 5), ...clicks(T.m6 - 1.05, T.m6 - 0.45, 0.009, 6),
  // soup steam, fit sparkle
  ['pluck', r3(T.m1 + 0.5), 739.99, 0.022, 0.5, -0.2], ['glitter', r3(T.m2 + 0.15), r3(T.m2 + 0.5)],
  // the synced eye-roll
  ['whoosh', T.roll, 0.5, 0.05], ['pop', r3(T.roll + 0.05), 392, 0.03, -0.3], ['pop', r3(T.roll + 0.3), 349.23, 0.03, 0.3], ['pop', r3(T.roll + 0.55), 329.63, 0.028, 0],
  // the doc unrolls (a fast paper roll) + 40 ROWS
  ...roll(T.doc[0], T.doc[1], 0.03), ['whoosh', T.doc[0], 1.2, 0.03], ['pop', T.docTag, 1318.51, 0.04, 0.2], ['bell', r3(T.docTag + 0.02), 1760, 0.03, 0.8, 0.2],
  // jab, jab, POW
  ...T.punch.flatMap((p, i) => [['whoosh', r3(p - 0.04), 0.12, 0.05], ['boom', r3(p + 0.02), i === 2 ? 0.15 : 0.08], ['tick', r3(p + 0.02), i === 2 ? 0.08 : 0.05]]),
  ['crash', r3(T.punch[2] + 0.02), { gain: 0.02, len: 1.2 }],
  // Sag leaves (zoom) → added back (yank, boing)
  ['whoosh', r3(T.left + 0.04), 0.35, 0.07], ['pop', r3(T.left + 0.05), 659.25, 0.025, 0.4], ['pop', T.added, 880, 0.03, 0.3],
  ['whoosh', r3(T.added + 0.02), 0.3, 0.06], ...boing(r3(T.added + 0.3)),
  // 3 · Pisces asks; everyone types… every dot stops; silence
  ...ding(T.m7, 5, 0.3),
  ...clicks(T.allType, T.stop0 + 0.5, 0.012, 9), ...clicks(T.allType + 0.03, T.stop0 + 0.3, 0.01, 11),
  ...[3, 0, 5, 1, 6, 2, 4].map(j => ['pop', r3(T.stop0 + j * T.stopGap + 0.04), [1318.51, 1174.66, 987.77, 880, 739.99, 659.25, 587.33][j], 0.018, (j % 2 ? 0.3 : -0.3)]),
  ...silence(T.tape, 0.5, T.gasp),
  ['tick', T.seen, 0.04], ['pop', r3(T.seen + 0.2), 587.33, 0.02, 0],
  ...chirp(T.crick[0], 0.016, -0.45), ...chirp(r3(T.crick[0] + 0.62), 0.012, -0.45), ...chirp(T.crick[1], 0.016, 0.45),
  ['tick', T.side[0], 0.03], ['tick', T.side[1], 0.03],
  ...clicks(T.scoType[0], T.scoType[1], 0.012, 13),
  ...ding(T.m8, 2, -0.3), ...womp(T.droop),
  // THE STARS: "…nobody knows. it's a blind date."  GASP (the music comes back), Libra faints
  ['pop', r3(T.lA - 0.22), 659.25, 0.035, 0], ['pop', r3(T.lA - 0.16), 880, 0.03, 0],
  ['whoosh', r3(T.gasp - 0.06), 0.18, 0.08], ['boom', T.gasp, 0.16], ...[0, 1, 2].map(i => ['pop', r3(T.gasp + i * 0.03), [1318.51, 1567.98, 1760][i], 0.035, (i - 1) * 0.4]),
  ...[880, 739.99, 587.33, 440, 349.23].map((f, i) => ['pop', r3(T.faint + i * 0.06), f, 0.028, -0.3]), ['boom', r3(T.faint + 0.34), 0.08],
  ['pop', r3(T.closeA), 880, 0.025, 0], ['pop', r3(T.closeA + 0.07), 587.33, 0.025, 0],
  // 4 · the mystery card: deal, flip, three words; Libra wakes; Cancer; Taurus
  ['whoosh', T.card, 0.4, 0.05], ['tick', r3(T.flip[0] - 0.02), 0.06], ['bell', T.flip[1], 1318.51, 0.04, 1.4, 0], ['glitter', r3(T.flip[0] + 0.1), r3(T.flip[1] + 0.4)],
  ...headCue(r3(T.card + 0.06), 3, r3(T.card + 0.4), 3),
  ...T.w.flatMap((w, i) => [['pop', w, [880, 987.77, 1174.66][i], 0.045, 0], ['pluck', r3(w + 0.01), [880, 987.77, 1174.66][i], 0.03, 0.5, 0]]),
  ...boing(r3(T.wake)), ['pop', r3(T.w[2] + 0.4), 523.25, 0.03, -0.4],
  ...ding(T.m9, 0, -0.25), ...ding(T.m10, 3, 0.25), ...headCue(r3(T.m9 - 0.02), 2, r3(T.m9 + 0.36), 2, 0.02),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.m9 + 0.3 + 0.05 * i), NOTE[(i * 2 + 3) % 7], 0.016, -0.3]),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.m10 + 0.3 + 0.05 * i), NOTE[(i * 2 + 1) % 7], 0.016, 0.3]),
  // ✨ her WEDDING ✨: bells, confetti
  ['pop', T.rename, 1174.66, 0.04, 0], ...[1174.66, 1479.98, 1760, 2349.32].map((f, i) => ['bell', r3(T.rename + 0.08 + i * 0.09), f, 0.04, 1.8, (i - 1.5) * 0.3]),
  ['glitter', r3(T.rename + 0.05), r3(T.rename + 1.0)], ['boom', T.rename, 0.1], ['whoosh', r3(T.rename + 0.1), 0.6, 0.04],
  ...headCue(r3(T.rename + 0.02), 1, r3(T.rename + 0.2), 4),
  // 5 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'D' }),
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // 6 · card first, face last
  ['whoosh', T.tieMove[0], 0.45, 0.04], ...headCue(r3(T.tie + 0.05), 3, r3(T.tie + 0.45), 1),
  ['pop', r3(T.lB - 0.22), 659.25, 0.035, 0], ['pop', r3(T.lB - 0.16), 880, 0.03, 0],
  ['pop', r3(T.closeB), 880, 0.025, 0], ['pop', r3(T.closeB + 0.07), 587.33, 0.025, 0],
  // 7 · fall for the words first
  ...wordPops(T.last, 5, 0.09, 2, 0.024), ['pluck', r3(T.last + 0.4), 1174.66, 0.035, 0.7, 0],
  ...T.hopEnd.map((h, i) => ['pop', r3(h), NOTE[(i * 2 + 2) % 7], 0.02, (i - 1) * 0.3]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues([...L_A, ...L_B], { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
