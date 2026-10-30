// srcitychicago · "Chicago winter" (Star Talk Remix of citychicago, 20 s vertical, music: chiptune, D) · story 0–15.6, then
// the shared end card (cta JOIN THE WAITLIST, as the original).
//   0.00–5.75  "Chicago winter: | cuffing season | is *survival.*"  Snow over a generic skyline, an elevated train. The ♈ Aries
//              star (a FIRE sign, frosted blue, icicles, shivering; chip "FIRE SIGN · STATUS: FROZEN") eyes a lawn chair
//              saving a shovelled parking spot (a scarf on it and a cardboard DIBS sign). ARIES: "so cold I'd date a
//              *chair.*" Drop (2.82): a gust shoves it sideways; it scoots over and snuggles the chair, heart-eyed.
//              THE STARS pop in over the skyline: "babe. that is a *chair.*"
//   5.88       THE HAWK (the wind) takes the chair: it tumbles off-frame. Aries, wide-eyed.
//   5.95–10.7  "Find someone whose | chart *lines up.*"  The ♌ Leo star (Sun-ruled, glowing warm) strolls in. A chart spins
//              in over each star; a gold trine line links them (FIRE + FIRE · TRINE, 7.82): a warm flash, the snow turns to
//              pixel sparkles, Aries thaws (the icicles drop). THE STARS: "don't settle 'cause it's *cold.*"
//  10.75       card cut (flip)
//  10.85–15.4  "Get cuffed by | someone *who fits.*"  The two scoot close under one long scarf, hearts; the DIBS sign
//              tumbles back down and lands flipped: TAKEN. Everything pops out by 15.42.
// One canvas (sky + skyline + el + snow + cast + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, FIRE, ICE, SNOW, NIGHT, rgba, drawSnow, drawGust, gustEnv, drawSkyline, drawEl, drawGround, heart, starFrame, cellToWorld } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const INK = '#1b1236', MONO = "'Space Mono', ui-monospace, monospace", GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const TAU = Math.PI * 2
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const ARI = signStar('aries'), LEO = signStar('leo')
const A_TAG = `${ARI.glyph}︎ ARIES`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: B(2), h0Out: [5.6, 5.76],
  l0: 1.3, open: 1.08, drop: B(4), toChair: [3.25, 3.75], starsIn: 3.95, l1: 4.25,
  hawk: B(9.5), chairOff: [B(9.5), B(9.5) + 0.9],
  h1: 5.95, h1Land: 6.3, h1Out: [10.5, 10.66], leoIn: [6.2, 7.0], charts: [6.9, 7.6], link: B(13), l2: 7.85, close: 10.45,
  cut: 10.75,
  h2: 10.85, h2Land: 11.2, snug: [10.9, 11.5], taken: B(21.5), out: [15.0, 15.42],
}
const GUSTS = [[0.1, 260], [T.drop - 0.2, 620], [T.hawk - 0.1, 760]]
const LINES = [
  { t: T.l0, speaker: A_TAG, color: '#ff9a7a', text: "so cold I'd date a *chair.*" },
  { t: T.l1, speaker: S_TAG, color: PINK, text: 'babe. that is a *chair.*' },
  { t: T.l2, speaker: S_TAG, text: "don't settle 'cause it's *cold.*" },
]
const CUTS = [5.75, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE WAITLIST' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const mix = (a, b, k) => { const A = hexToRgb(a), Bc = hexToRgb(b); return '#' + A.map((v, i) => Math.round(lerp(v, Bc[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
const GROUND = 1462, STAR_Y = 1330, A_S = 250, L_S = 240
const coldK = t => 1 - ease.inOutQuad(prog(t, T.link, T.link + 0.8))
const ariesX = t => (t < T.toChair[0] ? 290 : t < T.snug[0] ? lerp(290, 470, ease.inOutCubic(prog(t, ...T.toChair))) : lerp(470, 420, ease.inOutCubic(prog(t, ...T.snug))))
const leoX = t => (t < T.snug[0] ? lerp(1300, 780, ease.outCubic(prog(t, ...T.leoIn))) : lerp(780, 660, ease.inOutCubic(prog(t, ...T.snug))))
const CHAIR = { x: 680, y: GROUND }
const SKY_P = { x: 860, y: 760, s: 170 }
const warmAt = (px, py) => T.link + Math.hypot(px - 610, py - 1040) / 2600

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 60px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Chicago winter: | cuffing season | is *survival.*', { top: 140, size: 96, accentSize: 146, at: T.h0, lateAt: T.h0Land, accentColor: '#9fd8ff' }), T.h0Out],
    [H('Find someone | whose chart | *lines up.*', { top: 140, size: 96, accentSize: 140, late: 2, at: T.h1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [H('Get cuffed by | someone | *who fits.*', { top: 140, size: 100, accentSize: 150, late: 2, at: T.h2, lateAt: T.h2Land, accentColor: PINK }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const A_HOPS = [...talkHops(LINES, A_TAG, { cps: CPS }), T.toChair[1], T.link + 0.1, T.link + 0.7, T.snug[1], T.taken + 0.1]
  const L_HOPS = [T.leoIn[1], T.link + 0.15, T.snug[1] + 0.05, T.taken + 0.15]
  const S_HOPS = [...talkHops(LINES, S_TAG, { cps: CPS }), T.taken + 0.2]

  function chip(px, py, text, k, { size = 28, col = BONE, bar = GOLD } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(text).width + 32, th = size + 22
    x.fillStyle = INK; x.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
    x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-tw / 2, -th / 2, tw, th); x.fillStyle = bar; x.fillRect(-tw / 2, th / 2 - 5, tw, 5)
    x.fillStyle = col; x.fillText(text, 0, 2)
    x.restore()
  }
  // the dibs chair: a folding lawn chair with a red scarf over the back and a cardboard sign
  function drawChair(t) {
    if (t >= T.chairOff[1]) return
    const p = ease.inQuad(prog(t, ...T.chairOff))
    const cx = CHAIR.x + p * 700, cy = CHAIR.y - Math.sin(Math.PI * Math.min(1, p * 1.3)) * 220 - (inR(t, T.drop, T.drop + 0.5) ? 6 * bump(t, T.drop, 0.5) : 0)
    x.save(); x.translate(cx, cy); x.rotate(p * 5 + (inR(t, T.drop, T.drop + 0.5) ? 0.08 * bump(t, T.drop, 0.5) : 0)); x.scale(1.35, 1.35)
    x.lineCap = 'round'
    x.strokeStyle = '#cfd6ec'; x.lineWidth = 9
    x.beginPath(); x.moveTo(-60, 0); x.lineTo(40, -90); x.moveTo(60, 0); x.lineTo(-40, -90); x.moveTo(-50, -90); x.lineTo(60, -95); x.moveTo(50, -92); x.lineTo(70, -230); x.stroke()
    // webbing (the back + seat)
    const cols = ['#5ab0e8', '#f2f2f2', '#2fc79a']
    for (let i = 0; i < 5; i++) { x.fillStyle = cols[i % 3]; x.save(); x.translate(56 + i * 0.5, -110 - i * 26); x.rotate(-0.14); x.fillRect(-40, -10, 54, 20); x.restore() }
    for (let i = 0; i < 4; i++) { x.fillStyle = cols[(i + 1) % 3]; x.fillRect(-48 + i * 26, -104, 22, 18) }
    // the scarf
    x.fillStyle = FIRE; x.fillRect(16, -240, 60, 26); x.fillRect(60, -230, 22, 120)
    x.fillStyle = '#ffd27a'; for (let i = 0; i < 4; i++) x.fillRect(60, -200 + i * 26, 22, 6)
    x.restore()
    // the cardboard sign (stays behind on the snow; it comes back for the button)
    if (t < T.hawk) drawSign(t, cx - 150, cy - 80, 'DIBS', -0.12, 1.25)
    else { const q = prog(t, T.hawk, T.hawk + 1.2); if (q < 1) drawSign(t, lerp(cx - 150, 1400, ease.inQuad(q)), lerp(cy - 80, 300, q), 'DIBS', q * 9, 1.25) }
  }
  function drawSign(t, sx, sy, text, rot, k = 1) {
    if (k <= 0.01) return
    x.save(); x.translate(sx, sy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-66, -40, 132, 80)
    x.fillStyle = '#c8955a'; x.fillRect(-62, -36, 124, 72)
    x.fillStyle = '#a6743f'; x.fillRect(-62, 22, 124, 6)
    x.font = `800 ${text.length > 4 ? 36 : 44}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = text === 'TAKEN' ? '#b8183a' : INK
    x.fillText(text, 0, 0)
    x.restore()
  }
  // a mini chart wheel that spins in over a star
  function drawChart(t, cx, cy, sign, k, delay) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate((1 - k) * 2 + 0.15 * Math.sin(t * 0.8 + delay))
    const R = 112
    x.fillStyle = 'rgba(14,9,34,0.82)'; x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fill()
    x.strokeStyle = rgba(GOLD, 0.9); x.lineWidth = 5; x.shadowColor = GOLD; x.shadowBlur = 16
    x.beginPath(); x.arc(0, 0, R, 0, TAU); x.stroke(); x.beginPath(); x.arc(0, 0, R * 0.72, 0, TAU); x.stroke(); x.shadowBlur = 0
    x.lineWidth = 3
    for (let i = 0; i < 12; i++) { const a = i * TAU / 12; x.beginPath(); x.moveTo(Math.cos(a) * R * 0.72, Math.sin(a) * R * 0.72); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.stroke() }
    SIGNS.forEach((s, i) => { const a = (i + 0.5) * TAU / 12; x.fillStyle = s.color; x.beginPath(); x.arc(Math.cos(a) * R * 0.86, Math.sin(a) * R * 0.86, 5, 0, TAU); x.fill() })
    x.rotate(-((1 - k) * 2 + 0.15 * Math.sin(t * 0.8 + delay)))
    x.font = `bold 66px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = sign.color; x.shadowColor = sign.color; x.shadowBlur = 18
    x.fillText(sign.glyph + '︎', 0, 4)
    x.restore()
  }
  function drawIcicles(F, k) {
    if (k <= 0.01) return
    for (const [i, j, L] of [[5, 15, 3], [8, 16, 2], [31, 15, 3], [28, 16, 2], [14, 33, 2], [22, 33, 3]]) {
      const [wx, wy] = cellToWorld(F, i, j)
      const c = F.cell
      x.fillStyle = INK; x.fillRect(wx - c * 0.7, wy - c * 0.2, c * 1.4, c * (L + 0.6))
      x.fillStyle = rgba('#dff4ff', k); x.fillRect(wx - c * 0.5, wy, c, c * L * k)
      x.fillStyle = rgba('#ffffff', k); x.fillRect(wx - c * 0.5, wy, c * 0.4, c * L * 0.6 * k)
    }
  }
  function ariesState(t) {
    const st = { mood: 'squint', look: [0, 0], squash: 0 }
    if (t < T.l0) st.look = [1, 0.2]
    else if (t < T.drop) { st.mood = t < 2.5 ? 'neutral' : 'sparkle'; st.look = t < 2.5 ? [0, 0] : [1, 0.3] }
    else if (t < T.toChair[1]) { st.mood = 'wide'; st.squash = 0.18 * bump(t, T.drop, 0.35); st.look = [-1, 0] }
    else if (t < T.hawk) { st.mood = 'heart'; st.look = [1, 0.4] }
    else if (t < T.leoIn[0]) { st.mood = 'wide'; st.look = [1, -0.2]; st.squash = 0.15 * bump(t, T.hawk, 0.35) }
    else if (t < T.link) { st.mood = 'sparkle'; st.look = [1, 0] }
    else if (t < T.link + 0.8) { st.mood = 'wide'; st.look = [0, 0]; st.squash = 0.14 * bump(t, T.link, 0.35) }
    else if (t < T.h2) { st.mood = 'happy'; st.look = [1, 0] }
    else if (t < T.taken) { st.mood = 'heart'; st.look = [1, 0] }
    else if (t < T.taken + 0.6) { st.mood = 'wide'; st.look = [0.5, 1] }
    else st.mood = 'heart'
    return st
  }
  function leoState(t) {
    if (t < T.link) return { mood: 'happy', look: [-1, 0] }
    if (t < T.taken || t >= T.taken + 0.6) return { mood: 'heart', look: [-1, 0] }
    return { mood: 'wink', look: [-0.6, 1] }
  }
  function skyState(t) {
    if (t < T.l1) return { mood: 'eyeroll', look: [0, 0] }
    if (t < T.hawk) return { mood: 'neutral', look: [0, 0] }
    if (t < T.l2) return { mood: 'wide', look: [1, 0.5] }
    if (t < T.h2) return { mood: 'happy', look: [0, 0] }
    if (t < T.taken) return { mood: 'sparkle', look: [-1, 1] }
    return { mood: 'wink', look: [0, 0] }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = 1 - ease.inCubic(prog(t, ...T.out))
        const cold = coldK(t), ge = gustEnv(t, GUSTS)
        x.save(); x.globalAlpha = clamp(o); x.translate(540, 1000); x.scale(lerp(0.88, 1, o), lerp(0.88, 1, o)); x.translate(-540, -1000 + (inR(t, T.drop, T.drop + 0.4) ? Math.sin((t - T.drop) * 60) * 10 * (1 - prog(t, T.drop, T.drop + 0.4)) : 0))
        // warm glow after the link
        const wk = 1 - cold
        if (wk > 0) { const g = x.createRadialGradient(610, 1150, 50, 610, 1150, 900); g.addColorStop(0, rgba('#ffb36b', 0.32 * wk)); g.addColorStop(1, rgba('#ffb36b', 0)); x.fillStyle = g; x.fillRect(0, 300, 1080, 1400) }
        drawSkyline(x, t, { base: GROUND + 20, a: 1, lit: 0.8 + 0.2 * wk })
        drawSnow(x, t, { gusts: GUSTS, a: 0.7, warmAt, near: [0, 0.62] })
        drawEl(x, t, { y: 1120, base: GROUND + 20, trainX: lerp(-80, 1080 + 900, prog(t, 0.6, 5.2)) })
        drawGround(x, t, { top: GROUND })
        drawChair(t)
        // the charts + the trine
        const ck = (d) => easeOutBack(prog(t, T.charts[0] + d, T.charts[1] + d), 1.7) * (1 - ease.inCubic(prog(t, T.cut - 0.4, T.cut - 0.05)))
        const ax = ariesX(t), lx = leoX(t), CY = 1010
        if (t >= T.link && t < T.cut) {
          const lp = ease.outCubic(prog(t, T.link - 0.25, T.link)) * (1 - ease.inCubic(prog(t, T.cut - 0.4, T.cut - 0.05)))
          x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.shadowColor = GOLD; x.shadowBlur = 30; x.lineCap = 'round'
          x.beginPath(); x.moveTo(ax + 112, CY); x.lineTo(lerp(ax + 112, lx - 112, lp), CY); x.stroke(); x.restore()
          chip(600, CY - 152, 'FIRE + FIRE · TRINE', pop01(t, T.link + 0.2, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.cut - 0.4, T.cut - 0.1))), { bar: GOLD, col: GOLD })
        } else if (t >= T.link - 0.25 && t < T.link) {
          const lp = ease.outCubic(prog(t, T.link - 0.25, T.link))
          x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(ax + 112, CY); x.lineTo(lerp(ax + 112, lx - 112, lp), CY); x.stroke(); x.restore()
        }
        drawChart(t, ax, CY, ARI, ck(0), 1)
        drawChart(t, lx, CY, LEO, ck(0.25), 2)
        // the scarf the two share (the button)
        const sk = ease.outCubic(prog(t, T.snug[1] - 0.2, T.snug[1] + 0.3))
        // Leo
        if (t >= T.leoIn[0]) {
          const ls = leoState(t)
          drawStarChar(x, lx, STAR_Y, L_S, t, { color: LEO.color, glyph: LEO.glyph, mood: ls.mood, look: ls.look, hops: L_HOPS, seed: 8, glow: 1.4 })
        }
        // Aries
        const as = ariesState(t)
        const shiver = cold * (1 - 0.6 * (t >= T.toChair[1] && t < T.hawk ? 1 : 0)) * Math.sin(t * 55) * 4 + ge * 26 * cold
        const aOpts = { color: mix(ARI.color, '#9fd8ff', 0.7 * cold), glyph: ARI.glyph, mood: as.mood, look: as.look, squash: as.squash - 0.05 * cold, hops: A_HOPS, seed: 4, glow: 0.6 + 0.6 * (1 - cold), pop: pop01(t, 0.35, 0.4, 2.2) }
        drawStarChar(x, ax + shiver, STAR_Y, A_S, t, aOpts)
        const F = starFrame(ax + shiver, STAR_Y, A_S, t, aOpts)
        drawIcicles(F, cold)
        if (t > T.link && t < T.link + 1.0) for (let i = 0; i < 4; i++) { const q = prog(t, T.link + i * 0.05, T.link + 0.6 + i * 0.05); x.fillStyle = rgba('#dff4ff', 1 - q); x.fillRect(ax - 80 + i * 50, STAR_Y + 20 + q * 120, 8, 22) }
        if (sk > 0) {   // one long scarf round both
          const y0 = STAR_Y + 40
          x.save(); x.globalAlpha = sk
          x.fillStyle = INK; x.fillRect(ax - 60, y0 - 4, (lx + 60 - (ax - 60)) * sk + 8, 40)
          x.fillStyle = FIRE; x.fillRect(ax - 56, y0, (lx + 56 - (ax - 56)) * sk, 32)
          x.fillStyle = '#ffd27a'; for (let i = 0; i < 9; i++) x.fillRect(ax - 40 + i * 32, y0, 10, 32 * (i * 32 < (lx - ax + 60) * sk ? 1 : 0))
          x.fillStyle = FIRE; x.fillRect(lx + 40, y0 + 20, 30, 90 * sk)
          x.restore()
        }
        if (t >= T.snug[1]) for (let i = 0; i < 5; i++) { const ph = ((t - T.snug[1]) * 0.6 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.translate(545 + Math.sin(ph * 6 + i) * 60, 1180 - ph * 260); heart(x, 0.6, i % 2 ? PINK : '#ff5c8a', 1); x.restore() }
        // the TAKEN sign comes back
        if (t >= T.taken - 0.5) {
          const q = prog(t, T.taken - 0.5, T.taken), land = bump(t, T.taken, 0.3)
          drawSign(t, 880, lerp(-200, 1395, ease.inQuad(q)) - 20 * land, q < 1 ? 'DIBS' : 'TAKEN', lerp(4, -0.08, q), 1.4)
        }
        // THE STARS
        if (t >= T.starsIn) { const ss = skyState(t); drawStarChar(x, SKY_P.x, SKY_P.y, SKY_P.s, t, { color: STAR.sky, glyph: null, mood: ss.mood, look: ss.look, hops: S_HOPS, seed: 2, pop: pop01(t, T.starsIn, 0.4, 2.2) }) }
        // chips
        if (inR(t, 0.6, T.toChair[0])) chip(340, 1080, 'FIRE SIGN · STATUS: FROZEN', pop01(t, 0.6, 0.3, 2.4) * outK(t, [T.toChair[0] - 0.2, T.toChair[0]]), { bar: '#9fd8ff', col: '#cfeeff' })
        if (inR(t, T.hawk, T.hawk + 1.3)) chip(560, 1100, 'THE HAWK', pop01(t, T.hawk, 0.25, 2.8) * outK(t, [T.hawk + 1.1, T.hawk + 1.3]), { size: 40, bar: SNOW })
        drawSnow(x, t, { gusts: GUSTS, a: 1, warmAt, near: [0.62, 2] })
        for (const [g] of GUSTS.slice(1)) drawGust(x, prog(t, g - 0.1, g + 0.9), Math.round(g * 10), 1150)
        if (inR(t, T.link, T.link + 0.5)) { x.fillStyle = rgba('#ffe2b0', 0.45 * (1 - prog(t, T.link, T.link + 0.5))); x.fillRect(0, 0, 1080, 1920) }
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D major: home key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chipC = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, bus: 'fx', ...o }]
const wind = (t, len, g) => chipC(t, 500, len, { wave: 'noise', gain: g, decay: len, sustain: 0.6 })
export const CUES = [
  ...head(T.h0, 5, T.h0Land, 0),
  wind(0.1, 1.0, 0.02), wind(T.drop - 0.2, 1.0, 0.04), ['whoosh', T.drop - 0.15, 0.9, 0.05],
  ['whoosh', 0.7, 2.6, 0.02],
  ...[0, 1, 2, 3, 4, 5].map(i => chipC(0.7 + i * 0.09, 1600 + i * 90, 0.05, { gain: 0.012, decay: 0.04, sustain: 0 })),   // teeth-chatter
  ['whoosh', T.toChair[0], 0.4, 0.03], ['pop', T.toChair[1], 880, 0.04, 0.2], ['bell', T.toChair[1] + 0.05, 1760, 0.025, 1.0, 0.2],
  ['pop', T.starsIn, 1174.66, 0.04, 0.4],
  wind(T.hawk - 0.1, 1.2, 0.05), ['whoosh', T.hawk - 0.1, 1.0, 0.06],
  chipC(T.hawk + 0.2, 880, 0.6, { wave: 'tri', gain: 0.04, slide: -14, vib: 0.3, decay: 0.55 }),
  ...head(T.h1, 3, T.h1Land, 2),
  ['whoosh', T.leoIn[0], 0.6, 0.03], ['pop', T.leoIn[1], 739.99, 0.04, 0.4],
  ['riser', T.charts[0], T.link, 0.045], ['pop', T.charts[1], 987.77, 0.035, -0.3], ['pop', T.charts[1] + 0.25, 1318.51, 0.035, 0.3],
  ['bell', T.link, 880, 0.05, 2.2, -0.2], ['bell', T.link + 0.06, 1174.66, 0.045, 2.2, 0.2], ['glitter', T.link, T.link + 1.6], ['crash', T.link, { gain: 0.035, len: 1.6 }],
  ...head(T.h2, 3, T.h2Land, 1),
  ['whoosh', T.snug[0], 0.5, 0.03], ['pop', T.snug[1], 1318.51, 0.04, 0],
  ['whoosh', T.taken - 0.5, 0.5, 0.035], ['tick', T.taken, 0.08], ['pop', T.taken, 587.33, 0.05, 0.4], ['bell', T.taken + 0.15, 1479.98, 0.035, 1.4, 0.3],
  ...talkCues(LINES, { cps: CPS, pitch: { [A_TAG]: 987.77, [S_TAG]: 739.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
