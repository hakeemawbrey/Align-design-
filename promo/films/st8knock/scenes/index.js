// st8knock (30 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E02: horror trailer) · story 0–25.6, then the end card.
//   Hook (frame 0): "Libra’s ex is | at the *door.*"  Libra pressed against her door in a flickering red hallway, the
//   light from E01's cliffhanger glowing under the door. Letterbox bars, a trailer rating bug.
//   2.6   card: "THIS FALL…"                                  (horror sting)
//   4.1   the peephole (fisheye): the Comet, beaming. COMET: "knock knock. it’s me. i’m back ☺"
//   7.6   card: "HE CAME BACK"
//   8.7   the real sky: a comet's long loop round the Sun, its tail always pointing away from the Sun. Fact chip:
//         "Halley’s Comet: back about every 76 years". LIBRA: "he always comes back. like, on a *schedule.*"
//   12.6  card: "AGAIN"
//   13.5  the hallway: Libra wobbles (her scale tips "open?" / "nope"); Aries pops in and holds the door chain.
//         ARIES: "chain stays on. you don’t owe him the *door.*"  LIBRA (to the peephole): "hi. i’m good. the door stays
//         *closed.*"
//   20.2  the peephole: the Comet nods. COMET: "fair. take care, Libra ☺" and drifts off, waving (a kind exit).
//   22.9  frame 0's framing again, changed: the door chained, the light gone, Libra turned to us, calm. "Back isn’t *better.*"
//   Hidden comet (a far one, tiny): crosses the top of the real-sky shot at 9.2. Ghost: leans out past the door frame's
//   right edge at 18.0. Rewatch bait: the sticky note on the door ("DON'T OPEN. — past you").
// One canvas, DOM type (hook, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawBits } from '../../st5cast.js'
import { COMET, drawComet, drawDayChip, hookCard, hookCues, genreBug, stingerCues, EX_RED } from '../../st8cast.js'

export const DURATION = 30
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

