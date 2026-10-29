// st11aquarius (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E11) · story 0–55.6, then the end card.
//   "Aquarius visited the planet that *rolls*."  A mission to Uranus, Aquarius's modern ruler: tilted about 98°, it rolls
//   round the Sun on its side, and it was the first planet found with a telescope (1781). Then a detour to the Helix Nebula
//   in Aquarius, the "eye" in the sky.
//   0.00  Frame 0: the launch pad. Aquarius, suited up, headphones over the helmet, mid-cartwheel on its side along the
//         gantry walkway. Hook card. 1.2 3 · 2 · 1 · LIFTOFF (3.9), and the rocket tips over and flies off sideways.
//   6.50  Mission Control. SATURN: "Aquarius, your rocket is flying *sideways.*"  ★ REAL SKY: Uranus, first planet found
//         with a telescope (1781). The feed: "it’s *more fun* this way. trust me."
//  12.00  The cockpit (Leo's photo taped to the dash: the rewatch bait). "everyone says i’m *weird.* i’m going where i fit."
//  16.00  Uranus, tipped on its side, with a face. "you roll on your *side?* finally, someone who gets it."
//         URANUS: "always have. *sideways* is my normal."  AQUARIUS: "i’m staying. comms *off.*"  Headphones on: COMMS OFF.
//  25.50  Mission Control: LEO at the console. "Aqua? you there? …*Aqua?*"  No reply.  (TRY)
//  28.20  Uranus rolls on along its orbit; Aquarius floats alone.
//  30.00  The orbit diagram (TURN): ★ REAL SKY: tilted about 98°, it rolls round the Sun on its side. URANUS: "tilted,
//         sure. but i still orbit the Sun with *everyone.*"  AQUARIUS: "…different, and still part of the *system.*"
//  36.50  The detour: the Helix Nebula, the giant eye. ★ REAL SKY. "ok, Helix. i see you *too.*"  Headphones off.
//  40.60  LEO (comms back on): "Aqua! i’m here. come *home.* i miss you."  "coming home. *sideways.*"  (WIN)
//  43.60  The trip home · 46.50 Mission Control cheers, and Leo and the crew tip their heads to say hi.
//  48.50  The pad, frame 0's framing: Aquarius and Leo cartwheel together on the walkway. LEO: "welcome home, *weirdo.*"
//  52.20  LAST: "Tilted is still | *orbiting.*"   55.6 end card.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { whip, whipCues, popIn } from '../../st9saghome.js'
import { R, drawPad, cockpit, seatBack, seatFront, hearts } from '../../st11sag/kit.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawStarBall, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'

export const DURATION = 60
const KEY = 'Am'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff5d73', MINT = '#7dffb8', TEAL = '#8ff0e6'
const MONO = "'Space Mono', ui-monospace, monospace"
const AQU = signStar('aquarius'), LEO = signStar('leo')
const AQT = '♒ AQUARIUS', LEOT = '♌ LEO', SATT = '♄ SATURN', URT = '♅ URANUS'
const TILT = 1.71                                 // about 98°

