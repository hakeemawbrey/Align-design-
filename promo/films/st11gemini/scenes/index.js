// st11gemini (60 s vertical, Star Talk season 11 "Far Out", S11 E03: Gemini visits Castor) · story 0–55.6, then the
// shared end card. Kit: st11space.js.
//   0.00  HOOK  frame 0: "Gemini found out Castor is *six* stars." The ♊ star and THE TWIN (mustache) in suits on the
//               Houston pad, mid-hop, a stack of chat bubbles over Gemini (adult Gemini's 47 tabs). 3… 2… 1… liftoff.
//   3.40  WANT  In flight, two pilots in one porthole. GEMINI: a road trip to our *namesake*. THE TWIN: "castor *and*
//               pollux." Houston: SATURN: "say hi from houston, you two." GEMINI on the big screen: "hi castor!"
//  13.00  TRY   Castor from far off: one star. GEMINI: "you look so *lonely* out here." Zoom: it splits, 1 → 2 → 6, three
//               pairs dancing. "wait. there's *SIX* of you?!" The six all talk at once and Gemini, for once, can't get
//               a word in: "is this how it *feels*?" The ghost peeks out from behind the rocket. SATURN: "try *listening*."
//  30.00  TURN  ★ REAL SKY: Castor is a six-star system, three pairs of stars (the pairs orbit on a diagram). Then
//               Pollux: a single orange giant, and it has a planet. GEMINI: "so even our stars have *more* sides."
//  42.00  WIN   The reunion dance: Gemini and the Twin join in as a fourth pair. GEMINI, listening now: "twin… what's
//               *your* other side?" THE TWIN: "i like quiet. and i like *you*." The hug. The trip home; Houston cheers.
//  52.20  LAST  back on the pad (frame 0's pose; the bubble stack is down to one shared ♥): "Everyone's got *more* sides."
// Rewatch bait: the chat-bubble stack over Gemini (stargemini's 12 open chats) counts down 12 → 1 across the episode.
// Ghost: the stowaway, peeking out from behind the parked rocket while the six talk over Gemini.
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, lineTimes } from '../../startalk.js'
import { drawSeedConstellation } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn, drawTwin } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, DAY_FONTS } from '../../st9day.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawStarBall, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { drawPad, rect, box6, txt, pop01 } from './set.js'

export const DURATION = 60
const KEY = 'C'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c', CYAN = '#7fe0ff'
const GE = signStar('gemini')
const GEN = '♊ GEMINI', TWN = '♊ THE TWIN', CAS = '✦ CASTOR (ALL SIX)', SAT = '♄ SATURN · HOUSTON'
const MONO = "'Space Mono', ui-monospace, monospace"
const GEC = '#ffe27a', TWC = '#ffd0a0', CASC = '#cfe6ff'