const T = {
  hookOut: [2.45, 2.7],
  card1: [2.6, 4.1], peep1: [4.1, 7.6], l1: 4.5,
  card2: [7.6, 8.7], space: [8.7, 12.6], l2: 9.0, chip: 9.6, tiny: 9.2,
  card3: [12.6, 13.5], hall: [13.5, 20.2], aries: 13.7, l3: 13.9, wobble: [13.6, 16.8], l4: 17.2, ghost: 18.0,
  peep2: [20.2, 23.0], l5: 20.3, leave: 21.6, close: 22.95,
  last: 23.05, lastOut: [25.25, 25.55],
}
const LIB = signStar('libra'), ARI = signStar('aries')
const CN = COMET.tag, LIBN = '♎ LIBRA', ARIN = '♈ ARIES'
const LINES = [
  { t: T.l1, speaker: CN, text: 'knock knock. it’s me. i’m back ☺', color: COMET.tagColor },
  { t: T.l2, speaker: LIBN, text: 'he always comes back. like, on a *schedule.*', color: LIB.color },
  { t: T.l3, speaker: ARIN, text: 'chain stays on. you don’t owe him the *door.*', color: ARI.color },
  { t: T.l4, speaker: LIBN, text: 'hi. i’m good. the door stays *closed.*', color: LIB.color },
  { t: T.l5, speaker: CN, text: 'fair. take care, Libra ☺', color: COMET.tagColor },
]
const CPS = 28
const inW = (t, [a, b]) => t >= a && t < b
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const DOOR = { x0: 600, x1: 900, y0: 520, y1: 1330 }
const PEEP = { x: 540, y: 880, r: 400 }
export const GHOST = { at: T.ghost, x: DOOR.x1 + 18, y: 760, where: 'leaning out past the door frame’s right edge, mid-height' }

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "800 120px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Libra’s ex is | at the *door.*', at: 0, out: T.hookOut, size: 112, accentSize: 176, top: 178, accentColor: '#ff5a6e' })
  const last = hookCard(root, { text: 'Back isn’t | *better.*', at: T.last, out: T.lastOut, size: 118, accentSize: 184, top: 178, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 260, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H * 1.4), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function monoText(s, X, Y, { size = 30, color = BONE, align = 'left', alpha = 1 } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + size * 0.09); x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  const flick = t => { const r = rng(Math.floor(t * 9) + 3)(); return r < 0.12 ? 0.35 : r < 0.2 ? 0.7 : 1 }
  function hallway(t, { light = 1, chain = 0, calm = false } = {}) {
    const f = calm ? 1 : flick(t)
    const g = x.createLinearGradient(0, 400, 0, 1440); g.addColorStop(0, calm ? '#1f1440' : '#2a0c1c'); g.addColorStop(1, '#0a0612')
    x.fillStyle = g; x.fillRect(0, 400, 1080, 1040)
    px(0, 1330, 1080, 110, '#24162e'); px(0, 1330, 1080, 6, '#4a2a4a')
    // the ceiling bulb, flickering
    px(536, 400, 8, 70, INK); px(518, 466, 44, 34, INK); px(522, 470, 36, 26, f > 0.9 ? '#fff1c8' : '#7a5a3a')
    x.save(); x.globalCompositeOperation = 'lighter'; const lg = x.createRadialGradient(540, 490, 0, 540, 490, 620); lg.addColorStop(0, `rgba(255,190,140,${0.28 * f})`); lg.addColorStop(1, 'rgba(255,190,140,0)'); x.fillStyle = lg; x.fillRect(0, 400, 1080, 1040); x.restore()
    const { x0, x1, y0, y1 } = DOOR
    px(x0 - 18, y0 - 18, x1 - x0 + 36, y1 - y0 + 18, INK); px(x0 - 12, y0 - 12, x1 - x0 + 24, y1 - y0 + 12, '#4a3a2a')
    px(x0, y0, x1 - x0, y1 - y0, '#6a3e2a'); px(x0 + 20, y0 + 30, x1 - x0 - 40, 300, '#5a321f'); px(x0 + 20, y0 + 380, x1 - x0 - 40, 390, '#5a321f')
    px((x0 + x1) / 2 - 10, y0 + 210, 20, 20, INK); px((x0 + x1) / 2 - 6, y0 + 214, 12, 12, light > 0.5 ? '#bff0ff' : '#5a7a8a')
    px(x0 + 30, y0 + 420, 26, 26, INK); px(x0 + 34, y0 + 424, 18, 18, GOLD)
    // rewatch bait: the sticky note
    x.save(); x.translate(x1 - 92, y0 + 470); x.rotate(0.06); px(-44, -40, 88, 80, '#ffe46a'); px(-44, -40, 88, 8, '#f2c75c')
    x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('DON’T', 0, -12); x.fillText('OPEN.', 0, 6); x.fillText('— past you', 0, 26); x.restore()
    // the light under the door
    if (light > 0) {
      const R = rng(Math.floor(t * 12))
      x.save(); x.globalCompositeOperation = 'lighter'
      const lg2 = x.createLinearGradient(0, y1 - 6, 0, y1 + 100); lg2.addColorStop(0, `rgba(190,245,255,${0.85 * light})`); lg2.addColorStop(1, 'rgba(127,224,255,0)')
      x.fillStyle = lg2; x.beginPath(); x.moveTo(x0, y1 - 4); x.lineTo(x1, y1 - 4); x.lineTo(x1 - 240, y1 + 100); x.lineTo(x0 - 420, y1 + 100); x.closePath(); x.fill()
      for (let i = 0; i < 26; i++) px(lerp(x0 - 300, x1, R()), y1 + 4 + R() * 80, 6, 6, i % 3 ? '#bff0ff' : '#fff1c8')
      x.restore()
      px(x0, y1 - 6, x1 - x0, 6, `rgba(230,250,255,${light})`)
    }
    // the chain
    if (chain > 0) {
      const ax = x0 + 6, ay = y0 + 330, bx = lerp(x0 - 60, x0 - 150, chain), by = ay + 40
      x.save(); x.globalAlpha = clamp(chain * 3)
      for (let i = 0; i <= 9; i++) { const q = i / 9, cx = lerp(ax, bx, q), cy = lerp(ay, by, q) + Math.sin(q * Math.PI) * 40 * (1 - chain * 0.6); px(cx - 9, cy - 6, 18, 12, INK); px(cx - 6, cy - 3, 12, 6, i % 2 ? '#c8c8d8' : '#9a96b0') }
      px(x0 - 8, ay - 16, 20, 32, INK); px(x0 - 4, ay - 12, 12, 24, '#9a96b0')
      x.restore()
    }
    return f
  }
  function letterbox() { px(0, 0, 1080, 64, '#000'); px(0, 1856, 1080, 64, '#000') }
  function vignette(a = 0.75, col = '60,0,12') {
    const g = x.createRadialGradient(540, 960, 380, 540, 960, 1150); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${a})`); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  }
  function trailerCard(t, [a, b], lines, { color = BONE, accent = false } = {}) {
    const p = prog(t, a, b)
    px(0, 0, 1080, 1920, '#030206')
    const sc = 1 + 0.07 * p, o = clamp(p * 6) * (1 - ease.inQuad(prog(p, 0.85, 1)))
    x.save(); x.translate(540, 900); x.scale(sc, sc); x.globalAlpha = o
    x.textAlign = 'center'; x.textBaseline = 'middle'
    lines.forEach((s, i) => {
      const it = accent && i === lines.length - 1
      x.font = it ? `italic 500 190px 'EB Garamond', Georgia, serif` : `800 ${lines.length > 1 ? 110 : 128}px ${INTER}`
      x.shadowColor = it ? 'rgba(255,60,90,0.7)' : 'rgba(255,255,255,0.25)'; x.shadowBlur = 30
      x.fillStyle = it ? '#ff5a6e' : color; x.fillText(s, 0, (i - (lines.length - 1) / 2) * 150)
    })
    x.restore()
    // scratches
    const R = rng(Math.floor(t * 14) + 7)
    for (let i = 0; i < 5; i++) { x.globalAlpha = 0.25 * R(); px(R() * 1080, 0, 2, 1920, '#ffffff') }
    x.globalAlpha = 1
  }
  function peephole(t, [a, b], mood, leave = 1e9) {
    const p = prog(t, a, a + 0.4)
    px(0, 0, 1080, 1920, '#020104')
    x.save(); x.beginPath(); x.arc(PEEP.x, PEEP.y, PEEP.r * lerp(0.2, 1, ease.outCubic(p)), 0, Math.PI * 2); x.clip()
    // the outside corridor, bulged
    const g = x.createRadialGradient(PEEP.x, PEEP.y, 0, PEEP.x, PEEP.y, PEEP.r); g.addColorStop(0, '#2c2a52'); g.addColorStop(1, '#0a0818'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    for (let i = -6; i <= 6; i++) { const xx = PEEP.x + Math.sign(i) * Math.pow(Math.abs(i) / 6, 1.6) * PEEP.r; px(xx - 2, PEEP.y - PEEP.r, 4, PEEP.r * 2, 'rgba(160,150,220,0.12)') }
    const lp = ease.inCubic(prog(t, leave, leave + 1.2))
    const cx = PEEP.x + lp * 520, cy = PEEP.y + 40 - lp * 160
    drawComet(x, cx, cy, 330 * (1 - lp * 0.3), t, { mood, look: [0, 0], sunDir: [-1, 0.6], tail: 600, hops: [a + 0.45, T.l1 + 0.3, T.l5 + 0.2], seed: 3 })
    x.restore()
    // the lens rim
    x.save(); x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(PEEP.x, PEEP.y, PEEP.r * lerp(0.2, 1, ease.outCubic(p)) + 16, 0, Math.PI * 2); x.stroke()
    x.lineWidth = 6; x.strokeStyle = '#4a4566'; x.stroke(); x.restore()
    const vg = x.createRadialGradient(PEEP.x, PEEP.y, PEEP.r * 0.55, PEEP.x, PEEP.y, PEEP.r); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.6)'); x.fillStyle = vg; x.beginPath(); x.arc(PEEP.x, PEEP.y, PEEP.r, 0, Math.PI * 2); x.fill()
  }
  function space(t) {
    const [a, b] = T.space
    drawSky(x, t, { ...SKY_H, zoom: 1.7, dim: 0.6 })
    const SUN = { x: 250, y: 900 }
    x.save(); x.globalCompositeOperation = 'lighter'; const sg = x.createRadialGradient(SUN.x, SUN.y, 0, SUN.x, SUN.y, 220); sg.addColorStop(0, 'rgba(255,220,120,0.9)'); sg.addColorStop(1, 'rgba(255,170,60,0)'); x.fillStyle = sg; x.fillRect(SUN.x - 220, SUN.y - 220, 440, 440); x.restore()
    drawBits(x, ['..YYY..', '.YYYYY.', 'YYYWYYY', 'YYWWWYY', 'YYYWYYY', '.YYYYY.', '..YYY..'], { Y: '#ffd34a', W: '#fffbe0' }, SUN.x, SUN.y, 14)
    monoText('SUN', SUN.x, SUN.y + 86, { size: 24, color: '#ffe39a', align: 'center' })
    // the long thin orbit (dashed), Sun near one end
    const ox = 560, oy = 900, rx = 380, ry = 150
    for (let i = 0; i < 90; i++) { if (i % 2) continue; const th = i / 90 * Math.PI * 2; px(ox + Math.cos(th) * rx - 3, oy + Math.sin(th) * ry - 3, 6, 6, 'rgba(159,232,255,0.35)') }
    // the comet sweeps round the near-Sun end, tail always away from the Sun
    const u = prog(t, a + 0.1, b - 0.1), th = lerp(0.2, 4.3, u)
    const cx = ox + Math.cos(th) * rx, cy = oy + Math.sin(th) * ry
    drawComet(x, cx, cy, 120, t, { mood: 'happy', sunDir: [SUN.x - cx, SUN.y - cy], tail: 300, seed: 3, aura: true })
    // the far, tiny hidden one
    const hp = prog(t, T.tiny, T.tiny + 2.4)
    if (hp > 0 && hp < 1) drawComet(x, lerp(1100, 700, hp), lerp(470, 520, hp), 26, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [-1, 0.3], bob: 0 })
    // the fact chip
    const fk = pop01(t, T.chip, 0.35, 2.2)
    if (fk > 0.01) {
      x.save(); x.translate(540, 1250); x.scale(fk, fk); x.rotate(-0.03)
      px(-420, -66, 840, 132, INK); px(-412, -58, 824, 116, '#10233a'); px(-412, -58, 824, 6, CYAN)
      monoText('REAL: COMETS RETURN ON A SCHEDULE', 0, -18, { size: 28, color: CYAN, align: 'center' })
      monoText('Halley’s: back about every 76 years', 0, 28, { size: 28, color: BONE, align: 'center' })
      x.restore()
    }
    monoText('A COMET’S ORBIT · NOT TO SCALE', 540, 560, { size: 24, color: '#cfc8ff', align: 'center', alpha: 0.8 })
  }
  function scaleProp(t, r) {
    // Libra's scale above her: tips "open?" vs "nope", settles level-ish to "nope"
    const w = prog(t, ...T.wobble), tilt = Math.sin(t * 7) * 0.32 * (1 - w) + 0.18 * ease.inOutCubic(w)
    const cx = r.x, cy = r.top - 120
    x.save(); x.translate(cx, cy)
    px(-4, 0, 8, 80, INK); px(-2, 0, 4, 78, GOLD)
    x.rotate(tilt); px(-150, -8, 300, 14, INK); px(-146, -5, 292, 8, GOLD)
    for (const s of [-1, 1]) {
      x.save(); x.translate(s * 140, 0); x.rotate(-tilt)
      px(-2, 0, 4, 46, GOLD); px(-60, 46, 120, 14, INK); px(-56, 48, 112, 8, GOLD)
      monoText(s < 0 ? 'open?' : 'nope', 0, 88, { size: 28, color: s < 0 ? '#9fe8ff' : PINK, align: 'center' })
      x.restore()
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      let showBox = true
      if (t < T.card1[0] || inW(t, T.hall) || t >= T.peep2[1]) {
        const calm = t >= T.peep2[1]
        drawSky(x, t, SKY_H); drawSeedConstellation(x, t, 100, { alpha: 0.5 })
        const chain = calm ? 1 : inW(t, T.hall) ? ease.outCubic(prog(t, T.aries + 0.4, T.aries + 1.2)) : 0
        const light = calm ? 0 : 1
        hallway(t, { light, chain, calm })
        if (inW(t, T.hall)) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
        // Libra
        let st, lx = 470, ly = 1080, sz = 300, rot = 0
        if (t < T.card1[0]) { st = { mood: 'wide', look: [1, 0], blink: false }; lx = 500; rot = 0.1; }
        else if (calm) { st = t < T.last + 0.6 ? { mood: 'neutral', look: [0, 0] } : { mood: 'happy' } }
        else { const w = prog(t, ...T.wobble); rot = Math.sin(t * 7) * 0.18 * (1 - w); st = t < T.l4 ? { mood: w < 1 ? 'wide' : 'neutral', look: [1, 0] } : { mood: 'squint', look: [1, -1] } }
        x.save(); x.translate(lx, ly + 120); x.rotate(rot); x.translate(-lx, -ly - 120)
        const r = drawStarChar(x, lx, ly, sz, t, { color: LIB.color, glyph: LIB.glyph, ...st, squash: t < T.card1[0] ? -0.05 : 0, hops: [...talkHops(LINES, LIBN, { cps: CPS }), T.peep2[1] + 0.05, T.last + 0.4], seed: 7 })
        x.restore()
        if (inW(t, T.hall) && t < T.l4) scaleProp(t, r)
        // Aries with the chain
        if (inW(t, T.hall) || calm) {
          const p = calm ? 1 : pop01(t, T.aries, 0.4, 2.2)
          drawStarChar(x, 180, 1190, 220, t, { color: ARI.color, glyph: ARI.glyph, mood: calm ? 'happy' : t < T.l4 ? 'squint' : 'happy', look: [1, 0], pop: p, hops: [T.aries + 0.2, ...talkHops(LINES, ARIN, { cps: CPS })], seed: 12 })
        }
        if (!calm) vignette(t < T.card1[0] ? 0.8 : 0.6)
        else vignette(0.45, '6,4,18')
      } else if (inW(t, T.card1)) { trailerCard(t, T.card1, ['THIS FALL…']); showBox = false }
      else if (inW(t, T.peep1)) peephole(t, T.peep1, t < T.l1 ? 'wide' : 'happy')
      else if (inW(t, T.card2)) { trailerCard(t, T.card2, ['HE CAME', 'BACK']); showBox = false }
      else if (inW(t, T.space)) space(t)
      else if (inW(t, T.card3)) { trailerCard(t, T.card3, ['AGAIN.'], { accent: true }); showBox = false }
      else if (inW(t, T.peep2)) peephole(t, T.peep2, t < T.leave ? 'neutral' : 'happy', T.leave)
      // trailer chrome
      letterbox()
      genreBug(x, t, { text: 'RATED Rx', x: 70, y: 110, color: '#2f7a3a', size: 24, blink: false })
      drawDayChip(x, t, { day: 2, phase: 'retro', y: 110 })
      hook.update(t); last.update(t)
      box.update(t)
      if (!showBox) box.root.style.display = 'none'
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E02', fadeIn: 0 })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...[0.4, 0.95, 1.6].map(k => ['tom', k, 110, { gain: 0.36, decay: 0.22 }]),
  ...stingerCues(T.card1[0], { key: KEY, kind: 'horror' }),
  ['whoosh', T.peep1[0], 0.4, 0.05], ['pop', T.peep1[0] + 0.3, 880, 0.03, 0],
  ...stingerCues(T.card2[0], { key: KEY, kind: 'trailer' }),
  ['pop', T.chip, 1174.66, 0.045, 0], ['bell', T.chip + 0.05, 1760, 0.025, 1.2, 0], ['tick', T.tiny + 0.4, 0.012],
  ...stingerCues(T.card3[0], { key: KEY, kind: 'horror' }),
  ['pop', T.aries, 659.25, 0.04, -0.4], ['tick', T.aries + 0.5, 0.06], ['tick', T.aries + 0.62, 0.05],
  ['whoosh', T.peep2[0], 0.4, 0.05], ['whoosh', T.leave + 0.4, 0.6, 0.04], ['glitter', T.leave, T.leave + 1],
  ...talkCues(LINES, { cps: CPS, pitch: { [CN]: 880, [LIBN]: 784, [ARIN]: 587.33 } }),
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', r3(T.last + 0.5), 1318.51, 0.03, 1.6, 0],
  ...endcardCues(STORY_END),
]
