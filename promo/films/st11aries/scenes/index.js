// st11aries (60 s vertical, Star Talk season 11 "Far Out", S11 E01: Aries races to the equinox) · story 0–55.6, then
// the shared end card. Kit: st11space.js (rockets, suits, Mission Control, HUD, starfield).
//   0.00  HOOK  frame 0: "Aries is racing to the *equinox*." The ♈ star in its space suit mid-hop on the Houston pad,
//               its rocket rumbling. Mission Control counts down 3… 2… and Aries launches on 2. "1…" lands on an empty pad.
//   3.00  WANT  in flight, the HUD: MISSION 01 · MARCH EQUINOX POINT · DIST: NONE (IT'S A DIRECTION). ARIES: the year
//               starts at the equinox point, in Aries, so it's touching it FIRST. Cut to Houston: Saturn (flight
//               director): "it's not a race, aries." Aries on the big screen: "everything's a *race*."
//  12.80  TRY   the set-piece: warp. Arrival at the Aries constellation (Hamal, Sheratan, Mesarthim). No start line.
//               "HELLO? somebody say i'm first." It bonks Hamal. The ghost peeks out from behind the parked rocket.
//               Radar ping: the marker is over in Pisces. SATURN: "check your map, aries. it *moved*."
//  30.00  TURN  ★ REAL SKY: Earth's axis wobbles slowly, like a spinning top: one wobble takes about 26,000 years, so
//               the March equinox point has moved from Aries into Pisces. ARIES: "wait. the start line *moves*?" HA HA.
//  42.00  WIN   It flips round and flies to Pisces, who's floating by the marker with a START flag: "oh hi! i've been
//               holding the start for you." ARIES: "race you home? *together* this time." Two rockets side by side, Aries
//               matching Pisces's pace. Houston cheers. PISCES: "you slowed down for *me*?"
//  52.20  LAST  back on the pad (frame 0's pose, now with Pisces beside it): "The start moves. *Keep* going."
// Rewatch bait: adult Aries's red boxing gloves (staries, st9arieshome) hang from the launch tower's swing arm; at the end
// a second pair hangs beside them. Ghost: the stowaway, peeking from behind the parked rocket at the Aries constellation.
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, lineTimes } from '../../startalk.js'
import { drawSeedConstellation } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawGloves } from '../../st9arieshome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { drawPad, drawConstellation, drawFlag, rect, box6, txt, pop01 } from './set.js'