const T = {
  hookOut: 2.9, cd: 0.9, cdStep: 0.7, launch: 3.0,
  fly: 3.4, hud: 3.6, mc: 8.6, arrive: 13.0, split: 17.0, chatter: 21.2, ghost: 25.4, turn: 30.0, chip1: 30.4,
  pollux: 35.5, chip2: 35.9, dance: 42.0, hug: 45.4, home: 47.8, cheer: 49.8, pad2: 52.2, last: 52.4, lastLand: 53.0, lastOut: [55.15, 55.55],
}
const LINES = [
  { t: 3.45, speaker: GEN, text: 'road trip! we’re visiting our *namesake*.', color: GEC },
  { t: 6.5, speaker: TWN, text: 'castor *and* pollux. the twins.', color: TWC },
  { t: 9.2, speaker: SAT, text: 'say hi from houston, you two.', color: '#f7dca0' },
  { t: 11.8, speaker: GEN, text: 'hi castor! it’s *us*!', color: GEC },
  { t: 14.4, speaker: GEN, text: 'aw. you look so *lonely* out here.', color: GEC },
  { t: 18.6, speaker: GEN, text: 'wait. there’s *SIX* of you?!', color: GEC },
  { t: 23.4, speaker: GEN, text: 'i can’t get a word in. is this how it *feels*?', color: GEC },
  { t: 26.9, speaker: SAT, text: 'gemini. try *listening*.', color: '#f7dca0' },
  { t: 39.4, speaker: GEN, text: 'so even our stars have *more* sides.', color: GEC },
  { t: 42.4, speaker: GEN, text: 'twin… what’s *your* other side?', color: GEC },
  { t: 45.2, speaker: TWN, text: 'i like quiet. and i like *you*.', color: TWC },
  { t: 50.1, speaker: SAT, text: 'houston copies. *all* eight of you.', color: '#f7dca0' },
]
const CPS = 30
const BOX_CLOSE = [{ a: 21.2, b: 23.3 }, { a: 29.45, b: 39.3 }]
const HOPS_GE = [0.0, 0.4, 0.8, 1.2, 1.6, 2.0, ...talkHops(LINES, GEN, { cps: CPS }), T.split + 1.4, T.pad2 + 0.2, T.pad2 + 0.9, T.pad2 + 1.6]
const HOPS_TW = [0.2, 0.6, 1.0, 1.4, 1.8, ...talkHops(LINES, TWN, { cps: CPS }), T.pad2 + 0.55, T.pad2 + 1.25]
const HOPS_SAT = talkHops(LINES, SAT, { cps: CPS })
const CHAT = [['hi!', -1], ['hey!!', 1], ['omg hi', -1], ['yo!', 1], ['hello!!', -1], ['sup', 1], ['we’re SIX', -1], ['hiii', 1], ['who r u', -1], ['twins?', 1], ['we love twins', -1], ['hi again!', 1]]

export const GHOST = { at: T.ghost, x: 900, y: 1250, where: 'the stowaway: peeking out from behind the parked rocket while Castor’s six stars talk over Gemini' }

