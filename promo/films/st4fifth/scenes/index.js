// st4fifth (15 s vertical Align ad, Star Talk season 4, EP 036, thread G: sky lessons) · story 0–10.6, then the shared end card.
//   0.00–2.85  "The *5th house* | is the fun floor."  A generic Houston high-rise pops up floor by floor: the chart wheel as
//              a twelve-floor tower (EP 035's building; its 7th-floor door still glows). A glass elevator rides up the
//              side, DINGs at 5, and the 5th floor bursts into party lights. The camera dives into the 5th-floor window.
//   2.85–5.60  Inside: a disco ball, a dance floor, a speaker stack, a few sign stars dancing. Box (THE STARS):
//              "5th house: romance and play."  Front and centre, two date stars stand stiff and far apart, and one asks:
//              "so. where do you see | yourself in 5 years?" (the other one sweats).
//   5.60–8.55  "Less interview. | More *party.*"  THE STARS: "dating should feel a little like *play*."  On "play" the disco
//              ball flares, the lights go full, and the couple gasps, laughs and hops onto the dance floor together.
//   8.62       card cut (flip, box shut).
//   8.66–10.45 "Keep it | *fun.*"  Heart-eyes, confetti. The ghost peeks out from behind the speaker stack (9.05).
//              Everything pops out by 10.45; the end card takes over at 10.6.
// One canvas (sky + constellation + tower / room + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 36
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', CYAN = '#7fe0ff', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const PARTY = [PINK, CYAN, GOLD, LAV, MINT]
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), LEO = signStar('leo')
const THEM_A = BONE, THEM_B = '#ffd2e1'

