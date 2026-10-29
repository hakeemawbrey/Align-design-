// st8heist (35 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E12) · story 0–30.6, then the end card.
//   Genre: a heist movie. Sagittarius assembles a crew to unfollow an ex *without them noticing*: blueprints, crew
//   freeze-frames, a laser grid, a countdown. Twist: Virgo walks in and just taps "unfollow". Silence.
//   0.00–2.50  FRAME 0: HQ, the blueprint board (the ex's profile, the FOLLOWING button circled TARGET). Sag mid-hop,
//              pointer slapped on the target; the crew round the table. Hook: "The *unfollow* heist."
//   2.60       SAG: "we unfollow the ex. *without them noticing.*"
//   5.90       crew freeze-frames, 1.8 s each (punch-in, colour wash, slanted role card): GEMINI the hacker · SCORPIO
//              the eyes · ARIES the muscle · THE GHOST the inside man ("reformed. moral support only.")
//  13.10       GO. The board goes live, red lasers sweep the button, the countdown runs. SCORPIO: "they're online.
//              *nobody move.*" → GEMINI: "one wrong tap and we *like a 2019 photo.*" → SAG: "on three. one… two…"
//              The ghost (the inside man) peeks up from inside the phone on the board.
//  20.40       Virgo slides in and taps it. TAP. The lasers die, the music stops: silence; the crew freezes wide-eyed.
//              UNFOLLOWED ✓.  VIRGO: "it’s a button. you’re *allowed.*" → ARIES: "but we had a *montage.*"
//  26.90       "Unfollowing is | *allowed.*"  Sag back at the board in the frame-0 pose, pointer on the new plan:
//              "JUST TAP IT ✓". Rewatch bait: the board's corner note "plan b: just tap it —virgo", crossed out, from frame 0.
// One canvas (sky + HQ + board + crew), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, drawGhostSheet } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { pop01, outK, popOut, r3, R, glow, burst, monoText, panel, seq, wordPops, flash, chip, hiddenComet, rgba, GOLD, BONE, INK, PINK, CYAN, NOTE } from '../kit.js'

export const DURATION = 35
const KEY = 'Ebm'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const MAG = '#ff3fa4', NEON = '#43e8ff', LASER = '#ff2d4a', BLUE = '#1d4e9e', BLUEL = '#cfe6ff'
const DAY = { day: 21, phase: 'gone' }
const SAG = signStar('sagittarius'), GEM = signStar('gemini'), SCO = signStar('scorpio'), ARI = signStar('aries'), VIR = signStar('virgo')
const TAG = { SAG: '♐ SAGITTARIUS', GEM: '♊ GEMINI', SCO: '♏ SCORPIO', ARI: '♈ ARIES', VIR: '♍ VIRGO', GHO: '👻 THE GHOST' }
const CPS = 28

// ── the script
const S1 = seq(2.6, [{ who: TAG.SAG, x: 'we unfollow the ex. *without them noticing.*', hold: 1.5 }])
const S2 = seq(13.35, [
  { who: TAG.SCO, x: 'they’re online. *nobody move.*', hold: 1.5 },
  { who: TAG.GEM, x: 'one wrong tap and we *like a 2019 photo.*', hold: 1.5 },
  { who: TAG.SAG, x: 'on three. one… *two…*', hold: 1.6 },
])
const S3 = seq(21.75, [
  { who: TAG.VIR, x: 'it’s a button. you’re *allowed.*', hold: 1.6 },
  { who: TAG.ARI, x: 'but we had a *montage.*', hold: 1.5 },
])
const L1 = S1.lines, L2 = S2.lines, L3 = S3.lines, ALL = [...L1, ...L2, ...L3]
const INTRO0 = 5.9, INTRO_LEN = 1.8
const T = {
  hookOut: 2.45, close1: r3(S1.end - 0.05),
  intros: [INTRO0, INTRO0 + 4 * INTRO_LEN],               // 5.9 – 13.1
  go: 13.1, count: [13.1, 20.4], tap: 20.4, silence: [20.4, 21.5], close2: 21.5,
  close3: r3(S3.end - 0.05), last: 26.9, out: [30.05, 30.45],
  ghost: 17.6, comet: 9.0, plan: 25.8,
}
const INTROS = [
  { id: 'GEM', role: 'THE *hacker.*', sub: 'TWO OF EVERYTHING. EVEN LAPTOPS.', col: GEM.color },
  { id: 'SCO', role: 'THE *eyes.*', sub: 'HAS BEEN WATCHING SINCE TUESDAY.', col: SCO.color },
  { id: 'ARI', role: 'THE *muscle.*', sub: 'WILL PRESS ANY BUTTON. THAT’S THE PROBLEM.', col: ARI.color },
  { id: 'GHO', role: 'THE *inside man.*', sub: 'REFORMED. MORAL SUPPORT ONLY.', col: '#d9d2f0' },
]
const introAt = i => r3(INTRO0 + i * INTRO_LEN)

