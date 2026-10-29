// st11cancer (60 s vertical, Star Talk season 11 "Far Out", S11 E04: Cancer lost in the Beehive) · story 0–55.6, then
// the shared end card. Kit: st11space.js.
//   0.00  HOOK  frame 0: "Cancer is lost in the *Beehive*." The ♋ star in its suit, wide-eyed, turning among hundreds of
//               gold stars, hugging its crab shell. Then "EARLIER…": the Houston pad at dusk, Capricorn seeing it off:
//               "i'll leave the porch light *on*." 3… 2… 1… liftoff.
//   6.40  WANT  In flight, the HUD: THE BEEHIVE (M44) · ABOUT 600 LIGHT-YEARS · HOMING. CANCER: "visit the beehive. then
//               straight *home*." Houston: SATURN: "copy. keep the *moon* in sight."
//  12.60  TRY   the set-piece: into the Beehive, hundreds of warm stars, every one glowing like a lit window. "home?" …
//               "nope." "home?" … "nope." The compass spins, STATUS: LOST, and Cancer hides in its shell. The ghost
//               peeks out from behind the rocket. A faint voice: ☾ THE MOON: "look for *me*."
//  30.00  TURN  ★ REAL SKY: the Beehive Cluster (M44) is about 600 light-years away, an open cluster with hundreds of stars
//               · from home, without a telescope, it's just a fuzzy patch (the view from the porch, zooming in). Cancer
//               spots one silver light among the gold: "i know *that* light."
//  42.00  WIN   It follows the Moon's light home (the Moon smiles), Houston waves and cheers, and it lands by a little house
//               where one porch light is on. Capricorn has waited up. CANCER: "you left it *on*." CAPRICORN: "i said i
//               *would*." The hug.
//  52.20  LAST  the porch (frame 0's wide eyes, now soft; one light instead of hundreds, the Beehive a fuzzy patch above):
//               "Home is a *light* someone leaves on."
// Rewatch bait: adult Cancer's crab shell (st9cancerhome) rides in the porthole; the porch's window quilt is the
//   st9cancercrew blanket-fort pattern. Ghost: the stowaway, behind the rocket in the Beehive.
import { lerp, prog, ease, clamp, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, lineTimes } from '../../startalk.js'
import { drawSeedConstellation } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, DAY_FONTS } from '../../st9day.js'
import { drawShell, CAN } from '../../st9cancerhome.js'
import { drawCap } from '../../st9caphome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawCluster, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { drawPad, rect, box6, txt, pop01 } from './set.js'

export const DURATION = 60
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c', CYAN = '#7fe0ff', SILVER = '#dfe6ff', HIVE = '#ffd88a'
const CA = signStar('cancer')
const CAN_N = '♋ CANCER', CAP_N = '♑ CAPRICORN', MOON = '☾ THE MOON', SAT = '♄ SATURN · HOUSTON'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAC = '#8fd6f6'

const T = {
  hookOut: 2.5, earlier: 2.6, cd: 3.2, cdStep: 0.7, launch: 5.3,
  fly: 6.4, hud: 6.6, mc: 9.6, hive: 12.6, lost: 20.6, shell: 21.6, ghost: 23.0, turn: 30.0, chip1: 30.4, view: 30.0, chip2: 34.9,
  silver: 38.4, follow: 42.0, cheer: 44.6, land: 47.0, hug: 50.2, pad2: 52.2, last: 52.4, lastLand: 53.0, lastOut: [55.15, 55.55],
}
const LINES = [
  { t: 3.0, speaker: CAP_N, text: 'back by dinner. i’ll leave the porch light *on*.', color: '#9fe0a0' },
  { t: 6.9, speaker: CAN_N, text: 'visit the beehive. then straight *home*.', color: CAC },
  { t: 9.9, speaker: SAT, text: 'copy. keep the *moon* in sight, cancer.', color: '#f7dca0' },
  { t: 13.25, speaker: CAN_N, text: 'oh. they all look like *home*.', color: CAC },
  { t: 24.45, speaker: CAN_N, text: 'i don’t know which one is mine.', color: CAC },
  { t: 27.0, speaker: MOON, text: 'look for *me*, little crab.', color: SILVER },
  { t: 38.7, speaker: CAN_N, text: 'silver. not gold. i know *that* light.', color: CAC },
  { t: 42.4, speaker: MOON, text: 'this way. i’ll walk you home.', color: SILVER },
  { t: 48.0, speaker: CAN_N, text: 'you left it *on*.', color: CAC },
  { t: 50.0, speaker: CAP_N, text: 'i said i *would*.', color: '#9fe0a0' },
]
const CPS = 30
const BOX_CLOSE = [{ a: 15.9, b: 24.4 }, { a: 29.5, b: 38.6 }, { a: 45.3, b: 47.9 }]
const HOPS_CA = [...talkHops(LINES, CAN_N, { cps: CPS }), 16.4, 17.8, 19.2, T.pad2 + 0.3, T.pad2 + 1.1]
const HOPS_CAP = [...talkHops(LINES, CAP_N, { cps: CPS }), T.hug + 0.6, T.pad2 + 0.6]
const HOPS_SAT = talkHops(LINES, SAT, { cps: CPS })

