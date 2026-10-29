// st11pisces (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E12, the season close) · story 0–55.6, then the
// end card.  "Pisces sailed to the *windiest* planet."  A dreamy voyage to Neptune, Pisces's modern ruler: the fastest
// winds measured in the solar system, and a planet found in 1846 by maths before anyone saw it.
//   0.00  Frame 0: the launch pad. Pisces, suited up, mid-hoist of a pixel sail rigged to its rocket. Hook card.
//   1.20  3 · 2 · 1 · LIFTOFF (3.9), the sail filling.
//   6.50  Mission Control. SATURN: "Pisces, why does your rocket have a *sail?*"  Feed: "i want to *feel* the wind on
//         Neptune."  (WANT)  12.0 The cockpit: two pixel fish tied by a cord hang from the mirror (the myth: the rewatch
//         bait). "i’ve dreamed about Neptune *forever.*"
//  16.00  Neptune, deep blue, wind streaks racing round it. ★ REAL SKY: the fastest winds measured in the solar system.
//         "ooh, it’s so *blue*— wait. it’s so *windy.*"  20.0 The wind grabs the sail: the rocket spins. "WHOAAA— i can’t
//         *steer!*"  (TRY)
//  23.50  Mission Control: VIRGO at the front console. "Pisces, breathe. count with me. *one…*"  26.0 back out: the spin
//         slows. "two… three… now let *go* of the sail."
//  29.00  The sail line goes; the rocket drifts into the still blue heart of the storm. "…oh. it’s *quiet* in here."
//         ★ REAL SKY: found in 1846 by maths, before anyone saw it. (TURN)  VIRGO: "i did the maths. i knew you’d find the
//         *calm.*"  "you believed in me before you could *see* me?"  "always. now come *home.*"
//  43.40  The sail home, calm.  44.80 SEASON CLOSE: all twelve rockets come down over Houston, one per sign.
//  47.40  Mission Control cheers: ALL TWELVE HOME.
//  48.80  The pad: the whole cast cheering in front of the twelve rockets; Pisces and Virgo hug. VIRGO: "welcome home,
//         *dreamer.*"  The sail, folded, on Pisces's rocket (frame 0's framing, now calm).
//  52.20  LAST: "Find the *calm* | in the storm."   55.6 end card.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSaturn, drawBits } from '../../st5cast.js'
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { whip, whipCues, popIn } from '../../st9saghome.js'
import { R, drawPad, cockpit, seatBack, seatFront, confetti, hearts } from '../../st11sag/kit.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'

export const DURATION = 60
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff5d73', MINT = '#7dffb8', SKYB = '#8fc8ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const PIS = signStar('pisces'), VIR = signStar('virgo')
const PIT = '♓ PISCES', VIT = '♍ VIRGO', SATT = '♄ SATURN'

