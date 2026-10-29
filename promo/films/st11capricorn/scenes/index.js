// st11capricorn (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E10) · story 0–55.6, then the end card.
//   "Capricorn is visiting its *boss*."  A mission to Saturn, Capricorn's ruler. Saturn's rings are mostly water ice, and
//   Saturn is less dense than water: it would float in a big enough bathtub. At home at last, the strict planet relaxes.
//   0.00  Frame 0: the launch pad. Capricorn, suited up with a tie over the suit and a fat binder ("5-YEAR PLAN"), mid-
//         salute on the gantry walkway. Hook card. HUD: MISSION 10 · SATURN (YOUR RULER).
//   1.20  3 · 2 · 1 …  4.20 LIFTOFF.
//   6.50  Houston Mission Control: Saturn's flight-director chair is empty (a note: OUT OF OFFICE, and a rubber duck:
//         the rewatch bait). THE MOON (covering): "Houston here. Saturn left a note: *out of office.*"
//  10.30  Capricorn on the feed: "then i'll take the report *to* Saturn."  (WANT)
//  12.00  The cockpit: the binder on the dash, the tie floating up in zero g. "slide one: *quarterly goals.*"
//  16.00  Saturn, huge, leaning back on its own rings in sunglasses. "boss! i brought the *five-year plan.*"
//         SATURN: "shh. i'm *off* today."  Capricorn inspects the rings with a clipboard: "they're… *messy.*"
//  25.20  BONK: an ice chunk. It tumbles. "ow. is that… *ice?*"  (TRY)
//  28.00  ★ REAL SKY: Saturn's rings are mostly water ice. SATURN: "mostly ice. and i'm *lighter* than i look."
//  33.00  Cutaway: Saturn floating in a giant clawfoot bathtub with a rubber duck. ★ REAL SKY: less dense than water:
//         in a big enough bathtub, it would float. (TURN)  "the strictest planet i know… *floats?*"
//  42.50  SATURN: "rest is part of the job. *grab a ring.*"  The tie comes off (it stays in Saturn's orbit) and they
//         ring-surf together. "WHEEE— i mean. *acceptable.*"  (WIN)
//  47.00  The warp home (a beach towel on the seat) · 47.8 Mission Control cheers: DAY OFF · COMPLETE.
//  49.00  The pad, frame 0's framing: Cancer runs up, a hug. CANCER: "you’re *back!* and… relaxed?" The planner falls
//         open on FRI: FREE (the season-4 / season-9 free Friday). Capricorn salutes again, in sunglasses.
//  52.20  LAST: "Even Saturn takes | a *day off.*"   55.6 end card.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSaturn, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { whip, whipCues, popIn } from '../../st9saghome.js'
import { R, drawPad, cockpit, seatBack, seatFront, confetti, hearts } from '../../st11sag/kit.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'

export const DURATION = 60
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff5d73', MINT = '#7dffb8', ICE = '#bfe8ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAP = signStar('capricorn'), CAN = signStar('cancer')
const CAPT = '♑ CAPRICORN', SATT = '♄ SATURN', MOONT = '☾ THE MOON', CANT = '♋ CANCER'