const SPEAK = 'THE STARS'
const CPS = 28
const LINES = [
  { t: BEAT(4), speaker: SPEAK, text: '5th house: *romance* and *play.*' },
  { t: 5.62, speaker: SPEAK, text: 'dating should feel a little like *play.*', color: PINK },
]
const LT = lineTimes(LINES, { cps: CPS })
const PLAY_AT = LT[1].chars[LT[1].chars.length - 5]          // the "p" of play

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.4, 5.58],
  tower: 0.1, lift: [0.55, 1.5], ding: 1.55, party5: 1.62,
  zoom: [2.15, 2.8], room: [2.5, 2.8], open: 2.64,
  bubble: 4.0, bubbleOut: [6.7, 6.85], sweat: 4.6,
  h1: 5.86, h1Out: [8.36, 8.54],
  flare: PLAY_AT, gasp: PLAY_AT + 0.05, dance: PLAY_AT + 0.5, close: 8.55,
  h2: 8.66, h2Land: 9.06, ghost: 9.05,
  out: [10.08, 10.45],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = (i, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const beatsFrom = (t0, t1, step = 1) => { const out = []; for (let n = 0; n < 40; n += step) { const b = BEAT(n); if (b >= t0 && b <= t1) out.push(b) } return out }

// ── the tower (world px at camera zoom 1)
const TW = { x0: 300, x1: 780, ground: 1400, fh: 62, n: 12 }
const floorTop = f => TW.ground - f * TW.fh               // floor f (1…12) spans [floorTop(f), floorTop(f) + fh]
const F5 = { cx: 540, cy: floorTop(5) + TW.fh / 2 }
// ── the room (screen px, after the dive)
const ROOM = { x0: 44, x1: 1036, y0: 590, y1: 1352 }
const FLOOR_Y = 1196
const SPK = { x0: 72, x1: 196, y0: 900, y1: FLOOR_Y + 40 }   // the speaker stack the ghost hides behind
const BALL = { x: 540, y: 735, r: 74 }
const LOW = 160                              // after the box shuts (under the 8.62 cut) the room drops into the freed space
const lowK = t => ease.inOutCubic(prog(t, 8.57, 8.67))

// camera: zoom 1 on the tower → zoom 4 into floor 5's window
function cam(t) {
  const e = ease.inOutCubic(prog(t, ...T.zoom))
  const z = lerp(1, 4.2, e * e)
  return { z, fx: lerp(540, F5.cx, e), fy: lerp(960, F5.cy, e), sx: 540, sy: lerp(960, 975, e) }
}

// ── who's dancing
const CROWD = [
  { ...SAG, x: 262, y: 1040, s: 122, seed: 4 },
  { ...GEM, x: 772, y: 1000, s: 128, seed: 6 },
  { ...LEO, x: 920, y: 1070, s: 116, seed: 9 },
]
const CROWD_HOPS = beatsFrom(2.6, 10.3)
const DANCE_HOPS = beatsFrom(T.dance, 10.3)

function coupleState(t, who) {
  const A = who === 0
  if (t < T.flare) {
    if (A) return { mood: t < T.bubble ? 'neutral' : 'squint', look: [1, 0], blink: undefined }
    return { mood: t < T.sweat ? 'neutral' : 'wide', look: t < T.sweat ? [-1, 0] : [0, 0], blink: t < T.sweat ? undefined : false }
  }
  if (t < T.gasp + 0.35) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.h2Land) return { mood: 'happy', look: [A ? 1 : -1, 0] }
  return { mood: A ? 'heart' : (t > 9.6 && t < 10.0 ? 'wink' : 'heart') }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The *5th* *house* | is the fun floor.', { top: 210, size: 104, accentSize: 140, at: T.h0, gap: 0.08, accentColor: PINK, wobble: true, fit: true })
  const H1 = popText(root, 'Less interview. | More *party.*', { top: 210, size: 104, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1 + 0.4, wobble: true, accentColor: CYAN, fit: true })
  const H2 = popText(root, 'Keep it | *fun.*', { top: 190, size: 132, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const partyK = t => t < T.party5 ? 0 : t < T.flare ? 0.55 : lerp(0.55, 1, ease.outCubic(prog(t, T.flare, T.flare + 0.3)))

  // ── 1 · the tower
  function drawTower(t, C) {
    x.save()
    if (C.z > 1.01) { x.beginPath(); x.rect(0, 480, 1080, 1440); x.clip() }        // never over the headline mid-dive
    x.translate(C.sx, C.sy); x.scale(C.z, C.z); x.translate(-C.fx, -C.fy)
    const W0 = TW.x0, W1 = TW.x1
    // two dim neighbours (generic skyline)
    const nb = [[60, 250, 470], [830, 1030, 380], [-40, 90, 300], [990, 1120, 260]]
    nb.forEach(([a, b, h], i) => {
      const k = pop01(t, T.tower + 0.05 * i, 0.45, 1.5)
      if (k <= 0) return
      x.fillStyle = '#0f0a26'; x.fillRect(a, TW.ground - h * k, b - a, h * k)
      x.fillStyle = rgba(LAV, 0.18); x.fillRect(a, TW.ground - h * k, b - a, 4)
      for (let r = 0; r < Math.floor(h * k / 40) - 1; r++) for (let c = 0; c < Math.floor((b - a) / 40); c++) {
        if (hash(r * 13 + c + i * 101, 3) > 0.42) continue
        x.fillStyle = rgba(hash(r + c * 7, 5) > 0.5 ? '#ffd98a' : '#bfe6ff', 0.35)
        x.fillRect(a + 14 + c * 40, TW.ground - h * k + 22 + r * 40, 14, 18)
      }
    })
    // the floors, popping up bottom to top
    for (let f = 1; f <= TW.n; f++) {
      const k = pop01(t, T.tower + f * 0.045, 0.3, 1.6)
      if (k <= 0) continue
      const y0 = floorTop(f), h = TW.fh
      x.save(); x.translate(540, y0 + h); x.scale(1, k); x.translate(-540, -(y0 + h))
      x.fillStyle = '#16103a'; x.fillRect(W0, y0, W1 - W0, h)
      x.fillStyle = '#2a2156'; x.fillRect(W0, y0 + h - 6, W1 - W0, 6)        // slab
      const party = f === 5 ? partyK(t) : 0
      for (let c = 0; c < 6; c++) {
        const wx = W0 + 22 + c * 76, wy = y0 + 12, ww = 58, wh = 36
        let col = hash(f * 17 + c, 2) > 0.45 ? '#ffd98a' : '#bfe6ff', a = 0.25 + 0.4 * hash(f * 5 + c * 3, 9)
        if (party > 0) { col = PARTY[(c + Math.floor(t * 4.6)) % PARTY.length]; a = 0.55 + 0.45 * party }
        if (f === 7 && c === 2) { col = LAV; a = 0.55 + 0.25 * Math.sin(t * 3) }         // EP 035's glowing 7th-floor door
        x.fillStyle = rgba(col, a); x.fillRect(wx, wy, ww, wh)
        x.fillStyle = rgba('#ffffff', 0.12 * a); x.fillRect(wx, wy, ww, 6)
      }
      x.restore()
      // floor numbers down the left side
      if (k > 0.6) {
        x.font = `700 ${f === 5 ? 34 : 24}px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
        x.fillStyle = f === 5 && t > T.party5 ? PINK : rgba(BONE, 0.5)
        x.fillText(String(f), W0 - 16, y0 + h / 2)
      }
    }
    // the crown: a setback and a stepped pyramid top (generic), plus a blinking aircraft light
    const kc = pop01(t, T.tower + 13 * 0.045, 0.35, 1.6)
    if (kc > 0) {
      const top = floorTop(12)
      x.fillStyle = '#1c1446'
      x.fillRect(W0 + 40, top - 34 * kc, W1 - W0 - 80, 34 * kc)
      x.fillRect(W0 + 100, top - 62 * kc, W1 - W0 - 200, 28 * kc)
      x.fillRect(W0 + 170, top - 84 * kc, W1 - W0 - 340, 22 * kc)
      x.fillStyle = rgba(LAV, 0.5); x.fillRect(W0 + 40, top - 34 * kc, W1 - W0 - 80, 3)
      if (Math.sin(t * 4) > 0.2) { x.fillStyle = '#ff5a5a'; x.fillRect(536, top - 96 * kc, 8, 8) }
    }
    // outline
    x.strokeStyle = rgba(LAV, 0.55); x.lineWidth = 4
    const tk = pop01(t, T.tower + 0.5, 0.4, 1.4)
    if (tk > 0.5) x.strokeRect(W0, floorTop(12), W1 - W0, TW.ground - floorTop(12))
    // the glass elevator up the right side
    const ek = pop01(t, T.lift[0] - 0.2, 0.25, 1.8)
    if (ek > 0) {
      const fl = lerp(1, 5, ease.inOutCubic(prog(t, ...T.lift)))
      const ey = TW.ground - fl * TW.fh + 8
      x.fillStyle = rgba('#bfe6ff', 0.18); x.fillRect(W1 + 6, floorTop(12), 30, TW.ground - floorTop(12))
      x.fillStyle = '#efe6d6'; x.fillRect(W1 + 8, ey, 26 * ek, 44)
      x.fillStyle = GOLD; x.fillRect(W1 + 12, ey + 6, 18 * ek, 14)
      // the floor display above the cab
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = t > T.ding ? PINK : BONE
      x.fillText(String(Math.round(fl)), W1 + 21, ey - 14)
    }
    // the ding: a burst of pixel stars round floor 5
    const db = t - T.ding
    if (db > 0 && db < 0.8) {
      const p = ease.outCubic(db / 0.8)
      x.globalAlpha = 1 - p
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; drawPixelStar(x, F5.cx + Math.cos(a) * (180 + 160 * p), F5.cy + Math.sin(a) * (40 + 80 * p), 22, i % 2 ? 1 : 2, PARTY[i % 5]) }
      x.globalAlpha = 1
    }
    x.restore()
  }

  // ── 2 · the 5th-floor party room
  function drawDiscoBall(t, k, flare) {
    const { x: bx, r } = BALL, by = BALL.y + Math.sin(t * 1.6) * 4
    // the chain
    x.fillStyle = '#8a80b8'; for (let yy = ROOM.y0 + 20; yy < by - r; yy += 12) x.fillRect(bx - 3, yy, 6, 8)
    // beams (lighter), more after the flare
    x.save(); x.beginPath(); x.rect(ROOM.x0, ROOM.y0, ROOM.x1 - ROOM.x0, ROOM.y1 - ROOM.y0); x.clip(); x.globalCompositeOperation = 'lighter'
    const nB = 8
    for (let i = 0; i < nB; i++) {
      const a = i / nB * Math.PI * 2 + t * 0.9, len = 640 + 120 * Math.sin(t * 2 + i)
      const col = PARTY[i % 5], w = 0.08
      const al = (0.05 + 0.1 * flare) * k
      x.fillStyle = rgba(col, al)
      x.beginPath(); x.moveTo(bx, by)
      x.lineTo(bx + Math.cos(a - w) * len, by + Math.abs(Math.sin(a - w)) * len * 0.9 + 40)
      x.lineTo(bx + Math.cos(a + w) * len, by + Math.abs(Math.sin(a + w)) * len * 0.9 + 40)
      x.closePath(); x.fill()
    }
    const gr = x.createRadialGradient(bx, by, 0, bx, by, r * (2.2 + flare))
    gr.addColorStop(0, rgba('#ffffff', 0.25 + 0.35 * flare)); gr.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = gr; x.fillRect(bx - r * 4, by - r * 4, r * 8, r * 8)
    x.restore()
    // the pixel mirror ball: facets in rows, spinning
    const c = 8, R = r / c
    for (let j = -Math.ceil(R); j <= Math.ceil(R); j++) for (let i = -Math.ceil(R); i <= Math.ceil(R); i++) {
      const u = (i + 0.5) / R, v = (j + 0.5) / R, d = u * u + v * v
      if (d > 1) continue
      const lon = Math.asin(clamp(u / Math.sqrt(Math.max(0.05, 1 - v * v)), -1, 1))
      const fi = Math.floor((lon + t * 1.7) * 2.6), fj = Math.floor(Math.asin(clamp(v, -1, 1)) * 2.6)
      const lit = 0.55 - 0.35 * u - 0.3 * v - 0.3 * d
      let col = (fi + fj) % 2 ? '#d9d4f2' : '#a59fd0'
      if (lit < 0.1) col = (fi + fj) % 2 ? '#7d76b0' : '#5e5794'
      if (lit > 0.75) col = '#ffffff'
      if (hash(fi * 7 + fj * 13, Math.floor(t * 6)) > 0.93) col = PARTY[(fi + fj + 50) % 5]
      x.fillStyle = col; x.fillRect(bx + i * c - c / 2, by + j * c - c / 2, c, c)
    }
    x.fillStyle = INK
    for (let a = 0; a < 64; a++) { const th = a / 64 * Math.PI * 2; x.fillRect(Math.round(bx + Math.cos(th) * (r + 4) - 3), Math.round(by + Math.sin(th) * (r + 4) - 3), 6, 6) }
    // glints
    for (let g = 0; g < 3; g++) {
      const ph = (t * 1.3 + g * 0.33) % 1
      if (ph > 0.5) continue
      x.globalAlpha = Math.sin(Math.PI * ph * 2)
      drawPixelStar(x, bx + [-36, 30, 8][g], by + [-30, -6, 34][g], 30, 2, '#ffffff')
      x.globalAlpha = 1
    }
  }

  function drawRoom(t, a) {
    if (a <= 0) return
    const k = partyK(t), flare = t < T.flare ? 0 : Math.exp(-(t - T.flare) * 2.2) + 0.25
    x.save(); x.globalAlpha = a
    // the shell: ceiling + floor slabs of the high-rise, the walls
    x.fillStyle = '#140d36'; x.fillRect(ROOM.x0, ROOM.y0, ROOM.x1 - ROOM.x0, ROOM.y1 - ROOM.y0)
    const wg = x.createLinearGradient(0, ROOM.y0, 0, FLOOR_Y)
    wg.addColorStop(0, '#22185a'); wg.addColorStop(1, '#2d1f68')
    x.fillStyle = wg; x.fillRect(ROOM.x0 + 16, ROOM.y0 + 18, ROOM.x1 - ROOM.x0 - 32, FLOOR_Y - ROOM.y0 - 18)
    // the window wall: Houston at night outside the 5th floor
    x.save(); x.beginPath(); x.rect(ROOM.x0 + 16, ROOM.y0 + 18, ROOM.x1 - ROOM.x0 - 32, FLOOR_Y - ROOM.y0 - 18); x.clip()
    for (let i = 0; i < 9; i++) {
      const bx = 60 + i * 118, bh = 120 + 150 * hash(i, 4)
      x.fillStyle = '#1a1248'; x.fillRect(bx, 860 - bh, 84, bh + 40)
      for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (hash(i * 31 + r * 3 + c, 8) > 0.5 && 860 - bh + 14 + r * 26 < 880) { x.fillStyle = rgba('#ffd98a', 0.3); x.fillRect(bx + 10 + c * 24, 860 - bh + 14 + r * 26, 12, 14) }
    }
    x.fillStyle = '#291d63'; x.fillRect(ROOM.x0, 880, ROOM.x1 - ROOM.x0, FLOOR_Y - 880)          // the party wall below the sill
    x.fillStyle = rgba(LAV, 0.35); x.fillRect(ROOM.x0, 876, ROOM.x1 - ROOM.x0, 6)
    for (let m = 1; m < 6; m++) { x.fillStyle = '#140d36'; x.fillRect(ROOM.x0 + m * 165, ROOM.y0 + 18, 8, 880 - ROOM.y0 - 18) }   // mullions
    // disco light spots sweeping the walls
    x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 26; i++) {
      const an = i * 2.39996 + t * (0.7 + 0.2 * hash(i, 2))
      const sx = 540 + Math.cos(an) * (300 + 180 * hash(i, 3)), sy = 930 + Math.sin(an * 1.3) * (190 + 60 * hash(i, 6))
      const sz = 12 + 10 * hash(i, 7)
      x.fillStyle = rgba(PARTY[i % 5], (0.3 + 0.5 * flare) * k)
      x.fillRect(Math.round(sx), Math.round(sy), sz, sz)
    }
    x.globalCompositeOperation = 'source-over'
    x.restore()
    // the dance floor: two rows of tiles lighting in a chase on the beat
    const beat = Math.floor((t - 0.6) / 0.5556)
    for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) {
      const tx = ROOM.x0 + 16 + c * 120, ty = FLOOR_Y + r * 70, on = (c + r * 2 + beat) % 4 === 0 || (t > T.flare && (c + r + beat) % 3 === 0)
      x.fillStyle = on ? rgba(PARTY[(c + r + beat) % 5], 0.45 + 0.4 * k) : '#1d1546'
      x.fillRect(tx + 3, ty + 3, 114, 64)
      x.fillStyle = rgba('#ffffff', on ? 0.25 : 0.05); x.fillRect(tx + 3, ty + 3, 114, 6)
    }
    // the slabs and a "5" plaque
    x.fillStyle = '#3a2f73'; x.fillRect(ROOM.x0, ROOM.y0, ROOM.x1 - ROOM.x0, 18); x.fillRect(ROOM.x0, ROOM.y1 - 12, ROOM.x1 - ROOM.x0, 12)
    x.fillStyle = INK; x.fillRect(ROOM.x1 - 120, ROOM.y0 + 34, 80, 64)
    x.fillStyle = PINK; x.fillRect(ROOM.x1 - 116, ROOM.y0 + 38, 72, 56)
    x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('5', ROOM.x1 - 80, ROOM.y0 + 68)
    drawDiscoBall(t, Math.max(0.4, k), flare)
    x.restore()
  }

  function drawSpeaker(t, a) {
    const pulse = Math.max(0, 1 - ((t - 0.6) % 0.5556) / 0.25) * partyK(t)
    x.save(); x.globalAlpha = a
    const { x0, x1, y0, y1 } = SPK
    x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12)
    for (const [cy0, cy1] of [[y0, (y0 + y1) / 2 - 4], [(y0 + y1) / 2 + 4, y1]]) {
      x.fillStyle = '#2e2560'; x.fillRect(x0, cy0, x1 - x0, cy1 - cy0)
      const cx = (x0 + x1) / 2, cy = (cy0 + cy1) / 2, R = (x1 - x0) * 0.34 * (1 + 0.08 * pulse)
      for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) {
        const d = Math.hypot(i, j) / 6
        if (d > 1) continue
        x.fillStyle = d > 0.8 ? '#7a6fc0' : d < 0.3 ? '#a59fd0' : '#120a2e'
        x.fillRect(cx + i * R / 6 - R / 12, cy + j * R / 6 - R / 12, R / 6 + 0.5, R / 6 + 0.5)
      }
    }
    x.restore()
  }

  function drawBubble(t) {
    const a = pop01(t, T.bubble, 0.28, 2.4) * outK(t, T.bubbleOut)
    if (a <= 0.01) return
    const cx = 400, cy = 852, w = 420, h = 128
    x.save(); x.translate(cx, cy); x.scale(a, a)
    const P = 6
    x.fillStyle = INK; x.fillRect(-w / 2 - P, -h / 2, w + 2 * P, h); x.fillRect(-w / 2, -h / 2 - P, w, h + 2 * P)
    x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
    // tail down to the left date star
    x.fillStyle = INK; x.fillRect(-120, h / 2, 30, 18); x.fillRect(-126, h / 2 + 12, 24, 18)
    x.fillStyle = BONE; x.fillRect(-116, h / 2 - 4, 22, 16); x.fillRect(-120, h / 2 + 8, 14, 14)
    x.font = `700 31px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('so. where do you see', 0, -22); x.fillText('yourself in 5 years?', 0, 22)
    x.restore()
  }

  function drawSweat(t, sx, sy) {
    if (t < T.sweat || t > T.flare) return
    const ph = ((t - T.sweat) * 1.4) % 1
    x.globalAlpha = 1 - ph
    x.fillStyle = CYAN; x.fillRect(sx, sy + ph * 40, 10, 14); x.fillRect(sx + 2, sy - 6 + ph * 40, 6, 6)
    x.globalAlpha = 1
  }

  function drawConfetti(t) {
    if (t < T.h2) return
    const o = popOut(t, T.out)
    for (let i = 0; i < 46; i++) {
      const born = T.h2 + hash(i, 1) * 0.8, life = 1.6
      const p = (t - born) / life
      if (p < 0 || p > 1) continue
      const cx = ROOM.x0 + 40 + hash(i, 2) * (ROOM.x1 - ROOM.x0 - 80) + Math.sin(p * 9 + i) * 20
      const cy = ROOM.y0 + 30 + p * 620
      x.globalAlpha = (1 - p * p) * clamp(o)
      x.fillStyle = PARTY[i % 5]; x.fillRect(Math.round(cx), Math.round(cy), 10, (i % 3) ? 10 : 16)
    }
    x.globalAlpha = 1
  }

  function drawCrowdAndCouple(t, a) {
    const o = popOut(t, T.out) * a
    if (o <= 0) return
    const k = partyK(t)
    for (const s of CROWD) {
      const pk = pop01(t, T.room[0] + s.seed * 0.03, 0.35, 2) * o
      drawStarChar(x, s.x + Math.sin(t * 3.4 + s.seed) * 10 * k, s.y, s.s, t, { color: s.color, glyph: s.glyph, mood: t > T.flare && t < T.flare + 0.5 ? 'wide' : (s.seed === 6 && t > 6 && t < 7.5 ? 'wink' : 'happy'), hops: CROWD_HOPS, seed: s.seed, pop: pk, glow: 0.8 })
    }
    // the date: far apart and stiff, then together on the dance floor
    const d = ease.inOutCubic(prog(t, T.dance - 0.2, T.dance + 0.45))
    const sway = t > T.dance ? Math.sin((t - 0.6) * Math.PI / 0.5556) * 18 * d : 0
    const AX = lerp(300, 438, d) + sway, BX = lerp(800, 662, d) - sway, Y = 1150
    const pk = pop01(t, T.room[0] + 0.15, 0.35, 2) * o
    const sa = coupleState(t, 0), sb = coupleState(t, 1)
    const stiff = t < T.flare ? -0.05 : 0
    const ra = drawStarChar(x, AX, Y, 236, t, { color: THEM_A, ...sa, hops: t > T.flare ? [T.gasp, ...DANCE_HOPS] : [], squash: stiff, bob: t < T.flare ? 2 : undefined, seed: 2, pop: pk, glow: 1 })
    const rb = drawStarChar(x, BX, Y, 236, t, { color: THEM_B, ...sb, hops: t > T.flare ? [T.gasp + 0.06, ...DANCE_HOPS.map(h => h + 0.04)] : [], squash: stiff, bob: t < T.flare ? 2 : undefined, seed: 5, pop: pk, glow: 1 })
    if (pk > 0.5) drawSweat(t, BX + 70, ra.y - 100)
    // hearts between them in "Keep it fun"
    if (t > T.h2Land) for (let i = 0; i < 6; i++) {
      const born = T.h2Land + i * 0.2, p = (t - born) / 1.1
      if (p < 0 || p > 1) continue
      x.globalAlpha = Math.sin(Math.PI * p) * clamp(o)
      const hx = 550 + (hash(i, 4) - 0.5) * 220, hy = 1040 - p * 220, c = 7
      x.fillStyle = '#ff4f86'
      for (const [i2, j2] of [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]]) x.fillRect(Math.round(hx + (i2 - 2) * c), Math.round(hy + j2 * c), c, c)
      x.globalAlpha = 1
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const roomA = ease.inOutQuad(prog(t, ...T.room))
      const sk = { ...SKY_H, zoom: SKY_H.zoom * lerp(1, 1.25, ease.inOutCubic(prog(t, ...T.zoom))) }
      drawSky(x, t, sk)
      drawSeedConstellation(x, t, EP)
      if (t < T.room[1] + 0.02) drawTower(t, C)
      if (t > T.room[0] && t < T.out[1] + 0.02) {
        const o = clamp(popOut(t, T.out))
        x.save(); x.translate(0, LOW * lowK(t))
        drawRoom(t, roomA * clamp(o * 1.5))
        drawSpeaker(t, roomA * clamp(o * 1.5))
        drawGhostCameo(x, t, { x: SPK.x1 + 6, y: 1040, at: T.ghost, dur: 1.4, from: 'left', cell: 4 })
        drawBubble(t)
        drawCrowdAndCouple(t, roomA)
        drawConfetti(t)
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.5 (H0 out → "Less interview. More party.") and 8.62 (box shut → "Keep it fun."); a 15 s film
// keeps one (8.62). End card flips at 10.6.
const CUTS = [5.5, { t: 8.62, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the tower pops up, the elevator rides to 5, DING, party lights
  ...wordPops(T.h0, 6, 0.08, 0, 0.024),
  ...Array.from({ length: 12 }, (_, f) => ['tick', +(T.tower + (f + 1) * 0.045 + 0.1).toFixed(3), 0.012 + f * 0.001]),
  ['whoosh', T.lift[0], 0.9, 0.025],
  ['bell', T.ding, 1318.51, 0.05, 1.4, 0.3], ['bell', T.ding + 0.12, 1046.5, 0.04, 1.4, 0.3],
  ['glitter', T.party5, T.party5 + 0.5], ['pop', T.party5, 783.99, 0.035, 0],
  ['whoosh', T.zoom[0], 0.6, 0.04], ['boom', T.zoom[1] - 0.04, 0.12],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.bubble, 987.77, 0.03, -0.3], ['pop', T.bubble + 0.07, 1174.66, 0.024, -0.3],
  ['tick', T.sweat, 0.03], ['pluck', T.sweat + 0.05, 392, 0.03, 0.4, 0.3],
  // less interview, more party: "play" flares the ball
  ...wordPops(T.h1, 3, 0.07, 2, 0.024), ['pop', T.h1 + 0.4, 1174.66, 0.045, 0],
  ['boom', T.flare, 0.18], ['glitter', T.flare, T.flare + 0.6], ['pluck', T.gasp, 1046.5, 0.04, 0.5, 0], ['pluck', T.gasp + 0.1, 1567.98, 0.035, 0.5, 0],
  ['pop', T.dance, 783.99, 0.03, -0.2], ['pop', T.dance + 0.05, 987.77, 0.03, 0.2],
  ['pop', T.bubbleOut[0], 1318.51, 0.025, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // keep it fun
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.05, 0.7, 0],
  ['glitter', T.h2, T.h2 + 0.8], ['bell', T.h2Land + 0.3, 1567.98, 0.025, 1.0, 0],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, -0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