// ── layout
const BOARD = { x0: 110, x1: 970, y0: 480, y1: 1010 }
const PHONE = { x: 380, y: 745, w: 250, h: 430 }          // the schematic phone on the board
const BTN = { x: 380, y: 860, w: 180, h: 46 }               // its FOLLOWING button (the target)
const POS = { SAG: [790, 1190, 250], GEM: [190, 1180, 190], SCO: [520, 1215, 180], ARI: [250, 1390, 200], GHO: [880, 1395, 7], VIR: [560, 1360, 230] }
export const GHOST = { at: T.ghost, x: PHONE.x, y: PHONE.y + PHONE.h / 2 - 20, where: 'peeking up from inside the schematic phone on the heist board (the inside man, literally inside)' }
export const COMET = { at: T.comet, from: [1060, 420], to: [700, 330] }

const GLOVE = ['.RRRR.', 'RRRRRR', 'RRRRRW', 'RRRRRR', '.RRRR.', '.WWWW.']
const GLOVE_C = { R: '#e2334c', W: '#fff1c8' }
const LAPTOP = ['SSSSSSSSSS', 'SccccccccS', 'SccCcccccS', 'SccccCcccS', 'SSSSSSSSSS', 'KKKKKKKKKKKK']
const LAPTOP_C = { S: '#8b84ad', c: '#0d2a4a', C: '#43e8ff', K: '#5a5378' }
const BINOC = ['KK..KK', 'KK..KK', 'KKKKKK', 'BB..BB']
const BINOC_C = { K: '#3a3358', B: '#43e8ff' }
const CLIP = ['..KK..', 'WWWWWW', 'WkkkkW', 'WWWWWW', 'WkkkWW', 'WWWWWW', 'WkkkkW', 'WWWWWW']
const CLIP_C = { K: '#8b84ad', W: '#fff6e2', k: '#ef5c94' }
const PACK = ['.bbbb.', 'bBBBBb', 'bBbbBb', 'bBBBBb', 'bbbbbb']
const PACK_C = { b: '#5a3a1e', B: '#8a5a2c' }

