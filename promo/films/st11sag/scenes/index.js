// st11sag (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E09) · story 0–55.6, then the shared end card.
//   "Sag is going to the *centre* of the galaxy."  The longest trip of the season: Sagittarius aims its arrow-rocket at
//   Sagittarius A*, the black hole at the heart of the Milky Way (about 26,000 light-years away; first image 2022).
//   0.00  Frame 0: the launch pad at night. Sag, suited up with its always-packed backpack (season 9), mid-stride up the
//         gantry walkway to its purple arrow-rocket. Hook card on screen. HUD: MISSION 09 · SAGITTARIUS A*.
//   1.20  3 · 2 · 1 …  4.20 LIFTOFF (shake, smoke, the rocket climbs out of frame).
//   6.50  Houston Mission Control. SATURN (flight director): "Sag. this is the *longest* trip we've ever flown."
//  10.00  Sag on the big-screen feed: "i want to see the *middle* of everything."  (WANT)
//  12.00  The cockpit, warp. "wow. WOW. are you seeing *this?*" → the passenger seat holds… the backpack, buckled in.
//  16.40  A selfie for Gemini → NO SIGNAL. "best view in the galaxy and *no one* to tell."  (TRY)  21.5 the ghost
//         stowaway peeks out of the backpack's pocket.
//  24.50  Out of warp: the crowded golden heart of the galaxy, and then the glowing ring.  "…oh. *oh.*"
//  29.00  ★ REAL SKY chips (TURN): the Milky Way's central black hole · first image 2022 (a snapshot frame snaps round
//         the ring). Close-up: the ring glows in Sag's wide eyes. "and the best part of a trip is *telling* it."
//  41.00  The rocket flips round. "Houston, i'm coming *home.*"  The warp home; the signal comes back:
//         GEMINI: "Sag! you're back in range. tell me *everything.*"  (WIN)
//  46.80  Mission Control cheers (confetti, the big screen: TOUCHDOWN).
//  48.50  The pad again, frame 0's framing: Sag and Gemini hug on the walkway. GEMINI: "you came *back.*" The backpack
//         finally opens (season-9 callback): a postcard of the ring, "WISH YOU WERE HERE".
//  52.20  LAST: "The best trips end with | *someone* to tell."   55.6 end card.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSaturn, drawBits, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { drawBackpack, whip, whipCues, popIn } from '../../st9saghome.js'
import { R, drawPad, cockpit, seatBack, seatFront, confetti, hearts } from '../kit.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawCountdown, countdownTimes, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'

export const DURATION = 60
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff5d73', MINT = '#7dffb8'
const MONO = "'Space Mono', ui-monospace, monospace"
const SAG = signStar('sagittarius'), GEM = signStar('gemini')
const SAGT = '♐ SAG', GEMT = '♊ GEMINI', SATT = '♄ SATURN'

