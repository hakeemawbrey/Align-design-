// st9ariescrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E04, THE CREW) · story 0–20.6, then the end card.
//   "Never challenge an Aries to *anything.*"  Saturday mini golf with the fire trio, Leo and Sagittarius, under a
//   fighting-game HUD (VS plates, TRASH TALK meters, HOLE 9 · PAR 3). "loser buys *fries.*" "you're *ON.*" Fact chip: the
//   fire signs are Aries, Leo and Sagittarius. Trash talk maxes out ("i was BORN for hole nine." / "you said that about
//   hole *one.*"). Aries putts headfirst into the windmill and the ball rolls back to its feet (+4); Sag sinks a hole in
//   one. The scoreboard: Aries 3RD. Aries cracks up laughing, Leo pins a 3rd-place ribbon on it (it's on the IDEAS board
//   in E05). Last shot = frame 0's backswing, ribbon on, HUD "HOLE 1 · REMATCH".   "Win the game. *Keep* the friends."
//   Rewatch bait: the sign on the windmill says NO RAMMING; Leo's ball has a tiny crown. Ghost: behind the windmill.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'

export const DURATION = 25
const KEY = 'Am'
const STORY_END = DURATION - ENDCARD_LEN         // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0'
const AR = signStar('aries'), LE = signStar('leo'), SA = signStar('sagittarius')
const MONO = "'Space Mono', monospace"
const P = 6
const q = v => Math.round(v / P) * P
const R = (x, a, b, w, h, c) => { x.fillStyle = c; x.fillRect(q(a), q(b), q(w), q(h)) }

const T = {
  hookOut: 2.7, talk: 5.5, putt: 9.2, bonk: 10.15, back: 11.0, sag: 11.8, hio: 12.6, board: 13.3, laugh: 14.4, ribbon: 15.0,
  rematch: 17.0, ghost: 8.0, last: 17.3, lastOut: [19.95, 20.2], fade: [20.15, 20.6],
}
const CUTS = [T.board, T.rematch]
const PUNCH = [{ at: T.back, out: T.sag - 0.05, zoom: 1.4, x: 300, y: 1240 }]
const CLOCK = [{ at: 0, from: '2:00 PM' }, { at: T.board, dur: 1.0, from: '2:00 PM', to: '5:40 PM' }]
const SAY = [
  { text: 'loser buys *fries.*', at: 0.9, out: 2.7, who: 'leo' },
  { text: 'you’re *ON.*', at: 2.85, out: 4.4, who: 'aries' },
  { text: 'i was BORN for hole *nine.*', at: T.talk, out: 7.25, who: 'aries' },
  { text: 'you said that about hole *one.*', at: 7.35, out: 9.1, who: 'sag' },
  { text: 'rematch next week. fries on *me.*', at: 15.2, out: 17.0, who: 'aries' },
]
const WHO = { aries: { name: '♈ ARIES', color: AR.color }, leo: { name: '♌ LEO', color: LE.color }, sag: { name: '♐ SAG', color: '#c99bff' } }
const STAMPS = [
  { at: 2.95, out: T.talk - 0.1, time: '2:00 PM', text: 'mini golf with the *fire* signs' },
  { at: T.laugh + 0.1, out: T.rematch - 0.15, time: '5:40 PM', text: 'lost. *laughing.*' },
]
const FACT = { text: 'The fire signs are Aries, Leo and Sagittarius.', at: 4.55, dur: 2.5, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 690, y: 960, where: 'peeking out from behind the left side of the windmill, mini golf' }

// the course
const POS = { aries: [300, 1250], leo: [560, 1060], sag: [900, 1230], hole: [640, 1170], wind: [800, 1010], ball: [390, 1330] }
const RIBBON = ['.BB.BB.', '.BB.BB.', '..oOo..', '.oOOOo.', '.oOOOo.', '..oOo..']
const RIBBON_C = { B: '#3a7bd5', o: '#a8642a', O: '#e09a55' }
const CROWN = ['g.g.g', 'YYYYY', 'YRYRY']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e' }