function moodOf(id, t) {
  const tapK = t >= T.tap && t < T.close3
  if (tapK) return id === 'VIR' ? { mood: t < T.tap + 1.2 ? 'neutral' : 'happy', look: [-1, 0] } : { mood: 'wide', look: [0, -1], blink: false }
  if (t >= T.close3) return { mood: id === 'SAG' ? 'sparkle' : 'happy', look: [0, -1] }
  if (t >= T.go && t < T.tap) return id === 'SCO' ? { mood: 'squint', look: [0, -1] } : id === 'ARI' ? { mood: 'wide', look: [1, -1] } : { mood: 'squint', look: [0, -1] }
  if (id === 'SAG') return t < 2.0 ? { mood: 'sparkle', look: [-1, -1] } : { mood: 'happy', look: [-1, 0] }
  return { mood: 'neutral', look: [0, -1] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'The *unfollow* heist.', at: 0, out: T.hookOut, accentColor: NEON })
  const ROLES = INTROS.map((it, i) => popText(root, it.role, { top: 1470, size: 96, accentSize: 150, at: introAt(i) + 0.12, gap: 0.06, accentColor: it.col, wobble: true, late: it.role.split(' ').length - 1, lateAt: introAt(i) + 0.3, fit: true }))
  const box1 = dialogueBox(root, { lines: L1, y: 1480, width: 960, height: 290, cps: CPS, close: T.close1 })
  const box2 = dialogueBox(root, { lines: L2, y: 1480, width: 960, height: 290, cps: CPS, close: T.close2 })
  const box3 = dialogueBox(root, { lines: L3, y: 1480, width: 960, height: 290, cps: CPS, close: T.close3 })
  const LAST = popText(root, 'Unfollowing is | *allowed.*', { top: 1440, size: 112, accentSize: 190, at: T.last, gap: 0.09, accentColor: NEON, wobble: true, late: 1, lateAt: T.last + 0.4, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** HQ: a dark room, a synthwave grid floor, a hanging lamp */
  function room(t) {
    const g = x.createLinearGradient(0, 1060, 0, 1920); g.addColorStop(0, 'rgba(40,8,60,0.9)'); g.addColorStop(1, 'rgba(8,2,20,0.95)')
    x.fillStyle = g; x.fillRect(0, 1060, 1080, 860)
    x.save(); x.strokeStyle = rgba(MAG, 0.45); x.lineWidth = 3
    for (let i = -10; i <= 10; i++) { x.beginPath(); x.moveTo(540 + i * 40, 1060); x.lineTo(540 + i * 260, 1920); x.stroke() }
    const off = (t * 0.6) % 1
    for (let k = 0; k < 10; k++) { const y = 1060 + Math.pow((k + off) / 10, 2.2) * 860; x.beginPath(); x.moveTo(0, y); x.lineTo(1080, y); x.stroke() }
    x.restore()
    R(x, rgba(NEON, 0.8), 0, 1056, 1080, 4)
  }
  function schematic(t, live, tapped) {
    const { x0, x1, y0, y1 } = BOARD
    panel(x, x0, y0, x1 - x0, y1 - y0, { P: 6, border: live > 0.5 ? NEON : BLUEL, fill: live > 0.5 ? 'rgba(6,14,40,0.96)' : BLUE, glow: 0.4 })
    // grid
    x.save(); x.globalAlpha = 0.18; for (let gx2 = x0 + 30; gx2 < x1 - 20; gx2 += 30) R(x, BLUEL, gx2, y0 + 20, 2, y1 - y0 - 40); for (let gy = y0 + 30; gy < y1 - 20; gy += 30) R(x, BLUEL, x0 + 20, gy, x1 - x0 - 40, 2); x.restore()
    monoText(x, t >= T.plan ? 'PLAN: JUST TAP IT ✓' : 'OPERATION: UNFOLLOW', x0 + 40, y0 + 46, { size: 28, color: tapped ? '#9dffb0' : BLUEL, align: 'left', spacing: 0.1 })
    // the phone schematic
    const { x: px, y: py, w, h } = PHONE
    x.save(); x.strokeStyle = BLUEL; x.lineWidth = 6; x.strokeRect(px - w / 2, py - h / 2, w, h); x.restore()
    R(x, BLUEL, px - 30, py - h / 2 + 12, 60, 6)
    // the profile
    x.save(); x.strokeStyle = BLUEL; x.lineWidth = 5; x.beginPath(); x.arc(px, py - 110, 46, 0, Math.PI * 2); x.stroke(); x.restore()
    monoText(x, 'THE EX', px, py - 30, { size: 26, color: BLUEL })
    monoText(x, '412 POSTS', px, py + 10, { size: 18, color: rgba(BLUEL, 0.7) })
    // the button
    const followed = !tapped
    panel(x, BTN.x - BTN.w / 2, BTN.y - BTN.h / 2, BTN.w, BTN.h, { P: 3, border: BLUEL, fill: followed ? 'rgba(207,230,255,0.15)' : '#3d7be0', glow: 0 })
    monoText(x, followed ? 'FOLLOWING ✓' : 'FOLLOW', BTN.x, BTN.y + 1, { size: 20, color: followed ? BLUEL : '#ffffff' })
    // the target ring + annotations (right side)
    if (!tapped) {
      const pul = 1 + 0.06 * Math.sin(t * 6)
      x.save(); x.strokeStyle = LASER; x.lineWidth = 6; x.beginPath(); x.ellipse(BTN.x, BTN.y, 130 * pul, 50 * pul, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      R(x, LASER, BTN.x + 130, BTN.y - 3, 150, 6)
      monoText(x, 'TARGET', BTN.x + 300, BTN.y, { size: 26, color: LASER, align: 'left' })
    }
    // annotations
    monoText(x, 'A. THUMB ENTRY', 700, y0 + 150, { size: 20, color: BLUEL, align: 'left' })
    monoText(x, 'B. NO NOTIFICATIONS?', 700, y0 + 190, { size: 20, color: BLUEL, align: 'left' })
    monoText(x, 'C. ESCAPE: CLOSE APP', 700, y0 + 230, { size: 20, color: BLUEL, align: 'left' })
    // rewatch bait: the corner note, crossed out
    x.save(); x.translate(800, y1 - 70); x.rotate(-0.06)
    R(x, '#fff3a8', -110, -40, 220, 80)
    x.font = `700 17px 'Space Mono', monospace`; x.fillStyle = '#5a3a1e'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('plan b: just tap it', 0, -12); x.fillText('—virgo', 40, 14)
    R(x, '#e2334c', -100, -14, 200, 4); R(x, '#e2334c', -40, 12, 120, 4)
    x.restore()
    // the countdown
    if (live > 0 && !tapped) {
      const left = Math.max(0, Math.ceil(10 - (t - T.go) * 10 / (T.tap - T.go)))
      monoText(x, `00:${String(left).padStart(2, '0')}`, x1 - 60, y0 + 46, { size: 40, color: left <= 3 ? LASER : '#9dffb0', align: 'right' })
    }
  }
  function lasers(t, k) {
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 5; i++) {
      const ph = t * (0.7 + i * 0.13) + i * 1.7
      const ya = BTN.y + Math.sin(ph) * 180, yb = BTN.y + Math.cos(ph * 0.9 + 1) * 180
      x.strokeStyle = rgba(LASER, 0.35 * k); x.lineWidth = 14; x.beginPath(); x.moveTo(BOARD.x0 + 20, ya); x.lineTo(BOARD.x1 - 20, yb); x.stroke()
      x.strokeStyle = rgba('#ffd0d8', 0.9 * k); x.lineWidth = 3; x.beginPath(); x.moveTo(BOARD.x0 + 20, ya); x.lineTo(BOARD.x1 - 20, yb); x.stroke()
    }
    x.restore()
  }
  function table() {
    R(x, INK, 70, 1262, 940, 34); R(x, '#3a2a5e', 76, 1266, 928, 22); R(x, rgba(MAG, 0.8), 76, 1266, 928, 4)
  }
  function crew(t, focus = null) {
    const hops = id => {
      const base = { SAG: [0.0, 1.9], GEM: [0.25], SCO: [0.4], ARI: [0.55], VIR: [] }[id] || []
      return [...base, ...talkHops(ALL, TAG[id], { cps: CPS }), ...(id !== 'VIR' ? [T.tap + 0.05] : [])]
    }
    const draw = (id, k = 1) => {
      const [px, py, s] = POS[id], st = moodOf(id, t)
      if (id === 'GHO') {
        const bob = Math.sin(t * 2.2) * 8
        drawGhostSheet(x, t, px, py + bob, s, { look: st.look || [0, 0], wide: st.mood === 'wide', blush: st.mood === 'happy' ? 0.8 : 0 })
        return
      }
      const col = { SAG, GEM, SCO, ARI, VIR }[id]
      if (id === 'SAG') drawBits(x, PACK, PACK_C, px + 110, py + 30, 8)
      const r = drawStarChar(x, px, py, s, t, { color: col.color, glyph: col.glyph, ...st, hops: hops(id), pop: k, seed: { SAG: 3, GEM: 7, SCO: 11, ARI: 13, VIR: 17 }[id], glow: 0.9 })
      if (id === 'GEM') drawBits(x, LAPTOP, LAPTOP_C, px + 10, py + 80, 7)
      if (id === 'SCO') drawBits(x, BINOC, BINOC_C, px, r.y - 6, 8)
      if (id === 'ARI') { drawBits(x, GLOVE, GLOVE_C, px - 110, py + 20, 8); drawBits(x, GLOVE, GLOVE_C, px + 110, py + 20, 8, { flip: true }) }
      if (id === 'VIR') drawBits(x, CLIP, CLIP_C, px - 120, py + 30, 8, { rot: -0.15 })
      return r
    }
    void focus
    for (const id of ['GEM', 'SCO']) draw(id)
    table()
    for (const id of ['ARI', 'GHO']) draw(id)
    // Sag + the pointer (on the target at frame 0 and again at the end)
    const r = draw('SAG')
    const onTarget = t < 2.3 || t >= T.plan
    const tip = onTarget ? (t >= T.plan ? [BOARD.x0 + 330, BOARD.y0 + 46] : [BTN.x + 120, BTN.y]) : [r.x - 120, r.y - 200]
    const slap = Math.max(0, 1 - Math.abs(t - (t >= T.plan ? T.plan + 0.15 : 0.12)) * 5)
    x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(r.x - 60, r.y - 20); x.lineTo(tip[0], tip[1]); x.stroke()
    x.strokeStyle = '#c98a1f'; x.lineWidth = 8; x.beginPath(); x.moveTo(r.x - 60, r.y - 20); x.lineTo(tip[0], tip[1]); x.stroke(); x.restore()
    R(x, '#ff3d6e', tip[0] - 9, tip[1] - 9, 18, 18)
    if (onTarget) for (let i = 0; i < 6; i++) { const an = i / 6 * Math.PI * 2; const d = 30 + 26 * (1 - slap) + (t < 2.3 ? 10 : 0); R(x, '#fff1c8', tip[0] + Math.cos(an) * d - 4, tip[1] + Math.sin(an) * d - 4, 8, 8) }
    // Virgo slides in for the twist
    if (t >= T.tap - 0.9) {
      const vk = ease.outBack ? ease.outBack(prog(t, T.tap - 0.9, T.tap - 0.45)) : prog(t, T.tap - 0.9, T.tap - 0.45)
      const px = lerp(-200, POS.VIR[0], clamp(vk))
      const st = moodOf('VIR', t)
      drawBits(x, CLIP, CLIP_C, px - 120, POS.VIR[1] + 30, 8, { rot: -0.15 })
      drawStarChar(x, px, POS.VIR[1], POS.VIR[2], t, { color: VIR.color, glyph: VIR.glyph, ...st, hops: [T.tap - 0.45, T.tap, ...talkHops(ALL, TAG.VIR, { cps: CPS })], seed: 17, glow: 1 })
    }
  }
  // the tap: a pixel finger presses the button, a ripple
  function tap(t) {
    const p = prog(t, T.tap - 0.35, T.tap)
    if (p <= 0 || t > T.tap + 0.9) return
    const fy = lerp(BTN.y + 260, BTN.y + 18, ease.outCubic(p))
    R(x, INK, BTN.x - 22, fy, 44, 200); R(x, '#ef5c94', BTN.x - 16, fy + 6, 32, 190); R(x, '#ffd1de', BTN.x - 10, fy + 10, 20, 14)
    if (t >= T.tap) { const q = prog(t, T.tap, T.tap + 0.6); x.save(); x.globalAlpha = 1 - q; x.strokeStyle = '#ffffff'; x.lineWidth = 6; x.beginPath(); x.arc(BTN.x, BTN.y, 30 + q * 160, 0, Math.PI * 2); x.stroke(); x.restore() }
  }
  /** a crew freeze-frame: punch-in on one member, colour wash, a speed-line burst */
  function introFx(t) {
    const i = Math.floor((t - INTRO0) / INTRO_LEN)
    if (i < 0 || i > 3) return null
    const it = INTROS[i], at = introAt(i), [px, py] = POS[it.id]
    const k = ease.outBack ? clamp(ease.outCubic(prog(t, at, at + 0.18))) : 1
    return { it, at, px, py, k }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      hiddenComet(x, t, { at: COMET.at, from: COMET.from, to: COMET.to, dur: 2.4 })
      const ok = popOut(t, T.out)
      const fx = introFx(t)
      x.save(); x.globalAlpha = ok
      if (fx) {
        // punch in on the crew member (freeze: time stops for the sprite)
        const s = 1 + 0.55 * fx.k, ft = fx.at + 0.1
        x.translate(540, 1000); x.scale(s, s); x.translate(-fx.px, -(fx.py - 90))
        room(ft); schematic(ft, 0, false); crew(ft)
        x.setTransform(1, 0, 0, 1, 0, 0)
        x.save(); x.globalCompositeOperation = 'color'; x.fillStyle = rgba(fx.it.col, 0.55); x.fillRect(0, 0, 1080, 1920); x.restore()
        x.save(); x.globalCompositeOperation = 'lighter'
        for (let j = 0; j < 22; j++) { const an = j / 22 * Math.PI * 2; x.fillStyle = rgba(fx.it.col, 0.25); x.beginPath(); x.moveTo(540, 1000); x.lineTo(540 + Math.cos(an) * 1400, 1000 + Math.sin(an) * 1400); x.lineTo(540 + Math.cos(an + 0.05) * 1400, 1000 + Math.sin(an + 0.05) * 1400); x.fill() }
        x.restore()
        { const g = x.createLinearGradient(0, 1300, 0, 1800); g.addColorStop(0, 'rgba(6,3,16,0)'); g.addColorStop(0.45, 'rgba(6,3,16,0.85)'); g.addColorStop(1, 'rgba(6,3,16,0.9)'); x.fillStyle = g; x.fillRect(0, 1300, 1080, 500) }
        // the slanted role strip
        x.save(); x.translate(540, 1690); x.rotate(-0.05); R(x, INK, -560, -40, 1120, 80); R(x, fx.it.col, -560, -34, 1120, 68); x.restore()
        monoText(x, fx.it.sub, 540, 1686, { size: 26, color: INK, shadow: false, spacing: 0.08, n: Math.floor((t - fx.at - 0.2) / 0.02) })
        monoText(x, '❚❚ FREEZE', 920, 440, { size: 24, color: BONE })
      } else {
        const live = prog(t, T.go, T.go + 0.3) * (t < T.tap ? 1 : 0)
        room(t)
        schematic(t, live > 0 ? 1 : 0, t >= T.tap)
        lasers(t, live)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        tap(t)
        crew(t)
        burst(x, t, T.tap, BTN.x, BTN.y, { n: 10, R: 160, cols: ['#9dffb0', BONE, NEON], seed: 4 })
        if (t >= T.tap && t < T.tap + 2.6) chip(x, t, { at: T.tap + 0.05, out: T.tap + 2.6, text: 'UNFOLLOWED ✓', x: BTN.x + 260, y: BTN.y + 110, size: 30, color: '#9dffb0', border: '#9dffb0', rot: -0.06 })
        if (t >= T.silence[0] && t < T.silence[1]) monoText(x, '( silence )', 540, 1120, { size: 30, color: BONE, alpha: 0.8 })
      }
      x.restore()
      flash(x, t, T.tap, { dur: 0.2, peak: 0.7 })
      for (let i = 0; i < 4; i++) flash(x, t, introAt(i), { dur: 0.16, peak: 0.55 })
      if (t < T.out[1]) {
        drawDayChip(x, t, DAY)
        genreBug(x, t, { text: t >= T.go && t < T.tap ? '● LIVE OP' : 'THE UNFOLLOW HEIST', x: 96, y: 1838, color: NEON })
      }
      hook.update(t)
      ROLES.forEach((h, i) => h.update(t, outK(t, [introAt(i) + INTRO_LEN - 0.12, introAt(i) + INTRO_LEN - 0.02])))
      box1.update(t); box2.update(t); box3.update(t)
      LAST.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the intros → GO, the twist's silence → the last line
const CUTS = [{ t: INTRO0 - 0.04, kind: 'flip' }, { t: T.go - 0.03, kind: 'deal' }, { t: T.last - 0.08, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E12' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['tick', 0.12, 0.06],
  ...talkCues(ALL, { cps: CPS, pitch: { [TAG.SAG]: 659.25, [TAG.SCO]: 523.25, [TAG.GEM]: 987.77, [TAG.VIR]: 880, [TAG.ARI]: 587.33 } }),
  ...INTROS.map((_, i) => [['tick', introAt(i), 0.09], ['boom', introAt(i), 0.1], ['pluck', r3(introAt(i) + 0.3), NOTE[(i * 2) % 7], 0.045, 0.5, 0]]).flat(),
  ...stingerCues(T.go, { key: KEY, kind: 'trailer' }),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.go + i * (T.tap - T.go) / 10), i >= 7 ? 0.05 : 0.03]),
  ['riser', T.go + 3, T.tap - 0.05, 0.05],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ['tapeStop', T.tap - 0.02, 0.5], ['pop', T.tap, 1318.51, 0.06, 0], ['tick', T.tap + 0.01, 0.1],
  ['pluck', r3(T.silence[1] + 0.1), 1174.66, 0.04, 0.5, 0],
  ...wordPops(T.last, 2, 0.09, 2), ['pop', r3(T.last + 0.4), 1567.98, 0.05, 0], ['bell', r3(T.last + 0.4), 2093, 0.03, 1.6, 0],
  ['whoosh', T.plan, 0.35, 0.03], ['tick', r3(T.plan + 0.15), 0.06],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