const T = {
  hookOut: 2.9, count: 1.2, lift: 3.9, mc: 6.5, feed: 9.6, cockpit: 12.0, arrive: 16.0, fact1: 16.6, gust: 20.0,
  mc2: 23.5, slow: 26.0, letGo: 29.0, calm: 30.0, fact2: 32.0, sailHome: 43.4, fleet: 44.8, cheer: 47.4, pad: 48.8,
  hug: 49.0, last: 52.2, boxOpen: 6.6, boxClose: 51.6, out: [55.0, 55.45], ghost: 13.8,
}
const LINES = [
  { t: 6.8, speaker: SATT, text: 'Pisces, why does your rocket have a *sail?*', color: '#e9c37a' },
  { t: 9.95, speaker: PIT, text: 'i want to *feel* the wind on Neptune.', color: PIS.color },
  { t: 12.9, speaker: PIT, text: 'i’ve dreamed about Neptune *forever.*', color: PIS.color },
  { t: 17.05, speaker: PIT, text: 'ooh, it’s so *blue*— wait. it’s so *windy.*', color: PIS.color },
  { t: 20.55, speaker: PIT, text: 'WHOAAA— i can’t *steer!*', color: PIS.color },
  { t: 23.7, speaker: VIT, text: 'Pisces, breathe. count with me. *one…*', color: VIR.color },
  { t: 27.15, speaker: VIT, text: 'two… three… now let *go* of the sail.', color: VIR.color },
  { t: 30.5, speaker: PIT, text: '…oh. it’s *quiet* in here.', color: PIS.color },
  { t: 35.0, speaker: VIT, text: 'i did the maths. i knew you’d find the *calm.*', color: VIR.color },
  { t: 38.3, speaker: PIT, text: 'you believed in me before you could *see* me?', color: PIS.color },
  { t: 41.5, speaker: VIT, text: 'always. now come *home.*', color: VIR.color },
  { t: T.hug + 0.1, speaker: VIT, text: 'welcome home, *dreamer.*', color: VIR.color },
]
const CPS = 28
const FACT1 = { at: T.fact1, dur: 3.3, label: '★ REAL SKY', text: 'Neptune has the fastest winds measured in the solar system.', y: 1190 }
const FACT2 = { at: T.fact2, dur: 2.9, label: '★ REAL SKY', text: 'Neptune was found in 1846 by maths, before anyone saw it.', y: 1190 }
const HOOK = 'Pisces sailed to the | *windiest* planet.'
const LAST = 'Find the *calm* | in the storm.'
export const GHOST = { at: T.ghost, x: 82, y: 880, from: 'left', where: 'stowaway: leaning out from behind the cockpit’s left window strut, beside the two fish on their cord' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inn = (t, a, b) => t >= a && t < b

function hudState(t) {
  const status = t < T.lift ? 'RIGGING SAIL' : t < T.cockpit ? 'LIFTOFF' : t < T.arrive ? 'SAILING' : t < T.gust ? 'IN ORBIT' : t < T.letGo ? 'SPINNING' : t < T.sailHome ? 'CALM' : t < T.cheer ? 'HEADING HOME' : 'HOME'
  return { mission: 'MISSION 12', target: 'NEPTUNE', status }
}

// ── props
/** the pixel sail on a mast at the rocket's side (fill 0…1: slack → full; folded: furled on the mast) */
function sail(x, t, cx, cy, h, { fill: f = 1, folded = 0, flap = 1 } = {}) {
  const mx = cx + h * 0.2, top = cy - h * 0.42, bot = cy + h * 0.2
  R(x, INK, mx - 6, top - 10, 12, bot - top + 20); R(x, '#c9bfae', mx - 3, top - 8, 6, bot - top + 16)
  if (folded >= 1) { R(x, INK, mx - 16, top + 10, 32, (bot - top) * 0.7); R(x, '#d8ecff', mx - 10, top + 16, 20, (bot - top) * 0.7 - 12); return }
  const belly = (0.15 + 0.35 * f) * h * (1 - folded) + Math.sin(t * 7) * 8 * flap
  const c = Math.max(6, Math.round(h / 60))
  for (let y = top; y < bot; y += c) {
    const v = (y - top) / (bot - top)
    const w = Math.sin(Math.PI * v) * belly + v * h * 0.25 * (1 - folded)
    for (let xx = 0; xx < w; xx += c) {
      const edge = xx + c >= w || y + c >= bot
      x.fillStyle = edge ? INK : ((Math.floor((y - top) / (c * 4)) % 2) ? '#d8ecff' : '#b9d8ff')
      x.fillRect(Math.round(mx + 6 + xx), Math.round(y), c, c)
    }
  }
  // the two fish on the sail (Pisces's glyph, stitched)
  x.font = `700 ${Math.round(h * 0.12)}px 'EB Garamond', serif`; x.fillStyle = PIS.color; x.textAlign = 'center'
  x.fillText('♓', mx + 6 + belly * 0.6, cy - h * 0.08); x.textAlign = 'left'
}
/** rocket + sail as one body, rotated round (cx, cy) */
function sailRocket(x, t, cx, cy, h, rot, o = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.translate(-cx, -cy)
  const r = drawRocket(x, cx, cy, h, t, { color: PIS.color, pilot: o.pilot ?? PIS.color, flame: o.flame ?? 0, shake: o.shake ?? 0, smoke: o.smoke ?? 0, trail: o.trail ?? 0 })
  sail(x, t, cx, cy, h, o)
  x.restore()
  return r
}
/** Neptune's wind: white streaks racing round the planet */
function wind(x, t, cx, cy, r, k = 1, speed = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k); x.lineCap = 'round'
  for (let i = 0; i < 16; i++) {
    const rr = r * (1.12 + (i % 5) * 0.12), a0 = -t * speed * (1.6 + (i % 3) * 0.5) + i * 1.3
    x.strokeStyle = i % 3 ? 'rgba(220,240,255,0.75)' : 'rgba(150,200,255,0.6)'; x.lineWidth = 6 - (i % 3)
    x.beginPath(); x.ellipse(cx, cy, rr, rr * 0.42, -0.2, a0, a0 + 0.5 + (i % 4) * 0.15); x.stroke()
  }
  x.restore()
}
/** the still heart of the storm: a quiet deep-blue pool with slow rings, the wind circling outside */
function calmHeart(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  const g = x.createRadialGradient(540, 860, 0, 540, 860, 900)
  g.addColorStop(0, '#2a5fd0'); g.addColorStop(0.45, '#1a3a9a'); g.addColorStop(1, '#0a1240')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 6; i++) {
    const p = ((t * 0.12 + i / 6) % 1)
    x.strokeStyle = `rgba(190,225,255,${0.35 * (1 - p)})`; x.lineWidth = 4
    x.beginPath(); x.ellipse(540, 900, 120 + p * 620, (120 + p * 620) * 0.45, 0, 0, Math.PI * 2); x.stroke()
  }
  x.restore()
  wind(x, t, 540, 900, 760, k * 0.8, 0.6)
}
const FISH = ['.ffff..f', 'fFFFFf.f', 'fFeFFFff', 'fFFFFFff', 'fFFFFf.f', '.ffff..f']
/** the two fish tied by a cord, hanging from the cockpit mirror */
function twoFish(x, t, cx, cy) {
  const sw = Math.sin(t * 1.8) * 0.12
  x.save(); x.translate(cx, cy); x.rotate(sw)
  R(x, INK, -2, 0, 4, 90)
  x.strokeStyle = PINK; x.lineWidth = 4; x.beginPath(); x.moveTo(-40, 120); x.quadraticCurveTo(0, 150, 40, 120); x.stroke()
  drawBits(x, FISH, { f: INK, F: PIS.color, e: BONE }, -46, 108, 5)
  drawBits(x, FISH, { f: INK, F: '#9fd0ff', e: BONE }, 46, 108, 5, { flip: true })
  R(x, INK, -40, 88, 80, 4)
  x.restore()
}
// the season close: twelve rockets, one per sign, coming down over Houston in two rows
const FLEET = SIGNS.map((s, i) => {
  const back = i % 2 === 0, col = Math.floor(i / 2)
  return { id: s.id, color: s.color, x: 120 + col * 168 + (back ? 0 : 84), y: back ? 1040 : 1200, size: back ? 190 : 220, at: T.fleet + (i % 6) * 0.22 + (back ? 0 : 0.1) }
})