// the six stars of Castor: three pairs, each pair spinning round its middle; the pairs circle the system's centre
function sixStars(t, cx, cy, spread = 1, open = 1) {
  const out = []
  const PAIRS = [{ a: 0, R: 150, r: 58, sp: 1.6, s: 1 }, { a: 2.4, R: 150, r: 52, sp: -1.9, s: 0.95 }, { a: 4.2, R: 260, r: 40, sp: 2.4, s: 0.7 }]
  PAIRS.forEach((P, pi) => {
    const pa = P.a + t * 0.25, px = cx + Math.cos(pa) * P.R * spread, py = cy + Math.sin(pa) * P.R * 0.7 * spread
    for (const s of [0, 1]) { const q = t * P.sp + s * Math.PI; out.push({ x: px + Math.cos(q) * P.r * open, y: py + Math.sin(q) * P.r * 0.55 * open, size: 170 * P.s, pair: pi, cx: px, cy: py }) }
  })
  return out
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...SPACE_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Gemini found out Castor is *six* stars.', at: 0, out: T.hookOut, top: 200, accentColor: GEC })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, cps: CPS, close: 52.0 })
  const last = popText(root, 'Everyone’s got | *more* sides.', { top: 300, size: 108, accentSize: 168, at: T.last, gap: 0.1, accentColor: GEC, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const boxRoot = box.root
  const boxVis = t => { if (BOX_CLOSE.some(w => t >= w.a && t < w.b)) boxRoot.style.opacity = '0' }

  // the chat-bubble stack over Gemini's head: n little pixel bubbles
  function stack(cx, top, n, t, heart = false) {
    for (let i = 0; i < n; i++) {
      const bx = cx - 60 + (i % 2) * 40 + Math.sin(t * 2 + i) * 4, by = top - 30 - i * 30
      box6(x, bx, by, 80, 22, i % 3 ? '#e9e4ff' : '#5fa8ff')
      if (heart) txt(x, '♥', bx + 40, by + 12, `700 22px ${MONO}`, '#ff5d73')
      else for (let k = 0; k < 3; k++) rect(x, bx + 14 + k * 20, by + 8, 8, 6, ((t * 3 + i + k) | 0) % 3 === 0 ? INK : 'rgba(27,18,54,0.45)')
    }
  }
  const pilots = (r, t) => { const [wx, wy] = r.window; const c = r.cell; rect(x, wx - 1.5 * c, wy - 1.5 * c, 1.5 * c, 3 * c, GE.color); rect(x, wx, wy - 1.5 * c, 1.5 * c, 3 * c, '#f2cf4a'); rect(x, wx - 1.1 * c, wy - 0.4 * c, c * 0.4, c * 0.8, INK); rect(x, wx + 0.7 * c, wy - 0.4 * c, c * 0.4, c * 0.8, INK); rect(x, wx + 0.3 * c, wy + 0.6 * c, c * 1.0, c * 0.3, INK) }
  const twinSuit = (cx, cy, size, t, o = {}) => drawSpaceSuit(x, cx, cy, size, t, { sign: 'gemini', star: drawTwin, ...o })

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      // ── HOOK: the pad
      if (t < T.fly) {
        const launched = t >= T.launch
        drawPad(x, t)
        drawRocket(x, 790, launched ? 1150 - 2400 * ease.inQuad(prog(t, T.launch, T.launch + 0.9)) : 1150, 520, t, { color: GE.color, flame: launched ? 1.3 : 0.3, shake: launched ? 6 : 2, smoke: launched ? 1 : 0.3, seed: 2 })
        if (!launched) {
          const r = drawSpaceSuit(x, 250, 1310, 230, t, { sign: 'gemini', mood: 'happy', hops: HOPS_GE, seed: 3, look: [1, 0] })
          twinSuit(560, 1320, 210, t, { mood: 'wink', hops: HOPS_TW, seed: 7, look: [-1, 0] })
          stack(r.x, r.top - 40, 12, t)
        }
        drawCountdown(x, t, { at: T.cd, step: T.cdStep, x: 540, y: 820, size: 200 })
      }
      // ── WANT: the flight, two pilots in one porthole
      else if (t < T.mc) {
        starfield(x, t, { speed: 2.4, dim: 0.3 })
        const k = ease.outCubic(prog(t, T.fly, T.fly + 0.6))
        const r = drawRocket(x, 540, lerp(1500, 1020, k), 520, t, { color: GE.color, flame: 1, shake: 2, trail: 1, seed: 2, rot: Math.sin(t * 1.5) * 0.06 })
        pilots(r, t)
        missionHUD(x, t, { mission: 'MISSION 03', target: 'Castor · ♊ Gemini', status: 'chatty', at: T.hud })
      }
      // ── WANT: Houston
      else if (t < T.arrive) {
        const live = (cx, rc, tt) => { starfield(cx, tt, { speed: 2 }); drawSpaceSuit(cx, rc.x + rc.w / 2 - 130, rc.y + rc.h / 2 + 30, 260, tt, { sign: 'gemini', mood: 'happy', hops: HOPS_GE, seed: 3 }); drawSpaceSuit(cx, rc.x + rc.w / 2 + 160, rc.y + rc.h / 2 + 40, 230, tt, { sign: 'gemini', star: drawTwin, mood: 'wink', hops: HOPS_TW, seed: 7 }); txt(cx, '● LIVE · MISSION 03', rc.x + 30, rc.y + 40, `700 26px ${MONO}`, '#ff5d6a', 'left') }
        const M = drawMissionControl(x, t, { mission: 'MISSION 03', screens: { big: live } })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'happy', hops: HOPS_SAT, look: [0, -1] })
      }
      // ── TRY: one lonely star … six
      else if (t < T.turn) {
        starfield(x, t, { speed: 0.12, dim: 0.4 })
        const z = ease.inOutCubic(prog(t, T.split, T.split + 1.6))          // the zoom that splits it
        const cx = 540, cy = 720
        if (z < 0.02) drawStarBall(x, cx, cy, 90, t, { color: '#e6f2ff', corona: 0.8 })
        else {
          const S6 = sixStars(t, cx, cy, z, clamp(z * 1.5))
          S6.forEach((s, i) => drawStarChar(x, s.x, s.y, s.size * lerp(0.5, 1, z), t, { color: s.pair === 2 ? '#ffd0c0' : '#e6f2ff', mood: t > T.chatter ? (i % 2 ? 'happy' : 'wink') : 'happy', seed: 20 + i, hops: t > T.chatter ? [T.chatter + i * 0.4, T.chatter + 2 + i * 0.4, T.chatter + 4 + i * 0.3] : [T.split + 1.6 + i * 0.1], glow: 0.9, tips: false }))
          if (t > T.chatter) CHAT.forEach(([s, side], i) => { const st = S6[i % 6]; const at = T.chatter + i * 0.45; speechBubble(x, t, { text: s, at, out: Math.min(at + 1.6, 28.8), x: st.x, y: st.y - st.size * 0.45, size: 30, w: 260, side: side * 0.4 }) })
        }
        const rk = ease.outCubic(prog(t, T.arrive, T.arrive + 0.9))
        const r = drawRocket(x, lerp(540, 880, rk), lerp(1700, 1270, rk), 280, t, { color: GE.color, flame: 1 - rk * 0.9, rot: 0.25 * rk, seed: 2, stowaway: pop01(t, T.ghost, 0.4, 1.4) * (1 - ease.inCubic(prog(t, T.ghost + 1.3, T.ghost + 1.6))) })
        void r
        const mood = t < T.split ? 'sparkle' : t < T.chatter ? 'wide' : t < 23.3 ? 'squint' : t < 26.9 ? 'wide' : 'neutral'
        const g = drawSpaceSuit(x, 330, 1220, 220, t, { sign: 'gemini', mood, hops: HOPS_GE, seed: 3, pop: pop01(t, T.arrive + 0.7, 0.3, 2), look: [1, -1] })
        twinSuit(580, 1250, 190, t, { mood: t < T.split ? 'happy' : t < T.chatter ? 'wide' : 'sleepy', hops: HOPS_TW, seed: 7, pop: pop01(t, T.arrive + 0.9, 0.3, 2), look: [1, -1] })
        stack(g.x, g.top - 40, t < T.chatter ? 9 : 7, t)
        // Gemini's own tiny tries, swallowed by the chatter
        if (t > T.chatter + 0.8) ['i—', 'so—', 'can i—'].forEach((s, i) => speechBubble(x, t, { text: s, at: T.chatter + 0.8 + i * 0.6, out: T.chatter + 1.4 + i * 0.6, x: g.x + 40, y: g.top - 10, size: 26, w: 160 }))
        missionHUD(x, t, { mission: 'MISSION 03', target: 'Castor · ♊ Gemini', status: t < T.split ? 'arrived · 1 star?' : 'stars: 6 (!!)' })
      }
      // ── TURN: the six-star diagram, then Pollux
      else if (t < T.dance) {
        starfield(x, t, { speed: 0.08, dim: 0.5 })
        if (t < T.pollux) {
          const k = pop01(t, T.turn + 0.2, 0.4, 1.6)
          const S6 = sixStars(t * 0.7, 540, 820, k * 1.35, 1.3)
          ;[0, 1, 2].forEach(pi => { const s = S6[pi * 2]; x.save(); x.setLineDash([8, 8]); x.strokeStyle = 'rgba(127,224,255,0.6)'; x.lineWidth = 3; x.beginPath(); x.ellipse(s.cx, s.cy, [58, 52, 40][pi] + 6, ([58, 52, 40][pi] + 6) * 0.55, 0, 0, Math.PI * 2); x.stroke(); x.restore(); txt(x, `PAIR ${"ABC"[pi]}`, s.cx, s.cy + 135, `700 24px ${MONO}`, CYAN) })
          S6.forEach((s, i) => drawStarChar(x, s.x, s.y, s.size * 0.8, t, { color: s.pair === 2 ? '#ffd0c0' : '#e6f2ff', mood: 'happy', seed: 20 + i, glow: 0.8, tips: false }))
          factChip(x, t, { label: '★ REAL SKY', text: 'Castor is a six-star system: three pairs of stars.', at: T.chip1, dur: 4.4, x: 540, y: 1260, color: CYAN })
          txt(x, 'CASTOR = 3 PAIRS = 6 STARS', 540, 470, `700 36px ${MONO}`, GOLD)
        } else {
          const k = pop01(t, T.pollux, 0.4, 1.6)
          drawStarBall(x, 540, 760, 200, t, { color: '#ffa04a', face: t < 37.5 ? 'neutral' : 'happy', pop: k })
          const a = (t - T.pollux) * 1.4
          const px = 540 + Math.cos(a) * 330, py = 760 + Math.sin(a) * 110
          if (Math.sin(a) > 0 || true) drawPlanet(x, px, py, 52, t, { kind: 'jupiter', face: 'happy', pop: k })
          txt(x, 'POLLUX + ITS PLANET', 540, 470, `700 36px ${MONO}`, GOLD)
          factChip(x, t, { label: '★ REAL SKY', text: 'Pollux is a single orange giant. And it has a planet.', at: T.chip2, dur: 3.2, x: 540, y: 1260, color: '#ffc08a' })
          if (t > 39.0) { drawSpaceSuit(x, 380, 1240, 200, t, { sign: 'gemini', mood: 'sparkle', hops: HOPS_GE, seed: 3, pop: pop01(t, 39.0, 0.3, 2) }); twinSuit(680, 1260, 180, t, { mood: 'happy', hops: HOPS_TW, seed: 7, pop: pop01(t, 39.1, 0.3, 2) }) }
        }
      }
      // ── WIN: the reunion dance, the question, the hug
      else if (t < T.home) {
        starfield(x, t, { speed: 0.12, dim: 0.4 })
        const S6 = sixStars(t, 540, 640, 1.05, 1)
        S6.forEach((s, i) => drawStarChar(x, s.x, s.y, s.size * 0.8, t, { color: s.pair === 2 ? '#ffd0c0' : '#e6f2ff', mood: t > T.hug ? 'heart' : 'happy', seed: 20 + i, glow: 0.8, tips: false, hops: [T.dance + 0.2 + i * 0.1, T.dance + 1.4 + i * 0.1] }))
        // the fourth pair: Gemini and the Twin, spinning round each other below (they slow and hug at T.hug)
        const hug = ease.inOutCubic(prog(t, T.hug, T.hug + 0.7))
        const q = (t - T.dance) * lerp(1.6, 0, hug) + 0.4, rr = lerp(150, 95, hug)
        const gxp = 540 + Math.cos(q) * rr, gyp = 1180 + Math.sin(q) * rr * 0.4
        const txp = 540 - Math.cos(q) * rr, typ = 1180 - Math.sin(q) * rr * 0.4
        const r1 = drawSpaceSuit(x, gxp, gyp, 220, t, { sign: 'gemini', mood: t > T.hug ? 'heart' : t > 44.5 ? 'neutral' : 'happy', hops: HOPS_GE, seed: 3, look: [Math.sign(txp - gxp), 0] })
        twinSuit(txp, typ, 200, t, { mood: t > T.hug ? 'heart' : t > 44.5 ? 'sleepy' : 'happy', hops: HOPS_TW, seed: 7, look: [Math.sign(gxp - txp), 0] })
        stack(r1.x, r1.top - 40, t < T.hug ? 3 : 2, t)
        txt(x, 'PAIR D', 540, 1340, `700 24px ${MONO}`, CYAN)
        if (t > T.hug + 0.6) for (let k = 0; k < 6; k++) { const p = ((t - T.hug) * 0.6 + k / 6) % 1; txt(x, '♥', 540 + Math.sin(k * 2.3) * 120, 1080 - p * 260, `700 ${28 + k * 3}px ${MONO}`, `rgba(255,93,115,${1 - p})`) }
      }
      // ── WIN: home
      else if (t < T.cheer) {
        starfield(x, t, { speed: 2.4, dim: 0.3 })
        const p = prog(t, T.home, T.cheer)
        drawPlanet(x, 420, lerp(-150, 470, p), lerp(110, 200, p), t, { kind: 'earth', glow: 0.6 })
        const r = drawRocket(x, 600, 1180, 460, t, { color: GE.color, flame: 0.9, trail: 1, seed: 2 })
        pilots(r, t)
        missionHUD(x, t, { mission: 'MISSION 03', target: 'home · Houston', status: 'listening', at: T.home + 0.2 })
      }
      // ── WIN: Houston cheers (the dance on the big screen)
      else if (t < T.pad2) {
        const scr = (cx, rc, tt) => { const S6 = sixStars(tt, rc.x + rc.w / 2, rc.y + rc.h / 2 - 20, 0.75, 0.8); S6.forEach((s, i) => drawStarChar(cx, s.x, s.y, s.size * 0.6, tt, { color: '#e6f2ff', mood: 'happy', seed: 20 + i, tips: false, glow: 0.5 })); drawStarChar(cx, rc.x + rc.w / 2 - 50, rc.y + rc.h - 110, 110, tt, { ...GE, mood: 'heart', seed: 3 }); drawTwin(cx, rc.x + rc.w / 2 + 60, rc.y + rc.h - 110, 100, tt, { mood: 'heart', seed: 7 }) }
        const M = drawMissionControl(x, t, { mission: 'MISSION 03', screens: { big: scr, text: 'REUNION · 4 PAIRS' }, cheer: 1, cheerAt: T.cheer })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'happy', hops: [T.cheer + 0.1, ...HOPS_SAT] })
      }
      // ── LAST: back on the pad
      else {
        drawPad(x, t)
        drawRocket(x, 790, 1150, 520, t, { color: GE.color, flame: 0, seed: 2 })
        const r = drawSpaceSuit(x, 250, 1310, 230, t, { sign: 'gemini', mood: 'happy', hops: HOPS_GE, seed: 3, look: [1, 0] })
        twinSuit(560, 1320, 210, t, { mood: 'heart', hops: HOPS_TW, seed: 7, look: [-1, 0] })
        stack(r.x, r.top - 40, 1, t, true)
      }
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      hook.update(t)
      box.update(t); boxVis(t)
      last.update(t, 1 - ease.inQuad(prog(t, T.lastOut[0], T.lastOut[1])))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.turn, kind: 'flip' }, { t: T.pad2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E03' }), cardCuts(CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...countdownCues(T.cd, { step: T.cdStep }),
  ...launchCues(T.launch, { len: 1.4 }),
  ['whoosh', T.fly, 0.5, 0.05], ['pop', T.hud, 1318.51, 0.03, 0.3], ['whoosh', T.mc, 0.4, 0.04],
  ...warpCues(T.arrive, { len: 1.0 }),
  ['riser', T.split - 0.4, T.split + 1.2, 0.05], ['boom', T.split + 1.6, 0.3], ['glitter', T.split + 1.6, T.split + 2.6],
  ...CHAT.map((_, i) => ['pop', +(T.chatter + i * 0.45).toFixed(2), [880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98][i % 6], 0.025, (i % 2 ? 0.3 : -0.3)]),
  ['tick', T.ghost + 0.1, 0.02],
  ['whoosh', T.turn, 0.5, 0.05], ...factChipCues(T.chip1, { dur: 4.4 }),
  ['whoosh', T.pollux, 0.5, 0.04], ...factChipCues(T.chip2, { dur: 3.2 }),
  ['glitter', T.dance, T.dance + 1.2], ['bell', T.hug + 0.3, 1318.51, 0.03, 2, 0], ['bell', T.hug + 0.5, 1567.98, 0.025, 2, 0.2],
  ['whoosh', T.home, 0.6, 0.05],
  ...cheerCues(T.cheer, { len: 2 }),
  ['whoosh', T.pad2, 0.4, 0.04],
  ['pop', T.last, 659.25, 0.03, 0], ['pop', T.last + 0.1, 783.99, 0.03, 0], ['pop', T.lastLand, 987.77, 0.045, 0], ['bell', T.lastLand, 1318.51, 0.03, 1.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GEN]: 900, [TWN]: 700, [SAT]: 300 }, gain: 0.014 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void speechCues
export const _times = () => lineTimes(LINES, { cps: CPS })
export const _hides = () => BOX_CLOSE