function drawCourse(x, t) {
  // hills + turf
  x.fillStyle = '#2f6b3c'; x.beginPath(); x.moveTo(-200, 980); x.quadraticCurveTo(300, 860, 700, 940); x.quadraticCurveTo(1000, 990, 1300, 930); x.lineTo(1300, 2100); x.lineTo(-200, 2100); x.fill()
  R(x, -200, 1000, 1500, 1100, '#3f8a4a')
  for (let i = 0; i < 12; i++) R(x, -200, 1020 + i * 60, 1500, 30, i % 2 ? '#469654' : '#3f8a4a')
  // the putting green: a raised bumper rectangle
  R(x, 60, 1080, 960, 360, '#8a5636'); R(x, 78, 1096, 924, 328, '#56b860')
  for (let i = 0; i < 6; i++) R(x, 78, 1096 + i * 56, 924, 28, '#5cc266')
  // hole + flag
  const [hx, hy] = POS.hole
  x.fillStyle = '#123a1a'; x.beginPath(); x.ellipse(hx, hy, 28, 12, 0, 0, Math.PI * 2); x.fill()
  R(x, hx - 3, hy - 200, 6, 200, BONE)
  const wv = Math.sin(t * 6) * 6
  x.fillStyle = '#ff3b4f'; x.beginPath(); x.moveTo(hx + 3, hy - 200); x.lineTo(hx + 80, hy - 176 + wv); x.lineTo(hx + 3, hy - 150); x.fill()
  x.save(); x.font = `700 22px ${MONO}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('9', hx + 30, hy - 175 + wv / 2); x.restore()
  // the windmill
  const [wx, wy] = POS.wind
  R(x, wx - 66, wy - 220, 132, 220, '#e8e1d2'); R(x, wx - 84, wy - 252, 168, 42, '#c8432a'); R(x, wx - 60, wy - 282, 120, 36, '#c8432a')
  R(x, wx - 24, wy - 72, 48, 72, '#1b1236')                                       // the tunnel
  R(x, wx - 54, wy - 170, 108, 34, '#ffe36e')
  x.save(); x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO RAMMING', wx, wy - 152); x.restore()
  const bonkK = Math.exp(-Math.max(0, t - T.bonk) * 3) * (t > T.bonk ? 1 : 0)
  x.save(); x.translate(wx, wy - 230); x.rotate(t * 1.4 + bonkK * 0.6 * Math.sin((t - T.bonk) * 30))
  for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.fillStyle = '#7a4a2a'; x.fillRect(-6, 0, 12, 170); x.fillStyle = '#fff4e0'; x.fillRect(6, 40, 34, 120) }
  x.fillStyle = '#1b1236'; x.fillRect(-12, -12, 24, 24); x.restore()
}
function ball(x, bx, by, crown = false) {
  x.fillStyle = 'rgba(0,0,0,0.25)'; x.beginPath(); x.ellipse(bx + 4, by + 10, 16, 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = crown ? '#f7c948' : '#ffffff'; x.beginPath(); x.arc(bx, by, 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(bx - 4, by - 2, 4, 4); x.fillRect(bx + 4, by + 3, 4, 4)
  if (crown) drawBits(x, CROWN, CROWN_C, Math.round(bx), Math.round(by - 22), 4)
}
function putter(x, cx, cy, size, ang, side = 1) {
  x.save(); x.translate(cx + side * size * 0.32, cy - size * 0.05); x.rotate(ang * side)
  x.fillStyle = '#c9ccd8'; x.fillRect(-4, 0, 8, size * 0.6)
  x.fillStyle = '#1b1236'; x.fillRect(-4, -10, 8, 26)
  x.fillStyle = '#9aa0b4'; x.fillRect(-4 - (side > 0 ? 0 : 30), size * 0.6 - 6, 38, 16)
  x.restore()
}
/** the fighting-game HUD: three plates, trash-talk meters, the hole number */
function fightHUD(x, t, a, { rematch = false, y0 = 250 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  const plates = [['ARIES', AR.color, 0], ['LEO', LE.color, 1], ['SAG', '#c99bff', 2]]
  plates.forEach(([n, c, i]) => {
    const px = 66 + i * 322, w = 300
    x.fillStyle = 'rgba(10,6,24,0.85)'; x.fillRect(px, y0, w, 74)
    x.fillStyle = c; x.fillRect(px, y0, 10, 74)
    x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.fillText(n, px + 22, y0 + 20)
    let v = [0.55, 0.4, 0.35][i]
    if (i === 0) v = lerp(v, 1, ease.outCubic(prog(t, T.talk, T.talk + 1.2))) * (t > T.board ? 0.3 : 1)
    if (i === 2) v = lerp(v, 0.85, ease.outCubic(prog(t, 7.4, 8.4)))
    if (rematch) v = 0.5
    x.fillStyle = '#2b2440'; x.fillRect(px + 22, y0 + 40, w - 40, 18)
    x.fillStyle = v > 0.97 && Math.floor(t * 6) % 2 ? '#ffffff' : c; x.fillRect(px + 22, y0 + 40, (w - 40) * v, 18)
    x.font = `700 14px ${MONO}`; x.textAlign = 'right'; x.fillStyle = BONE; x.fillText(v > 0.97 ? 'TRASH TALK: MAX' : 'TRASH TALK', px + w - 18, y0 + 20)
  })
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD
  x.fillText(rematch ? 'HOLE 1 · REMATCH' : 'HOLE 9 · PAR 3', 540, y0 + 104)
  x.restore()
}
function banner(x, t, text, at, dur, color = GOLD) {
  const p = prog(t, at, at + dur)
  if (p <= 0 || p >= 1) return
  const k = Math.min(1, p * 6) * (1 - ease.inCubic(prog(p, 0.8, 1)))
  x.save(); x.globalAlpha = k; x.translate(540, 760); x.rotate(-0.05); x.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k)
  x.fillStyle = INK; x.fillRect(-380, -70, 760, 140); x.fillStyle = color; x.fillRect(-370, -60, 740, 120)
  x.font = `800 84px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 6)
  x.restore()
}
function scoreboard(x, t) {
  const a = ease.outBack ? clamp((t - T.board - 0.15) / 0.3) : 1, out = 1 - prog(t, T.ribbon + 1.4, T.ribbon + 1.7)
  const k = Math.min(a, out)
  if (k <= 0) return
  x.save(); x.globalAlpha = k; x.translate(540, 700); x.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k)
  x.fillStyle = '#1b1236'; x.fillRect(-330, -190, 660, 380); x.fillStyle = '#2c2446'; x.fillRect(-318, -178, 636, 356)
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('FINAL SCORE', 0, -138)
  const rows = [['1ST', 'SAG', 31, '#c99bff'], ['2ND', 'LEO', 34, LE.color], ['3RD', 'ARIES', 41, AR.color]]
  rows.forEach(([pl, n, s, c], i) => {
    const show = t > T.board + 0.35 + i * 0.3
    if (!show) return
    const y = -60 + i * 84
    x.textAlign = 'left'; x.fillStyle = BONE; x.font = `700 38px ${MONO}`; x.fillText(pl, -280, y)
    x.fillStyle = c; x.fillText(n, -130, y)
    x.textAlign = 'right'; x.fillStyle = '#ffffff'; x.fillText(String(s), 280, y)
    if (i === 2 && Math.floor(t * 4) % 2) { x.strokeStyle = '#ff5a3c'; x.lineWidth = 4; x.strokeRect(-300, y - 34, 600, 68) }
  })
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "800 84px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Never challenge an Aries | to *anything.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Win the game. | *Keep* the friends.', { top: 290, size: 104, accentSize: 140, lineHeight: 1.2, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK), rem = t >= T.rematch
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: t < T.board ? 14 + t * 0.05 : rem ? 17.7 : lerp(14.7, 17.6, prog(t, T.board, T.board + 1)) })
      const day = 1 - prog(t, T.board, T.board + 1)                  // outdoors at 2 PM: a brighter afternoon wash
      if (day > 0) { const g = x.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, `rgba(120,180,235,${0.5 * day})`); g.addColorStop(1, `rgba(220,236,250,${0.45 * day})`); x.fillStyle = g; x.fillRect(0, 0, 1080, 1000) }
      drawSeedConstellation(x, t, 100, { alpha: 0.35 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      drawCourse(x, t)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      // Aries' ball: rest → putt → bonk the windmill → roll back
      let [bx, by] = POS.ball
      if (t > T.putt + 0.1 && !rem) {
        const p1 = prog(t, T.putt + 0.1, T.bonk), p2 = prog(t, T.bonk, T.back)
        const tx = POS.wind[0] - 30, ty = POS.wind[1] + 30
        if (p2 <= 0) { bx = lerp(POS.ball[0], tx, ease.outQuad(p1)); by = lerp(POS.ball[1], ty, ease.outQuad(p1)) }
        else { bx = lerp(tx, POS.ball[0] - 50, ease.outCubic(p2)); by = lerp(ty, POS.ball[1] + 10, ease.outCubic(p2)) - Math.sin(Math.PI * Math.min(1, p2 * 2)) * 40 }
      }
      ball(x, bx, by)
      // Sag's ball → hole in one
      let sx = POS.sag[0] - 90, sy = POS.sag[1] + 70
      if (t > T.sag + 0.2) { const p = prog(t, T.sag + 0.2, T.hio); sx = lerp(sx, POS.hole[0], ease.outQuad(p)); sy = lerp(sy, POS.hole[1], ease.outQuad(p)) }
      if (t < T.hio || rem) ball(x, rem ? POS.sag[0] - 90 : sx, rem ? POS.sag[1] + 70 : sy)
      ball(x, POS.leo[0] + 60, POS.leo[1] + 100, true)
      // the trio
      const laugh = t >= T.laugh && t < T.rematch
      const amood = t < T.putt ? (t < T.talk ? 'squint' : 'sparkle') : t < T.back ? 'squint' : t < T.board ? 'wide' : t < T.laugh ? 'wide' : 'happy'
      const ahops = laugh ? Array.from({ length: 8 }, (_, i) => T.laugh + i * 0.28) : t < T.putt ? [0.2, 2.85, 3.3, T.talk, T.talk + 0.5, T.talk + 1.0] : [T.back + 0.05]
      const swing = rem || t < T.putt ? -0.9 + 0.08 * Math.sin(t * 5) : t < T.putt + 0.12 ? lerp(-0.9, 0.5, prog(t, T.putt, T.putt + 0.12)) : 0.4
      const ar = drawStarChar(x, POS.aries[0], POS.aries[1], 270, t, { color: AR.color, glyph: AR.glyph, mood: amood, look: [1, -0.4], hops: ahops, seed: 9, squash: laugh ? 0.08 * Math.sin(t * 22) : 0 })
      putter(x, ar.x, ar.y, 270, swing, 1)
      if (t > T.ribbon || rem) drawBits(x, RIBBON, RIBBON_C, Math.round(ar.x - 104), Math.round(ar.y + 34), 7, { alpha: clamp((t - T.ribbon) / 0.2) || (rem ? 1 : 0) })
      if (laugh) { x.save(); x.font = `800 46px Inter, sans-serif`; x.fillStyle = GOLD; x.textAlign = 'center'; for (let i = 0; i < 3; i++) { const p = ((t - T.laugh) * 1.2 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p); x.fillText('HA', ar.x + 120 + i * 30, ar.top - p * 120) } x.restore() }
      const lr = drawStarChar(x, POS.leo[0], POS.leo[1], 220, t, { color: LE.color, glyph: LE.glyph, mood: t > T.hio && t < T.board ? 'wide' : t > T.ribbon - 0.4 ? 'happy' : 'sparkle', look: [-1, 0.5], hops: [0.9, 1.5, T.hio + 0.1, T.ribbon - 0.2, T.ribbon], seed: 33 })
      drawBits(x, CROWN, CROWN_C, Math.round(lr.x), Math.round(lr.top + 4), 7)
      const sr = drawStarChar(x, POS.sag[0], POS.sag[1], 230, t, { color: SA.color, glyph: SA.glyph, mood: t > T.hio && t < T.board + 1 ? 'happy' : t > 7.3 && t < 9.2 ? 'wink' : 'neutral', look: [-1, -0.3], hops: [7.35, 8.0, T.hio, T.hio + 0.35, T.hio + 0.7], seed: 41 })
      putter(x, sr.x, sr.y, 230, t > T.sag && t < T.sag + 0.2 ? -0.6 : t > T.sag ? 0.3 : -0.2, -1)
      x.restore()

      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'aries' })
      if (rem) fightHUD(x, t, prog(t, T.rematch, T.rematch + 0.2) * (1 - prog(t, T.last - 0.1, T.last + 0.1)), { rematch: true, y0: 520 })
      else if (t < T.hookOut + 0.2) fightHUD(x, t, 1 - prog(t, T.hookOut, T.hookOut + 0.2), { y0: 520 })   // frame 0: the VS plates under the hook
      else fightHUD(x, t, prog(t, T.hookOut, T.hookOut + 0.2) * (1 - prog(t, T.board - 0.2, T.board)))
      banner(x, t, '+4', T.back - 0.1, 1.0, '#ff5a3c')
      banner(x, t, 'HOLE IN ONE!', T.hio, 1.1)
      scoreboard(x, t)
      for (const s of SAY) {
        const w = WHO[s.who], [px, py] = POS[s.who]
        speechBubble(x, t, { ...s, x: px, y: py - (s.who === 'aries' ? 150 : 125), name: w.name, color: w.color, side: s.who === 'sag' ? -0.5 : s.who === 'aries' ? 0.4 : 0 })
      }
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.5 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.5 * cam.flash; x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.board, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E04' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const PITCH = { aries: 880, leo: 659.25, sag: 1174.66 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: PITCH[s.who] })),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...factChipCues(FACT.at, FACT),
  ['riser', T.talk, T.talk + 1.2, 0.05], ['pop', T.talk + 1.2, 1760, 0.05, -0.4],
  ['tick', T.ghost + 0.05, 0.015],
  ['tick', T.putt + 0.1, 0.12], ['pop', T.putt + 0.12, 880, 0.05, -0.3],
  ['boom', T.bonk, 0.25], ['tick', T.bonk, 0.1], ['pop', T.bonk + 0.02, 440, 0.05, 0.4],
  ...[0.2, 0.45, 0.65].map(d => ['tick', r3(T.bonk + d), 0.04]),
  ['pop', T.back, 349.23, 0.05, -0.3], ['pop', T.back + 0.2, 329.63, 0.05, -0.3],
  ['tick', T.sag + 0.2, 0.12], ['pop', T.hio, 1318.51, 0.05, 0], ['bell', T.hio + 0.05, 1760, 0.045, 1.4, 0], ['glitter', T.hio, T.hio + 0.9],
  ...[0.35, 0.65, 0.95].map((d, i) => ['pop', r3(T.board + d), [880, 783.99, 659.25][i], 0.045, 0]),
  ...clockCues(T.board, 1.0),
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.laugh + i * 0.28), 1046.5 + (i % 2) * 130, 0.03, 0.2]),
  ['pluck', T.ribbon, 1318.51, 0.05, 0.6, 0], ['glitter', T.ribbon, T.ribbon + 0.5],
  ...[0, 0.09, 0.18, 0.27, 0.36, 0.45].map((d, i) => ['pop', r3(T.last + d), [659.25, 783.99, 880, 987.77, 1046.5, 1318.51][i], 0.04, 0]),
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