export const DURATION = 60
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c', CYAN = '#7fe0ff'
const AR = signStar('aries'), PI = signStar('pisces')
const ARN = '♈ ARIES', PIN = '♓ PISCES', SAT = '♄ SATURN · HOUSTON'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  hookOut: 2.9, cd: 0.8, cdStep: 0.7, board: 1.8, launch: 2.0,
  fly: 3.0, hud: 3.2, boost: 5.6, mc: 8.8, warp: [12.8, 16.6], arrive: 16.6, out: 17.4, bonk: 24.6,
  ghost: 22.6, radar: 25.6, turn: 30.0, chip1: 30.5, band: 34.3, chip2: 34.8, back: 38.5, laugh: 40.7,
  win: 42.0, pisces: 43.0, home: 48.2, cheer: 50.0, pad2: 52.2, last: 52.4, lastLand: 53.0, lastOut: [55.15, 55.55],
}
const LINES = [
  { t: 3.4, speaker: ARN, text: 'the year starts at the equinox point. in *aries*.', color: '#ffb08a' },
  { t: 6.6, speaker: ARN, text: 'so i’m touching it *FIRST*.', color: '#ffb08a' },
  { t: 9.15, speaker: SAT, text: 'it’s not a race, aries.', color: '#f7dca0' },
  { t: 11.45, speaker: ARN, text: 'everything’s a *race*.', color: '#ffb08a' },
  { t: 18.0, speaker: ARN, text: 'made it! first! …where’s the start line?', color: '#ffb08a' },
  { t: 21.6, speaker: ARN, text: 'HELLO? somebody say i’m *first*.', color: '#ffb08a' },
  { t: 26.0, speaker: SAT, text: 'check your map, aries. it *moved*.', color: '#f7dca0' },
  { t: 38.7, speaker: ARN, text: 'wait. the start line *moves*?', color: '#ffb08a' },
  { t: 43.3, speaker: PIN, text: 'oh hi! i’ve been holding the start for you.', color: '#c9b8ff' },
  { t: 46.6, speaker: ARN, text: 'race you home? *together* this time.', color: '#ffb08a' },
  { t: 50.3, speaker: PIN, text: 'you slowed down for *me*?', color: '#c9b8ff' },
]
const CPS = 30
const BOX_CLOSE = [{ a: 13.7, b: 17.9 }, { a: 29.4, b: 38.6 }]   // the box shuts over the set-pieces
const HOPS_AR = [0.0, 0.42, 0.84, 1.26, T.board - 0.1, ...talkHops(LINES, ARN, { cps: CPS }), T.bonk, T.laugh, T.laugh + 0.42, T.laugh + 0.84, T.pad2 + 0.2, T.pad2 + 0.9, T.pad2 + 1.6]
const HOPS_PI = [...talkHops(LINES, PIN, { cps: CPS }), T.pad2 + 0.55, T.pad2 + 1.25]
const HOPS_SAT = talkHops(LINES, SAT, { cps: CPS })

// the constellations, in screen space (shapes only: Aries is a short bent line; Pisces a long V of two cords)
const ARIES_PTS = [[300, 1000, 0], [360, 930, 0], [600, 830, 1], [830, 700, 0]]
const PISCES_PTS = [[210, 700, 0], [260, 650, 0], [320, 680, 0], [305, 745, 0], [240, 755, 0], [420, 860, 0], [560, 990, 1], [690, 860, 0], [800, 730, 0], [860, 600, 0]]
const PISCES_LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5], [5, 6], [6, 7], [7, 8], [8, 9]]