const T = {
  hookOut: 2.9, count: 1.2, lift: 3.9, mc: 6.5, feed: 9.8, cockpit: 12.0, arrive: 16.0,
  inspect: 22.2, bonk: 25.2, tumble: [25.2, 26.6], fact1: 28.0, tub: 33.0, fact2: 33.3, back: 39.2,
  tieOff: 43.2, surf: [43.6, 47.0], home: 47.0, cheer: 47.8, pad: 49.0, hug: 49.15, planner: 50.6, last: 52.2,
  boxOpen: 6.6, boxClose: 51.75, out: [55.0, 55.45], ghost: 13.6,
}
const LINES = [
  { t: 6.8, speaker: MOONT, text: 'Houston here. Saturn left a note: *out of office.*', color: '#c9c0ff' },
  { t: 10.3, speaker: CAPT, text: 'then i’ll take the report *to* Saturn.', color: CAP.color },
  { t: 13.3, speaker: CAPT, text: 'slide one: *quarterly goals.*', color: CAP.color },
  { t: 16.9, speaker: CAPT, text: 'boss! i brought the *five-year plan.*', color: CAP.color },
  { t: 19.8, speaker: SATT, text: 'shh. i’m *off* today.', color: '#e9c37a' },
  { t: T.inspect, speaker: CAPT, text: 'then i’ll inspect the rings. they’re… *messy.*', color: CAP.color },
  { t: 26.0, speaker: CAPT, text: 'ow. is that… *ice?*', color: CAP.color },
  { t: 28.6, speaker: SATT, text: 'mostly ice. and i’m *lighter* than i look.', color: '#e9c37a' },
  { t: T.back, speaker: CAPT, text: 'the strictest planet i know… *floats?*', color: CAP.color },
  { t: 42.5, speaker: SATT, text: 'rest is part of the job. *grab a ring.*', color: '#e9c37a' },
  { t: 45.6, speaker: CAPT, text: 'WHEEE— i mean. *acceptable.*', color: CAP.color },
  { t: T.hug + 0.05, speaker: CANT, text: 'you’re *back!* and… relaxed?', color: CAN.color },
]
const CPS = 28
const FACT1 = { at: T.fact1, dur: 3.6, label: '★ REAL SKY', text: 'Saturn’s rings are mostly water ice.', y: 1160 }
const FACT2 = { at: T.fact2, dur: 5.6, label: '★ REAL SKY', text: 'Saturn is less dense than water: in a big enough bathtub, it would float.', y: 1240 }
const HOOK = 'Capricorn is visiting | its *boss.*'
const LAST = 'Even Saturn takes | a *day off.*'
export const GHOST = { at: T.ghost, x: 910, y: 1120, from: 'right', where: 'stowaway: leaning out from behind the cockpit’s right window strut, over the binder on the dash' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inn = (t, a, b) => t >= a && t < b

function hudState(t) {
  const status = t < T.lift ? 'FUELING' : t < T.cockpit ? 'LIFTOFF' : t < T.arrive ? 'CRUISING' : t < T.tieOff ? 'IN ORBIT' : t < T.home ? 'DAY OFF' : t < T.pad ? 'HEADING HOME' : 'HOME'
  return { mission: 'MISSION 10', target: 'SATURN · YOUR RULER', status }
}

// ── props
/** the tie (worn over the suit; or loose, floating) */
function tie(x, cx, cy, s, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -14, -4, 28, 18); R(x, '#c23a4a', -10, -1, 20, 12)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-16, 12); x.lineTo(16, 12); x.lineTo(22, 70); x.lineTo(0, 92); x.lineTo(-22, 70); x.closePath(); x.fill()
  x.fillStyle = '#e04a5c'; x.beginPath(); x.moveTo(-11, 15); x.lineTo(11, 15); x.lineTo(16, 68); x.lineTo(0, 84); x.lineTo(-16, 68); x.closePath(); x.fill()
  R(x, '#ff8a96', -6, 30, 12, 6); R(x, '#ff8a96', -9, 52, 18, 6)
  x.restore()
}
/** the 5-YEAR PLAN binder */
function binder(x, cx, cy, s, rot = 0, label = '5-YEAR PLAN') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -70, -90, 140, 180); R(x, '#2f6f5c', -64, -84, 128, 168); R(x, '#4fa88a', -64, -84, 128, 10)
  R(x, BONE, -48, -50, 96, 46); x.font = `800 15px Inter`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(label.split(' ')[0], 0, -32); x.fillText(label.split(' ').slice(1).join(' '), 0, -13)
  for (let i = 0; i < 3; i++) R(x, '#c9c0dc', -64, -60 + i * 60, 10, 18)
  R(x, '#efe6d6', 64, -80, 8, 160)
  x.textAlign = 'left'; x.restore()
}
/** sunglasses on a drawSaturn face */
function shades(x, cx, cy, size, rot = -0.18) {
  const k = size / 208
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -46, -22, 92, 8)
  for (const s of [-1, 1]) { R(x, INK, s * 26 - 22, -18, 44, 28); R(x, '#2a2448', s * 26 - 18, -14, 36, 20); R(x, '#8a7fd0', s * 26 - 14, -12, 10, 6) }
  x.restore()
}
/** a point on drawSaturn's ring ellipse (a = angle), in canvas space */
function ringPt(cx, cy, size, a, rot = -0.18) {
  const rx = Math.cos(a) * size * 0.5, ry = Math.sin(a) * size * 0.115
  return { x: cx + rx * Math.cos(rot) - ry * Math.sin(rot), y: cy + rx * Math.sin(rot) + ry * Math.cos(rot), front: Math.sin(a) > 0 }
}
const CHUNK = (x, cx, cy, c, t, seed) => {
  const w = 3 + (seed % 3), h = 2 + (seed % 2)
  x.save(); x.translate(cx, cy); x.rotate(t * (0.6 + (seed % 5) * 0.2) + seed)
  R(x, INK, -w * c / 2 - 3, -h * c / 2 - 3, w * c + 6, h * c + 6); R(x, ICE, -w * c / 2, -h * c / 2, w * c, h * c); R(x, '#ffffff', -w * c / 2, -h * c / 2, c, c)
  x.restore()
}
/** the bathtub cutaway */
function bathtub(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  // tiles
  R(x, '#1d2a4a', 0, 0, 1080, 1920)
  for (let y = 420; y < 1500; y += 90) for (let i = 0; i < 13; i++) R(x, (i + y / 90) % 2 ? '#24345a' : '#1f2e52', i * 90, y, 86, 86)
  R(x, '#2c2048', 0, 1440, 1080, 480)
  // the tub
  const cx = 540, top = 900
  for (const fx of [250, 830]) { R(x, INK, fx - 26, 1300, 52, 120); R(x, GOLD, fx - 18, 1300, 36, 108) }
  x.fillStyle = INK; x.beginPath(); x.moveTo(110, top - 10); x.lineTo(970, top - 10); x.quadraticCurveTo(960, 1330, 760, 1340); x.lineTo(320, 1340); x.quadraticCurveTo(120, 1330, 110, top - 10); x.fill()
  x.fillStyle = '#f4f0ff'; x.beginPath(); x.moveTo(126, top); x.lineTo(954, top); x.quadraticCurveTo(944, 1316, 760, 1324); x.lineTo(320, 1324); x.quadraticCurveTo(136, 1316, 126, top); x.fill()
  R(x, '#ffffff', 150, top + 20, 18, 220)
  // water + bubbles (drawn after Saturn, as a front lip)
  x.restore()
  return { cx, waterY: top + 30 }
}
function bathFront(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  const top = 930
  x.fillStyle = 'rgba(120,200,255,0.55)'; x.fillRect(130, top + Math.sin(t * 2) * 4, 820, 30)
  x.fillStyle = 'rgba(255,255,255,0.9)'
  for (let i = 0; i < 16; i++) { const bx = 150 + (i * 53) % 780, by = top - 14 - ((t * 30 + i * 17) % 50), r = 8 + (i % 4) * 5; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  R(x, INK, 110, top + 20, 860, 14); R(x, '#f4f0ff', 120, top + 22, 840, 10)
  x.restore()
}
const DUCK = ['..YYY...', '.YYYYY..', '.YYeYYOO', '.YYYYYOO', 'YYYYYYY.', 'YYYYYYYY', '.YYYYYY.']
function duck(x, cx, cy, cell, t, bob = true) {
  const dy = bob ? Math.sin(t * 2.6) * cell : 0
  for (let r = 0; r < DUCK.length; r++) for (let c = 0; c < DUCK[r].length; c++) {
    const ch = DUCK[r][c]; if (ch === '.') continue
    R(x, ch === 'Y' ? '#ffd23a' : ch === 'O' ? '#ff8a2a' : INK, cx + (c - 4) * cell, cy + (r - 3) * cell + dy, cell, cell)
  }
}
/** the out-of-office note on Saturn's empty chair */
function emptyChair(x, t, cx, cy) {
  R(x, INK, cx - 80, cy - 150, 160, 190); R(x, '#3a3358', cx - 72, cy - 142, 144, 176)
  R(x, INK, cx - 100, cy + 30, 200, 36); R(x, '#4a4266', cx - 94, cy + 34, 188, 26)
  R(x, INK, cx - 8, cy + 66, 16, 70); R(x, INK, cx - 60, cy + 130, 120, 12)
  x.save(); x.translate(cx, cy - 70); x.rotate(-0.06)
  R(x, INK, -70, -44, 140, 88); R(x, '#fff3a0', -64, -38, 128, 76)
  x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('OUT OF', 0, -6); x.fillText('OFFICE ♄', 0, 22); x.textAlign = 'left'
  x.restore()
  duck(x, cx + 50, cy + 10, 6, t, false)                      // the rewatch bait: Saturn's rubber duck
}
/** the planner page: FRI · FREE */
function planner(x, t, cx, cy, k) {
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  R(x, INK, -150, -100, 300, 200); R(x, BONE, -142, -92, 284, 184)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#6a6290'
  const days = ['MON', 'TUE', 'WED', 'THU']
  days.forEach((d, i) => { x.fillText(d, -126, -56 + i * 30); R(x, '#c9c0dc', -60, -66 + i * 30, 180, 12) })
  R(x, '#ffe27a', -136, 56, 272, 36)
  x.font = `800 26px Inter`; x.fillStyle = INK; x.fillText('FRI · FREE ☀', -120, 84)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 230px 'Space Mono'", "800 26px Inter", "800 15px Inter", "600 34px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, size: 104, accentSize: 160, top: 300, accentColor: CAP.color })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 280, open: T.boxOpen, close: T.boxClose, cps: CPS })
  const last = popText(root, LAST, { top: 320, size: 104, accentSize: 170, at: T.last, gap: 0.09, accentColor: CAP.color, wobble: true, late: 2, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const CAP_HOPS = talkHops(LINES, CAPT, { cps: CPS })
  const SAT_HOPS = talkHops(LINES, SATT, { cps: CPS })
  const MOON_HOPS = [...talkHops(LINES, MOONT, { cps: CPS }), T.cheer + 0.1, T.cheer + 0.6]
  const CAN_HOPS = [...talkHops(LINES, CANT, { cps: CPS }), T.hug]
  const SAT0 = { x: 600, y: 820, size: 820 }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const shk = t > T.lift && t < T.lift + 1.6 ? Math.sin(t * 70) * 8 * (1 - prog(t, T.lift, T.lift + 1.6)) : 0
      const z = gaspZoom(t, { at: T.bonk, dur: 1.3, x: 300, y: 1080, amount: 0.3, follow: 0.5 })
      x.save(); x.translate(shk, 0)

      if (t < T.mc || t >= T.pad) {
        // ── THE PAD
        const end = t >= T.pad
        drawPad(x, t)
        const climb = end ? 0 : ease.inQuad(prog(t, T.lift, T.mc)) * 1700
        const smk = end ? 0.5 * (1 - prog(t, T.pad, T.pad + 2.5)) : clamp((t - T.lift + 0.6) / 0.5) * (1 - prog(t, T.lift + 1.4, T.mc))
        drawRocket(x, 540, 1130 - climb, 640, t, { color: CAP.color, flame: !end && t >= T.lift - 0.4 ? 1.3 * clamp((t - T.lift + 0.4) / 0.4) : 0, shake: !end && t > T.lift - 0.8 ? 4 : 0, smoke: smk, pilot: !end && t > 3.9 ? CAP.color : null })
        if (!end) {
          const inside = prog(t, 3.5, 3.9)
          if (inside < 1) {
            const sx = lerp(740, 690, prog(t, 0, 3.5))
            x.save(); x.globalAlpha = 1 - inside
            binder(x, sx + 82, 1100, 0.6, 0.12)
            const r = drawSpaceSuit(x, sx, 1085, 190, t, { sign: 'capricorn', helmet: true, mood: t < 2.4 ? 'squint' : 'wide', look: [-1, -0.4], hops: [0.7] })
            tie(x, r.x, r.y + 26, 0.55)
            x.restore()
          }
          drawCountdown(x, t, { at: T.count, x: 540, y: 670, size: 190 })
        } else {
          const hk = ease.outCubic(prog(t, T.hug - 0.25, T.hug + 0.2))
          const apart = ease.inOutCubic(prog(t, T.hug + 0.9, T.hug + 1.5)), sx = lerp(710, 740, hk) - 30 * apart, cx = lerp(960, 870, hk) + 50 * apart
          const r = drawSpaceSuit(x, sx, 1075, 215, t, { sign: 'capricorn', helmet: false, mood: 'happy', look: [1, 0], squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, hops: [T.planner, T.last + 0.4] })
          shades(x, r.x, r.y - 12, 170, 0)
          drawStarChar(x, cx, 1085, 195, t, { color: CAN.color, glyph: CAN.glyph, mood: t < T.planner ? 'happy' : 'heart', look: [-1, 0], hops: CAN_HOPS, squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, seed: 9 })
          hearts(x, t, 740, 950, T.hug, T.planner)
          planner(x, t, 560, 800, popIn(t, T.planner, 0.4, 2.2) * outK(t, [T.last - 0.3, T.last]))
        }
      } else if (t < T.cockpit || inn(t, T.cheer, T.pad)) {
        // ── MISSION CONTROL
        const cheer = t >= T.cheer
        const feed = (c, rc, tt) => {
          starfield(c, tt, { speed: 0.6 })
          const fk = popIn(tt, T.feed, 0.35, 2.2)
          if (fk > 0.02) {
            const r = drawSpaceSuit(c, rc.x + rc.w / 2, rc.y + rc.h / 2 + 40, 300 * fk, tt, { sign: 'capricorn', helmet: true, mood: 'squint', look: [0, 0], hops: CAP_HOPS })
            tie(c, r.x, r.y + 40 * fk, 0.8 * fk)
            c.font = `700 28px ${MONO}`; c.fillStyle = (tt % 1) < 0.6 ? RED : 'rgba(255,93,115,0.4)'; c.textAlign = 'left'; c.fillText('● LIVE FEED · CAPRICORN', rc.x + 30, rc.y + 44)
          }
        }
        const mc = drawMissionControl(x, t, { mission: 'MISSION 10', screenY: 420, screens: cheer ? { big: 'live', kind: 'saturn', target: 'SATURN', text: 'DAY OFF · COMPLETE' } : t < T.feed ? { big: 'track', progress: 0.08, target: 'SATURN' } : { big: feed }, cheer: cheer ? 1 : 0, cheerAt: T.cheer })
        const [dx, dy] = mc.spots.director
        emptyChair(x, t, dx, dy + 40)
        const [lx, ly] = mc.spots.left
        drawStarChar(x, lx - 60, ly - 60, 200, t, { color: STAR.bone, mood: cheer ? 'happy' : 'neutral', look: [1, -1], hops: MOON_HOPS, seed: 5 })
      } else if (t < T.arrive || inn(t, T.home, T.cheer)) {
        // ── THE COCKPIT
        const home = t >= T.home
        cockpit(x, t, { warp: home ? 1 : 0.6, speed: home ? 1.4 : 1, label: home ? '▼ TO HOUSTON' : '▲ TO SATURN' })
        seatBack(x, 330, '#2f6f5c'); seatBack(x, 750, '#2f6f5c')
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        const r = drawSpaceSuit(x, 330, 1160, 280, t, { sign: 'capricorn', helmet: true, mood: home ? 'happy' : 'squint', look: home ? [1, -0.3] : [1, 0.4], hops: CAP_HOPS, seed: 4 })
        if (!home) tie(x, 330 + Math.sin(t * 2) * 6, (r && r.y ? r.y : 1160) + 30, 0.8, Math.PI * 0.85 + Math.sin(t * 1.7) * 0.2)   // zero-g: the tie floats up
        seatFront(x, 330, '#3f8a72'); seatFront(x, 750, '#3f8a72')
        if (!home) binder(x, 840, 1270, 0.75, -0.1)
        else { R(x, INK, 640, 1150, 220, 120); for (let i = 0; i < 5; i++) R(x, i % 2 ? '#ff8fb1' : '#7fdcff', 646, 1156 + i * 22, 208, 22) }   // a beach towel on the seat
      } else if (inn(t, T.tub, T.back)) {
        // ── THE BATHTUB CUTAWAY (the TURN)
        const k = 1
        bathtub(x, t, k)
        drawSaturn(x, 540, 900 + Math.sin(t * 1.6) * 8, 380, t, { mood: 'happy', rot: -0.1, pointer: false, bob: 0 })
        shades(x, 540, 900 + Math.sin(t * 1.6) * 8 - 6, 380 * 0.62, -0.1)
        duck(x, 820, 905, 9, t)
        bathFront(x, t, k)
        drawSpaceSuit(x, 190, 1140, 200, t, { sign: 'capricorn', helmet: true, mood: 'wide', look: [1, -0.6], blink: false, seed: 4 })
        x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('(NOT TO SCALE)', 540, 1420); x.textAlign = 'left'
      } else {
        // ── SATURN (arrival, inspection, the bonk, the ice; then the ring-surf)
        x.save(); z.apply(x)
        const surfing = t >= T.surf[0]
        drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { mood: t < T.bonk ? 'happy' : t < T.fact1 ? 'wide' : 'happy', look: [-1, 0.5], rot: -0.18, pointer: false, hops: SAT_HOPS, bob: 6 })
        shades(x, SAT0.x, SAT0.y - 20, SAT0.size * 0.62)
        // ice chunks riding the ring
        for (let i = 0; i < 26; i++) {
          const p = ringPt(SAT0.x, SAT0.y, SAT0.size * (0.9 + (i % 4) * 0.05), i * 0.97 + t * 0.12)
          if (!p.front) continue
          CHUNK(x, p.x, p.y, 4, t, i)
        }
        // Capricorn: floats in, clipboard; bonked and tumbling; then surfing the ring with Saturn
        let cx = 300, cy = 1180, rot = 0
        if (t < T.arrive + 1) { cx = lerp(-120, 300, ease.outCubic(prog(t, T.arrive, T.arrive + 1))) }
        if (inn(t, ...T.tumble)) { const p = prog(t, ...T.tumble); rot = p * Math.PI * 2; cx += Math.sin(p * Math.PI) * 60; cy += Math.sin(p * Math.PI) * -40 }
        if (surfing) {
          const p = ringPt(SAT0.x, SAT0.y, SAT0.size * 1.02, Math.PI * 0.95 - prog(t, ...T.surf) * Math.PI * 0.9)
          cx = p.x; cy = p.y - 90
          R(x, INK, cx - 80, cy + 70, 160, 26); R(x, ICE, cx - 74, cy + 74, 148, 16)   // the ice-chunk board
        }
        x.save(); x.translate(cx, cy); x.rotate(rot + (surfing ? Math.sin(t * 5) * 0.08 : 0)); x.translate(-cx, -cy)
        const mood = surfing ? 'happy' : t < T.inspect ? 'happy' : t < T.bonk ? 'squint' : t < T.fact1 ? 'wide' : t < T.back ? 'wide' : 'neutral'
        const r = drawSpaceSuit(x, cx, cy, 220, t, { sign: 'capricorn', helmet: true, mood, look: [1, -0.5], hops: CAP_HOPS, seed: 4 })
        const ry = r && r.y ? r.y : cy
        if (t < T.tieOff) tie(x, cx, ry + 26, 0.62)
        if (!surfing && t < T.fact1 + 2) binder(x, cx + 120, ry + 10, 0.5, 0.2, 'RING AUDIT')
        x.restore()
        // the tie, off: it drifts into orbit with the ice
        if (t >= T.tieOff) { const p = ringPt(SAT0.x, SAT0.y, SAT0.size * 0.95, 2.4 + (t - T.tieOff) * 0.5); tie(x, p.x, p.y, 0.5, t * 2) }
        // the bonk chunk + BONK
        if (inn(t, T.bonk - 0.8, T.bonk)) { const p = prog(t, T.bonk - 0.8, T.bonk); CHUNK(x, lerp(700, 330, p), lerp(900, 1110, p), 6, t, 3) }
        if (inn(t, T.bonk, T.bonk + 1.0)) {
          const k = popIn(t, T.bonk, 0.25, 2.6) * outK(t, [T.bonk + 0.7, T.bonk + 1.0])
          x.save(); x.translate(380, 960); x.rotate(-0.12); x.scale(k, k)
          x.font = `800 110px Inter`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('BONK!', 6, 8); x.fillStyle = '#ffe27a'; x.fillText('BONK!', 0, 0); x.textAlign = 'left'
          x.restore()
          for (let i = 0; i < 6; i++) drawPixelStar(x, 330 + Math.cos(i + t * 6) * 110, 1050 + Math.sin(i + t * 6) * 40, 22, 1, '#ffe27a')
        }
        x.restore()
        drawGaspLines(x, t, { at: T.bonk, dur: 1.3, x: 300, y: 1080, follow: 0.5, color: ICE })
      }
      x.restore()

      // ── chrome
      if (!inn(t, T.tub, T.back)) missionHUD(x, t, { ...hudState(t), at: T.hookOut, out: T.last - 0.3 })
      genreBug(x, t, { text: inn(t, T.tub, T.back) ? 'CUTAWAY' : t < T.cheer ? 'LIVE · HOUSTON' : 'TOUCHDOWN', color: t < T.cheer ? RED : '#3fbf7f' })
      factChip(x, t, FACT1); factChip(x, t, FACT2)
      for (const at of [T.mc, T.cockpit, T.arrive, T.tub, T.back, T.home, T.cheer, T.pad]) whip(x, t, at, { dir: at === T.back || at === T.pad ? -1 : 1 })
      box.update(t)
      hook.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.arrive, kind: 'flip' }, { t: T.tub, kind: 'deal' }, { t: T.pad, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E10' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count), ...launchCues(T.lift),
  ['pop', T.boxOpen, 659.25, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MOONT]: 784, [CAPT]: 523.25, [SATT]: 392, [CANT]: 880 } }),
  ['pop', T.feed, 1046.5, 0.04, 0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.arrive - 0.6, T.arrive, 0.05], ['bell', T.arrive + 0.1, 1046.5, 0.03, 2.0, 0],
  ...stingerCues(T.bonk, { key: KEY, kind: 'sitcom' }), ...gaspCues(T.bonk, { key: KEY }),
  ...factChipCues(FACT1.at, { dur: FACT1.dur }), ...factChipCues(FACT2.at, { dur: FACT2.dur }),
  ['pop', T.tub, 392, 0.05, 0], ['glitter', T.tub + 0.2, T.tub + 1.0], ['pluck', T.tub + 0.3, 1567.98, 0.03, 0.4, 0.4],
  ['whoosh', T.tieOff, 0.6, 0.03], ['pop', T.tieOff + 0.1, 1174.66, 0.04, -0.3],
  ['riser', T.surf[0] - 0.3, T.surf[0] + 0.6, 0.05], ['glitter', T.surf[0], T.surf[1]],
  ...warpCues(T.home - 0.5, { len: 1.0 }),
  ...cheerCues(T.cheer, { len: 1.2 }),
  ['pop', T.hug, 523.25, 0.045, 0], ['bell', T.hug + 0.05, 1046.5, 0.03, 1.6, 0],
  ['pop', T.planner, 783.99, 0.04, 0.2], ['pluck', T.planner + 0.05, 1174.66, 0.035, 0.6, 0],
  ['pop', r3(T.last), NOTE[2], 0.026, -0.15], ['pop', r3(T.last + 0.09), NOTE[3], 0.026, 0.15],
  ['pop', r3(T.last + 0.45), 1046.5, 0.05, 0], ['pluck', r3(T.last + 0.45), 783.99, 0.045, 0.8, 0], ['bell', r3(T.last + 0.55), 1567.98, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...[T.mc, T.cockpit, T.arrive, T.tub, T.back, T.home, T.cheer, T.pad].flatMap(at => whipCues(at)),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