// the Beehive: hundreds of warm stars (deterministic), each a little "lit window"
const HIVE_STARS = (() => { const r = rng(44), out = []; for (let k = 0; k < 150; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); out.push([540 + Math.cos(a) * d * 620, 900 + Math.sin(a) * d * 820, 3 + Math.round(r() * 3), r()]) } return out })()
const VISITS = [{ at: 16.4, x: 260, y: 640, say: 'home?' }, { at: 17.8, x: 820, y: 560, say: 'home?' }, { at: 19.2, x: 700, y: 1000, say: 'home?' }]

export const GHOST = { at: T.ghost, x: 900, y: 1290, where: 'the stowaway: peeking out from behind the rocket, lost in the Beehive with Cancer' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...SPACE_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Cancer is lost in the *Beehive*.', at: 0, out: T.hookOut, top: 200, accentColor: HIVE })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, cps: CPS, close: 52.0 })
  const last = popText(root, 'Home is a *light* | someone leaves on.', { top: 280, size: 104, accentSize: 164, at: T.last, gap: 0.1, accentColor: HIVE, wobble: true, late: 3, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const boxRoot = box.root
  const boxVis = t => { if (BOX_CLOSE.some(w => t >= w.a && t < w.b)) boxRoot.style.opacity = '0' }

  function hive(t, { dim = 1, gold = 1 } = {}) {
    HIVE_STARS.forEach(([sx, sy, s, ph], k) => {
      const tw = 0.6 + 0.4 * Math.sin(t * (1.5 + ph * 2) + k)
      x.globalAlpha = dim * tw
      if (s >= 5) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(sx, sy, 0, sx, sy, 34); g.addColorStop(0, 'rgba(255,216,138,0.5)'); g.addColorStop(1, 'rgba(255,216,138,0)'); x.fillStyle = g; x.fillRect(sx - 34, sy - 34, 68, 68); x.restore() }
      rect(x, sx - s, sy - s, s * 2, s * 2, gold ? (k % 5 ? HIVE : '#fff0c8') : '#ffffff')
    })
    x.globalAlpha = 1
  }
  // the little house with the porch light (Capricorn's), at night
  function house(t, cx, base, { light = 1, k = 1 } = {}) {
    x.save(); x.translate(cx, base); x.scale(k, k)
    rect(x, -900, 0, 1800, 600, '#1d1838'); rect(x, -900, 0, 1800, 8, '#2e2858')
    box6(x, -220, -300, 440, 300, '#3a2f5a', '#4a3e70')
    // roof
    for (let j = 0; j < 8; j++) rect(x, -250 + j * 16, -300 - (j + 1) * 18, 500 - j * 32, 20, j % 2 ? '#5a2a3a' : '#6a3240')
    // the window with the quilt (blanket-fort pattern)
    box6(x, -170, -230, 150, 120, '#ffd88a')
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) rect(x, -170 + i * 30, -230 + j * 30, 30, 30, CAN.sea)
    rect(x, -170, -175, 150, 6, INK); rect(x, -98, -230, 6, 120, INK)
    // door + porch
    box6(x, 40, -190, 110, 190, '#6a3f27', '#8a5636'); rect(x, 128, -100, 12, 12, GOLD)
    rect(x, 0, -10, 200, 10, '#4a4570')
    // the porch light
    const lx = 175, ly = -230
    rect(x, lx - 14, ly - 6, 28, 34, INK); rect(x, lx - 9, ly - 1, 18, 24, light > 0.5 ? '#fff3c8' : '#5a5878')
    if (light > 0) { x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, ly + 10, 0, lx, ly + 10, 260); g.addColorStop(0, `rgba(255,214,140,${0.55 * light})`); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(lx - 260, ly - 250, 520, 520); x.globalCompositeOperation = 'source-over' }
    x.restore()
  }
  function compass(t, k) {
    if (k <= 0.02) return
    x.save(); x.translate(180, 1330); x.scale(k, k)
    box6(x, -80, -80, 160, 160, 'rgba(6,10,32,0.94)', CYAN)
    const a = t * 9
    x.strokeStyle = '#ff5d6a'; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 55, Math.sin(a) * 55); x.stroke()
    x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(-Math.cos(a) * 40, -Math.sin(a) * 40); x.stroke()
    txt(x, 'HOME?', 0, 100, `700 22px ${MONO}`, CYAN)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      // ── HOOK: lost among hundreds of lights
      if (t < T.earlier) {
        starfield(x, t, { speed: 0.1, dim: 0.5 })
        hive(t)
        const r = drawSpaceSuit(x, 540, 1050, 300, t, { sign: 'cancer', mood: 'wide', look: [Math.sin(t * 2.4) > 0 ? 1 : -1, -1], seed: 3, blink: false })
        drawShell(x, r.x + 150, r.y + 90, 7)
        compass(t, 1)
      }
      // ── HOOK: EARLIER… the pad, Capricorn sees it off, the countdown
      else if (t < T.fly) {
        const launched = t >= T.launch
        drawPad(x, t)
        const ry = launched ? 1150 - 2400 * ease.inQuad(prog(t, T.launch, T.launch + 1.0)) : 1150
        const rk = drawRocket(x, 760, ry, 560, t, { color: CA.color, flame: launched ? 1.3 : 0.3, shake: launched ? 6 : 1, smoke: launched ? 1 : 0.3, pilot: t > 4.6 ? CA.color : null, seed: 2 })
        if (t > 4.6) drawShell(x, rk.window[0], rk.window[1] + rk.cell * 2.6, 4)
        if (t < 4.6) { const r = drawSpaceSuit(x, 330, 1300, 230, t, { sign: 'cancer', mood: 'sparkle', seed: 3, hops: HOPS_CA }); drawShell(x, r.x + 120, r.y + 80, 6) }
        drawCap(x, 140, 1340, 170, t, { mood: 'happy', hops: HOPS_CAP, seed: 8, look: [1, -1] })
        const ek = pop01(t, T.earlier, 0.25, 2) * (1 - ease.inCubic(prog(t, 4.0, 4.3)))
        if (ek > 0.02) { x.save(); x.translate(540, 300); x.scale(ek, ek); box6(x, -230, -50, 460, 100, 'rgba(16,9,38,0.94)', HIVE); txt(x, 'EARLIER…', 0, 4, `700 52px ${MONO}`, HIVE); x.restore() }
        drawCountdown(x, t, { at: T.cd, step: T.cdStep, x: 760, y: 600, size: 180 })
      }
      // ── WANT: the flight
      else if (t < T.mc) {
        starfield(x, t, { speed: 2.2, dim: 0.3 })
        const k = ease.outCubic(prog(t, T.fly, T.fly + 0.6))
        const r = drawRocket(x, 540, lerp(1500, 1020, k), 520, t, { color: CA.color, flame: 0.9, shake: 1, pilot: CA.color, trail: 1, seed: 2 })
        drawShell(x, r.window[0], r.window[1] + r.cell * 2.6, 4)
        missionHUD(x, t, { mission: 'MISSION 04', target: 'The Beehive (M44)', distance: 'about 600 light-years', status: 'homing mission', at: T.hud })
      }
      // ── WANT: Houston
      else if (t < T.hive) {
        const live = (cx, rc, tt) => { starfield(cx, tt, { speed: 2 }); const r = drawSpaceSuit(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 + 30, 300, tt, { sign: 'cancer', mood: 'happy', hops: HOPS_CA, seed: 3 }); drawShell(cx, r.x + 150, r.y + 90, 7); txt(cx, '● LIVE · MISSION 04', rc.x + 30, rc.y + 40, `700 26px ${MONO}`, '#ff5d6a', 'left') }
        const M = drawMissionControl(x, t, { mission: 'MISSION 04', screens: { big: live } })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'neutral', hops: HOPS_SAT, look: [0, -1] })
      }
      // ── TRY: the Beehive, every light looks like home
      else if (t < T.turn) {
        starfield(x, t, { speed: 0.1, dim: 0.45 })
        const zin = ease.outCubic(prog(t, T.hive, T.hive + 1.2))
        x.save(); x.translate(540, 900); x.scale(lerp(0.4, 1, zin), lerp(0.4, 1, zin)); x.translate(-540, -900); hive(t); x.restore()
        const rk = ease.outCubic(prog(t, T.hive, T.hive + 0.9))
        drawRocket(x, lerp(540, 880, rk), lerp(1700, 1300, rk), 280, t, { color: CA.color, flame: 1 - rk * 0.9, rot: 0.25 * rk, seed: 2, stowaway: pop01(t, T.ghost, 0.4, 1.4) * (1 - ease.inCubic(prog(t, T.ghost + 1.3, T.ghost + 1.6))) })
        // the visits: it drifts to a light, peers in, nope
        let cx = 460, cy = 1080
        VISITS.forEach((v, i) => { if (t >= v.at - 0.6) { const p = ease.inOutCubic(prog(t, v.at - 0.6, v.at)); const from = i ? VISITS[i - 1] : { x: 460, y: 1080 }; cx = lerp(from.x, v.x, p); cy = lerp(from.y + 120, v.y + 120, p) } })
        if (t > T.lost) { const p = ease.inOutCubic(prog(t, T.lost, T.lost + 0.8)); cx = lerp(cx, 480, p); cy = lerp(cy, 1060, p) }
        const inShell = t > T.shell && t < 26.8
        const mood = t < 16 ? 'sparkle' : t < T.lost ? 'neutral' : inShell ? 'sleepy' : t < 26.8 ? 'wide' : 'sparkle'
        const r = drawSpaceSuit(x, cx, cy, inShell ? 200 : 240, t, { sign: 'cancer', mood, hops: HOPS_CA, seed: 3, pop: pop01(t, T.hive + 0.7, 0.3, 2), zzz: false, squash: inShell ? 0.12 : 0 })
        drawShell(x, r.x, inShell ? r.y + 20 : r.y + 100, inShell ? 22 : 7)
        if (inShell) txt(x, '(hiding)', r.x, r.y + 140, `700 26px ${MONO}`, 'rgba(239,230,214,0.7)')
        VISITS.forEach(v => { speechBubble(x, t, { text: v.say, at: v.at, out: v.at + 0.7, x: v.x + 40, y: v.y - 10, size: 30, w: 200 }); speechBubble(x, t, { text: 'nope.', at: v.at + 0.7, out: v.at + 1.3, x: v.x + 40, y: v.y - 10, size: 30, w: 200, color: '#ff8fa0' }) })
        compass(t, pop01(t, T.lost, 0.3, 2))
        // the Moon's voice: a faint silver glow at the top
        if (t > 26.6) { const k = clamp((t - 26.6) / 0.8); x.save(); x.globalAlpha = 0.6 * k; drawPlanet(x, 900, 360, 46, t, { kind: 'moon', glow: 1.2, face: 'happy' }); x.restore() }
        missionHUD(x, t, { mission: 'MISSION 04', target: 'The Beehive (M44)', distance: 'about 600 light-years', status: t < T.lost ? 'which one is home?' : 'LOST' })
      }
      // ── TURN: the view from the porch, then the silver light
      else if (t < T.follow) {
        if (t < T.silver) {
          // from home: a fuzzy patch, zooming to hundreds of stars
          const z = ease.inOutCubic(prog(t, T.chip2 + 0.4, T.chip2 + 2.6))
          starfield(x, t, { speed: 0.03, dim: 0.4 })
          x.save(); x.globalAlpha = 1 - z
          x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(640, 560, 0, 640, 560, 70); g.addColorStop(0, 'rgba(255,230,190,0.55)'); g.addColorStop(1, 'rgba(255,230,190,0)'); x.fillStyle = g; x.fillRect(540, 460, 200, 200); x.restore()
          house(t, 540, 1420, { light: 1 })
          txt(x, 'FROM THE PORCH: A FUZZY PATCH', 540, 700, `700 28px ${MONO}`, HIVE)
          x.restore()
          if (z > 0) { x.save(); x.globalAlpha = z; drawCluster(x, 540, 800, 460, t, { n: 220, bright: 12, color: HIVE, seed: 46 }); txt(x, 'UP CLOSE: HUNDREDS OF STARS', 540, 1300, `700 28px ${MONO}`, HIVE); x.restore() }
          factChip(x, t, { label: '★ REAL SKY', text: 'The Beehive Cluster (M44) is about 600 light-years away: an open cluster with hundreds of stars.', at: T.chip1, dur: 4.0, x: 540, y: 250, color: HIVE })
          factChip(x, t, { label: '★ REAL SKY', text: 'From Earth, without a telescope, it looks like a fuzzy patch.', at: T.chip2, dur: 3.0, x: 540, y: 250, color: HIVE })
        } else {
          starfield(x, t, { speed: 0.1, dim: 0.45 })
          hive(t, { dim: 0.7 })
          // one silver light among the gold
          const k = clamp((t - T.silver) / 0.6)
          x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(860, 380, 0, 860, 380, 220); g.addColorStop(0, `rgba(223,230,255,${0.6 * k})`); g.addColorStop(1, 'rgba(223,230,255,0)'); x.fillStyle = g; x.fillRect(640, 160, 440, 440); x.restore()
          drawPlanet(x, 860, 380, 70, t, { kind: 'moon', glow: 1.4, face: 'happy', pop: k })
          const r = drawSpaceSuit(x, 440, 1060, 260, t, { sign: 'cancer', mood: t < 40.4 ? 'wide' : 'sparkle', hops: HOPS_CA, seed: 3, look: [1, -1] })
          drawShell(x, r.x + 130, r.y + 90, 7)
        }
      }
      // ── WIN: following the Moon home; Houston waves
      else if (t < T.cheer) {
        starfield(x, t, { speed: 2.2, dim: 0.3 })
        const p = prog(t, T.follow, T.cheer)
        // the moonbeam: a silver dotted path from the Moon down past the rocket to Earth
        drawPlanet(x, 820, 320, 90, t, { kind: 'moon', glow: 1.2, face: 'happy' })
        drawPlanet(x, 300, lerp(1950, 1650, p), 220, t, { kind: 'earth', glow: 0.6 })
        for (let k = 0; k < 18; k++) { const u = (k / 18 + t * 0.4) % 1; rect(x, lerp(820, 330, u) - 4, lerp(410, 1500, u) - 4, 8, 8, `rgba(223,230,255,${0.9 - u * 0.5})`) }
        const r = drawRocket(x, lerp(700, 520, p), lerp(800, 1060, p), 420, t, { color: CA.color, flame: 0.9, pilot: CA.color, trail: 1, seed: 2, rot: 2.75 })
        void r
        missionHUD(x, t, { mission: 'MISSION 04', target: 'home · Houston', status: 'following the moon', at: T.follow + 0.2 })
      }
      else if (t < T.land) {
        const scr = (cx, rc, tt) => { starfield(cx, tt, { speed: 1.5 }); drawRocket(cx, rc.x + rc.w / 2, rc.y + rc.h / 2, 260, tt, { color: CA.color, flame: 0.7, pilot: CA.color, seed: 2, rot: 3.0 }); drawPlanet(cx, rc.x + 120, rc.y + 120, 50, tt, { kind: 'moon', face: 'happy' }) }
        const M = drawMissionControl(x, t, { mission: 'MISSION 04', screens: { big: scr, text: 'WELCOME HOME, CANCER' }, cheer: 1, cheerAt: T.cheer })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'happy', hops: [T.cheer + 0.1, T.cheer + 0.7, T.cheer + 1.3] })
      }
      // ── WIN: the porch light; Capricorn waited up
      else if (t < T.pad2) {
        starfield(x, t, { speed: 0.02, dim: 0.3 })
        drawPlanet(x, 860, 330, 60, t, { kind: 'moon', glow: 1.1, face: 'happy' })
        house(t, 360, 1420)
        const hug = ease.inOutCubic(prog(t, T.hug, T.hug + 0.6))
        const r = drawSpaceSuit(x, lerp(660, 720, hug), 1300, 220, t, { sign: 'cancer', mood: t > T.hug ? 'heart' : 'sparkle', hops: HOPS_CA, seed: 3, helmet: t < 49.6, look: [1, 0] })
        drawShell(x, r.x - 100, r.y + 90, 6)
        drawCap(x, lerp(920, 850, hug), 1310, 190, t, { mood: t > T.hug ? 'heart' : 'happy', hops: HOPS_CAP, seed: 8, look: [-1, 0], tie: 'loose' })
      }
      // ── LAST: the porch, one light, the Beehive a fuzzy patch above
      else {
        starfield(x, t, { speed: 0.02, dim: 0.3 })
        x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(780, 660, 0, 780, 660, 70); g.addColorStop(0, 'rgba(255,230,190,0.5)'); g.addColorStop(1, 'rgba(255,230,190,0)'); x.fillStyle = g; x.fillRect(680, 560, 200, 200); x.restore()
        drawPlanet(x, 900, 770, 50, t, { kind: 'moon', glow: 1.1, face: 'sleepy' })
        house(t, 360, 1420)
        const r = drawStarChar(x, 700, 1300, 220, t, { ...CA, mood: 'sparkle', seed: 3, hops: HOPS_CA, look: [1, -1] })
        drawShell(x, r.x - 100, r.y + 90, 6)
        drawCap(x, 900, 1310, 190, t, { mood: 'happy', hops: HOPS_CAP, seed: 8, look: [-1, -1], tie: 'loose' })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E04' }), cardCuts(CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['whoosh', T.earlier, 0.5, 0.05], ['tick', T.earlier + 0.1, 0.04],
  ...countdownCues(T.cd, { step: T.cdStep }),
  ...launchCues(T.launch, { len: 1.2 }),
  ['whoosh', T.fly, 0.5, 0.05], ['pop', T.hud, 1318.51, 0.03, 0.3], ['whoosh', T.mc, 0.4, 0.04],
  ...warpCues(T.hive, { len: 1.2 }),
  ...VISITS.flatMap(v => [['pop', v.at, 1174.66, 0.025, 0.2], ['pop', +(v.at + 0.7).toFixed(2), 739.99, 0.025, -0.2]]),
  ['chip', T.lost, 440, 0.4, { wave: 'square', gain: 0.025, slide: -200, decay: 0.3, sustain: 0.4, rev: 0.2, dly: 0.2 }], ['whoosh', T.shell, 0.4, 0.04], ['tom', T.shell + 0.3, 120, { gain: 0.2 }],
  ['tick', T.ghost + 0.1, 0.02],
  ['swell', 26.6, 28.6, { gain: 0.03, f0: 600, f1: 3000 }],
  ['whoosh', T.turn, 0.5, 0.05], ...factChipCues(T.chip1, { dur: 4.0 }), ...factChipCues(T.chip2, { dur: 3.0 }), ['riser', T.chip2 + 0.4, T.chip2 + 2.6, 0.04],
  ['bell', T.silver, 1479.98, 0.035, 2.4, 0.3], ['glitter', T.silver, T.silver + 1.2],
  ['whoosh', T.follow, 0.6, 0.05],
  ...cheerCues(T.cheer, { len: 2 }),
  ['whoosh', T.land, 0.5, 0.04], ['bell', 48.2, 1108.73, 0.03, 2, 0], ['bell', T.hug + 0.3, 1318.51, 0.03, 2.2, 0],
  ['whoosh', T.pad2, 0.4, 0.04],
  ['pop', T.last, 659.25, 0.03, 0], ['pop', T.last + 0.1, 783.99, 0.03, 0], ['pop', T.lastLand, 987.77, 0.045, 0], ['bell', T.lastLand, 1318.51, 0.03, 1.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [CAN_N]: 740, [CAP_N]: 400, [MOON]: 520, [SAT]: 300 }, gain: 0.014 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const _times = () => lineTimes(LINES, { cps: CPS })
export const _hides = () => BOX_CLOSE
