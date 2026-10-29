// st8direct (35 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E24: breaking news, the bookend to E01) · story
// 0–30.6, then the end card.
//   Hook (frame 0): "BREAKING: Venus is | going *forward.*"  The same STAR NEWS anchor desk as st8breaking (E01), now
//   sunny: the set glows dawn-gold, Venus (still the gold-rimmed Morning Star) throws her papers in the air, the LIVE bug,
//   the ♀ DIRECT · DAY 42 chip, the ticker "VENUS STATIONS DIRECT • EXES LEAVING IN AN ORDERLY FASHION".
//   0.0–6.2   the desk. VENUS: "good morning. i am, officially, going *forward.*"  lower third: DAY 42 · STATIONED DIRECT.
//   6.2–12.4  LIVE: THE COMET LEAVES. The Comet waves from deep space. COMET: "heading out. see you in about *76 years.*"
//             Fact chip: HALLEY'S COMET · BACK ABOUT EVERY 76 YEARS · NEXT ≈ 2061. It sails off, outbound, and its tail now
//             LEADS it (a tail always points away from the Sun: real, and the rewatch bait).
//   12.4–16.9 LIVE: THE ORBITER POWERS DOWN. It circles Scorpio's phone one last time, the red "viewed" light goes out, it
//             drifts off. ORBITER: "logging off. no more *watching.*"
//   16.9–21.3 LIVE: THE MUSEUM OF EXES (E07's, Cancer curating). The Meteor, now a pebble under a glass dome.
//             CANCER: "the Meteor. burned out, now *thriving.*"
//   21.3–30.6 back at the desk, same framing as frame 0. An envelope slides in: SAVE THE DATE · ♌ × ♒. The ticker flips
//             to WEDDING INVITATIONS SPOTTED. VENUS: "and now, some *wedding* news."  Then the last line, the loop closed:
//             "Forward looks | *good* on you."
//   Hidden comet: this time it's the real one, leaving (9.8). Ghost: leans out from behind the studio monitor (26.0).
//   Rewatch bait: Mars in the studio monitor again (he waved "hi" in E01); now he holds up "proud of u".
// Real: Venus retrograde lasts about six weeks, then it "stations direct" and appears to move forward again; Halley's
// Comet returns about every 76 years (next around 2061); a comet's tail points away from the Sun. The Orbiter and the
// Meteor are characters, not science claims.
// One canvas, DOM type (hook card, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawBits } from '../../st5cast.js'
import { VENUS, COMET, SATELLITE, drawVenus, drawMars, drawComet, drawSatellite, drawMeteor, drawPhone, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues } from '../../st8cast.js'

export const DURATION = 35
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff', MINT = '#7fe0b8', DAWN = '#ffb26b'
const MONO = "'Space Mono', ui-monospace, monospace"
const NEWS_RED = '#d8203a'

const T = {
  hookOut: [2.5, 2.78], l1: 2.9,
  cutB: 6.2, lowerB: 6.35, l2: 6.5, fact: 8.4, leave: [9.6, 12.2],
  cutC: 12.4, l3: 12.75, lightOff: 14.4, drift: [14.9, 16.8],
  cutD: 16.9, l4: 17.15,
  cutE: 21.3, env: [21.45, 21.95], l5: 22.1, close: 24.4,
  last: 24.6, ghost: 26.0, lastOut: [30.0, 30.35],
}
const VN = VENUS.tag, CN = COMET.tag, ON = SATELLITE.tagText, CAN = '♋ CANCER · CURATOR'
const CANS = signStar('cancer')
const LINES = [
  { t: T.l1, speaker: VN, text: 'good morning. i am, officially, going *forward.*', color: VENUS.tagColor },
  { t: T.l2, speaker: CN, text: 'heading out. see you in about *76 years.*', color: COMET.tagColor },
  { t: T.l3, speaker: ON, text: 'logging off. no more *watching.*', color: SATELLITE.tagColor },
  { t: T.l4, speaker: CAN, text: 'the Meteor. burned out, now *thriving.*', color: CANS.color },
  { t: T.l5, speaker: VN, text: 'and now, some *wedding* news.', color: VENUS.tagColor },
]
const CPS = 28
const scene = t => t < T.cutB ? 'A' : t < T.cutC ? 'B' : t < T.cutD ? 'C' : t < T.cutE ? 'D' : 'E'
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