const T = {
  hookOut: 2.9, count: 1.2, lift: 3.9, tip: [4.6, 5.6], mc: 6.5, fact0: 8.6, feed: 9.7, cockpit: 12.0, arrive: 16.0,
  stay: 23.6, comms: 24.7, mc2: 25.5, alone: 28.2, orbit: 30.0, fact1: 30.2, helix: 36.5, fact2: 36.8, phonesOff: 40.2,
  leo: 40.8, aquHome: 44.4, home: 45.2, cheer: 46.5, pad: 48.5, roll: 48.7, last: 52.2,
  boxOpen: 6.6, boxClose: 51.3, out: [55.0, 55.45], ghost: 14.4,
}
const LINES = [
  { t: 6.8, speaker: SATT, text: 'Aquarius, your rocket is flying *sideways.*', color: '#e9c37a' },
  { t: 10.0, speaker: AQT, text: 'it’s *more fun* this way. trust me.', color: AQU.color },
  { t: 12.95, speaker: AQT, text: 'everyone says i’m *weird.* i’m going where i fit.', color: AQU.color },
  { t: 16.8, speaker: AQT, text: 'you roll on your *side?* finally, someone who gets it.', color: AQU.color },
  { t: 20.6, speaker: URT, text: 'always have. *sideways* is my normal.', color: TEAL },
  { t: T.stay, speaker: AQT, text: 'i’m staying. comms *off.*', color: AQU.color },
  { t: 26.15, speaker: LEOT, text: 'Aqua? you there? …*Aqua?*', color: LEO.color },
  { t: 31.0, speaker: URT, text: 'tilted, sure. but i still orbit the Sun with *everyone.*', color: TEAL },
  { t: 34.85, speaker: AQT, text: '…different, and still part of the *system.*', color: AQU.color },
  { t: 37.95, speaker: AQT, text: 'ok, Helix. i see you *too.*', color: AQU.color },
  { t: T.leo, speaker: LEOT, text: 'Aqua! i’m here. come *home.* i miss you.', color: LEO.color },
  { t: T.aquHome, speaker: AQT, text: 'coming home. *sideways.*', color: AQU.color },
  { t: T.roll + 0.2, speaker: LEOT, text: 'welcome home, *weirdo.*', color: LEO.color },
]
const CPS = 28
const FACT0 = { at: T.fact0, dur: 3.3, label: '★ REAL SKY', text: 'Uranus: the first planet found with a telescope (1781).', y: 1230 }
const FACT1 = { at: T.fact1, dur: 5.8, label: '★ REAL SKY', text: 'Uranus is tilted about 98°, so it rolls round the Sun on its side.', y: 1180 }
const FACT2 = { at: T.fact2, dur: 3.4, label: '★ REAL SKY', text: 'The Helix Nebula in Aquarius: the "eye" in the sky.', y: 1320 }
const HOOK = 'Aquarius visited the | planet that *rolls.*'
const LAST = 'Tilted is still | *orbiting.*'
export const GHOST = { at: T.ghost, x: 750, y: 1062, from: 'below', where: 'stowaway: rising from behind the empty passenger seat in the cockpit, under Leo’s photo' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inn = (t, a, b) => t >= a && t < b

function hudState(t) {
  const status = t < T.lift ? 'FUELING' : t < T.cockpit ? 'SIDEWAYS?' : t < T.arrive ? 'CRUISING' : t < T.comms ? 'IN ORBIT' : t < T.phonesOff ? 'COMMS OFF' : t < T.cheer ? 'HEADING HOME' : 'HOME'
  return { mission: 'MISSION 11', target: t >= T.helix && t < T.home ? 'HELIX NEBULA' : 'URANUS', status }
}

// ── props
/** headphones over the suit's helmet (helmet = { x, y, r }) */
function phones(x, h, on = 1) {
  if (!h || on <= 0.01) return
  const { x: cx, y: cy, r } = h, lift = (1 - on) * r * 0.8
  x.save(); x.globalAlpha *= clamp(on)
  x.strokeStyle = INK; x.lineWidth = r * 0.16; x.beginPath(); x.arc(cx, cy - lift, r * 1.02, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  x.strokeStyle = '#4a4266'; x.lineWidth = r * 0.08; x.beginPath(); x.arc(cx, cy - lift, r * 1.02, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
  for (const s of [-1, 1]) {
    const px = cx + s * r * 0.98, py = cy - r * 0.12 - lift
    R(x, INK, px - r * 0.2, py - r * 0.28, r * 0.4, r * 0.56); R(x, AQU.color, px - r * 0.14, py - r * 0.22, r * 0.28, r * 0.44); R(x, '#b9f2ff', px - r * 0.14, py - r * 0.22, r * 0.28, r * 0.08)
  }
  x.restore()
}
/** a suit drawn rolled by `rot` (the cartwheel / sideways gag), with its headphones */
function aquSuit(x, t, cx, cy, size, rot, o = {}, phonesOn = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.translate(-cx, -cy)
  const r = drawSpaceSuit(x, cx, cy, size, t, { sign: 'aquarius', helmet: o.helmet ?? true, seed: 6, ...o })
  phones(x, r.helmet && o.helmet !== false ? r.helmet : { x: r.x, y: r.y, r: size * 0.42 }, phonesOn)
  x.restore()
  return r
}
/** motion arcs round a rolling body (the cartwheel reads at a glance) */
function spinLines(x, t, cx, cy, r, k = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k); x.lineCap = 'round'
  for (let i = 0; i < 3; i++) {
    const a0 = -t * 4 + i * 2.1
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(cx, cy, r + i * 16, a0, a0 + 0.9); x.stroke()
    x.strokeStyle = i ? '#b9f2ff' : BONE; x.lineWidth = 7; x.beginPath(); x.arc(cx, cy, r + i * 16, a0, a0 + 0.9); x.stroke()
  }
  x.restore()
}
/** the Helix Nebula: a pixel eye (blue-green core, red-orange outer rings, a pale centre star) */
function helix(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 1.6); g.addColorStop(0, 'rgba(120,220,255,0.3)'); g.addColorStop(0.6, 'rgba(255,90,70,0.18)'); g.addColorStop(1, 'rgba(255,90,70,0)')
  x.fillStyle = g; x.fillRect(cx - r * 1.7, cy - r * 1.7, r * 3.4, r * 3.4)
  x.globalCompositeOperation = 'source-over'
  const c = 10
  for (let gy = -r * 1.25; gy <= r * 1.25; gy += c) for (let gx = -r * 1.25; gx <= r * 1.25; gx += c) {
    const d = Math.hypot(gx, gy * 1.12) / r, a = Math.atan2(gy, gx)
    const wob = 0.06 * Math.sin(a * 7 + t * 0.6) + 0.04 * Math.sin(a * 13 - t)
    const outer = Math.exp(-Math.pow((d - 0.86 - wob) / 0.17, 2)), inner = Math.exp(-Math.pow((d - 0.5 - wob * 0.6) / 0.16, 2))
    let col = null
    if (outer > 0.25) col = outer > 0.75 ? '#ffb070' : outer > 0.5 ? '#f05a3a' : '#8a2438'
    if (inner > 0.3) col = inner > 0.75 ? '#c8fff4' : inner > 0.5 ? '#5fd8e8' : '#2f7fa8'
    if (!col && d < 0.38) col = d < 0.08 ? '#ffffff' : 'rgba(40,110,150,0.6)'
    if (col) { x.fillStyle = col; x.fillRect(cx + gx, cy + gy, c, c) }
  }
  x.restore()
}
/** Leo's photo taped to the dash */
function leoPhoto(x, t, cx, cy) {
  x.save(); x.translate(cx, cy); x.rotate(0.08)
  R(x, INK, -50, -60, 100, 120); R(x, BONE, -44, -54, 88, 108); R(x, '#2a2150', -38, -48, 76, 70)
  drawStarChar(x, 0, -14, 60, t, { color: LEO.color, mood: 'happy', glow: 0.3, tips: false, bob: 0, seed: 2 })
  x.font = `800 16px Inter`; x.fillStyle = PINK; x.textAlign = 'center'; x.fillText('♥', 0, 44); x.textAlign = 'left'
  R(x, 'rgba(255,240,180,0.7)', -20, -66, 40, 14)
  x.restore()
}
function commsChip(x, t, on, k, y = 1240) {
  if (k <= 0.02) return
  x.save(); x.translate(540, y); x.scale(k, k)
  R(x, INK, -180, -36, 360, 72); R(x, '#14112a', -174, -30, 348, 60)
  x.font = `700 28px ${MONO}`; x.fillStyle = on ? MINT : RED; x.textAlign = 'center'; x.fillText(on ? '▂▃▅▇ COMMS: ON' : '✕ COMMS: OFF', 0, 10); x.textAlign = 'left'
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "800 16px Inter", "600 34px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, size: 100, accentSize: 160, top: 300, accentColor: AQU.color })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 280, open: T.boxOpen, close: T.boxClose, cps: CPS })
  const last = popText(root, LAST, { top: 320, size: 110, accentSize: 180, at: T.last, gap: 0.09, accentColor: AQU.color, wobble: true, late: 1, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const AQ_HOPS = talkHops(LINES, AQT, { cps: CPS })
  const SAT_HOPS = talkHops(LINES, SATT, { cps: CPS })
  const UR_HOPS = talkHops(LINES, URT, { cps: CPS })
  const LEO_HOPS = [...talkHops(LINES, LEOT, { cps: CPS }), T.cheer + 0.1, T.cheer + 0.6]

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const shk = t > T.lift && t < T.lift + 1.6 ? Math.sin(t * 70) * 8 * (1 - prog(t, T.lift, T.lift + 1.6)) : 0
      x.save(); x.translate(shk, 0)

      if (t < T.mc || t >= T.pad) {
        // ── THE PAD
        const end = t >= T.pad
        drawPad(x, t)
        const climb = end ? 0 : ease.inQuad(prog(t, T.lift, T.mc)) * 900
        const tip = end ? 0 : ease.inOutCubic(prog(t, ...T.tip)) * Math.PI / 2
        const side = end ? 0 : ease.inQuad(prog(t, T.tip[0], T.mc)) * 1300
        const smk = end ? 0.5 * (1 - prog(t, T.pad, T.pad + 2.5)) : clamp((t - T.lift + 0.6) / 0.5) * (1 - prog(t, T.lift + 1.4, T.mc))
        drawRocket(x, 540 + side, 1130 - climb, 640, t, { color: AQU.color, rot: tip, flame: !end && t >= T.lift - 0.4 ? 1.3 * clamp((t - T.lift + 0.4) / 0.4) : 0, shake: !end && t > T.lift - 0.8 ? 4 : 0, smoke: smk, pilot: !end && t > 3.9 ? AQU.color : null, trail: tip > 0.2 ? 0.8 : 0 })
        if (!end) {
          const inside = prog(t, 3.4, 3.8)
          if (inside < 1) {
            const sx = lerp(760, 690, prog(t, 0, 3.4))
            x.save(); x.globalAlpha = 1 - inside
            spinLines(x, t, sx, 1060, 150)
            aquSuit(x, t, sx, 1060, 230, -Math.PI / 2 - t * 1.2, { mood: 'happy', look: [-1, 0] })
            x.restore()
          }
          drawCountdown(x, t, { at: T.count, x: 540, y: 670, size: 190 })
        } else {
          // the end: both cartwheel on the walkway (frame 0's pose, now with company)
          const rk = popIn(t, T.roll, 0.4, 1.8)
          const rot = -Math.PI / 2 - (t - T.roll) * 1.2
          spinLines(x, t, 730, 1080, 130, rk); spinLines(x, t + 0.5, 925, 1085, 120, rk)
          aquSuit(x, t, 730, 1080, 185, rot * clamp(rk), { helmet: false, mood: 'happy', look: [1, 0], hops: [T.roll + 1.4, T.last + 0.4] }, 0)
          x.save(); x.translate(925, 1085); x.rotate(rot * clamp(rk)); drawStarChar(x, 0, 0, 170, t, { color: LEO.color, glyph: LEO.glyph, mood: t < T.roll + 1.4 ? 'happy' : 'heart', look: [-1, 0], hops: LEO_HOPS, seed: 8 }); x.restore()
          hearts(x, t, 830, 930, T.roll + 1.2, T.last)
        }
      } else if (t < T.cockpit || inn(t, T.mc2, T.alone) || inn(t, T.cheer, T.pad)) {
        // ── MISSION CONTROL
        const cheer = t >= T.cheer, calling = inn(t, T.mc2, T.alone)
        const feed = (c, rc, tt) => {
          starfield(c, tt, { speed: 0.8, dir: 'right' })
          const fk = popIn(tt, T.feed, 0.35, 2.2)
          if (fk > 0.02) {
            aquSuit(c, tt, rc.x + rc.w / 2, rc.y + rc.h / 2 + 30, 300 * fk, -Math.PI / 2, { mood: 'happy', look: [0, 0], hops: AQ_HOPS })
            c.font = `700 28px ${MONO}`; c.fillStyle = (tt % 1) < 0.6 ? RED : 'rgba(255,93,115,0.4)'; c.textAlign = 'left'; c.fillText('● LIVE FEED · AQUARIUS', rc.x + 30, rc.y + 44)
          }
        }
        const nosig = (c, rc) => { c.font = `700 64px ${MONO}`; c.fillStyle = RED; c.textAlign = 'center'; c.fillText('NO SIGNAL', rc.x + rc.w / 2, rc.y + rc.h / 2 + 20); c.textAlign = 'left' }
        const screens = cheer ? { big: 'live', kind: 'uranus', target: 'URANUS', text: 'WELCOME HOME, AQUARIUS' } : calling ? { big: nosig, text: 'COMMS: OFF' } : t < T.feed ? { big: 'track', progress: 0.08, target: 'URANUS' } : { big: feed }
        const mc = drawMissionControl(x, t, { mission: 'MISSION 11', screenY: 420, screens, cheer: cheer ? 1 : 0, cheerAt: T.cheer })
        const [dx, dy] = mc.spots.director
        if (!calling) drawSaturn(x, dx, dy, 240, t, { mood: cheer ? 'happy' : t < 9 ? 'wide' : 'squint', look: [0, -1], hops: SAT_HOPS, rot: cheer ? -0.18 - 0.5 * popIn(t, T.cheer + 0.5, 0.5) : -0.18 })
        if (calling || cheer) {
          // Leo at the front console (in the cheer, its head tipped right over: hi, in Uranus)
          const [fx, fy] = calling ? [dx, dy + 30] : [dx + 260, dy + 20]
          const lean = cheer ? -1.2 * clamp(popIn(t, T.cheer + 0.4, 0.5)) : 0
          x.save(); x.translate(fx, fy); x.rotate(lean)
          drawStarChar(x, 0, 0, calling ? 250 : 200, t, { color: LEO.color, glyph: LEO.glyph, mood: calling ? (t < 27.6 ? 'neutral' : 'wide') : 'happy', look: [0, -1], hops: LEO_HOPS, seed: 8 })
          x.restore()
        }
      } else if (t < T.arrive || inn(t, T.home, T.cheer)) {
        // ── THE COCKPIT
        const home = t >= T.home
        cockpit(x, t, { warp: home ? 1 : 0.5, speed: home ? 1.4 : 1, label: home ? '▶ TO HOUSTON' : '▶ TO URANUS', tint: '#16223a' })
        seatBack(x, 330, '#2c5f7a'); seatBack(x, 750, '#2c5f7a')
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        aquSuit(x, t, 330, 1160, 280, home ? 0 : -0.25, { mood: home ? 'happy' : t < 14.3 ? 'neutral' : 'squint', look: home ? [1, -0.4] : [1, -0.2], hops: AQ_HOPS }, home ? 0 : 1)
        seatFront(x, 330, '#3a7a9a'); seatFront(x, 750, '#3a7a9a')
        leoPhoto(x, t, 860, 1330)
      } else if (inn(t, T.orbit, T.helix)) {
        // ── THE ORBIT DIAGRAM (the TURN)
        x.save(); x.fillStyle = 'rgba(4,6,20,0.55)'; x.fillRect(0, 0, 1080, 1920); x.restore()
        drawStarBall(x, 540, 800, 80, t, { color: '#ffd36a' })
        x.strokeStyle = 'rgba(143,240,230,0.5)'; x.setLineDash([10, 12]); x.lineWidth = 4; x.beginPath(); x.ellipse(540, 800, 400, 150, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
        const a = (t - T.orbit) * 0.55 + 0.6
        const ux = 540 + Math.cos(a) * 400, uy = 800 + Math.sin(a) * 150
        drawPlanet(x, ux, uy, 70, t, { kind: 'uranus', tilt: TILT, rings: true, face: 'happy', look: [-1, 0] })
        x.font = `700 26px ${MONO}`; x.fillStyle = TEAL; x.textAlign = 'center'; x.fillText('≈ 98°', ux, uy - 110); x.fillStyle = GOLD; x.fillText('THE SUN', 540, 925); x.textAlign = 'left'
        // a little Aquarius riding along, tipped too
        const r2 = drawSpaceSuit(x, ux + Math.cos(a + 0.5) * 120, uy + 60, 90, t, { sign: 'aquarius', mood: t < 34.85 ? 'wide' : 'sparkle', look: [-1, -0.3], seed: 6 })
        phones(x, r2.helmet, 1)
      } else if (t >= T.helix) {
        // ── THE HELIX NEBULA (the detour)
        helix(x, t, 540, 760, 330, prog(t, T.helix, T.helix + 1.0))
        const off = prog(t, T.phonesOff, T.phonesOff + 0.5)
        aquSuit(x, t, 540, 1240, 260, 0, { mood: t < T.phonesOff ? 'sparkle' : t < T.leo + 0.5 ? 'wide' : 'happy', look: [0, -1], hops: AQ_HOPS }, 1 - off)
        commsChip(x, t, true, popIn(t, T.leo - 0.3, 0.3, 2.2) * outK(t, [T.home - 0.4, T.home]), 1060)
      } else {
        // ── URANUS (arrival, "finally", comms off; then alone)
        const roll = t >= T.alone ? ease.inOutCubic(prog(t, T.alone, T.orbit)) : 0
        const ur = drawPlanet(x, 600 + roll * 500, 760 - roll * 120, 260, t, { kind: 'uranus', tilt: TILT, rings: true, face: t < T.stay ? 'happy' : t < T.alone ? 'neutral' : 'sleepy', look: [-1, 0.5] })
        void ur
        const ax = t < T.arrive + 1 ? lerp(-140, 290, ease.outCubic(prog(t, T.arrive, T.arrive + 1))) : 290
        const rot = -Math.PI / 2 * ease.inOutCubic(prog(t, 18.2, 19.0)) * (1 - prog(t, T.alone, T.alone + 0.8))
        aquSuit(x, t, ax, 1180, 240, rot, { mood: t < T.stay ? 'sparkle' : t < T.alone ? 'happy' : 'neutral', look: t >= T.alone ? [1, -0.5] : [1, -0.3], hops: AQ_HOPS })
        commsChip(x, t, false, popIn(t, T.comms, 0.3, 2.2) * outK(t, [T.mc2 - 0.3, T.mc2]))
        // URANUS label (it talks)
        if (t < T.alone) { x.font = `700 26px ${MONO}`; x.fillStyle = TEAL; x.textAlign = 'center'; x.fillText('URANUS · ON ITS SIDE', 760, 1110); x.textAlign = 'left' }
      }
      x.restore()

      // ── chrome
      missionHUD(x, t, { ...hudState(t), at: T.hookOut, out: T.last - 0.3 })
      genreBug(x, t, { text: t < T.cheer ? 'LIVE · HOUSTON' : 'TOUCHDOWN', color: t < T.cheer ? RED : '#3fbf7f' })
      factChip(x, t, FACT0); factChip(x, t, FACT1); factChip(x, t, FACT2)
      for (const at of [T.mc, T.cockpit, T.arrive, T.mc2, T.alone, T.orbit, T.helix, T.home, T.cheer, T.pad]) whip(x, t, at, { dir: at === T.alone || at === T.pad ? -1 : 1 })
      box.update(t)
      hook.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.arrive, kind: 'flip' }, { t: T.orbit, kind: 'deal' }, { t: T.pad, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E11' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count), ...launchCues(T.lift),
  ['whoosh', T.tip[0], 0.9, 0.04], ['pluck', T.tip[1], 659.25, 0.04, 0.6, 0.4],
  ['pop', T.boxOpen, 659.25, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATT]: 392, [AQT]: 698.46, [URT]: 523.25, [LEOT]: 587.33 } }),
  ...factChipCues(FACT0.at, { dur: FACT0.dur }), ...factChipCues(FACT1.at, { dur: FACT1.dur }), ...factChipCues(FACT2.at, { dur: FACT2.dur }),
  ['pop', T.feed, 1046.5, 0.04, 0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.arrive - 0.6, T.arrive, 0.05], ['bell', T.arrive + 0.1, 1318.51, 0.03, 2.0, 0],
  ['whoosh', 18.2, 0.6, 0.03],
  ['pop', T.comms, 220, 0.06, 0], ['tick', T.comms + 0.05, 0.06],
  ['pluck', T.mc2 + 0.6, 329.63, 0.04, 0.8, 0], ['pluck', 27.6, 293.66, 0.04, 0.8, 0],
  ['whoosh', T.alone, 0.8, 0.03],
  ['bell', T.orbit + 0.2, 880, 0.025, 2.2, 0],
  ['riser', T.helix - 0.5, T.helix + 0.6, 0.05], ['glitter', T.helix, T.helix + 1.2], ['bell', T.helix + 0.6, 1760, 0.025, 2.4, 0],
  ['whoosh', T.phonesOff, 0.4, 0.025], ['pop', T.leo - 0.3, 1318.51, 0.04, 0], ['pop', T.leo - 0.2, 1567.98, 0.035, 0],
  ...warpCues(T.home - 0.5, { len: 1.0 }),
  ...cheerCues(T.cheer, { len: 1.8 }),
  ['pop', T.roll, 523.25, 0.045, 0], ['glitter', T.roll, T.roll + 0.8], ['bell', T.roll + 0.1, 1046.5, 0.03, 1.6, 0],
  ['pop', r3(T.last), NOTE[2], 0.026, -0.15], ['pop', r3(T.last + 0.09), NOTE[3], 0.026, 0.15],
  ['pop', r3(T.last + 0.45), 1318.51, 0.05, 0], ['pluck', r3(T.last + 0.45), 880, 0.045, 0.8, 0], ['bell', r3(T.last + 0.55), 1760, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...[T.mc, T.cockpit, T.arrive, T.mc2, T.alone, T.orbit, T.helix, T.home, T.cheer, T.pad].flatMap(at => whipCues(at)),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