// ── the timeline
const T = {
  hookOut: 2.9, count: 1.2, lift: 3.9, mc: 6.5, feed: 9.8, cockpit: 12.0, seat: 15.0,
  selfie: 16.4, flash: 17.6, nosig: 18.15, sad: 19.6, ghost: 21.5, drop: 23.4, centre: 24.5, ring: [25.6, 27.4],
  oh: 27.6, fact1: 29.0, close: 32.4, glow: 33.0, fact2: 35.0, snap: 35.1, wide: 38.2, tell: 39.2, flip: [41.0, 41.9], home: 42.4,
  warp2: 43.2, signal: 44.5, gem: 44.95, cheer: 46.8, pad: 48.5, hug: 48.75, back: 48.95, open: 50.3, last: 52.2,
  boxOpen: 6.6, boxClose: 51.2, out: [55.0, 55.45],
}
const LINES = [
  { t: 6.8, speaker: SATT, text: 'Sag, this is the *longest* trip we’ve flown.', color: '#e9c37a' },
  { t: 10.3, speaker: SAGT, text: 'i want to see the *middle* of everything.', color: SAG.color },
  { t: 13.3, speaker: SAGT, text: 'wow. WOW. are you seeing *this?*', color: SAG.color },
  { t: T.selfie, speaker: SAGT, text: 'ok. selfie. sending it to *Gemini*…', color: SAG.color },
  { t: T.sad, speaker: SAGT, text: 'best view in the galaxy and *no one* to tell.', color: SAG.color },
  { t: T.oh, speaker: SAGT, text: '…oh. *oh.*', color: SAG.color },
  { t: T.glow, speaker: SAGT, text: 'the middle of everything *glows.*', color: SAG.color },
  { t: T.tell, speaker: SAGT, text: 'and the best part of a trip is *telling* it.', color: SAG.color },
  { t: T.home, speaker: SAGT, text: 'Houston, i’m coming *home.*', color: SAG.color },
  { t: T.gem, speaker: GEMT, text: 'Sag! you’re back in range. tell me *everything.*', color: GEM.color },
  { t: T.back, speaker: GEMT, text: 'you came *back.*', color: GEM.color },
]
const CPS = 28
const FACT1 = { at: T.fact1, dur: 5.6, label: '★ REAL SKY', text: 'Sagittarius A*: the black hole at the heart of the Milky Way.', y: 1150 }
const FACT2 = { at: T.fact2, dur: 4.0, label: '★ REAL SKY', text: 'Its first image was released in 2022.', y: 1150 }
const HOOK = 'Sag is going to | the *centre* of the galaxy.'
const LAST = 'The best trips end | with *someone* to tell.'
export const GHOST = { at: T.ghost, x: 742, y: 1128, from: 'below', where: 'stowaway: rising out of the backpack’s top pocket, buckled into the cockpit’s passenger seat' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inn = (t, a, b) => t >= a && t < b

// the HUD status by time
function hudState(t) {
  const status = t < T.lift ? 'FUELING' : t < T.cockpit ? 'LIFTOFF' : t < T.centre ? 'CRUISING' : t < T.flip[0] ? 'ARRIVED' : t < T.cheer ? 'HEADING HOME' : 'HOME'
  return { mission: 'MISSION 09', target: 'SAGITTARIUS A*', distance: 'ABOUT 26,000 LY', status }
}

// ── pieces drawn here (the rest comes from st11space)
/** fletching + arrowhead details on the rocket so it reads as Sag's arrow */
function arrowBits(x, cx, cy, h, alpha = 1) {
  x.save(); x.globalAlpha *= alpha
  const base = cy + h * 0.42
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx + s * h * 0.09, base - h * 0.2); x.lineTo(cx + s * h * 0.26, base + h * 0.02); x.lineTo(cx + s * h * 0.09, base - h * 0.02); x.closePath(); x.fill()
    x.fillStyle = '#ffd36a'; x.beginPath(); x.moveTo(cx + s * h * 0.1, base - h * 0.17); x.lineTo(cx + s * h * 0.22, base); x.lineTo(cx + s * h * 0.1, base - h * 0.04); x.closePath(); x.fill()
  }
  x.restore()
}
/** the passenger: Sag's backpack, buckled in */
function buckledPack(x, t, cx, cy, unpacked = 0) {
  drawBackpack(x, cx, cy, 8, t, unpacked)
  R(x, INK, cx - 70, cy - 10, 140, 14); R(x, '#c9c0dc', cx - 66, cy - 7, 132, 8)              // the seat belt
}
/** the selfie phone */
function selfiePhone(x, t, cx, cy, k) {
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(k, k)
  R(x, INK, -86, -150, 172, 300); R(x, '#14112a', -78, -142, 156, 284)
  x.textAlign = 'center'
  if (t < T.nosig) {
    R(x, '#2a2150', -70, -130, 140, 180); for (let i = 0; i < 24; i++) R(x, i % 3 ? '#ffd36a' : BONE, -64 + (i * 37) % 128, -124 + (i * 53) % 170, 4, 4)
    x.font = `700 18px ${MONO}`; x.fillStyle = BONE; x.fillText('SEND TO', 0, 84); x.fillStyle = GEM.color; x.font = `800 26px Inter`; x.fillText('♊ GEMINI', 0, 118)
  } else {
    x.font = `700 20px ${MONO}`; x.fillStyle = '#9a8fb5'; x.fillText('▂ ▃ ▅ ▇', 0, -60)
    R(x, RED, -54, -64, 108, 6)
    x.font = `800 30px Inter`; x.fillStyle = RED; x.fillText('NO', 0, 6); x.fillText('SIGNAL', 0, 40)
  }
  x.textAlign = 'left'; x.restore()
}
/** the heart of the galaxy: a warm crowd of stars + dust lanes */
function galacticCentre(x, t, k = 1) {
  x.save(); x.globalAlpha = k
  const g = x.createRadialGradient(540, 820, 0, 540, 820, 900)
  g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(0.4, 'rgba(240,140,90,0.16)'); g.addColorStop(1, 'rgba(60,30,90,0)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 420; i++) {
    const a = i * 2.399, d = Math.pow((i * 0.618) % 1, 0.7) * 820
    const sx = 540 + Math.cos(a) * d * 1.25, sy = 820 + Math.sin(a) * d * 0.55
    const tw = 0.5 + 0.5 * Math.sin(t * 2 + i)
    R(x, i % 5 ? '#ffe2b0' : '#ffffff', sx, sy, i % 7 ? 3 : 5, i % 7 ? 3 : 5)
    if (i % 23 === 0) { x.globalAlpha = k * tw; drawPixelStar(x, sx, sy, 22, 1, '#fff1c8'); x.globalAlpha = k }
  }
  x.globalAlpha = k * 0.5; x.fillStyle = '#1a0f2e'
  for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(540 + (i - 1) * 260, 830 + (i - 1) * 30, 420, 26 + i * 8, -0.12, 0, Math.PI * 2); x.fill() }
  x.restore()
}
/** the glowing ring (Sagittarius A*'s 2022 portrait: a dark centre in a warm ring with three bright knots) */
function drawRing(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.globalCompositeOperation = 'lighter'
  const halo = x.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.1)
  halo.addColorStop(0, 'rgba(255,150,60,0.45)'); halo.addColorStop(1, 'rgba(255,150,60,0)')
  x.fillStyle = halo; x.fillRect(cx - r * 2.2, cy - r * 2.2, r * 4.4, r * 4.4)
  x.globalCompositeOperation = 'source-over'
  const c = 10
  for (let gy = -r * 1.3; gy <= r * 1.3; gy += c) for (let gx = -r * 1.3; gx <= r * 1.3; gx += c) {
    const d = Math.hypot(gx, gy) / r, ang = Math.atan2(gy, gx)
    const knot = 0.55 + 0.45 * Math.max(0, Math.cos(3 * (ang - 0.4 + t * 0.15)))
    const ringI = Math.exp(-Math.pow((d - 1) / 0.2, 2)) * knot
    if (d < 0.72) { x.fillStyle = '#05030a'; x.fillRect(cx + gx, cy + gy, c, c); continue }
    if (ringI < 0.08) continue
    const col = ringI > 0.75 ? '#fff0c0' : ringI > 0.5 ? '#ffc060' : ringI > 0.28 ? '#f07a30' : '#8a3418'
    x.fillStyle = col; x.fillRect(cx + gx, cy + gy, c, c)
  }
  x.restore()
}
/** the snapshot frame that snaps round the ring for the 2022 chip */
function snapFrame(x, t, cx, cy, r) {
  const k = popIn(t, T.snap, 0.3, 2.2) * outK(t, [T.wide - 0.3, T.wide])
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  const s = r * 1.55
  x.strokeStyle = BONE; x.lineWidth = 12; x.strokeRect(-s, -s, 2 * s, 2 * s)
  x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-s - 8, -s - 8, 2 * s + 16, 2 * s + 16)
  R(x, BONE, -s - 6, s, 2 * s + 12, 64)
  x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('FIRST IMAGE · 2022', 0, s + 44); x.textAlign = 'left'
  x.restore()
}
/** the postcard from the backpack */
function postcard(x, t, cx, cy, k) {
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  R(x, INK, -170, -110, 340, 220); R(x, BONE, -162, -102, 324, 204); R(x, '#0b0918', -150, -90, 170, 180)
  drawRing(x, t, -65, 0, 42, 1)
  x.font = `800 22px Inter`; x.fillStyle = INK; x.fillText('WISH YOU', 34, -40); x.fillText('WERE HERE', 34, -12)
  x.font = `italic 600 30px 'EB Garamond', serif`; x.fillStyle = SAG.color; x.fillText('— Sag', 40, 34)
  x.font = `700 16px ${MONO}`; x.fillStyle = '#6a6290'; x.fillText('SGR A* · 2022', 34, 76)
  x.restore()
}
async function build(stage) {
  try {
    await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 230px 'Space Mono'", "800 30px Inter", "italic 600 30px 'EB Garamond'", "600 34px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, size: 100, accentSize: 150, top: 300, accentColor: SAG.color })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 280, open: T.boxOpen, close: T.boxClose, cps: CPS })
  const last = popText(root, LAST, { top: 320, size: 100, accentSize: 160, at: T.last, gap: 0.09, accentColor: SAG.color, wobble: true, late: 2, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  void el

  const SAG_HOPS = talkHops(LINES, SAGT, { cps: CPS })
  const GEM_HOPS = [...talkHops(LINES, GEMT, { cps: CPS }), T.hug + 0.05]
  const SAT_HOPS = [...talkHops(LINES, SATT, { cps: CPS }), T.cheer + 0.1, T.cheer + 0.7]

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      // camera shake at liftoff / landing
      const shk = t > T.lift && t < T.lift + 1.6 ? Math.sin(t * 70) * 8 * (1 - prog(t, T.lift, T.lift + 1.6)) : 0
      x.save(); x.translate(shk, 0)

      if (t < T.mc || t >= T.pad) {
        // ── THE PAD (frame 0, liftoff; and the end shot, the same framing)
        const end = t >= T.pad
        drawPad(x, t)
        const climb = end ? 0 : ease.inQuad(prog(t, T.lift, T.mc)) * 1700
        const rk = { x: 540, y: 1130 - climb, h: 640 }
        const smk = end ? 0.5 * (1 - prog(t, T.pad, T.pad + 2.5)) : clamp((t - T.lift + 0.6) / 0.5) * (1 - prog(t, T.lift + 1.4, T.mc))
        drawRocket(x, rk.x, rk.y, rk.h, t, { color: SAG.color, flame: !end && t >= T.lift - 0.4 ? 1.3 * clamp((t - T.lift + 0.4) / 0.4) : 0, shake: !end && t > T.lift - 0.8 ? 4 : 0, smoke: smk, pilot: !end && t > 3.9 ? SAG.color : null })
        arrowBits(x, rk.x, rk.y, rk.h)
        if (!end) {
          // Sag mid-stride on the walkway (frame 0), then waves and ducks inside at 3.6
          const inside = prog(t, 3.5, 3.9)
          if (inside < 1) {
            const sx = lerp(740, 680, prog(t, 0, 3.5)), step = Math.abs(Math.sin(t * 6)) * 10
            drawBackpack(x, sx + 70, 1080 - step, 5, t, 0)
            drawSpaceSuit(x, sx, 1085 - step, 190, t, { sign: 'sagittarius', helmet: true, mood: t < 2.4 ? 'happy' : 'wide', look: [-1, -0.5], alpha: 1 - inside, hops: [0.6, 1.8] })
          }
          drawCountdown(x, t, { at: T.count, x: 540, y: 670, size: 190 })
        } else {
          // the end: Sag (helmet off) and Gemini on the walkway; the hug; the backpack opens; the postcard
          const hk = ease.outCubic(prog(t, T.hug - 0.25, T.hug + 0.2))
          const apart = ease.inOutCubic(prog(t, T.hug + 0.9, T.hug + 1.5)), sx = lerp(700, 735, hk) - 25 * apart, gemx = lerp(940, 860, hk) + 50 * apart
          drawBackpack(x, 650, 1172, 5, t, prog(t, T.open, T.open + 0.5))
          drawSpaceSuit(x, sx, 1080, 190, t, { sign: 'sagittarius', helmet: false, mood: t < T.open ? 'happy' : 'sparkle', look: [1, 0], squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, hops: [T.open + 0.1, T.last + 0.4] })
          drawStarChar(x, gemx, 1090, 180, t, { color: GEM.color, glyph: GEM.glyph, mood: t < T.open + 0.4 ? 'happy' : 'heart', look: [-1, 0], hops: GEM_HOPS, squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, seed: 7 })
          hearts(x, t, 730, 950, T.hug, T.open)
          postcard(x, t, 720, 760, popIn(t, T.open + 0.35, 0.4, 2.2) * outK(t, [T.last - 0.3, T.last]))
        }
      } else if (t < T.cockpit || inn(t, T.cheer, T.pad)) {
        // ── HOUSTON MISSION CONTROL (the WANT; then the cheer)
        const cheer = t >= T.cheer
        const feed = (c, rc, tt) => {
          starfield(c, tt, { speed: 0.6 })
          const fk = popIn(tt, T.feed, 0.35, 2.2)
          if (fk > 0.02) {
            drawSpaceSuit(c, rc.x + rc.w / 2, rc.y + rc.h / 2 + 40, 300 * fk, tt, { sign: 'sagittarius', helmet: true, mood: 'sparkle', look: [0, 0], hops: SAG_HOPS })
            c.font = `700 28px ${MONO}`; c.fillStyle = (tt % 1) < 0.6 ? RED : 'rgba(255,93,115,0.4)'; c.textAlign = 'left'; c.fillText('● LIVE FEED · SAG', rc.x + 30, rc.y + 44)
          }
        }
        const mc = drawMissionControl(x, t, { mission: 'MISSION 09', screenY: 420, screens: cheer ? { big: 'live', kind: 'earth', target: 'HOUSTON', text: 'TOUCHDOWN · WELCOME HOME, SAG' } : t < T.feed ? { big: 'track', progress: 0.08, target: 'SGR A*' } : { big: feed }, cheer: cheer ? 1 : 0, cheerAt: T.cheer })
        const [dx, dy] = mc.spots.director
        drawSaturn(x, dx, dy, 240, t, { mood: cheer ? 'happy' : t < 9.2 ? 'neutral' : 'squint', look: [0, -1], hops: SAT_HOPS })
      } else if (t < T.centre || t >= T.warp2) {
        // ── THE COCKPIT (the TRY; then the warp home)
        const home = t >= T.warp2
        const warp = home ? 1 : clamp(1 - prog(t, T.drop, T.centre))
        cockpit(x, t, { warp, speed: home ? 1.4 : 1, label: home ? '▼ TO HOUSTON' : '▲ TO THE CENTRE' })
        seatBack(x, 330); seatBack(x, 750)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        buckledPack(x, t, 750, 1180, 0)
        const lookSeat = !home && t > T.seat - 0.2 && t < T.selfie
        const mood = home ? (t < T.gem ? 'happy' : 'sparkle') : t < T.seat ? 'wide' : t < T.selfie ? 'neutral' : t < T.nosig ? 'happy' : t < T.drop ? 'squint' : 'wide'
        const look = home ? [1, -0.4] : lookSeat ? [1, 0.3] : t < T.selfie ? [0, -1] : t < T.nosig ? [1, -0.6] : [0, 1]
        drawSpaceSuit(x, 330, 1160, 280, t, { sign: 'sagittarius', helmet: true, mood, look, hops: SAG_HOPS, seed: 3 })
        seatFront(x, 330); seatFront(x, 750)
        if (!home) {
          const pk = popIn(t, T.selfie + 0.2, 0.3) * outK(t, [T.sad + 0.4, T.sad + 0.7])
          selfiePhone(x, t, 520, 960, pk)
          const fl = prog(t, T.flash - 0.03, T.flash + 0.35)
          if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = fl < 0.12 ? fl / 0.12 : 1 - ease.outQuad((fl - 0.12) / 0.88); R(x, '#fffbf0', 0, 0, 1080, 1920); x.restore() }
        } else {
          // the signal comes back
          const sk = popIn(t, T.signal, 0.3, 2.2)
          if (sk > 0.02) {
            x.save(); x.translate(540, 1240); x.scale(sk, sk)
            R(x, INK, -170, -36, 340, 72); R(x, '#14112a', -164, -30, 328, 60)
            x.font = `700 28px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'center'; x.fillText('▂▃▅▇ SIGNAL: BACK', 0, 10); x.textAlign = 'left'
            x.restore()
          }
        }
      } else {
        // ── THE HEART OF THE GALAXY (arrival, the ring, the turn)
        const ck = ease.outCubic(prog(t, T.centre, T.centre + 1.2))
        galacticCentre(x, t, ck)
        const rr = lerp(120, 210, ease.inOutCubic(prog(t, ...T.ring)))
        const closeK = inn(t, T.close, T.fact2) ? 1 : 0
        drawRing(x, t, 540, 760, rr, prog(t, T.ring[0], T.ring[1]))
        snapFrame(x, t, 540, 760, rr)
        const fp = ease.inOutCubic(prog(t, ...T.flip))
        if (!closeK) {
          x.save(); x.translate(540, 1300); x.rotate(Math.PI * fp); x.translate(-540, -1300)
          drawRocket(x, 540, 1300, 300, t, { color: SAG.color, flame: t < T.centre + 1 ? 1 - prog(t, T.centre, T.centre + 1) : t > T.flip[0] ? 0.6 : 0.15, shake: 0 })
          arrowBits(x, 540, 1300, 300)
          x.restore()
        } else {
          // the close-up: the ring glowing in Sag's wide eyes
          x.save(); x.globalCompositeOperation = 'lighter'
          const gl = x.createRadialGradient(540, 1180, 0, 540, 1180, 520); gl.addColorStop(0, 'rgba(255,170,90,0.35)'); gl.addColorStop(1, 'rgba(255,170,90,0)')
          x.fillStyle = gl; x.fillRect(0, 600, 1080, 1200); x.restore()
          drawSpaceSuit(x, 540, 1260, 520, t, { sign: 'sagittarius', helmet: true, mood: 'sparkle', look: [0, -1], blink: false, seed: 3 })
        }
      }
      x.restore()

      // ── chrome over every set
      missionHUD(x, t, { ...hudState(t), at: T.hookOut, out: T.last - 0.3 })
      genreBug(x, t, { text: t < T.cheer ? 'LIVE · HOUSTON' : 'TOUCHDOWN', color: t < T.cheer ? RED : '#3fbf7f' })
      factChip(x, t, FACT1); factChip(x, t, FACT2)
      for (const at of [T.mc, T.cockpit, T.centre, T.close, T.wide, T.warp2, T.cheer, T.pad]) whip(x, t, at, { dir: at === T.centre || at === T.pad ? -1 : 1 })
      box.update(t)
      hook.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the cut into the cockpit, the arrival at the centre, the landing. cardfx keeps the middle one.
const CUTS = [{ t: T.cockpit, kind: 'flip' }, { t: T.centre, kind: 'deal' }, { t: T.pad, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E09' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const r3 = v => +v.toFixed(3)
const NOTE = [392, 466.16, 523.25, 587.33, 698.46, 783.99, 932.33]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count), ...launchCues(T.lift),
  ['pop', T.boxOpen, 739.99, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATT]: 440, [SAGT]: 659.25, [GEMT]: 880 } }),
  ['pop', T.feed, 1046.5, 0.04, 0.2], ['tick', T.feed + 0.05, 0.03],
  ['pop', T.seat, 392, 0.035, 0.3],
  ['pop', T.selfie + 0.2, 1174.66, 0.04, 0.1], ['tick', T.flash, 0.1], ['glitter', T.flash, T.flash + 0.5],
  ['pop', T.nosig, 196, 0.06, 0], ['pluck', T.nosig + 0.05, 233.08, 0.05, 0.6, 0],
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.ring[0] - 0.4, T.ring[1], 0.06], ['bell', T.ring[1], 1567.98, 0.03, 2.4, 0], ['glitter', T.ring[0], T.ring[1] + 0.5],
  ...factChipCues(FACT1.at, { dur: FACT1.dur }), ...factChipCues(FACT2.at, { dur: FACT2.dur }),
  ['tick', T.snap, 0.08], ['pop', T.snap + 0.05, 1318.51, 0.04, 0],
  ['whoosh', T.flip[0], 0.8, 0.035],
  ...warpCues(T.warp2 - 0.6), ...warpCues(T.drop - 0.4, { len: 1.0 }),
  ['pop', T.signal, 1318.51, 0.04, 0], ['pop', T.signal + 0.1, 1567.98, 0.035, 0],
  ...cheerCues(T.cheer, { len: 1.7 }),
  ['pop', T.hug, 523.25, 0.045, 0], ['bell', T.hug + 0.05, 1046.5, 0.03, 1.6, 0], ['glitter', T.hug, T.hug + 0.8],
  ['whoosh', T.open, 0.4, 0.02], ['pop', T.open + 0.35, 783.99, 0.04, 0.3],
  ['pop', r3(T.last), NOTE[2], 0.026, -0.15], ['pop', r3(T.last + 0.09), NOTE[3], 0.026, 0.15],
  ['pop', r3(T.last + 0.45), 1174.66, 0.05, 0], ['pluck', r3(T.last + 0.45), 783.99, 0.045, 0.8, 0], ['bell', r3(T.last + 0.55), 1567.98, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...[T.mc, T.cockpit, T.centre, T.close, T.wide, T.warp2, T.cheer, T.pad].flatMap(at => whipCues(at)),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawGaspLines; void gaspZoom; void gaspCues