// ── the anchor desk shot (A and E), matching st8breaking: Venus at (540, 990), the desk in front
const VEN = { x: 540, y: 990, s: 330 }
const DESK = { y0: 1100, y1: 1390 }
const MON = { x0: 760, y0: 560, x1: 990, y1: 730 }
// ── the other shots
const CMT = { x: 560, y: 980 }
const PHONE = { x: 540, y: 1000 }
const DOME = { x: 640, y: 1130 }
export const GHOST = { at: T.ghost, x: MON.x0, y: 650, where: 'leaning out from behind the left edge of the studio monitor, in the last shot' }
export const HIDDEN_COMET = { at: T.leave[0], where: 'the Comet itself, leaving for about 76 years (its tail leading, away from the Sun)' }

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'BREAKING: Venus is | going *forward.*', at: 0, out: T.hookOut, size: 100, accentSize: 150, top: 178, accentColor: MINT })
  const last = hookCard(root, { text: 'Forward looks | *good* on you.', at: T.last, out: T.lastOut, size: 112, accentSize: 176, top: 178, accentColor: GOLD })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 260, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function monoText(s, X, Y, { size = 30, color = BONE, align = 'left', alpha = 1, shadow = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + size * 0.09) }
    x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    const n = parseInt(col.slice(1), 16), rgb = `${n >> 16},${(n >> 8) & 255},${n & 255}`
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${0.5 * a})`); g.addColorStop(1, `rgba(${rgb},0)`)
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  // the same set as E01, in daylight: a dawn-gold backdrop, a striped sun rising where the pink orbit rings spun, and the
  // rings now mint, turning the other way (forward)
  function studio(t) {
    const g = x.createLinearGradient(0, 480, 0, 1400); g.addColorStop(0, '#ff9a6a'); g.addColorStop(0.5, '#c8508a'); g.addColorStop(1, '#3a1a5a')
    x.fillStyle = g; x.fillRect(0, 470, 1080, 940)
    x.fillStyle = 'rgba(255,241,200,0.10)'
    for (let i = 0; i < 1080; i += 60) x.fillRect(i, 470, 2, 940)
    for (let j = 470; j < 1410; j += 60) x.fillRect(0, j, 1080, 2)
    // the sun, rising behind the set (stripes like a dawn)
    const sx = 300, sy = 900, R = 190
    glow(sx, sy, 420, '#ffd36e', 0.7)
    for (let yy = sy - R; yy < sy + R; yy += 6) {
      const dy = yy - sy, half = Math.sqrt(Math.max(0, R * R - dy * dy))
      if (yy > sy + 20 && Math.floor((yy - sy - 20) / 16) % 2 === 1) continue
      px(sx - half, yy, half * 2, 6, yy < sy - 60 ? '#fff1c8' : yy < sy + 40 ? '#ffd36e' : '#ffb26b')
    }
    x.save(); x.translate(300, 820)
    for (let i = 0; i < 46; i++) { if (i % 2) continue; const a = i / 46 * Math.PI * 2 + t * 0.5; px(Math.cos(a) * 230 - 3, Math.sin(a) * 90 - 3, 7, 7, 'rgba(127,224,184,0.6)') }
    x.restore()
    px(0, 470, 1080, 8, NEWS_RED)
    monoText('★ STAR NEWS · ♀ DIRECT WATCH', 540, 520, { size: 30, color: '#fff1d6', align: 'center' })
    // the monitor (rewatch bait: Mars again; in E01 he waved "hi", now he holds up "proud of u")
    const { x0, y0, x1, y1 } = MON
    px(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16, INK); px(x0 - 4, y0 - 4, x1 - x0 + 8, y1 - y0 + 8, '#3a3358')
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    px(x0, y0, x1 - x0, y1 - y0, '#3a1a18')
    const mcx = (x0 + x1) / 2
    drawMars(x, mcx - 30, (y0 + y1) / 2 + 22, 110, t, { mood: 'happy', moonMood: 'hype', seed: 3 })
    px(mcx + 6, y0 + 22, 104, 44, INK); px(mcx + 9, y0 + 25, 98, 38, BONE); monoText('proud of u', mcx + 58, y0 + 44, { size: 16, color: INK, align: 'center', shadow: false })
    for (let j = y0; j < y1; j += 6) px(x0, j, x1 - x0, 2, 'rgba(0,0,0,0.25)')
    x.restore()
    monoText('LIVE · MARS', (x0 + x1) / 2, y1 + 26, { size: 18, color: '#ffe0c8', align: 'center', alpha: 0.9 })
  }
  function desk(t) {
    const { y0, y1 } = DESK
    x.save()
    x.beginPath(); x.moveTo(60, y0); x.lineTo(1020, y0); x.lineTo(1060, y1); x.lineTo(20, y1); x.closePath()
    x.fillStyle = INK; x.fill()
    x.beginPath(); x.moveTo(68, y0 + 8); x.lineTo(1012, y0 + 8); x.lineTo(1048, y1 - 6); x.lineTo(32, y1 - 6); x.closePath()
    const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#5a3a7a'); g.addColorStop(1, '#2a1650'); x.fillStyle = g; x.fill()
    x.restore()
    px(60, y0, 960, 14, '#8a6ab8'); px(60, y0, 960, 4, '#c8b0f0')
    px(80, y0 + 70, 920, 10, MINT)
    monoText('♀ VENUS · ANCHOR', 540, y0 + 140, { size: 34, color: BONE, align: 'center' })
    // the mug, steaming (it says FWD now)
    px(170, y0 - 52, 54, 56, INK); px(174, y0 - 48, 46, 48, BONE); px(220, y0 - 36, 14, 24, INK); px(180, y0 - 40, 34, 6, MINT)
    monoText('FWD', 197, y0 - 20, { size: 14, color: INK, align: 'center', shadow: false })
    for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p) * 0.6; px(190 + Math.sin(p * 9 + i) * 8, y0 - 60 - p * 60, 6, 6, BONE); x.globalAlpha = 1 }
  }
  function papers(t) {
    // three sheets: tossed up in celebration at frame 0, landing by 1.4 (E01's shuffle, rhymed)
    for (let i = 0; i < 3; i++) {
      const p = ease.outCubic(prog(t, 0, 1.2 + i * 0.12))
      const sx = lerp(360 + i * 160, 640 + i * 46, p), sy = lerp(760 - (i % 2) * 70, DESK.y0 - 12 - i * 4, ease.inQuad(p)), rot = lerp(0.6 - i * 0.6, 0.05 * (i - 1), p)
      x.save(); x.translate(sx, sy); x.rotate(rot); px(-46, -30, 92, 60, INK); px(-42, -26, 84, 52, '#fff8ea')
      for (let k = 0; k < 4; k++) px(-34, -16 + k * 11, 68 - (k % 2) * 18, 5, 'rgba(27,18,54,0.45)')
      x.restore()
    }
    // a little confetti with them
    for (let i = 0; i < 18; i++) { const p = prog(t, 0, 2.2), r = rng(i * 13 + 1); const cx = 200 + r() * 680, cy = lerp(620 + r() * 200, 1120, ease.inQuad(p)) ; if (p < 1) px(cx + Math.sin(t * 6 + i) * 10, cy, 10, 6, [MINT, GOLD, PINK, BONE][i % 4]) }
  }
  function lowerThird(t, at, out, name, sub, y = 1330) {
    const p = prog(t, at, at + 0.35), o = 1 - prog(t, out - 0.25, out)
    if (p <= 0 || o <= 0) return
    const w = lerp(0, 820, ease.outCubic(p))
    x.save(); x.globalAlpha = o
    px(70, y - 52, w, 64, NEWS_RED); px(70, y + 12, w * 0.9, 46, '#efe6d6')
    x.save(); x.beginPath(); x.rect(70, y - 60, w, 130); x.clip()
    monoText(name, 96, y - 20, { size: 34, color: '#ffffff' }); monoText(sub, 96, y + 35, { size: 24, color: INK, shadow: false })
    x.restore(); x.restore()
  }
  // the save-the-date envelope sliding onto the desk
  function envelope(t) {
    const p = ease.outBack(prog(t, ...T.env))
    if (t < T.env[0]) return
    const ex = lerp(1240, 760, p), ey = DESK.y0 - 46
    x.save(); x.translate(ex, ey); x.rotate(-0.06 + 0.02 * Math.sin(t * 2))
    px(-120, -62, 240, 124, INK); px(-114, -56, 228, 112, '#fff4e6')
    x.beginPath(); x.moveTo(-114, -56); x.lineTo(0, 8); x.lineTo(114, -56); x.strokeStyle = 'rgba(27,18,54,0.35)'; x.lineWidth = 4; x.stroke()
    drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, 0, 6, 6)
    monoText('SAVE THE DATE', 0, 34, { size: 18, color: INK, align: 'center', shadow: false })
    monoText('♌ × ♒', 0, -34, { size: 20, color: '#c98a1f', align: 'center', shadow: false })
    x.restore()
  }
  // deep space for the Comet's send-off: a far Sun glow at the lower left
  function space(t) {
    glow(-60, 1500, 700, '#ffd36e', 0.55)
    for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 3); drawPixelStar(x, r() * 1080, 480 + r() * 920, 8 + r() * 10, i % 3 ? 0 : 1, i % 4 ? BONE : '#cfe8ff') }
  }
  // the museum of exes (E07's): velvet ropes, a plinth with a glass dome, a plaque
  function museum(t) {
    const g = x.createLinearGradient(0, 470, 0, 1420); g.addColorStop(0, '#2a1838'); g.addColorStop(1, '#130b1e')
    x.fillStyle = g; x.fillRect(0, 470, 1080, 950)
    px(0, 1300, 1080, 120, '#3a2430'); px(0, 1300, 1080, 6, '#5a3a48')
    // a spotlight cone onto the plinth
    x.save(); x.globalCompositeOperation = 'lighter'
    const sg = x.createLinearGradient(0, 470, 0, 1300); sg.addColorStop(0, 'rgba(255,240,200,0.0)'); sg.addColorStop(1, 'rgba(255,240,200,0.18)')
    x.fillStyle = sg; x.beginPath(); x.moveTo(DOME.x - 30, 470); x.lineTo(DOME.x + 30, 470); x.lineTo(DOME.x + 230, 1300); x.lineTo(DOME.x - 230, 1300); x.closePath(); x.fill(); x.restore()
    // the plinth
    px(DOME.x - 130, DOME.y + 40, 260, 230, INK); px(DOME.x - 122, DOME.y + 48, 244, 222, '#efe6d6'); px(DOME.x - 122, DOME.y + 48, 244, 14, '#ffffff')
    // the pebble (the Meteor, burned out, a little face, very content), under glass
    drawMeteor(x, DOME.x, DOME.y + 2, 120, t, { burn: 1, puff: 0, mood: 'happy', aura: false, exPin: false, look: [-1, 0] })
    x.save(); x.globalAlpha = 0.55
    x.strokeStyle = '#d6f2ff'; x.lineWidth = 6; x.beginPath(); x.arc(DOME.x, DOME.y + 40, 120, Math.PI, 0); x.lineTo(DOME.x + 120, DOME.y + 44); x.lineTo(DOME.x - 120, DOME.y + 44); x.closePath(); x.stroke()
    x.fillStyle = 'rgba(214,242,255,0.10)'; x.fill(); px(DOME.x - 70, DOME.y - 50, 14, 50, 'rgba(255,255,255,0.6)')
    x.restore()
    // the plaque
    px(DOME.x - 112, DOME.y + 110, 224, 120, '#c98a1f'); px(DOME.x - 106, DOME.y + 116, 212, 108, '#f2d48a')
    monoText('THE METEOR', DOME.x, DOME.y + 140, { size: 22, color: INK, align: 'center', shadow: false })
    monoText('burned out.', DOME.x, DOME.y + 172, { size: 18, color: INK, align: 'center', shadow: false })
    monoText('doing fine.', DOME.x, DOME.y + 198, { size: 18, color: INK, align: 'center', shadow: false })
    // velvet ropes
    for (const sx of [110, 1000]) { px(sx - 10, 1140, 20, 170, INK); px(sx - 6, 1144, 12, 162, '#c98a1f'); px(sx - 16, 1124, 32, 24, '#f2c75c') }
    x.strokeStyle = '#a3203a'; x.lineWidth = 12; x.beginPath(); x.moveTo(110, 1150); x.quadraticCurveTo(300, 1260, 470, 1180); x.stroke()
    x.beginPath(); x.moveTo(820, 1180); x.quadraticCurveTo(920, 1240, 1000, 1150); x.stroke()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sc = scene(t)
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      if (sc === 'A' || sc === 'E') {
        const punch = sc === 'A' ? 1 + 0.05 * ease.inOutCubic(prog(t, 3.6, 6.1)) : 1 + 0.06 * (1 - ease.outCubic(prog(t, T.cutE, T.cutE + 0.5)))
        x.save(); x.translate(540, 1000); x.scale(punch, punch); x.translate(-540, -1000)
        studio(t)
        const st = sc === 'A' ? (t < 1.3 ? { mood: 'happy', look: [0, -1] } : t < T.l1 ? { mood: 'sparkle', look: [0, 0] } : t < 5.0 ? { mood: 'happy' } : { mood: 'neutral', look: [0, 0] })
          : (t < T.env[1] ? { mood: 'neutral', look: [1, 1] } : t < T.l5 ? { mood: 'wide', look: [1, 1], blink: false } : t < T.last ? { mood: 'heart' } : t < 27.6 ? { mood: 'sparkle', look: [0, 0] } : { mood: 'wink', look: [0, 0] })
        drawVenus(x, VEN.x, VEN.y, VEN.s, t, { ...st, retro: 0, morning: 1, hops: [...talkHops(LINES, VN, { cps: CPS }), 0.05, T.cutE + 0.05, T.env[1], T.last + 0.3], seed: 5 })
        if (sc === 'A') papers(t)
        desk(t)
        if (sc === 'E') envelope(t)
        if (sc === 'A') lowerThird(t, -0.4, T.l1 - 0.25, 'DAY 42 OF ABOUT SIX WEEKS', 'VENUS STATIONS DIRECT · STAR NEWS', 1500)
        if (sc === 'E') lowerThird(t, T.last + 0.3, T.lastOut[1], 'UPDATE: VENUS IS GLOWING', 'IT ONLY LOOKED BACKWARDS FROM HERE', 1500)
        if (sc === 'E') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 3 })
        x.restore()
      } else if (sc === 'B') {
        // the Comet's send-off: it waves, then sails off up-right, away from the Sun, its tail now leading the way
        space(t)
        const lp = ease.inCubic(prog(t, ...T.leave))
        const cx = lerp(CMT.x, 1240, lp), cy = lerp(CMT.y, 520, lp), sz = lerp(200, 40, lp)
        drawComet(x, cx, cy, sz, t, { sunDir: [-1, 0.9], mood: t < T.leave[0] ? 'happy' : 'heart', look: [0, 0], aura: false, exPin: false, hops: talkHops(LINES, CN, { cps: CPS }), seed: 2 })
        // a waving pixel "hand" (a little sparkle wagging beside it) before it leaves
        if (t < T.leave[0]) drawPixelStar(x, cx - 150 + Math.sin(t * 10) * 18, cy - 90, 34, 1, '#dff6ff')
        const fk = pop01(t, T.fact, 0.35, 2.2) * (1 - prog(t, T.cutC - 0.25, T.cutC))
        if (fk > 0.01) {
          x.save(); x.translate(540, 1240); x.scale(fk, fk); x.rotate(-0.03)
          px(-380, -60, 760, 120, INK); px(-374, -54, 748, 108, '#16203a'); px(-374, -54, 748, 6, CYAN)
          monoText('HALLEY’S COMET · BACK ≈ EVERY 76 YEARS', 0, -16, { size: 26, color: BONE, align: 'center' }); monoText('next ≈ 2061 · tail points away from the Sun', 0, 22, { size: 22, color: CYAN, align: 'center' })
          x.restore()
        }
        lowerThird(t, T.lowerB, T.cutC, 'LIVE · THE COMET LEAVES', 'ITS TAIL LEADS ON THE WAY OUT', 560)
      } else if (sc === 'C') {
        // the Orbiter's last lap round Scorpio's phone; the "viewed" light goes out; it drifts off into the dark
        const SC = signStar('scorpio')
        drawStarChar(x, 250, 1260, 240, t, { color: SC.color, glyph: SC.glyph, mood: t < T.lightOff ? 'squint' : 'happy', look: [1, -1], seed: 8 })
        const dp = ease.inQuad(prog(t, ...T.drift))
        drawPhone(x, PHONE.x + 120, PHONE.y, 270, t, { lit: 1, text: t < T.lightOff ? 'viewed by: 1' : 'viewed by: 0', rot: 0.08 })
        const speed = lerp(0.9, 0.25, prog(t, T.l3, T.lightOff))
        if (dp <= 0) drawSatellite(x, 0, 0, 330, t, { orbit: { cx: PHONE.x + 120, cy: PHONE.y, r: 340, speed, tilt: 0.32 }, viewed: t < T.lightOff, mood: t < T.lightOff ? 'neutral' : 'sleepy', aura: t < T.lightOff, exPin: t < T.lightOff, hops: talkHops(LINES, ON, { cps: CPS }) })
        else drawSatellite(x, lerp(PHONE.x + 120, 1200, dp), lerp(PHONE.y - 60, 560, dp), 330 * (1 - 0.7 * dp), t, { viewed: false, mood: 'sleepy', aura: false, exPin: false, rot: -0.3 * dp })
        lowerThird(t, T.cutC + 0.15, T.cutD, 'LIVE · THE ORBITER POWERS DOWN', 'STORIES VIEWED TODAY: 0', 560)
      } else if (sc === 'D') {
        museum(t)
        drawStarChar(x, 250, 1150, 240, t, { color: CANS.color, glyph: CANS.glyph, mood: t < 19.4 ? 'happy' : 'sparkle', look: [1, 0], hops: [T.cutD + 0.1, ...talkHops(LINES, CAN, { cps: CPS })], seed: 11 })
        lowerThird(t, T.cutD + 0.15, T.cutE, 'LIVE · THE MUSEUM OF EXES', 'NEW EXHIBIT · CURATED BY CANCER', 560)
      }
      // the network chrome (every shot)
      genreBug(x, t, { text: 'LIVE', x: 70, y: sc === 'A' || sc === 'E' ? 458 : 470, color: NEWS_RED })
      drawDayChip(x, t, { day: 42, phase: 'direct' })
      drawTicker(x, t, { text: t < T.cutE ? 'VENUS STATIONS DIRECT • EXES LEAVING IN AN ORDERLY FASHION • COMET: BACK IN ≈ 76 YEARS • ORBITER: OFFLINE' : 'WEDDING INVITATIONS SPOTTED • ♌ LEO × ♒ AQUARIUS • THEY WAITED FOR VENUS TO GO DIRECT • DRESS CODE: FORWARD', label: 'BREAKING', y: 1790, color: NEWS_RED })
      hook.update(t); last.update(t)
      box.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 16.9, the Orbiter's shot → the museum (the only one, so it plays).
const CUTS = [{ t: T.cutD, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E24', fadeIn: 0 }), cardCuts(CUTS)]

// ── sound
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...stingerCues(T.hookOut[0] + 0.1, { key: KEY, kind: 'news' }),
  ...[0, 1, 2].map(i => ['tick', r3(0.2 + i * 0.12), 0.03]), ['glitter', 0, 1.6],
  ...talkCues(LINES, { cps: CPS, pitch: { [VN]: 1046.5, [CN]: 880, [ON]: 440, [CAN]: 784 } }),
  ['whoosh', T.cutB - 0.05, 0.4, 0.05], ['pop', T.lowerB, 880, 0.04, -0.3],
  ['pop', T.fact, 1318.51, 0.045, 0.3], ['bell', T.fact + 0.05, 1760, 0.025, 1.2, 0.3],
  ['riser', T.leave[0] - 0.3, T.leave[0] + 1.2, 0.06], ['whoosh', T.leave[0] + 0.8, 1.2, 0.05], ['glitter', T.leave[0], T.leave[1]],
  ['whoosh', T.cutC - 0.05, 0.4, 0.05],
  ['chip', T.lightOff, 880, 0.5, { wave: 'square', slide: -600, gain: 0.02 }], ['tick', T.lightOff, 0.05],
  ['whoosh', T.drift[0], 1.2, 0.035],
  ['whoosh', T.cutD - 0.05, 0.4, 0.05], ['bell', T.cutD + 0.3, 987.77, 0.03, 1.6, 0],
  ['whoosh', T.env[0], 0.4, 0.04], ['pop', T.env[1], 1318.51, 0.05, 0.3], ['bell', T.env[1] + 0.05, 1975.53, 0.03, 1.4, 0.3],
  ['tick', T.ghost + 0.05, 0.014],
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', T.last + 0.5, 1318.51, 0.03, 1.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
