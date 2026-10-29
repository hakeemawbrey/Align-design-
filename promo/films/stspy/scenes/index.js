// stspy — "Agent Double-O-Star." (60 s vertical Align ad, Star Talk "Wild Lessons" #3, music: synthwave, C minor — a spy
// thriller). Story 0–55.6, then the shared end card.
//   0.00–4.6   Cold open on a synthwave horizon. AGENT ♐ SAG rappels down upside down (shades, bow tie):
//              "Agent | *Double-O-Star.*"  "the name's Star. Sag Star."  Unclips, flips, lands on the drop.
//   4.6–12.5   "Top secret | *briefing.*"  The briefing room powers on around him. ♑ CHIEF, deadpan: "we do have a door,
//              agent."  The dossier slams on the screen (TARGET: YOUR PARTNER · ♋ · THREAT LEVEL: ADORABLE, TOP SECRET
//              stamp). The laser pointer finds the target's home. "mission: plan the perfect date."  Sag: "say less."
//              Pisces, the intern with the coffee cart, is already crying.
//  12.75       card cut.
//  12.75–22.9  Q-branch: ♍ VIRGO in safety goggles. Rule of three, each bigger: "Go *big.*" a helicopter (✓ BOOKED) ·
//              "Go *bigger.*" a string quartet (Pisces sobs) · "Go *biggest.*" fireworks, all of them. The budget bar
//              overflows and Virgo faints.
//  23.1        card cut.
//  23.1–26.0   "Gather *intel.*"  Night-vision binoculars: the crosshair locks on the target… on the couch. ACTIVITY:
//              SITTING · WEARING: SOCKS · THREAT LEVEL: ADORABLE.
//  26.0–34.4   "Disguise: | *lamp.*"  Sag is inside, standing in the corner under a lampshade. The target squints at
//              the lamp (crickets)… shrugs. On the phone to Pisces: "honestly? my dream date…" (drumroll, the lamp
//              leans in) "is just the couch. with them. talking."  Record scratch: the shade pops off, the shades fly
//              up. "Mission… | *compromised.*"
//  34.5        card cut.
//  34.5–43.8   "Abort. | *Abort.*"  Into the wrist radio: "abort the helicopter. abort everything."  Out the window
//              the helicopter peels away, the quartet tiptoes off, one firework goes "pfft."  The shades come off; Sag
//              hops onto the couch. "New plan: | *sit down.*"  "so… how was your day?"  → "best date ever."
//  43.93–49.1 ★ LESSON UNLOCKED: "Grand gestures are nice. | *Presence* is better."  +1 PRESENT
//  49.3        card cut.
//  49.3–52.6   A talk card deals in: "What made you | smile today?"  THE STARS: "skip the helicopter. pull a card."
//  52.6–55.45  "Mission: *cozy.*"  A blanket drops over them both. Outside, the helicopter is back… Pisces at the
//              controls, crying, the quartet playing softly, one tiny heart firework.
// One canvas (sky + sets through a small camera), DOM type + dialogue boxes + the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  starFrame, inSprite, shadesCells, bowTieCells, gogglesCells, watchCells, tearsCells, hankieCells, spr, box, rgba, mixHex,
  drawHeli, drawViolin, drawCello, drawFirework, drawSynthSun, drawGridFloor, drawRope, drawDesk, drawCart, drawBench,
  drawClipboard, drawScreen, drawStamp, drawCouch, drawTable, drawWindow, drawLampshade, drawBlanket, drawPhone, makeTalkCard, INK,
} from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', RED = '#ff4058', NEON = '#ff4fd8', NV = '#7dff9a'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)            // the 108 bpm grid
const SAG = signStar('sagittarius'), CAP = signStar('capricorn'), VIR = signStar('virgo'), CAN = signStar('cancer'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  // 0 · cold open
  descend: [0.25, 1.35], l1: 1.85, unclip: 3.85, fall: [3.9, BEAT(7)], land: BEAT(7), glint: 4.75,
  // 1 · briefing
  setIn: [4.45, 5.0], chiefIn: 4.7, l2: 4.95, dossier: [7.4, 7.8], l3: 7.5, stamp: 8.3, laser: [9.25, 9.95], pin: 9.95, l4: 10.1,
  pisCry: 10.95, sayLess: 11.4, close2: 12.7,
  cut1: 12.75,
  // 2 · Q-branch
  l5: 13.0, heli: [13.9, 14.45], booked: 14.6, l6: 16.3, quartet: [17.35, 17.45, 17.55, 17.65], strings: [17.6, 19.6], l7: 19.75,
  fw: [BEAT(36), 21.0, 21.35, 21.75], budget: [20.6, 21.6], faint: [21.95, 22.3], close3: 22.95,
  cut2: 23.1,
  // 3 · night vision
  nv: [23.1, 26.0], aim: [23.45, 24.5], lock: 24.55, hud: [24.75, 25.05, 25.3],
  // 4 · the lamp + the intel
  room: 26.0, look: [26.85, 28.0], chirps: [27.2, 27.55], call: 28.15, l8: 28.35, lean: [29.4, 30.8], drum: [29.5, 30.78], l9: 30.95,
  scratch: BEAT(58), close4: 34.25,
  cut3: 34.5,
  // 5 · abort
  l10: 34.75, callOut: 34.6, heliGo: [36.1, 37.3], qGo: [36.35, 37.9], pfft: 37.75, shadesOff: [38.0, 38.4], hop: [38.3, 38.8],
  l11: 38.95, heart: 40.15, l12: 41.6, close5: 43.75,
  // 6 · lesson
  lesson: BEAT(78), lessonOut: [48.95, 49.15],
  cut4: 49.3,
  // 7 · tie-in
  card: [49.4, 49.95], l13: 49.55, close6: 52.5, cardOut: [52.3, 52.65],
  // 8 · last line
  blanket: [52.7, 53.1], heliBack: [52.75, 53.55], tinyFw: 53.75, out: [55.0, 55.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Grand gestures are nice. | *Presence* is better.', chip: '+1 PRESENT' }

// ── the dialogue
const AG = '♐︎ AGENT SAG', CH = '♑︎ THE CHIEF', YP = '♋︎ YOUR PARTNER', NT = 'THE STARS'
const AC = '#ffb36b', CC = LAV, YC = CYAN, NC = GOLD
const LINES1 = [{ t: T.l1, speaker: AG, color: AC, text: "the name's Star. *Sag Star.*" }]
const LINES2 = [
  { t: T.l2, speaker: CH, color: CC, text: 'we do have a *door,* agent.' },
  { t: T.l3, speaker: CH, color: CC, text: 'your target: *your partner.*' },
  { t: T.l4, speaker: CH, color: CC, text: 'mission: the *perfect date.*' },
]
const LINES3 = [
  { t: T.l5, speaker: AG, color: AC, text: 'phase one: a *helicopter.*' },
  { t: T.l6, speaker: AG, color: AC, text: 'phase two: a *string quartet.*' },
  { t: T.l7, speaker: AG, color: AC, text: 'phase three: *fireworks.* all of them.' },
]
const LINES4 = [
  { t: T.l8, speaker: YP, color: YC, text: 'honestly? my dream date…' },
  { t: T.l9, speaker: YP, color: YC, text: 'is just the couch. with them. *talking.*' },
]
const LINES5 = [
  { t: T.l10, speaker: AG, color: AC, text: 'abort the helicopter. abort *everything.*' },
  { t: T.l11, speaker: AG, color: AC, text: 'so… how was your *day?*' },
  { t: T.l12, speaker: YP, color: YC, text: '*best date ever.*' },
]
const LINES6 = [{ t: T.l13, speaker: NT, color: NC, text: 'skip the helicopter. *pull a card.*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6]
const CPS = 28

// ── headlines: one spec drives the type and its sound
const HEADS = [
  { text: 'Agent | *Double-O-Star.*', top: 150, size: 104, accentSize: 150, at: 0.95, late: 1, lateAt: BEAT(2), accentColor: '#ffb36b', out: [4.4, 4.6], fit: true },
  { text: 'Top secret | *briefing.*', top: 150, size: 100, accentSize: 150, at: 5.0, late: 1, lateAt: 5.3, accentColor: RED, out: [11.25, 11.45] },
  { text: 'Go *big.*', top: 170, size: 120, accentSize: 176, at: 12.88, late: 1, lateAt: 13.05, accentColor: PINK, out: [16.0, 16.15] },
  { text: 'Go *bigger.*', top: 170, size: 120, accentSize: 176, at: 16.2, late: 1, lateAt: 16.4, accentColor: PINK, out: [19.5, 19.65] },
  { text: 'Go *biggest.*', top: 170, size: 120, accentSize: 176, at: 19.7, late: 1, lateAt: 19.9, accentColor: PINK, out: [22.8, 22.95] },
  { text: 'Gather *intel.*', top: 160, size: 112, accentSize: 164, at: 23.25, late: 1, lateAt: 23.5, accentColor: NV, out: [25.8, 25.95] },
  { text: 'Disguise: | *lamp.*', top: 150, size: 110, accentSize: 176, at: 26.1, late: 1, lateAt: 26.45, accentColor: GOLD, out: [28.1, 28.25] },
  { text: 'Their dream | *date…*', top: 150, size: 104, accentSize: 160, at: 28.3, late: 1, lateAt: 28.6, accentColor: CYAN, out: [32.65, 32.8] },
  { text: 'Mission… | *compromised.*', top: 150, size: 100, accentSize: 150, at: T.scratch + 0.06, late: 1, lateAt: T.scratch + 0.35, accentColor: RED, out: [34.3, 34.45], fit: true },
  { text: 'Abort. | *Abort.*', top: 150, size: 112, accentSize: 170, at: 34.6, late: 1, lateAt: 34.9, accentColor: RED, out: [38.1, 38.25] },
  { text: 'New plan: | *sit down.*', top: 150, size: 104, accentSize: 160, at: 38.35, late: 1, lateAt: 38.7, accentColor: GOLD, out: [43.6, 43.8] },
  { text: '“What made you | *smile* today?”', top: 150, size: 96, accentSize: 138, at: 49.4, gap: 0.07, accentColor: GOLD, out: [52.4, 52.55], fit: true },
  { text: 'Mission: *cozy.*', top: 170, size: 112, accentSize: 170, at: 52.75, late: 1, lateAt: BEAT(94) + 0.4, accentColor: GOLD, out: [55.15, 55.4] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const lerpP = (P, Q, e, arc = 0) => ({ x: lerp(P.x, Q.x, e), y: lerp(P.y, Q.y, e) - Math.sin(Math.PI * clamp(e)) * arc })
const bounce = p => { p = clamp(p); return p < 0.7 ? (p / 0.7) ** 2 : 1 - 0.12 * Math.sin(Math.PI * (p - 0.7) / 0.3) }
const scene = t => t < T.setIn[0] + 0.15 ? 'hook' : t < T.cut1 ? 'brief' : t < T.cut2 ? 'lab' : t < T.room ? 'nv' : 'room'

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, step: x => (x >= 1 ? 1 : 0) }
const IDN = [1, 540, 960, 540, 960]
const RC = [1.22, 560, 1180, 540, 1130]          // the living room's base framing (a touch closer)
const CAM = [
  [0, ...IDN],
  [11.3, ...IDN, 'lin'], [11.6, 1.22, 260, 1150, 380, 1120, 'out'], [12.7, 1.26, 260, 1150, 380, 1120, 'lin'], [12.75, ...IDN, 'step'],
  [23.0, ...IDN, 'lin'], [23.1, ...RC, 'step'],
  [26.8, ...RC, 'lin'], [27.15, 1.38, 440, 1100, 540, 1060, 'io'], [28.0, 1.38, 440, 1100, 540, 1060, 'lin'], [28.35, ...RC, 'io'],
  [T.scratch, ...RC, 'lin'], [T.scratch + 0.1, 2.15, 230, 1075, 540, 1030, 'out'], [33.95, 2.22, 230, 1075, 540, 1030, 'lin'], [34.35, ...RC, 'io'],
  [40.05, ...RC, 'lin'], [40.4, 1.36, 565, 1125, 540, 1110, 'io'], [43.6, 1.38, 565, 1125, 540, 1110, 'lin'], [43.95, ...RC, 'io'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}

// ── the cast: positions
const S_SAG = { hook: 290, brief: 290, lab: 270, room: 236 }
const SAG_BRIEF = { x: 260, y: 1205 }, SAG_LAB = { x: 230, y: 1210 }, SAG_LAMP = { x: 232, y: 1135 }, SAG_COUCH = { x: 425, y: 1150 }
const CAN_COUCH = { x: 705, y: 1150 }
const COUCH = { x: 560, y: 1212, w: 650 }, TABLE = { x: 560, y: 1330, w: 380 }
const WIN = { x: 605, y: 600, w: 355, h: 300 }
const INSET = { x: 290, y: 770, r: 110 }

function sagPos(t) {
  if (t < T.descend[0]) return { x: 540, y: -260, rot: Math.PI }
  if (t < T.unclip) {
    const p = ease.outBack(prog(t, ...T.descend))
    return { x: 540 + Math.sin(t * 1.7) * 10, y: lerp(-260, 880, p), rot: Math.PI + 0.08 * Math.sin(t * 2.3) }
  }
  if (t < T.land) {
    const p = prog(t, T.unclip, T.land), e = ease.inQuad(p)
    return { x: lerp(540, SAG_BRIEF.x, ease.inOutQuad(p)), y: lerp(880, SAG_BRIEF.y, e) - Math.sin(Math.PI * p) * 220, rot: Math.PI + TAU * 0.5 * ease.inOutCubic(clamp(p * 1.15)) }
  }
  const sc = scene(t)
  if (sc === 'brief' || sc === 'hook') return { ...SAG_BRIEF, rot: 0 }
  if (sc === 'lab') return { ...SAG_LAB, rot: 0 }
  if (t >= T.hop[0]) return { ...lerpP(SAG_LAMP, SAG_COUCH, ease.inOutCubic(prog(t, ...T.hop)), 150), rot: 0 }
  return { ...SAG_LAMP, rot: 0 }
}
// shades: 0 = on the eyes, 1 = up on the forehead, 'off' after T.shadesOff
const shadesUp = t => t < T.scratch ? 0 : t < T.shadesOff[0] ? easeOutBack(prog(t, T.scratch, T.scratch + 0.18), 2.5) : 1
function sagState(t) {
  const st = { mood: 'neutral', look: [0, 0], blink: false, squash: 0, glint: -1, shades: t < T.shadesOff[0], up: shadesUp(t), blush: undefined }
  const gl = (t0, d = 0.35) => (t >= t0 && t < t0 + d) ? (t - t0) / d : -1
  for (const g of [T.glint, T.sayLess + 0.05, T.l5 - 0.2, T.l10 + 0.6]) { const v = gl(g); if (v >= 0) st.glint = v }
  if (t < T.land) { st.mood = 'neutral'; return st }
  const dl = t - T.land
  if (dl < 0.6) st.squash = 0.3 * Math.exp(-dl * 8) * Math.cos(dl * 22)
  if (t < T.scratch) { st.mood = inR(t, T.l2, T.l2 + 2.2) ? 'squint' : 'neutral'; st.look = scene(t) === 'brief' ? [1, 0] : [1, -1]; if (scene(t) === 'room') st.look = [1, 0]; return st }
  if (t < T.shadesOff[0]) { st.mood = 'wide'; st.look = t < T.l10 ? [1, 0] : [-1, 1]; return st }
  st.blink = undefined
  if (t < T.hop[1]) { st.mood = 'neutral'; st.look = [1, 0]; return st }
  if (t < T.heart) { st.mood = 'happy'; st.look = [1, 0]; return st }
  if (t < T.lesson) { st.mood = 'sparkle'; st.look = [1, 0]; return st }
  if (t < T.cut4) { st.mood = 'heart'; st.look = [1, 0]; return st }
  if (t < T.blanket[0]) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  st.mood = 'happy'; st.look = [1, 0]
  return st
}
function canState(t) {
  const st = { mood: 'happy', look: [0, 1], blink: undefined, squash: 0, phone: false }
  if (t < T.look[0]) { st.phone = true; return st }
  if (t < T.look[1]) { st.mood = 'squint'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.call) { st.mood = 'neutral'; st.look = [0, 1]; st.phone = true; return st }
  if (t < T.cut3) { st.mood = 'sparkle'; st.look = [1, -1]; st.phone = true; return st }
  if (t < T.hop[0]) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.heart) { st.mood = 'sparkle'; st.look = [-1, 0]; return st }
  if (t < T.cut4) { st.mood = 'heart'; st.look = [-1, 0]; return st }
  if (t < T.blanket[0]) { st.mood = 'sparkle'; st.look = [-1, -1]; return st }
  st.mood = 'happy'; st.look = [-1, 0]
  return st
}

// talk hops
const hopsOf = (sp) => talkHops(ALL_LINES, sp, { cps: CPS })
const SAG_HOPS = [...hopsOf(AG), T.land + 0.02, T.sayLess, T.booked + 0.1, T.fw[0] + 0.1, T.scratch + 0.02, T.hop[0], T.heart, T.lesson + 0.2, T.card[1], T.blanket[1]]
const CAP_HOPS = [...hopsOf(CH), T.chiefIn + 0.05, T.stamp]
const CAN_HOPS = [...hopsOf(YP), T.chirps[1] + 0.4, T.hop[1], T.heart + 0.05, T.lesson + 0.25, T.card[1] + 0.05, T.blanket[1] + 0.05]
const NAR_HOPS = hopsOf(NT)
const VIR_HOPS = [T.booked, T.quartet[3] + 0.3, T.fw[0] + 0.05]
const PIS_HOPS = [39.75, T.heart + 0.1, T.l12 + 0.2, T.pisCry, T.pisCry + 0.5, T.quartet[0] + 0.4, T.fw[0] + 0.1, T.fw[3] + 0.05, T.call + 0.2, T.l9 + 1.4, T.heliBack[1], T.heliBack[1] + 0.5]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'", "400 21px 'Space Mono'", "700 17px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const lovers = await loadImg('card-talk-6.png')
  const TALK = makeTalkCard(document, lovers, ['What made you', 'smile today?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, close: 4.62 }),
    dialogueBox(root, { ...BOX, lines: LINES2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, close: T.close4 }),
    dialogueBox(root, { ...BOX, lines: LINES5, close: T.close5 }),
    dialogueBox(root, { ...BOX, lines: LINES6, close: T.close6 }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the binocular mask (static)
  const mask = document.createElement('canvas'); mask.width = W; mask.height = H
  { const m = mask.getContext('2d'); m.fillStyle = '#020604'; m.fillRect(0, 0, W, H); m.globalCompositeOperation = 'destination-out'
    for (const cx of [345, 735]) { const g = m.createRadialGradient(cx, 1000, 330, cx, 1000, 420); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); m.fillStyle = g; m.beginPath(); m.arc(cx, 1000, 420, 0, TAU); m.fill() } }

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const stroked = (txt, X, Y, size, col, lw = 10, font = MONO) => { x.font = `700 ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  /** a popping word in the world: k-curve pop, float up, fade */
  function popWord(t, t0, s, X, Y, size, col, { dur = 1.1, rot = -0.06 } = {}) {
    const k = t - t0
    if (k < 0 || k > dur) return
    const pk = easeOutBack(prog(k, 0, 0.22), 3)
    x.save(); x.globalAlpha *= 1 - prog(k, dur - 0.25, dur); x.translate(X, Y - k * 40); x.rotate(rot); x.scale(pk, pk); stroked(s, 0, 0, size, col, size * 0.24); x.restore()
  }

  /** draw a star character (optionally rotated) and run overlay(F) in its sprite space */
  function star(P, size, t, opts, { rot = 0, overlay = null, pivot = 0 } = {}) {
    x.save(); x.translate(P.x, P.y + pivot); if (rot) x.rotate(rot); x.translate(0, -pivot)
    drawStarChar(x, 0, 0, size, t, opts.alpha === undefined ? { ...opts, alpha: x.globalAlpha } : opts)
    if (overlay) overlay(starFrame(0, 0, size, t, opts))
    x.restore()
  }

  // ═══════════════════════ the agent ═══════════════════════
  function drawSag(t, opt = {}) {
    const P = sagPos(t), st = sagState(t), sc = scene(t)
    const size = t < T.land ? S_SAG.hook : S_SAG[sc === 'nv' ? 'room' : sc] || 280
    const opts = { color: SAG.color, glyph: SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: SAG_HOPS, seed: 3, pop: opt.pop ?? 1, blush: st.blush }
    if (opt.lean) opts.squash -= 0.05 * opt.lean
    star(P, size, t, opts, {
      rot: P.rot + (opt.lean ? 0.16 * opt.lean : 0),
      overlay: F => inSprite(x, F, () => {
        bowTieCells(x)
        if (sc === 'room' && t >= T.cut3 && t < T.shadesOff[1]) watchCells(x, Math.floor(t * 5) % 2)
        if (st.shades) shadesCells(x, st.glint, -6 * st.up)
      }),
    })
    return { P, size }
  }

  // ═══════════════════════ 0 · cold open ═══════════════════════
  const BEAMS = [[180, 0.9, NEON], [900, 1.3, CYAN], [540, 0.7, LAV]]
  function hookSet(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a
    // searchlight beams
    x.globalCompositeOperation = 'lighter'
    for (const [bx, sp, col] of BEAMS) {
      const ang = Math.sin(t * sp + bx) * 0.45
      x.save(); x.translate(bx, 1320); x.rotate(ang)
      const g = x.createLinearGradient(0, 0, 0, -1500); g.addColorStop(0, rgba(col, 0.22)); g.addColorStop(1, rgba(col, 0))
      x.fillStyle = g; x.beginPath(); x.moveTo(-20, 0); x.lineTo(20, 0); x.lineTo(170, -1500); x.lineTo(-170, -1500); x.fill(); x.restore()
    }
    x.globalCompositeOperation = 'source-over'
    drawSynthSun(x, 540, 1300, 300, t)
    drawGridFloor(x, 1300, t)
    x.restore()
  }
  function rope(t) {
    if (t >= T.unclip + 0.6) return
    const P = sagPos(t)
    const yEnd = t < T.unclip ? P.y - 112 : lerp(1010, -40, ease.inCubic(prog(t, T.unclip, T.unclip + 0.6)))
    drawRope(x, t < T.unclip ? P.x : 540, -20, yEnd)
    if (t < T.unclip) { box(x, P.x - 16, P.y - 128, 32, 22, '#c9d0ee', INK, 4) }
  }

  // ═══════════════════════ 1 · briefing ═══════════════════════
  const SCR = { x: 110, y: 450, w: 860, h: 440 }
  const PIN = { x: 790, y: 720 }
  function briefSet(t, C) {
    const on = clamp(prog(t, T.setIn[0], T.setIn[1]))
    const flick = t < T.setIn[1] + 0.2 ? (Math.floor(t * 30) % 3 ? 1 : 0.4) : 1
    drawGridFloor(x, 1300, t, { alpha: 0.85 * on, speed: 0 })
    x.save(); x.globalAlpha = on
    drawScreen(x, SCR.x, SCR.y, SCR.w, SCR.h, t, flick)
    // the target pin + pulse
    x.save(); x.beginPath(); x.rect(SCR.x, SCR.y, SCR.w, SCR.h); x.clip()
    if (t >= T.pin) {
      for (let k = 0; k < 2; k++) { const ph = ((t - T.pin) * 1.2 + k * 0.5) % 1; x.strokeStyle = rgba(RED, 1 - ph); x.lineWidth = 6; x.beginPath(); x.arc(PIN.x, PIN.y, 30 + ph * 90, 0, TAU); x.stroke() }
      stroked('TARGET HOME', PIN.x, PIN.y + 96, 24, RED, 7)
    }
    x.fillStyle = INK; x.beginPath(); x.arc(PIN.x, PIN.y, 26, 0, TAU); x.fill()
    x.fillStyle = t >= T.pin ? RED : '#3a6a9a'; x.beginPath(); x.arc(PIN.x, PIN.y, 20, 0, TAU); x.fill()
    x.fillStyle = BONE; x.font = `700 26px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♋︎', PIN.x, PIN.y + 1)
    x.restore()
    // the dossier
    if (t >= T.dossier[0]) {
      const p = prog(t, ...T.dossier), e = easeOutBack(p, 1.4)
      const dx = lerp(-520, 0, e), rot = lerp(-0.5, -0.035, ease.outCubic(p))
      x.save(); x.translate(335 + dx, 690); x.rotate(rot)
      box(x, -200, -165, 400, 330, '#e9c98a', INK, 5)
      x.fillStyle = '#d9b06a'; x.fillRect(-200, -165, 150, 26)
      // polaroid
      box(x, -180, -120, 140, 170, '#fbf3e6', INK, 4); x.fillStyle = '#1a1440'; x.fillRect(-170, -110, 120, 120)
      drawStarChar(x, -110, -48, 100, t, { color: CAN.color, mood: 'happy', look: [0, 0], bob: 0, tips: false, glow: 0.4, seed: 41 })
      x.fillStyle = INK; x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.fillText('cute.', -110, 32)
      x.textAlign = 'left'; x.textBaseline = 'alphabetic'
      const tx = -20
      x.font = `700 19px ${MONO}`; x.fillStyle = '#6a4a2a'; x.fillText('TARGET:', tx, -95)
      x.font = `700 23px ${MONO}`; x.fillStyle = INK; x.fillText('YOUR PARTNER', tx, -66)
      x.font = `700 19px ${MONO}`; x.fillStyle = '#6a4a2a'; x.fillText('SIGN:', tx, -28)
      x.font = `700 23px ${MONO}`; x.fillStyle = INK; x.fillText('♋︎ CANCER', tx, 1)
      x.font = `700 19px ${MONO}`; x.fillStyle = '#6a4a2a'; x.fillText('THREAT LEVEL:', tx, 38)
      x.font = `700 25px ${MONO}`; x.fillStyle = '#d0306a'; x.fillText('ADORABLE', tx, 68)
      drawStamp(x, 'TOP SECRET', 0, 118, -0.1, prog(t, T.stamp, T.stamp + 0.14), { size: 40 })
      x.restore()
    }
    x.restore()
  }
  function laser(t, from) {
    if (t < T.laser[0] || t >= T.cut1) return
    const p = ease.inOutCubic(prog(t, ...T.laser))
    const to = { x: lerp(560, PIN.x, p) + (p < 1 ? Math.sin(t * 23) * 8 : Math.sin(t * 9) * 2), y: lerp(560, PIN.y, p) + (p < 1 ? Math.cos(t * 19) * 8 : 0) }
    x.save(); x.globalCompositeOperation = 'lighter'
    x.strokeStyle = 'rgba(255,60,80,0.35)'; x.lineWidth = 6; x.beginPath(); x.moveTo(from.x, from.y); x.lineTo(to.x, to.y); x.stroke()
    const g = x.createRadialGradient(to.x, to.y, 0, to.x, to.y, 34); g.addColorStop(0, 'rgba(255,90,100,0.95)'); g.addColorStop(1, 'rgba(255,60,80,0)'); x.fillStyle = g; x.fillRect(to.x - 34, to.y - 34, 68, 68)
    x.restore(); x.fillStyle = '#fff'; x.fillRect(Math.round(to.x - 4), Math.round(to.y - 4), 8, 8)
  }
  function briefCast(t) {
    const kC = pop01(t, T.chiefIn, 0.36, 2)
    // Pisces, the intern, behind
    const pis = { mood: t >= T.pisCry ? 'sparkle' : 'happy', look: t >= T.pisCry ? [0, -1] : [-1, 0] }
    star({ x: 560, y: 1075 }, 118, t, { color: PIS.color, mood: pis.mood, look: pis.look, hops: PIS_HOPS, seed: 12, pop: kC, glow: 0.7 },
      { overlay: F => inSprite(x, F, () => { if (t >= T.pisCry) tearsCells(x, t, t > T.pisCry + 0.8 ? 3 : 2) }) })
    if (kC > 0.01) drawCart(x, 560, 1170, 7, t)
    drawSag(t)
    // the chief behind the desk
    if (kC > 0.01) {
      const mood = inR(t, T.sayLess + 0.1, T.sayLess + 1.0) ? 'eyeroll' : inR(t, T.l3 - 0.3, T.laser[1] + 0.4) ? 'neutral' : 'squint'
      star({ x: 825, y: 1185 }, 250, t, { color: CAP.color, glyph: CAP.glyph, mood, look: inR(t, T.laser[0], T.cut1) ? [-1, -1] : [-1, 0], hops: CAP_HOPS, seed: 7, pop: kC })
      x.save(); x.globalAlpha = clamp(kC); drawDesk(x, 825, 1290, 330, 'CHIEF', '♑︎'); x.restore()
    }
    laser(t, { x: 712, y: 1150 })
    popWord(t, T.sayLess, 'say less.', 300, 990, 48, '#ffb36b', { dur: 1.0 })
  }

  // ═══════════════════════ 2 · Q-branch ═══════════════════════
  const QX = [385, 478, 571, 664]
  function labSet(t) {
    drawGridFloor(x, 1300, t, { col: CYAN, speed: 0, alpha: 0.75 })
    // fireworks behind everything
    const cols = [[PINK, GOLD, BONE], [CYAN, LAV, BONE], [GOLD, '#ff7a3a', BONE], [PINK, '#ff4f7a', '#ffd0e0']]
    const at = [[300, 560], [800, 500], [560, 420], [560, 600]]
    T.fw.forEach((t0, i) => drawFirework(x, at[i][0], at[i][1], t, t0, { R: i === 3 ? 300 : 250, n: i === 3 ? 34 : 26, size: 34, cols: cols[i], seed: 30 + i, heart: i === 3, dur: 1.6, drawStar: drawPixelStar }))
  }
  function heliLab(t) {
    if (t < T.heli[0]) return
    const p = prog(t, ...T.heli), y = lerp(-200, 700, easeOutBack(p, 1.2)) + Math.sin(t * 2.6) * 10
    drawHeli(x, 560, y, 9, t, { tilt: 0.06 * Math.sin(t * 1.9) - 0.25 * (1 - p) })
  }
  function quartet(t, ox = 0, oy = 0, scale = 1, { leave = null, alpha = 1 } = {}) {
    for (let i = 0; i < 4; i++) {
      const k = t < T.quartet[i] ? 0 : pop01(t, T.quartet[i], 0.3, 2.2)
      if (k <= 0.01 && !leave) continue
      let qx = ox + QX[i] * scale, qy = oy + 965 * scale
      let kk = leave ? 1 : k
      if (leave) { const lp = prog(t, leave[0] + i * 0.18, leave[1] + i * 0.18); qx += ease.inCubic(lp) * 520 * scale; qy -= Math.abs(Math.sin(lp * 18)) * 10 * scale; if (lp >= 1) continue }
      const sz = 100 * scale, ph = t * (9 + i)
      x.save(); x.globalAlpha *= alpha
      star({ x: qx, y: qy }, sz, t, { color: ['#ffd36e', '#ff9ec7', '#9fe0ff', '#c9a6ff'][i], mood: 'happy', look: [0, 0], seed: 50 + i, pop: kk, glow: 0.6, tips: false })
      if (kk > 0.5) { if (i === 3) drawCello(x, qx + 24 * scale, qy + 14 * scale, 5 * scale, ph); else drawViolin(x, qx - 22 * scale, qy - 4 * scale, 4 * scale, ph) }
      // musical notes
      if (!leave && t > T.strings[0] && t < T.cut2) { const nph = ((t - T.strings[0]) * 0.7 + i * 0.27) % 1; x.globalAlpha *= 1 - nph; stroked(i % 2 ? '♪' : '♫', qx + 30 * scale, qy - 70 * scale - nph * 90 * scale, 34 * scale, [GOLD, PINK, CYAN, LAV][i], 6 * scale, "'EB Garamond', serif") }
      x.restore()
    }
  }
  function labCast(t) {
    // Pisces in goggles at the back
    const pisT = t > T.fw[0] ? 3 : t > T.quartet[0] + 0.3 ? 2 : 0
    star({ x: 112, y: 905 }, 112, t, { color: PIS.color, mood: pisT ? 'sparkle' : 'happy', look: [1, 0], hops: PIS_HOPS, seed: 12, glow: 0.7 },
      { overlay: F => inSprite(x, F, () => { gogglesCells(x); if (pisT) tearsCells(x, t, pisT) }) })
    heliLab(t)
    quartet(t)
    drawSag(t)
    // Virgo (Q), the bench, the clipboard
    const fp = bounce(prog(t, ...T.faint))
    const vMood = t >= T.faint[0] ? 'neutral' : inR(t, T.heli[0], T.heli[0] + 0.8) || inR(t, T.fw[0], T.faint[0]) ? 'wide' : inR(t, T.booked, T.booked + 1.2) ? 'happy' : 'neutral'
    star({ x: 850, y: 1195 }, 240, t, { color: VIR.color, glyph: VIR.glyph, mood: vMood, look: inR(t, T.heli[0], T.heli[0] + 1.5) || inR(t, T.fw[0], T.faint[0]) ? [-1, -1] : [-1, 0], blink: t >= T.faint[0] + 0.1 ? 1 : undefined, hops: VIR_HOPS, seed: 9 },
      { rot: 1.35 * fp, pivot: 110, overlay: F => inSprite(x, F, () => gogglesCells(x)) })
    const bar = t < T.booked ? 0.25 : t < T.quartet[3] ? 0.55 : t < T.budget[0] ? 0.8 : lerp(0.8, 2.2, ease.inQuad(prog(t, ...T.budget)))
    const cbx = t < T.faint[0] ? 728 : lerp(728, 690, fp), cby = t < T.faint[0] ? 1165 : lerp(1165, 1000, Math.sin(Math.PI * fp)) + 220 * fp
    drawClipboard(x, cbx, cby, 1.15, -0.12 + 1.6 * fp, [1, 1, 2, 0], { bar })
    if (t >= T.booked) drawStamp(x, '✓ BOOKED', 600, 545, -0.08, prog(t, T.booked, T.booked + 0.14) * (1 - prog(t, T.l6 - 0.3, T.l6)), { col: '#56e07a', size: 44 })
    drawBench(x, 830, 1330, 400, t)
    if (t >= T.budget[1]) popWord(t, T.budget[1], 'OVER BUDGET', 760, 1040, 34, RED, { dur: 1.2, rot: 0.06 })
    if (t >= T.faint[1]) popWord(t, T.faint[1] - 0.05, 'thud.', 930, 1250, 40, BONE, { dur: 0.8 })
  }

  // ═══════════════════════ 3/4/5 · the living room ═══════════════════════
  function heliWin(t) {
    // waiting outside → peels away → comes back with Pisces at the controls
    if (t >= T.heliGo[1] && t < T.heliBack[0]) return
    let hx = WIN.x + 140, hy = WIN.y + 95 + Math.sin(t * 2.4) * 6, tilt = 0.05 * Math.sin(t * 1.7)
    if (inR(t, T.heliGo[0], T.heliGo[1])) { const p = ease.inCubic(prog(t, ...T.heliGo)); hx += p * 520; hy -= p * 160; tilt = 0.35 * clamp(p * 3) }
    if (t >= T.heliBack[0]) { const p = easeOutBack(prog(t, ...T.heliBack), 1.3); hx = lerp(WIN.x + 640, WIN.x + 140, p); tilt = -0.3 * (1 - p) + 0.05 * Math.sin(t * 1.7) }
    const pilot = t >= T.heliBack[0] ? (cx, cy, u) => { drawStarChar(x, cx, cy, u * 9, t, { color: PIS.color, mood: 'sparkle', look: [-1, 0], seed: 12, glow: 0.4, tips: false }) } : null
    drawHeli(x, hx, hy, 5, t, { tilt, pilot })
    if (t >= T.heliBack[0]) {   // Pisces' tears from the cockpit
      for (let k = 0; k < 6; k++) { const ph = (t * 1.6 + k / 6) % 1; x.fillStyle = '#8fe3ff'; x.fillRect(Math.round(hx + 38 + (k % 2 ? 1 : -1) * ph * 40), Math.round(hy - 6 + ph * ph * 120), 6, 8) }
    }
  }
  function quartetWin(t) {
    const s = 0.42, ox = WIN.x - 120, oy = WIN.y + 288 - 965 * s
    if (t >= T.qGo[0] && t < T.heliBack[0]) { if (t < T.qGo[1] + 0.6) quartet(t, ox, oy, s, { leave: T.qGo }); return }
    // waiting / playing (all four already popped)
    quartet(t, ox, oy, s, { alpha: t >= T.heliBack[0] ? clamp(prog(t, T.heliBack[0] + 0.3, T.heliBack[0] + 0.7)) : 1 })
  }
  function windowInside(t) {
    heliWin(t)
    quartetWin(t)
    // Pisces peeks in at the window, sobbing, once the gadgets have left
    if (t >= 39.3 && t < T.heliBack[0] + 0.3) {
      const k = clamp(prog(t, 39.3, 39.8)) * (1 - clamp(prog(t, T.heliBack[0], T.heliBack[0] + 0.3)))
      star({ x: WIN.x + 180, y: WIN.y + WIN.h + 40 - 150 * ease.outBack(k) }, 150, t, { color: PIS.color, mood: 'sparkle', look: [-1, 1], seed: 12, glow: 0.6, hops: PIS_HOPS },
        { overlay: F => inSprite(x, F, () => { tearsCells(x, t, t > T.heart ? 3 : 2); if (t > T.l12) hankieCells(x, Math.floor(t * 4) % 2 ? 1 : -1) }) })
    }
    // pfft.
    const fz = t - T.pfft
    if (fz >= -0.3 && fz < 0.9) {
      const px = WIN.x + 260, py = WIN.y + 120
      if (fz < 0) { x.fillStyle = '#fff3c4'; x.fillRect(px - 3, Math.round(py + 160 * (-fz / 0.3)), 6, 10) }
      else { x.fillStyle = 'rgba(200,200,220,0.7)'; for (let k = 0; k < 4; k++) x.fillRect(Math.round(px - 6 + k * 4 - fz * 10), Math.round(py + k * 6 + fz * 30), 6, 6); popWord(t, T.pfft, 'pfft.', px - 30, py - 30, 46, BONE, { dur: 1.0 }) }
    }
    if (t >= T.tinyFw - 0.35) drawFirework(x, WIN.x + 280, WIN.y + 110, t, T.tinyFw, { R: 70, n: 16, cols: [PINK, '#ffd0e0'], heart: true, seed: 77, dur: 1.4 })
  }
  function roomSet(t) {
    // a rug to stand on in the sky + a warm glow
    const g = x.createRadialGradient(560, 1250, 80, 560, 1250, 640); g.addColorStop(0, 'rgba(255,190,120,0.22)'); g.addColorStop(1, 'rgba(255,190,120,0)'); x.fillStyle = g; x.fillRect(0, 700, W, 1100)
    x.fillStyle = INK; x.beginPath(); x.ellipse(560, 1300, 520, 70, 0, 0, TAU); x.fill()
    x.fillStyle = '#5a2e6e'; x.beginPath(); x.ellipse(560, 1296, 506, 60, 0, 0, TAU); x.fill()
    x.fillStyle = '#74408a'; x.beginPath(); x.ellipse(560, 1296, 430, 44, 0, 0, TAU); x.fill()
    drawWindow(x, WIN.x, WIN.y, WIN.w, WIN.h, () => windowInside(t))
    drawCouch(x, COUCH.x, COUCH.y, COUCH.w)
  }
  function drawCancer(t) {
    const st = canState(t)
    star(CAN_COUCH, 250, t, { color: CAN.color, glyph: CAN.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: CAN_HOPS, seed: 5 })
    if (st.phone) {
      const onCall = t >= T.call && t < T.cut3
      drawPhone(x, CAN_COUCH.x + (onCall ? -78 : -40), CAN_COUCH.y + (onCall ? -10 : 40), 1.1, onCall ? -0.35 : 0.2)
    }
  }
  function lampSag(t, C) {
    if (t >= T.room && t < T.shadesOff[0] + 0.05) {
      // the lean (listening), then the shade pops off on the scratch
      const lean = inR(t, T.lean[0], T.scratch) ? ease.inOutCubic(prog(t, T.lean[0], T.lean[1])) : 0
      const look = inR(t, ...T.look) ? 1 : 0
      const { P, size } = drawSag(t, { lean })
      const topY = P.y - size * 0.48 - (look ? 2 : 0)
      if (t < T.scratch) {
        const flick = look && Math.floor(t * 14) % 4 === 0 ? 0.3 : 1
        drawLampshade(x, P.x + 26 * lean, topY - 56, 210, 0.16 * lean + (look ? 0.02 * Math.sin(t * 40) : 0), flick)
      } else {
        const p = prog(t, T.scratch, T.scratch + 0.9)
        if (p < 1) drawLampshade(x, P.x - p * 260, topY - 56 - Math.sin(Math.PI * Math.min(1, p * 1.3)) * 150 + p * 260, 210, -p * 5, 0)
      }
      return
    }
    drawSag(t)
  }
  function phoneInset(t) {
    if (t < T.call || t >= T.cut3) return
    const k = pop01(t, T.call, 0.35, 2) * (1 - prog(t, T.scratch, T.scratch + 0.12))
    if (k <= 0.01) return
    x.save(); x.translate(INSET.x, INSET.y); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, INSET.r + 8, 0, TAU); x.fill()
    x.fillStyle = '#2a1f5a'; x.beginPath(); x.arc(0, 0, INSET.r, 0, TAU); x.fill()
    x.save(); x.beginPath(); x.arc(0, 0, INSET.r, 0, TAU); x.clip()
    const sob = t > T.l9 + 1.2 ? 3 : 2
    star({ x: 0, y: 26 }, 170, t, { color: PIS.color, glyph: null, mood: 'sparkle', look: [0, -1], hops: PIS_HOPS, seed: 12, glow: 0.5 },
      { overlay: F => inSprite(x, F, () => { tearsCells(x, t, sob); if (sob === 3) hankieCells(x, Math.floor(t * 4) % 2 ? 1 : -1) }) })
    x.restore()
    x.strokeStyle = CYAN; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, INSET.r, 0, TAU); x.stroke()
    // the little tail to the phone
    x.fillStyle = CYAN; x.beginPath(); x.moveTo(72, 82); x.lineTo(190, 210); x.lineTo(98, 66); x.fill()
    stroked('☎ PISCES', 0, INSET.r + 30, 26, CYAN, 7)
    x.restore()
  }
  function roomCast(t, nv) {
    drawCancer(t)
    if (!nv) lampSag(t)
    drawTable(x, TABLE.x, TABLE.y, TABLE.w, t, { shades: t >= T.shadesOff[1] ? 1 : 0 })
    // the shades fly from Sag's face onto the table
    if (inR(t, ...T.shadesOff)) {
      const p = prog(t, ...T.shadesOff), P = sagPos(t)
      const sx = lerp(P.x, TABLE.x + 140, p), sy = lerp(P.y - 70, TABLE.y - 14, p) - Math.sin(Math.PI * p) * 160
      x.save(); x.translate(sx, sy); x.rotate(p * TAU)
      spr(x, ['LLLL..LLLL', 'LLLLLLLLLL', 'LLLL..LLLL', '.LL....LL.'], 0, 0, 5, { L: '#120c24' }, { outline: BONE })
      x.restore()
    }
    drawBlanket(x, 565, 1203, 560, 92, ease.outCubic(prog(t, ...T.blanket)))
    if (!nv) phoneInset(t)
    // crickets while the target squints at the lamp
    for (const ch of T.chirps) popWord(t, ch, 'chirp.', ch === T.chirps[0] ? 470 : 330, ch === T.chirps[0] ? 960 : 880, 32, '#9cf08a', { dur: 0.7, rot: 0 })
    // drumroll
    if (inR(t, T.drum[0], T.drum[1])) { const s = 1 + 0.08 * Math.sin(t * 60); x.save(); x.translate(470, 960); x.scale(s, s); stroked('drrrrr…', 0, 0, 44, GOLD, 10); x.restore() }
    if (t >= T.scratch) popWord(t, T.scratch, 'SCRRRTCH', 330, 965, 36, RED, { dur: 0.9, rot: -0.12 })
    if (t >= T.l10) { const k = t - T.l10; if (k < 1.6 && Math.floor(k * 5) % 2 === 0) stroked('((( ))) ', SAG_LAMP.x + 70, SAG_LAMP.y - 30, 24, '#7dffb0', 6) }
    if (t >= T.heart) sparkleRing(t, CAN_COUCH.x, CAN_COUCH.y - 40, T.heart, 10, 150, 0.2, [PINK, '#ffd0e0', GOLD, BONE], 0.8)
  }

  // ═══════════════════════ 3 · night vision ═══════════════════════
  function nvFilter(t) {
    x.save()
    x.globalCompositeOperation = 'saturation'; x.fillStyle = '#808080'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'multiply'; x.fillStyle = '#5dff86'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'screen'; x.fillStyle = 'rgba(10,60,24,0.55)'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'source-over'
    // scanlines + noise + a rolling band
    x.fillStyle = 'rgba(0,0,0,0.22)'; for (let y = 0; y < H; y += 6) x.fillRect(0, y, W, 2)
    const r = rng(Math.floor(t * 24))
    x.fillStyle = 'rgba(170,255,190,0.18)'; for (let i = 0; i < 220; i++) x.fillRect(Math.floor(r() * W), Math.floor(r() * H), 3, 3)
    const by = ((t * 0.5) % 1) * H; x.fillStyle = 'rgba(150,255,170,0.06)'; x.fillRect(0, by, W, 120)
    x.restore()
    x.drawImage(mask, 0, 0)
    // HUD
    const ap = ease.inOutCubic(prog(t, ...T.aim))
    const TX = RC[3] + (CAN_COUCH.x - RC[1]) * RC[0], TY = RC[4] + (CAN_COUCH.y - 10 - RC[2]) * RC[0]
    const cx = lerp(380, TX, ap) + (ap < 1 ? Math.sin(t * 5) * 30 : 0), cy = lerp(780, TY, ap) + (ap < 1 ? Math.cos(t * 4) * 24 : 0)
    const locked = t >= T.lock, R = locked ? 120 - 30 * easeOutBack(prog(t, T.lock, T.lock + 0.25), 2) : 130
    const col = locked && Math.floor((t - T.lock) * 6) % 2 ? RED : NV
    x.strokeStyle = col; x.lineWidth = 5
    x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.stroke()
    for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { x.beginPath(); x.moveTo(cx + a * (R - 30), cy + b * (R - 30)); x.lineTo(cx + a * (R + 40), cy + b * (R + 40)); x.stroke() }
    x.fillStyle = col; x.fillRect(cx - 4, cy - 4, 8, 8)
    x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    if (Math.floor(t * 2) % 2) { x.fillStyle = RED; x.beginPath(); x.arc(150, 520, 12, 0, TAU); x.fill() }
    x.fillStyle = NV; x.fillText('REC  23:14:' + String(7 + Math.floor((t - T.nv[0]))).padStart(2, '0'), 175, 521)
    x.textAlign = 'right'; x.fillText('ZOOM ×' + (locked ? '12' : (4 + Math.floor(ap * 8))), 935, 521)
    if (locked) { x.textAlign = 'center'; x.font = `700 34px ${MONO}`; x.fillStyle = col; x.fillText('TARGET ACQUIRED', cx, cy - R - 44) }
    const HUD = ['ACTIVITY: SITTING', 'WEARING: SOCKS', 'THREAT LEVEL: ADORABLE']
    x.textAlign = 'left'; x.font = `700 36px ${MONO}`
    HUD.forEach((s, i) => {
      const k = t - T.hud[i]
      if (k < 0) return
      const n = Math.min(s.length, Math.floor(k * 55))
      x.fillStyle = i === 2 ? PINK : NV; x.fillText(s.slice(0, n) + (n < s.length ? '▌' : ''), 110, 1500 + i * 60)
    })
  }

  // ═══════════════════════ THE STARS + the talk card ═══════════════════════
  function narrator(t) {
    if (t < T.l13 - 0.25 || t > T.close6 + 0.3) return
    const k = pop01(t, T.l13 - 0.25, 0.36, 2.2) * (1 - prog(t, T.close6, T.close6 + 0.3))
    drawStarChar(x, 885, 975, 150, t, { alpha: x.globalAlpha, color: STAR.sky, mood: t < T.l13 + 1.4 ? 'happy' : 'wink', look: [-1, -1], hops: NAR_HOPS, seed: 21, pop: k })
  }
  function talkCard(t) {
    if (!TALK || t < T.card[0] || t > T.cardOut[1]) return
    const p = prog(t, ...T.card), e = ease.outCubic(p), o = ease.inCubic(prog(t, ...T.cardOut))
    const cx = lerp(1240, 540, e), cy = lerp(260, 835, e) - Math.sin(p * Math.PI) * 90 + Math.sin(t * 2) * 6 * e + o * 120
    const rot = lerp(1.5, -0.035, e) + 0.02 * Math.sin(t * 1.5) * e
    const wBody = 250 * (1 - 0.35 * o), w = wBody / TALK_BODY, h = w * TALK.height / TALK.width
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 380); gl.addColorStop(0, rgba(GOLD, 0.3 * e * (1 - o))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 380, cy - 380, 760, 760)
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(rot); x.drawImage(TALK, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(t, cx, cy, T.card[1] - 0.05, 12, 210, 0.4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t), sc = scene(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      const outA = 1 - prog(t, T.out[0], T.out[1])
      withCam(C, () => {
        x.globalAlpha = outA
        if (sc === 'hook' || sc === 'brief') hookSet(t, 1 - prog(t, T.setIn[0], T.setIn[1]))
        if (sc === 'hook') { rope(t); drawSag(t) }
        else if (sc === 'brief') { briefSet(t, C); rope(t); briefCast(t) }
        else if (sc === 'lab') { labSet(t); labCast(t) }
        else { roomSet(t); roomCast(t, sc === 'nv'); talkCard(t); narrator(t) }
        x.globalAlpha = 1
      })
      if (sc === 'nv') nvFilter(t)
      // a quick white flash on the hard cut out of night vision
      if (inR(t, T.room, T.room + 0.12)) { x.fillStyle = `rgba(230,255,235,${0.28 * (1 - (t - T.room) / 0.12)})`; x.fillRect(0, 0, W, H) }
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 12.75 (→ Q-branch), 23.1 (→ night vision), 34.5 (→ abort), 49.3 (→ the talk card). End card flips at 55.6.
export const CUTS = [4.6, T.cut1, 16.1, T.cut2, T.room, T.cut3, 38.2, T.cut4, 52.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them to Eb major = C minor's relative);
// brass / chip / lead / strings are written straight in C minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { C2: 65.41, G2: 98.0, C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.0, Ab3: 207.65, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.0, Ab4: 415.3, Bb4: 466.16, C5: 523.25, Eb5: 622.25, G5: 783.99 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const FX = (o = {}) => ({ rev: 0.1, dly: 0, bus: 'fx', ...o })
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', r3(t0 + d), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, ...FX() }])
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FX({ rev: 0 }) }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FX({ rev: 0 }) }]]
const stamp = t0 => [['tom', r3(t0 + 0.12), 90, { gain: 0.28, decay: 0.2, rev: 0.15, bus: 'fx' }], ['tick', r3(t0 + 0.12), 0.08], ['whoosh', r3(t0 - 0.05), 0.2, 0.04]]
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), low, { gain: 0.3, decay: 0.6, rev: 0.4, bus: 'fx' }]]
// helicopter rotor: soft noise chops
const rotor = (t0, t1, gain = 0.02, rate = 11) => { const out = []; for (let t = t0; t < t1; t += 1 / rate) out.push(['chip', r3(t), 140, 0.05, { wave: 'noise', gain: gain * (0.6 + 0.4 * clamp((t - t0) / 0.4)) * (1 - clamp((t - (t1 - 0.5)) / 0.5)), decay: 0.04, sustain: 0.2, ...FX({ rev: 0.05 }) }]); return out }
const fwCues = (t0, big = false) => [['riser', r3(t0 - 0.35), r3(t0), 0.03], ['boom', r3(t0), big ? 0.3 : 0.2], ['glitter', r3(t0 + 0.05), r3(t0 + 0.9)], ['chip', r3(t0 + 0.02), 2400, 0.5, { wave: 'noise', slide: -18, gain: 0.025, decay: 0.4, sustain: 0.3, ...FX({ rev: 0.3 }) }], ['bell', r3(t0 + 0.08), big ? 1760 : 1318.51, 0.022, 1.4, 0]]
const drumroll = (t0, t1) => { const out = []; let k = 0; for (let t = t0; t < t1; t += 0.045, k++) out.push(['snare', r3(t), { gain: 0.05 + 0.12 * (t - t0) / (t1 - t0), tone: 200, snappy: 0.9, decay: 0.08, rev: 0.15, bus: 'fx', pan: k % 2 ? 0.15 : -0.15 }]); return out }

export const CUES = [
  // 0 · cold open
  ['whoosh', 0.3, 0.9, 0.08], ['chip', 0.3, 1200, 1.0, { duty: 0.25, slide: -14, gain: 0.02, decay: 0.8, sustain: 0.4, ...FX({ rev: 0.2 }) }],
  ['pop', T.descend[1] - 0.1, 440, 0.04, 0], ...headCues(HEADS[0]),
  ['brass', BEAT(2), [N.C3, N.G3, N.C4, N.Eb4, N.G4], 1.2, { gain: 0.045, bright: 1.2, ...FXB }], ['tom', BEAT(2), 62, { gain: 0.3, decay: 0.7, rev: 0.4, bus: 'fx' }],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [AG]: 740, [CH]: 520, [YP]: 990, [NT]: 1046.5 } }),
  ['tick', T.unclip, 0.08], ['chip', T.unclip, 1800, 0.08, { duty: 0.25, gain: 0.03, decay: 0.05, sustain: 0.5, ...FX() }], ['whoosh', r3(T.unclip + 0.1), 0.55, 0.09],
  ['boom', T.land, 0.35], ['pop', r3(T.land + 0.02), 330, 0.06, 0], ['tom', T.land, 70, { gain: 0.32, decay: 0.5, rev: 0.3, bus: 'fx' }],
  ['bell', T.glint, 2349.3, 0.03, 1.0, -0.3], ['pop', T.glint, 1760, 0.025, -0.3],
  // 1 · briefing
  ['chip', T.setIn[0], 220, 0.5, { duty: 0.5, slide: 24, gain: 0.025, decay: 0.4, sustain: 0.5, ...FX({ rev: 0.2 }) }], ...[0, 0.07, 0.14].map(d => ['tick', r3(T.setIn[0] + 0.1 + d), 0.03]),
  ['pop', T.chiefIn, 392, 0.04, 0.3], ...headCues(HEADS[1]),
  ['whoosh', T.dossier[0], 0.4, 0.06], ['pop', T.dossier[1], 523.25, 0.04, -0.2], ...stamp(T.stamp - 0.12 + 0.12),
  ['chip', T.laser[0], 2600, 0.7, { wave: 'tri', vib: 0.01, gain: 0.018, decay: 0.6, sustain: 0.8, ...FX({ rev: 0.2 }) }],
  ['bell', T.pin, 1760, 0.03, 0.8, 0.3], ['bell', r3(T.pin + 0.83), 1760, 0.02, 0.8, 0.3],
  ['pop', T.pisCry, 659.25, 0.02, 0.1],
  ['bell', r3(T.sayLess + 0.05), 2349.3, 0.028, 1.0, -0.3], ['pop', T.sayLess, 880, 0.04, -0.3], ['pluck', r3(T.sayLess + 0.06), 1174.66, 0.03, 0.5, -0.3],
  // 2 · Q-branch
  ...headCues(HEADS[2]), ...headCues(HEADS[3]), ...headCues(HEADS[4]),
  ['whoosh', r3(T.heli[0] + 0.1), 0.6, 0.07], ...rotor(T.heli[0], T.cut2 - 0.1, 0.018), ['pop', T.heli[1], 294, 0.05, 0],
  ...stamp(T.booked), ['pluck', r3(T.booked + 0.15), 1174.66, 0.03, 0.5, 0.3],
  ...T.quartet.map((q, i) => ['pop', q, NOTE[i + 1], 0.035, (i - 1.5) * 0.3]),
  ['strings', T.strings[0], T.strings[1], [N.C4, N.Eb4, N.G4, N.C5], { gain: 0.02, attack: 0.15, release: 0.6, rev: 0.5, bus: 'fx' }],
  ['strings', r3(T.strings[0] + 1.1), T.strings[1], [N.Ab3, N.C4, N.Eb4, N.Ab4], { gain: 0.014, attack: 0.2, release: 0.6, rev: 0.5, bus: 'fx' }],
  ...fwCues(T.fw[0], true), ...fwCues(T.fw[1]), ...fwCues(T.fw[2]), ...fwCues(T.fw[3], true),
  ...sting(T.fw[0], [N.C3, N.G3, N.C4, N.Eb4, N.G4], 0.9, 0.045, 60),
  ['chip', T.budget[0], 300, 1.0, { duty: 0.5, slide: 24, gain: 0.02, decay: 0.9, sustain: 0.7, ...FX() }], ['chip', T.budget[1], 1600, 0.25, { duty: 0.25, gain: 0.03, decay: 0.2, sustain: 0.6, ...FX() }], ['chip', r3(T.budget[1] + 0.14), 1600, 0.25, { duty: 0.25, gain: 0.03, decay: 0.2, sustain: 0.6, ...FX() }],
  ['chip', T.faint[0], 660, 0.35, { wave: 'tri', slide: -24, gain: 0.05, decay: 0.3, sustain: 0.5, ...FX() }], ['tom', T.faint[1], 80, { gain: 0.34, decay: 0.3, rev: 0.2, bus: 'fx' }], ['boom', T.faint[1], 0.18],
  // 3 · night vision
  ['chip', T.nv[0], 400, 0.6, { wave: 'tri', slide: 30, gain: 0.03, decay: 0.5, sustain: 0.7, ...FX() }], ...headCues(HEADS[5]),
  ...[0, 0.3, 0.6, 0.85].map(d => ['chip', r3(T.aim[0] + d), 1320, 0.05, { duty: 0.25, gain: 0.02, decay: 0.04, sustain: 0.5, ...FX() }]),
  ...[0, 0.12, 0.24].map(d => ['chip', r3(T.lock + d), 1760, 0.08, { duty: 0.25, gain: 0.03, decay: 0.06, sustain: 0.6, ...FX() }]),
  ...T.hud.flatMap(h => [0, 0.08, 0.16, 0.24].map(d => ['tick', r3(h + d), 0.025])),
  ['chip', T.nv[0], 3000, 2.9, { wave: 'noise', gain: 0.006, decay: 2.5, sustain: 0.9, ...FX({ rev: 0 }) }],
  // 4 · the lamp
  ['tick', T.room, 0.09], ['pop', T.room, 523.25, 0.04, 0], ...headCues(HEADS[6]),
  ['chip', r3(T.look[0] + 0.1), 900, 0.12, { duty: 0.25, gain: 0.02, decay: 0.1, sustain: 0.5, ...FX() }],
  ...chirp(T.chirps[0], 0.4), ...chirp(T.chirps[1], -0.4), ['pop', T.look[1], 659.25, 0.025, 0.3],
  ['pop', T.call, 784, 0.035, -0.3], ...headCues(HEADS[7]),
  ...drumroll(T.drum[0], T.drum[1]),
  ...scratch(T.scratch), ['pop', r3(T.scratch + 0.05), 880, 0.04, -0.3], ['whoosh', r3(T.scratch + 0.08), 0.5, 0.07],
  ...sting(T.scratch + 0.35, [N.C3, N.F3, N.Ab3, N.C4], 0.7, 0.04, 66), ...headCues(HEADS[8]).filter(c => c[0] !== 'pluck'),
  // 5 · abort
  ...headCues(HEADS[9]),
  ...[0, 0.08].map(d => ['chip', r3(T.l10 - 0.15 + d), 2200, 0.05, { duty: 0.25, gain: 0.025, decay: 0.04, sustain: 0.5, ...FX() }]),
  ['chip', r3(T.l10 - 0.15), 3000, 0.25, { wave: 'noise', gain: 0.012, decay: 0.2, sustain: 0.5, ...FX() }],
  ...rotor(T.heliGo[0] - 0.3, T.heliGo[1] + 0.2, 0.012), ['whoosh', r3(T.heliGo[0] + 0.2), 0.8, 0.06],
  ...[0, 1, 2, 3].flatMap(i => [0, 0.18, 0.36].map(d => ['pluck', r3(T.qGo[0] + i * 0.18 + d + 0.1), NOTE[(i + 4) % 7] * (d ? 1 : 0.5), 0.02, 0.2, 0.3])),
  ['chip', T.pfft, 2000, 0.4, { wave: 'noise', slide: -30, gain: 0.03, decay: 0.3, sustain: 0.3, ...FX() }], ['pop', r3(T.pfft + 0.05), 220, 0.03, 0.3],
  ['whoosh', T.shadesOff[0], 0.35, 0.05], ['tick', T.shadesOff[1], 0.07], ['pop', T.shadesOff[1], 1318.51, 0.03, 0.2],
  ...headCues(HEADS[10]), ['whoosh', T.hop[0], 0.35, 0.05], ['tom', T.hop[1], 110, { gain: 0.22, decay: 0.2, rev: 0.15, bus: 'fx' }], ['pop', T.hop[1], 392, 0.035, -0.1],
  ['bell', T.heart, 1174.66, 0.03, 1.6, 0.2], ['glitter', T.heart, r3(T.heart + 0.6)], ['pluck', r3(T.heart + 0.12), 1479.98, 0.025, 0.8, 0.2],
  ['bell', r3(T.l12 + 0.4), 1760, 0.025, 1.4, 0.2],
  // 6 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Cm' }),
  // 7 · the talk card
  ['whoosh', r3(T.card[0] + 0.3), 0.45, 0.05], ['pop', T.card[1], 784, 0.04, 0], ['tick', T.card[1], 0.05], ['bell', r3(T.card[1] + 0.02), 1318.51, 0.03, 1.2, 0], ['glitter', r3(T.card[1] - 0.05), r3(T.card[1] + 0.5)],
  ['pop', r3(T.l13 - 0.25), 880, 0.035, 0.3], ...headCues(HEADS[11]),
  // 8 · mission: cozy
  ...headCues(HEADS[12]), ['whoosh', T.blanket[0], 0.4, 0.04], ['tom', T.blanket[1], 140, { gain: 0.12, decay: 0.2, rev: 0.2, bus: 'fx' }],
  ...rotor(T.heliBack[0], 55.3, 0.008), ['whoosh', r3(T.heliBack[0] + 0.1), 0.6, 0.04],
  ...fwCues(T.tinyFw).map(c => c[0] === 'boom' ? ['boom', c[1], 0.08] : c),
  ['strings', 53.2, 55.4, [N.C4, N.Eb4, N.G4, N.Bb4], { gain: 0.008, attack: 0.3, release: 0.8, rev: 0.5, bus: 'fx' }],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