async function build(stage) {
  try {
    await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'EB Garamond'", "600 34px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, size: 100, accentSize: 160, top: 300, accentColor: SKYB })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 280, open: T.boxOpen, close: T.boxClose, cps: CPS })
  const last = popText(root, LAST, { top: 320, size: 108, accentSize: 176, at: T.last, gap: 0.09, accentColor: SKYB, wobble: true, late: 3, lateAt: T.last + 0.45, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const PI_HOPS = talkHops(LINES, PIT, { cps: CPS })
  const VI_HOPS = [...talkHops(LINES, VIT, { cps: CPS }), T.hug]
  const SAT_HOPS = [...talkHops(LINES, SATT, { cps: CPS }), T.cheer + 0.1, T.cheer + 0.6]

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const shk = t > T.lift && t < T.lift + 1.6 ? Math.sin(t * 70) * 8 * (1 - prog(t, T.lift, T.lift + 1.6)) : 0
      x.save(); x.translate(shk, 0)

      if (t < T.mc) {
        // ── THE PAD (frame 0, liftoff)
        drawPad(x, t)
        const climb = ease.inQuad(prog(t, T.lift, T.mc)) * 1700
        const smk = clamp((t - T.lift + 0.6) / 0.5) * (1 - prog(t, T.lift + 1.4, T.mc))
        sailRocket(x, t, 540, 1130 - climb, 640, 0, { pilot: t > 3.9 ? PIS.color : null, flame: t >= T.lift - 0.4 ? 1.3 * clamp((t - T.lift + 0.4) / 0.4) : 0, shake: t > T.lift - 0.8 ? 4 : 0, smoke: smk, fill: 0.65 + 0.35 * prog(t, 0, 3.6) })
        const inside = prog(t, 3.4, 3.8)
        if (inside < 1) {
          // mid-hoist: pulling the sail's line down hand over hand
          const pull = Math.abs(Math.sin(t * 4)) * 18
          x.save(); x.globalAlpha = 1 - inside
          R(x, INK, 744, 740, 4, 330 + pull)
          drawSpaceSuit(x, 740, 1080 + pull * 0.3, 200, t, { sign: 'pisces', helmet: true, mood: 'sparkle', look: [-0.5, -1], hops: [0.8, 2.0], seed: 12 })
          x.restore()
        }
        drawCountdown(x, t, { at: T.count, x: 300, y: 700, size: 170 })
      } else if (t < T.cockpit || inn(t, T.mc2, T.slow) || inn(t, T.cheer, T.pad)) {
        // ── MISSION CONTROL
        const cheer = t >= T.cheer, guiding = inn(t, T.mc2, T.slow)
        const feed = (c, rc, tt) => {
          starfield(c, tt, { speed: 0.6 })
          const fk = popIn(tt, T.feed, 0.35, 2.2)
          if (fk > 0.02) {
            drawSpaceSuit(c, rc.x + rc.w / 2, rc.y + rc.h / 2 + 40, 300 * fk, tt, { sign: 'pisces', helmet: true, mood: 'sparkle', look: [0, 0], hops: PI_HOPS, seed: 12 })
            c.font = `700 28px ${MONO}`; c.fillStyle = (tt % 1) < 0.6 ? RED : 'rgba(255,93,115,0.4)'; c.textAlign = 'left'; c.fillText('● LIVE FEED · PISCES', rc.x + 30, rc.y + 44)
          }
        }
        const spin = (c, rc, tt) => {
          starfield(c, tt, { speed: 1.2 })
          drawPlanet(c, rc.x + rc.w * 0.7, rc.y + rc.h * 0.5, 150, tt, { kind: 'neptune', glow: 0.5 })
          c.save(); c.translate(rc.x + rc.w * 0.3, rc.y + rc.h * 0.5); c.rotate(tt * 6); drawRocket(c, 0, 0, 160, tt, { color: PIS.color, flame: 0 }); c.restore()
        }
        const fleetScr = (c, rc, tt) => {
          starfield(c, tt, { speed: 0.4 })
          FLEET.forEach((f, i) => drawRocket(c, rc.x + 70 + i * 69, rc.y + rc.h * 0.55 + (i % 2) * 40, 90, tt, { color: f.color, flame: 0, pilot: f.color, seed: i }))
        }
        const screens = cheer ? { big: fleetScr, text: 'ALL TWELVE HOME · WELCOME BACK' } : guiding ? { big: spin, text: 'MISSION 12 · SPINNING' } : t < T.feed ? { big: 'track', progress: 0.08, target: 'NEPTUNE' } : { big: feed }
        const mc = drawMissionControl(x, t, { mission: cheer ? 'SEASON FINALE' : 'MISSION 12', screenY: 420, screens, cheer: cheer ? 1 : 0, cheerAt: T.cheer })
        const [dx, dy] = mc.spots.director
        drawSaturn(x, guiding ? dx - 260 : dx, dy, 230, t, { mood: cheer ? 'happy' : guiding ? 'wide' : 'squint', look: [0, -1], hops: SAT_HOPS })
        if (guiding || cheer) drawStarChar(x, guiding ? dx + 60 : dx + 250, dy + 30, guiding ? 250 : 190, t, { color: VIR.color, glyph: VIR.glyph, mood: guiding ? 'neutral' : 'happy', look: [0, -1], hops: VI_HOPS, seed: 10 })
        if (cheer) confetti(x, t, T.cheer, SIGNS.map(s => s.color))
      } else if (t < T.arrive) {
        // ── THE COCKPIT
        cockpit(x, t, { warp: 0.3, speed: 0.8, label: '▲ TO NEPTUNE', tint: '#141d3e' })
        seatBack(x, 330, '#3a3f8a'); seatBack(x, 750, '#3a3f8a')
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        twoFish(x, t, 180, 470)
        drawSpaceSuit(x, 330, 1160, 280, t, { sign: 'pisces', helmet: true, mood: 'sparkle', look: [1, -0.6], hops: PI_HOPS, seed: 12 })
        seatFront(x, 330, '#4a50a8'); seatFront(x, 750, '#4a50a8')
        // Virgo's checklist taped to the empty seat (she's in Houston)
        x.save(); x.translate(750, 1150); x.rotate(-0.06); R(x, INK, -70, -86, 140, 172); R(x, BONE, -64, -80, 128, 160)
        x.font = `700 16px ${MONO}`; x.fillStyle = VIR.color; x.fillText('FOR PISCES', -54, -54); x.fillStyle = INK
        ;['[x] SNACKS', '[x] SAIL', '[ ] BREATHE'].forEach((l, i) => x.fillText(l, -54, -20 + i * 30)); x.restore()
      } else if (t < T.calm) {
        // ── NEPTUNE (arrival, the wind, the spin; Virgo's count slows it)
        x.save(); x.fillStyle = 'rgba(4,10,40,0.35)'; x.fillRect(0, 0, 1080, 1920); x.restore()
        const np = drawPlanet(x, 600, 780, 300, t, { kind: 'neptune', glow: 0.7, face: t < T.gust ? 'happy' : 'wide', look: [-1, 0.6] })
        const windK = 0.5 + 0.5 * prog(t, T.arrive, T.gust) - 0.4 * prog(t, T.slow, T.letGo)
        wind(x, t, np.x, np.y, np.r, windK, t < T.gust ? 1 : 2)
        // the rocket: drifting in, then grabbed and spun, then slowing
        let spinA = 0
        if (t >= T.gust) {
          const fast = 9 * (1 - prog(t, T.slow, T.letGo + 0.6))
          spinA = (t - T.gust) * fast + Math.sin(t) * 0.2
        }
        const rx = t < T.arrive + 1 ? lerp(-150, 280, ease.outCubic(prog(t, T.arrive, T.arrive + 1))) : 280 + Math.sin(t * 1.3) * 20
        sailRocket(x, t, rx, 1190, 300, spinA + 0.3, { fill: t < T.gust ? 0.6 : 1, flap: t < T.gust ? 1 : 2 })
        if (t >= T.gust && t < T.letGo) for (let i = 0; i < 5; i++) drawPixelStar(x, rx + Math.cos(i * 1.3 + t * 5) * 210, 1190 + Math.sin(i * 1.3 + t * 5) * 210, 20, 1, '#cfe6ff')
      } else if (t < T.sailHome) {
        // ── THE CALM (the TURN): the still blue heart of the storm
        calmHeart(x, t, ease.outCubic(prog(t, T.calm, T.calm + 1.2)))
        const r = drawSpaceSuit(x, 540, 980 + Math.sin(t * 0.9) * 14, 300, t, { sign: 'pisces', helmet: true, mood: t < 33 ? 'wide' : t < 38.3 ? 'sparkle' : t < 41.5 ? 'heart' : 'happy', look: [0, -0.4], hops: PI_HOPS, seed: 12 })
        // the sail, let go, drifting slowly away in the calm
        const sp = prog(t, T.calm, T.sailHome)
        x.save(); x.globalAlpha = 1 - sp * 0.6; sail(x, t, 820 + sp * 160, 640 - sp * 200, 240, { fill: 0.4, flap: 0.3 }); x.restore()
        void r
      } else if (t < T.fleet) {
        // ── THE SAIL HOME (calm, the sail re-rigged)
        starfield(x, t, { speed: 1.2, warp: 0.6 })
        sailRocket(x, t, 540, 1050, 520, 0, { flame: 0.8, trail: 1, fill: 0.8, flap: 0.4 })
      } else {
        // ── THE SEASON CLOSE: twelve rockets come down over Houston
        drawPad(x, t)
        for (const f of FLEET) {
          const p = ease.outCubic(prog(t, f.at, f.at + 1.4))
          if (p <= 0) continue
          drawRocket(x, f.x, lerp(-300, f.y, p), f.size, t, { color: f.color, pilot: f.color, flame: p < 1 ? 1.1 : 0, smoke: p > 0.85 ? 0.4 * (1 - prog(t, f.at + 1.4, f.at + 3)) : 0, seed: f.id.length })
          if (f.id === 'pisces' && p >= 1) sail(x, t, f.x, f.y, f.size, { folded: 1 })
        }
      }
      if (t >= T.pad) {
        // ── THE PAD, the end: the whole cast cheers in front of the twelve rockets; Pisces and Virgo hug
        drawPad(x, t)
        for (const f of FLEET) {
          drawRocket(x, f.x, f.y, f.size, t, { color: f.color, pilot: null, flame: 0, seed: f.id.length })
          if (f.id === 'pisces') sail(x, t, f.x, f.y, f.size, { folded: 1 })
        }
        const crew = SIGNS.filter(s => s.id !== 'pisces' && s.id !== 'virgo')
        crew.forEach((s, i) => drawStarChar(x, 80 + i * 102 + (i > 4 ? 140 : 0) - (i > 4 ? 60 : 0), 1420 - (i % 2) * 24, 100, t, { color: s.color, glyph: null, mood: 'happy', hops: [T.pad + 0.1 + (i % 4) * 0.12, T.pad + 0.7 + (i % 3) * 0.1, T.pad + 1.4, T.last + 0.4 + (i % 4) * 0.08], seed: 40 + i, glow: 0.6 }))
        const hk = ease.outCubic(prog(t, T.hug - 0.2, T.hug + 0.25))
        const px = lerp(420, 500, hk), vx = lerp(660, 590, hk)
        drawSpaceSuit(x, px, 1310, 200, t, { sign: 'pisces', helmet: false, mood: 'happy', look: [1, 0], squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, hops: [T.last + 0.4], seed: 12 })
        drawStarChar(x, vx, 1315, 190, t, { color: VIR.color, glyph: VIR.glyph, mood: t < T.hug + 1 ? 'happy' : 'heart', look: [-1, 0], hops: VI_HOPS, squash: t > T.hug && t < T.hug + 0.4 ? 0.12 : 0, seed: 10 })
        hearts(x, t, 545, 1160, T.hug, T.last)
        confetti(x, t, T.pad, SIGNS.map(s => s.color), 3)
      }
      x.restore()

      // ── chrome
      missionHUD(x, t, { ...hudState(t), at: T.hookOut, out: T.last - 0.3 })
      genreBug(x, t, { text: t < T.fleet ? 'LIVE · HOUSTON' : 'SEASON FINALE', color: t < T.fleet ? RED : '#3fbf7f' })
      factChip(x, t, FACT1); factChip(x, t, FACT2)
      for (const at of [T.mc, T.cockpit, T.arrive, T.mc2, T.slow, T.calm, T.sailHome, T.fleet, T.cheer, T.pad]) whip(x, t, at, { dir: at === T.slow || at === T.pad ? -1 : 1 })
      box.update(t)
      hook.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.arrive, kind: 'flip' }, { t: T.calm, kind: 'deal' }, { t: T.pad, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E12' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [415.3, 466.16, 523.25, 554.37, 622.25, 698.46, 783.99]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count), ...launchCues(T.lift),
  ['pop', T.boxOpen, 622.25, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATT]: 392, [PIT]: 783.99, [VIT]: 622.25 } }),
  ...factChipCues(FACT1.at, { dur: FACT1.dur }), ...factChipCues(FACT2.at, { dur: FACT2.dur }),
  ['pop', T.feed, 1046.5, 0.04, 0.2],
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.arrive - 0.6, T.arrive, 0.05], ['bell', T.arrive + 0.1, 1244.51, 0.03, 2.2, 0],
  ['whoosh', T.gust, 1.4, 0.06], ['whoosh', T.gust + 1.2, 1.2, 0.05], ['whoosh', T.gust + 2.4, 1.0, 0.04],
  ...[0, 1.5].map(d => ['pluck', r3(T.mc2 + 0.4 + d), 830.61, 0.03, 0.6, 0]),
  ['bell', 24.9, 1046.5, 0.025, 1.6, 0], ['bell', 27.0, 1174.66, 0.025, 1.6, 0], ['bell', 27.6, 1244.51, 0.025, 1.6, 0],
  ['whoosh', T.letGo, 0.8, 0.03],
  ['riser', T.calm - 0.4, T.calm + 0.8, 0.04], ['bell', T.calm + 0.5, 1661.22, 0.025, 3.0, 0], ['glitter', T.calm + 0.3, T.calm + 1.4],
  ...warpCues(T.sailHome - 0.5, { len: 1.0 }),
  ...FLEET.map((f, i) => ['pop', r3(f.at + 1.3), NOTE[i % NOTE.length], 0.03, (f.x - 540) / 700]),
  ['riser', T.fleet - 0.4, T.fleet + 1.6, 0.05], ['crash', T.fleet + 1.6, { gain: 0.05, len: 2.0 }],
  ...cheerCues(T.cheer, { len: 1.4 }),
  ['pop', T.hug, 523.25, 0.045, 0], ['bell', T.hug + 0.05, 1046.5, 0.03, 1.6, 0], ['glitter', T.pad, T.pad + 1.2], ...cheerCues(T.pad + 0.2, { len: 1.6 }),
  ['pop', r3(T.last), NOTE[2], 0.026, -0.15], ['pop', r3(T.last + 0.09), NOTE[3], 0.026, 0.15],
  ['pop', r3(T.last + 0.45), 1244.51, 0.05, 0], ['pluck', r3(T.last + 0.45), 830.61, 0.045, 0.8, 0], ['bell', r3(T.last + 0.55), 1661.22, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...[T.mc, T.cockpit, T.arrive, T.mc2, T.slow, T.calm, T.sailHome, T.fleet, T.cheer, T.pad].flatMap(at => whipCues(at)),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