export const GHOST = { at: T.ghost, x: 880, y: 1080, where: 'the stowaway: peeking out from behind the parked rocket at the Aries constellation' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...SPACE_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Aries is racing to the *equinox*.', at: 0, out: T.hookOut, top: 200, accentColor: '#ffb08a' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, cps: CPS, close: 52.0 })
  const last = popText(root, 'The start moves. | *Keep* going.', { top: 300, size: 108, accentSize: 168, at: T.last, gap: 0.1, accentColor: '#ffb08a', wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // the box hides over the set-pieces (it re-opens on the next line)
  const boxRoot = box.root
  function boxVis(t) { if (BOX_CLOSE.some(w => t >= w.a && t < w.b)) boxRoot.style.opacity = '0' }

  function haha(t, cx, cy) {
    const p = t - T.laugh
    if (p < 0 || p > 1.6) return
    ;['HA', 'HA', 'HA!'].forEach((s, i) => {
      const k = pop01(t, T.laugh + i * 0.32, 0.25, 2.4) * (1 - ease.inCubic(prog(t, T.laugh + 1.3, T.laugh + 1.6)))
      if (k <= 0.02) return
      x.save(); x.translate(cx + (i - 1) * 150, cy - i * 40); x.rotate((i - 1) * 0.15); x.scale(k, k)
      x.font = `700 64px ${MONO}`; x.lineWidth = 10; x.strokeStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.strokeText(s, 0, 0); x.fillStyle = GOLD; x.fillText(s, 0, 0)
      x.restore()
    })
  }
  function bonkStars(t, cx, cy) {
    const p = prog(t, T.bonk + 0.1, T.bonk + 1.2)
    if (p <= 0 || p >= 1) return
    for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + t * 6; rect(x, cx + Math.cos(a) * 70 - 6, cy + Math.sin(a) * 26 - 6, 12, 12, k % 2 ? GOLD : BONE) }
    txt(x, 'BONK', cx + 120, cy - 80, `700 44px ${MONO}`, GOLD)
  }
  // the wobble explainer: a spinning-top Earth + the zodiac band with the equinox marker sliding
  function wobble(t) {
    const k = pop01(t, T.turn, 0.35, 1.6)
    const cx = 540, cy = 780, r = 150
    const phi = (t - T.turn) * 1.1
    const e = 0.42, L = 300
    const tip = [cx + L * Math.sin(e) * Math.cos(phi), cy - L * Math.cos(e) + L * Math.sin(e) * Math.sin(phi) * 0.32]
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    // the circle the axis traces
    x.setLineDash([8, 10]); x.strokeStyle = 'rgba(255,195,92,0.7)'; x.lineWidth = 4
    x.beginPath(); x.ellipse(cx, cy - L * Math.cos(e), L * Math.sin(e), L * Math.sin(e) * 0.32, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
    const bot = [2 * cx - tip[0], 2 * cy - tip[1]]
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bot[0], bot[1]); x.lineTo(tip[0], tip[1]); x.stroke()
    x.strokeStyle = '#ffc35c'; x.lineWidth = 7; x.beginPath(); x.moveTo(bot[0], bot[1]); x.lineTo(tip[0], tip[1]); x.stroke()
    drawPlanet(x, cx, cy, r, t, { kind: 'earth', spin: 4, tilt: Math.atan2(tip[0] - cx, cy - tip[1]), glow: 0.5 })
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(cx + (tip[0] - cx) * 0.5, cy + (tip[1] - cy) * 0.5); x.lineTo(tip[0], tip[1]); x.stroke()
    x.strokeStyle = '#ffc35c'; x.lineWidth = 7; x.beginPath(); x.moveTo(cx + (tip[0] - cx) * 0.5, cy + (tip[1] - cy) * 0.5); x.lineTo(tip[0], tip[1]); x.stroke()
    rect(x, tip[0] - 10, tip[1] - 10, 20, 20, '#fff3d0')
    txt(x, 'EARTH’S AXIS, WOBBLING', cx, cy + r + 220, `700 30px ${MONO}`, '#ffc35c')
    x.restore()
    // the zodiac band
    const kb = pop01(t, T.band, 0.3, 1.6)
    if (kb <= 0.02) return
    const by = 1270, segW = 250, slide = ease.inOutCubic(prog(t, T.band + 0.6, T.band + 2.8))
    x.save(); x.globalAlpha *= clamp(kb); x.translate(0, (1 - kb) * 60)
    const SEG = [['♒︎ AQUARIUS', '#5fa8ff'], ['♓︎ PISCES', PI.color], ['♈︎ ARIES', AR.color], ['♉︎ TAURUS', '#7fd67a']]
    SEG.forEach(([s, c], i) => { const sx = 540 - segW * 2 + i * segW; box6(x, sx + 4, by, segW - 8, 84, 'rgba(16,9,38,0.92)', c); txt(x, s, sx + segW / 2, by + 46, `700 30px ${MONO}`, BONE) })
    const thenX = 540 + 70, nowX = 540 - 130, mx = lerp(thenX, nowX, slide)
    // "then" ghost marker
    x.globalAlpha *= slide > 0.05 ? 0.45 : 1
    txt(x, 'THEN', thenX, by - 60, `700 24px ${MONO}`, 'rgba(239,230,214,0.8)'); rect(x, thenX - 4, by - 40, 8, 40, 'rgba(239,230,214,0.8)')
    x.globalAlpha = clamp(kb)
    rect(x, mx - 18, by + 96, 36, 36, INK); rect(x, mx - 12, by + 102, 24, 24, GOLD)
    rect(x, mx - 3, by - 10, 6, 112, GOLD)
    txt(x, slide > 0.95 ? 'NOW ★' : '★', mx, by + 170, `700 28px ${MONO}`, GOLD)
    txt(x, 'MARCH EQUINOX POINT', mx, by + 210, `700 22px ${MONO}`, 'rgba(242,199,92,0.85)')
    x.restore()
  }
  // the radar mini-map: the marker blinks over in Pisces, not Aries
  function radar(t) {
    const k = pop01(t, T.radar, 0.3, 2) * (1 - ease.inCubic(prog(t, 29.4, 29.8)))
    if (k <= 0.02) return
    x.save(); x.translate(540, 700); x.scale(k, k)
    box6(x, -330, -170, 660, 340, 'rgba(6,10,32,0.94)', CYAN)
    txt(x, 'RADAR · EQUINOX POINT', 0, -132, `700 26px ${MONO}`, CYAN)
    ;[['♓︎ PISCES', -150, PI.color], ['♈︎ ARIES', 150, AR.color]].forEach(([s, ox, c]) => { box6(x, ox - 130, -80, 260, 200, '#0c1236'); txt(x, s, ox, 90, `700 26px ${MONO}`, c) })
    txt(x, 'YOU', 150, 20, `700 24px ${MONO}`, BONE); rect(x, 140, -30, 20, 20, AR.color)
    if ((t * 3) % 1 < 0.6) { rect(x, -164, -24, 28, 28, GOLD); txt(x, '★', -150, 30, `700 30px ${MONO}`, GOLD) }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      // ── HOOK: the pad
      if (t < T.fly) {
        const launched = t >= T.launch
        const ry = launched ? 1150 - 2400 * ease.inQuad(prog(t, T.launch, T.launch + 1.1)) : 1150
        const P = drawPad(x, t)
        drawGloves(x, P.arm[0], P.arm[1], t)
        drawRocket(x, 760, ry, 560, t, { color: AR.color, flame: launched ? 1.3 : 0.35 + 0.15 * Math.sin(t * 9), shake: launched ? 6 : 3, smoke: launched ? 1 : 0.5, pilot: t >= T.board ? AR.color : null, seed: 2 })
        if (t < T.board) {
          drawSpaceSuit(x, 300, 1300, 270, t, { sign: 'aries', mood: 'wide', look: [1, -1], hops: HOPS_AR, seed: 3 })
        } else if (t < T.board + 0.3) { const p = prog(t, T.board, T.board + 0.3); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; rect(x, 300 + Math.cos(a) * 120 * p - 8, 1300 + Math.sin(a) * 120 * p - 8, 16, 16, BONE) } }
        drawCountdown(x, t, { at: T.cd, step: T.cdStep, x: 300, y: 860, size: 220, labels: ['3', '2', '1…?', 'LIFTOFF!'] })
      }
      // ── WANT: in flight
      else if (t < T.mc) {
        starfield(x, t, { speed: t < T.boost ? 2.2 : 3.6, dim: 0.3 })
        const k = ease.outCubic(prog(t, T.fly, T.fly + 0.6))
        drawRocket(x, 540, lerp(1500, 1020, k), 520, t, { color: AR.color, flame: t < T.boost ? 1 : 1.35, shake: t < T.boost ? 2 : 5, pilot: AR.color, trail: 1, seed: 2, rot: Math.sin(t * 1.3) * 0.05 })
        missionHUD(x, t, { mission: 'MISSION 01', target: 'March equinox point', distance: 'none · it’s a direction', status: t < T.boost ? 'en route' : 'FLOORING IT', at: T.hud })
      }
      // ── WANT: Houston
      else if (t < T.warp[0]) {
        const live = (cx, rc, tt) => { starfield(cx, tt, { speed: 3 }); drawSpaceSuit(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 + 30, 300, tt, { sign: 'aries', mood: tt < 11 ? 'squint' : 'wide', hops: HOPS_AR, seed: 3 }); txt(cx, '● LIVE · MISSION 01', rc.x + 30, rc.y + 40, `700 26px ${MONO}`, '#ff5d6a', 'left') }
        const M = drawMissionControl(x, t, { mission: 'MISSION 01', screens: { big: live } })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: t < 11 ? 'neutral' : 'squint', hops: HOPS_SAT, look: [0, -1] })
      }
      // ── TRY: the warp set-piece
      else if (t < T.arrive) {
        const w = Math.sin(Math.PI * prog(t, T.warp[0], T.warp[1]))
        starfield(x, t, { speed: 4, warp: w, dim: 0.5 })
        drawRocket(x, 540 + Math.sin(t * 2) * 30, 1000, lerp(520, 380, w), t, { color: AR.color, flame: 1.4, shake: 4 + 6 * w, pilot: AR.color, seed: 2 })
        missionHUD(x, t, { mission: 'MISSION 01', target: 'March equinox point', distance: 'none · it’s a direction', status: 'FASTER' })
        txt(x, 'NEXT STOP: ♈︎ ARIES', 540, 1500, `700 44px ${MONO}`, GOLD)
      }
      // ── TRY: the Aries constellation, no start line
      else if (t < T.turn) {
        starfield(x, t, { speed: 0.15, dim: 0.35 })
        drawConstellation(x, t, ARIES_PTS, { label: '♈︎ ARIES', labelAt: [470, 700], names: [[2, 'HAMAL', 0, 46]], reveal: prog(t, T.arrive, T.arrive + 1) })
        const rk = ease.outCubic(prog(t, T.arrive, T.arrive + 0.8))
        drawRocket(x, lerp(540, 820, rk), lerp(1700, 1180, rk), 320, t, { color: AR.color, flame: 1 - rk * 0.9, rot: -0.25 * rk, pilot: t < T.out ? AR.color : null, seed: 2, stowaway: pop01(t, T.ghost, 0.4, 1.4) * (1 - ease.inCubic(prog(t, T.ghost + 1.3, T.ghost + 1.6))) })
        if (t >= T.out) {
          const ok = pop01(t, T.out, 0.3, 2)
          // it floats about looking for the line, then bonks Hamal
          const bonk = t >= T.bonk - 0.5 && t < T.bonk + 1.4
          const ax = bonk ? lerp(420, 545, ease.inQuad(prog(t, T.bonk - 0.5, T.bonk))) : 420 + Math.sin(t * 0.8) * 50
          const ay = bonk ? lerp(1000, 880, ease.inQuad(prog(t, T.bonk - 0.5, T.bonk))) : 1000 + Math.sin(t * 1.1) * 20
          const mood = t > T.radar ? 'wide' : bonk && t > T.bonk ? 'squint' : t > 21.4 ? 'eyeroll' : 'happy'
          drawSpaceSuit(x, ax, ay, 230, t, { sign: 'aries', mood, hops: HOPS_AR, seed: 3, pop: ok, look: t > T.radar ? [0, -1] : undefined })
          bonkStars(t, 600, 830)
          // the dotted outline where a finish line "should" be
          if (t < T.radar) { x.save(); x.setLineDash([12, 10]); x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 4; x.strokeRect(640, 880, 260, 150); x.setLineDash([]); txt(x, '?', 770, 955, `700 90px ${MONO}`, 'rgba(242,199,92,0.8)'); x.restore() }
        }
        missionHUD(x, t, { mission: 'MISSION 01', target: 'March equinox point', distance: 'none · it’s a direction', status: t < T.out ? 'ARRIVED' : 'target not found' })
        radar(t)
      }
      // ── TURN: the wobble
      else if (t < T.back) {
        starfield(x, t, { speed: 0.1, dim: 0.5 })
        wobble(t)
        factChip(x, t, { label: '★ REAL SKY', text: 'Earth’s axis wobbles slowly, like a spinning top. One wobble takes about 26,000 years.', at: T.chip1, dur: 3.6, x: 540, y: 250, color: GOLD })
        factChip(x, t, { label: '★ REAL SKY', text: 'So the March equinox point has moved from Aries into Pisces.', at: T.chip2, dur: 3.5, x: 540, y: 250, color: GOLD })
      }
      // ── TURN: Aries gets it, and laughs
      else if (t < T.win) {
        starfield(x, t, { speed: 0.15, dim: 0.35 })
        drawConstellation(x, t, ARIES_PTS, { label: '♈︎ ARIES', labelAt: [470, 700], alpha: 0.6 })
        drawRocket(x, 820, 1180, 320, t, { color: AR.color, flame: 0.1, rot: -0.25, seed: 2 })
        const r = drawSpaceSuit(x, 470, 960, 300, t, { sign: 'aries', mood: t < T.laugh ? 'wide' : 'happy', hops: HOPS_AR, seed: 3, look: t < T.laugh ? [0, 0] : undefined, squash: t < T.laugh ? 0 : 0.04 })
        haha(t, r.x, r.top - 90)
      }
      // ── WIN: the flip, then Pisces at the marker
      else if (t < T.home) {
        starfield(x, t, { speed: t < T.pisces ? 3 : 0.15, dir: 'left', dim: 0.35 })
        if (t < T.pisces) {
          const p = ease.inOutCubic(prog(t, T.win, T.pisces))
          drawRocket(x, lerp(820, 300, p), lerp(1180, 980, p), 360, t, { color: AR.color, flame: 1.2, rot: lerp(-0.25, -Math.PI / 2, ease.outCubic(prog(t, T.win, T.win + 0.5))), pilot: AR.color, trail: 1, seed: 2 })
          txt(x, 'U-TURN →  ♓︎ PISCES', 540, 1400, `700 44px ${MONO}`, GOLD)
        } else {
          drawConstellation(x, t, PISCES_PTS, { links: PISCES_LINKS, label: '♓︎ PISCES', labelAt: [540, 1130], reveal: prog(t, T.pisces, T.pisces + 1.2) })
          drawRocket(x, 170, 1240, 280, t, { color: AR.color, flame: 0, rot: -0.4, seed: 2 })
          drawRocket(x, 930, 1240, 260, t, { color: PI.color, flame: 0, rot: 0.35, seed: 5 })
          drawFlag(x, t, 640, 1000, { text: '★ START', k: 1 })
          drawSpaceSuit(x, 760, 900, 230, t, { sign: 'pisces', mood: t < 46.2 ? 'sparkle' : 'happy', hops: HOPS_PI, seed: 6 })
          drawSpaceSuit(x, 400, 930, 250, t, { sign: 'aries', mood: t < 46.2 ? 'wide' : 'happy', hops: HOPS_AR, seed: 3, look: [1, 0] })
        }
      }
      // ── WIN: the trip home, side by side
      else if (t < T.cheer) {
        starfield(x, t, { speed: 2.6, dim: 0.3 })
        const p = prog(t, T.home, T.cheer)
        drawPlanet(x, 420, lerp(-150, 470, p), lerp(110, 200, p), t, { kind: 'earth', glow: 0.6 })
        const d = Math.sin(t * 2.2) * 14
        drawRocket(x, 360, 1150 + d, 420, t, { color: AR.color, flame: 0.8, pilot: AR.color, trail: 1, seed: 2 })
        drawRocket(x, 720, 1150 + d, 420, t, { color: PI.color, flame: 0.8, pilot: PI.color, trail: 1, seed: 5 })
        missionHUD(x, t, { mission: 'MISSION 01', target: 'home · Houston', status: 'side by side', at: T.home + 0.2 })
      }
      // ── WIN: Houston cheers
      else if (t < T.pad2) {
        const scr = (cx, rc, tt) => { starfield(cx, tt, { speed: 1 }); drawRocket(cx, rc.x + 330, rc.y + 270, 250, tt, { color: AR.color, flame: 0.6, pilot: AR.color, seed: 2 }); drawRocket(cx, rc.x + 570, rc.y + 270, 250, tt, { color: PI.color, flame: 0.6, pilot: PI.color, seed: 5 }) }
        const M = drawMissionControl(x, t, { mission: 'MISSION 01', screens: { big: scr, text: 'WELCOME HOME, ♈︎ + ♓︎' }, cheer: 1, cheerAt: T.cheer })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'happy', hops: [T.cheer + 0.1, T.cheer + 0.6, T.cheer + 1.1] })
      }
      // ── LAST: back on the pad, together
      else {
        const P = drawPad(x, t)
        drawGloves(x, P.arm[0], P.arm[1], t)
        drawGloves(x, P.arm[0] + 70, P.arm[1] + 6, t + 0.6)
        drawRocket(x, 760, 1150, 560, t, { color: AR.color, flame: 0, seed: 2 })
        drawSpaceSuit(x, 330, 1300, 250, t, { sign: 'aries', mood: 'happy', look: [1, 0], hops: HOPS_AR, seed: 3 })
        drawSpaceSuit(x, 610, 1320, 230, t, { sign: 'pisces', mood: 'heart', look: [-1, 0], hops: HOPS_PI, seed: 6 })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E01' }), cardCuts(CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...countdownCues(T.cd, { step: T.cdStep }),
  ...launchCues(T.launch, { len: 2.2 }),
  ['whoosh', T.fly, 0.5, 0.05], ['pop', T.hud, 1318.51, 0.03, 0.3], ['riser', T.boost - 0.6, T.boost, 0.04], ['boom', T.boost, 0.2],
  ['whoosh', T.mc, 0.4, 0.04],
  ...warpCues(T.warp[0], { len: 1.4 }), ['whoosh', T.warp[1] - 0.3, 0.8, 0.06], ['boom', T.arrive, 0.25],
  ['tick', T.ghost + 0.1, 0.02],
  ['tom', T.bonk, 160, { gain: 0.3 }], ['bell', T.bonk + 0.1, 1567.98, 0.03, 1.2, 0.2],
  ['chip', T.radar, 1320, 0.12, { wave: 'square', gain: 0.03, decay: 0.1, sustain: 0.4, rev: 0.05, dly: 0.2 }], ['chip', T.radar + 0.3, 1320, 0.12, { wave: 'square', gain: 0.03, decay: 0.1, sustain: 0.4, rev: 0.05, dly: 0.2 }],
  ['whoosh', T.turn, 0.5, 0.05], ...factChipCues(T.chip1, { dur: 3.6 }), ['swell', T.band, T.band + 2.8, { gain: 0.03, f0: 300, f1: 2400 }], ...factChipCues(T.chip2, { dur: 3.5 }),
  ['whoosh', T.back, 0.4, 0.04],
  ['pop', T.laugh, 987.77, 0.04, -0.3], ['pop', T.laugh + 0.32, 1174.66, 0.04, 0], ['pop', T.laugh + 0.64, 1318.51, 0.05, 0.3],
  ['whoosh', T.win, 0.7, 0.06], ['boom', T.win + 0.1, 0.2], ['glitter', T.pisces, T.pisces + 1.2],
  ['whoosh', T.home, 0.6, 0.05],
  ...cheerCues(T.cheer, { len: 2 }),
  ['whoosh', T.pad2, 0.4, 0.04],
  ['pop', T.last, 659.25, 0.03, 0], ['pop', T.last + 0.1, 783.99, 0.03, 0], ['pop', T.lastLand, 987.77, 0.045, 0], ['bell', T.lastLand, 1318.51, 0.03, 1.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ARN]: 820, [PIN]: 620, [SAT]: 300 }, gain: 0.014 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const _times = () => lineTimes(LINES, { cps: CPS })
export const _hides = () => BOX_CLOSE
